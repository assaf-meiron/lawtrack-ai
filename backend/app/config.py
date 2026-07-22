"""Application settings (pydantic-settings). Env vars override every default.

The JWT secret has a dev default so the app boots out of the box; a startup warning
fires if it hasn't been overridden. Set LAWTRACK_JWT_SECRET in any real deployment.
"""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

# Repo root: backend/app/config.py -> app -> backend -> <repo root>
REPO_ROOT = Path(__file__).resolve().parents[2]

DEV_JWT_SECRET = "dev-insecure-change-me"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="LAWTRACK_", env_file=".env", extra="ignore")

    database_url: str = Field(
        default="postgresql+psycopg://lawtrack:lawtrack@localhost:5432/lawtrack"
    )

    # auth
    jwt_secret: str = Field(default=DEV_JWT_SECRET)
    jwt_algorithm: str = Field(default="HS256")
    access_token_expire_minutes: int = Field(default=720)  # 12h

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
