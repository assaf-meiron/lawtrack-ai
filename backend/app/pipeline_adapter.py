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
from .pdf_render import is_scanned_pdf
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
        import transcribe  # type: ignore
    except Exception as e:  # noqa: BLE001 — surface any import failure as a clean error
        raise PipelineError(f"pipeline import failed: {e}") from e
    return config, ingest, extract, mapping, transcribe


def _val(x):
    """Enum member or plain str -> str."""
    return str(getattr(x, "value", x))


def _policy_json(doc: Document) -> str:
    if doc.policy and doc.policy.config:
        return json.dumps(doc.policy.config, ensure_ascii=False, indent=2)
    return ("{}  (no policy configured yet — author mode: there is no baseline value for ANY capability. "
            "Treat each supported capability as a field to configure from scratch → adjust; reserve gap "
            "for rules the engine cannot represent at all, never for a merely-unset field.)")


def _apply_transcript(doc: Document, transcript: dict) -> None:
    """Fold vision-transcribed page text into the viewer's page skeleton.

    `transcript` is {physical_page_number: [paragraph, ...]}. Pages that were transcribed get their
    `paras` filled and are marked `transcribed` (the UI badges those as an AI reconstruction). Page
    count stays faithful to the PDF; pages the model skipped stay blank. If the skeleton is missing
    (render produced nothing), synthesize one from the transcript.

    Builds a brand-new `pages` list (fresh dicts) and reassigns it, rather than mutating in place:
    `Document.pages` is a plain JSON column with no mutation tracking, so an in-place edit + same-object
    reassignment is NOT seen as dirty and silently fails to persist on commit.
    """
    if not transcript:
        return
    src = doc.pages or []
    if src:
        pages = []
        for p in src:
            q = dict(p)
            paras = transcript.get(q.get("page"))
            if paras:
                q["blocks"] = [{"kind": "para", "paras": paras}]
                q["transcribed"] = True
            pages.append(q)
    else:
        pages = [
            {"page": n, "blocks": [{"kind": "para", "paras": transcript[n]}], "transcribed": True}
            for n in sorted(transcript)
        ]
    doc.pages = pages  # fresh object → the ORM detects the change on the JSON column


def analyze_document(db: Session, doc: Document) -> None:
    """Run ingest -> extract -> map on the document's PDF and persist Findings.

    Idempotent: existing findings for the document are dropped and replaced.
    Raises PipelineError on any failure (caller maps to a 502 / stores error_detail).
    """
    if not doc.file_path or not Path(doc.file_path).exists():
        raise PipelineError(
            "no PDF blob is stored for this document (seed/demo documents are pre-analyzed)."
        )

    config, ingest, extract, mapping, transcribe = _import_pipeline()

    doc.status = DocStatus.analyzing
    doc.error_detail = None
    db.commit()
    try:
        client = config.get_client()
        file_id = ingest.upload_pdf(client, doc.file_path)
        doc.file_id = file_id
        # Scanned / image-only PDFs have no text layer, so the viewer's pdfplumber pages are
        # blank. Transcribe them via vision (reusing the uploaded file_id) so the source panel
        # isn't empty. Best-effort and committed on its own: the viewer is a nicety and must
        # never fail the analysis, and blank pages get fixed even if extraction later errors.
        if is_scanned_pdf(doc.file_path):
            try:
                _apply_transcript(doc, transcribe.transcribe_pages(client, file_id))
                db.commit()
            except Exception as e:  # noqa: BLE001
                print(f"note: page transcription failed ({e}); viewer pages left blank.", file=sys.stderr)
        raw = extract.extract_findings(client, file_id)
        mapped = mapping.map_findings(client, raw, _policy_json(doc), get_note(doc.jurisdiction))
    except PipelineError:
        raise
    except Exception as e:  # noqa: BLE001
        doc.status = DocStatus.error
        doc.error_detail = str(e)
        db.commit()
        raise PipelineError(f"analysis failed: {e}") from e

    # Adopt the AI-derived document title only while it's still auto-derived (filename or a prior
    # auto title) — a human rename sets title_auto=False and is never overwritten.
    if doc.title_auto:
        ai_title = (getattr(mapped, "document_title", None) or "").strip()
        if ai_title:
            doc.title = ai_title[:512]
        ai_subtitle = (getattr(mapped, "document_subtitle", None) or "").strip()
        if ai_subtitle and not doc.subtitle:
            doc.subtitle = ai_subtitle[:512]

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


