# Australia — T&A requirements

> **What this is.** The ground-truth reference for Australia's time-&-attendance legal requirements,
> detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive** and **atomic**:
> **one legal proposition per row**, each row self-contained (no "see §X" as the only content), with
> exact values, a worked example wherever a number is involved, variants, and a `Basis` that **links
> to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, A$, tax, super, gross-to-net) is out of scope
> (premiums are named for context in `Values` but the deliverable is the typed hour/day event).
> **Term convention:** every Australia-specific term of art is glossed in English in brackets on
> first use, e.g. *span of hours* [the daily window inside which hours count as "ordinary"].
>
> **The one structural fact that shapes this whole document — and its spine.** Australian T&A law is a
> **federal pyramid with a narrow state carve-out**, and almost none of the operative *numbers* live
> at the top. For virtually every private-sector employee the rules come from **two federal tiers** —
> the NES floor and, above it, the Modern Award / enterprise agreement where the numbers actually
> live. The state/territory layer is **not a third tier stacked on top**: it's a set of **carve-outs**
> (long service leave, minors, and — in WA only — the whole IR system for non-corporate employers,
> §17). Since the **Fair Work Act 2009** nationalised private-sector workplace relations, the states
> no longer set overtime, penalties or breaks for the mainstream. The three parts below map this:
>
> - **Part I — the federal floor (National Employment Standards, NES):** a Commonwealth minimum of
>   **11 entitlements**. It quantifies **leave** and the **38h week**, but fixes **no overtime rate,
>   no penalty rate, no shift loading, no meal/rest break, no daily-hours cap, no inter-shift rest**.
>   On the working-time levers a pay policy actually needs, the federal floor is **deliberately
>   thin** — mostly definitions and one qualitative test.
> - **Part II — the Award / enterprise-agreement layer:** where the operative numbers live. The
>   ~120 **Modern Awards** (or a registered enterprise agreement) set OT onset+multiplier, penalties,
>   loadings, span of ordinary hours, breaks, minimum engagement, RDO/TOIL, annualised-salary
>   mechanics. **Most rows in Part II cite an *award*, not a statute — that is the law for those
>   matters.** Not everyone is on an award (§7).
> - **Part III — the state/territory layer:** **long service leave**, **minors/child employment**, and
>   — **in WA only** — the whole IR system for non-corporate employers (OT/breaks/hours included) are
>   state law, not the FWA — figures differ by state.
>
> So the document is ordered by **layer**, not by topic: read Part I to see the whole (short) federal
> picture, then Part II for the award-set operative detail, then Part III for state matters.
>
> **Legal sources & links:** Fair Work Act 2009 (Cth) [FWA] and Fair Work Regulations 2009 [FWR],
> the NES, representative Modern Awards (General Retail MA000004, Clerks—Private Sector MA000002,
> Hospitality MA000009, Nurses MA000034), and state/territory long-service-leave and
> child-employment Acts. FWA sections link to AustLII; NES/award topics to fairwork.gov.au. 🔎 marks
> a figure or a deep link to confirm in the re-verification pass.

---

# Part I — The federal floor: National Employment Standards (NES)

## 1. What the NES fixes — and what it deliberately leaves to the Award

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **NES is the floor — 11 entitlements** | Commonwealth-wide minimum: (1) max weekly hours · (2) flexible-work requests · (3) casual conversion · (4) parental leave · (5) annual leave · (6) personal/carer's + compassionate + family/domestic-violence leave · (7) community service leave · (8) long service leave · (9) public holidays · (10) notice/redundancy · (11) Fair Work Information Statement. | A national-system employee with no applicable award still gets all 11 NES entitlements. | Superannuation was *added* to the NES from 1 Jan 2024 (money — out of scope). | [FWA Part 2-2, ss.61–131](https://www.fairwork.gov.au/employment-conditions/national-employment-standards) |
| **NES fixes no pay premiums** | The NES sets **no** overtime rate, penalty rate or shift loading — 100% Modern Award / enterprise agreement (Part II). | An award-free employee has no legal OT/penalty premium unless their contract grants one. | — | [FWA Part 2-2](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/) |

**What the NES does NOT fix** — the negative space that hands off to the Award layer. This map is the
practical meaning of "the federal floor is thin": each operative T&A lever below has **no** federal
rule, so its number is set one layer down (or is a policy choice).

| The NES does NOT fix… | Which means… | Where it's set → |
|---|---|---|
| **Overtime rate or onset** | no federal OT multiplier or trigger; award-free + silent contract = ordinary rate only | Award — Part II §8 |
| **Weekend / evening / night loadings & penalties** | no federal penalty or shift loading of any kind | Award — Part II §10–§11 |
| **Meal or rest breaks** | **no federal break entitlement at all** — award-free employee has no legal right to a break | Award — Part II §9 |
| **A daily-hours cap** | only the **weekly** 38h + qualitative "reasonable" test is federal; no per-day ceiling | Award daily span — Part II §8 |
| **Inter-shift rest minimum** | no federal minimum gap between the end of one shift and the next start | Award — Part II §9 |
| **Night-worker status / night-hours cap** | no EU-style night regime, hour cap or mandatory health-check | Award loading — Part II §10 |
| **Minimum engagement / reporting pay** | no federal floor on paid hours per attendance | Award — Part II §14 |
| **Punch tolerance / rounding** | no statutory rounding % or minutes | policy choice, constrained — Part I §6 |

## 2. Federal working-time floor

