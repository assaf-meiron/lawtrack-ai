# South Africa — T&A requirements

> **What this is.** The ground-truth reference for South Africa's time-&-attendance legal
> requirements, detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive**
> and **atomic**: **one legal proposition per row**, each row self-contained (no "see §X" as the
> only content), with exact values, a worked example wherever a number is involved, variants, and a
> `Basis` that **links to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, Rand amounts, tax, UIF, gross-to-net) is downstream
> *context* here (premiums are named for context in `Values`, but the deliverable is the typed
> hour/day event). Where a premium is statutory it is expressed as a **multiplier** (`×1.5`, `×2`)
> and the **basis** it attaches to; South Africa has no minimum-wage-basis premium split — every
> premium bases off the employee's own ordinary wage.
>
> **Term convention:** every South African legal acronym or Latin/Afrikaans-derived term is glossed
> in English in brackets on first use, e.g. *BCEA* [Basic Conditions of Employment Act].
>
> **Legal sources & links:** the **Basic Conditions of Employment Act 75 of 1997** [BCEA] (linked to
> its [gov.za act page](https://www.gov.za/documents/basic-conditions-employment-act), confirmed
> live this pass), the **Public Holidays Act 108/1994**, **National Minimum Wage Act 9/2018**, and
> **Labour Relations Act 66/1995** (linked to the [gov.za Acts register](https://www.gov.za/documents/acts)
> — base-register links, not deep-linked to the specific gazette page, so marked 🔎), the
> **Department of Employment and Labour**'s annual Earnings Threshold Determination and sectoral
> determinations (linked to [labour.gov.za](https://www.labour.gov.za/) 🔎), and the *Van Wyk*
> Constitutional Court judgment (linked to [concourt.org.za](https://www.concourt.org.za/) 🔎, its
> specific case page could not be confirmed live this pass). Repo seed:
> `context/worldwide-calculations/south-africa.md` (July 2026) + the predecessor
> `support-memos/south-africa.md` (verdict-first memo, preserved verbatim in the appendix below).
> **Web-search budget for this pass: 3 calls**, spent confirming the register URLs above — every
> *value* below is carried forward from the July 2026 seed's primary-source citations, not
> re-derived; a handful of rows outside that seed's coverage (minors, fixed-term deeming, disability
> accommodation) are marked 🔎 and should be re-verified before being relied on operationally.
>
> **The one structural fact that shapes this whole document.** South Africa is **not** a single flat
> rulebook. The **BCEA 75/1997** (the residual national floor) prices overtime, Sunday, and
> public-holiday premiums **directly in the statute** — unusual among comparator countries
> (Germany/Netherlands/UK put no % in the statute at all) — but **sectoral determinations** (BCEA
> Ch.8) and **bargaining-council main agreements** (LRA 66/1995) vary wages and, in places,
> working-time conditions **sector by sector**, and bind **ahead of** the bare BCEA (which applies
> only "in respect of any matter not dealt with"). A **gazetted, date-effective earnings threshold**
> (BCEA s.6(3)) then switches the **entire working-time chapter** off for higher earners. Resolve
> both the sector layer and the threshold gate before quoting any number below — §1 covers each in
> full.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Governing-source layering** | Statute (**BCEA** + **Public Holidays Act** 108/1994 + **NMW Act** 9/2018, basis only) sets the operative numbers; **sectoral determinations / bargaining-council agreements** vary them sector-by-sector and bind **first**; the bare BCEA is the **residual gap-filler** — applies only to matters the sector instrument leaves untouched. | Example: a private-security guard's hours/conditions are set first by the National Bargaining Council for the Private Security Sector's main agreement; only what it's silent on falls back to the bare BCEA. | Domestic work (SD7), farm work (SD8), wholesale & retail (SD9), contract cleaning (SD1), private security (SD6/NBCPSS), forestry (SD12), hospitality (SD14), taxi, learnerships, children in advertising/arts/culture. | [BCEA Ch.8](https://www.gov.za/documents/basic-conditions-employment-act); [LRA 66/1995](https://www.gov.za/documents/acts) 🔎 |
| **Earnings threshold (s.6(3)) — the master gate** | Above the gazetted annual amount, the **entire working-time chapter** (ss.9, 10, 11, 12, 14, 15, 16, 17(2), 18(3)) is switched off. Threshold history: R211,596.30 (1 Mar 2021) → R224,080.48 (1 Mar 2022) → R241,110.59 (1 Mar 2023) → R254,371.67 (1 Apr 2024) → R261,748.45 (1 Apr 2025) → **R269,600.90 (1 May 2026, current)**. | Example: Thandi earns R320,000/yr (above R269,600.90) — identical punches to a below-threshold colleague produce only `WORKED_HOURS`/`MISSING_HOURS`; no `OT_1_5`, `SUNDAY_2X`, `NIGHT_ALLOWANCE`, or `PUBLIC_HOLIDAY_2X` events fire. | The threshold is **date-effective** — it has moved every year for ≥5 years, and the re-gazetting month itself has drifted (Mar → Apr → May). | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.6(3) + annual Earnings Threshold Determination |
| **Earnings definition for the threshold test** | The test runs on **regular annual remuneration before deductions** (tax, pension/provident, medical aid), **excluding** the employer's matching contributions — and critically **excluding overtime pay, allowances (subsistence/transport), and achievement awards**. | Example: an employee with a R250,000 base plus R30,000 in variable OT pay over the year (R280,000 gross) is tested against the R250,000 base — below the R269,600.90 line, so the working-time chapter still applies. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.6(3) Earnings Threshold Determination |
| **What stays ON above the threshold** | Annual leave (s.20), sick leave (s.22), family-responsibility leave (s.27), parental/maternity leave (ss.25/25A–C), and the s.31 recordkeeping duty are **not** in the excluded list — they keep running for threshold-exempt workers. | Example: Thandi (above threshold) still accrues annual/sick leave and has every punch recorded, identically to a below-threshold colleague. | Do **not** model this as an FLSA-style blanket exemption — that conflates the SA gate (narrower) with the US one. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.6(3) (exclusion list, by omission) |
| **Category exclusions (s.6(1)) — independent of earnings** | Excluded from Ch.2 (except s.7) regardless of pay: **senior managerial employees** (an authority test — hire/discipline/dismiss + represent the employer, **not** a pay/title test); **travelling sales staff who regulate their own hours**; **employees working <24h/month** for that employer. | Example: a branch manager with hire/fire authority is excluded from OT rules even on an ordinary salary; a "manager" job title with no such authority is **not** excluded. | s.7 (the employer's general duty to regulate working time per the Code of Good Practice) still applies to every excluded category. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.6(1), s.7 |
| **Total exclusions from the whole Act (s.3)** | The entire BCEA does not apply to: **National Defence Force**, **National Intelligence Agency**, **South African Secret Service** (State Security Agency), and **unpaid volunteers** for a charitable organisation. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.3 |
| **Minors / child labour (ss.43–48)** 🔎 | Employment of a child **under 15** (or below the compulsory school-leaving age if higher) is prohibited outright; employment of a child aged **15–17** in work inappropriate to their age, or that places their well-being, education, or development at risk, is prohibited; the Minister may further regulate 15–17 working conditions/hours by sectoral determination. | Example: a 14-year-old cannot lawfully be rostered at all; a 16-year-old may work only where the role isn't hazardous and any sector-specific hour limits are respected. | Sectoral determinations may impose tighter youth-specific hour caps (e.g. children in advertising/arts/culture). | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) ss.43–48 🔎 (clause detail not in the seed research — confirm exact subsection wording before shipping) |
| **Part-time employees — no separate statutory working-time regime** | BCEA applies uniformly to part-timers; the only part-time-specific mechanic is that **OT is measured against the worker's own contracted hours**, not the 45h/9h/8h statutory ceiling (see §3a). | — | Equity in pay/benefits (not hours) is an Employment Equity Act / LRA concern, out of T&A scope. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.9 (contract-based OT baseline) |
| **Fixed-term contracts — deemed-permanent trigger** 🔎 | A fixed-term contract exceeding **3 months**, for employers above a small-business employee-count threshold, must be objectively justified or the employee is deemed employed indefinitely. | — | Employers below the applicable small-business threshold are exempt from the deeming provision. | [LRA 66/1995](https://www.gov.za/documents/acts) s.198B 🔎 (exact employee-count thresholds unconfirmed — verify before shipping) |
| **Disabled employees — no BCEA hours/leave carve-out** 🔎 | The BCEA sets **no** extra-leave or reduced-hours entitlement tied to disability (contrast Germany's SGB IX +5 leave days). Reasonable accommodation — which may include adjusted hours/schedule — is a case-by-case Employment Equity Act duty, not a fixed T&A parameter. | — | — | — none identified at BCEA level —; [Employment Equity Act 55/1998](https://www.gov.za/documents/acts) s.6 🔎 |
| **Sectoral determinations, bargaining councils & the Small-Business Determination** | BCEA Ch.8 sectoral determinations set minimum wage and, in places, working-time variants per sector (SD1 cleaning, SD6/NBCPSS security, SD7 domestic, SD8 farm, SD9 wholesale & retail, SD12 forestry, SD14 hospitality, taxi); a bargaining-council main agreement can **supersede** the equivalent SD; the **Ministerial Determination for Small Business** relaxes overtime, averaging, and family-responsibility-leave rules for employers with **fewer than 10 employees**. | Example: a 6-employee retailer applies the Small-Business Determination's relaxed OT/averaging/family-responsibility rules instead of the bare BCEA defaults. | Since 2024/2025 most sectoral minimum-wage rates converged on the NMW floor; working-hours variants can still differ sector to sector. | BCEA Ch.8; [LRA 66/1995](https://www.gov.za/documents/acts); Ministerial Determination for Small Business 🔎|
| **National Minimum Wage (basis only, not a T&A threshold)** | **R30.23/hour** from 1 March 2026 (up from R28.79); domestic/farm workers same rate; EPWP (Expanded Public Works Programme) rate R16.62/hour. | — | Never conflate with the s.6(3) earnings threshold — opposite classification purpose (wage **floor** vs working-time **ceiling**). | [NMW Act 9/2018 + 2026 amendment gazette (Gov. Gazette No. 54075)](https://www.gov.za/documents/acts) 🔎|
| **⚠ Pending-reform flag — parental leave** | The *Van Wyk* interim parental-leave regime (§10.7) is operative **now** (from 3 Oct 2025) but Parliament has until **~Oct 2028** to enact permanent remedial legislation that may change the quantities/defaults. **Not yet settled law in its final form** — do not treat the interim numbers as permanent. | — | — | [Van Wyk](https://www.concourt.org.za/) 🔎 (CCT 308/23) [2025] ZACC 20 — an interim reading-in, not yet a standalone Act |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **"Working time" — statutory definition** | Time, in terms of the contract of employment, during which an employee is required to work or be available to work, **excluding** any meal/rest interval genuinely free from duties. | Example: a scheduled 08:00–17:00 shift with a 1h unpaid, duty-free meal interval = **8h** working time, not 9h. | If the employee must work or be available during the "interval," it is not excluded — it is worked/on-call time instead (§8). | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.1 ("working time" definition) |
| **Travel time** | No BCEA rule addresses ordinary commuting or business-travel time as "working time." | — | Silent — governed by contract/sectoral determination where addressed at all. | — none identified in current research — |
| **Cross-midnight shift attribution** 🔎 | No explicit BCEA rule on which calendar day a shift crossing midnight counts against for daily-hours purposes. | — | Engine-standard treatment (attribute to the day the shift started) — not a statutory position. | — none identified in current research — |
| **On-hand / standby classification** | Time actually worked during standby/on-call is working time; the availability portion alone is not — see §8 for the full standby treatment. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10 (worked-hours definition, by inference) |

## 3. Overtime

*South Africa is one of the few statutory-premium countries in this reference set: the BCEA prices overtime, Sunday, and public-holiday work directly (×1.5 / ×1.5–×2 / ≥×2). The one hybrid: night pay carries no statutory % at all (§5).*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **OT only by agreement (s.10(1)) — no compulsory overtime** | Absent an agreement (a standing contract clause or a case-by-case arrangement), overtime cannot be required. | Example: an employer instructing an employee to stay late with no OT agreement in place cannot lawfully compel this — though the hours actually worked are still paid. | Sectoral determinations/Small-Business Determination may relax the agreement formality in places. 🔎 | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10(1) |
| **OT onset = surplus above the employee's own contracted ordinary hours** | OT is measured against the **contracted** figure, which may be **below** the 45h/9h/8h statutory maxima — an agreement requiring the full 45h/week (or 195h/month) before OT is payable is **invalid**. | Example: a 40h/week contract worker who works 45h has **5 OT hours from the 41st hour**, not from the 46th. | Compressed-week (s.11, §9) and averaging (s.12, §3d) redefine the baseline reference period. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.9, s.10(1) |
| **Ordinary-hours ceiling (s.9) sets the reference norm** | **45h/week**; **9h/day** if the employee works ≤5 days/week, or **8h/day** if >5 days/week. | Example: a 5-day-week contract caps daily ordinary hours at 9h; a 6-day-week contract caps at 8h. | Maxima, not entitlements — a lower contracted figure drives the OT trigger instead (row above). | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.9 |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Overtime premium — ×1.5** | ×1.5 of the employee's own ordinary wage for every overtime hour — no minimum-wage-basis split. | Example: 3 OT hours worked at the ordinary rate are priced at ×1.5 for those 3 hours. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10(2) |
| **TOIL alternative instead of cash (s.10(3))** | By agreement: **90 minutes'** paid time off per OT hour worked, **or** ordinary wage for the hour **plus ≥30 minutes'** paid time off. | Example: 4 OT hours converted under the 90-min ratio owe **6h** of paid time off. | Drawdown window: within **1 month**, agreement-extendable to **12 months**. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10(3) |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily total cap — 12h (incl. ordinary)** | 12h/day total; OT headroom on a given day = 12h − ordinary hours already worked that day. | Example: a 9h ordinary day leaves **3h** of lawful OT headroom that same day. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10 |
| **Weekly OT cap — 10h, collective-agreement-raisable to 15h (time-boxed)** | Default **10h/week**; a collective agreement may raise this to **15h/week**, but for **≤2 months in any 12-month period**. | Example: 3 OT hours (Monday) + 6 OT hours (Saturday) = **9h**, within the 10h default cap. | Small-Business Determination relaxes this cap for employers with <10 employees. 🔎 | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10(1)(a) |
| **No statutory annual OT cap** | None — South Africa caps overtime **only** per day and per week, never annually (contrast Poland 150h/yr, Portugal 150–200h/yr). | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10 (silent on an annual ceiling — don't invent one) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **s.12 averaging of hours — collective agreement, ≤4 months** | Nets **both** ordinary (≤**45h/wk average**) and overtime (≤**5h/wk average**) hours over an agreed period of **up to 4 months** — this determines whether OT is owed at period close, not per day/week. | Example: a plant runs 50h weeks for 6 weeks and 40h weeks for the other 10 weeks of a 4-month cycle; if the 4-month average stays ≤45h ordinary + ≤5h OT/week, no additional OT is owed on the peak weeks. | Requires a **collective** agreement (not merely individual) — distinct from the individual-agreement s.11 compressed week (§9). | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.12 |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Typed premium tracks run in parallel and stack additively, never fold into one band** | OT (×1.5), Sunday (×1.5/×2), public-holiday (≥×2), and the night allowance each ride their **own** statutory hook and stack **additively** where they overlap on the same hour — Sunday/holiday hours are **not** folded into the OT band even though they are also "extra" hours for the week. | Example: 2 hours worked 18:00–20:00 as overtime → `OT_1_5` fires on both hours **and**, since they fall in the 18:00–06:00 night window, `NIGHT_ALLOWANCE` fires additively on the same 2 hours if the employer's night policy is configured. | Sunday hours still increment the s.10 weekly-OT-cap counter even though priced under s.16, not s.10 — a genuine trap (see §6). | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) ss.10, 16, 17, 18 (separate premium sections; no compounding/de-pyramiding rule stated) |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekly ordinary-hours ceiling — 45h, as an absolute breach flag** | 45h/week, flagged if breached **independent** of a lower contracted OT baseline. | Example: an employee contracted for 40h/week who works 50h breaches both their own OT baseline **and**, separately, the absolute 45h statutory ceiling. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.9 |
| **Daily rest — ≥12h between shifts** | ≥**12 consecutive hours** between the end of one working day and the start of the next; reducible to **10h** for **live-in staff** with a **≥3h** meal interval. | Example: a shift ending 22:00 means the next start is no earlier than **10:00** the next day. | Live-in domestic/farm workers: 10h reduction. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.15(1) |
| **Weekly rest — ≥36 consecutive hours** | ≥**36h**, including a Sunday by default (unless otherwise agreed); agreement variants: ≥**60h every 2 weeks**, or reduced by **≤8h** in a given week with the following week's rest extended by the same amount. | Example: a worker resting Saturday 18:00 to Monday 06:00 gets a 36h rest including the Sunday. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.15(2) |
| **Meal interval — ≥1h after 5h continuous work** | ≥**60 min** after **5 continuous hours**; agreement-reducible to **≥30 min**; waivable entirely for shifts **<6h**. | Example: an 8h shift needs a ≥1h break (or ≥30 min by agreement) after the first 5 continuous hours. | Paid if the employee is required to work or be available for work during it. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.14 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night work window — 18:00–06:00** | Window: **18:00** to **06:00** the next day. | Example: hours worked 19:00–21:00 count as **2h** `NIGHT_HOURS`. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.17(1) |
| **Night compensation — allowance or reduced hours, no statutory %** | The employer must compensate night work by **either** a shift/night allowance **or** a reduction of working hours (e.g. paid for 9h while working 7) — the amount/reduction is set **entirely by agreement**, with **no statutory default percentage**. | Example: a night-shift agreement sets a 12% allowance on night hours, **or** the employer instead schedules 7 worked hours while paying for 9. | The one dimension where SA's posture matches the Dutch/UK contract-premium model rather than a fixed-%-on-a-basis model. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.17(1) |
| **Night work requires employee agreement** | Night work may only be required/permitted **if the employee agrees**. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.17(1) |
| **Night transport duty** | Employer must arrange transportation between the employee's residence and the workplace at shift start and end. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.17(3) 🔎 |
| **Regular night-worker status — >1h between 23:00–06:00, ≥5×/month or ≥50×/year** | A rolling classifier that triggers a written hazard disclosure and a right to a medical examination. | Example: an employee rostered 23:00–07:00 four nights a week for a month crosses the ≥5×/month threshold and is classified a regular night worker. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.17(2)–(4) 🔎 |
| **Night pay excluded above the earnings threshold — pay subsection only** | Only the **pay** subsection (s.17(2)) is excluded above the s.6(3) threshold; the underlying agreement/transport/hazard-disclosure duties (s.17(1)) are **not** listed as excluded — likely survive threshold-exemption. 🔎 | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.6(3), s.17 |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Public-holiday calendar — 12 national holidays + Sunday→Monday roll + ad-hoc gazetted** | **12** fixed/Easter-derived holidays: New Year's Day, Human Rights Day, Good Friday, Family Day, Freedom Day, Workers' Day, Youth Day, National Women's Day, Heritage Day, Day of Reconciliation, Christmas Day, Day of Goodwill. A holiday falling on a **Sunday rolls to the following Monday**; the Minister may proclaim **ad-hoc** holidays (e.g. election days). | Example: Human Rights Day (21 March) falling on a Sunday rolls the public holiday to Monday 22 March. | **No** equivalent roll for a Saturday holiday — it simply passes without a substitute day. | [Public Holidays Act 108/1994](https://www.gov.za/documents/acts) 🔎|
| **Randfontein double-pay edge — Sunday holiday that is also an ordinary working day** | Where a public holiday falls on a **Sunday that is itself an ordinary working day**, and the following Monday becomes the substitute holiday, an employee who works **neither** day is entitled to **normal pay for both**. | Example: an employee who ordinarily works Sundays, on a Sunday public holiday rolling to Monday, working neither day, is paid for **both** the Sunday and the rolled Monday. | — | [Randfontein Estates Ltd v NUM](http://www.saflii.org/za/cases/ZALAC/) 🔎 (Labour Appeal Court) |
| **Worked public holiday — ordinarily-working day: ≥×2** | At least **double** the amount ordinarily received for the day, **or** (if greater) ordinary pay **plus** the amount earned for time worked — whichever is more. | Example: an employee who ordinarily works Wednesdays works their normal 9h on a Wednesday public holiday → paid **≥×2** for that day. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.18(2)(a) |
| **Worked public holiday — NOT an ordinarily-working day: ordinary daily wage + 1× worked** | Normal daily wage (a floor) **plus** the amount earned for hours actually worked. | Example: an employee not normally rostered Saturdays who works 6h on a Saturday public holiday gets their normal daily wage **plus** pay for the 6h worked. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.18(2)(b) |
| **Public holiday not worked — paid day off** | An ordinarily-working day that falls on an unworked public holiday is a **paid day off**. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.18(1) |
| **Public-holiday work only by agreement** | An employer may not require an employee to work a public holiday **except by agreement**. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.18(2), chapeau |
| **Sunday work — occasional: ×2** | **×2** for hours worked, where the employee does **not** ordinarily work Sundays. | Example: a weekday-only worker called in for 4h on a Sunday is paid 4h at **×2**. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.16(1) |
| **Sunday work — ordinarily works Sundays: ×1.5** | **×1.5** for hours worked, where the employee **does** ordinarily work Sundays. | Example: a retail assistant rostered every Sunday who works a 6h Sunday shift is paid 6h at **×1.5**. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.16(2) |
| **Sunday pay floor** | If the calculated Sunday pay is **less** than the employee's ordinary daily wage, the ordinary daily wage is paid instead. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.16(3) 🔎 |
| **Sunday paid-time-off alternative** | By agreement, **paid time off** equal in value to the enhancement difference, instead of cash. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.16(4) 🔎 |
| **Sunday work runs in parallel with the s.10 weekly-OT cap — a trap** | Sunday hours are priced under s.16 but **still count** toward the s.10 weekly-overtime-cap counters (§3c) if they push the week's total over the cap. | Example: a Sunday's 4h (priced ×2 under s.16) is separate from — but still adds to — the weekly OT-cap tally alongside other OT hours that week. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) ss.10, 16 (no netting provision between them) |
| **Sunday and non-ordinarily-worked-holiday pay excluded above the earnings threshold** | s.16 (Sunday) and s.18(3) (holiday pay when not ordinarily worked) are excluded above the threshold; **s.18(2)** (pay when worked) is **not** in the excluded list — likely survives threshold-exemption. 🔎 | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.6(3) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **COMP_TIME_OFF — a per-incident swap, not an accruing bank** | 90 minutes' paid time off per OT hour, **or** ordinary wage for the hour plus **≥30 min** paid time off; drawn down within **1 month** (agreement-extendable to **12 months**). | Example: 4 OT hours converted at the 90-min ratio owe **6h** of time off, to be taken within 1 month (or up to 12 by written agreement). | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10(3) |
| **No general working-time-account / annualised-hours bank** | None — the only "ledger" concept is the per-incident `COMP_TIME_OFF` swap above; South Africa has **no** Netherlands-style ADV/ATV, no Poland-style day-off-in-lieu ledger, and no Portugal-style *banco de horas* [hours bank] with cyclical expiry-to-cash conversion. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) (silent) |
| **Sunday & public-holiday lieu alternatives are separate, day-specific mechanics** | See §6 (Sunday paid-time-off, s.16(4)) — a distinct, day-specific lieu mechanism, **not** part of the general OT TOIL ledger above. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.16(4) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory on-call/standby regime** | The BCEA fixes **no** framework, formula, or ratio for standby; arrangements exist by written agreement, with compensation set contractually or by the applicable sectoral determination/bargaining-council agreement. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) (silent); sectoral determinations may add specifics. 🔎 |
| **Call-out worked time folds into ordinary/overtime** | Time **actually worked** during a call-out is ordinary working time (or overtime, if beyond the ordinary baseline) — only the waiting/availability portion is the unregulated "standby" piece. | Example: an on-call technician telephoned and working 40 minutes overnight has those 40 minutes counted as worked hours (potentially OT); the remaining on-call period carries no statutory treatment. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.10 (worked-hours definition, by inference) |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Compressed working week (s.11)** | By **written agreement**: up to **12h/day** (incl. the meal interval), **no OT premium** on those hours, provided the employee does **not** exceed **45 ordinary hours/week** and does not work more than **5 days** in that week. | Example: a 4-day, 11.25h/day compressed roster totals 45h/week with no OT payable on any of the 11.25h days. | Distinct from s.12 averaging (§3d) — an **individual** agreement redistributing a **single** week's hours, not a multi-month collective netting. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.11 |
| **No statutory show-up / reporting-time / predictability pay** | None — no BCEA equivalent of US CA/NYC predictability-pay or reporting-time-pay regimes. | — | — | — none identified in current research — |
| **No statutory split-shift premium** | None identified at the bare-BCEA level — any split-shift premium is CBA/sectoral-determination-specific. 🔎 | — | Sectoral determinations may add sector-specific split-shift rules (e.g. hospitality). 🔎 | — none identified at the bare-[BCEA](https://www.gov.za/documents/basic-conditions-employment-act) level — 🔎 |
| **Small-Business Determination — relaxed scheduling-adjacent rules for <10 employees** | Employers with **fewer than 10 employees** get relaxed rules specifically on overtime, averaging of hours, and family-responsibility leave. | Example: an 8-employee bakery applies the Small-Business Determination's relaxed overtime/averaging rules instead of the bare BCEA s.10/s.12 defaults. | — | [Ministerial Determination for Small Business](https://www.labour.gov.za/) 🔎|

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Annual leave (s.20)** | **21 consecutive days** per 12-month cycle (= **15 working days** on a 5-day week); agreement alternatives: **1 day per 17 days worked**, or **1 hour per 17 hours worked**. | Example: a 5-day-week worker completing a full cycle accrues 15 working days (21 consecutive calendar days); a worker on the 1d/17-worked alternative accrues ~1 day per 3.4 working weeks. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.20(1)–(2) |
| **No cash-out during employment; termination payout only** | Leave may not be paid out while employed; on **termination**, accrued untaken leave is paid at **1 day's remuneration per 17 days worked**, gated on **>4 months'** service. | Example: an employee resigning after 8 months with 10 unused days is paid out for those 10 days in the final payslip; an employee terminated after 2 months has no payout right. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.20(11)–(12) 🔎 |
| **Sick leave (s.22)** | **36-month cycle**; full entitlement = days normally worked in **6 weeks** (**30 days** on a 5-day week, **36 days** on a 6-day week); **first 6 months** of employment: sub-ladder of **1 day per 26 days worked**. | Example: a 5-day-week employee in month 2 who has worked 52 days has accrued 2 sick-leave days under the sub-ladder; from month 7, the full 30-day/36-month allocation becomes available. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.22 |
| **Family-responsibility leave (s.27)** | **3 days per annual leave cycle**; eligibility: **>4 months'** service + **≥4 days/week**; qualifying events: birth of the employee's child, sickness of the employee's child, death of spouse/life partner/parent/adoptive parent/grandparent/child/adopted child/grandchild/sibling. **Use-it-or-lose-it** (not cumulative across cycles). | Example: an eligible employee whose parent dies takes 2 of the 3 days; the unused 1 day does not carry to the next cycle. | Small-Business Determination relaxes this for employers <10 employees (§9). | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.27 |
| **Maternity leave — pre-2025 statutory scheme (s.25), superseded in practice** | **4 consecutive months** for the birth mother; mandatory **6-week** no-work period after birth unless medically certified fit; may start up to **4 weeks** before the expected birth date. | Example: under the pre-2025 scheme alone, a birth mother starting leave 3 weeks before her due date and needing the full mandatory recovery would take 4 consecutive months total, with the first 6 weeks after birth as compulsory no-work. | Superseded by the *Van Wyk* interim pool below — the birth-mother protection window survives **inside** the pool. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.25 (nominally on the books) |
| **Parental leave — pre-2025 statutory scheme (ss.25A/25B/25C), superseded in practice** | s.25A — **≥10 consecutive days** for the other parent; s.25B — **10 consecutive weeks** (or s.25A leave) for an adoptive parent of a child <2; s.25C — an equivalent entitlement for a commissioning parent in a surrogacy arrangement. | Example: under the pre-2025 scheme alone, the non-birth parent of a newborn would take the 10 consecutive days under s.25A, while an adoptive parent of a 1-year-old could instead elect the 10-consecutive-week s.25B entitlement. | Superseded by *Van Wyk* below. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) ss.25A, 25B, 25C |
| **⚠ *Van Wyk* interim parental-leave pool (operative now, not yet a permanent Act)** | A single shared pool of **4 months + 10 days** for biological/adoptive/commissioning parents; two employed parents **agree** the split (default: as-equal-as-possible absent agreement); a **sole** employed parent gets the **full** pool; the birth-mother protection window (−4wk pre-birth optional / +6wk post-birth mandatory no-work, medically waivable) **nests inside** the pool, not added to it. | Example: two employed parents of a newborn, absent agreement, each get roughly half of 4mo+10d (~2mo+5d); a single employed parent (partner unemployed / not covered) gets the **full** 4mo+10d. | Suspension of invalidity runs to **~Oct 2028** — Parliament's eventual Act may reset the quantities/defaults; treat as ⚠ not-yet-permanently-settled. | [Van Wyk and Others v Minister of Employment and Labour](https://www.concourt.org.za/) 🔎 (CCT 308/23) [2025] ZACC 20 (3 Oct 2025), reading in over ss.25/25A/25B/25C |
| **No statutory educational/study leave** | None — unlike Germany's *Bildungsurlaub* [educational leave], the BCEA has no general paid study-leave entitlement. | — | — | — none identified in current research — |
| **No BCEA disability-specific extra-leave entitlement** 🔎 | None at the bare-BCEA level — contrast Germany's SGB IX +5 leave days for severely disabled employees; SA disability protection runs through Employment Equity Act reasonable-accommodation duties (case-by-case, not a fixed day-count). | — | — | — none identified at BCEA level —; [Employment Equity Act 55/1998](https://www.gov.za/documents/acts) s.6 🔎 |
| **Bereavement — folded into family-responsibility leave** | See row above — death of a specified family member is one of the 3 qualifying events for the 3-day/cycle family-responsibility leave; **no separate/additional** bereavement entitlement identified. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.27 |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Record-keeping duty (s.31)** | Must record at minimum: **name & occupation**, **time worked**, **remuneration paid**, and **date of birth** if the employee is under 18. Retained **3 years** from the date of the last entry. | Example: a payroll system logging punch time, pay, and DOB-for-minors satisfies s.31 as long as records are kept 3 years. | An employer keeping the s.31 record need not duplicate records required by other employment laws. | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.31 |
| **Written particulars of employment (s.29)** | Name/occupation, workplace, remuneration frequency, leave entitlement, notice period, and other core contract terms, supplied at the start of employment; retained **3 years** post-termination. | Example: an employee whose contract ends in March 2026 has their written particulars retained until at least March 2029. | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.29 |
| **No statutory tolerance/rounding rule** | None — punch tolerance/rounding is a **policy or sectoral-determination configuration** choice. | — | — | — none statutory — |
| **Recordkeeping is NOT switched off by the earnings threshold** | ss.29 and 31 are absent from the s.6(3) exclusion list — every employee, threshold-exempt or not, needs full time records. | — | — | [BCEA](https://www.gov.za/documents/basic-conditions-employment-act) s.6(3), s.31 |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/south-africa.md` (July 2026).
- **[Basic Conditions of Employment Act 75 of 1997](https://www.gov.za/documents/basic-conditions-employment-act)** (consolidated) — gov.za act page confirmed live this pass; ss.3, 6, 7, 9–18, 20, 22, 25/25A/25B/25C, 27, 29, 31.
- **Department of Employment and Labour — 2026 BCEA Earnings Threshold Determination** — [labour.gov.za](https://www.labour.gov.za/) 🔎 (effective 1 May 2026, R269,600.90/yr); prior determinations via gov.za gazettes (2021–2025).
- **[National Minimum Wage Act 9 of 2018](https://www.gov.za/documents/acts)** 🔎 (base register link; specific act page not confirmed live); 2026 amendment gazette (Gov. Gazette No. 54075, eff. 1 Mar 2026, R30.23/hour).
- **[Public Holidays Act 108 of 1994](https://www.gov.za/documents/acts)** 🔎 — the 12 national public holidays + the Sunday→Monday roll.
- **[Labour Relations Act 66 of 1995](https://www.gov.za/documents/acts)** 🔎 — bargaining-council mechanism, agreement extension, s.198B fixed-term deeming.
- **Sectoral determinations (BCEA Ch.8)** — [labour.gov.za](https://www.labour.gov.za/) 🔎 sectoral-determination texts (SD1 Contract Cleaning, SD6/NBCPSS Private Security, SD7 Domestic Workers, SD8 Farm Workers, SD9 Wholesale & Retail, SD12 Forestry, SD14 Hospitality).
- ***[Van Wyk and Others v Minister of Employment and Labour; Commission for Gender Equality and Another v Minister of Employment and Labour and Others](https://www.concourt.org.za/)*** 🔎 (CCT 308/23) [2025] ZACC 20; 2026 (1) SA 38 (CC) (3 October 2025); underlying High Court judgment *Van Wyk* [2023] ZAGPJHC 1213 (25 October 2023).
- ***[Randfontein Estates Ltd v National Union of Mineworkers](http://www.saflii.org/za/cases/ZALAC/)*** 🔎 — Labour Appeal Court; the Sunday-holiday-rolls-to-Monday double-pay interaction.
- **[Employment Equity Act 55 of 1998](https://www.gov.za/documents/acts)** 🔎 — s.6 reasonable-accommodation duty (disability).
- **CCMA / Department of Employment and Labour guidance** — ccma.org.za, labour.gov.za — sectoral-determination texts, NMW guidance, BCEA statutory summary form.
- ⚠ **Not independently re-verified this pass**: rows flagged 🔎 (minors ss.43–48 clause detail, LRA s.198B thresholds, Employment Equity Act accommodation specifics, several BCEA subsection citations) were carried from the seed/general knowledge without a fresh primary-source fetch — the session's web-search budget was exhausted before this file was drafted. Confirm before operational use.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. This is the former verdict-first memo content — kept intact for when we
> resume the "can the engine do this?" question. Not maintained as part of the requirements
> reference above.

# South Africa — T&A compliance support

**Verdict: 🟠 Partial — a strong *premium-emission* fit, no Critical gaps.** South Africa's **Basic
Conditions of Employment Act (BCEA)** *prices* three premiums directly — overtime **×1.5**, Sunday work
**×1.5 / ×2**, public-holiday work **≥×2** — and each rides our **OT rate rows by day-group (S1) × the
day/night split (S2/S8) × rate-chaining (S3)** almost exactly. The one genuine hybrid, **night pay**, has
**no statutory percentage at all** (an allowance or reduced hours *by agreement*) — which fits our
**configurable night band with no built-in default** *even more* cleanly, the same way Germany's absent
statutory OT premium fits us. The gaps cluster where every statutory-premium country's do, plus one
structural axis: (1) the **earnings-threshold regime gate** (the master switch that turns the whole
working-time chapter off above a gazetted line — a US-exempt-style classification the engine has no axis
for), (2) **s.12 reference-period averaging**, (3) **limit-*validation*** (the 12h/10h OT caps, 12h/36h
rest, the 45h ceiling, meal intervals), and (4) **leave-accrual ledgers** (annual / sick / family-
responsibility / the interim parental pool). **No Critical gaps** — South Africa caps overtime **only per
day and per week, never annually**, so it has none of Spain's *annualised-OT* problem — with **two High**
gaps (the threshold gate and s.12 averaging). Read with the scope, verdict key, and **Basis key** in
[`README.md`](./README.md). No verdict is DB-confirmed this pass (IAM blocked).

> **The earnings threshold is the master switch — resolve it first.** BCEA **s.6(3)** lets the Minister
> exclude employees earning **above a gazetted annual amount** (**R269,600.90/yr from 1 May 2026**, moved
> every year for five running) from the *entire* working-time chapter: ordinary hours, overtime, compressed
> week, averaging, meal intervals, daily/weekly rest, Sunday pay, night-work pay, and public-holiday pay.
> Above the line, **none** of the premium machinery below fires. This is structurally the US exempt/
> non-exempt gate (`united-states.md` §2) — but **narrower**: it switches off only the *working-time*
> sections; **annual leave, sick leave, family-responsibility leave, and the s.31 recordkeeping duty keep
> running.** Modelling this as a blanket "exempt = stop tracking" flag silently breaks leave accrual and the
> punch record for every well-paid employee — the single most common modelling error.

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). South Africa's
> **45h/week** ordinary ceiling rides it directly as a weekly onset. Scope is *the plain weekly trigger only*
> — it is **committed-in-delivery, not yet `[API]/[UI]`-visible**, so confirm ship status before a hard
> commitment. It does **not** close the s.12 averaging, the 10h/15h weekly OT-*cap* validation, or the 45h
> ceiling breach flag.

**Legal source:** `context/worldwide-calculations/south-africa.md` (July 2026). The reference is explicit
that (a) the earnings threshold is a **date-effective** value that moves yearly, (b) South Africa has **no
annual OT cap** (don't invent one) and **no accruing hours bank** (`COMP_TIME_OFF` is a per-incident swap,
not a *banco de horas*), (c) **night pay carries no statutory %**, and (d) **parental leave is mid-reform**
(the *Van Wyk* Constitutional-Court interim regime, operative now, Parliament's remedial Act due ~Oct 2028).
It flags 🔎 the survival of s.18(2)/s.17(1) obligations above the threshold and the exact interim-pool
mechanics. Those are carried as 🔎, not asserted.

## Governing sources — who actually sets the rules

South Africa is **not one flat rulebook**. Resolving "do we support South Africa?" means resolving, in
order: **(1) does the worker even need a working-time calc** (earnings threshold + s.6(1) category / s.3
total exclusion), then **(2) which sectoral-determination / bargaining-council layer binds**, with the bare
BCEA as the **residual gap-filler**. Each compensation arrangement is modelled as its **own pay policy**
(S16). Unlike France/Italy the statutory country layer carries **real premium numbers** (like the UAE
mainland).

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| **Statute (national floor)** | **BCEA 75/1997** + **Public Holidays Act 108/1994** + the annual **s.6(3) Earnings Threshold Determination** + **NMW Act 9/2018** (basis only) | **Yes — prices OT ×1.5, Sunday ×1.5/×2, public-holiday ≥×2**; sets the 45h/9h/8h ordinary norm, the 10h-weekly / 12h-daily-total OT caps, 12h/36h rest, meal intervals, and the leave ladders. **Night pay is the one exception** — statute *mandates* compensation but fixes **no %** (a shift allowance *or* reduced hours, by agreement) |
| **Sectoral determinations & bargaining councils** | BCEA Ch.8 sectoral determinations (domestic · farm · private security · contract cleaning · wholesale & retail · hospitality · forestry · taxi) + **LRA 66/1995** bargaining-council main agreements (extendable to non-parties) + the **Ministerial Determination for Small Business** (<10 employees) | **Often** — vary minimum wages and, in places, working-time conditions **sector by sector**; a bargaining-council agreement can supersede the equivalent sectoral determination. **The bare BCEA applies only "in respect of any matter not dealt with"** — it is the *residual* layer, resolved **after** the sector instrument, not before |
| **Contract / written agreement** | Individual or (where required) collective written agreement | **Yes for the toggles** — OT consent (no compulsory OT), the compressed week (s.11), the TOIL election (s.10(3)), the night-allowance amount / reduced-hours route (s.17), **averaging** (s.12, *collective* agreement only), and the Sunday-PTO alternative |
| **Master switch** | BCEA **s.6(3)** earnings threshold (R269,600.90/yr, 1 May 2026) | **Turns the whole working-time chapter OFF** above the line — but **not** leave (ss.20/22/25–27) or recordkeeping (s.31) |

> **⚠ Illustrative secondary-source rules — resolve the sector layer before quoting BCEA defaults.** The
> §§below cite the **bare-BCEA residual** numbers. A sectoral determination or bargaining-council main
> agreement can vary them — e.g. private security (SD6 / the NBCPSS main agreement), domestic work (SD7),
> farm work (SD8), and wholesale & retail (SD9) each carry their own working-hours / allowance variants; the
> Small-Business determination relaxes OT, averaging, and family-responsibility-leave rules for employers
> with <10 staff. **Do not treat the BCEA figure as final without first resolving `sectoral_determination_id`
> / `bargaining_council_id`.** These are illustrative of *shape*, not a maintained per-sector contract —
> 🔎 confirm the binding instrument per customer.

## Rule-by-rule (Basis = where the verdict comes from)

| # | South Africa requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Earnings threshold (s.6(3)) — the master gate.** Employees earning **above** the gazetted annual amount (R269,600.90/yr from 1 May 2026, date-effective, moves yearly) are excluded from the *entire* working-time chapter (ordinary hours, OT, Sunday, night-pay, holiday, rest, meal, averaging) — but **not** leave or recordkeeping. The "earnings" test excludes OT pay, allowances, and achievement awards | No exempt/regime axis; `SourceUserProfile.exempt` is target `[DES]`. Crude workaround: assign threshold-exempt workers a **no-OT/no-premium policy** (S16) — worked hours + leave + records still run | ❌ / 🟠 | [ABS] | **Worker-regime gating (G5)** — same shape as US exempt/non-exempt, IT *dirigenti*. The separate-policy workaround suppresses premiums, but there's **no classifier, no date-effective threshold, no earnings-definition** primitive. **Not a US-style total exemption** — leave + s.31 records keep running |
| 2 | **Category (s.6(1)) & total (s.3) exclusions.** Senior *managerial* (authority-based, **not** a pay/title test), travelling sales who set their own hours, and <24h/month workers are excluded from Ch.2 regardless of earnings; Defence Force / intelligence / unpaid volunteers are outside the whole Act | Exclude from OT/limit rules (assign no-OT policy) — the same crude workaround; no regime axis | ❌ / 🟡 | [ABS] | Exempt flag `[DES]` future (G5). Narrow populations. **"Senior managerial" is an authority test** (hire/discipline/dismiss) — must not be derived from a pay band; that conflates it with #1 |
| 3 | **Ordinary hours (s.9) — 45h/week; 9h/day (≤5-day week) or 8h/day (>5-day week).** Maxima, not entitlements; OT is measured against the **contracted** figure (may be <45h), not against 45h | **OT onset = surplus above the PLANNED shift** (S4); set the planned shift to the contracted 9h/8h | ✅ / 🟡 | [API][UI] | **Good fit** — surplus-above-planned *is* a contractual baseline (handles the <45h-contract case and part-timers). The 45h *statutory ceiling* as a breach flag is #7. A fixed statutory norm *independent* of the planned shift would be target `[DES]` (G1) — distinguish |
| 4 | **OT only by agreement (s.10(1)) — no compulsory overtime.** Absent a standing clause or case-by-case arrangement, OT cannot be required | Engine computes OT from the surplus regardless of a consent flag; `overtime_agreement` is not a modelled gate | 🟡 | [ABS] | An **HR-consent fact**, not a pay computation — non-corrupting. The engine still *types* the hours correctly; whether they were lawfully *required* is a policy/contract attribute we don't store |
| 5 | **Overtime premium — ×1.5** of the employee's own ordinary wage (no minimum-wage-basis split) | **OT rate row by day-group** → typed premium band (S1) | ✅ | [API][UI] | Emit the `OT_1_5` band via a rate row; the ×1.5 itself is downstream money. Basis = own wage → additive, no two-basis complexity |
| 6 | **Weekly OT — 45h/week ceiling** as the weekly onset (measured against the contracted weekly norm) | **Weekly OT trigger** (S5) | ✅ | [PO] | Weekly OT committed-in-delivery (2026-07-18); **not yet `[API]/[UI]`-visible** — confirm ship status. Measures against the contracted week (surplus-above-planned handles a <45h contract) |
| 7 | **OT caps + ceilings — daily total 12h (incl. ordinary), weekly 10h (collective-agreement-raisable to 15h, ≤2 months/12-month period), 45h ordinary ceiling. No annual cap.** Breaches should *flag*, not silently cap | **Overall period cap** (S7) caps/converts; `extraHoursBalanceAlert` (Daily) *notifies*. No breach *validation* | 🟠 | [API][ABS] | **Limit-*validation* (G4)** — `OT_DAILY_12H_EXCEEDED` / `OT_WEEKLY_10H_EXCEEDED` / `WEEKLY_45H_EXCEEDED` are `[ABS]`; alert-only mitigation. The **time-boxed 15h collective override** (≤2mo/12mo) is a fancier counter but still non-corrupting. **No annual OT counter exists in the statute — correct not to build one** (contrast Portugal/Poland; do not invent one) |
| 8 | **TOIL alternative (s.10(3)) — instead of cash, paid time off:** 90 min per OT hour, **or** ordinary pay + ≥30 min off; drawn down within **1 month** (agreement-extendable to 12). A **per-incident swap**, NOT an accruing bank | **Banked Hours / comp-time-in-lieu** (S6) — BH↔EH split per rate row, cyclical/full-cycle | 🟠 / 🔎 | [API][ABS] | The "OT→time-off" primitive is real (S6); open pieces: the **non-1:1 (1.5:1 / 90-min) accrual ratio** (🔎 G13) and the **per-incident 1–12-month drawdown window** — *not* a cyclical bank. **Do not port the bank's cyclical-expiry model** (the file is explicit: no *banco de horas*, no ADV/ATV) |
| 9 | **Compressed working week (s.11) — up to 12h/day, no OT premium**, within the unchanged 45h/week cap, ≤5 days/week, by written agreement | **Surplus-above-planned** (S4) — plan the longer (≤12h) day; hours up to it are regular, no OT | 🟡 / ✅ | [API][UI] | **Good fit** — plan the compressed shift and OT auto-keys off the longer day (like UAE part-time / the DE Teilzeit case). The constraint that it stays within 45h/week shares #7's ceiling-flag gap. **Distinct from #10 averaging** — do not merge into one "flexible hours" knob |
| 10 | **Averaging of hours (s.12) — collective agreement, ≤4 months**, averaging *both* ordinary (≤45h/wk avg) **and** overtime (≤5h/wk avg) over the period | **Surplus-above-planned** captures the redistributed *schedule* when planned to the pattern | ❌ | [ABS] | **Reference-period averaging (G2)** — the same primitive underlying China comprehensive-hours / Portugal *adaptabilidade* / Canada averaging agreements. No per-cycle netting of ordinary+OT over a trailing window beyond the hours bank. **Collective-agreement-gated** (narrows prevalence) but genuinely unbuilt and **core to the OT trigger basis** when actuals diverge from plan |
| 11 | **Sunday work (s.16) — ×2 occasional / ×1.5 if the employee ordinarily works Sundays**, floored at the ordinary daily wage; agreement may substitute **paid time off** | **Day-group Sunday rate row** (`daysMask`) → typed premium band (S1) | ✅ / 🟠 | [API][UI] | **Premium emission ✅** via a Sunday rate row (the ×2/×1.5 is downstream money). The **×2-vs-×1.5 selection** turns on a per-worker `sunday_ordinarily_works` flag we lack → model the two populations on **separate policies** (G5). The **daily-wage floor** is money (out of scope); the **Sunday-PTO alternative** is lieu-scheduling `[DES]` (G13). **Runs in parallel with the s.10 weekly OT cap** — Sunday hours still increment the OT-cap counters (#7); don't conflate |
| 12 | **Night work (s.17) — window 18:00–06:00; compensate by a shift/night allowance OR reduced hours, by agreement. NO statutory %.** Transport must be provided | `nightShift {%, start, end, applyEntirePeriod}` — configurable window + premium (S8) | ✅ / 🟠 | [API][UI] | **Emission ✅** — set the window to 18:00–06:00 and the allowance %. **The absent statutory % *fits us cleanly*** (like Germany's no-statutory-OT-premium): our night band has **no built-in default** — configure per employer/sector, else emit the factual `NIGHT_HOURS` overlay. The **reduced-hours route** (pay 9h, work 7h) is a schedule reshape workaround; **transport-provision** is an HR flag (out of scope) |
| 13 | **Regular-night-worker status (s.17) — >1h between 23:00–06:00, ≥5×/month or ≥50×/year** triggers written hazard disclosure + a right to a medical exam | `nightShift` emits `NIGHT_HOURS`; no status classifier, no rolling ≥5×/mo or ≥50×/yr counter | ❌ | [ABS] | **Rolling classifier (G4-adjacent)** — night-hour *emission* ✅; the **status determination + the disclosure/medical-exam duties** are an HR-compliance cross-run counter we don't run. Mirrors DE #20 / PT #9. Excluded above the earnings threshold only for the *pay* subsection (s.17(2)); the s.17(1) agreement/transport/hazard duties likely survive 🔎 |
| 14 | **Public holidays worked (s.18(2)) — ≥×2** if an ordinarily-working day (or ordinary pay + amount earned, whichever greater); **ordinary wage + 1× worked** if not an ordinarily-working day; **paid day off** if not worked | **Holiday calendar** (S11) + Holiday bit on rate rows (`daysMask`) → premium band (S1) | ✅ / 🟠 | [API][FLD] | **Worked-holiday premium ✅** via a Holidays rate row (`WORKED_ON_PUBLIC_HOLIDAY` → `PUBLIC_HOLIDAY_2X`). The **"ordinary wage + 1× worked" for a non-ordinary day** is a premium-*composition* nuance (the greater-of / additive floor) — the hours event emits, the composition mode is `[DES]`. `PUBLIC_HOLIDAY_OFF` (paid, not-worked) rides the calendar |
| 15 | **Public-holiday calendar — 12 national holidays + Easter-derived movable feasts + the Sunday→Monday roll + ad-hoc gazetted days.** Per *Randfontein*, a Sunday-holiday that is *also* an ordinary working day + its rolled Monday can yield **two** paid-off days | **Holiday calendar** (`SourceHoliday`), jurisdiction/date-keyed (S11) | ✅ / 🔎 | [FLD] | Calendar as reference data ✅; the **12 fixed + Good Friday/Family Day (Easter offsets) + Sunday→Monday roll + ad-hoc gazetted** refresh is a per-year **data-maintenance** task (Easter is formula-derivable; ad-hoc gazetted are not) — **not** a capability gap. The **Randfontein two-days-paid edge** (Sunday-that-is-ordinary-day + rolled Monday) is a niche synthesis the engine won't derive automatically (G13) |
| 16 | **Meal interval (s.14) — ≥1h after 5h continuous work;** agreement-reducible to 30 min, or waivable for <6h shifts; paid if required to work/be available during it | Break config on the schedule (mode, paid/unpaid, startAfter) | 🟡 / 🟠 | [DES] | Breaks configurable `[DES]`; the **≥1h-after-5h-continuous *validation/flagging*** (`MEAL_INTERVAL_VIOLATION`) is the open piece — same shape as DE #6 / UAE #13 / PT #16 |
| 17 | **Daily rest (s.15) — ≥12h** between ending one day and starting the next; reducible to 10h for live-in staff with a ≥3h meal interval | `crossShiftsInterval {interval=660min=11h}` (S12) | 🟠 / 🔎 | [API] | The inter-shift threshold field exists — **set `interval` to 720 min (12h)** (our sample default is 660=11h, a **config value** not a capability gap). The **10h live-in reduction** + the breach *validation* behaviour are the open pieces 🔎 (finding #17). `DAILY_REST_12H_VIOLATION` = `[ABS]` |
| 18 | **Weekly rest (s.15) — ≥36 consecutive hours**, including a Sunday by default; agreement variants: ≥60h/2 weeks, or −8h with the following week extended | Weekly rest handled at the schedule level; `workingDaysInARow` 🔎 (G8) | ❌ | [ABS] | **Weekly-rest *accumulation* (G8)** — `crossShiftsInterval` is a **single daily threshold**, *not* the 36h-over-a-week accumulation this needs (README 🔎 #1). `WEEKLY_REST_36H_VIOLATION` = `[ABS]`; non-corrupting to pay |
| 19 | **Annual leave (s.20) — 21 consecutive days/cycle** (or agreed 1d/17-worked, 1h/17h-worked); **no cash-out during employment** (only on termination, >4 months' service) | `SourceRequest.*` handles absences; no accrual ledger | ❌ | [ABS] | **Leave-accrual ledger (G12)** — the 21-day ladder, the alternative accrual rates, and the `no_cashout_except_termination` (>4-mo) gate are `[ABS]`. **Runs regardless of the earnings threshold.** Adjacent to core T&A; **non-pay-corrupting** |
| 20 | **Sick leave (s.22) — 6 weeks' paid per 36-month cycle** (30d 5-day-week / 36d 6-day-week); **first-6-months sub-ladder** = 1 day per 26 worked | `SourceRequest.*` generic absence handling | ❌ | [ABS] | **Tiered leave ledger (G12)** — the 36-month cycle, the 30d/36d entitlement, and the first-6-months sub-ladder are not modeled. Adjacent; non-corrupting. Runs regardless of the threshold |
| 21 | **Family-responsibility leave (s.27) — 3 days/cycle**, for >4-months-service employees working ≥4 days/week; use-it-or-lose-it | Generic request/absence handling | ❌ | [ABS] | Small eligibility-gated ledger (G12). Narrow, non-corrupting. Runs regardless of the threshold |
| 22 | **Parental-leave pool (⚠ *Van Wyk* interim) — a single shared 4-months-and-10-days pool** for biological/adoptive/commissioning parents (agreed or equal split; sole parent gets the full pool); the birth-mother −4wk/+6wk medical window nests inside | `SourceRequest.*` generic absence handling | ❌ | [ABS] | **Leave ledger + sharing logic (G12), ⚠ mid-reform** — the interim Constitutional-Court reading-in is *operative now*, but Parliament's remedial Act is due **~Oct 2028** and may change the pool/defaults. `PARENTAL_LEAVE_POOL` + `sharing_mode` + `MATERNITY_PROTECTION_WINDOW` — **build behind a version flag, re-verify each release.** Day quantities only (UIF funding is downstream) |
| 23 | **Standby / on-call (s.9 research) — contractual, no BCEA formula.** Availability compensated by agreement/sectoral determination; time actually worked on call-out folds into worked/OT | On-call compensation (`onCalls.compensation`); availability + activation paid separately (S10) | ✅ / 🟡 | [API][UI] | **Good fit** — the BCEA fixes no ratio, so it's purely config; `STANDBY_HOURS` is a factual marker (money downstream), and call-out time → `WORKED_HOURS`/`OT_1_5`. **No accruing bank needed — the BCEA has none** (don't force one) |
| 24 | **Record all working hours (ss.29, 31) — name, occupation, time worked, remuneration; retained 3 years.** Not switched off by the earnings threshold | Engine **records every punch** (S15); approved-event locking | ✅ | [FLD] | Satisfied — a genuine compliance value-add. Runs for **every** employee, threshold-exempt or not. Retention/immutable-audit config = 🔎 (README #5) |
| 25 | **Tolerance / rounding — no statutory rule;** any tolerance is policy/sectoral-determination config | `tolerance {type, limit, scope, active, includeBreaks}` (S9) | ✅ | [API][UI] | Configurable (default none); anti-erosion is on the customer. No statutory floor to hit. `MISSING_HOURS`/`MISSING_DAY` follow standard engine semantics (computed regardless of threshold status) |
| 26 | **Sectoral determinations / bargaining councils / small-business determination — each arrangement varies the defaults.** Resolve the binding instrument before the bare BCEA | **One arrangement = one pay policy** with its own rate table + working-time params (S16) | ✅ / 🟡 | [UI][DES] | **Matches the model exactly** — a sectoral / bargaining-council variant = its own policy (like DE Tarifvertrag / UAE regime split). The **Small-Business determination** (<10 employees: relaxed OT/averaging/family-responsibility rules) = another policy. **Which instrument binds is a *required resolving fact*** — get it wrong and the numbers below are wrong |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — including the ✅ statutory-premium rows (#5, #6, #11-cash,
> #14-worked), the ✅ night-emission row (#12), and the ✅ record-all-hours / holiday-calendar / on-call /
> tolerance / arrangement-as-policy rows (#3, #9, #15, #23, #24, #25, #26).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks/corrupts output) · 🟠 High (common,
> no full mitigation, but scoped, or core to the OT model) · 🟡 Medium (moderately common, or a usable
> mitigation, or moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow
> population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general South African market* a rule bites. **⚠ Customer-relative** — shifts
>   with the workforce: **salaried/professional-heavy employers → #1 threshold gate**; **unionized / sectoral
>   employers → #10 averaging + the sector-layer resolution (#26)**; **hospitality/security/continuous-ops →
>   #13 night-worker status + #7 caps**. **None flips to Critical** — South Africa caps OT only per day/week
>   (no annualised-OT determination like Spain), so there is no annual-pay-corrupting regime; the one
>   pay-*shaping* gap (#1) has a real separate-policy mitigation.
> - **Build-effort** = my estimate, **grounded in the toolkit** (Existing/`[API]` ≈ config/small **S**;
>   `[DES]` ≈ **M**; net-new subsystem ≈ **L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (ZA market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#1 Earnings-threshold regime gate** | **Partial** — assign threshold-exempt workers a **no-OT/no-premium policy** (leave + records keep running); but no classifier, no date-effective threshold, no earnings-definition primitive — classification is manual and moves yearly | **High** — bites every higher-earning salaried worker; the line moves annually | **M** — a per-worker exempt/threshold axis + date-effective value + earnings definition | 🟠 **High** |
| **#10 s.12 averaging (ordinary + OT, ≤4mo)** | **Partial** — surplus-above-planned computes correctly **when the schedule reflects the redistribution**; the independent ≤4-month averaging/netting of ordinary+OT is absent | **Med** — *collective-agreement-gated* (unionized/sectoral employers) but **core to the OT trigger basis** when actuals diverge from plan | **M** — the reference-period-averaging primitive (shared with China/PT/Canada) | 🟠 **High** |
| **#7 OT caps + 45h ceiling validation** | **Partial** — `extraHoursBalanceAlert` (Daily) notifies; **pay stays correct** (the cap decides legality, not amount) | **High** as a legal obligation (non-corrupting) | **S-M** — single-period threshold flags + the time-boxed 15h collective override | 🟡 **Medium** |
| **#8 TOIL 90-min / 1.5:1 + drawdown window** | **Partial** — route OT to the bank (comp-time-in-lieu); the **non-1:1 accrual ratio** and the **per-incident 1–12-month window** (not a cyclical bank) are the open pieces | **Med** — employers electing time-off over cash | **M** — a non-unit TOIL ratio + a per-incident drawdown-window ledger | 🟡 **Medium** |
| **#13 Regular-night-worker classifier + duties** | **Partial** — night hours emit; no ≥5×/mo · ≥50×/yr status determination or the hazard-disclosure/medical-exam duties | **Med** — night-working sectors | **M** — a rolling night-worker classifier + an HR-compliance flag | 🟡 **Medium** |
| **#16 Meal-interval validation** | **Config** — configure the ≥1h-after-5h rule on the schedule; the *validation/flagging* is the open piece | **High** (all workers) | **S-M** | 🟡 **Medium** |
| **#18 Weekly rest 36h validation** | **Weak** — no weekly-rest *accumulation*; the daily inter-shift field doesn't sum a 36h weekly window; manual monitoring | **High** as a legal obligation (non-corrupting) | **M** — weekly-rest accumulation over a rolling week (incl. the 60h/2wk + make-up variants) | 🟡 **Medium** |
| **#19 Annual-leave accrual ledger** | **Partial** — leave taken as absences/requests; the 21-day ladder + alt accrual rates + no-cashout-except-termination gate need a leave module | **High** as a legal obligation (non-corrupting; adjacent to core T&A) | **M** — accrual counter + the termination-cashout rule | 🟡 **Medium** |
| **#20 Sick-leave ledger (36-mo + sub-ladder)** | **Partial** — sickness handled as absences; the 36-month cycle, 30d/36d entitlement, and first-6-months sub-ladder aren't modeled | **Med** — sickness common; the tiering population-specific | **M** — cycle-keyed counter + the first-6-months sub-ladder | 🟡 **Medium** |
| **#22 Parental-leave pool (⚠ *Van Wyk* interim)** | **Partial** — leave taken as absences; the shared 4mo+10d pool + sharing modes + nested maternity window need a leave module — **and a version flag** (Parliament's Act due ~Oct 2028) | **Med** — parents across the workforce | **M** — pool ledger + sharing logic, behind a re-verify flag | 🟡 **Medium** |
| **#2 Category / total exclusions** | **Strong** — exclude from working-time/OT rules (assign no-OT policy) | **Low** — senior managerial / travelling sales / <24h-month / defence / volunteers | **S** — exempt flag | 🟢 **Low** |
| **#11 Sunday ×2/×1.5 gating + PTO alternative** | **Partial** — the **cash** premium emits via a Sunday rate row; the **×2-vs-×1.5** per-worker selection needs separate policies, and the **Sunday-PTO** alternative isn't synthesized as a typed event | **Med** — Sunday-working sectors (retail/hospitality/security) | **S-M** — a `sunday_ordinarily_works` gate + a Sunday-PTO lieu event | 🟢 **Low** |
| **#12 Night reduced-hours route** | **Strong** — the allowance-% route is fully supported (S8); the reduced-hours alternative (pay 9h / work 7h) is a schedule reshape | **Low-Med** — employers electing the reduction over an allowance | **S-M** — a per-policy reduced-hours norm | 🟢 **Low** |
| **#14 Public-holiday non-ordinary-day composition** | **Partial** — the worked-holiday premium emits; the "ordinary wage + amount earned, whichever greater" composition is `[DES]` | **Med** — bites where holidays fall off the ordinary roster | **S-M** — a greater-of / additive composition mode | 🟢 **Low** |
| **#15 Randfontein Sunday-roll double-pay edge** | **Partial** — the calendar + Sunday→Monday roll are data; the two-days-paid edge isn't auto-derived | **Low** — narrow calendar coincidence | **S** — a calendar-synthesis rule | 🟢 **Low** |
| **#17 Daily rest 12h + live-in 10h** | **Strong** — set `interval` to 720min (12h); the 10h live-in reduction + breach validation are the open pieces | **Med** | **S** — a config value + the reduction/validation behaviour | 🟢 **Low** |
| **#21 Family-responsibility leave (3d/cycle)** | **Partial** — taken as absences; the 3d/cycle eligibility-gated counter isn't modeled | **Low** — 3 days, eligibility-gated | **S** — a small eligibility-gated ledger | 🟢 **Low** |

### Severity roll-up
- **🔴 Critical (0):** none — South Africa caps OT **only per day (12h total) and per week (10h/15h), never annually**; it has no Spain-style *annualised-OT determination*, and the one pay-shaping gap (#1) has a real separate-policy mitigation.
- **🟠 High (2):** the **earnings-threshold regime gate** (#1 — common, core to whether premiums compute at all, only a crude workaround) and **s.12 averaging** (#10 — core to the OT trigger basis, genuinely unbuilt).
- **🟡 Medium (8):** OT-cap + 45h-ceiling validation (#7), TOIL ratio + drawdown window (#8), regular-night-worker classifier (#13), meal-interval validation (#16), weekly-rest 36h validation (#18), annual-leave ledger (#19), sick-leave ledger (#20), parental-leave pool (#22).
- **🟢 Low (6):** category/total exclusions (#2), Sunday ×2/×1.5 gating + PTO (#11), night reduced-hours route (#12), public-holiday non-ordinary-day composition (#14), Randfontein edge (#15), daily rest 12h value (#17), family-responsibility leave (#21). *(#17 groups with the Low set; counted once.)*

## The big gaps (High items grouped)
1. **The earnings-threshold regime gate** (#1, with #2 riding the same axis) — the master switch that turns the whole working-time chapter off above a gazetted, yearly-moving line. We have **no exempt/regime axis**; the separate-no-premium-policy workaround suppresses premiums but leaves classification manual, and there's no date-effective threshold or earnings-definition primitive. **Same family as US exempt/non-exempt and IT *dirigenti*** — and the single thing to *get right first* (leave + records must keep running even for the exempt).
2. **s.12 reference-period averaging** (#10) — the collective-agreement mechanism that averages *both* ordinary and overtime hours over ≤4 months. No per-cycle netting beyond the hours bank; the **same primitive** the portfolio flags for China comprehensive-hours, Portugal *adaptabilidade*, and Canada averaging agreements.

*(The Medium tier's supporting gaps — limit-validation (#7, #16, #18), the leave-accrual ledgers (#19–22), the TOIL ratio (#8), and the night-worker classifier (#13) — are all non-pay-corrupting or adjacent to core T&A.)*

## Where South Africa scores well (worth saying)
- **The statutory premiums are our star fit** (#5, #6, #11-cash, #14-worked): OT **×1.5**, Sunday **×1.5/×2**,
  and public-holiday **≥×2** all ride **OT rate rows by day-group (S1)**, with the **day/night split (S2/S8)**
  and **rate-chaining (S3)** available where a tier needs them `[API][UI]`.
- **Night pay's *absence* of a statutory % fits us cleanly** (#12): our night band has **no built-in default**
  — exactly what the BCEA's "allowance-or-reduced-hours-by-agreement" posture wants; configure per
  employer/sector, else emit the factual `NIGHT_HOURS` overlay `[API]`. (Same clean fit as Germany's absent
  statutory OT premium.)
- **No annual OT cap and no accruing hours bank — and we correctly don't force either** (#7, #8, #23): the
  BCEA caps OT only daily/weekly and has no *banco de horas*, so we neither invent an annual counter nor
  impose the cyclical-bank model.
- **Weekly-45h trigger** (#6): the ordinary-week ceiling rides the now-supported weekly OT trigger `[PO]`.
- **Arrangement-as-policy** (#26): a sectoral determination / bargaining-council variant / the Small-Business
  determination each = its own pay policy — matching our model exactly `[UI][DES]`.
- **Record-all-hours** (#24) + **holiday calendar** (#15) + **on-call** (#23) + **tolerance** (#25) — all
  present `[API]/[FLD]`; **no hours-bank forced** where the statute has none.

## 🔎 Verify before telling the customer
- **Weekly OT (#6)**: ✅ per PO confirmation (2026-07-18), **not yet `[API]/[UI]`-visible** — confirm ship
  status before a hard commitment.
- **The earnings threshold (#1) is the required resolving fact**: it's **date-effective** (R269,600.90/yr from
  1 May 2026, moves yearly) and the "earnings" test **excludes OT pay, allowances, and achievement awards** —
  confirm the customer classifies off *guaranteed pay*, not a payslip total, and that threshold-exempt workers
  still get leave + records. Also confirm whether **s.18(2)** (holiday pay-when-worked) and **s.17(1)**
  (night agreement/transport/hazard duties) survive threshold-exemption — the research file flags both 🔎.
- **The sector layer (#26)** must be resolved **before** the bare BCEA: which sectoral determination /
  bargaining-council agreement / Small-Business determination binds. Getting it wrong makes every default
  wrong.
- **Parental leave (#22)** is **mid-reform** — the *Van Wyk* interim pool (4mo+10d) is operative now, but
  Parliament's Act is due **~Oct 2028** and may change the quantities/defaults. Build behind a version flag;
  re-verify each release.
- **`crossShiftsInterval` / break validation (#16, #17)**: the fields are configurable, but does the engine
  *flag* the meal-interval and 12h-rest breaches, or only classify?

## Bottom line for the customer
South Africa is one of our **cleaner premium-emission fits**: overtime, Sunday, and public-holiday work are
**statutorily priced** (×1.5 / ×1.5-or-×2 / ≥×2) and land squarely on our shipped OT rate rows, and night
pay's **absence** of a statutory % fits our no-default night band even better. With weekly OT now supported,
the 45h/week trigger is covered too. What we **don't** do out of the box is **gate on the earnings threshold**
(the master switch that turns the working-time chapter off for higher earners — a manual separate-policy
workaround today), **average ordinary+OT over an s.12 reference period**, **validate the limits** (the
12h/10h OT caps, the 45h ceiling, 12h/36h rest, meal intervals — we alert, not validate), **synthesize the
lieu alternatives** (Sunday-PTO, the TOIL 90-min ratio), or **run the leave-accrual ledgers** (annual / sick /
family-responsibility / the ⚠ interim parental pool). **The two structural must-get-rights are the earnings
threshold and the sector layer** — resolve both before quoting. Honest status: **partial, no Critical gaps;
the standard below-threshold, single-sector case is servable on the premium side, with the threshold gate,
s.12 averaging, limit-validation, and leave ledgers as the roadmap.**
