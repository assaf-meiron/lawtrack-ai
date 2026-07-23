"""Documents — store (a): the raw, unverified inbox. Upload, list, detail, analyze.

Analysis runs in a background task so the upload/analyze call returns immediately; the
document flips to `analyzing` and the client polls the detail endpoint until `analyzed`
or `error`.
"""
from __future__ import annotations

import shutil
import uuid
from datetime import date
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, Header, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from .. import pipeline_adapter
from ..config import get_settings
from ..db import get_db
from ..models import Document, DocStatus, DocType, PayPolicy, User
from ..pdf_render import is_scanned_pdf, rasterize_pages, render_pdf_pages
from ..schemas import DocumentDetail, DocumentOut, DocumentUpdate
from ..security import get_current_user

router = APIRouter(prefix="/api/documents", tags=["documents"])

STORAGE = Path(get_settings().storage_dir)
STORAGE.mkdir(parents=True, exist_ok=True)


def _parse_date(s: Optional[str]) -> Optional[date]:
    return date.fromisoformat(s) if s else None


def _pages_dir(document_id) -> Path:
    """Where a scanned document's rasterized page images live (see `rasterize_pages`)."""
    return STORAGE / f"{document_id}_pages"


@router.post("", response_model=DocumentDetail)
async def upload_document(
    background: BackgroundTasks,
    file: UploadFile = File(...),
    jurisdiction: str = Form(...),
    policy_id: Optional[str] = Form(None),
    doc_type: str = Form("cct"),
    title: Optional[str] = Form(None),
    cba_name: Optional[str] = Form(None),
    source: Optional[str] = Form(None),
    language: Optional[str] = Form(None),
    effective_from: Optional[str] = Form(None),
    effective_to: Optional[str] = Form(None),
    analyze: bool = Form(True),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    doc_id = uuid.uuid4()
    dest = STORAGE / f"{doc_id}.pdf"
    dest.write_bytes(await file.read())

    pages = render_pdf_pages(str(dest)) or None
    # Scanned/image-only PDFs have no text layer, so the reviewer needs the actual page image to
    # check a later AI transcription against. This is local rasterization (no LLM call) — cheap
    # and synchronous, unlike the vision transcription which runs in the background at analyze time.
    if pages and is_scanned_pdf(str(dest)):
        rendered = set(rasterize_pages(str(dest), _pages_dir(doc_id)))
        for p in pages:
            if p["page"] in rendered:
                p["has_image"] = True

    try:
        dt = DocType(doc_type)
    except ValueError:
        dt = DocType.other

    policy_uuid = None
    if policy_id:
        try:
            policy_uuid = uuid.UUID(policy_id)
        except ValueError:
            raise HTTPException(400, "policy_id must be a UUID")
        if not db.get(PayPolicy, policy_uuid):
            raise HTTPException(404, "pay policy not found")

    doc = Document(
        id=doc_id,
        jurisdiction=jurisdiction,
        cba_name=cba_name,
        doc_type=dt,
        title=title or file.filename or "Untitled document",
        source=source or "Manual upload",
        language=language,
        effective_from=_parse_date(effective_from),
        effective_to=_parse_date(effective_to),
        file_path=str(dest),
        pages=pages,
        uploaded_by=user.username,
        policy_id=policy_uuid,
        status=DocStatus.new,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    if analyze:
        doc.status = DocStatus.analyzing
        db.commit()
        background.add_task(pipeline_adapter.analyze_in_background, doc.id)
        db.refresh(doc)
    return doc


@router.get("", response_model=list[DocumentOut])
def list_documents(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(Document).order_by(Document.created_at.desc()).all()


@router.get("/{document_id}", response_model=DocumentDetail)
def get_document(document_id: uuid.UUID, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    return doc


@router.patch("/{document_id}", response_model=DocumentDetail)
def update_document(
    document_id: uuid.UUID,
    body: DocumentUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Rename a document (or set its subtitle). Marks the title as human-set so re-analysis
    won't overwrite it with an AI-derived title."""
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    if body.title is not None:
        title = body.title.strip()
        if not title:
            raise HTTPException(400, "title cannot be empty")
        doc.title = title[:512]
        doc.title_auto = False
    if body.subtitle is not None:
        doc.subtitle = (body.subtitle.strip() or None)
    db.commit()
    db.refresh(doc)
    return doc


@router.get("/{document_id}/file")
def get_document_file(document_id: uuid.UUID, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    if not doc.file_path or not Path(doc.file_path).exists():
        raise HTTPException(404, "no original file stored for this document (seed/demo documents render from text)")
    return FileResponse(doc.file_path, media_type="application/pdf", filename=f"{doc.title}.pdf")


@router.get("/{document_id}/pages/{page_num}/image")
def get_document_page_image(
    document_id: uuid.UUID, page_num: int, db: Session = Depends(get_db), _: User = Depends(get_current_user),
):
    """Serve a rasterized page image (scanned documents only — see `rasterize_pages`).

    Lets the reviewer check an AI-transcribed page against the actual scan side by side.
    """
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    image_path = _pages_dir(document_id) / f"{page_num}.png"
    if not image_path.exists():
        raise HTTPException(404, "no rendered image for this page")
    return FileResponse(image_path, media_type="image/png")


@router.delete("/{document_id}", status_code=204)
def delete_document(
    document_id: uuid.UUID,
    x_delete_password: Optional[str] = Header(None, alias="X-Delete-Password"),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """Delete a document (and its findings, via cascade) + its stored PDF blob.

    Requires the delete password (`X-Delete-Password` header) — an owner-only gate enforced here on the
    server so it can't be bypassed via the API (`LAWTRACK_DELETE_PASSWORD`, default set in config).

    Guarded: a document that has been finalized into a layer version (`finalized_at` set) is part of
    the audit trail and cannot be deleted — deleting it would orphan the committed provenance. Errored,
    new, analyzed, and in-review-but-not-yet-committed documents are safe to delete.
    """
    if x_delete_password != get_settings().delete_password:
        raise HTTPException(403, "incorrect delete password")
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    if doc.finalized_at is not None:
        raise HTTPException(
            409, "this document has committed changes into a layer version; it can't be deleted (audit trail)."
        )
    # remove the stored blob + any rasterized page images (best-effort; DB delete is the source of truth)
    if doc.file_path:
        Path(doc.file_path).unlink(missing_ok=True)
    shutil.rmtree(_pages_dir(document_id), ignore_errors=True)
    db.delete(doc)   # findings cascade; PolicyVersion/UnsupportedCalculation refs are SET NULL
    db.commit()
    return None


@router.post("/{document_id}/analyze", response_model=DocumentDetail)
def analyze_document(
    document_id: uuid.UUID,
    background: BackgroundTasks,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    if not doc.file_path or not Path(doc.file_path).exists():
        raise HTTPException(400, "this document has no stored PDF (seed/demo documents are pre-analyzed)")
    doc.status = DocStatus.analyzing
    doc.error_detail = None
    db.commit()
    background.add_task(pipeline_adapter.analyze_in_background, doc.id)
    db.refresh(doc)
    return doc
