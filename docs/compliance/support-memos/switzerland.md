# Switzerland — T&A requirements

> **What this is.** The ground-truth reference for Switzerland's time-&-attendance legal
> requirements, grouped by topic — detailed enough to **build a day.io pay policy from**. It aims to
> be **exhaustive** and **atomic**: **one legal proposition per row**, each row self-contained (no
> "see §X" as the only content), with exact values, a worked example wherever a number is involved,
> variants, and a `Basis` that **links to the primary source** so any row can be checked against the
> law directly.
>
> **Scope: time & day-events only** — money (%, CHF, tax, gross-to-net) is out of scope (premiums are
> named for context in `Values` but the deliverable is the typed hour/day event). **Swiss-term
> convention:** every non-English term is glossed in English in brackets on first use in each
> section, e.g. *Überstunden* [overtime, above contract below statutory ceiling], *Überzeit* [extra
> hours, above the statutory ceiling].
>
> **The one structural fact to hold onto:** Switzerland runs a **dual-plus-one** system, and — unlike
> a country with one operative number per rule — **no single layer sets all of it.** The **CO**
> (individual contract, *Obligationenrecht*) sets the **operative "normal week"**: everything above
> it up to the statutory ceiling is *Überstunden*. The **ArG** (Federal Labour Act, *Arbeitsgesetz*)
> sets the **non-waivable ceiling** (45h/50h/week) and the *Überzeit* regime above it. A **GAV**
> [collective employment agreement, *Gesamtarbeitsvertrag*] can override both and, if declared
> *allgemeinverbindlich* [universally binding] for a sector, binds even non-signatory employers.
> **Cantons** add public holidays, run their own labour inspectorates, and may host stricter regional
> GAVs. So "do we support Switzerland?" resolves to "**which contract/GAV, and which of the two OT
> regimes?**" — not a single lookup.
>
> **Legal sources & links:** the Federal Labour Act ([ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en), SR 822.11) and its ordinances
> ([ArGV 1](https://www.fedlex.admin.ch/eli/cc/2000/243/en) SR 822.111, [ArGV 2](https://www.fedlex.admin.ch/eli/cc/2000/244/en) SR 822.112,
> [ArGV 5](https://www.fedlex.admin.ch/eli/cc/2007/692/en) SR 822.115), the [Code of Obligations](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) (CO/OR, SR 220),
> the Income-Replacement Act (EOG) and Unemployment Insurance Act (AVIG) — both on the
> [Fedlex](https://www.fedlex.admin.ch/en/home) classified compilation 🔎 exact deep link to confirm — SECO guidance
> (*Wegleitungen* [directives/guidelines] at [seco.admin.ch](https://www.seco.admin.ch/seco/en/home.html)), and current
> law-firm/HR summaries (L&E Global, getyourlawyer.ch, MME, Lenz & Staehelin, clino.ch,
> moneyland.ch) cited per row and rolled up in the Sources section. 🔎 marks a figure or deep link to
> confirm. **⚠ Correction carried from the repo seed:** the seed claims "11 federal public holidays"
> and a "40% cross-border telework rule" — fresh research shows only **one** holiday (1 August) is
> federally mandated (the rest are cantonal, if near-universal in practice), and the telework
> threshold is a multilateral **<50% (49.9%)** social-security rule, not a flat 40% (§2, §6). Both
> are corrected below; the seed's framing is preserved verbatim only in the parked appendix.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Dual-plus-one governing layer** | **Contract** (CO) sets the OT baseline; **ArG** sets the non-waivable ceiling + rest/break/recording rules; **GAV** [collective employment agreement] overrides both; **canton** adds holidays + enforcement. Model each GAV as its own pay policy. | A retail GAV sets a 42h "normal week," a 45h ArG ceiling, and its own night/Sunday premiums — one policy per GAV. | Many policies can share a canton (not 1:1). | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en); [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en); GAV declared *allgemeinverbindlich* binds non-signatories too (see next row) |
| **ArG statutory maximum by employee category** | **45h/week**: industrial workers, office/technical staff, retail staff in stores **>50m²**. **50h/week**: all other workers (hospitality, construction, agriculture, small retail). | A 42h-contract office worker's *Überzeit* line starts only above 45h/week, not above 42h. | Category is fixed by *activity*, not job title. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 9 |
| **Contractual "normal week" = the OT baseline** | The individual contract sets the "normal week" (commonly **35–42.5h**); every hour above it up to the statutory ceiling is *Überstunden*, regardless of the statutory max. | 40h contract, 43h worked, 45h ceiling → 3h *Überstunden*, 0h *Überzeit*. | GAV commonly sets the normal week for its sector (e.g. 40–42h retail). | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 321c |
| **Senior-manager exemption — *höhere leitende Tätigkeit* [senior managerial activity]** | Employees exercising genuine senior-managerial authority (independent decision-making with lasting influence on the firm's structure/course of business) sit **outside almost all of ArG** — no working-time ceiling, no OT/Überzeit claim, no recording duty. Narrowly and strictly construed by courts; job title/salary alone don't qualify. | A department head who cannot independently decide matters of major significance is **not** exempt even with a senior title — ArG still applies. | Health-and-safety provisions of ArG still apply even to the exempt. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 3(d); [ArGV 1](https://www.fedlex.admin.ch/eli/cc/2000/243/en) Art. 9; Bundesgericht case law 🔎 |
| **CO-governed populations outside ArG's working-time part** | Household/domestic workers, agricultural workers, and some service-sector roles fall under **CO** general employment law rather than ArG's working-time limits — governed instead by cantonal *Normalarbeitsverträge* [standard employment contracts, NAV] where they exist. | A live-in domestic worker's hours are set by the cantonal NAV, not the ArG 45h/50h ceiling. | Canton-specific NAVs vary (e.g. Geneva's household-worker NAV). | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 359 ff.; cantonal NAVs, e.g. [ge.ch](https://www.ge.ch/) 🔎 |
| **Public-sector carve-out** | Civil servants (*Beamte*) are governed by **public-law** employment statutes (federal/cantonal), not ArG/CO. | — | Federal vs cantonal public employees differ by their own statute. | Federal/cantonal public-law personnel statutes, e.g. [Bundespersonalgesetz BPG](https://www.fedlex.admin.ch/en/home) 🔎 |
| **Part-time — statutory max & OT baseline pro-rated** | Both the ArG ceiling and the OT baseline scale with the contractual FTE. A 20h/week contract (50% FTE) has an OT baseline of 20h and a pro-rated statutory ceiling. | 20h/week contract worker → *Überstunden* from the 21st hour; 25% premium on those hours. | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 9; [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 321c |
| **Apprentices (*Lehrlinge*) — dedicated regime** | Governed by CO Art. 344–346a + the Vocational Training Act; same **45h/week** statutory ceiling as adult industrial/office staff, but **max 9h/day**, ≥2 consecutive days off/week (school days may count), extra break frequency. | A 17-year-old apprentice cannot be rostered a 10h day even where the adult ceiling would allow it via averaging. | Age can extend past 18 for multi-year apprenticeships; see §4/§5 for the tighter limits. | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 344 ff.; [ArGV 5](https://www.fedlex.admin.ch/eli/cc/2007/692/en) |
| **Minors / young workers (ArGV 5) — protective regime** | *Jugendliche* [young workers, under 18]: minimum working age generally **15** (light work exceptions younger); dangerous work minimum age **18** (15 within vocational training). Night/Sunday work banned **unless required for vocational-training goals**. | A 16-year-old retail trainee cannot be rostered a Sunday shift outside an approved training exception. | — | [ArGV 5](https://www.fedlex.admin.ch/eli/cc/2007/692/en) |
| **Zero-hours / on-call / gig workers** | No guaranteed-minimum-hours regime under Swiss law; must still have an employment contract and receive the same statutory minimums (rest, breaks, leave) on **actual** hours worked. Off-site standby not "counted" unless called out (see §8). | A hospitality worker on a zero-hours contract accrues vacation on actual hours worked like any other employee. | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en); [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) |
| **GAV declared *allgemeinverbindlich* [universally binding]** | A sector GAV extended by the Federal Council/canton binds **all** employers in that sector/region, signatory or not (e.g. hospitality's *L-GAV*, several construction GAVs). | A non-member restaurant in a canton where the *L-GAV* is *allgemeinverbindlich* must still apply its hours/premium rules. | Extension is sector + cantonal/national in scope; check per-GAV. | Bundesgesetz über die Allgemeinverbindlicherklärung von Gesamtarbeitsverträgen (SR 221.215.311), [Fedlex](https://www.fedlex.admin.ch/en/home) 🔎 |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **What counts as "hours worked"** | **Principal activity** (core job) + **auxiliary work** (e.g. changing into required workwear, cleaning tools) count in full. **On-premises/employer-controlled standby** counts; genuinely free off-premises time does not (see §8). | A retail worker's mandated uniform-change time before opening counts as working time. | Disputed and canton-varying at the margins for auxiliary/standby classification. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en); SECO *Wegleitung* [directive/guideline], [seco.admin.ch](https://www.seco.admin.ch/seco/en/home.html) 🔎 |
| **Breaks — paid vs unpaid, counted vs not** | **Unpaid** breaks (the default) **do not** count as working time; **paid** breaks (rare, contract/GAV-set) **do** count. A break is **paid working time** if the employee cannot leave the premises (e.g. sole cover in a small shop). | A cashier required to stay at the till during a "break" is being paid working time, not resting. | GAV may mandate paid breaks in specific roles. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 15; SECO guidance 🔎 |
| **Cross-border telework — social-security subordination threshold** | Under the EU/EFTA–Switzerland multilateral framework agreement (in force since **1 July 2023**), a cross-border employee may telework from their home country up to **49.9% (<50%) of working time** without shifting social-security subordination away from the employer's country. **Location-of-work** is a day-level attribute the T&A system should carry for affected workers. | A France-resident employee of a Swiss company teleworking 2 days/week (40%) stays under Swiss social security; crossing to 3+ days/week (60%) risks tipping into French subordination. | A **separate, narrower ~40% threshold** exists in the CH–France **tax** treaty context for permanent-establishment risk — distinct from the 49.9% social-security rule; don't conflate the two. 🔎 (the repo seed's "40% rule" conflated both — corrected here). | Multilateral framework agreement on Art. 16(1) Reg. (EC) 883/2004, applied by Switzerland from 1 July 2023 — text via [European Commission SSC treaties](https://ec.europa.eu/social/main.jsp?catId=1130) 🔎 |
| **Business travel time** | Swiss statute has **no explicit rule** making business travel outside normal hours automatically compensable (unlike Germany's case-law position) — treatment is contract/GAV-set. 🔎 | — | GAV may specify travel-time compensation for field/service roles. | (no [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en)/[CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) provision found — flagged) |

## 3. Overtime

*Switzerland runs **two** OT regimes stacked on the same weekly-hours counter: **Überstunden** [overtime] (contract → statutory ceiling) and **Überzeit** [extra hours] (above the statutory ceiling). Confusing the two is the single most common Swiss payroll error.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Überstunden onset — above the contractual "normal week," below the statutory ceiling** | Contract sets a "normal week" (e.g. 40h); every hour above it up to the ArG ceiling (45h/50h) is *Überstunden*. | 40h contract, 43h worked, 45h ceiling → 3h *Überstunden*. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 321c |
| **Überzeit onset — above the statutory ceiling** | Every hour **beyond** the ArG ceiling (45h or 50h/week, by category — §1) is *Überzeit*, a second, stricter threshold. | 45h ceiling, 48h worked → 3h *Überzeit*. | 50h-ceiling category for hospitality/construction/agriculture/small retail. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 12–13 |
| **Part-time onset = pro-rated contractual hours** | *Überstunden* for part-timers starts above their **own contract** hours, not the full-time line. | 20h/week contract, works 23h → 3h *Überstunden* from the 21st hour. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 321c |
| **Senior-manager exemption — no onset at all** | *Höhere leitende Tätigkeit* [senior managerial activity] employees have **no** *Überstunden*/*Überzeit* onset — ArG's working-time part doesn't apply to them. | — | Narrowly construed (§1). | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 3(d) |
| **Overtime requires necessity/instruction (case-law gloss)** | *Überstunden* must generally be **ordered, approved, or necessitated** by the work — unilateral self-extension is not automatically compensable. 🔎 | — | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) case law (parallels German BAG doctrine) 🔎 |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Überstunden — +25% or 1:1 time off, waivable** | Default: **+25%** wage premium on the ordinary hourly rate. **Alternative:** 1:1 time off with written employee consent. **Waivable in writing** (common for managers, employees >CHF 120,000, or roles with inherent irregular OT) — but a GAV, where one applies, supersedes any waiver. | 40h contract, 3h *Überstunden* → 3h × 1.25 × hourly rate, or 3h time off, or (if validly waived) ordinary rate only. | GAV may set a different % or forbid waiver. | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 321c |
| **Überzeit — mandatory, non-waivable +25%** | **+25%** wage premium is **strictly mandatory** and **cannot be waived** by contract or, per the statute's own wording, even by a GAV — a statutory floor. | 3h *Überzeit* → 3h × 1.25 × hourly rate, always. | Time off may substitute per Art. 13 para. 3 (compensation timeline — §3d). | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 13 |
| **Office/technical staff — first 60 Überzeit hours/year at ordinary rate** | For **office and technical personnel** specifically, the +25% *Überzeit* premium applies only **from the 61st extra hour in a calendar year**; the first 60 are paid at the ordinary rate (or via time off, if agreed). | An office worker's *Überzeit* hours 1–60 in the year pay at 100%; hour 61 onward pays at 125%. | Category-specific (office/technical only — not industrial/retail/hospitality). | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 13 para. 2 |
| **Two-tier weekly premium — Überstunden then Überzeit** | The bands run **contractual → 25%/1:1 (Überstunden) → statutory ceiling → mandatory 25% (Überzeit)**, i.e. a tiered structure by cumulative weekly hours. | 40h contract / 45h ceiling: hours 41–45 at Überstunden terms, hours 46+ at Überzeit terms. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 321c; [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 13 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No annual cap on Überstunden** | Unlike *Überzeit*, ordinary overtime has **no statutory annual ceiling** — only daily/weekly rest limits constrain it. | — | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 321c |
| **Überzeit daily cap — 2h/day** | No more than **2 extra hours per day** may be worked as *Überzeit*. | A worker already at their 45h weekly ceiling may add at most 2h/day beyond it. | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 12 |
| **Überzeit annual cap — 170h / 140h per year** | **170 hours/year** for the 45h-ceiling category; **140 hours/year** for the 50h-ceiling category. A hard statutory ceiling — a running per-worker **year-to-date counter**. | An office worker (45h category) hits 171 *Überzeit* hours in the year → statutory breach; must not be scheduled further without remedy. | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 12 |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory OT-determining averaging** | Swiss statute does not net *Überstunden*/*Überzeit* over a reference period — OT is determined **weekly**, not averaged at period close. | — | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en); [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) |
| **GAV annualised/averaged hours (*Jahresarbeitszeit* [annualised working-time model])** | Several sector GAVs (retail, hospitality) allow the **contractual weekly hours** to be averaged over a **month or the calendar year**, so *Überstunden* is netted at period close rather than weekly — the OT-determining averaging Switzerland *does* have, but only where a GAV grants it. 🔎 | A hospitality GAV averages 42h/week over the season; a heavy-week is offset by a light week before any *Überstunden* is owed. | GAV-specific; confirm window and reconciliation cadence per arrangement. | GAV (e.g. *L-GAV* gastronomy), text via [unia.ch](https://www.unia.ch/) 🔎 |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Überstunden and Überzeit are mutually exclusive tiers, not stacked** | An hour is either *Überstunden* **or** *Überzeit* by its position in the weekly-hours index — never both. | Hour 44 of the week (below the 45h ceiling) is *Überstunden* only; hour 46 is *Überzeit* only. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 321c; [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 12–13 |
| **Night/Sunday premiums stack additively on the OT/base rate** | Night and Sunday/holiday premiums are tracked as **separate typed hour buckets** and add on top of whichever OT tier applies to that hour. | A Sunday-night *Überzeit* hour carries base + 25% *Überzeit* + Sunday premium + night premium, each totalled separately. | GAV-set composition/de-pyramiding rules may apply. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en); GAV |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekly statutory ceiling — 45h / 50h** | See §1/§3a: **45h/week** (industrial, office/technical, retail >50m²); **50h/week** (all others). | An office worker (45h category) scheduled 47h in a week breaches the statutory ceiling by 2h, independent of any contractual OT already owed. | GAV *Jahresarbeitszeit* [annualised working-time model] may average this over a longer window (§3d). | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 9 |
| **Daily rest — 11h between shifts** | **≥11h** uninterrupted rest between two working days. | Shift ends 22:00 → next start no earlier than 09:00. | Reducible once/week (next row). | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 15a |
| **Daily rest reduction — 8h once/week with 7-day averaging** | **One day/week**, daily rest may drop to **8h**, provided the **rolling 7-day average** stays **≥11h**. | Monday: 8h rest (Tuesday 4am start) instead of the usual 11h → the following days must average out to ≥11h/day rest over the 7-day window (e.g. 14h rest before Wednesday). | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 15a |
| **Weekly rest — 1 full day off/week (24h)** | **≥24 consecutive hours** off per week, in addition to the daily-rest period (combined with daily rest, **≥35h total** where they abut). Typically Sunday; can be negotiated to another day. | A worker off Saturday 22:00–Monday 09:00 (after an 11h daily rest) gets the full 24h+11h combination. | Retail/hospitality/healthcare sectors may schedule the day off on a non-Sunday day. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 16, 21 |
| **Breaks by hours worked** | **None** required ≤5.5h; **15 min** for 5.5–7h; **30 min** for 7–9h; **60 min** for >9h. Breaks are **continuous** (no splitting into smaller blocks without employee agreement) and generally **unpaid** unless the employee can't leave the premises (§2). | An 8h shift needs ≥30min continuous break; a 10h shift needs ≥60min. | GAV may redistribute or extend break minimums. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 15 |
| **Apprentices / young workers — tighter limits** | **Max 9h/day** (vs adult 45h/50h-week framework); **≥2 consecutive days off/week** (vocational-school days may count); more frequent breaks (commonly ~30min every ~4h 🔎). | A 17-year-old apprentice cannot be rostered a 10h day the adult ceiling would otherwise permit. | — | [ArGV 5](https://www.fedlex.admin.ch/eli/cc/2007/692/en); [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 344 ff. |
| **Weekly-max & rest-limit validation** | Statute requires the ceilings above be **respected**, but is silent on whether a breach must be system-*flagged* vs. simply avoided — treated as an employer/inspectorate enforcement matter, not an automatic system function. 🔎 | — | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en); cantonal labour inspectorates, e.g. [seco.admin.ch](https://www.seco.admin.ch/seco/en/home.html) 🔎 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night window — 23:00–06:00** | *Nachtarbeit* [night work] = work performed in the window **23:00–06:00**. | A shift running 21:00–05:00 has 4 night-designated hours (01:00–05:00 falls inside the window; 21:00–23:00 does not). | Some GAVs narrow the *premium* window even where the statutory definition stays 23:00–06:00. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 10 |
| **Night work generally permitted, but permit-gated if regular/recurring** | Unlike some jurisdictions, night work is **not generally banned**; but **regular or recurring** night work requires a **cantonal permit** (temporary/occasional night work does not). | A warehouse running a permanent night shift needs a standing permit from the cantonal labour inspectorate; a one-off night delivery does not. | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 17; [ArGV 2](https://www.fedlex.admin.ch/eli/cc/2000/244/en) |
| **Temporary night work — +25% wage supplement** | For an employee's **temporary** night work (up to **24 nights/calendar year**, per ArGV 1), a **25% wage supplement** is owed on the night hours. | A worker called in for 5 occasional night shifts in the year gets +25% on each night hour. | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 17b para. 2; [ArGV 1](https://www.fedlex.admin.ch/eli/cc/2000/243/en) Art. 31 |
| **Regular/recurring night work — 10% time-credit instead of wage %** | For **permanent/recurring** night work, the wage supplement is **replaced** by a **compensatory rest credit of 10%** of the night hours worked, grantable within **1 year**; not owed if the employee's schedule already gives equivalent rest, or an equivalent rest arrangement exists. | A permanent night-shift worker accrues 10% of their night hours as extra time off, taken within the following year. | GAVs commonly set a wage % instead of/alongside the time credit — confirm per arrangement. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 17b para. 3 |
| **Night-worker health rights** | Regular night workers are entitled to a **health examination and advice** on the effects of night work, and — where health is endangered — a right to **transfer to a comparable day post** where available. | — | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 17c, 17d |
| **Minors — night-work ban** | Night work for under-18s is banned **unless required to meet vocational-training goals**. | A 17-year-old apprentice may work a supervised night shift only where the training plan requires it. | — | [ArGV 5](https://www.fedlex.admin.ch/eli/cc/2007/692/en) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Public holidays — only 1 August is federally mandated** | Switzerland has exactly **one** federally-binding public holiday: **1 August** (Swiss National Day), legally equated to a Sunday nationwide. **All other holidays (New Year's, Christmas, Easter dates, etc.) are set by each canton** — near-universal in practice but not federal law. | New Year's Day is observed almost everywhere but is a **cantonal**, not federal, holiday — the calendar is a canton-level configuration input either way. | Cantons commonly recognise 8–13 holidays total; some cantons equate up to **8** additional days to Sunday-rest rules (ArG Art. 20a). | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 20a; Bundesgesetz über die Feier des Bundesfeiertags (SR 116), [Fedlex](https://www.fedlex.admin.ch/en/home) 🔎 |
| **Cantonal holiday calendar — per-canton input** | Each canton adds its own holidays on top of 1 August (e.g. *Berchtoldstag* [Berchtold's Day] 2 Jan in Geneva, *Knabenschiessen* [Zürich's traditional boys'-shooting festival] in Zürich, *Fronleichnam* [Corpus Christi] in Catholic cantons). | Geneva keeps 13 paid holidays/year vs. Zürich's fewer. | Canton-keyed reference data — same shape as Germany's per-*Bundesland* calendar. | Cantonal holiday statutes; overview via [ch.ch](https://www.ch.ch/en/) 🔎 |
| **Public holiday not worked — paid as normal** | A holiday falling on a scheduled workday and not worked is paid as a normal day (no deduction) for monthly-salaried staff; hourly-paid staff are owed holiday pay only if the contract/GAV provides for it. | A monthly-salaried worker's 1 August pay is unaffected whether or not it's a scheduled day. | Hourly-wage holiday pay is a contract/GAV configuration, not an automatic statutory entitlement. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 20; [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329 |
| **Sunday work — prohibited by default, permit-gated** | Work on Sundays is **generally prohibited**; requires cantonal authorisation + employee consent. **Temporary** Sunday work capped at **6 months/case** (public holidays counted in); beyond that is **regular** Sunday work. | A retailer needing occasional Sunday openings applies for temporary authorisation; a year-round Sunday operation needs the "regular" permit track. | Permitted-without-separate-permit sectors: healthcare, some retail/hospitality, public transport, agriculture, media/telecom, emergency services. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 18–19; [ArGV 2](https://www.fedlex.admin.ch/eli/cc/2000/244/en) |
| **Sunday-work compensation — replacement rest + optional premium** | **≤5h worked** → equal time off within **4 weeks**. **>5h worked** → a **≥24-consecutive-hour** rest day in the preceding/following week (combined with daily rest = **≥35h** total). **Temporary** Sunday work additionally carries a **+50%** wage supplement on the hours worked; **regular** Sunday work (beyond 6 occurrences/year) has **no statutory wage supplement**, only the time compensation — though GAVs commonly add one. | A worker's occasional 6h Sunday shift → +50% wage premium + a 24h rest day within the following week. | GAV premiums for Sunday work commonly run **50–100%**. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 19–20 |
| **Public-holiday work — replacement day + wage** | Working a public holiday: **normal wage** (no loss) + a **replacement day off within 3 months** (or per GAV); GAVs often add a **25–100%** premium on top. | A worker required in on 1 August gets normal pay + a day off within 3 months, plus any GAV premium. | GAV-set premium % varies widely by sector. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 20; [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Arbeitszeitkonto [working-time account] — mechanics** | Tracks **target** (contractual) vs. **actual** hours; surplus credits a **positive balance**, shortfall creates a **negative balance**. No statutory maximum balance — contract/GAV commonly caps it at **~200–400h**. | A worker banks 45h in a busy month, later draws 5 days off against the balance. | Ratio is typically 1:1 surplus/deficit; GAV may set differently. | Contract/GAV practice — no dedicated statute; framework in [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) general wage-payment principles |
| **Positive-balance payout on termination** | Any positive balance must be **paid out** at the employee's regular hourly rate in the **final paycheck** (commonly within 30 days). | 40 banked hours × hourly rate, paid with the final salary. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) general wage-payment principles |
| **Negative-balance treatment depends on cause** | If the deficit is the **employee's choice** (e.g. unpaid time off), the employer **may** deduct it from final pay. If it's from the **employer** not providing enough work, the employer **bears the risk** and **cannot** deduct it. | A worker who chose to leave early repeatedly may see the deficit deducted at termination; a worker laid idle by the employer cannot. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 324 (employer's risk for lack of work) |
| **5-year wage-claim prescription (CO Art. 127)** | Wage claims — including unpaid *Überstunden*/*Überzeit* and banked-hours payouts — **prescribe 5 years** after accrual. A per-lot ageing clock is the compliant way to track this. | An employee separating with hours banked over 6+ years may find only the most recent 5 years' balance legally payable. | Best practice: auto-flag/resolve balances older than 5 years before they lapse. | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 127 |
| **Überzeit compensation timeline** | *Überzeit* hours should be compensated (wage or time) **within the same calendar year**, or carried into the time-bank if the contract allows. 🔎 | — | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 13 para. 3 🔎 |
| **Sabbaticals — no statutory right, common practice** | No federal law requires employers to permit sabbaticals; where a bank permits it, employees may accumulate hundreds of hours toward an extended (often partly-paid) break. | After 5+ years' service, an employee negotiates 3 months at 50% pay funded by banked time. | Entirely contract/GAV-negotiated. | Contract/GAV practice (no dedicated statute); freedom of contract under [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **On-premises / employer-controlled standby — counts as working time** | If the employee is **on the employer's premises** or **cannot freely dispose of their time**, standby counts **in full** toward the statutory ceilings. | A technician required to remain on-site overnight counts that whole period toward the 45h/50h ceiling. | Pay rate for standby (vs. active work) is contract/GAV-set. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en); SECO guidance, [seco.admin.ch](https://www.seco.admin.ch/seco/en/home.html) 🔎 |
| **Off-site / reachable standby — generally rest time** | If the employee is merely **reachable** and free to use the time as they choose (e.g. an on-call firefighter at home), standby **typically does not** count as working time — **except** the actual hours worked when called out. **Disputed and canton-varying** at the margins. | A worker reachable overnight logs only the 40 minutes of an actual call-out as working time. | Cantonal case law varies on the "truly free" threshold. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) (general "hours worked" concept); disputed 🔎 |
| **Zero-hours worker standby fee** | No statutory standby wage; some employers pay a small **de facto** standby fee (e.g. ~CHF 5/hour 🔎) for off-site availability, but this is contractual, not required. | A worker on 10h of off-site standby at the de facto CHF 5/hour rate earns CHF 50, purely by contract choice — no call-out occurred so no working-time counts. | — | Contract practice under [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) freedom of contract (not statutory) 🔎 |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up pay** | Switzerland has **no** statutory show-up, reporting-time, or predictability-pay regime. | — | — | — none identified in statute — |
| **Reasonable-notice doctrine for on-call scheduling** | No fixed statutory notice period for shift assignment, but a **duty of reasonable notice** is recognised in practice (commonly cited as **~2 weeks**) to avoid "unreasonable" schedules for zero-hours/on-call workers. 🔎 | An on-call worker given a shift assignment with only 2 days' notice may have grounds to refuse as "unreasonable" under the practice-based ~2-week norm. | GAV may set an explicit notice period. | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 328 (general duty-of-care principle) 🔎 |
| **Kurzarbeit [short-time work] — planned-hours reduction** | A temporary, ALV [unemployment-insurance]-authorised reduction of hours (down to 0); the state pays **80%** of the lost-earnings compensation. Duration extended to **up to 24 months** (from 18) effective **1 Nov 2025**. Employer share of social contributions is reimbursed. | A firm cuts to 50% hours; employees work half, are released from the rest, and the ALV compensates 80% of the lost half. | Apprentices and fixed-term staff generally **excluded** from eligibility. | Unemployment Insurance Act (AVIG, SR 837.0) + implementing ordinance, guidance at [arbeit.swiss](https://www.arbeit.swiss/) 🔎 |
| **GAV annualised/compressed schedules** | Some sector GAVs permit compressed or averaged weekly patterns (e.g. **4×10h weeks**) — a scheduling variant rather than a statutory default. 🔎 | A legacy watchmaking-sector GAV (Jura) permits a 4-day, 40h compressed week. | Narrow/legacy application today. | GAV (sector-specific), text via [unia.ch](https://www.unia.ch/) 🔎 |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Urlaub [annual leave] — 4 weeks (5 under age 20)** | **4 weeks** (20 working days, Mon–Fri) for employees who have completed their **20th year**; **5 weeks** (25 days) for those still **under 20**. Accrues **monthly** (≈1/12 per month). | A worker turning 20 mid-year drops from the 5-week to the 4-week entitlement for the remainder of that year. | GAV may grant **5+ weeks** for older workers (e.g. 55+). | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329a |
| **Blockierungsregel [2-week consecutive-block rule]** | At least **one block of 2 consecutive weeks** (10 working days) of the annual entitlement must be taken consecutively each year — a mandatory rest safeguard. | Of a 4-week entitlement, ≥2 weeks must be taken back-to-back. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329c |
| **Employer's right to direct timing** | Employer sets **when** leave is taken (with due consideration of the employee's wishes) — typically via an annual vacation calendar issued in advance. | Employer blocks a summer-shutdown week; employee requests remaining dates within it. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329c para. 2 |
| **Leave reduction for long unpaid absence** | If an employee is absent (unpaid, own fault — e.g. unpaid leave, non-work-related illness beyond the paid-continuation period) for **more than 1 month** in a leave year, the employer may reduce annual leave by **1/12 per additional full month** of absence (the first month is exempt). | An employee unpaid-absent 4 full months → leave reduced by 3/12 (3 months beyond the exempt first). | Pregnancy-related absence and short qualifying absences (sickness within paid-continuation) do **not** trigger reduction. | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329b |
| **Carryover — no "use-it-or-lose-it," but a practical ceiling** | Unused leave **automatically carries over** (no statutory forfeiture) — but courts have found accumulation beyond roughly **18 months'** worth unreasonable, obliging the employer to actively manage it down. | An employee who is repeatedly denied leave for years cannot indefinitely bank it — the employer must force take-back. | — | Case law (no fixed statutory cap) 🔎, interpreting [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329a/c |
| **Cash payout — barred during employment, mandatory at termination** | Leave **cannot be cashed out** while employed (narrow exception: very senior/high earners by explicit written agreement) — it must be **paid out** at termination for any unused balance. | Exiting employee with 8 unused days → 8 × daily wage in the final paycheck. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329d |
| **Krankheit [sick pay] — CO Art. 324a statutory floor** | **1st year of service:** employer owes **≥3 weeks'** full wage continuation. **Thereafter:** a longer period set "equitably" by years of service — courts apply one of three regional **scales**. | A worker in month 4 of employment, sick 10 days → full pay for all 10 (within the 3-week floor). | Doctor's certificate (*Arztattest*) may be required for absences **>3 days** (or per contract); employer cannot demand a diagnosis, only incapacity dates/degree (0/25/50/75/100%). | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 324a |
| **Sick-pay scale — Bern (majority of cantons)** | Year 1: **3 weeks**; Year 2: **1 month**; Years 3–4: **2 months**; Years 5–9: **3 months**; Years 10–14: **4 months**; Years 15–19: **5 months**; Year 20+: **6 months**. | A 6-year employee's sick-pay entitlement is 3 months per illness case. | Applied in AG, BE, OW, SG, and Western-Switzerland cantons. | *Skala Bernoise* [Bern scale] (case law convention interpreting [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 324a), summarised at [clino.ch](https://clino.ch/) 🔎 |
| **Sick-pay scale — Basel (most generous)** | Year 1: **3 months** (vs. Bern's 3 weeks); scales up more generously thereafter. | A first-year Basel-Stadt employee gets 3 months' sick pay vs. 3 weeks under Bern. | Applied primarily in Basel-Stadt / Basel-Landschaft. | *Basler Skala* [Basel scale], summarised at [clino.ch](https://clino.ch/) 🔎 |
| **Sick-pay scale — Zürich (middle ground)** | Year 1: **3 weeks**; rising roughly linearly to **11 weeks by year 5, 16 weeks by year 10, 21 weeks by year 15**. | A 10-year Zürich employee gets ~16 weeks' sick pay. | Applied in Zürich and some other cantons. | *Zürcher Skala* [Zürich scale], summarised at [clino.ch](https://clino.ch/) 🔎 |
| **STIP/VVG [short-term illness insurance] — common substitute** | Many employers carry private wage-continuation insurance that pays from **day 1**, reimbursing the employer; absent insurance, the employer bears 100% for the statutory floor period. | — | Employer-purchased; not a statutory requirement itself. | Contract/insurance practice, interpreting [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 324a/324b |
| **Mutterschaftsurlaub [maternity leave] — 14 weeks** | **14 weeks**, starting the day of birth; **80%** wage-replacement allowance, capped at **CHF ~220/day** (2025 figure; was CHF 196). Employment **ban** for the first **8 weeks** post-birth. | A birth on 1 June → protected/paid leave to roughly 7 September; no work permitted in the first 8 weeks regardless. | Eligibility: OASI-insured 9 months pre-birth + 5 months worked during pregnancy. | Income Replacement Act (EOG, SR 834.1), [Fedlex](https://www.fedlex.admin.ch/en/home) 🔎; [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329f |
| **Vaterschaftsurlaub [paternity leave] — 2 weeks** | **2 weeks** (14 daily allowances), takeable whole or by the day within **6 months** of birth; **80%** wage replacement, same CHF cap as maternity. In force since **1 Jan 2021**. | A father splits the 2 weeks into 10 individual days across the 6-month window. | Eligibility mirrors maternity (9-month OASI + 5-month employment-during-pregnancy tests, adapted for fathers). | EOG, [Fedlex](https://www.fedlex.admin.ch/en/home) 🔎; [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) |
| **Adoptionsurlaub [adoption leave] — 2 weeks** | **2 weeks**, for a child adopted **under age 4**, takeable within **1 year** of adoption; same **80%**/CHF-capped allowance. In force since **1 Jan 2023**. Splittable between two adopting parents (not simultaneously). | Two adoptive parents split the 2 weeks, one taking 8 days and the other 6, at different times. | Adopting multiple children simultaneously does **not** multiply the entitlement. | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329j; EOG 🔎 |
| **Betreuungsurlaub [care leave for a severely ill/injured child] — up to 14 weeks** | **Up to 14 weeks**, calculated over an **18-month window**, for a parent caring for a **seriously ill or injured** child; takeable in one block, weekly, or daily. **80%** wage replacement, CHF-capped as above. In force since **1 Jul 2021**. | A parent takes 6 weeks now and holds the remaining 8 weeks in reserve within the 18-month window. | "Seriously impaired" has a defined 4-part test (drastic/unpredictable change, expected worsening/death, increased care need, parent must step back from work). | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329i |
| **Short family-care absences — 3 days/event, ≤10 days/year** | **Paid** short leave for family-member care (e.g. a sick child, not the severe-illness regime above): **max 3 days per event**, **max 10 days/year** in aggregate. | A parent takes 2 days off for a child's flu, using 2 of the 10 annual days. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329h |
| **Youth-work leave — 1 week unpaid, under age 30** | Employees **under 30** are entitled to **1 week unpaid** leave/year for unpaid managerial/supervisory/advisory work in extracurricular youth organisations (e.g. scouting). | A 25-year-old scout leader takes an unpaid week for a summer camp. | — | [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 329e |
| **Military/civil-protection service leave** | Paid absence for compulsory *Militärdienst* [military service] or *Zivilschutz* [civil protection]; income replaced via **EO** [Erwerbsersatzordnung, income-replacement scheme] rather than the employer. | A reservist's 3-week refresher course is a protected absence; EO pays the income replacement. | — | Income Replacement Act (EOG, SR 834.1), [Fedlex](https://www.fedlex.admin.ch/en/home) 🔎 |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Three legal recording modes** | **Complete recording** (default, ~90% of workforce): start, end, breaks (≥15min), daily total. **Simplified recording**: daily total only — requires a GAV or a written individual agreement (employers <50 staff). **Exemption**: no recording — only "top managers"/*höhere leitende Tätigkeit* or employees earning **>CHF 120,000** with high autonomy **and** a GAV permitting it. | A shop-floor worker is Complete-recorded; a >CHF120k autonomous consultant with a qualifying GAV may be Exempt. | Simplified/Exempt both need an affirmative agreement — Complete is the default absent one. | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 46; [ArGV 1](https://www.fedlex.admin.ch/eli/cc/2000/243/en) Art. 73 |
| **5-year retention** | Time records must be kept **≥5 years** — aligned with the wage-claim prescription period (§7). | A shift's punch data from 4.5 years ago must still be retrievable; from year 6 onward retention is no longer mandatory. | — | [ArGV 1](https://www.fedlex.admin.ch/eli/cc/2000/243/en) Art. 73 |
| **Punch tolerance / rounding — ±5min symmetric is the accepted norm** | **No statutory rounding rule**, but **±5min symmetric** rounding is standard, legally accepted practice; **±10min** with written agreement; **±15min** only with an explicit contract clause; **>15min** deviations must be tracked, not rounded away. **Systematic employer-favourable (asymmetric)** rounding risks breaching the wage-deduction prohibition. | Clock-in 8:02 → rounds to 8:00; clock-out 17:03 → rounds to 17:05 — net-neutral over time. | GAV may mandate a specific rounding rule (or forbid rounding, requiring to-the-minute tracking) — GAV supersedes company policy. | (no statutory rule; standard practice) [CO](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) Art. 320 (deduction risk) |
| **Digital audit-trail expectations** | Growing labour-inspectorate expectation (not a single codified statute) that digital time-tracking systems produce a **tamper-evident** log (user ID + timestamp + before/after on edits), server-clock timestamps, and export capability — framed as *rising enforcement rigor* under the existing Art. 46 recording duty rather than a distinct new law. 🔎 | — | — | [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) Art. 46 (existing duty); enforcement trend, not new codified rule — flag before citing as settled law |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/switzerland.md` (v1.0, May 2026).
- **Primary law register:** [Fedlex](https://www.fedlex.admin.ch/en/home) — Federal Labour Act
  [ArG](https://www.fedlex.admin.ch/eli/cc/1966/57_57_57/en) (SR 822.11), [ArGV 1](https://www.fedlex.admin.ch/eli/cc/2000/243/en) (SR 822.111),
  [ArGV 2](https://www.fedlex.admin.ch/eli/cc/2000/244/en) (SR 822.112), [ArGV 5](https://www.fedlex.admin.ch/eli/cc/2007/692/en) (SR 822.115),
  [Code of Obligations](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/en) (SR 220). Base-act URLs confirmed live 2026-07-21; article-level
  anchors are not individually verified (Fedlex renders via JavaScript) — cite the Article number
  alongside the base link. 🔎
- **ArG / working-time / Überstunden vs. Überzeit / night / Sunday:** seco.admin.ch (Wegleitungen
  ArGV1 Art. 9, 17b, 20a, 32a); getyourlawyer.ch (night & Sunday work; sick leave; continued pay);
  zeitag.ch (night & Sunday work rights); kmu.admin.ch (night/Sunday regulated activities).
- **Senior-manager exemption (*höhere leitende Tätigkeit*):** littler.ch; arbeitsrecht-aktuell.ch;
  swissmem.ch; proles.ch.
- **Sick-pay scales (Bern/Basel/Zürich):** clino.ch (Bern/Basel/Zürich scales explained);
  consultationjuridiqueduvalentin.ch (CO Art. 324a/324b).
- **Vacation (CO Art. 329 ff.):** leglobal.law (Vacation Entitlements Under Swiss Law);
  walderwyss.com (Holiday and Holiday Pay Switzerland); consultationjuridiqueduvalentin.ch
  (Art. 329d/329e); getyourlawyer.ch (absences and holidays).
- **Public holidays:** en.wikipedia.org (Public holidays in Switzerland / Swiss National Day);
  swissfederalism.ch; seco.admin.ch (ArG Art. 20a Wegleitung); personio.ch (Feiertagszuschlag).
- **Maternity / paternity / adoption / care leave:** mme.ch (paternity leave 2021; adoption leave
  2023); americanbar.org (maternity/paternity/adoption overview); leglobal.law (adoption leave);
  lexology.com (adoption leave; care leave); mondaq.com / loyensloeff.com (care leave for
  seriously-ill children, Art. 329i CO).
- **Kurzarbeit / short-time work:** arbeit.swiss (short-time working compensation); visahq.com
  (24-month ceiling, effective 1 Nov 2025).
- **Cross-border telework:** ey.com (CH–France cross-border update); pwc.ch (new rules for French
  cross-border commuters); lenzstaehelin.com (multilateral teleworking agreement); ibani.com
  (cross-border telework guide).
- **Tolerance/rounding, recording modes:** seed HR-manual synthesis, cross-checked against ArG
  Art. 46 / ArGV 1 Art. 73 framing in the above SECO/law-firm sources.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

# Switzerland — T&A compliance support

**Verdict: 🟠 Partial — a contract-premium + statutory-cap hybrid (closest to Germany).** Switzerland's
OT is anchored to the **contractual** week, not a statutory norm: everything above the contract's "normal
week" is overtime, and our **surplus-above-planned** onset + **weekly OT trigger** map onto that cleanly.
Switzerland also compensates OT heavily by **time off in lieu**, which our **banked-hours** engine fits
well. The gaps cluster where Switzerland turns *statutory*: the **annual Überzeit caps** (170h / 140h per
year) are cross-run YTD counters we don't keep, the **weekly-max validation** (45h / 50h) is limit-*flagging*
we don't do, and **night / Sunday work** ride on a permit + replacement-day machinery outside our pay engine.
None of these corrupts computed pay — they enforce legality — so there is **no Critical gap**. Read with the
scope, verdict key, and **Basis key** in [`README.md`](./README.md). No verdict is DB-confirmed this pass
(IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). Switzerland leans on
> it twice — the **contractual weekly hours** (Überstunden onset) *and* the **statutory weekly max**
> (45h / 50h, Überzeit onset) are both weekly thresholds. It strengthens the fit but doesn't change the
> verdict: Switzerland's real gaps are the **annual** Überzeit caps and weekly-max limit-*validation*, not
> the OT trigger. **Status caveat:** weekly OT is committed-in-delivery, **not yet `[API]/[UI]`-visible** —
> confirm ship status before a hard customer commitment.

**Legal source:** `worldwide-calculations/switzerland.md` (v1.0, May 2026). **⚠ Source note:** the reference
is rich on the ArG/CO working-time rules but **frames night-work premiums as GAV-dependent** ("no statutory
premium required by the ArG alone") — it does **not** cleanly separate the statutory **temporary night → 25%
wage** vs **regular night → 10% time credit** distinction; that nuance is flagged 🔎, not asserted. It is
also silent on whether the daily/weekly/annual caps should *block* work or only *flag* — treated as flag-only
here.

## Governing sources — who actually sets the rules

The Swiss answer is conditional in a specific way: **the contract sets the OT baseline, the statute sets the
ceiling, and a GAV can override both.** "Do we support Switzerland?" resolves to "**which contract / GAV, and
which of the two OT regimes?**"

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| Contract (CO / Obligationenrecht) | Individual employment contract | **Yes — sets the OT *baseline*.** The "normal week" (35 / 40 / 42.5h…) is contractual; everything above it up to the statutory max is **Überstunden**. The +25% OR premium is **contractually waivable in writing** |
| Statute (ArG / Arbeitsgesetz) | Federal Labour Act | **Ceilings + non-waivable rules** — the 45h / 50h weekly max, the **Überzeit** premium (non-waivable), the 170h / 140h annual caps, 11h rest, breaks, night/Sunday permits |
| Collective (GAV) | Gesamtarbeitsvertrag | **Overrides both** — sector/canton GAVs set premiums, night/Sunday rules, recording mode; supersede the individual contract. Modelled as **one GAV = one pay policy** |
| Cantonal | 26 cantons + labour inspectorates | **Partly** — extra public holidays (+1–5) and enforcement; the holiday calendar is per-canton |

## Rule-by-rule (Basis = where the verdict comes from)

| # | Switzerland requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Contractual weekly hours = OT baseline (Überstunden onset).** The contract sets the "normal week"; every hour worked beyond it (up to the statutory max) is overtime. The baseline is **weekly** and **contractual**, not a statutory norm | **Weekly OT trigger** + OT onset = surplus over the **planned/contractual** shift | ✅ / 🔎 | [PO][API][UI] | **Good fit** — a contractual weekly threshold is exactly S5 (weekly trigger) over the planned baseline (S4). 🔎 weekly OT is `[PO]`, not yet `[API]/[UI]`-visible |
| 2 | **Überstunden (CO Art. 321c) — +25% or 1:1 time off.** Hours above contract but below the statutory max carry a **+25% wage premium by default**, **waivable in writing** (common for managers / >CHF 120k), **or** compensated **1:1 by time off** with the employee's written consent. **No annual cap** | OT-hours event via S5/S4; **+25% via a `phases[]` rate row** (money downstream); **time-off-in-lieu via banked hours (S6)**; the waiver = assign no premium / route to bank | ✅ | [API][UI] | Emit the OT-hours event ✅; the premium %, its **waiver**, and the 1:1 lieu route are all policy choices we can express (rate row, or BH split). The % itself is payroll |
| 3 | **Überzeit (ArG Art. 12–13) — beyond the statutory max 45h / 50h.** A **second, higher** weekly threshold above the contractual one: hours beyond **45h/week** (industry/office/retail >50m²) or **50h/week** (others) are Überzeit, carrying a **mandatory, non-waivable +25%** (or time off) | Two-tier weekly structure — S5 weekly trigger + **tiered rates by cumulative weekly hours** (`phases[].limit`): a Überstunden band, then a Überzeit band | ✅ / 🟡 | [API][PO] | **Configurable** — two weekly rate rows keyed to the weekly hour-index (contractual→45h, then 45h+), mirroring France's 25%/50% banding. The Überzeit band's +25% is a rate value; non-waivability is a config posture |
| 4 | **Office/technical Überzeit — +25% only beyond the 61st extra hour/year.** For office & technical staff the first **60** Überzeit hours in a calendar year are at regular rate; the premium applies only from hour 61 | No YTD counter to switch the rate at a **yearly** cumulative Überzeit total | ❌ Gap | [ABS] | **Annual cross-run counter (G3)** that switches the emitted premium tier — S7 is single-period, not a per-worker running YTD tier switch. **Pay-tier-determining** |
| 5 | **Überzeit daily cap — max 2 extra hours/day.** No more than 2 Überzeit hours may be worked in a single day; a breach should flag | Alert-only (S13); no daily-cap breach validation | ❌ / 🟠 | [API][ABS] | Notification levers exist `[API]`; the **2h/day breach flag = Gap (G4)**. Single-period threshold flag (cheap) |
| 6 | **Überzeit annual caps — 170h/yr (45h jobs) / 140h/yr (50h jobs).** A hard statutory ceiling on Überzeit per calendar year; exceeding it is unlawful (liability/fines) | Overall **period cap** (S7) is single-period (weekly/monthly/yearly/custom); **no cross-run per-worker YTD counter** that flags the annual breach | ❌ Gap | [ABS] | **The core Swiss gap (G3).** S7 restricted to the Überzeit rate over a *yearly* period is a **partial** approximation (it caps/converts, doesn't flag a per-worker running breach). **Non-pay-corrupting** — the hours still pay at +25% |
| 7 | **Weekly-max validation — flag a breach of 45h / 50h.** The statutory ceiling should raise a breach flag, not silently cap hours | Alert-only (S13); no working-time-limit breach flagging | ❌ / 🟠 | [API][ABS] | Alert lever `[API]`; **limit *validation* = Gap (G4)**. Single-period threshold-vs-total flag |
| 8 | **Night work (ArG Art. 10) — 23:00–06:00 window + supplement + permit.** Night = 23:00–06:00; **temporary** night work carries a **+25% wage** supplement, **regular** night work a **10% time credit** (much is GAV-set); regular/recurring night work needs a **permit** | `nightShift {%, start, end}` emits night-hours + a % (S8); the **10% time credit** could route via banked hours (S6) | ✅ / 🔎 | [API][UI] | Night-hour **emission** ✅ `[API]`. 🔎 **the 25%-wage (temporary) vs 10%-time-credit (regular) distinction** — the time-credit path is a BH route, not a wage %; confirm the source framing. **Permit tracking = out of scope** (compliance doc, not calc) |
| 9 | **Sunday & holiday work (ArG Art. 17–20) — permit + replacement day + optional premium.** Sunday work is generally prohibited (permit required); worked Sunday/holiday → **normal wage + one replacement day off within the following week** (holidays: within 3 months), **plus** an optional GAV premium (50–100%) | Sunday/Holiday **premium rate row** (S1) emits the premium-hours event | ✅ / 🟠 | [API][ABS] | Premium **emission** ✅ `[API]`; the **replacement-day-off-within-a-window = lieu-scheduling Gap** (no typed day-off-owed event); **permit = out of scope** |
| 10 | **Daily rest — 11h (ArG Art. 15a).** Min 11h uninterrupted between shifts; **one day/week reducible to 8h** provided the average over any 7-day window stays ≥11h — a breach should flag | `crossShiftsInterval {interval=660min=11h, phases[]}` — field exists (S12) | 🟠 Partial / 🔎 | [API][ABS] | 11h threshold field `[API]`; **the 8h-with-7-day-averaging make-up = Gap** `[ABS]`; **validation behaviour = 🔎** (reshape? flag? unconfirmed) |
| 11 | **Weekly rest — 1 full day off/week (ArG Art. 16/21).** At least 24 consecutive hours off per week, in addition to daily rest | Consecutive-days handled at schedule level; report export can surface it | 🟠 Partial | [DES] | Schedule + report cover it; `workingDaysInARow` 🔎; standard breach-flagging is on-demand, not automatic |
| 12 | **Breaks by hours worked (ArG Art. 15).** 15min (5.5–7h day), 30min (7–9h), 60min (>9h); continuous | Break config on the schedule (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | [DES] | Breaks configurable `[DES]`; **min-break-by-hours *validation/flagging* unconfirmed** |
| 13 | **Public holidays — 11 federal + 1–5 cantonal.** Each canton adds its own (e.g. Berchtold's Day GE, Knabenschiessen ZH); a non-worked holiday on a scheduled day is paid | Holiday calendar (`SourceHoliday`), jurisdiction-keyed + `daysMask` Holiday bit on rate rows | ✅ | [FLD] | **Per-canton = jurisdiction-keyed reference data** (S11) — same shape as Germany's per-Bundesland |
| 14 | **Annual leave accrual — 4 weeks (5 for under-20 / 55+ per GAV).** Accrues monthly; **auto-carryover** (no use-it-or-lose-it); one **2-week consecutive block**/yr; courts cap accumulation at ~18 months; cash payout barred during employment | `SourceRequest.*` handles leave/absence generically | ❌ Gap | [ABS] | **Leave-accrual ledger (G12)** — the monthly accrual counter, age-tier, 2-week-block rule and carryover cap are all absent; adjacent to core T&A |
| 15 | **Time-bank 5-year statutory expiry (CO Art. 127).** Banked hours are wage claims that **prescribe 5 years after accrual**; the balance must age per-lot and resolve/expire before it silently lapses | Banked hours (S6) — 1–18mo cyclical/full reset, BH↔EH split per row — exists; **rolling per-lot 5y expiry + approaching-expiry flag is net-new** | 🟠 Partial | [API][DES] | The **bank itself fits Swiss TOIL well** ✅ `[API]`; the **statutory per-lot 5y clock** is proposed/not-built — see the workbench run `runs/switzerland-time-bank-5yr-expiration.md` (candidate flow-finding #24). Managed manually today |
| 16 | **Record all working hours (ArG Art. 46) — 5yr retention.** Complete recording (start/end/breaks/total), or Simplified (daily total, GAV/agreement), or Exempt (top managers); tamper-proof audit trail; 5-year retention | Engine records every punch; approved-event locking | ✅ | [FLD] | Records every punch (S15) ✅; **Complete** and **Simplified** (daily total) both expressible; **Exempt** = assign no recording. Retention config + tamper-proof audit-trail depth = 🔎 (record-*feature* scope) |
| 17 | **GAV — each collective agreement is its own pay policy.** Sector/canton GAVs override the individual contract on premiums, night/Sunday rules and recording mode; each is a distinct arrangement | One compensation arrangement = one pay policy (S16) | ✅ | [UI][DES] | Matches our model exactly; many policies can share a canton (not 1:1) |
| 18 | **Senior-manager exemption (CO Art. 321c / ArG Art. 3).** C-level / highly-autonomous / typically >CHF 120,000 staff sit outside ArG working-time + OT rules — nothing to calculate | — (crude workaround: assign no OT/limit policy) | ❌ Gap / 🟡 | [ABS] | **Exempt flag (G5)** `[DES]` future; **also absent from the engine** — the workaround is to assign no OT/limit policy. Same shape as DE *leitende Angestellte* / FR *cadre dirigeant* |
| 19 | **Part-time — OT measured against contractual (pro-rated) hours.** A 20h/week part-timer working 23h has 3h Überstunden — measured against the *contract*, not a statutory threshold | OT onset = surplus over the **planned/contractual** shift | ✅ / 🟡 | [API][UI] | **Good fit** — the per-day surplus-over-planned model *is* a contractual baseline (S4). Same fit as DE *Teilzeit* / FR *heures complémentaires* |
| 20 | **Punch tolerance / rounding — ±5min symmetric.** No statutory rule, but ±5min **symmetric** rounding is standard-legal; systematic employer-favourable rounding is unlawful (CO Art. 320) | Tolerance (S9) — limit, per-punch/per-day, all-or-nothing | ✅ / 🔎 | [API][UI] | Tolerance emits for minor deviations ✅. 🔎 **day.io tolerance is lateness-first (forgiveness), not a symmetric two-way rounding** — confirm it models the ±5min *symmetric* norm, not a one-sided shave |
| 21 | **Apprentices / young workers — protective regime.** Under-20s / apprentices: max 9h/day, ≥2 consecutive days off/week, extra breaks (30min every ~4h), 5 weeks leave, no night work | — (dedicated pay policy + age-flag workflow) | 🟠 Partial | [DES] | Dedicated policy models the tighter caps; needs an **age-flagging workflow** (like FR minors). The 9h/day + break-frequency *validation* shares the limit-flag gaps above |

## Summary — rule-by-rule

**11 of 21 rules are ✅ or ✅/🟡** — the OT-onset spine (contractual + statutory weekly triggers, Überstunden
premium, part-time baseline, tiered Überzeit band), the holiday calendar, records, GAV-as-policy, tolerance,
and night-hour emission. **10 remain non-fully-supported**, and they sort into three familiar buckets: annual
**cross-run counters**, working-time-limit **validation**, and **lieu-scheduling** for Sunday/holiday
replacement days.

| # | Rule | Verdict | Why it's open |
|---|---|---|---|
| 6 | Überzeit annual caps 170h / 140h | ❌ Gap | Cross-run YTD counter (G3); S7-yearly is a partial cap, not a per-worker breach counter |
| 4 | Office/technical 60h/yr premium onset | ❌ Gap | Annual YTD tier-switch counter (G3) |
| 5 | Überzeit daily 2h cap | ❌ / 🟠 | Single-period breach flag (G4) — alert-only today |
| 7 | Weekly-max 45h / 50h validation | ❌ / 🟠 | Limit-*validation* (G4) — alert-only today |
| 9 | Sunday/holiday replacement-day off | ✅ / 🟠 | Premium emits; the day-off-owed lieu event is unbuilt |
| 10 | Daily rest 11h + 8h make-up | 🟠 / 🔎 | Field exists; make-up tracking absent; validation behaviour unconfirmed |
| 11 | Weekly rest / consecutive-days | 🟠 | Schedule + report cover; auto breach-flag on-demand |
| 12 | Breaks by hours (15/30/60) | 🟠 / 🔎 | Configurable; validation/flagging unconfirmed |
| 14 | Annual leave accrual ledger | ❌ Gap | Accrual counter + carryover cap + 2-wk block absent |
| 15 | Time-bank 5y statutory expiry | 🟠 | Bank fits; per-lot rolling 5y clock net-new (run #24) |
| 18 | Senior-manager exemption | ❌ / 🟡 | Exempt flag; workaround = assign no policy |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today and, for gaps,
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted — including the ✅ OT-onset spine (#1–3, #19), the holiday calendar (#13),
> records (#16), GAV-as-policy (#17) and tolerance (#20).
>
> **Severity scale:** 🔴 Critical (common + no mitigation + blocks correct output) · 🟠 High (common, no full
> mitigation, but scoped, or an annual pay-tier counter) · 🟡 Medium (moderately common, or a usable
> mitigation, or moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow
> population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Swiss market* a rule bites. **⚠ Customer-relative** —
>   **office/technical-heavy employers → #4 the 60h/yr onset**; **high-OT / industrial → #6 the annual caps +
>   #5/#7 the daily/weekly limits**; **hospitality/retail/healthcare → #8 night + #9 Sunday work**. **None
>   flips to Critical** — Switzerland has no annual-pay-*corrupting* averaging; every gap is a counter, a
>   limit-flag, or lieu-scheduling.
> - **Build-effort** = my estimate, **grounded in `switzerland.md` + the toolkit's Basis** (Existing/`[API]`
>   ≈ config/small **S**; `[DES]`/counter ≈ **M**; net-new subsystem ≈ **L**). **⚠ Calendar time needs
>   engineering validation.**

| Rule | Mitigation today | Prevalence (CH market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#6 Überzeit annual caps 170h / 140h** | **Partial** — an S7 cap restricted to the Überzeit rate over a *yearly* period approximates it; but it caps/converts rather than flagging a per-worker running breach, and **pay stays correct** (the hours still pay at +25%) | **Med-High** — any employer with sustained over-45h weeks (**Critical** in industrial/high-OT accounts) | **M** — cross-run per-worker YTD counter + breach flag | 🟠 **High** |
| **#4 Office/technical 60h/yr premium onset** | **Weak** — no yearly YTD tier switch; manual tracking of the first-60-hours rule | **Med** — office/technical staff who exceed the statutory max regularly (narrower than it sounds) | **M** — annual YTD counter that switches the emitted premium tier | 🟠 **High** |
| **#5 Überzeit daily 2h cap** | **Partial** — notification/alert thresholds as manual monitoring; **pay stays correct** | **Med** | **S** — single-period threshold flag | 🟡 **Medium** |
| **#7 Weekly-max 45h / 50h validation** | **Partial** — alert levers flag approach; no breach *validation*; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **S** — single-period threshold-vs-total flag | 🟡 **Medium** |
| **#9 Sunday/holiday replacement-day off** | **Partial** — the Sunday/holiday **premium** emits (S1); the day-off-owed-within-a-week is unmodeled (manual scheduling) | **Med** — permitted Sunday/holiday sectors (hospitality/retail/healthcare) | **M** — a typed day-off-owed lieu event | 🟡 **Medium** |
| **#12 Breaks by hours (15/30/60)** | **Config** — configure the break rules on the schedule; min-break-by-hours *validation* is the open piece | **High** (all workers) | **S-M** | 🟡 **Medium** |
| **#14 Annual leave accrual ledger** | **Partial** — leave handled as absences/requests; the monthly accrual + carryover cap + 2-wk block need a leave module or manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **M** — accrual counter + carryover/age-tier rules | 🟡 **Medium** |
| **#15 Time-bank 5y statutory expiry** | **Partial** — the bank (S6) fits Swiss TOIL well and is used today; the **per-lot rolling 5y expiry + approaching-expiry flag** is net-new (run #24), managed manually meanwhile | **Med** — banking is culturally common; the specific 5y auto-expiry edge is often HR-managed | **M-L** — per-lot vintage store + rolling expiry trigger + flag | 🟡 **Medium** |
| **#8 Night 25%-wage vs 10%-time-credit** | **Partial** — night-hours emit with a % (S8); the 10%-**time**-credit path routes via banked hours (S6). Mostly a config/verify question, not a capability gap | **Med** — night-working populations | **S** — set the % / route the time credit; confirm the source framing | 🟢 **Low** (🔎) |
| **#10 Daily rest 11h + 8h make-up** | **Partial** — the 11h field exists (`crossShiftsInterval`); the 8h-with-7-day-averaging make-up is absent; validation behaviour unconfirmed | **Med** | **S-M** | 🟢 **Low** |
| **#11 Weekly rest / consecutive-days** | **Strong** — handled at the schedule level; reports export the data; breach-flag can be added on demand | **High** as a legal obligation (non-corrupting) | **S** — formalize on-demand export into a standard alert | 🟢 **Low** |
| **#18 Senior-manager exemption** | **Strong** — exclude from working-time/OT rules entirely (assign no OT/limit policy) | **Low** — C-level / >CHF 120k autonomous only | **S** — exempt flag | 🟢 **Low** |
| **#21 Apprentices / young workers** | **Partial** — a dedicated pay policy models the tighter caps; needs an age-flagging workflow, and the 9h/day + break-frequency validation shares the limit-flag gaps | **Low-Med** — apprentice-heavy employers | **M** — age flag + tighter-cap validation | 🟢 **Low** |

### Severity roll-up
- **🔴 Critical (0):** none — Switzerland has no annual-pay-*corrupting* averaging; OT onset is contractual and fits (#1–3, #19).
- **🟠 High (2):** Überzeit annual caps 170h/140h (#6), office/technical 60h/yr premium onset (#4) — the two **annual cross-run counters**.
- **🟡 Medium (6):** Überzeit daily 2h cap (#5), weekly-max validation (#7), Sunday/holiday replacement-day (#9), breaks validation (#12), leave accrual ledger (#14), time-bank 5y expiry (#15).
- **🟢 Low (5):** night time-comp nuance (#8, 🔎), daily rest 11h + make-up (#10), weekly rest / consecutive-days (#11), senior-manager exempt (#18), apprentices (#21).

## The big gaps
1. **Annual Überzeit caps + office/technical 60h/yr** (#6, #4) — the defining Swiss statutory gap: **cross-run
   per-worker YTD counters (G3)** that flag the 170h/140h breach and switch the 60h premium tier. S7 is
   single-period; there is no running annual counter. **Non-pay-corrupting** — the hours still pay correctly.
2. **Working-time-limit validation** (#5, #7, #10, #12) — the daily 2h Überzeit cap, the 45h/50h weekly max,
   11h rest, and the break minimums are **limit-*flagging* (G4)** we don't do (alert-only today).
3. **Lieu-scheduling** (#9) — the Sunday/holiday **replacement-day-off-within-a-week** as a typed day-off-owed
   event; the premium emits, the day-off obligation doesn't.
4. **Leave & bank ledgers** (#14, #15) — the annual-leave accrual counter (G12) and the time-bank **5-year
   statutory per-lot expiry** (candidate flow-finding #24).

## Where Switzerland scores well (worth saying)
- **Contractual-baseline OT** (#1, #2, #19): the "normal week" is contractual, and our **surplus-above-planned**
  onset (S4) + **weekly trigger** (S5) map onto it directly — a clean fit `[API]/[UI]` `[PO]`.
- **Time-off-in-lieu** (#2, #15): Swiss OT is routinely compensated by time off, and our **banked-hours** engine
  (BH↔EH split per rate row, 1–18mo cycles) is a strong home for it `[API]`.
- **Two-tier weekly premium** (#3): Überstunden-then-Überzeit maps onto tiered rates by cumulative weekly hours
  (`phases[].limit`), the same shape as France's 25%/50% banding `[API]`.
- **Per-canton holidays** (#13), **records-all-hours** (#16), **GAV-as-policy** (#17), **part-time baseline**
  (#19) — all present `[FLD]`/`[UI]`.

## 🔎 Verify before telling the customer
- **Weekly OT (#1, #3):** marked ✅ per product-owner confirmation (2026-07-18), **not yet `[API]/[UI]`-visible**.
  Confirm ship status before a hard commitment.
- **Night 25%-wage (temporary) vs 10%-time-credit (regular)** (#8): our field emits a wage %; the 10%-**time**
  path is a banked-hours route. Confirm the source framing and that both can be expressed.
- **Night/Sunday permits** (#8, #9): permit tracking is a **compliance-document** obligation outside the pay
  engine — set expectations that we don't manage the permit itself.
- **`crossShiftsInterval` behaviour** (#10): field is `[API]`-real, but does it *validate* the 11h rest or only
  classify/reshape? The 8h-make-up averaging is absent regardless.
- **Tolerance = symmetric rounding?** (#20): day.io tolerance is lateness-first (forgiveness); confirm it can
  model the ±5min *symmetric* Swiss norm rather than a one-sided shave.
- **Time-bank 5y expiry** (#15): the per-lot rolling expiry is proposed/not-built (run #24) — don't claim the
  automatic 5-year prescription today.

## Bottom line for the customer
Switzerland is a **good structural fit**: OT is anchored to the **contractual** week (our surplus-above-planned
+ weekly-trigger model), and its heavy use of **time off in lieu** lands squarely in our banked-hours engine.
We can emit the Überstunden and Überzeit OT-hours events, the two-tier weekly premium, night hours, holiday
premiums, on-call, and the per-canton holiday calendar. The gaps are **statutory enforcement**, not pay: the
**annual Überzeit caps (170h/140h) and the office/technical 60h/yr onset** are cross-run YTD counters we don't
keep; the **weekly-max, daily 2h, 11h-rest and break** limits are breach-*validation* we don't do (alert-only);
and **Sunday/holiday replacement days + night/Sunday permits** ride on machinery outside the pay engine.
Honest status: **partial — no Critical gap; the standard contractual case is servable, the annual statutory
caps and limit-validation are roadmap.** No verdict is DB-confirmed this pass (IAM blocked).
