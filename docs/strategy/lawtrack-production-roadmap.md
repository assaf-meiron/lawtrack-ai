# LawTrack AI — production roadmap

> This is a **new document**. `lawtrack-roadmap.md` (the flat task inventory) is left untouched per
> your note — you're editing it directly. This file replaces it as the one to use for planning.

## What this document is

This is the **planning pass** — a structured breakdown of what's left before LawTrack AI is a
production product, done *before* handing pieces of it to execution agents to actually build. Once
this breakdown is right, the next step is spinning up agents (via the `Agent`/`Workflow` tools) against
the milestones below — that's a separate step from this document, not something this document does.

Don't confuse this with `agent-plan.md`'s "Phase 1 / Phase 2" — that's a **product** phase split (Phase
1 = the document reader you have today; Phase 2 = an auto-detect monitor, 12–15 more engineer-months,
out of scope here). This document's milestones are a **build-order** split for the reader product only.

## The one-week question, answered directly

You asked for this done by next week, top. Here's the honest breakdown of what that means:

**What can plausibly ship in 7 days**, if you (a) answer the four decisions in Milestone 0 promptly and
(b) run the mechanical work through agents in parallel: a cloud-hosted, single/few-user version of
today's app — Postgres + GCS + Cloud Run, hardened enough not to lose data — with the eval loop
**structurally rebuilt** (scoring what the AI actually produces again) and the capability catalog turned
into code. That is Milestones 1–3 below. Call this **v1-hosted**.

**What cannot compress into a week, regardless of how many agents run in parallel** — because the
constraint is your calendar and outside parties, not engineering throughput:

| Blocking constraint | Where it shows up | Realistic pace |
| :-- | :-- | :-- |
| **Your domain judgment** | Break-field spec (E1), the 11 unverified target fields (E1), the T&A relevance boundary (D9), product decisions (F4) | Hours of focused time each, but they're serial — one decision unblocks the next, they don't parallelize across agents |
| **Expert labelling** | Golden-set answer keys are authored by you, not the model (locked decision, 2026-07-23) | ~1–2 days per instrument; getting from 4 to 25–30 instruments is weeks, not days |
| **Legal / compliance sign-off** | External consultants touching customer CBAs (C10); confirming the 11 support-memo gaps (E8) | Depends on other people's calendars, not yours |
| **Cloud provisioning approvals** | Creating the GCP project, granting billing, approving Terraform applies against real infra | Needs your GCP access at each step; can't be delegated to an agent |

So: **v1-hosted in a week is realistic if you clear Milestone 0 fast. "Full production" — the
Documents-only contributor model live with external consultants, a 25–30 instrument golden set, a
complete capability catalog, measured accuracy — is bounded by weeks of your own labelling and decision
time, not by compute.** The rest of this document sizes both.

---

## Milestone overview

| # | Milestone | Delivers | Gated by | Executor mix | Elapsed (realistic) |
| :-- | :-- | :-- | :-- | :-- | :-- |
| **M0** | Decisions only you can make | Unblocks everything below | Nothing | You | 2–4 focused days, can overlap with M1 |
| **M1** | Engineering hardening | A correct, durable app — still local | Nothing (starts now) | Agents, reviewed by you | 3–5 days wall-clock if parallelized |
| **M2** | Cloud deploy | v1-hosted, live on GCP | M1 (subset), your GCP approvals | Agents author, you approve/apply | 4–6 days, gated by your approval turnaround |
| **M3** | AI foundation rebuild | Eval loop measures reality; capability catalog is code | M0 (D1, E1 decisions) | Agents, once M0 lands | 3–5 days after M0 |
| **M4** | Access & contribution model | Documents-only contributors, external consultants can log in | M1 (router), M0 (C10, C12) | Agents + your legal sign-off | 1–2 weeks (legal is the pace-setter) |
| **M5** | Accuracy improvement | Golden set to ~25–30, measured recall/precision/value-accuracy | M3 | Mostly you (labelling) + agents (harness) | Weeks, ongoing |
| **M6** | Capability model completion | Country-level coverage report, closed support-memo gaps | M3, your expert review | Agents + your review | 1–2 weeks |
| **M7** | Product & ops polish | PRD, metrics, analytics | Nothing blocking | Mixed | Low priority, fits anywhere |

**v1-hosted = M1 + M2 + M3's structural rebuild.** **Full production = all seven.**

---

## Reality check — three things everything else depends on

