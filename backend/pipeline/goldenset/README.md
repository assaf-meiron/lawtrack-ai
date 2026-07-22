# Golden set — expert-labelled instruments for the eval harness

`golden.json` is a small committed fixture (a few Brazil CCTs) so `eval_harness.py` runs
out of the box. Each entry maps a taxonomy capability code (`taxonomy.py` `CAPABILITIES`)
to the expert classification (`match` / `adjust` / `gap` / `conflict`).

## Run

```bash
cd backend/pipeline
python eval_harness.py --golden goldenset/golden.json                 # validate + summarize
python eval_harness.py --golden goldenset/golden.json --predictions preds.json  # score a run
```

`preds.json` is `{ "<instrument>": { "<capability code>": "<classification>" } }` — produce it
by running the pipeline over each instrument's PDF and reducing findings to one classification
per capability code.

## Expanding to the full 72-instrument set

Generate entries from `context/worldwide-calculations/brazil-cct-support-matrix.md`
(rows → instruments, cells → expected classification per capability code) and drop the
corresponding PDFs in this directory. The scorer already handles any number of instruments.
