# T&A support memos — deep requirements references (28 countries)

> **⚠ Format changed 2026-07-21 — read this first.** Every `support-memos/<country>.md` file is now
> a **deep T&A-requirements reference** (11 fixed sections, enhanced tables with exact values +
> worked examples + statutory basis; spec in [`_section-template.md`](./_section-template.md)),
> detailed enough to **build a day.io pay policy from**. The **compliance-verdict** analysis (the
> subject of everything below in this README) is **no longer the spine** — it is **parked in an
> appendix** at the bottom of each of the 20 files that had one. So the headline / severity /
> "engineering must confirm" tables **below are historical** — they describe the parked appendix
> content, not the current top-of-file reference. **28 countries** now have a deep file (all 26
> priority + Dominican Republic + North Macedonia); Germany is the exemplar.
>
> **Portfolio status & priority order:** [`review-status.md`](./review-status.md) — per-country
> build/review status, priority tiers, and the ⚠ re-verify list (web-search budget was exhausted
> mid-build, so the later files' fresh fact-checks were thinner — China/Israel most exposed).

**Customer question:** "Which countries do you support?" — read as: *for each country the customer must
comply with, can day.io's engine produce the correct time-&-attendance calculation the law requires?*

**Prepared:** 2026-07-17 (France, Germany, Spain) · **Extended 2026-07-18** to eight (UK, Italy, Netherlands,
Poland, US added) · **Extended 2026-07-19** to **eighteen** (Brazil, Canada, China, Dominican Republic, India,
Mexico, North Macedonia, Portugal, Switzerland, UAE added), same method.

**Batch 1 (8):** [`france.md`](./france.md) · [`germany.md`](./germany.md) · [`uk.md`](./uk.md) ·
[`italy.md`](./italy.md) · [`spain.md`](./spain.md) · [`netherlands.md`](./netherlands.md) ·
[`poland.md`](./poland.md) · [`united-states.md`](./united-states.md).

**Batch 2 (10, 2026-07-19):** [`brazil.md`](./brazil.md) · [`mexico.md`](./mexico.md) ·
[`dominican-republic.md`](./dominican-republic.md) · [`united-arab-emirates.md`](./united-arab-emirates.md) ·
[`india.md`](./india.md) · [`china.md`](./china.md) · [`switzerland.md`](./switzerland.md) ·
[`north-macedonia.md`](./north-macedonia.md) · [`portugal.md`](./portugal.md) · [`canada.md`](./canada.md).

> **Regulations-only memos (2026-07-21):** [`singapore.md`](./singapore.md) · [`australia.md`](./australia.md).
> These are a **different kind of document** from the 18 compliance memos above — they are the **complete
> statutory T&A rule set** for each country (every working-time, overtime, rest, holiday, leave and
> record-keeping rule, with worked examples + legal basis) and deliberately carry **no compliance
> verdict / engine-capability content** — that question is parked pending the section-taxonomy redesign
> tracked in [`review-status.md`](./review-status.md). So they are **not** reflected in the headline,
> severity, or "engineering must confirm" tables below (those are verdict-based).

---

## How to read these memos

**What "support" means here:** a rule is **supported** if the engine can be **configured to produce the
correct time / day-event quantity** the rule requires. Out-of-box vs needs-configuration is graded
separately.

**Scope — time & day-events only.** Money (%, € uplifts, tax, gross-to-net) is **downstream and out of
scope**. For "OT +25%" we assess only that we can emit the *OT-hours event + quantity*; the % is payroll.

**Current state, not roadmap.** We credit only what exists **today**. Capabilities the target design
intends but hasn't shipped are **not** counted as support (this repo is largely a *target-flow* spec —
we deliberately separate the two).

> **Weekly-OT update (2026-07-18):** **weekly overtime** is marked ✅ Supported (basis `[PO]`) per
> product-owner confirmation that it's being delivered — ahead of `[API]/[UI]` visibility. This closes the
> plain **weekly OT trigger** for France, Italy and US-federal. Scope is *the weekly trigger only* — it does
> **not** close the *annual/averaging* counters (FR 220h contingent, IT 250h, PL 150h, ES annualisation) or
> the limit-validation gaps, which remain as marked.

