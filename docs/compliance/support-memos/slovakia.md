# Slovakia — T&A requirements

> **What this is.** The ground-truth reference for Slovakia's time-&-attendance legal requirements,
> detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive** and **atomic**:
> **one legal proposition per row**, each row self-contained (no "see §X" as the only content), with
> exact values, a worked example wherever a number is involved, variants, and a `Basis` that **links
> to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, €, tax, gross-to-net) is out of scope (premiums are
> named for context in `Values` but the deliverable is the typed hour/day event). **Term
> convention:** every non-English term is glossed in English in brackets on first use per section,
> e.g. *Zákonník práce* [Labour Code], *priemerný zárobok* [average earnings].
>
> **The one structural fact that shapes this whole document.** Slovakia is **statute-dominant** —
> almost every operative *number* lives directly in the **Zákonník práce** [Labour Code, Act No.
> 311/2001 Z. z.] itself, not one layer down in a CBA/award the way Australia or the Netherlands
> work: the three weekly norms (40h / 38.75h / 37.5h), both overtime triggers, all five statutory
> premiums (overtime, night, Saturday, Sunday, holiday), the 8h/150h/400h overtime ceilings, the 12h
> daily-rest floor, and the 4/5/8-week leave ladder. A *kolektívna zmluva* [collective agreement] may
> generally only **improve** on these floors — except two narrow, explicitly-legislated
> small-employer/no-union derogations (§122a/§122b/§123) that let a CBA, or even the individual
> contract, set a **lower** Saturday/Sunday/night rate. So "which pay policy applies" mostly reduces
> to: *which working-time system, and is a dohoda / konto pracovného času / small-employer
> derogation in play?*
>
> **Legal sources & links:** the Zákonník práce (Act 311/2001 Z. z.) and the other Acts cited below
> are all consolidated-text acts on **Slov-Lex** (`slov-lex.sk`), Slovakia's official legal-register
> platform — confirmed live this pass. Basis cells link to each act's Slov-Lex document page; 🔎
> marks a figure this pass could not re-verify against primary text (carried from the repo seed /
> prior memo rather than freshly confirmed). Web-verification budget for this pass was limited to a
> few WebFetch confirmations of the Slov-Lex URL pattern (no WebSearch spent) — see Sources.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statute prices premiums directly** | Unlike Germany/UK/NL, the *Zákonník práce* [Labour Code] itself mandates the overtime, night, Saturday, Sunday and public-holiday premiums (see §3, §5, §6) — a CBA may only improve on them (two named exceptions below). | A silent contract with no CBA still owes the full statutory +25% OT / +40% night / +50% Saturday / +100% Sunday / +100% holiday floors. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) ([Act 311/2001 Z. z.](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/)) |
| **Working-time system selects the daily/weekly norm** | **Standard 40h/week**; **38.75h/week** (two-shift operation); **37.5h/week** (three-shift/continuous operation); 🔎 **33.5h/week** (proven chemical-carcinogen / Category-A ionising-radiation hazard work — single-sourced, verify before relying on it). | A three-shift worker's daily norm is 7.5h vs a standard worker's 8h — hours beyond that norm are the OT trigger (see §3a). | The system also fixes **which** statutory minimum hourly wage basis applies to every MW-pegged premium (next row) — a Slovak-specific wrinkle absent in Poland/Portugal. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §85 ods. 5–6 |
| **Reduced-hours system → its own minimum-wage basis** | Because the minimum wage is set **monthly** and converted to hourly using the applicable weekly norm, there are **three simultaneous statutory minimum hourly wages** in force: 40h → **€5.259/hr**; 38.75h → **€5.429/hr**; 37.5h → **€5.610/hr** (2026 🔎). Every MW-pegged premium (night/Saturday/Sunday) must use **that worker's own** rate. | A three-shift worker's Sunday premium is computed off €5.610/hr, not the 40h-system's €5.259/hr, even for an identical Sunday shift. | Recompute yearly — the minimum-wage formula itself changed for 2026 (60% of the average monthly wage 2 years prior, raised from 57%). | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §85 (via minimum-wage [Act 663/2007 Z. z.](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2007/663/) §8) |
| **48h weekly-average cap incl. overtime** | Average weekly working time **including overtime must not exceed 48h**, over the reference period (§3d/§4). | — | See §4 for the limit-validation detail. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §85a |
| **Vedúci zamestnanci [leading employees] — NO blanket exemption** | Unlike Germany's *leitende Angestellte* or the Netherlands' high-earner carve-out, Slovakia gives **no exemption** from working-time limits, daily/weekly rest, or the hour-recording duty to any management tier. Instead, two narrow **salary-inclusion** mechanisms fold the *premium* (not the underlying hours) into salary: OT premium up to **150h/year** (§121 ods.2) and the night-work premium (§123 ods.3), for leading employees directly under the statutory body (or under such a leading employee) and for "conceptual/systemic/creative/methodical" work employees. Beyond 150h/year, ordinary OT pay resumes. | A department head's OT pay is pre-folded into salary for the first 150 OT hours/year; hour 151 onward is paid the ordinary +25%/+35% premium. | 🔎 A separately-reported extended ~550h/year annual OT ceiling on an agreed ~56h average week for top management is corroborated only by secondary legal commentary — **not confirmed to primary text; do not model as settled.** | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §9, §121 ods.2, §123 ods.3 |
| **Dohody [work-outside-employment agreements] — regime gate, not exemption** | Three forms sit outside the standard *pracovný pomer* [employment relationship] but are bound by named Labour Code provisions via §223's cross-reference (working-time definition, breaks/rest, night window, the entire wage Sixth Part incl. all 5 premiums). **DoVP** [agreement on work performance]: ≤**350h/calendar year** with the same employer. **DoPČ** [agreement on work activity]: ≤**10h/week average**. **DoBPŠ** [student work-brigade agreement]: ≤**20h/week average**, students only. All three: flat **12h/24h daily cap (8h for a minor)**, overriding whatever working-time system would otherwise apply. | A DoPČ worker capped at 10h/week average can still earn the Sunday/night/holiday premiums for hours actually scheduled, but can never be lawfully ordered or agreed into overtime. | Agreed pay must never fall below the statutory minimum wage. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §223–228a |
| **Dohody — hard bar on overtime and standby** | **§223 explicitly bars ordering or agreeing overtime (§97/§121) and standby (§96) for any dohoda worker** — this is a **hard suppression**, not a soft default; night/Saturday/Sunday/holiday work can still be scheduled and still earns the statutory premiums. | Assigning a dohoda worker a rostered on-call shift is unlawful even with mutual agreement. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §223 |
| **Risk-category workers (*rizikové práce*)** | A regime flag gating: the **+35%** (vs +25%) OT premium (§121), the **+50%** (vs +40%) night premium (§123), and a rule that risk-category workers **cannot be ordered** into overtime — only agreed, and only exceptionally (urgent repairs, imminent danger to life/health/property). | A risk-category worker declines an OT order that isn't for an emergency repair — lawful. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §97 ods.8, §121, §123 |
| **Small-employer / no-union derogation** | A CBA — or, absent a union, the **individual contract** at an employer with **<20 employees** — may set **reduced** rates: Saturday **45%** (vs 50%), Sunday **90%** (vs 100%), night **35%** (vs 40%), where that work is *regularly* required by the nature of work/operating conditions. **⚠ Standing law in 2026** — not an expired 2018–2020 transitional rule (no sunset clause found). | A 15-employee, non-unionised retailer sets a 45% Saturday rate by individual contract instead of the general 50% floor. | Not available to risk-category workers (who instead get the +50% night tier). | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §122a, §122b, §123 |
| **Minors (under 18)** | Daily rest **≥14h** (vs 12h adult); break after **>4.5h** continuous work (vs >6h adult); dohoda daily ceiling **8h** (vs 12h adult). No separate weekly-hours reduction beyond the general system norms was confirmed. | A 17-year-old on a DoBPŠ [student work-brigade agreement] cannot be scheduled beyond 8h/day even where the adult flat cap is 12h. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §92, §91, §223 |
| **Part-time (*kratší pracovný čas*)** | Overtime is defined (§97) as hours **beyond the assigned weekly hours** — for a part-time worker this is their own **agreed reduced** hours, not the full-time system norm. 🔎 No further part-time-specific OT or premium variant was confirmed beyond this structural reading of §97. | A worker on a 25h/week part-time contract has OT hours from the 26th hour, not from a 40h line. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §49–50, §97 |
| **⚠ Public-holiday status split is CURRENT LAW, not a pending reform** | Two dates (8 May, 15 Sept) lost "day of rest" status **for 2026 only** while **keeping** full wage-premium eligibility if worked; two dates (1 Sept, 17 Nov) lost **both** flags **permanently**. See §6 for the full calendar and mechanics. 🔎 The 8 May/15 Sept change is explicitly a one-year transitional provision (new §4b, Act 241/1993) — expected to revert in 2027; re-verify before that year's calendar build. | — | — | [Act 241/1993](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/1993/241/) §4b (as amended by [Act 261/2025 Z. z.](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2025/261/)) |
| **⚠ Sick-pay employer-paid window extended — already in force for 2026** | Employer-paid sick pay now runs **days 1–14** (was days 1–10 pre-2026), effective **1 January 2026**; a case that started before that date follows the old 10-day rule. See §10. | — | — | [Zákon č. 462/2003 Z. z.](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2003/462/) (as amended) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Active standby = ordinary/overtime work** | *Aktívna časť* [active part of standby] — actual work performed while on standby — counts in full as ordinary working time, paid at wage plus any applicable overtime/night/weekend premium, and can itself trigger overtime treatment. | A call-out during on-call standby that runs 45 minutes counts as 45 minutes of ordinary (or overtime, if the norm is already met) work. | See §8 for the full on-call classification. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §96 |
| **Inactive on-site standby counts as working time** | *Neaktívna časť na pracovisku* [inactive part, at the workplace] — present but not actively working — **counts as working time**, floored at the applicable minimum hourly wage. | A technician required to stay on the premises overnight, even if not called, has that time count toward working-time limits. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §96 |
| **Inactive off-site standby does NOT count as working time** | *Neaktívna časť mimo pracoviska* [inactive part, away from the workplace] — reachable but free to choose location — does **not** count as working time; compensated separately (see §8). | A worker reachable by phone from home overnight: only an actual call-out counts toward working-time limits. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §96a |
| **Missing time / missing day** | Standard T&A semantics: worked hours < scheduled (≥1 punch present) → `MISSING_HOURS`; a scheduled day with zero punches → `MISSING_DAY`. 🔎 No statute-specific missing-time doctrine beyond the general recording duty (§11) was identified. | A worker scheduled 8h who punches only 6h generates 2h of `MISSING_HOURS`. | — | (inferred from [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §99 recording duty) |
| **Travel time** | 🔎 — none identified in current research. | — | — | — |
| **Changing/donning time** | 🔎 — none identified in current research (no equivalent to Germany's *Umkleidezeit* doctrine was found in the source material). | — | — | — |

## 3. Overtime

*Slovakia is a statutory-premium country: both the overtime trigger and its rate are set directly in the Zákonník práce, unlike Germany where both are policy-defined.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily-norm trigger** | Overtime = hours beyond the **system-specific daily norm** — **8h** (40h-week system), **7.75h** (two-shift, 38.75h), or **7.5h** (three-shift/continuous, 37.5h) — worked at the employer's order or by agreement, outside the shift schedule. | A two-shift worker (7.75h daily norm) working 9.5h has **1.75h** of overtime. | Part-time: the trigger is the worker's own **agreed reduced hours** (§1), not the system norm. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §97 |
| **Weekly-average trigger** | Overtime also accrues on hours beyond an **8h/week average**, measured over the reference period (default 4 months, up to 12 — see §3d). A busy week can stay OT-free if a later light week pulls the average back down. | Five 9h days (45h) in one week may be OT-free if a lighter week nets the 4-month average to ≤48h/week (40h norm + 8h). | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §97 |
| **Must be ordered or agreed** | Overtime is only lawful — and only counts as statutory OT — if ordered by the employer or agreed with the employee. | — | **Risk-category workers**: cannot be *ordered*, only *agreed*, and only exceptionally (urgent repairs, imminent danger). **Dohoda workers**: cannot lawfully be ordered *or* agreed into OT at all (§1, hard bar). | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §97 ods.8, §223 |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Overtime premium** | **≥25%** of *priemerný zárobok* [average earnings] — ordinary. **≥35%** — risk-category (*rizikové práce*) work. Basis is always the worker's **own average earnings**, never minimum wage. | 2h of ordinary OT: base pay + 25% supplement on those 2h. | CBA may improve (higher %); no statutory ceiling on the upside. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §121 ods.1 |
| **Managerial salary-inclusion** | For qualifying leading/conceptual-work employees, the OT premium may be **pre-folded into salary**, capped at **150h/year** — no separate OT-premium payable for those hours; ordinary OT resumes beyond the cap. | A qualifying manager's first 150 OT hours in the year carry no separate premium line; hour 151 does. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §121 ods.2 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Annual unilateral-order cap** | Employer may **order** up to **150h/year** of overtime without employee agreement — a running YTD counter, resetting each calendar year. | An employer who has already ordered 148h this year can order at most 2 more before needing the employee's agreement. | 🔎 Healthcare: a further **+100h/year** may be ordered beyond the 150h with employee-representative agreement; healthcare workers **aged 50+ cannot be ordered** OT at all (agreement-only) — corroborated but not independently cross-checked to primary text. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §97 |
| **Annual absolute cap** | **400h/year** total, including agreed overtime — i.e. up to a further **250h/year** only by employee agreement, on top of the 150h unilateral-order threshold. | A worker who has both the 150h ordered and 250h agreed hits the 400h ceiling; hour 401 cannot lawfully be worked as OT this year. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §97 |
| **Managerial 150h/year cap on salary-inclusion** | Beyond 150h/year, a qualifying manager's overtime reverts to ordinary premium pay (see §3b). | — | 🔎 A reported ~550h/year extended tier for senior management, conditioned on an agreed ~56h average week, is **unconfirmed to primary text — do not build**. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §121 ods.2 |
| **Dohoda hour ceilings** (regime-gated, not an OT counter per se) | DoVP ≤**350h/calendar year**; DoPČ ≤**10h/week average**; DoBPŠ ≤**20h/week average**. These are the worker's total *scheduled* hour ceiling, not an overtime allowance — OT cannot be added on top (§1, §3a). | — | Type-specific, gated by `dohoda_type`. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §223–228a |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Reference period for the weekly-average OT trigger** | The 8h/week-average OT test (§3a) is measured over a rolling reference period: **default ≤4 months**, extendable to **≤12 months** only by agreement with employee representatives (not unilaterally by the employer). | A 4-month window nets a run of heavy weeks against light ones before deciding whether the average exceeded 8h/week beyond the norm. | The **same window** also governs the §4 48h-cap **validation** (a different consequence — see §4) and the konto pracovného času settlement mechanics (§7). | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §97 |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Two-basis, additive stacking** | Overtime (+25%/+35%) and the public-holiday premium (+100%) are pegged to **average earnings**; night (+40%/+50%/+35%), Saturday (+50%/+45%) and Sunday (+100%/+90%) are pegged to the worker's own **minimum hourly wage**. Premiums on the **same hour stack additively** — no statutory exclusion against combining was found. | A night-shift overtime hour worked on a Sunday carries **three** stacked, additive supplements: the OT premium (average-earnings basis) + the night premium + the Sunday premium (both minimum-wage basis, same worker's applicable rate). | 🔎 Stacking is the default reading (no textual exclusion found) but not independently confirmed by a source stating "these combine" in as many words. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §121, §122a, §122b, §123 |
| **Comp time off is mutually exclusive with the cash premium** | Where comp time off (*náhradné voľno*, §3b/§7) is elected in lieu of the OT cash supplement, **no cash premium is due** for those hours while the comp-time stands. | — | Reverts to cash if not granted within 4 calendar months (see §7). | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §121 ods.3–5 |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours. The 48h average below validates a legal ceiling — a distinct consequence from the OT-determining weekly average in §3d, even though both share the same reference-period window.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **48h weekly-average cap (incl. OT) — limit validation** | Average weekly working time **including overtime must not exceed 48h**, over the same reference period as §3d (default 4mo, up to 12mo). A breach should flag illegality — it doesn't decide what's paid. | A peak 55h week is lawful only if lighter weeks pull the 4-month average to ≤48h. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §85a |
| **Maximum scheduled shift — 12h** | Under uneven working-time distribution, a single **scheduled** shift may run up to **12h**. Overtime is **not** counted toward this cap — actual worked time can extend beyond 12h via OT, but the *scheduled* portion cannot. | A 12h scheduled shift plus 1h of OT = 13h actually worked, without breaching the scheduling cap. | Dohody: flat 12h/8h(minor) daily ceiling applies instead (§1). | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §87 ods.4 |
| **Daily rest — ≥12h (≥14h youth)** | **≥12 consecutive hours** between shifts (Slovakia gold-plates the EU Working Time Directive's 11h floor); **≥14h** for workers under 18. Reducible to **8h** (adults only) in: continuous/shift operations, urgent agricultural work, universal postal service, urgent repairs averting danger to life/health, and extraordinary events — with compensatory equivalent rest owed within **30 days**. | Shift ends 22:00 → next start no earlier than 10:00 (12h rule); a hospital may cut to 8h with the missing 4h made up within 30 days. | Youth: 14h floor, no reduction. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §92 |
| **Weekly rest — ≥2 consecutive days (base)** | Base rule: **≥2 consecutive days/week**, on Saturday+Sunday or Sunday+Monday. Reducible (adults, by agreement, where work/operations don't allow the base rule) to: **≥24h including Sunday, once/week** (comp rest owed within 🔎 **8 months**, secondary-source only); **≥35h including Sunday + part of an adjoining day, once/week** (no separately-documented comp-rest window); **≥24h including Sunday, once per 2 weeks** (comp rest owed within 🔎 **4 months**, secondary-source only). | A continuous-operation worker rostered on a reduced 24h weekly-rest tier must still get comp rest inside the stated window. | Reduction requires agreement with the employee or representatives; adults only. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §93 |
| **Meal/rest break** | **≥30 min** after a shift exceeding **6 continuous hours**; **≥30 min after 4.5h** for workers under 18. **Unpaid** by default — **exception**: a break granted specifically for employee safety/health **is** counted as (paid) working time. | An 8h shift needs a ≥30min unpaid break after the 6h mark; a safety-mandated pause on a hazardous line is instead paid. | 🔎 Splittability of the 30 minutes rests on interpretive commentary only — treat as non-splittable pending confirmation. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §91 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night window** | **22:00–06:00**, fixed. | An hour worked at 23:30 is a night hour. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §98 |
| **Night-worker status** | *Pracujúci v noci* [night worker] = an employee who either regularly performs **≥3 consecutive hours** of night work per shift, **or** is likely to perform **≥500h/year** of night work. | A worker regularly rostered 22:00–06:00 crosses the 3-consecutive-hour test on every such shift. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §98 |
| **Night premium** | **≥40%** of the worker's applicable minimum hourly wage — baseline. **≥50%** — risk-category work. **≥35%** — reduced-rate small-employer/no-union exception (§1), where night work is *regularly* required; not available to risk-category workers. | A 40h-system worker's night hour: base pay + 40% of €5.259/hr; a three-shift worker's night hour uses €5.610/hr instead (§1). | Managerial salary-inclusion (§123 ods.3) folds this into salary instead of a separate line, per §1. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §123 ods.1 |
| **Medical assessment duty** | Employer must ensure regular health-fitness assessment of night workers: before assignment, at least **annually** thereafter, on any health issue arising from night work, and on request by a pregnant worker, a mother within **9 months** post-partum, or a breastfeeding worker. | A night worker's last fitness assessment was 11 months ago — due again within 1 month to stay inside the annual cycle; a worker who gave birth 7 months ago can still request an assessment on demand (inside the 9-month window). | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §98 |
| **No separate night-worker shift-length cap confirmed** | 🔎 Beyond the general 12h scheduled-shift ceiling (§4), no distinct night-worker maximum-shift-length rule was confirmed in current research. | — | — | — |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Saturday premium** | **≥50%** of the worker's applicable minimum hourly wage — baseline. **≥45%** — small-employer/no-union reduced-rate exception (§1), where Saturday work is *regularly* required. | A Saturday hour: base pay + 50% of the worker's own minimum hourly wage. | Standing law in 2026, not a sunset provision. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §122a |
| **Sunday premium** | **≥100%** of the worker's applicable minimum hourly wage — baseline. **≥90%** — small-employer/no-union reduced-rate exception. | A Sunday hour: base pay + 100% (or 90%) of the worker's own minimum hourly wage. | Same conditions as the Saturday exception. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §122b |
| **Public-holiday calendar — dual-flagged, year-scoped (2026)** | Each date carries **two independent flags**: `is_day_of_rest` (scheduling effect) and `is_sviatok_wage_premium_eligible` (§122 premium applicability) — **not always the same in 2026**. Full 2026 calendar: 1 Jan, 6 Jan, Good Friday, Easter Monday, 1 May, 5 Jul, 29 Aug, 1 Nov, 24–26 Dec = both flags **Yes**. **8 May & 15 Sept**: day-of-rest **No** (2026-only), premium **Yes**. **1 Sept & 17 Nov**: **both flags No** (permanent since 2024 / Nov 2025 respectively). | Working 8 May 2026 (an ordinary scheduled day) still earns the full §122 premium; working 1 Sept 2026 earns nothing extra — it is now an ordinary day in every T&A sense. | 🔎 The 8 May/15 Sept day-of-rest removal is an explicit 2026-only transitional provision (§4b) — expected to revert in 2027; re-verify before that year's calendar. No substitute weekday given when a rest day falls on a weekend. | [Act 241/1993](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/1993/241/) §1, §2, §4b (as amended by [Act 530/2023](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2023/530/) & [Act 261/2025 Z. z.](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2025/261/)) |
| **Worked-holiday premium** | **≥100%** of *priemerný zárobok* [average earnings] — a statutory floor, uncapped upside via CBA/contract. Basis is average earnings, **never** minimum wage (contrast the Saturday/Sunday/night MW basis). | A holiday hour worked: base pay + 100% of average earnings. | Alternative: comp time off instead of cash (§7), with wage replacement at 100% of average earnings during the comp-off. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §122 ods.1–2 |
| **Holiday-not-worked pay replacement** | **Hourly-paid employees**: 100% of average earnings for the scheduled (unworked) holiday hours. **Monthly-salaried employees**: **no separate replacement** — the day is simply paid within the normal monthly salary. | An hourly-paid worker scheduled 8h on a holiday they don't work is paid those 8h at 100% average earnings; a salaried worker sees no separate line. | CBA/contract may extend the 100%-replacement treatment to monthly-salaried staff too. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §122 ods.3 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Konto pracovného času [working-time account, KPC]** | Requires a **collective agreement or written employee-representative agreement** — cannot be introduced unilaterally. Settlement (balancing) period up to **30 months**. The employee is paid a **guaranteed monthly wage** every month regardless of actual hours; actual hours are tracked as a running surplus/deficit. At settlement close (or termination), any surplus owed is paid as a shortfall true-up; any overpayment recovery from the employee is restricted. | An employee banked a large surplus over 20 months; at the 30-month settlement close, the accumulated shortfall between guaranteed pay and actual entitlement is trued up and paid. | 🔎 Whether a positive balance at settlement close converts to **OT-premium pay** or trues up as **plain wage** at the ordinary rate is **unconfirmed** — the single biggest open question for modelling KPC. The 48h weekly-average cap (§4) continues to apply during the KPC window. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §87a |
| **Comp time off in lieu of overtime cash (*náhradné voľno*)** | Employer and employee may agree comp time off instead of the OT cash supplement (§3e). If **not granted within 4 calendar months** following the month the OT was worked, the cash supplement becomes **retroactively payable**. | 10 OT hours banked as comp time in month 1; if still untaken by the end of month 5, the cash 25%/35% supplement becomes due retroactively. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §121 ods.3–5 |
| **Comp time off in lieu of the holiday premium** | Employee may agree comp time off instead of the +100% holiday cash supplement; wage replacement during the comp-off = 100% of average earnings. | An employee who worked 8h on a public holiday takes 8h of comp-off instead of the +100% cash supplement; those 8h of comp-off are paid at 100% of average earnings, same as a normal day. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §122 ods.2 |
| **Compensatory rest for reduced daily rest** | Where daily rest is cut to 8h (§4), the missing hours must be made up within **30 days**. | A hospital shift cuts daily rest to 8h (4h short of the 12h floor); the employer must grant 4h of compensatory rest within 30 days of the shortfall. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §92 |
| **Compensatory rest for reduced weekly rest** | Where weekly rest is cut to the 24h/week tier, comp rest owed within 🔎 **8 months**; where cut to the 24h/2-week tier, comp rest owed within 🔎 **4 months** (both secondary-source corroborated, not confirmed to primary text). | A continuous-operation worker on the 24h/week reduced tier must receive the make-up rest within 8 months of the reduced week; on the 24h/2-week tier, within 4 months. | The 35h+adjoining-day tier has no separately documented comp-rest window. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §93 |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Order limits** | Employer may order standby up to **8h/week** and **100h/calendar year**; beyond that, only by employee agreement. | An employer who has already ordered 95h this year can order at most 5 more hours of standby before needing agreement. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §96 |
| **Active part** | Actual work performed during standby — ordinary/OT work, paid wage plus any applicable premium, can itself trigger OT (§2). | — | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §96 |
| **Inactive, on-site** | Counts as working time; paid at the proportional basic-wage component, floored at the applicable minimum hourly wage. | — | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §96 |
| **Inactive, off-site** | Does **not** count as working time; compensated at **≥20%** of the applicable minimum hourly wage. | An 8h off-site on-call night with no call-out earns the 20% MW allowance for those 8h, none of which count toward working-time limits. | 🔎 No documented "≥50%"-type off-site rate exists in Slovak law — treat any such figure as a likely conflation with the Saturday(50%) or night-risk(50%) rates. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §96a |
| **Dohody — standby barred entirely** | Standby can never be lawfully ordered or agreed for a dohoda worker (§1, §223). | — | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §223 |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up, split-shift, or predictability pay** | 🔎 — none identified in current research (no equivalent to a US-style show-up-pay or predictability-pay regime was found). | — | — | — |
| **Uneven working-time distribution (*nerovnomerné rozvrhnutie*)** | The employer may schedule hours unevenly across the reference period (default ≤4mo, up to ≤12mo by rep agreement) — the mechanism underlying both the weekly-average OT trigger (§3d) and the 48h-cap validation (§4). | A retailer schedules 45h weeks in December and 32h weeks in February under one uneven-distribution scheme. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §97 |
| **Konto pracovného času scheduling** | Where KPC is active (§7), scheduling can flex hours over the up-to-30-month settlement window while pay stays smoothed at the guaranteed monthly wage. | — | Requires CBA/rep agreement to introduce. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §87a |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Annual leave (*dovolenka*) — ladder** | **4 weeks** base, regardless of tenure/age. **5 weeks** — employee reaching **≥33 years** by year-end, or a permanent child-carer. **8 weeks** — teaching staff (Act 138/2019), university teachers, research/artistic staff of public/state universities and research bodies (some CBAs extend teaching staff to 10 weeks). | A 34-year-old employee is entitled to 5 weeks; a 30-year-old to 4. | Employees on uneven distribution: leave measured in working days from the annual average (§104). | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §103 |
| **Annual-leave accrual** | Full entitlement requires **≥60 days worked** in the calendar year; for a partial year, leave accrues at **1/12 of the annual entitlement per 21 days worked**. | An employee who joins mid-year and works 63 days by year-end qualifies for the full annual entitlement; one who works only 42 days accrues 2/12. | — | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §103 |
| **Annual-leave carry-over** | Unused leave must be exhausted by the **end of the following calendar year**. If the employer hasn't scheduled it by **30 June** of that year, the **employee may self-schedule** (30 days' written notice, shortenable with employer consent). | Leave unused from 2025 must be taken by 31 Dec 2026; if the employer hasn't scheduled it by 30 June 2026, the employee can pick the dates themselves. | Leave blocked by long-term sickness, maternity/parental leave, *ošetrovanie člena rodiny* [care of a family member] or public/union office is **not forfeited** — it carries over once the obstacle ends. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §113 |
| **Sick pay (*dočasná pracovná neschopnosť*, employer-paid tier)** | **Days 1–3**: 25% of the daily assessment base (DVZ), employer-paid. **⚠ Days 4–14 (2026 — was days 4–10 pre-2026)**: 55% DVZ, still employer-paid. **Day 15+ (2026 — was day 11+ pre-2026)**: *nemocenské* benefit, 55% DVZ, paid by Sociálna poisťovňa [Social Insurance Agency]. | A worker sick from 1–20 Jan 2026: days 1–3 at 25%, days 4–14 at 55% (employer), day 15 onward at 55% via Sociálna poisťovňa. | Effective 1 Jan 2026; a case starting before that date follows the old day-10 boundary. CBA may raise the employer-paid rate to a max of 80% DVZ. | [Zákon č. 462/2003 Z. z.](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2003/462/) |
| **Maternity leave (*materská*)** | **34 weeks** standard; **37 weeks** for a single mother; **43 weeks** for multiple births. | A mother of twins is entitled to 43 weeks of maternity leave, versus 34 weeks for a single-birth mother with a partner. | — | [Zákon č. 461/2003 Z. z.](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2003/461/) |
| **Parental leave (*rodičovská dovolenka*)** | Until the child reaches **age 3**; until **age 6** if the child has a long-term adverse health condition requiring special care. Available to **either parent**. | A father takes parental leave from the child's birth through age 3. | 🔎 No distinct short statutory *paternity* leave (comparable to the Czech *otcovská* [paternity leave]) was identified in current research — Slovak fathers draw on the same parental-leave entitlement as mothers, from birth. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) (parental leave provisions); [Zákon č. 571/2009 Z. z.](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2009/571/) (allowance administration) |
| **Personal-obstacle leave (*prekážky v práci*, §141)** | Own wedding: **1 day paid**. Child's/parent's wedding: unpaid, time needed. Death of spouse/child: **2 days paid + 1 for the funeral**. Death of parent/sibling: **1 day paid + 1 for the funeral**. Death of grandparent/grandchild/household member: up to **1 day paid** (+1 if organising the funeral). Own medical exam/treatment: up to **7 days/year paid**, beyond that unpaid. Accompanying a family member for care: up to **7 days/year paid** (**14 days** for a single parent with a child <15). Disabled child to a care facility/school: up to **10 days/year paid**. Own childbirth transport: paid, time needed. Moving house: unpaid — **1 day** (same municipality) / **2 days** (different municipality). Job-seeking during notice period: up to **½ day/week paid**. | A bereaved employee takes 2 paid days for a spouse's death plus 1 for the funeral = 3 paid days. | Self-contained within the Labour Code (no separate implementing decree, unlike the Czech equivalent). | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §141 |
| **Disability-specific leave** | 🔎 — none identified in current research (no distinct disabled-worker leave entitlement, comparable to Germany's SGB IX +5 days, was found in the source material). | — | — | — |
| **Educational leave** | 🔎 — none identified in current research (no equivalent to Germany's state-level *Bildungsurlaub* was found). | — | — | — |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Recording duty — start/end of each period** | Employer must record working time, overtime, night work, and both the active and inactive parts of standby, capturing the **start and end of each period** worked or on ordered/agreed standby — a **daily total alone is insufficient**. This granularity gap is the most commonly cited employer compliance failure. | A time system logging only "8h worked" per day, with no start/end timestamps, fails the requirement even if the total is accurate. | No prescribed format — paper, spreadsheet, or digital system all suffice if complete, provable, and usable for payroll/inspectorate verification. | [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §99 |
| **Tolerance / rounding** | **No statutory rule.** Any punch tolerance or rounding is a policy/CBA configuration choice, constrained by the general anti-erosion principle: rounding must not systematically understate recorded time (which would corrupt the annual OT counter in §3c and the night-hour tally in §5). | — | — | (none statutory; [Zákonník práce](https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2001/311/) §99 anti-erosion principle) |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/slovakia.md` (current as of July 2026) — itself citing
  primary text at `slov-lex.sk/pravne-predpisy/SK/ZZ/2001/311` (Zákonník práce, Act 311/2001 Z. z.),
  Act 241/1993 Z. z. (public holidays, as amended by Acts 530/2023 and 261/2025), Act 663/2007 Z. z.
  §8 (minimum-wage formula), Act 462/2003 Z. z. (sick pay, 2026-amended), Act 461/2003 Z. z.
  (maternity/social insurance), Act 571/2009 Z. z. (parental allowance), and Národný inšpektorát
  práce (`ip.gov.sk`) / Ministerstvo práce, sociálnych vecí a rodiny SR (`employment.gov.sk`)
  guidance.
- **Prior support-memo:** `support-memos/slovakia.md` (parked verdict-first content below) —
  cross-references the same statutory citation trail.
- **This pass (structure + link pass, 2026-07-21):** confirmed the **Slov-Lex** URL pattern
  (`slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/<year>/<number>/`) resolves live via WebFetch for the
  Zákonník práce (311/2001); every `Basis` cell across all 11 sections now links to the relevant
  act's Slov-Lex document page (Zákonník práce 311/2001; holidays 241/1993 as amended by 530/2023 &
  261/2025; minimum wage 663/2007; sick pay 462/2003; social insurance/maternity 461/2003; parental
  allowance 571/2009). Slov-Lex's document pages are **whole-act** pages — this pass could not
  confirm a working per-§ anchor scheme, so links point to the act, not a deep §-anchor; the article
  number itself stays in the cell text alongside the link. **No number was freshly re-verified**
  beyond what the repo seed / prior memo already cite; genuinely unconfirmed points remain flagged
  🔎 exactly as the seed flagged them (KPC settlement-close conversion; the ~550h/56h
  senior-management tier; weekly-rest 8-month/4-month comp-rest windows; the 33.5h hazard-category
  norm; break splittability). No distinct statutory paternity leave, disability leave, or
  educational leave was identified in the source material — flagged as such rather than left
  silently blank.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

# Slovakia — T&A compliance support

**Verdict: 🟠 Partial — a *statutory-premium* fit, like Poland and Portugal.** Slovakia's **Zákonník práce**
*prices* overtime, night, Saturday, Sunday, and public-holiday work directly (+25/+35, +40/+50/+35, +50/+45,
+100/+90, +100%), so — unlike Germany/UK/NL — the engine must *emit* premiums from statute, and here it does
that well: our per-day surplus model + configurable rate rows by day-type + day/night split cover the OT bands,
the Saturday/Sunday/holiday day-group premiums, and night hours cleanly. The gaps cluster where every
statutory-premium country's do — the **cross-run annual OT counters** (150h unilateral-order / 400h absolute),
the **weekly-average-norm OT** over the 4/12-month reference period, the **konto pracovného času** settlement
horizon + its unconfirmed conversion, the **dohoda** worker-regime gate (a hard OT/standby suppression), the
**limit-*validation*** flags (48h average, 12h shift, 12h daily rest, weekly rest, breaks), and the
**leave-accrual ladder**. **No Critical gaps** (unlike Spain — Slovakia's OT is daily-norm + weekly-average,
never annualised), but three **High** gaps sit in the cross-run-counter / regime-gate family. Read with the
scope, verdict key, and **Basis key** in [`README.md`](./README.md). **Two-basis caution:** Slovakia splits
the premium basis cleanly — night/Saturday/Sunday supplements ride the *minimum wage* (itself varying by the
worker's 40h/38.75h/37.5h weekly-hours system), while overtime/holiday ride the worker's *average earnings*
— but **both the % and the basis are money/downstream**; we assess only that we emit the correct *hours + typed
band*. No verdict is DB-confirmed this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). It covers Slovakia's
> 40h/38.75h/37.5h weekly norm as a plain weekly onset (OT on hours beyond the weekly threshold). Scope is *the
> plain weekly trigger only* — it does **not** close the **8h/week average over the 4/12-month reference period**,
> the **150h/400h annual OT counters**, or the **48h reference-period average**, which remain as marked.
> **Caveat:** weekly OT is committed-in-delivery, **not yet `[API]/[UI]`-visible** — confirm ship status before a
> hard commitment.

**Legal source:** `worldwide-calculations/slovakia.md` (current as of July 2026). **Capability sources:**
`pay-policy-configuration.md` (+ §15 API map), `data-model/fields.md`, `flow/configuration.md`. **⚠ Two
time-sensitive 2026 items** the memo depends on: (1) the **public-holiday status split** — 8 May and 15
September are *ordinary working days* in 2026 that nonetheless still earn the §122 premium if worked, while 1
September and 17 November lost all T&A effect (a single "is-holiday" boolean cannot represent this — see #14);
(2) the **employer-paid sick-pay window extended to day 14** (was day 10) effective 1 Jan 2026 (see #20).

## Governing sources — who actually sets the rules

Slovakia is a **statute-dominant** country — the operative T&A numbers live *in* the Labour Code, not below it.
The Zákonník práce sets almost every operative figure (the three weekly norms, OT triggers, all five premiums,
the 8h/150h/400h OT caps, 12h daily rest, the 4/5/8-week leave ladder); the collective agreement (*kolektívna
zmluva*) may generally only **improve** on those floors. The unusual Slovak wrinkle: two named **small-employer /
no-union derogations** (§6/§7) let a CBA — or even the individual contract — set a *lower* Saturday (45%), Sunday
(90%), or night (35%) rate than the general floor. "Do we support Slovakia?" mostly reduces to "**which
working-time system, and is a dohoda / KPC / small-employer derogation in play?**"

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| Statute | **Zákonník práce (Act 311/2001 Z. z.)** + **Act 241/1993** (holidays) | **Yes — dominant.** Weekly norms (40/38.75/37.5h), daily & weekly-average OT triggers, +25/+35 OT, +40/+50/+35 night, +50/+45 Saturday, +100/+90 Sunday, +100% holiday; 8h/150h/400h OT caps; 48h average; 12h daily rest; 4/5/8-week leave ladder; the two-basis split. |
| Collective agreement | *kolektívna zmluva* | **Only to improve** — higher %, shorter reference period, extra leave — **except** the two named small-employer/no-union derogations (§6/§7) that may set the *lower* Saturday(45%)/Sunday(90%)/night(35%) rates and introduce **konto pracovného času**. Also carries the reference-period extension (up to 12mo) and KPC enrolment. |
| Individual contract | *pracovná zmluva* | Marginal — but is the vehicle for the small-employer/no-union derogations where no union exists. |
| Case law / commentary | — | Doctrine only; the reported ~550h/56h-avg senior-management OT ceiling is secondary-source only (#23, 🔎). |

**Illustrative secondary-source rules**

*⚠ ILLUSTRATIVE — varies by agreement / employer / year; not universal; NOT a statement of our support.*

- Reference period: default ≤4 months; extendable to ≤12 months only by agreement with employee representatives (§97) — *CBA / rep-agreement* — 🟡 (a config value).
- Working-time system: 40h / 38.75h (two-shift) / 37.5h (three-shift/continuous) / 🔎 33.5h (hazard) (§85) — *the planned schedule* — 🟡 (surplus-above-planned fits when the shift reflects the norm).
- Konto pracovného času introduction, up to 30-month settlement (§87a) — *CBA / rep-agreement* — 🟠 (see #7).
- Small-employer/no-union reduced rates (Saturday 45% / Sunday 90% / night 35%) (§6/§7, §122a/§122b/§123) — *CBA / contract* — 🟡 (extra rate rows; **standing law in 2026, not a sunset provision**).
- Extended annual OT ceiling ~550h on an agreed ~56h average week for top management (§1.1) — *unconfirmed to primary text* — 🔎 (do not build).

## Rule-by-rule (Basis = where the verdict comes from)

| # | Slovakia requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **System-specific daily norm + daily-norm OT (§85, §97).** The daily norm is 8h (40h week), 7.75h (38.75h two-shift), or 7.5h (37.5h three-shift); the first OT trigger fires on hours beyond that daily norm | **OT onset = surplus over the PLANNED shift** (per day) | 🟡 Configurable | [API][UI] | The per-day surplus model maps to the daily-norm trigger **when the planned shift reflects the system norm** (7.75h/7.5h). The *system selection* as a per-worker regime attribute (which also sets the MW basis) is worker-regime gating — see #22 |
| 2 | **Weekly norm + 8h/week-average OT over the reference period (§85a, §97).** OT also accrues on hours beyond the *average* weekly norm measured over the settlement period (default ≤4mo, up to 12mo), so a busy week can stay OT-free if a later light week pulls the average back down | **Weekly OT trigger** (now ✅) covers the plain weekly case; no multi-week *averaging* window | 🟠 Partial | [PO][ABS] | The plain weekly trigger (per PO, 2026-07-18) covers a **non-averaged** week; **averaging over the ≤4/12-mo reference period** is a Gap `[ABS]`. Mirrors PL #2 / PT #10 |
| 3 | **48h weekly-average cap incl. OT (§85a).** A hard ceiling: hours worked plus overtime must average ≤48h/week over the reference period — a breach should flag, not silently cap | No working-time-limit validation; no rolling average | ❌ Gap | [ABS] | **Pure period-averaging** — same cross-run mechanic as #2 and annualisation (build M); we compute pay, not limit enforcement. **Pay stays correct** (this only decides legality). Mirrors PL #3 / PT #11 |
| 4 | **Max scheduled shift — 12h (§87 ods.4)** under uneven distribution; OT can extend *actual* time beyond it, but the *scheduled* portion is capped at 12h — a breach should flag | No shift-length limit validation | ❌ Gap | [ABS] | Single-period threshold flag (build S); non-corrupting. Same family as DE #1 |
| 5 | **Overtime premium +25% ordinary / +35% risk-category (§121), basis = average earnings.** Beyond the norm, OT earns +25%, or +35% for risk-category (*rizikové práce*) work | Rate row (`phases[]`) by `daysMask`, % per row | 🟡 Configurable | [API] | Day-type rate row ✅ `[API]`; the % **and the average-earnings basis are money/downstream** — we emit the OT-hours + typed band. The **+35% risk-category selection** is a per-worker regime gate (#22) |
| 6 | **Comp time off in lieu of OT cash (*náhradné voľno*, §121 ods.3–5).** Employer & employee may agree rest instead of the supplement; if not granted within **4 calendar months**, the cash supplement becomes retroactively payable | Banked hours (comp-time-in-lieu) via `hoursBank*` + `phases[].extraHours` split | 🟠 Partial | [API][ABS] | Bank ✅ `[API]`; a **4-month bank cycle with positive→EH-at-close** approximates the auto-conversion, but the exact 4-month-deadline retro-cash rule + mutual-exclusivity-with-`OT_25`/`OT_35` for the same hours is the open piece |
| 7 | **Konto pracovného času — working-time account (§87a).** Hours banked against a *guaranteed monthly wage*; settlement (balancing) period up to **30 months**; at close, shortfall paid / overpayment recovery restricted; the 48h average still applies during the window | **Banked Hours (BH)** — 1–18mo cyclical/full cycle, BH↔EH split per row, positive balance → EH at cycle close | 🟠 Partial / 🔎 | [API][ABS] | The daily ledger movement (`KPC_HOURS ±` = accrue/consume) maps to BH `[API]`. **But** (a) the **30-month settlement horizon exceeds our 18-month max cycle**; (b) KPC's **guaranteed-monthly-wage smoothing** is a wage device, not the pure hours-credit BH models; (c) the **settlement-close conversion behaviour is unconfirmed** (OT-premium vs plain wage — the file's "single biggest open question") 🔎. A looser fit than Portugal's banco de horas |
| 8 | **Annual OT caps — 150h unilateral-order + 400h absolute per worker (§97).** The employer may *order* ≤150h/yr; up to a further 250h only by agreement, to a 400h absolute annual ceiling — running YTD counters | **Overall period cap** on OT (`hoursBankLimits[]` / extra-hours limits, e.g. per month) | 🟠 Partial | [API][ABS] | Per-period cap ✅ `[API]`; the **per-worker YTD 150h + 400h counters** that survive across pay runs are `[ABS]` — needs `SourceHistoricalState` `[DES]` (future). Mirrors PL #7 / PT #7 |
| 9 | **Night work — window 22:00–06:00, +40% / +50% risk / +35% small-employer (§98, §123), basis = minimum wage.** Every night-window hour earns +40%, +50% for risk-category, or a reduced +35% under the small-employer/no-union exception | `nightShift {%, start, end, applyEntirePeriod}` | ✅ / 🟡 | [API][UI] | Night-hour **emission** ✅ `[API]`; window configurable (set 22:00–06:00). The three bands emit as rate rows; the +50% (risk) / +35% (small-employer) **selection** is regime gating (#22). The **MW basis — and its variation by working-time system — is money/downstream** |
| 10 | **"Night worker" status (§98).** A worker doing ≥3h night per shift **or** ≥500h/yr night work is a *pracujúci v noci* (triggers medical-assessment duties) | — | ❌ Gap | [ABS] | No night-worker status classifier. (The medical-fitness duty itself is downstream HR.) No separate night-worker daily cap was confirmed in the research. Mirrors PL #12 / PT #9 |
| 11 | **Saturday premium +50% / +45% small-employer (§122a), basis = minimum wage.** Saturday work earns +50%, or a reduced +45% under the small-employer/no-union exception | **Day-group OT rate row** (`daysMask` — Saturday) → typed premium event | ✅ / 🟡 | [API] | Saturday day-group rate row ✅ `[API]`; the +45% reduced tier is just an extra rate row (config). The % + MW basis are downstream |
| 12 | **Sunday premium +100% / +90% small-employer (§122b), basis = minimum wage.** Sunday work earns +100%, or a reduced +90% under the small-employer/no-union exception | **Day-group OT rate row** (`daysMask` — Sunday & Holidays) → typed premium event | ✅ / 🟡 | [API] | Sunday day-group rate row ✅ `[API]`; the +90% reduced tier is an extra rate row. The % + MW basis are downstream |
| 13 | **Public-holiday worked premium +100% (§122), basis = average earnings; comp-off alternative.** Work on a sviatok earns +100% of average earnings, or (by agreement) compensatory time off; pay-when-not-worked splits hourly-paid (100% replacement) vs monthly-salaried (no separate replacement) | **Holiday rate row** (`daysMask` — Holiday) → typed premium event; `SourceRequest.*` for the not-worked day | ✅ | [API][FLD] | Worked-holiday premium **emission** ✅ `[API]`; the comp-off **election** is lieu-scheduling `[ABS]`; the hourly-vs-monthly pay-when-not-worked split is money/downstream |
| 14 | **Public-holiday calendar — year-scoped, TWO independent flags (Act 241/1993, §7.2).** Each date carries `is_day_of_rest` (scheduling) *and* `is_sviatok_wage_premium_eligible` (§122) — decoupled for 2026: **8 May & 15 Sept are ordinary working days that still earn the premium if worked**; **1 Sept & 17 Nov lost both flags** | Holiday calendar (`SourceHoliday`), jurisdiction/date-keyed; single Holiday bit in `daysMask` | 🟠 Partial / 🔎 | [FLD][ABS] | Standard calendar = data entry ✅. But the **dual-flag decoupling** (premium-eligible yet not a rest day) can't be expressed by a single Holiday flag `[ABS]` 🔎. **Workaround:** treat 8 May/15 Sept as ordinary working days + a date-scoped premium via a pay-policy **Exception** (§9). Movable feasts (Good Friday, Easter Monday) computed off Easter |
| 15 | **Meal break — ≥30 min after >6h continuous (>4.5h for juveniles), unpaid (§91).** Safety-mandated breaks are paid | Break config on the schedule (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | [DES] | Breaks configurable `[DES]` (incl. a paid flag for the safety exception); **min-break-by-hours *validation/flagging* unconfirmed**. Mirrors PL #15 / PT #16 |
| 16 | **Daily rest — ≥12h per 24h (§92), ≥14h youth; reducible to 8h with make-up within 30 days.** Slovakia gold-plates the EU 11h floor to **12h** | `crossShiftsInterval {interval=660min=11h, phases[]}` | 🟠 Partial / 🔎 | [API] | The inter-shift field exists `[API]`; **set the value to 720min (12h) — do NOT reuse an 11h constant**. Validation behaviour 🔎; the 8h-reduction + **30-day make-up tracking = Gap** `[ABS]`. Mirrors DE #5 |
| 17 | **Weekly rest — ≥2 consecutive days (§93), reducible to ≥24h/≥35h; comp-rest owed within 8mo/4mo.** Base rule is a two-day weekly rest including Sunday | — (single daily interval only) | ❌ Gap | [ABS] | No weekly-rest accumulation window (the 12h daily interval is a different axis); the comp-rest windows are lieu-scheduling. Mirrors PL #14 |
| 18 | **On-call / standby (*pracovná pohotovosť*, §96) — order ≤8h/wk & ≤100h/yr.** Active part = ordinary/OT work; inactive on-site counts as working time (MW floor); inactive off-site does NOT count but earns +20% MW | `onCalls {compensation}` (availability + activation paid separately) | 🟠 Partial | [API] | Availability + activation ✅ `[API]`; the **three-way active / inactive-on-site / inactive-off-site classification**, the **8h/100h order-cap validation**, and the **+20% off-site allowance** are the open pieces. Mirrors PL #20 |
| 19 | **Annual leave (*dovolenka*) — 4/5/8-week ladder (§103–104, §113).** 4 weeks base; 5 (age ≥33 or child-carer); 8 (teaching/research); 60-day/21-day accrual; carry-over to end of next year, 30 June employer-schedule deadline, employee-self-schedule fallback | `SourceRequest.*` handles absences; no accrual ledger | ❌ Gap | [ABS] | **Leave-accrual ledger** — the 4/5/8-week tiers, 60-day/21-day accrual, and carry-over mechanics are `[ABS]`. Adjacent to core T&A; **non-pay-corrupting**. Mirrors PL #21 / PT #18 |
| 20 | **Other statutory leave as absence quantities.** Sick pay (employer-paid days 1–14 in 2026, was 1–10; day 15+ → Sociálna poisťovňa); maternity 34/37/43 wk; parental to age 3/6; §141 personal-obstacle categories | `SourceRequest.*` generic absence handling | 🟠 Partial | [DES][FLD] | Absence *quantities* tracked; the **SK-specific semantics** (the day-14/15 employer↔Sociálna-poisťovňa hand-off boundary, §141 day-counts) not modeled. Adjacent |
| 21 | **Dohody — work outside employment (§223–228a).** DoVP (≤350h/yr) / DoPČ (≤10h/wk avg) / DoBPŠ (≤20h/wk avg, students); flat 12h/24h daily ceiling (8h minors). **§223 bars ordering or agreeing OT and standby for any dohoda worker** — OT/on-call events can never legitimately be generated | — (crude workaround: assign a no-OT policy) | 🟠 Partial | [ABS] | **Worker-regime gate.** Assigning a **no-OT policy** suppresses OT/standby emission ✅ (the pay-corrupting risk is contained); but the **type-specific hour caps (350h/yr, 10h/wk, 20h/wk) + the flat 12h/8h daily ceiling** are cross-run counters/validation `[ABS]`. A common SK worker type. Same shape as US exempt gate |
| 22 | **Risk-category workers (*rizikové práce*) — regime gate (§97 ods.8, §121, §123).** Gate the +35% OT and +50% night bands, and the rule that risk-category workers **cannot be *ordered*** OT (agreement-only, exceptional) | — (higher rate rows configurable; no per-worker regime attribute) | 🟠 Partial | [ABS] | The +35%/+50% rows are configurable rate rows; the **per-worker risk-category selection + the OT-order ban** are regime gating the engine lacks (`SourceUserProfile` regime axis is `[DES]`). Narrow population |
| 23 | **Leading / conceptual-work employees — salary-inclusion, NOT exemption (§9, §121 ods.2, §123 ods.3).** OT & night pay may be pre-folded into salary, capped at 150h/yr — but **Slovakia has NO blanket exemption from working-time limits or the hour record** | Engine records every punch; typed events; approved-event locking | 🟠 Partial / 🟢 | [FLD][ABS] | **Good fit on the record side** — because there is no exemption, our record-all-hours model applies exactly (no "assign no policy" needed). The **salary-inclusion is money/downstream**; the **150h/yr cap** is a YTD counter `[ABS]`. The reported ~550h/56h-avg extended tier is unconfirmed (🔎 — do not build) |
| 24 | **Minors (under-18) limits.** Daily rest ≥14h (§92); break after ≤4.5h (§91); 8h/day dohoda ceiling (§223) | — (generic absence/schedule handling) | 🟠 Partial | [ABS] | Regime gating + limit validation for a narrow, protected population; no minor-profile attribute. Mirrors DE/PL minors rows |
| 25 | **Time recording — §99: start & end of *each* period (a daily total is insufficient); active + inactive standby recorded.** The most-cited employer compliance failure | Engine records every punch; typed events; approved-event locking | ✅ | [FLD] | Satisfied — punch-level start/end capture meets the granularity requirement; the file calls this our compliance value-add. Feeds the annual OT counter + night tally |
| 26 | **Tolerance / rounding — no statutory rule (§99).** Any tolerance/rounding is policy/CBA config, constrained by anti-erosion (must not systematically understate time) | `tolerance {type, limit, scope, active, includeBreaks}` | ✅ | [API][UI] | Configurable `[API]`; anti-erosion is on the customer. No statutory floor to hit |

## Summary — rule-by-rule

**4 of 26 rules are ✅** (records #25, tolerance #26, worked-holiday premium #13, night emission #9), with **#11
Saturday / #12 Sunday / #5 OT band / #1 daily-norm onset** cleanly configurable (🟡). **16 are 🟠 Partial**, **6 are
❌ Gap** (#3 48h average, #4 12h shift, #10 night-worker status, #17 weekly rest, #19 leave ladder — plus #21's
dohoda hour-caps leg). The supported core is genuinely strong for a statutory-premium country: the five statutory
premiums (OT +25/+35, night, Saturday, Sunday, holiday) all ride our **rate rows × day/night split × `phases[].limit`
rate-chaining × the now-supported weekly trigger**, and the comp-time / KPC ledger maps onto **Banked Hours**. The
non-✅ rules concentrate in the same six families as Poland/Portugal (below).

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable (🟡)
> rules are omitted (they need no mitigation) — including the statutory premiums we emit well: daily-norm OT (#1),
> the +25/+35 band (#5), Saturday (#11), Sunday (#12), night emission (#9), worked-holiday premium (#13),
> records (#25), and tolerance (#26).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common, no full
> mitigation, but scoped, or core to the OT model) · 🟡 Medium (moderately common, or a usable mitigation, or
> moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow population, strong
> mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Slovak market* a rule bites. **⚠ Customer-relative** — shifts with the
>   customer's workforce: **high-OT manufacturing → #8 annual counters + #2 averaging**; **student/flexible-staff
>   employers → #21 dohody**; **CBA/shift-heavy (KPC) employers → #7**; **shift/night-working → #9–10 + #16**;
>   **Sunday/holiday-working retail & hospitality → #12–14**.
> - **Build-effort** = my estimate, **grounded in the capability sources** (Existing/`[API]` ≈ config/small **S**;
>   a cross-run YTD counter, a regime attribute, or a rolling/period average ≈ **M**; net-new subsystem ≈ **L**).
>   **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (SK market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#8 Annual OT caps 150h + 400h** | **Weak** — per-period OT cap (`hoursBankLimits[]`) ≠ a per-worker YTD counter; manual YTD tracking of both thresholds | **High** — all OT workers; bites high-OT manufacturing | **M** — two per-worker `SourceHistoricalState` YTD counters (`[DES]`) | 🟠 **High** |
| **#7 Konto pracovného času (KPC)** | **Partial** — the daily ledger maps to BH accrue/consume, and a cycle approximates the settlement window; but the **30-mo horizon exceeds our 18-mo cycle max**, the wage-guarantee smoothing isn't modeled, and the settlement-close conversion is unconfirmed | **Med** — CBA/rep-agreement-gated (not universal), common in manufacturing/seasonal | **L** — extend the cycle horizon + settle the conversion semantics (🔎 legal) | 🟠 **High** |
| **#21 Dohody — hard OT/standby suppression + hour caps** | **Partial** — a **no-OT policy** contains the pay-corrupting risk (no OT/standby emitted); the 350h/yr · 10h/wk · 20h/wk caps + 12h/8h daily ceiling need cross-run counters | **High** — dohody are a large share of SK flexible work | **M** — a `dohoda_type` regime flag + type-specific hour counters/ceilings | 🟠 **High** |
| **#2 Weekly-average-norm OT (averaging leg)** | **Partial** — the plain weekly OT trigger is now ✅ (a non-averaged week); averaging over the ≤4/12-mo reference period is manual, and pay stays correct on the daily/weekly axis | **High** as a legal obligation (non-corrupting); bites averaging-system workers | **M** — period-averaging over the reference window (same primitive as #3) | 🟡 **Medium** |
| **#3 48h weekly-average cap validation** | **Partial** — manual monitoring; **pay stays correct** (decides legality, not pay) | **High** as a legal obligation (non-corrupting) | **M** — pure rolling/period average (shares #2's primitive) | 🟡 **Medium** |
| **#14 Public-holiday dual-flag + 2026 anomaly** | **Partial** — model 8 May/15 Sept as ordinary working days + a date-scoped premium via a pay-policy **Exception** (§9); the general two-flags-per-date capability is the open piece | **Med** — bites any workforce scheduled on the two 2026 anomaly dates | **M** — a second independent per-date flag on the holiday calendar | 🟡 **Medium** |
| **#10 Night-worker status classifier** | **None** — no ≥3h/shift-or-≥500h/yr classifier | **Med** — night-working populations | **M** — status attribute (rolling annual night-hours) | 🟡 **Medium** |
| **#15 Meal-break validation** | **Config** — configure the ≥30-min break at the >6h (>4.5h youth) trigger; the *validation/flagging* is the open piece | **High** (all workers), legal obligation, non-corrupting | **S-M** — band logic on actual hours + validation | 🟡 **Medium** (⚠ validation unconfirmed) |
| **#18 On-call three-way split + 8h/100h caps** | **Partial** — `onCalls {compensation}` covers availability + activation; the active / inactive-on-site / inactive-off-site split, the 8h/100h order-cap validation, and the +20% off-site allowance are applied manually | **Med** — on-call populations | **M** — three-way classifier + order-cap counters + a fixed off-site rate | 🟡 **Medium** |
| **#19 Annual-leave ladder (4/5/8-week)** | **Partial** — leave handled as absences/requests; the 4/5/8-week ladder + 60-day/21-day accrual + carry-over need a leave module or manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **M** — accrual ledger + age/child-care/profession gating | 🟡 **Medium** |
| **#20 Other statutory leave semantics** | **Partial** — `SourceRequest.*` tracks absence quantities; the day-14/15 sick-pay hand-off boundary + §141 day-counts aren't modeled | **Med**, adjacent (leave mgmt) | **M** — specific leave-type semantics on the request primitive | 🟡 **Medium** |
| **#6 Comp time off in lieu (4-mo deadline)** | **Strong** — BH gives comp-time-in-lieu, and a 4-month cycle with positive→EH-at-close approximates the retro-cash conversion; only the exact deadline + OT-mutual-exclusivity need confirming | **Med** — a common OT election | **S** (param/verify on the existing bank) | 🟢 **Low** |
| **#4 Max scheduled shift 12h** | **Partial** — notification/alert thresholds as manual monitoring; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **S** — single-period threshold flag (cheapest to add) | 🟢 **Low** |
| **#16 Daily rest 12h + make-up** | **Partial** — set the `crossShiftsInterval` value to 12h (don't reuse 11h); validation behaviour 🔎; the 8h-reduction 30-day make-up tracking is absent | **Med** | **S-M** — set the value; add make-up tracking | 🟢 **Low** |
| **#17 Weekly rest ≥2 days + comp-rest** | **None** — no weekly-rest accumulation window (the daily interval is a different axis); comp-rest windows granted manually | **High** as a legal obligation (non-corrupting) | **S-M** — weekly-rest window + flag | 🟢 **Low** |
| **#22 Risk-category regime gate** | **Partial** — the +35%/+50% rows are configurable; the per-worker risk-category selection + OT-order ban need a regime flag | **Low** — risk-category populations only | **S** — regime flag | 🟢 **Low** |
| **#23 Leading/conceptual salary-inclusion (150h)** | **Strong** — records all hours (no exemption to model); the salary-inclusion is money; only the 150h/yr cap is a counter | **Low** — senior/conceptual staff only | **S** — a YTD counter (mostly downstream) | 🟢 **Low** |
| **#24 Minors (under-18) limits** | **Partial** — generic schedule/absence handling; no minor profile (14h rest, 4.5h break, 8h dohoda ceiling) | **Low** — narrow protected population | **S-M** — a minor limit/regime profile | 🟢 **Low** |

### Severity roll-up
- **🔴 Critical (0):** none — Slovakia's OT is **daily-norm + weekly-average** (over a reference period), never *annualised* like Spain; the five statutory premiums emit cleanly on rate rows, and the basic weekly trigger is now ✅.
- **🟠 High (3):** annual OT counters 150h/400h (#8), konto pracovného času (#7), dohoda regime gate + hour caps (#21).
- **🟡 Medium (8):** weekly-average-norm OT averaging (#2), 48h-average cap validation (#3), public-holiday dual-flag + 2026 anomaly (#14), night-worker status (#10), meal-break validation (#15), on-call three-way split + caps (#18), annual-leave ladder (#19), other statutory leave semantics (#20).
- **🟢 Low (7):** comp-time-off 4-mo deadline (#6), max shift 12h (#4), daily rest 12h + make-up (#16), weekly rest (#17), risk-category gate (#22), leading/conceptual salary-inclusion (#23), minors (#24).

## The big gaps
1. **Annual OT counters — 150h + 400h** (#8): two per-worker YTD counters (unilateral-order threshold + absolute ceiling); our OT cap is single-period only. `[ABS]` — same family as PL #7 / PT #7.
2. **Konto pracovného času** (#7): the defining Slovak hours-account. The daily ledger maps to Banked Hours, but the **30-month settlement horizon exceeds our 18-month cycle max**, the **guaranteed-monthly-wage smoothing** is a distinct mechanism, and the **settlement-close conversion behaviour is unconfirmed** (🔎 — OT-premium vs plain wage). A looser fit than Portugal's banco de horas.
3. **Dohody regime gate** (#21): §223 **hard-bars OT and standby** for dohoda workers. A no-OT policy contains the pay-corrupting risk, but the **350h/yr · 10h/wk · 20h/wk caps + 12h/8h daily ceiling** are cross-run counters we don't ship. A common SK worker type.
4. **Reference-period averaging + limit validation** (#2, #3, #4, #16, #17): the period-averaging primitive (weekly-average OT + 48h cap) plus the 12h-shift / 12h-daily-rest / weekly-rest limit-flags — all non-corrupting to computed pay; we compute pay, not limit enforcement.
5. **The public-holiday dual-flag + 2026 anomaly** (#14): a single "is-holiday" boolean cannot represent 2026 (8 May/15 Sept premium-eligible but not rest days; 1 Sept/17 Nov stripped of both). The two anomaly dates have an **Exception workaround**; the general two-flags-per-date capability is the gap.
6. **Leave-accrual ledger + other statutory leave** (#19, #20): the 4/5/8-week ladder, accrual mechanics, and the day-14/15 sick-pay boundary — adjacent, non-corrupting.

## Where Slovakia scores well (worth saying)
- **The five statutory premiums** (#5, #9, #11, #12, #13): OT (+25/+35), night, Saturday, Sunday, and worked-holiday premiums all emit on our `phases[]` **rate rows by day-type + day/night split** `[API]` — Slovakia's statutory pricing fits our premium-computation strength directly. The reduced small-employer/no-union tiers (45%/90%/35%) are just extra rate rows.
- **Daily-norm + weekly OT onset** (#1, #2): the per-day surplus-above-planned model handles the system-specific daily norm (8h/7.75h/7.5h) when the schedule reflects it, and the weekly trigger is now ✅ `[PO]`.
- **Comp-time / KPC as Banked Hours** (#6, #7): our BH feature is the analogue for both *náhradné voľno* and the KPC daily ledger — accrue/consume, per-row BH↔EH split, positive-balance → cash at cycle close `[API][UI]` (KPC with the horizon/conversion caveats in #7).
- **No blanket managerial exemption** (#23, #25): because Slovakia keeps managers *inside* the working-time limits and the hour record, our **record-all-hours** model is a clean fit — a genuine compliance value-add, not a gap to work around `[FLD]`.
- **Night window** (#9), **holiday calendar** (#14, standard case), **on-call availability + activation** (#18), and **tolerance** (#26) — all present `[API]/[UI]/[FLD]`.

## 🔎 Verify before telling the customer
- **KPC settlement-close conversion** (#7): does a positive balance convert to **OT-premium pay** or true up as **plain wage**? (The research file's "single biggest open question.") And can the bank cycle span the **30-month** settlement horizon (our max is 18 months)?
- **Weekly OT** (#2): ✅ per product-owner (2026-07-18), **not yet `[API]/[UI]`-visible** — confirm ship status; the multi-week *averaging* over the reference period remains a Gap regardless.
- **Public-holiday dual-flag** (#14): confirm whether the holiday calendar can carry **two independent per-date flags** (day-of-rest vs premium-eligible); until then, the Exception workaround covers only the specific 2026 anomaly dates. Re-verify the calendar before the **2027** build (the 8 May/15 Sept carve-out is 2026-only).
- **`crossShiftsInterval` behaviour** (#16): the field is `[API]`-real, but does it *validate* the 12h daily rest or only classify/reshape? Set the value to **12h, not 11h**.

## Bottom line for the customer
Slovakia is a **good statutory-premium fit** — its five directly-priced premiums (overtime +25/+35, night, Saturday,
Sunday, worked-holiday) all ride our configurable rate rows × day/night split × `phases[].limit`, and with **weekly
OT now supported** the core OT determination (daily-norm + weekly onset) computes; *náhradné voľno* and the KPC
daily ledger map onto our Banked Hours feature; and because Slovakia keeps everyone — managers included — inside the
hour record, our record-all-hours model is a genuine value-add. The gaps are the ones every statutory-premium
country shares: the **cross-run annual OT counters** (150h/400h), the **weekly-average-norm OT + 48h reference-period
averaging**, the **konto pracovného času** settlement horizon + its unconfirmed conversion, the **dohoda** regime
gate (a hard OT/standby suppression the engine can only crudely emulate), the **limit-validation** flags, and the
**leave-accrual ladder** — plus one Slovak-specific correctness trap in the **2026 public-holiday status split**.
**No Critical gaps** (unlike Spain — nothing here is annualised). Honest status: **partial; strong on premium
emission and the hours bank, weak on the cross-run counters, the reference-period averaging, and the dohoda/KPC
regime machinery.**