SUGGEST_REVISION_TOOL = {
    "name": "suggest_revision",
    "description": "Call this ONLY when the discussion warrants reconsidering the finding — to "
                   "propose a revised configuration value, a different classification, or a clearer "
                   "rationale. Omit any field you are not changing. Do not call it for plain Q&A.",
    "input_schema": {
        "type": "object",
        "properties": {
            "proposed_value": {"type": "string", "description": "Revised value for the policy field."},
            "classification": {
                "type": "string",
                "enum": ["match", "adjust", "gap", "conflict", "flag"],
            },
            "rationale": {"type": "string", "description": "Updated one-paragraph rationale."},
        },
        "additionalProperties": False,
    },
}


def _finding_context(finding: Finding) -> str:
    doc = finding.document
    return (
        f"Document: {getattr(doc, 'title', '') or '—'} ({getattr(doc, 'jurisdiction', '') or '—'})\n"
        f"Clause: {finding.clause_ref or finding.clause_family} (p.{finding.page})\n"
        f"Verbatim clause: \"{finding.source_quote}\"\n"
        f"Rule summary: {finding.rule_summary}\n"
        f"Classification: {_val(finding.classification)}\n"
        f"Maps to: {finding.policy_tab} · {finding.policy_field}\n"
        f"Current policy value: {finding.current_value or '— (none / author mode)'}\n"
        f"Proposed value: {finding.proposed_value or '—'}\n"
        f"Rationale: {finding.rationale}\n"
        f"Confidence: {_val(finding.confidence)} ({finding.confidence_basis})"
    )


CHAT_SYSTEM = (
    "You are LawTrack AI's review assistant. A human reviewer is examining ONE finding extracted "
    "from a labor-rule document and wants to discuss it. Answer their questions grounded strictly in "
    "the finding context below; be concise and precise, and say plainly when the clause is genuinely "
    "ambiguous rather than inventing certainty. Take the reviewer's input seriously — if the "
    "conversation shows the original proposal should change, call the suggest_revision tool.\n\n"
    "FINDING CONTEXT\n{context}"
)


def chat_about_finding(finding: Finding, history: list[dict], message: str):
    """Run one chat turn about a finding. Returns (reply_text, suggestion_dict_or_None).

    `history` is the prior [{role, content}] transcript; `message` is the new reviewer message.
    """
    config, *_ = _import_pipeline()
    client = config.get_client()
    prior = [
        {"role": m["role"], "content": m["content"]}
        for m in (history or [])
        if m.get("role") in ("user", "assistant") and m.get("content")
    ]
    try:
        resp = client.messages.create(
            model=config.MODEL_MAP,
            max_tokens=1500,
            system=CHAT_SYSTEM.format(context=_finding_context(finding)),
            tools=[SUGGEST_REVISION_TOOL],
            messages=prior + [{"role": "user", "content": message}],
        )
    except Exception as e:  # noqa: BLE001 — surface as a clean error to the caller
        raise PipelineError(f"chat failed: {e}") from e

    reply_parts, suggestion = [], None
    for block in resp.content:
        if block.type == "text":
            reply_parts.append(block.text)
        elif block.type == "tool_use" and block.name == "suggest_revision":
            suggestion = {k: v for k, v in (block.input or {}).items() if v}
    reply = "\n".join(reply_parts).strip() or "(no reply)"
    return reply, (suggestion or None)


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
