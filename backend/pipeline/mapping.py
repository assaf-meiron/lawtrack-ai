"""③ Map — classify each extracted finding against the policy + statutory floor, draft the config.

This is the product (technical-design §③): Opus 4.8, adaptive thinking (effort defaults to `high` on
Opus 4.8). No citations needed here — the verbatim source_quote is already captured — so we use
structured output (`messages.parse`) for a validated result. The taxonomy + policy + statute context
is a large stable prefix, so we prompt-cache it (1h TTL).
"""
from __future__ import annotations

import json

import config
from schema import MappingResult, RawFinding
from taxonomy import build_mapping_system


def map_findings(client, raw: list[RawFinding], policy_json: str, statute_note: str) -> MappingResult:
    system_text = build_mapping_system(policy_json, statute_note)
    raw_dump = json.dumps([f.model_dump() for f in raw], ensure_ascii=False, indent=2)

    parsed = client.messages.parse(
        model=config.MODEL_MAP,
        max_tokens=config.MAX_TOKENS_MAP,
        thinking={"type": "adaptive"},  # effort defaults to high on Opus 4.8
        system=[{
            "type": "text",
            "text": system_text,
            "cache_control": {"type": "ephemeral", "ttl": "1h"},  # cache taxonomy + policy + statute
        }],
        messages=[{
            "role": "user",
            "content": "Map each extracted finding below. Return one mapped finding per input, in order.\n\n"
                       + raw_dump,
        }],
        output_format=MappingResult,
    )
    return parsed.parsed_output
