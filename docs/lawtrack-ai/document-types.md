# LawTrack AI — Document Types to Digest

> **PM step 2 of 3** ([pain points](pain-points.md) → **document types** → [agent plan](agent-plan.md)).
> The map of what LawTrack has to ingest and understand. This is the input side of the pipeline —
> what a PDF *is* determines how we extract, what we compare against, and which mode consumes it.
>
> **Status: first draft, 2026-07-15.** Brazil is grounded (we've run 72 real instruments); other
> jurisdictions are from the `worldwide-calculations/` research. Format/quality claims for real-world
> PDFs are hypotheses to validate ([`market-research.md`](market-research.md), and see the OCR open question).

## The core distinction: three legal layers

LawTrack reads across the same three tiers the calculation flow is organized around
(`worldwide-calculations/README.md`: **country → state → union/CBA**). Every document belongs to one
layer, and the layer determines its **role** in a run:

- **Statute / labor code** — the **floor**. Used as the baseline for 🟣 **Conflict** detection.
- **Collective agreement** — the **layer that changes pay**. The primary thing we read and map.
- **The tenant's current pay policy** — not a document we ingest, but the **comparison baseline** for
  Match/Adjust/Gap (it already encodes the prior agreement — see spec §7).

## The document taxonomy

| # | Type | Layer | Where it comes from | Ingestion mode | v1? |
|--:|:--|:--|:--|:--|:--:|
| 1 | **Collective agreement** — Brazil **CCT** (*Convenção Coletiva*) + **ACT** (*Acordo Coletivo*) | Union/CBA | Uploaded by consultant; monitor via CCT registry (Sistema Mediador) | Both | ✅ **primary** |
| 2 | Collective agreement — **France CCN**, **Germany Tarifvertrag**, **US CBA**, others | Union/CBA | Uploaded; sectoral registries | Both | Phase 2+ |
| 3 | **Statute / labor code** — CLT (BR), LFT (MX), Labour Codes (IN), Code du travail (FR), ArbZG (DE) | Country | Reference corpus (`worldwide-calculations/`) + official sources | Baseline (loaded, not "analyzed" per run) | ✅ (Brazil) |
| 4 | **Amendment / reform in flight** — PEC 6x1, MX 40h phase-in, IN codes, FR/DE 2026 | Country | Legislature / gazette | Monitor | Phase 2 |
| 5 | **Government gazette / official journal** — *Diário Oficial* (BR), etc. | Country | Government publication feeds | Monitor (change detection) | Phase 2 |
| 6 | **Union / CCT registry entry** — Sistema Mediador (BR MTE) | Union/CBA | Government registry | Monitor (renewal detection) | Phase 2 |
| 7 | **Side documents** — side letters, addenda, appendices, minimum-wage schedules, *aditivos* | Union/CBA | Attached to the agreement | Both (with the parent) | ⚠ partial |

> **v1 focuses on type 1 (Brazil CCT/ACT) in manual-upload mode**, compared against a Brazil statutory
> baseline (type 3) and a selected pay-policy template. Types 4–6 are the monitor's inputs (Phase 2).

## What a collective agreement actually looks like (the hard input)

The dominant, hardest input (type 1) has these properties — each is a design constraint:

- **Long legal PDF** — dozens of clauses; typically **only ~5–30% touch T&A/pay**. The rest (union
  dues, grievance, social funds) is ⚠ noise we must *dim, not drop*.
- **Not in English** — Brazil → Portuguese, France → French, etc. **We classify on meaning, not
  language** (the model reads the source language directly; no pre-translation step).
- **Renews (often yearly)** — so "what changed vs the current policy" is the recurring job, not a
  one-time read. There is **no separate "prior CBA" input** — the current policy encodes it (spec §7).
- **Messy formatting** — multi-column layouts, tables (OT-band grids), appendices, side-letters.
  Scanned/image CBAs exist and need OCR-quality handling (open question — see below).
- **Bundled rules** — one clause paragraph routinely sets *several* rules (a daily OT onset *and* a
  night premium), so extraction is at the **finding** grain, not the clause grain.

## What we extract from each — the T&A clause families

Regardless of type, we pull the same rule families (mapped to the 17-capability taxonomy, spec §5):

| Clause family | Examples seen in real CCTs | Maps to (tab) |
|---|---|---|
| **Overtime** | daily phased tiers (+75% first 2h, +100% after), weekly/monthly bands | A · Paid Overtime |
| **Hours bank** | *banco de horas* — cyclical 1:1, comp window, ± caps, expiry→pay | A · Paid Overtime |
| **Sunday / holiday** | worked premium (dobra +100% / CCT %), rest-day rotation | A · Paid Overtime |
| **Night** | *adicional noturno* % + window, prorrogação, reduced hour (52′30″) | B · Hours Distribution |
| **Tolerance** | *tolerância* / minutos residuais on the punch | C · Tolerance |
| **On-call** | *sobreaviso* / *prontidão* | D · On Call |
| **Breaks & rest** | intrajornada netting, 11h interjornada | E · Breaks & rest |
| **Shift scales** | 12×36, semana espanhola | F · Schedule |
| **Absences** | *faltas abonadas* with conditional triggers | G · Absences |

Everything else in the document → ⚪ **Irrelevant**. Money/benefit clauses (bonuses, PLR) → logged as
out-of-T&A-scope, not configured.

## Why the taxonomy is already de-risked

We have run this exact extraction+mapping across **72 real Boticário instruments**
(`brazil-cct-support-matrix.md`) and found **zero hard ❌ gaps** — every rule was ✅ supported today or a
known config/roadmap ⚠️. That portfolio doubles as the **eval golden set** (technical-design §eval), so
"can we read the documents that actually arrive?" is already substantially answered for Brazil.

## Open questions (feed the agent plan + technical design)

- **OCR / scanned PDFs** — what fraction of real incoming CCTs are scanned images vs native text? Sets
  the OCR-quality bar and whether we need a pre-OCR stage before the model.
- **Side-letters & appendices** — are these reliably attached, or arrive separately? Affects completeness.
- **Monitor source coverage** — exactly which registries/gazettes per jurisdiction publish renewals in a
  fetchable form (Sistema Mediador coverage, Diário Oficial structure) → [`agent-plan.md`](agent-plan.md) Phase 2.
- **Language spread** — confirm the language mix in the real pipeline so extraction prompts/evals cover it.
