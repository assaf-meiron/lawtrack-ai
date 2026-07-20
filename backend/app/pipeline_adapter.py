"""Adapter: run the copied Phase-1 pipeline (`backend/pipeline`) and persist its output.

The pipeline modules use flat imports (`import config`), so we add their dir to `sys.path`.
Running requires the `anthropic` SDK + an `ANTHROPIC_API_KEY` (or an `ant auth login` profile)
and a real PDF — until then, `analyze` returns a clear 502 via `PipelineError`.
"""
from __future__ import annotations

import sys
from pathlib import Path

from sqlalchemy.orm import Session

from .models import Classification, Confidence, DocStatus, Document, Finding

PIPELINE_DIR = Path(__file__).resolve().parents[1] / "pipeline"

# Statutory-floor notes (the Conflict baseline). In a fuller build these come from
# product-os/context/worldwide-calculations/<jurisdiction>.md.
STATUTE_NOTES = {
    "brazil": "Brazil CLT floor: daily OT >= +50% (Sunday/holiday dobra +100%); adicional noturno "
              ">= 20% with a reduced 52'30\" night hour; 11h interjornada; first-class DSR. CCTs may "
              "legally derogate — flag divergences as conflict (warn, never block).",
}


class PipelineError(RuntimeError):
    """Analysis could not run (missing deps / API key / model error)."""


def _import_pipeline():
    if str(PIPELINE_DIR) not in sys.path:
        sys.path.insert(0, str(PIPELINE_DIR))
    try:
        import config  # type: ignore
        import extract  # type: ignore
        import ingest  # type: ignore
        import mapping  # type: ignore
    except Exception as e:  # noqa: BLE001 — surface any import failure as a clean 502
        raise PipelineError(f"pipeline import failed: {e}") from e
    return config, ingest, extract, mapping


def _statute_key(jurisdiction: str) -> str:
    j = (jurisdiction or "").lower()
    return "brazil" if j.startswith("br") else j


def _val(x):
    """Enum member or plain str -> str."""
    return str(getattr(x, "value", x))


def analyze_document(db: Session, doc: Document) -> None:
    """Run ingest -> extract -> map on the document's PDF and persist Findings."""
    config, ingest, extract, mapping = _import_pipeline()

    doc.status = DocStatus.analyzing
    db.commit()
    try:
        client = config.get_client()
        file_id = ingest.upload_pdf(client, doc.file_path)
        doc.file_id = file_id
        raw = extract.extract_findings(client, file_id)
        note = STATUTE_NOTES.get(
            _statute_key(doc.jurisdiction), f"(no statutory note loaded for {doc.jurisdiction})"
        )
        mapped = mapping.map_findings(
            client, raw, "{}  (no policy supplied — author mode)", note
        )
    except PipelineError:
        raise
    except Exception as e:  # noqa: BLE001
        doc.status = DocStatus.new
        db.commit()
        raise PipelineError(f"analysis failed: {e}") from e

    # re-analyze is idempotent: drop prior findings, then persist fresh
    for old in list(doc.findings):
        db.delete(old)
    db.flush()

    for m in mapped:
        db.add(Finding(
            document_id=doc.id,
            clause_family=_val(m.clause_family),
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
    db.commit()
