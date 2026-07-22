"""Eval harness — score pipeline predictions against the expert-labelled golden set.

The golden set (`goldenset/golden.json`) lists instruments, each mapping a taxonomy
capability code (taxonomy.py CAPABILITIES) to the expert classification. A small fixture
ships in this repo; the full 72-instrument set is generated from
`brazil-cct-support-matrix.md` (see `goldenset/README.md`).

Runnable without an API key:
    python eval_harness.py                          # self-test on a hand example
    python eval_harness.py --golden goldenset/golden.json          # validate + summarize the set
    python eval_harness.py --golden goldenset/golden.json --predictions preds.json   # score predictions

Needs an API key + the golden PDFs (the eval bridge — runs the real pipeline end-to-end):
    python eval_harness.py --golden goldenset/golden.json --run [--policy p.json] \
        [--jurisdiction brazil] [--out preds.json]
    # for each instrument with a `pdf`, runs ingest->extract->map, reduces findings to
    # {capability_code: classification}, then scores the predictions against the golden set.

`preds.json` mirrors the golden format (instrument -> {capability_code: classification}).
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from collections import Counter

# Severity rank for reducing several findings on the same capability code to one classification
# (Gap and Conflict carry the most weight — spec §4). Highest rank wins per code.
_SEVERITY = {"gap": 3, "conflict": 2, "adjust": 1, "match": 0}


def score_instrument(expected: dict[str, str], predicted: dict[str, str]) -> dict:
    """expected/predicted: capability_code -> classification. Returns per-instrument metrics."""
    invoked = set(expected)
    surfaced = set(predicted)
    recall = len(invoked & surfaced) / len(invoked) if invoked else 1.0
    overlap = invoked & surfaced
    correct = sum(1 for c in overlap if expected[c] == predicted[c])
    precision = correct / len(surfaced) if surfaced else 1.0
    confusion = Counter(
        (expected[c], predicted[c]) for c in overlap if expected[c] != predicted[c]
    )
    return {
        "extraction_recall": round(recall, 3),
        "mapping_precision": round(precision, 3),
        "missed": sorted(invoked - surfaced),
        "confusion": {f"{e}->{p}": n for (e, p), n in confusion.items()},
    }


def load_golden(path: str) -> list[dict]:
    """Load the golden set: a JSON list of {instrument, expected: {code: classification}}."""
    with open(path, encoding="utf-8") as fh:
        data = json.load(fh)
    if not isinstance(data, list):
        raise ValueError("golden file must be a JSON list of instruments")
    for entry in data:
        if "instrument" not in entry or "expected" not in entry:
            raise ValueError("each golden entry needs 'instrument' and 'expected'")
    return data


def score_set(golden: list[dict], predictions: dict[str, dict[str, str]]) -> dict:
    """Score predictions (instrument -> {code: classification}) against the golden set."""
    per = {}
    recalls, precisions = [], []
    for entry in golden:
        name = entry["instrument"]
        pred = predictions.get(name, {})
        m = score_instrument(entry["expected"], pred)
        per[name] = m
        recalls.append(m["extraction_recall"])
        precisions.append(m["mapping_precision"])
    n = len(golden) or 1
    return {
        "instruments": len(golden),
        "mean_extraction_recall": round(sum(recalls) / n, 3),
        "mean_mapping_precision": round(sum(precisions) / n, 3),
        "per_instrument": per,
    }


def reduce_findings_to_prediction(findings) -> dict[str, str]:
    """Collapse a run's mapped findings to {capability_code: classification}, keeping the
    highest-severity classification when several findings land on the same code."""
    pred: dict[str, str] = {}
    for f in findings:
        code = getattr(f.capability_code, "value", f.capability_code)
        cls = getattr(f.classification, "value", f.classification)
        if code is None:
            continue
        if code not in pred or _SEVERITY.get(cls, -1) > _SEVERITY.get(pred[code], -1):
            pred[code] = cls
    return pred


def run_predictions(golden: list[dict], policy_json: str, jurisdiction: str) -> dict[str, dict[str, str]]:
    """The eval bridge: run the real pipeline (ingest->extract->map) over each golden instrument's
    PDF and reduce to a predictions dict the scorer consumes. Needs credentials + the PDFs present."""
    import config          # flat pipeline imports (same dir)
    import extract
    import ingest
    import mapping
    from run import STATUTE_NOTES  # reuse the CLI's statute-note map

    client = config.get_client()
    statute_note = STATUTE_NOTES.get(jurisdiction, f"(no statutory note loaded for {jurisdiction})")
    predictions: dict[str, dict[str, str]] = {}
    for entry in golden:
        name, pdf = entry["instrument"], entry.get("pdf")
        if not pdf or not os.path.exists(pdf):
            print(f"skip (no PDF): {name}", file=sys.stderr)
            continue
        print(f"run: {name} <- {pdf}", file=sys.stderr)
        file_id = ingest.upload_pdf(client, pdf)
        raw = extract.extract_findings(client, file_id)
        mapped = mapping.map_findings(client, raw, policy_json, statute_note)
        predictions[name] = reduce_findings_to_prediction(mapped.findings)
    return predictions


def main() -> int:
    ap = argparse.ArgumentParser(description="LawTrack eval harness.")
    ap.add_argument("--golden", help="Path to the golden JSON.")
    ap.add_argument("--predictions", help="Path to a predictions JSON (instrument -> {code: class}).")
    ap.add_argument("--run", action="store_true",
                    help="Run the real pipeline over the golden PDFs to produce predictions (needs an API key).")
    ap.add_argument("--policy", help="Comparison pay-policy JSON (default: author mode / empty policy).")
    ap.add_argument("--jurisdiction", default="brazil", help="Statutory-floor jurisdiction key (default brazil).")
    ap.add_argument("--out", help="Write the produced/loaded predictions to this JSON path.")
    args = ap.parse_args()

    if args.run:
        if not args.golden:
            sys.exit("--run requires --golden (it runs the pipeline over each golden instrument's PDF).")
        golden = load_golden(args.golden)
        policy_json = "{}  (author mode — empty policy)"
        if args.policy:
            with open(args.policy, encoding="utf-8") as fh:
                policy_json = fh.read()
        preds = run_predictions(golden, policy_json, args.jurisdiction)
        if args.out:
            with open(args.out, "w", encoding="utf-8") as fh:
                json.dump(preds, fh, ensure_ascii=False, indent=2)
            print(f"wrote predictions -> {args.out}", file=sys.stderr)
        print(json.dumps(score_set(golden, preds), indent=2))
        return 0

    if not args.golden:
        # self-test: no files needed, proves the scorer runs
        expected = {"OT/d": "match", "BH": "match", "Sun/Hol": "match", "Not": "match", "BH->pay": "adjust"}
        predicted = {"OT/d": "match", "BH": "match", "Sun/Hol": "adjust", "Not": "match"}
        print(json.dumps(score_instrument(expected, predicted), indent=2))
        return 0

    golden = load_golden(args.golden)
    if not args.predictions:
        # validate + summarize; score golden-vs-itself as a sanity ceiling
        perfect = {e["instrument"]: e["expected"] for e in golden}
        print(json.dumps(score_set(golden, perfect), indent=2))
        return 0

    with open(args.predictions, encoding="utf-8") as fh:
        preds = json.load(fh)
    print(json.dumps(score_set(golden, preds), indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
