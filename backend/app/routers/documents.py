"""Documents — store (a): the raw, unverified inbox. Upload, list, detail, analyze."""
from __future__ import annotations

import uuid
from datetime import date
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from .. import pipeline_adapter
from ..db import get_db
from ..models import Document, DocStatus, DocType
from ..schemas import DocumentDetail, DocumentOut

router = APIRouter(prefix="/api/documents", tags=["documents"])

STORAGE = Path(__file__).resolve().parents[2] / "storage"
STORAGE.mkdir(exist_ok=True)


def _parse_date(s: Optional[str]) -> Optional[date]:
    return date.fromisoformat(s) if s else None


@router.post("", response_model=DocumentOut)
async def upload_document(
    file: UploadFile = File(...),
    jurisdiction: str = Form(...),
    doc_type: str = Form("cct"),
    title: Optional[str] = Form(None),
    cba_name: Optional[str] = Form(None),
    source: Optional[str] = Form(None),
    language: Optional[str] = Form(None),
    effective_from: Optional[str] = Form(None),
    effective_to: Optional[str] = Form(None),
    uploaded_by: Optional[str] = Form(None),
    db: Session = Depends(get_db),
):
    doc_id = uuid.uuid4()
    dest = STORAGE / f"{doc_id}.pdf"
    dest.write_bytes(await file.read())

    try:
        dt = DocType(doc_type)
    except ValueError:
        dt = DocType.other

    doc = Document(
        id=doc_id,
        jurisdiction=jurisdiction,
        cba_name=cba_name,
        doc_type=dt,
        title=title or file.filename,
        source=source,
        language=language,
        effective_from=_parse_date(effective_from),
        effective_to=_parse_date(effective_to),
        file_path=str(dest),
        uploaded_by=uploaded_by,
        status=DocStatus.new,
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


@router.get("", response_model=list[DocumentOut])
def list_documents(db: Session = Depends(get_db)):
    return db.query(Document).order_by(Document.created_at.desc()).all()


@router.get("/{document_id}", response_model=DocumentDetail)
def get_document(document_id: uuid.UUID, db: Session = Depends(get_db)):
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    return doc


@router.post("/{document_id}/analyze", response_model=DocumentDetail)
def analyze_document(document_id: uuid.UUID, db: Session = Depends(get_db)):
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    try:
        pipeline_adapter.analyze_document(db, doc)
    except pipeline_adapter.PipelineError as e:
        raise HTTPException(502, str(e))
    db.refresh(doc)
    return doc
