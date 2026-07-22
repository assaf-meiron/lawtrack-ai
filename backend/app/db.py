"""Database engine + session for the LawTrack app.

Postgres via SQLAlchemy 2.0 in production; the URL comes from settings
(`LAWTRACK_DATABASE_URL`). Tests point it at SQLite — `connect_args` is applied
only for SQLite so the same engine code serves both.
"""
from __future__ import annotations

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from .config import get_settings

_settings = get_settings()

_connect_args = {"check_same_thread": False} if _settings.database_url.startswith("sqlite") else {}

engine = create_engine(
    _settings.database_url, echo=False, future=True, connect_args=_connect_args
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


def get_db():
    """FastAPI dependency — one session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
