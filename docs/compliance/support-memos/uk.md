# United Kingdom — T&A requirements

> **What this is.** The ground-truth reference for the United Kingdom's time-&-attendance legal
> requirements, grouped by topic — detailed enough to **build a day.io pay policy from**. It aims to
> be **exhaustive** and **atomic**: **one legal proposition per row**, each row self-contained (no
> "see §X" as the only content), with exact values, a worked example wherever a number is involved,
> variants, and a `Basis` that **links to the primary source** so any row can be checked against the
> law directly.
>
> **Scope: time & day-events only** — money (%, £, tax, gross-to-net) is downstream *context* here
> (kept in `Values` so a policy can be configured; the deliverable is the typed hour/day event).
> **Term convention:** every non-English or UK-specific term of art (e.g. *TOIL* [time off in lieu])
> is glossed in English in brackets on first use in a section.
>
> **The one structural fact to hold onto:** the UK is **statute-dominant** on working-time *limits*
> — the **Working Time Regulations 1998** (WTR) fix the 48h average week, night-work caps, rest and
> breaks, and the 5.6-week statutory leave, all **inside the national statute** (no regional/CBA
> layer sets these). By contrast, **every pay premium** (overtime, night, weekend, bank-holiday) is
> **wholly contractual** — the statute prices none of them, defaulting to plain time unless the
> contract, staff handbook, or a collective/workforce agreement says otherwise. A thin sector layer
> (NHS Agenda for Change, NJC "Green Book" for local government, rail/fire) is decisive only where
> incorporated. So many rows below cite "contract" as the `Basis`, not a statute — that genuinely is
> the law for those matters.
>
> **Legal sources & links:** [legislation.gov.uk](https://www.legislation.gov.uk/) is the UK's
> official legislation register — the Working Time Regulations 1998 (SI 1998/1833), Employment
> Rights Act 1996, Equality Act 2010, Maternity and Parental Leave etc. Regulations 1999, Statutory
> Sick Pay (General) Regulations 1982, Carer's Leave Act 2023, Part-time Workers Regulations 2000,
> Agency Workers Regulations 2010, and the Employment Rights Act 2025 (Royal Assent 18 Dec 2025,
> staged 2026–2027) all resolve there (per-regulation/-section deep links used where confirmed live).
> Repo seeds: `context/worldwide-calculations/uk_time_attendance_reference.md` (2026-07-17) + the
> predecessor `support-memos/uk.md` (now the parked appendix) + fresh web research (2026-07-21, links
> verified live). Full list at the foot of the requirements section. 🔎 marks a figure or deep link
> not independently confirmed this pass.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statute sets limits, not pay** | WTR governs the 48h average week, night limits, rest, breaks, 5.6-week leave — **no overtime, night, weekend, or bank-holiday premium** is fixed by statute. Every premium is contractual. | A worker with a silent contract who works a Sunday or a night shift is owed **only their normal rate** — no legal uplift applies. | A thin sector layer (NHS Agenda for Change, NJC "Green Book," rail/fire collective agreements) sets enhancements **where incorporated** into the contract. | [WTR 1998](https://www.legislation.gov.uk/uksi/1998/1833/contents); [ERA 1996](https://www.legislation.gov.uk/ukpga/1996/18/contents) |
| **"Worker" is broader than "employee"** | WTR rights (48h, rest, breaks, leave) attach to the wider **"worker"** class: employees, most agency/casual staff, zero-hours workers, most personally-performing freelancers. Genuinely self-employed contractors are excluded. | A zero-hours retail worker is a "worker" for WTR purposes even without an "employee" contract. | — | [WTR reg. 2](https://www.legislation.gov.uk/uksi/1998/1833/regulation/2); [ERA 1996 s.230](https://www.legislation.gov.uk/ukpga/1996/18/section/230) |
| **Unmeasured-working-time exemption** | Workers with **unmeasured working time** who wholly determine their own hours (senior autonomous staff) sit **outside** the 48h/night/rest limits. | A managing director who sets their own schedule with no employer oversight may fall outside the WTR limits. | Sector regimes: transport, sea, aviation, and (specific reference periods) junior doctors — see §4. | [WTR reg. 20](https://www.legislation.gov.uk/uksi/1998/1833/regulation/20) |
| **Part-time worker regime — comparable treatment** | A part-time worker must not be treated **less favourably** than a comparable full-time worker doing the same/broadly-similar work, applying the **pro rata principle** [proportional to hours] for pay and benefits (leave, breaks) unless objectively justified. | A full-time worker earning £28,000/yr → a part-time worker on half the hours in the same role is owed not less than £14,000 pro rata. | — | [Part-time Workers (Prevention of Less Favourable Treatment) Regulations 2000](https://www.legislation.gov.uk/uksi/2000/1551/contents) |
| **Fixed-term employee regime** | A fixed-term employee must not be treated less favourably than a comparable permanent employee; after **4 years'** continuous fixed-term service (absent objective justification for renewal), the contract becomes **permanent** by operation of law. | A researcher on consecutive 1-year fixed-term contracts automatically becomes permanent at the start of year 5. | — | [Fixed-term Employees (Prevention of Less Favourable Treatment) Regulations 2002](https://www.legislation.gov.uk/uksi/2002/2034/contents) |
| **Agency workers — 12-week equal treatment** | An agency worker gets **equal treatment on pay and basic working conditions** (rest breaks, annual leave) as a directly-recruited comparable employee, once they complete a **12-calendar-week qualifying period** in the same role with the same hirer. | An agency worker in week 13 of the same assignment must be paid the same rate and given the same rest breaks as an equivalent direct hire. | Every calendar week with **any** hours worked counts toward the 12; breaks in assignment can reset the clock (rules are technical). | [Agency Workers Regulations 2010](https://www.legislation.gov.uk/uksi/2010/93/contents) |
| **Apprentices — 20% off-the-job training time** | Apprentices must spend **≥20% of working hours** (or, for standards moving to the simplified rule from Aug 2025, a **fixed minimum hours** figure per standard) on protected **off-the-job training**, within paid hours. ≥30h/week contract → **≥6h/week** minimum. | A 35h/week apprentice must get at least 7h/week (20%) — or the standard's fixed minimum — as scheduled training time, not working production hours. | Simplified fixed-hours rule phasing in per apprenticeship standard from August 2025 — check the specific standard. | [Apprenticeships, Skills, Children and Learning Act 2009](https://www.legislation.gov.uk/ukpga/2009/22/contents) 🔎; ESFA funding rules |
| **Young workers (under 18) — protective regime** | Above compulsory school-leaving age but **<18**: **8h/day · 40h/week** cap, generally **no night work**, **12h** daily rest, **48h (2 days)** weekly rest, **30-min** break if working >4.5h — none of these limits average or opt out. (Detail in §4/§5.) | A 17-year-old retail worker cannot be rostered past the night-work restriction nor beyond 8h/day even where an adult colleague works a 10h shift. | Under-16 work-experience placements get the same 30-min break rule. | [WTR reg. 5A / 6A](https://www.legislation.gov.uk/uksi/1998/1833/regulation/6A); [reg. 27](https://www.legislation.gov.uk/uksi/1998/1833/regulation/27); [Children and Young Persons Act 1933](https://www.legislation.gov.uk/ukpga/Geo5and1Edw8/23-24/12/contents) 🔎 |
| **48h opt-out (adults only)** | A worker **≥18** may **individually** (never workforce-wide) opt out of the 48h average limit in writing; terminable by the worker on notice (**max 3 months**; default **7 days** if unspecified). It does **not** waive rest breaks and **cannot** waive the night-worker 8h limit. | A worker signs an opt-out to average 55h/week during a peak season; they may later give 7 days' notice to revoke it. | Some sectors bar the opt-out entirely for safety-critical roles (case-specific). | [WTR reg. 5](https://www.legislation.gov.uk/uksi/1998/1833/regulation/5) |
| **Zero-hours and low-hours contracts — day-one status quo, reform pending** | No statutory ban today; workers are engaged with no/minimal guaranteed hours. **⚠ Employment Rights Act 2025 reform (see row below) is not yet fully in force — do not model as settled.** | — | — | [ERA 1996](https://www.legislation.gov.uk/ukpga/1996/18/contents) (current law); [ERA 2025](https://www.legislation.gov.uk/ukpga/2025/36/contents) (pending) |
| **⚠ Pending — Employment Rights Act 2025, shift notice & cancellation pay** | From **October 2026**: employers must give "reasonable notice" of a shift (expected **≥72h**) and pay workers if a shift is **cancelled, moved, or cut short** at short notice. **Not yet fully detailed — secondary legislation pending.** | A worker rostered with 48h notice (below the expected 72h) once the reform is in force could be owed cancellation-style pay if the shift is then pulled — exact formula still pending. | — | [Employment Rights Act 2025](https://www.legislation.gov.uk/ukpga/2025/36/contents) |
| **⚠ Pending — Employment Rights Act 2025, guaranteed hours** | From **2027** (exact date tbc): zero-/low-hours workers gain a right to be **offered a guaranteed-hours contract** reflecting hours actually worked over a reference period (**expected ~12 weeks**; mean-vs-median method and low-hours threshold, options 8–48h/week, preference 8–20h, still under regulation). **Not yet law — do not model as settled.** | A zero-hours worker who has actually worked ~20h/week on average over a 12-week reference period would, once the reform is in force, be entitled to be offered a contract guaranteeing roughly that many hours. | — | [ERA 2025 s.1 (new ERA 1996 s.27BA–27BI)](https://www.legislation.gov.uk/ukpga/2025/36/section/1) |
| **⚠ Pending — day-one unpaid parental leave (already landed)** | From **6 April 2026**, the 18-week unpaid parental leave entitlement (§10) became a **day-one right** (previously required 1 year's service). This IS now in force. | A parent starting a new job on 1 May 2026 can immediately request unpaid parental leave for a child under 18, with no qualifying-service wait. | — | [ERA 2025](https://www.legislation.gov.uk/ukpga/2025/36/contents); [Maternity and Parental Leave etc. Regulations 1999 reg. 13 (amended)](https://www.legislation.gov.uk/uksi/1999/3312/regulation/13) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **What counts as working time** | A period in which the worker is **(a) working, (b) at the employer's disposal, and (c) carrying out their activity/duties**, plus **relevant training**. Excludes ordinary home-to-work commuting, unrestricted off-site standby (only actual call-outs count — see §8), and work-related social events. | Travel between two job sites during the working day counts as working time; the first/last home commute does not. | — | [WTR reg. 2](https://www.legislation.gov.uk/uksi/1998/1833/regulation/2) |
| **On-call / disposal test** | Whether on-call time counts turns on the **disposal test**, not the label: **restricted** on-call (must stay at/near the workplace, respond immediately, cannot use time freely) counts **in full**; **unrestricted** standby (free to do as they please, merely contactable) does **not** — only actual call-outs count. | A firefighter required to remain at the station overnight counts the whole shift; an on-call IT worker free to be anywhere, merely reachable by phone, counts only the minutes of an actual call-out. | — | [WTR reg. 2](https://www.legislation.gov.uk/uksi/1998/1833/regulation/2); CJEU *Matzak*-line case law 🔎 |
| **Reference-period averaging — 17 weeks (extendable)** | The 48h weekly cap (§4) is a **rolling average**, not measured week-by-week: default window **17 weeks**, extendable to **52 weeks** by a collective/workforce agreement, or **26 weeks** for junior doctors and other WTR reg. 21 special-case workers (security/surveillance, continuity-of-service roles). | A worker averaging 46h/week over the 17-week window is compliant even if one peak week hit 60h, provided lighter weeks offset it. | Reg. 21 special-case workers get the 26-week window as standard, not just doctors. | [WTR reg. 4(3)–(6)](https://www.legislation.gov.uk/uksi/1998/1833/regulation/4); [regs. 20](https://www.legislation.gov.uk/uksi/1998/1833/regulation/20)–[21](https://www.legislation.gov.uk/uksi/1998/1833/regulation/21) |
| **Missing time / missing day** | Standard attendance semantics: worked hours below scheduled (with ≥1 punch) → missing hours; a scheduled day with zero punches → missing day. | A worker scheduled 8h logs only 5h with a mid-shift punch gap → 3h missing hours recorded. | — | (engine standard; not statute) |

## 3. Overtime

*The UK has no statutory overtime premium and no statutory OT onset — both are wholly contractual, the same posture as Germany and (on this point) the US FLSA.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory OT onset** | Hours beyond the worker's **contract hours** (daily and/or weekly, per the contract) are the trigger — entirely contract-defined; the statute fixes no value to fall back on. | A 37.5h/week contract worker who works 42h in a week has 4.5h of over-contract hours; whether it's "overtime" with a premium is purely contractual. | Common triggers: daily threshold, weekly threshold, or a hybrid of both. | [ERA 1996](https://www.legislation.gov.uk/ukpga/1996/18/contents) (silent); contract |
| **Overtime is not compellable absent contract terms** | A worker generally **need not** work overtime unless the contract requires it. | An employee declining a manager's request for extra hours, where the contract is silent on mandatory OT, is not in breach. | Contract may make OT mandatory ("reasonable additional hours" clauses are common). | contract |
| **NMW backstop (context only)** | Across a pay-reference period, average pay must not fall below the National Minimum Wage once all worked hours are counted — a **downstream money check**, not an OT trigger, but the reason every worked hour must be captured accurately. | — | — | [National Minimum Wage Act 1998](https://www.legislation.gov.uk/ukpga/1998/39/contents) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory OT premium** | **No legal uplift.** Common contractual bands: **1.0×** (plain time / "absorbed"), **1.5×** ("time and a half"), **2.0×** ("double time"). Default = **1.0× (no premium)** absent contract terms. | Handbook says "time-and-a-half after 40h/week": a 42h week → 40h at 1.0×, 2h at 1.5×. A silent contract → all 42h at 1.0×. | NHS Agenda for Change / NJC "Green Book" / rail / fire sector agreements set their own bands where incorporated — 🔎 illustrative only, not universal. | contract; NHS Agenda for Change §2 (where incorporated) 🔎 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory annual OT-hours cap** | The UK caps **working time** (the 48h average, §4), not overtime hours specifically — no per-worker annual OT ceiling exists. | — | — | [WTR 1998](https://www.legislation.gov.uk/uksi/1998/1833/contents) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-determining averaging** | The UK's 17-week reference-period averaging validates the **48h working-time limit** (a compliance flag), not OT pay — placed in §4, not here. OT is never netted at period close for pay purposes. | — | A collective/workforce agreement may extend the window to **52 weeks** (§2). | [WTR reg. 4](https://www.legislation.gov.uk/uksi/1998/1833/regulation/4) (see §4) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Never infer a premium from calendar facts** | Night, weekend, and bank-holiday hours are **factual overlays only** — the engine must emit them as typed facts (is-night, is-weekend, worked-on-bank-holiday) and let the **contract's band table** decide whether any premium attaches. Default = **no premium**. | A night hour worked on a Sunday: emit both `NIGHT_HOURS` and `is_weekend` facts; whether either carries a premium — and whether they stack additively — is a pure contract-table lookup. | Where contractual premiums exist, composition (additive vs. exclusive/"no-pyramiding") is itself a contract term, not a statutory default. | contract |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **48-hour average week** | Average working time must not exceed **48h/week**, measured as a rolling average over the reference period (§2: default **17 weeks**, up to **52** by agreement, **26** for reg. 21 special cases). Waivable by individual opt-out (§1). | A worker averaging 50h/week for 4 weeks then 44h/week for the rest of a 17-week window may still average ≤48h overall. | Junior doctors and other reg. 21 workers get 26 weeks; opt-out suppresses the flag but not night/rest limits. | [WTR reg. 4](https://www.legislation.gov.uk/uksi/1998/1833/regulation/4) |
| **Daily rest — 11 hours between shifts** | **≥11 consecutive hours** of rest in each 24-hour period. | A shift ending 22:00 → next shift may not start before 09:00. | Young workers get **12h** (below); compensatory rest applies where shift patterns legitimately displace it. | [WTR reg. 10](https://www.legislation.gov.uk/uksi/1998/1833/regulation/10) |
| **Weekly rest — 24h/7 days or 48h/14 days** | **≥24h uninterrupted** rest per 7-day period, **or 48h per 14 days** (employer's choice of measurement). Where legitimately prevented (e.g. late-to-early changeover), the worker is owed **equivalent compensatory rest**. | A worker rostered 13 consecutive days must get 48h continuous rest across the fortnight if the employer uses the 14-day measure. | Young workers get **48h (2 days)** weekly, non-averaged (below). | [WTR reg. 11](https://www.legislation.gov.uk/uksi/1998/1833/regulation/11) |
| **Rest break — 20 minutes if >6h worked** | An uninterrupted **20-minute** break once daily working time **exceeds 6 hours**, taken away from the workstation. **Not required to be paid** unless the contract provides for it. | An 8h shift triggers one 20-min break; payment for it is a contract question. | Young workers: **30 min** if working **>4.5h** (below). | [WTR reg. 12](https://www.legislation.gov.uk/uksi/1998/1833/regulation/12) |
| **Compensatory rest** | Where shift patterns legitimately prevent standard daily/weekly rest, the worker is entitled to an **equivalent period of compensatory rest**. | A late-finish-to-early-start rota that shortens the 11h gap owes the missing rest back within a reasonable period. | — | [WTR reg. 24](https://www.legislation.gov.uk/uksi/1998/1833/regulation/24) |
| **Young workers (<18) — tighter limits, no averaging/opt-out** | **8h/day · 40h/week** (hard cap, never averaged); **12h** daily rest; **48h (2 days)** weekly rest; **30-min** break after **4.5h** worked; night work **generally barred**. | A 17-year-old apprentice cannot be rostered a 10h day even if adult colleagues average 10h under a flexed schedule. | Under-16 work-experience placements get the same 30-min break rule as young workers. | [WTR reg. 5A / 6A](https://www.legislation.gov.uk/uksi/1998/1833/regulation/6A); reg. 11(3); reg. 12(4); [reg. 27](https://www.legislation.gov.uk/uksi/1998/1833/regulation/27) |
| **Unmeasured-working-time / autonomous-worker exemption** | Workers who **wholly determine their own working time** (genuinely senior/autonomous roles) fall **outside** the 48h, night, and rest-period limits. | — | Narrow population; fact-specific test. | [WTR reg. 20](https://www.legislation.gov.uk/uksi/1998/1833/regulation/20) |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night-time window — default 23:00–06:00** | Defaults to **23:00–06:00**; a "relevant agreement" (contract or collective/workforce agreement) may set a different window if it is **≥7 hours long** and **includes 00:00–05:00**. | A contract sets night-time as 22:00–05:00 (7h, includes 00:00–05:00) — valid; a window of 23:00–04:00 (5h) would not be. | NHS Agenda for Change commonly uses **20:00–06:00** for its unsocial-hours *enhancement* — a different, contractual window from the statutory limit window. 🔎 illustrative, not universal. | [WTR reg. 2](https://www.legislation.gov.uk/uksi/1998/1833/regulation/2) |
| **Night-worker status** | A worker who, as a **normal course**, works **≥3 hours** of daily working time in the night window — on most working days, per a collective/workforce-agreement-defined proportion, or regularly enough that a significant part of work is at night. | A worker regularly rostered 22:00–06:00 shifts qualifies; occasional one-off night cover does not. | — | [WTR reg. 2](https://www.legislation.gov.uk/uksi/1998/1833/regulation/2) |
| **Night-worker 8h average limit** | A night worker's **normal hours must not exceed 8h per 24-hour period on average**, over the **17-week** reference window (regularly-worked/guaranteed OT included). **Cannot be opted out of** — the 48h opt-out (§4) does not reach this limit. | A night worker rostered a run of 10h nights must be offset by shorter nights elsewhere in the 17-week window to keep the average at ≤8h. | — | [WTR reg. 6(1)–(2), (7)](https://www.legislation.gov.uk/uksi/1998/1833/regulation/6) |
| **Night-worker 8h absolute cap — special hazard/heavy strain** | Where night work carries **special hazards or heavy physical/mental strain** (per risk assessment or collective agreement), the 8h limit is a **hard cap in any single 24-hour period — no averaging**. | A hazardous-materials night operator may not exceed 8h in a single night shift, regardless of lighter shifts elsewhere in the window. | — | [WTR reg. 6(7)–(8)](https://www.legislation.gov.uk/uksi/1998/1833/regulation/6) |
| **Health assessment for night workers** | Employer must **offer** a free health assessment before night work starts and at regular intervals; a medical adviser's recommendation to transfer triggers a duty to **move the worker to day work** where possible. | — | Not a punch-derived event — a per-worker compliance attribute. | [WTR reg. 7](https://www.legislation.gov.uk/uksi/1998/1833/regulation/7) |
| **Young workers — night-work ban** | Under-18 workers generally may **not work at all** during the night-work restricted period (commonly framed as **22:00–06:00**, or **23:00–07:00** in some sectoral formulations). | A 17-year-old cannot be rostered past the evening cutoff even for a short shift. | Narrow exceptions exist for specific sectors/emergencies; the population is narrow and the rule near-absolute. | [WTR reg. 6A](https://www.legislation.gov.uk/uksi/1998/1833/regulation/6A) |
| **No statutory night premium** | **No legal uplift** for night hours — any "night rate" is wholly contractual, defaulting to no premium. | NHS Agenda for Change: weekday nights (20:00–06:00) + Saturday **+30%** (Bands 4–9, up to **+47%** Band 1) — 🔎 illustrative, sector-specific, not a UK-wide statutory value. | Rate and window both contract/CBA-set. | contract; NHS Agenda for Change §2 (illustrative) 🔎 |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory right to bank holidays off or premium pay** | There is **no legal right** to time off, nor to extra pay, for working a bank/public holiday — both are wholly contractual. | A worker rostered on Christmas Day with a silent contract is owed only their normal rate, with no automatic day off. | — | contract; [ERA 1996](https://www.legislation.gov.uk/ukpga/1996/18/contents) (silent) |
| **Bank-holiday calendar varies by UK nation** | **England & Wales: 8** days/year (New Year's Day, Good Friday, Easter Monday, Early May, Spring, Summer, Christmas Day, Boxing Day). **Scotland: 9** (adds 2 January and St Andrew's Day; no Easter Monday). **Northern Ireland: 10** (adds St Patrick's Day and Battle of the Boyne/Orangemen's Day, 12 July). | A worker in Glasgow and one in Cardiff have different bank-holiday calendars in the same tax year. | Resolve the calendar by the worker's **work location**, not company HQ. | [Banking and Financial Dealings Act 1971](https://www.legislation.gov.uk/ukpga/1971/80/contents) (as amended) |
| **Bank holidays may be folded into statutory leave** | An employer may either **count bank holidays within** the 5.6-week statutory leave entitlement (§10) or **grant them on top** — a contractual choice. | A contract giving "20 days + bank holidays" grants them on top; "28 days inclusive of bank holidays" folds them in. | — | contract; [WTR reg. 13](https://www.legislation.gov.uk/uksi/1998/1833/regulation/13) (context) |
| **Worked-bank-holiday premium — contractual only** | **No statutory %.** Any premium for working a bank/public holiday is purely contract/CBA-set. | NHS Agenda for Change: Sunday + public holidays **+60%** (up to **+94%** at Band 1) — 🔎 illustrative, sector-specific. | — | contract; NHS Agenda for Change §2 (illustrative) 🔎 |
| **Sunday-working opt-out (shop & betting workers)** | A shop or betting-shop worker may give **written notice** opting out of Sunday work; after a **3-month** notice period, the employer can no longer require Sunday work of them. | A retail worker submits an opt-out notice in January; from April they cannot lawfully be rostered on Sundays. | A day-event **scheduling right**, not a premium; applies to shop/betting workers specifically, not all sectors. | [ERA 1996 Part IV (ss. 36–43)](https://www.legislation.gov.uk/ukpga/1996/18/part/IV) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **TOIL [Time Off In Lieu] — wholly contractual** | No statute creates TOIL; it exists only if the contract/agreement establishes it. Common accrual: **1:1** (hour-for-hour); some employers grant **1.5:1**. Caps/expiry are contract-set (e.g. max **22.5h** accrued; must be taken within **3 months** or paid out — 🔎 illustrative examples, not universal values). | 10 hours of over-contract work banked at 1:1 → 10h of future time off; at 1.5:1 → 15h off. | Ratio, cap, and expiry action are 100% contract-defined; default is **off** (many UK employers pay overtime in cash or absorb it, rather than bank it). | contract |
| **TOIL must not corrupt NMW** | Banking hours as TOIL instead of cash pay must not push the pay-reference-period average below the **National Minimum Wage** — a downstream check. | — | — | [National Minimum Wage Act 1998](https://www.legislation.gov.uk/ukpga/1998/39/contents) |
| **TOIL is a separate ledger from statutory leave** | TOIL never substitutes for the 5.6-week statutory annual leave (§10) — the two must be tracked in **separate ledgers**. | — | — | contract; [WTR reg. 13](https://www.legislation.gov.uk/uksi/1998/1833/regulation/13) (context) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Restricted on-call = working time** | On-call time where the worker **must remain at or near the workplace** and respond immediately, unable to use the time freely, counts **in full** toward the 48h average, night limits, and rest calculations. | A doctor required to stay in an on-site on-call room counts the whole on-call period as working time. | — | [WTR reg. 2](https://www.legislation.gov.uk/uksi/1998/1833/regulation/2); CJEU *Matzak*-line case law 🔎 |
| **Unrestricted standby ≠ working time (except call-outs)** | Standby where the worker is **free to use the time as they please**, merely contactable, does **not** count as working time — only the minutes of an **actual call-out** count. | An on-call IT engineer reachable overnight, free to sleep/leave the house, counts only the 40 minutes of an actual incident response. | Any standby allowance for being reachable is purely contractual (a roster-driven count, not punch-derived). | [WTR reg. 2](https://www.legislation.gov.uk/uksi/1998/1833/regulation/2) |
| **Call-out may interrupt daily rest** | A call-out that breaks the 11h daily rest (§4) triggers a **compensatory-rest** entitlement. | A worker called out at 02:00 during an on-call night, breaking their rest period, is owed equivalent rest afterward. | — | [WTR reg. 24](https://www.legislation.gov.uk/uksi/1998/1833/regulation/24) |
| **Sleep-in pay is a money question, not a T&A one** | Whether "sleep-in" hours attract minimum wage is a **pay** matter (case law: *Mencap v Tomlinson-Blake*), separate from whether the hours are **working time** under reg. 2 (the only T&A question). | — | — | [National Minimum Wage Regulations 2015](https://www.legislation.gov.uk/uksi/2015/621/contents); *Mencap v Tomlinson-Blake* [2021] UKSC 8 🔎 |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/predictability pay today** | The UK currently has **no** statutory show-up / reporting-time / predictability-pay regime (unlike US CA/NYC). | — | **⚠ Changing** — see the ERA 2025 shift-notice + cancellation-pay reform below (from Oct 2026). | (none statutory, current law) |
| **⚠ Pending — reasonable shift notice + cancellation pay (Oct 2026)** | From **October 2026**: employers must give **"reasonable notice"** of a shift (expected **≥72h**) and **pay workers** if a shift is cancelled, moved to another date, or cut short at short notice. Exact notice length and pay formula are set by **secondary legislation, still pending**. | A shift published 48h in advance (short of the expected 72h notice) and then cancelled the day before would, once in force, trigger cancellation pay under the pending formula. | — | [Employment Rights Act 2025](https://www.legislation.gov.uk/ukpga/2025/36/contents) |
| **Flexible-working request — day-one right** | Any employee may make a statutory flexible-working request **from day one**, up to **2 requests per rolling 12 months**. Employer must **consult** before refusing and **decide within 2 months**; refusal limited to **8 listed business reasons**. | An employee requests a compressed 4-day week in their first week; the employer must consult and respond within 2 months, citing one of the 8 statutory grounds if refusing. | Tribunal award for procedural breach: up to **8 weeks' pay** (capped at the statutory week's-pay cap, **£751** from 6 April 2026 → max **£6,008**). | [ERA 1996 Part 8A](https://www.legislation.gov.uk/ukpga/1996/18/part/8A) (as amended 2024) |
| **Redundancy notice — paid time off to look for work** | A worker with **≥2 years'** continuous service under redundancy notice is entitled to **reasonable paid time off** to look for new work or arrange training, capped at **40% of a week's pay** (≈**2 days** for a 5-day-week worker). | A 5-day-week worker under redundancy notice may take up to 2 paid days to attend interviews or a job centre. | — | [ERA 1996 ss. 52–53](https://www.legislation.gov.uk/ukpga/1996/18/section/52) |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory annual leave — 5.6 weeks** | **5.6 weeks** paid leave per leave year, a **day-one right**, capped at **28 days** for a 5-day-week worker. Part-time = **5.6 × days-worked-per-week** (e.g. a 3-day-week worker → 16.8 days). | A 5-day worker gets 28 days (the cap); a 3-day worker gets 16.8 days. | Bank holidays may be folded in or granted on top (§6). | [WTR regs. 13](https://www.legislation.gov.uk/uksi/1998/1833/regulation/13), [13A](https://www.legislation.gov.uk/uksi/1998/1833/regulation/13A) |
| **First-year leave accrual — 1/12 per month** | In the first year, leave accrues at **1/12 of the annual entitlement per completed month**, rounded up to the nearest half-day. | A worker starting 1 October with a 28-day annual entitlement has accrued ~2.33 days/month → ~7 days by year-end. | Distinct from the irregular-hours method below. | [WTR reg. 15A](https://www.legislation.gov.uk/uksi/1998/1833/regulation/15A) |
| **Irregular-hours & part-year accrual — 12.07%** | For irregular-hours/part-year workers (leave years starting on/after **1 April 2024**): leave accrues at **12.07% of hours worked** in each pay period (**12.07% = 5.6 ÷ 46.4**). | A casual worker logging 100h in a pay period accrues 12.07h of paid leave for that period. | **Rolled-up holiday pay** is permitted **only** for this irregular-hours/part-year population (from 1 April 2024). | [WTR reg. 15B](https://www.legislation.gov.uk/uksi/1998/1833/regulation/15B) (2024 amendment) |
| **Leave carry-over** | Statutory 4 weeks (WTD-derived) has restricted carry-over (only if unable to take it, e.g. sick leave/family leave); the additional 1.6 weeks (UK-only) carries per a different, more permissive rule set by agreement. | A worker off sick for the whole leave year may carry the 4-week WTD leave into the next year. | — | [WTR reg. 13(9)–(15)](https://www.legislation.gov.uk/uksi/1998/1833/regulation/13) |
| **Compulsory maternity leave** | A worker must **not work for 2 weeks** after birth (**4 weeks** if a factory worker) — a health-and-safety absolute; the employer commits a **criminal offence** allowing work during it. | A retail worker cannot be rostered any shift in the fortnight immediately after giving birth. | Factory workers get double the length (4 weeks). | [Maternity (Compulsory Leave) Regulations 1994](https://www.legislation.gov.uk/uksi/1994/2479/contents) |
| **Statutory maternity leave — 52 weeks** | Up to **52 weeks** (26 Ordinary + 26 Additional), a day-one right regardless of service length. **Statutory Maternity Pay (SMP):** **39 weeks** — first **6 weeks at 90%** of average weekly earnings, then **33 weeks** at the lower of **£194.32/week** (from 6 April 2026) or 90% of earnings. Remaining 13 weeks unpaid. Requires **26 weeks'** service by the qualifying week (15th week before EWC) for the **pay**, not the leave. | A worker earning £500/week: weeks 1–6 → £450/week (90%); weeks 7–39 → £194.32/week; weeks 40–52 unpaid. | — | [ERA 1996](https://www.legislation.gov.uk/ukpga/1996/18/contents) (leave); [Social Security Contributions and Benefits Act 1992](https://www.legislation.gov.uk/ukpga/1992/4/contents) (SMP) |
| **Keeping-in-touch (KIT) days** | Up to **10 KIT days** may be worked during maternity/adoption leave **without ending** the leave or pay. | A worker on maternity leave attends 3 team meetings as KIT days without affecting her leave status. | Additional to the 20 SPLIT days available if the leave converts to Shared Parental Leave. | [Maternity and Parental Leave etc. Regulations 1999 reg. 12A](https://www.legislation.gov.uk/uksi/1999/3312/regulation/12A) 🔎 |
| **Statutory paternity leave — 1 or 2 weeks (day-one right)** | **1 or 2 weeks**, taken as one block or two separate 1-week blocks, **any time within 52 weeks** of birth/placement. **Day-one right to the leave** from 6 April 2026 (no service requirement for the leave itself). **Statutory Paternity Pay (SPP):** **£194.32/week** or 90% of average earnings (whichever lower) — still requires **26 weeks'** service for the pay. | A new father takes 1 week immediately after birth and a second week 6 months later. | — | [Paternity and Adoption Leave Regulations 2002](https://www.legislation.gov.uk/uksi/2002/2788/contents) (as amended 2026) |
| **Shared Parental Leave (SPL) — up to 50 weeks / 37 paid** | Parents may flexibly share up to **50 weeks' leave** and **37 weeks' pay** after the compulsory maternity leave period (2/4 weeks). **Statutory Shared Parental Pay (ShPP):** £194.32/week or 90% of earnings, whichever lower. Both parents can each take up to **20 SPLIT days** [Shared-Parental-Leave-In-Touch days] without ending SPL. | A mother takes 6 months' maternity leave then converts the remainder to SPL, shared with her partner. | Leave and pay figures can be split between both eligible parents in any combination. | [Shared Parental Leave Regulations 2014](https://www.legislation.gov.uk/uksi/2014/3050/contents) |
| **Statutory adoption leave — 52 weeks** | Up to **52 weeks** (mirrors maternity structure: 26 Ordinary + 26 Additional), day-one right. **Statutory Adoption Pay (SAP):** 39 weeks paid — **6 weeks at 90%**, then **33 weeks at £194.32/week** (or 90% if lower). Requires **26 weeks'** service by the matching week for the pay. | An adoptive parent matched with a child follows the same 52-week / 39-paid-week structure as maternity leave. | Surrogacy (parental order) parents get an equivalent adoption-leave-style entitlement. | [Paternity and Adoption Leave Regulations 2002](https://www.legislation.gov.uk/uksi/2002/2788/contents) |
| **Unpaid parental leave — 18 weeks per parent per child** | Each parent with parental responsibility for a child **<18** may take up to **18 weeks unpaid leave per child** (a separate 18-week pot per parent — 36 weeks between two parents), generally taken in **blocks of 1 week** (or multiples), **capped at 4 weeks/child/leave-year** under the statutory fall-back scheme. **Day-one right from 6 April 2026.** | A parent takes 4 weeks this year and can take up to 14 more weeks (per that child) in future years, up to the child's 18th birthday. | The 18-week pot is **portable between employers** for the same child. | [ERA 1996 s.76](https://www.legislation.gov.uk/ukpga/1996/18/section/76); [Maternity and Parental Leave etc. Regulations 1999 reg. 13](https://www.legislation.gov.uk/uksi/1999/3312/regulation/13) (as amended 2026) |
| **Parental bereavement leave — 2 weeks ("Jack's Law")** | **2 weeks' leave**, day-one right, following the **death of a child <18** or a **stillbirth after 24 weeks** (from 6 April 2026, also miscarriage before 24 weeks). Taken as one block, two separate weeks, or a single week, within **56 weeks** of the death/stillbirth. **Statutory Parental Bereavement Pay:** £194.32/week (from 6 April 2026) or 90% of earnings, whichever lower, for those with **26 weeks'** service. | A parent takes 1 week immediately and a second week months later, both within the 56-week window. | The scope widened to cover pre-24-week miscarriage from 6 April 2026. | [Parental Bereavement (Leave and Pay) Act 2018](https://www.legislation.gov.uk/ukpga/2018/24/contents) |
| **Time off for dependants — reasonable unpaid emergency leave** | **Reasonable** (unquantified) unpaid time off to deal with an **unexpected emergency** involving a dependant (spouse, child, parent, household member, or anyone reasonably relying on the worker) — e.g. collecting a sick child, arranging emergency care. Aimed at handling the immediate emergency, **not extended care**. | A parent leaves work to collect a child sent home sick from school; the time off is unpaid unless the contract says otherwise. | Contract/policy may make it paid; statute guarantees only unpaid time. | [ERA 1996 ss. 57A–57B](https://www.legislation.gov.uk/ukpga/1996/18/section/57A) |
| **Carer's leave — 1 week unpaid per year** | Up to **1 week (the worker's normal week's length, e.g. 5 days for a 5-day worker) unpaid leave per rolling 12 months** to care for a dependant with a **long-term care need** (illness/injury needing care >3 months, an Equality Act disability, or old-age-related care needs). Day-one right; may be taken as a full week, half-days, or individual days. | A 5-day-week worker takes 3 separate days over the year to help an elderly parent, using 3 of their 5-day annual allowance. | Employer may postpone (not refuse) if the business reasonably needs to, but must allow it within a month and consult first. | [Carer's Leave Act 2023](https://www.legislation.gov.uk/ukpga/2023/18/contents); Carer's Leave Regulations 2024 🔎 |
| **Statutory Sick Pay (SSP) — from the first qualifying day, 2026 reform** | **£123.25/week** (2026/27) or **80% of average weekly earnings**, whichever is **lower**. Paid **from the first qualifying day** — the historical 3 unpaid waiting days were **abolished from 6 April 2026**; the **Lower Earnings Limit eligibility floor was also removed** the same date, making all PAYE employees eligible regardless of weekly earnings. Up to **28 weeks** per period of incapacity. | A 5-day-week worker off sick gets £24.65/qualifying day (£123.25 ÷ 5) from day one of the absence, not day 4. | — | [Statutory Sick Pay (General) Regulations 1982](https://www.legislation.gov.uk/uksi/1982/894/contents) (as amended 2026) |
| **Redundancy notice — time off to look for work** | See §9 — a leave/absence right during redundancy notice, capped at 40% of a week's pay (≈2 days for a 5-day worker), for workers with **≥2 years'** service. | — | — | [ERA 1996 ss. 52–53](https://www.legislation.gov.uk/ukpga/1996/18/section/52) |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Adequate records duty** | Employers must keep **"adequate records"** demonstrating compliance with the **48h average** and **night-worker limits** — the WTR are not prescriptive about the exact form, but daily granularity is best practice and is what the leave/limit counters in this reference actually need. | An employer keeps a running log of weekly hours and night-shift assignments per worker, sufficient to demonstrate 48h/8h-night compliance on request. | Record-keeping obligations for annual leave/holiday pay are tightening under recent case law and guidance. | [WTR reg. 9](https://www.legislation.gov.uk/uksi/1998/1833/regulation/9) |
| **Night-worker record retention — 2 years** | Records evidencing night-work-limit compliance must be **retained for 2 years**. | A worker's night-shift log from March 2026 must still be retrievable in an inspection through March 2028, then may be purged. | 🔎 verify current enforcement practice. | [WTR reg. 9](https://www.legislation.gov.uk/uksi/1998/1833/regulation/9) |
| **No statutory tolerance or rounding rule** | UK law sets **no** grace window or time-rounding standard — any tolerance/rounding is **pure policy/contract configuration**, bounded only by the **NMW floor** (rounding must not systematically strip recorded paid time). | An employer configures a 5-minute rounding rule; if it systematically shaves paid time below NMW, it is unlawful regardless of the "rounding" label. | — | [National Minimum Wage Regulations 2015](https://www.legislation.gov.uk/uksi/2015/621/contents) (context); no dedicated WTR rule |

## Sources (requirements section)

- **Legislation register:** [legislation.gov.uk](https://www.legislation.gov.uk/) — the UK's official
  register; every per-regulation/-section link above was fetched and confirmed live 2026-07-21.
- **Repo seeds:** `context/worldwide-calculations/uk_time_attendance_reference.md` (2026-07-17,
  richest prior seed — WTR mechanics, TOIL, night work, leave, on-call, pipeline); prior
  `support-memos/uk.md` (now the parked appendix below).
- **Working Time Regulations 1998 / 48h / night / rest / breaks:** [legislation.gov.uk WTR 1998 (SI
  1998/1833)](https://www.legislation.gov.uk/uksi/1998/1833/contents); lewissilkin.com "The Working
  Time Regulations 1998" (2026-04-07); HSE FAQ on rest breaks; CIPD HR-inform "Working time and time
  away from work."
- **Statutory Sick Pay (2026 reform):** davidsonmorris.com SSP 2026; moneysoft.co.uk SSP from 6
  April 2026; payfit.com SSP changes 2026/27.
- **Maternity / paternity / adoption / shared parental / bereavement pay rates (£194.32, April
  2026):** grove.hr Maternity Leave & Pay UK 2026; teamed.global UK Statutory Maternity Paternity
  Pay Rates 2026-27; nidirect.gov.uk Parental Bereavement Leave and Pay; workingfamilies.org.uk
  Parental Bereavement Leave (Jack's Law); payslipiq.co.uk Statutory Adoption Pay 2026/27.
- **Unpaid parental leave (18 weeks, day-one 2026):** book-time-off.com Unpaid Parental Leave UK
  Guide; lexisnexis.com Parental Leave guidance.
- **Carer's Leave Act 2023** (in force 6 April 2024, corrected from the prior draft's "2024" Act
  citation): harperjames.co.uk; cipp.org.uk; littler.com.
- **Time off for dependants:** davidsonmorris.com; gov.uk Time off for dependants.
- **Keeping-in-touch / SPLIT days:** maternityaction.org.uk; peninsuladeanery.nhs.uk.
- **Flexible working (day-one, 2024 reforms):** dphlegal.com; davidsonmorris.com Flexible Working
  Request guide; acas.org.uk Code of Practice on flexible working requests.
- **Redundancy — time off to look for work:** reculversolicitors.co.uk; lincslaw.co.uk.
- **Part-time Workers Regulations 2000:** [legislation.gov.uk SI 2000/1551](https://www.legislation.gov.uk/uksi/2000/1551/contents); davidsonmorris.com.
- **Agency Workers Regulations 2010:** acas.org.uk; gov.uk AWR 2010 guidance; rec.uk.com.
- **Apprenticeship 20% off-the-job training:** gov.uk apprenticeships off-the-job training guide;
  cmsvoc.co.uk.
- **Employment Rights Act 2025 implementation timeline:** [legislation.gov.uk ERA 2025 (2025 c.
  36)](https://www.legislation.gov.uk/ukpga/2025/36/contents); vinciworks.com (updated July 2026);
  hilldickinson.com ERA 2025 tracker; dlapiper.com revised timeline; acas.org.uk ERA 2025.
- **Compulsory maternity leave:** [legislation.gov.uk Maternity (Compulsory Leave) Regulations 1994](https://www.legislation.gov.uk/uksi/1994/2479/contents).
- **Sleep-in / on-call NMW distinction:** UKSC *Mencap v Tomlinson-Blake* [2021] via national reporting.

---

## Appendix (parked) — day.io capability & compliance-support analysis

Parked 2026-07-21. Former verdict-first memo content, kept intact.

# United Kingdom — T&A compliance support

**Verdict: 🟠 Partial — tied with Germany/Netherlands as our *best* fit.** Like Germany, **UK statute
mandates no overtime, night, weekend, or bank-holiday premium** — every premium is contractual, which maps
cleanly onto our policy-defined, surplus-above-planned model. The gaps are the same shape as Germany's:
UK compliance is a **health-and-safety limit-*validation* + leave-accrual** regime (48h rolling average,
night limits, rest periods, 5.6-week leave), and our engine **computes premiums, it does not flag
statutory-limit breaches or accrue statutory leave**. Read with the scope, verdict key, and **Basis key**
in [`README.md`](./README.md). No verdict is DB-confirmed this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). UK statute prices no
> OT, so this only adds a weekly onset option for **contractual** OT; it doesn't change the verdict — UK's
> gaps are the 48h rolling average, night/rest limits, and statutory-leave accrual, not an OT trigger.

**Legal source:** `worldwide-calculations/uk_time_attendance_reference.md` (2026-07-17). **Capability
sources:** `pay-policy-configuration.md` (+ §15 API map), `data-model/fields.md`.

## Governing sources — who actually sets the rules

The compliance answer is conditional — but the UK is **statute-dominant**, unlike France/Italy/Spain. The
operative *limit* numbers live **inside** the national statute: the **Working Time Regulations 1998** (48h,
night 8h, rest, breaks, 5.6-week leave, 12.07% accrual) are the operative statutory instrument. Every
operative *premium* number, by contrast, lives **below** the statute — in the **individual contract**
(statute sets no fallback premium) — with a thin national collective/sector layer (NHS Agenda for Change,
NJC "Green Book", rail/fire) decisive only where incorporated. So "do we support the UK?" really means "is
the number in play a statutory WTR limit or a contractual premium — and, in NHS/local-gov/rail, is a sector
framework incorporated?"

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| EU-derived origin | Working Time Directive (retained/assimilated post-Brexit) | Origin only — the source the WTR transposes |
| Primary statute | Employment Rights Act 1996 (Sunday opt-out) + ERA 2025 (forthcoming, guaranteed hours) | Rights / day-events, **not** premium rates |
| Secondary legislation (operative) | Working Time Regulations 1998 (SI 1998/1833) | **Yes — the operative statutory instrument:** 48h, night 8h, rest, breaks, 5.6-wk leave, 12.07% accrual |
| Guidance | gov.uk · ACAS · HSE | No — persuasive, not binding |
| Collective / sector frameworks | NHS Agenda for Change · NJC "Green Book" (local gov) · rail/fire | Thin nationally; **decisive where incorporated** |
| Individual contract | The employment contract | **Yes — where every operative *premium* number lives** (statute sets no fallback premium) |

**Illustrative secondary-source rules**

*⚠ ILLUSTRATIVE — varies by agreement/region/year; not universal; NOT a statement of our support.*

- Unsocial-hours enhancement: weekday nights (20:00–06:00) + all Saturday +30% (Bands 4–9, up to +47% Band 1); Sunday + public holidays +60% (up to +94%) — *NHS Agenda for Change §2* — ✅
- Night-worker enhancement window = 20:00–06:00 (differs from statutory 23:00–06:00) — *NHS Agenda for Change* — ✅
- 37h standard week; OT / weekend / night enhancements set locally (Part 3) — *local-gov NJC "Green Book"* — 37h ✅ / multipliers 🔎
- OT time-and-a-half after 40h; double time Sunday/bank-holiday; TOIL 1:1 (sometimes 1.5:1) — *common private-sector norms* — 🔎 illustrative

## Rule-by-rule

| # | UK requires (time/day-event only) | Our current capability | Verdict | Evidence / note |
|---|---|---|---|---|
| 1 | **No statutory OT premium — the contract decides everything.** UK law grants no extra pay for extra hours worked; whether overtime exists at all, when it starts, and at what multiplier are set entirely by the employment contract, defaulting to plain time (no premium) unless the contract says otherwise | OT onset = surplus over planned; `phases[]` rates fully configurable; default no premium band | ✅ / 🟡 | `[API]` `[UI]` **Good fit** (as Germany): engine has no statutory OT default anyway. Contract sets daily/weekly threshold + band |
| 2 | **Over-contract hours, triggered daily · weekly · or hybrid.** Hours beyond the contracted amount are recorded as neutral "over-contract" facts; the contract decides whether that threshold is measured per day, per week, or a mix of both — statute fixes no value to fall back on | Per-day surplus over planned; `phases[].limit` chains rates by **daily** OT minutes | 🟠 Partial | `[API]` Daily-trigger contracts fit; a **weekly** over-contract threshold has no weekly-accumulation field `[ABS]` |
| 3 | **48h average week — a rolling-window limit, not an OT trigger.** The Working Time Regulations cap average weekly working time at 48h, measured as a running average over a rolling 17-week window (extendable to 52 weeks by agreement, 26 for junior doctors) rather than week-by-week; a breach should raise a compliance flag and never affects pay | No working-time-limit validation; no rolling-average counter | ❌ Gap | `[ABS]` We compute pay, not WTR limit enforcement; rolling reference-period averaging is design-only `[DES]` |
| 4 | **48h opt-out — an individual written waiver.** A worker aged 18+ may voluntarily sign away the 48h average limit for themselves (never workforce-wide), which suppresses that limit flag; it does not waive rest breaks or the night-hours limit | — (no limit flag to suppress) | ❌ Gap / 🔎 | `[ABS]` Moot until #3 exists; would be a per-worker flag |
| 5 | **Night-worker 8h limit — averaged, or absolute for hazardous work.** A classified night worker's normal hours must average ≤8h per 24-hour period over a rolling 17-week window (a limit that, unlike the 48h, cannot be opted out of); where the night work carries special hazards or heavy strain, the 8h becomes a hard cap in any single 24-hour period with no averaging | `nightShift` emits night hours; no night-limit counter | 🟠 Partial | Night-hour **emission** ✅ `[API]`; the **8h-average / absolute-cap validation = Gap** `[ABS]` |
| 6 | **Night window — default 23:00–06:00.** The band of hours that counts as "night" defaults to 23:00–06:00; a contract or collective agreement may set a different window provided it spans at least 7 hours and covers 00:00–05:00 | `nightShift {%, start, end, applyEntirePeriod}` configurable window | ✅ / 🟡 | `[API]` `[UI]` Window is a config value; **no statutory night premium** so the % defaults off |
| 7 | **Daily rest — 11 hours between shifts.** Every worker is entitled to 11 consecutive hours of rest in each 24-hour period; too short a gap between the end of one shift and the start of the next should raise a compliance flag | `crossShiftsInterval {interval=660min=11h, phases[]}` | 🟠 Partial / 🔎 | 11h threshold field exists `[API]`; whether it *validates* rest or only reshapes/classifies = 🔎 |
| 8 | **Weekly rest — 24h every 7 days, or 48h every 14.** A worker must get at least one uninterrupted 24-hour rest per week (or 48 hours per fortnight, employer's choice); where a shift pattern legitimately prevents it they are owed equivalent compensatory rest, and a shortfall should raise a flag | — (single daily interval only) | ❌ Gap | `[ABS]` No weekly-rest accumulation window; compensatory-rest tracking absent |
| 9 | **20-minute break once the day exceeds 6h.** A worker whose daily working time runs over 6 hours is entitled to one uninterrupted 20-minute rest break away from the workstation; it need not be paid unless the contract provides for it | Break config on schedule (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | Breaks configurable `[DES]`; whether a missing/short break is *validated/flagged* = unconfirmed |
| 10 | **TOIL (Time Off In Lieu) — the UK "hours bank."** A purely contractual scheme where overtime is banked as future paid time off instead of cash, usually hour-for-hour (1:1) but sometimes enhanced (1.5 hours off per overtime hour), subject to contractual caps and expiry | Banked hours (comp-time-in-lieu) via `hoursBank*` + `phases[].extraHours` EH↔BH split | 🟠 Partial / 🔎 | Bank ✅ `[API]` (cycle, caps, expiry, HIFO); **non-unit 1.5:1 accrual ratio unconfirmed** — verify |
| 11 | **5.6 weeks' paid annual leave — a day-one right.** Every worker earns 5.6 weeks of paid annual leave per year (capped at 28 days for a five-day-a-week worker, pro-rated for part-timers); the entitlement must be accrued, drawn down as leave is taken, and carried over per policy | — | ❌ Gap | `[ABS]` Cross-run leave-accrual counter absent from the API payload + field ref |
| 12 | **Irregular-hours holiday accrual at 12.07%.** For irregular-hours and part-year workers, the 5.6-week entitlement is earned in proportion to hours actually worked: 12.07% (that is 5.6 ÷ 46.4) of each pay period's worked hours is credited as accrued leave | — | ❌ Gap | `[ABS]` Attendance-driven leave accrual; no such counter. 12.07% became **statutory** for leave years from 1 Apr 2024 (sharpened per `uk_time_attendance_reference.md`) |
| 13 | **Bank holidays vary by UK nation.** The public-holiday calendar differs across the UK — 8 days in England & Wales, 9 in Scotland, 10 in Northern Ireland — so it must be resolved from the worker's actual work location, not the company's head office | Holiday calendar (`SourceHoliday`), jurisdiction-keyed + Holiday bit in `daysMask` | ✅ | `[FLD]` `[API]` Per-nation = jurisdiction-keyed reference data |
| 14 | **No statutory bank-holiday pay — contractual, and may fold into leave.** There is no legal right to time off or extra pay on a bank holiday; any premium for working one is set by the contract, and an employer may either count the bank holidays within the 5.6-week leave allowance or grant them on top | Sunday & Holidays rate rows; holiday calendar | ✅ / 🟡 | Premium **emission** 🟡 `[API]`; "folded-into-leave" disposition is a leave-ledger concern (#11) |
| 15 | **On-call — restricted counts, unrestricted doesn't.** Whether on-call time is working time turns on how free the worker is: restricted on-call (must stay at or near work, respond at once, can't use the time freely) counts in full, while unrestricted standby (free to do as they please, merely contactable) does not — only actual call-outs count | `onCalls {compensation}` (availability + activation) | 🟠 Partial | `[UI]` `[API]` confirmed; the disposal-test *classification* is an input, not derived |
| 16 | **Time recording — keep "adequate records."** Employers must retain records adequate to show they comply with the 48h and night-hours limits (WTR reg. 9), reinforced by the EU *CCOO* ruling that working hours be objectively and reliably recorded | Engine records every punch; approved-event locking | ✅ | `[FLD]` Genuine compliance value-add |
| 17 | **No statutory tolerance or rounding rule.** UK law sets no grace window or time-rounding standard, so any tolerance or rounding is pure policy configuration — bounded only by the minimum-wage floor, since rounding must not systematically strip recorded worked time | `tolerance {type, limit, scope, active, includeBreaks}` | ✅ / 🟡 | `[API]` Configurable; default should be no rounding for precise capture |
| 18 | **Young workers (under 18) — a stricter, non-waivable regime.** Under-18s are capped at 8 hours a day and 40 a week, generally barred from night work, and owed 12 hours' daily rest plus a 30-minute break once they work more than 4.5 hours | — | ❌ Gap | `[ABS]` No minor rule-profile / gating |
| 19 | **Missing time and missing-day handling.** Standard attendance-shortfall semantics: a day worked below the schedule (with at least one punch) records missing hours, and a scheduled day with no punches at all records a missing day | Missing-day handling + `hoursBankIgnoreMissingDays` | ✅ | `[API]` Standard engine semantics |
| 20 | ⚠ **Employment Rights Act 2025 — guaranteed hours + shift notice (forthcoming).** A staged 2026–2027 reform (detail still in secondary legislation) that will require employers to offer zero- and low-hours workers a guaranteed-hours contract reflecting a rolling ~12-week average of the hours they actually worked, plus reasonable notice of shifts and pay for shifts cancelled or cut at short notice | n/a (forthcoming) | — | `[LAW]` **Not fully in force** (staged 2026–2027); do not model as settled. A ~12-wk rolling worked-hours aggregate would be net-new |
| 21 | **Sunday-working opt-out (shop & betting workers).** A shop or betting worker may give written notice opting out of Sunday work; after a 3-month notice period the contract can no longer require them to work Sundays — a day-event scheduling right, not a premium | — (no per-worker Sunday-opt-out scheduling gate) | ❌ Gap | `[ABS]` Per-worker Sunday-working opt-out is a scheduling-rights gate we don't model (cf. #4 opt-out shape); ERA 1996 Part IV; ✅ |
| 22 | **Young workers (under 18) — 48h weekly rest.** An under-18 is owed 48 hours (two days) of rest each week, versus the 24h adult minimum — an additional, stronger quantum of the minors regime (extends #18) | — | ❌ Gap | `[ABS]` No minor rule-profile / gating (as #18); WTR reg 11(3); ✅ |
| 23 | **Night-worker record retention — 2 years.** The records kept to show compliance with the night-work limits must be retained for two years — a retention duration on top of the "adequate records" duty (sharpens #16) | Engine records every punch; approved-event locking (retention duration is a data-retention policy) | ✅ / 🔎 | `[FLD]` Recording + event-locking present (as #16); the explicit **2-year** night-worker retention window is a data-retention policy — 🔎 verify enforced; WTR reg 9; ✅ |
| 24 | **First-year holiday accrual — 1/12 per month.** In their first year of employment, a regular-hours worker accrues the 5.6-week entitlement at 1/12 of the annual amount at the start of each month (distinct from the 12.07% irregular-hours method in #12) | — | ❌ Gap / 🔎 | `[ABS]` First-year monthly leave-accrual (1/12) counter absent; rides on the same missing accrual counter as #11/#12; WTR reg 15A; 🔎 verify |
| 25 | **48h reference-period — 26-week extension for special-case workers.** The 17-week averaging window for the 48h limit extends to 26 weeks for WTR reg 21 special-case workers (security/surveillance, continuity-of-service, and the like) — broader than just junior doctors | No working-time-limit validation; no rolling-average counter | ❌ Gap | `[ABS]` Moot until the 48h rolling-average counter exists (#3); the 26-week window is a reference-period parameter covering reg 21 special-case workers, broader than junior doctors; ✅ |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — including the now-✅ weekly-OT row (#2, the weekly
> over-contract trigger, delivered `[PO]` 2026-07-18) and the not-yet-in-force ERA-2025 item (#20, verdict —).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped) · 🟡 Medium (moderately common, or a usable mitigation, or moderate build) ·
> 🟢 Low (narrow population, strong mitigation, or trivial build).
>
> **UK-specific framing:** UK statute prices **no** OT/night/weekend/bank-holiday premium, so — unlike France's
> annual-counter / regime machinery — **no UK gap corrupts pay.** Every gap below is **limit-*validation*** (flag
> a breach) or **statutory-leave accrual**; pay stays correct throughout. That caps the whole table at 🟡 Medium —
> **no Critical, no High.**
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general UK market* a rule bites. **⚠ Customer-relative** — shifts with the
>   customer's workforce: **retail/hospitality/fast-food → #18 young-worker profile** bites hard; **gig/casual →
>   #12 12.07% accrual**; **healthcare/transport (26-wk junior-doctor / bespoke reference periods) → #3 48h +
>   #5 night limits.**
> - **Build-effort** = my estimate, **grounded in the memo's Basis key** (`[API]`/`[FLD]` ≈ existing/config → S;
>   `[DES]` draft ≈ **M**; `[ABS]` net-new counter/regime ≈ **M–L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (UK market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#3 48h rolling-17-week average** | **Partial** — manual monitoring off the recorded hours; **pay stays correct** (nothing is priced on it). No rolling-reference-period counter to flag the breach | **High** as a universal WTR obligation (all workers), but **non-corrupting**; healthcare/transport (26-wk / bespoke periods) lean hardest | **M** — rolling multi-week reference-period average (`[DES]`); the **same primitive #5's night cap needs** (shared) | 🟡 **Medium** |
| **#11 5.6-week annual leave accrual** | **Partial** — leave *taken* is handled as absences/requests; the 5.6-week (28-day cap) accrual + carry-over ledger needs a leave module or manual tracking | **High** (all workers), but **adjacent to core T&A** (leave management) | **M** — cross-run leave-accrual counter (`[ABS]`; shares the counter shape with #12) | 🟡 **Medium** |
| **#8 Weekly rest 24h/48h + compensatory** | **Weak** — no weekly-rest accumulation window and no compensatory-rest tracking; manual monitoring only. **Pay stays correct** | **High** as a WTR obligation (all workers), **non-corrupting** | **M** — weekly-rest accumulation window + compensatory-rest ledger (`[ABS]`) | 🟡 **Medium** |
| **#9 20-min break >6h (validation)** | **Config** — breaks are configurable on the schedule (mode, paid/unpaid, startAfter); the missing/short-break **validation/flag** is the open piece | **High** (all workers), **non-corrupting** | **S-M** — break-minimum validation on the existing break config (`[DES]`) | 🟡 **Medium** |
| **#5 Night 8h average / absolute cap** | **Partial** — night hours are **emitted** (`nightShift` `[API]`); no night-limit counter, so the 8h-average / special-hazard 8h-absolute breach isn't flagged. Manual monitoring | **Med** — night workers only (a scoped subset); **non-corrupting** | **M** — night-worker status + rolling-17-week cap (shares #3's averaging) + a single-period absolute flag (`[ABS]`) | 🟡 **Medium** |
| **#12 Irregular-hours 12.07% accrual** | **Weak** — no attendance-driven accrual counter (worked_hours × 12.07%); manual tracking | **Med** — irregular-hours / casual / part-time (⚠ **flips up for gig/retail/hospitality**-heavy customers); non-corrupting, adjacent to leave mgmt | **M** — attendance-driven leave-accrual counter (`[ABS]`; same shape as #11) | 🟡 **Medium** |
| **#7 Daily rest 11h → flag** | **Partial** — the `crossShiftsInterval` 11h inter-shift field **exists** (`[API]`); whether it *validates* the rest or only classifies/reshapes is unconfirmed (🔎) | **High** (all workers), **non-corrupting** | **S-M** — verify/extend the existing 11h field to flag | 🟢 **Low** (field already exists) |
| **#10 TOIL non-unit ratio** | **Strong** — the hours bank (`hoursBank*` + `phases[].extraHours` EH↔BH) already gives TOIL with cycle, caps, expiry, HIFO; only the **non-unit 1.5:1 accrual ratio** needs confirming (🔎) | **Med** — contractual TOIL (common in some sectors) | **S** — verify/param the accrual ratio | 🟢 **Low** |
| **#15 On-call restricted vs unrestricted** | **Strong** — `onCalls {compensation}` handles availability + activation `[API]`; classify restricted-vs-unrestricted as a **manual input** per arrangement (the disposal test isn't auto-derived) | **Med** — on-call populations (healthcare, facilities) | **S** — a classification input/flag | 🟢 **Low** |
| **#4 48h opt-out** | **N/A** — **moot until #3 exists** (no 48h flag to suppress yet); when #3 lands, a per-worker written-opt-out flag suppresses it | **Med** — opt-out common in some sectors, but non-corrupting and dependent on #3 | **S** — a per-worker flag | 🟢 **Low** |
| **#18 Young-worker (<18) rule-profile** | **Partial** — set tighter schedule/policy limits (8h/day, no-night, 12h rest) per under-18 worker manually; **no automatic minor rule-profile or gating** | **Low** — under-18s are a narrow population (⚠ **flips up for retail/hospitality/fast-food**-heavy customers) | **M** — a minor rule-profile + regime gating (`[ABS]`) | 🟢 **Low** (narrow population) |
| **#21 Sunday-working opt-out (shop/betting)** | **Partial** — manually avoid scheduling opted-out workers on Sundays; **no per-worker opt-out scheduling gate**. Pay stays correct | **Low–Med** — shop & betting workers who opt out (⚠ **flips up for retail**-heavy customers); non-corrupting | **S** — a per-worker Sunday-opt-out scheduling flag (`[ABS]`; same shape as #4) | 🟢 **Low** |
| **#22 Young-worker 48h weekly rest** | **Partial** — set a 48h weekly-rest pattern per under-18 manually; **no automatic minor rule-profile** (shares #18) | **Low** — under-18s only (⚠ **flips up for retail/hospitality/fast-food**-heavy customers) | **M** — minor rule-profile + regime gating (`[ABS]`; shared with #18) | 🟢 **Low** (narrow population) |
| **#23 Night-worker 2-year record retention** | **Strong** — recording + event-locking already present (as #16); only the explicit **2-year** retention window needs confirming (🔎) | **High** as a WTR obligation (all night workers), **non-corrupting** | **S** — verify/param the retention window on the existing records | 🟢 **Low** (recording already exists) |
| **#24 First-year 1/12 holiday accrual** | **Weak** — no monthly leave-accrual counter; manual tracking. Rides on #11's missing accrual counter once built | **Low–Med** — first-year regular-hours workers only (a transient subset); non-corrupting, adjacent to leave mgmt | **M** — monthly leave-accrual counter (`[ABS]`; same shape as #11/#12), first-year phasing a parameter on it | 🟢 **Low** (first-year phasing on #11; 🔎) |
| **#25 48h reference-period 26-week extension** | **N/A** — **moot until #3 exists** (no 48h rolling-average counter yet); when #3 lands, the 26-week window is a reference-period parameter | **Low–Med** — WTR reg 21 special-case workers (security/continuity), a scoped subset; non-corrupting | **S** — a reference-period-length parameter on #3's counter | 🟢 **Low** (moot until #3) |

### Severity roll-up (no pay-corrupting gaps → no Critical/High)
- **🔴 Critical (0):** none — UK statute prices **no** OT/night/weekend/bank-holiday premium, so no gap corrupts pay; the weekly-OT trigger (#2) is now supported (`[PO]`).
- **🟠 High (0):** none — every UK gap is **non-corrupting** limit-*validation* or leave-accrual, not a pay-bounding regime (the departure from France's four Highs).
- **🟡 Medium (6):** 48h rolling-17-week average (#3), 5.6-week leave accrual (#11), weekly rest + compensatory (#8), 20-min break validation (#9), night 8h limits (#5), 12.07% irregular-hours accrual (#12).
- **🟢 Low (10):** daily 11h rest field (#7), TOIL non-unit ratio (#10), on-call classification (#15), 48h opt-out (#4), young-worker profile (#18), Sunday-working opt-out (#21), young-worker 48h weekly rest (#22), night-worker 2-year record retention (#23), first-year 1/12 holiday accrual (#24), 48h reference-period 26-week extension (#25).

## The big gaps (all `[ABS]`)
1. **WTR limit validation** (#3, #5, #8, #9) — the 48h rolling-17-week average, night 8h average/absolute cap, weekly rest, and break minimums. We don't *flag limit breaches*.
2. **Statutory-leave accrual** (#11, #12) — 5.6 weeks + the 12.07% irregular-hours accrual; cross-run counters we don't ship.
3. **Weekly over-contract trigger** (#2) — daily-trigger contracts fit; weekly accumulation doesn't.
4. **Minor rule-profile** (#18) and the **forthcoming ERA-2025 guaranteed-hours** ~12-week aggregate (#20).

## Where the UK scores well (worth saying)
- **OT pay** (#1–2 daily): no statutory premium → our configurable, policy-defined onset+rates fit cleanly `[API]` — the same reason Germany is a strong fit.
- **Record-all-hours** (#16), **holiday calendar by nation** (#13), **night-hour + bank-holiday premium emission** (#5, #14), **TOIL bank** (#10), **tolerance** (#17) — all present `[API]`/`[FLD]`.

## 🔎 Verify before telling the customer
- **`crossShiftsInterval`** (#7): field is `[API]`-real, but does it *validate* the 11h rest or only classify/reshape? Weekly 24h/48h rest is absent regardless (#8).
- **Non-unit TOIL ratio** (#10): can the bank express 1.5:1 accrual, or only 1:1?
- Whether **min-break-by-hours** (#9) is *validated/flagged* or only configured.
- Any **weekly-accumulation** over-contract logic in the live product (version drift vs the 2024 `[API]` sample).

## Bottom line for the customer
The UK is one of our **strongest fits on pay** — no statutory premium means our policy-defined, per-day
surplus engine, night/bank-holiday premium emission, TOIL bank, and per-nation holiday calendar all apply
today (`[API]`/`[UI]`/`[FLD]`-grounded). But UK compliance is overwhelmingly **limit-*validation* and
statutory-leave accrual** — the 48h rolling-17-week average, night 8h limits, weekly rest, and 5.6-week /
12.07% leave — **none of which our pay engine does today.** Honest status: **partial; good on pay, weak on
WTR limit-enforcement and leave accrual** (the same profile as Germany).
