"""Output — store (b): the verified rule library (layer 1) + pay-policy projection (layer 2)."""
from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import ConfigValue, Rule
from ..schemas import ConfigValueOut, RuleOut

router = APIRouter(prefix="/api", tags=["output"])


@router.get("/rules", response_model=list[RuleOut])
def list_rules(db: Session = Depends(get_db)):
    return db.query(Rule).order_by(Rule.created_at.desc()).all()


@router.get("/config-values", response_model=list[ConfigValueOut])
def list_config_values(db: Session = Depends(get_db)):
    return db.query(ConfigValue).order_by(ConfigValue.created_at.desc()).all()
