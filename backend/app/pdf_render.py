"""Render an uploaded PDF into the `pages` block structure the review viewer consumes.

Per-page plain text via pdfplumber, split into paragraphs on blank lines. The same block
shape the seed data uses, so the frontend has one renderer. Findings locate their
`source_quote` inside these paragraphs to draw the in-place highlight.
"""
from __future__ import annotations


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
