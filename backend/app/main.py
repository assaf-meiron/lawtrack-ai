"""LawTrack AI — FastAPI entry point.

On startup: create tables (`create_all`; swap for Alembic once there's production data to
preserve), then seed the demo dataset if the DB is empty and seeding is enabled. A loud
warning fires if the JWT secret is still the insecure dev default.
"""
from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models  # noqa: F401 — register tables on Base.metadata
from .config import get_settings
from .db import Base, SessionLocal, engine
from .routers import auth, documents, output, policies, review

logging.basicConfig(level=get_settings().log_level.upper())
log = logging.getLogger("lawtrack")


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    Base.metadata.create_all(bind=engine)

    if settings.jwt_is_dev_default:
        log.warning(
            "LAWTRACK_JWT_SECRET is the insecure dev default — set it before any real deployment."
        )

    if settings.seed_on_startup:
        from .seed import seed_if_empty

        db = SessionLocal()
        try:
            seed_if_empty(db, log)
        finally:
            db.close()
    yield


app = FastAPI(title="LawTrack AI", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


def health():
    return {"status": "ok"}


app.add_api_route("/health", health, tags=["health"])
app.add_api_route("/api/health", health, tags=["health"])

app.include_router(auth.router)
app.include_router(policies.router)
app.include_router(documents.router)
app.include_router(review.router)
app.include_router(output.router)
