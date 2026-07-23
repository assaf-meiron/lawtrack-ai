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
Classify each rule against BOTH the tenant's current pay policy AND the jurisdiction's statutory floor.
Decide in this exact order for every finding:

1. You have already picked a capability_code (one of the 17 engine capabilities). Ask: can that
   capability's SHAPE actually represent this rule's logic?
     • NO  → the rule needs a calculation no capability can express (e.g. a night premium given as a
             roster/shift-loading matrix when the engine only models "% + time window", or an on-call
             scheme with no representable field) → gap. Reserve gap for these shape mismatches only.
     • YES → the engine has a home for this rule, so it is match or adjust — NEVER gap. Go to step 2.
2. Look up that capability in the CURRENT PAY POLICY below:
     • policy sets it to the SAME value the rule requires   → match  (🟢)
     • policy sets it to a DIFFERENT value                  → adjust (🟡)
     • policy has NO entry for this capability yet          → adjust (🟡) — you are configuring a field
       the engine already supports. AN UNSET FIELD IS NOT A GAP.
3. Independently, check conflict — but ONLY promote to conflict (🟣) when BOTH hold:
     (a) the STATUTORY FLOOR below explicitly states a floor/ceiling for THIS capability, AND
     (b) the rule's value actually falls below that floor (or above that ceiling).
   A rule that meets or exceeds the floor is compliant — keep it match/adjust/gap, NOT conflict. If the
   floor note says none is loaded for this jurisdiction, NEVER output conflict — do not infer a floor.
   (Conflict is legal risk — warn, never block.)

- match    (🟢): engine supports it AND policy already equals it.
- adjust   (🟡): engine supports it; you set or change a value (night 20% -> 25%, or fill a field the
                 policy left blank). This is the COMMON case — most mapped rules are adjust.
- gap      (🔴): the engine cannot express this rule at all — a net-new calculation or product change.
                 "Not in the current policy" is adjust, not gap.
- conflict (🟣): diverges from a statutory floor/ceiling — legal risk.

Confidence + its cause on every finding. Set confidence_basis to WHY you are that sure:
explicit_clause (numeric/explicit → high) · inferred_field (had to infer) · ambiguous_wording ·
shaky_extraction · no_direct_field. When unsure, prefer lower confidence and say why — a false
positive is worse than a flagged uncertainty.

FLAG, DON'T GUESS. If a rule is genuinely ambiguous — you cannot tell what value it sets, or it
appears to conflict with another rule (e.g. a stated 45h workweek alongside a 9h/day Mon–Fri
schedule) — do NOT force-fit a confident value and do NOT drop it. Still emit the finding: set
confidence=low, confidence_basis=ambiguous_wording, pick the closest capability_code (or gap if no
capability can represent it), leave proposed_value empty if you truly can't derive it, and state
exactly what is unclear in `rationale` so a human resolves it. A visible flagged uncertainty is the
goal; a silently-guessed number is the failure.
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

    Config-recommendation mode: each extracted rule is normalized into a plain parameter + value
    (or flagged when ambiguous), NOT mapped to the 17-capability taxonomy — the tenant connects
    recommendations to their own capabilities downstream. `policy_json` / `statute_note` are accepted
    for signature compatibility but are intentionally not used as a comparison baseline here.
    (`render_taxonomy` / `CLASSIFICATION_RUBRIC` / `CapabilityCode` remain exported for the eval
    harness, which reconnects to the capability codes.)
    """
    return """You are LawTrack's mapping stage. You receive T&A/pay rules already extracted from a
labor agreement (each with a verbatim source_quote + page). For EACH rule, express it as a normalized
CONFIGURATION RECOMMENDATION — one parameter and the value it should be set to — the way an operator
would configure a time-&-attendance / pay engine. Do NOT map to any predefined capability list; state
the configuration plainly. Return one mapped finding per input, in order.

For each finding, set:
- policy_field    : the parameter being configured, in plain words — e.g. "Daily overtime rate",
                    "Saturday worked rate", "Sunday worked rate", "Regular workweek hours".
- policy_tab      : a short free-text category grouping the parameter — e.g. "Overtime",
                    "Weekend premiums", "Hours", "Night", "Breaks". No fixed vocabulary.
- proposed_value  : the value to set, concise and self-contained — e.g. "150% after 9h/day",
                    "150%", "200%", "45h".
- rule_summary    : one plain line stating the rule as an operator reads it — e.g.
                    "Daily overtime 150% after 9 hours".
- current_value   : leave empty — there is no baseline to compare against in this mode.
- capability_code : leave unset.
- classification  :
    • adjust — a clear configuration recommendation (the common case).
    • flag   — the rule is ambiguous, internally contradictory, or you cannot confidently derive a
               value (e.g. a stated 45h workweek alongside a 9h/day Mon–Fri schedule). Do NOT guess:
               leave proposed_value empty, set confidence=low and confidence_basis=ambiguous_wording,
               and state exactly what is unclear in `rationale` so a human resolves it.
    Use only `adjust` or `flag` in this mode — never match / gap / conflict.
- rationale       : why this configuration follows from the quote — or, for a flag, what is unclear.
- confidence + confidence_basis : your certainty and why. A flagged uncertainty beats a confident
                    wrong value.

Never invent a number you cannot tie to the source_quote. You propose; a human decides.
"""