*Almost entirely **definitional** + **one qualitative cap**. Every actual number (OT onset, daily
span, break points) is pushed down to the award (Part II §8–§9). This section is what "thin" means.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **38h ordinary week (full-time)** | Full-time ordinary hours are capped at **38h/week**; hours beyond it are "additional hours", permitted only if *reasonable* (next row) and paid per the award. | A full-timer working 38h Mon–Fri is at the ordinary-hours ceiling; a 6h Saturday takes the week to 44h (additional hours). | Part-timers use the agreed pattern, not 38h (below). | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **"Reasonable additional hours" — the only federal cap** | Beyond 38h, hours may be *required* only if reasonable, weighing: health & safety risk; the employee's family/personal circumstances; notice given; whether OT/penalty rates are paid; the role's seniority; workplace operational needs; and industry-usual patterns. The employee may **refuse** unreasonable additional hours. There is **no numeric annual or weekly hard cap** — this qualitative test *is* the limit. | 44h with reasonable notice, award OT paid, no health/family conflict → likely reasonable. A demand for regular 50h+ weeks with no genuine agreement was held **unreasonable** in *AMIEU v Dick Stone* [2022] FCA 512. | Some awards additionally cap *daily* OT (Part II §8) — a per-day, not annual, limit. | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **No numeric federal OT cap — reasonableness is the only limit** | There is **no** NES **annual or weekly hard cap** on cumulative OT hours. The sole federal control is the qualitative **s.62 "reasonable additional hours"** test above: an employee can refuse unreasonable hours, but no number defines the ceiling. | An employee may lawfully work many OT hours in a year provided each demand is reasonable; conversely a *single* week can be unlawful if unreasonable — the limit is quality, not quantity. | — | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **Part-time — "ordinary hours" = the agreed pattern** | A part-timer's ordinary hours for threshold purposes = the regular pattern agreed at engagement, capped at the lesser of **38h** and that agreement. | Agreed pattern 20h/week → hours above 20h are "additional hours" or overtime per the award (Part II §8). | Award-specific whether excess-of-pattern hours are additional-hours-at-ordinary-rate or straight OT. | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **Working time = time actually worked under direction** | The 38h/week ceiling counts time the employee actually works under the employer's direction. | A 7.6h rostered shift with the worker on task throughout = 7.6h of working time. | Award hours-definitions may add detail (e.g. paid rest breaks count as time worked — Part II §9). | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **Authorised training counts as working time** | Time in employer-required training counts toward hours worked. | A 2h mandatory compliance course rostered mid-shift is working time. | — | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **Unpaid meal breaks are not working time** | A genuine unpaid meal break (worker free of duty) does **not** count toward the hours ceiling. | An 8.5h span with a 30-min unpaid meal break = 8h working time. | Paid rest breaks *do* count (Part II §9); a meal break where the worker stays on-call may count (standby test below). | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **Standby can itself be "working time" — the restriction test** | Whether standby/on-call time counts as working time turns on the **degree of restriction** on the worker (geographic confinement, response-time requirement) — a fact-specific test, not a fixed statutory rule. | A worker confined to premises with a 5-min response requirement is likely "working"; one merely reachable by phone at home likely is not. | The award/contract's standby regime shapes the facts; on-call *pay* is in Part II §13. | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **Case: restricted standby = "work" (Corporate Air Charter)** | The Full Federal Court (special leave refused / affirmed 2025) held **pilot standby duty counts as "work"** and must be included in average weekly hours, given the restrictions imposed during standby. | Pilots on restricted standby had that time counted toward their maximum weekly hours. | Outcome is fact-specific to the restrictions in the applicable regime. | *Corporate Air Charter v AFAP* (Full Federal Court; High Court 2025) 🔎 [AustLII search](https://www.austlii.edu.au/) |
| **Travel time — no NES rule** | The FWA sets **no** general rule on whether travel time is working time; it depends on the applicable award/agreement/contract. | Common award pattern: travel *during* ordinary hours is paid; the normal home→workplace commute is not; travel on an on-call recall is compensable (Part II §13). | Varies widely (building & construction awards often prescribe travel allowances/time). | (no NES provision); [award travel clause](https://www.fairwork.gov.au/employment-conditions/awards) |
| **Award-free averaging — up to 26 weeks (s.64)** | An award/agreement-*free* employer + employee may agree **in writing** to average ordinary hours over **up to 26 weeks**, provided the average stays **≤38h/week**. | Written agreement: 44h one week, 32h the next → 38h/week average, compliant. Five 10h days in a peak fortnight are fine if a quieter fortnight pulls the average to ≤38h/week. | Applies only to award/agreement-free employees. | [FWA s.64](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s64.html) |
| **Award-covered averaging — only as the instrument provides (s.63)** | For award/agreement-covered employees, averaging is permitted **only where the instrument itself provides for it** (period, hours-figure and span all award-set). | A 4-week roster-cycle clause averages ordinary hours before OT is assessed. | Where such a clause exists, averaging *is* OT-determining (Part II §8) — confirm the specific award. | [FWA s.63](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s63.html) |
| **Averaging is chiefly limit-validating, not OT-determining** | The default purpose of ss.63–64 averaging is to test compliance with the **38h ceiling**, not to net OT pay at period close — OT is decided per-shift/week against the award's own onset (Part II §8). | A closed averaging window doesn't retroactively create or cancel OT already earned under the span-of-hours rule. | Exception: award rostering-cycle clauses that decide when OT bites (row above). | [FWA ss.63–64](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s63.html) |

## 3. Public holidays — the NES right

*The NES gives the **right** (be absent, paid; be asked not required to work) and defines the
**calendar**. Any premium for *working* a holiday is award-set → Part II §11.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Public holiday — NES right to be absent, paid** | An employee may be absent on a public holiday (where based) without loss of pay for ordinary hours they would otherwise have worked. | Normally rostered 9am–5pm (8h) on Christmas Day, day off → paid 8h at base. | Any premium for *working* it is award-set (Part II §11). | [FWA ss.114, 116](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s114.html) |
| **Public holiday — employer may request, not require, work** | Same reasonableness architecture as s.62: operational needs, type of work, personal/family circumstances, compensation, notice, whether holiday work is usual for the role. | A Boxing Day request with a week's notice, paid at the award holiday rate, is more likely reasonable than a same-day, no-premium demand. | Employee may reasonably refuse. | [FWA s.114](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s114.html) |
| **Public-holiday calendar — national days** | ~**7–8 days observed nationally**: New Year's Day, Australia Day, Good Friday, Easter Monday, Anzac Day, Christmas Day, Boxing Day (+ Easter Saturday in most states). | 2026: New Year's Day Thu 1 Jan; Australia Day Mon 26 Jan; Good Friday Fri 3 Apr; Easter Monday Mon 6 Apr; Christmas Day Fri 25 Dec. | Easter Saturday and others vary by state. | [FWA s.115](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s115.html) · [2026 list](https://www.fairwork.gov.au/employment-conditions/public-holidays/2026-public-holidays) |
| **Public-holiday calendar — state/territory days** | **s.115** defines "public holiday" by each **state's/territory's own declared days**, so extra days differ by location. | Melbourne Cup Day is a paid holiday in Melbourne but an ordinary workday in Perth — a national employer tracks both calendars. | Each state/territory declares its own days (e.g. Labour Day on different dates). | [FWA s.115](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s115.html) · state declarations 🔎 |
| **Substitute-day rule** | Where an award/agreement/state declaration substitutes a different date, the public-holiday rules attach to the **substitute date**. | 2026: Boxing Day falls Sat 26 Dec → most states/territories (except SA) treat **Mon 28 Dec** as the holiday for those who don't normally work Saturdays. | Mechanism and covered employees are state/award-specific. | [FWA s.115](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s115.html) 🔎 |

## 4. Federal leave & entitlements

*This is where the NES **is** substantial — leave is quantified federally. (Long service leave is the
exception: state law → Part III §15.) Loading and the shiftworker 5th week are award-set but kept
here next to their leave.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Annual leave — 4 weeks, progressive accrual** | Full-time (pro-rated part-time) accrue **4 weeks/year**, credited progressively, rolling over indefinitely if unused. Casuals accrue **none** (compensated via the 25% loading, Part II §7). | Full-timer on 38h/week accrues 4 × 38 = **152h/year** (~2.92h/week); ~76h banked after 26 weeks. | — | [FWA s.87](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s87.html) |
| **Annual leave — 5th week for qualifying shiftworkers** | A qualifying "shiftworker" (broadly: regularly rostered across 7-day work incl. Sundays/holidays) accrues a **5th week** = 5 × 38 = **190h/year**. | A 7-day-rotation shift worker accrues 190h/year vs a day worker's 152h. | Shiftworker definition is award/agreement-specific. | [FWA s.87](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s87.html) |
| **Annual-leave cash-out — capped (s.93)** | Only where the award/agreement allows; needs a **separate written agreement each time**; must leave **≥4 weeks** still accrued; capped at **2 weeks** cashed out per 12 months. | An employee with 8 weeks banked may cash out up to 2 weeks, leaving ≥4. | Award/model-term-specific. | [FWA s.93](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s93.html) |
| **Excessive annual leave — employer may direct** | Once a balance is "excessive" (commonly **>8 weeks**, or **>10** for shift workers), the employer may **direct** the employee to take leave down, after consultation + reasonable notice. | A 10-week balance under an award treating >8 weeks as excessive → directed down to ~6 weeks. | Threshold is award/model-term-specific. | [FWA excessive-leave model term](https://www.fairwork.gov.au/leave/annual-leave/directing-an-employee-to-take-annual-leave) 🔎 |
| **Annual-leave loading — 17.5% (award-set, not NES)** | Most awards add a **17.5%** loading while leave is taken so pay doesn't drop for someone who'd normally earn OT/penalties. **Not** an NES entitlement. | 2 weeks (76h) at $30/h base = $2,280 + 17.5% ($399) = $2,679. | Some awards/agreements omit or cap it. | [award leave-loading clause](https://www.fairwork.gov.au/leave/annual-leave/annual-leave-loading) 🔎 |
| **Personal/carer's leave — 10 days/year** | Full-time (pro-rated part-time) accrue **10 days/year**, progressively, rolling over indefinitely. Casuals accrue none (2 days **unpaid** carer's leave per occasion instead). | — | — | [FWA s.96](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s96.html) |
| **Personal/carer's leave — a "day" = 1/10 of yearly ordinary hours (Mondelez)** | Since *Mondelez v AMWU* [2020] HCA 29, a "day" = **1/10 of the employee's ordinary hours over a year** (a fraction of ordinary hours), not a flat notional day — matters for compressed/variable rosters. | A full-timer on 4×9.5h shifts (38h) has 76h of entitlement, but each absence draws the day's **actual** 9.5h → exhausted after **8** rostered absences, not 10. | — | [Mondelez v AMWU [2020] HCA 29](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/cases/cth/HCA/2020/29.html) |
| **Compassionate (bereavement) leave — 2 days per occasion** | 2 days per occasion (death/life-threatening illness of an immediate family/household member; stillbirth; miscarriage). **Paid** for permanent employees, **unpaid** for casuals. Separate from the personal/carer's balance. | A household member's death → 2 days, on top of any personal/carer's balance. | — | [FWA ss.104–105](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s104.html) |
| **Family & domestic violence leave — 10 days/year, upfront** | Every employee (incl. casuals) gets a **fresh 10 days** each 12-month period, available **immediately** from day one — **not** accrued progressively, **resets** yearly (doesn't bank). | A casual who started 2 weeks ago can take up to 10 paid days immediately. | In force since 1 Feb 2023 (non-small) / 1 Aug 2023 (small business). | [FWA s.106A](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s106a.html) |
| **Unpaid parental leave — 12 months + right to request 12 more** | Up to **12 months** unpaid job-protected leave (permanent, or regular casual with 12 months' service); first parent may request a further **12 months** (refusable only on reasonable business grounds, written response in **21 days**); family cap **24 months**. | A parent takes 12 months, then requests another 12. | — | [FWA Div 5, Part 2-2](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/) |
| **Unpaid parental leave — concurrent-leave rules** | Both parents may take up to **12 months concurrently** (raised from an 8-week cap); concurrent leave immediately around the birth capped at **3 weeks** unless the employer agrees to more. | Both parents at the same employer each take 12 months from the birth date, fully concurrent — permitted. | — | [FWA Div 5, Part 2-2](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/) |
| **Government Paid Parental Leave (PPL) — downstream** | The leave day-event is the same absence captured above; the government PPL **payment** is a Services Australia scheme — funding is downstream money. | — | Not a FWA/NES entitlement. | [Paid Parental Leave Act 2010](https://www.servicesaustralia.gov.au/parental-leave-pay) |
| **Community service leave — jury duty (make-up pay)** | Make-up pay for the first **10 days** of jury service (employer tops the court allowance up to base rate for ordinary hours), except casuals; beyond 10 days is award/agreement-dependent. | A 15-day jury trial → make-up pay for the first 10 days, unpaid for the remaining 5 (unless the award extends it). | — | [FWA s.108](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s108.html) |
| **Community service leave — emergency management (unpaid)** | Voluntary emergency-management activity (e.g. volunteer firefighting) is **unpaid** under the NES, with no cap on total leave. | A volunteer firefighter deployed for a week takes unpaid community service leave. | Some awards/policies pay it. | [FWA s.108](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s108.html) |

## 5. Employment-type & process rights (federal)

*Federal status definitions and consultation/right-to-refuse mechanics. The **money** consequence of
type (casual loading) is award-set → Part II §7.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Casual — statutory definition** | "Casual" turns on the **real substance** at the *start* of employment: **no firm advance commitment to ongoing work** (weighing regularity, ability to accept/reject shifts, likelihood of continuing work). | A worker offered shifts week-to-week with no guarantee of ongoing work is casual even after a year of regular shifts. | Effective 26 Aug 2024 — replaced the earlier "regular and systematic" test. | [FWA s.15A](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s15a.html) |
| **Casual conversion — eligibility** | Eligible casual may notify in writing after **≥6 months'** service (**≥12 months** if employer is a small business, <15 employees), no related dispute in the prior 6 months. | A casual with 8 months' steady shifts at a 20-employee business is past the small-business bar → eligible. | Small business (<15 employees) raises the qualifying period to 12 months. | [FWA Div 4A, Part 2-2](https://www.fairwork.gov.au/starting-employment/types-of-employees/casual-employees) |
| **Casual conversion — employer response** | Employer must consult, then respond **in writing within 21 days**; may refuse only on specified grounds. | Employee notifies 1 Mar → employer's written decision due by 22 Mar. | — | [FWA Div 4A, Part 2-2](https://www.fairwork.gov.au/starting-employment/types-of-employees/casual-employees) |
| **Fixed-term contract — 2-year / 2-renewal cap** | May not exceed **2 years**, nor **2 consecutive** fixed-term contracts for the same work, absent a listed exception (seasonal, training, government-funded, high-income, specialised-skill, covering an absence). | 12-month contract renewed once (24 months, 1 renewal) is at the cap; a further renewal without an exception is **deemed permanent** by law. | In force since 6 Dec 2023; each hire gets a Fixed Term Contract Information Statement (§6). | [FWA Part 2-9 Div 5](https://www.fairwork.gov.au/starting-employment/types-of-employees/fixed-term-contract-employees) |
| **Flexible-working request — NES right to ask (s.65)** | Eligibility: **12 months'** continuous service (or a regular casual with 12 months + reasonable expectation of continuing) **and** a listed circumstance (parent/carer of school-age-or-younger child; carer; disability; age ≥55; family/domestic violence). Employer responds in writing within **21 days**; refusal only on reasonable business grounds, disputable at the FWC. | A parent of a 4-year-old requests 9–5 → 8–4 → employer must respond within 21 days. | — | [FWA s.65](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s65.html) |
| **Right to disconnect (s.333M)** | An employee may refuse to monitor/read/respond to work contact outside working hours, subject to a reasonableness test (reason for contact, method/disruption, compensation for availability, role/seniority, personal circumstances). | A worker at a 200-person firm ignores a non-urgent Friday-evening email until Monday — lawful. | Commenced 26 Aug 2024 (non-small business) / 26 Aug 2025 (small business) — both in force. | [FWA s.333M](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s333m.html) |
| **⚠ No unenacted reforms pending** | The recent reforms (casual definition s.15A, right to disconnect, fixed-term cap) have **all commenced** (small-business right-to-disconnect from 26 Aug 2025 was the last tranche). | — | — | — |

## 6. Recordkeeping & tolerance (federal)

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Time-and-wages records — kept 7 years** | Prescribed employee records must be made and kept **7 years**, legible, accessible, in English. | A record created in 2024 must remain retrievable through **2031**. | — | [FWA s.535](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s535.html) |
| **Records — errors corrected, not overwritten** | A later-found error must be **corrected and noted**, not silently overwritten. | A mis-recorded finish time is fixed with an annotated correction. | — | [FWR reg 3.44](https://www.fairwork.gov.au/workplace-problems/record-keeping-and-pay-slips) 🔎 |
| **Overtime records — hours or start/finish times** | Where OT penalty/loading is owed, the record must specify **either** OT hours worked each day **or** OT start/cease times. | A day with 3.4 OT hours on a public holiday must show the OT hours (or clock start/finish) + the premium applied. | — | [FWR reg 3.34](https://www.fairwork.gov.au/workplace-problems/record-keeping-and-pay-slips) 🔎 |
| **Averaging-agreement records** | Where hours are averaged by written agreement (§2), a **copy of the agreement** must be kept. | — | — | [FWR reg 3.35](https://www.fairwork.gov.au/workplace-problems/record-keeping-and-pay-slips) 🔎 |
| **Leave records** | A record of leave taken and the resulting **balance** must be kept; for cash-out, a copy of the agreement + rate/date. | — | — | [FWR reg 3.36](https://www.fairwork.gov.au/workplace-problems/record-keeping-and-pay-slips) 🔎 |
| **Pay slips — within 1 working day of pay day** | A pay slip must reach the employee within **1 working day** of payment, even if on leave. | Pay day Thursday → pay slip by the following Friday at latest. | — | [FWA s.536](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s536.html) |
| **Fair Work Information Statement (FWIS)** | Every new employee gets the FWIS before/soon after starting. | A new hire receives the FWIS in their first week. | — | [FWA s.125](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s125.html) |
| **Casual Employment Information Statement (CEIS)** | Every casual gets the CEIS at start, then again at **12 months** (small business) or at **6, 12, and every 12 months** thereafter (non-small business). | A casual at a 50-employee business gets it day 1, then ~6mo, ~12mo, and every 12 months. | Small-business schedule differs (single 12-month re-issue). | [FWA CEIS provisions](https://www.fairwork.gov.au/employment-conditions/national-employment-standards/casual-employment-information-statement) |
| **Fixed Term Contract Information Statement** | Every new fixed-term hire gets the Fixed Term Contract Information Statement (§5). | A 12-month contractor receives it at signing. | — | [FWA fixed-term provisions](https://www.fairwork.gov.au/starting-employment/types-of-employees/fixed-term-contract-employees) |
| **Tolerance / rounding — no statutory rule** | Australia sets **no** statutory rounding % or minutes; any punch-tolerance/rounding is a policy choice, constrained by the duty to record **actual** start/finish times and by unpaid-wages exposure if rounding systematically understates hours. | Rounding every start up to the next 15 min, if it systematically shorts the worker, risks an underpayment claim. | — | [FWR reg 3.34 (actual-times duty)](https://www.fairwork.gov.au/workplace-problems/record-keeping-and-pay-slips) 🔎 |

---

# Part II — The Award / enterprise-agreement layer

> **This is where the operative numbers live.** Every rate, penalty, loading, break point and
> minimum-engagement figure below is set by the **Modern Award** (or a registered enterprise
> agreement) covering the employee — **not** by the NES. Rows cite an award as their `Basis`
> deliberately: *that award is the law for that matter*. Award figures are **not universal** — the
> representative awards (General Retail MA000004, Clerks MA000002, Hospitality MA000009, Nurses
> MA000034) are worked examples; always confirm the award actually covering the classification.

> **The 10-award survey basis (added 2026-07-21).** The comparison matrices in this Part draw on ten
> representative Modern Awards, read from the **FWC consolidated award text / FWO pay guides
> consolidated to 1 July 2026 (FY2026-27)**: General Retail **MA000004**, Fast Food **MA000003**,
> Hospitality **MA000009**, Restaurant **MA000119**, Clerks—Private Sector **MA000002**, Road
> Transport **MA000038**, Nurses **MA000034**, SCHADS **MA000100**, Manufacturing **MA000010**,
> Building & Construction **MA000020**. Each rule family below states the **"usual" (modal) value**
> across these ten, then a matrix giving **every award's value**. **% multipliers are structural**
> (stable year to year); **$ figures are FY2026-27** and index annually. 🔎 marks a value not
> independently confirmed. These ten are a sample, not the full ~120 — always confirm the award
> actually covering the classification.

## 7. Coverage — is everyone on an award?

**No.** An employee sits in exactly one of three coverage states, and it determines whether the
operative numbers in §8–§14 apply at all.

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Three coverage states — award / EA / award-free** | (1) A **Modern Award** covers the classification (most award-reliant employees). (2) A registered **enterprise agreement** covers them (and displaces the award — below). (3) **Award-free**: no award classification fits — chiefly high-income earners on a written **guarantee of annual earnings** (high-income threshold ~**A$175,000** 🔎, indexed each 1 July) and senior managers/professionals outside all award classifications. An award-free employee gets the **full NES + their contract only** — **no OT, penalties, loadings or breaks** unless the contract grants them. | A store manager on a $190k guarantee of annual earnings is award-free: NES leave + 38h reasonableness apply, but MA000004's Sunday penalty does not. | Coverage is by **classification**, matched to the work actually performed — not by job title or by employer choice. | [FWA Part 2-3](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/) · [high-income threshold](https://www.fairwork.gov.au/pay-and-wages/minimum-wages/high-income-threshold) 🔎 |
| **Modern Award = one pay policy per arrangement** | ~120 Modern Awards (Fair Work Commission) each set OT onset+multiplier, weekend/holiday penalties, shift loadings, span of ordinary hours, breaks, minimum engagement, casual loading %, annualised-salary mechanics, RDO/TOIL. Model each award as a **separate** policy. | *General Retail* MA000004 vs *Clerks* MA000002 vs *Hospitality* MA000009 set different spans, breaks and premiums for the same nominal hours. | Award numbers are **not universal** — confirm the award actually covering the classification. | [FWA Part 2-3](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/) · [award list](https://www.fairwork.gov.au/employment-conditions/awards) |
| **Enterprise agreement can displace the award (collectively)** | A registered enterprise agreement replaces the award's terms for covered employees, provided it passes the Better Off Overall Test (BOOT). | A retailer's enterprise agreement may fold penalties into a flat rate — valid only if employees are better off overall than under MA000004. | Where an agreement applies, it — not the award — is the operative "pay policy". | [FWA Part 2-4](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/) |
| **Individual flexibility arrangement (IFA) — displaces terms individually (BOOT)** | Employer + individual employee may vary specific award terms (OT/penalty rates, allowances, leave loading) via a signed written arrangement; **no minimum tenure**; must leave the employee **better off overall** (BOOT). Terminable on notice (commonly 13 weeks). | An IFA folding the Saturday penalty into a flat higher hourly rate — valid only if the employee is better off overall. | Award's flexibility term sets the variable matters. | [FWA s.202](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s202.html) |
| **Casual loading — 25% in lieu of leave/notice (award-set)** | A casual's ordinary rate carries a loading (commonly **25%**, award-set) instead of paid leave, notice and redundancy. | Award base $25/h → casual ordinary rate **$31.25/h**. The T&A event is "hour worked, classified casual"; the loading is downstream money. | Exact % is award-set, not an NES figure — but confirmed **25% across all 10 surveyed awards** (§8e for how it stacks on OT). | [MA000004 casual clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |

## 8. Overtime (award-set)

### 8a. Onset / trigger

*An hour becomes overtime the moment it trips **any** of the award's triggers below — the four are
independent, so an hour under the daily cap can still be OT for breaching the weekly cap, the span,
or the consecutive-day rule. The NES fixes none of these numbers; each is award-set (Part I §1 map).*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No NES overtime rate — award sets every onset & the multiplier** | The NES treats overtime as a concept but fixes **no** trigger and **no** multiplier; both come from the award/agreement. The federal 38h week + "reasonable additional hours" test (Part I §2) is the only federal hook, and it sets *reasonableness*, not a pay trigger. | Award-free + silent contract → only the ordinary rate is owed for extra hours, no matter how long the day. | — | (no NES rate); [award OT clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances/overtime-pay) |
| **No federal daily-OT trigger — a long day is not automatically OT** | Unlike jurisdictions where passing a set daily hour (e.g. >8h) auto-triggers OT, Australia has **no** federal daily-hours OT trigger at all. A 10h day is **not** OT unless the *award's* daily-ordinary-hours clause (below), span, weekly cap, or consecutive-day rule is tripped. | An award-free employee working 11h in a day is owed only the ordinary rate for all 11h — no daily OT exists for them. | Common cross-border misconception — do **not** hard-code a daily-OT threshold; read it off the award. | (no NES provision); [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **Daily OT onset — beyond the day's ordinary-hours maximum (award-set)** | The most common *positive* trigger: OT starts once the day's hours exceed the award's **daily ordinary-hours maximum**, *even if the week is still under 38h*. Common maxima: *General Retail* MA000004 **9h/day** (11h on one day per week) 🔎; *Clerks* MA000002 **10h/day** 🔎. | A retail full-timer rostered 9h Mon–Wed is at the daily cap; a 10th hour on Wednesday is **daily OT**, regardless of the weekly total. | Some awards trigger off the *rostered* daily ordinary hours rather than a fixed maximum; the maximum varies award to award. | [MA000004 hours clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Weekly OT onset — beyond 38 ordinary hours (award-set)** | Hours over the **weekly ordinary-hours ceiling** (38h full-time, or the averaged-cycle equivalent, §8d) convert to OT at the award rate — this is the award giving a *pay* trigger to the federal 38h line (Part I §2), which by itself sets only reasonableness. | 38h Mon–Fri **+ a 6h Saturday = 6h of weekly OT** (paid per §8b) — even though no single day breached the daily cap. | Ceiling is the roster-cycle average where an averaging clause applies (§8d). | [award OT clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances/overtime-pay) 🔎 |
| **Consecutive-day OT — the 6th/7th day (award-set, where it exists)** | Some awards pay OT/penalty for work on the **6th or 7th consecutive day** worked in a week, **regardless of the hours total** — a day-count trigger, not an hours trigger. | An award may pay the 6th day at 150% (first hours) / 200%, even though the week's hours are still under 38. | Only some awards; the day-count and rate vary award to award. | [award OT clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances/overtime-pay) 🔎 |
| **Span of hours — an hour outside the ordinary window converts (award-set)** | The award fixes the daily **window** ("span") inside which hours count as ordinary; hours worked **outside** the span convert to overtime or a penalty rate, independent of shift length. | *Clerks* MA000002: ordinary hours Mon–Fri 7am–7pm, Sat 7am–12:30pm. A 6am–2pm weekday roster puts the 6–7am hour **outside the span** → OT/penalty even though the 8h shift length looks ordinary. | Span varies award to award; some define separate spans for day/afternoon/night shifts (§10). | [MA000002 hours clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000002-summary) 🔎 |
| **Part-time OT onset = the agreed pattern (award-set)** | For part-timers, OT (or "additional hours") starts above the **agreed pattern**, not the 38h line (Part I §2). | 20h/week agreed pattern, works 25h → 5 additional hours from the 21st, treated per the award's part-time clause. | Award-specific which (ordinary-rate additional hours vs straight OT). | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |

**Across the 10 surveyed awards — daily maximum, weekly ceiling & week-structure.** *Usual: the daily
ordinary maximum is **8h** in industrial/transport/care awards and **9–11.5h** in
retail/hospitality/clerical; **38h/week** is universal, averaged over up to 4 weeks (longer cycles
for shift/industrial). An explicit consecutive-day OT rule is **uncommon** — most awards are purely
hours-based.*

| Award | Daily ordinary max | Weekly (averaging) | Week-structure / consecutive-day |
|---|---|---|---|
| Retail (MA000004) | 9h (11h one day/wk) | 38h, ≤4-wk avg | Ord. hrs ≤5 days/wk (6 one week per 2-wk cycle); max 6 consecutive days |
| Fast Food (MA000003) | 11h | 38h, ≤4-wk avg | OT beyond 5 days/wk (6 if ≤4 the next week) |
| Hospitality (MA000009) | 11.5h | 38h, ≤4-wk avg | OT for days beyond 20 in a 4-wk period; min 8 days off/4 wks |
| Restaurant (MA000119) | 11.5h | 38h, ≤4-wk avg | none (hours-based) |
| Clerks (MA000002) | 10h | 38h, ≤4-wk avg | none |
| Road Transport (MA000038) | 8h | 38h, 7/14/21/28-day cycle | none |
| Nurses (MA000034) | 10h | 38h (76/fortnight, 152/28 days) | none |
| SCHADS (MA000100) | 8h (→10h by agmt) | 38h, ≤4-wk avg | none |
| Manufacturing (MA000010) | 8h (12h by agmt) | 38h, 152h/28 days | "each day stands alone"; Sat/Sun by agreement else OT |
| Construction (MA000020) | 8h | 38h, 20-day/4-wk RDO cycle | ordinary hrs **Mon–Fri only** — Sat/Sun auto-OT |

### 8b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **OT tiering — General Retail Award MA000004** | **Mon–Sat OT**: **150%** of the minimum rate for the first **3 hours**, then **200%**. **Sunday/public-holiday OT**: **200%** from the first hour (no 150% band). | Ordinary hours end 5pm, worker held to 9pm on a Wednesday (4 OT hours): first 3h at 150%, 4th hour at 200%. | Bands/escalation points are award-specific — not universal. | [MA000004 overtime clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **OT tiering — Hospitality Award MA000009 (second example)** | Full-time/part-time OT **150%** for the first **2 hours**, **200%** thereafter; **Sunday** OT **200%**; **public-holiday** OT **250%**. Casual OT is calculated on the casual (loaded) rate under the award's method. | A cook held 3 hours past rostered finish on a Tuesday: first 2h at 150%, 3rd hour at 200%. | Different escalation point (2h) than Retail's (3h) — shows why the award must be confirmed per employee. | [MA000009 overtime clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000009-summary) 🔎 |

**Across the 10 surveyed awards — OT rate bands.** *Usual: **150% for the first 2 hours, then 200%**
(7 of 10; Retail, Manufacturing and the SCHADS SACS stream use a 3-hour first band instead).
**Sunday OT = 200%** universally. **Public-holiday OT = 250%** in most awards; hospitality/restaurant
fold public-holiday work into a single 225% penalty with no separate OT band.*

| Award | Weekday (& Saturday) OT | Sunday OT | Public-holiday OT |
|---|---|---|---|
| Retail (MA000004) | 150% first **3h**, then 200% | 200% | 250% |
| Fast Food (MA000003) | 150% first 2h, then 200% | 200% | 250% |
| Hospitality (MA000009) | 150% first 2h, 200% (Sat OT flat 200%) | 200% | worked PH 225% (no separate OT band) |
| Restaurant (MA000119) | 150% first 2h, 200% (Sat 175%→200%) | 200% | worked PH 225% (no separate OT band) |
| Clerks (MA000002) | 150% first 2h, then 200% | 200% | 250% |
| Road Transport (MA000038) | 150% first 2h, then 200% | 200% | 250% (Good Friday/Christmas **300%**) |
| Nurses (MA000034) | 150% first 2h, then 200% | 200% | 250% |
| SCHADS (MA000100) | 150% first 2h, 200% (SACS stream: first **3h**) | 200% | 250% |
| Manufacturing (MA000010) | 150% first **3h**, then 200% (Sat min 4h) | 200% (min 3h) | 250% day / 200% continuous shift |
| Construction (MA000020) | 150% first 2h, then 200% (all Sat after noon 200%) | 200% | 250% |

### 8c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No numeric federal OT cap — reasonableness is the only limit** | There is **no** NES or award-typical **annual or weekly hard cap** on cumulative OT hours. The sole federal control is the qualitative **s.62 "reasonable additional hours"** test (Part I §2). | An employee may lawfully work many OT hours in a year provided each demand is reasonable; conversely a *single* week can be unlawful if unreasonable — the limit is quality, not quantity. | — | [FWA s.62](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s62.html) |
| **Some awards cap *daily* OT (award-set)** | A minority of awards limit consecutive OT hours or require a break after a set number — a **per-day**, not annual, control. | An award may bar more than a set run of OT hours without a rest break (see §9 inter-shift rest). | Award-specific; most awards set none. | [award OT clause](https://www.fairwork.gov.au/employment-conditions/awards) 🔎 |

### 8d. Averaging & annualisation

*The federal averaging mechanics (ss.63–64) live in Part I §2. What matters here: where an award's
**rostering-cycle clause** exists, averaging becomes OT-determining — it decides when OT bites.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Award rostering-cycle averaging — OT-determining (s.63)** | Where the instrument itself provides an averaging period, ordinary hours are averaged over the cycle **before** OT is assessed — so the cycle clause, not a single week, decides when OT bites. | A 4-week roster-cycle clause averages ordinary hours across the cycle before OT is calculated. | Only where the award provides it; period/hours-figure/span all award-set (confirm the specific award). | [FWA s.63](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s63.html) |

### 8e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No-pyramiding — an hour is paid at ONE rate, not stacked** | Each hour is classified **once**: it is either *ordinary* (and may then carry a weekend/evening **penalty** if worked at an unsociable time) **or** it converts to *overtime*. An hour that becomes overtime is paid the **overtime** rate **instead of** the penalty — you do **not** add the penalty and the OT rate on the same hour. | A retail worker's ordinary Sunday hour draws the Sunday penalty (e.g. 150%). If two hours are worked past the daily ordinary-hours cap, those hours convert to Sunday **overtime** (200%) **instead of** the Sunday penalty — the worker gets 200%, not 150%+200%. | Award-specific: a few awards **do** allow a night/shift loading to stack additively with an OT rate — confirm per award. | [award span+OT clauses](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances) 🔎 |
| **Casual loading × penalty — default is SUBSTITUTION** | Two models exist, but **most awards (including General Retail) use *substitution*** — the award publishes a **single all-in casual penalty rate that already contains the 25% loading**, so you do **not** add the loading again. A minority use *cumulative* (base + loading + penalty, all added). **To tell which:** if the award lists a separate "casual" column of penalty rates, it's substitution; if it says "casual loading applies in addition to penalties", it's cumulative. | *General Retail* MA000004 (substitution): casual Sunday rate **175%** — **not** 150% + 25% = 187.5%. Read the casual column directly; don't re-add the loading. | The model is award-specific — confirm before composing a casual's stacked rate. | [MA000004 casual/penalty clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |

**Across the 10 surveyed awards — how the casual loading stacks on OT.** *This is the per-award split
behind the two models in the row above. Two mechanics are confirmed: **(a) additive** — the 25%
loading is added as **+25 percentage points** to the F/T OT rate and published as an all-in casual
column (read it off; never multiply); **(b) compounded** — the OT multiplier is applied to the
**loaded** casual hourly rate (base × 1.25), so 150% OT → 187.5%. For **penalties** (Sat/Sun/PH) the
additive/all-in model dominates even in awards that compound for OT.*

| Award | Casual-OT model | Casual OT rate (first band) |
|---|---|---|
| Retail (MA000004) | Additive (+25pp, all-in column) | 175% → 225% |
| Fast Food (MA000003) | Additive (+25pp) | 175% → 225% |
| Clerks (MA000002) | Additive (+25pp) | 175% → 225% |
| Construction (MA000020) | Additive (+25pp) | 175% → 225% (PH 275%) |
| Road Transport (MA000038) | Additive but **+10pp** for OT (not 25) | 160% → 210% |
| Manufacturing (MA000010) | Compounded on loaded casual rate | 150% × 1.25 = **187.5%** → 250% |
| Nurses (MA000034) | Compounded (OT % on casual rate) | 150% of casual rate |
| SCHADS (MA000100) | Compounded (contested 🔎) | 150% of casual rate 🔎 |
| Hospitality (MA000009) | On loaded rate 🔎 | 🔎 |
| Restaurant (MA000119) | On loaded rate 🔎 | 🔎 |

## 9. Rest, breaks & inter-shift limits (award-set)

*Hard limits & thresholds → flag a breach, don't silently cap hours. The NES mandates **no** breaks
at all (Part I §1); everything here is award-set.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **NES mandates NO breaks — breaks are award-based** | The National Employment Standards contain **no** meal- or rest-break entitlement at all. Every break right comes from the applicable **Modern Award or enterprise agreement** (virtually all awards prescribe them, but the statutory floor is silent). | An award-free employee has **no legal right to any break** unless their contract grants one. | This is the key correction: "does Australia require a break?" — **not federally by statute**; the award does. | [FWA NES](https://www.fairwork.gov.au/employment-conditions/hours-of-work-breaks-and-rosters/breaks) |
| **Meal break — unpaid, once a shift exceeds ~5h (award-set)** | Common award pattern: an **unpaid** meal break of **30–60 min** once a shift exceeds **5h**; no stretch may run past 5h without one. | *General Retail* MA000004: a shift over 5h must include an unpaid meal break — it can't run straight through the 5h mark. | Threshold/duration is award-specific; some awards make shiftworkers' meal breaks **paid**. | [MA000004 breaks clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Rest break — paid, once a shift exceeds ~4h (award-set)** | Common award pattern: one **paid 10-min** rest break (counts as time worked) once a shift exceeds **4h**; a shift under 4h earns none. | An 8h shift includes one paid 10-min rest break, on top of the unpaid meal break once the 5h mark is reached. | Longer shifts may earn a second rest break under some awards. | [MA000004 breaks clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Minimum break between shifts — inter-shift rest (award-set)** | Common award figure: **12h** between the end of one day's work and the next start, reducible to **10h** by agreement. | *General Retail*: finish 11pm, rostered back 7am (8h gap, below the 10h minimum) → the early shift's hours draw a penalty rate until the rest period would have elapsed. | A breach doesn't ban the roster; it typically triggers a penalty rate for the encroaching hours. Some awards allow shortening below 10h at changeover. | [MA000004 break-between-shifts clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Broken (split) shift — definition** | Two work periods in a day separated by an **unpaid gap >1h** = a broken/split shift (as opposed to a normal meal-break pause). | *Hospitality* MA000009: 7am–11am then 5pm–9pm (unpaid 6h gap) is a broken shift. | The minimum gap that makes a shift "split" varies by award. | [MA000009 broken-shift clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000009-summary) 🔎 |
| **Broken shift — 12h spread cap** | The day's overall **spread of hours** (first start to last finish) is capped, commonly at **12h**, often with a split-shift allowance payable regardless. | 7am–9pm across a broken shift = a 14h spread → breaches a 12h cap unless the award allows an extension. | Spread cap varies by award. | [MA000009 broken-shift clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000009-summary) 🔎 |

**Across the 10 surveyed awards — meal, rest & inter-shift rest.** *Usual: an **unpaid 30–60 min meal
break once a shift exceeds ~5h** (near-universal; Manufacturing's minimum is 20 min), plus **one paid
~10-min rest break** past ~4h (hospitality/restaurant use 20 min; care awards give a paid 10-min
break every 4h). **Inter-shift rest = 10h** (Retail's 12h is the high outlier), commonly reducible to
**8h**; a breach usually triggers **200% until the rest is taken**, not a hard ban.*

| Award | Meal break | Paid rest break | Inter-shift rest |
|---|---|---|---|
| Retail (MA000004) | Unpaid 30–60m, >5h (2 if ≥10h) | 10m: 1 (4–7h), 2 (7h+) | **12h**, → 10h by agmt; breach 200% |
| Fast Food (MA000003) | Unpaid 30–60m, ≥5h (2 if ≥9h) | 10m: 1 (4–9h) | none |
| Hospitality (MA000009) | Unpaid ≥30m, >5h | **20m**: 1 (>8h), 2 (>10h) | 10h, → 8h at changeover |
| Restaurant (MA000119) | Unpaid ≥30m, 5h+ (+50% if late) | **20m**: 1 (5–10h), 2 (>10h) | 10h; 8h after OT |
| Clerks (MA000002) | Unpaid 30–60m, >5h; work-through 200% | 10m: 1 (>3–8h), 2 (>8h) | 10h; else 200% |
| Road Transport (MA000038) | Unpaid 30–60m, start 3.5–5.5h in; 200% | 20m before OT, then each 4h | 10h after OT; else 200% |
| Nurses (MA000034) | Unpaid 30–60m, >5h | 10m each 4h | 10h, → 8h by agmt |
| SCHADS (MA000100) | Unpaid 30–60m, >5h | 10m each 4h | 10h, → 8h by agmt |
| Manufacturing (MA000010) | Unpaid **min 20m**, not >5h without; cont. shift 20m **paid** | 10m (staff roles); OT crib 20m/4h | 10h, → 8h; else 200% |
| Construction (MA000020) | Unpaid ≥30m noon–1pm; shift 30m **paid** | 10m (9–11am); OT crib | 10h; else 200% (12h after 20h worked) |

**Across the 10 surveyed awards — split/broken shifts.** *Only **hospitality and care awards** have a
split-shift regime; retail, clerical, industrial and transport awards have none. Where it exists: 2+
work periods split by an unpaid gap >1h, overall **spread capped at 12h**, with a per-day split-shift
allowance.*

| Award | Split-shift regime | Spread cap | Split-shift allowance (FY2026-27) |
|---|---|---|---|
| Hospitality (MA000009) | 2+ periods, unpaid gap >1h, each ≥2h | 12h | $3.69/day ($5.60 if a break >3h); loaded-rate $1.91 |
| Restaurant (MA000119) | "Broken working day" — periods beyond the meal break | 12h | $5.60 per work period of 2h+ |
| SCHADS (MA000100) | ≤2 unpaid breaks (≤3 portions), by agreement | 12h (>12h = double time) | $21.81 (1 break) / $28.87 (2 breaks) |
| Retail · Fast Food · Clerks · Road Transport · Nurses · Manufacturing · Construction | none | — | — |

## 10. Night & shift work (award-set)

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Shift-type definitions — day / afternoon / night (award-set)** | Awards classify shifts by start/finish window into named types (day worker, afternoon shift, night shift), each with its own conditions/loading. | A shift starting 2pm, finishing 10pm is an "afternoon shift", drawing an afternoon-shift loading distinct from the day rate. | Classification thresholds vary award to award; can change which break/engagement clause applies. | [award shift-definitions clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances) 🔎 |
| **Evening loading — Mon–Fri after 6pm (award-set)** | Common pattern: ordinary hours after **6pm** paid at **125%** (F/T·P/T) or **150%** (casual) — distinct from weekend penalties (§11). | *General Retail* MA000004: a 2pm–8pm Tuesday shift → 2–6pm at day rate, 6–8pm evening-loaded. | Loading % and trigger time vary award to award. | [MA000004 evening-work clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Deeper-night band (award-set, where it exists)** | Some awards define a separate late-night band (e.g. **midnight–6am**) at a higher loading. | An award may pay a higher % for hours after midnight than for the 6pm–midnight evening band. | Only some awards; band and % vary. | [award shift clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances) 🔎 |
| **No NES night-worker status or hour cap** | Unlike EU-style "night worker" rules, the FWA sets **no** night-specific hour cap or mandatory health-check regime — night hours are handled purely via the award loading + general rest breaks (§9). | — | — | (no NES provision) |

**Across the 10 surveyed awards — shift loadings.** *Usual: an **afternoon/evening loading of
~12.5–17.5%** and a **night loading of ~15%**, rising to **~30% for permanent (non-rotating) night**
shifts (Clerks, Road Transport, Manufacturing, civil Construction). Retail applies **+25% (125%)** to
ordinary evening work after 6pm; **hospitality/restaurant use a flat $/hr** loading, not a %. Trigger
times vary (evening band starts 6pm–10pm).*

| Award | Afternoon / evening | Night | Permanent (non-rotating) night |
|---|---|---|---|
| Retail (MA000004) | Ord. after 6pm: 125% (csl 150%) | Shiftwork (start ≥6pm): 130% (csl 155%) | — |
| Fast Food (MA000003) | 10pm–midnight: 110% (csl 135%) | midnight–6am: 115% (csl 140%) | — |
| Hospitality (MA000009) | 7pm–midnight: **+$2.95/hr** flat | midnight–7am: **+$4.42/hr** flat | — |
| Restaurant (MA000119) | 10pm–midnight: **+$2.95/hr** flat | midnight–6am: **+$4.42/hr** flat | — |
| Clerks (MA000002) | Afternoon shift 15% | Rotating night 15% | **30%** |
| Road Transport (MA000038) | Afternoon 17.5% | Night 30% | (night 30%) |
| Nurses (MA000034) | 12.5% (start ≥noon, finish >6pm) | 15% (start ≥6pm) | — |
| SCHADS (MA000100) | 12.5% (finish >8pm ≤midnight) | 15% (finish >midnight / start <6am) | — |
| Manufacturing (MA000010) | 115% (finish after 6pm) | 115% | **130%** |
| Construction (MA000020) | General 125–150%; civil 115% | General 150%; civil 115% | Civil **130%** |

## 11. Weekend & worked-public-holiday premiums (award-set)

*The public-holiday **right** (absent, paid) and the **calendar** are NES → Part I §3. The premium
for *working* a weekend or holiday is award-set and lives here. Applies to **ordinary** (non-OT)
hours only — once hours convert to OT, the no-pyramiding rule in §8e governs.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Saturday penalty — ordinary hours (award-set)** | *General Retail* MA000004: Saturday ordinary hours **125%** (F/T·P/T) / **150%** (casual). | A full-timer's 6h Saturday shift = 6h at 125%; a casual's = 6h at 150%. | Applies to *ordinary* (non-OT) hours only (§8e). Rates vary award to award. | [MA000004 penalty-rates clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Sunday penalty — ordinary hours (award-set)** | *General Retail* MA000004: Sunday ordinary hours **150%** (F/T·P/T) / **175%** (casual, all-in). | A full-timer's 6h Sunday shift = 6h at 150%; a casual's = 6h at 175% (substitution, §8e). | Rates vary award to award. | [MA000004 penalty-rates clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Worked-public-holiday premium (award-set)** | *General Retail* MA000004: working a public holiday paid at **225%** (F/T·P/T) or **250%** (casual, all-in) of base. 🔎 current-rate confirmation pending. | 7h worked on Christmas Day = 7h at 225%; a colleague off is paid 7h at 100% (Part I §3). | Rate varies award to award; casual figure is commonly an all-in substitution rate (§8e). | [MA000004 public-holiday clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |

**Across the 10 surveyed awards — Saturday / Sunday / worked-public-holiday (ordinary hours).**
*Usual (F/T): **Saturday 125%** in service/clerical awards, **150%** in care/industrial; **Sunday
150%** in retail/hospitality but **175–200%** in care/clerical/industrial; **worked public holiday
225%** in service awards, **250%** elsewhere. **Casuals add +25 percentage points** to each (read the
all-in casual column). In industrial/construction, Saturday and Sunday are often **OT-only** (no
ordinary weekend hours).*

| Award | Saturday (F/T / casual) | Sunday (F/T / casual) | Worked PH (F/T / casual) |
|---|---|---|---|
| Retail (MA000004) | 125% / 150% | 150% / 175% | 225% / 250% |
| Fast Food (MA000003) | 125% / 150% | 125–150% / 150–175% (by level) | 225% / 250% |
| Hospitality (MA000009) | 125% / 150% | 150% / 175% | 225% / 250% |
| Restaurant (MA000119) | 125% / 150% | 150% / 175% | 225% / 250% |
| Clerks (MA000002) | 125% / 150% | 200% / 225% | 250% / 275% |
| Road Transport (MA000038) | 150% / 175% (by agmt) | 200% / 225% (by agmt) | 250% / 275% (GF·Xmas 300/325) |
| Nurses (MA000034) | 150% / 150% | 175% / 175% | 250% |
| SCHADS (MA000100) | 150% | 200% | 250% |
| Manufacturing (MA000010) | 150% (where Sat ord. agreed) | 200% | 250% day / 200% cont. shift |
| Construction (MA000020) | OT-only (shift 150%) | OT-only 200% | 250% / 275% |

## 12. Time banking & time-off-in-lieu (award-set)

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Rostered days off (RDOs) — banked ordinary hours (award-set)** | Not an NES entitlement. The roster works slightly longer each day; the accumulated surplus banks into a full paid day off. Banked time is **ordinary** pay, not overtime-derived. | Nominal 8h day but 8.4h rostered → the extra 0.4h/day over a 20-day cycle banks 8h = 1 RDO. | Cycle length and accrual rate vary by award/agreement. | [award RDO clause](https://www.fairwork.gov.au/employment-conditions/hours-of-work-breaks-and-rosters/rosters) 🔎 |
| **TOIL — ordinary-rate model (award-set)** | Overtime exchanged for time off at **1h off per 1 OT hour**, regardless of the OT multiplier. | 2 OT hours → 2h TOIL banked. | Requires the employee's agreement; must be taken within a window or paid out. | [award TOIL clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances/overtime-pay) 🔎 |
| **TOIL — overtime-rate model (award-set)** | Overtime banked at the same tiered multiplier — e.g. **1.5h banked per 1h worked at 150%**. | 2 OT hours at 150% → **3h TOIL banked**, taken within the award's window or cashed out. | Ratio and expiry window are award/agreement-specific. | [award TOIL clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances/overtime-pay) 🔎 |

**Across the 10 surveyed awards — TOIL & RDO.** *All 10 permit **TOIL by written agreement**
(commonly taken within 6 months or paid out). The banking model splits: some bank at the **OT
multiplier** (Retail, Fast Food, Nurses, SCHADS — e.g. 3h off per 2h at 150%), others
**hour-for-hour** (Clerks, Manufacturing, Construction, Hospitality, Restaurant). **RDO/ADO systems
are common** — working slightly longer to bank a paid day off over a 4-week/20-day cycle, banked up
to ~5 — strongest in construction/industrial/clerical; Fast Food has none.*

| Award | TOIL model | RDO / ADO |
|---|---|---|
| Retail (MA000004) | OT-value (2h@150% = 3h off); within 6mo | Yes — 4-wk cycle, bank ≤5 |
| Fast Food (MA000003) | OT-value; within 6mo | none |
| Hospitality (MA000009) | Hour-for-hour (ord. rate) | ADO via 4-wk averaging |
| Restaurant (MA000119) | Hour-for-hour (ord. rate) | Roster-based, no formal ADO |
| Clerks (MA000002) | Hour-for-hour | Yes — 8h days/4-wk → ~12/yr, bank ≤5 |
| Road Transport (MA000038) | By written agreement | Yes — within cycle, bank ≤10 days |
| Nurses (MA000034) | OT-value | ADO under 28-day averaging |
| SCHADS (MA000100) | OT-value | ≥2 days off/wk (rostered) |
| Manufacturing (MA000010) | Hour-for-hour; within 6mo | Facilitative (e.g. 19-day month) |
| Construction (MA000020) | Hour-for-hour; within 6mo (not casual/daily-hire) | Core — 20-day/4-wk, 0.4h/day → RDO after 19 days, bank ≤5 |

## 13. On-call & standby (award-set)

*Whether standby *counts as working time* is the federal restriction test → Part I §2. The
**allowance/pay** for it is award-set and lives here.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **On-call allowance — a per-period $ figure (award-set)** | Many awards set a flat allowance per 24h (or per shift) on-call period, with a higher weekend/public-holiday rate. | *Nurses Award* MA000034: ~**$21.80** per 24h off-duty on-call period; ~**$43.60** on a public holiday. 🔎 confirm current indexed figures. | Allowance $ and period length vary award to award; the T&A event is "on-call, period X, day-type Y". | [MA000034 on-call clause](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000034-summary) 🔎 |
| **Recall-to-work / call-back — minimum payment (award-set)** | When recalled after leaving, a **minimum payment** (commonly **3h**, some **1.5h**) at the applicable OT rate applies regardless of actual job length. | Called back overnight for a 45-min job → paid a minimum of 3h at the OT rate (commonly 200%). | Minimum-hours figure and rate vary award to award. | [award recall clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances) 🔎 |
| **On-call recall travel — compensable (award-set)** | Travel required as part of an on-call recall is commonly compensable (unlike the ordinary commute — Part I §2). | An on-call worker recalled at 2am is commonly paid for the travel to site. | Award/agreement-specific. | [award recall clause](https://www.fairwork.gov.au/pay-and-wages/penalty-rates-and-allowances) 🔎 |

**Across the 10 surveyed awards — on-call & recall.** *Usual: **most awards have no on-call allowance
at all** (Retail, Fast Food, Hospitality, Restaurant, Clerks, Construction). Where it exists it's the
**care awards** — a flat $/24h, higher on weekends/PH, plus SCHADS sleepovers; industrial/transport
treat standby as **paid at the ordinary rate**. **Recall/call-back minimum is commonly 3h at the OT
rate** (range 2–4h).*

| Award | On-call / standby allowance | Recall / call-back minimum |
|---|---|---|
| Retail (MA000004) | none | Greater of travel time or **3h** at appropriate rate |
| Fast Food (MA000003) | none | none (Sunday-OT min 4h if not adjoining) |
| Hospitality (MA000009) | none (overnight-stay $67.15) | none (RDO work 200%) |
| Restaurant (MA000119) | none | RDO work min 4h at OT |
| Clerks (MA000002) | none | **3h** at OT |
| Road Transport (MA000038) | Standby paid at ordinary rate | OT rates; no fixed min-hours 🔎 |
| Nurses (MA000034) | ~$28.66 M–F / $43.17 Sat / $50.37 Sun-PH per 24h 🔎 | **3h** (attend) / 1h (remote) at OT |
| SCHADS (MA000100) | $25.66 M–F / $50.81 wkend-PH per 24h; sleepover **$62.87/night** | **2h** at OT |
| Manufacturing (MA000010) | Standby paid at ordinary rate | **4h** day worker / 200% shift; readiness 3h |
| Construction (MA000020) | none | **3h** (civil shift 3h at 200%) |

## 14. Scheduling & premium pay (award-set)

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Minimum engagement — floor on paid hours per attendance (award-set)** | A rostered worker who turns up must be paid at least a floor number of hours ("reporting pay"), even if sent home early. There is **no** federal minimum-engagement floor. | *General Retail* MA000004: minimum casual engagement **3h** — a casual rostered and sent home after 2h is still paid 3h. | Floor varies award to award. | [MA000004 cl. 11.3](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Minimum engagement — school-student carve-out (award-set)** | Some awards reduce the floor for a secondary-school student. | *General Retail*: **1.5h** for a student rostered 3–6:30pm on a school day, by parental agreement, where a longer engagement isn't operationally possible. | Award-specific carve-out. | [MA000004 cl. 11.3](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000004-summary) 🔎 |
| **Annualised salary — outer limits (award-set)** | A single annualised salary can cover ordinary hours, OT, penalties and allowances within a specified **"outer limit"**; hours beyond it must be paid separately. | *Clerks* MA000002 cl. 18: a salary with a **12 OT-hours/month** outer limit — 15 OT hours in a month means 3 hours are separately paid. | Outer-limit figures vary award to award (2020 model clauses). | [MA000002 cl. 18](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000002-summary) 🔎 |
| **Annualised salary — mandatory reconciliation (award-set)** | Employer must record start/finish times and unpaid breaks each pay period, and **reconcile** award-derived entitlement vs salary paid **every 12 months (or on termination)**, topping up any shortfall. | At the 12-month mark the employer compares what the award would have paid vs the salary and pays any gap. | Reconciliation cadence is award-specific. | [MA000002 cl. 18](https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000002-summary) 🔎 |

---

**Across the 10 surveyed awards — minimum engagement & annualised salary.** *Usual: minimum
engagement of **3h** is most common (Retail, Fast Food, Clerks), with **2h** in care/hospitality and
**4h** in industrial/transport; Retail adds a **1.5h school-student** carve-out. About **half** the
awards carry an **annualised-wage clause** (Clerks, Hospitality, Restaurant, Manufacturing-limited);
its 2020-model mechanics are consistent — a written agreement specifying **outer-limit** ordinary
(penalty) + OT hours, excess paid separately, **12-month reconciliation**, shortfall within 14 days.*

| Award | Minimum engagement | Annualised-wage clause |
|---|---|---|
| Retail (MA000004) | PT 3h; casual 3h (student 1.5h) | none |
| Fast Food (MA000003) | PT 3h; casual 3h | none |
| Hospitality (MA000009) | casual 2h; PT 3h | Yes (cl 24) — ≤18 penalty ord. hrs & ≤12 OT hrs/wk |
| Restaurant (MA000119) | casual 2h; PT 3h | Yes (cl 20) — similar outer limits |
| Clerks (MA000002) | PT 3h; casual 3h | Yes (cl 18) — outer-limit ord. + OT hours |
| Road Transport (MA000038) | PT 4h; casual 4h | none |
| Nurses (MA000034) | casual 2h | none |
| SCHADS (MA000100) | 2h (home care/disability) / 3h (SACS) | none |
| Manufacturing (MA000010) | PT/casual 4h (→3h by agmt) | Yes (cl 28) — Supervisor/Trainer/Coordinator L I–II only |
| Construction (MA000020) | casual 4h; PT no fixed min | none |

---

# Part III — The state / territory layer

> Long service leave, minors/child employment, and — **in Western Australia only** — the whole
> industrial-relations system for non-corporate employers (§17) are governed by **state/territory**
> Acts, **not** the FWA. Figures are **not interchangeable** between states — confirm the state the
> employee works in.

## 15. Long service leave (state Acts)

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Long service leave — NSW** | **10 years** → **8.67 weeks**; pro-rata after **5 years**. | At 10 years' service a NSW employee takes 8.67 weeks paid. | State Act — figures not interchangeable with other states. | [LSL Act 1955 (NSW)](https://www.nsw.gov.au/employment/long-service-leave) 🔎 |
| **Long service leave — Victoria** | **1/60-of-service** formula; access at **7 years** → **~6.07 weeks**; **8.67 weeks** at 10yr; **13 weeks** at 15yr. | 364 weeks' service ÷ 60 = **6.07 weeks** at the 7-year access point. | Shortest access point of the states. | [LSL Act 2018 (Vic)](https://www.vic.gov.au/long-service-leave) 🔎 |
| **Long service leave — Queensland** | **10 years** → **8.67 weeks**; pro-rata after **7 years** (limited reasons). | At 10 years a QLD employee takes 8.67 weeks. | State Act. | [LSL — Business Queensland](https://www.business.qld.gov.au/running-business/employing/employee-rights/leave/long-service) 🔎 |
| **Long service leave — Western Australia** | **10 years** → **8.67 weeks**; pro-rata after **7 years**. | At 10 years a WA employee takes 8.67 weeks. | State Act. | [LSL Act 1958 (WA)](https://www.commerce.wa.gov.au/labour-relations/long-service-leave) 🔎 |
| **Long service leave — South Australia** | **10 years** → **13 weeks**; pro-rata after **7 years**. | At 10 years an SA employee takes **13 weeks** — ~50% more than the 8.67-week states at the same milestone. | Larger quantum than most states. | [LSL Act 1987 (SA)](https://www.safework.sa.gov.au/) 🔎 |
| **Long service leave — Tasmania** | **10 years** → **8.67 weeks**; pro-rata after **7 years**. | At 10 years a TAS employee takes 8.67 weeks. | State Act. | [LSL Act 1976 (Tas)](https://worksafe.tas.gov.au/) 🔎 |
| **Long service leave — Northern Territory** | **10 years** → **13 weeks**; pro-rata after **7 years**. | At 10 years an NT employee takes **13 weeks**. | Larger quantum. | [LSL Act 1981 (NT)](https://nt.gov.au/employ/for-employees-in-nt/long-service-leave) 🔎 |
| **Long service leave — ACT** | **7 years** → **6.07 weeks**, +**1.086 weeks/year** thereafter; pro-rata after **5 years**. | At 7 years an ACT employee takes 6.07 weeks. | State Act. | [LSL Act 1976 (ACT)](https://www.worksafe.act.gov.au/health-and-safety-portal/safety-topics/long-service-leave) 🔎 |

## 16. Minors & child employment (state Acts)

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Minors — age floor & permit regime (state law)** | Set by **state/territory**, not the FWA. Victoria: general minimum age **13** (11 for delivery work; none in a family business); a **permit** is required to employ a child <15. | A Victorian employer must hold a child-employment permit to roster a 14-year-old. | Every state/territory has its own Act with different age floors and permit regimes — confirm the state. | [Child Employment Act 2003 (Vic)](https://www.vic.gov.au/child-employment) 🔎 |
| **Minors — term-time hour caps (state law)** | Victoria: **school term** ≤**3h/day · 12h/week**; **no work during school hours** on a school day. | A 14-year-old in Victoria: max 3h on a school day, never during school hours, ≤12h that week. | State-specific figures. | [Child Employment Act 2003 (Vic)](https://www.vic.gov.au/child-employment) 🔎 |
| **Minors — holiday hour caps (state law)** | Victoria: **school holidays** ≤**6h/day · 30h/week**; **30-min break per 3h** worked. | A 14-year-old in Victoria in the holidays: up to 6h/day, 30h/week, with a 30-min break each 3h. | State-specific figures. | [Child Employment Act 2003 (Vic)](https://www.vic.gov.au/child-employment) 🔎 |
| **Minors — 30-min break per 3h worked (state law)** | Victoria: a **30-min** break for each 3h worked, plus **12h** between shifts. | A 14-year-old working a 6h holiday shift in Victoria gets two 30-min breaks. | State-specific; see §16 rows above. | [Child Employment Act 2003 (Vic)](https://www.vic.gov.au/child-employment) 🔎 |

## 17. State industrial-relations systems — the WA non-national-system carve-out

*This is the one place where **overtime, breaks and hours themselves** live in state law, not the
award. Before 2009 workplace relations was a **patchwork of overlapping state and federal systems**;
the **Fair Work Act 2009** consolidated it into a single **National Workplace Relations System**, so
today the federal/award stack (Parts I–II) is the whole picture for virtually every private-sector
employee — **except** the WA employers that were never referred to it. WA runs a **parallel state IR
system** for them. If a customer asks "doesn't overtime live in the states?" — this section is the
answer: **only in WA, and only for non-corporate employers.***

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **National-system coverage — the FWA reaches constitutional-corporation employers** | The FWA governs **"national-system"** employers/employees: **trading/financial corporations** (Pty Ltd, Ltd) everywhere, **plus** — by each state's **referral of powers** — *all* private-sector employers in NSW, Vic, Qld, SA and Tas. For them Parts I–II are the **complete** T&A law; **no** state OT/penalty/break regime applies on top. | A Pty Ltd retailer in Perth **is** a constitutional corporation → national-system → MA000004 sets its OT, not any WA state instrument. | Referral dates: Vic 1996; NSW/Qld/SA/Tas 2009–10. The ACT & NT are always national-system. | [FWA s.14 (national-system employer)](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/s14.html) |
| **WA non-national-system employers — OT/breaks/hours come from WA state law** | Western Australia **did not refer** its powers for employers that are **not** constitutional corporations — **sole traders, partnerships, other unincorporated businesses, and non-trading corporations**. Their **overtime, penalties, breaks, hours and minimum conditions** come from the **WA state system**: the *Industrial Relations Act 1979 (WA)*, **WA state awards**, and the *Minimum Conditions of Employment Act 1993 (WA)* — **not** the NES or the Modern Awards. | A WA **sole-trader** café: its staff draw OT and breaks from the applicable **WA state award + MCE Act**, not from Hospitality MA000009. Model these employees as a **separate jurisdiction**, not an award variant. | This carve-out is **WA-only**. Whether a WA employer is "national-system" turns on its **legal structure** (incorporated & trading vs. not), not its industry. | [IR Act 1979 (WA)](https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_468_homepage.html) 🔎 · [MCE Act 1993 (WA)](https://www.legislation.wa.gov.au/legislation/statutes.nsf/main_mrtitle_586_homepage.html) 🔎 · [Wageline WA](https://www.wa.gov.au/service/employment/workplace-arrangements/wageline-information-western-australian-employers-and-employees) 🔎 |
| **Public sector & local government — may stay in a state system (all states)** | Beyond the WA carve-out, **state & local-government employees** and parts of the **state public sector** can remain under their **own state's IR system** (state awards/agreements) rather than the FWA, because the states' referrals **excluded** their public sectors. | A NSW **local-council** worker may be covered by the **NSW state** IR system + NSW awards, not the FWA — so their OT is set by a NSW state instrument. | Applies in every state to the public sector; the **private** sector outside WA is uniformly national-system. Coverage is fact-specific — confirm the employing entity. | [NSW Industrial Relations Act 1996](https://legislation.nsw.gov.au/view/html/inforce/current/act-1996-017) 🔎 · state IR commissions |

---

## Sources (requirements section)

- **Fair Work Act 2009 (Cth):** AustLII consolidated Act (per-section links in the Basis column) —
  [fwa2009114](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/legis/cth/consol_act/fwa2009114/); full text at
  [legislation.gov.au C2009A00028](https://www.legislation.gov.au/C2009A00028/latest/text).
- **National Employment Standards & plain-English guidance:** [fairwork.gov.au — NES](https://www.fairwork.gov.au/employment-conditions/national-employment-standards),
  breaks, hours of work, penalty rates, leave, public holidays, record-keeping, right to disconnect,
  casual & fixed-term information statements.
- **Modern Awards — the 10-award survey (Part II matrices, researched 2026-07-21).** Read from the
  **FWC consolidated award text** ([fwc.gov.au](https://www.fwc.gov.au/agreements-awards/awards)) and
  **FWO pay guides** ([awards.fairwork.gov.au](https://awards.fairwork.gov.au/) ·
  [calculate.fairwork.gov.au](https://calculate.fairwork.gov.au/)), all **consolidated to 1 July 2026
  (FY2026-27)**: General Retail **MA000004**, Fast Food **MA000003**, Hospitality **MA000009**,
  Restaurant **MA000119**, Clerks—Private Sector **MA000002**, Road Transport **MA000038**, Nurses
  **MA000034**, SCHADS **MA000100**, Manufacturing **MA000010**, Building & Construction
  **MA000020**. % multipliers are structural; $ figures are FY2026-27 and index annually.
- **Case law:** *Mondelez Australia Pty Ltd v AMWU* [2020] HCA 29 ([AustLII](https://www8.austlii.edu.au/cgi-bin/viewdoc/au/cases/cth/HCA/2020/29.html)); *AMIEU v Dick Stone* [2022] FCA 512;
  *Corporate Air Charter v AFAP* (Full Federal Court / High Court 2025) 🔎 — primary citations to confirm in the re-verify pass.
- **Long service leave (state Acts):** NSW LSL Act 1955; Vic LSL Act 2018; Qld; WA LSL Act 1958; SA
  LSL Act 1987; Tas LSL Act 1976; NT LSL Act 1981; ACT LSL Act 1976 — state-government LSL pages
  linked per row. 🔎 confirm each state's exact quantum/access figures.
- **Child employment (state Acts):** Child Employment Act 2003 (Vic) + each state/territory
  equivalent. 🔎 confirm per state.
- **WA state IR system (§17):** Industrial Relations Act 1979 (WA), Minimum Conditions of Employment
  Act 1993 (WA), and WA state awards — [legislation.wa.gov.au](https://www.legislation.wa.gov.au/) ·
  [Wageline WA](https://www.wa.gov.au/service/employment/workplace-arrangements/wageline-information-western-australian-employers-and-employees).
  🔎 confirm the exact AustLII/legislation.wa.gov.au paths + the national-system boundary (FWA s.14)
  in the re-verification pass.

> **⚠ Verification note.** Two provenance tiers. **(1) The Part II 10-award comparison matrices
> (added 2026-07-21)** were **freshly researched** from FWC consolidated award text / FWO pay guides
> to 1 July 2026 (FY2026-27); residual 🔎 items are limited to a few casual-OT-stacking details
> (Hospitality/Restaurant/SCHADS) and the Nurses on-call $ figures. **(2) The Part I/III narrative +
> the pre-2026-07-21 award examples** rest on the prior sourced draft + primary-source knowledge, and
> several deep links (state LSL Acts, the *Corporate Air Charter* citation, the high-income threshold
> figure) are best-effort and flagged 🔎 — confirm those in a fresh-session re-verification pass
> before customer-facing use.
