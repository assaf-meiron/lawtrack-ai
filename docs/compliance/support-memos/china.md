# China — T&A requirements

> **What this is.** The ground-truth reference for China's time-&-attendance legal requirements,
> detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive** and **atomic**:
> **one legal proposition per row**, each row self-contained (no "see §X" as the only content), with
> exact values, a worked example wherever a number is involved, variants, and a `Basis` that **links
> to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, RMB amounts, tax) is out of scope (premiums are
> named for context in `Values` but the deliverable is the typed hour/day event, never the money).
>
> **Chinese-term convention:** every non-English term is glossed in English in brackets on first use
> in each section, e.g. *jiābān* [overtime].
>
> **The one structural fact that shapes this whole document.** China is **statute-first, not
> CBA-first** (unlike Germany): the national **Labour Law** sets the working-time ceilings and the
> three OT premiums (150/200/300%) directly, with no bargained-premium layer to defer to. But
> **which regime applies** — the **three working-hour systems** (standard / comprehensive / flexible)
> — is not a free employer choice; comprehensive and flexible both require **prior labour-bureau
> approval**, and that regime choice is the single biggest driver of how OT, rest, and limits behave.
> Below the national floor, a **second, genuinely load-bearing layer is provincial/municipal**, not
> collective-bargained: maternity/paternity/parental/marriage/bereavement leave, sick-pay
> percentages, and night-shift allowances are set city-by-city and province-by-province, with no
> single national number.
>
> **Legal sources & links:** the **Labour Law of the PRC** (1994, amended 2018) — English text at
> [mofcom.gov.cn](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html)
> (confirmed live, article-numbered) — the **Labour Contract Law**, the State Council **Regulation on
> Paid Annual Leave for Employees**, the Ministry of Labour **Provisions on the Period of Medical
> Treatment for Employees**, the **Regulation on Work-Related Injury Insurance**, the **Special Rules
> on the Labor Protection of Female Employees** (2012), the **Law on the Protection of Minors**,
> provincial implementing rules, and the annual State Council public-holiday notice — plus repo
> seed `context/worldwide-calculations/china.md` (2026-06-14, self-labelled ⚠ to-be-verified) and the
> predecessor `support-memos/china.md` verdict memo (now the parked appendix). Full source list at
> the foot of the requirements section. Where the primary statute has no stable per-article web
> anchor, the `Basis` links to the confirmed full-text page (article numbers are cited in the cell
> text) and/or a translated-regulation mirror; 🔎 marks a figure or link not independently confirmed
> this pass — China's operative detail is unusually **provincial**, so many rows carry a national
> floor plus a 🔎-flagged local range.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Three working-hour systems — the regime gate** | **标准工时制** [standard system]: fixed 8h/day · 40h/week, default, no approval needed. **综合计算工时工作制** [comprehensive system]: hours averaged over an approved cycle (week/month/quarter/year); OT owed only on cycle-excess. **不定时工作制** [flexible/non-fixed system]: no fixed hours, no OT, no daily/weekly limits. Which regime applies must be settled **before** OT/limits can be evaluated. | A retail chain runs comprehensive (quarterly cycle) for store staff and standard for HQ admin — two different pay policies for the same employer. | — | [Labour Law Art. 36, 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); State Council Standard Working Hours Provisions 🔎 |
| **Comprehensive/flexible systems require prior labour-bureau approval** | Employer must obtain approval from the **local labour administrative department** before applying either regime — neither is a unilateral employer choice, and a contract clause adopting one without approval has **no legal effect**. | An employer rosters "flexible hours" for sales staff without filing for approval → the arrangement is unenforceable; standard-system OT rules apply retroactively. | Approval authority sits at district/county or municipal Human Resources & Social Security Bureau level. | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); MOHRSS implementing rules 🔎 |
| **Standard system — default, no approval** | 8h/day · 40h/week (5-day week), applies unless the employer has approved comprehensive/flexible status. | Most white-collar/office roles default here. | — | [Labour Law Art. 36](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); State Council Standard Working Hours Provisions 🔎 |
| **Comprehensive system — typical sectors** | Approved for **irregular-shift, seasonal, or continuous-operation** work: transportation, hospitality/retail, telecommunications, resource extraction, construction. | A tourism operator runs a quarterly comprehensive cycle to absorb peak-season hours without daily OT. | Cycle length (week/month/quarter/year) is itself an approved, configurable parameter — "usually weekly" per prior guidance, but statute permits longer cycles. | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Flexible/non-fixed system — typical roles** | Senior management, field sales, long-distance drivers, port/dock workers — roles whose hours "cannot be measured by standard means." | A national sales director is placed on a flexible-system policy with no OT rate rows. | — | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **44h/week statutory ceiling vs. 40h/5-day operative standard** | Labour Law Art. 36 sets the hard ceiling at an **average ≤44h/week**; the State Council's separate Standard Working Hours Provisions set the **operative** 8h/day · 40h/5-day-week standard actually used for OT onset. | A 42h week is inside the Art. 36 ceiling but already 2h into OT against the operative 40h standard. | — | [Labour Law Art. 36](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); State Council Standard Working Hours Provisions 🔎 |
| **996 schedule — unlawful, not a regime option** | A "9am–9pm, 6-days/week" schedule breaches the Art. 41 OT caps (1h/day, 3h special, 36h/month) regardless of which system is nominally in force; jointly declared unlawful by the Supreme People's Court and MOHRSS (2021). | A 9-9-6 schedule works 12h/day, 6 days/week — roughly 32h of weekly OT against an 8h standard day, blowing through both the 3h/day special-need ceiling and the 36h/month cap within a single week. | — | [SPC/MOHRSS joint typical-case guidance, 2021](https://www.gov.cn/) 🔎 |
| **Minors <16 — hiring ban** | Employing anyone **under 16** is banned outright (narrow exceptions for arts/sports/special-skills professions with special approval). | A factory cannot put a 15-year-old on any roster. | Approved child-performer/athlete exceptions are rare and separately licensed. | [Labour Law Art. 15](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); Law on the Protection of Minors 🔎 |
| **Juvenile workers (16–18) — protective regime** | Workers aged **16–17 ("juvenile workers", 未成年工)**: **no overtime, no night-shift work**, barred from a defined list of hazardous/heavy-labour categories (mining, toxic-chemical exposure, extreme height/cold/underwater work), and must have **periodic health checks**. | A 17-year-old apprentice cannot be rostered onto a night shift even where an adult on the same line can be. | — | [Labour Law Art. 58, 64](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); Provisions on the Special Protection of Juvenile Workers 🔎 |
| **Pregnant (≥7 months) / nursing employees — OT & night-shift ban** | Female employees **≥7 months pregnant** or in the **nursing period** (until the child turns **1 year**) may not be arranged for overtime or night-shift work. | A warehouse cannot roster a 7.5-months-pregnant picker onto an evening shift. | Applies through the whole nursing period, not just immediately post-partum. | [Special Rules on the Labor Protection of Female Employees, Art. 6](https://www.gov.cn/) 🔎 |
| **No CBA-equivalent bargained layer** | Unlike Germany's *Tarifvertrag* [sector-wide collective bargaining agreement], China has no widespread sector-wide collective-bargaining layer that sets OT onset/rates — the **national statute is the direct source** of the 150/200/300% premiums; collective contracts (集体合同 [collective contract]) exist but are far less prevalent and typically restate, not vary, the statutory floor. | A unionised state-owned enterprise may have a 集体合同, but it rarely changes the OT %. | — | [Labour Law Ch. VII](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) (集体合同) |
| **Genuinely load-bearing layer is provincial, not collective** | Maternity/paternity/parental/marriage/bereavement leave lengths, sick-pay %, and night-shift allowances are set **province/city by province/city** — there is no single national number for most of these (see §10). | Paternity leave is 7 days in Tianjin, 10 in Shanghai, 30 in Henan — same statute base, different local implementing rule. | — | [Provincial Population & Family Planning regulations](https://www.gov.cn/); local implementing rules 🔎 |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **What counts as working time** | China's national statute does not define a German-style on-call/standby taxonomy; "working time" is the time an employee is actually engaged in assigned work under the employer's direction. | — | Sectoral/local rules (e.g. for drivers) may define waiting time separately — 🔎 not found in national statute. | [Labour Law Ch. IV](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) (general) |
| **Antenatal medical check-ups count as working time** | Time a pregnant employee spends at a required prenatal check-up **counts as working time** and is not to be made up by extended hours elsewhere. | A pregnant employee's 2-hour prenatal visit is paid as if worked; no clawback of the missed 2h. | — | [Special Rules on the Labor Protection of Female Employees, Art. 6](https://www.gov.cn/) 🔎 |
| **No general statutory definition of travel time as working time** | 🔎 No national provision found treating business travel as working time (contrast Germany's BAG case law); treatment is left to employer policy/local practice. | — | — | (none identified nationally) |

## 3. Overtime

*China is statute-first on OT: the 150/200/300% premiums are set directly by national law. The
defining complexity is **which of the three regimes** governs a given worker — onset, caps, and
averaging all depend on that regime choice.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Standard system — daily & weekly onset** | OT = hours beyond **8h/day** or beyond **40h/week** (5-day week), whichever is reached first. | A standard-system worker doing a 9.5h day has 1.5h of daily OT even if the week stays under 40h. | — | [Labour Law Art. 36](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); State Council Standard Working Hours Provisions 🔎 |
| **Comprehensive system — cycle-total onset only** | OT is **not** determined day-by-day or week-by-week; it is the **total hours worked across the approved cycle** (week/month/quarter/year) that exceed the standard total for that cycle (8h/day × workdays, or the 40h/week average). Daily/weekly overage within the cycle is not itself OT. | A quarterly-cycle worker doing 10h on a peak day and 6h on a trough day nets to the cycle average; OT is assessed only when the **cycle's cumulative total** exceeds the standard. | Rest-day work performed inside a comprehensive cycle is generally **not** treated as OT the way it is under the standard system — it is absorbed into the cycle total (🔎 confirm local implementing-rule nuance). | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Flexible system — no OT ever triggers** | No onset exists; hours are not measured against a standard, so no surplus can occur. | A flexible-system field engineer works a 60h week with no OT owed. | Some localities still apply the 300% statutory-holiday premium even under flexible status (Shanghai does; Beijing/Tianjin generally do not) — see §3b. | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **OT must be employer-arranged, generally with consultation** | Overtime is OT only when arranged by the employer "due to production/operation requirements," in principle after consulting the trade union/employees for extensions beyond the normal 1h/day. | An employee who stays late unprompted has weaker grounds to claim OT pay without employer arrangement. | Emergency exceptions (Art. 42: natural disaster, urgent equipment repair, public-interest emergencies) **remove the 1h/3h/36h cap entirely** for that instance. | [Labour Law Art. 41, Art. 42](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Workday OT — ≥150%** | Ordinary-workday overtime pays **≥150%** of the normal hourly wage. Common hourly-rate formula: monthly wage ÷ **21.75** (statutory average paid days/month) ÷ **8h** × OT hours × 150%. | A worker on RMB 8,700/month doing 2h workday OT: 8,700 ÷ 21.75 ÷ 8 × 2 × 1.5 ≈ RMB 150. | — | [Labour Law Art. 44(1)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Rest-day OT — ≥200%, or compensatory rest in lieu** | Work on the weekly rest day pays **≥200%** — **unless** the employer arranges compensatory time off instead, in which case no cash premium is owed for that day. | A worker covering a Saturday rest-day shift either gets 200% cash or an agreed day off in lieu. | 🔎 Ratio and required timing window for the comp-off are not fixed nationally — locally/company-policy determined (contrast Germany's fixed 2-/8-week *Ersatzruhetag* [replacement rest day] windows). | [Labour Law Art. 44(2)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Statutory-holiday OT — ≥300%, cash-only, no comp-off substitute** | Work on one of the 11 statutory public holidays pays **≥300%**, and — unlike rest-day work — this **cannot** be substituted with time off; it must be paid in cash. | An employee working National Day (Oct 1) is owed 300% pay regardless of whether they're later given a day off. | — | [Labour Law Art. 44(3)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Comprehensive system — cycle-excess at 150%, holiday still 300%** | Hours beyond the cycle's standard total pay **≥150%** (the "workday" rate applied to the whole excess, since day/week distinctions don't apply); statutory-holiday work within the cycle is still **≥300%**. | A monthly-cycle worker who nets 12h over the month's standard total is owed 150% on those 12h; any hours worked on National Day inside that month are still 300%. | — | [Labour Law Art. 39, Art. 44(3)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Flexible system — no statutory OT rate; regional holiday-pay split** | No OT premium applies to ordinary or rest-day hours. Statutory-holiday pay **varies by locality**: Shanghai continues to require the 300% premium even under flexible status; Beijing and Tianjin generally do not. | A Shanghai-based flexible-system sales manager working National Day is still owed 300%; the same role in Beijing is not. | 🔎 Confirm current locality list before a hard commitment — this is an evolving local-practice area. | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); local implementing rules (Shanghai vs. Beijing/Tianjin) 🔎 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily OT hard cap — 1h, extendable to 3h** | Overtime is capped at **1h/day** in ordinary circumstances, extendable to **3h/day** only under "special need" with the employee's/union's consultation and health safeguards. | A factory facing a rush order may extend to 3h/day OT temporarily, not as a standing practice. | Art. 42 emergencies (disaster, urgent repair, public-interest tasks) **remove this cap** for that instance. | [Labour Law Art. 41, Art. 42](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Monthly OT hard cap — 36h** | Total overtime in a calendar month may not exceed **36h**, running as a monthly counter — this ceiling **cannot be waived by employee agreement**. | An employee already at 34h of OT this month can be asked for at most 2 more hours. | Applies to the standard system; comprehensive-system cycle-excess is assessed at cycle close, not against this monthly counter (🔎 interplay between the two is not clearly resolved in sourced material). | [Labour Law Art. 41](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **No separate national annual OT-hours ceiling** | China caps OT **daily and monthly** (above); no additional annual OT-hours ceiling is layered on top nationally. | — | — | [Labour Law Art. 41](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Comprehensive-cycle averaging determines OT itself** | Unlike Germany's limit-validating averaging (§4), China's comprehensive-cycle averaging **is** how OT is determined — hours are netted across the approved cycle (week/month/quarter/year) against the standard total, and only the cycle-close excess is OT. This is placed here (not §4) because it is **OT-determining**, per the template's placement rule. | A quarterly-cycle worker's OT is not knowable until the quarter closes and the cumulative total is compared to the standard. | Cycle length is itself an approved/configurable parameter. | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Comprehensive cycle still has a daily ceiling in most local implementing rules** | 🔎 Local implementing rules (not uniformly confirmed nationally) commonly still cap a single day within the cycle (often cited around ≤11h/day), even though the *pay* determination happens at cycle close. | A comprehensive-cycle worker scheduled for a 12h peak day would breach the commonly-cited ≤11h/day local ceiling even though the month nets out fine. | Varies by province; treat as unconfirmed pending local-rule review. | 🔎 local implementing rules, unconfirmed |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory-holiday rate overrides rest-day rate — no double-counting** | If a statutory holiday and the weekly rest day coincide, the **holiday rate (300%) governs**, not an additive 200%+300% stack. | A statutory holiday that happens to fall on the employee's designated rest day pays 300%, not 500%. | — | [Labour Law Art. 44(2)–(3)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Night + rest-day / night + holiday stacking** | 🔎 Not clearly resolved nationally whether a local night-shift allowance (§5) stacks additively with the rest-day/holiday OT premium, or is absorbed — no national statute addresses composition (night premiums are themselves local/sectoral, not national). | — | Depends on the local rule that created the night premium in the first place. | 🔎 unconfirmed — no national provision |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekly rest — ≥1 day off in 7** | Every worker must get **at least one rest day per week** — it need not be Saturday/Sunday, especially under the comprehensive system. | A comprehensive-system retail worker's rest day floats across the week but must occur at least once every 7 days. | — | [Labour Law Art. 38](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Standard daily/weekly ceiling — 8h/day, 40h/week (44h/week absolute ceiling)** | Operative standard: **8h/day, 40h/week**; Art. 36's absolute backstop ceiling is a **44h/week average**. | A 42h week sits under the Art. 36 44h ceiling but is already 2h into OT against the 40h operative standard. | — | [Labour Law Art. 36](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); State Council Standard Working Hours Provisions 🔎 |
| **Daily/monthly OT caps double as working-time limits** | The 1h/day (→3h special)/36h-month OT caps (§3c) are simultaneously the **hard working-time ceiling** — a breach should be flagged, not silently absorbed into pay. | An employee already at 3h of OT on a given day and 36h for the month should trigger a compliance flag, not simply accrue further paid OT hours. | Art. 42 emergencies suspend the cap. | [Labour Law Art. 41, Art. 42](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Breaks — no fixed national minimum duration/timing** | 🔎 No national statute fixes a specific meal/rest-break length or timing (contrast Germany's 30/45-min rule); common practice is ~1h unpaid lunch, but this is convention/local rule, not national statute. | — | Some municipal rules (e.g. Beijing) may set local minimums — 🔎 unconfirmed. | (none identified nationally) |
| **High-temperature outdoor-work hour restriction** | When outdoor ambient temperature reaches **≥40°C**, outdoor work must **stop**; at **37–40°C**, outdoor work hours must be **shortened** and work during the hottest part of the day avoided (commonly 12:00–16:00 outdoors, per MOHRSS heat-protection notice). A separate high-temperature **allowance** (money, downstream) applies June–September when outdoor ≥35°C or indoor ≥33°C without adequate cooling. | A construction site must halt outdoor pours entirely on a 41°C day; at 38°C it must shorten exposure and avoid the 12:00–16:00 window. | Provincial specifics on exact hours/thresholds vary — 🔎 confirm locally. | [MOHRSS/State Administration of Work Safety Notice on High-Temperature Labour Protection](https://www.gov.cn/); provincial implementing rules 🔎 |
| **Juvenile workers (16–18) — no OT, no night shift** | Restated from §1: juvenile workers may not be arranged for overtime or night-shift work at all — a firmer limit than the adult 1h/3h/36h caps. | — | — | [Labour Law Art. 58](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Pregnant (≥7mo)/nursing — no OT, no night shift** | Restated from §1: the same firm no-OT/no-night-shift rule applies through the nursing period (child <1yr). | — | — | [Special Rules on the Labor Protection of Female Employees, Art. 6](https://www.gov.cn/) 🔎 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No general national statutory night premium** | China has **no** national-level night-shift pay mandate comparable to Germany's §3b EStG framework; where a night allowance exists, it is set **locally or by sector/company policy**. | A manufacturer may pay a company-defined night allowance while a neighbouring firm pays none, both lawfully. | Some municipalities calculate a local night allowance off the **city's average monthly wage** (e.g., one city's rule referenced RMB 8,355/month as the base) — figure is 🔎 locality-specific and shifts with the published average-wage statistic. | 🔎 local/sectoral rules — no national statute |
| **Night window — commonly cited ~22:00–06:00** | Where a local/sectoral night allowance exists, the night window is commonly **22:00–06:00**, but this is convention, not a uniform national statutory definition. | A worker clocking in at 23:00 and out at 07:00, at an employer with a local night-shift policy, has hours from 23:00–06:00 fall inside the commonly-cited night window. | Confirm the exact window with the specific city/sector rule in force. | 🔎 convention, not national statute |
| **Night-shift ban for protected groups** | Juvenile workers (16–18) and pregnant (≥7mo)/nursing employees may **not** be rostered for night-shift work at all (§4). | — | — | [Labour Law Art. 58](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); Special Rules on Labor Protection of Female Employees Art. 6 🔎 |
| **三班倒 [rotating-shift allowance]** | Variable, company/local-policy-set premium for rotating/continuous-shift work; no statutory national rate. | A 24-7 factory pays a fixed monthly shift allowance to workers rotating morning/evening/night shifts, on top of any night-window premium (§5). | Common in manufacturing/24-7 operations. | 🔎 company/local policy |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory public holidays — 11 days/year, national calendar** | **New Year's Day** (1 day) · **Spring Festival** [Chinese New Year] (3 days) · **Qingming Festival** [Tomb-Sweeping Day] (1 day) · **Labour Day** (1 day) · **Dragon Boat Festival** (1 day) · **Mid-Autumn Festival** (1 day) · **National Day** (3 days) = **11 statutory holiday days/year**, set by a single national calendar (no per-province holiday list, unlike Germany's per-Bundesland calendar). | Every employee nationwide gets the same 11 statutory days, unlike Germany where the date and count vary by state. | — | State Council Measures for the Arrangement of National Annual Festival and Memorial Day Holidays — [translated at cbltranslations.com](https://cbltranslations.com/en-us/china-law/employment/employee-leave-work-hour-regulations-translated/) |
| **调休 [tiaoxiu, holiday-weekend swap] — annual make-up workdays** | To bundle statutory holidays into longer breaks, the State Council **swaps** adjacent weekend days into **补班** [buban, make-up workdays] each year via a dedicated notice — these make-up days are ordinary paid workdays, not holidays. | **China 2026 calendar (example):** New Year Jan 1–3 (make-up Jan 4); Spring Festival Feb 15–23 (make-up Feb 14 & 28); Qingming Apr 4–6 (no make-up); Labour Day May 1–5 (make-up May 9); Dragon Boat Jun 19–21 (no make-up); Mid-Autumn Sep 25–27 (no make-up); National Day Oct 1–7 (make-up Sep 20 & Oct 10). Six make-up workdays total in 2026. | The exact bundling/make-up-day set is republished **annually** by State Council notice — treat the calendar as a yearly-refreshed input, not a fixed rule. | [State Council annual holiday-arrangement notice](https://www.gov.cn/) (2026 notice issued 4 Nov 2025) 🔎 |
| **Statutory-holiday worked premium — ≥300%, cash-only** | Restated from §3b: work on any of the 11 statutory days pays **≥300%**, no comp-off substitution allowed. | A National Day shift pays 300% regardless of any later day off offered. | Flexible-system locality variance (Shanghai pays; Beijing/Tianjin generally don't) — see §3b. | [Labour Law Art. 44(3)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Rest-day worked premium — ≥200% or comp-off** | Restated from §3b: the ordinary weekly rest day (not a statutory holiday) pays **≥200%** unless substituted with time off. | A worker called in on their designated weekly rest day (not a public holiday) is owed 200% cash, or an agreed compensatory day off instead. | — | [Labour Law Art. 44(2)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Holiday-on-rest-day doctrine — handled at the national-calendar level, not per-employee** | Unlike Germany's individual *Ersatzruhetag* [replacement rest day] entitlement, China resolves a statutory holiday landing on/near a rest day through the **national tiaoxiu calendar swap** itself (moving surrounding weekend days), rather than granting each affected employee an individual substitute day. | The 2026 calendar's Feb 14 & 28 make-up days are how the system compensates for Spring Festival's placement, at the calendar level. | 🔎 Whether an *individual* substitute-day entitlement exists when a comprehensive-system worker's non-fixed rest day happens to coincide with a statutory holiday is not confirmed nationally. | [State Council annual holiday-arrangement notice](https://www.gov.cn/) 🔎 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Comprehensive-cycle netting — the closest analogue to an hours bank** | Hours worked across the approved cycle (week/month/quarter/year) are netted against the standard cycle total; the cycle-close excess becomes OT (§3d). This is a **cycle-close netting mechanism**, not a persistent, carry-forward account like Germany's *Arbeitszeitkonto* [working-time account]. | A monthly-cycle worker's peak-week hours are absorbed by trough weeks within the same month; nothing carries into the next month. | Cycle length (week/month/quarter/year) is the configurable parameter. | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **Rest-day comp-off in lieu of 200% cash** | Employer may substitute a **compensatory day off** for rest-day work instead of paying 200% cash (§3b). | A Saturday rest-day shift is settled with a Tuesday off instead of a cash premium. | 🔎 No fixed national ratio (commonly 1:1) or required granting window — a research gap versus Germany's fixed windows. | [Labour Law Art. 44(2)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **No comp-off substitute for statutory holidays** | Statutory-holiday work (§3b, §6) must be paid at 300% cash — it **cannot** be settled as time off in lieu. | — | — | [Labour Law Art. 44(3)](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |
| **No long-term/multi-year banking product identified** | 🔎 Unlike Germany's *Wertguthaben* [long-term value account], no national mechanism was found for banking hours/pay across years to fund a future extended absence (sabbatical, phased retirement). | — | — | (none identified in current research) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No distinct national on-call/standby statutory framework** | China's national statute does **not** draw a German-style *Bereitschaftsdienst* [on-site standby] vs. *Rufbereitschaft* [home reachability] distinction. The nearest structural analogue is the **flexible/non-fixed system** (§1, §3a): roles whose time genuinely cannot be measured (drivers, field staff) are simply taken outside the hours/OT framework entirely, rather than given a separate standby-pay regime. | A long-haul driver's waiting/standby time is absorbed into a flexible-system policy rather than paid as a distinct "standby" rate. | Sectoral rules (e.g., for specific transport/logistics roles) may define waiting time separately at the local level — 🔎 not confirmed nationally. | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) (flexible system) |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up (predictability) pay** | China has **no** national show-up-pay or predictability-pay regime (unlike US CA/NYC-style rules). | — | Local/company policy may offer one; not a statutory floor. | (none identified nationally) |
| **996 schedules unlawful regardless of nominal regime** | Restated from §1: a "9-9-6" roster breaches the Art. 41 caps outright — it cannot be legitimised by labelling the arrangement "flexible" or "comprehensive" without genuine, approved cycle-based netting. | An employer labels its sales team's 9-9-6 roster "flexible system" without bureau approval — the label doesn't cure the underlying Art. 41 breach. | — | [Labour Law Art. 41](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); SPC/MOHRSS 2021 joint guidance 🔎 |
| **No statutory split-shift or spread-of-hours premium identified** | 🔎 No national provision found mandating extra pay for a split shift or a long unpaid spread between shift segments — left to local/company policy. | — | — | (none identified nationally) |
| **Comprehensive-system scheduling is cycle-based, not fixed-daily** | Rostering under an approved comprehensive-system policy is built around meeting the **cycle total**, not a fixed daily/weekly pattern — the schedule itself is the OT-avoidance lever (§3a, §3d). | A retailer schedules long summer-peak days offset by short shoulder-season days within one comprehensive cycle. | — | [Labour Law Art. 39](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **带薪年假 [paid annual leave] — accrual by cumulative career service** | **5 days** (<10 years cumulative work experience) · **10 days** (10–20 years) · **15 days** (>20 years). Entitlement is based on the employee's **total cumulative career working years** (not just tenure at the current employer), and only vests after **≥12 months** cumulative work experience. | An employee with 12 years of total career experience but only 8 months at their current employer is already in the 10-day tier from day one of that new job (once past the 12-month cumulative threshold, already satisfied by prior employers). | — | Regulation on Paid Annual Leave for Employees, Art. 3 — [translated at cbltranslations.com](https://cbltranslations.com/en-us/china-law/employment/employee-leave-work-hour-regulations-translated/) |
| **Annual-leave carryover — no carry by default** | Leave does **not** normally carry into the next year; the employer **may** arrange a one-year carryover with the employee's consent where work needs require it. | Unused days from 2026 may be pushed into 2027 only by mutual arrangement. | — | Regulation on Paid Annual Leave for Employees, Art. 5 — [translated at cbltranslations.com](https://cbltranslations.com/en-us/china-law/employment/employee-leave-work-hour-regulations-translated/) |
| **Unused-leave payout — 300% of daily wage** | Where the employer fails to arrange leave the employee is entitled to (and it isn't carried over), it must pay **300% of the employee's daily wage income** for each unused day. | 3 unused days at a daily wage of RMB 400: 3 × 400 × 3 = RMB 3,600. | — | Regulation on Paid Annual Leave for Employees, Art. 7 — [translated at cbltranslations.com](https://cbltranslations.com/en-us/china-law/employment/employee-leave-work-hour-regulations-translated/) |
| **Annual-leave forfeiture triggers** | Current-year entitlement is **lost** if the employee: takes statutory summer/winter school vacations exceeding their annual-leave quota; takes **≥20 cumulative days** of unpaid personal leave; or exceeds sick-leave thresholds (**≥2 months** if <10yrs service, **≥3 months** 10–20yrs, **≥4 months** ≥20yrs). | An employee who takes 25 days of unpaid personal leave in the year forfeits that year's paid annual leave. | — | Regulation on Paid Annual Leave for Employees, Art. 4 — [translated at cbltranslations.com](https://cbltranslations.com/en-us/china-law/employment/employee-leave-work-hour-regulations-translated/) |
| **医疗期 [medical treatment period] — 3 to 24 months by service tier** | Length is set by **total career service** × **tenure with current employer**: <10yrs total service → **3 months** (if <5yrs with employer) or **6 months** (≥5yrs); ≥10yrs total service → **6/9/12/18/24 months** for <5/5–10/10–15/15–20/≥20yrs with the current employer respectively. | A worker with 12 years total career service and 6 years at the current employer gets a **9-month** medical treatment period. | — | [Provisions on the Period of Medical Treatment for Employees, Art. 3](https://www.gov.cn/) 🔎 |
| **Medical-treatment-period accumulation window** | The period is calculated **cumulatively** within a rolling observation window scaled to its length — e.g. a 3-month entitlement is tracked cumulatively within a **6-month** window; longer entitlements use proportionally longer windows (up to ~30 months for the 24-month tier). | A worker with a 3-month medical-treatment entitlement who takes 10 days here, 20 days there — all days count cumulatively inside the rolling 6-month window, not per-illness. | — | [Provisions on the Period of Medical Treatment for Employees, Art. 4](https://www.gov.cn/) 🔎 |
| **Termination protection during medical treatment period** | The employer generally **cannot terminate** an employee during the medical treatment period, unless a disability assessment finds the employee unable to perform any work. | — | — | [Provisions on the Period of Medical Treatment for Employees, Arts. 6–7](https://www.gov.cn/) 🔎 |
| **Sick pay — no fixed national %, local/company sick-pay tables (commonly 60–100%)** | 🔎 No single national sick-pay percentage; local implementing rules (e.g. Beijing/Shanghai sick-pay tables) commonly range **60–100%** of wage depending on tenure/service, generally with a floor tied to local minimum wage. | A Shanghai employee with 8 years' service on sick leave might draw 80% of wage under the local table, versus a different % for a colleague with 2 years' service. | Confirm the specific city's sick-pay table before configuring a rate. | 🔎 local implementing rules |
| **产假 [maternity leave] — 98-day national baseline, provincially extended to 128–158+ days** | National baseline: **98 days** (**15 days pre-birth + 83 post-birth**). Most provinces have extended this via local Population & Family Planning regulations to **128–158 days or more** (Beijing & Shanghai: 158 days total). | A Shanghai-based employee due 1 June is on protected maternity leave for 158 days, not the bare 98-day national floor. | Provincial figures vary; confirm the specific province/city before configuring. | [Labour Law Art. 62](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) (90-day original floor, since superseded upward); provincial Population & Family Planning regulations 🔎 |
| **Maternity leave — difficult birth / multiple birth / miscarriage extensions** | **+15 days** for difficult childbirth (e.g. Caesarean); **+15 days per additional child** for multiple births; **15–42 days** for miscarriage, scaled to gestational age at loss. | Twins delivered by C-section: 98 (or provincial baseline) + 15 (difficult birth) + 15 (one additional child) = extended total. | Miscarriage-leave length scales with how far the pregnancy had progressed — 🔎 exact bands vary by province. | [Special Rules on the Labor Protection of Female Employees, Art. 7](https://www.gov.cn/) 🔎 |
| **Paternity leave — no national entitlement, province-set (7–30 days)** | No national statute grants paternity leave; entitlement is set **province/city by province/city**. Examples: Beijing 7–10 days · Shanghai 10 days · Zhejiang 15 days · Guangzhou/Shenzhen 15 days · Tianjin 7 days · Sichuan/Hunan/Liaoning/Chongqing 20 days · Henan 30 days. | A Henan-based father is entitled to 30 days; the same role in Tianjin gets 7. | Confirm the specific province before configuring — this is not a single number. | [Provincial Population & Family Planning regulations](https://www.gov.cn/) 🔎 |
| **育儿假 [childcare/parental leave] — 5–20 days/year per parent, province-set** | No single national figure; province/city rules commonly grant **5–10 days/year per parent** (some up to 20) for children generally **under 3** (a few provinces extend to age 6). Examples: Guangdong 10 days/yr (<3yrs); Chongqing 5–10 days/yr (<6yrs); Yunnan 10 days/yr. Where a couple has 2+ children under 3, some cities (e.g. Beijing, Shanghai) let the days **stack** across children. | A Guangdong couple with a 2-year-old each take 10 childcare-leave days in the year. | Age ceiling (3 vs. 6) and stacking-for-multiple-children rules both vary by province. | [Provincial implementing rules under the national three-child-policy decision](https://www.gov.cn/) (2021) 🔎 |
| **婚假 [marriage leave]** | Labour Law entitles employees to **paid leave during marriage**; the commonly-cited statutory baseline is **~3 days**, with some provinces historically granting longer "late-marriage" bonus leave (largely phased out after the 2015 Population & Family Planning Law amendment removed the late-marriage age incentive). | An employee marrying takes 3 paid days; confirm whether the local rule still offers an extension. | 🔎 Provincial variation is significant and has been shifting since 2015 — confirm current local rule. | [Labour Law Art. 51](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); 1980 Interim Provisions on Marriage and Funeral Leave; provincial rules 🔎 |
| **丧假 [bereavement/funeral leave]** | **1–3 days** paid leave on the death of an immediate family member (spouse, parent, child) is the common national-practice baseline. Some provinces (e.g. Shanghai, Guangdong) extend eligibility to in-laws/grandparents. | An employee loses a parent and takes 3 paid days; a Shanghai employee may also claim days for a parent-in-law's death. | Qualifying-relative list and day-count both vary provincially. | [Labour Law Art. 51](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html); 1980 Interim Provisions on Marriage and Funeral Leave 🔎 |
| **哺乳时间 [nursing/breastfeeding breaks]** | **≥1 hour/day**, paid, during normal working hours, until the child turns **1 year old**; **+1 additional hour/day per additional child** (twins, etc.). | A mother of twins takes 2 paid hours/day for nursing breaks until the twins turn 1. | — | [Special Rules on the Labor Protection of Female Employees, Art. 9](https://www.gov.cn/) 🔎 |
| **停工留薪期 [work-injury paid-suspension period]** | An employee recovering from a **work-related injury** continues to receive their **original wage and benefits in full** during the recovery period, generally **not exceeding 12 months** (extendable by a further ≤12 months on appraisal by the labour-capacity assessment committee for serious/complex injuries). | An employee with a workplace hand injury draws full original wage for up to 12 months of recovery, extendable if assessed as needed. | — | [Regulation on Work-Related Injury Insurance](https://english.shanghai.gov.cn/en-FAQS-WorkinShanghai/20260311/678a5dba1dc844db9e5f4c289d5078dc.html), Art. 33 🔎 |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Attendance, OT-approval & leave records must be maintained** | Employers should retain daily attendance/shift records, OT application-and-approval forms, rest-day-work/comp-off records, annual-leave accrual/usage, sick-leave certificates, and statutory-leave (maternity/paternity/childcare/marriage/bereavement) records — these underpin wage-dispute and termination-dispute defense. | An employer defending a back-pay claim without OT-approval records will generally lose the factual dispute to the employee's account. | — | [Labour Contract Law](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html) working-time/wage provisions (general); labour-arbitration practice 🔎 |
| **Burden of proof favours the employee absent employer records** | In a labour dispute, **the employer bears the burden** of proving hours/OT were properly recorded and paid; missing or altered records shift credibility toward the employee's claim. | An inspector or arbitrator presented with no attendance log for a disputed period will generally credit the worker's stated hours. | — | [Labour dispute arbitration practice](https://www.gov.cn/) 🔎 |
| **Wage-record retention — commonly ≥2 years** | Wage-payment records (which attendance data feeds) are commonly required to be retained for **more than 2 years**, aligning with the **1-year** labour-dispute arbitration limitation period plus a practical buffer. | An employer keeps 2 years of attendance + payroll records on file to cover any arbitration window. | 🔎 No single, explicitly-cited "attendance record" retention article was found distinct from the wage-record retention practice — treat as the practical minimum. | [Provisions on Payment of Wages](https://www.gov.cn/) (wage-record retention); labour-arbitration 1-year limitation period 🔎 |
| **No statutory rounding/tolerance rule identified** | 🔎 No national provision sets a punch-rounding or grace-period rule; any tolerance is a policy choice. | — | — | (none identified nationally) |

## Sources (requirements section)

- **Labour Law of the PRC — English text (confirmed live, article-numbered):**
  [english.mofcom.gov.cn](https://english.mofcom.gov.cn/Policies/GeneralPolicies/art/2007/art_50931311cbf44ca1af6fd192aec75726.html)
  (Arts. 15, 36, 38, 39, 41, 42, 44, 51, 58, 62, 64 cited above). Alternate mirrors: npc.gov.cn
  (SSL handshake failure when checked this pass, 🔎), english.court.gov.cn, en.gdfao.gov.cn.
- **Repo seed:** `context/worldwide-calculations/china.md` (2026-06-14, self-labelled ⚠ to-be-verified).
- **Predecessor memo:** `support-memos/china.md` (verdict-first version, now the parked appendix below).
- **Leave / work-hour regulations translated in full (Paid Annual Leave Regulation, National
  Holidays Regulation, Work Hours Rules):**
  [cbltranslations.com](https://cbltranslations.com/en-us/china-law/employment/employee-leave-work-hour-regulations-translated/)
  (confirmed live).
- **Three working-hour systems / OT onset & rates:** hawksford.com China work-hour systems and
  overtime pay explained; sjgrand.cn HR FAQ China work hour systems and overtime pay;
  teamed.global Overtime Pay & Work Hour Limits China 2026; danyoungcpa.com China overtime rules
  labor inspections guide; chinajusticeobserver.com Labor Law of China (2018) English excerpt
  (Arts. 15, 36, 41, 44, 48, 51, 54, 58, 62); rivermate.com Working Hours in China. 🔎
- **Public holiday calendar / tiaoxiu:** travelofchina.com Tiaoxiu Explained 2026 Full Calendar;
  State Council 关于2026年部分节假日安排的通知 (gov.cn, issued 4 Nov 2025). 🔎
- **Paid annual leave:** danyoungcpa.com China Paid Annual Leave Regulation — full English
  translation; hrone.com Ultimate Guide to Annual Leave in China; support.remote.com China Annual
  Leave Policy (cumulative-service note). 🔎
- **Medical treatment period / sick leave:** referchina.com Provisions on Period of Medical
  Treatment for Employees; hrone.com Sick Leave Rights in China. 🔎
- **Maternity / paternity / nursing / childcare leave:** msadvisory.com Maternity Leave in China
  [2026]; msadvisory.com Paternity Leave in China [2026]; harris-sliwoski.com How to Treat Your
  Pregnant or Nursing Employees in China; china-briefing.com China's Childcare Leave Policy;
  china-briefing.com Employees Leave Management in Guangdong. 🔎
- **Marriage / bereavement leave:** cbltranslations.com Marriage and Bereavement Leave; msadvisory.com
  Bereavement Leave in China 2026. 🔎
- **Work-injury leave:** Regulation on Work-Related Injury Insurance Art. 33, via multiple Chinese-
  language practitioner sources (zhihu.com, sohu.com, 66law.cn). 🔎
- **High-temperature allowance / heat-work hour limits:** cpopartners.com China Labor Compliance and
  High-Temperature Allowance; dandreapartners.com Too Hot to Work; english.shanghai.gov.cn
  high-temperature allowance FAQ. 🔎
- **Minors / juvenile workers:** npc.gov.cn Law on Protection of Minors (SSL handshake failure when
  checked this pass, 🔎); workerscomplawattorney.com Legal Working Age in China.
- **Recordkeeping:** hrone.com China HR Documentation Requirements for Employers; danyoungcpa.com
  China overtime rules (2-year attendance-record retention in enforcement). 🔎
- **996 prohibition:** referenced via teamed.global 2026 guide (SPC/MOHRSS 2021 joint guidance). 🔎

> **⚠ Verification note.** This pass confirmed the Labour Law's live English text at
> english.mofcom.gov.cn (article-numbered) and the leave/work-hour regulation translations at
> cbltranslations.com; npc.gov.cn — the National People's Congress' own English-law mirror — returned
> a TLS handshake failure from this environment and could not be independently re-confirmed this
> pass, so it is listed as an alternate rather than the primary link. All secondary-regulation and
> provincial-rule links (Regulation on Paid Annual Leave article-level citations, Provisions on the
> Period of Medical Treatment, Special Rules on the Labor Protection of Female Employees, provincial
> leave tables) rest on the prior sourced draft and are flagged 🔎 pending a fresh deep-link
> verification pass.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

# China — T&A compliance support

**Verdict: 🟠 Partial — statutory premiums fit, but the regime axis is the story.** China's three
overtime premiums (workday **≥150%**, rest-day **≥200%**, statutory-holiday **≥300%**) map cleanly onto
our configurable OT **rate rows by day-group** — so the *pay-premium emission* is a good fit. But China's
defining machinery is a **three-regime gate** (standard / comprehensive / flexible) that decides *whether
and how* OT fires at all, plus the **comprehensive system's hours-averaging over a cycle** — neither of
which we ship today. Read with the scope, verdict key, and **Basis key** in [`README.md`](./README.md).
No verdict is DB-confirmed this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). This closes the
> **standard system's 40h/week onset** (OT on hours beyond the weekly threshold) — the standard regime's
> weekly leg computes. Scope is the *weekly trigger only*: it does **not** close the **comprehensive
> system's cycle-averaging** (monthly/quarterly/yearly), which remains a gap. Caveat: `[PO]` is
> committed-in-delivery, **not yet `[API]/[UI]`-visible** — confirm ship status before a hard commitment.

**Legal source:** `worldwide-calculations/china.md`. **⚠ Source note — thin.** The file is ~4KB: it
establishes the **three working-hour systems** firmly (per Assaf, 2026-06-14), but the statutory specifics
(8h/40h caps, the 1h/3h-per-day + 36h/month OT limits, the 150/200/300% multipliers, approval requirements)
are self-labelled **⚠ to-be-verified** and it is **silent on night premium and annual-leave accrual**. Every
rule below that leans on an under-sourced or absent point is flagged **🔎**, not asserted.

## Governing sources — who actually sets the rules

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| National statute | Labour Law of the PRC (Art. 36 hours ceiling · Art. 41 OT limits · Art. 44 OT premiums) | **Yes — the floor:** 8h/day, ≤44h/wk average; OT ≤1h (→3h)/day + ≤36h/month; premiums 150/200/300% |
| State Council / regulation | Standard working-hours provisions | **40h/week, 5-day week** (tighter than the Art. 36 44h ceiling) |
| **Regime authorisation** | Local labour administrative department approval | **Gates the regime:** the *comprehensive* and *flexible* systems are **not** a free employer choice — each needs bureau approval to apply |
| Local / sectoral | Provincial rules, CBAs | **Partly** — e.g. night-shift premiums where they exist are **local/sectoral**, not national |

**The key structural fact (per Assaf, 2026-06-14):** which of the **three working-hour systems** applies
governs how hours are measured, whether OT is owed, and whether daily/weekly limits bind. It is a **regime
gate upstream of the whole OT calculation** — not a rate detail.

## Rule-by-rule (Basis = where the verdict comes from)

| # | China requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Standard system — 8h/day daily OT onset.** Under the standard regime, work beyond the 8h standard day earns OT (the daily leg; Art. 36 ⚠) | OT onset = **surplus above the planned shift** (per-day surplus) | 🟡 | [API][UI][DES] | **Works when the planned shift is set to the 8h standard** — surplus-above-planned then yields the daily OT. But there's **no independent statutory 8h *norm*** (G1): a shorter planned day fires OT early. Configurable, not a fixed statutory daily norm |
| 2 | **Standard system — 40h/week weekly OT onset.** Work beyond 40h in the week earns OT (the weekly leg; State Council 5-day week) | **Weekly OT trigger** — OT on hours beyond a weekly threshold, accumulated over a configurable week window | ✅ | [PO] | **Now supported** (committed-in-delivery 2026-07-18); plain weekly threshold. **Caveat:** not yet `[API]/[UI]`-visible |
| 3 | **Workday OT premium ≥150%.** Overtime on a normal workday is paid at ≥150% (Art. 44 ⚠) | OT **rate row** for the workday day-group → typed premium event | ✅ | [API][UI] | Emit the OT-hours event at the workday rate; the **% is downstream money** (out of scope). `phases[]` rate row |
| 4 | **Rest-day OT ≥200%, OR a compensatory rest day in lieu.** Work on a weekly rest day pays ≥200% if no comp-rest is granted (Art. 44 ⚠) | Rest-day **rate row** (`daysMask` "DSR & Rest days") **+** banked-hours / TOIL for comp-off-in-lieu | ✅ | [API][UI] | Premium **emission** ✅ via a rest-day rate row. The **comp-rest-in-lieu** path rides the hours bank (S6) — partial: the *choice* between pay vs lieu day isn't a modelled gate |
| 5 | **Statutory-holiday OT ≥300%.** Work on a statutory public holiday pays ≥300%, with **no** comp-rest substitution (Art. 44 ⚠) | Holiday **rate row** (`daysMask` Holiday bit) + holiday calendar (`SourceHoliday`) | ✅ | [API][UI][FLD] | Holiday bit on the rate row + jurisdiction-keyed holiday calendar. Premium emission fits |
| 6 | **OT hard cap — 1h/day (→3h/day with consultation).** Daily overtime is limited to 1h ordinarily, up to 3h under special need (Art. 41 ⚠) | Alerts / notifications (alert-only); **no working-time-limit breach flagging** | 🟠 | [API][ABS] | **Alert-only mitigation** (`extraHoursBalanceAlert`, Daily period) can warn; a **true daily-3h breach flag** is absent `[ABS]`. We compute pay, not limit enforcement |
| 7 | **OT hard cap — ≤36h/month.** Monthly overtime may not exceed 36h (Art. 41 ⚠) — a running monthly total | Overall **period cap** on OT (weekly/monthly/yearly/custom, single period) | 🟠 | [API][ABS] | **Partial:** the monthly overall cap (S7) can be set to 36h — but it **caps/converts** overflow rather than **flagging a breach**, and the **1h/3h-daily × 36h-monthly interplay** isn't jointly tracked `[ABS]` |
| 8 | **Three working-hour systems — the regime gate.** Standard / comprehensive / flexible decides whether OT is owed and whether limits bind. Which one applies must be selected **before** OT runs | One arrangement = **one pay policy**; no regime-classification axis | 🟠 | [UI][DES][ABS] | **Partial:** each regime can be built as its **own pay policy** (a standard policy with OT rows; a flexible policy with none) — but the **classification / gate** deciding *which regime applies* to a worker is absent (G5) `[ABS]` |
| 9 | **Comprehensive system — hours-averaging over a cycle.** Hours are averaged over a week/month/quarter/year; OT is owed only on the total **beyond the standard for the cycle** (holiday work still ≥300%) | — | ❌ Gap | [ABS] | **No annualised / averaging-OT primitive.** The 1–18-month hours bank (S6) can *net* balances but does **not compute OT on cycle-excess-above-standard**. This is China's defining OT determinant for peak/trough sectors |
| 10 | **Flexible / non-fixed system — no OT, no limits.** Roles measured by a loose monthly target (executives, sales, drivers, field staff) earn no OT and are bound by no daily/weekly limits | Model as a pay policy with **no OT rate rows** (crude: assign a no-OT policy) | ✅ | [UI][DES] | Same shape as an exempt/day-count regime elsewhere — a policy that emits no OT. 🔎 statutory-holiday premium under Flexible **varies by locality** (research: open) |
| 11 | **Regime authorisation state.** Comprehensive and flexible are **not** unilateral — each needs local labour-bureau approval to apply lawfully; that authorisation is an input the calc must respect | — | ❌ Gap | [ABS] | **No authorisation-state input.** The engine has no field for "this arrangement is bureau-approved for regime X" — part of the regime gate (G5). Today it would be an operational/manual precondition |
| 12 | **Weekly rest — ≥1 rest day per week.** At least one full rest day in the workweek | Rest days expressed at the **schedule** level; DSR & Rest-days rate row for premium | 🟠 | [DES] | **Handled at the schedule level**; a "<1 rest day this week" **breach flag** is on-demand/report-export, not a standard validation `[ABS]` |
| 13 | **Statutory public-holiday calendar.** The national holidays (and their make-up-workday shifts) drive holiday classification | Holiday calendar (`SourceHoliday`), jurisdiction-keyed | ✅ | [FLD] | Reference data; the Holiday bit feeds #5. 🔎 China's **holiday make-up (调休) workday swaps** — whether the calendar expresses a normal weekend day *re-designated a workday* — unconfirmed |
| 14 | **Night premium (if any).** A night-hours uplift | `nightShift {%, start, end}` premium band | 🔎 | [API] | **Requirement under-sourced:** the research file is **silent**, and China has **no general national statutory night premium** (it's local/sectoral where it exists). The **capability** (S8) is present if a local rule applies — but don't assert the *requirement* |
| 15 | **Annual leave accrual by service years.** Paid annual leave scales with length of service (commonly 5 / 10 / 15 days at <10 / 10–20 / >20 yrs ⚠) — a service-tenure accrual | — | ❌ Gap | [ABS] | **No leave-accrual ledger** keyed to service years. Adjacent to core T&A (absence/leave management); the entitlement count is T&A even though the pay is downstream. Research file silent — service-year bands are ⚠ general knowledge |
| 16 | **Record all working hours.** Capture hours worked, not just overtime | Engine records every punch; approved-event locking | ✅ | [FLD] | Satisfied — the same records value-add noted for other jurisdictions |

## Summary — rule-by-rule

Of **16 rules**: **7 ✅ · 1 🟡 · 4 🟠 · 3 ❌ · 1 🔎.**

**Supported (✅, 7):** standard 40h/week weekly onset (#2, `[PO]`), the three OT premiums —
workday/rest-day/holiday (#3–5), flexible-system no-OT policy (#10), holiday calendar (#13), record-all-hours
(#16). **Configurable (🟡, 1):** standard 8h/day daily onset (#1) — works when the planned shift is the 8h
standard, with the G1 planned-relative caveat. The **premium-emission half of China fits well.**

Eight rules are **not fully supported**:

| # | Rule | Verdict | Why it's open |
|---|---|---|---|
| 9 | Comprehensive-system cycle-averaging | ❌ Gap | No averaging/annualised-OT primitive — the bank nets, it doesn't compute cycle-excess OT |
| 8 | Three-regime gate | 🟠 Partial | Policy-per-regime works; the classification axis deciding *which* regime applies is absent |
| 11 | Regime authorisation state | ❌ Gap | No bureau-approval input; manual/operational precondition today |
| 15 | Annual leave accrual by service years | ❌ Gap | No service-year accrual ledger (adjacent to core T&A) |
| 6 | Daily 1h/3h OT cap | 🟠 Partial | Alert-only; no true daily-cap breach flag |
| 7 | Monthly 36h OT cap | 🟠 Partial | S7 monthly cap serves partially — caps/converts, doesn't flag; daily×monthly interplay untracked |
| 12 | Weekly rest ≥1/week | 🟠 Partial | Schedule-level; breach-flag is on-demand, not standard |
| 14 | Night premium | 🔎 Verify | Requirement under-sourced (no national statutory night premium); capability exists if a local rule applies |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — that's the premium-emission core (#1–5, #10, #13, #16).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped, or core to the OT model) · 🟡 Medium (moderately common, or a usable
> mitigation, or moderate build; typically obligations that don't corrupt computed pay) · 🟢 Low (narrow
> population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Chinese market* a rule bites. **⚠ Customer-relative** — shifts
>   with the workforce: **retail / transport / tourism / seasonal → #9 comprehensive averaging flips to
>   Critical** (that's the regime those sectors run on); an executive/sales-heavy customer leans on #10/#8.
> - **Build-effort** = my estimate, **grounded in the toolkit** (`[API]`/config ≈ **S**; `[DES]` ≈ **M**;
>   net-new subsystem ≈ **L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (China market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#9 Comprehensive-system cycle-averaging** | **Partial** — the 1–18-month hours bank can *net* balances, but it does **not** compute OT on cycle-excess-above-standard, so the OT quantity itself is wrong for these workers | **Med general / Critical in comprehensive-regime sectors** (retail, transport, tourism, seasonal) | **L** — period-averaging + cycle-close true-up (net-new; shares the annualisation primitive) | 🟠 **High** |
| **#8 Three-regime gate** | **Partial** — build each regime as its own pay policy; the classification deciding *which* applies is manual/operational | **Med-High** — every China customer picks a regime, though the default *standard* regime needs no gate for most | **M** — a regime axis + classification (G5) | 🟠 **High** |
| **#7 Monthly 36h OT cap** | **Partial** — set the S7 monthly overall cap to 36h; it **caps/converts** overflow rather than flagging, and the daily×monthly interplay isn't jointly tracked; **pay itself stays computable** | **High** as a legal obligation (all standard-system workers) | **S-M** — add breach-flag + joint daily/monthly counter atop the existing monthly cap | 🟡 **Medium** |
| **#6 Daily 1h/3h OT cap** | **Partial** — the Daily-period extra-hours alert can warn on the threshold; a true breach flag is absent; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **S** — single-period daily threshold flag | 🟡 **Medium** |
| **#11 Regime authorisation state** | **Partial** — treat bureau approval as an operational precondition to selecting the regime policy; no in-engine authorisation field | **Med** — only comprehensive/flexible arrangements need it | **S** — an authorisation-state flag/input | 🟡 **Medium** |
| **#15 Annual leave accrual by service years** | **Partial** — leave handled as absences/requests; the service-year accrual ledger (5/10/15-day bands) needs a leave module or manual tracking | **High**, but **adjacent** to core T&A (leave management), non-corrupting to worked-hours pay | **M** — accrual ledger keyed to service tenure | 🟡 **Medium** |
| **#12 Weekly rest ≥1/week** | **Strong** — handled at the schedule level; reports can export the data, breach-flagging added on demand | **High** as a legal obligation (non-corrupting) | **S** — formalize on-demand export into a standard breach alert | 🟢 **Low** |
| **#14 Night premium** | **Strong** — the night window+% is a configurable band **if** a local/sectoral rule applies; but the requirement itself is under-sourced | **Low-Med** — locality/sector-specific, unconfirmed | **S** — set a config value (no capability gap) | 🟢 **Low** / 🔎 Verify |

### Severity roll-up
- **🔴 Critical (0):** none in the general market — but **#9 comprehensive averaging flips to Critical** for a retail/transport/tourism/seasonal-heavy customer (that regime *is* how those sectors run).
- **🟠 High (2):** comprehensive-system cycle-averaging (#9), three-regime gate (#8) — the two that define China's OT machinery.
- **🟡 Medium (4):** monthly 36h cap (#7), daily 1h/3h cap (#6), regime authorisation state (#11), annual leave accrual (#15).
- **🟢 Low (2):** weekly rest ≥1/week (#12), night premium (#14, 🔎).

## The big gaps
1. **Comprehensive-system cycle-averaging** (#9, `[ABS]`) — averaging hours over a week/month/quarter/year and computing OT on the cycle-excess. Our hours bank nets balances but doesn't *determine* OT from an averaged cycle. This is **pay-determining** for the sectors that run comprehensive time.
2. **The three-regime gate + authorisation** (#8, #11, `[ABS]`) — a regime axis (standard / comprehensive / flexible) that classifies a worker and gates whether OT and limits fire at all, plus the bureau-approval state that makes comprehensive/flexible lawful. We can model each regime as a separate policy, but not the *gate*.
3. **OT limit-validation** (#6, #7, #12, `[ABS]`) — the 1h/3h-daily and 36h-monthly OT caps and the ≥1-rest-day rule are **limit enforcement** (flag a breach), which our pay-calculation engine doesn't do; alert-only and single-period-cap mitigations exist but aren't true validation.

## Where China scores well (worth saying)
- **The three statutory OT premiums** (#3–5): workday 150% / rest-day 200% / holiday 300% map directly onto
  OT **rate rows by day-group** (`daysMask` workday / rest-day / holiday) — the % is downstream `[API][UI]`.
- **Standard-system onset** (#1–2): the 40h/week trigger now computes `[PO]`, and the 8h/day surplus-above-planned
  gives the daily leg when scheduled as an 8h day `[API][UI]`.
- **Flexible-system fit** (#10): a no-OT regime is exactly a policy with no OT rows — a clean model `[UI][DES]`.
- **Rest-day comp-off-in-lieu** (#4): the hours bank / TOIL can carry the compensatory-rest path `[API]` (partial).
- **Holiday calendar** (#13) + **record-all-hours** (#16) — both present `[FLD]`.

## 🔎 Verify before telling the customer
- **The legal source is thin** — statutory specifics (8h/40h, 1h/3h + 36h/month, 150/200/300%, approval
  requirements) are self-labelled **⚠ to-be-verified** in the research file; confirm current statutory text
  before any hard commitment.
- **Night premium** (#14): the research file is silent and there is **no general national statutory night
  premium** — confirm whether the customer's locality/sector imposes one before claiming (or needing) it.
- **Annual-leave service-year bands** (#15): the 5/10/15-day figures are general knowledge, not sourced here.
- **Holiday make-up (调休) workday swaps** (#13): confirm the calendar can express a weekend day *re-designated
  a workday* around Golden Week / Spring Festival.
- **Flexible + statutory holidays** (#10): whether the 300% holiday premium still applies under the flexible
  regime **varies by locality** — open in the research file.
- **Weekly OT** (#2): marked ✅ per product-owner confirmation (2026-07-18), **not yet `[API]/[UI]`-visible**.

## Bottom line for the customer
China's **overtime *premiums* fit us well** — the workday/rest-day/holiday 150/200/300% structure maps onto
our OT rate rows, the weekly-40h onset now computes, and the flexible (no-OT) regime is a clean policy shape.
What we **don't** ship is China's *defining* machinery: the **three-regime gate** that decides which rules
apply to a worker, and the **comprehensive system's hours-averaging over a cycle** — the OT determinant for
retail, transport, tourism and seasonal work. Add the OT **limit-validation** (1h/3h-daily, 36h-monthly caps)
that our pay engine doesn't enforce, and an under-sourced legal file, and the honest status is: **partial —
strong on standard-system premium emission, weak on the regime gate and comprehensive-hours averaging; the
standard-regime, standard-workforce case is largely servable, the comprehensive/flexible regimes are
roadmap.**
