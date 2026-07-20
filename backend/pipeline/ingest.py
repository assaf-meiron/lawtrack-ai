"""① Ingest — upload the PDF once via the Files API, reuse the file_id across calls.

The Files API (beta `files-api-2025-04-14`) stores the document so per-clause extraction and any
re-runs during review don't re-send the bytes. The beta flag is required on both the upload and any
messages call that references the file. Scanned/image CCTs (open question) may need a pre-OCR step
before this — the model reads native-text PDFs directly.
"""
from __future__ import annotations

from config import FILES_BETA


def upload_pdf(client, path: str) -> str:
    """Upload a PDF and return its file_id."""
    with open(path, "rb") as fh:
        uploaded = client.beta.files.upload(
            file=(path.split("/")[-1], fh, "application/pdf"),
            betas=[FILES_BETA],
        )
    return uploaded.id


def document_block(file_id: str, cite: bool = True) -> dict:
    """A document content block referencing an uploaded file, citations on by default."""
    block = {"type": "document", "source": {"type": "file", "file_id": file_id}}
    if cite:
        block["citations"] = {"enabled": True}  # page-anchored provenance (spec §4)
    return block
