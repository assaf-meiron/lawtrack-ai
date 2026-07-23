"""②b Transcribe — reconstruct readable text for scanned / image-only PDFs.

Native-text PDFs render faithfully from pdfplumber (see app/pdf_render.py); an image-only
CCT has no text layer, so the source viewer would be blank. Here we ask the model to read
the PDF (vision) and transcribe each page into the same {page, blocks:[{kind:'para',
paras:[...]}]} shape the viewer already consumes. Pages built this way are marked
`transcribed` upstream so the UI can badge them as an AI reconstruction — not the verbatim
source. This runs in the background analysis path, reusing the already-uploaded file_id.
"""
from __future__ import annotations

import sys

import config
from ingest import document_block

RECORD_PAGE_TOOL = {
    "name": "record_page",
    "description": "Record the transcribed text of ONE page of the document. Call once per "
                   "page that contains readable text, in page order. Transcribe verbatim; do "
                   "not summarize, translate, correct, or reorder. Skip pages with no readable "
                   "text (blank pages, images only).",
    "strict": True,
    "input_schema": {
        "type": "object",
        "properties": {
            "page": {"type": "integer", "description": "1-based PHYSICAL page position in the file "
                                                       "(first page = 1). NOT the printed page number."},
            "paragraphs": {
                "type": "array",
                "items": {"type": "string"},
                "description": "The page's text as paragraphs, in reading order, verbatim.",
            },
        },
        "required": ["page", "paragraphs"],
        "additionalProperties": False,
    },
}

INSTRUCTION = (
    "This PDF is scanned or image-only — it has no extractable text layer. Read it and "
    "transcribe the text of every page VERBATIM in the source language, calling record_page "
    "once per page. Number pages by PHYSICAL position in the file — the first page is page 1, "
    "the second is page 2, and so on — NOT by any printed page number shown on the page "
    "(cover/front-matter pages are often unnumbered). Preserve wording, numbers, and clause "
    "references exactly; split into paragraphs as they appear on the page. Do not summarize, "
    "translate, correct, or add anything. Skip pages that contain no readable text. Then stop."
)


def transcribe_pages(client, file_id: str) -> dict[int, list[str]]:
    """Return {page_number: [paragraph, ...]} for the pages the model could transcribe.

    Streamed because a long document's transcription can exceed the non-streaming HTTP-timeout
    ceiling. Best-effort: pages the model skips (blank/no-text) or drops on truncation are simply
    absent from the result and stay blank in the viewer.
    """
    with client.beta.messages.stream(
        model=config.MODEL_TRANSCRIBE,
        max_tokens=config.MAX_TOKENS_TRANSCRIBE,
        betas=[config.FILES_BETA],
        thinking={"type": "disabled"},  # mechanical transcription; keep it fast
        tools=[RECORD_PAGE_TOOL],
        messages=[{
            "role": "user",
            "content": [document_block(file_id, cite=False), {"type": "text", "text": INSTRUCTION}],
        }],
    ) as stream:
        resp = stream.get_final_message()

    pages: dict[int, list[str]] = {}
    for block in resp.content:
        if block.type == "tool_use" and block.name == "record_page":
            try:
                page = int(block.input["page"])
                paras = [p.strip() for p in block.input.get("paragraphs", []) if p and p.strip()]
            except Exception:  # noqa: BLE001 — a malformed page is skipped, never crashes the run
                continue
            if paras:
                pages[page] = paras

    if resp.stop_reason == "max_tokens":
        print(f"warning: transcription hit max_tokens ({config.MAX_TOKENS_TRANSCRIBE}) — "
              f"{len(pages)} page(s) transcribed; later pages may be missing.", file=sys.stderr)
    return pages
