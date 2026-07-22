"""Documents — store (a): the raw, unverified inbox. Upload, list, detail, analyze.

Analysis runs in a background task so the upload/analyze call returns immediately; the
document flips to `analyzing` and the client polls the detail endpoint until `analyzed`
or `error`.
"""
from __future__ import annotations

import uuid
from datetime import date
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from .. import pipeline_adapter
from ..config import get_settings
from ..db import get_db
from ..models import Document, DocStatus, DocType, PayPolicy, User
from ..pdf_render import render_pdf_pages
from ..schemas import DocumentDetail, DocumentOut
from ..security import get_current_user

router = APIRouter(prefix="/api/documents", tags=["documents"])

STORAGE = Path(get_settings().storage_dir)
STORAGE.mkdir(parents=True, exist_ok=True)


def _parse_date(s: Optional[str]) -> Optional[date]:
    return date.fromisoformat(s) if s else None


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
        pages=render_pdf_pages(str(dest)) or None,
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


@router.get("/{document_id}/file")
def get_document_file(document_id: uuid.UUID, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    if not doc.file_path or not Path(doc.file_path).exists():
        raise HTTPException(404, "no original file stored for this document (seed/demo documents render from text)")
    return FileResponse(doc.file_path, media_type="application/pdf", filename=f"{doc.title}.pdf")


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
