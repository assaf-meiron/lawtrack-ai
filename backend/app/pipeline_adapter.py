"""Adapter: run the Phase-1 pipeline (`backend/pipeline`) and persist its output.

The pipeline modules use flat imports (`import config`), so we add their dir to `sys.path`.
Running requires the `anthropic` SDK + credentials (an `ANTHROPIC_API_KEY` or an `ant auth login`
profile) and the document's PDF blob — otherwise `analyze` raises `PipelineError` (surfaced as 502).

The comparison baseline is the document's selected `PayPolicy.config`; the Conflict baseline is the
jurisdiction's statutory note (`statutes.get_note`).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

from sqlalchemy.orm import Session

from .models import Classification, Confidence, DocStatus, Document, Finding
from .statutes import get_note

PIPELINE_DIR = Path(__file__).resolve().parents[1] / "pipeline"


class PipelineError(RuntimeError):
    """Analysis could not run (missing deps / credentials / blob / model error)."""


def _import_pipeline():
    if str(PIPELINE_DIR) not in sys.path:
        sys.path.insert(0, str(PIPELINE_DIR))
    try:
        import config  # type: ignore
        import extract  # type: ignore
        import ingest  # type: ignore
        import mapping  # type: ignore
    except Exception as e:  # noqa: BLE001 — surface any import failure as a clean error
        raise PipelineError(f"pipeline import failed: {e}") from e
    return config, ingest, extract, mapping


def _val(x):
    """Enum member or plain str -> str."""
    return str(getattr(x, "value", x))


def _policy_json(doc: Document) -> str:
    if doc.policy and doc.policy.config:
        return json.dumps(doc.policy.config, ensure_ascii=False, indent=2)
    return "{}  (no policy supplied — author mode: every relevant clause is new)"


def analyze_document(db: Session, doc: Document) -> None:
    """Run ingest -> extract -> map on the document's PDF and persist Findings.

    Idempotent: existing findings for the document are dropped and replaced.
    Raises PipelineError on any failure (caller maps to a 502 / stores error_detail).
    """
    if not doc.file_path or not Path(doc.file_path).exists():
        raise PipelineError(
            "no PDF blob is stored for this document (seed/demo documents are pre-analyzed)."
        )

    config, ingest, extract, mapping = _import_pipeline()

    doc.status = DocStatus.analyzing
    doc.error_detail = None
    db.commit()
    try:
        client = config.get_client()
        file_id = ingest.upload_pdf(client, doc.file_path)
        doc.file_id = file_id
        raw = extract.extract_findings(client, file_id)
        mapped = mapping.map_findings(client, raw, _policy_json(doc), get_note(doc.jurisdiction))
    except PipelineError:
        raise
    except Exception as e:  # noqa: BLE001
        doc.status = DocStatus.error
        doc.error_detail = str(e)
        db.commit()
        raise PipelineError(f"analysis failed: {e}") from e

    # re-analyze is idempotent: drop prior findings, then persist fresh
    for old in list(doc.findings):
        db.delete(old)
    db.flush()

    for m in mapped.findings:
        db.add(Finding(
            document_id=doc.id,
            clause_family=_val(m.clause_family),
            capability_code=(_val(m.capability_code) if getattr(m, "capability_code", None) is not None else None),
            source_quote=m.source_quote,
            page=m.page,
            rule_summary=m.rule_summary,
            classification=Classification(_val(m.classification)),
            policy_tab=m.policy_tab,
            policy_field=m.policy_field,
            current_value=m.current_value,
            proposed_value=m.proposed_value,
            rationale=m.rationale,
            confidence=Confidence(_val(m.confidence)),
            confidence_basis=_val(m.confidence_basis),
        ))

    doc.status = DocStatus.analyzed
    doc.error_detail = None
    db.commit()


def analyze_in_background(document_id) -> None:
    """Entry point for FastAPI BackgroundTasks — opens its own session."""
    from .db import SessionLocal

    db = SessionLocal()
    try:
        doc = db.get(Document, document_id)
        if doc is None:
            return
        analyze_document(db, doc)
    except PipelineError as e:
        doc = db.get(Document, document_id)
        if doc is not None:
            doc.status = DocStatus.error
            doc.error_detail = str(e)
            db.commit()
    finally:
        db.close()
