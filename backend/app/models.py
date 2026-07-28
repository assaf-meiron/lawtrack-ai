"""The system of record — the provenance chain from raw document to verified output.

`Document` (raw, unverified) -> `Finding` (AI proposal, the pivot) -> [human verify] ->
`Rule` (normalized, layer 1) + `ConfigValue` (pay-policy projection, layer 2).

`User` backs username/password auth; `PayPolicy` is the comparison baseline a document is
analyzed against (the second input, per the mockup's upload flow). The Finding fields mirror
`pipeline/schema.py::MappedFinding`. See docs/lawtrack-ai/productization.md.
"""
from __future__ import annotations

import enum
import re
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
    """The kind of labor-rule document ingested, grouped by the legal layer it belongs to
    (docs/lawtrack-ai/document-types.md). Any document that can drive a T&A configuration
    change is in scope — not just Brazil CCTs. Union/collective agreements are the layer that
    *changes* pay; statutes/laws are the *floor* used for 🟣 Conflict detection."""

    # union / collective agreements (the pay-changing layer)
    cct = "cct"                                   # Convenção Coletiva de Trabalho (BR)
    act = "act"                                   # Acordo Coletivo de Trabalho (BR)
    cba = "cba"                                   # collective bargaining agreement (US / generic)
    ccn = "ccn"                                   # Convention Collective Nationale (FR)
    tarifvertrag = "tarifvertrag"                 # sectoral collective agreement (DE)
    award = "award"                               # modern award (AU) and equivalents
    collective_agreement = "collective_agreement"  # generic union agreement, other jurisdictions

    # statutes & laws (the statutory floor)
    statute = "statute"                           # federal / country labor code or statute
    state_law = "state_law"                       # state / province / jurisdiction law
    reform = "reform"                             # amendment / reform bill in flight

    # other
    policy = "policy"                             # a pay-policy document
    other = "other"


# Document-role groupings (docs/lawtrack-ai/document-types.md §"three legal layers"):
# a union agreement is the layer that changes pay; a statute/law is the conflict floor.
UNION_AGREEMENT_DOC_TYPES = frozenset({
    DocType.cct, DocType.act, DocType.cba, DocType.ccn,
    DocType.tarifvertrag, DocType.award, DocType.collective_agreement,
})
STATUTORY_DOC_TYPES = frozenset({DocType.statute, DocType.state_law, DocType.reform})


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
    adjust = "adjust"      # 🟡 a configuration recommendation (parameter + value)
    gap = "gap"            # 🔴 no home in policy/schema
    conflict = "conflict"  # 🟣 diverges from a statutory floor/ceiling
    flag = "flag"          # 🚩 ambiguous / needs human review — no confident value proposed


class Confidence(str, enum.Enum):
    high = "high"
    medium = "medium"
    low = "low"


class ReviewStatus(str, enum.Enum):
    proposed = "proposed"
    approved = "approved"
    corrected = "corrected"
    rejected = "rejected"
    unsure = "unsure"      # reviewer parked it as a question — not a final decision


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

    @property
    def provenance(self) -> dict[str, dict]:
        """Per-field provenance: capability code → the clause a configured value came from.

        `config` holds the values the engine consumes; this is the answer to "why is this number what
        it is". It walks the chain the product is built on — Document → Finding → committed value —
        and keys it by capability code, the same key `config` uses, so the Layers view can put the
        citation next to the setting without a second request.

        Only findings that were approved *and* committed to a version count. A proposal a reviewer
        hasn't accepted has not earned the right to explain a live configuration value, and an
        approved-but-uncommitted one isn't in `config` yet either. Newest commit wins when two
        editions of the same instrument both set a field.
        """
        out: dict[str, dict] = {}
        for doc in sorted(self.documents, key=lambda d: d.created_at or d.id):
            for f in doc.findings or []:
                code = f.capability_code or f.clause_family
                if not code or f.review_status != ReviewStatus.approved or f.committed_version is None:
                    continue
                out[code] = {
                    "document_id": doc.id,
                    "document_title": doc.title,
                    "clause_ref": f.clause_ref,
                    "page": f.page,
                    "source_quote": f.source_quote,
                    "approver": f.reviewer_name or f.reviewer,
                    "reviewed_at": f.reviewed_at,
                    "committed_version": f.committed_version,
                }
        return out


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
    doc_type: Mapped[DocType] = mapped_column(SAEnum(DocType), default=DocType.collective_agreement)
    title: Mapped[str] = mapped_column(String(512))
    # True while the title is still auto-derived (filename, then AI); flips to False once a human
    # renames the document, so re-analysis never clobbers a name the reviewer chose.
    title_auto: Mapped[bool] = mapped_column(Boolean, default=True)
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

    @property
    def findings_ranked(self) -> list["Finding"]:
        """Findings ordered for review: the ones carrying concrete numbers first.

        Extraction order is the order the model happened to walk the PDF, which on a long CCT buries
        the clauses a reviewer actually has to act on — a "+75% up to 120 hours" band — under
        definitional and procedural text. A reviewer's job is the numbers: a rate, a threshold, a
        window, a fraction. Those go first, and within the same score the extraction order is kept so
        the document's own sequence still reads through (`sorted` is stable).
        """
        order = {f.id: i for i, f in enumerate(self.findings)}
        return sorted(self.findings, key=lambda f: (-f.value_signal, order[f.id]))


