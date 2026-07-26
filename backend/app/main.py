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
from fastapi.responses import JSONResponse

from . import models  # noqa: F401 — register tables on Base.metadata
from .config import get_settings
from .db import Base, SessionLocal, engine
from .routers import agent, auth, documents, output, policies, review

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
        from .seed_extra import seed_extra_documents

        db = SessionLocal()
        try:
            seed_if_empty(db, log)
            # Per-document idempotent, so the statutory/state corpus also lands on a database that
            # was seeded by an earlier version — no reset needed to pick up new demo documents.
            seed_extra_documents(db, log)
        finally:
            db.close()
    yield


app = FastAPI(title="LawTrack AI", version="1.0.0", lifespan=lifespan)


# Added *before* CORS so it sits inside it: Starlette's own 500 handler runs outside every user
# middleware, so an unhandled exception would return a response with no CORS headers and the browser
# would report it to the user as a bare "Failed to fetch" instead of the actual reason.
@app.middleware("http")
async def json_errors(request, call_next):
    try:
        return await call_next(request)
    except Exception as e:  # noqa: BLE001 — last-resort: turn any crash into a readable JSON error
        log.exception("unhandled error on %s %s", request.method, request.url.path)
        return JSONResponse({"detail": f"server error: {e}"}, status_code=500)


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
app.include_router(agent.router)
