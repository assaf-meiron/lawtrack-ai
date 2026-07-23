"""Canonical pay-policy configuration schema — the target LawTrack translates documents into.

Source of truth: `docs/pay-policy/pay-policy-configuration.md` (the six-tab current-state schema).
LawTrack's job is not just to *read* a document but to translate it into this structured
configuration and diff it against a layer's current config. Only current-UI (`C`-tagged) settings
are modeled for v1.

A config is a **structured six-tab object**: ``{tab: {capability_code: value}}``. Each field is keyed
by its 17-taxonomy capability code (the same key the mapping stage assigns to every Finding via
`capability_code`), so a reviewed finding projects deterministically onto a config field, grouped
under the real pay-policy tab the reviewer edits.
"""
from __future__ import annotations

from typing import Any

# The six pay-policy tabs (pay-policy-configuration.md §1). "Employees" is assignment-only —
# no capability maps onto it — but it's kept so the config shape mirrors the product UI.
TABS: list[str] = [
    "Paid Overtime",
    "Hours Distribution",
    "Tolerance",
    "On Call",
    "Special Rules",
    "Employees",
]

# capability code -> {tab, label, unit}. `unit` is informational (percentage/hours/minutes/months/
# text). The tab is the real pay-policy UI tab where a reviewer edits this setting.
FIELDS: dict[str, dict[str, str]] = {
    "Jorn":     {"tab": "Paid Overtime",      "label": "Standard-hours target (jornada)",        "unit": "hours"},
    "OT/d":     {"tab": "Paid Overtime",      "label": "Daily overtime premium",                 "unit": "percentage"},
    "OT wk/mo": {"tab": "Paid Overtime",      "label": "Weekly/monthly overtime premium",        "unit": "percentage"},
    "BH":       {"tab": "Paid Overtime",      "label": "Banked hours (banco de horas)",          "unit": "text"},
    "BH->pay":  {"tab": "Paid Overtime",      "label": "Bank not compensated → pay / rescission", "unit": "text"},
    "Sun/Hol":  {"tab": "Paid Overtime",      "label": "Sunday/holiday worked premium",          "unit": "percentage"},
    "Sun-rot":  {"tab": "Paid Overtime",      "label": "Rest-day rotation",                      "unit": "text"},
    "Not":      {"tab": "Hours Distribution", "label": "Night premium (adicional noturno)",      "unit": "percentage"},
    "Not-prg":  {"tab": "Hours Distribution", "label": "Night premium prorrogação",              "unit": "text"},
    "Not-red":  {"tab": "Hours Distribution", "label": "Reduced night hour",                     "unit": "text"},
    "Tol":      {"tab": "Tolerance",          "label": "Punch tolerance",                        "unit": "minutes"},
    "OnCall":   {"tab": "On Call",            "label": "On-call / standby compensation",         "unit": "text"},
    "Intra":    {"tab": "Special Rules",      "label": "Intrajornada (meal break)",              "unit": "text"},
    "Inter":    {"tab": "Special Rules",      "label": "Interjornada (min. rest)",               "unit": "hours"},
    "12x36":    {"tab": "Special Rules",      "label": "12×36 shift scale",                      "unit": "text"},
    "Sem-esp":  {"tab": "Special Rules",      "label": "Semana espanhola",                       "unit": "text"},
    "Abono":    {"tab": "Special Rules",      "label": "Faltas abonadas (paid absences)",        "unit": "text"},
}

# The taxonomy groups findings into A–G tabs; map those onto the six real pay-policy UI tabs.
_TAXONOMY_TAB_TO_UI: dict[str, str] = {
    "A": "Paid Overtime",
    "B": "Hours Distribution",
    "C": "Tolerance",
    "D": "On Call",
    "E": "Special Rules",   # breaks & rest — no dedicated UI tab
    "F": "Special Rules",   # schedule / scale
    "G": "Special Rules",   # absences
}


def label_for(code: str) -> str:
    """Human label for a capability code (falls back to the raw code)."""
    field = FIELDS.get(code)
    return field["label"] if field else code


def _ui_tab(code: str | None, taxonomy_tab: str | None) -> str:
    """Resolve the pay-policy tab for a finding: prefer the code's canonical tab, else map the
    taxonomy tab (e.g. 'A · Paid Overtime' -> 'Paid Overtime'), else the Special-Rules catch-all."""
    if code and code in FIELDS:
        return FIELDS[code]["tab"]
    if taxonomy_tab:
        letter = taxonomy_tab.strip()[:1].upper()
        if letter in _TAXONOMY_TAB_TO_UI:
            return _TAXONOMY_TAB_TO_UI[letter]
        for tab in TABS:
            if tab.lower() in taxonomy_tab.lower():
                return tab
    return "Special Rules"


def tab_for(code: str | None, taxonomy_tab: str | None = None) -> str:
    """Public resolver: the pay-policy tab a capability code / finding belongs to."""
    return _ui_tab(code, taxonomy_tab)


def empty_config() -> dict[str, dict[str, Any]]:
    """A blank structured config — every tab present, no fields set."""
    return {tab: {} for tab in TABS}


def normalize(config: dict | None) -> dict[str, dict[str, Any]]:
    """Coerce any stored config into the structured six-tab shape.

    Accepts a legacy flat ``{key: value}`` dict (pre-structured configs) and files each key under
    'Special Rules' so old data still renders; an already-structured config is deep-copied.
    """
    out = empty_config()
    if not config:
        return out
    structured = any(isinstance(v, dict) and k in TABS for k, v in config.items())
    if structured:
        for tab in TABS:
            for code, value in (config.get(tab) or {}).items():
                out[tab][code] = value
        # carry any non-tab keys (defensive) into Special Rules
        for k, v in config.items():
            if k not in TABS and not isinstance(v, dict):
                out["Special Rules"][k] = v
    else:
        for key, value in config.items():
            tab = _ui_tab(key, None)
            out[tab][key] = value
    return out


def set_field(config: dict[str, dict[str, Any]], code: str, value: Any, taxonomy_tab: str | None = None) -> str:
    """Place a value into the structured config under the correct tab, keyed by capability code.
    Returns the tab it landed in. Mutates and returns via `config`."""
    tab = _ui_tab(code, taxonomy_tab)
    config.setdefault(tab, {})[code] = value
    return tab


def iter_fields(config: dict[str, dict[str, Any]]):
    """Yield (tab, code, label, value) across a structured config, in tab order."""
    norm = normalize(config)
    for tab in TABS:
        for code, value in norm[tab].items():
            yield tab, code, label_for(code), value