### Verdict key
✅ Supported · 🟡 Configurable (existing levers) · 🟠 Partial (shape exists, material piece missing) ·
❌ Gap (not shipping; design-only) · 🔎 Verify (evidence unclear — confirm before asserting)

### Basis key — *where each verdict comes from* (every row cites one or more)
| Code | Source | Strength |
|---|---|---|
| **[API]** | The real `List Business Rules Groups` payload shape — `pay-policy-configuration.md §15` (2024 sample) | Data-layer ground truth |
| **[UI]** | The 2026-07-08 product screens (`pay-policy-configuration.md` `C` tags, `pay-policy-screens/`) | Current-state, product-observed |
| **[FLD]** | `data-model/fields.md` / `enums.md` — labelled *code-reviewed ground truth* | Code-derived |
| **[ABS]** | **Searched** §15 API payload + `fields.md` + `enums.md` + the UI screens → **not found** | Absence evidence |
| **[DES]** | Design/spec docs (`flow/configuration.md`, `flow/calculation-flow.md`) — *may describe the target, not today* | Weakest; design intent |
| **[LAW]** | The  per-country legal research file (the requirement side) | Requirement, self-labelled "not eng. ground truth" |
| **[PO]** | Product-owner confirmation — a committed capability being delivered (per Assaf, 2026-07-18) | Roadmap / PO directive |
| **[DB]** | Live product database | **⚠ NOT AVAILABLE this pass — see below** |

### ⚠️ Evidence status & the caveats that bound every verdict
- **The live-DB verification pass is blocked.** Both `development-db` and `stg-p14-db` return
  `403 — missing cloudsql.instances.get` (IAM). No verdict below is DB-confirmed. To unblock, an operator
  with access must authenticate (`gcloud auth login` + project/instance grant); then this pass can rerun
  and upgrade `[API]/[UI]` verdicts to `[DB]`.
- **What we DO stand on:** three current-state layers — the product UI screens `[UI]`, the real API
  payload shape `[API]`, and the code-reviewed field reference `[FLD]`. "Supported" verdicts for the core
  (rate rows, tolerance, night, on-call, banked hours, cross-shift interval, holiday calendar) are
  grounded in `[API]`/`[UI]`, **not** design docs. "Gap" verdicts are grounded in `[ABS]` (absent from the
  API payload *and* the field reference *and* the UI).
- **Version drift:** the API sample is **2024**; the UI is **2026-07-08**. So `[ABS]` is strong for
  long-standing/core capabilities but weaker for very recent additions — flagged 🔎 where it matters.
- **`[DES]`-only verdicts** rest on design docs that may describe the *target* flow; treated as weakest
  and flagged.

---

## Headline — the honest answer

> **Batches.** This section's two tables detail **Batch 1** (the first eight — France · Germany · UK · Italy ·
> Spain · Netherlands · Poland · US). **Batch 2** (Brazil · Canada · China · Dominican Republic · India · Mexico ·
> North Macedonia · Portugal · Switzerland · UAE, added 2026-07-19) is in **its own section below** — the honest
> answer and the pattern hold identically across all eighteen.

**We cannot today tell this customer we "support" *full* T&A compliance for any of the eighteen —
out of the box *or* by configuration.** The engine has a strong, genuinely useful **common core**
(all `[API]`/`[UI]`-confirmed): configurable OT rate rows by day-type & day/night, **tiered rates by
hours** (`phases[].limit`), a **holiday calendar** with basic worked-holiday pay, a **night premium**,
**tolerance**, **banked-hours / comp-time-in-lieu**, **on-call**, a **cross-shift (11h) interval**, and a
**paid-absence-include-in-OT** toggle. But each country's *defining* compliance machinery is largely **not
shipping today** (mostly `[ABS]`; **weekly OT** is the 2026-07-18 exception, `[PO]`). Fit sorts into three tiers:

