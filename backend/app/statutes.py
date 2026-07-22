"""Statutory-floor notes — the Conflict-detection baseline for the mapping stage.

Primary source is a curated per-jurisdiction summary (concise, cacheable). When a
richer compliance memo exists under docs/compliance/support-memos/<country>.md it is
appended (truncated) so the model sees the detailed floor without blowing the prompt.
"""
from __future__ import annotations

from pathlib import Path

from .config import REPO_ROOT

MEMO_DIR = REPO_ROOT / "docs" / "compliance" / "support-memos"
_MEMO_CHAR_CAP = 6000

# jurisdiction prefix -> (curated note, memo filename)
_CURATED: dict[str, tuple[str, str]] = {
    "br": (
        "Brazil CLT floor: daily OT >= +50% (Sunday/holiday dobra +100%); adicional noturno "
        ">= 20% with a reduced 52'30\" night hour; 11h interjornada; first-class DSR. CCTs may "
        "legally derogate upward — flag divergences below the floor as conflict (warn, never block).",
        "brazil.md",
    ),
    "fr": (
        "France floor: 35h legal week; OT majoration >= 25% (first 8h) / 50% beyond; 11h daily "
        "rest; forfait-jours capped by branch accord. Branch CCNs may set higher — flag sub-floor "
        "divergences as conflict.",
        "france.md",
    ),
    "mx": (
        "Mexico LFT floor: 48h week (phasing to 40h by 2030); double pay for the first 9 weekly OT "
        "hours then triple; prima dominical >= 25%; 7th-day rest. Flag sub-floor divergences as conflict.",
        "mexico.md",
    ),
    "de": (
        "Germany floor: ArbZG 8h/day (10h with compensation), 11h daily rest, Sunday-work "
        "restrictions; premiums set by Tarifvertrag. Flag sub-floor divergences as conflict.",
        "germany.md",
    ),
}


def _prefix(jurisdiction: str) -> str:
    return (jurisdiction or "").strip().lower()[:2]


def get_note(jurisdiction: str) -> str:
    key = _prefix(jurisdiction)
    curated, memo_name = _CURATED.get(key, (None, None))
    if curated is None:
        return f"(no statutory note loaded for jurisdiction '{jurisdiction}')"

    note = curated
    memo_path = MEMO_DIR / memo_name if memo_name else None
    if memo_path and memo_path.exists():
        try:
            text = memo_path.read_text(encoding="utf-8")[:_MEMO_CHAR_CAP]
            note = f"{curated}\n\n--- detailed memo excerpt ({memo_name}) ---\n{text}"
        except OSError:
            pass
    return note
