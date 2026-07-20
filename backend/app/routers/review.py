"""Review — the human-verify loop that materializes the two verified-output layers.

approve/correct a Finding -> create a normalized `Rule` (layer 1) + its `ConfigValue`
projection (layer 2), kept in sync via `ConfigValue.rule_id`. reject records the decision
without materializing output. Re-review is idempotent (drops any prior Rule first).
"""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import ConfigValue, Finding, ReviewStatus, Rule
from ..schemas import FindingOut, ReviewAction

router = APIRouter(prefix="/api", tags=["review"])


@router.post("/findings/{finding_id}/review", response_model=FindingOut)
def review_finding(finding_id: uuid.UUID, body: ReviewAction, db: Session = Depends(get_db)):
    f = db.get(Finding, finding_id)
    if not f:
        raise HTTPException(404, "finding not found")

    action = (body.action or "").lower()
    if action not in {"approve", "correct", "reject"}:
        raise HTTPException(400, "action must be approve | correct | reject")

    f.reviewer = body.reviewer
    f.review_notes = body.notes

    # idempotent re-review: drop any previously materialized output
    if f.rule:
        db.delete(f.rule)
        db.flush()

    if action == "reject":
        f.review_status = ReviewStatus.rejected
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

    value = f.final_value or f.proposed_value or f.current_value or ""

    # materialize BOTH layers from the verified finding
    rule = Rule(
        finding_id=f.id,
        capability=body.capability or f.clause_family,
        condition=body.condition,
        value=value,
        derived_from=(f.document.cba_name or f.document.jurisdiction),
        approver=body.reviewer,
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
    db.commit()
    db.refresh(f)
    return f
