# Philippines — T&A requirements

> **What this is.** The ground-truth reference for the Philippines' time-&-attendance legal
> requirements, detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive**
> and **atomic**: **one legal proposition per row**, each row self-contained (no "see §X" as the only
> content), with exact values, a worked example wherever a number is involved, variants, and a
> `Basis` that **links to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, ₱, tax, gross-to-net) is out of scope (premiums are
> named for context in `Values` but the deliverable is the typed hour/day event).
> **Term convention:** every non-English (Filipino/Tagalog) term and Philippine-specific acronym
> (DOLE [Department of Labor and Employment], SIL [Service Incentive Leave], NSD [Night Shift
> Differential], CWW [Compressed Workweek]) is glossed in English in brackets on first use in a
> section.
>
> **The one structural fact that shapes this whole document.** The Philippines is **statute-first
> and largely centralized** — there is no province/state layer analogous to Germany's regions or
> Australia's states. The **Labor Code** (Presidential Decree No. 442, a single national law) fixes
> **both** the working-time limits **and** the OT/holiday/night-shift **pay premiums** directly, as
> fixed percentages, in the statute itself — unlike Germany, where statute sets limits only and
> collective agreements set pay, or Australia, where the federal floor is thin and the Award layer
> sets the operative numbers. Collective bargaining agreements (CBAs) exist but typically **layer on
> top of**, rather than replace, the statutory floor — a "premium floor plus CBA uplift" model. DOLE
> [Department of Labor and Employment] issues Department/Labor Advisories that operationalize the
> statute (compressed workweeks, flexible work, holiday-pay computation) without displacing it.
>
> **Legal sources & links:** Presidential Decree No. 442 (the **Labor Code of the Philippines**, as
> renumbered by DOLE Department Advisory No. 1, Series of 2015) via the [LawPhil Project full
> text](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (no per-article anchors on
> this mirror — the link resolves to the full statute containing the cited article); the special
> leave/protection statutes (RA 11210, RA 8187, RA 11861, RA 9262, RA 9710, RA 9231, RA 10361, RA
> 11165) via LawPhil's `statutes/repacts/ra<year>/ra_<num>_<year>.html` pattern (each confirmed live
> except RA 11861, not yet mirrored — 🔎); DOLE Department/Labor Advisories via
> [dole.gov.ph](https://www.dole.gov.ph/) (issuance numbers not individually confirmed — 🔎). Built
> from fresh web research (2026-07-21). 🔎 marks a figure or link to confirm.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Labor Code sets both limits *and* pay** | Unlike Germany, the **Labor Code itself** fixes OT/night/holiday/rest-day premiums as statutory percentages — there is no "silent contract = base rate only" gap. | A worker with no CBA and a silent contract still gets the full statutory 25% OT premium, 10% night differential, etc. | CBAs commonly add *on top* (higher %, extra leave) — a rare "premium floor plus CBA uplift" model. | [Labor Code (PD 442) Book III, Title I](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Coverage exclusions — Art. 82** | The hours-of-work Title (limits, OT, night diff, rest day, holiday pay — **not** minimum wage) does **not** apply to: government employees; **managerial employees**; **field personnel**; members of the employer's family dependent on the employer for support; domestic helpers (separately regulated, see Kasambahay [domestic worker] row below); persons in the personal service of another; and workers paid by results (**pakyaw** [piece-rate work]) whose output rates are DOLE-approved. | A sales rep who sets their own routes with no fixed reporting/logging = field personnel → no OT/night-diff entitlement to track. | "Managerial employee" = primary duty is management of the establishment/department, with authority to hire/fire/recommend; "field personnel" = actual hours in the field **cannot be determined with reasonable certainty** (*Auto Bus Transport v. Bautista*, G.R. 156367). | [Labor Code Art. 82](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Health-personnel regime — 40h/week alternate** | In hospitals/clinics with **≥100-bed capacity**, or in cities/municipalities with a population of **≥1 million**, health personnel work **8h/day, 5 days/week (40h/week)**; if made to work a 6th day, they get an **additional 30%** of their regular wage for that day. | A nurse in a 150-bed Manila hospital rostered 6 days gets base pay + 30% on the 6th day. | Smaller hospitals/areas default to the ordinary 8h/day, 48h/week regime. | [Labor Code Art. 83](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **No general statutory "part-time" regime** | The Labor Code has **no distinct part-time worker classification** — hours worked are simply counted; OT/premiums apply the same way, pro-rated by actual hours. Contrast Germany's TzBfG. | A 20h/week contract worker who works 25h is treated the same as any employee working beyond their normal daily/weekly schedule — no separate part-time onset rule exists in statute. | Company policy may define part-time status for benefits eligibility; not a T&A-limit concept. Contrast Germany's **TzBfG** [Part-Time and Fixed-Term Employment Act], which does define a distinct part-time regime. | — none identified in current research — |
| **Minors (RA 9231) — protective regime** | Children **<15**: max **4h/day, 20h/week**, banned **20:00–06:00**. Children **15–<18**: max **8h/day, 40h/week**, banned **22:00–06:00**. (Values recur in §4/§5.) | A 14-year-old actor may work at most 4h on a shoot day; a 16-year-old retail worker cannot be rostered past 22:00. | Employment of <15s is generally prohibited except in narrow carve-outs (family undertaking, public entertainment, with DOLE work permit). | [RA 9231](https://lawphil.net/statutes/repacts/ra2003/ra_9231_2003.html) (amending Labor Code Art. 139); DOLE D.O. 149 🔎 |
| **Kasambahay [domestic worker] — separate regime (RA 10361)** | Distinct statute, not the Labor Code Title I: **8h aggregate daily rest**, **24h consecutive weekly rest**, own minimum-wage bands, **5-day SIL [Service Incentive Leave]** after 1 year (non-commutable/non-cumulative for kasambahay). | A live-in household helper is guaranteed 8h rest within each 24h day, distinct from the Labor Code's 8h *work* cap. | Written agreement on rest-day schedule; may respect religious preference. | [RA 10361 (Domestic Workers Act) §§20, 21, 24, 29](https://lawphil.net/statutes/repacts/ra2013/ra_10361_2013.html) |
| **Solo parent — flexible-schedule right (RA 8972/11861)** | A registered solo parent may **vary arrival/departure time** without affecting core hours, so long as productivity is unaffected; employer may seek a DOLE exemption on meritorious grounds. | A solo parent shifts their 9–6 schedule to 7–4 to handle school drop-off, keeping the same total daily hours. | Employer-set core hours; DOLE-exemption route for employers who can show undue hardship. | [RA 8972 §6](https://lawphil.net/statutes/repacts/ra2000/ra_8972_2000.html), as carried by RA 11861 ([lawphil.net register](https://lawphil.net/statutes/repacts.html) 🔎 not yet mirrored) |
| **Telecommuting — equal-terms regime (RA 11165)** | Telecommuting/work-from-home employees get the **same** compensable-hours, OT, night-differential, rest-day and leave treatment as comparable on-site employees; the employer must specify compensable work hours and minimum hours in a written agreement. | A telecommuting agreement fixes "core hours 9–3, flexible outside that" — OT and night-diff still apply per the standard statutory rules. | Voluntary arrangement, mutually agreed; no separate lighter T&A regime. | [RA 11165 (Telecommuting Act)](https://lawphil.net/statutes/repacts/ra2018/ra_11165_2018.html); IRR DOLE D.O. 202-19 🔎 |
| **Compressed workweek (CWW)** | Employer may condense the **statutory 48h/week** into **fewer than 6 days**, e.g. 4 days × 12h, provided daily hours **do not exceed 12h**, no diminution of benefits, and the arrangement is **voluntary** (employee/union consent) with **DOLE notice**. Hours within the 12h are paid at straight time (no OT) as long as the weekly total stays within the normal 48h equivalent. | A factory moves from 6×8h to 4×12h = 48h/week; the 9th–12th hour each day is straight-time, not OT, under the approved CWW. | Health/safety measures must be in place; arrangement is reversible; distinct from ad hoc daily OT. | [DOLE Advisories on CWW](https://www.dole.gov.ph/) 🔎 confirm current issuance number |
| **Flexible Work Arrangements (FWA) — DOLE menu** | DOLE recognizes, for business-downturn/emergency use: **Reduction of workdays/hours** (≤6 months); **Rotation of workers**; **Forced/mandatory leave**; **Broken-time schedule** (non-consecutive work blocks in a day); plus **CWW** (above). | A retailer facing a slow quarter rotates staff on alternate weeks rather than laying off. | Requires consultation with employees/union; cannot reduce statutory benefits. | [DOLE Labor Advisory / D.O. on FWA](https://www.dole.gov.ph/) 🔎 |
| **⚠ No general statutory annual OT-hours cap** | Unlike some jurisdictions, the Philippines sets **no absolute annual/weekly OT-hour ceiling** — control is indirect (consent requirements, Art. 89 emergency grounds, rest-day/health rules, the 12h/day CWW soft ceiling). | — | — | [Labor Code Book III, Title I](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (no cap provision) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Hours worked — inclusive definition** | All time an employee is **required or permitted to work** counts, including time the employee is required to be **on duty or at the employer's premises**, and **short rest periods** (breaks under ~15–20 min) during the workday. | A 10-minute coffee break mid-shift counts as paid working time; it is not deducted from the shift total. | — | [Labor Code Art. 84](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **"Engaged to wait" vs. "waiting to be engaged"** | Waiting time is compensable when the employer's control/instructions **prevent the employee from using it for personal purposes** ("engaged to wait"); it is not compensable when the employee is merely on-call and free to use the time as their own ("waiting to be engaged"). | A driver held at the depot awaiting dispatch, unable to leave = engaged to wait (paid); a technician reachable by phone from home, free to run errands = waiting to be engaged (unpaid until called, see §8). | Fact-specific test from jurisprudence; no bright-line statutory minutes threshold. | [Labor Code Art. 84](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) jurisprudence (US "engaged to wait" doctrine adopted in PH case law) 🔎 |
| **Meal period — 60 min minimum, unpaid** | Employers must give **≥60 minutes** time-off for the regular meal, for any work exceeding ~5 continuous hours; this period is **unpaid** and excluded from hours worked. | An 8h shift includes a 1h unpaid lunch outside the 8h count (so the shift spans 9h door-to-door). | See §4 for the shortened-break exception (20 min, paid, in named circumstances). | [Labor Code Art. 85](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |

## 3. Overtime

*The Labor Code fixes both the trigger and the rate directly — the reverse of Germany's "limits-only" statute.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **OT onset — beyond 8h/day** | Statutory OT begins for any work **beyond 8 hours** in a single day — there is no weekly trigger; each day is assessed independently. | A worker doing 9h on Monday and 7h on Tuesday has 1h of OT on Monday only; the short Tuesday does not offset it. | Under an approved CWW, hours up to 12/day within the approved schedule are **not** OT (§1). | [Labor Code Art. 87](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **No undertime-offset against overtime** | Undertime on one day **cannot be offset** by overtime on another — each day's OT is paid regardless of a prior shortfall. | A worker who left 2h early on Monday and stays 2h late on Wednesday still gets Wednesday's 2h paid as OT in full. | — | [Labor Code Art. 88](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Emergency/compulsory overtime — Art. 89 grounds** | Employer may **require** OT (beyond the worker's normal consent) only for: national/local emergency; imminent danger to life/property; urgent machinery/equipment repair; perishable-goods loss prevention; abnormal pressure of work to avoid serious business loss; or to complete work whose stoppage would cause serious obstruction/loss. | A cannery compels overtime to process an incoming perishable catch before spoilage. | Outside these grounds, OT is voluntary and by employee consent (commonly documented via OT authorization slips). | [Labor Code Art. 89](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Overtime = actual hours, no rounding rule in statute** | OT is computed on **actual minutes worked** beyond 8h; the statute sets no minimum increment. | — | Company policy may set a rounding convention (§11 — no statutory tolerance rule). | [Labor Code Art. 87](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Ordinary-day OT premium — +25%** | Hours beyond 8h on an **ordinary working day**: hourly rate **× 1.25**. | Hourly rate ₱76.25 → OT hour = ₱76.25 × 1.25 = ₱95.31. | — | [Labor Code Art. 87](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Rest-day / special-day OT premium — +30% on the day's already-loaded rate** | OT on a **rest day or special non-working day**: the day's premium rate (×1.30, see §6) is itself multiplied by **another 1.30** for the OT hours → **×1.69** of the base hourly rate. | Hourly rate ₱76.25, OT on rest day: ₱76.25 × 1.30 × 1.30 = ₱129.02/hr for OT hours. | — | [Labor Code Art. 87, 93](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Regular-holiday OT premium — the holiday rate (×2.00) × 1.30 = ×2.60** | OT on a **regular holiday**: ₱ rate × 2.00 (holiday, first 8h) × 1.30 (OT) = **×2.60** of base hourly rate. | Hourly rate ₱76.25, OT on a regular holiday: ₱76.25 × 2.60 = ₱198.25/hr. | Holiday + rest day + OT compounds further — see §3e and §6. | [Labor Code Art. 87, 94](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Night-shift differential — +10% (see §5)** | Adds **10% of the applicable rate** (ordinary, OT, holiday or rest-day rate) for hours **22:00–06:00** — it rides on top of whichever rate already applies. | Hourly rate ₱76.25, ordinary-day night hour: ₱76.25 × 1.10 = ₱83.88 (full worked detail in §5). | — | [Labor Code Art. 86](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Health-personnel 6th-day premium** | **+30%** of regular wage for a 6th day worked under the 40h/week health-personnel regime (§1). | A nurse in a 150-bed hospital rostered a 6th day gets base pay for that day + 30% (₱76.25 × 8h × 1.30 = ₱793.00, vs. ₱610 base). | Distinct from the general rest-day 30% (same %, different trigger). | [Labor Code Art. 83](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory annual/weekly OT-hour ceiling** | The Labor Code sets no cap on cumulative OT hours; control is via Art. 89 consent/emergency grounds and rest-day/health protections, not a counter. | — | An approved CWW replaces some "OT" hours with a straight-time 12h/day soft ceiling (§1). | [Labor Code Book III, Title I](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Daily OT is a per-day flag, not a banked counter** | Each day's OT (hours beyond 8) is computed and paid **that day** — statute contemplates no rolling/annual OT-hours tally. | — | Company/CBA may add its own monitoring threshold. | [Labor Code Art. 87](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-determining averaging** | OT onset is decided **daily** (>8h that day) — there is no reference-period averaging that could net a long day against a short one for OT purposes (contrast Germany's §4 working-time-limit averaging, which the Philippines also lacks in statute). | A 10h Monday followed by three 6h days still has 2h of Monday OT — nothing nets it out. | The CWW arrangement (§1) is the closest analog: it re-baselines the "normal" day to up to 12h so those hours aren't OT at all, rather than averaging after the fact. | [Labor Code Art. 87](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (absence of an averaging provision) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Multiplicative stacking on the base hourly rate; NSD [night-shift differential] adds 10% on top of the stacked rate** | Holiday/rest-day/OT multipliers **compound multiplicatively** (rate × premium1 × premium2 …), while the **night-shift differential is additive**: **+10% of whatever rate already applies** (ordinary, holiday, rest-day, or OT-loaded). | Regular holiday + rest day, worked, with 2 OT hours partly at night: 1st 8h = HR × 2.60; OT hours = HR × 3.38 (2.60 × 1.30); any hour in 22:00–06:00 gets **+10% of that hour's already-loaded rate** added on top. | This differs from Germany's flat-additive "typed bucket" model — the Philippines compounds the day-type/OT multipliers, then adds NSD. | [Labor Code Arts. 86–87, 93–94](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html); DOLE holiday-pay computation guidance 🔎 |
| **Double-holiday stacking — two regular holidays, same date** | If two regular holidays coincide (rare calendar overlaps): **not worked → 200%**; **worked → 300%**; **worked + rest day → 390%** (300% × 1.30). | A worker required in on a date carrying two coincident regular holidays and their rest day earns 3.90× the daily wage. | Rationale: a worker should not lose one of the year's ten-plus regular-holiday-pay entitlements merely because two fall on the same date. | [Labor Code Art. 94](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html); DOLE holiday-pay guidance (jurisprudence-derived) 🔎 |

## 4. Rest, breaks & working-time limits

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Normal daily hours — 8h/day** | **≤8h/day**, exclusive of the meal period; no statutory weekly-hours ceiling beyond the implied 6×8h = 48h from the mandatory weekly rest day. | An 8h shift + 1h unpaid lunch spans 9h total. | Health personnel: 8h/day at 40h/week (§1/§3b). CWW: up to 12h/day (§1). | [Labor Code Art. 83](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Weekly rest day — ≥24 consecutive hours after 6 days** | **≥24h** uninterrupted rest after **6 consecutive normal workdays**; employer designates the day (posted **≥1 week** in advance) but must respect **religious preference** where possible (Sunday for most Christians, Friday for Muslims, Saturday for Seventh-Day Adventists); Sunday is the statutory default if unspecified. | A retail worker's rest day is posted as Wednesday a week ahead; a Muslim employee may request Friday instead. | CBA/company may rotate the rest day weekly. | [Labor Code Art. 91](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Meal-break shortening — to 20 min, paid** | The 60-min meal period may be shortened to **not less than 20 minutes**, but only for: non-manual/non-strenuous work; establishments operating **≥16h/day**; actual/impending emergencies (spoilage, equipment damage); or to prevent serious business loss. Any shortened break **must be paid** and counted as hours worked. | A 24/7 call center shortens lunch to 30 min, but that 30 min is now paid time (not deducted). | — | [Labor Code Art. 85](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html); Omnibus Rules Book III, Rule I 🔎 |
| **Short rest periods — counted as hours worked** | Breaks of short duration (typically 5–20 min, e.g. coffee/toilet breaks) **count as compensable hours worked** and are not deducted from the shift. | Two 15-min breaks in an 8h shift remain paid; only the 60-min meal period is unpaid. | — | [Labor Code Art. 84](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Compressed workweek soft ceiling — 12h/day** | Under an approved CWW (§1), the daily cap may extend to **12h**, provided the weekly total doesn't exceed the normal 48h-equivalent and health/safety measures are observed. | 4-day week × 12h = 48h, no OT owed for hours 9–12 within the approved schedule. | Reversible; requires DOLE notice + employee/union consent. | [DOLE CWW Department/Labor Advisories](https://www.dole.gov.ph/) 🔎 |
| **Minors — tighter limits (RA 9231)** | **<15**: ≤4h/day, ≤20h/week. **15–<18**: ≤8h/day, ≤40h/week. (Recurs from §1; night bans in §5.) | A 16-year-old cannot be rostered beyond 8h/day even in an adult CWW arrangement. | Narrow carve-outs for family undertakings/public entertainment with a DOLE work permit. | [RA 9231](https://lawphil.net/statutes/repacts/ra2003/ra_9231_2003.html); DOLE D.O. 149 🔎 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night-shift window — 22:00–06:00** | The statutory night differential window is **10:00 PM to 6:00 AM**, applied per hour actually worked in that window. | A shift running 20:00–04:00 earns NSD only for the 22:00–04:00 portion (6h), not the 20:00–22:00 portion. | Some CBAs define a broader company "night shift" for scheduling purposes without changing the *statutory* NSD window. | [Labor Code Art. 86](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Night-shift differential (NSD) — +10%** | **10% of the applicable hourly rate** for each hour worked 22:00–06:00; the "applicable rate" already includes any OT/holiday/rest-day loading in effect for that hour (§3e). | Ordinary-day night hour: HR × 1.00 + 10% = HR × 1.10. OT night hour on an ordinary day: (HR × 1.25) + 10% of that = HR × 1.375. | — | [Labor Code Art. 86](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Minors — night-work ban** | **<15**: banned 20:00–06:00. **15–<18**: banned **22:00–06:00** (i.e., the general adult NSD window is an absolute ban for older minors, not just a pay premium). | A 17-year-old cannot be scheduled for any hours in 22:00–06:00, regardless of consent. | — | [RA 9231](https://lawphil.net/statutes/repacts/ra2003/ra_9231_2003.html) |
| **Field-personnel/managerial exclusion carries through** | Art. 82-excluded categories (managerial employees, field personnel, etc., §1) also fall outside the NSD entitlement. | — | — | [Labor Code Art. 82, 86](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Regular-holiday calendar — 12 fixed/movable dates** | **12 Regular Holidays**: New Year's Day (Jan 1), Maundy Thursday, Good Friday, Araw ng Kagitingan [Day of Valor] (Apr 9), Labor Day (May 1), Independence Day (Jun 12), National Heroes Day (last Mon of Aug), Bonifacio Day (Nov 30), Christmas Day (Dec 25), Rizal Day (Dec 30), Eid'l Fitr, Eid'l Adha (Islamic-calendar movable dates). | 2026 dates (illustrative — reconfirm yearly via Presidential Proclamation): Jan 1, Apr 2 (Maundy Thu), Apr 3 (Good Fri), Apr 9, May 1, Jun 12, Aug 31 (Nat'l Heroes Day, last Mon), Nov 30, Dec 25, Dec 30, plus movable Eid dates. | The **exact annual list is reproclaimed each year** by the Office of the President (e.g. Proclamation No. 1006 for 2026) — treat the list as an annually-refreshed calendar input, not a fixed constant. | [RA 9849 (Eid'l Adha)](https://lawphil.net/statutes/repacts/ra2009/ra_9849_2009.html); [RA 9177 (Eid'l Fitr)](https://lawphil.net/statutes/repacts/ra2002/ra_9177_2002.html); [RA 4166 (Independence Day)](https://lawphil.net/statutes/repacts/ra1964/ra_4166_1964.html); Act No. 2946 (Bonifacio Day), Act No. 345, R.A. 3022, Act No. 2711 🔎 pre-digitization Acts not individually confirmed |
| **Special (non-working) day calendar — annually proclaimed, typically 4–6 dates** | Typical **Special Non-Working Days**: Chinese New Year, EDSA People Power Anniversary (Feb 25), Ninoy Aquino Day (Aug 21), All Saints' Day (Nov 1), All Souls' Day (Nov 2), Feast of the Immaculate Conception (Dec 8), Dec 24, Dec 31 — the exact yearly set is set by proclamation and varies. | — | Some years designate an added date as "special working holiday" (no premium at all if worked — see next row). | Annual Presidential Proclamation ([Official Gazette](https://www.officialgazette.gov.ph/) 🔎); [RA 9256 (Ninoy Aquino Day)](https://lawphil.net/statutes/repacts/ra2004/ra_9256_2004.html) |
| **Regular holiday — paid if not worked; 200% if worked** | Employee absent on a regular holiday: paid **100%** of daily wage (no work needed), **provided** they worked or were on paid leave the workday immediately preceding it. If worked: **200%** of daily wage for the first 8h. | ₱700 daily wage: holiday not worked (but qualifying) = ₱700; worked = ₱1,400. | Daily-paid workers need the "present/on leave the day before" qualifier; monthly-paid employees are presumed already paid for unworked regular holidays via their monthly-rate divisor. | [Labor Code Art. 94](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Regular holiday + rest day, worked — 260%** | Worked on a regular holiday that is **also** the employee's rest day: **260%** of daily wage for the first 8h (200% holiday × 1.30 rest-day add-on). | ₱700 daily wage → ₱1,820 for the first 8h. | — | [Labor Code Art. 94, 93](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Double holiday — 300% / 390%** | Two regular holidays on the same date: **300%** worked (200% not worked); **390%** if also the rest day. See §3e. | ₱700 daily wage, double holiday worked on rest day: ₱700 × 3.90 = ₱2,730. | Rare calendar coincidence (e.g., certain movable-Eid overlaps). | [Labor Code Art. 94](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html); DOLE guidance 🔎 |
| **Special non-working day — no pay if absent; 130% if worked; 150% on rest day** | "No work, no pay" applies by default if absent (company policy may differ). Worked: **130%** of daily wage for first 8h. Worked + also rest day: **150%**. | ₱700 daily wage: absent = ₱0 (unless company policy pays); worked = ₱910; worked on rest day = ₱1,050. | Some proclaimed dates are "special *working* holidays" — **100%** only, no premium at all, if worked. | [Labor Code Art. 94](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (as extended to special days by DOLE issuances 🔎); annual Proclamation |
| **Rest-day (non-holiday) worked premium — 130%** | Any ordinary rest day worked (not a holiday): **130%** of daily wage for the first 8h. | ₱700 daily wage worked on rest day = ₱910. | — | [Labor Code Art. 93](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Monthly-paid vs. daily-paid holiday-pay treatment** | **Monthly-paid** employees are presumed, via their pay divisor (commonly 365/314-type factors), to already include unworked regular-holiday pay — no separate "no work no pay" gate applies to them. **Daily-paid** employees need the pre-holiday attendance qualifier above. | A monthly-paid office worker is paid the same monthly salary whether or not a regular holiday in that month was worked. | Divisor choice (a payroll/money construct) is downstream of this classification. | [Labor Code Art. 94](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html); DOLE jurisprudence on pay divisors 🔎 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory time-off-in-lieu of overtime pay** | Overtime must be paid in **cash** at the statutory premium (§3b) — the Labor Code does not authorize substituting paid time off for the OT premium as a matter of right (contrast Germany's *Freizeitausgleich* [time-off compensation in lieu of overtime pay]). | An employer cannot unilaterally convert 5 OT hours into 5 hours of future time off instead of paying the 25%+ premium. | Some CBAs/company policies offer a voluntary comp-time scheme on top of (not instead of) the statutory cash entitlement — legally must not reduce the worker's minimum entitlement. | [Labor Code Art. 87](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (no TOIL provision) |
| **No undertime/overtime offsetting** | As in §3a, undertime on one day may **not** be offset against OT owed on another — there is no netting "bank." | — | — | [Labor Code Art. 88](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Compressed workweek re-baselines, doesn't "bank"** | The CWW (§1/§4) changes what counts as the *normal* day (up to 12h) rather than creating a bankable hours account. | A worker on an approved 4×12h CWW schedule has zero "banked" hours to draw down later — the 12h/day is simply the new normal, not a rolling accrual. | — | [DOLE CWW Advisories](https://www.dole.gov.ph/) 🔎 |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **"Engaged to wait" — compensable** | Standby time where the employer's control prevents the worker from using it freely (e.g., required to stay on-site, cannot leave post) counts as **hours worked** in full. | A guard required to remain at a post between calls has all of that time paid, whether or not a call comes in. | — | [Labor Code Art. 84](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (jurisprudence) |
| **"Waiting to be engaged" — not compensable until activated** | Standby where the worker is free to pursue personal activities, merely reachable (e.g., on-call from home by phone), is **not** counted as hours worked **except** the time actually spent responding/working once called. | An IT on-call employee reachable overnight is unpaid for the on-call window itself; only the 45 minutes spent remotely fixing an outage counts as hours worked (and as night hours if in the NSD window). | Employers commonly pay a separate on-call/standby allowance as a matter of policy, not statutory entitlement. | [Labor Code Art. 84](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (jurisprudence); no dedicated standby-pay statute |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/predictability pay** | The Philippines has **no** show-up / reporting-time / predictability-pay statute (unlike some US states) — a worker sent home early or cancelled without notice has no guaranteed minimum-hours pay by law. | — | Company policy/CBA may voluntarily guarantee minimum hours. | — none identified in current research — |
| **No statutory split-shift premium** | Broken-time/split-shift scheduling (a recognized FWA type, §1) carries **no** separate statutory premium beyond the ordinary rules (NSD/OT/holiday as applicable to the actual hours). | — | — | — none identified in current research — |
| **Flexible Work Arrangements — consultation requirement** | Employers introducing Reduction of workdays, Rotation, Forced leave, or Broken-time schedules must **consult** employees/union first and may not diminish statutory benefits. | A firm rotates two teams on alternate weeks during a downturn instead of layoffs, after consulting staff. | Reduction of workdays/hours: typically capped at **≤6 months** duration. | [DOLE Labor/Department Advisories on FWA](https://www.dole.gov.ph/) 🔎 |
| **Compressed workweek — consent + DOLE notice** | CWW requires **voluntary employee/union agreement** and **notice to DOLE**; hours up to 12/day are straight-time within the approved schedule (§1/§4). | A plant shifts to a 4×12h CWW after securing written employee consent and filing the required DOLE notice; hours 9–12 each day are paid straight-time, not OT. | — | [DOLE CWW Advisories](https://www.dole.gov.ph/) 🔎 |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Service Incentive Leave (SIL) — 5 days/year after 1 year** | Employees with **≥1 year of service** (continuous or broken, aggregated) earn **5 days paid leave/year**, usable for vacation or sick purposes; unused SIL is **commutable to cash** at year-end or on separation. | An employee reaching their 1-year mark gets 5 days; if only 2 are used, the remaining 3 are paid out in cash. | **Exempt**: employees of retail/service establishments regularly employing **<10 workers**; those already enjoying **≥5 days** paid vacation leave; those covered by a separate leave benefit at least equivalent (e.g., kasambahay's own 5-day SIL, §1). | [Labor Code Art. 95](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Maternity leave — 105 days (60 for miscarriage)** | **Live birth**: **105 days** paid leave (any delivery method); **solo parent**: **+15 days**; **miscarriage/emergency termination of pregnancy**: **60 days** paid. Optional **+30 days unpaid** extension. Up to **7 days** may be allocated to the child's father or an alternate caregiver (relative within the 4th degree of consanguinity). Compulsory postnatal portion: **≥60 days**. | A solo mother with a live birth: 105 + 15 = 120 days paid; she may further extend 30 days unpaid, and could reassign up to 7 of the 105 to the father. | Applies to government, private-sector, and informal-economy workers; no cap on number of pregnancies (unlike paternity leave's 4-delivery cap). | [RA 11210 (Expanded Maternity Leave Law)](https://lawphil.net/statutes/repacts/ra2019/ra_11210_2019.html) |
| **Paternity leave — 7 days, first 4 deliveries** | **7 days** paid leave for a married male employee, for each of his legitimate spouse's **first 4 deliveries** (delivery includes miscarriage), cohabiting with the spouse. | A father takes 7 paid days for his spouse's 3rd delivery; a 5th delivery would not qualify. | Requires advance notice of the pregnancy/expected delivery date to the employer. | [RA 8187 (Paternity Leave Act)](https://lawphil.net/statutes/repacts/ra1996/ra_8187_1996.html) |
| **Parental leave for solo parents — 7 days/year (RA 11861)** | **7 working days/year**, paid, **forfeitable and non-cumulative** (does not carry over), for a registered solo parent with **≥6 months** service. | A solo parent uses 4 of the 7 days this year; the remaining 3 are forfeited, not carried to next year. | Solo-parent status covers 7 defined categories (widowed, abandoned, OFW-family, unmarried parent retaining custody, legal guardian, etc.) — see law for full list. | RA 11861 (Expanded Solo Parents' Welfare Act) — [lawphil.net RA register](https://lawphil.net/statutes/repacts.html) 🔎 not yet mirrored (2024 act) |
| **Special leave for victims of violence (VAWC [Violence Against Women and their Children]) — 10 days** | **10 days** paid leave, **in addition to** other leave entitlements, for a woman employee who is a victim of violence under RA 9262; **extendable** if required by a protection order. | A victim under an active protection order takes an extended leave beyond the initial 10 days per the order's terms. | Applies regardless of employment status; covers both physical presence needs (court appearances, medical/legal processes) and safety. | [RA 9262 (Anti-VAWC Act) §43](https://lawphil.net/statutes/repacts/ra2004/ra_9262_2004.html) |
| **Special leave for women — gynecological surgery (2 months)** | **2 months** leave with full pay for a woman employee recovering from surgery due to gynecological disorders, after **≥6 months aggregate service in the last 12 months**. | An employee undergoing a qualifying gynecological surgical procedure takes 2 months paid leave for recovery. | Must be surgical (not any gynecological condition). | [RA 9710 (Magna Carta of Women) §18](https://lawphil.net/statutes/repacts/ra2009/ra_9710_2009.html) |
| **Sickness benefit — up to 120 days/year (SSS, not employer-funded leave)** | Beyond the 5-day SIL, sick days are chiefly covered via the **SSS [Social Security System] Sickness Benefit**: up to **120 days/year**, requires **≥4 days** confinement, employer **advances** payment and is reimbursed by SSS. | An employee confined 10 days for illness: employer pays per SSS sickness-benefit formula, then claims reimbursement. | Not a Labor Code "paid sick leave" entitlement — it's a social-insurance benefit administered through the employer; distinct from SIL. | [Social Security Act (RA 11199) §14](https://lawphil.net/statutes/repacts/ra2019/ra_11199_2019.html) |
| **No general statutory bereavement/calamity leave** | The Labor Code has **no** freestanding bereavement or calamity-leave entitlement; these are company/CBA benefits where offered. | — | Some LGU ordinances or CBAs grant a few paid days for a death in the family. | — none identified in current research — |
| **No general statutory parental/childcare leave beyond maternity/paternity/solo-parent** | No Philippine equivalent of Germany's *Elternzeit* long-form parental leave exists; leave for childcare is limited to the maternity/paternity/solo-parent/VAWC/gynecological entitlements above. | — | — | — none identified in current research — |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Record retention — 3 years from last entry** | Employers must keep **daily time records, payrolls, pay slips, and personnel files** for **≥3 years** from the date of the last entry. | A payroll record dated Jan 2026 must be retained through at least Jan 2029. | Aligns with the 3-year prescriptive period for money claims under the Labor Code. | Omnibus Rules Implementing the Labor Code, Book III, Rule X §12 🔎; [Labor Code Art. 306 (money-claims prescription)](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) |
| **Daily time record obligation** | Every covered employee's actual daily hours (time in/out, breaks) must be logged — an engine recording every punch satisfies this. | — | Sector-specific documentation duties may apply (e.g., BPO/security-agency logs). | [Labor Code Art. 84](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (hours-worked definition); DOLE inspection practice 🔎 |
| **Tolerance / rounding** | **No statutory** rounding or grace-period rule — any punch tolerance is a pure policy choice. | — | — | — none identified in current research — |

## Sources (requirements section)

- **Labor Code core (Arts. 82–96):** [lawphil.net PD 442 full text](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) (confirmed live; no per-article anchors); chanrobles.com Book III;
  DOLE Labor Code renumbering (D.O. No. 1, s. 2015).
- **Overtime / holiday-pay computation & stacking:** respicio.ph "Holiday Pay, Overtime and Night
  Differential Computation under Philippine Labor Law"; suweldocalculator.com night-differential /
  holiday / overtime formulas; sprout.ph holiday-pay rules 2026; DOLE holiday-pay computation
  guidance (double-holiday rationale) 🔎.
- **Meal/rest breaks:** respicio.ph "Mandatory Meal and Rest Breaks for Employees in the
  Philippines"; Labor Code Art. 85 + Omnibus Rules Book III Rule I 🔎.
- **Rest day / compressed workweek:** respicio.ph "Philippine Labor Laws on Weekly Rest Days and
  Daily Work Hours"; ndvlaw.com and [DOLE](https://www.dole.gov.ph/) Department/Labor Advisories on
  compressed workweek and flexible work arrangements 🔎.
- **Public holidays:** en.wikipedia.org "Public holidays in the Philippines"; [RA 9849 (Eid'l
  Adha)](https://lawphil.net/statutes/repacts/ra2009/ra_9849_2009.html), [RA 9177 (Eid'l
  Fitr)](https://lawphil.net/statutes/repacts/ra2002/ra_9177_2002.html), [RA 4166 (Independence
  Day)](https://lawphil.net/statutes/repacts/ra1964/ra_4166_1964.html), Act No. 2946 (Bonifacio Day),
  [RA 9256 (Ninoy Aquino Day)](https://lawphil.net/statutes/repacts/ra2004/ra_9256_2004.html); Office
  of the President Proclamation No. 1006 (2026 list, signed 3 Sep 2025) via
  [officialgazette.gov.ph](https://www.officialgazette.gov.ph/) — 🔎 confirm exact 2026 special-day
  dates against the published proclamation text.
- **Minors:** [RA 9231](https://lawphil.net/statutes/repacts/ra2003/ra_9231_2003.html) (amending
  Labor Code Art. 139); DOLE Department Order 149 (working child permits) 🔎.
- **Kasambahay:** [RA 10361 (Domestic Workers Act)](https://lawphil.net/statutes/repacts/ra2013/ra_10361_2013.html) full text.
- **Solo parents:** [RA 8972 (2000)](https://lawphil.net/statutes/repacts/ra2000/ra_8972_2000.html);
  RA 11861 (2024 expansion) not yet mirrored on lawphil.net — 🔎.
- **Telecommuting:** [RA 11165 (Telecommuting Act)](https://lawphil.net/statutes/repacts/ra2018/ra_11165_2018.html); IRR DOLE D.O. 202-19 🔎.
- **Maternity / VAWC / gynecological leave:** [RA
  11210](https://lawphil.net/statutes/repacts/ra2019/ra_11210_2019.html), [RA 9262
  §43](https://lawphil.net/statutes/repacts/ra2004/ra_9262_2004.html), [RA 9710
  §18](https://lawphil.net/statutes/repacts/ra2009/ra_9710_2009.html) — all via lawphil.net full
  statute text.
- **Paternity leave:** [RA 8187 (1996)](https://lawphil.net/statutes/repacts/ra1996/ra_8187_1996.html).
- **Sickness benefit:** [RA 11199 (Social Security Act 2019) §14](https://lawphil.net/statutes/repacts/ra2019/ra_11199_2019.html).
- **Recordkeeping:** Omnibus Rules Implementing the Labor Code, Book III Rule X §12 (via web
  secondary sources 🔎); [Labor Code Art. 306](https://lawphil.net/statutes/presdecs/pd1974/pd_442_1974.html) prescriptive period.
- **On-call/standby doctrine:** "engaged to wait" vs. "waiting to be engaged" jurisprudence, PH
  secondary-source synthesis 🔎 (case-name-level citation not confirmed this pass).

> **Verification note.** All lawphil.net statute links above were live-confirmed by direct fetch on
> 2026-07-21, except **RA 11861** (2024 solo-parent expansion) — not yet mirrored on lawphil.net,
> flagged 🔎 with a fallback to the register's base search page. Pre-1970s public-holiday Acts (Act
> No. 2946, Act No. 345, RA 3022, Act No. 2711) and the various DOLE Department/Labor Advisory
> issuance numbers (CWW, FWA, holiday-pay computation, Omnibus Rules) were not individually
> URL-confirmed this pass — flagged 🔎 per row.