# --- the pivot: AI proposal carrying the citation, plus the review lifecycle ---

class Finding(Base):
    __tablename__ = "findings"

    id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True, default=_uuid)
    document_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documents.id", ondelete="CASCADE")
    )

    # extraction + mapping (mirrors MappedFinding)
    clause_family: Mapped[str] = mapped_column(String(64))
    capability_code: Mapped[str | None] = mapped_column(String(32), default=None)  # 17-taxonomy code (the mapping/eval key)
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
    # reviewer<->assistant conversation about this finding: [{role, content}, ...]
    chat_messages: Mapped[list | None] = mapped_column(JSON, default=None)
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

    @property
    def value_signal(self) -> int:
        """How much configurable *value* this finding carries — the sort key for `Document.findings_ranked`.

        Counts the shapes a pay-policy field is actually typed in, weighted by how directly each one
        answers "what number do I put in the box":

        * a rate or premium (`+75%`, `100%`) — the commonest thing a CCT changes;
        * a threshold in hours or a fraction of an hour (`120 horas`, `1/3 da hora`);
        * a clock window (`22:00 às 06:00`) — night windows and shift boundaries;
        * a cycle (`quadrimestralmente`, `2 meses`).

        Deliberately language-agnostic on digits and symbols rather than keyword lists, so it works on
        a Portuguese CCT, a German Tarifvertrag and a US CBA without a per-language table. A populated
        `proposed_value` scores highest on its own: the mapping stage only fills it when it worked out
        a concrete value to write, which is the strongest signal there is.
        """
        score = 0
        proposed = (self.proposed_value or "").strip()
        if proposed and proposed.lower() not in {"not set", "none", "—", "-", "n/a"}:
            score += 6
            if re.search(r"\d", proposed):
                score += 4

        # `proposed_value` is scanned alongside the source text, not just checked for digits: it holds
        # the *distilled* figure ("1/3 (33.33%) of the normal hourly rate") where the clause may only
        # spell it in words ("um terço"). Leaving it out ranked a rate change below prose that merely
        # happened to contain a stray number.
        haystack = "\n".join(
            filter(None, (self.source_quote, self.rule_summary, self.title, proposed)),
        )
        score += 5 * len(re.findall(r"\d+(?:[.,]\d+)?\s*%", haystack))          # +75%, 100 %
        score += 4 * len(re.findall(r"\b\d{1,2}[:h]\d{2}\b", haystack))          # 22:00, 06h00
        score += 3 * len(re.findall(r"\b\d+\s*/\s*\d+\b", haystack))             # 1/3
        score += 3 * len(re.findall(
            r"\b\d+(?:[.,]\d+)?\s*(?:h|hs|hora|horas|hour|hours|Stunden|heures|min|minutos|minutes)\b",
            haystack, re.I))                                                     # 120 horas, 8h
        score += 2 * len(re.findall(
            r"\b(?:quadrimestral|semestral|trimestral|mensal|anual|monthly|annual|"
            r"quarterly|semi-?annual)\w*\b", haystack, re.I))                    # cycles
        return score


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
