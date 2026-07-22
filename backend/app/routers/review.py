"""Review — the human-verify loop that materializes the two verified-output layers.

approve/correct a Finding -> create a normalized `Rule` (layer 1) + its `ConfigValue`
projection (layer 2), kept in sync via `ConfigValue.rule_id`. reject records the decision
without materializing output. Re-review is idempotent (drops any prior Rule first).

The reviewer/approver is the authenticated user — the "who" in the audit trail.
"""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import ConfigValue, DocStatus, Finding, ReviewStatus, Rule, User
from ..schemas import FindingOut, ReviewAction
from ..security import get_current_user

router = APIRouter(prefix="/api", tags=["review"])


@router.post("/findings/{finding_id}/review", response_model=FindingOut)
def review_finding(
    finding_id: uuid.UUID,
    body: ReviewAction,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    f = db.get(Finding, finding_id)
    if not f:
        raise HTTPException(404, "finding not found")

    action = (body.action or "").lower()
    if action not in {"approve", "correct", "reject"}:
        raise HTTPException(400, "action must be approve | correct | reject")

    f.reviewer = user.username
    f.reviewer_name = user.display_name or user.username
    f.review_notes = body.notes
    f.reviewed_at = datetime.now(timezone.utc)

    # idempotent re-review: drop any previously materialized output
    if f.rule:
        db.delete(f.rule)
        db.flush()

    if action == "reject":
        f.review_status = ReviewStatus.rejected
        f.final_value = None
        _update_document_status(f)
        db.commit()
        db.refresh(f)
        return f

    if action == "correct":
        if body.final_value is None:
            raise HTTPException(400, "final_value is required to correct a finding")
        f.review_status = ReviewStatus.corrected
        f.final_value = body.final_value
    else:
        f.review_status = ReviewStatus.approved
        f.final_value = None

    value = f.final_value or f.proposed_value or f.current_value or ""

    # materialize BOTH layers from the verified finding
    rule = Rule(
        finding_id=f.id,
        capability=body.capability or f.clause_family,
        condition=body.condition,
        value=value,
        derived_from=(f.document.cba_name or f.document.jurisdiction),
        approver=user.username,
        effective_date=body.effective_date,
    )
    rule.config_values = [
        ConfigValue(
            policy_tab=f.policy_tab,
            policy_field=f.policy_field,
            value=value,
            effective_date=body.effective_date,
        )
    ]
    db.add(rule)
    _update_document_status(f)
    db.commit()
    db.refresh(f)
    return f


def _update_document_status(f: Finding) -> None:
    """Move the document through analyzed → in_review → reviewed as findings are decided.

    Reviews auto-save (each decision is persisted immediately), so an `in_review` document
    is fully resumable — a reviewer can leave and continue on a different day. The document
    reaches `reviewed` only once every finding has been decided.
    """
    doc = f.document
    if doc is None:
        return
    total = len(doc.findings)
    decided = sum(1 for x in doc.findings if x.review_status != ReviewStatus.proposed)
    if decided == 0:
        doc.status = DocStatus.analyzed
    elif decided < total:
        doc.status = DocStatus.in_review
    else:
        doc.status = DocStatus.reviewed