| Country | Fit | Core things NOT shipping today |
|---|---|---|
| **Germany** | 🟠 Partial — **best-fit tier** (no statutory OT premium) | ArbZG limit-*validation* (daily/weekly caps, 6-mo averaging) · 11h rest **make-up** · Sunday prohibition + "≥15 free Sundays/yr" counter · SV counters (Werkstudent 20h, 6-wk sick pay, Urlaub accrual) |
| **United Kingdom** | 🟠 Partial — **best-fit tier** (no statutory premium) | 48h rolling-17-wk average · night 8h avg/absolute · weekly rest · 5.6-wk + **12.07%** leave accrual · minor profile · ERA-2025 guaranteed-hours (forthcoming) |
| **Netherlands** | 🟠 Partial — **best-fit tier** (no statutory premium) | 12h/60h peaks + **two** averaging windows (55h/4wk + 48h/16wk) · night limits · **two-tier leave expiry** · WAB min-3h call-out / advance-notice · regime-specific on-call caps |
| **Italy** | 🟠 Partial — **premium-emission fits** (CCNL-as-policy) | 250h/yr counter · 48h-over-4-mo validation · *festività soppresse* + **ROL** accrual · part-time regime · *dirigenti* exemption *(weekly OT trigger now ✅)* |
| **United States** | 🟠 Partial — **mixed** (now incl. federal weekly-40) | Exempt/non-exempt **classification gate** · CA meal/rest/reporting/split-shift + NY spread-of-hours + NYC predictability pay · comp-time 240/480 caps · 8/80 & §7(k) work periods *(federal/NY/TX weekly-40 trigger now ✅)* |
| **Poland** | 🟠 Partial — **daily premiums fit** (statutory +50/+100) | Average-weekly-norm OT trigger · **day-off-in-lieu-first** windows + 1-Sunday-in-4 · 150h annual counter · **Art. 130 §2** Saturday-holiday norm reduction · night-worker status · leave ladder |
| **France** | 🟠 Partial — **no Critical gaps** | 220h annual *contingent* counter · annualisation (1607h) · *forfait jours* · *cadre dirigeant* gate · *heures complémentaires* *(weekly Monday-anchored OT trigger now ✅)* |
| **Spain** | 🟠 Partial — **weakest fit** (annualised OT) | Annualised OT + *bolsa* + 80h cap + two banks · night-worker OT ban · holiday-on-rest-day doctrine · *horas complementarias* · presence bucket · base-vs-overlay stacking · *registro de jornada* decree |