| # | The finding | Why it matters | What it blocks |
| :-- | :-- | :-- | :-- |
| **1** | **The AI's live output and the accuracy scorer measure two different things.** The mapping prompt (`backend/pipeline/taxonomy.py:107`, `build_mapping_system()`) runs "config-recommendation mode": free-text fields, only `adjust`/`flag`. The scorer (`eval_harness.py`) and the golden set key entirely on the 17-code taxonomy the prompt no longer emits — so a live scoring run comes back empty. | **You cannot currently tell if the AI is good or bad at its job.** Every accuracy claim today is anecdotal. | All of Milestone 3 and 5 — nothing about "AI performance" is real until this is fixed. |
| **2** | **Nothing runs anywhere but a laptop.** The only infrastructure artifact in the repo is `docker-compose.yml` — no Terraform, no CI, no Alembic, no cloud config of any kind. Data lives in a local SQLite file; PDFs live on local disk. | You are the only possible user of the current build, full stop. | All of Milestone 2, and by extension Milestone 4 (no contributors without hosting). |
| **3** | **"What can day.io's engine actually do" exists only as an unfinished draft, not code.** `docs/pay-policy/pay-policy-field-catalog.md` has ~40 supported fields and 11 unsupported ones, but no module reads it, and it has three open questions (break fields called "the main blocker") awaiting your sign-off. | The AI has no machine-readable notion of its own capability boundary — so it cannot reliably tell you "gap" vs "adjust," which is exactly your item 4. | Milestone 3 and 6, and directly the fourth thing you asked about at the start of this project. |

---

## M0 — Decisions only you can make

*Nothing here is engineering work. Each row is a question; the "unblocks" column is why it matters.*

