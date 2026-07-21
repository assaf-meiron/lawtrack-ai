# India — T&A requirements

> **What this is.** The ground-truth reference for India's time-&-attendance legal requirements,
> grouped by topic — detailed enough to **build a day.io pay policy from**. It aims to be
> **exhaustive** and **atomic**: **one legal proposition per row**, each row self-contained (no
> "see §X" as the only content), with exact values, a worked example wherever a number is involved,
> variants, and a `Basis` that **links to the primary source** so any row can be checked against the
> law directly.
>
> **Scope: time & day-events only** — money (%, ₹, tax, gross-to-net) is out of scope (premiums are
> named for context in `Values` but the deliverable is the typed hour/day event, never the money).
> **Indian-term convention:** every non-English term (Hindi/legal shorthand) is glossed in English
> in brackets on first use.
>
> **The one structural fact to hold onto:** India has **no single national floor** the way most
> countries do. The operative numbers depend on **establishment type**: manufacturing factories sit
> under the Central **Factories Act 1948** (9h/day · 48h/week · 2× OT · 10.5h spread-over); offices,
> IT, retail and hospitality sit under the **state's own Shops & Establishments Act (SEA)** — a
> **per-state** statute, so the same nominal rule can carry a different number in every state; and
> the **2020 Labour Codes** (OSHWC, Code on Wages, IR Code, Social Security Code) are gradually
> replacing both but require each state to individually notify its own rules, so **legacy and new
> frameworks currently run in parallel**. "Which rules apply?" resolves to "which establishment
> type, in which state, under which framework has that state actually activated?" — not a single
> national answer (§1). A company can sit under two or more regimes at once (a factory in one state
> + an office in another).
>
> **Legal sources & links:** Factories Act 1948 [FA] and state Shops & Establishments Acts (SEAs),
> the Maternity Benefit Act 1961 (amended 2017), the Employees' State Insurance Act 1948, the Child
> and Adolescent Labour (Prohibition and Regulation) Act 1986/2016, the Rights of Persons with
> Disabilities Act 2016, and the 2020 Labour Codes (OSHWC, Code on Wages, IR Code, Social Security
> Code) with the Code on Wages (Central) Rules 2026. Central Acts link to **India Code**
> ([indiacode.nic.in](https://www.indiacode.nic.in/)), India's official Central-legislation register;
> there is no single national register for state SEAs, so those rows cite the Act by name with a
> best-effort link. 🔎 marks a figure or deep link not confirmed live this pass (India Code blocks
> automated fetches; act-level pages were confirmed via search, not by direct retrieval). Sources
> listed at the foot of the requirements section.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Central-vs-State dual regime** | **Factories Act 1948** governs manufacturing plants/factories (national). **Shops & Establishments Act (SEA)** — a **per-state** statute — governs offices, IT, retail, hotels, restaurants. A company can sit under **both at once**. | A company with a factory in Pune *and* an IT office in Bengaluru is under two regimes simultaneously — model each as a separate pay policy. | IT/ITeS is state-SEA territory, not Factories Act, and several states (Karnataka, Telangana) grant IT/ITeS-specific exemptions (see §5). | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; state SEAs |
| **Per-location SEA registration** | SEA compliance is **per physical location**, not per company. | 5 offices in 5 states = 5 separate registrations, each with that state's own daily cap / OT cap / holiday-comp rules. | — | [state SEAs](https://www.indiacode.nic.in/) 🔎 |
| **2020 Labour Codes — gradual, parallel rollout** | Four Codes — **OSHWC** [Occupational Safety, Health & Working Conditions], **Code on Wages**, **Industrial Relations (IR) Code**, **Social Security Code** — were **notified 21 Nov 2025**; the **Code on Wages (Central) Rules 2026** and specific OSHWC provisions (e.g. §25(1)(b) rest-interval rule) took effect from **14 May 2026**. **⚠ Not yet uniform** — each state must separately notify its own rules; legacy Factories Act/SEA and the new Codes **run in parallel**. **Do not model the Codes as fully settled everywhere.** | A factory in a state that hasn't notified OSHWC rules still runs on the legacy Factories Act 50h/quarter OT cap; a state that has notified runs the new Code's higher cap. | Central target for full operational parity across sectors: 1 Apr 2026 🔎 (not confirmed reached). | 2020 Labour Codes; [Code on Wages (Central) Rules 2026](https://prsindia.org/billtrack/the-code-on-wages-2019) 🔎 |
| **Compressed / redistributed workweek** | A **4-day week is allowed**: weekly cap stays **48h**, daily shifts up to **12h** (incl. rest), but must still navigate whichever state SEA daily limit (9–10h) applies. | A 4×12h roster is lawful under the Code where the state SEA's own daily cap doesn't block it. | State-varying — several SEAs still enforce an 8–10h daily ceiling regardless of the Code. | [2020 Labour Codes](https://www.indiacode.nic.in/) 🔎; state SEAs |
| **Exempt roles — managerial / administrative / supervisory** | Managerial, administrative, and highly-compensated supervisory roles are **excluded from statutory overtime** (India's exempt/non-exempt split). No fixed earnings threshold identified centrally 🔎. | A department head isn't rostered against an OT policy at all. | Definitions vary by state SEA; some set a wage-ceiling test. | [state SEAs](https://www.indiacode.nic.in/) 🔎 (varies) |
| **OT trigger — statutory floor overrides a lower contractual limit** | Where a contract sets working hours **below** the statutory ceiling (e.g. 36.5–39h/week vs the 48h legal cap), the mandatory **2× statutory OT rate** is triggered **only once the full legal threshold (48h/week) is crossed** — not the lower contractual limit. Hours between the contractual limit and the statutory ceiling may be paid at a mutually agreed intermediate rate (not below the ordinary hourly wage). | A 37.5h-contract employee working 45h/week: no statutory 2× until hour 48; hours 37.5–48 may be paid at an agreed intermediate rate. | — | Supreme Court, *Philips India* & *State Bank of India* ([SCI judgments](https://www.sci.gov.in/judgements/) 🔎) |
| **Standing Orders (300+ workers)** | Establishments with **≥300 workers** must draft and get **certified Standing Orders** covering service conditions, worker classifications, **shift schedules**, attendance, and leave. Until certified, **Model Standing Orders** apply automatically. | A 350-worker factory must formalize its shift-roster rules in certified Standing Orders. | Threshold and certification regime vary by whether IR Code has been notified in that state. | [Industrial Employment (Standing Orders) Act 1946](https://www.indiacode.nic.in/) 🔎 / IR Code 2020 |
| **Works Committees / Grievance Redressal Committees** | Works Committee mandatory at **≥100 workers**; Grievance Redressal Committee mandatory at **≥20 workers**, must resolve grievances within **30 days**. | A 120-worker plant must convene a Works Committee; a 25-worker unit must have a GRC that closes out any filed grievance within 30 days. | GRC comes under the IR Code 2020 (mainly factories/industrial/manufacturing establishments). | [Industrial Disputes Act 1947](https://www.indiacode.nic.in/) 🔎 / IR Code 2020 |
| **Minors — child ban <14** | No child **below 14** may work in a factory; a child **14–15** needs a **certificate of fitness**. Historically, working children under the pre-2016 regime were capped at **4h/day** (reduced from 5h). | A 13-year-old cannot be legally rostered in a factory under any circumstance. | Female child additionally barred outside **08:00–19:00** (§71). | [Factories Act 1948 §71](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; Child Labour (Prohibition & Regulation) Amendment Act 2016 🔎 |
| **Adolescents 14–18 — hazardous-work ban + hours regulation** | *Adolescent* [age 14–18]: barred from **hazardous occupations/processes** (mining, explosives, etc.); permitted in non-hazardous work but with regulated hours; **no work 19:00–08:00** (night ban). | A 16-year-old may work a non-hazardous retail shift but not past 19:00. | — | [Child and Adolescent Labour (Prohibition and Regulation) Act 1986, amended 2016](https://www.indiacode.nic.in/) 🔎 |
| **Part-time / gig & platform workers — first-time coverage** | The Social Security Code 2020 brings gig/platform workers into statutory coverage **for the first time** (social-security scope; downstream). Core working-time rules (daily/weekly caps, OT) are not gig-specific — same regime as any worker at that establishment. | — | Rollout parallels the general Codes timeline (§1, row 3). | [Social Security Code 2020](https://www.indiacode.nic.in/) 🔎 |
| **⚠ Pending — Code rollout not fully settled** | The Labour Codes (OSHWC 8h/day · 60h/week absolute · 144h/qtr proposed cap) are **notified but not uniformly in force**; states must individually notify their own rules. **Do not model as settled** until the specific customer's state + establishment type is confirmed. | — | — | (draft rollout; not yet law everywhere) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Spread-over = login to logout, inclusive of all breaks** | The *spread-over* [total daily span from first clock-in to last clock-out] includes **all breaks, meals, and idle time** — it is the ceiling on the whole day, not just active work (see §4). | A shift with a 1h lunch and 15min tea break still counts that full span toward the 10.5h spread-over cap. | — | [Factories Act 1948 §56](https://www.indiacode.nic.in/handle/123456789/1530) 🔎 |
| **Continuous-work-before-break threshold** | No employee may work **more than 5 continuous hours** without a break (both the legacy Factories Act and the OSHWC Code's §25(1)(b), effective 14 May 2026). | A worker starting at 09:00 must get a break by 14:00 at the latest. | Maharashtra amends to **6 continuous hours**. | [Factories Act 1948 §55](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code §25(1)(b) 🔎 |
| **Motor Transport Workers — travel/waiting time** | For motor transport workers, working time includes **driving time + related duties**; **waiting time under 15 minutes** counts as working time (implicitly on-call/standby-adjacent — see §8). | A driver's 12-minute wait between deliveries counts as working time; a 25-minute wait does not (falls to rest/standby treatment). | Sector-specific (transport workers only). | [Motor Transport Workers Act 1961](https://www.indiacode.nic.in/) 🔎 |
| **Muster roll — the base working-time record** | Every factory/establishment must maintain a **muster roll** [daily attendance register] showing each worker's name, nature of work, and daily attendance — the base unit the engine's punch record must reconcile against (see §11). | — | Format varies by state (Central Form 25/31 vs Maharashtra Form 29, etc.). | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; state SEAs |

## 3. Overtime

*India's defining OT rule is a **statutory 2× (double) rate** triggered by a **daily or weekly** threshold — a per-hour premium, not an annualised or averaged mechanic.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily OT trigger — >9h/day (legacy) or >8h/day (new Code)** | Legacy **Factories Act**: OT starts past **9h/day**. New **OSHWC Code / Code on Wages**: OT starts past **8h/day**. Whichever framework the establishment's state has activated governs (see §1). | A factory still on the legacy framework: a 9.5h day has 0.5h daily OT. Under the new Code: an 8.5h day already has 0.5h daily OT. | State SEAs commonly set **9h/day** (Delhi, Karnataka, Haryana); Maharashtra **10h/day**. | [Factories Act 1948 §54](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code; [Code on Wages 2019](https://prsindia.org/billtrack/the-code-on-wages-2019) 🔎 |
| **Weekly OT trigger — >48h/week** | Both regimes cap the standard week at **48h**; hours beyond it are overtime, regardless of the daily split. | A worker doing 6×9h days (54h) has 6h weekly OT even with no single day over the daily cap. | — | [Factories Act 1948 §51](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code; [Code on Wages 2019](https://prsindia.org/billtrack/the-code-on-wages-2019) 🔎 |
| **First-crossed / no-pyramiding onset** | The daily and weekly triggers are **one mechanism**: an hour above the *daily* cap is daily OT; of the remaining hours, those pushing the *week* past 48h are weekly OT — each hour counted **once**. | A 10h day (1h daily OT) in a week that totals 50h: the 1h is daily OT; of the other 4h over 48, they're weekly OT — never double-counted. | — | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code (statutory construction) |
| **OT requires consent** | Overtime beyond the statutory day/week may only be **worked with the employee's consent** — it cannot be unilaterally imposed. | An employer cannot force OT without the worker's agreement (written consent commonly required in practice). | — | [Code on Wages 2019](https://prsindia.org/billtrack/the-code-on-wages-2019) 🔎; OSHWC Code |
| **Statutory floor overrides a lower contractual limit (Philips India doctrine)** | Where the **contract** sets hours below the statutory 48h/week ceiling, the mandatory 2× only triggers at the **statutory** 48h line, not the lower contractual one (repeated from §1 — it's the core OT-onset mechanic). | See §1 example. | — | Supreme Court, *Philips India* & *SBI* ([SCI judgments](https://www.sci.gov.in/judgements/) 🔎) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory OT rate — 2× (double) the ordinary rate** | Both the Factories Act and the new Codes fix OT at exactly **double** the ordinary wage — a **statutory** rate, not a policy/CBA choice (unlike Germany). | 100 OT hours at ordinary rate ₹100/h → OT pay = ₹200/h × 100h. | Karnataka excludes bonus from the OT wage base; Maharashtra includes it; Delhi is "uncapped." | [Factories Act 1948 §59](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; [Code on Wages 2019](https://prsindia.org/billtrack/the-code-on-wages-2019) 🔎 |
| **Intermediate rate for the contractual-to-statutory gap** | For hours between a **below-statutory contractual limit** and the statutory 48h ceiling, employers may pay a **mutually agreed intermediate rate**, not below the single ordinary hourly wage. | A 39h-contract worker doing 45h: hours 40–45 may be paid at an agreed rate above ordinary but below 2×; only hours past 48 are mandatory 2×. | — | Supreme Court, *Philips India* & *SBI* ([SCI judgments](https://www.sci.gov.in/judgements/) 🔎) |
| **OT rounding — 15/30-minute bands** | Under the **OSHWC Code**, OT of **15–30 minutes** rounds up to **30 minutes**; OT **>30 minutes** rounds up to a **full hour**. | 20 minutes of OT → paid as 30 min; 40 minutes of OT → paid as 1h. | Legacy Factories Act has no equivalent rounding rule identified 🔎. | [OSHWC Code](https://www.indiacode.nic.in/) 🔎 (rounding rule) |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **OT quarterly cap — state/regime-varying** | Legacy **Factories Act: 50h/quarter**. New Code proposals raise this — sources cite **125h/quarter** and **144h/quarter** inconsistently 🔎 (confirm the final notified figure per state). | A worker who has already logged 48h of OT this quarter can take only 2 more before hitting the legacy 50h cap. | **Maharashtra 144h/qtr · Karnataka 50h/qtr · Haryana 50h/qtr · Delhi 150h/year** (annual, not quarterly). | [Factories Act 1948 §64](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; state SEAs; OSHWC Code (draft) |
| **Absolute daily cap incl. OT — 10.5h/day** | Even with OT, the day may not exceed **10.5h** total (Factories Act spread-over ceiling, §4). | A worker with 9h ordinary time can be given at most 1.5h OT that day before hitting the 10.5h absolute ceiling. | Maharashtra allows **12h/day in emergencies**. | [Factories Act 1948 §56](https://www.indiacode.nic.in/handle/123456789/1530) 🔎 |
| **Absolute weekly cap incl. OT — 48h (legacy) / 60h (new Code)** | Legacy Factories Act: weekly total (incl. OT) stays at **48h**. New OSHWC Code: absolute weekly ceiling **60h** incl. OT. | Under the legacy regime, a worker cannot be scheduled past 48h total (regular + OT) in a week even with consent; under a state that has notified OSHWC, the hard ceiling moves to 60h. | — | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code |
| **No annual OT-hours ceiling beyond the quarterly/annual cap** | India has no *additional* annual OT ceiling distinct from the quarterly/annual cap already listed — the quarterly (or Delhi's annual) figure **is** the running ceiling. | — | — | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; state SEAs |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-determining averaging** | India's OT is decided **per-day and per-week**, never netted or averaged over a longer reference period — unlike Germany's 6-month averaging or Spain's annualisation. The quarterly/annual figure in §3c is a **running cap**, not an averaging mechanic. | A heavy week is never offset against a light week for OT purposes — each week's 48h line stands on its own. | — | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No-pyramiding — each hour counted once** | Daily and weekly OT premiums **do not stack** on the same hour; the first-crossed rule (§3a) allocates each surplus hour to exactly one bucket (daily *or* weekly), then that bucket's 2× applies once. | A 10h day in a 50h week: the 1 daily-OT hour and the (separately-counted) weekly-OT hours are never both paid 2× on the same hour. | — | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code (statutory construction) |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily cap — 9h (legacy) / 8h (new Code)** | The ordinary working day is capped at **9h** under the legacy Factories Act, or **8h** under the new OSHWC Code / Code on Wages — the same threshold that triggers daily OT (§3a) is also the working-time ceiling. | Under the legacy regime a 9.5h day is 0.5h over the daily cap; under a state that has notified the new Code, an 8.5h day is already 0.5h over. | State SEAs: 9–10h. | [Factories Act 1948 §54](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code 🔎 |
| **Weekly cap — 48h** | The standard week is capped at **48h**, typically over **6 days**. | Standard FTE: 48h/week over 6 days, with 1 mandatory 24h rest day (usually Sunday). | — | [Factories Act 1948 §51](https://www.indiacode.nic.in/handle/123456789/1530) 🔎 |
| **Spread-over cap — 10.5h/day** | The span from first clock-in to last clock-out (incl. all breaks/meals/idle time) may not exceed **10.5h/day** — the max daily hours **including** OT. | A worker clocking in 09:00 must clock out by 19:30 at the latest. | Maharashtra: **12h in emergencies**. | [Factories Act 1948 §56](https://www.indiacode.nic.in/handle/123456789/1530) 🔎 |
| **Rest break — >30min after ≤5 continuous hours** | A break of **at least 30 minutes** is mandated after **no more than 5 continuous working hours** — no stretch longer than 5h without a break (both legacy Factories Act and the new OSHWC Code §25(1)(b), effective 14 May 2026). | A worker starting 09:00 must get a ≥30min break by 14:00. | Maharashtra: after **6 continuous hours**. | [Factories Act 1948 §55](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code §25(1)(b) 🔎 |
| **Weekly rest — 1 day/week (24h) + ≤10 consecutive workdays** | A mandatory weekly **24-hour** rest period (usually Sunday); an employee may not work more than **10 consecutive days** without a rest day. | A worker rostered 11 straight days without a rest day breaches this — flag, don't silently allow. | — | [Factories Act 1948 §52](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code / Code on Wages Rules 2026 |
| **Absolute weekly ceiling incl. OT — 48h (legacy) / 60h (new Code)** | Even including overtime, total weekly hours may not exceed **48h** under the legacy Factories Act, or **60h** under the new OSHWC Code — the hard ceiling, not just the standard-hours line (§3c). | Under the legacy regime a worker cannot be scheduled past 48h total (regular + OT) in a week even with consent; under a state that has notified OSHWC, the hard ceiling moves to 60h. | — | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; OSHWC Code 🔎 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory night-work pay premium** | India mandates **no** federal night premium — unlike Germany's *Nachtzuschlag* [statutory night-shift surcharge], any night uplift is purely a company/contract choice. | — | — | (none statutory) |
| **Women's night-work ban — historically 19:00–06:00** | The Factories Act historically barred women from factory work **19:00–06:00** (§66(1)(b)). A 2007 amendment line **relaxed this in many states**, permitting night work **subject to safety safeguards**: written voluntary consent, door-to-door GPS-tracked transport, on-site security/CCTV, adequate lighting. | A woman employee may work a 22:00–06:00 shift only where the state's safeguard conditions (transport + security) are met and she has consented in writing. | **Karnataka** and **Telangana** exempted IT/ITeS from the ban since **2002 / 2024** specifically; other sectors/states vary — confirm per state. | [Factories Act 1948 §66(1)(b)](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; state amendments |
| **Female-child ban — outside 08:00–19:00** | No female **child** may work in a factory **except between 08:00 and 19:00**. | A 13-year-old girl cannot be rostered on a 20:00 shift under any circumstance, even where general child labour rules might otherwise allow limited hours. | — | [Factories Act 1948 §71](https://www.indiacode.nic.in/handle/123456789/1530) 🔎 |
| **Adolescent night ban — 19:00–08:00** | *Adolescents* [14–18] may not be employed **19:00–08:00** (repeated from §1). | A 17-year-old retail worker cannot be rostered past 19:00. | — | [Child and Adolescent Labour (Prohibition & Regulation) Act 1986/2016](https://www.indiacode.nic.in/) 🔎 |
| **Shift allowance** | No statutory rate; any shift-pattern premium is a company policy choice. | — | Common in manufacturing / continuous-process operations, value set by company. | (none statutory) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **3 mandatory national holidays** | **Republic Day (26 Jan), Independence Day (15 Aug), Gandhi Jayanti (2 Oct)** — the only holidays mandated nationwide by statute. | Every establishment nationwide, regardless of state or sector, must treat 26 Jan / 15 Aug / 2 Oct as paid holidays. | — | National Holiday Act practice / state gazettes ([DoPT](https://dopt.gov.in/) 🔎) |
| **Gazetted holidays — ~17 for central government employees** | **14 holidays uniform** across India + **3 more chosen per state** (via the Central Government Employees Welfare Coordination Committee), totalling **~17**; compulsory closures notified by the Dept. of Personnel & Training. | A central government office in Karnataka closes on the 14 uniform national holidays plus 3 state-chosen ones (e.g. Ugadi, Ganesh Chaturthi, Karnataka Rajyotsava) — 17 gazetted closures for the year. | Private-sector employers typically adopt a similar but company-chosen set (often 10–14/year) under Standing Orders / company policy — not identical to the government list. | [DoPT gazette notifications](https://dopt.gov.in/) 🔎 |
| **Restricted / optional holidays — pick ~2 from a list of 30+** | Central government employees may choose **any 2** festival days per year from a **30+-item** list as paid leave, with offices otherwise open. | An employee picks Eid and Onam as their 2 restricted holidays for the year. | Private-sector adoption of "restricted holiday" pools is common but discretionary. | [DoPT gazette notifications](https://dopt.gov.in/) 🔎 |
| **Worked holiday / weekly-off — base entitlement** | Working a declared holiday or the weekly-off day draws **double wages** and/or a **substituted day off (comp-off)**. The comp-off *deadline* is set by the employee's **state Shops & Establishments Act** — split by state in the rows below. Where a state offers both, the **employee chooses** cash or comp-off. | A worker rostered on their weekly-off day gets either double wages or a substitute rest day, on the deadline set by their state's rule below. | Factories are governed instead by Factories Act §52 (below), not the state SEA. | [state S&E Acts](https://www.indiacode.nic.in/) 🔎 |
| **Comp-off within 90 days** | Substituted day off must be granted **within 90 days** of the worked day. | A Maharashtra worker working a Sunday gets double wages **and** a substituted rest day within 90 days. | States: **Goa, Gujarat, Kerala, Maharashtra**. | [Goa/Gujarat/Kerala/Maharashtra S&E Acts](https://www.indiacode.nic.in/) 🔎 |
| **Comp-off — deadline set by company** | Comp-off is owed, but **no statutory deadline** — company policy sets when it must be taken. | A Karnataka employer's policy requires the comp-off to be taken within the same month. | States/UTs: **Karnataka, Puducherry, Tamil Nadu**. | [Karnataka/Puducherry/Tamil Nadu S&E Acts](https://www.indiacode.nic.in/) 🔎 |
| **Comp-off within 30 days** | Substituted day off **within 30 days**. | An Andaman & Nicobar worker's substitute day must fall within 30 days of the worked day. | UT: **Andaman & Nicobar**. | [A&N S&E rules](https://www.indiacode.nic.in/) 🔎 |
| **Comp-off within 30–90 days** | Substituted day off in a **30-to-90-day** window. | An Andhra Pradesh worker's comp-off falls between 30 and 90 days of the worked day. | State: **Andhra Pradesh**. | [Andhra Pradesh S&E Act](https://www.indiacode.nic.in/) 🔎 |
| **Comp-off within 6 months** | Substituted day off **within 6 months**. | An Odisha worker gets the substitute rest day within six months of the worked day. | States/UTs: **J&K, Ladakh, Odisha, Sikkim**. | [J&K/Ladakh/Odisha/Sikkim S&E Acts](https://www.indiacode.nic.in/) 🔎 |
| **Comp-off within the next calendar month** | Substituted day off **within the next calendar month**. | A UP worker working a holiday in March gets the substitute day during April. | States: **Uttar Pradesh, Uttarakhand**. | [UP/Uttarakhand S&E Acts](https://www.indiacode.nic.in/) 🔎 |
| **Comp-off within 3 days before/after** | Substituted day off **within 3 days before or after** the worked day. | A Telangana worker's substituted day must fall within 3 days of the worked Sunday. | State: **Telangana**. | [Telangana S&E Act](https://www.indiacode.nic.in/) 🔎 |
| **Double wages only — no comp-off option** | **Double wages** for the worked holiday/weekly-off, with **no statutory comp-off** alternative. | A West Bengal worker working a holiday is paid double, with no substitute-day entitlement. | States/UTs: **Bihar, Chandigarh, Haryana, Himachal Pradesh, Jharkhand, Punjab, West Bengal**. | [these states' S&E Acts](https://www.indiacode.nic.in/) 🔎 |
| **Triple value — wages + hours + an extra full day (3×)** | Holiday wages **plus** the hours worked **plus** an extra full day — effectively **3× value**. | A Madhya Pradesh worker working a holiday receives roughly three times the normal day's value. | States: **Chhattisgarh, Madhya Pradesh**. | [Chhattisgarh/MP S&E Acts](https://www.indiacode.nic.in/) 🔎 |
| **Comp-off only; extra day's wages if the comp-off day is also worked** | Entitlement is **comp-off only**; if that comp-off day is itself worked, **an extra day's wages within 30 days**. | A Mizoram worker whose comp-off day is later worked gets an extra day's wages within 30 days. | State: **Mizoram**. | [Mizoram S&E Act](https://www.indiacode.nic.in/) 🔎 |
| **No specific statutory rate** | **No specific statutory** worked-holiday premium or comp-off deadline — falls to company policy/contract. | In Delhi, worked-holiday compensation follows company policy absent a statutory figure. | States/UTs: **Assam, Delhi, Manipur, Meghalaya**. | [these states' S&E Acts](https://www.indiacode.nic.in/) 🔎 (silent) |
| **Factories Act §52 comp-off deadline (factories only)** | No adult worker may work the first day of the week (usually Sunday) unless granted a **substituted holiday within 3 days before or after**, with **advance notice** (≥3 days, posted + sent to the Inspector of Factories). | A factory worker rostered on Sunday must get a substitute rest day by the following Wednesday at the latest. | — | [Factories Act 1948 §52](https://www.indiacode.nic.in/handle/123456789/1530) 🔎 |
| **Holiday-exclusive-of-leave doctrine** | Public holidays falling within (or adjacent to) an approved leave period are **excluded from the leave count** — i.e. a holiday does not consume a leave day. **Note:** this is the statutory basis that makes the informal "Sandwich Rule" (§10) contrary to law, not supportive of it. | An employee on 5 days' approved leave that includes a public holiday: only 4 days are deducted from their leave balance. | — | [Factories Act 1948 §79](https://www.indiacode.nic.in/handle/123456789/1530) 🔎 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory flexi-time / hours-bank regime** | India has no statutory working-time-account or annualised-hours banking mechanism (contrast Germany's *Arbeitszeitkonto* [working-time account]). | — | — | (none statutory) |
| **Comp-off substitutes as TOIL for holiday/rest-day work** | The worked-holiday comp-off matrix (§6) *is* India's TOIL mechanism — a lieu day owed in place of (or alongside) the double-wage premium, with state-varying deadlines (3 days to 6 months). | — | 11 state variants — see §6. | state SEAs; [Factories Act §52](https://www.indiacode.nic.in/handle/123456789/1530) 🔎 |
| **Comp-off expiry — company practice, ~90 days common** | Many employers set an internal rule that accrued comp-off must be used within **90 days** or it lapses — this is **not** a uniform statutory rule, just a common company practice. | A worker who earns a comp-off day on 1 March under a 90-day company policy loses it if unused by ~30 May. | Varies by employer; some tie it to the state-mandated deadline instead. | Company policy (non-statutory) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No general statutory on-call/standby framework** | Outside the sector-specific transport rule below, India has **no** general statutory regime distinguishing restricted vs. unrestricted on-call time, or mandating standby pay — this is company policy. | — | — | (none statutory, general workforce) |
| **Motor Transport Workers — waiting time <15min counts as working time** | For this sector only, waiting time **under 15 minutes** between assignments counts as working time (repeated from §2); longer waits are rest/unpaid, absent a company policy. | A driver's 10-minute wait between deliveries is paid working time; a 30-minute wait is not, by default. | Sector-scoped (motor transport workers only). | [Motor Transport Workers Act 1961](https://www.indiacode.nic.in/) 🔎 |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up pay** | India has no statutory show-up / reporting-time / predictability-pay regime (unlike US CA/NYC or Spain). | — | — | (none statutory) |
| **Compressed 4-day week** | A **4-day week is allowed** under the 2020 Labour Codes: weekly cap stays **48h**, daily shifts up to **12h** (incl. rest), but state SEA daily limits (8–10h, §1) may still block it. | A 4×12h roster is lawful under the Code where the state SEA's own daily cap doesn't block it. | State-varying — several SEAs still enforce an 8–10h daily ceiling regardless of the Code. | [2020 Labour Codes](https://www.indiacode.nic.in/) 🔎; state SEAs |
| **Standing Orders formalize shift scheduling (300+ workers)** | Establishments with **≥300 workers** must draft certified **Standing Orders** covering shift schedules, attendance and leave (§1); until certified, **Model Standing Orders** apply automatically. | A 350-worker factory must formalize its shift-roster rules in certified Standing Orders. | Threshold/certification regime varies by whether the IR Code has been notified in that state. | [Industrial Employment (Standing Orders) Act 1946](https://www.indiacode.nic.in/) 🔎 |
| **Declared working Saturdays (IT sector) — informal practice** | Some IT employers declare a working Saturday without offering comp-off; whether notice is legally required is **not settled in statute** — an informal-practice question, not an established rule. 🔎 | — | — | (informal practice — not statute) |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Earned Leave [privilege leave] — Factories Act accrual** | **1 day earned per 20 days worked** for adults, after a **240-worked-day** threshold in the year (≈15 days/year); **1 day per 15 days worked** for workers under 18. Carryover up to **30 days** (adults) / **40 days** (under-18s). | An adult worker who completes 240 worked days in the calendar year has earned ≈12 EL days that year (240÷20). | State SEAs instead set a **fixed annual quota**: Delhi **15 days**, Maharashtra **21 days**, Karnataka **18 days** (typically 12–21 days, pro-rated for partial years). | [Factories Act 1948 §79](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; state SEAs |
| **Earned-leave encashment** | Unused earned leave is **paid out in cash** at exit (resignation/retirement/termination) at the latest drawn basic + dearness allowance, generally within **2 working days** of the next payday. | An employee leaving with 20 unused EL days is paid 20 days' basic+DA on exit. | Only EL/privilege leave is encashable — casual and sick leave are not. | [Factories Act 1948 §79](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; state SEAs |
| **Casual Leave** | **7–12 days/year**, state-varying. **Non-carryforward, non-encashable** — lapses at calendar year-end. | A worker with 10 unused CL days at Dec 31 loses them; they don't roll to next year. | — | [state SEAs](https://www.indiacode.nic.in/) 🔎 |
| **Sick Leave (statutory minimum)** | **7–12 days/year**, state-varying; generally non-carryforward. | A Delhi-registered employee gets 12 sick-leave days for the year; unused days do not carry to the next year. | — | [state SEAs](https://www.indiacode.nic.in/) 🔎 |
| **ESI Sickness Benefit** | For ESI-covered establishments (typically 10+ employees, wage-ceiling-gated), **up to 91 days/year** at **70% of average daily wage**, needing ≥78 contribution days in the relevant period + medical certificate. | A covered worker sick 60 days draws sickness benefit for the full 60 (within the 91-day cap). | **Extended Sickness Benefit**: for specified long-term illnesses (TB, cancer, etc.), up to **2 years** at **80%** of wages. | [Employees' State Insurance Act 1948](https://www.indiacode.nic.in/bitstream/123456789/15281/1/esiact1948amendedupto010610.pdf) 🔎 |
| **Maternity leave — 26 weeks** | **26 weeks** paid leave (≤**8 weeks** may precede the expected delivery date); **12 weeks** for a **3rd or subsequent** child. Eligibility: **≥80 days worked** in the 12 months preceding the expected delivery date. | A first-time mother due 1 Sep: up to 8 weeks before (from ~7 Jul) + the remainder after, totalling 26 weeks. A mother with 2+ existing children gets 12 weeks total. | **Adopting mother** (child <3 months old) and **commissioning mother** [via surrogacy]: **12 weeks** each. | [Maternity Benefit Act 1961, amended 2017 §5](https://www.indiacode.nic.in/handle/123456789/1681) 🔎 |
| **Crèche facility + visits** | Establishments with **≥50 employees** (headcount incl. men, contractors, trainees) must provide a **crèche**; the mother may visit **4 times/day**. | A 60-employee establishment (any gender mix) must run an on-site crèche; a nursing mother there is entitled to 4 visits/day to it. | Cost borne by the employer. | [Maternity Benefit Act 1961 §11A (2017 amendment)](https://www.indiacode.nic.in/handle/123456789/1681) 🔎 |
| **Nursing breaks** | **2 breaks/day** (most state rules set **15 min** each) for nursing, until the child turns **15 months**; paid, no wage deduction. | A returning mother takes 2×15min paid nursing breaks daily until her child's 15-month mark. | Break duration is state-rule-set (commonly 15min; confirm per state 🔎). | [Maternity Benefit Act 1961 §11](https://www.indiacode.nic.in/handle/123456789/1681) 🔎 |
| **Work-from-home option (maternity)** | The employer and the woman **may mutually agree** to a work-from-home arrangement "for such period and on such conditions" post-maternity leave. | — | Discretionary — not a mandated entitlement. | [Maternity Benefit Act 1961 §5(5)](https://www.indiacode.nic.in/handle/123456789/1681) 🔎 |
| **Paternity leave — 15 days, central government employees only** | **15 days** (consecutive or split), within **6 months** of birth/adoption, capped at **2 children** per career; requires ≥80 days employment in the preceding 12 months. **No statutory paternity leave exists for private-sector employees** — private-sector paternity leave is entirely company policy. | A central government employee takes 10 days at birth, banking 5 for later within the 6-month window. | — | [CCS (Leave) Rules 1972, Rule 551(A)](https://www.indiacode.nic.in/) 🔎 |
| **Disability — reasonable accommodation + special leave** | Employers must provide **reasonable accommodation** (modified workstations, flexible hours, adjusted leave) to remove barriers; the mandatory equal-opportunity policy must include **"special leave"** provisions — no fixed statutory day-count identified 🔎 (employer-defined within the policy). | An employee with a disability gets flexible start times as a workplace adjustment. | Applies to all public and private employers regardless of size. | [Rights of Persons with Disabilities Act 2016 §20(2)](https://www.indiacode.nic.in/) 🔎 |
| **Bereavement / compassionate leave — no central statute** | **No central law** mandates bereavement leave for private-sector employees — entirely discretionary company policy, typically **3–5 days** for immediate family. | A private employer grants 3 paid days for the death of a parent (company policy, not law). | **Government employees**: informal "special casual leave" — e.g. Indian Railways **7 days** for spouse/child death; SBI **7 days** for immediate family. | (none statutory, private sector); agency-specific rules (public sector) |
| **"Sandwich Rule" (LOP) — non-statutory, contrary to §79** | **Not in any labour law.** A company-applied practice: if a worker takes unapproved leave on the days **immediately before and after** a weekly-off/holiday, the intervening rest day is treated as Loss of Pay [LOP]. **Factories Act §79 states the opposite** (holidays are excluded from leave — see §6) — flag, don't assert as a compliance requirement. | Unapproved leave Fri + Sun sandwiching a Saturday weekly-off → some companies mark all 3 days LOP; this has **no statutory basis**. | Global payroll/HRIS systems often lack built-in logic for it — custom handling only. | (non-statutory company practice; contra [Factories Act §79](https://www.indiacode.nic.in/handle/123456789/1530) 🔎) |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Muster roll — mandatory daily attendance record** | Every factory/establishment manager must maintain a **muster roll** showing each worker's name, nature of work, and daily attendance. | An engine that records every punch and reconciles to the muster roll satisfies this. | Format varies (Central Form 25/31 vs state forms, e.g. Maharashtra Form 29). | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; state SEAs |
| **Retention — muster roll / leave / OT registers, ≥3 years** | Muster rolls, wage registers, and leave registers: minimum **3 years**' retention. OT registers: **3 years** (some sources cite 5 years 🔎 — confirm per state). | An inspector requesting muster rolls from 2 years prior must be able to receive them; records from 4 years prior may legally have been discarded (3-year minimum met). | — | [Factories Act 1948](https://www.indiacode.nic.in/handle/123456789/1530) 🔎; [Payment of Wages Act 1936](https://www.indiacode.nic.in/) 🔎 |
| **OT rounding — 15/30-minute bands** | Under the OSHWC Code, OT of **15–30 minutes** rounds up to **30 minutes**; OT **>30 minutes** rounds up to a **full hour** (§3b). | 20 minutes of OT is paid as 30 min; 40 minutes of OT is paid as 1h. | Legacy Factories Act has no equivalent rounding rule identified 🔎. | [OSHWC Code](https://www.indiacode.nic.in/) 🔎 |
| **Tolerance / rounding (general punches)** | **No statutory** rounding or grace rule for ordinary punch tolerance — a policy choice, distinct from the OT-specific rounding above. | — | — | (none statutory) |
| **Biometric attendance & data privacy (DPDP)** | Biometric attendance systems are permitted; a Supreme Court ruling on administrative-authority use applies **only to government offices**. Private-sector biometric use must separately navigate the **DPDP Act 2023** data-privacy framework (consent, retention) — downstream/legal, not a calc concern. | — | — | Supreme Court ruling (govt use) 🔎; [Digital Personal Data Protection Act 2023](https://www.indiacode.nic.in/) 🔎 |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/india.md` (mid-2026, ~40 cited sources, human-reviewed).
- **Maternity leave / crèche / nursing breaks:** pillsburylaw.com Indian Maternity Benefit (Amendment)
  Act 2017; pib.gov.in press release; omnivoo.com Maternity Benefit Act 2026 guide; indiankanoon.org
  §11 nursing breaks; corridalegal.com Maternity Benefit Act explained.
- **Paternity leave:** onsurity.com Paternity Leave in India 2026; wisemonk.io Paternity leave India
  2026.
- **Earned/casual/sick leave, encashment:** salarybox.in Earned/Casual/Sick Leave 2026;
  leavebalance.com Annual Leave Entitlement India; blog.petpooja.com Leave Encashment Rules & Tax
  India; advocategandhi.com Encashment of Earned Leave.
- **ESI sickness benefit:** teamapac.com Employee State Insurance glossary; corridalegal.com ESI
  Act 1948 overview.
- **Overtime / Code on Wages / OSHWC:** prsindia.org The Code on Wages 2019; indiacode.nic.in Code
  on Wages PDF; indiaemployerforum.org Overtime Wages in India 2026; corridalegal.com OSHWC Code
  work-hours/shifts/overtime rules; incorpx.io Overtime Rules Under New Labour Code; scconline.com
  Code on Wages (Central) Rules 2026 key highlights; scconline.com India Labour Law 2026 5-Hour
  Work Limit & Rest Break Rule; salarybox.in Working Hours & Weekly Off Rules 2026.
- **Minors / child & adolescent labour:** ruralindiaonline.org The Factories Act 1948;
  paycheck.in Child Labour, Youth Workers — India; legalclarity.org Child Labor Laws in India;
  byjus.com Child Labour (Prohibition & Regulation) Amendment Act.
- **Night work / women's safety:** ncwapps.nic.in Night Shift for Women; lawrbit.com Women in Night
  Shifts: Compliance, Safety & Employer Duties; amlegals.com Women Workforce: Permission for Night
  Shift Work; deccanherald.com Karnataka opens up night shifts for women.
- **IT/ITeS state exemptions:** azbpartners.com Labour Law Exemptions for Indian Technology and
  Outsourcing Employers; keka.com Telangana / Karnataka Shops and Establishments Act guides;
  nishithdesai.com Telangana IT-ITeS exemption extension.
- **Disability:** disclo.com India Disability Accommodation & Workplace Adjustment Guide;
  hrinformative.com Rights of Persons with Disabilities Act 2016 guide.
- **Bereavement leave:** onsurity.com Bereavement Leave In India; greythr.com Bereavement Leave in
  India 2026.
- **Recordkeeping:** salarybox.in Essential Attendance Records for Labour Inspections 2026;
  futurexsolutions.com Factory Act Registers List in India.
- **Holidays:** asanify.com Holiday List 2025 (India); hyring.com Gazetted Holiday (India) HR
  Guide; arghaa.com Public Holidays declared under NIA by State Governments.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. This is the former verdict-first memo content — kept intact for when we
> resume the "can the engine do this?" question. Not maintained as part of the requirements
> reference above.

# India — T&A compliance support

**Verdict: 🟠 Partial — a *good* premium-emission fit, undercut by a Central+State patchwork and a pending
Code rollout.** India's defining OT rule is **statutory 2× (double the ordinary rate)** on hours past a
**daily** (9h Factories Act / 8h OSHWC) *or* **weekly** (48h) ceiling — a per-hour premium on a typed OT
bucket that maps cleanly onto our **OT rate rows** (S1/S3), the **per-day surplus-above-planned** onset (S4),
and — now — the **weekly trigger** (S5). Because the premium is **per-hour, not annualised/averaged**, India
carries **no Critical, pay-determining gap** — it sits with the daily-OT countries, not with Spain. What's
**not shipping today** clusters in four places: **spread-over / working-time-limit *validation*** (the 10.5h
daily span, daily/weekly caps, rest interval — we compute pay, not breach flags), the **state-varying OT
quarterly cap** (a cross-run running counter), the **worked-holiday comp-off** subsystem (11 state variants +
lieu ledger), and **statutory leave-accrual ledgers** (earned/casual/sick). On top sits India's structural
reality: the operative numbers live in a **Central Factories Act / per-state Shops & Establishments Act / new
Labour Codes** patchwork, so "do we support India?" is really "**which regime + which state?**" Read with the
scope, verdict key, and **Basis key** in [`README.md`](./README.md). No verdict is DB-confirmed this pass
(IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). This directly closes
> India's **48h/week** OT onset (#2) — the weekly leg of the daily-OR-weekly "first-crossed" rule both the
> Factories Act and the OSHWC Code impose. Scope is the *weekly trigger only*: it does **not** close the
> **OT quarterly/annual cap** counter (#9) or the working-time-limit *validation* gaps (#5, #6, #8), which
> remain as marked.

**Legal source:** `worldwide-calculations/india.md` (mid-2026, ~40 cited sources; human-reviewed). **⚠ Source
notes:** (1) the four **new Labour Codes** (OSHWC / Wage / IR / Social Security) were *notified Nov 2025* but
run **in parallel** with the legacy Factories Act / state SEAs — which applies depends on state and
establishment type, and states must individually notify their own rules, so **do not model the Codes as
settled** 🔎. (2) The file is **silent** on any statutory *night premium* (India mandates none federally) and
flags the **Sandwich Rule** as an *explicitly non-statutory* company practice (Factories Act §79 states the
opposite) — both handled below with that caveat. (3) State-level daily caps, OT quarterly limits, and
holiday-comp deadlines **vary by state** — the file samples Maharashtra / Karnataka / Delhi / Haryana; other
states differ.

## Governing sources — who actually sets the rules

India is a **Central + State patchwork**, and (unlike France's *accord*-first model) the operative layer
depends on **establishment type**, not a single bargaining level. A company with a factory in Pune *and* an
IT office in Bengaluru is under **two regimes at once**. So "do we support India?" resolves to "**which of
these three applies, and in which state?**"

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| Central — factories | **Factories Act 1948** | **Yes, for manufacturing** — 9h/day · 48h/week · OT >9h/day or >48h/week @ 2× · spread-over 10.5h · rest >30min after 5h · weekly off (§52, ≤10 consecutive days) |
| State — everything else | **Shops & Establishments Act (per-state)** (Delhi 1954, Maharashtra 2017, Karnataka 1961, …) | **Yes, for offices / IT / retail / hotels** — *state-varying* daily cap (9–10h), OT quarterly/annual cap (50h/qtr · 144h/qtr · 150h/yr), holiday-comp matrix. **Per-location registration** — 5 offices in 5 states = 5 registrations |
| Central — new, phasing in | **2020 Labour Codes** (OSHWC · Wage · IR · Social Security) | **Gradually** — 8h/day work period · 48h/week · OT >8h/day or >48h/week @ 2× · 60h/week absolute · 144h/qtr OT cap · covers gig/platform for the first time. **⚠ Notified Nov 2025 but not uniformly in force — states must notify their own rules; runs parallel with the above. Do not model as settled** 🔎 |
| Case law | Supreme Court (*Philips India*, *State Bank of India*) | **Interpretation** — where contractual hours sit *below* the statutory ceiling, the mandatory **2× OT triggers only once the full legal threshold (48h/wk) is crossed**, not the lower contractual limit |

## Rule-by-rule (Basis = where the verdict comes from)

| # | India requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Daily OT trigger — >9h/day (Factories) / >8h/day (OSHWC) at 2×.** Overtime starts once the worker passes the statutory daily ceiling — 9h under the legacy Factories Act, 8h under the new OSHWC Code — regardless of the weekly total | OT = **surplus of actual over the PLANNED shift** (S4), per-day; `phases[].limit` tiering | 🟡 Configurable | [API][UI][DES] | **Fits when the planned shift = the statutory norm** (India factory FTE is typically a 9h day) → a 9h planned shift makes per-day surplus emit daily OT above 9h. A **fixed statutory daily norm decoupled from the planned shift** (the OSHWC 8h, or contractual-below-statutory per *Philips India*) is **G1** — draft `dailyOtThreshold` (540/480 min), **not built** `[DES]` |
| 2 | **Weekly OT trigger — >48h/week at 2×.** Both regimes cap the standard week at 48h; hours beyond it are overtime | **Weekly OT trigger** — OT beyond a weekly threshold over a configurable week window (S5) | ✅ | [PO] | **Weekly OT now supported** (per PO, 2026-07-18) — closes India's 48h/week onset; the workweek anchor is a config value. Not yet `[API]/[UI]`-visible (🔎 confirm ship) |
| 3 | **First-crossed / no pyramiding.** The two ceilings are one mechanism: an hour above the *daily* cap is daily OT; of the remaining hours, those pushing the week past 48h are weekly OT — **each hour counted once**, never paid 2× twice | Greater-of / no-pyramiding precedence at the Overtime step | 🟠 Partial | [DES] | The **spine models the shape** (accumulation window + no-pyramiding = graduated target-flow design; India run confirms "spine already covers"), but **premium-composition mode (G6) is `[DES]`** — target, not current-state shipping |
| 4 | **OT pay rate = 2× (double the ordinary rate).** Both the Factories Act and most state SEAs fix OT at exactly double — India's is a **statutory** rate, not a policy/Tarif choice | OT **rate rows by day-group** → a **200% typed premium event** (S1/S3) | ✅ | [API][UI] | **Genuine fit** — a 2× rate row emitting a typed OT hour bucket is exactly what the rate table does. The *multiplier value itself* is downstream money; we assess the hours + typed band |
| 5 | **Spread-over cap 10.5h/day (Factories Act).** The span from first login to last logout (incl. all breaks, meals, idle time) may not exceed 10.5h — also the max daily hours *including* OT | Planned presence window (`SourceShift.shiftTotalMinutes`) is Existing | ❌ Gap | [ABS][DES] | **A span-vs-threshold flag on the *actual* first-in→last-out spread** — this is **G7 spread-of-hours**, the exact mechanic of NY spread-of-hours (>10h) and France's 13h amplitude. **Reuse candidate**, designed `[DES]`, **not shipping**; we hold the planned window, not an actual-spread breach flag |
| 6 | **Rest break — >30 min after ≤5 continuous hours.** A meal/rest break is owed after at most 5 hours of continuous work (Maharashtra amends to 6h; both Factories Act and OSHWC) | Break config on the schedule (mode, paid/unpaid, startAfter) | 🟠 Partial | [DES] | Breaks configurable `[DES]`; the **min-break-by-hours *validation / flagging*** (did a compliant break occur by hour 5?) is **G4**, unconfirmed |
| 7 | **Weekly off — one 24h rest per week; ≤10 consecutive workdays.** A mandatory weekly holiday (usually Sunday); under Factories §52 a worker may not work more than 10 consecutive days without a holiday | Weekly off = `SourceShift.nonWorkingDayShift` (Existing); `workingDaysInARow` consecutive-day tracking | 🟠 Partial | [FLD][DES] | The **rest day schedules** fine (Existing); the **≤10-consecutive-days / 1-in-7 breach flag** is **G8** — `workingDaysInARow` exists `[DES]` but whether it *flags a per-week rest-day breach* is 🔎. §52 comp-off substitution → see #12 |
| 8 | **Absolute working-time caps — daily 10.5h incl OT · weekly 48h (Factories) / 60h (OSHWC).** Hard ceilings the engine should flag a breach against, not silently cap | No working-time-limit breach flagging; alert levers only (S13) | 🟠 Partial | [API][ABS] | **Limit-*validation*** — Notifications & alerts can raise a breach *alert* `[API]`; a first-class daily/weekly cap **flag** is **G4**, `[ABS]`. Non-corrupting to computed pay |
| 9 | **OT quarterly / annual cap — state-varying.** Total OT is capped: **50h/quarter** (Karnataka, Haryana), **144h/quarter** (Maharashtra, OSHWC), **150h/year** (Delhi) — a running per-worker counter | Overall **period cap** on OT — weekly/monthly/yearly/**custom**, single period (S7) | 🟠 Partial | [API][ABS] | S7 can express the **cap value** (a quarter as a custom period, the annual as yearly) `[API]`; but the **state-varying values** need per-state policies (S16), and a **cross-run running counter that flags the breach** (you can't silently stop paying worked OT) is **G3**, `[ABS]` |
| 10 | **Night work.** India mandates **no** statutory night premium. Women's night work (historically barred 19:00–06:00, Factories §66) is **no longer prohibited**, subject to safety safeguards | `nightShift {%, start, end, applyEntirePeriod}` (S8) | 🟡 Configurable | [API][UI] | Night-window **emission** available *if a customer/state/contract adds a premium* `[API]` — but **no statutory night rate to comply with**. The women's-night-work safeguard is **scheduling-side gating**, not a pay calc (`[ABS]`, low-stakes) |
| 11 | **Holidays — 3 national + state festival holidays.** Republic Day (Jan 26), Independence Day (Aug 15), Gandhi Jayanti (Oct 2) are national; states/employers add festival holidays. Applicability is state-level | Holiday calendar (`SourceHoliday`) + Holiday bit on rate rows, jurisdiction-keyed (S11) | ✅ | [FLD] | Calendar + per-state applicability = jurisdiction-keyed reference data. Fine-grained per-state applicability (`applicableJurisdictionUuids`) is draft, but the basic calendar is Existing |
| 12 | **Worked-holiday / weekly-off compensation — double wages + comp-off (11 state variants).** Working a declared holiday or weekly off draws double wages and/or a substituted day off, with **state-varying deadlines** (3 days / 30d / 90d / 6mo …) and sometimes employee choice | Holiday/DSR & Rest-days **rate rows** (S1) emit the double-wages premium | 🟠 Partial | [API][ABS] | **Double-wages** premium emits via a Holiday / *DSR & Rest days* 2× rate row 🟡 `[API]`. The **comp-off lieu-day ledger + 11-variant deadline matrix** (draft `holidayCompensationModels`) is a **separate subsystem** — same posture as Brazil worked-holiday comp-off — **not shipping** `[ABS]` |
| 13 | **Leave accrual — earned / casual / sick.** Earned leave accrues at ~**1 day per 20 days worked** (240-day-worked threshold under the Factories Act), plus casual and sick leave — running per-worker ledgers | `SourceRequest.*` handles leave as absences generically | ❌ Gap | [ABS] | Leave *consumption* handled as absences/requests; the **accrual counters** (EL 1-per-20-worked + the 240-day threshold, CL/SL) are **G12 leave-accrual ledgers**, `[ABS]`. Adjacent to core T&A (cf. Germany Urlaub) |
| 14 | **Record all working hours.** Capture every punch (biometric attendance is common; its use sits under the DPDP data-privacy framework — downstream/legal, not a calc) | Engine records every punch; approved-event locking (S15) | ✅ | [FLD] | Genuine compliance value-add — records all hours, never deletes. DPDP consent/retention is downstream |
| 15 | **State / establishment as policy.** Factory vs SEA vs Code, per **state**, with **per-location registration** (5 offices in 5 states = 5 registrations) — different regimes coexist within one company | One compensation arrangement = one pay policy (S16) | ✅ | [UI][DES] | Maps exactly — model each state × establishment-type as its own policy. The regime is **seeded/informs**, not auto-selected; multi-state workers (which state governs?) is an open research question — cf. per-minute attribution (G3-adjacent) |
| 16 | **Exempt roles.** Managerial, administrative, and highly-compensated supervisory roles are **excluded from statutory OT** — India's exempt/non-exempt split; the calc shouldn't run for them | — (no classification axis; policy assigned to all) | 🟠 Partial | [DES] | **Mitigation:** assign clearly-exempt workers a **no-OT policy** (S16) — the clear cases are correct. But there's **no exempt classification gate** (**G5**, `SourceUserProfile.roleClassificationUuid` draft `[DES]`) — borderline cases stay manual |
| 17 | **Compressed / redistributed week.** A 4-day week is allowed — weekly cap stays 48h, daily shifts up to 12h (incl. rest) — but must navigate state SEAs that still enforce 8–10h daily limits | Planned hours from roster; OT = surplus above planned (S4/S14); `scheduleType` (enum extension) | 🟡 Configurable | [API][DES] | A 12h planned day → no daily OT ≤ planned fits via the roster; the **daily-limit validation against the state SEA cap** is the same **G4** as #8. `scheduleType` extension noted in the run's field map |
| 18 | **"Sandwich Rule" (LOP).** If a worker is on unapproved leave the days *immediately before and after* a weekly off/holiday, the intervening rest day is treated as Loss of Pay | — (draft `SourceRequest.sandwichRuleApplies`) | 🔎 Verify | [ABS] | **⚠ NON-statutory** — a company policy, **not in any labour law** (Factories §79 states the *opposite*: leave is exclusive of holidays). Out of core statutory scope; draft field only — flag, don't assert as a compliance requirement |

## Summary — rule-by-rule

**5 of 18 ✅**, **4 🟡 Configurable**, **6 🟠 Partial**, **2 ❌ Gap**, **1 🔎.** The **premium-emission spine
fits India well** — the statutory 2× (rate rows), the daily *and* weekly OT triggers (per-day surplus + the
new weekly trigger), the holiday calendar, the record-all-hours value-add, and one-arrangement-per-policy for
the state patchwork all land in the ✅/🟡 column. What remains open is **limit-*validation*** (spread-over,
caps, rest interval, weekly-off breach), the **state-varying OT cap counter**, the **worked-holiday comp-off
subsystem**, and **leave-accrual ledgers** — none of which corrupts the computed 2× pay.

| # | Rule | Verdict | Why it's still open |
|---|---|---|---|
| 1 | Daily OT trigger (fixed 9h/8h norm) | 🟡 Configurable | Fits when planned = norm; fixed norm decoupled from planned = G1 draft |
| 3 | First-crossed / no-pyramiding | 🟠 Partial | Composition-mode precedence is `[DES]` target, not current-state |
| 5 | Spread-over cap 10.5h/day | ❌ Gap | G7 span-flag — designed (NY reuse), not shipping |
| 6 | Rest break (>30min after 5h) | 🟠 Partial | Break configurable; min-break *validation* unconfirmed (G4) |
| 7 | Weekly off + ≤10 consecutive days | 🟠 Partial | Rest day schedules; per-week breach flag = G8 (🔎) |
| 8 | Absolute caps (10.5h/day, 48/60h/wk) | 🟠 Partial | Alert-only; first-class limit-flag = G4 |
| 9 | OT quarterly/annual cap (state-varying) | 🟠 Partial | S7 holds the value; cross-run running counter + state variance = G3 |
| 12 | Worked-holiday comp-off matrix | 🟠 Partial | Double-wages emits; lieu ledger + 11-variant deadlines = separate subsystem |
| 13 | Leave accrual (EL/CL/SL) | ❌ Gap | No accrual counters (G12); adjacent to core T&A |
| 16 | Exempt roles | 🟠 Partial | Manually mitigable (no-OT policy); no classification gate (G5) |
| 17 | Compressed / redistributed week | 🟡 Configurable | Roster fits; SEA daily-limit validation = G4 |
| 18 | Sandwich Rule (LOP) | 🔎 Verify | Non-statutory company policy; draft field only |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — including the now-✅ weekly-OT row (#2), the 2× rate-row
> fit (#4), the daily-OT *fit* (#1), the holiday calendar (#11), record-all-hours (#14), state-as-policy
> (#15), and the compressed-week roster fit (#17).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped) · 🟡 Medium (moderately common, or a usable mitigation, or moderate build;
> typically legal obligations that don't corrupt pay) · 🟢 Low (narrow population, strong mitigation, or
> trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *Indian market* a rule bites. **⚠ State- and regime-relative** — it shifts
>   with the customer's footprint: **factory/manufacturing → spread-over (#5) + weekly off (#7)**;
>   **multi-state office/IT employers → OT cap (#9) + state-as-policy multiplication**; **managerial-heavy →
>   the exempt gate (#16)**. Money (the 2× value, allowances) is out of scope.
> - **Build-effort** = my estimate, **grounded in the Basis column** (`[API]` ≈ config/small S; `[DES]` ≈ M;
>   `[ABS]` net-new ≈ M–L) and the rubric (S = config/flag; M = cross-run counter / regime attribute /
>   band-logic; L = net-new subsystem). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (India market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#9 OT quarterly/annual cap (state-varying)** | **Partial** — S7 can hold a single-period cap value; but the running per-worker counter, the breach *flag* (can't silently stop paying worked OT), and the per-state values aren't tracked cross-run | **High** — every SEA/Factories worker has an OT cap; state-varying so it multiplies with footprint | **M** — a `SourceHistoricalState` YTD/quarter counter + per-state cap values + breach flag (G3) | 🟠 **High** (the one cross-run counter that bites broadly) |
| **#12 Worked-holiday comp-off matrix** | **Partial** — the **double-wages** premium emits via a Holiday / *DSR & Rest days* rate row today; the comp-off **lieu-day ledger + 11-state deadline matrix** is a separate subsystem (cf. Brazil comp-off), not shipping | **High** as an obligation — every state has holiday-work rules; but the *pay* part (double wages) is covered, only the lieu ledger is the gap | **M–L** — a lieu-day scheduling/ledger subsystem + the state-variant deadline registry (draft `holidayCompensationModels`) | 🟡 **Medium** (double-wages mitigates the pay; the lieu ledger is a separate subsystem) |
| **#1/#3 Daily-norm OT trigger + no-pyramiding** | **Partial** — configure a planned shift = the statutory norm so per-day surplus emits daily OT (S4), and rely on the spine's greater-of design; the **fixed statutory norm decoupled from planned** (OSHWC 8h, contractual-below-statutory) and the composition-mode precedence are `[DES]` target | **High** — core to the OT calc for all non-exempt workers | **M** — a `dailyOtThreshold` config value + composition-mode precedence (draft) | 🟡 **Medium** (S4 mitigates the common case; core to OT) |
| **#8 Absolute caps (10.5h/day · 48/60h/wk)** | **Partial** — notification/alert thresholds as manual monitoring; **pay stays correct** (the cap decides legality, not what's paid) | **High** as a legal obligation (non-corrupting) | **S** — single-period threshold flag (cheapest to add) | 🟡 **Medium** |
| **#6 Rest break (>30min after 5h)** | **Config** — configure the break rule on the schedule (30min, 5h/6h trigger); the min-break-by-hours *validation/flag* is the open piece | **High** (all workers) | **S–M** — a break-compliance flag (shares #8's validation primitive) | 🟡 **Medium** |
| **#13 Leave accrual (EL/CL/SL)** | **Partial** — leave *consumption* handled as absences; the EL 1-per-20-worked + 240-day-threshold + CL/SL accrual counters need a leave module or manual tracking | **High**, but **adjacent** to core T&A (leave mgmt, cf. Germany Urlaub) | **M** — worked-days-driven accrual counters + the 240-day threshold | 🟡 **Medium** |
| **#5 Spread-over cap 10.5h/day** | **Partial** — manual monitoring; **pay stays correct**; mirrors NY spread-of-hours (>10h) and France's 13h amplitude — a **reuse candidate**, not a novel build | **Med-High** — factory workers especially; a legal obligation (non-corrupting) | **S** — single-period span-vs-limit flag on actual first-in→last-out, reusable from the NY spread-of-hours field | 🟢 **Low** (non-corrupting; primitive designed) |
| **#7 Weekly off + ≤10 consecutive days** | **Partial** — the rest day schedules (Existing); `workingDaysInARow` primitive exists; a **per-week rest-day / 10-consecutive-day violation flag** is the missing piece (🔎) | **High** as an obligation (non-corrupting) | **S** — a flag on the existing consecutive-day primitive | 🟢 **Low** (non-corrupting; primitive exists) |
| **#16 Exempt roles** | **Partial** — manually assign clearly-exempt managerial/supervisory workers a **no-OT policy** (exclude-from-calc) → clear cases correct; no classification axis, so borderline stays manual | **Med** — managerial/supervisory populations (narrower than the US white-collar exemption); **⚠ customer-relative** — higher for management-heavy employers | **M** — a regime/exempt attribute per worker (`roleClassificationUuid` `[DES]`) | 🟢 **Low** (manually mitigable; narrower population) |
| **#18 Sandwich Rule (LOP)** | **Partial** — configurable LOP handling for the sandwiched day only if the customer sets it as policy; **not a statutory requirement** so no compliance obligation to close | **Low-Med** — company-specific practice, not law | **M** — draft `sandwichRuleApplies` LOP logic (only if a customer wants it) | 🟢 **Low** (non-statutory; discretionary) |

### Severity roll-up
- **🔴 Critical (0):** none — India's OT is a **per-hour 2× premium** (fits rate rows), with **no annualised /
  averaged pay-determining** mechanic; it sits with the daily-OT countries, not Spain.
- **🟠 High (1):** OT quarterly/annual cap (#9) — the one cross-run running counter that bites broadly (and
  multiplies with state footprint).
- **🟡 Medium (5):** worked-holiday comp-off matrix (#12), daily-norm OT trigger + no-pyramiding (#1/#3),
  absolute caps (#8), rest-break validation (#6), leave accrual (#13).
- **🟢 Low (4):** spread-over span-flag (#5), weekly-off / consecutive-day flag (#7), exempt roles (#16),
  Sandwich Rule (#18).

## The big gaps
1. **Working-time-limit *validation*** (#5, #6, #7, #8) — the spread-over 10.5h span, the daily/weekly
   absolute caps, the rest interval, and the weekly-off / 10-consecutive-day rule. We compute pay, not breach
   flags — all `[ABS]`, all **non-corrupting** to the computed 2×. The spread-over is a **G7 reuse candidate**
   (shared with NY spread-of-hours / FR amplitude).
2. **State-varying OT cap counter** (#9) — a cross-run YTD/quarter running counter with per-state values
   (50h/qtr · 144h/qtr · 150h/yr) and a breach flag = **G3**, `[ABS]`.
3. **Worked-holiday comp-off subsystem** (#12) — the double-wages *premium* emits, but the lieu-day ledger +
   11-state deadline matrix is a **separate subsystem** (same posture as Brazil worked-holiday comp-off),
   `[ABS]`.
4. **Leave-accrual ledgers** (#13) — EL 1-per-20-worked (+ 240-day threshold), casual, sick = **G12**, `[ABS]`.
5. **Regime gating** (#16) — no exempt/non-exempt classification axis (**G5**); manually mitigable via
   no-OT policy assignment.

## Where India scores well (worth saying)
- **Statutory 2× OT** (#4): India's OT rate is a **flat double**, which lands as a single 200% rate row
  emitting a typed OT hour bucket — a **genuine fit** for the rate table `[API][UI]`, no premium-mode
  gymnastics required. This is the *opposite* of the annualised-OT countries.
- **Daily *and* weekly OT triggers** (#1–#3): the per-day surplus-above-planned onset (S4) covers the daily
  ceiling when the planned shift is the statutory norm, and — with **weekly OT now supported** — the 48h/week
  leg is covered too; the "first-crossed / count-once" shape is modeled by the spine (India run confirms it).
- **State-as-policy** (#15): India's Central+State+per-location-registration patchwork maps exactly onto
  one-arrangement-per-policy `[UI][DES]` — model each state × establishment-type as its own policy.
- **Holiday calendar** (#11) + **record-all-hours** (#14): jurisdiction-keyed holiday reference data and a
  full punch record (a real compliance value-add) — both present `[FLD]`.

## 🔎 Verify before telling the customer
- **Which regime + which state.** India is not one answer — confirm establishment type (factory → Factories
  Act; office/IT/retail → the *specific* state SEA) and state before committing to caps, OT limits, or
  holiday-comp deadlines. Multi-state / mobile workers (which state governs the hours?) is an **open research
  question**, not settled.
- **Labour Codes status** — the 2020 Codes (OSHWC 8h/day, 60h/week, 144h/qtr) were *notified Nov 2025* but
  **run in parallel** with the legacy framework and are **not uniformly in force** (states must notify their
  own rules). **Do not model as settled** — confirm which framework the customer's state has actually
  activated.
- **Weekly OT (#2)** — marked ✅ per product-owner confirmation (2026-07-18); **not yet `[API]/[UI]`-visible**.
  Confirm ship status before a hard commitment.
- **Cross-shift / spread-over validation** — the spread-over 10.5h flag (#5) is a designed G7 mechanic (NY
  reuse), not shipping; the rest-break (#6) and cap (#8) *validation* behaviour is alert-only. Confirm none is
  overclaimed as a live breach engine.
- **Sandwich Rule (#18)** is **not statutory** — never present it as a compliance requirement; it's a
  discretionary company LOP policy.

## Bottom line for the customer
India is a **good premium-emission fit with a patchwork caveat.** We compute India's defining OT — the
**statutory 2× (double rate)** on hours past the **daily (9h/8h)** or **weekly (48h)** ceiling — because the
2× lands as a rate row (S1/S3), the daily leg fits the per-day engine (S4), and — with **weekly OT now
supported** — the 48h leg is covered; plus the holiday calendar, record-all-hours, and one-policy-per-state
for the Central+State patchwork. What's **not shipping today** is India's *enforcement* machinery —
**spread-over / cap / rest-interval / weekly-off *validation*** (we compute pay, not breach flags), the
**state-varying OT quarterly cap** (a cross-run counter), the **worked-holiday comp-off** subsystem (double
wages emit; the lieu ledger doesn't), and **leave-accrual ledgers** — plus the **exempt/non-exempt** gate
(manually mitigable). Critically, "do we support India?" is really "**which regime, which state?**", and the
**2020 Labour Codes are not yet settled**. Honest status: **partial, no Critical gaps; the standard non-exempt
2×-OT case is servable state-by-state, with limit-validation, the OT cap counter, comp-off, and leave ledgers
as the roadmap.**
