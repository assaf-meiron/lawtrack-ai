# LawTrack AI — Productization Blueprint

> **Build blueprint, not a PM doc.** How we turn LawTrack from a demo (ephemeral
> [mockup](../prototypes/lawtrack-ai/) + a never-run [pipeline](pipeline/)) into a **shared internal
> tool with a system of record** — real people, real CCTs, real value. Reuses the mockup UI as the
> shell and the pipeline as the brain; adds persistence, the human-verify loop, and hosting.

## Locked decisions (Assaf, this session)

1. **Output = both layers.** The verified output is a **normalized `Rule`** (jurisdiction-agnostic,
   reusable — the worldwide-engine asset) **⊕ a projected `ConfigValue`** (day.io pay-policy shape,
   what the engine consumes). Both persisted, kept in sync.
2. **Standalone internal app, own repo.** DB + wired pipeline + persisted review + internal hosting/auth.
   Not embedded in the product; not a product-os prototype.

## Architecture

```
Upload CCT/law PDF ─▶ [Backend: pipeline brain] ─▶ Findings ─▶ [Review UI] ─▶ approve/correct
   (Files API)          ingest→extract→map            (persist)     (reuse mockup)      │
                                                                                        ▼
                                                             Rule (normalized) ⊕ ConfigValue (pay-policy)
                                                                    both persisted · full provenance
```

- **Frontend** — React (reuse `prototypes/lawtrack-ai/src/app.jsx` split source/gap review as the shell), talking to a real API instead of hard-coded `DOCS`.
- **Backend** — Python **FastAPI** wrapping the existing `pipeline/` (`ingest.py`→`extract.py`→`mapping.py`); adds review + persistence endpoints. Keeps the pipeline reusable (it "may graduate to its own repo" — this *is* that repo).
- **Store** — **Postgres**. **Files API** for PDF ingest (file_id) + blob retention.
- **Auth/hosting** — internal (Google SSO / day.io infra) — later step, not first slice.

## Data model — the provenance chain (your two stores)

The two stores aren't disconnected — one chain, with `Finding` as the pivot carrying the citation from
raw clause → verified value.

`Document (raw, unverified)` → `Finding (AI proposal, cited)` → `[human verify]` → `Rule ⊕ ConfigValue (verified)`

| Entity | Role | Key fields (reuses `pipeline/schema.py`) |
| :-- | :-- | :-- |
| **Document** | store (a): raw, unverified inbox | `id`, `jurisdiction` (country/state/CBA), `doc_type` (CBA·CCT·statute·reform·policy), `source`, `effective_from/to`, `language`, `file_id` (Files API) + blob, `uploaded_by/at`, `status` (new·analyzing·analyzed·reviewed) |
| **Finding** | the pivot: AI proposal → reviewed | = `MappedFinding` (`clause_family`, `source_quote`+`page`, `classification` match/adjust/gap/conflict, `confidence`+`confidence_basis`, `policy_tab`, `policy_field`, `current`/`proposed_value`, `rationale`) **+** `review_status` (proposed·approved·corrected·rejected), `reviewer`, `review_notes`, `final_value`, timestamps |
| **Rule** | store (b) layer 1: normalized, reusable | `id`, `capability` (17-taxonomy code, e.g. `Sun/Hol`), `condition`+`value` (normalized, e.g. `sunday_holiday_premium=100%`), `derived_from` jurisdiction/CBA, `finding_id`, `approver`, `effective_date`, `version` |
| **ConfigValue** | store (b) layer 2: pay-policy projection | `id`, `rule_id` (**the sync link**), `policy_tab` (A–G), `policy_field`, `value`, `effective_date`; provenance via `rule → finding → document` |

- **Both-layers sync:** approving/correcting a `Finding` materializes **both** a `Rule` and its
  `ConfigValue` projection; the `Rule.id ↔ ConfigValue.rule_id` link keeps them consistent, and editing
  one flags the other for re-projection.
- **Provenance is end-to-end:** every `ConfigValue` → `Rule` → `Finding` → `Document` + verbatim clause
  quote + page + approver + date. That audit trail is what makes the output trustworthy (pain-point P4).

## Review lifecycle (the human-verify loop, persisted)

`proposed` → **approve** (value stands) · **correct** (human sets `final_value`) · **reject** (with reason).
Approved/corrected findings materialize `Rule`+`ConfigValue`; rejected are retained (not deleted) with
their reason. Corrections capture the human's value — the future learning signal (out of v1 scope).

## First slice (thin vertical, real value)

Brazil CCT only (we have the golden set + the strongest pipeline). One shared app. Full loop:
**upload real CCT → pipeline extract+map (real Claude) → review in the ported UI → approve/correct →
persist `Rule`+`ConfigValue` → shared documents + verified-config lists.** Target: ~3 implementation
people using it on real CCTs.

**Out of the first slice:** the auto-detect monitor (Phase 2), non-Brazil taxonomy families, and
write-back into the real day.io pay-policy system (v1 stores + exports; no live write-back).

## Build sequence

1. Repo + skeleton (frontend / backend / db; `docker-compose` Postgres).
2. Schema + migrations (the four entities above).
3. Backend: wrap `pipeline/` behind ingest+analyze endpoints; persist `Document` + `Finding`.
4. Review endpoints: approve/correct/reject → materialize `Rule`+`ConfigValue`.
5. Frontend: port the mockup to hit the real API — upload, review, the two stores' lists.
6. Wire the golden-set eval (`pipeline/eval_harness.py` — the flagged TODO) to measure extract/map.
7. Auth + internal hosting.

## Open decisions (need Assaf before scaffolding)

- **Repo home/name** — new standalone GitHub repo in day.io's org, or an existing app repo?
- **Stack confirmation** — React + FastAPI + Postgres (reuses both halves)?
- **Later:** hosting + auth (GCP + Google SSO?); does approved config ever write back into the real
  pay-policy product, or stay in LawTrack's store + export for v1?
