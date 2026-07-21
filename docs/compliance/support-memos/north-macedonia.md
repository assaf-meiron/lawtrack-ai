# North Macedonia — T&A requirements

> **What this is.** The ground-truth reference for North Macedonia's time-&-attendance legal
> requirements, detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive**
> and **atomic**: **one legal proposition per row**, each row self-contained (no "see §X" as the
> only content), with exact values, a worked example wherever a number is involved, variants, and a
> `Basis` that **links to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, MKD, tax, gross-to-net) is out of scope (premiums
> are named for context in `Values`, but the deliverable is the typed hour/day event, never the
> money). **Term convention:** every non-English (Macedonian) term is glossed in English in
> brackets on first use, e.g. *дежурство* [stand-by/on-call duty].
>
> **Legal sources & links.** North Macedonia has no AustLII/Légifrance-style article-anchored
> statute mirror — its primary law is distributed as PDF text, not a browsable, per-article
> register. This pass's confirmed, resolving links: the consolidated **Law on Labour Relations**
> [ZRO] via the Lexadin World Law Guide mirror (no per-article anchors — every ZRO row links to the
> same document); the **General Collective Agreement** [GCA] and branch CBAs via the Federation of
> Trade Unions of Macedonia (SSM, ssm.org.mk — confirmed live, agreement text sits behind its
> "Колективни договори" section, not independently deep-linkable); the **Law on Holidays**, **Law on
> Minimum Wage** and **Law on Employment of Persons** via the Ministry of Labour and Social Policy
> (mtsp.gov.mk — confirmed live); the **State Statistical Office** (stat.gov.mk) for the published
> average-salary reference figure; and **EU Regulation 561/2006** directly on EUR-Lex (confirmed,
> the one row with a fully pinpoint-verifiable link). Every Basis cell whose deep link could not be
> confirmed to the specific article/section carries 🔎. Also folds in the richer repo seed
> `context/worldwide-calculations/north-macedonia.md` (compiled May 2026) and the predecessor
> `support-memos/north-macedonia.md` verdict memo (now the parked appendix below).
>
> **The one structural fact to hold onto.** North Macedonia is **statute-and-national-CBA
> centralised**, the opposite of Australia's award-fragmented model: the operative T&A *numbers* —
> hours, caps, rest, night window (ZRO) and every premium % (the national General Collective
> Agreement) — are set **once**, apply **erga omnes** to all employers in their sector regardless of
> membership, and are **uniform countrywide** (no state/regional/municipal axis, §1). Branch CBAs
> (construction, healthcare, hospitality, police, education) only add member-binding *detail*
> (split-shift %, stand-by %, shift frameworks) on top of that single national baseline; the
> employer-level CBA is marginal. So — unlike Australia, where the reader must first find which of
> ~120 awards covers the worker — for North Macedonia one arrangement (the national GCA, plus an
> optional branch layer) maps to one pay policy for nearly the whole market.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Three-tier instrument hierarchy** | **Tier 1 (national):** the Law on Labour Relations [ZRO] sets hours/caps/rest, and the **General Collective Agreement** [GCA] — one for the private sector, one for the public sector — sets the premium %s; both apply **erga omnes** to all employers in their sector regardless of union/association membership. **Tier 2 (branch):** a Special Collective Agreement (construction/SGIP, healthcare/SR-SZM, hospitality/SUTKOZ, education/SONK, police/MPS) binds only signatory-association members, adding split-shift %, stand-by %, and 12h-shift frameworks. **Tier 3 (employer):** company-level CBA/internal salary rule, marginal. | A hospital follows the national GCA's +35%/+50% premiums **plus** the healthcare branch CBA's 12h-shift and stand-by-rate framework; a non-union small retailer follows only the national GCA. | — | [ZRO 62/2005 (consol.)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA Private Sector OG 115/2014](https://www.ssm.org.mk) 🔎; [GCA Public Sector](https://mtsp.gov.mk) 🔎 |
| **Labour law is uniform nationwide** | **No regional/municipal variation** in minimum wage, overtime rules, holiday structure, premium %s, or working-time limits, unlike federal systems (US, Brazil, Germany). The 8 NUTS-3 statistical regions and 80 municipalities + City of Skopje have **no labour-law authority**. | Same OT/night/Sunday premium rules apply identically in Skopje and in a rural municipality. | — | [ZRO (national scope)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Standard regime — full-time** | **8h/day · 40h/week**, Mon–Fri (see §2). | A full-time employee with no redistribution scheme is scheduled five 8-hour days, Monday through Friday. | — | [ZRO Art. 116–117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Part-time [Скратено работно време] regime** | Permitted by written agreement; **proportional rights** to all benefits (annual leave, holidays, sick leave, allowances). Multiple concurrent part-time jobs (same or different employers) allowed provided **combined weekly hours ≤40h**. | A worker holding two 20h/week part-time jobs is at the statutory ceiling; a third job of any size would breach it. | 🔎 the seed does not state whether OT for a part-timer starts at their contractual hours or only above the statutory 40h/week — unconfirmed. | [ZRO (part-time provision)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Reduced working time [Намалено работно време] regime** | **<40h/week, at full 40h pay**, mandatory for work in hazardous conditions or with special risks to health/life; the exact reduced figure is set by special law/government regulation per hazard category. | Example: a 36-hour week paid as a 40-hour week for a designated hazardous role. | 🔎 the exact per-category hour reduction and its accrual mechanics ("do we just give +4h every month?") are open questions per the seed's own research notes. | [ZRO Art. 119](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Under-18 protective regime** | **8h/day · 40h/week absolute ceiling — no overtime permitted at all** (the caps are absolute, not just a higher-rate zone); **≥14h** daily rest (vs 12h adult); **no night work** (prohibited, narrow exceptions); up to **30 days** annual leave (vs 20–26 adult). | A 17-year-old cannot be rostered for any OT hour, regardless of business need. | — | [ZRO (minors)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Protected-status carve-outs (non-minor)** | **Night-work restricted/prohibited** for: pregnant employees, women who recently gave birth, breastfeeding mothers, single parents of children **<7**, employees with reduced working capacity where night work could harm them. A 2023 amendment also bars night-shift assignment where **no transport** is available to/from the workplace during night hours. | A single parent of a 5-year-old may decline a rostered night shift. | — | [ZRO (night-work restrictions)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [2023 amendment (transport rule)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Seasonal/temporary work regime** | The **Law on Employment of Persons** (adopted 2025, effective **1 Jan 2026**) creates a registered seasonal/occasional-work framework for agriculture, hospitality, tourism, retail, construction and other designated sectors — mandatory registration, with PIT/pension/health-insurance handled through the registration system. | A hospitality employer registers a summer-season worker under the new framework rather than an ad-hoc arrangement. | Sector list set by the National Classification of Activities. | [Law on Employment of Persons (2025/2026)](https://mtsp.gov.mk) 🔎 |
| **Strategic-national-project OT-cap exception** | A **2023 amendment** permits overtime to exceed **both** the 8h/week and 190h/year caps (see §3c) **only** for projects of national strategic importance, as designated by government decision. | A government-designated infrastructure project's workers may exceed 190h/year OT with the decision as legal basis. | Narrow, decision-gated population. | [2023 ZRO amendment](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Ministry of Internal Affairs (police) OT-cap exception** | MoI employees performing special police duties may exceed the **190h/year** cap with the employee's **prior written consent**, citing operational necessity. | A police officer who has already logged 190 OT hours in the year may be assigned further OT hours only after giving prior written consent, citing operational necessity. | MoI/police only; separate CBA with the Macedonian Police Union (MPS). | [ZRO](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [MPS Collective Agreement](https://www.ssm.org.mk) 🔎 |
| **⚠ Pending — replacement Labour Law** | A replacement Labour Law has been in draft negotiation since 2021; a May 2023 fast-track proposal to allow **60–72h workweeks across all 7 days** was rejected after ITUC/union opposition. **Not yet law — do not model as settled.** Status as of the seed's research: dormant, not withdrawn. | — | — | [(draft; ITUC/union opposition 2023)](https://mtsp.gov.mk) 🔎 |
| **⚠ Pending — EU Working Time Directive alignment** | EU accession alignment (Directive 2003/88/EC) is being **progressively implemented**; the transport sector is already largely aligned (EU Reg. 561/2006, see §4). Expect further tightening of the reference-period-averaging methodology (§3d). **Not yet fully transposed — do not model beyond the transport-sector alignment already in force.** | — | Transport sector already EU-aligned; other sectors pending. | [EC Enlargement Reports, Ch. 19](https://neighbourhood-enlargement.ec.europa.eu/enlargement-policy/north-macedonia_en) 🔎 |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Standard working time** | **8 hours/day, 40 hours/week**, normally distributed **Monday–Friday**. | A full-time employee's default schedule is five 8h days. | Redistribution schemes reshape the daily/weekly split while preserving the 40h/week average (§3d). | [ZRO Art. 116–117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Workweek — Sunday is the universal non-working day** | Since the **2022 amendment**, Sunday is a non-working day for the broad majority of the workforce, aligned with the statutory 24h weekly-rest requirement normally falling on Sunday (see §6). | — | Permitted-sector employers (healthcare, hospitality, transport, etc.) keep Sunday as a working day for their staff, with substitute rest elsewhere (§6). | [ZRO 2022 amendment](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Effective working time — no separate statutory definition beyond scheduled hours** | 🔎 The seed does not identify a distinct statutory test for "presence"/"on-hand" time, business travel time, or cross-midnight shift attribution (beyond the night window itself, §5) — unconfirmed whether ZRO defines these explicitly or leaves them to CBA/contract. | — | Stand-by [дежурство] availability vs. call-in activation *is* distinguished (§8). | [ZRO (no distinct presence-time test located)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 unconfirmed |
| **Multi-jurisdiction attribution — not applicable** | Labour law is uniform nationwide (§1); there is no cross-jurisdiction attribution question within North Macedonia. | — | — | [ZRO (national scope)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |

## 3. Overtime

*Overtime [Прекувремена работа] in North Macedonia is a **statutory, GCA-priced** regime — unlike Germany, both the onset and the +35% rate are fixed by law/national agreement, not left to individual bargaining.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory OT definition** | Overtime = work performed **beyond the standard 40-hour week**, or **beyond the daily limit of a redistribution scheme** where one is in force (see §3d). | A worker with no redistribution scheme working 45h in a week has 5 hours of overtime. | — | [ZRO Art. 117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Daily 8-hour reading** | Hours **beyond 8/day** draw the +35% overtime rate even within a 40h week, per the seed's operational reading — a day exceeding 8h triggers OT pay for the excess, and a day exceeding **11h** should additionally be flagged as a compliance violation (the +35% still applies to all hours past 8h regardless of the flag). | A 9-hour Tuesday: 1 hour paid at +35%. A 12-hour Tuesday: 4 hours paid at +35% **and** the day is flagged for exceeding 11h. | Under a redistribution scheme, the daily ceiling is **10h**, not 8h (§3d) — hours between 8h and 10h inside the scheme are *not* OT. | [ZRO Art. 116–117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; §2.1 practice note |
| **Weekly 40-hour trigger** | The **40-hour civil week** is the statutory weekly OT threshold (ZRO Art. 117). | A worker with no redistribution scheme who logs 44h across the week has 4 weekly OT hours. | Under redistribution, the trigger is the **reference-period average** (§3d), not the plain 40h week. | [ZRO Art. 117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Overtime must be employer-required, within named grounds** | OT can be **required** by the employer only for: urgent completion of a started-but-unfinished task; replacement of an absent worker; loading/unloading transport vehicles; prevention of damage to property or risk to life/health; or other exceptional circumstances set by CBA. Employee **consent is not strictly required**, but the employer must justify necessity; refusal in a non-exceptional case is not grounds for dismissal. | An employer orders 2 hours of OT to finish loading a delivery truck before a deadline — a valid ground. | CBA may name additional exceptional circumstances. | [ZRO Art. 117 (conditions)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Part-time OT onset** | 🔎 Not explicitly stated in the seed research — whether a part-timer's OT starts at their **contractual** hours or only above the full **40h/week** statutory line is unconfirmed. | — | Proportional-benefits principle (§1) suggests a contractual baseline, but this is inferred, not confirmed. | [ZRO (part-time OT baseline not specified)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 unconfirmed |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory overtime premium** | **+35%** on the basic hourly wage for every OT hour — established jointly by the ZRO and the General Collective Agreement for the Private Sector. Hourly rate paid = **1.35 × basic hourly wage** (135% of normal rate). | Basic hourly rate MKD 294.6 (seniority-adjusted, see §3e) → OT hourly rate = 294.6 × 1.35 ≈ **MKD 397.7**; 2 OT hours = **MKD 795.4**. | Public-sector GCA premium %s can differ from the private-sector figure (unconfirmed exact public-sector OT %, 🔎). | [ZRO Art. 117(7)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA Private Sector](https://www.ssm.org.mk) 🔎 |
| **No tiered OT bands** | A single flat **+35%** applies to all OT hours — no escalating band for, e.g., the 1st vs. the 10th weekly OT hour. | — | — | [ZRO Art. 117(7)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA](https://www.ssm.org.mk) 🔎 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekly OT cap** | **8 hours** of overtime per week (ZRO Art. 117). Some interpretations read this as **averaged over a rolling 3-week period**, allowing a higher figure in one week offset by lower in others. | A worker logs 10 OT hours one week and 6 the next — averages to 8/week over the 3-week window under the averaging reading. | 🔎 whether the 8h/week cap is a hard weekly ceiling or a 3-week rolling average is an open interpretive question per the seed. | [ZRO Art. 117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Annual OT cap** | **190 hours** per calendar year per worker — a hard ceiling under ordinary rules. | A worker who has logged 188 OT hours by November is 2 hours from the annual ceiling. | **Strategic-national-project exception** and **MoI police exception** both permit exceeding 190h/year (see §1). | [ZRO Art. 117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **150-hour annual bonus [Дополнителна плата]** | A **compound calendar-year trigger**, unique to North Macedonia: if a worker performs **more than 150 hours of overtime** in the calendar year **AND** has been absent from work **fewer than 21 days** in that year (annual leave **excluded** from the count — i.e. sick days, unpaid leave, personal leave, military leave, etc. all count toward the 21), a bonus equal to **one month's average national net salary** (the *published national average*, not the employee's own salary) is owed, **in addition to** the per-hour +35% already paid. | An employee logs 152 OT hours and 18 absence days (sick + personal, annual leave excluded) in the year → both conditions met → bonus = 1× the published average national net salary for the reference month (e.g. ≈ MKD 46,000 for a mid-2026 reference month). | Reference average published **monthly** by the State Statistical Office; convention is to use the average for the month preceding the bonus payment. Proration on mid-year termination varies in practice (🔎). | [ZRO (Дополнителна плата provision)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA](https://www.ssm.org.mk) 🔎 |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Redistribution of working time [Реорганизација на работното време / *прерасporeduvanje*]** | Employer may distribute hours **unevenly** across a reference period — the **calendar year**, or **6 months** by collective agreement/employer rules — provided the **average stays ≤40h/week** over that period. **Daily ceiling under the scheme: 10h** (vs. 8h standard). Hours beyond 8h/day but within the scheme, and within the ≤40h/week average, are **not overtime** — they are regular hours scheduled unevenly. Only hours exceeding the scheme's own maximum, or exceeding the 40h/week average at period close, are overtime. Employer must **formally adopt the scheme in writing** and **inform employees in advance**. | Construction worker: 48h/week June–August, 32h/week November–February → annual average 40h/week (compliant, no OT from the uneven split). If a particular June week runs 50h (2h beyond the 48h scheduled), those 2h are overtime at +35%. | Reference period defaults to the calendar year; a CBA may shorten it to **6 months**. 🔎 open question (per the seed's own research note to counsel): if the trailing average breaches 40h/week at period close, is the excess paid retroactively as OT at that point? | [ZRO (redistribution provision)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Weekly-cap averaging (see §3c)** | The 8h/week OT cap's "3-week rolling average" reading is itself an averaging mechanic, distinct from the reference-period redistribution above — it validates the **OT cap**, not the underlying OT/regular-hours split. | — | — | [ZRO Art. 117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Additive stacking on the basic hourly rate** | All applicable premiums are **additive**, not multiplicative, and paid **simultaneously** — the engine sums each independently. Named combinations: **Night OT** = 35%(OT) + 35%(night) = **170%** of basic. **Sunday OT** = 35% + 50% = **185%**. **Holiday OT** = 35% + 50% = **185%**, **plus** the regular day-pay already due for the holiday. **Sunday + Night OT** = 35% + 35% + 50% = **220%**. **Three-shift + OT** (non-night hours of the rotation) = 35% + 5% = **140%**. **Holiday + Night + OT** = 35% + 35% + 50% = **220%**, plus regular day-pay. | Sunday 20:00–02:00 shift (all OT, since 40h already worked Mon–Sat): 20:00–22:00 (2h) at 35%+50%=185% → MKD 545.0/hr; 22:00–02:00 (4h) at 35%+35%+50%=220% → MKD 648.1/hr. Total for the 6 hours: MKD 3,682.4 (on a MKD 294.6 seniority-adjusted basic). | — | [ZRO](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 §3.7 (additive-composition practice); [GCA](https://www.ssm.org.mk) 🔎 |
| **Seniority allowance as the premium base [Минат труд]** | **+0.5% per year of total service** (recognised across **all** prior employers, not just the current one) is folded into the **basic salary itself** — cannot be contractually excluded, even by a flat-salary contract silent on it. All percentage premiums (OT/night/Sunday/holiday/three-shift) are computed on this **seniority-adjusted basic**, not the unadjusted base rate. | 10 years' service → basic × 1.05. 30 years' service → basic × 1.15 (+15%). A 10-year employee's night-OT-Sunday-holiday hour: basic × 1.05 × 2.70 (170%+50% additional composition per §3.7 example) — the seniority adjustment compounds *before* the premium %s are added. | — | [ZRO Art. 105 (salary structure)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA](https://www.ssm.org.mk) 🔎 (Минат труд) |
| **No pyramiding on same-classification hours** | Sunday and the designated weekly rest day are **not both charged** when they coincide (most employees' weekly rest **is** Sunday) — apply the 50% once. A worked holiday falling on Sunday similarly draws **only** the holiday 50% (holiday treatment "absorbs" Sunday per GCA practice), not a compounded 100%. | A holiday that falls on a Sunday: worked hours draw +50% (holiday), not +100% (holiday+Sunday). | The Sunday-rollover Monday (§6) is evaluated **separately** and gets its own full holiday treatment if worked. | [GCA practice](https://www.ssm.org.mk) 🔎 (de-pyramiding) |

## 4. Rest, breaks & working-time limits

*Hard limits — a breach should be flagged, not silently absorbed into pay.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily working-time ceiling** | **8h/day standard**, up to **10h/day** under a redistribution scheme (§3d). A day exceeding **11h** must be flagged as a compliance violation regardless of scheme (the +35% OT rate still applies to hours beyond 8h). | A 12h day: 4 hours at +35% OT **and** an 11h-breach flag. | Under-18: **8h/day absolute**, no exceptions (§1). | [ZRO Art. 116–117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Weekly total-hours ceiling** | **48 hours/week for adults** (40h standard + 8h OT cap), **40 hours/week for under-18** (no OT permitted at all). | An adult worker cannot lawfully log more than 48h in an ordinary week outside a redistribution/strategic-project exception. | Strategic-national-project and MoI-police exceptions can exceed this (§1, §3c). | [ZRO Art. 117](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Daily rest between shifts [меѓудневен одмор]** | **≥12 consecutive hours** for adults; **≥14 hours** for under-18. | A shift ending at 22:00 permits the next shift to start no earlier than 10:00 (adult) or 12:00 (minor). | Construction branch CBA (SGIP) **strictly enforces** the 12h threshold. | [ZRO (daily rest)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Weekly rest [Неделен одмор]** | **≥24 consecutive hours**, normally falling on **Sunday**. | A standard 5-day worker's weekend (Sat–Sun) satisfies this by default. | If business needs require Sunday work in a permitted sector, **substitute weekly rest** must be given on another day, and the Sunday premium (§6) still applies. | [ZRO Art. 135](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Meal break** | **≥30 minutes**, **paid**, for shifts **>6 hours**; **cannot be scheduled at the very start or very end** of the shift. | An 8h shift must include a ≥30-min paid break placed somewhere other than the first/last minutes. | 🔎 whether the min-break-by-hours and start/end-placement rules are actively validated/flagged, or only configured, is unconfirmed. | [ZRO (meal break)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA](https://www.ssm.org.mk) 🔎 |
| **Reduced working time for hazardous conditions** | **<40h/week at full 40h pay**, mandatory for work in hazardous conditions or with special risks to health/life; exact reduced figure set by special law/regulation per hazard category. | A 36h/week hazardous role paid as if 40h. | 🔎 the accrual/implementation mechanic (e.g. "+4h credited monthly") is an open question per the seed. | [ZRO Art. 119](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Construction hot-weather work suspension** | Outdoor construction work must be **suspended** when ambient temperature exceeds the seasonally-decreed threshold (typically referenced as **>35°C**) during peak heat hours (typically **11:00–17:00** or **12:00–16:00**, per regional/seasonal decree). Suspension is **paid** at the regular rate; not deducted from scheduled hours. | A construction crew stood down 12:00–16:00 on a >35°C day still receives full pay for those hours. | Thresholds/windows reissued each summer by the State Labour Inspectorate. | [Construction sector directive (2014 amendment, reaffirmed)](https://mtsp.gov.mk) 🔎 |
| **Transportation sector — EU-aligned drive/rest regime** | Road transport follows **EU Regulation 561/2006**: mandatory break every **4.5 hours** driving, **daily rest 11h**, **weekly rest 45h**, plus daily/weekly driving-time ceilings; tachograph use mandatory for commercial road transport. | A commercial driver must take a break after 4.5h continuous driving, distinct from the general 12h daily-rest rule. | Air, rail, maritime transport follow their own sector-specific safety rules (not detailed in the seed). | [EU Reg. 561/2006 (accession-aligned)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32006R0561) |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night window [Ноќна работа]** | **22:00–06:00** of the following day. | A shift running 20:00–04:00 has its 22:00–04:00 portion (6h) classified as night hours. | — | [ZRO Art. 124](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Night premium** | **+35%** on the basic hourly wage for every hour worked in the night window. | Basic hourly (seniority-adjusted) MKD 294.6; 3 night-OT hours from 23:00–02:00 at combined 35%(OT)+35%(night)=170% → MKD 500.8/hr → **MKD 1,502.4** for the 3 hours. | Under-18: night work is **not permitted** (§1) — no premium question arises. | [ZRO Art. 117(7)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA](https://www.ssm.org.mk) 🔎 |
| **Night-worker [ноќен работник] status** | A worker is a night worker if they **regularly work ≥3 hours** of the daily shift within 22:00–06:00, **OR** work **≥⅓ of their annual working hours** during the night window. Status confers: free **health checks** before assignment and periodically thereafter; a **right to transfer** to day work if night work harms their health. | A worker rostered 23:00–07:00 on a rotating pattern qualifies via the ≥3h/regular test. | 🔎 whether the ⅓-of-annual-hours test auto-confers status or requires a manual determination is unconfirmed. | [ZRO Art. 124](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Night-worker average-hours cap** | A night worker's **average daily working time over any rolling 4-month period may not exceed 8 hours**. | A night worker with several 10h shifts in one month must be offset by shorter shifts elsewhere in the 4-month window to keep the average at 8h/day. | — | [ZRO Art. 124](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 §4.5 |
| **Night-work restrictions by population** | Night work **prohibited** for under-18 (narrow exceptions); **restricted** for pregnant employees, women who recently gave birth, breastfeeding mothers, single parents of children <7, and employees with reduced working capacity where night work could harm them. A 2023 amendment additionally bars night-shift assignment **where no transport is available** to/from the workplace during night hours. | — | — | [ZRO (night-work restrictions)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; 2023 amendment |
| **Three-shift [Тросменска работа] premium** | **+5%** on the basic hourly wage for **all hours** worked under a three-shift rotation (typically 06:00–14:00 / 14:00–22:00 / 22:00–06:00), applied for the organisational complexity of the rotation — the smallest of the named allowances. | An all-day rotation worker earns basic × 1.05 on every non-night hour of the rotation. | — | [GCA (Private Sector)](https://www.ssm.org.mk) 🔎 |
| **Three-shift + night stacking** | Night leg of the rotation: 5%(three-shift) + 35%(night) = **140%** of basic. Non-night legs of the rotation: **105%** of basic. | A three-shift worker's night leg pays basic × 1.40; the day/afternoon legs pay basic × 1.05. | — | [GCA](https://www.ssm.org.mk) 🔎 |
| **Healthcare 12-hour shift framework** | **12-hour shifts** permitted, with extended rest afterward — typically **24 or 48 hours off** following a 12h shift. Continuous (24/7) shift work is the norm; the three-shift premium applies. | A nurse working a 12h shift is scheduled with 24–48h off before the next one. | Set by the healthcare branch CBA (SR/SZM), not the general ZRO daily-rest rule. | [Healthcare branch CBA (SR/SZM)](https://www.ssm.org.mk) 🔎 |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Sunday as the universal non-working/rest day (2022 amendment)** | Sunday was declared a **non-working day** for the broad majority of the workforce, aligned with the 24h weekly-rest requirement (§4) normally falling on Sunday. **Non-essential retail** is now largely closed Sundays, with limited exceptions (gas stations, pharmacies, small bakeries). | A general retail store must close Sundays absent a named exception. | Permitted-sector employers keep Sunday operating with substitute rest for staff (next row). | [ZRO 2022 amendment](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Permitted Sunday-work sectors** | Continuous-operation/public-interest sectors may still schedule Sunday work: **healthcare** (hospitals, emergency services, on-duty pharmacies); **public security** (police, military, fire, civil protection); **transportation**; **energy/water/telecommunications**; **hospitality** (hotels, restaurants, cafés, tourism); **media** (broadcasting, news); **funeral services**; **agriculture & food production** (livestock, perishables); **continuous-process manufacturing**. | A hotel schedules a front-desk worker on Sunday under the hospitality exception. | The list is set by ZRO/practice, not exhaustively codified in a single article per the seed. | [ZRO (Sunday-work exceptions)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Sunday-work premium** | **+50%** on the basic hourly wage for **every** hour worked on a Sunday, **plus** entitlement to **≥24 consecutive hours** of substitute weekly rest on another day. | Basic hourly (seniority-adjusted) MKD 294.6; 8h regular Sunday shift (no OT, since within the 40h week) at +50% → MKD 441.9/hr → **MKD 3,535.2** for 8h. | — | [ZRO Art. 117(7)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA §6.3](https://www.ssm.org.mk) 🔎 |
| **Weekly-rest-day work premium (non-Sunday)** | Where an employee's designated weekly rest day is **not** Sunday (e.g. a hospitality worker whose rest day is Tuesday), working that actual rest day **also** draws **+50%** under the same multiplier as Sunday work — distinguished from Sunday for audit traceability, not for rate. | A hotel worker whose rest day is Tuesday works that Tuesday → +50%, same rate as a Sunday premium would give. | — | [ZRO](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA](https://www.ssm.org.mk) 🔎 |
| **No double-counting Sunday + weekly-rest-day** | For the majority of employees whose weekly rest day **is** Sunday, only **one** +50% premium applies — Sunday and "weekly rest day" are the same event, not two stacking premiums. | — | — | [GCA practice](https://www.ssm.org.mk) 🔎 |
| **Public-holiday calendar — 11 universal holidays** | Applies to **all** employees regardless of religion/ethnicity: 1 Jan (New Year); 7 Jan (Orthodox Christmas); Orthodox Easter Monday (variable, lunar-linked); 1st day of Eid al-Fitr (variable, lunar); 1 May (Labour Day); 24 May (Saints Cyril and Methodius); 2 Aug (Republic Day/Ilinden); 8 Sep (Independence Day); 11 Oct (Day of the Uprising Against Fascism); 23 Oct (Day of the Macedonian Revolutionary Struggle); 8 Dec (Saint Clement of Ohrid). | — | The annual **Government Programme of Non-Working Days** confirms exact dates including variable/lunar holidays each year. | [Law on Holidays, OG 21/1998 (amended 2007)](https://mtsp.gov.mk) 🔎 |
| **Confession/community-specific holidays** | Only employees who **declare** the relevant confession/ethnic community get the day off (+ the holiday-work premium if scheduled to work it): **Orthodox Christian** (Christmas Eve 6 Jan, Epiphany/Vodici 19 Jan, Good Friday, All Souls' Day, Assumption 28 Aug); **Muslim** (Eid al-Adha, variable); **Catholic** (Easter Monday Western, All Saints' 1 Nov, Christmas 25 Dec); **Jewish** (Yom Kippur, variable); **Protestant** (All Saints' 1 Nov, Christmas 25 Dec); **Albanian community** (Alphabet Day, 22 Nov); **Turkish community** (Language Education Day, 21 Dec); **Vlach community** (National Day, 23 May); **Roma community** (International Roma Day, 8 Apr); **Serbian community** (Saint Sava, 27 Jan); **Bosniak community** (International Bosniaks Day, 28 Sep). | An employee declaring Orthodox confession who works 4h on Orthodox Good Friday gets holiday treatment (regular day-pay + 50% on the 4 worked hours); a Muslim employee working the same day gets none — it's a regular working day for them. | Employees may **decline** to declare a confession, in which case only universal holidays apply. This is a **per-employee attribute**, not a location attribute. | [Law on Holidays, OG 21/1998 (amended 2007)](https://mtsp.gov.mk) 🔎 |
| **Worked-holiday compensation** | The employee receives their **regular salary for the day** (as if not working — already included in monthly salary for salaried employees) **plus a +50% premium** on the basic hourly rate for **each hour actually worked**. For hourly-paid employees: the unworked-holiday-equivalent is paid at the regular rate (8h at basic), and worked hours are paid at **150%** (basic + 50%). | Salaried worker (basic hourly MKD 294.6) works 8h on Labour Day: additional premium = 294.6 × 0.50 × 8 = **MKD 1,178.4**, on top of the day's salary already included in the monthly figure. | — | [ZRO Art. 117(7)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [Law on Holidays](https://mtsp.gov.mk) 🔎; [GCA §7.4](https://www.ssm.org.mk) 🔎 |
| **Holiday-on-Sunday doctrine** | When a public holiday coincides with a Sunday, the two premiums are **not compounded** to 100% — apply the **holiday treatment only** (50%), which "absorbs" the Sunday treatment per GCA practice. | — | The Sunday-rollover Monday (next row) is evaluated **separately** with its own full holiday treatment. | [GCA practice](https://www.ssm.org.mk) 🔎 |
| **Sunday-rollover mechanism** | If a **universal** holiday falls on a Sunday, the **following Monday** becomes a non-working day too — confirmed annually via government decree. | Independence Day (8 Sep) fell on a Sunday in 2024 → Monday 9 Sep 2024 became a non-working day by decree; an employee who worked that Monday was owed full holiday treatment (regular day-pay + 50% on worked hours). | — | [Law on Holidays](https://mtsp.gov.mk) 🔎; annual Government Programme decree |
| **One-off non-working days** | The government may declare additional non-working days by **separate ad-hoc decree** — typically for election days, days of national mourning, or census days. These are **not** in the annual programme. | — | The engine should consume an external feed (Official Gazette / government decree), not a static table. | [Government decree (ad hoc)](https://mtsp.gov.mk) 🔎 |
| **Government Programme of Non-Working Days** | Published **annually** in the Official Gazette (Програма за неработни денови), confirming exact dates for variable/lunar holidays and Sunday-rollover Mondays for that year. | — | Consumed as reference data, not derived from religious-calendar computation. | [Government annual decree](https://mtsp.gov.mk) 🔎 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Redistribution scheme as the working-time-account mechanism** | The reference-period redistribution scheme (§3d) is North Macedonia's functional equivalent of a working-time account: hours run above/below the 8h/day, 40h/week baseline within the scheme, netting to a ≤40h/week average over the reference period (calendar year, or 6 months by CBA), with the excess over the scheme/average settling as overtime at period close. | See §3d worked example (construction 48h/32h seasonal split). | — | [ZRO (redistribution provision)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Substitute weekly rest as comp-rest (not comp-pay)** | Working the Sunday/weekly-rest-day in a permitted sector entitles the worker to a **substitute ≥24-consecutive-hour rest period** on another day — a day-off-in-lieu mechanism, distinct from and *in addition to* the +50% cash premium (§6). | A Sunday-working hospitality employee both receives the +50% premium **and** must be given a substitute full rest day elsewhere in the week. | 🔎 the seed does not specify a statutory window (e.g. "within 2 weeks") within which the substitute rest day must be granted — unconfirmed. | [ZRO Art. 135](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; [GCA §6.3](https://www.ssm.org.mk) 🔎 |
| **No statutory time-off-in-lieu for overtime hours** | Overtime is **always paid** at +35% (§3b) — the seed identifies no statutory option to bank OT hours as time off instead of cash. | — | — | 🔎 not identified in current research |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Stand-by/on-call duty [дежурство]** | Required availability **outside** normal working hours is compensated at a branch/employer-determined rate, **typically 10–25%** of basic during the stand-by period, with the **full applicable premium** paid for hours actually worked once called in. | A healthcare worker on stand-by overnight receives ~10–25% of basic for the availability hours, plus full night/OT premiums for any hours actually worked when called. | Healthcare branch CBA (SR/SZM §12.2) sets its own rate within the typical range; general private-sector rate per GCA §8.2. | [GCA §8.2](https://www.ssm.org.mk) 🔎; [Healthcare branch CBA](https://www.ssm.org.mk) 🔎 §12.2 |
| **Healthcare — heavy reliance on stand-by** | Stand-by duty is heavily used in healthcare to cover 24/7 continuous operations, alongside the 12h-shift framework (§5). | — | — | [Healthcare branch CBA (SR/SZM)](https://www.ssm.org.mk) 🔎 |
| **No statutory restricted/unrestricted on-call classification** | 🔎 The seed does not identify a formal legal test (comparable to the EU *Matzak*/*Radiotelevizija Slovenija* line distinguishing "must stay at a specific place" vs. "free to move but reachable") for classifying stand-by intensity — the % is set purely at branch/employer level. | — | — | 🔎 not identified in current research |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Split working time [Поделено работно време] premium** | When a daily shift is split into **two or more non-contiguous segments** (e.g. a hospitality shift 11:00–15:00 + 18:00–22:00), a separate allowance applies. The % is **not centrally specified in law** — set at branch/employer level, **typically 5–10%**. | A restaurant worker's split lunch/dinner shift (11:00–15:00 + 18:00–22:00) draws the branch-set split-shift allowance in addition to ordinary pay. | Common in hospitality/tourism (SUTKOZ branch CBA). | [GCA](https://www.ssm.org.mk) 🔎 (acknowledges the allowance category); branch CBA sets the % |
| **No statutory reporting/show-up (predictability) pay** | The seed identifies **no** statutory show-up, reporting-time, or predictability-pay regime (unlike, e.g., US state/city ordinances). | — | — | 🔎 not identified in current research |
| **Redistribution scheme as make-up scheduling** | The reference-period redistribution scheme (§3d) is the mechanism by which uneven scheduling (higher/lower weeks) is lawfully absorbed without triggering overtime, as long as the period average holds. | See §3d. | — | [ZRO (redistribution provision)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Construction seasonal redistribution** | The construction branch CBA (SGIP) permits **seasonal redistribution** — longer hours in summer, shorter in winter — under the general redistribution mechanism, alongside the hot-weather suspension rule (§4). | Summer 48h weeks, winter 32h weeks, averaging to 40h/week over the year. | — | [Construction branch CBA (SGIP)](https://www.ssm.org.mk) 🔎 |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Annual leave [Годишен одмор] — accrual & floor** | **Minimum 20 working days/year**, available in full after **6 months** of uninterrupted service (pro-rata leave before that point). **+1 day per 5 years** of service with the same employer, up to a **26-day ceiling** (21 days at 5 years, 22 at 10, … 26 at 25+). Up to **30 days** for: hazardous-conditions work, employees with disabilities, single parents of children <7, and employees under 18. | An employee joining 1 October has ~3/12 × 20 = 5 days' pro-rata leave for that partial year; after 5 years' service, the floor rises to 21 days. | — | [ZRO Art. 137–146](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Annual leave — usage & carryover** | **Minimum 12 working days** must be taken within the current calendar year; remaining days may **carry over**, usable by **30 June** of the following year. **Unused leave is paid out on termination.** Annual leave is **interruptable by sick leave** (a sick day taken during scheduled annual leave doesn't consume a vacation day). Calculation base = **regular salary**, including the average of variable components paid in the preceding period. | An employee with 26 days takes 15 in-year and carries 11 to use by 30 June next year. | Timing set by the employer in consultation with the employee, balancing business need and preference. | [ZRO Art. 137–146](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Annual-leave recourse/allowance [Регрес за годишен одмор]** | A mandatory annual **vacation allowance** in the private sector: **40% of the published average net salary in the Republic** (not the employee's own salary), paid **once per year**, no earlier than after **6 months'** service in that year, and no later than year-end. Paid **in addition to** regular vacation pay. | If the published national average net salary is ≈ MKD 32,000, the allowance owed is 0.40 × 32,000 ≈ **MKD 12,800**, paid once, on top of the employee's regular vacation pay. | — | [GCA (Private Sector)](https://www.ssm.org.mk) 🔎 |
| **Sick leave [Боледување] — eligibility & duration** | Available with a **medical certificate**; **no qualifying service period**. Duration is **unlimited**, based on medical necessity. Employee must **notify the employer within 24 hours** of taking sick leave. | An employee falling ill on a Monday must notify the employer by Tuesday same time (within 24h) and may remain on sick leave for as long as the medical certificate supports, with no minimum tenure required to qualify. | — | [GCA (Private Sector)](https://www.ssm.org.mk) 🔎 |
| **Sick leave — employer-paid tiers (first 30 days)** | Employer pays the **first 30 calendar days** of any sickness absence (**per occurrence**, not per year): **days 1–7 at 70%**, **days 8–15 at 80%**, **days 16–30 at 90%** of regular salary. **From day 31 onward**, the Health Insurance Fund pays. | A 20-day illness episode: 7 days at 70%, 8 days at 80%, 5 days at 90% — all employer-paid, since it doesn't reach day 31. | Public sector may apply a **different** structure (e.g. a flat 70% across the full 30 days), 🔎 unconfirmed exact figure. Workplace injury / occupational disease: **100%** pay throughout, employer-borne initially, insurance-reimbursed. | [GCA (Private Sector)](https://www.ssm.org.mk) 🔎 |
| **Maternity leave [Породилно отсуство]** | **9 months** (~270 days) for a single birth; **15 months** for multiple births (twins+). Adoption: leave until the adopted child reaches 9 (or 15, multiple) months of age, provided the child is **under 5** at adoption. May start up to **45 days before** the expected delivery date, with a **mandatory minimum of 28 days pre-birth**. Paid at **100% of average salary over the last 12 months** (subject to a cap) by the Health Insurance Fund; requires **≥6 months** continuous employment. | A worker due 1 June starts leave by ~18 April at the latest (45-day option) and no later than ~3 May (28-day mandatory minimum), running 9 months from birth absent complication. | Unused portion **transferable to the father** (or adoptive parent). Additional **3 months unpaid** leave available any time until the child turns 3, in up to 3 separate periods. | [ZRO Art. 165–174](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Paternity leave [Татковско отсуство]** | **7 calendar days**, paid, on the birth of a child (or when the mother's remaining maternity-leave right is transferred). Employer-paid. Must be taken within a defined window around the birth. | A father takes 7 calendar days of paid leave starting the day his child is born, fully paid by the employer. | — | [ZRO (paternity leave)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Personal/family leave [Платено отсуство од лични и семејни причини]** | Up to **7 working days/year**, cumulative across all listed reasons: own marriage (**3 days**); marriage of a child (**2 days**); birth/adoption of a child (**2 days**, separate from paternity leave); death of spouse or child (**5 days**); death of parent/sibling/in-law (**2 days**); death of grandparent (**1 day**); moving residence (**1–2 days**); severe illness of a close family member (**employer discretion**). All are **paid** at the employee's regular rate. | An employee marrying (3 days) and later moving house (2 days) in the same year uses 5 of the 7-day annual cap. | — | [GCA (Private Sector)](https://www.ssm.org.mk) 🔎 |
| **Military and civic leave** | **Paid leave** for military reserve service, jury duty, election-commission duty, or other public duties summoned by a court or government authority. | — | — | [ZRO](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 / [GCA](https://www.ssm.org.mk) 🔎 |
| **Educational leave** | **Paid leave** for exam-taking during work-supported study (typically a **few days per exam**). **Unpaid** leave for self-funded study can be negotiated. | — | — | [ZRO](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 / [GCA](https://www.ssm.org.mk) 🔎 |
| **Unpaid leave [Неплатено отсуство]** | Up to **3 months/year**, subject to employer approval. Employee retains the employment relationship but receives **no pay and no service-credit accrual**; health insurance is **suspended** (or self-funded). | An employee approved for 2 months of unpaid leave receives no salary during that period and accrues no annual-leave or seniority credit for those 2 months. | — | [ZRO (unpaid leave)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Recordkeeping obligation** | Employers must maintain accurate per-employee records: **daily working hours** (start, end, breaks), **overtime hours**, **night-work hours**, **Sunday and holiday work**, **leave taken** (annual, sick, maternity, etc.), and **salary calculation per pay period**. | — | — | [ZRO (recordkeeping)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Pay-slip requirements** | Each employee's monthly pay slip must detail: **basic salary**, **each allowance separately** (OT/night/Sunday/holiday/three-shift/seniority/etc.), gross salary, tax and SSI deductions, net salary, and an **hours-worked breakdown** (regular/overtime/night/Sunday/holiday). | — | — | [ZRO](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 / [GCA](https://www.ssm.org.mk) 🔎 (pay-slip content) |
| **Retention period** | Personnel and payroll records: **~10 years minimum**. Some documents (e.g. relating to pension contributions) may require **longer** retention. | Timesheets and pay slips created in 2016 must be retained until at least 2026 before disposal is permitted. | — | [ZRO (records retention)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎 |
| **Inspection authority & enforcement** | The **State Labour Inspectorate** [Државен инспекторат за труд] enforces labour and OHS law; common findings include unpaid overtime, failure to register employees with social insurance, substandard pay slips, and rest-period violations. Fines typically **EUR 1,000–10,000 per violation** (employer + personal fine for the responsible manager); serial violations can escalate to criminal proceedings. | An inspection finding unpaid overtime across a shift roster can draw a fine in the EUR 1,000–10,000 range against the employer, plus a separate personal fine against the responsible manager. | Enforcement is chronically under-resourced (cited by EU/ILO/union reports as the framework's biggest weakness), particularly in textiles, leather, security, and informal seasonal work. | [ZRO (enforcement)](https://www.lexadin.nl/wlg/legis/nofr/eur/arch/mac/laborlaw.pdf) 🔎; State Labour Inspectorate |
| **Tolerance / rounding** | **No statutory rounding or grace-period rule** identified — any punch tolerance is a policy choice, not a legal requirement. | — | — | — none identified in current research — |

## Sources (requirements section)

- **Primary repo seed:** `context/worldwide-calculations/north-macedonia.md` (compiled May 2026),
  itself sourced from: Labour Relations Law consolidated text [ZRO], Official Gazette 62/2005 with
  amendments through 2025; General Collective Agreement for the Private Sector of the Economy,
  Official Gazette 115/2014, with amendments (ssm.org.mk); General Collective Agreement for the
  Public Sector (mtsp.gov.mk); Law on Holidays of the Republic of North Macedonia, Official Gazette
  21/1998, amended 2007; Law on Minimum Wage; Law on Employment of Persons (adopted 2025, effective
  1 Jan 2026); Law on Administrative Servants and Law on Public Sector Employees (adopted July
  2025).
- **Secondary/English-language references (per the seed's own bibliography):** Eurofound — Working
  Life in North Macedonia country profile; ILO Budapest Office reports on minimum wage and informal
  employment; Decent Work Balkans — Annual Fact Sheet on North Macedonia (2025); European Commission
  Enlargement Reports — North Macedonia chapter (Chapter 19: Social Policy and Employment); Lalicic
  & Boskoski Law Office (lblaw.com.mk) practical notes; CMS Expert Guide to Labour Law in CEE —
  North Macedonia chapter; Global Legal Insights — Employment & Labour Laws and Regulations:
  Macedonia (annual update).
- **Predecessor document:** `support-memos/north-macedonia.md` (prior verdict-first memo, now the
  parked appendix below).
- **⚠ Link-confirmation pass (2026-07-21):** ran under a shared, frugal search budget (≤3
  `WebSearch` calls across all countries in this batch). Confirmed **live and resolving** via
  direct fetch: the Lexadin World Law Guide mirror of the ZRO (`laborlaw.pdf`), `ssm.org.mk`
  (Federation of Trade Unions of Macedonia — hosts the GCA and branch CBAs), `mtsp.gov.mk`
  (Ministry of Labour and Social Policy — hosts the Law on Holidays / Minimum Wage / Employment of
  Persons), and EUR-Lex (EU Reg. 561/2006, article-pinpoint accurate). Attempted and **failed to
  confirm** (403/404): the ILO NATLEX PDF deposit, the Ministry's own consolidated-ZRO PDF URL, and
  `stat.gov.mk` was not independently fetched. None of these are article-anchored registers, so
  every `Basis` link in this file points to the correct **document**, not a verifiable
  **paragraph** — hence the near-blanket 🔎 on ZRO/GCA rows. **Figures were not re-confirmed
  against live source text this pass** (only link resolution was checked); every value still traces
  to the repo seed's own primary-law citations from the May 2026 compilation. Treat 🔎-flagged rows
  as priorities for a future pass with either a paid legal database or direct Macedonian-language
  Official Gazette lookup.

---

## Appendix (parked) — day.io capability & compliance-support analysis

Parked 2026-07-21. Former verdict-first memo content, kept intact.

# North Macedonia — T&A compliance support

**Verdict: 🟠 Partial — a good premium-emission fit, with the machinery gaps in the annual counters.**
North Macedonia's T&A premiums are **statutory and additive** — set by the Law on Labour Relations (ZRO)
and the **General Collective Agreement (GCA)**: OT **+35%**, night **+35%**, Sunday / weekly-rest-day
**+50%**, holiday **+50%**, three-shift **+5%**. These are *day-group / hour-type* premiums, which is
exactly what our OT rate rows and night band emit — and because Sunday, the weekly rest day, and public
holidays are all **non-working (non-planned) days**, working them fires the non-planned-day OT path onto
the right rate row, so the +50% lands on *all* worked hours, not just surplus. The engine also fits North
Macedonia's **GCA-as-policy** model (statutory premiums configured once per arrangement). The gaps cluster
where the country counts and averages across time: the **190h/year OT cap** (a cross-run YTD counter), the
**redistribution / averaging** scheme (*prerasporeduvanje* — pay-determining OT averaging over a reference
period), the **150-hour annual bonus** (a compound YTD OT-hours + absence-days trigger unique to North
Macedonia), plus **limit-validation** (daily/weekly/rest breaches are alert-only, not flagged) and the
**annual-leave ledger**. Read with the scope, verdict key, and **Basis key** in [`README.md`](./README.md).
**No verdict is DB-confirmed this pass** (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). North Macedonia's
> statutory OT onset is the **40h civil week** (ZRO Art. 117), so this closes the plain weekly trigger.
> Scope is the *weekly trigger only* — it does **not** close the **190h annual cap** counter or the
> **redistribution / reference-period averaging** (*prerasporeduvanje*), which remain gaps.

**Legal source:** `worldwide-calculations/north-macedonia.md` (compiled May 2026 from the consolidated ZRO
62/2005, the General Collective Agreement for the Private Sector OG 115/2014, the Law on Holidays, and the
Law on Minimum Wage). **⚠ Source notes:** the file is **explicit that premiums are additive on the basic
hourly rate, not multiplicative** (§3.7, §8.4), and that labour law is **uniform countrywide — no regional
variation** (§14). It leaves two things employer/branch-set and unquantified — **split-shift** and
**stand-by** premium % (§5.4, §8.2) — flagged 🔎, not asserted.

## Governing sources — who sets the T&A numbers

North Macedonia is unusually centralised for a premium regime: the operative numbers sit in the **statute +
the national GCA**, both **directly binding on all employers** in their sector regardless of membership.

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| Statute | Law on Labour Relations (ZRO 62/2005, consol.) | **Yes** — 8h/40h, caps (8h/wk + 190h/yr OT), rest (12h/24h), night window |
| National | **General Collective Agreement** (private OG 115/2014; separate public-sector GCA) | **Yes — the premium percentages** (OT/night/Sunday/holiday/3-shift), *erga omnes* on all sector employers |
| Branch | Special (sectoral) CBA — construction (SGIP), healthcare (SR/SZM), hospitality (SUTKOZ), police (MPS) | **Partly** — sets split-shift / stand-by / hardship %, 12h-shift frameworks; binding on members |
| Employer | Company-level CBA / internal salary rule | **Marginal** — company-specific terms, hardship % |

Because the premiums are **GCA-set and uniform**, each arrangement maps to **one pay policy** (S16) — a
clean fit, and simpler than federal countries: no state/municipal axis (§14).

## Rule-by-rule (Basis = where the verdict comes from)

| # | North Macedonia requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Standard 40h/week · 8h/day.** The legal norm is 8h/day over a Mon–Fri, 40h week (ZRO 116–117); hours beyond it are overtime | OT onset = surplus above the **planned** shift (per-day) + **weekly OT trigger** on the 40h week | ✅ | [API][UI][PO] | Planned 8h shift → surplus is daily OT (S4); the 40h civil week is the weekly trigger (S5, `[PO]` — see callout). Both fit |
| 2 | **OT onset — beyond 8h/day or 40h/week.** Overtime is work beyond the 40h week (or beyond the daily limit of a redistribution scheme) — the daily-8h note (§2.1) makes hours past 8/day OT at +35% | Per-day surplus-over-planned (S4) + weekly threshold (S5) | ✅ | [API][UI][PO] | The daily reading is native (surplus above an 8h plan); the weekly reading is S5. **🔎** if planned < 8h, does OT start at the plan or at the statutory 8h norm? (G1) |
| 3 | **OT premium +35% (GCA statutory).** Every OT hour carries a +35% uplift on basic (ZRO 117(7) + private-sector GCA) | OT **rate rows by day-group** → typed premium event; the % is a configured value | ✅ | [API][UI] | Rate row emits the OT-hours quantity + a named event (S1). **The +35% itself is downstream money** — we assess only the hour bucket |
| 4 | **OT weekly cap — 8h/week.** No more than 8 OT hours in a week (ZRO 117); some readings average it over a rolling 3-week period | Overall **period cap** on OT (single period: weekly/monthly/yearly/custom) + alert levers | 🟡 | [API] | The **weekly** cap fits a single-period cap (S7) + a supervisor alert (S13). But **breach *validation/flagging* is alert-only**, not a hard flag (G4); the **3-week averaging** reading is an averaging gap (see #6) |
| 5 | **OT annual cap — 190h/year.** A hard ceiling of 190 OT hours per calendar year per worker (ZRO 117) | Period cap is **single-period only**; no cross-run YTD counter | ❌ Gap | [ABS] | Needs a **year-to-date OT-hours counter carried across runs** (G3). S7 can cap weekly *or* yearly, **not both at once** — the weekly (#4) and annual caps can't run together, and neither accumulates across pay runs |
| 6 | **Redistribution / averaging — *prerasporeduvanje*.** An employer may distribute hours unevenly (e.g. 50h/30h weeks) over a reference period (calendar year, or 6 months by CBA); hours within the scheme are **not OT** as long as the average stays ≤40h/week — only the excess is OT | No reference-period averaging / redistribution primitive | ❌ Gap | [ABS] | **Pay-determining averaging** (G2): whether an hour past 8/day is OT or "scheduled unevenly" depends on the trailing-average — the same primitive we lack for FR annualisation / ES *bolsa*. **Opt-in** (employer must formally adopt), so customer-relative |
| 7 | **Night premium +35%, window 22:00–06:00.** Hours worked 22:00–06:00 carry a +35% uplift (ZRO 124 / GCA), independent of overtime | `nightShift {%, start, end, applyEntirePeriod}` — configurable window + premium | ✅ | [API][UI] | Emit the night-hours bucket + premium (S8); set window to **22:00–06:00**. Applies to *all* in-window hours regardless of surplus — the right shape |
| 8 | **Night-worker status + 4-month average cap.** A worker who does ≥3h night regularly, or ≥⅓ of annual hours at night, is a "night worker"; their **average** daily time over any 4-month window may not exceed 8h (ZRO 124/§4.5) | Night hours are emitted; no night-worker classification and no rolling multi-week average | 🟠 Partial | [API][ABS] | Night-hour **emission** ✅; the **status determination** (⅓-of-annual-hours counter) + **4-month averaging cap** are absent (G8/G2). Non-corrupting protective limit |
| 9 | **Three-shift premium +5%.** All hours worked under a rotating three-shift schedule carry +5% (GCA); the night leg stacks (3-shift +5% + night +35% = +40%) | Night leg stacks via S8; **no flat all-hours premium** lever keyed to a shift regime | 🟠 Partial | [ABS][DES] | The **night portion** composes via the night band; the **+5% on *all* rotation hours** (incl. day hours) has no clean lever — it's a per-worker/regime premium, not a day-group OT rate. Workaround: a dedicated policy that labels the rotation's hours. **🔎** |
| 10 | **Sunday work +50%.** Every hour worked on a Sunday draws +50% on basic; the worker is also owed 24h substitute rest another day (GCA §6.3). Since 2022 Sunday is the **universal rest day** | Sunday / **DSR & Rest days** rate rows + non-planned-day OT path; substitute rest at schedule level | ✅ | [API][UI] | Sunday is a **non-planned (rest) day** for most workers → working it fires the non-planned-day path (S14), so the Sunday rate row's +50% lands on **all** worked hours (S1). Substitute-rest scheduling is on the schedule |
| 11 | **Weekly-rest-day work +50% (non-Sunday).** For an irregular schedule where the rest day isn't Sunday (e.g. hotel worker off Tuesday), working the actual rest day also draws +50% — the engine should distinguish it from Sunday for audit | **DSR & Rest days** rate row (a distinct day-group from Sunday) | ✅ | [API][UI] | The designated rest day is non-planned → non-planned-day path → **DSR & Rest days** rate row (S1). **🔎** the edge where a *planned* Sunday (irregular schedule) needs +50% on regular hours leans on the same rate row |
| 12 | **Public-holiday work — regular day-pay + 50% per worked hour.** A worked holiday pays the day's normal salary (as if not worked) **plus** +50% on each hour actually worked (ZRO 117(7) / Law on Holidays / GCA §7.4) | Holidays rate row via the `daysMask` **Holiday bit** + non-planned-day path; holiday-day-pay = baseline salary | ✅ | [API][FLD] | The holiday is a non-working day → working it fires the non-planned path → **Holidays** rate row emits the +50% worked-hour bucket (S1/S11). The **"paid regardless"** day-pay is baseline/paid-holiday — downstream money |
| 13 | **Holiday calendar — 11 universal holidays + Sunday-rollover.** A fixed universal list (New Year, Orthodox Christmas, Labour Day, Ilinden, …); if a universal holiday falls on Sunday the following Monday is non-working, per the annual Government *Programme of Non-Working Days* | Holiday calendar (`SourceHoliday`), jurisdiction-keyed | ✅ | [FLD] | The engine **consumes the published programme** as reference data — including the Monday-rollover and one-off decreed days — rather than deriving dates. Uniform countrywide (§14), so a single calendar |
| 14 | **Community / confession-specific holidays.** Only employees who declare a confession/community (Orthodox, Muslim, Catholic, Jewish; Albanian/Turkish/Vlach/Roma/Serb/Bosniak) get the corresponding day off + holiday premium if worked — a **per-employee attribute**, not a location | Holiday calendar is **jurisdiction-keyed**, not worker-attribute-keyed | 🟠 Partial | [FLD][ABS] | The calendar can hold the community dates, but **selecting which apply to which worker by a confession attribute** isn't a modelled input. Workaround: per-employee schedule/holiday assignment. Material for North Macedonia's multi-ethnic workforce |
| 15 | **Additive premium stacking — separately totalled.** Premiums are **additive on basic, not multiplicative** (OT + night + Sunday = 220%); the pay slip must show each bucket (regular / OT / night / Sunday / holiday) separately (§3.7, §15.2) | Typed premium events per rate row (S1) + day/night split (S2) + Hours Distribution labeling; day-group × day/night composition | ✅ | [API][UI] | For **scope (emit typed hour quantities)** this fits: named OT/night/Sunday/holiday buckets are separately totalled; the **additive %** is downstream. **🔎** tagging one hour into *multiple overlapping* buckets (Sunday-night-OT) — the composition **mode** (additive vs ×) is `[DES]` (G6), but we only owe the quantities |
| 16 | **Daily rest ≥12h between shifts (≥14h if <18).** A minimum 12 consecutive hours off between two shifts (ZRO; §0) | `crossShiftsInterval {interval, phases[]}` — default 660min=11h, set to **720min=12h** | 🟠 Partial | [API] | The threshold field exists and is configurable to 12h; **what it does mechanically — validate/flag vs reshape — is unconfirmed** (finding #17). Validation behaviour 🔎 |
| 17 | **Weekly rest ≥24h consecutive.** At least 24 uninterrupted hours per week, normally Sunday (ZRO 135) | No weekly-rest accumulation primitive; `crossShiftsInterval` is a **single daily** threshold | 🟠 Partial | [DES][ABS] | The 24h weekly-rest **duration** breach isn't accumulated/flagged (G8). Mitigation: handled at the **schedule** level (rest day is planned off) + report export; standing breach-flag is on-demand |
| 18 | **>11h/day compliance flag.** A day exceeding 11h should be flagged as a violation — but the +35% OT rate still applies to all hours beyond 8 (§2.1) | OT beyond 8h emitted (S4); breach **flagging** is alert-only | 🟠 Partial | [API][ABS] | **OT computation is correct** (surplus above the 8h plan). The **11h breach flag** is alert-only via Notifications levers (S13), not a hard validation (G4) — non-corrupting |
| 19 | **Meal break ≥30min for shifts >6h; paid; not at shift start/end.** A ≥30-minute paid break on shifts over 6h, not schedulable at the very start or end (§0) | Break config on the schedule (mode, paid/unpaid, startAfter) | 🟡 | [DES] | Configurable as a **paid** break with a start-after offset. Whether the engine **validates** min-break-by-hours or the **start/end placement** constraint is unconfirmed 🔎 |
| 20 | **Stand-by / on-call (дежурство).** Required availability outside working hours is compensated (branch-set, typ. 10–25%), with the full premium when called in (GCA §8.2; healthcare §12.2) | On-call tab: availability + activation paid **separately** | ✅ | [API][UI] | S10 emits on-call availability and activated (called-in) hours as separate buckets — the right shape. The **%** is branch-set (downstream) |
| 21 | **150-hour annual bonus (Дополнителна плата).** If a worker does **>150 OT hours in a calendar year AND was absent <21 days** (annual leave excluded), a bonus of one month's average national net salary is owed — a compound year-to-date trigger unique to North Macedonia (§3.6) | No cross-run YTD counters; no compound OT-hours × absence-days condition | ❌ Gap | [ABS] | Needs **two YTD counters** (cumulative OT hours + cumulative absence days ex-annual-leave) evaluated together (G3). The **bonus amount** is downstream money, but the **trigger is pure T&A counting** — genuinely unbuilt |
| 22 | **Annual-leave accrual — 20 days min + seniority.** 20 working days/year floor after 6 months' service, +1 day per 5 years to a 26-day ceiling; carry-over usable to 30 June; sick days don't consume leave (ZRO 137–146) | Absence/request handling exists; no accrual ledger | ❌ Gap | [ABS] | The **accrual counter** (20 + seniority steps, carry-over expiry, sick-leave interruption) is a leave module the engine lacks (G12). Adjacent to core T&A; non-corrupting to computed hours |
| 23 | **Recordkeeping — every hour, by type.** Records of daily hours, OT, night, Sunday, holiday, leave, retained ~10 years; pay slip breaks pay into regular/OT/night/Sunday/holiday (§15) | Engine records every punch; typed events per rate row | ✅ | [FLD] | S15 records every punch; the typed OT/night/Sunday/holiday buckets (S1, #15) give the pay-slip breakdown. Retention config 🔎 |
| 24 | **GCA-as-policy.** The statutory premiums come from the national General Collective Agreement (binding *erga omnes*); a branch or company CBA may add terms — each arrangement modelled separately | One compensation arrangement = one pay policy | ✅ | [UI][DES] | S16 matches exactly — configure the GCA premiums once; branch/company CBAs become their own policies |
| 25 | **Split working time premium (5–10%).** A daily shift split into non-contiguous segments (e.g. hospitality 11:00–15:00 + 18:00–22:00) triggers a split-shift allowance, %-set at branch/employer level (§5.4) | No split-shift premium lever | 🟠 Partial | [DES] | Split-shift premium is design-only (G10). Narrow population (hospitality/tourism); % is branch-set (downstream) |
| 26 | **Under-18 protective regime.** No overtime at all (caps absolute), no night work, 8h/day + 40h/week, ≥14h daily rest (§0, §2.1) | Dedicated pay policy (no OT rows) + age gating | 🟡 | [DES] | Model as a **dedicated policy** with no OT rates; needs an age-flag workflow to gate assignment (regime gating G5). Narrow population, workaround exists |

## Summary — rule-by-rule (2026-07-19 pass)

North Macedonia's **premium-emission surface fits well**: **12 of 26 rules are ✅** — the statutory
additive premiums (OT +35%, night +35%, Sunday/rest-day +50%, holiday +50%) all map onto rate rows and the
night band, and because Sunday, rest days and holidays are non-planned days the +50% reaches all worked
hours, not just surplus. Two more are cleanly **🟡 Configurable** (weekly OT cap as a single-period cap;
meal break; under-18 regime). The remaining opens are the **counting-and-averaging machinery**:

| # | Rule | Verdict | Why it's open |
|---|---|---|---|
| 5 | OT annual cap 190h/year | ❌ Gap | No cross-run YTD OT counter (G3); S7 is single-period |
| 6 | Redistribution / averaging (*prerasporeduvanje*) | ❌ Gap | No reference-period averaging primitive (G2) — pay-determining |
| 21 | 150-hour annual bonus | ❌ Gap | Compound YTD OT-hours × absence-days trigger (G3), unbuilt |
| 22 | Annual-leave accrual (20 + seniority) | ❌ Gap | No leave-accrual ledger (G12); adjacent |
| 8 | Night-worker status + 4-mo avg cap | 🟠 Partial | Status classification + rolling average absent (G8/G2) |
| 9 | Three-shift +5% (all rotation hours) | 🟠 Partial | No flat all-hours regime premium; night leg stacks |
| 14 | Community/confession holidays | 🟠 Partial | Calendar isn't worker-attribute-keyed |
| 16 | Daily rest 12h | 🟠 Partial / 🔎 | Field exists; validation behaviour unconfirmed |
| 17 | Weekly rest 24h | 🟠 Partial | No weekly-rest accumulation; schedule + report mitigate |
| 18 | >11h/day breach flag | 🟠 Partial | OT correct; breach flag alert-only (G4) |
| 25 | Split working time premium | 🟠 Partial | Split-shift premium design-only (G10) |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — that's **14 of the 26 rows**; see the Summary above.
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped) · 🟡 Medium (moderately common, or a usable mitigation, or moderate build;
> typically legal obligations that don't corrupt pay) · 🟢 Low (narrow population, strong mitigation, or
> trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general North Macedonian market* a rule bites. **⚠ Customer-relative** —
>   shifts with the workforce: **construction / hospitality / seasonal → #6 redistribution**; **high-OT
>   employers → #5 + #21 annual counters**; **manufacturing/healthcare continuous ops → #9 three-shift**;
>   **multi-ethnic workforces → #14 community holidays**.
> - **Build-effort** = my estimate, **grounded in the toolkit** (`[API]`/`[UI]` ≈ config/small **S**;
>   `[DES]`/counter ≈ **M**; period-averaging / net-new subsystem ≈ **L**). **⚠ Calendar time needs
>   engineering validation.**

| Rule | Mitigation today | Prevalence (NMK market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#6 Redistribution / averaging (*prerasporeduvanje*)** | **Partial** — a banked-hours cycle can approximate netting, but whether an hour is OT vs scheduled-uneven is decided by the trailing average, which we don't compute; pay can be wrong under a redistribution scheme | **Med** — opt-in; bites construction/hospitality/seasonal (**High** in those accounts) | **L** — reference-period averaging (shares the FR-annualisation / ES-*bolsa* primitive) | 🟠 **High** |
| **#5 OT annual cap 190h/year** | **Partial** — a supervisor alert can approximate; **pay stays correct** (the cap is a limit, not a rate) | **High** as a legal obligation (non-corrupting) | **M** — cross-run YTD OT-hours counter | 🟠 **High** |
| **#21 150-hour annual bonus** | **Weak** — no counters; would need manual year-end OT-hours + absence-days reconciliation | **Low-Med** — only high-OT workers (>150 OT/yr, near the 190h cap) | **M** — two YTD counters + a compound year-end evaluation | 🟠 **High** |
| **#8 Night-worker status + 4-mo cap** | **Partial** — night hours emit; no ⅓-of-annual-hours classification nor 4-month average | **Med** — night-working populations | **M** — status counter + rolling 4-mo average | 🟡 **Medium** |
| **#9 Three-shift +5% (all hours)** | **Partial** — the night leg stacks; a dedicated policy could label the rotation's hours, but there's no flat all-hours premium primitive | **Med** — manufacturing / healthcare continuous ops | **M** — a regime-scoped flat premium | 🟡 **Medium** |
| **#14 Community/confession holidays** | **Partial** — the calendar holds the dates; per-worker entitlement needs manual per-employee holiday/schedule assignment | **Med** — multi-ethnic workforces (Albanian/Turkish/Roma/… communities) | **M** — a worker confession attribute driving calendar selection | 🟡 **Medium** |
| **#22 Annual-leave accrual (20 + seniority)** | **Partial** — leave handled as absences/requests; the 20 + 1-per-5-yr accrual, carry-over expiry and sick-interruption need a leave module | **High**, but adjacent to core T&A (leave mgmt) | **M** — accrual ledger + seniority steps | 🟡 **Medium** |
| **#25 Split working time premium** | **Weak** — no split-shift premium; a duration-type break approximates the shape | **Low** — hospitality/tourism split shifts | **M** — split-shift premium | 🟢 **Low** |
| **#17 Weekly rest 24h** | **Strong** — rest day is planned off at the schedule level; reports export the data; breach-flag on demand | **High** as a legal obligation (non-corrupting) | **S** — formalize the export into a standard breach alert | 🟢 **Low** |
| **#18 >11h/day breach flag** | **Partial** — Notifications levers flag it (alert-only); **pay stays correct** (OT emitted via surplus-above-8h) | **High** as a legal obligation (non-corrupting) | **S** — single-period span-vs-limit flag | 🟢 **Low** |
| **#16 Daily rest 12h** | **Partial** — the 12h inter-shift threshold is configurable; validate/flag behaviour unconfirmed | **Med** | **S** — set the value; confirm validation | 🟢 **Low** / 🔎 |
| **#26 Under-18 regime** | **Strong** — a dedicated no-OT policy with an age-flag workflow | **Low** — minors only | **S** — age-gated policy assignment | 🟢 **Low** |

### Severity roll-up (2026-07-19 pass)
- **🔴 Critical (0):** none — the premiums are statutory-additive and fit rate rows; OT determination is
  per-day/per-week (S4/S5), not the general-market-default averaging that would corrupt pay. Redistribution
  is opt-in.
- **🟠 High (3):** redistribution / averaging (#6), OT annual cap 190h counter (#5), 150-hour annual bonus (#21).
- **🟡 Medium (4):** night-worker status + 4-mo cap (#8), three-shift +5% (#9), community/confession holidays (#14), annual-leave accrual (#22).
- **🟢 Low (5):** split-shift premium (#25), weekly rest 24h (#17), >11h/day flag (#18), daily rest 12h (#16, 🔎), under-18 regime (#26).

## The big gaps (all `[ABS]`)
1. **Annual OT counters** (#5, #21) — the 190h/year cap **and** the 150-hour bonus both need **cross-run
   year-to-date counters** carried across pay runs; S7 is single-period only. The bonus adds a compound
   second counter (absence days).
2. **Reference-period averaging** (#6) — *prerasporeduvanje* decides whether an hour is OT or scheduled-
   uneven from a trailing average; the same period-averaging primitive we lack for FR annualisation.
3. **Worker-regime axes** (#8 night-worker, #9 three-shift, #14 confession, #26 minors) — status/attribute
   inputs (⅓-annual-hours night, rotation membership, confession, age) that gate a premium or a limit.
4. **Limit validation** (#16, #17, #18) — daily 12h rest, weekly 24h rest, >11h/day are alert-only, not
   flagged breaches (non-corrupting).
5. **Leave ledger** (#22) — statutory annual-leave accrual with seniority steps.

## Where North Macedonia scores well (worth saying)
- **Statutory additive premiums** (#3, #7, #10–12): OT +35%, night +35%, Sunday/rest-day +50%, holiday +50%
  all emit as typed day-group / night buckets on the OT rate table `[API][UI]` — and because Sunday, rest
  days and holidays are **non-planned days**, the +50% reaches **all** worked hours via the non-planned-day
  path, not just surplus.
- **Weekly OT onset** (#1–2): the 40h civil-week trigger is now supported `[PO]`, reinforced by the native
  per-day surplus-above-8h-plan (S4).
- **GCA-as-policy** (#24): the *erga omnes* national GCA premiums configure once per arrangement; branch/
  company CBAs become their own policies — an exact fit `[UI][DES]`, and simpler than federal countries
  (no regional axis, §14).
- **On-call** (#20), the **holiday calendar** with Government-programme rollover (#13), **records** (#23),
  and **typed pay-slip buckets** (#15) — all present `[API]`/`[FLD]`.

## 🔎 Verify before telling the customer
- **Weekly OT (#1–2)**: marked ✅ per product-owner confirmation (2026-07-18) — **not yet `[API]/[UI]`-visible**.
  Confirm ship status before a hard commitment.
- **`crossShiftsInterval` behaviour** (#16): the field is `[API]`-real and configurable to 12h, but does it
  *validate* rest or only classify/reshape? Weekly 24h rest (#17) is absent regardless.
- **Additive multi-tag** (#15): can one hour land in **multiple** overlapping buckets (Sunday + night + OT)
  so downstream sums the additive %, or does the day/night rate row have to pre-encode the composed value?
- **Min-break-by-hours + start/end placement** (#19): configurable, but is the 30-min-over-6h rule (and the
  "not at start/end" constraint) *validated/flagged*?
- **If planned shift < 8h** (#2): does OT start at the plan or at the statutory 8h daily norm? (G1)

## Bottom line for the customer
North Macedonia is a **good premium-emission fit**: its statutory, GCA-set, **additive** premiums (OT +35%,
night +35%, Sunday/rest-day/holiday +50%) map cleanly onto our rate rows and night band, the weekly-40h OT
trigger is supported, and the GCA-as-policy model fits exactly. What we can't yet do is **count and average
across time** — the **190h/year OT cap** and the **150-hour annual bonus** need cross-run YTD counters; the
**redistribution scheme** (*prerasporeduvanje*) needs reference-period averaging and is the one pay-
*determining* gap (opt-in, so customer-relative); and daily/weekly rest and the >11h day are alert-only, not
validated. Honest status: **partial — the standard-workforce case is servable today; the annual counters,
redistribution averaging, and worker-regime axes are the roadmap.** No Critical gaps; three Highs, all in
the counting/averaging machinery.
