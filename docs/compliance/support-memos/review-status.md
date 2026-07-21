# T&A support-memo coverage & review tracker

> **What this is.** One place tracking, per country: (1) whether we've built the requirement
> document, and (2) where it stands in external legal review. Paired with the priority order Assaf
> set for the whole portfolio. This file doesn't judge content quality or completeness — see each
> country's own memo for that.

## How to read the status columns

- **Doc built** — a deep `support-memos/<country>.md` **T&A-requirements reference** exists (the
  11-section enhanced-table format; see `_section-template.md`). As of **2026-07-21** every priority
  country has one. Files that previously carried a compliance-verdict memo keep that analysis
  **parked in an appendix** at the bottom; the top of every file is now the regulations reference.
- **Doc prep %** — Assaf's own read on how far along the document-preparation work is, as a
  percentage. Distinct from **Doc built** (whether the repo file exists at all) — this tracks
  completeness/polish from Assaf's side. Not derivable from the repo; defaults to `—` until filled
  in. Edit directly.
- **Consultant found / Consultant reviewing / Final doc** — external-process state only Assaf
  tracks; **not derivable from the repo** and default to unknown (`—`) until filled in. Edit
  directly.

Legend: ✅ done · 🟡 in progress · ⬜ not started · — unknown/not yet tracked.

## Priority #1

| Country | Doc built | Doc prep % | Consultant found | Consultant reviewing | Final doc |
|---|---|---|---|---|---|
| United Kingdom | ✅ [`uk.md`](./uk.md) | — | — | — | — |
| Spain | ✅ [`spain.md`](./spain.md) | — | — | — | — |
| France | ✅ [`france.md`](./france.md) | 60% | — | — | — |
| Singapore | ✅ [`singapore.md`](./singapore.md) *(no verdict appendix)* | — | ✅ | — | — |
| Australia | ✅ [`australia.md`](./australia.md) *(no verdict appendix)* | 40% | ✅ | — | — |
| Canada | ✅ [`canada.md`](./canada.md) | — | — | — | — |
| India | ✅ [`india.md`](./india.md) | — | — | — | — |
| Germany | ✅ [`germany.md`](./germany.md) *(pilot / exemplar)* | — | — | — | — |
| Netherlands | ✅ [`netherlands.md`](./netherlands.md) | — | — | — | — |
| Mexico | ✅ [`mexico.md`](./mexico.md) | — | — | — | — |
| Brazil | ✅ [`brazil.md`](./brazil.md) | — | — | — | — |
| Switzerland | ✅ [`switzerland.md`](./switzerland.md) | — | — | — | — |
| Japan | ✅ [`japan.md`](./japan.md) *(new, from-scratch; no verdict appendix)* | — | — | — | — |

## Priority #2

| Country | Doc built | Doc prep % | Consultant found | Consultant reviewing | Final doc |
|---|---|---|---|---|---|
| Philippines | ✅ [`philippines.md`](./philippines.md) *(new, from-scratch; no verdict appendix)* | — | — | — | — |
| Portugal | ✅ [`portugal.md`](./portugal.md) | — | — | — | — |
| Poland | ✅ [`poland.md`](./poland.md) | — | — | — | — |
| Czech Republic | ✅ [`czech-republic.md`](./czech-republic.md) | — | — | — | — |
| Ireland | ✅ [`ireland.md`](./ireland.md) *(new, from-scratch; no verdict appendix)* | — | — | — | — |
| Slovakia | ✅ [`slovakia.md`](./slovakia.md) | — | — | — | — |
| South Africa | ✅ [`south-africa.md`](./south-africa.md) | — | — | — | — |

## Priority #3

| Country | Doc built | Doc prep % | Consultant found | Consultant reviewing | Final doc |
|---|---|---|---|---|---|
| Italy | ✅ [`italy.md`](./italy.md) | — | — | — | — |
| United States | ✅ [`united-states.md`](./united-states.md) | — | — | — | — |
| United Arab Emirates | ✅ [`united-arab-emirates.md`](./united-arab-emirates.md) | — | ✅ | — | — |
| China | ✅ [`china.md`](./china.md) 🔎 *(thinnest repo seed — recommend re-verify, see below)* | — | — | — | — |
| Israel | ✅ [`israel.md`](./israel.md) *(new, from-scratch; no verdict appendix)* 🔎 | — | — | — | — |
| Sweden | ✅ [`sweden.md`](./sweden.md) *(new, from-scratch; no verdict appendix)* | — | — | — | — |

