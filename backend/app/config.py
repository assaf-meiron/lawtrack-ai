"""Application settings (pydantic-settings). Env vars override every default.

The JWT secret has a dev default so the app boots out of the box; a startup warning
fires if it hasn't been overridden. Set LAWTRACK_JWT_SECRET in any real deployment.
"""
from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

# Repo root: backend/app/config.py -> app -> backend -> <repo root>
REPO_ROOT = Path(__file__).resolve().parents[2]

DEV_JWT_SECRET = "dev-insecure-change-me"


def _load_env_file(path: Path) -> None:
    """Load KEY=VALUE lines from a gitignored .env into os.environ (never overriding existing vars).

    Lets secrets the SDK reads directly — notably ANTHROPIC_API_KEY — live in `backend/.env` instead of
    the process launch command. python-dotenv isn't a dependency, so this is a minimal hand-rolled parse.
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
        if key and val:  # skip empty values so a blank placeholder doesn't set an empty env var
            os.environ.setdefault(key, val)


# Load backend/.env early so ANTHROPIC_API_KEY (and any LAWTRACK_* overrides) are available before the
# Settings below read the environment and before the Anthropic client is constructed at analyze time.
_load_env_file(REPO_ROOT / "backend" / ".env")


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="LAWTRACK_", env_file=".env", extra="ignore")

    database_url: str = Field(
        default="postgresql+psycopg://lawtrack:lawtrack@localhost:5432/lawtrack"
    )

    # auth
    jwt_secret: str = Field(default=DEV_JWT_SECRET)
    jwt_algorithm: str = Field(default="HS256")
    access_token_expire_minutes: int = Field(default=720)  # 12h

    # a shared secret required to delete a document (a lightweight owner-only gate).
    # Default works out of the box; override via LAWTRACK_DELETE_PASSWORD for real security.
    delete_password: str = Field(default="Liranos")

    # CORS (frontend origins)
    cors_origins: list[str] = Field(
        default=["http://localhost:5173", "http://localhost:3000"]
    )

    # storage for uploaded PDF blobs
    storage_dir: str = Field(default=str(REPO_ROOT / "backend" / "storage"))

    # seed the demo dataset on startup if the DB is empty
    seed_on_startup: bool = Field(default=True)

    log_level: str = Field(default="INFO")

    @property
    def jwt_is_dev_default(self) -> bool:
        return self.jwt_secret == DEV_JWT_SECRET


@lru_cache
def get_settings() -> Settings:
    return Settings()
