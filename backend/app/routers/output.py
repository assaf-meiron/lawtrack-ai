"""Output — store (b): the verified rule library (layer 1) + pay-policy projection (layer 2),
plus the export artifacts: the decision record (audit trail) and the applyable change-set.
"""
from __future__ import annotations

import csv
import io
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from .. import pay_policy_schema
from ..db import get_db
from ..models import (
    Classification, ConfigValue, Document, DocStatus, Finding, PolicyVersion,
    ReviewStatus, Rule, UnsupportedCalculation, User,
)
from ..schemas import ConfigValueOut, FinalizeResult, RuleOut, UnsupportedCalculationOut
from ..security import get_current_user

router = APIRouter(prefix="/api", tags=["output"])


@router.get("/rules", response_model=list[RuleOut])
def list_rules(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(Rule).order_by(Rule.created_at.desc()).all()


@router.get("/config-values", response_model=list[ConfigValueOut])
def list_config_values(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(ConfigValue).order_by(ConfigValue.created_at.desc()).all()


def _load_doc(db: Session, document_id: uuid.UUID) -> Document:
    doc = db.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "document not found")
    return doc


@router.get("/documents/{document_id}/decision-record")
def decision_record(document_id: uuid.UUID, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    """The audit artifact = the pay-policy template change log: every finding + its
    citation + the human decision. Revisitable across renewals."""
    doc = _load_doc(db, document_id)
    records = []
    for f in doc.findings:
        records.append({
            "clause_ref": f.clause_ref,
            "title": f.title,
            "classification": f.classification.value,
            "policy_target": f"{f.policy_tab} → {f.policy_field}",
            "current": f.current_value,
            "proposed": f.proposed_value,
            "final": f.final_value,
            "source_quote": f.source_quote,
            "page": f.page,
            "rationale": f.rationale,
            "confidence": f.confidence.value,
            "confidence_basis": f.confidence_basis,
            "review_status": f.review_status.value,
            "reviewer": f.reviewer,
            "review_notes": f.review_notes,
            "reviewed_at": f.reviewed_at.isoformat() if f.reviewed_at else None,
        })
    return {
        "document": {
            "id": str(doc.id),
            "title": doc.title,
            "jurisdiction": doc.jurisdiction,
            "cba_name": doc.cba_name,
            "status": doc.status.value,
            "compared_to_policy": doc.policy.name if doc.policy else None,
        },
        "findings": records,
    }


def _accepted_findings(doc: Document) -> list[Finding]:
    return [
        f for f in doc.findings
        if f.review_status in (ReviewStatus.approved, ReviewStatus.corrected) and f.rule
    ]


@router.get("/documents/{document_id}/change-set.json")
def change_set_json(document_id: uuid.UUID, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    """The applyable diff: verified findings materialized as Rule ⊕ ConfigValue."""
    doc = _load_doc(db, document_id)
    changes = []
    for f in _accepted_findings(doc):
        rule = f.rule
        for cv in rule.config_values:
            changes.append({
                "capability": rule.capability,
                "policy_tab": cv.policy_tab,
                "policy_field": cv.policy_field,
                "current_value": f.current_value,
                "new_value": cv.value,
                "effective_date": cv.effective_date.isoformat() if cv.effective_date else None,
                "derived_from": rule.derived_from,
                "approver": rule.approver,
                "source_quote": f.source_quote,
                "page": f.page,
            })
    return {
        "document_id": str(doc.id),
        "title": doc.title,
        "compared_to_policy": doc.policy.name if doc.policy else None,
        "change_count": len(changes),
        "changes": changes,
    }


@router.get("/documents/{document_id}/change-set.csv")
def change_set_csv(document_id: uuid.UUID, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    doc = _load_doc(db, document_id)
    buf = io.StringIO()
    w = csv.writer(buf)
    w.writerow([
        "capability", "policy_tab", "policy_field", "current_value", "new_value",
        "effective_date", "derived_from", "approver", "page", "source_quote",
    ])
    for f in _accepted_findings(doc):
        rule = f.rule
        for cv in rule.config_values:
            w.writerow([
                rule.capability, cv.policy_tab, cv.policy_field, f.current_value or "",
                cv.value, cv.effective_date.isoformat() if cv.effective_date else "",
                rule.derived_from, rule.approver or "", f.page, f.source_quote,
            ])
    filename = f"change-set-{doc.id}.csv"
    return Response(
        content=buf.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


# --- finalize: commit the accepted findings into the layer as a new version ---

@router.post("/documents/{document_id}/finalize", response_model=FinalizeResult)
def finalize_document(document_id: uuid.UUID, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    """Commit every accepted/edited finding not yet committed into the layer's config as a new
    version. 🔴 Gaps are logged to the unsupported-calc backlog. Partial + repeatable across days:
    the layer moves forward now, undecided findings stay pending, the doc stays `in_review` until all
    are decided (then `complete`)."""
    doc = _load_doc(db, document_id)
    policy = doc.policy
    if policy is None:
        raise HTTPException(400, "attach the document to a layer before finalizing")

    pending = [
        f for f in doc.findings
        if f.review_status in (ReviewStatus.approved, ReviewStatus.corrected) and f.committed_version is None
    ]
    if not pending:
        raise HTTPException(400, "nothing new to commit — accept or edit at least one finding first")

    new_version = policy.version + 1
    config = pay_policy_schema.normalize(policy.config)  # structured six-tab config
    changes = gaps = 0
    for f in pending:
        if f.classification == Classification.gap:
            # 🔴 Gap: no home in the pay policy — capture in the dedicated gap store (feeds the file)
            db.add(UnsupportedCalculation(
                policy_id=policy.id, document_id=doc.id, finding_id=f.id,
                capability=f.capability_code or f.clause_family,
                title=f.title, description=f.rule_summary, source_quote=f.source_quote, page=f.page,
                derived_from=(doc.cba_name or doc.jurisdiction),
            ))
            gaps += 1
        else:
            code = f.capability_code or f.clause_family
            value = f.final_value or f.proposed_value or f.current_value or ""
            pay_policy_schema.set_field(config, code, value, taxonomy_tab=f.policy_tab)
            changes += 1
        f.committed_version = new_version

    policy.config = config
    policy.version = new_version
    db.add(PolicyVersion(
        policy_id=policy.id, version=new_version, config=config, source_document_id=doc.id,
        source_document_title=doc.title, change_count=changes, approver=user.username,
        note=f"{changes} change(s), {gaps} gap(s) — {doc.title}",
    ))

    all_decided = all(x.review_status != ReviewStatus.proposed for x in doc.findings)
    doc.finalized_at = datetime.now(timezone.utc)
    doc.status = DocStatus.complete if all_decided else DocStatus.in_review
    db.commit()

    tail = "" if all_decided else " Some findings still pending — the document stays in review."
    return FinalizeResult(
        document_id=doc.id, document_status=doc.status.value, policy_id=policy.id,
        committed_version=new_version, changes_committed=changes, gaps_logged=gaps,
        message=f"Committed v{new_version} to {policy.name}: {changes} change(s), {gaps} gap(s) logged.{tail}",
    )


# --- unsupported calculations (🔴 Gaps) → Modular calculation backlog ---

@router.get("/unsupported-calculations", response_model=list[UnsupportedCalculationOut])
def list_unsupported(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    return db.query(UnsupportedCalculation).order_by(UnsupportedCalculation.created_at.desc()).all()


@router.get("/unsupported-calculations.txt")
def unsupported_txt(db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    rows = db.query(UnsupportedCalculation).order_by(UnsupportedCalculation.created_at).all()
    lines = [
        "# Can't-be-fulfilled calculations",
        "# LawTrack AI → Modular calculation backlog. Each entry is a real clause the engine",
        "# cannot express yet; build the calculation, then mark it resolved.",
        "",
    ]
    for r in rows:
        lines += [
            f"## {r.title or r.capability}  ({r.derived_from or '—'})",
            f"- capability: {r.capability}",
            f"- need: {r.description}",
            f'- source: "{r.source_quote}" (p.{r.page})',
            f"- status: {'resolved' if r.resolved else 'open'}",
            "",
        ]
    return Response(
        content="\n".join(lines),
        media_type="text/plain; charset=utf-8",
        headers={"Content-Disposition": 'attachment; filename="unsupported-calculations.txt"'},
    )
