"""Locating a document's stored PDF.

`Document.file_path` is absolute and recorded by whichever process handled the upload, so it can
point at a root this process can't see — most often a host path written by a local `uvicorn` run and
then read back from inside the container (or vice versa). The blob's filename is the document id,
so `STORAGE/<filename>` recovers it whenever the same storage directory is simply mounted elsewhere.
"""
from __future__ import annotations

from pathlib import Path

from .config import get_settings

STORAGE = Path(get_settings().storage_dir)


def pages_dir(document_id) -> Path:
    """Where a document's rasterized page images live (see `pdf_render.rasterize_pages`)."""
    return STORAGE / f"{document_id}_pages"


def resolve_blob(file_path: str | None) -> Path | None:
    """The stored PDF for `file_path`, or None if it isn't on this filesystem."""
    if not file_path:
        return None
    direct = Path(file_path)
    if direct.exists():
        return direct
    relocated = STORAGE / direct.name
    return relocated if relocated.exists() else None
