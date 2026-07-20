"""④ Draft — assemble the reviewable change cards from the mapped findings.

Pure data assembly (no model call). Match → confirmation, Adjust/Gap → change, Conflict → warning
(warn, never block). The guided one-at-a-time review surface (spec §6) consumes these; it lives in
the mockup, not here.
"""
from __future__ import annotations

from schema import ChangeCard, MappingResult


def build_change_cards(mapped: MappingResult) -> list[ChangeCard]:
    return [ChangeCard.from_finding(f) for f in mapped.findings]


def summarize(cards: list[ChangeCard]) -> dict:
    """Quick portfolio-style rollup by classification (also useful for the pre-sales support matrix)."""
    counts: dict[str, int] = {}
    for c in cards:
        k = c.finding.classification.value
        counts[k] = counts.get(k, 0) + 1
    return counts