**The pattern (all eight):** we compute *configurable pay premiums per day/hour type* well — so the closer a
country's OT is to a **per-day** rule, the better we fit (Germany/UK/NL need no OT premium at all; the US's
**daily-OT states**, Poland's **daily-norm** premiums, and Italy's **maggiorazione** bands all map onto our
rate rows). **With weekly OT now supported (2026-07-18)** the plain **weekly trigger** (France, Italy,
US-federal/NY/TX) is covered too; fit still collapses at **annualised / averaging** accumulation (Spain,
France annualisation, Poland's average-weekly-norm, DE/UK/NL averaging windows). The gaps cluster in six areas none
of these countries can do without — (1) **OT trigger basis** (weekly / annualised, not per-day surplus),
(2) **running statutory caps with cross-run counters**, (3) **rest-period & working-time-limit *validation***
(flagging breaches) **and statutory-leave accrual**, (4) **worker-regime gating** (part-time / day-count /
exempt / night-worker — and, for the US, the **exempt/non-exempt classification gate** that decides whether
to calculate at all), (5) **premium stacking / overlay** composition, and (6) **lieu-scheduling** (day-off-in-lieu
windows, reporting/predictability pay) synthesized as typed events.

## Severity at a glance — Batch 1 (the first eight)

Each memo now carries a **Gap analysis — mitigation & severity** table scoring every non-supported rule as
**Prevalence × Build-effort** (see any memo's intro for the scale + caveats). Counts below are calibrated to
one shared rubric; equivalent gaps get equivalent severities across countries (an annual counter → M/High
everywhere, a limit-flag → S/Medium, an exempt flag → S/Low, etc.).

| Country | 🔴 Crit | 🟠 High | 🟡 Med | 🟢 Low | The gaps that dominate |
|---|--:|--:|--:|--:|---|
| **Germany** | 0 | 0 | 9 | 5 | ArbZG limit-validation + SV counters — all **non-pay-corrupting** |
| **UK** | 0 | 0 | 6 | 5 | 48h-17wk averaging + statutory-leave accrual — **non-corrupting** |
| **Netherlands** | 0 | 1 | 9 | 4 | WAB min-3h call-out pay (the one pay-corrupting gap); rest limit-validation + leave ledger |
| **Italy** | 0 | 2 | 6 | 6 | 250h annual counter · part-time regime |
| **Poland** | 0 | 3 | 7 | 6 | lieu-scheduling windows · ≥1-Sunday-in-4 counter · 150h annual counter |
| **France** | 0 | 5 | 7 | 13 | forfait jours · contingent 220h · annualisation · heures complémentaires · forfait annuel en heures (1607h) |
| **United States** | 0 | 4 | 8 | 6 | exempt/non-exempt classification · CA penalty hours (meal/rest/reporting) |
| **Spain** | **1** | 7 | 8 | 5 | **annualised OT (Critical)** · 80h cap · bolsa/2nd-bank · part-time · night-worker · base-vs-overlay |

**How to read the spread:** the no-statutory-premium countries (**DE/UK/NL**) carry **0 Critical / 0–1 High**
— their gaps are limit-validation and leave-accrual that don't corrupt computed pay. The premium-emission
fits (**IT/PL/FR/US**) sit at **0 Critical** now that weekly OT is supported, with High gaps concentrated in
**cross-run counters + regime gating**. **Spain is the lone Critical** — its OT determination is *annualised*
and genuinely unbuilt, with no mitigation. Severity is **customer-relative**: a cadre-heavy French customer
lifts forfait jours to Critical; a CA-heavy US customer lifts penalty hours; see each memo's caveat.

---

## Batch 2 (2026-07-19) — ten further countries

**Same method, same headline.** Ten more countries assessed against the same current-state engine surface and
the same rubric. **Every one lands 🟠 Partial with 0 Critical** — reinforcing the batch-1 finding: we compute
*configurable pay premiums per day/hour type* well, so the closer a country's OT is to a **per-day or plain
weekly** rule, the better we fit. The statutory-premium and daily/weekly-OT countries (Brazil, Mexico, DR, UAE,
India, North Macedonia, Portugal, China's standard system) map their premiums straight onto our **OT rate rows
× day/night split × `phases[].limit` rate-chaining × the now-supported weekly trigger**; Switzerland and Canada
are contract-premium / patchwork hybrids that still anchor OT to the contractual/planned week (a good fit). **No
Batch-2 country hits Critical** because none shares Spain's *annualised OT determination* problem — **Spain
remains the lone Critical across all eighteen.** Gaps cluster in the same six families as Batch 1: (1) cross-run
**YTD counters** (annual OT caps, Portugal's 100h doubling, NMK's 190h + 150-hour bonus, Swiss Überzeit 170h/140h),
(2) **reference-period averaging** (China comprehensive-hours, Portugal *adaptabilidade*, Canada averaging
agreements, NMK *prerasporeduvanje*), (3) **limit-*validation*** (daily/weekly caps, rest, spread-over), (4)
**worker-regime gating** (China's three working-hour systems, exempt roles), (5) **premium-composition mode**
(Mexico & DR multiplicative/additive stacking), and (6) **lieu-scheduling** (worked-holiday comp-off, reporting/
call-in pay). **Brazil is the portfolio's strongest fit** — the engine's home jurisdiction, whose daily-OT model
*is* the engine's model; its residual gaps are Brazil-specific niche mechanics.

| Country | Fit | Core things NOT shipping today |
|---|---|---|
| **Brazil** | 🟠 Partial — **portfolio's strongest fit** (engine's home jurisdiction; daily-OT model *is* the engine) | *hora noturna reduzida* (52′30″ night hour) · *intrajornada* break-suppression penalty · worked-holiday *folga* election · 12×36 suppression · *férias* accrual |
| **Mexico** | 🟠 Partial — **premium-emission fit** (2×/3× weekly-band OT rides rate rows) | additive premium-composition mode · shift-type (*diurna/nocturna/mixta*) reclassification · *vacaciones* ladder · OT-legality cap (3h/day · 3×/wk) validation |
| **UAE** | 🟠 Partial — **best-fit tier** (tiered +25%/+50% day/night OT = rate rows; 0 High) | 2h/day + 144h/3-wk OT-cap validation · Ramadan −2h reshape · day-off-in-lieu synthesis · leave ledgers · mainland/DIFC/ADGM regime split |
| **Dominican Republic** | 🟠 Partial — **cleanest premium fit** (tiered weekly OT +35%→+100% = rate-chaining × weekly trigger) | multiplicative night×OT composition · day/night 3h reclassifier · night 6h/36h caps · rest-day comp-off election |
| **India** | 🟠 Partial — **premium fit + state patchwork** (statutory 2× OT rides rate rows) | OT quarterly cap (state-varying counter) · spread-over 10.5h validation · worked-holiday comp-off · leave-accrual ledger · Central/State/2020-Codes regime |
| **China** | 🟠 Partial — **statutory premiums fit; the regime axis is the gap** (150/200/300% ride rate rows) | three-regime gate (standard/comprehensive/flexible) · comprehensive-system cycle-averaging · 36h/month + 3h/day cap validation |
| **Switzerland** | 🟠 Partial — **contract-premium + statutory-cap hybrid** (contractual OT + time-off-in-lieu fit) | Überzeit annual caps 170h/140h · office 60h/yr premium onset · weekly-max 45h/50h validation · leave ledger |
| **North Macedonia** | 🟠 Partial — **GCA premium fit** (additive +35/+50 ride rate rows) | redistribution/averaging (*prerasporeduvanje*) · OT 190h/yr cap counter · 150-hour annual bonus (compound YTD trigger) · night-worker 4-mo cap |
| **Portugal** | 🟠 Partial — **statutory-premium fit** (first-hour tier = rate-chaining; *banco de horas* = banked hours) | 100h annual doubling counter · annual OT cap 150/175/200h · *adaptabilidade* averaging · 48h reference-period average |
| **Canada** | 🟠 Partial — **mixed patchwork** (daily-OT provinces + BC double-time fit strongly) | averaging agreements · stat-holiday-pay averaging · reporting/call-in 3h pay · daily×weekly de-pyramiding · federal/13-province split |

### Severity at a glance — Batch 2

Same rubric as Batch 1 (Prevalence × Build-effort; equivalent gaps scored equivalently across all countries).

| Country | 🔴 Crit | 🟠 High | 🟡 Med | 🟢 Low | The gaps that dominate |
|---|--:|--:|--:|--:|---|
| **Mexico** | 0 | 0 | 7 | 6 | additive premium-composition · shift-type reclassification · *vacaciones* ladder |
| **UAE** | 0 | 0 | 7 | 5 | limit-validation (2h/day · 144h/3wk) · Ramadan reshape · leave ledgers |
| **Dominican Republic** | 0 | 1 | 5 | 4 | multiplicative night×OT composition (the one pay-shaping gap) |
| **India** | 0 | 1 | 5 | 4 | OT quarterly cap counter (state-varying) |
| **China** | 0 | 2 | 4 | 2 | three-regime gate · comprehensive cycle-averaging |
| **Switzerland** | 0 | 2 | 6 | 5 | Überzeit annual caps 170h/140h · office 60h/yr onset |
| **Brazil** | 0 | 2 | 6 | 4 | *hora noturna reduzida* · *intrajornada* suppression penalty |
| **North Macedonia** | 0 | 3 | 4 | 5 | *prerasporeduvanje* averaging · 190h/yr cap · 150-hour bonus |
| **Portugal** | 0 | 3 | 6 | 5 | 100h annual doubling · annual OT cap · *adaptabilidade* averaging |
| **Canada** | 0 | 3 | 4 | 8 | averaging agreements · stat-holiday-pay averaging · reporting pay |

**How to read the spread:** the 0-High countries (**Mexico, UAE**) are the mildest gap profiles — every gap is
premium-composition, limit-validation, or a leave ledger, none corrupting computed pay. The 1–2-High tier (**DR,
India, China, Switzerland, Brazil**) concentrates its Highs in a single pay-shaping gap or a pair of cross-run
counters / regime axes. The 3-High tier (**North Macedonia, Portugal, Canada**) carries the densest cross-run
counter + averaging load. **All at 0 Critical** — severity is customer-relative (a comprehensive-hours-heavy
Chinese customer, an *adaptabilidade* Portuguese customer, or an oil-&-gas Canadian customer each lifts an
averaging gap toward Critical; see each memo's caveat).

## Consolidated "engineering must confirm" list (the 🔎 items across the portfolio)

> Items 1–12 are the Batch-1 🔎 list; Batch-2 additions follow at 13–18.
1. **`crossShiftsInterval`** — the field is `[API]`-confirmed (`interval`, default 660min=11h), but what it
   *does* mechanically (reshape next shift? flag only? compliance-validate?) is unconfirmed; and it's a
   single daily threshold, **not** weekly-rest accumulation (FR 35h / ES 1.5d-over-14d).
2. **Germany night window** — research says ~20:00–06:00 (Tarif); the draft matrix used 23:00–06:00.
   Confirm the configured band. (Our field is a configurable window `[API]`, so this is a *value*, not a
   capability, question.)
3. **Min-break-by-hours** — breaks are configurable `[API/DES]`; whether the engine *validates/flags*
   insufficient breaks is unconfirmed.
4. **Any annual reconciliation / weekly-accumulation** OT beyond the per-cycle hours bank — `[ABS]` in the
   2024 payload, but confirm against the live product given version drift.
5. **Registro-de-jornada** record features (retention config, immutable audit log, inspection export/API)
   — scope of what actually ships vs planned.
6. **Non-unit lieu / TOIL ratios** — can the hours bank express **non-1:1** accrual (UK & Poland **1.5:1**;
   France COR 1h@25%→1h15)? The bank is `[API]`-real; the ratio is the open question.
7. **Day-off-in-lieu-first scheduling** (Poland Sunday ±6d/period; US reporting/predictability pay) — can a
   *day off owed within a window* be synthesized as a typed event, ahead of any premium?
8. **7th-consecutive-day / day-of-rest** (US CA) — can `workingDaysInARow` drive a distinct rate row for the
   7th day *within the workweek*, and flag a per-workweek day-of-rest breach?
9. **Spread-of-hours storage** (US NY) — the mechanic is designed (`spreadOfHoursThreshold`); confirm whether
   the field actually ships in the live product before claiming it.
10. **Exempt/non-exempt + regime gating** (US classification; IT *dirigenti*; PL managerial; NL high-earner;
    FR *cadre dirigeant*/*forfait jours*) — `SourceUserProfile.exempt` is `[DES]` future; no regime axis today.
11. **Art. 130 §2 norm reduction** (Poland) — can the period norm drop 8h per non-Sunday holiday (with an
    extra day off owed in-period)?
12. **Live-DB pass** — rerun once IAM access is granted, to upgrade `[API]/[UI]` → `[DB]`.
13. **Reference-period averaging / redistribution** — one primitive underlies China's *comprehensive-hours*
    cycle-averaging, Portugal's *adaptabilidade*, Canada's averaging agreements, and NMK's *prerasporeduvanje*.
    Confirm it's genuinely `[ABS]` (no per-cycle netting beyond the hours bank) across the live product.
14. **Regime gate** — China's **three working-hour systems** (standard / comprehensive / non-fixed) are a hard
    regime axis that decides whether OT fires at all; same shape as US exempt/non-exempt and IT *dirigenti*.
    No regime attribute ships today (`SourceUserProfile.exempt` is `[DES]`) — confirm.
15. **Premium-composition mode** — Mexico's *séptimo día* (base + 2× service) and DR's night×OT stacking need a
    **multiplicative/additive composition mode**; today only typed emission ships. Confirm the mode is `[ABS]`.
16. **Brazil-specific mechanics** — *hora noturna reduzida* (52′30″ night hour, quantity-affecting) and the
    *intrajornada* break-suppression penalty (+50%, pay-corrupting): both scan-unverified `BR?` — confirm the
    field presence in a CLT-configured policy.
17. **Cross-run annual OT-cap counters** — Portugal 100h-doubling + 150/175/200h, NMK 190h + 150-hour bonus,
    Swiss Überzeit 170h/140h, India state quarterly caps: all per-worker YTD counters. Confirm none exists today
    beyond the single-period overall cap.
18. **Ramadan −2h reshape** (UAE) — is the 2h/day reduction a schedule/expected-shift input the engine already
    accepts, or a net-new reshape? Confirm the mechanism before claiming it.