| # | Decision | Question | Unblocks |
| :-- | :-- | :-- | :-- |
| D0-a | **Mapping output contract** | Config-recommendation (today's live mode), the 17-code taxonomy, or the field-catalog vocabulary? Recommendation: the field-catalog — it's the only one that gives precision a real denominator and gap detection a mechanical basis. | M3 entirely |
| D0-b | **Break-field spec** | The product's break-configuration surface isn't documented anywhere in the repo. What are the actual fields (minimum break duration, reduce-to-30 rule, premium if not granted)? Called "the main blocker" in the field catalog. | Turning the catalog into code (M3) |
| D0-c | **The 11 unverified target fields** | Each is tagged "no engine home — confirm?" in the catalog (schedule scales already flipped from unsupported to supported once). Which of the 11 are actually supported today? | Same as above — this *is* your item 4 |
| D0-d | **T&A relevance boundary** | Nothing in the repo defines what counts as "related to time and attendance." Needed so golden-set labels are consistent (wage tables? leave entitlement? travel time?). | Consistent labelling in M5 |
| D0-e | **Contributor visibility** | Do contributors see every document, or only their own? Real question once external consultants are in the building (C10 below). | M4 |
| D0-f | **External-consultant legal posture** | NDA coverage, data retention, whether customer-identifiable CBAs are even eligible for the consultant program. Not an engineering decision — loop in legal. | M4 |
| D0-g | **Multi-tenancy, now or never** | No `tenant_id` exists anywhere. Cheap to add unused today; expensive to retrofit later if this ever goes customer-facing. | Nothing blocks on this, but it's now-or-regret |
| D0-h | **Cloud target specifics** | Isolated GCP project for LawTrack, or inside existing day.io infra (alongside `development-db` / `stg-p14-db`)? | M2 |

---

## M1 — Engineering hardening

*Goal: the existing app is correct and durable, independent of where it runs. All agent-executable;
you review the diffs.*

### Epic: Data integrity
| Task | Notes | Size |
| :-- | :-- | :-- |
| Introduce Alembic | `backend/app/main.py:27` calls `Base.metadata.create_all()` at boot; `README.md:147` already flags this. Baseline migration off current `models.py`, then migrations-only. ⛔ blocks any cloud deploy that must keep data. | 2d |
| Make Postgres the real dev DB | Config default is already Postgres; actual data is SQLite. Reconcile `Enum` types, JSON→`JSONB`, and the dirty-tracking workarounds at `pipeline_adapter.py:64` / `routers/review.py:154`. | 3d |
| Durable background jobs | Analysis runs via FastAPI `BackgroundTasks` (`routers/documents.py:110,229`) — a restart mid-run loses the job silently. Needs a real job record + worker. ⛔ fatal, not cosmetic, once on Cloud Run (scale-to-zero). | 5d |

### Epic: Reliability
| Task | Notes | Size |
| :-- | :-- | :-- |
| Retry/backoff/timeout on every Anthropic call | Four call sites (`extract.py:61`, `transcribe.py:58`, `mapping.py:21`, `pipeline_adapter.py:225`), none retried today. | 2d |
| Structured logging + error reporting | Only `logging.basicConfig` exists. Add correlation IDs + Sentry/Cloud Error Reporting. | 1.5d |

### Epic: Security
| Task | Notes | Size |
| :-- | :-- | :-- |
| Secrets hygiene | `delete_password` hardcodes `"Liranos"` (`config.py:59`); `jwt_secret` defaults to a dev value and only warns. Fail closed outside dev. Rotate the live key in `backend/.env`. | 1d |
| Global auth dependency | Every route re-declares its own auth check — a new route defaults to unauthenticated. Move to router-level. | 0.5d |

### Epic: Frontend baseline
| Task | Notes | Size |
| :-- | :-- | :-- |
| Frontend router | `App.jsx:13` is `useState`-driven — no URLs, no deep links. ⛔ blocks M4 (contributors need shareable document links). | 2d |
| Fix documents N+1 | `DocumentsScreen.jsx:27` fetches every document individually after listing. Fine at 10, not at hundreds. | 1d |
| Frontend test + lint baseline | Zero tests, no ESLint. Vitest + Testing Library on `ReviewScreen`'s accept/edit/reject/finalize flow. | 3d |

### Epic: Code health
| Task | Notes | Size |
| :-- | :-- | :-- |
| Python lint/format/typecheck + lockfile | No ruff/black/mypy, no lockfile anywhere. | 2d |
| Pipeline tests with a mocked Anthropic client | `backend/pipeline/` LLM path is entirely untested today. | 3d |
| De-duplicate drifted definitions | Classifications (3 places), 17 capability codes (2 places), 9 clause families (2 places), statute notes (2 places, inconsistent). | 2d |
| Decide the fate of `prototype/` | Dead-end mockup currently reads as live code. | 0.5d |
| Fix broken doc cross-links | Several docs link to a parent repo never imported, including the taxonomy's stated source of truth (`taxonomy.py:3`). | 1d |

**M1 total ≈ 24 dev-days of work; agent-parallelizable to roughly 3–5 wall-clock days if run as
concurrent workstreams with you reviewing diffs, since almost none of these tasks depend on each other.**

---

## M2 — Cloud deploy (GCP: Cloud Run + Cloud SQL + GCS)

*Goal: v1-hosted, live. Agents author the config; you hold the GCP credentials and approve each apply.*

### Epic: Storage
| Task | Notes | Size |
| :-- | :-- | :-- |
| Object storage for PDFs/pages | Today: local disk (`routers/documents.py:60`, `pdf_render.py::rasterize_pages`) — wiped on every Cloud Run revision. Abstract behind an interface, implement GCS, migrate existing files. ⛔ hard blocker. | 3d |
| Cloud SQL Postgres | Provision, private IP, backups, PITR. Decision D0-h determines isolated vs shared instance. | 2d |
| Secret Manager | Anthropic key, JWT secret, DB password, delete password — rotate the currently-exposed key. | 1d |

### Epic: Compute
| Task | Notes | Size |
| :-- | :-- | :-- |
| Cloud Run — backend | Min-instances needed (LLM calls run minutes; scale-to-zero kills them — depends on M1's durable-jobs task). Harden `backend/Dockerfile`: non-root, multi-stage. | 3d |
| Frontend hosting | `VITE_API_BASE` is baked in at Docker **build** time — decide per-env builds vs runtime config. | 2d |

### Epic: Operability
| Task | Notes | Size |
| :-- | :-- | :-- |
| Infrastructure as code | Terraform for everything above plus IAM. Nothing exists today. | 4d |
| CI/CD | No `.github/` at all. Lint → typecheck → pytest → frontend build/test → images → staging deploy → smoke test → gate → prod. | 3d |
| Environments | Dev / staging / prod with separate DBs, buckets, keys. | 2d |
| Domain, TLS, access boundary | A public URL consultants can reach — IAP vs Cloud Armor vs app-auth-only. | 1.5d |
| Cost controls | Per-document token/cost telemetry, budget alerts, per-user quota — Opus-4.8 mapping isn't cheap and M4 multiplies volume. | 2d |
| Backup/restore drill | Not just backups — a rehearsed restore. Layer configs and version snapshots are the irreplaceable asset. | 1d |
| Uptime/latency monitoring | Alert on 5xx rate and on documents stuck `analyzing`. | 1d |

**M2 total ≈ 25 dev-days; wall-clock 4–6 days if Terraform/CI authoring runs in parallel with M1 and your
GCP approvals don't stall the pipeline.**

---

## M3 — AI foundation rebuild

*Goal: the eval loop measures what the AI actually does, and the capability model is code, not prose.
Gated entirely on M0 (D0-a, D0-b, D0-c).*

### Epic: Close the eval gap
| Task | Notes | Size |
| :-- | :-- | :-- |
| Rewrite `eval_harness.py` around the chosen contract | Current harness reduces a document to `{capability_code: classification}` via a severity-max — throws away everything needed to grade values. New shape: per-clause `{field, value, classification}` with recall/precision/value-accuracy reported separately. | 4d |
| Value-level scoring with an LLM judge | Nothing scores `proposed_value` today. Judge model = **Sonnet 5** (locked 2026-07-23), rubric-driven, validated against your agreement on a sample. This is the core of "every phrase translates to the right rule." | 5d |
| Error taxonomy | Classify every miss: missed clause, hallucinated clause, right clause/wrong field, right field/wrong value, wrongly-guessed, wrongly-flagged. Without this, prompt iteration is guesswork. | 2d |
| Wire eval into CI | Gate merges on regression past a threshold; needs its own Anthropic cost budget. | 2d |

### Epic: Capability model into code
| Task | Notes | Size |
| :-- | :-- | :-- |
| Build `field_catalog.py` | A registry of the ~50 catalog keys — display name, value shape, tab, current/target tag, local-term aliases. Feeds the mapping prompt, the golden-set validator, and the judge. Depends on D0-b/D0-c. | 4d |
| Reconcile the two competing field models | `pay_policy_schema.py::FIELDS` (17 codes) vs. the catalog (~50 keys) — pick one, migrate existing config JSON. | 4d |
| Machine-readable gap detection | A clause mapping to a "target" (no-home) field is a gap **by construction**, not by model judgment — restores the currently-unreachable `gap` classification. | 2d |
| Value-shape validation | Deterministically check `proposed_value` against the field's declared shape (percentage, tiered-rate, time-window, …) before a human ever sees it. | 2d |

**M3 total ≈ 25 dev-days once M0 lands; wall-clock 3–5 days for the mechanical parts, running in
parallel with M1/M2 while D0-a through D0-c are being decided.**

---

## M4 — Access & contribution model

*Goal: Documents-only contributors — day.io staff and external consultants — can use the app without
touching Layers. Gated on M1's router and M0's legal/visibility decisions.*

| Task | Notes | Size |
| :-- | :-- | :-- |
| Roles (`owner` / `contributor`) | No role column exists; enforce **server-side per endpoint**, not just hidden nav. | 3d |
| Gate the Layers screen | Hide in nav + 403 from API; needs the M1 router so a stray deep-link lands sanely. | 1d |
| Invite/onboarding for external consultants | Users exist only via a CLI today; consultants aren't day.io employees, so SSO doesn't cover them. | 4d |
| Document visibility scoping | Depends on D0-e. Needs an `uploaded_by` column — doesn't exist today. | 2d |
| Bulk/multi-file upload | Today's modal is one PDF, mandatory layer. Contributors need "drop 20, triage layer later," since they can't create layers. | 3d |
| Contributor-appropriate upload metadata | Layer optional for contributors; owner assigns it later. | 2d |
| Contribution dashboard | Who uploaded what, decision counts, what's awaiting review. | 2d |
| Capture reviewer corrections as a signal | Already stored (`Finding.final_value`, `review_notes`) but nothing exports it. ⛔ This is what makes M5 scale past your own labelling time. | 3d |
| Audit log | Real append-only log once external parties are in the building. | 2d |
| SSO for day.io staff *(optional)* | Skip if invite-based auth is enough. | 3d |

**M4 total ≈ 25 dev-days of engineering, but the realistic pace-setter is D0-f (legal sign-off) — plan
1–2 weeks, not days, because that part isn't yours to accelerate.**

---

## M5 — Accuracy improvement (ongoing)

*Goal: measured recall, precision, and value accuracy across a real golden set. This is where your
three accuracy goals (don't miss T&A content / don't add noise / translate correctly) get tracked
numbers instead of impressions. Gated on M3.*

| Task | Notes | Size |
| :-- | :-- | :-- |
| Expand the golden set | 4 instruments today — no Brazilian CCT, no French CCN, nothing in Portuguese/Spanish, despite Brazil being the engine's home jurisdiction. Target 25–30. **You author every answer key** (locked decision). | 1–2d per instrument |
| Long-document truncation handling | No chunking exists; a 200-page CBA silently truncates at `MAX_TOKENS_EXTRACT=16000` and looks like a recall failure. | 4d |
| Scanned-PDF fidelity | Vision transcription is entirely unmeasured; add scanned instruments and measure separately. | 4d |
| Compound-clause splitting check | The prompt already instructs this; whether it works is unmeasured and is the likeliest silent recall loss. | 2d |
| More negative controls | Only one exists today. Need 5–8, including *partial* negatives (a 60-page CBA where 4 pages are relevant). | 3d |
| Define the relevance boundary in writing | D0-d — write before expanding the golden set, or two labelling passes will disagree. | 1d |
| Confidence calibration | Check whether "high confidence" findings are actually right more often — prerequisite for ever auto-accepting anything. | 2d |
| Multilingual quote-fidelity check | Verbatim quotes must survive in-language; a paraphrase breaks both the highlight matcher and the audit trail. | 3d |
| Cost/latency per document | Needed to evaluate the Opus-vs-Sonnet mapping tradeoff with real numbers. | 2d |
| Statutory-floor coverage | Only 4 jurisdictions curated today; the 28 support memos are the raw material for the rest. | 5d |
| Feed corrections back into the loop | Mechanism TBD (few-shot, retrieval, or golden-set growth) — start with golden-set growth, it's the only measurable one. | 3d |

**M5 total ≈ 30 dev-days of engineering plus the golden-set labelling itself, which is bounded by your
time (1–2 days per instrument) — this is the one milestone where more agents genuinely do not make it
faster.**

---

## M6 — Capability model completion

*Goal: a complete, verified answer to "what can day.io's engine do, per country." Gated on your review.*

| Task | Notes | Size |
| :-- | :-- | :-- |
| Country-level capability coverage report | Run the 28 structured support memos' requirement rows against the field catalog to get, per country, which requirements have a config home. Directly answers your item 4 at the jurisdiction level, not just per-PDF. | 6d |
| Complete the support-memo set | 26 of 28 countries have blank doc-prep status; 4 are flagged for re-verification. | ongoing |
| Resolve the 18 "engineering must confirm" items | Each either confirms a supported field or promotes it to a gap — feeds directly into E1/D0-c. | 5d |
| Unsupported-calculation backlog → product input | Data already exists (`UnsupportedCalculation` table); nothing aggregates it into a ranked engine-roadmap input yet. | 2d |
| Reconcile the config doc's owner correction | An open contradiction between two sections of the same reference doc, pending your elaboration. | 2d of your time |
| Write back into the live pay-policy system | Currently v1 only exports a change-set. The day.io API is already mapped field-by-field in the config reference — a scope decision, not necessarily v1. | 8d |

**M6 total ≈ 23 dev-days plus your review time on each country; realistic pace 1–2 weeks given the
volume of expert verification involved.**

---

## M7 — Product & ops polish

*Lower priority; fits in whenever there's slack.*

| Task | Notes | Size |
| :-- | :-- | :-- |
| Write the real PRD | Current one is an explicit scaffold; the actual thinking already lives in other docs and can be promoted. | 2d |
| Define + instrument success metrics | Correction rate, time-to-review, documents/week, cost/document — nothing tracked today. | 3d |
| Contributor onboarding material | Matters once M4 ships — decision quality from contributors determines whether M5 gets signal or noise. | 2d |
| Globe data legal confirmation | A "needs legal confirmation" dataset is shown as fact on the login screen. | 1d |
| Misc doc cleanup | Two missing screenshots, market research scaffold (only matters if this goes beyond internal use). | 1d |

---

## Summary

| Track | Dev-days | Realistic wall-clock |
| :-- | --: | :-- |
| M0 — your decisions | — | 2–4 days, overlaps everything |
| M1 — engineering hardening | ~24 | 3–5 days parallelized |
| M2 — cloud deploy | ~25 | 4–6 days, gated by your approvals |
| M3 — AI foundation rebuild | ~25 | 3–5 days once M0 lands |
| M4 — access/contribution | ~25 | 1–2 weeks, legal-gated |
| M5 — accuracy improvement | ~30 + your labelling | weeks, ongoing — labelling is the pace-setter |
| M6 — capability model completion | ~23 + your review | 1–2 weeks |
| M7 — product/ops polish | ~9 | fits anywhere |

**v1-hosted (M1+M2+M3) in a week is achievable if M0 gets answered in the first day or two and cloud
approvals don't stall.** Full production — M4 through M6 — realistically runs several more weeks,
because the pace-setters there are legal review and your own expert labelling, not engineering capacity.
