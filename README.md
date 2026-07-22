# LawTrack AI

Read a labor-rule document (Brazil CCT/ACT, France CCN, Germany Tarifvertrag, a statute), point
at the exact clauses that affect time & pay, map each to the pay-policy capability taxonomy, and
draft the precise config change — **every recommendation traced to the clause that justifies it,
with a human accepting, editing, or rejecting every one.** Ships as a *cited draft for expert
review*, never as auto-configuration.

This repo is the standalone internal tool: a **FastAPI backend** wrapping the Claude-API analysis
pipeline, a **React frontend** for guided review, and **Postgres** as the system of record. See the
product docs under [`docs/lawtrack-ai/`](docs/lawtrack-ai/) (PRD, spec, technical design, productization).

---

## Quick start (Docker)

```bash
docker compose up --build
```

Then open **http://localhost:5173** and sign in with **`demo` / `demo`**.

The database is seeded on first boot with a realistic Brazil-focused dataset — 6 pay policies and
8 documents (CCTs, a reform bill, a reviewed Tarifvertrag) so every screen is populated immediately.

> ⚠️ Before any real use, set a strong `LAWTRACK_JWT_SECRET` and replace the demo login
> (see **Managing users** and **Security** below).

## Quick start (local, no Docker)

**Backend** (Python 3.12, a running Postgres — or point `LAWTRACK_DATABASE_URL` at SQLite for a quick spin):

```bash
cd backend
python -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
export LAWTRACK_DATABASE_URL="postgresql+psycopg://lawtrack:lawtrack@localhost:5432/lawtrack"
export LAWTRACK_JWT_SECRET="$(python -c 'import secrets; print(secrets.token_hex(32))')"
uvicorn app.main:app --reload           # seeds on first run; API at http://localhost:8000
```

**Frontend** (Node 20):

```bash
cd frontend
npm install
npm run dev                              # http://localhost:5173 (proxies to VITE_API_BASE, default :8000)
```

## Managing users

The login list lives in Postgres; manage it with the CLI (run from `backend/`, venv active) — you
never touch a password hash:

```bash
python -m app.manage_users add alice --name "Alice K"   # prompts for a password
python -m app.manage_users passwd alice                 # reset
python -m app.manage_users disable alice                # revoke access
python -m app.manage_users list
```

The signed-in username is recorded as the `reviewer`/`approver` on every Accept/Edit/Reject — that's
the "who" in the audit trail.

## Live pipeline (real PDF analysis)

Seeded documents are pre-analyzed. To analyze a **real** uploaded PDF, the backend needs Anthropic
credentials — set `ANTHROPIC_API_KEY` (or use an `ant auth login` profile). Then **Upload PDF** in the
UI: pick the pay policy to compare against, and the pipeline runs
ingest → extract (cited clauses) → map (Opus 4.8) → change cards. Without credentials the app still
runs fully on the seeded demo data; uploads just report a clear error at analysis time.

Models per stage (see [`backend/pipeline/config.py`](backend/pipeline/config.py)): Opus 4.8 for the
correctness-critical mapping, Sonnet 5 for volume extraction, Haiku 4.5 reserved for Phase-2 triage.

## Tests & eval

```bash
cd backend && . .venv/bin/activate
pip install -r requirements-dev.txt
python -m pytest tests/ -q                                    # API + review-lifecycle tests (SQLite, no key needed)

cd pipeline
python eval_harness.py --golden goldenset/golden.json         # score the golden set (committed fixture)
```

The eval harness scores pipeline predictions (per-capability classification) against expert labels.
A small fixture ships in `pipeline/goldenset/`; expand it toward the 72-instrument Boticário set per
[`goldenset/README.md`](backend/pipeline/goldenset/README.md).

---

## Architecture & provenance chain

```
Upload PDF ─▶ [pipeline: ingest→extract→map] ─▶ Findings ─▶ [guided review] ─▶ approve / edit / reject
 (Files API)         (Claude API)                (persist)      (React UI)              │
                                                                                        ▼
                                                    Rule (normalized) ⊕ ConfigValue (pay-policy)
                                                        both persisted · full provenance
```

Every `ConfigValue` → `Rule` → `Finding` → `Document` + verbatim clause quote + page + approver + date.

| Entity | Role |
| :-- | :-- |
| **User** | Login list (bcrypt-hashed), backs the audit "who". |
| **PayPolicy** | The comparison baseline a document is analyzed against (the second input). |
| **Document** | Raw, unverified inbox; carries the rendered `pages` the review viewer highlights. |
| **Finding** | The pivot — AI proposal (classification · citation · confidence-with-cause) → reviewed. |
| **Rule** | Verified layer 1: normalized, jurisdiction-agnostic capability value. |
| **ConfigValue** | Verified layer 2: the pay-policy projection the engine consumes. |

Classifications: 🟢 Match · 🟡 Adjust · 🔴 Gap · 🟣 Conflict (warn, never block).

## Project layout

```
backend/
  app/            FastAPI app: config, security (JWT+bcrypt), models, routers, pipeline_adapter, seed, manage_users
  pipeline/       Claude-API pipeline (ingest→extract→map→draft), taxonomy, eval_harness + goldenset/
  tests/          pytest suite (SQLite, no credentials required)
frontend/
  src/            React app: api client, auth, Documents / Review (split cited view) / Verified output
docs/lawtrack-ai/ PRD · spec · technical-design · productization · agent-plan
docker-compose.yml
```

## Configuration

All backend settings are env vars with the `LAWTRACK_` prefix (see [`backend/.env.example`](backend/.env.example)):
`LAWTRACK_DATABASE_URL`, `LAWTRACK_JWT_SECRET`, `LAWTRACK_ACCESS_TOKEN_EXPIRE_MINUTES`,
`LAWTRACK_SEED_ON_STARTUP`, `LAWTRACK_CORS_ORIGINS`, `LAWTRACK_STORAGE_DIR`. The frontend reads
`VITE_API_BASE` (default `http://localhost:8000`).

## Deploying to GCP (Cloud Run + Cloud SQL)

Local-first today; the container path is deploy-ready:

1. Build & push both images (`backend/Dockerfile`, `frontend/Dockerfile`) to Artifact Registry.
2. Provision **Cloud SQL Postgres**; point `LAWTRACK_DATABASE_URL` at it (via the Cloud SQL connector/proxy).
3. Deploy the **backend** to Cloud Run with `LAWTRACK_JWT_SECRET` + `ANTHROPIC_API_KEY` from Secret Manager;
   set `LAWTRACK_CORS_ORIGINS` to the frontend URL.
4. Deploy the **frontend** image (built with `VITE_API_BASE` = the backend URL) to Cloud Run.
5. Run `python -m app.manage_users add …` (a one-off Cloud Run job or `gcloud run … exec`) to create real logins.

Schema is created on startup via `create_all`; introduce Alembic before the first schema change that
must preserve production data.

## Security notes

- Change `LAWTRACK_JWT_SECRET` (a boot warning fires while it's the dev default) and delete/disable the
  seeded `demo` user before real use.
- Passwords are bcrypt-hashed; the CLI is the only way to set them.
- Human-in-the-loop is a liability feature: nothing is auto-applied; v1 stores verified output and
  exports a change-set — it does **not** write back into a live pay-policy system.
