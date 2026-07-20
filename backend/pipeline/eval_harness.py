"""Eval harness — score the pipeline against the 72-instrument golden set (stub).

The Grupo Boticario run (`../../../context/worldwide-calculations/brazil-cct-support-matrix.md`)
classified 72 real instruments across 17 capabilities by experts — a ready-made golden set
(deep-dive #3 calls this a rare luxury). This module defines the scoring; generating the machine-
readable golden file from the matrix is the one TODO.

Golden format (one entry per instrument):
    {
      "instrument": "CCT 3 · SSA 2026-2027",
      "pdf": "goldenset/cct_3.pdf",
      "expected": {                      # per capability code (taxonomy.py CAPABILITIES)
          "OT/d": "match", "BH": "match", "Sun/Hol": "match", "Not": "match", "BH->pay": "adjust"
          # codes absent here == not invoked by this CCT
      }
    }

Metrics:
  - extraction recall   : of capabilities the matrix says the CCT invokes, how many did we surface?
  - mapping precision   : of findings we mapped, how many match the expected classification?
  - per-capability confusion: where does the pipeline systematically mis-map?
"""
from __future__ import annotations

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
    raise NotImplementedError(
        "TODO: generate the golden JSON from brazil-cct-support-matrix.md "
        "(rows -> instruments, cells -> expected classification per capability code)."
    )


if __name__ == "__main__":
    # Smoke test of the scorer on a hand example (no API, no golden file needed).
    expected = {"OT/d": "match", "BH": "match", "Sun/Hol": "match", "Not": "match", "BH->pay": "adjust"}
    predicted = {"OT/d": "match", "BH": "match", "Sun/Hol": "adjust", "Not": "match"}
    print(score_instrument(expected, predicted))
