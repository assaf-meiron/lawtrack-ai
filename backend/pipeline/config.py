"""Client + model configuration for the LawTrack Phase-1 pipeline.

Models per stage (spec / technical-design): Opus 4.8 for the correctness-critical mapping,
Sonnet 5 for volume extraction, Haiku 4.5 for Phase-2 triage. Pricing ($/1M in/out, current as of
the API reference this was written against): Opus 4.8 $5/$25 · Sonnet 5 $3/$15 · Haiku 4.5 $1/$5.
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

# backend/pipeline/config.py -> pipeline -> backend
_BACKEND_DIR = Path(__file__).resolve().parents[1]


def _load_env_file(path: Path) -> None:
    """Load KEY=VALUE lines from a gitignored .env into os.environ (never overriding existing vars).

    Mirrors app/config.py's loader: pipeline scripts are run standalone (`import config`, not
    `app.config`), so ANTHROPIC_API_KEY in backend/.env would otherwise never reach os.environ
    when the pipeline is invoked outside the FastAPI app.
    """
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, val = line.partition("=")
        key = key.strip()
        val = val.strip().strip('"').strip("'")
        # Fill in over an *empty* existing var too: docker-compose's `KEY: ${KEY:-}` exports an empty
        # string when the shell doesn't have the variable, which setdefault would take as configured.
        if key and val and not os.environ.get(key):
            os.environ[key] = val


_load_env_file(_BACKEND_DIR / ".env")

MODEL_MAP = "claude-opus-4-8"        # ③ mapping — correctness matters most
MODEL_EXTRACT = "claude-sonnet-5"    # ② extraction — near-commodity, volume
MODEL_TRANSCRIBE = "claude-sonnet-5" # ②b transcription — vision read of scanned/image-only pages
MODEL_TRIAGE = "claude-haiku-4-5"    # (Phase 2) cheap "did T&A materially change?"

FILES_BETA = "files-api-2025-04-14"

MAX_TOKENS_EXTRACT = 16000  # a clause-dense doc emits many record_finding calls; 8000 truncated mid-call
MAX_TOKENS_MAP = 50000  # large finding batches (45+ findings) need streaming; 16000 truncated mid-json
MAX_TOKENS_TRANSCRIBE = 64000  # a full scanned-doc transcription is long → stream it (avoids HTTP timeout)


def get_client():
    """Return an Anthropic client, or raise with a clear, actionable message.

    An *empty* ANTHROPIC_API_KEY (what `docker compose`'s `${ANTHROPIC_API_KEY:-}` exports when the
    shell has no key) is treated as unset: it's dropped from the environment so a credentials file
    still gets a chance, and if nothing at all is configured we say so plainly — the SDK's own
    "Could not resolve authentication method" surfaced to reviewers as an unexplained analysis failure.
    """
    try:
        import anthropic
    except ImportError:
        raise RuntimeError("anthropic SDK not installed — run: pip install -r requirements.txt")

    for var in ("ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN"):
        if var in os.environ and not os.environ[var].strip():
            del os.environ[var]

    has_env_creds = bool(os.getenv("ANTHROPIC_API_KEY") or os.getenv("ANTHROPIC_AUTH_TOKEN"))
    if not has_env_creds:
        # A bare client still works off an `ant auth login` profile; only its absence is fatal.
        from pathlib import Path as _Path
        if not (_Path.home() / ".anthropic").exists():
            raise RuntimeError(
                "no Anthropic credentials configured — set ANTHROPIC_API_KEY in backend/.env "
                "(and `docker compose up -d --build backend` so the container picks it up), "
                "or sign in with `ant auth login`."
            )
        print("note: no ANTHROPIC_API_KEY set — relying on an `ant auth login` profile.", file=sys.stderr)
    return anthropic.Anthropic()
