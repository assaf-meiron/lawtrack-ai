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
    """Render each page of a PDF to `{out_dir}/{page}.png`; return the page numbers rendered.

    The review viewer's Image/Both mode shows these, so a reviewer can check the extracted text —
    or an AI transcription of a scan — against the actual page. Best-effort per page: a page that
    fails to render is skipped, not fatal to the whole document.
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


def rasterize_one_page(path: str, out_dir: Path, page_num: int, dpi: int = 150) -> Path | None:
    """Render a single page to `{out_dir}/{page_num}.png` and return it (None if it can't be rendered).

    Lets the page-image endpoint serve any PDF-backed document lazily — rendering every page of a
    200-page agreement up front would make upload crawl, and most pages are never looked at.
    """
    try:
        import fitz  # PyMuPDF
    except ImportError:
        return None
    try:
        with fitz.open(path) as pdf:
            if page_num < 1 or page_num > pdf.page_count:
                return None
            out_dir.mkdir(parents=True, exist_ok=True)
            dest = out_dir / f"{page_num}.png"
            zoom = dpi / 72
            pdf[page_num - 1].get_pixmap(matrix=fitz.Matrix(zoom, zoom)).save(str(dest))
            return dest
    except Exception:  # noqa: BLE001 — a bad PDF/page just means no image; the viewer degrades
        return None
