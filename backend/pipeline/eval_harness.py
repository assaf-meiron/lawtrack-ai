"""Eval harness — score pipeline predictions against the expert-labelled golden set.

The golden set (`goldenset/golden.json`) lists instruments, each mapping a taxonomy
capability code (taxonomy.py CAPABILITIES) to the expert classification. A small fixture
ships in this repo; the full 72-instrument set is generated from
`brazil-cct-support-matrix.md` (see `goldenset/README.md`).

Runnable without an API key:
    python eval_harness.py                          # self-test on a hand example
    python eval_harness.py --golden goldenset/golden.json          # validate + summarize the set
    python eval_harness.py --golden goldenset/golden.json --predictions preds.json   # score predictions

`preds.json` mirrors the golden format (instrument -> {capability_code: classification}).
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter


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


def main() -> int:
    ap = argparse.ArgumentParser(description="LawTrack eval harness.")
    ap.add_argument("--golden", help="Path to the golden JSON.")
    ap.add_argument("--predictions", help="Path to a predictions JSON (instrument -> {code: class}).")
    args = ap.parse_args()

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
