"""The T&A advisor — a grounded question-and-answer surface over a jurisdiction's requirements.

This is the counterpart to the review queue. Review answers "this document arrived, what does it
change?"; the advisor answers "how does time & attendance actually work here?" — the question a
customer asks before any document is on the table.

**Grounding.** Answers come from the country's support memo under
`docs/compliance/support-memos/<country>.md`, which is the ground-truth requirements reference: one
legal proposition per row, with the exact values and a `Basis` column citing the governing article.
Only the *requirements* half is sent to the model — everything below the parked appendix marker is
day.io's internal capability/verdict analysis, which is not a customer answer and must never leak
into one.

**Scope.** Mexico only for now (`SCOPE`), because a memo is only ground truth once it has been
through the restructure that `_section-template.md` describes. Adding a country is adding an entry to
`SCOPE` — no code change.

**Always offer the next question.** A one-line answer to "what's the overtime premium?" is correct and
useless: the useful part is that the premium pivots on a *weekly running total*, that the night shift
changes the divisor, that the legality cap is a different number from the pay band. The model must
return follow-ups through `SUGGEST_FOLLOWUPS_TOOL`, so the UI can offer them as one-click questions
rather than hoping the customer knows what to ask next.
"""
from __future__ import annotations

import os
import re
import sys
from functools import lru_cache
from pathlib import Path

_APP_DIR = Path(__file__).resolve().parent          # …/backend/app  (/app/app in the container)
PIPELINE_DIR = _APP_DIR.parent / "pipeline"          # shares the credential handling in config.py

# Where the support memos live. Two layouts have to work: a local checkout, where the memos sit at
# `<repo>/docs/...` beside `backend/`, and the container, where only `app/` and `pipeline/` are copied
# in and `docs/` arrives as a bind-mount at `/app/docs`. `LAWTRACK_MEMO_DIR` overrides both.
_MEMO_CANDIDATES = [
    _APP_DIR.parents[1] / "docs" / "compliance" / "support-memos",   # <repo>/docs/... (local)
    _APP_DIR.parent / "docs" / "compliance" / "support-memos",       # /app/docs/...  (container)
]


def _memo_dir() -> Path:
    override = os.getenv("LAWTRACK_MEMO_DIR")
    if override:
        return Path(override)
    for candidate in _MEMO_CANDIDATES:
        if candidate.is_dir():
            return candidate
    return _MEMO_CANDIDATES[0]   # report the local path in the error message


MEMO_DIR = _memo_dir()

# Everything from this heading down is the internal verdict analysis, not customer-facing requirements.
_APPENDIX_MARKER = "## Appendix (parked)"


class AdvisorError(RuntimeError):
    """The advisor could not answer (missing memo, missing credentials, model error)."""


# Jurisdictions the advisor will answer on. `starters` are the opening questions the UI offers before
# the customer has typed anything — chosen to cover the four things people actually ask first.
SCOPE: dict[str, dict] = {
    "MX": {
        "country": "Mexico",
        "memo": "mexico.md",
        "flag": "🇲🇽",
        "law": "Ley Federal del Trabajo (LFT)",
        "starters": [
            "What is the overtime premium I should pay?",
            "How many days off is an employee entitled to?",
            "What changes for overtime if an employee works at night?",
            "Is there a definition of a night-shift employee?",
        ],
    },
}


@lru_cache(maxsize=8)
def memo_requirements(code: str) -> str:
    """The customer-facing requirements half of a jurisdiction's memo.

    Cached: the file is static at runtime and re-read per question would be pointless I/O on a
    64KB document.
    """
    entry = SCOPE.get(code)
    if entry is None:
        raise AdvisorError(f"no advisor coverage for '{code}' — available: {', '.join(SCOPE)}")
    path = _memo_dir() / entry["memo"]
    if not path.exists():
        raise AdvisorError(f"requirements memo missing: {path}")
    text = path.read_text(encoding="utf-8")
    cut = text.find(_APPENDIX_MARKER)
    return (text[:cut] if cut != -1 else text).strip()


SUGGEST_FOLLOWUPS_TOOL = {
    "name": "suggest_followups",
    "description": (
        "Offer the 2-3 questions this person most usefully asks next, and note any clarification you "
        "need from them. Call this on EVERY turn, after your answer."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "followups": {
                "type": "array",
                "items": {"type": "string"},
                "description": "2-3 short questions, phrased as the customer would ask them "
                               "(\"What counts as a night shift?\"), each opening a genuinely "
                               "different next step — not a restatement of what was just answered.",
            },
            "clarification": {
                "type": "string",
                "description": "Optional. The one fact that would change the answer if you had it "
                               "(e.g. the worker's shift type, or their years of service). Ask for it "
                               "in one sentence. Omit when the answer does not depend on anything.",
            },
        },
        "required": ["followups"],
        "additionalProperties": False,
    },
}


