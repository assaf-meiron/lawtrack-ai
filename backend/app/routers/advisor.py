"""The T&A advisor — ask a jurisdiction how working time and pay work (see `app/advisor.py`).

Stateless by design: the transcript lives in the browser and is posted back each turn. Nothing a
customer asks is a reviewable artefact, so there is no reason to persist it — and a question typed
into a demo is not something to leave sitting in the database.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from .. import advisor
from ..models import User
from ..security import get_current_user

router = APIRouter(prefix="/api/advisor", tags=["advisor"])


class AdvisorMessage(BaseModel):
    role: str
    content: str


class AdvisorAsk(BaseModel):
    jurisdiction: str = "MX"
    message: str
    history: list[AdvisorMessage] = []


class AdvisorAnswer(BaseModel):
    answer: str
    followups: list[str] = []
    clarification: str | None = None


class AdvisorSummaryRequest(BaseModel):
    jurisdiction: str = "MX"
    history: list[AdvisorMessage] = []


class AdvisorSummaryResponse(BaseModel):
    summary: str


@router.get("/coverage")
def coverage(_: User = Depends(get_current_user)):
    """Jurisdictions the advisor answers on, with their opening questions."""
    return {"jurisdictions": advisor.coverage()}


@router.post("/ask", response_model=AdvisorAnswer)
def ask(body: AdvisorAsk, _: User = Depends(get_current_user)):
    if not body.message.strip():
        raise HTTPException(400, "message cannot be empty")
    try:
        answer, followups, clarification = advisor.ask(
            body.jurisdiction, [m.model_dump() for m in body.history], body.message.strip(),
        )
    except advisor.AdvisorError as e:
        raise HTTPException(502, str(e)) from e
    return AdvisorAnswer(answer=answer, followups=followups, clarification=clarification)


@router.post("/summary", response_model=AdvisorSummaryResponse)
def summary(body: AdvisorSummaryRequest, _: User = Depends(get_current_user)):
    try:
        return AdvisorSummaryResponse(
            summary=advisor.summarize(body.jurisdiction, [m.model_dump() for m in body.history]),
        )
    except advisor.AdvisorError as e:
        raise HTTPException(502, str(e)) from e
