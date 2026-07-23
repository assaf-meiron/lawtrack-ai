"""Client + model configuration for the LawTrack Phase-1 pipeline.

Models per stage (spec / technical-design): Opus 4.8 for the correctness-critical mapping,
Sonnet 5 for volume extraction, Haiku 4.5 for Phase-2 triage. Pricing ($/1M in/out, current as of
the API reference this was written against): Opus 4.8 $5/$25 · Sonnet 5 $3/$15 · Haiku 4.5 $1/$5.
"""
from __future__ import annotations

import os
import sys

MODEL_MAP = "claude-opus-4-8"        # ③ mapping — correctness matters most
MODEL_EXTRACT = "claude-sonnet-5"    # ② extraction — near-commodity, volume
MODEL_TRANSCRIBE = "claude-sonnet-5" # ②b transcription — vision read of scanned/image-only pages
MODEL_TRIAGE = "claude-haiku-4-5"    # (Phase 2) cheap "did T&A materially change?"

FILES_BETA = "files-api-2025-04-14"

MAX_TOKENS_EXTRACT = 16000  # a clause-dense doc emits many record_finding calls; 8000 truncated mid-call
MAX_TOKENS_MAP = 50000  # large finding batches (45+ findings) need streaming; 16000 truncated mid-json
MAX_TOKENS_TRANSCRIBE = 64000  # a full scanned-doc transcription is long → stream it (avoids HTTP timeout)


def get_client():
    """Return an Anthropic client, or exit with a clear message (this is a scaffold)."""
    try:
        import anthropic
    except ImportError:
        sys.exit("anthropic SDK not installed — run: pip install -r requirements.txt")
    # A bare client also works after `ant auth login`; only warn if nothing is configured.
    if not os.getenv("ANTHROPIC_API_KEY") and not os.getenv("ANTHROPIC_AUTH_TOKEN"):
        print("note: no ANTHROPIC_API_KEY set — relying on an `ant auth login` profile if present.",
              file=sys.stderr)
    return anthropic.Anthropic()