def _system_prompt(code: str) -> str:
    entry = SCOPE[code]
    return (
        f"You are the LawTrack AI time-&-attendance advisor for {entry['country']}. You answer "
        f"customers — HR, payroll and compliance staff — on how working time and pay actually work "
        f"under {entry['law']}.\n\n"
        "HOW TO ANSWER\n"
        "* Lead with the number. The first sentence carries the value they asked for — the rate, the "
        "day count, the threshold, the window. No preamble, never restate the question.\n"
        "* Be short. Two or three sentences, or a tight list when the rule genuinely is a ladder or a "
        "set of bands. A wall of text is a failed answer.\n"
        "* Cite the article inline, in brackets, for every value you state — `[LFT Art. 67]`. The "
        "memo's Basis column has it; use exactly what the memo says.\n"
        "* Name the trap. Most of these rules have one thing people get wrong (the overtime band "
        "pivots on the *weekly running total*, not the daily spread; the night 'premium' is a shorter "
        "shift and not a percentage). Say it in one clause.\n"
        "* Distinguish statute from convention. Where the memo marks something as practitioner "
        "convention, a CCT variant, or flags it 🔎 as unverified, say so rather than presenting it as "
        "settled law.\n"
        "* Money that sits downstream of time (gross-to-net, tax) is out of scope — say so and stop.\n"
        "* If the memo does not cover it, say plainly that it isn't in the reference and that it needs "
        "checking against the primary source. Never invent a value or an article number.\n\n"
        "ALWAYS CALL suggest_followups, on every single turn, after your answer. The customer usually "
        "does not know which question matters next — that is what you are for.\n\n"
        f"THE {entry['country'].upper()} REQUIREMENTS REFERENCE (your only source — every value and "
        f"every article number must come from here)\n\n{memo_requirements(code)}"
    )


def _client():
    """The Anthropic client, via the pipeline's config (shared credential handling)."""
    if str(PIPELINE_DIR) not in sys.path:
        sys.path.insert(0, str(PIPELINE_DIR))
    try:
        import config  # type: ignore
    except Exception as e:  # noqa: BLE001
        raise AdvisorError(f"pipeline config import failed: {e}") from e
    try:
        return config.get_client(), config
    except Exception as e:  # noqa: BLE001 — missing credentials must reach the user as a message
        raise AdvisorError(str(e)) from e


def _turns(history: list[dict]) -> list[dict]:
    return [
        {"role": m["role"], "content": m["content"]}
        for m in (history or [])
        if m.get("role") in ("user", "assistant") and m.get("content")
    ]


def ask(code: str, history: list[dict], message: str) -> tuple[str, list[str], str | None]:
    """One advisor turn. Returns (answer, followup_questions, clarification_or_None)."""
    if code not in SCOPE:
        raise AdvisorError(f"no advisor coverage for '{code}' — available: {', '.join(SCOPE)}")
    client, config = _client()
    try:
        resp = client.messages.create(
            model=config.MODEL_MAP,
            max_tokens=1600,
            # The memo is the same every turn and dominates the prompt — cache it rather than
            # re-billing ~10k tokens of ground truth on each question.
            system=[{
                "type": "text",
                "text": _system_prompt(code),
                "cache_control": {"type": "ephemeral"},
            }],
            tools=[SUGGEST_FOLLOWUPS_TOOL],
            messages=_turns(history) + [{"role": "user", "content": message}],
        )
    except Exception as e:  # noqa: BLE001
        raise AdvisorError(f"advisor failed: {e}") from e

    parts: list[str] = []
    followups: list[str] = []
    clarification: str | None = None
    for block in resp.content:
        if block.type == "text":
            parts.append(block.text)
        elif block.type == "tool_use" and block.name == "suggest_followups":
            data = block.input or {}
            followups = [q for q in (data.get("followups") or []) if isinstance(q, str) and q.strip()]
            clarification = (data.get("clarification") or "").strip() or None
    return "\n".join(parts).strip() or "(no answer)", followups[:3], clarification


SUMMARY_INSTRUCTION = (
    "Summarise this advisory conversation as a handover note the customer can paste into a ticket, an "
    "email, or a policy decision log. Markdown, no preamble, no sign-off:\n\n"
    "## Summary\n"
    "One or two sentences on what was asked overall.\n\n"
    "## What applies\n"
    "One bullet per rule established, each carrying its value and its `[LFT Art. …]` citation.\n\n"
    "## Open points\n"
    "Anything left unverified, flagged 🔎, dependent on a CCT, or needing a fact the customer hasn't "
    "given. Write `None` if there are none.\n\n"
    "Only use what the conversation actually established — add no new rules here."
)


def summarize(code: str, history: list[dict]) -> str:
    """A copy-pasteable markdown digest of the conversation so far."""
    if not _turns(history):
        raise AdvisorError("nothing to summarise yet — ask a question first.")
    client, config = _client()
    try:
        resp = client.messages.create(
            model=config.MODEL_MAP,
            max_tokens=2000,
            system=[{
                "type": "text",
                "text": _system_prompt(code),
                "cache_control": {"type": "ephemeral"},
            }],
            messages=_turns(history) + [{"role": "user", "content": SUMMARY_INSTRUCTION}],
        )
    except Exception as e:  # noqa: BLE001
        raise AdvisorError(f"summary failed: {e}") from e
    text = "\n".join(b.text for b in resp.content if b.type == "text").strip()
    return text or "(empty summary)"


def coverage() -> list[dict]:
    """What the advisor can answer on — drives the UI's jurisdiction picker and starter questions."""
    out = []
    for code, entry in SCOPE.items():
        try:
            rules = len(re.findall(r"^\|\s*\*\*", memo_requirements(code), re.M))
        except AdvisorError:
            continue  # a memo that isn't on disk simply isn't offered
        out.append({
            "code": code,
            "country": entry["country"],
            "flag": entry["flag"],
            "law": entry["law"],
            "rule_count": rules,
            "starters": entry["starters"],
        })
    return out
