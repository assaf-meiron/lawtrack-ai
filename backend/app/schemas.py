"""API request/response schemas (Pydantic v2). Enum fields are serialized as their string values."""
from __future__ import annotations

import uuid
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)


class DocumentOut(ORMModel):
    id: uuid.UUID
    jurisdiction: str
    cba_name: Optional[str] = None
    doc_type: str
    title: str
    source: Optional[str] = None
    effective_from: Optional[date] = None
    effective_to: Optional[date] = None
    language: Optional[str] = None
    status: str
    uploaded_by: Optional[str] = None
    created_at: datetime


class FindingOut(ORMModel):
    id: uuid.UUID
    document_id: uuid.UUID
    clause_family: str
    source_quote: str
    page: int
    rule_summary: str
    classification: str
    policy_tab: str
    policy_field: str
    current_value: Optional[str] = None
    proposed_value: Optional[str] = None
    rationale: str
    confidence: str
    confidence_basis: str
    review_status: str
    reviewer: Optional[str] = None
    review_notes: Optional[str] = None
    final_value: Optional[str] = None


class DocumentDetail(DocumentOut):
    findings: list[FindingOut] = []


class ReviewAction(BaseModel):
    """approve | correct | reject. `correct` requires `final_value`."""
    action: str
    reviewer: Optional[str] = None
    notes: Optional[str] = None
    final_value: Optional[str] = None
    # for the normalized Rule (defaults derived from the finding when omitted):
    capability: Optional[str] = None
    condition: Optional[str] = None
    effective_date: Optional[date] = None


class RuleOut(ORMModel):
    id: uuid.UUID
    finding_id: uuid.UUID
    capability: str
    condition: Optional[str] = None
    value: str
    derived_from: str
    approver: Optional[str] = None
    effective_date: Optional[date] = None
    version: int


class ConfigValueOut(ORMModel):
    id: uuid.UUID
    rule_id: uuid.UUID
    policy_tab: str
    policy_field: str
    value: str
    effective_date: Optional[date] = None
