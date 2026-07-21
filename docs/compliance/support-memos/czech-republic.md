# Czech Republic — T&A requirements

> **What this is.** The ground-truth reference for the Czech Republic's time-&-attendance legal
> requirements, detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive**
> and **atomic**: **one legal proposition per row**, each row self-contained (no "see §X" as the only
> content), with exact values, a worked example wherever a number is involved, variants, and a
> `Basis` that **links to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, CZK, tax, gross-to-net) is downstream *context* here
> (premiums are named for context in `Values`, but the deliverable is the typed hour/day event, never
> the amount). **Czech-term convention:** every non-English term is glossed in English in brackets on
> first use, e.g. *průměrný výdělek* [average earnings, a rolling personal average computed over the
> preceding calendar quarter].
>
> **Legal sources & links.** The Zákoník práce [Labour Code, Act No. 262/2006 Sb.] — sections link to
> the Kurzy.cz consolidated-text mirror (`kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-N`, confirmed
> resolvable this pass) — plus Act No. 245/2000 Sb. (public holidays), Act No. 285/2020 Sb.
> (hours-based leave reform), Act No. 281/2023 Sb. ("transposition novela"), Act No. 120/2025 Sb.
> ("flexinovela"), Act No. 230/2024 Sb. (minimum-wage indexation), Government Regulations 590/2006
> Sb. and 361/2007 Sb., Act No. 582/1991 Sb. (record retention), and the Sickness Insurance Act
> (Zákon č. 187/2006 Sb., o nemocenském pojištění). Non-Labour-Code acts link to the Zákonyprolidi.cz
> register at the **act level** (🔎 — section-level anchors on that mirror could not be independently
> re-confirmed live this pass, unlike the Kurzy.cz Labour-Code paragraf pages) and, for the Sickness
> Insurance Act, to the official MPSV staff handbook (`ppropo.mpsv.cz/zakon_187_2006`). 🔎 also marks
> any figure not independently re-verified this pass.
>
> **The one structural fact that shapes this whole document.** The Czech Republic is
> **statute-dominant** — unlike a CBA/award-set country, almost every operative T&A *number* lives
> directly **in the Zákoník práce**, not below it: the 40h weekly baseline, the compound overtime
> test, all five premium floors (+25% OT / +10% night / +10% weekend / +10% standby / +100%
> holiday-by-agreement), the 150h/416h overtime ceilings, the 11h/24h rest floors, the 13-holiday
> calendar, and the 4/5-week hours-based leave floor. A **kolektivní smlouva** [collective agreement,
> CBA] or **vnitřní předpis** [internal regulation] may only *improve* on these floors — extend the
> reference period to 52 weeks, activate `konto pracovní doby`, raise a premium above its floor — it
> may **never** reduce them. See §1.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statute sets almost every operative number** | The Zákoník práce [Labour Code] fixes the weekly baseline, the compound OT test, all five premium floors (OT/night/weekend/standby/holiday), the 150h/416h OT ceilings, 11h/24h rest, the 13-holiday calendar, and the 4/5-week leave floor **directly in statute** — not left to bargaining as in Germany. | A CZ employer with no CBA at all still owes +25% OT, +10% night, +10% weekend, +100%-by-agreement holiday work, and the 11h/24h rest floors — all straight from the Code. | A **kolektivní smlouva** [CBA] or **vnitřní předpis** [internal regulation] may only *improve* the floors — extend the reference period to 52 weeks, activate `konto pracovní doby`, raise a premium above its floor, never reduce one. | [Zákoník práce (Act 262/2006 Sb.) generally](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/) |
| **Employment-form routing — pracovní poměr vs. DPP/DPČ** | Standard employment (**pracovní poměr**) gets the full Part Four (§78–100) protections. Two looser forms exist alongside it: **Dohoda o provedení práce (DPP)** [agreement to complete a job] and **Dohoda o pracovní činnosti (DPČ)** [agreement to perform work] — each with its own hour cap and, historically, a lighter protection set (see rows below). **Self-employed contractors (`OSVČ`)** sit entirely outside the Code. | A worker with a DPP alongside their main job is capped at 300h/year with *that* employer, regardless of their main-job hours. | — | [Zákoník práce §74–77](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-74/) |
| **DPP cap** | **≤300 hours/calendar year per employer.** Multiple DPPs with the *same* employer aggregate toward the cap; DPPs with different employers are assessed separately. | A worker on two DPPs with the same retailer (200h + 150h planned) would breach the cap at 300h combined — the 101st hour of the second agreement is the breach. | — | [Zákoník práce §75](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-75/) |
| **DPČ cap** | Work must not exceed, **on average, half the standard weekly baseline** (e.g. ≤20h/week average against a 40h baseline), measured over the whole agreed term — individual weeks may run higher or lower so long as the average holds. | A DPČ worker rostered 25h one week and 15h the next averages 20h — compliant against a 40h baseline. | — | [Zákoník práce §76](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-76/) |
| **DPP/DPČ — no ordinary overtime mechanism, but premiums since Oct 2023 do apply** | DPP/DPČ workers have no `stanovená týdenní pracovní doba` [statutory weekly working time] baseline to exceed the normal way, so the §93 OT cap/premium/comp-time apparatus does not attach the usual way. Since **Act No. 281/2023 Sb.** (effective 1 Oct 2023), rest, breaks, **night-work rules (incl. the §116 premium)**, and standby rules **were extended** to DPP/DPČ workers — before that amendment none of Part Four applied to them at all. | A DPP worker who works a night shift earns the +10% night premium (post-Oct-2023 law) even though the same hours generate no OT premium under the ordinary §93 mechanism. | 🔎 Practitioner consensus reads "DPP has no overtime" but this could not be independently confirmed against the literal §77(2) exclusion list — treat as the working assumption pending a native-text check. | [Zákoník práce §77(2)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-77/); [Act 281/2023 Sb.](https://www.zakonyprolidi.cz/cs/2023-281) 🔎 |
| **Vedoucí zaměstnanci [managerial employees] — definition** | Employees authorised, at any of up to **four `stupně řízení`** [management tiers] — from first-line supervisors up to the statutory-body level — to assign tasks and direct/control subordinates with binding instructions. | A shift supervisor with binding-instruction authority over line staff is a tier-1 `vedoucí zaměstnanec`. | — | [Zákoník práce §11](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-11/) |
| **Salary-inclusive-of-overtime agreement (§114(3))** | By **written agreement** (contract, CBA, or other agreement — never a unilateral wage order), overtime may be priced into base salary: **up to 150h/year** for ordinary employees, **up to 416h/year** for `vedoucí zaměstnanci`. Hours within the agreed cap generate no separate OT premium/comp-time event; only hours **beyond** the cap trigger the normal §114 mechanism. | A tier-2 manager with a 300h/year inclusive-salary agreement generates no `OT_25`/comp-time events for the first 300 OT hours of the year; the 301st hour reverts to the normal +25%/comp-time election. | 🔎 Whether OT worked at night, on a rest day, or during standby is carved *out* of the inclusive-salary pricing (i.e. still triggers a separate premium within the cap) is suggested by some secondary commentary but unconfirmed against primary statute text. | [Zákoník práce §114(3)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-114/) |
| **Protected categories — ordered-overtime consent gate** | **Pregnant employees** and **parents of a child under 1** may not be *ordered* to work overtime — overtime for these groups requires their **consent in every instance**, never a unilateral employer order. | A pregnant worker may decline a rostered OT shift with no penalty; the employer may still *ask* and she may agree. | — | [Zákoník práce (general protective provisions)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/) |
| **Youth (under 18) — protective regime** | A stricter, non-waivable profile recurring across the document: **≥12h** daily rest (vs. 11h adult), **≥48h** weekly rest (vs. 24h adult), **no ordered overtime**, meal break after **4.5h** continuous work (vs. 6h adult). | A 17-year-old apprentice cannot be ordered into overtime even where an adult colleague on the same shift can be. | — | [Zákoník práce (youth provisions)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/) |
| **Recent legislative changes — already in force, not pending** | **Act No. 281/2023 Sb.** ("transposition novela," implementing EU Directives 2019/1152 and 2019/1158) took effect mainly **1 Oct 2023** (rest/night/standby extended to DPP/DPČ) with a further leave tranche from **1 Jan 2024**; it also corrected the daily/weekly-rest transposition (§90/§92) from **1 Jan 2024**. **Act No. 120/2025 Sb.** (the "flexinovela" most Czech commentary uses this label for) took effect mostly **1 Jun 2025** — probation-period, notice-period, and e-delivery changes; it does **not** materially change the night/weekend/holiday/standby/rest provisions in this reference. Both are **settled law**, not pending reforms. | — | Two different amendments both carry an informal "flexinovela" label in Czech commentary — confirm which Act number a source means before relying on its effective date. | [Act 281/2023 Sb.](https://www.zakonyprolidi.cz/cs/2023-281) 🔎; [Act 120/2025 Sb.](https://www.zakonyprolidi.cz/cs/2025-120) 🔎 |
| **No unsettled pending reform identified** | No draft bill materially reshaping the working-time/overtime/rest framework was identified in current research (contrast Germany's pending single-48h-cap proposal). | — | — | — none identified in current research — |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **What counts as working time** | *Pracovní doba* [working time] = time the employee is obliged to perform work for the employer **and** time the employee is at the workplace ready to work per the employer's instructions. Actual work performed during a call-out (§9 standby) counts in full; standby time with no work performed does not. | A worker on-site, geared up and awaiting a job order, is on working time even before the first task starts. | — | [Zákoník práce §78(1)(a)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-78/) |
| **Weekly baseline — 40h general, reduced regimes** | **40 hours/week** — the general baseline (`stanovená týdenní pracovní doba`). **38.75 hours/week** — two-shift working regime. **37.5 hours/week** — three-shift/continuous-operation regime, and underground mining/tunnelling/geological-survey work. | A three-shift factory worker's baseline is 37.5h/week — OT and limit checks measure against that figure, not 40h. | `weekly_baseline_category ∈ {standard_40, two_shift_38_75, three_shift_or_underground_37_5}` selects the baseline the checks use. | [Zákoník práce §79](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-79/) |
| **Distribution of working time** | **Rovnoměrné** [even] distribution spreads the baseline equally across every week — the default. **Nerovnoměrné** [uneven] distribution lets weekly hours vary so long as the **average** over the reference period (below) does not exceed the baseline. | A retailer schedules 45h in a peak week and 35h the next under `nerovnoměrné`; the average across the reference period must still land at 40h/week. | Uneven distribution is what makes the reference period and `konto pracovní doby` (§7) meaningful. | [Zákoník práce §78–79](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-78/) |
| **Reference/balancing period (`vyrovnávací období`)** | **Default maximum: 26 consecutive weeks.** **Extendable to 52 consecutive weeks only via CBA.** The same ceiling governs both uneven-distribution averaging and `konto pracovní doby`. | An employer with no CBA must close out the average every 26 weeks; a CBA-covered employer may run a full 52-week window. | — | [Zákoník práce §78](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-78/) |
| **Maximum shift length** | **12 hours** — the general ceiling per shift. **Up to 24 hours** — a narrow §83a exception, chiefly continuous-operation healthcare roles under specific conditions. | A 14h shift is unlawful outside the §83a healthcare carve-out. | Treat the 24h case as edge-config, not a default. | [Zákoník práce §83, §83a](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-83/) |

## 3. Overtime

*Práce přesčas [overtime] is a **compound test** in Czech law — not a flat daily/weekly threshold — and its premium defaults to cash but is bilaterally electable as compensatory time off.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Compound test — beyond roster AND beyond weekly baseline** | Overtime is work on the employer's order or with the employer's consent that is **both** (1) beyond the pre-set shift roster (a genuine schedule deviation, not a reallocation within an uneven-distribution schedule) **and** (2) beyond the applicable weekly baseline — averaged over the reference period where `nerovnoměrné`/`konto` applies. | A worker rostered 8h works 11h on Wednesday: the 3h beyond the roster are only overtime once the week also clears 40h (or the reference-period average, if uneven). | Distinct from Poland's flat daily-norm-or-average-weekly-norm trigger — a Czech OT hour must fail **both** tests simultaneously. | [Zákoník práce §78(1)(i)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-78/), [§93](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-93/) |
| **DPP/DPČ — no ordinary OT onset** | These agreement forms have no statutory weekly baseline to exceed the normal way, so the §93 mechanism doesn't attach as it does for `pracovní poměr` employees. | — | 🔎 unconfirmed against the literal §77(2) exclusion list. | [Zákoník práce §77(2)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-77/) |
| **Protected-category consent gate** | Pregnant employees and parents of a child under 1 cannot have OT *ordered* — only *agreed*, per instance. Youth: no ordered overtime at all. | — | — | [Zákoník práce (protective provisions)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Overtime premium — +25% of average earnings** | **+25% of `průměrný výdělek`** [average earnings, a rolling personal average over the preceding calendar quarter — §351–362] per overtime hour, **unless** employer and employee bilaterally agree instead on comp-time off (see §7). | A worker with a €/CZK average-earnings basis of X/hour earns 1.25×X for each of the 3 OT hours in the §3a example, absent a comp-time election. | Employer **cannot** unilaterally elect comp-time over cash — defaults to cash absent a bilateral agreement. | [Zákoník práce §114](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-114/) |
| **Void where salary-inclusive-of-OT applies** | The entire premium/comp-time mechanism is suppressed for hours already priced into a §114(3) salary-inclusive-of-overtime agreement (§1), up to the agreed cap. | — | — | [Zákoník práce §114(3)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-114/) |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekly-average OT ceiling** | **8 hours/week**, averaged over the reference period (max 26/52 weeks) — a rolling compliance ceiling independent of the annual caps below. | Five weeks averaging 6 OT h/week and one at 20 OT h/week could still breach the average depending on the full reference-period math. | — | [Zákoník práce §93](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-93/) |
| **Employer-ordered annual ceiling** | **150 hours/calendar year** — the maximum the employer may **unilaterally order** (`nařízená práce přesčas`) without the employee's individual consent. | A worker's annual OT counter stands at 148h; the employer may still *order* 2 more hours unilaterally, but the 151st hour needs the worker's agreement. | — | [Zákoník práce §93](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-93/) |
| **Absolute annual ceiling** | **416 hours/calendar year**, inclusive of the 150h ordered portion — beyond 150h, only by **mutual agreement** (`dohodnutá práce přesčas`), up to this absolute cap. | A worker who has agreed to extra OT beyond the ordered ceiling still hits a hard stop at 416h for the year — no further overtime is permissible. | 416h is agreement-gated, **not** the default annual limit. | [Zákoník práce §93(4)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-93/) |
| **Running annual OT counter, per worker** | A cross-run year-to-date counter (resets each calendar year) drives all three ceilings above. | — | — | [Zákoník práce §93](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-93/) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Reference-period averaging determines OT under uneven distribution** | Under `nerovnoměrné` distribution or an active `konto pracovní doby`, whether a given week's hours count as "beyond the weekly baseline" (the second leg of the §3a compound test) is resolved only once the **average** over the full reference period (≤26/52 weeks) is known — not per-day or per-week in isolation. | A worker runs 45h in week 1 and 35h in week 2 under `nerovnoměrné`; no OT is confirmed on either week alone until the reference-period average is computed at window close. | Under `rovnoměrné` (even) distribution, the weekly baseline **is** each week's roster — no multi-week averaging is needed. | [Zákoník práce §78–79](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-78/), [§93](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-93/) |
| **`Konto pracovní doby` does not suspend the underlying OT mechanism** | The balancing arrangement changes **how base pay is smoothed month to month** (see §7's `stálá mzda`), not whether the §93 8h/week-averaged ceiling and premium/comp-time rules keep applying underneath it. | — | — | [Zákoník práce §86–87](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-86/), [§93](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-93/) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night + overtime stack additively, same basis** | A night overtime hour carries **both** the +25% OT premium **and** the +10% night premium, added on the **one shared basis** — `průměrný výdělek` [average earnings]. Unlike Poland's two-basis split, every Czech statutory premium (OT/night/weekend/standby) shares this single basis. | A night OT hour: base + 25% + 10%, both computed off the same average-earnings figure. | — | [Zákoník práce §116](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-116/), [§93](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-93/) |
| **Comp-time-first vs. always-cash premiums** | Overtime (§4) and holiday work (§7.2/§10.7) both default to a **comp-time-first** election with a cash fallback; night, weekend, and standby premiums are **always cash** at their statutory %, with no comp-time alternative. | An employer cannot offer comp-time in lieu of the +10% night premium the way it can for OT hours. | — | [Zákoník práce §114](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-114/), [§115](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-115/), [§116](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-116/), [§118](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-118/) |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily rest — 11h (12h youth)** | **≥11 consecutive hours** between shifts for adults (**≥12h** for under-18s); reducible to **8h** in a taxatively-listed set of cases (continuous/non-stop operations, unevenly distributed working time, overtime), with the following rest period extended by the shortfall (seasonal agriculture: make-up within 3 weeks). | A shift ending 22:00 must not resume before 09:00 (11h); if reduced to 8h for a listed reason, the next rest period is extended by the missing 3h. | — | [Zákoník práce §90](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-90/) |
| **Weekly rest — 24h adjoining the 11h daily rest** | **≥24 consecutive hours**, which must **immediately adjoin** the §90 11h daily rest — together forming one continuous block that reconciles to the commonly-cited **≈35h** figure. Reducible to **24h alone**, with compensatory rest guaranteeing **≥70h over any 2-week period**. Youth: **≥48h**. | A worker's weekly rest block runs from Saturday 22:00 (end of Friday shift) through Sunday ~09:00+24h — the 11h and 24h legs adjoin, not merge into a flat 35h counter. | ⚠ **Correction history**: pre-2024 Czech transposition wrongly merged the two periods into one flat 24h entitlement; corrected by **Act No. 281/2023 Sb.**, effective 1 Jan 2024, to the current two-adjoining-periods model — treat older sources describing a flat 24h as obsolete. | [Zákoník práce §92](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-92/); [Act 281/2023 Sb.](https://www.zakonyprolidi.cz/cs/2023-281) 🔎 |
| **Maximum shift length (cross-ref §2)** | **12h** general ceiling; **up to 24h** in the narrow §83a healthcare exception. | A 14h shift is unlawful outside the §83a healthcare carve-out; a 22h continuous-care shift may be lawful only under §83a's specific conditions. | Edge-config only, not a default. | [Zákoník práce §83, §83a](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-83/) |
| **Meal-and-rest break** | **≥30 minutes**, no later than after **6 hours** of continuous work (**4.5 hours** for juveniles); splittable, but at least one part must be **≥15 minutes**; may not fall at shift start/end. **Unpaid** unless operations cannot be interrupted, in which case a paid rest-and-food allowance counts as working time. | An 8h shift needs a ≥30min break taken by the 6h mark; a 16-year-old apprentice's break trigger is 4.5h. | — | [Zákoník práce §88](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-88/) |
| **Safety break (`bezpečnostní přestávka`)** | Owed for VDU/screen work and other risk-bearing or monotonous work under implementing regulation — e.g. a short break after continuous screen work, or an activity rotation. **Counted as paid working time**, unlike the ordinary meal break. | A data-entry role gets short paid screen-break intervals distinct from the unpaid §88 meal break. | — | [Government Regulation 361/2007 Sb.](https://www.zakonyprolidi.cz/cs/2007-361) 🔎 (implementing [§89](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-89/)) |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night window** | **22:00–06:00** — fixed by statute, not CBA-redefinable the way Poland lets the employer set an 8h window. | Any hour falling in 22:00–06:00 is `NIGHT_HOURS`, regardless of shift start time. | — | [Zákoník práce §78(1)(j)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-78/), [§94](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-94/) |
| **"Night worker" (`zaměstnanec pracující v noci`) status** | An employee who works **≥3 hours** of their shift within the night window, **on average at least once weekly**, measured over a reference period of up to 26 consecutive weeks. | A worker regularly on a 22:00–07:00 rotation clears the ≥3h/≥once-weekly test and is classified a night worker. | 🔎 An alternative "≥¼ of annual working time at night" test appears in some English-language summaries (echoing EU Directive 2003/88/EC art. 2(4)(b)) but could not be corroborated against the operative Czech statutory text, which states only the ≥3h/shift test — treat the ¼-annual formulation as unconfirmed for Czech law. | [Zákoník práce §94](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-94/) |
| **Night-worker shift-length cap** | **8 hours within 24 consecutive hours**; where operational reasons prevent this, the **average** shift length over a reference period of up to 26 weeks (or 6 calendar months) must not exceed 8h. | A night worker occasionally pulling a 10h shift is compliant only if the average over the reference window stays ≤8h. | — | [Zákoník práce §94](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-94/) |
| **Mandatory occupational-health assessment** | The employer must ensure a night worker undergoes periodic health assessment, at the **employer's cost**, before starting night work and at defined intervals after. | — | Out of T&A calculation scope — tracked as an HR compliance flag. | [Zákoník práce §94](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-94/) |
| **Night premium (`Zákoník práce §116`)** | **+10% of average earnings**, minimum, per night hour — no partial-hour rounding. **Public-sector `plat`** [salary] track: fixed **20%** of average hourly earnings, non-adjustable. | A private-sector night hour: +10% of `průměrný výdělek`; a public-sector night hour: a flat +20%. | CBA/internal regulation may agree a **different amount and/or method** in either direction (unlike Poland's one-way-improvable posture) — but the public-sector 20% figure is non-adjustable. | [Zákoník práce §116](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-116/) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekend (Saturday/Sunday) premium** | **+10% of average earnings**, minimum, for every fraction of an hour worked on a Saturday or Sunday — a **calendar-day** test, not conditioned on it being that worker's rest day (unlike Poland's rest-day framing). | Any Sunday hour worked earns +10%, whether or not Sunday is the worker's normal rest day. | CBA/internal regulation may vary the amount/method (mirrors §116's override structure) but never below the 10% floor. | [Zákoník práce §118](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-118/) |
| **Public holidays — 13/year, 2 movable** | **13 statutory holidays** per year (below), including 2 that shift off the Easter computus. | 2026 has 13 dated holidays (see row below); a worker who would normally work on any of those 13 dates is paid as if worked (§6 below). | — | [Act 245/2000 Sb.](https://www.zakonyprolidi.cz/cs/2000-245) 🔎; [Zákoník práce §115](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-115/) |
| — 2026 calendar | 1 Jan (New Year/Restoration Day) · 3 Apr (Good Friday, movable) · 6 Apr (Easter Monday, movable) · 1 May (Labour Day) · 8 May (Liberation Day) · 5 Jul (Cyril & Methodius) · 6 Jul (Jan Hus Day) · 28 Sep (Czech Statehood Day) · 28 Oct (Independent Czechoslovak State Day) · 17 Nov (Freedom & Democracy Day) · 24 Dec (Christmas Eve) · 25 Dec (Christmas Day) · 26 Dec (2nd Day of Christmas) | Example: Good Friday and Easter Monday must be recomputed each year off the Easter date; the other 11 are fixed calendar dates. | Static date tables are wrong for the 2 movable holidays. | [Act 245/2000 Sb.](https://www.zakonyprolidi.cz/cs/2000-245) 🔎 |
| **Holiday-work remedy — comp-off first, +100% by agreement** | **Primary remedy**: achieved wage **plus** compensatory time off (`náhradní volno`) equal to the hours worked, granted by the end of the **3rd calendar month** following the holiday (or another agreed deadline). **Alternative**: employer and employee may instead agree a **+100% of average earnings** cash surcharge in lieu of comp-off. | A worker who works 6h on a public holiday gets 6h comp-off within 3 months (default) or, if agreed instead, +100% cash on those 6h. | Comp-off is the statutory default; cash is the bilateral alternative — the same "comp-time-first" pattern as §3's overtime election. | [Zákoník práce §115(1)–(3)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-115/) |
| **Holiday not worked — paid as if worked** | A holiday falling on a normal working day is paid at **average earnings** for the lost hours, whether or not it was actually worked. | A Tuesday holiday the worker would normally have worked 8h is paid 8h at average earnings, no deduction. | — | [Act 245/2000 Sb.](https://www.zakonyprolidi.cz/cs/2000-245) 🔎; [Zákoník práce §115](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-115/) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **`Konto pracovní doby` [working-time account] — activation** | Requires a **CBA or internal regulation** — cannot be imposed unilaterally on an individual employee without one of these instruments. Balancing period: max **26 weeks**, or **52 weeks by CBA** — the same ceiling as the reference period (§2). | An employer without a CBA cannot run `konto pracovní doby` at all; one with a CBA extending to 52 weeks can bank surplus/deficit hours across a full year. | — | [Zákoník práce §86–87](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-86/) |
| **`Konto pracovní doby` — the hours ledger** | Within the balancing period, hours worked above/below the scheduled baseline accrue as a running surplus/deficit, with a true-up at the balancing period's close — structurally the working-time-account analogue of a cyclical hours-bank. | A worker banks +12h in a busy month, later draws down 12h off; the ledger true-ups when the balancing period closes. | — | [Zákoník práce §86–87](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-86/) |
| **`Stálá mzda` [fixed guaranteed wage] — money, out of scope** | During the balancing period there is **no month-to-month link** between hours worked and pay: the employer pays a flat monthly wage at **≥80% of average earnings** (or **≥85%** under the alternative §86(4) procedure), even in a month with no scheduled work; a separate `účet mzdy` [wage account] true-ups at the balancing period's end. | A worker with CZK 30,000/month average earnings receives at least CZK 24,000 (80%) flat every month during the balancing period, regardless of that month's actual scheduled hours; the `účet mzdy` reconciles the gap at period close. | Money-side mechanism only — do **not** model as the hours ledger; kept here only as context for why employers adopt `konto pracovní doby`. | [Zákoník práce §86(4)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-86/) |
| **Overtime comp-time-in-lieu (`náhradní volno`)** | Bilateral election, **1:1** ratio, in lieu of the +25% cash OT premium (see §3b). **3-calendar-month cash-fallback**: if the employer fails to actually grant the agreed comp-time within 3 months (or another agreed deadline), the +25% cash premium becomes payable retroactively — the ledger converts to cash, it does not silently lapse. | 3 OT hours banked as comp-time convert to `OT_25: 3h` cash if not granted as time off within 3 months. | — | [Zákoník práce §114](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-114/) |
| **Holiday comp-time-off scheduling window** | The primary holiday-work remedy (§6) is comp-off scheduled by the end of the **3rd calendar month** following the holiday — the same 3-month cash-fallback pattern as overtime comp-time. | A worker who works 6h on a 5 May holiday must be granted 6h comp-off by 31 August; if not, the +100% cash surcharge becomes payable instead. | — | [Zákoník práce §115(1)–(2)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-115/) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Standby (`pracovní pohotovost`) — location & consent** | Standby may only be held **outside** the employer's workplace, and can only be **agreed**, never unilaterally ordered. (Pre-2007 law allowed on-premises standby under a different regime — that model no longer exists.) | An employee agrees to be reachable from home overnight; the employer cannot simply order on-premises standby duty under this regime. | — | [Zákoník práce §78(1)(h)](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-78/), [§95](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-95/) |
| **Standby premium** | **≥10% of average hourly earnings** per hour of standby, for the standby period itself (not work performed); CBA/internal regulation may set a higher rate. | A worker on 8h of home standby, no call-out, earns 8h × 10% of average hourly earnings. | — | [Zákoník práce §95](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-95/) |
| **Work performed during a call-out** | Counts as **ordinary working time** (or overtime, if it pushes the worker over their scheduled weekly hours per §3–4), paid at wage/salary rate, not the standby rate. Standby time with **no work performed does not count as working time** at all. | A 20-minute call-out during an otherwise quiet standby night is `WORKED_HOURS` (or OT); the remaining 7h40m of standby is separately compensated at the standby rate only, not counted toward daily/weekly working-time limits. | — | [Zákoník práce §95](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-95/) |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up pay** | No statutory show-up, reporting-time, or predictability-pay regime was identified (unlike US CA/NYC-style ordinances). | — | — | — none identified in current research — |
| **DPP/DPČ scheduling notice** | Working time under a DPP/DPČ must be scheduled **in writing at least 3 days before** the shift/period (unless otherwise agreed). | A DPP worker must receive their roster ≥3 days ahead of a shift, absent a different agreement. | — | [Zákoník práce §77](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-77/) (as amended, [Act 281/2023 Sb.](https://www.zakonyprolidi.cz/cs/2023-281) 🔎) |
| **DPP/DPČ self-rostering ban on protected days** | A ban applies on scheduling night, Saturday, Sunday, or holiday work under a **self-rostering arrangement** for DPP/DPČ workers. | — | — | [Zákoník práce §77](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-77/) (as amended, [Act 281/2023 Sb.](https://www.zakonyprolidi.cz/cs/2023-281) 🔎) |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Annual leave (`dovolená`) — hours-based accrual (2021 reform)** | Effective 1 Jan 2021: leave accrues in **hours** = weekly working hours × the statutory weeks of entitlement, replacing the old fixed-day model. | A 40h/week employee at the 4-week floor accrues **160 hours**; a 30h/week employee accrues **120 hours** (30×4). | — | [Act 285/2020 Sb.](https://www.zakonyprolidi.cz/cs/2020-285) 🔎; [Zákoník práce §211–223](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-211/) |
| **Annual leave floor** | **4 weeks/year** — general statutory minimum (all private-sector employees). **5 weeks/year** — state, territorial self-governing units, state funds, operating-subsidy-funded organizations. | A private-sector 40h/week employee is entitled to a 4-week floor = 160 hours/year (per the hours-based accrual rule above); a state-employed counterpart's floor is 5 weeks = 200 hours/year. | Academic/pedagogical staff receive **6 weeks** (8 weeks total is the carry-over-exempt portion — see below). | [Zákoník práce §211–212](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-211/) |
| **Full-entitlement dual test** | Full entitlement requires **both**: (a) the employment relationship lasts continuously **52 weeks** with the same employer, **and** (b) the employee actually worked **≥52 × their weekly hours** during the year. Absent either, leave accrues **proportionally**. | A worker on unpaid leave for half the year fails the actually-worked leg and accrues leave proportionally even with 52 weeks of continuous employment. | — | [Zákoník práce §213–214](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-213/) |
| **Leave carry-over** | Unused leave **automatically carries** to the next calendar year if the employer failed to schedule it, or on the employee's written request where operational/personal reasons prevented use. Carry-over may be **requested** only for the portion **exceeding 4 weeks** (6 weeks for academic/pedagogical staff). Carried leave must be **exhausted by the end of the following calendar year**. | An employee with 25 days entitled (4 weeks + 5 extra CBA days) can request carry-over only for days 21–25 (the portion above the 4-week/20-day floor). | 🔎 No hard multi-year expiry beyond "end of the following year" was located — treat as operative pending confirmation of any further limitation overlay. | [Zákoník práce §218](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-218/) |
| **Sick pay (`náhrada mzdy`/`nemocenská`)** | **No waiting period** — abolished permanently **1 July 2019**; sick pay runs from the very first missed shift. **Days 1–14**: employer-paid `náhrada mzdy` at 60% of a reduced/tiered average-earnings figure, for **working days only**. **From day 15**: `nemocenská` [sickness benefit] paid by **ČSSZ** [Czech Social Security Administration, the state sickness-insurance authority], covering calendar days including weekends/holidays. | An employee out sick from day 1 is paid by the employer through day 14, then the state benefit takes over from day 15. | The `karenční doba` [waiting period] has flip-flopped historically (introduced 2008, struck down same year, various reduced forms 2009–2013) — treat pre-2019 sources describing a waiting period as obsolete. | [Zákoník práce](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/); [Act on Sickness Insurance (187/2006 Sb.)](https://ppropo.mpsv.cz/zakon_187_2006) |
| **Maternity leave (`mateřská dovolená`)** | **28 weeks** (**37 weeks** for multiple births); normally starts **6–8 weeks before** the due date; **minimum 14 weeks**, and cannot end/be interrupted before **6 weeks post-birth**. | A worker due 1 June starts maternity leave around 20 April–4 May and cannot return before mid-July regardless of preference. | — | [Zákoník práce §195–197](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-195/) |
| **Parental leave (`rodičovská dovolená`)** | Available on request to either parent, up to the child's **3rd birthday**. | A parent can split parental leave with their partner across the child's first 3 years. | — | [Zákoník práce §196–198](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-196/) |
| **Paternity leave (`otcovská`) 🔎** | **2 weeks (14 calendar days)**, taken within the first **6 weeks** after the birth (or placement in care, for adoption/foster care); paid at **70%** of the reduced daily assessment base by ČSSZ. | A father takes his 14 days any time in the 6 weeks following the birth, at 70% of the reduced-basis daily rate. | 🔎 Not independently re-verified this pass (web-search budget exhausted) — figures are the well-established post-2022 statutory values (extended from 1 week to 2 weeks effective Jan 2022); confirm against the live consolidated text before final sign-off. | [Act on Sickness Insurance (187/2006 Sb.) §38a](https://ppropo.mpsv.cz/zakon_187_2006) 🔎 |
| **Short-term care leave (`ošetřovné`/OČR) 🔎** | Up to **9 calendar days** (**16 days** for a single parent) to care for a sick family member or a child under 10 whose school/childcare facility is closed; paid at **60%** of the reduced daily assessment base. | A parent takes 9 days to nurse a sick child through the acute phase of an illness. | 🔎 Not independently re-verified this pass — flag for confirmation of the current day-count and %. | [Act on Sickness Insurance (187/2006 Sb.) §39](https://ppropo.mpsv.cz/zakon_187_2006) 🔎 |
| **Long-term care leave (`dlouhodobé ošetřovné`) 🔎** | Up to **90 calendar days** per case, to provide long-term home care for a person following hospitalization certified as requiring such care; paid at **60%** of the reduced daily assessment base. Requires the employee to have been covered by sickness insurance for a qualifying period. | An employee takes up to 90 days to care for a parent discharged from hospital with a certified need for long-term home care. | 🔎 Not independently re-verified this pass — the exact hospitalization-length threshold has been amended over time; confirm the current figure against the live consolidated text. | [Act on Sickness Insurance (187/2006 Sb.) §41a](https://ppropo.mpsv.cz/zakon_187_2006) 🔎 |
| **Important personal obstacles (`důležité osobní překážky v práci`)** | Government Regulation 590/2006 Sb. sets time allowances for defined life events: own wedding (**2 days off, 1 paid**); child's wedding (**1 paid day**); death of spouse/child/parent (**paid day(s) + up to 5 further unpaid days**); death of sibling/grandparent/grandchild (**1 paid day**, +1 if organizing the funeral); plus medical-appointment and other listed allowances. | An employee marrying takes 2 days off, only the first of which is paid. | ⚠ This Regulation was amended around 22 Jan 2025 — verify current day-allowances against the live consolidated text before relying on a specific figure. | [Government Regulation 590/2006 Sb.](https://www.zakonyprolidi.cz/cs/2006-590) 🔎 |
| **DPP/DPČ leave entitlement** | Statutory paid leave applies where the agreement runs **≥4 weeks (28 calendar days)** in the year **and** the worker works **≥80 hours** in it. Effective **1 January 2024**. | A DPP running 6 weeks with 100 hours worked qualifies for statutory leave; one running 3 weeks does not. | — | [Zákoník práce §77](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-77/) (as amended, [Act 281/2023 Sb.](https://www.zakonyprolidi.cz/cs/2023-281) 🔎) |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Recording duty** | The employer must keep records for each employee showing the start/end of shifts worked, overtime, "further agreed overtime" (beyond the 150h ordered cap, by mutual agreement), night work, and standby time (both scheduled and actual). No prescribed format — paper or electronic; the employee has a right to inspect their own records. | — | — | [Zákoník práce §96](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-96/) |
| **Retention — two distinct document types** | **Working-time records**: **10 years** following the year concerned. **Payroll records (`mzdové listy`)**, needed for pension-insurance purposes: **45 calendar years** (extended from 30 years, effective 1 Jan 2023) — or **10 years** for employees who are already old-age pensioners. | A worker's 2026 time records must be kept until end-2036 (10 years); their 2026 `mzdové listy` payroll record must be kept until 2071 (45 years), or only until 2036 if the worker was already an old-age pensioner in 2026. | — | [Act 582/1991 Sb.](https://www.zakonyprolidi.cz/cs/1991-582) 🔎 |
| **No statutory punch tolerance/rounding** | Any tolerance/rounding is a policy/CBA choice; rounding must not systematically understate recorded time (it would corrupt the annual overtime counter and the night/weekend/holiday tallies). | — | — | — none identified in current research — |
| **Missing time / missing day** | Worked < scheduled (≥1 punch recorded) → missing hours; a scheduled day with zero punches → missing day. | — | — | [Zákoník práce §96](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/paragraf-96/) (engine semantics) |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/czech-republic.md` (July 2026) — the primary source
  for this file's statutory detail, itself keyed to `zakonyprolidi.cz/cs/2006-262`,
  `kurzy.cz/zakony/262-2006-zakonik-prace`, `pracomat.cz`, and the official MPSV staff handbook
  `ppropo.mpsv.cz`.
- **Predecessor memo:** `support-memos/czech-republic.md` (parked in the appendix below).
- **Zákoník práce (Act No. 262/2006 Sb.):** [Kurzy.cz consolidated text](https://www.kurzy.cz/zakony/262-2006-zakonik-prace/)
  — per-section links confirmed resolvable this pass (`paragraf-N` pattern).
- **Public holidays:** [Act No. 245/2000 Sb.](https://www.zakonyprolidi.cz/cs/2000-245) 🔎
- **Hours-based leave reform:** [Act No. 285/2020 Sb.](https://www.zakonyprolidi.cz/cs/2020-285) 🔎
- **Rest-period correction, DPP/DPČ extension:** [Act No. 281/2023 Sb.](https://www.zakonyprolidi.cz/cs/2023-281) 🔎 ("transposition novela").
- **2025 amendment:** [Act No. 120/2025 Sb.](https://www.zakonyprolidi.cz/cs/2025-120) 🔎 (the amendment
  current commentary labels "the flexinovela").
- **Minimum-wage indexation:** [Act No. 230/2024 Sb.](https://www.zakonyprolidi.cz/cs/2024-230) 🔎
- **Important personal obstacles:** [Government Regulation No. 590/2006 Sb.](https://www.zakonyprolidi.cz/cs/2006-590) 🔎
- **Safety breaks:** [Government Regulation No. 361/2007 Sb.](https://www.zakonyprolidi.cz/cs/2007-361) 🔎
- **Record retention:** [Act No. 582/1991 Sb.](https://www.zakonyprolidi.cz/cs/1991-582) 🔎
- **Sickness/paternity/care benefits:** [Act on Sickness Insurance (Zákon č. 187/2006 Sb., o
  nemocenském pojištění)](https://ppropo.mpsv.cz/zakon_187_2006) §38a (paternity), §39 (short-term
  care), §41a (long-term care) — 🔎 figures not freshly re-verified this pass; corroborated against
  well-established pre-2026 statutory text.
- **Corroboration:** remote.com Czech Republic country page (2026 minimum-wage figure cross-check,
  CZK 22,400/month, consistent with the repo seed).
- **MPSV** (Ministry of Labour and Social Affairs, [mpsv.gov.cz](https://mpsv.gov.cz/) /
  [mpsv.gov.cz/web/en](https://mpsv.gov.cz/web/en)) — official minimum-wage announcements, working-time handbook.
- **ČSSZ** ([Czech Social Security Administration](https://www.cssz.gov.cz/)) — sickness/paternity/care-benefit administration.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

**Verdict: 🟠 Partial — a statutory-premium fit (Poland/Portugal class).** The Czech Republic is a
**statutory-premium** country: the Zákoník práce (Act No. 262/2006 Sb.) *prices* overtime at **+25%**, night
at **+10%**, Saturday/Sunday at **+10%**, standby at **+10%**, and worked-holiday at **+100% by agreement** —
all on a single unified basis (average earnings, `průměrný výdělek`). So, like Poland, the engine must *emit*
premiums from statute, and here it does well: our per-day/per-week surplus model + configurable rate rows by
day-type + day/night split emit the OT, night, and weekend/holiday bands cleanly, and the distinctive
**`konto pracovní doby`** working-time account maps onto our cyclical **Banked Hours**. The gaps cluster in
the **cross-run and validation** machinery Czech law layers on top: the **reference-period averaging** that
decides OT under uneven distribution / konto, the **two-tier 150h/416h annual OT counter**, the
**holiday-work comp-off-first** remedy with its 3-month window, the **DPP/DPČ regime** with its own hour caps,
and rest / working-time-limit *validation*. Read with the scope, verdict key, and **Basis key** in
[`README.md`](./README.md). No verdict is DB-confirmed this pass (live-DB IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). This closes the
> *plain* leg of the Czech compound overtime test (hours beyond the weekly baseline) for **even-distribution
> (`rovnoměrné`)** schedules — the common case. It does **not** close the **reference-period averaging** that
> the uneven-distribution / `konto pracovní doby` regime needs, nor the annual 150h/416h counters. Scope is
> *the weekly trigger only*; noted as a Verify item because it isn't yet `[API]/[UI]`-visible.

**Legal source:** `worldwide-calculations/czech-republic.md` (July 2026). **Capability sources:**
`pay-policy-configuration.md` (+ §15 `List Business Rules Groups` API map), `data-model/fields.md` / `enums.md`,
`flow/configuration.md`, `flow/calculation-flow.md`, `flow/cyclical-banked-hours.md`.

### Governing sources — who actually sets the rules

The compliance answer is conditional, but the Czech Republic is — like Poland — the **statute-dominant** case:
the operative T&A numbers live **in** the Zákoník práce, not below it. The Code sets almost every number
(baseline, OT triggers, premiums, the 150h/416h caps, 11h/24h rest, night/weekend premiums, the 4-week
hours-based leave floor); the levers a specific employer *chooses* — the reduced-week category, even/uneven
distribution, the reference-period length, `konto pracovní doby` on/off, and any CBA improvement on the floors
— are what the BRG configures. "Do we support the Czech Republic?" really means "**which working-time regime
(distribution + konto + reference period) applies, and is this a `pracovní poměr` or a DPP/DPČ agreement?**"

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| Statute | Zákoník práce (262/2006 Sb.), Act 245/2000 Sb. (holidays), Gov. Reg. 590/2006 & 361/2007 Sb. | **Yes — dominant.** 40h (37.5/38.75 reduced) baseline, compound OT trigger, +25%/+10%/+10%/+10%/+100%, 150h/416h annual caps, 11h/24h rest, night/weekend premiums, 13 holidays, 4-week hours-based leave, DPP/DPČ caps. |
| Collective agreement | kolektivní smlouva | **Only to improve** — extend the reference period to 52 weeks, activate konto, raise the agreed OT portion, adjust the night/weekend premium amount or method (never below the floor). |
| Internal regulation | vnitřní předpis | **Yes, operationally** — activates konto, sets the reference-period length, redefines the night-premium method within statute. |
| Individual contract | pracovní smlouva | Improves on statute/CBA; the vehicle for the §114(3) salary-inclusive-of-overtime agreement. |

**Illustrative secondary-source rules**

*⚠ ILLUSTRATIVE — varies by CBA / internal regulation / sector / year; not universal; NOT a statement of our support.*

- Reference/balancing period: default ≤26 weeks; extendable to 52 weeks only via CBA (§78) — *CBA* — ✅ configurable window value
- Distribution model: `rovnoměrné` (even) vs `nerovnoměrné` (uneven, reference-period-averaged) (§79) — *internal regulation* — 🟠
- `Konto pracovní doby` activation + balancing-period length + `stálá mzda` % (80/85%) (§86–87) — *CBA / internal regulation* — 🟡 (hours ledger only; the wage-smoothing side is money)
- Night premium set above the 10% floor, or public-sector `plat` fixed 20% (§116) — *CBA / statute* — money/downstream
- OT priced into base salary up to 150h (general) / 416h (managerial), §114(3) — *contract / CBA* — ❌ (event-suppression cap absent)

### Rule-by-rule (Basis = where the verdict comes from)

| # | Czech Republic requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Weekly baseline — 40h, reduced to 38.75h (two-shift) / 37.5h (three-shift, continuous, underground) (§79).** The baseline the OT and limit checks measure against; the reduced categories are just lower baseline values | Planned hours come from the roster; weekly OT trigger on a configurable weekly threshold | 🟡 Configurable | [API][UI][PO] | The baseline is a threshold **value**, not a capability question — `weekly_baseline_category` selects which weekly number the trigger uses. Plain weekly trigger ✅ per PO |
| 2 | **Distribution + reference period (§78–79).** `Rovnoměrné` (even) spreads the baseline equally each week; `nerovnoměrné` (uneven) varies weekly hours so long as the **average** over the reference period (≤26 weeks, CBA-extendable to 52) holds — the averaging that makes the reference period and konto meaningful | Even case fits surplus-over-planned + weekly trigger; no multi-week averaging window | 🟠 Partial | [API][PO][ABS] | Even distribution ✅ (each week's roster is the baseline); **reference-period averaging** (uneven/konto) = Gap `[ABS]` — same period-averaging primitive as Poland/annualisation |
| 3 | **Maximum shift length — 12h (§83), up to 24h in narrow §83a healthcare cases.** A ceiling on shift length; a breach should raise a flag, not silently cap | No working-time-limit breach flagging | ❌ Gap | [ABS] | Single-period threshold flag (build S); we compute pay, not shift-length enforcement. The 24h §83a case is edge-config, not a default |
| 4 | **Overtime — a compound test (§4.1, §93).** An OT hour must be **both** beyond the pre-set roster **and** beyond the weekly baseline (averaged over the reference period where uneven/konto applies) — a schedule-relative test, not a flat "hours > 40/week" | OT = surplus over planned (per day) + weekly OT trigger | 🟠 Partial | [API][PO][ABS] | Beyond-roster = surplus-over-planned ✅ `[API]`; beyond-weekly-baseline ✅ `[PO]` (even case). **The compound *AND* + reference-period averaging = Gap** — our per-day surplus may over-count hours that clear the roster but not the weekly baseline. 🔎 confirm the AND-composition |
| 5 | **OT premium +25%, or bilateral comp-time (§114).** Overtime earns +25% of average earnings, **unless** employer and employee agree instead on compensatory time off (`náhradní volno`) 1:1; if the comp-time isn't granted within **3 calendar months**, the +25% cash becomes payable retroactively | Rate row (`phases[]`) by `daysMask`, % per row; comp-time-in-lieu via `hoursBank*`; positive-bank-at-expiry → EH | 🟡 / 🟠 | [API] | OT-hours + typed band emit ✅ `[API]` (% is money); comp-time = Banked Hours (1:1, the plain ratio ✅); **the 3-calendar-month *per-instance* cash-fallback deadline** ≠ the BH cycle clock — Partial |
| 6 | **8h/week OT average over the reference period (§93).** A rolling compliance ceiling — average ordered+agreed overtime ≤8h/week across the reference period; independent of the annual caps | No working-time-limit validation; no rolling average | ❌ Gap | [ABS] | Period-averaging validation (build M); shares the #2 primitive; non-pay-corrupting |
| 7 | **Two-tier annual OT cap — 150h ordered / 416h absolute (§93).** 150h/year is the most the employer may **order unilaterally**; beyond it, only by **mutual agreement**, up to the absolute 416h/year. A running per-worker YTD counter driving both thresholds | Overall **period cap** on OT (`hoursBankLimits[]` / extra-hours limits, e.g. per month) | 🟠 Partial | [API][ABS] | Per-period cap ✅ `[API]`; the **per-worker YTD two-tier counter = Gap** — needs `SourceHistoricalState` `[DES]` (future). 416h is agreement-gated, not the default annual limit |
| 8 | **Salary-inclusive-of-overtime cap (§114(3), §1.2).** By written agreement, OT may be priced into base salary up to **150h/year** (general) or **416h/year** (`vedoucí zaměstnanci`); hours within the cap generate no separate premium/comp-time, only hours beyond it do | — (crude workaround: assign no OT policy) | ❌ Gap | [ABS] | No `salary_includes_ot` + `ot_inclusive_cap` event-suppression. Not a full exemption — suppress up to N hours then resume normal OT — so "assign no-OT policy" doesn't mitigate cleanly |
| 9 | **`Konto pracovní doby` hours ledger (§86–87).** Balancing-period surplus/deficit accrues as a running ledger with a true-up at the balancing period's close — the direct analogue of Banked Hours | Cyclical Banked Hours (`hoursBank*`: cycle length, caps, expiry, carry) | 🟡 Configurable | [API] | Maps onto cyclical BH with the balancing period as the cycle (`cyclical-banked-hours.md`). The `stálá mzda`/`účet mzdy` wage-smoothing side is **money — out of scope** (don't model it as the hours bank). The OT-averaging *underneath* konto is the #2 gap |
| 10 | **Night window 22:00–06:00 + night premium +10% (§94, §116).** A fixed statutory window; every night hour totalled and carrying +10% of average earnings (public-sector `plat` fixed at 20%) | `nightShift {%, start, end, applyEntirePeriod}` | ✅ / 🟡 | [API][UI] | Night-hour **emission** ✅ `[API]`; window configurable to 22:00–06:00; the % **and its average-earnings basis are money/downstream**. The 20% `plat` value is a config value |
| 11 | **"Night worker" status + 8h shift-length limit (§94).** A worker averaging ≥3h night work/shift ≥once weekly (≤26-week window) is a night worker, capped at 8h/24h (or an 8h average over ≤26 weeks) | — | ❌ Gap | [ABS] | No night-worker classifier or 8h-shift cap counter (`NIGHT_8H_AVG_EXCEEDED`). The ≥¼-annual variant is unconfirmed for CZ (see 🔎) |
| 12 | **Night + OT stack additively, same basis (§116, §4).** A night overtime hour carries **both** +25% (OT) **and** +10% (night), added on the one `AVERAGE_EARNINGS` basis | Named payroll-event per rate row; day/night `type` split | ✅ / 🟠 | [API][DES] | Typed buckets + day/night split ✅ `[API]`; the general **additive composition mode** is `[DES]` — Partial |
| 13 | **Weekend — Saturday/Sunday +10% (§118).** Every hour worked on a Saturday or Sunday earns +10% of average earnings, on a **calendar-day** test (not conditioned on it being that worker's rest day) | Rate rows by `daysMask` (Saturday, Sunday day-groups), % per row | 🟡 Configurable | [API] | Saturday and Sunday are distinct `daysMask` day-groups ✅ `[API]` — the calendar-day test maps directly; the % is money |
| 14 | **13 public holidays, 2 movable off Easter (§115, Act 245/2000 Sb.).** A per-year calendar; Good Friday and Easter Monday shift annually | Holiday calendar (`SourceHoliday`), jurisdiction-keyed; Holiday bit in `daysMask` | ✅ | [FLD][API] | Calendar reference data; movable feasts are calendar content, not a capability |
| 15 | **Holiday-work remedy — comp-off first, +100% by agreement (§115).** The primary remedy is achieved wage **+ compensatory time off** (`náhradní volno`) equal to the hours, granted within **3 calendar months**; a +100% cash surcharge is the *bilateral alternative* only | Sunday/Holiday premium rows (+100% emission); banked rest | 🟠 Partial | [API][ABS] | +100% cash **emission** ✅ `[API]`; the **comp-off-FIRST ordering + the 3-calendar-month scheduling window** (`HOLIDAY_COMP_TIME_OFF`) = Gap `[ABS]` — same lieu-scheduling family as Poland's day-off-in-lieu-first |
| 16 | **Holiday not worked, paid as if worked (§115, Act 245/2000 Sb.).** A holiday falling on a normal working day is paid at average earnings for the lost hours | Holiday calendar + expected-shift reconstruction | 🟡 Configurable | [FLD][DES] | `PUBLIC_HOLIDAY_OFF` — the expected shift on a holiday; standard engine handling |
| 17 | **Daily rest — 11h/24h (§90), reducible to 8h in listed cases with make-up.** ≥11 consecutive hours between shifts (≥12h youth); reducible to 8h for continuous ops / uneven distribution / overtime, with the following rest extended by the shortfall | `crossShiftsInterval {interval=660min=11h, phases[]}` | 🟠 Partial / 🔎 | [API] | 11h threshold field exists `[API]`; **validation behaviour = 🔎**; the 8h-reduced-with-make-up tracking = Gap `[ABS]` |
| 18 | **Weekly rest — 24h adjoining the 11h daily rest (≈35h) (§92).** ≥24 consecutive hours that must immediately adjoin the §90 11h rest (post-Act 281/2023 Sb., in force 1 Jan 2024); reducible to 24h alone with a ≥70h/2-week compensatory guarantee (≥48h youth) | — (single daily interval only) | ❌ Gap | [ABS] | No weekly-rest accumulation window; the two-**adjoining**-periods model (not a merged 35h counter) adds nuance. `crossShiftsInterval` is a different (daily) axis |
| 19 | **Meal-and-rest break — ≥30min after 6h (§88), 4.5h juveniles.** ≥30 min (splittable, one part ≥15 min), not at shift start/end; **unpaid** unless operations can't be interrupted (then a paid allowance) | Break config on schedule (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | [DES] | Breaks configurable `[DES]`; the **min-break-by-hours *validation/flagging*** (≥30 min at the 6h/4.5h trigger) is unconfirmed |
| 20 | **Safety break — paid (§89, Gov. Reg. 361/2007 Sb.).** For VDU/hazardous/monotonous work; **counted as paid working time**, distinct from the unpaid meal break | Break config can mark a break paid | 🟠 Partial | [DES] | `SAFETY_BREAK_HOURS` — a paid-break overlay maps to the paid-break flag; the specific §89 hazardous-profile semantics aren't modeled |
| 21 | **Standby — `pracovní pohotovost`, +10% (§95).** Outside-workplace only, must be **agreed** (never ordered); standby time earns ≥10% of average earnings; work actually performed during a call-out is ordinary/overtime working time | `onCalls {compensation}` (availability + activation, paid separately) | 🟠 Partial | [API] | `[API]`-confirmed availability + activation split; the **outside-workplace-only** constraint + "standby-with-no-work isn't working time" nuance applied manually. Call-out folds back into OT (#4–7) |
| 22 | **Annual leave — hours-based (§211–223).** Accrues in **hours** = weekly hours × 4 weeks (basic) / ×5 (public sector), on a dual full-entitlement test (52-week continuity **and** actually-worked ≥52×weekly-hours), with single-year carry-over of the portion above 4/6 weeks | — | ❌ Gap | [ABS] | Cross-run leave-accrual ledger + dual-condition proration + carry-over window absent (leave handled generically as absences) |
| 23 | **Sick / maternity / parental / obstacle leave (§11, Gov. Reg. 590/2006 Sb.).** Sick from day 1 (no waiting period), 14-day employer/ČSSZ split downstream; maternity 28/37 weeks; parental to age 3; important-personal-obstacle allowances — all **quantities** in scope, pay out of scope | `SourceRequest.*` request/absence handling | 🟠 Partial | [DES][FLD] | Generic absence handling exists; the **quantity** (days/hours absent) is in scope for scheduling/expected-shift; the specific Czech leave semantics aren't modeled |
| 24 | **DPP / DPČ — looser agreement regimes (§74–77, §12).** `DPP` ≤300h/year per employer; `DPČ` ≤half the weekly baseline on average; **no ordinary overtime mechanism**, but night/weekend/holiday/standby premiums + rest/break rules **do** apply (since Act 281/2023 Sb.) | — (no regime axis; `SourceUserProfile.exempt` is `[DES]`) | 🟠 Partial / ❌ | [ABS] | The premium overlays (§§5–7, 10, 13, 15) emit today ✅; but **no employment-form regime attribute** to route the profile and **no 300h/half-baseline cross-run counter** (`DPP_ANNUAL_300H_EXCEEDED`); OT suppression must be done by assigning a no-OT policy |
| 25 | **Protected categories + youth (§1.1).** Pregnant employees / parents of a child under 1 barred from *ordered* OT (consent per instance); under-18s: no ordered OT, 12h daily / 48h weekly rest, 4.5h break trigger | — | ❌ Gap | [ABS] | No `ot_consent_required` / `young_worker` profile — protected-population OT gating + the stricter youth rest/break limits are absent |
| 26 | **Time recording — record all hours (§96).** Start/end of shifts, overtime, "further agreed overtime," night, and standby; no prescribed format; **no statutory punch tolerance/rounding** (any is policy/CBA config, must not understate). Retention 10y (working-time) / 45y (payroll) | Engine records every punch; typed events; approved-event locking; `tolerance {limit, scope, active}` | ✅ | [FLD][API] | Records all hours ✅ `[FLD]`; typed OT/night/weekend buckets exist; tolerance is a configurable value defaulting to none `[API]`. Retention windows are downstream config |
| 27 | **Missing time / missing day (§96, engine semantics).** Worked < scheduled (≥1 punch) → missing hours; scheduled day, zero punches → missing day | `MISSING_HOURS` / `MISSING_DAY` | ✅ | [FLD][DES] | Standard engine handling |

### Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable (🟡)
> rules are omitted (they need no mitigation) — including the premium rows we emit well: the weekly baseline
> value (#1), night window + premium (#10), the Saturday/Sunday rate rows (#13), the holiday calendar (#14),
> the non-worked holiday (#16), the konto→BH ledger (#9), the OT-band + comp-time bank (#5), and
> record-all-hours + missing semantics (#26, #27).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks/corrupts correct output) · 🟠 High
> (common, no full mitigation, but scoped, or core to the OT model) · 🟡 Medium (moderately common, or a usable
> mitigation, or moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow
> population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Czech market* a rule bites. **⚠ Customer-relative** — shifts with the
>   customer's workforce: **manufacturing/retail on uneven distribution or konto → #2/#6 averaging + #7 annual
>   counter** bite hardest; **DPP/DPČ-heavy (gig, seasonal, students) → #24 regime + 300h counter**;
>   **holiday-working sectors → #15 comp-off-first**; **night-working populations → #11 night-worker cap**.
> - **Build-effort** = my estimate, **grounded in the capability sources** (Existing/`[API]` ≈ config/small
>   **S**; a cross-run YTD counter, a regime attribute, or a rolling/period average / band-logic on existing
>   primitives ≈ **M**; net-new subsystem ≈ **L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (CZ market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#7 150h/416h annual OT counter** | **Weak** — per-period OT cap (`hoursBankLimits[]`) ≠ a per-worker YTD counter; manual YTD tracking of both the 150h ordered and 416h absolute tiers | **High** — all OT workers; bites high-OT ones | **M** — `SourceHistoricalState` two-tier YTD counter (`[DES]`) | 🟠 **High** |
| **#15 Holiday comp-off-FIRST + 3-mo window** | **Partial** — premium rows emit +100% and BH banks rest, but the "comp-off first, cash only if not granted in 3 calendar months" ordering + the scheduling window is applied manually | **High** — any holiday-working sector (retail, hospitality, healthcare, manufacturing) | **M** — lieu-scheduling window + ordering on existing bank/premium primitives | 🟠 **High** |
| **#24 DPP/DPČ regime + 300h counter** | **Partial** — the premium overlays emit and OT can be suppressed by assigning a no-OT policy; but there is no employment-form regime attribute and no 300h/half-baseline counter — the caps are tracked manually | **High** — DPP/DPČ is a very common CZ engagement form (part-time, seasonal, students, gig) | **M** — regime attribute (S) + cross-run 300h/half-baseline counter (M) | 🟠 **High** |
| **#2 Uneven-distribution / konto OT averaging (+ compound-AND)** | **Partial** — the even-distribution weekly trigger is ✅; averaging over the reference period is manual, and pay stays correct on the daily/weekly axis. The compound *AND* may over-count where an hour clears the roster but not the weekly baseline | **High** as the core OT determination for uneven/konto workers (common in CZ industry); non-corrupting on the plain axis | **M** — period-averaging over the reference window (same primitive as #6) | 🟡 **Medium** |
| **#6 8h/week OT average validation** | **Partial** — manual monitoring; **pay stays correct** (the average only decides legality, not what's paid) | **High** as a legal obligation (non-corrupting) | **M** — pure period-average (shares #2's primitive) | 🟡 **Medium** |
| **#8 Salary-inclusive-of-OT cap suppression** | **Weak** — no cap-bounded event suppression; "assign no-OT policy" doesn't fit (OT resumes beyond the cap); manual tracking of the 150h/416h inclusive cap | **Med** — managerial + agreed inclusive-salary populations | **M** — per-worker `ot_inclusive_cap` that suppresses events up to N then resumes | 🟡 **Medium** |
| **#11 Night-worker status + 8h shift cap** | **None** — no night-worker classifier (≥3h/shift, ≥once weekly, ≤26-wk) or 8h/24h cap flag | **Med** — night-working populations | **M** — status classifier + rolling cap | 🟡 **Medium** |
| **#19 Meal-break min-by-hours validation** | **Config** — configure the ≥30-min break on the schedule at the 6h/4.5h trigger; the *validation/flagging* of an insufficient break is the open piece | **High** (all workers), legal obligation, non-corrupting | **S-M** — min-break-by-hours validation | 🟡 **Medium** (⚠ validation unconfirmed) |
| **#22 Annual-leave hours-based accrual ledger** | **Partial** — leave handled as absences/requests; the weekly-hours × 4/5 accrual + dual continuity/actually-worked proration + single-year carry-over need a leave module or manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **M** — hours-based accrual counter + dual-test proration | 🟡 **Medium** |
| **#3 Max shift length 12h validation** | **Partial** — notification/alert thresholds as manual monitoring; **pay stays correct** | **Med** — long-shift sectors (healthcare, continuous ops) | **S** — single-period threshold flag | 🟢 **Low** |
| **#5 OT comp-time 3-mo cash-fallback** | **Strong** — BH already gives 1:1 comp-time-in-lieu; only the *per-instance* 3-calendar-month deadline (convert remaining to `OT_25`) differs from the cycle clock | **Med** — a common OT election | **S** — per-instance expiry parameter on the bank | 🟢 **Low** |
| **#12 Additive night/weekend/holiday+OT composition** | **Partial** — typed buckets emit today; the general additive-composition mode is `[DES]` | **Med** | **M** | 🟢 **Low** |
| **#17 Daily 11h rest validation + 8h-reduced make-up** | **Partial** — the 11h `crossShiftsInterval` field exists; whether it *validates* is 🔎; the 8h-reduced make-up tracking is absent | **High** as a legal obligation (non-corrupting) | **S-M** — threshold validation + make-up tracking | 🟢 **Low** |
| **#18 Weekly 24h-adjoining-11h (≈35h) rest** | **None** — no weekly-rest accumulation window; the two-**adjoining**-periods model + the 70h/2-week compensatory check are absent | **High** as a legal obligation (non-corrupting) | **S-M** — weekly-rest window + adjoining check | 🟢 **Low** |
| **#20 Safety break §89 (paid)** | **Partial** — a paid-break flag exists; the specific VDU/hazardous §89 semantics aren't modeled | **Low-Med** — screen/hazardous-work roles | **S** — paid-break overlay profile | 🟢 **Low** |
| **#21 Standby `pohotovost` nuances** | **Partial** — `onCalls {compensation}` covers availability + activation; the outside-workplace-only constraint + "no-work standby isn't working time" applied manually | **Med** — on-call populations | **S-M** — location/rule params | 🟢 **Low** |
| **#23 Sick / maternity / parental / obstacle absences** | **Partial** — generic `SourceRequest` absence handling covers the quantities; the specific Czech leave semantics aren't modeled | **Med** — across the workforce, but adjacent to core T&A | **S-M** — leave-type semantics on the request primitive | 🟢 **Low** |
| **#25 Protected-category + youth OT profiles** | **Weak** — no `ot_consent_required` / `young_worker` profile; ordered-OT gating + youth rest/break limits tracked manually | **Low** — narrow populations | **S-M** — protected/youth flags + limit profile | 🟢 **Low** |

#### Severity roll-up
- **🔴 Critical (0):** none — Czech OT is **not** annualised (even distribution is weekly ✅; uneven/konto is
  averaged over the reference period, not decided only at year-close), so it does not share Spain's shape.
  The 150h/416h are annual *caps* (counters/validation), not the OT *determination*.
- **🟠 High (3):** 150h/416h two-tier annual OT counter (#7), holiday comp-off-first + 3-month window (#15),
  DPP/DPČ regime + 300h counter (#24).
- **🟡 Medium (6):** uneven-distribution / konto reference-period OT averaging + compound-AND (#2), 8h/week OT
  average validation (#6), salary-inclusive-of-OT cap suppression (#8), night-worker status + 8h cap (#11),
  meal-break validation (#19), hours-based leave accrual ledger (#22).
- **🟢 Low (8):** max shift length 12h (#3), OT comp-time 3-mo cash-fallback (#5), additive premium composition
  (#12), daily 11h rest + make-up (#17), weekly 24h-adjoining rest (#18), safety break §89 (#20), standby
  nuances (#21), sick/maternity/parental/obstacle absences (#23), protected/youth OT profiles (#25).

### The big gaps (the ❌/High items, grouped)
1. **Reference-period averaging + working-time-limit validation** (#2, #6, #3, #17, #18) — Czech OT under
   uneven distribution / konto is *averaged* over the reference period; the plain **weekly OT trigger is now
   ✅** (per PO, even-distribution case) but the multi-week **averaging** + the 8h/week-average, 12h-shift,
   11h-daily, and 24h-adjoining-weekly-rest *validations* remain gaps. We compute pay, not limit enforcement.
2. **Cross-run annual counters** (#7, #24) — the **two-tier 150h/416h** per-worker YTD OT counter and the
   **DPP 300h / DPČ half-baseline** caps are per-worker YTD counters, not per-period caps.
3. **Lieu-scheduling — comp-off-FIRST** (#15) — holiday work is rest-first, cash-only-if-not, with a
   3-calendar-month scheduling window; the ordering + window synthesis is a gap (the +100% cash *emits*).
4. **Regime gating** (#24, #8, #25) — the DPP/DPČ employment-form axis, the §114(3) salary-inclusive-of-OT
   cap, and the protected/youth OT profiles all need a per-worker regime/flag layer the engine lacks today.

### Where the Czech Republic scores well
- **Statutory premiums ride our rate rows** (#5, #10, #12, #13, #15): the per-day/per-week surplus model +
  `phases[]` rate rows by `daysMask` + day/night split emit the +25% OT, +10% night, +10% Saturday/Sunday, and
  +100% worked-holiday bands cleanly `[API]` — and the **single unified basis** (`AVERAGE_EARNINGS`) makes the
  typed-band tagging simpler than Poland's two-basis split (the % itself is downstream money either way).
- **`Konto pracovní doby` → cyclical Banked Hours** (#9): the working-time-account hours ledger maps directly
  onto our cyclical BH (cycle length = balancing period, caps, expiry, carry) `[API]`; keep it strictly
  separate from the `stálá mzda` wage account (money).
- **Comp-time-in-lieu bank** (#5): BH already gives the 1:1 `náhradní volno` election — the plain ratio, no
  non-unit multiplier needed (unlike Poland's 1.5:1).
- **Night window + weekly baseline + weekly OT trigger** (#1, #10): configurable night window to the fixed
  22:00–06:00, and the plain weekly baseline (40/38.75/37.5h) rides the now-supported weekly trigger `[PO]`.
- **Holiday calendar + record-all-hours** (#14, #26, #27): the 13-holiday per-year calendar with movable Easter
  feasts is reference data `[FLD]`; the engine records every punch (a genuine §96 compliance value-add) with
  typed OT/night/weekend buckets and configurable tolerance defaulting to none.

### 🔎 Verify before telling the customer
- **Weekly OT visibility** — the weekly trigger is `[PO]`-committed, not yet observed in the 2026-07-08 UI or
  the 2024 API sample; confirm ship status before asserting the even-distribution OT case.
- **Compound OT test (`beyond roster` AND `beyond weekly baseline`)** — confirm our per-day surplus model
  doesn't over-count hours that clear the roster but not the weekly baseline under uneven distribution.
- **`crossShiftsInterval`** — does the 11h field *validate* the rest or only classify/reshape? Weekly
  24h-adjoining-11h rest is absent regardless.
- **Meal-break min-by-hours** — is the ≥30-min-at-6h break *validated/flagged*, or only configured?
- **Any weekly/period accumulation** OT beyond the per-cycle bank in the live product (version drift vs the
  2024 `[API]` sample) — the reference-period averaging and the 150h/416h counters are `[ABS]` in that sample.
- **Night-worker "≥¼ annual" variant** — the research file flags this as unconfirmed for CZ (the operative
  statute states only ≥3h/shift, ≥once weekly, ≤26-week reference); confirm before hard-coding a classifier.

### Bottom line for the customer
The Czech Republic is a **statutory-premium fit, Poland/Portugal class**. Because our engine's core strength is
**computing configurable premiums per day/hour type**, we emit its overtime (+25%), night (+10%), Saturday/
Sunday (+10%), and worked-holiday (+100%) bands well today (`[API]`-grounded), the distinctive `konto pracovní
doby` hours ledger maps onto our cyclical Banked Hours, and the plain weekly OT trigger is now supported. But
the Czech Republic's **cross-run and validation** machinery — the **reference-period averaging** that decides
OT under uneven distribution / konto, the **two-tier 150h/416h annual OT counter**, the **holiday comp-off-first**
remedy with its 3-month window, the **DPP/DPČ regime** with its 300h/half-baseline caps, and rest / working-time-
limit *validation* — is **not shipping today**. Honest status: **partial; strong on the daily/weekly premiums
and the konto hours bank, weak on the annual counters, reference-period averaging, lieu-scheduling, and
limit-validation.** No verdict is DB-confirmed this pass (IAM blocked).
