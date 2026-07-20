"""LawTrack AI — FastAPI entry point.

For v1 the schema is created on startup via `create_all` (swap for Alembic migrations later).
"""
from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models  # noqa: F401 — register tables on Base.metadata
from .db import Base, engine
from .routers import documents, output, review


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="LawTrack AI", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def health():
    return {"status": "ok"}


app.add_api_route("/health", health, tags=["health"])
app.add_api_route("/api/health", health, tags=["health"])

app.include_router(documents.router)
app.include_router(review.router)
app.include_router(output.router)
