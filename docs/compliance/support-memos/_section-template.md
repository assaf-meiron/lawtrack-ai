# Country memo — section template & authoring spec

> **What this is.** The canonical structure every `support-memos/<country>.md` file follows. The
> goal of these files (as of 2026-07-21) is to be the **single ground-truth reference for a
> country's time-&-attendance *legal requirements*** — grouped by topic, so a compliance advisor
> or engineer can read the whole T&A rule surface of a jurisdiction in one place.
>
> **The compliance-verdict question is parked.** "Can day.io's engine produce this calculation?"
> (the old organizing axis — capability / verdict / basis / severity) is **not** the spine anymore.
> It's preserved, untouched, in a **parked appendix** at the bottom of each file, to be resumed
> only after every country's requirement list is restructured this way.

## The 11 sections (fixed order, same for every country)

Every file uses these exact top-level headings, in this order. If a country has no rules for a
section, keep the heading and write `— none identified in current research —` under it (absence
is information: it tells the reader the section was considered, not forgotten).

1. **Scope, classification & governing sources** — which instruments set the operative numbers
   (statute vs CBA/CCN/convenio; arrangement-as-policy) · jurisdiction routing (federal/provincial,
   regional, free-zone e.g. DIFC/ADGM) · OT-exemptions (managerial, executive, earnings-threshold)
   · work-time regimes (part-time, day-count/hours forfaits, multi-system gates) · protected
   populations (minors, young, pregnant/nursing) · pending / forthcoming reforms.
2. **Working-time definition** — what counts as working time: effective-work definition, travel
   time, on-hand/presence time, cross-midnight split, missing-time/missing-day handling,
   multi-jurisdiction attribution.
3. **Overtime** *(five fixed sub-sections)*
   - **3a. Onset / trigger** — when OT starts: daily threshold · weekly threshold · contractual
     baseline · compound tests.
   - **3b. Rate & bands** — the premium % / multiplier and any tiered bands.
   - **3c. Caps & counters** — daily OT caps and annual/period OT-hour ceilings (the cross-run
     counters).
   - **3d. Averaging & annualisation** — reference-period netting **where it determines OT** (OT
     decided at period close, not per day/week). *Averaging that instead validates a working-time
     limit goes in §4, not here — place each averaging rule by its consequence.*
   - **3e. Composition & stacking** — how premiums combine on one hour (additive vs multiplicative;
     no-pyramiding / de-pyramiding; OT-base pay-element composition).
4. **Rest, breaks & working-time limits** — daily/inter-shift rest · weekly rest & max-consecutive-
   day limits · maximum-hours ceilings & spread-over/amplitude · breaks (meal/rest by hours) ·
   working-time-limit averaging windows (the *validation* kind).
5. **Night & shift work** — night window & premium · night-worker status & caps · day/night shift
   reclassification.
6. **Weekend & public-holiday work** — public-holiday calendar · worked-holiday premium & comp-off
   · Sunday / weekly-rest-day worked premium · holiday-on-rest-day doctrine.
7. **Time banking & time-off-in-lieu** — hours-bank / working-time-account cycles · TOIL / comp-off
   / compensatory-rest ratios · expiry & payout · second/parallel banks.
8. **On-call & standby** — standby availability pay vs activation/call-in · classification
   (restricted/unrestricted; Matzak) · regime caps.
9. **Scheduling & premium pay** — reporting/call-in (show-up) pay · split-shift premium · spread-of-
   hours · predictability / guaranteed-hours pay · lieu-day scheduling (day-off-first) · make-up
   time · alternative/compressed schedules.
10. **Leave & absence** — annual-leave accrual · statutory leaves (sick, maternity, paternity,
    parental, family, carer) · special leaves (time-savings accounts, leave-splitting bonuses,
    solidarity days) · holiday-pay indemnity.
11. **Recordkeeping & tolerance** — recording obligation & retention · typed output · tolerance /
    rounding rules.

## Per-section format — the enhanced table

Under each (sub-)section heading, a **five-column table**:

```
| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **<short bold rule name>** | <exact numbers: thresholds, %s, windows, caps, accrual rates — the concrete values a policy-builder types in> | <a real worked example with numbers, wherever the rule involves a threshold/band/calculation; prefix `Example:`> | <regional / sector / CBA-typical alternatives, worker-regime carve-outs, opt-outs> | <governing statute / article / award / CBA, e.g. `ArbZG §3`, `BUrlG §3`, `CLT art. 59`> |
```

