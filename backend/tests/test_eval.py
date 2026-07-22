"""Eval-harness tests — run without an API key against the committed golden fixture."""
import sys
from pathlib import Path

PIPELINE = Path(__file__).resolve().parents[1] / "pipeline"
sys.path.insert(0, str(PIPELINE))

import eval_harness  # noqa: E402

GOLDEN = PIPELINE / "goldenset" / "golden.json"


def test_score_instrument_recall_and_precision():
    expected = {"OT/d": "match", "BH": "match", "Sun/Hol": "match"}
    predicted = {"OT/d": "match", "BH": "match", "Sun/Hol": "adjust"}
    m = eval_harness.score_instrument(expected, predicted)
    assert m["extraction_recall"] == 1.0
    assert m["mapping_precision"] == round(2 / 3, 3)
    assert m["confusion"] == {"match->adjust": 1}


def test_load_golden_fixture():
    golden = eval_harness.load_golden(str(GOLDEN))
    assert len(golden) >= 2
    assert all("expected" in g for g in golden)


def test_score_set_perfect_ceiling():
    golden = eval_harness.load_golden(str(GOLDEN))
    perfect = {g["instrument"]: g["expected"] for g in golden}
    summary = eval_harness.score_set(golden, perfect)
    assert summary["mean_extraction_recall"] == 1.0
    assert summary["mean_mapping_precision"] == 1.0
