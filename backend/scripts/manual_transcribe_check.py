"""Isolated Phase-1 check: detect a scanned PDF, transcribe it via vision, print the result.

Run from backend/ with credentials set:
    .venv/bin/python scripts/test_transcribe.py [/path/to/scanned.pdf]

No DB, no frontend — just the new transcription path. Costs a real (~$2) Claude call.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))            # backend/  -> app.*
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "pipeline"))  # flat pipeline imports

from app.pdf_render import is_scanned_pdf  # noqa: E402
import config, ingest, transcribe  # noqa: E402

pdf = sys.argv[1] if len(sys.argv) > 1 else "/Users/assafmeiron/Downloads/ASAmericaInc_K9785_013120.pdf"

print(f"PDF: {pdf}")
print(f"is_scanned_pdf: {is_scanned_pdf(pdf)}")

client = config.get_client()
file_id = ingest.upload_pdf(client, pdf)
print(f"uploaded file_id: {file_id}")

pages = transcribe.transcribe_pages(client, file_id)
print(f"\ntranscribed {len(pages)} page(s)\n")
for n in sorted(pages)[:3]:
    print(f"--- page {n} ({len(pages[n])} paragraph(s)) ---")
    print("\n".join(pages[n])[:600])
    print()