- **One legal proposition per row (atomic).** Do not pack several rules into one cell. If a
  `Values` or `Worked example` cell contains a second distinct rule (a separate proposition, not
  just an illustration of the row's rule), promote it to its own row. A rule keeps *its own* worked
  example with it — that's what the column is for — but a fact that is really a separate rule hiding
  in an example cell gets its own row. Rows must be **self-contained**: never a cross-reference
  ("see §X") as the *only* content; state the rule, then optionally point elsewhere.
- **Split by basis.** Where one rule varies by state / province / award / sector and each variant
  has its **own legal source**, give each variant its **own row** (e.g. long-service leave across 8
  Australian state Acts = 8 rows), not a single row with the variants crammed into one cell.
- **Link the `Basis` to the primary source.** Make the statute/article/award/case in the `Basis`
  cell a **markdown link** to where it can be checked online — the official legislation register or
  a stable statute mirror (e.g. AustLII, Légifrance, gesetze-im-internet.de) for laws; the
  regulator's page for awards/guidance; the court/database for cases. Keep the table at 5 columns
  (the link lives inside `Basis`). Flag 🔎 any deep link you could not verify.
- **Depth is the point.** These files are the ground truth a user **builds a pay policy from** —
  populate the actual values, not just the rule's name. A row with an empty `Values` cell is a
  research gap, not a finished row.
- **`Values`** carries the numbers; **`Worked example`** shows them in action (any rule with a
  number in it gets one); **`Variants`** captures where the number moves (region, sector, CBA,
  regime); **`Basis`** is the governing **law**, never the day.io evidence tag (`[API]`/`[ABS]`…) —
  those live only in the parked appendix.
- **English glosses for every non-English term.** Any term not in English gets a short English
  explanation inline, in brackets, on first use in a section: *Mehrarbeit* [overtime], *Werktag*
  [working day, incl. Saturday], *Zuschlag* [premium/supplement], *forfait jours* [annual days-count
  regime]. The reader must never need outside knowledge to parse a cell.
- **Scope: time & day-events only** — money (%, currency uplifts, tax, gross-to-net) is downstream.
  For "OT +50%" the requirement is *emit the OT-hours event + quantity*; the % is context that
  belongs in `Values`, not a deliverable to compute.
- **Do not invent numbers.** Every value traces to a cited source (repo seed or web). Uncertain →
  keep the hedge (🔎 / "unconfirmed"), don't fabricate a plausible figure.

## The parked appendix (bottom of every file)

Everything that was the old capability/verdict analysis moves here, **verbatim**, under:

```
---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. This is the former verdict-first memo content — kept intact for when we
> resume the "can the engine do this?" question. Not maintained as part of the requirements
> reference above.
```

Under it: the original rule-by-rule table (with its `Our current capability` / `Verdict` / `Basis`
/ evidence columns and original `#` numbers), the gap analysis & severity tables, the "big gaps",
"where it scores well", "verify before telling the customer", and "bottom line" sections — all
unchanged. Keeping the original numbered table intact is also the completeness guarantee: nothing
from the old file is lost, just relocated.

## Header (top of every file)

```
# <Country> — T&A requirements

> **What this is.** The ground-truth reference for <Country>'s time-&-attendance legal
> requirements, grouped by topic — detailed enough to **build a day.io pay policy from**. Scope:
> **time & day-events only** (money is downstream). The day.io compliance-verdict analysis is
> **parked** in the appendix at the bottom.
>
> **Legal sources:** <repo seeds — `support-memos` predecessor + `worldwide-calculations/<c>.md` —
> plus the web sources cited in the Basis column>.
> **Governing-source note:** <one line on whether statute or CBA/regional layer sets the operative
> numbers — expanded in §1>.
```

## Research sources (per country)

Author from **all** of: the predecessor `support-memos/<c>.md` (its parked appendix), the richer
`context/worldwide-calculations/<c>.md` research file (parameter quick-refs, sector examples,
mechanics, edge cases), and **fresh web research** — official statutes / labour-ministry sources
first, then reputable multi-country guides (L&E Global, IUS Laboris, DLA Piper Guide to Going
Global, Papaya, Deel) and local law firms. Prefer primary-law citations in `Basis`; flag anything
unconfirmed 🔎.
