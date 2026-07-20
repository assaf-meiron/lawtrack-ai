"""The system of record — the provenance chain from raw document to verified output.

`Document` (raw, unverified) -> `Finding` (AI proposal, the pivot) -> [human verify] ->
`Rule` (normalized, layer 1) + `ConfigValue` (pay-policy projection, layer 2).

The Finding fields mirror `pipeline/schema.py::MappedFinding`; Rule + ConfigValue are the two
verified-output layers (Assaf's "both layers"), kept in sync via `ConfigValue.rule_id`.
See `product-os/ai-features/lawtrack-ai/productization.md`.
"""
from __future__ import annotations

import enum
import uuid
from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, Integer, String, Text, Uuid
from sqlalchemy import Enum as SAEnum
from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base


# --- enums (mirror pipeline/schema.py) ---------------------------------------

class DocType(str, enum.Enum):
    cba = "cba"
    cct = "cct"
    statute = "statute"
    reform = "reform"
    policy = "policy"
    other = "other"


class DocStatus(str, enum.Enum):
    new = "new"
    analyzing = "analyzing"
    analyzed = "analyzed"
    reviewed = "reviewed"


class Classification(str, enum.Enum):
    match = "match"        # 🟢 CBA rule already == policy
    adjust = "adjust"      # 🟡 existing field, different value
    gap = "gap"            # 🔴 no home in policy/schema
    conflict = "conflict"  # 🟣 diverges from a statutory floor/ceiling


class Confidence(str, enum.Enum):
    high = "high"
    medium = "medium"
    low = "low"


class ReviewStatus(str, enum.Enum):
    proposed = "proposed"
    approved = "approved"
    corrected = "corrected"
    rejected = "rejected"


def _uuid() -> uuid.UUID:
    return uuid.uuid4()


# --- store (a): raw, unverified inbox ----------------------------------------

class Document(Base):
    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    jurisdiction: Mapped[str] = mapped_column(String(64))          # country / state / CBA key, e.g. "BR-SP"
    cba_name: Mapped[str | None] = mapped_column(String(255), default=None)
    doc_type: Mapped[DocType] = mapped_column(SAEnum(DocType), default=DocType.cct)
    title: Mapped[str] = mapped_column(String(512))
    source: Mapped[str | None] = mapped_column(String(512), default=None)
    effective_from: Mapped[date | None] = mapped_column(Date, default=None)
    effective_to: Mapped[date | None] = mapped_column(Date, default=None)
    language: Mapped[str | None] = mapped_column(String(16), default=None)
    file_path: Mapped[str] = mapped_column(String(1024))          # local blob
    file_id: Mapped[str | None] = mapped_column(String(255), default=None)  # Anthropic Files API id
    status: Mapped[DocStatus] = mapped_column(SAEnum(DocStatus), default=DocStatus.new)
    uploaded_by: Mapped[str | None] = mapped_column(String(255), default=None)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    findings: Mapped[list["Finding"]] = relationship(
        back_populates="document", cascade="all, delete-orphan"
    )


# --- the pivot: AI proposal carrying the citation, plus the review lifecycle ---

class Finding(Base):
    __tablename__ = "findings"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    document_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documents.id", ondelete="CASCADE")
    )

    # extraction + mapping (mirrors MappedFinding)
    clause_family: Mapped[str] = mapped_column(String(64))
    source_quote: Mapped[str] = mapped_column(Text)                 # verbatim clause (the citation)
    page: Mapped[int] = mapped_column(Integer, default=0)
    rule_summary: Mapped[str] = mapped_column(Text, default="")
    classification: Mapped[Classification] = mapped_column(SAEnum(Classification))
    policy_tab: Mapped[str] = mapped_column(String(64))
    policy_field: Mapped[str] = mapped_column(String(255))
    current_value: Mapped[str | None] = mapped_column(String(512), default=None)
    proposed_value: Mapped[str | None] = mapped_column(String(512), default=None)
    rationale: Mapped[str] = mapped_column(Text, default="")
    confidence: Mapped[Confidence] = mapped_column(SAEnum(Confidence), default=Confidence.medium)
    confidence_basis: Mapped[str] = mapped_column(String(64), default="")

    # review lifecycle
    review_status: Mapped[ReviewStatus] = mapped_column(
        SAEnum(ReviewStatus), default=ReviewStatus.proposed
    )
    reviewer: Mapped[str | None] = mapped_column(String(255), default=None)
    review_notes: Mapped[str | None] = mapped_column(Text, default=None)
    final_value: Mapped[str | None] = mapped_column(String(512), default=None)  # human correction
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    document: Mapped["Document"] = relationship(back_populates="findings")
    rule: Mapped["Rule | None"] = relationship(
        back_populates="finding", uselist=False, cascade="all, delete-orphan"
    )


# --- store (b) layer 1: normalized, jurisdiction-agnostic verified rule -------

class Rule(Base):
    __tablename__ = "rules"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    finding_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("findings.id", ondelete="CASCADE"), unique=True
    )
    capability: Mapped[str] = mapped_column(String(32))            # 17-taxonomy code, e.g. "Sun/Hol"
    condition: Mapped[str | None] = mapped_column(Text, default=None)
    value: Mapped[str] = mapped_column(String(512))               # normalized value
    derived_from: Mapped[str] = mapped_column(String(128))        # jurisdiction / CBA
    approver: Mapped[str | None] = mapped_column(String(255), default=None)
    effective_date: Mapped[date | None] = mapped_column(Date, default=None)
    version: Mapped[int] = mapped_column(Integer, default=1)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    finding: Mapped["Finding"] = relationship(back_populates="rule")
    config_values: Mapped[list["ConfigValue"]] = relationship(
        back_populates="rule", cascade="all, delete-orphan"
    )


# --- store (b) layer 2: pay-policy projection (what the engine consumes) -------

class ConfigValue(Base):
    __tablename__ = "config_values"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    rule_id: Mapped[uuid.UUID] = mapped_column(               # the sync link back to layer 1
        ForeignKey("rules.id", ondelete="CASCADE")
    )
    policy_tab: Mapped[str] = mapped_column(String(64))          # A · Paid Overtime … G · Absences
    policy_field: Mapped[str] = mapped_column(String(255))
    value: Mapped[str] = mapped_column(String(512))
    effective_date: Mapped[date | None] = mapped_column(Date, default=None)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    rule: Mapped["Rule"] = relationship(back_populates="config_values")
