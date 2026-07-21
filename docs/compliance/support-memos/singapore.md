# Singapore — T&A requirements

> **What this is.** The ground-truth reference for Singapore's time-&-attendance legal requirements,
> grouped by topic — detailed enough to **build a day.io pay policy from**. It aims to be
> **exhaustive** and **atomic**: **one legal proposition per row**, each row self-contained (no
> "see §X" as the only content), with exact values, a worked example wherever a number is involved,
> variants, and a `Basis` that **links to the primary source** so any row can be checked against the
> law directly.
>
> **Scope: time & day-events only** — money (%, S$, CPF, tax, gross-to-net) is downstream *context*
> here (kept in `Values` so a policy can be configured; the deliverable is the typed hour/day event).
> **Term convention:** every non-English term (Malay, Tamil, or statutory jargon) is glossed in
> English in brackets on first use, e.g. *Hari Raya Puasa* [Muslim festival marking the end of
> Ramadan].
>
> **The one structural fact to hold onto:** Singapore's operative numbers come almost entirely from
> **one statute** — the **Employment Act 1968** — rather than from collective agreements or a
> jurisdiction/regional layer (there is no state/provincial variation; the whole country is one
> jurisdiction). The Act's own internal layering is the real complexity: a narrower **Part 4**
> (ss.35–41) carries the hours-of-work/overtime/rest-day rules and applies only to employees under a
> **salary gate**, while the broader **Core Provisions** (leave, public holidays, salary payment)
> apply to virtually everyone. Parental/family leave sits in a **separate statute** (the Child
> Development Co-Savings Act 2001), and National Service leave in another (the Enlistment Act). See
> §1.
>
> **Legal sources & links:** the Employment Act 1968 (Cap. 91) and its subsidiary regulations
> (Part-Time Employees; Children and Young Persons; Employment Records, KETs and Pay Slips 2016), the
> Child Development Co-Savings Act 2001 [CDCSA], the Enlistment Act, and the 2024 Tripartite
> Guidelines on Flexible Work Arrangement Requests. Statute sections link to **Singapore Statutes
> Online** (sso.agc.gov.sg); guidance links to the Ministry of Manpower (mom.gov.sg). sso.agc.gov.sg
> blocked automated fetches (HTTP 403) during this pass, so section-level deep anchors are
> unconfirmed — Basis cells link the **Act's base page** (confirmed reachable) rather than a guessed
> anchor; 🔎 marks a figure/citation/link still to spot-check by hand against the live text.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Employment Act coverage** | The Act covers essentially every employee under a contract of service, **except**: seafarers, domestic workers, and statutory-board/civil-service employees (separate regimes). | A private-sector office worker is covered; a foreign-flagged ship's crew member and a domestic helper are not. | Statutory-board/civil-service staff follow public-sector HR frameworks, not the EA. | [Employment Act 1968 s.2 (definition of "employee")](https://sso.agc.gov.sg/Act/EmA1968) |
| **Core Provisions vs Part 4 — the two-layer structure** | **Core Provisions** (salary payment, annual/sick leave, public holidays, termination — outside Part 4) apply to **every** covered employee, including managers/executives (M&E) and high earners. **Part 4** (ss.35–41: hours of work, overtime, rest days) applies **only** to employees who pass the salary gate below. | An M&E on S$15,000/mo gets statutory annual/sick leave and public holidays, but has **no** statutory hours/OT/rest-day entitlement — those are whatever the contract says. | — | [Employment Act 1968, Parts 4 & 10](https://sso.agc.gov.sg/Act/EmA1968) |
| **Part 4 salary-coverage gate** | Part 4 (hours/OT/rest days) applies to: (a) **workmen** [manual-labour employees per the Act's First Schedule — e.g. cleaners, machine operators, drivers, construction workers] earning basic monthly salary **≤ S$4,500**; and (b) **all other (non-workman) employees** earning basic monthly salary **≤ S$2,600**. Salary is tested on **basic** pay only — excludes OT pay, bonuses, AWS [annual wage supplement], productivity incentives, allowances. | A warehouse packer (workman) on **S$3,000/mo** → covered, statutorily owed OT. Same role on **S$5,000/mo** → not covered, contract governs. A clerk (non-workman) on **S$2,400/mo** → covered; on **S$3,000/mo** → not covered. | Thresholds are nationwide, unchanged since 2019; no regional variation (single jurisdiction). | [Employment Act 1968 s.35; First Schedule (workman definition)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Managers & executives — excluded from Part 4 regardless of pay** | A genuine M&E [manager or executive] — authority over hiring, discipline, pay, or strategy, or a professional (lawyer, accountant, doctor) doing equivalent work — sits **outside** Part 4 entirely, whatever their salary. They keep the Core Provisions (leave, public holidays). | A department head on S$4,000/mo (below the non-workman S$2,600 line by title alone would suggest coverage) is nonetheless excluded once the M&E test is met — job function controls, not just salary. | MOM applies a functional test, not a job title — a "manager" in title without real managerial authority may still be Part-4-covered. | [Employment Act 1968 s.35](https://sso.agc.gov.sg/Act/EmA1968); [MOM guidance on the "manager or executive" test](https://www.mom.gov.sg/employment-practices/employment-act/who-is-covered) 🔎 |
| **Part-time regime — <35h/week** | An employee contracted for **fewer than 35 hours a week** is a part-time employee. Governed by the **Employment (Part-Time Employees) Regulations** — a distinct two-tier overtime rule (§3b) and pro-rated leave/holiday entitlements (§10) relative to a comparable full-timer. | A 20h/week contract worker is part-time; pro-ration uses the ratio 20/44 against full-time entitlements. | — | [Employment (Part-Time Employees) Regulations](https://sso.agc.gov.sg/SL/EmA1968-RG8) |
| **Shift-worker classification gate** | An employee doing **regular shift work** [rotating shifts as part of the normal work pattern], or one who has given **written consent**, may be scheduled beyond the single-day/single-week caps in §4 (>6 continuous hours, >8h/day, >44h/week) — subject to the averaging rule in §4. | A rotating 3-shift factory roster qualifies automatically; a normally single-shift worker needs signed consent before being placed on an averaged pattern. | Gates the mechanics in §4 (3-week averaging) — this row is the eligibility test, §4 carries the numbers. | [Employment Act 1968 s.40](https://sso.agc.gov.sg/Act/EmA1968) |
| **Minors & young persons — protective regime** | **Children** [under 13]: may not be employed in **any** occupation. **Children 13–15**: light, non-industrial work only (or family-only industrial settings). **Young persons (industrial work, up to 16)**: may work in industrial settings, subject to notifying the Commissioner for Labour within **30 days** and a medical fitness certificate. Hour/night limits in §4/§5. | A 14-year-old may do light retail-shelf work but not factory/industrial work; a 16-year-old may work industrially only after the employer's 30-day notification + medical certificate. | — | [Employment Act 1968 Part 8 (ss.68–73)](https://sso.agc.gov.sg/Act/EmA1968); [Employment (Children and Young Persons) Regulations](https://sso.agc.gov.sg/Act/EmA1968) 🔎 |
| **Parental/family leave — a separate statute** | Maternity, paternity, shared-parental, adoption, childcare and infant-care leave live in the **Child Development Co-Savings Act 2001** [CDCSA], administered jointly with MSF — **not** in the Employment Act itself (except standard 12-week maternity leave, EA s.76). | — | — | [Child Development Co-Savings Act 2001](https://sso.agc.gov.sg/Act/CDCSA2001) |
| **National Service leave — a separate statute** | Paid leave for NS [National Service]/reservist call-ups is an employer duty under the **Enlistment Act**, independent of the Employment Act. | — | — | [Enlistment Act s.23](https://sso.agc.gov.sg/Act/EA1970) 🔎 (Act code unconfirmed) |
| **Tripartite Guidelines — soft-law layer** | The mandatory-in-practice (but not primary-legislation) **Tripartite Guidelines** (MOM/NTUC/SNEF) impose minimum process obligations on top of the Act — e.g. Flexible Work Arrangement [FWA] request-handling (effective **1 Dec 2024**, see §9). | — | — | [Tripartite Guidelines on Flexible Work Arrangement Requests (2024)](https://www.tripartitealliance.sg) 🔎 |
| **Single jurisdiction — no regional/CBA layer** | Unlike federal states, Singapore has **no state/provincial variation** and no sector-wide collective-bargaining layer analogous to a German Tarifvertrag — company-level union agreements exist but do not set nationwide sector defaults. | — | — | (structural — no single citable instrument); [Singapore Statutes Online](https://sso.agc.gov.sg/) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **"Hours of work" — the statutory unit** | Time the employee is **at the employer's disposal**, **excluding** intervals allowed for rest and meals. This is the base unit every Part-4 rule (normal hours, overtime, breaks) measures against. | A paid lunch break is not automatically "hours of work" unless the employee remains at the employer's disposal during it (e.g. required to stay on the premises and respond to calls). | — | [Employment Act 1968 s.2 (interpretation)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Breaks excluded from hours of work** | Meal/rest intervals are, by definition, **not** counted toward the 8h/9h/44h caps (§4) or OT onset (§3a) — unless the employee remains at the employer's disposal through the break. | A 9am–6pm shift with an unpaid, disposal-free 1-hour lunch = 8 hours of "hours of work", not 9. | — | [Employment Act 1968 s.2](https://sso.agc.gov.sg/Act/EmA1968) |
| **Travel time — not addressed by statute** | The Act is silent on whether business travel counts as "hours of work". | — | Contractual/company-policy matter. | — none identified in current research — |
| **Cross-midnight shifts — no special statutory split rule** | The Act does not prescribe a specific cross-midnight attribution rule beyond the general "hours of work" definition and the night-work ban for minors (§5). | — | — | — none identified in current research — |

## 3. Overtime

*Singapore's overtime regime applies only to Part-4-covered employees (§1) — workmen ≤ S$4,500/mo and other employees ≤ S$2,600/mo. Managers/executives and higher earners have no statutory OT entitlement; the contract governs.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Overtime onset — beyond normal contractual hours** | Overtime = any hour worked beyond the employee's normal daily/weekly hours (§4: 8h/day for a >5-day week, or 9h/day for a ≤5-day week, capped at 44h/week) — measured against the entitled normal hours, not a fixed clock time. | A 9h/day (5-day-week) worker's overtime starts at hour 10, not hour 9. | Shift workers on an averaged pattern (§4) may have a different daily onset point within the averaging window. | [Employment Act 1968 s.38(1)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Part-time onset — two-tier, contractual-then-full-time-line** | For a part-time employee (§1), hours beyond their **own contracted** daily hours but **up to** a comparable full-timer's normal daily hours are a **first tier** (paid at 1× — see §3b); only hours **beyond** the full-timer's normal hours are true overtime (1.5×, second tier). | A part-timer contracted for 4h/day working a 9h day: hours 5–8 = first tier (up to the full-timer's 8h line); hour 9 = second-tier overtime. | — | [Employment (Part-Time Employees) Regulations](https://sso.agc.gov.sg/SL/EmA1968-RG8) |
| **Overtime not substitutable with time off (Part-4-covered employees)** | For employees covered under Part 4, overtime **must be paid in cash** at ≥1.5× — an employer **cannot** substitute OT pay with time off, even by agreement. | An employer offering a Part-4-covered worker "2 hours off" instead of OT pay for 2 OT hours worked is non-compliant. | For employees **not** covered under Part 4 (M&E, higher earners), TOIL for extra hours is a contractual matter. | [Employment Act 1968 s.38(4)](https://sso.agc.gov.sg/Act/EmA1968); [MOM guidance](https://www.mom.gov.sg/employment-practices/hours-of-work-overtime-and-rest-days) 🔎 |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory overtime rate — ≥1.5× hourly basic rate** | Overtime is paid at **at least 1.5×** the employee's hourly basic rate of pay. | An employee with an hourly basic rate of **S$11.54** who works 2 OT hours earns **2 × 1.5 × S$11.54 = S$34.62** for those hours. | Employers may pay more; 1.5× is a floor, not a ceiling. | [Employment Act 1968 s.38(4)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Hourly basic rate — fixed statutory formula** | For a monthly-rated employee: hourly basic rate = **(12 × monthly basic salary) ÷ (52 × 44)** — a fixed statutory denominator (52 weeks × 44h), **not** the employee's actual contracted weekly hours. | Monthly basic **S$2,200** → hourly basic rate = (12 × 2,200) ÷ (52 × 44) = **S$11.54**. | — | [Employment Act 1968 s.38(4)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Part-time first-tier rate — 1.0×** | Hours between a part-timer's own contracted daily hours and a comparable full-timer's normal daily hours are paid at the **ordinary (1.0×)** rate, not the OT rate. | 4h/day part-timer working 9h: hours 5–8 at 1.0× the basic hourly rate. | — | [Employment (Part-Time Employees) Regulations](https://sso.agc.gov.sg/SL/EmA1968-RG8) |
| **Part-time second-tier rate — 1.5×** | Only hours beyond the comparable full-timer's normal daily hours attract the standard **1.5×**. | Continuing the example: hour 9 at 1.5× the basic hourly rate. | — | [Employment (Part-Time Employees) Regulations](https://sso.agc.gov.sg/SL/EmA1968-RG8) |
| **No statutory night-shift premium** | No legal uplift for hours worked at night (see §5) — any night premium is contractual. | — | — | [Employment Act 1968](https://sso.agc.gov.sg/Act/EmA1968) — absence of provision |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **72 overtime-hours-per-month cap** | An employee must not work more than **72 hours of overtime in a calendar month** (a running monthly counter). Hours worked on a rest day or public holiday **beyond** the employee's normal daily hours count toward this cap. | An employee who has logged 72 OT hours by the 25th of the month cannot lawfully be rostered for further overtime that month absent an exemption. | — | [Employment Act 1968 s.38(5)](https://sso.agc.gov.sg/Act/EmA1968) |
| **MOM exemption from the 72h/month cap** | The Commissioner for Labour may exempt an employer from the 72h/month cap on application, allowing OT beyond it with overtime compensation. | — | Must be applied for **before** the work happens, not after. | [Employment Act 1968 s.41A](https://sso.agc.gov.sg/Act/EmA1968) |
| **Absolute daily ceiling — 12h/day** | Total hours worked, **including** overtime, must not exceed **12 hours in any one day**, except in five named emergency circumstances or with a specific MOM exemption. | An 8-hour contractual day leaves at most **4 hours** of overtime before the 12h ceiling is hit. | Named exceptions (s.38(2)(a)–(e)): actual/threatened accident; urgent work to machinery/plant; an unforeseeable interruption of work; national-defence needs; and a fifth named circumstance 🔎 (confirm exact wording). With a MOM exemption, up to **14h/day** may be authorised. | [Employment Act 1968 s.38(8); exceptions s.38(2)(a)–(e)](https://sso.agc.gov.sg/Act/EmA1968) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-determining averaging** | Singapore's reference-period averaging (3-continuous-week shift averaging; alternate-week arrangement) validates **working-time limits** — whether a given week's hours breach the statutory ceiling — not overtime **pay**. OT is still calculated per shift/day against the normal-hours line (§3a); it is not netted at period close. Placed in §4. | — | — | [Employment Act 1968 s.38(4)/s.40](https://sso.agc.gov.sg/Act/EmA1968) (see §4) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Rest-day work — explicit statutory composition rule** | Where employer-required rest-day work exceeds the employee's normal daily hours, the statute composes pay as **2 days' salary PLUS 1.5× overtime for the excess hours** — an explicit stacking formula (base rest-day premium + OT rate for the additional hours), see §6. | Normal day = 8h. Employer-requires 10h rest-day work → 2 days' pay + (2h × 1.5×) overtime for hours 9–10. | — | [Employment Act 1968 s.37](https://sso.agc.gov.sg/Act/EmA1968) |
| **No general additive/multiplicative stacking rule for OT + night/PH** | Beyond the rest-day formula above, the Act does not set a general rule for composing OT with other premiums, because there is no statutory night premium to stack with (§3b), and worked-public-holiday pay is a flat extra-day addition rather than an hourly multiplier (§6). | — | — | [Employment Act 1968](https://sso.agc.gov.sg/Act/EmA1968) — none identified beyond s.37 |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Normal hours of work — 8h/9h/day, 44h/week** | Up to **8 hours/day** if working **more than 5 days** a week, or up to **9 hours/day** if working **5 days or fewer** — either way the week is capped at **44 hours**. | A 5-day-week employee may be rostered up to 8.8h/day × 5 = 44h (or 9h on some days, provided the week stays ≤44h); a 6-day-week employee is capped at 8h/day. | Shift workers may exceed these via the averaging rule below. | [Employment Act 1968 s.38(1)](https://sso.agc.gov.sg/Act/EmA1968) |
| **No more than 6 continuous hours without a break** | An employee may not be required to work more than **6 consecutive hours** without a break. | An 8-hour shift must include a break before the 6-hour mark. | An employee on continuous-process work may instead work **8 consecutive hours inclusive of an aggregate ≥45-minute meal opportunity** (row below). | [Employment Act 1968 s.38(1)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Meal break — ≥45 min for an 8-hour continuous stretch** | Where work must be carried on continuously, an employee may be required to work **8 consecutive hours inclusive of** a break (or breaks) totalling **≥45 minutes** for a meal. Breaks are unpaid and excluded from "hours of work" (§2). | A 9am–6pm shift includes a 45-minute lunch break; paid time = the span minus the break. | — | [Employment Act 1968 s.38(1)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Absolute daily ceiling — 12h/day (incl. OT)** | See §3c — total hours worked may not exceed **12h/day** except in five named emergencies or with a MOM exemption (up to 14h/day). | — | — | [Employment Act 1968 s.38(8), s.38(2)(a)–(e)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Shift-worker averaging — 44h/week average over 3 continuous weeks** | For shift workers (§1 classification gate), the weekly-hours cap applies as an **average of 44 hours over any 3 continuous weeks** rather than a hard ceiling every single week; shift workers may also work up to **12h/day** (including breaks) under this arrangement. | Weeks of 46h + 44h + 42h = 132h ÷ 3 = 44h/week average → no breach, even though week 1 alone exceeded 44h. | Gate = §1's shift-worker classification (regular rotation or written consent). | [Employment Act 1968 s.38(4); s.40](https://sso.agc.gov.sg/Act/EmA1968) 🔎 (confirm exact subsection split) |
| **Alternate-week arrangement — 48h in one week, 88h/fortnight cap** | A separate flexible pattern (not necessarily shift work): up to **48 hours** in one week of a two-week cycle, provided the **fortnight total stays ≤ 88 hours**. | Week 1 = 47h → week 2 must be ≤ 41h to keep the fortnight at ≤ 88h (and the 2-week average at ≤44h/week). | — | [Employment Act 1968 s.38](https://sso.agc.gov.sg/Act/EmA1968) 🔎 (confirm exact subsection) |
| **Weekly rest day — 1 unpaid day/week, ≤12 days between rest days** | Every Part-4-covered employee gets **one rest day a week** — a full unpaid day, midnight-to-midnight (shift workers: **30 continuous hours** instead). Employer picks the day; if it isn't Sunday, a whole-month roster must be issued **before the month starts**. Gap between two rest days ≤ **12 days**. | A rest day on the 1st of the month means the next rest day must fall on or before the 13th. | Shift workers get 30 continuous hours rather than a calendar day. | [Employment Act 1968 s.36](https://sso.agc.gov.sg/Act/EmA1968) |
| **Minors — tighter daily-hour limits** | **Children 13–15**: ≤ **6 hours/day including school time**, break **30 min every 3 hours**. **Young persons (industrial, up to 16)**: ≤ **7 hours/day including school time**, break **30 min every 4 hours**. | A 14-year-old attending school cannot be rostered beyond 6 total hours (school + work) on a school day. | — | [Employment Act 1968 Part 8](https://sso.agc.gov.sg/Act/EmA1968); [Employment (Children and Young Persons) Regulations](https://sso.agc.gov.sg/Act/EmA1968) 🔎 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory night premium for adults** | The Employment Act sets **no** statutory premium for hours worked at night. Any night-shift uplift is contractual/company policy. | — | Contrast the statutory night-work **ban** for minors below. | [Employment Act 1968](https://sso.agc.gov.sg/Act/EmA1968) — absence of provision |
| **Night-work ban for minors — 11pm–6am** | Both **children (13–15)** and **young persons (under 16)** are barred from working at night, between **23:00 and 06:00** — a hard statutory prohibition. | A 15-year-old retail worker must finish by 23:00 and cannot start before 06:00. | — | [Employment Act 1968 Part 8](https://sso.agc.gov.sg/Act/EmA1968); [Employment (Children and Young Persons) Regulations](https://sso.agc.gov.sg/Act/EmA1968) 🔎 |
| **No statutory night-worker status or health-check regime** | Unlike some jurisdictions (e.g. Germany's *Nachtarbeitnehmer* [night-worker] status with a tighter daily cap and mandatory health checks), Singapore law does not define a "night worker" category or attach special caps/health-check rights to regular night work for adults. | — | — | — none identified in current research — |
| **Shift-worker classification unlocks averaging, not a night premium** | The shift-worker gate (§1, §4) affects the **hours-limit averaging** rules only — it does not itself create or require a night/shift pay premium. | — | — | [Employment Act 1968 s.40](https://sso.agc.gov.sg/Act/EmA1968) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **11 gazetted public holidays/year, paid** | Every employee — including M&E (a Core Provision) — gets a paid holiday on each of the **11 gazetted public holidays**. **2026 calendar**: New Year's Day (1 Jan); Chinese New Year (17–18 Feb); Hari Raya Puasa [Muslim festival marking the end of Ramadan] (21 Mar, lunar-dependent 🔎); Good Friday (3 Apr); Labour Day (1 May); Hari Raya Haji [Muslim festival of sacrifice, also called Eid al-Adha] (27 May, lunar-dependent 🔎); Vesak Day [Buddhist commemoration of the Buddha's birth, enlightenment and passing] (31 May); National Day (9 Aug); Deepavali [Hindu festival of lights] (8 Nov); Christmas Day (25 Dec). | An employee who does not work on Christmas Day still receives normal pay for that day, as for any of the 11 gazetted holidays. | Single nationwide calendar — no regional variation (contrast Germany's per-state calendar). | [Employment Act 1968 s.88(1)](https://sso.agc.gov.sg/Act/EmA1968); [MOM 2026 public-holiday list](https://www.mom.gov.sg/employment-practices/public-holidays) 🔎 |
| **Substitution when a holiday falls on a rest day or non-working day** | If a gazetted holiday falls on an employee's **rest day**, the **next working day** becomes the paid holiday. If it falls on a day that is neither a working day nor a rest day (e.g. an off day under a roster), the employer must instead give an **extra day's pay in lieu** or **another day off**. Employer/employee may also **mutually agree** to substitute for a different working day. | 2026: Vesak Day, National Day and Deepavali all fall on a **Sunday** (most employees' rest day) → the following Monday (1 Jun, 10 Aug, 9 Nov) becomes the paid holiday instead. | — | [Employment Act 1968 s.88(1)(a)–(2)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Worked-public-holiday premium — extra day's pay, or off-in-lieu for some** | An employee **required to work** on a public holiday gets normal gross pay for the day **plus one extra day's salary** at the basic rate. For workmen **> S$4,500/mo**, non-workmen **> S$2,600/mo**, and **all M&E**, the employer may instead grant **time off in lieu** by mutual agreement rather than the extra day's pay. | Working National Day earns the day's normal pay **+ one additional day of basic pay**; an M&E may instead bank a lieu period by agreement. | Formula: (12 × monthly gross rate × PHs worked) ÷ (52 × average work-days/week). | [Employment Act 1968 s.88(4)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Off-in-lieu conversion ratio — if no agreement reached** | Absent mutual agreement on the number of hours, the employer defaults to: **≤4 hours worked** → **4 hours off**; **>4 hours worked** → a **full day off**. | An M&E who works 3h on a public holiday defaults to 4h off; one who works 6h defaults to a full day off. | Applies where TOIL (rather than the extra day's pay) is the chosen route. | [MOM off-in-lieu guidance](https://www.mom.gov.sg/employment-practices/public-holidays) 🔎 (administrative, not statute text) |
| **Rest-day-work premium tiers — employer-required** | If the **employer requires** rest-day work: **≤ half** the normal daily hours → **1 day's salary**; **more than half up to** normal hours → **2 days' salary**; **beyond** normal hours → 2 days' salary **plus** 1.5× overtime for the excess (§3e). | Normal day = 8h. Employer-required work of **3h** → 1 day's pay; **6h** → 2 days' pay; **10h** → 2 days' pay + (2h × 1.5×) overtime. | If the **employee requests** the work instead, tiers halve: half-day → 0.5 day's pay; more than half → 1 day's pay. | [Employment Act 1968 s.37](https://sso.agc.gov.sg/Act/EmA1968) |
| **Rest-day off-in-lieu — only for non-Part-4-covered employees** | Part-4-covered employees (§1) must be **paid** per the tiers above — no substitution with time off. For employees **outside** Part 4 (M&E, higher earners), the employer may by mutual agreement grant off-in-lieu instead of the extra pay. | An M&E who works a rest day may bank a lieu day instead of extra pay, by agreement; a Part-4-covered warehouse worker cannot be offered time off instead. | — | [Employment Act 1968 s.37](https://sso.agc.gov.sg/Act/EmA1968); [MOM guidance](https://www.mom.gov.sg/employment-practices/hours-of-work-overtime-and-rest-days) 🔎 |
| **Rest-day/PH hours count toward the 72h/month OT cap** | Hours worked on a rest day or public holiday **beyond the employee's normal daily hours** count toward the 72-hour monthly overtime ceiling (§3c). | — | — | [Employment Act 1968 s.38(5)](https://sso.agc.gov.sg/Act/EmA1968) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory hours-bank / working-time-account regime** | Singapore has no equivalent of a German *Arbeitszeitkonto* [working-time account] — no statutory mechanism to bank ordinary overtime hours for later time off. | — | — | — none identified in current research — |
| **Overtime itself cannot be banked for Part-4-covered employees** | For employees covered under Part 4, overtime **must be paid in cash** (§3a) — it cannot be converted to time off, even by agreement. | — | Employees outside Part 4 (M&E, higher earners) may have a contractual TOIL arrangement for extra hours worked. | [Employment Act 1968 s.38(4)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Public-holiday-worked off-in-lieu** | Available **only** for workmen >S$4,500/mo, non-workmen >S$2,600/mo, and all M&E, by mutual agreement, in place of the extra day's pay (§6). Default conversion: ≤4h worked → 4h off; >4h → a full day off. | An M&E works 3h on National Day → defaults to 4h off; one who works 5h → defaults to a full day off. | — | [Employment Act 1968 s.88(4)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Rest-day-worked off-in-lieu** | Available **only** for employees **not** covered by Part 4, by mutual agreement, in place of the day(s)'-salary premium (§6). | — | — | [Employment Act 1968 s.37](https://sso.agc.gov.sg/Act/EmA1968); [MOM guidance](https://www.mom.gov.sg/employment-practices/hours-of-work-overtime-and-rest-days) 🔎 |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory on-call / standby regime** | The Employment Act contains no provision defining on-call or standby time, no restricted-vs-unrestricted classification (contrast the EU's *Matzak*/*Jaeger* case-law line), and no statutory standby allowance or cap. | — | Standby pay/classification is purely a matter of contract or company policy. | — none identified in current research — |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Flexible Work Arrangement (FWA) request-handling timeline** | Under the mandatory Tripartite Guidelines (effective **1 Dec 2024**), an employee may submit a formal FWA request (staggered hours, compressed workweek, remote work). The employer must give a **written decision within 2 months** of receipt. | An employee requests a 4-day compressed week on 1 March; the employer must respond in writing by 1 May, whether approving or rejecting (with documented reasons). | A process-timing rule, not a right to the arrangement itself. | [Tripartite Guidelines on Flexible Work Arrangement Requests (2024)](https://www.tripartitealliance.sg) 🔎 — not primary legislation |
| **No statutory reporting/show-up pay** | Singapore has no statutory show-up / reporting-time / predictability-pay regime (unlike some US state/city laws). | — | — | — none identified in current research — |
| **No statutory split-shift or spread-of-hours premium** | No provision mandates extra pay for a shift split across a wide span of the day (contrast California's spread-of-hours / split-shift premium). | — | Contractual matter. | — none identified in current research — |
| **No statutory make-up-time or compressed-schedule regime** | Beyond the alternate-week arrangement (§4) and shift-worker averaging (§4), the Act sets no general make-up-time or compressed-schedule mechanism. | — | The alternate-week arrangement functionally supports compressed patterns within its 48h/88h-fortnight limits. | [Employment Act 1968 s.38](https://sso.agc.gov.sg/Act/EmA1968) (see §4) |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Annual leave — 7 days year 1, +1/year to a 14-day cap** | After **3 months'** service, paid annual leave starts at **7 days** in year 1, adding **1 day per additional year** of service, up to a maximum of **14 days**. | Year 1 = 7 days; year 4 = 10 days; year 8 onward = 14 days. Joined 6 months ago in year 1 → (6 ÷ 12) × 7 = 3.5 → **4 days** (pro-rated, rounded up). | Part-timers: pro-rated by contracted-hours ratio (§1). | [Employment Act 1968 s.43](https://sso.agc.gov.sg/Act/EmA1968) |
| **Annual-leave carry-forward** | The Act does **not mandate** carry-forward of unused leave but **permits** it; if the contract/handbook is silent, the default is that unused current-year leave may be forfeited at year-end — subject to the encashment rule below. | Common employer practice allows 5–7 carried-forward days with a use-it-or-lose-it rule on the rest 🔎 (practice, not statute). | Contract/company-policy-set. | [Employment Act 1968 s.43](https://sso.agc.gov.sg/Act/EmA1968) — statute silent; practice-based 🔎 |
| **Annual-leave encashment on termination** | Unused **current-year** accrued annual leave must be **paid out** at the basic daily rate on termination (resignation or dismissal) — it cannot be forfeited outright. | An employee resigning with 5 unused days is paid 5 days' basic salary in the final pay. | Carried-forward leave from a **prior** year may be subject to a contractual forfeiture cut-off (e.g. 31 March) if the policy so states. | [Employment Act 1968 s.43](https://sso.agc.gov.sg/Act/EmA1968); [MOM guidance](https://www.mom.gov.sg/employment-practices/leave/annual-leave) 🔎 |
| **Paid sick leave — tenure ladder** | With medical certification and **≥3 months'** service: **3 mo → 5 outpatient / 15 hospitalisation** days; **4 mo → 8 / 30**; **5 mo → 11 / 45**; **6 mo+ → 14 outpatient / 60 hospitalisation** days per year (the 60-day hospitalisation figure is **inclusive of**, not additive to, the 14 outpatient days). | An employee past 6 months who is hospitalised has up to **60** paid sick days/year, of which up to 14 may instead be ordinary outpatient sick days. | — | [Employment Act 1968 s.89](https://sso.agc.gov.sg/Act/EmA1968) |
| **Sick-leave notification — 48-hour rule** | The employee must inform (or attempt to inform) the employer of the inability to attend work **within 48 hours** of the absence starting; failing this, the employer may treat the absence as unpaid even if a certificate is later produced. Certification must come from a doctor registered under the Medical/Dental Registration Act, a government/SAF [Singapore Armed Forces] medical officer, or an employer-appointed doctor. | An employee who calls in sick on day 3 of a 3-day absence (outside the 48h window) risks the whole absence being treated as unpaid. | Notification may be by phone, message, email, or via a colleague — any reasonable method. | [Employment Act 1968 s.89](https://sso.agc.gov.sg/Act/EmA1968) |
| **Maternity leave — Government-Paid (GPML), 16 weeks** | **16 weeks** for a Singapore-citizen child — needs ≥3 months' continuous service before the birth + ≥1 week's notice; employer pays the first 8 weeks, government reimburses the last 8 (1st/2nd child; capped S$10,000/4wk, S$20,000 total), or government reimburses all 16 weeks (3rd+ child, capped S$40,000). | Due 1 June, GPML-eligible → protected leave window runs ~20 April–~27 July under the 4-weeks-before/8-weeks-after split, or a full 12-week block starting no earlier than 28 days before confinement. | GPML money is downstream (government reimbursement caps); the leave-day event itself is T&A. | [Child Development Co-Savings Act 2001 ss.9, 9A (GPML)](https://sso.agc.gov.sg/Act/CDCSA2001) |
| **Maternity leave — standard Employment Act, 12 weeks** | **12 weeks** for employees not meeting the GPML citizenship test — first 8 weeks paid (if <2 living children + ≥1 week's notice), last 4 weeks unpaid (all 12 unpaid if ≥2 living children from separate prior confinements). | An employee with a non-citizen child and one prior living child takes 12 weeks, first 8 paid + last 4 unpaid. | Distinct statute from GPML — the EA carries the baseline entitlement, the CDCSA the enhanced government-paid track (row above). | [Employment Act 1968 s.76, s.76(1A)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Paternity leave — 4 weeks Government-Paid** | Eligible fathers of a Singapore-citizen child get **4 weeks** of Government-Paid Paternity Leave [GPPL] (increased from 2 weeks, effective for children born/expected on/after **1 April 2025**). | A father whose child is born 15 May 2025 is entitled to 4 weeks GPPL; a father whose child was born 15 March 2025 (pre-cutoff) is entitled to the prior 2-week regime. | Pre-1-Apr-2025 births: 2 weeks (superseded regime). | [Child Development Co-Savings Act 2001 s.12H](https://sso.agc.gov.sg/Act/CDCSA2001) |
| **Shared Parental Leave [SPL] — a shared pool, phasing in** | **Phase 1 (1 Apr 2025–31 Mar 2026): 6 weeks** (default 3 weeks each parent), for children born/adopted from 1 Apr 2025. **Phase 2 (from 1 Apr 2026): 10 weeks** (default 5 weeks each), for children born/adopted from 1 Apr 2026. Parents may reallocate the default split by agreement. | Under the Phase-2 stack: 16 weeks GPML + 4 weeks GPPL + 10 weeks SPL = **30 weeks** of paid family leave available to a couple. | — | [Child Development Co-Savings Act 2001 s.12G](https://sso.agc.gov.sg/Act/CDCSA2001) |
| **Childcare leave — 6 days/year, +2 days extended** | Working parents of a Singapore-citizen child **under 7**, with ≥3 months' service, get **6 days/year** paid childcare leave. Parents of a child **7–12** get an **additional 2 days/year** (extended childcare leave). | A parent of a 5-year-old and a 9-year-old may take 6 days of childcare leave (for the younger child) plus 2 days of extended childcare leave (for the older child) in the same year — 8 days total. | — | [Child Development Co-Savings Act 2001, Part 3](https://sso.agc.gov.sg/Act/CDCSA2001) |
| **Unpaid infant-care leave — 12 days/year** | Working parents of a Singapore-citizen child **under 2**, with ≥3 months' service, get **12 days/year** unpaid infant-care leave (per parent), capped at **24 days total per child** across the entitlement window. **Doubled from 6 to 12 days effective 1 Jan 2024.** In addition to the 6 days of paid childcare leave for the same under-2 band. | A parent of a 1-year-old takes 12 unpaid infant-care days in year 1 and, if the child turns 2 partway through year 2, up to 12 more days — capped at 24 days total across the child's first 2 years. | — | [Child Development Co-Savings Act 2001, Part 3](https://sso.agc.gov.sg/Act/CDCSA2001) |
| **Adoption leave — 12 weeks** | An adoptive mother of a child under 12 months old at the start of the adoption process gets **12 weeks** paid adoption leave; government reimburses the **last 8 weeks** (1st/2nd adopted child) or the **full 12 weeks** (3rd+ child). | Adoptive parents may also access SPL (row above) where the formal intent to adopt is dated on/after 1 April 2025. | — | [Child Development Co-Savings Act 2001, Part 3](https://sso.agc.gov.sg/Act/CDCSA2001) 🔎 (exact section) |
| **National Service (NS) leave** | Employers must grant **paid leave of absence** for NS/reservist call-ups; the employer may not require annual leave to be used instead, and may not dismiss/penalise for NS obligations. Separate statute from the Employment Act; MINDEF reimburses the employer via a make-up-pay scheme for the income gap. | — | — | [Enlistment Act s.23](https://sso.agc.gov.sg/Act/EA1970) 🔎 (Act code unconfirmed) |
| **Bereavement leave — not a statutory entitlement** | Singapore law does **not** mandate paid or unpaid bereavement/compassionate leave. Noted here so it is not mistaken for a missing statutory rule. | — | Company policy/contract matter. | [Employment Act 1968](https://sso.agc.gov.sg/Act/EmA1968) — no statutory basis |
| **Miscarriage leave — not a statutory entitlement** | No standalone statutory miscarriage leave exists; a miscarriage is generally covered, if at all, through ordinary paid sick leave with medical certification (§10 sick-leave row), not a distinct leave type. | — | Some employers grant discretionary compassionate leave. | [Employment Act 1968 s.89](https://sso.agc.gov.sg/Act/EmA1968) — no distinct statutory basis 🔎 |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Employment & salary records retention** | Employers must keep detailed employment/salary records for **2 years** for current employees, and **1 year after** an employee leaves (covering the last 2 years of employment). | An employee who resigns in June 2026 must have their 2024–2026 salary records kept until at least June 2027. | — | [Employment (Employment Records, Key Employment Terms and Pay Slips) Regulations 2016](https://sso.agc.gov.sg/Act/EmA1968) 🔎 |
| **Itemised pay slips** | Employers must give an **itemised pay slip** (hard or soft copy) with each salary payment, or within **3 days** of it at the latest, and retain a copy per the retention rule above. | Salary paid on 1 July must be accompanied by (or followed within 3 days, by 4 July at the latest) an itemised pay slip. | — | [Employment (Employment Records, Key Employment Terms and Pay Slips) Regulations 2016](https://sso.agc.gov.sg/Act/EmA1968) 🔎 |
| **Key Employment Terms (KETs)** | A written statement of Key Employment Terms (role, hours, salary components, leave entitlements) must be given within **14 days** of the employee's start date. | An employee starting on 1 July must receive their written KETs statement by 15 July. | — | [Employment (Employment Records, Key Employment Terms and Pay Slips) Regulations 2016](https://sso.agc.gov.sg/Act/EmA1968) 🔎 |
| **Salary payment timing** | Regular salary must be paid **at least once a month**, within **7 days** after the end of the salary period (period itself ≤1 month). | For a salary period ending 30 June, salary must be paid by 7 July at the latest. | — | [Employment Act 1968 s.20](https://sso.agc.gov.sg/Act/EmA1968) |
| **Overtime payment timing — a longer window** | Overtime pay specifically must be paid within **14 days** after the end of the salary period it relates to — a longer window than ordinary salary. | An OT-hours event computed for a March salary period must be paid out by ~14 April, even if regular March salary was already paid within the 7-day window. | — | [Employment Act 1968 s.38(4)](https://sso.agc.gov.sg/Act/EmA1968) |
| **Tolerance / rounding** | **No statutory** punch-tolerance or rounding rule identified — any tolerance is a policy choice. | — | — | — none identified in current research — |

## Sources (requirements section)

- **Singapore Statutes Online (sso.agc.gov.sg):** [Employment Act 1968](https://sso.agc.gov.sg/Act/EmA1968) —
  Part 4 (ss.35–41); Part 8 (ss.68–73); s.2 (interpretation), s.20 (salary payment), s.36–38 (rest
  day/hours/OT), s.40 (shift workers), s.41A (exemption), s.43 (annual leave), s.76 (maternity),
  s.88–89 (holidays, sick leave); [Employment (Part-Time Employees) Regulations](https://sso.agc.gov.sg/SL/EmA1968-RG8);
  Employment (Children and Young Persons) Regulations; Employment (Employment Records, Key
  Employment Terms and Pay Slips) Regulations 2016 (linked via the Act's subsidiary-legislation
  listing — exact SL codes unconfirmed, 🔎); [Child Development Co-Savings Act 2001](https://sso.agc.gov.sg/Act/CDCSA2001)
  (ss.9, 9A, 12G, 12H, Part 3); Enlistment Act s.23 (Act code unconfirmed, 🔎).
- **Ministry of Manpower (mom.gov.sg):** Hours of work, overtime and rest days; Employment Act —
  who is covered; Public holidays — entitlement and pay; Maternity leave — eligibility and
  entitlement; Paternity leave; Shared parental leave; Unpaid infant care leave; Sick leave —
  eligibility and entitlement; Part-time employment; Young persons and children; Paying salary;
  Tripartite Guidelines on Flexible Work Arrangement Requests (PDF, 2024).
- **Section-number corroboration:** Rajah & Tann Asia, "Cap on Maximum Overtime under the
  Employment Act" (s.38(5), s.41A); Human Resources Online, HR guide to Part IV; commoner-law.com,
  Singapore Hours (2026); gjclaw.com.sg, sick-leave entitlement; singaporelegaladvice.com, maternity
  leave under the Employment Act.
- **Off-in-lieu mechanics:** quickhr.co, Off-in-lieu guide (public holiday); payboy.sg, Off-in-lieu
  guide for employers; dollarsandsense.sg, public-holiday pay formula.
- **2026 public-holiday calendar:** MOM press release "Public Holidays for 2026" (16 June 2025);
  data.gov.sg Public Holidays for 2026 dataset.
- **Shared Parental Leave / paternity 2025–2026 phase-in:** MSF, "Amendments to the Child
  Development Co-Savings Act — enhanced paternity leave and shared parental leave scheme" (effective
  1 April 2025).
- **Annual-leave carry-forward/encashment practice:** quickhr.co, Carry Forward Annual Leave
  Singapore (2026 guide); justlogin.com, Annual Leave in Singapore (2026).

**Note on access.** sso.agc.gov.sg blocked automated fetches (HTTP 403) during this pass; the base
Act pages (`/Act/EmA1968`, `/Act/CDCSA2001`) were confirmed reachable via search-engine indexing,
but section-level deep anchors were not independently verified — treat every Basis link as pointing
to the right *statute*, with the exact subsection to be spot-checked against the live text before
customer-facing use. Section numbers themselves are corroborated across MOM's own pages plus
multiple independent secondary summaries of the statute text; a handful (flagged 🔎 inline) should
be spot-checked first.
