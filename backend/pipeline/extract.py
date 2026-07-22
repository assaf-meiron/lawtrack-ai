"""② Extract — pull every T&A/pay rule from the document as structured findings, with provenance.

Design constraint (technical-design §②): citations and `output_config.format` can't both be on in one
call. So extraction uses STRICT TOOL USE (compatible with citations) — the model calls `record_finding`
once per rule and fills `source_quote` verbatim. Whether citations co-fire cleanly with tools on real
CCTs is spec §11 Q2; the fallback is a two-pass design (citations text pass → structuring pass).
"""
from __future__ import annotations

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
            "page": {"type": "integer"},
            "rule_summary": {"type": "string", "description": "Plain-language statement of the rule."},
        },
        "required": ["clause_family", "source_quote", "page", "rule_summary"],
        "additionalProperties": False,
    },
}

INSTRUCTION = (
    "Read this labor-rule document — it may be a statute or labor code, a collective/union agreement "
    "(CCT, ACT, CBA, CCN, Tarifvertrag, Award, …), or a reform/amendment. For EVERY clause that "
    "affects time & attendance or pay (overtime, hours bank, Sunday/holiday, night, tolerance, "
    "on-call, breaks/rest, shift scales, absences), call record_finding once — quoting the exact "
    "clause text verbatim in source_quote. Ignore union dues, grievance procedures, and social "
    "clauses. Then stop."
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
    for block in resp.content:
        if block.type == "tool_use" and block.name == "record_finding":
            findings.append(RawFinding(**block.input))
    return findings
