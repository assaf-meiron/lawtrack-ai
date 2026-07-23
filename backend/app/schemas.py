"""API request/response schemas (Pydantic v2). Enum fields serialize as their string values."""
from __future__ import annotations

import uuid
from datetime import date, datetime
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)


# --- auth --------------------------------------------------------------------

class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    display_name: Optional[str] = None


class UserOut(ORMModel):
    id: uuid.UUID
    username: str
    display_name: Optional[str] = None
    is_active: bool


# --- pay policies ------------------------------------------------------------

class PayPolicyOut(ORMModel):
    id: uuid.UUID
    key: str
    name: str
    jurisdiction: str
    layer_type: str
    version: int
    flag: Optional[str] = None
    subtitle: Optional[str] = None


class PayPolicyCreate(BaseModel):
    """Create a new tracked layer (used when an upload is a brand-new layer)."""
    name: str
    jurisdiction: str
    layer_type: str = "cba"
    subtitle: Optional[str] = None
    flag: Optional[str] = None


class PolicyVersionOut(ORMModel):
    id: uuid.UUID
    version: int
    config: dict[str, Any] = {}
    source_document_id: Optional[uuid.UUID] = None
    source_document_title: Optional[str] = None
    change_count: int
    approver: Optional[str] = None
    note: Optional[str] = None
    created_at: datetime


class UnsupportedCalculationOut(ORMModel):
    id: uuid.UUID
    policy_id: Optional[uuid.UUID] = None
    document_id: Optional[uuid.UUID] = None
    finding_id: Optional[uuid.UUID] = None
    capability: str
    title: Optional[str] = None
    description: str
    source_quote: str
    page: int
    derived_from: Optional[str] = None
    resolved: bool
    created_at: datetime


class EditionBrief(ORMModel):
    id: uuid.UUID
    title: str
    doc_type: str
    status: str
    created_at: datetime


class PayPolicyDetail(PayPolicyOut):
    config: dict[str, Any] = {}
    versions: list[PolicyVersionOut] = []
    unsupported: list[UnsupportedCalculationOut] = []
    editions: list[EditionBrief] = []


class FinalizeResult(BaseModel):
    document_id: uuid.UUID
    document_status: str
    policy_id: Optional[uuid.UUID] = None
    committed_version: Optional[int] = None
    changes_committed: int
    gaps_logged: int
    message: str


# --- documents & findings ----------------------------------------------------

class DocumentOut(ORMModel):
    id: uuid.UUID
    jurisdiction: str
    cba_name: Optional[str] = None
    doc_type: str
    title: str
    title_auto: bool = True
    subtitle: Optional[str] = None
    source: Optional[str] = None
    effective_from: Optional[date] = None
    effective_to: Optional[date] = None
    language: Optional[str] = None
    status: str
    error_detail: Optional[str] = None
    uploaded_by: Optional[str] = None
    policy_id: Optional[uuid.UUID] = None
    has_file: bool = False
    finalized_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class FindingOut(ORMModel):
    id: uuid.UUID
    document_id: uuid.UUID
    clause_family: str
    capability_code: Optional[str] = None
    clause_ref: Optional[str] = None
    title: Optional[str] = None
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
    reviewer_name: Optional[str] = None
    review_notes: Optional[str] = None
    chat_messages: Optional[list[Any]] = None
    final_value: Optional[str] = None
    committed_version: Optional[int] = None
    reviewed_at: Optional[datetime] = None


class DocumentDetail(DocumentOut):
    pages: Optional[list[Any]] = None
    findings: list[FindingOut] = []
    policy: Optional[PayPolicyOut] = None


class DocumentUpdate(BaseModel):
    """Editable document metadata (inline rename)."""
    title: Optional[str] = None
    subtitle: Optional[str] = None


# --- review ------------------------------------------------------------------

class ReviewAction(BaseModel):
    """approve | correct | reject | unsure. `correct` requires `final_value`;
    `unsure` parks the finding as an open question (put the question in `notes`)."""
    action: str
    notes: Optional[str] = None
    final_value: Optional[str] = None
    # for the normalized Rule (defaults derived from the finding when omitted):
    capability: Optional[str] = None
    condition: Optional[str] = None
    effective_date: Optional[date] = None


# --- finding chat ------------------------------------------------------------

class ChatSuggestion(BaseModel):
    """An optional revision the assistant proposes after discussing a finding."""
    proposed_value: Optional[str] = None
    classification: Optional[str] = None
    rationale: Optional[str] = None


class FindingChatRequest(BaseModel):
    message: str


class FindingChatResponse(BaseModel):
    reply: str
    chat_messages: list[Any] = []
    suggestion: Optional[ChatSuggestion] = None


# --- verified output ---------------------------------------------------------

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
    created_at: datetime


class ConfigValueOut(ORMModel):
    id: uuid.UUID
    rule_id: uuid.UUID
    policy_tab: str
    policy_field: str
    value: str
    effective_date: Optional[date] = None
