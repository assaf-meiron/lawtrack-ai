"""CLI — chain the Phase-1 digest loop: ingest -> extract -> map -> draft.

Usage:
    python run.py path/to/cct.pdf --policy sample_policy.json --jurisdiction brazil [--out cards.json]

Produces the reviewable change cards (the API output). The guided review surface (Accept/Edit/Reject)
is the mockup's job — this scaffold stops at the cited draft. Nothing auto-applies.
"""
from __future__ import annotations

import argparse
import json
import sys

import config
from draft import build_change_cards, summarize
from extract import extract_findings
from ingest import upload_pdf
from mapping import map_findings

# In a real build this comes from context/worldwide-calculations/<jurisdiction>.md.
STATUTE_NOTES = {
    "brazil": "Brazil CLT floor: daily OT >= +50% (Sunday/holiday dobra +100%); adicional noturno "
              ">= 20% with a reduced 52'30\" night hour; 11h interjornada; first-class DSR. CCTs may "
              "legally derogate — flag divergences as conflict (warn, never block).",
}


def main() -> int:
    ap = argparse.ArgumentParser(description="LawTrack Phase-1 digest loop (reference scaffold).")
    ap.add_argument("pdf", help="Path to the CBA/CCT PDF.")
    ap.add_argument("--policy", help="Path to the current pay policy JSON (the comparison baseline).")
    ap.add_argument("--jurisdiction", default="brazil", help="Statutory-floor jurisdiction key.")
    ap.add_argument("--out", help="Write the change cards to this JSON file.")
    args = ap.parse_args()

    policy_json = "{}  (no policy supplied — author mode: every relevant clause is new)"
    if args.policy:
        with open(args.policy) as fh:
            policy_json = fh.read()
    statute_note = STATUTE_NOTES.get(args.jurisdiction, f"(no statutory note loaded for {args.jurisdiction})")

    client = config.get_client()

    print(f"① ingest   {args.pdf}", file=sys.stderr)
    file_id = upload_pdf(client, args.pdf)

    print("② extract  findings with cited clauses ...", file=sys.stderr)
    raw = extract_findings(client, file_id)
    print(f"   {len(raw)} findings extracted", file=sys.stderr)

    print("③ map      classify + draft config ...", file=sys.stderr)
    mapped = map_findings(client, raw, policy_json, statute_note)

    print("④ draft    change cards", file=sys.stderr)
    cards = build_change_cards(mapped)

    print(f"\nsummary by classification: {summarize(cards)}", file=sys.stderr)

    payload = [c.model_dump() for c in cards]
    if args.out:
        with open(args.out, "w") as fh:
            json.dump(payload, fh, ensure_ascii=False, indent=2)
        print(f"wrote {len(cards)} cards -> {args.out}", file=sys.stderr)
    else:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
