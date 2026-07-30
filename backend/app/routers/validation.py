"""Payroll Validation — the punches, checked against the agreement they were collected under.

Two reads and no writes. Nothing here is a reviewable artefact: a validation run is a *derivation*
over punch data the T&A product owns, so it is recomputed on demand rather than stored, and there is
no state for a reviewer to accept or reject. What a reviewer accepts lives on the review surface,
which is where the rules themselves came from.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException

from .. import validation
from ..models import User
from ..security import get_current_user

router = APIRouter(prefix="/api/validation", tags=["validation"])


@router.get("/departments")
def departments(_: User = Depends(get_current_user)):
    """The org chart: four arms, their departments, and the agreements each department is made of.

    Carries no score and no breach count — see `validation.catalog`. Nothing has been analysed when
    this is served, and the chart must not imply otherwise.
    """
    return validation.catalog()


@router.get("/departments/{dept_key}")
def run(dept_key: str, _: User = Depends(get_current_user)):
    """Validate one department's punches for the period: score, totals, and every rule with its breaches."""
    try:
        return validation.validate(dept_key)
    except KeyError:
        raise HTTPException(404, f"unknown department: {dept_key}") from None