**Note on Portugal:** the priority list as given had Portugal in both Priority #2 (as "Portogal")
and Priority #3. Confirmed with Assaf (2026-07-21): Portugal is Priority #2; the Priority #3 entry
was the duplicate and has been dropped.

## Researched but not in the current priority list

Two countries have a `support-memos/` file from earlier passes but don't appear in Assaf's priority
list — kept and rebuilt to the same deep format rather than dropped:

| Country | Doc built | Doc prep % | In priority list? |
|---|---|---|---|
| Dominican Republic | ✅ [`dominican-republic.md`](./dominican-republic.md) | — | Not listed — confirm whether to retire, keep as reference, or assign a tier |
| North Macedonia | ✅ [`north-macedonia.md`](./north-macedonia.md) | — | Not listed — confirm whether to retire, keep as reference, or assign a tier |

## Coverage summary

- **26 priority countries + 2 extra (DR, North Macedonia) = 28 deep reference files**, all built and
  **refined to the canonical format** as of **2026-07-21**. Every file has the 11 sections, atomic
  one-proposition-per-row tables, split-by-basis rows, and a linked `Basis` on every citable row.
- **21 files** carry a **parked verdict appendix** (the former compliance memo, preserved verbatim);
  **7 files** have no appendix — Singapore, Australia, Japan, Philippines, Ireland, Israel, Sweden
  (never had verdict content; pure regulations references).
- Consultant-review status (found / reviewing / final): consultants found for **Singapore, Australia,
  United Arab Emirates**; untracked (`—`) for the remaining 25 — start recording here.
- Doc prep % (Assaf's side): **Australia 40%, France 60%**; untracked (`—`) for the rest.

## Format refinement — COMPLETE (2026-07-21)

The canonical row format — **one legal proposition per row** (atomic; no multi-fact cells, no
cross-ref-only rows), **split-by-basis** (each state/award/sector variant with its own legal source
gets its own row — e.g. Australian LSL = 8 state rows, India worked-holiday comp-off = 11 per-regime
rows), and every citable **`Basis` cell linked to its primary source** (statute mirror / regulator /
court) — has been rolled out to **all 28 files**. Spec: [`_section-template.md`](./_section-template.md);
exemplars **Germany** & **Australia**.

Rolled out via a **52-agent author→QC workflow** (26 authors on Sonnet → 26 independent Opus QC
gates): **9 clean pass · 17 pass-with-fixes · 0 fail**. QC fixes included a stale UK week's-pay cap
(£700 → £751 / max £6,008), a garbled Italy night-shift worked example, restored appendix
blockquotes, glossed non-English terms, and added/repaired `Basis` links. India §6 (worked-holiday
comp-off) was split from one 11-state cell into a base row + 11 atomic per-regime rows in a post-run
pass. Note: `everyBasisLinked=false` on several files is **expected and correct** — those are "no
statute exists" rows (the Australia `(no NES provision)` convention), which have no primary source to
link; every citable row *is* linked.

## ⚠ Re-verify list (residual 🔎 items from the 2026-07-21 rollout)

The rollout ran with a live web-search budget, so most figures were freshly checked and every
citable row now links a primary source. Residual items still carrying 🔎 that a human should confirm
before customer-facing use:
- **Israel** — holiday-OT tiers (file cites 250%; some sources give 175%/200%), 5-day daily cap
  (8.6h vs a source's 9h), 42h→40h extension-order sourcing, ~15h/wk General Permit OT cap,
  child-sickness / parent-care day caps, reserve-duty enhancement figures.
- **Sweden** — §6 "11 fixed + moveable holidays" wording vs the 13 named days listed; §3c may omit
  the *allmän mertid* [general additional time] 200h/yr cap (only *extra mertid* 150h/yr stated).
- **Netherlands** — §1 pending-reform reset-gap cited as both 5-yr and 3-yr (both not-yet-law).
- **Czech Republic** — 10-yr working-time-record retention possibly mis-attributed to Act 582/1991
  Sb.; confirm the correct basis before relying on it.
- **Deep-link upgrades (cosmetic, not blocking):** several registers bot-blocked automated fetch
  this pass (Singapore sso.agc.gov.sg, Ontario e-Laws, Québec LégisQuébec, Italy Normattiva, UAE
  MOHRE), so their `Basis` links point to the register base/search page, hedged 🔎; UK/EU case-law
  cites (Matzak, Mencap) could be upgraded to BAILII/EUR-Lex deep links.
