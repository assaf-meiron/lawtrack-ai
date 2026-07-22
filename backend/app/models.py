"""The system of record — the provenance chain from raw document to verified output.

`Document` (raw, unverified) -> `Finding` (AI proposal, the pivot) -> [human verify] ->
`Rule` (normalized, layer 1) + `ConfigValue` (pay-policy projection, layer 2).

`User` backs username/password auth; `PayPolicy` is the comparison baseline a document is
analyzed against (the second input, per the mockup's upload flow). The Finding fields mirror
`pipeline/schema.py::MappedFinding`. See docs/lawtrack-ai/productization.md.
"""
from __future__ import annotations

import enum
import uuid
from datetime import date, datetime

from sqlalchemy import (
    JSON,
    Boolean,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    Uuid,
)
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
    in_review = "in_review"   # some findings decided, not yet all — resumable across sessions
    reviewed = "reviewed"     # every finding decided
    complete = "complete"     # finalized — accepted findings committed as a layer version
    error = "error"


class LayerType(str, enum.Enum):
    """The regulated scope a document/template represents (four-layer inheritance)."""
    country = "country"
    state = "state"
    company = "company"
    cba = "cba"


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


# --- auth: the managed user list ---------------------------------------------

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    username: Mapped[str] = mapped_column(String(128), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    display_name: Mapped[str | None] = mapped_column(String(255), default=None)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


# --- pay policies: the comparison baseline (the second input) ----------------

class PayPolicy(Base):
    """A tracked *layer* (country/state/company/CBA). Its `config` is the layer's current codified
    ground truth; `version` counts committed updates, each snapshotted in `PolicyVersion`."""
    __tablename__ = "pay_policies"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    key: Mapped[str] = mapped_column(String(64), unique=True, index=True)  # stable slug, e.g. "br-retail"
    name: Mapped[str] = mapped_column(String(255))
    jurisdiction: Mapped[str] = mapped_column(String(64))
    layer_type: Mapped[LayerType] = mapped_column(SAEnum(LayerType), default=LayerType.cba)
    flag: Mapped[str | None] = mapped_column(String(16), default=None)
    subtitle: Mapped[str | None] = mapped_column(String(255), default=None)
    config: Mapped[dict] = mapped_column(JSON, default=dict)  # current-state values (the ground truth)
    version: Mapped[int] = mapped_column(Integer, default=0)  # number of committed updates
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    documents: Mapped[list["Document"]] = relationship(back_populates="policy")
    versions: Mapped[list["PolicyVersion"]] = relationship(
        back_populates="policy", cascade="all, delete-orphan", order_by="PolicyVersion.version"
    )
    unsupported: Mapped[list["UnsupportedCalculation"]] = relationship(
        back_populates="policy", cascade="all, delete-orphan"
    )

    @property
    def editions(self) -> list["Document"]:
        """Documents that are editions of this layer (newest first)."""
        return sorted(self.documents, key=lambda d: d.created_at or d.id, reverse=True)


class PolicyVersion(Base):
    """An immutable snapshot of a layer's config, produced each time a document is finalized."""
    __tablename__ = "policy_versions"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    policy_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("pay_policies.id", ondelete="CASCADE"))
    version: Mapped[int] = mapped_column(Integer)
    config: Mapped[dict] = mapped_column(JSON, default=dict)
    source_document_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("documents.id", ondelete="SET NULL"), default=None
    )
    source_document_title: Mapped[str | None] = mapped_column(String(512), default=None)
    change_count: Mapped[int] = mapped_column(Integer, default=0)
    approver: Mapped[str | None] = mapped_column(String(255), default=None)
    note: Mapped[str | None] = mapped_column(Text, default=None)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    policy: Mapped["PayPolicy"] = relationship(back_populates="versions")


class UnsupportedCalculation(Base):
    """A 🔴 Gap the engine can't express yet — feeds the Modular calculation backlog."""
    __tablename__ = "unsupported_calculations"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    policy_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("pay_policies.id", ondelete="SET NULL"), default=None
    )
    document_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("documents.id", ondelete="SET NULL"), default=None
    )
    finding_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("findings.id", ondelete="SET NULL"), default=None
    )
    capability: Mapped[str] = mapped_column(String(64), default="")
    title: Mapped[str | None] = mapped_column(String(512), default=None)
    description: Mapped[str] = mapped_column(Text, default="")
    source_quote: Mapped[str] = mapped_column(Text, default="")
    page: Mapped[int] = mapped_column(Integer, default=0)
    derived_from: Mapped[str | None] = mapped_column(String(255), default=None)
    resolved: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    policy: Mapped["PayPolicy | None"] = relationship(back_populates="unsupported")


# --- store (a): raw, unverified inbox ----------------------------------------

class Document(Base):
    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    jurisdiction: Mapped[str] = mapped_column(String(64))          # country / state / CBA key, e.g. "BR-SP"
    cba_name: Mapped[str | None] = mapped_column(String(255), default=None)
    doc_type: Mapped[DocType] = mapped_column(SAEnum(DocType), default=DocType.cct)
    title: Mapped[str] = mapped_column(String(512))
    subtitle: Mapped[str | None] = mapped_column(String(512), default=None)
    source: Mapped[str | None] = mapped_column(String(512), default=None)
    effective_from: Mapped[date | None] = mapped_column(Date, default=None)
    effective_to: Mapped[date | None] = mapped_column(Date, default=None)
    language: Mapped[str | None] = mapped_column(String(16), default=None)
    file_path: Mapped[str | None] = mapped_column(String(1024), default=None)   # local blob (null for seed)
    file_id: Mapped[str | None] = mapped_column(String(255), default=None)      # Anthropic Files API id
    pages: Mapped[list | None] = mapped_column(JSON, default=None)              # rendered source for the viewer
    status: Mapped[DocStatus] = mapped_column(SAEnum(DocStatus), default=DocStatus.new)
    error_detail: Mapped[str | None] = mapped_column(Text, default=None)
    finalized_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), default=None)
    uploaded_by: Mapped[str | None] = mapped_column(String(255), default=None)

    policy_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("pay_policies.id", ondelete="SET NULL"), default=None
    )

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    policy: Mapped["PayPolicy | None"] = relationship(back_populates="documents")
    findings: Mapped[list["Finding"]] = relationship(
        back_populates="document", cascade="all, delete-orphan"
    )

    @property
    def has_file(self) -> bool:
        """True when an original PDF blob is stored (false for seeded/demo documents)."""
        return bool(self.file_path)


# --- the pivot: AI proposal carrying the citation, plus the review lifecycle ---

class Finding(Base):
    __tablename__ = "findings"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    document_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documents.id", ondelete="CASCADE")
    )

    # extraction + mapping (mirrors MappedFinding)
    clause_family: Mapped[str] = mapped_column(String(64))
    clause_ref: Mapped[str | None] = mapped_column(String(128), default=None)   # e.g. "Cláusula 11ª"
    title: Mapped[str | None] = mapped_column(String(512), default=None)
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
    reviewer: Mapped[str | None] = mapped_column(String(255), default=None)          # stable username (audit id)
    reviewer_name: Mapped[str | None] = mapped_column(String(255), default=None)     # human display name
    review_notes: Mapped[str | None] = mapped_column(Text, default=None)
    final_value: Mapped[str | None] = mapped_column(String(512), default=None)  # human correction
    committed_version: Mapped[int | None] = mapped_column(Integer, default=None)  # layer version this landed in
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), default=None)
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
