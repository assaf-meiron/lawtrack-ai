# Golden set — the expert-labelled answer key for the eval harness

The golden set is how we *measure* whether the pipeline reads documents correctly. Each entry is one
real document (a PDF) plus the **correct** classification per capability code, decided by a human
expert. The harness runs the pipeline over each PDF and scores its output against these labels
(extraction recall + mapping precision).

- **`golden.json`** — the **real, growing set** we build together, entry by entry, with sign-off.
  Starts empty; each entry is added only after review.
- **`golden.example.json`** — a small committed *sample* showing the format (also what the tests use).
  Its PDFs are illustrative and not committed. Don't score against this — it's a shape reference.

## Entry shape

```json
{
  "instrument": "CCT Comércio Varejista SP 2026/2027",   // document name
  "pdf": "goldenset/cct_sp_2026.pdf",                     // path (pipeline-relative) to the PDF
  "policy": "br-retail",                                  // comparison baseline (see below)
  "expected": {                                           // the expert answer key
    "OT/d": "adjust",                                     // capability code -> classification
    "Not": "adjust",
    "Intra": "gap",
    "Sun/Hol": "adjust"
  }
}
```

- **Capability codes** are the 17 in `../taxonomy.py` (`CAPABILITY_CODES`): `Jorn, OT/d, OT wk/mo, BH,
  BH->pay, Sun/Hol, Sun-rot, Not, Not-prg, Not-red, Tol, OnCall, Intra, Inter, 12x36, Sem-esp, Abono`.
- **Classifications**: `match` (already equals the policy) · `adjust` (same field, different value) ·
  `gap` (no home in the policy) · `conflict` (diverges from the statutory floor).
- **`policy` (the comparison baseline)** — classification is *relative to a pay policy*: "adjust" means
  "differs from that policy's value". Record which baseline the labels were judged against. A path to a
  policy JSON (e.g. `goldenset/policies/br-retail.json`) is honoured by `--run`; a bare key (e.g.
  `br-retail`) is informational for now. Omit → author mode (empty policy).

## Building an entry (the review workflow)

1. Drop the document's PDF into this directory (`backend/pipeline/goldenset/`).
2. We read the PDF, identify the T&A clauses, and draft the `expected` labels against the chosen
   comparison policy.
3. **Review every label together** before it's committed — the expert call decides `match/adjust/gap/
   conflict`, not the model.
4. Append the signed-off entry to `golden.json`.

## Commands

```bash
cd backend/pipeline

# validate the set (codes valid? classifications valid? PDFs present?)
python eval_harness.py --golden goldenset/golden.json --validate

# score a run: run the real pipeline over the PDFs, then compare to the labels (needs an API key)
python eval_harness.py --golden goldenset/golden.json --run --out preds.json

# score an already-produced predictions file
python eval_harness.py --golden goldenset/golden.json --predictions preds.json
```
