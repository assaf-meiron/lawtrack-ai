"""② Extract — pull every T&A/pay rule from the document as structured findings, with provenance.

Design constraint (technical-design §②): citations and `output_config.format` can't both be on in one
call. So extraction uses STRICT TOOL USE (compatible with citations) — the model calls `record_finding`
once per rule and fills `source_quote` verbatim. Whether citations co-fire cleanly with tools on real
CCTs is spec §11 Q2; the fallback is a two-pass design (citations text pass → structuring pass).
"""
from __future__ import annotations

import sys

import config
from ingest import document_block
from schema import RawFinding

RECORD_FINDING_TOOL = {
    "name": "record_finding",
    "description": "Record ONE time-&-attendance / pay rule found in the document. "
                   "Call once per distinct rule (a single paragraph can hold several).",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {
            "clause_family": {
                "type": "string",
                "enum": ["overtime", "hours_bank", "sunday_holiday", "night", "tolerance",
                         "on_call", "breaks_rest", "shift_scale", "absence"],
            },
            "source_quote": {"type": "string", "description": "Verbatim clause text, source language."},
            "page": {"type": "integer", "description": "1-based PHYSICAL page position in the file "
                                                       "(first page of the PDF = 1). NOT the printed "
                                                       "page number shown on the page."},
            "rule_summary": {"type": "string", "description": "Plain-language statement of the rule."},
        },
        "required": ["clause_family", "source_quote", "page", "rule_summary"],
        "additionalProperties": False,
    },
}

INSTRUCTION = (
    "Read this labor-rule document — it may be a statute or labor code, a collective/union agreement "
    "(CCT, ACT, CBA, CCN, Tarifvertrag, Award, …), or a reform/amendment. For EVERY rule that "
    "affects time & attendance or pay (overtime, hours bank, Sunday/holiday, night, tolerance, "
    "on-call, breaks/rest, shift scales, absences), call record_finding — quoting the exact clause "
    "text verbatim in source_quote. Ignore union dues, grievance procedures, and social clauses.\n\n"
    "SPLIT COMPOUND CLAUSES INTO ATOMIC RULES. One sentence often states several distinct rules; emit "
    "a SEPARATE record_finding for EACH, each with the minimal verbatim quote for that specific rule. "
    "Never merge distinct rates, day-types, or thresholds into one finding. Example — the sentence "
    "\"Nine (9) hours shall constitute a day's work Monday through Friday; all work over nine hours "
    "shall be time and one-half; time and one-half shall be paid for Saturday; double time for Sunday; "
    "forty-five (45) hours shall constitute the regular workweek\" is FIVE findings: (1) standard "
    "workday = 9h, (2) daily overtime 150% after 9h, (3) Saturday rate 150%, (4) Sunday rate 200%, "
    "(5) regular workweek = 45h.\n\n"
    "FLAG, DON'T DROP. If a rule is unclear or appears to conflict with another (e.g. a stated 45h "
    "workweek alongside a 9h/day Mon–Fri schedule that implies 45h), STILL record it and note what is "
    "ambiguous in rule_summary. Never silently omit a rule because you're unsure how it maps. Then stop."
)


def extract_findings(client, file_id: str) -> list[RawFinding]:
    resp = client.beta.messages.create(
        model=config.MODEL_EXTRACT,
        max_tokens=config.MAX_TOKENS_EXTRACT,
        betas=[config.FILES_BETA],
        thinking={"type": "disabled"},  # extraction is mechanical; keep it fast
        tools=[RECORD_FINDING_TOOL],
        messages=[{
            "role": "user",
            "content": [document_block(file_id, cite=True), {"type": "text", "text": INSTRUCTION}],
        }],
    )
    findings = []
    dropped = 0
    for block in resp.content:
        if block.type == "tool_use" and block.name == "record_finding":
            try:
                findings.append(RawFinding(**block.input))
            except Exception:  # noqa: BLE001 — a malformed/partial finding is dropped, never crashes the run
                dropped += 1
    # Guard stop_reason: if we hit the token cap, the last record_finding call was likely truncated
    # (that's what `dropped` usually is) and there may be more findings we never received.
    if resp.stop_reason == "max_tokens":
        print(f"warning: extraction hit max_tokens ({config.MAX_TOKENS_EXTRACT}) — "
              f"{len(findings)} parsed, {dropped} dropped/incomplete; findings may be truncated. "
              f"Consider a higher MAX_TOKENS_EXTRACT or per-clause-family batching.", file=sys.stderr)
    elif dropped:
        print(f"note: dropped {dropped} malformed record_finding call(s); {len(findings)} parsed.", file=sys.stderr)
    return findings
