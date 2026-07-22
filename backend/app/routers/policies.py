"""Layers (pay policies) — the tracked regulated scopes and their versioned ground truth.

A layer is codified as one template (`config`). Documents are editions that, when finalized,
commit a new `PolicyVersion`. On arrival the frontend uses the list (optionally filtered by
layer_type/jurisdiction) to suggest a matching existing layer, or creates a new one here.
"""
from __future__ import annotations

import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import LayerType, PayPolicy, User
from ..schemas import PayPolicyCreate, PayPolicyDetail, PayPolicyOut
from ..security import get_current_user

router = APIRouter(prefix="/api/policies", tags=["policies"])


def _slugify(name: str) -> str:
    base = "".join(c.lower() if c.isalnum() else "-" for c in name).strip("-")
    return "-".join(filter(None, base.split("-")))[:60] or "layer"


@router.get("", response_model=list[PayPolicyOut])
def list_policies(
    layer_type: Optional[str] = None,
    jurisdiction: Optional[str] = None,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    q = db.query(PayPolicy)
    if layer_type:
        q = q.filter(PayPolicy.layer_type == LayerType(layer_type))
    if jurisdiction:
        q = q.filter(PayPolicy.jurisdiction == jurisdiction)
    return q.order_by(PayPolicy.name).all()


@router.post("", response_model=PayPolicyDetail, status_code=201)
def create_policy(body: PayPolicyCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    try:
        lt = LayerType(body.layer_type)
    except ValueError:
        raise HTTPException(400, f"layer_type must be one of {[t.value for t in LayerType]}")
    key = _slugify(body.name)
    if db.query(PayPolicy).filter(PayPolicy.key == key).first():
        key = f"{key}-{uuid.uuid4().hex[:6]}"
    policy = PayPolicy(
        key=key, name=body.name, jurisdiction=body.jurisdiction, layer_type=lt,
        subtitle=body.subtitle, flag=body.flag, config={}, version=0,
    )
    db.add(policy)
    db.commit()
    db.refresh(policy)
    return policy


@router.get("/{policy_id}", response_model=PayPolicyDetail)
def get_policy(policy_id: uuid.UUID, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    policy = db.get(PayPolicy, policy_id)
    if not policy:
        raise HTTPException(404, "layer not found")
    return policy
