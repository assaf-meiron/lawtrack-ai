"""The mapping target — the 17-capability taxonomy (spec §5), grouped by pay-policy tab.

Source of truth: `../../../context/worldwide-calculations/brazil-cct-support-matrix.md`.
This module renders the large, stable system context that mapping (③) runs against — the block we
prompt-cache (`../technical-design.md` → prompt caching).
"""
from __future__ import annotations

import re
from enum import Enum

# (code, capability, pay-policy tab). `code` matches the support-matrix columns.
CAPABILITIES: list[tuple[str, str, str]] = [
    ("Jorn",     "Standard-hours target (jornada 8h/44h)",                          "A · Paid Overtime"),
    ("OT/d",     "Daily OT — single or intraday-phased tiers (+70% first 2h, +100% after)", "A · Paid Overtime"),
    ("OT wk/mo", "OT accumulated & banded over a week or month",                    "A · Paid Overtime"),
    ("BH",       "Banco de horas — cyclical 1:1, compensation window, +/- caps",    "A · Paid Overtime"),
    ("BH->pay",  "Bank not compensated in window → OT pay; rescission payout",      "A · Paid Overtime"),
    ("Sun/Hol",  "Sunday/holiday worked premium (dobra +100% / CCT %)",             "A · Paid Overtime"),
    ("Sun-rot",  "Rest-day rotation / N-consecutive-Sundays folga rule",            "A · Paid Overtime"),
    ("Not",      "Adicional noturno — % + night window",                            "B · Hours Distribution"),
    ("Not-prg",  "Night premium extend-to-full-range (prorrogacao, Sum. 60 II)",    "B · Hours Distribution"),
    ("Not-red",  "Hora noturna reduzida (52'30\" compressed hour)",                 "B · Hours Distribution"),
    ("Tol",      "Tolerancia / minutos residuais (ponto)",                          "C · Tolerance"),
    ("OnCall",   "Sobreaviso / prontidao (standby)",                                "D · On Call"),
    ("Intra",    "Intervalo intrajornada — netting, reduce-to-30', 15' lanche",     "E · Breaks & rest"),
    ("Inter",    "Interjornada 11h minimum rest (violation flag)",                  "E · Breaks & rest"),
    ("12x36",    "Escala 12x36",                                                    "F · Schedule / scale"),
    ("Sem-esp",  "Semana espanhola / Saturday-suppression",                         "F · Schedule / scale"),
    ("Abono",    "Faltas abonadas / abono with conditional triggers",               "G · Absences"),
]

# The 17 capability codes — the single source of truth for the mapping key. The eval golden set
# is keyed by these exact codes, so a MappedFinding must commit to one (pipeline/schema.py).
CAPABILITY_CODES: list[str] = [code for code, _, _ in CAPABILITIES]
CODE_TO_TAB: dict[str, str] = {code: tab for code, _, tab in CAPABILITIES}


def _enum_name(code: str) -> str:
    """A valid Python identifier for an enum member name derived from a capability code."""
    name = re.sub(r"[^0-9A-Za-z]+", "_", code).strip("_")
    return f"c_{name}" if name[0].isdigit() else name


# A str-enum over the 17 codes (values are the canonical codes, e.g. "OT/d"). Used as the
# constrained `capability_code` field on MappedFinding so the model picks exactly one.
CapabilityCode = Enum(
    "CapabilityCode", {_enum_name(c): c for c in CAPABILITY_CODES}, type=str
)

CLASSIFICATION_RUBRIC = """
Classify each rule against BOTH the tenant's current pay policy AND the jurisdiction's statutory floor:
- match    (🟢): the rule already equals what the policy does.
- adjust   (🟡): maps to an existing policy field, but a different value (night 20% -> 25%).
- gap      (🔴): no home in the current policy/schema — a net-new calculation or product change.
- conflict (🟣): the clause appears to diverge from a statutory floor/ceiling — legal risk (warn, never block).

Confidence + its cause on every finding. Set confidence_basis to WHY you are that sure:
explicit_clause (numeric/explicit → high) · inferred_field (had to infer) · ambiguous_wording ·
shaky_extraction · no_direct_field. When unsure, prefer lower confidence and say why — a false
positive is worse than a flagged uncertainty.
"""


def render_taxonomy() -> str:
    lines = ["The engine capability taxonomy (target for mapping). Each row: code | capability | pay-policy tab."]
    for code, cap, tab in CAPABILITIES:
        lines.append(f"  {code:9s} | {cap} | {tab}")
    lines.append("")
    lines.append(
        "Set `capability_code` on every finding to EXACTLY ONE of these codes: "
        + ", ".join(CAPABILITY_CODES) + "."
    )
    return "\n".join(lines)


def build_mapping_system(policy_json: str, statute_note: str) -> str:
    """The cacheable system context for the mapping stage (③).

    policy_json  — the tenant's current pay policy (the Match/Adjust/Gap baseline).
    statute_note — the jurisdiction's statutory floor summary (the Conflict baseline).
    """
    return f"""You are LawTrack's mapping stage. You receive T&A/pay rules already extracted from a
collective agreement (each with a verbatim source_quote + page). For each, decide how it relates to
the pay policy and the statutory floor, and draft the precise config change. You never invent a
number you cannot tie to the source_quote; you propose, a human decides.

{render_taxonomy()}

{CLASSIFICATION_RUBRIC}

CURRENT PAY POLICY (the Match/Adjust/Gap baseline):
{policy_json}

STATUTORY FLOOR for this jurisdiction (the Conflict baseline):
{statute_note}
"""
