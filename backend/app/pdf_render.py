"""Render an uploaded PDF into the `pages` block structure the review viewer consumes.

Per-page plain text via pdfplumber, split into paragraphs on blank lines. The same block
shape the seed data uses, so the frontend has one renderer. Findings locate their
`source_quote` inside these paragraphs to draw the in-place highlight.
"""
from __future__ import annotations

from pathlib import Path


def render_pdf_pages(path: str) -> list[dict]:
    """Return [{page, blocks:[{kind:'para', paras:[...]}]}]; empty list if extraction fails."""
    try:
        import pdfplumber
    except ImportError:
        return []

    pages: list[dict] = []
    try:
        with pdfplumber.open(path) as pdf:
            for i, page in enumerate(pdf.pages, start=1):
                text = page.extract_text() or ""
                paras = [p.strip() for p in text.split("\n\n") if p.strip()]
                if not paras and text.strip():
                    paras = [text.strip()]
                pages.append({"page": i, "blocks": [{"kind": "para", "paras": paras}]})
    except Exception:  # noqa: BLE001 — a bad PDF should not crash upload; viewer degrades gracefully
        return []
    return pages


def is_scanned_pdf(path: str) -> bool:
    """True if the PDF has pages but no extractable text layer (scanned / image-only).

    Such a document renders blank in the text viewer — `render_pdf_pages` gets the page
    count right but every page's `paras` is empty. The background analyzer transcribes
    these via vision instead (see pipeline/transcribe.py).
    """
    try:
        import pdfplumber
    except ImportError:
        return False
    try:
        with pdfplumber.open(path) as pdf:
            if not pdf.pages:
                return False
            return sum(len(page.chars) for page in pdf.pages) == 0
    except Exception:  # noqa: BLE001 — a bad PDF isn't "scanned"; let normal handling deal with it
        return False


def rasterize_pages(path: str, out_dir: Path, dpi: int = 150) -> list[int]:
    """Render each page of a scanned PDF to `{out_dir}/{page}.png`; return the page numbers rendered.

    Only called for scanned/image-only docs (see `is_scanned_pdf`) — that's the case the review
    viewer needs a page image for, so a reviewer can check a transcription against the actual scan.
    Best-effort per page: a page that fails to render is skipped, not fatal to the whole document.
    """
    try:
        import fitz  # PyMuPDF
    except ImportError:
        return []

    rendered: list[int] = []
    try:
        out_dir.mkdir(parents=True, exist_ok=True)
        zoom = dpi / 72
        matrix = fitz.Matrix(zoom, zoom)
        with fitz.open(path) as pdf:
            for i, page in enumerate(pdf, start=1):
                try:
                    page.get_pixmap(matrix=matrix).save(str(out_dir / f"{i}.png"))
                    rendered.append(i)
                except Exception:  # noqa: BLE001 — skip this page, keep going
                    continue
    except Exception:  # noqa: BLE001 — a bad PDF should not crash upload; image pane degrades gracefully
        return rendered
    return rendered
