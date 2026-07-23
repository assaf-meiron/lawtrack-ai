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
# Keyed by 2-letter jurisdiction prefix; get_statute_note() normalizes full names + golden codes.
STATUTE_NOTES = {
    "br": "Brazil CLT floor: daily OT >= +50% (Sunday/holiday dobra +100%); adicional noturno "
          ">= 20% with a reduced 52'30\" night hour; 11h interjornada; first-class DSR. CCTs may "
          "legally derogate upward — flag ONLY sub-floor divergences as conflict (warn, never block).",
    "de": "Germany floor (ArbZG): 8h/day ordinary (up to 10h with compensation window), 11h daily "
          "rest, Sunday/holiday work restricted; premiums are set by Tarifvertrag, not by statute. "
          "Flag ONLY a clause that falls below this floor as conflict; a clause that meets or exceeds "
          "it is match/adjust, never conflict.",
    "au": "Australia floor (Fair Work Act / NES): 38h ordinary week; rest breaks, overtime and "
          "penalty rates are set by the applicable Modern Award or Enterprise Agreement — there is no "
          "single statutory night/OT percentage. Flag ONLY a clear breach of the NES as conflict.",
}

_JUR_ALIAS = {"brazil": "br", "germany": "de", "australia": "au"}


def get_statute_note(jurisdiction: str) -> str:
    """Resolve a statutory-floor note from a CLI name ('germany') or golden code ('DE', 'US-OR').

    When no floor is loaded for the jurisdiction, return an explicit no-floor instruction so the
    mapping stage does NOT invent a conflict against a floor it cannot see.
    """
    key = (jurisdiction or "").strip().lower()
    key = _JUR_ALIAS.get(key, key[:2])
    return STATUTE_NOTES.get(
        key,
        f"(no statutory floor note loaded for '{jurisdiction}'. Do NOT infer or assume a floor — "
        f"classify these findings as match/adjust/gap only, never conflict.)",
    )


def main() -> int:
    ap = argparse.ArgumentParser(description="LawTrack Phase-1 digest loop (reference scaffold).")
    ap.add_argument("pdf", help="Path to the labor-rule PDF (statute, CCT/CBA/CCN/Tarifvertrag/Award, reform).")
    ap.add_argument("--policy", help="Path to the current pay policy JSON (the comparison baseline).")
    ap.add_argument("--jurisdiction", default="brazil", help="Statutory-floor jurisdiction key.")
    ap.add_argument("--out", help="Write the change cards to this JSON file.")
    args = ap.parse_args()

    policy_json = ("{}  (no policy configured yet — author mode: there is no baseline value for ANY "
                   "capability. Treat each supported capability as a field to configure from scratch → "
                   "adjust; reserve gap for rules the engine cannot represent at all, never for a "
                   "merely-unset field.)")
    if args.policy:
        with open(args.policy) as fh:
            policy_json = fh.read()
    statute_note = get_statute_note(args.jurisdiction)

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
