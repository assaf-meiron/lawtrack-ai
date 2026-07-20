# LawTrack AI — Phase-1 pipeline (reference scaffold)

> **Reference scaffold, not production.** A runnable skeleton of the **Phase-1 digest loop**
> (ingest → extract → map → draft) from [`../agent-plan.md`](../agent-plan.md), implemented on the
> Claude API exactly as designed in [`../technical-design.md`](../technical-design.md).
>
> **Status:** scaffold, 2026-07-15. It is **structurally complete but not validated** — it needs an
> `ANTHROPIC_API_KEY` and a real CCT PDF to run, and the extraction/mapping prompts want iteration
> against the golden set before anyone trusts the output. **It may graduate to a dedicated engine repo**
> (as the modular track's engine lives in `calculations-v2-poc`, not here) — nothing here assumes it
> stays in the docs repo.

## What it does

The manual-upload digest loop for one document:

```
ingest.py    ①  upload the PDF once via the Files API → file_id
extract.py   ②  pull T&A findings with cited source clauses (strict tool use + citations)
mapping.py   ③  classify each finding Match/Adjust/Gap/Conflict + target field (Opus 4.8, cached taxonomy)
draft.py     ④  assemble the reviewable change cards
run.py           CLI that chains ①–④ and prints/saves the cards
```

Plus: `schema.py` (the findings data model, spec §4), `taxonomy.py` (the 17-capability mapping target
+ the cacheable system context, spec §5), `config.py` (models + client), `eval_harness.py` (scoring
against the 72-instrument golden set — stub).

## Key design choices (see `../technical-design.md` for the why)

- **Citations vs. structured output** — the API rejects citations + `output_config.format` together, so
  **extraction uses strict tool use** (compatible with citations) and **mapping uses structured output**
  (no citations needed there — the verbatim `source_quote` is already captured). Verifying citations
  co-fire with tools on real CCTs is an open item (spec §11 Q2).
- **Models** — extraction: `claude-sonnet-5` (volume); mapping: `claude-opus-4-8` (correctness);
  triage (Phase 2): `claude-haiku-4-5`. Set in `config.py`.
- **Prompt caching** — the taxonomy + policy schema is a large stable prefix, cached with a 1h TTL.
- **HITL** — this produces a *cited draft*; a human Accepts/Edits/Rejects. Nothing auto-applies.

## Run (once you have a key + a PDF)

```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=...   # or `ant auth login`
python run.py path/to/cct.pdf --policy sample_policy.json --jurisdiction brazil
```

Without a key it exits with a clear message — by design (it's a scaffold).

## Not yet built

- The review UI (spec §6) — this scaffold stops at the change cards (the API output); the guided
  one-at-a-time surface is the mockup's job (`../../prototypes/lawtrack-ai/`).
- Scanned-PDF OCR handling (open question).
- Phase-2 monitor (`../agent-plan.md`) — reuses this loop; not in scope here.
- A machine-readable golden set — `eval_harness.py` documents the format to generate from
  `brazil-cct-support-matrix.md`.
