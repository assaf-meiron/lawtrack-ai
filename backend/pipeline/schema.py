"""Findings data model — the object the source panel and the change cards share.

Mirrors spec §4 (`../spec.md`). A `RawFinding` is what extraction (②) emits per T&A rule;
a `MappedFinding` is what mapping (③) produces by classifying it against the policy + statutory
floor; a `ChangeCard` is the reviewable draft (④).
"""
from __future__ import annotations

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class ClauseFamily(str, Enum):
    overtime = "overtime"
    hours_bank = "hours_bank"
    sunday_holiday = "sunday_holiday"
    night = "night"
    tolerance = "tolerance"
    on_call = "on_call"
    breaks_rest = "breaks_rest"
    shift_scale = "shift_scale"
    absence = "absence"


class Classification(str, Enum):
    match = "match"        # 🟢 CBA rule already == policy
    adjust = "adjust"      # 🟡 existing field, different value
    gap = "gap"            # 🔴 no home in policy/schema
    conflict = "conflict"  # 🟣 diverges from a statutory floor/ceiling


class Confidence(str, Enum):
    high = "high"
    medium = "medium"
    low = "low"


class ConfidenceBasis(str, Enum):
    explicit_clause = "explicit_clause"    # a numeric/explicit clause → high
    inferred_field = "inferred_field"      # had to infer the field → lower
    ambiguous_wording = "ambiguous_wording"
    shaky_extraction = "shaky_extraction"
    no_direct_field = "no_direct_field"


class RawFinding(BaseModel):
    """Extraction output (②): one T&A/pay rule pulled from the document."""
    clause_family: ClauseFamily
    source_quote: str = Field(description="Verbatim clause text, in the source language.")
    page: int
    rule_summary: str = Field(description="Plain-language statement of the rule.")


class MappedFinding(BaseModel):
    """Mapping output (③): a RawFinding classified against policy + statute."""
    clause_family: ClauseFamily
    source_quote: str
    page: int
    rule_summary: str
    classification: Classification
    policy_tab: str = Field(description="Pay-policy tab, e.g. 'A · Paid Overtime'.")
    policy_field: str = Field(description="Target field, e.g. 'night premium %'.")
    current_value: Optional[str] = Field(default=None, description="Empty for author-mode / Gap.")
    proposed_value: Optional[str] = None
    rationale: str
    confidence: Confidence
    confidence_basis: ConfidenceBasis


class MappingResult(BaseModel):
    """Structured-output wrapper for one mapping call over a batch of raw findings."""
    findings: list[MappedFinding]


# --- Review-side view (④) ----------------------------------------------------

class CardKind(str, Enum):
    confirmation = "confirmation"  # Match
    change = "change"              # Adjust / Gap
    warning = "warning"            # Conflict (warn, never block)


class ChangeCard(BaseModel):
    kind: CardKind
    finding: MappedFinding

    @classmethod
    def from_finding(cls, f: MappedFinding) -> "ChangeCard":
        kind = {
            Classification.match: CardKind.confirmation,
            Classification.adjust: CardKind.change,
            Classification.gap: CardKind.change,
            Classification.conflict: CardKind.warning,
        }[f.classification]
        return cls(kind=kind, finding=f)
