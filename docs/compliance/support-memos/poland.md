# Poland — T&A requirements

> **What this is.** The ground-truth reference for Poland's time-&-attendance legal requirements,
> detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive** and **atomic**:
> **one legal proposition per row**, each row self-contained (no "see §X" as the only content), with
> exact values, a worked example wherever a number is involved, variants, and a `Basis` that **links
> to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, PLN, ZUS, tax, gross-to-net) is downstream *context*
> (kept in `Values` so a policy can be configured; the deliverable is always the typed hour/day
> event, never the money).
> **Polish-term convention:** every non-English term is glossed in English in brackets on first use
> in each section, e.g. *regulamin pracy* [work regulations], *dyżur* [on-call standby].
>
> **The one structural fact that shapes this whole document.** Poland is the **unusual case where
> the operative T&A numbers live *in* the national statute**, not below it. Unlike Germany or the
> Netherlands, the **Kodeks pracy** [Labour Code] itself mandates the working-time norm, both
> overtime triggers, the +50%/+100% premiums, the 150h annual cap, 11h/35h rest, the +20% night
> premium, breaks, the Sunday/holiday day-off-in-lieu regime, 14 public holidays, and the leave
> ladder. A collective agreement (`układ zbiorowy pracy`) or workplace **work regulations**
> (`regulamin pracy`) can only **improve** on these floors — never reduce them — and CBA coverage is
> low (~11.6%), so the everyday lever a given employer actually chooses is the **working-time
> system** and **reference-period length** inside the `regulamin pracy`, not a collectively-bargained
> number. See §1.
>
> **Legal sources & links:** the **Kodeks pracy** [Labour Code] (Ustawa z 26.06.1974, WDU19740240141)
> — official register `isap.sejm.gov.pl` (blocked by a captcha wall for automated fetches this pass,
> flagged 🔎 where used) with per-article citations linked via the `lexlege.pl/kp/art-N/` mirror
> (confirmed live); the disabled-workers Act (Ustawa o rehabilitacji zawodowej, 27.08.1997) via its
> `lexlege.pl` mirror; the 2018 Sunday-trading-restriction Act via its `lexlege.pl` mirror; plus
> ZUS/gov.pl guidance for sick-pay and parental-leave figures. 🔎 marks a link or figure not
> individually re-verified this pass (mainly regulations without a confirmed article-level mirror).

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statute is dominant, not a floor above silence** | The Kodeks pracy [Labour Code] sets almost every operative T&A number directly: 8h/40h norm, both OT triggers, +50%/+100% premiums, 150h annual OT cap, 11h/35h rest, +20% night premium, breaks, Sunday/holiday lieu, 14 holidays, leave ladder. | A Polish employer with **no** CBA and a bare-bones `regulamin` still owes the full statutory OT premium, night premium, and leave — unlike Germany, where silence means no OT premium at all. | CBA/`regulamin` may only **raise** the numbers (e.g. raise the 150h annual OT cap, extend the reference period, set a higher night premium). | [Kodeks pracy (Ustawa z 26.06.1974)](https://lexlege.pl/kp/) |
| **`regulamin pracy` [work regulations] = the operational lever** | The document that actually chooses: the **working-time system** (§3), the **reference-period length** (default ≤4 months, extendable to 12), and the **8h night window** inside 21:00–07:00. Mandatory for employers with **≥50 employees**. | Two retailers under the same Kodeks pracy floor can have very different T&A shapes purely from their `regulamin` choices (e.g. one on `równoważny` 12h shifts, one on the basic 8h system). | Below 50 employees, a `regulamin` is optional — the defaults in the Code apply. | [Kodeks pracy Art. 104](https://lexlege.pl/kp/art-104/) |
| **`umowa o pracę` [employment contract] vs. civil-law contracts** | Only employees under an **`umowa o pracę`** get the working-time/overtime/rest protections below. **Civil-law contractors** (`umowa zlecenie` [contract of mandate], `umowa o dzieło` [contract for specific work]) are **outside the Code** — only the statutory minimum hourly rate applies, not these rules. | A `zlecenie` contractor working 12h/day accrues none of the OT premiums or rest protections below. | — | [Kodeks pracy Art. 22](https://lexlege.pl/kp/art-22/); [Ustawa o minimalnym wynagrodzeniu](https://isap.sejm.gov.pl/) 🔎 |
| **Fixed-term contracts (`umowa na czas określony`) — the 33-month/3-contract rule** | Maximum **33 months** total duration and **max 3** successive fixed-term contracts with the same employer; the **4th contract, or exceeding 33 months, is automatically an indefinite contract** by operation of law. | A worker on their 3rd fixed-term contract, now at month 34, is by law on an indefinite contract from month 34 — the T&A regime doesn't change, but termination protections do (downstream of T&A). | Objective-reason exceptions exist (replacement contracts, seasonal/casual work, term tied to a specific task, or an employer's justified reasons notified to the labour inspectorate). | [Kodeks pracy Art. 25¹](https://lexlege.pl/kp/art-25-1/) |
| **Part-time employment (`niepełny wymiar czasu pracy`)** | OT baseline = the worker's **contractual** hours, not the full-time line; hours worked above the part-time contract but still within the full daily/weekly norm are ordinary "additional hours" at the **ordinary rate** (not the +50%/+100% OT premium) unless the CBA/contract says otherwise. | A 20h/week contract worker rostered to 30h in a week: the 20h→32.5h band (up to the pro-rated equivalent of the full-time weekly norm) is paid at the ordinary rate; only hours beyond the **full** daily/weekly norm are statutory overtime. | CBA/contract may pay the OT premium from the contractual line instead. | [Kodeks pracy Art. 151 §5](https://lexlege.pl/kp/art-151/); [Art. 292](https://lexlege.pl/kp/art-292/) |
| **Managerial-staff exemption (Art. 151⁴)** | Employees **managing the workplace** on the employer's behalf, and **heads of separate organizational units**, work beyond the norms with **no overtime remuneration or premium**. Carve-back: unit heads **do** get the Sunday/holiday +100% premium if not given a day off in exchange. Also exempt from the 48h weekly cap (Art. 131 §2). | A department head working a 55h week draws no OT premium for the surplus; if that same head works an un-compensated Sunday, the +100% premium is still owed. | Supreme Court doctrine: the exemption does **not** license systematic overtime caused by defective work organisation — hours must still be recorded. | [Kodeks pracy Art. 151⁴](https://lexlege.pl/kp/art-151-4/); [Art. 131 §2](https://lexlege.pl/kp/art-131/) |
| **Minors (`młodociani`) 15–18 — protective regime** | A `młodociany` [young worker] is aged **15–18** (lowered from 16 in 2018, conditional on completed primary education / parental consent). Tighter daily-hour caps, a night-work ban, and longer rest apply — see §4/§5. | A 16-year-old apprentice is capped at 8h/day even where the adult `regulamin` allows 12h. | `Dziecko` [child, <15] generally may not be employed at all (narrow cultural/artistic exceptions with inspectorate consent). | [Kodeks pracy Dział IX, Art. 190–206](https://lexlege.pl/kp/art-190/) |
| **Disabled workers (`osoby niepełnosprawne`) — reduced working-time regime** | Workers with a **significant or moderate degree of disability** (`znaczny` / `umiarkowany stopień niepełnosprawności`) are capped at **7h/day and 35h/week**, with **no averaging** — see §4. | A worker with a moderate disability degree rostered for 8h is over the statutory cap regardless of the employer's chosen working-time system. | The cap **doesn't apply** to workers in specially-protected/guarding jobs, or where the worker's own occupational-medicine doctor certifies (in writing, at the worker's request) that the limits aren't needed. | [Ustawa o rehabilitacji zawodowej i społecznej oraz zatrudnianiu osób niepełnosprawnych (27.08.1997), Art. 15](https://lexlege.pl/ustawa-o-rehabilitacji-zawodowej-i-spolecznej-oraz-zatrudnianiu-osob-niepelnosprawnych/art-15/) |
| **Pregnant / nursing-parent (child <4) protections** | A **pregnant** worker may **never** be assigned night work or overtime (absolute ban, no consent override). A parent caring for a **child under 4** may not be assigned night work, overtime, the `przerywany` [split-shift] system, or work away from their fixed workplace **without their consent** (consent-overridable). | A pregnant employee cannot be rostered onto a night shift even if she asks for it; a parent of a 3-year-old can decline a business trip with no penalty. | Applies regardless of which working-time system the `regulamin` has chosen. | [Kodeks pracy Art. 178](https://lexlege.pl/kp/art-178/) |
| **⚠ Pending — shortened working-week pilot** | The Ministry of Family, Labour and Social Policy ran a **grant-funded pilot** (`program pilotażowy skrócenia czasu pracy`, 2024–2025) letting volunteer employers trial a 4-day week or shorter daily hours **without pay cuts**. **Not yet law — do not model as a statutory entitlement.** 🔎 confirm current status. | — | — | [Ministry announcement (draft policy, not enacted)](https://www.gov.pl/web/rodzina) 🔎 |
| **⚠ Pending — leave-ladder tenure credit expansion** | A proposed change would credit **self-employment and civil-law-contract (`zlecenie`) periods** toward the 10-year threshold that unlocks 26-day annual leave (§10). **Not yet confirmed in force — verify effective date.** 🔎 | — | — | [Ministry announcement (draft, 2026)](https://www.gov.pl/web/rodzina) 🔎 |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **What counts as working time** | `Czas pracy` [working time] = time the worker **remains at the employer's disposal** at the workplace or another place designated for work. Standby actually worked counts in full; pure `dyżur` [on-call standby] with no work performed does not (see §8). | A worker held at the workplace between tasks, ready to be assigned, is on the clock even during idle minutes. | — | [Kodeks pracy Art. 128](https://lexlege.pl/kp/art-128/) |
| **`doba pracownicza` [employee's 24-hour working day] doctrine** | Historically, a worker's "day" ran from the start of one shift to the same clock-hour the next day (not the calendar day) — a second shift starting **earlier** than the last one within that 24h window could trigger daily overtime. Case law has relaxed this for legitimately repeated/staggered rosters. | A worker whose Monday shift starts 08:00 and whose Tuesday shift is rostered to start 06:00 falls **inside** the Monday `doba` — flagged as a potential daily-OT trigger unless the roster is a recognised repeating pattern. | Sąd Najwyższy [Supreme Court] case law, not a Code article — validation-only, not a premium rule. | [Sąd Najwyższy case law (doctrine)](http://www.sn.pl/orzecznictwo/) 🔎 |
| **`zadaniowy` [task-based] system — no hour-by-hour recording** | Tasks are sized to the 8h/40h norm; the employer has **no duty to record start/end times** — a daily record still exists for pay purposes, but the engine cannot reconstruct actual worked minutes the normal way. | A field-sales role on `zadaniowy` logs completed tasks, not punches. | Chosen via `regulamin`/contract per Art. 140. | [Kodeks pracy Art. 140](https://lexlege.pl/kp/art-140/); [Art. 149 §2](https://lexlege.pl/kp/art-149/) |
| **Cross-midnight shifts** | No special statutory splitting rule beyond the `doba pracownicza` doctrine above — a shift crossing midnight is attributed to the `doba` in which it started for OT-trigger purposes. | A 22:00–06:00 shift is one continuous `doba`, not split across two calendar days for the daily-norm trigger. | — | [Kodeks pracy Art. 128](https://lexlege.pl/kp/art-128/); [Sąd Najwyższy case law](http://www.sn.pl/orzecznictwo/) 🔎 |

## 3. Overtime

*Poland prices overtime directly in statute — both the trigger and the premium are Code-mandated, not policy-defined (contrast Germany). Two overtime **triggers** run in parallel: the daily norm, and the average weekly norm at reference-period close.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily-norm trigger** | Overtime fires on every hour beyond the **8h/day** norm (or the extended daily cap under an alternative working-time system, §3d/§1). Must be driven by the employer's **special needs, rescue, or breakdown repair**. | An 8h-norm worker doing 11h has 3h of daily overtime. | Extended daily caps (12h/16h/24h) under `równoważny` [equivalent] systems move this trigger — see §3d. | [Kodeks pracy Art. 151 §1](https://lexlege.pl/kp/art-151/) |
| **Average-weekly-norm trigger** | A **second**, independent trigger: hours exceeding the **average 40h/week** measured across the whole reference period (default ≤4 months, extendable to 12) — computed **at period close**, so a busy week can stay OT-free if a quieter week pulls the average back down. | A worker averaging 42h/week across a 4-month reference period has crossed this trigger even if no single day breached the 8h daily norm. | Reference-period length is a `regulamin`/CBA choice (§1, §3d). | [Kodeks pracy Art. 151¹ §2](https://lexlege.pl/kp/art-151-1/) |
| **Overtime must be employer-directed** | Only overtime **required by the employer's special needs** (or rescue/breakdown repair) counts — not self-initiated extra hours. | — | — | [Kodeks pracy Art. 151 §1](https://lexlege.pl/kp/art-151/) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **+50% — ordinary-day overtime** | Overtime on a normal weekday earns **+50%** on top of normal pay. Typed band: `OT_150`. | 3 daily-OT hours on an ordinary Wednesday → `OT_150: 3h`. | — | [Kodeks pracy Art. 151¹ §1](https://lexlege.pl/kp/art-151-1/) |
| **+100% — night / Sunday / holiday / exchange-day / weekly-average excess** | The higher **+100%** premium applies to overtime worked at **night**, on a **Sunday**, on a **public holiday**, on a **day granted in lieu** of Sunday/holiday work, or for hours exceeding the **average weekly norm** (§3a). Typed band: `OT_200` (or `OT_200_WEEKLY` for the average-norm excess, not double-counted against an already-+100% reason). | 2 of the day's OT hours fall in the night window → `OT_200: 2h` instead of `OT_150`. | — | [Kodeks pracy Art. 151¹ §1–2](https://lexlege.pl/kp/art-151-1/) |
| **Premium basis — the worker's own wage** | Both OT premiums are computed on the employee's **own personal-grade wage** (`wynagrodzenie wynikające z osobistego zaszeregowania`); if undefined, **60% of remuneration**. *(Contrast the night premium in §5, which uses the statutory minimum wage.)* | A worker with no defined personal-grade wage rate has their OT premium computed on 60% of their overall remuneration instead. | — | [Kodeks pracy Art. 151¹ §3](https://lexlege.pl/kp/art-151-1/) |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **150-hour annual overtime cap** | Each worker may do at most **150 overtime hours per calendar year** for the employer's "special needs" — a running YTD counter, independent of the 48h weekly-average cap (§4). | A worker who has already logged 148 YTD OT hours can do only 2 more before the statutory cap binds (absent a raise). | **Raisable** by CBA/`regulamin`/contract; **professional drivers: 260h**. | [Kodeks pracy Art. 151 §3–4](https://lexlege.pl/kp/art-151/) |
| **48h weekly cap incl. overtime — a separate, independent ceiling** | Worked hours **plus overtime** must average **≤48h/week** over the reference period — binds regardless of whether the 150h annual cap has been raised. | Raising the annual cap to 200h by CBA does **not** permit an average above 48h/week. | Managers exempt (Art. 131 §2, see §1). | [Kodeks pracy Art. 131 §1](https://lexlege.pl/kp/art-131/) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Reference period (`okres rozliczeniowy`) — default ≤4 months** | The window over which the average-weekly-norm OT trigger (§3a) and the 48h cap (§3c) are measured. Extendable to **max 12 months** where justified by objective/technical reasons. | A manufacturer on a 4-month reference period nets a busy month against a quiet one before the average-norm OT trigger fires. | Extension needs CBA / union agreement, or (absent unions) agreement with employee representatives. | [Kodeks pracy Art. 129 §2](https://lexlege.pl/kp/art-129/) |
| **Alternative working-time systems reshape the daily/period baseline** | `równoważny` [equivalent] systems extend the **daily cap to 12/16/24h** (balanced by shorter days), each with its own **shorter reference period** (≤1 month, extendable to 3, or 4 for seasonal/weather work). `ruch ciągły` [continuous operation] allows an average **43h/week** over ≤4 weeks. | A security guard on the 24h-shift `równoważny` system (Art. 137) works a 24h shift with no OT until hour 24, balanced by rest days later in the period. | `przerywany` [split/interrupted], `zadaniowy` [task-based], `skrócony tydzień` [shortened week], `weekendowy` [weekend-only] — see the system table in §9. | [Kodeks pracy Art. 135–139](https://lexlege.pl/kp/art-135/) |
| **Weekly-average excess computed at period close, not per week** | The +100% weekly-average-excess band (§3b) is only known once the reference period closes — a mid-period week cannot be finally typed until then. | — | — | [Kodeks pracy Art. 151¹ §2](https://lexlege.pl/kp/art-151-1/) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night-overtime stacks additively, on two different bases** | A night hour that is also overtime carries **both** the +100% OT premium (personal-wage basis) **and** the separate +20% night premium (minimum-wage basis, §5) — additive, never merged into one multiplier. | 2 OT hours falling in the night window → `OT_200: 2h` (own-wage basis) **plus** `NIGHT_PREMIUM_20: 2h` (minimum-wage basis) — two separate typed amounts. | — | [Kodeks pracy Art. 151¹ §1](https://lexlege.pl/kp/art-151-1/); [Art. 151⁸ §1](https://lexlege.pl/kp/art-151-8/) |
| **No double-counting the weekly-average-excess band** | Hours already paid +100% for a same-hour reason above (night, Sunday, holiday, exchange-day) are **not** additionally counted into the weekly-average-excess `OT_200_WEEKLY` band. | An hour that is both a Sunday-OT hour and part of the weekly-average excess is typed once, as `OT_200` (Sunday), not twice. | — | [Kodeks pracy Art. 151¹ §2](https://lexlege.pl/kp/art-151-1/) |
| **Time-off-in-lieu is mutually exclusive with the cash premium** | Where TOIL is elected (§7), the premium is **not** additionally due for the same hours — one or the other, never both. | — | — | [Kodeks pracy Art. 151²](https://lexlege.pl/kp/art-151-2/) |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily rest — 11 consecutive hours** | Every worker is owed **≥11 unbroken hours** of rest in each 24-hour period. | A shift ending 22:00 owes a next start no earlier than 09:00. | Rescue/breakdown-repair exceptions owe **compensating rest**. Minors get 14h (below); disabled workers' cap interacts via §1. | [Kodeks pracy Art. 132](https://lexlege.pl/kp/art-132/) |
| **Weekly rest — 35 consecutive hours** | **≥35 unbroken hours**, **including the 11h daily rest**, normally spanning Sunday. | A standard Mon–Fri worker's weekend rest (Sat 22:00 → Mon 06:00-ish) clears the 35h floor. | In defined exceptional cases may drop, but **never below 24h**. | [Kodeks pracy Art. 133 §1–2](https://lexlege.pl/kp/art-133/) |
| **Tiered paid breaks, keyed to actual hours** | **15 min** once the day reaches **≥6h** worked; a **second 15 min** past **>9h**; a **third 15 min** past **>16h** — all counted **and paid** as working time. Keyed to **actual** hours (overtime counts), so entitlement is only final once actual time is assembled. | A worker who logs 10h actual (incl. 2h OT) gets both the 15-min and the second 15-min break, even though the *planned* day was only 8h. | 2023 reform (in force since 26 Apr 2023) added the second/third tiers. | [Kodeks pracy Art. 134](https://lexlege.pl/kp/art-134/) |
| **48h weekly-average cap validation** | Worked hours + overtime must average **≤48h/week** over the reference period — a breach should raise a flag, not be silently absorbed. | A worker averaging 50h/week across a 4-month reference period breaches the 48h cap and should be flagged, even if no single week looks extreme. | Managers exempt (Art. 131 §2). | [Kodeks pracy Art. 131 §1](https://lexlege.pl/kp/art-131/) |
| **Screen-work breaks (BHP regulation, distinct from Art. 134)** | Display-screen work for at least half the working day → a **5-minute break after each hour** (counted as working time), unless screen work is alternated with other tasks. | An all-day data-entry role must build in hourly 5-min breaks unless task-rotated. | — | [Rozporządzenie MPiPS ws. BHP przy pracy przy monitorach ekranowych](https://isap.sejm.gov.pl/) 🔎 |
| **Minors — 6h/8h daily caps** | `Młodociany` [young worker] **under 16**: max **6h/day**. **16–18**: max **8h/day**. Combined school + work time is capped for those still in education. 🔎 confirm exact combined-hours ceiling. | A 15-year-old apprentice cannot be rostered past 6h/day even under an adult `równoważny` system. | — | [Kodeks pracy Art. 202](https://lexlege.pl/kp/art-202/) |
| **Minors — break at 4.5h (lower threshold than adults)** | If daily working time exceeds **4.5h**, a minor is owed an **uninterrupted ≥30-minute break**, counted as working time. | A 17-year-old rostered for 5h owes a 30-minute break, whereas an adult on the same 5h shift owes none (adults' threshold is 6h). | Adults' first break threshold is 6h (Art. 134); minors' is lower. | [Kodeks pracy Art. 202 §3](https://lexlege.pl/kp/art-202/) |
| **Minors — 14h daily rest / 48h weekly rest** | Minors are owed **≥14 consecutive hours** of daily rest (vs. 11h for adults) and **≥48 consecutive hours** of weekly rest, which should include Sunday. | A 16-year-old finishing a shift at 18:00 cannot be rostered back before 08:00 the next day (14h), 3h more than an adult's 11h floor. | — | [Kodeks pracy Art. 203¹](https://lexlege.pl/kp/art-203-1/) |
| **Disabled workers (significant/moderate degree) — 7h/day, 35h/week, no averaging** | Capped at **7h/day and 35h/week**, with **no** reference-period averaging permitted. Cannot be assigned overtime or night work **unless** they work in specially-protected/guarding roles, or their own occupational-medicine doctor certifies (in writing, at their request) the limits aren't needed. | A moderate-disability-degree worker cannot be rostered to an 8h `regulamin`-standard shift. | Doctor's-certificate opt-out; guarding-role exception. | [Ustawa o rehabilitacji zawodowej Art. 15](https://lexlege.pl/ustawa-o-rehabilitacji-zawodowej-i-spolecznej-oraz-zatrudnianiu-osob-niepelnosprawnych/art-15/) |
| **Disabled workers — additional 15-minute break** | A **further 15-minute break**, counted as working time, for rest/exercise purposes — on top of any Art. 134 break. | A disabled worker on an 8h shift gets the ordinary 15-min Art. 134 break **plus** this extra 15-min break — 30 minutes of paid break total. | — | [Ustawa o rehabilitacji zawodowej Art. 17](https://lexlege.pl/ustawa-o-rehabilitacji-zawodowej-i-spolecznej-oraz-zatrudnianiu-osob-niepelnosprawnych/art-17/) |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night window — employer-set 8h within 21:00–07:00** | The employer fixes a specific **8-hour** window inside **21:00–07:00** in the `regulamin`; hours falling in it → `NIGHT_HOURS`. | An employer designates 22:00–06:00 as the night window; a 23:00–02:00 shift portion is fully inside it. | Window value itself is `regulamin`-configurable within the 21:00–07:00 envelope. | [Kodeks pracy Art. 151⁷ §1](https://lexlege.pl/kp/art-151-7/) |
| **"Night worker" status (`pracujący w nocy`)** | A worker qualifies if their schedule includes **≥3h of night work each 24h**, or **≥¼ of their reference-period hours** fall in the night window. | A worker regularly rostered 22:00–06:00 (8h nightly) easily clears the 3h/24h test. | — | [Kodeks pracy Art. 151⁷ §2](https://lexlege.pl/kp/art-151-7/) |
| **Night-worker hazard cap — 8h/day, no extension** | A night worker doing particularly **dangerous or physically/mentally demanding** work is capped at **8h/day** with **no** extension permitted. | A night-shift worker on hazardous machinery cannot be rostered a 10h night shift even under an equivalent system. | — | [Kodeks pracy Art. 151⁷ §3–4](https://lexlege.pl/kp/art-151-7/) |
| **Night premium — +20% of the statutory minimum wage (not the worker's own wage)** | Each hour in the night window earns **+20% of the hourly rate derived from the statutory minimum wage** (monthly minimum ÷ that month's nominal hours) — so the premium's złoty value **varies month to month** and is identical for junior and senior staff. | 2026 minimum wage PLN 4,806/month (PLN 31.40/hour) → the night premium is ~PLN 6.28/hour that month, same for every worker regardless of grade. | For workers regularly working nights **off-site**, the per-hour premium may be replaced by a **lump sum** (`ryczałt`) reflecting anticipated night hours. | [Kodeks pracy Art. 151⁸ §1–2](https://lexlege.pl/kp/art-151-8/) |
| **Minors — absolute night-work ban 22:00–06:00** | Minors may not work at all in the **22:00–06:00** window. | A 17-year-old retail worker must finish by 22:00 regardless of the adult night window. | — | [Kodeks pracy Art. 203](https://lexlege.pl/kp/art-203/) |
| **Pregnant workers — absolute night-work ban** | A pregnant worker may **never** be assigned night work (no consent override). | — | See §1. | [Kodeks pracy Art. 178 §1](https://lexlege.pl/kp/art-178/) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **14 public holidays, 5 movable** | Poland has **14** statutory non-working holidays: New Year (1 Jan), Epiphany (6 Jan), Easter Sunday (movable), Easter Monday (movable), Labour Day (1 May), Constitution Day (3 May), Pentecost Sunday (movable, 7th Sunday after Easter), Corpus Christi (movable, Thursday 60 days after Easter), Assumption (15 Aug), All Saints (1 Nov), Independence Day (11 Nov), **Christmas Eve** (24 Dec, added 2025), Christmas Day (25 Dec), 2nd day of Christmas (26 Dec). | For 2026: 2 holidays fall on Saturday, 4 on Sunday, 8 on Mon–Fri (per the repo seed's 2026 count). | The holiday calendar must be **computed per year** — 5 feasts move off Easter; a hard-coded "13" (pre-2025) is now wrong. | [Ustawa z 18.01.1951 o dniach wolnych od pracy (amended Dec 2024, effective 1 Feb 2025)](https://isap.sejm.gov.pl/) 🔎 |
| **Art. 130 §2 — Saturday-holiday norm reduction** | Every holiday falling on a day **other than Sunday** reduces the reference-period working-time norm by **8h**. When it lands on a **Saturday** (already non-working under the 5-day week), the employer owes an **extra day off within the same reference period**. A holiday on a **Sunday** reduces nothing. | 2026 has 2 Saturday holidays → 2 extra compensating days off owed within their respective reference periods, on top of the 8h norm reduction each. | The Code mandates the 8h **norm reduction**, not literally "one whole day" — other in-period allocations are permissible. | [Kodeks pracy Art. 130 §2](https://lexlege.pl/kp/art-130/) |
| **Sunday/holiday work — prohibited by default** | Work on Sundays and holidays is **forbidden**, subject to **permitted categories**: rescue/life-safety/property/environment protection; continuous operation; shift work; necessary repairs; transport & communications; plant fire/rescue; guarding; agriculture & animal husbandry; and services for the **daily needs of the population** (public services, gastronomy, hotels, utilities, healthcare). | A hospital may roster Sundays under the healthcare category; a factory generally may not without a continuous-operation/shift-work basis. | Retail Sunday trading is separately governed by the 2018 trade-restriction Act (below) — distinct from the Kodeks pracy day-off/premium rules. | [Kodeks pracy Art. 151⁹–151¹⁰](https://lexlege.pl/kp/art-151-9/) |
| **Day off in lieu — the primary remedy for Sunday/holiday work** | **Sunday worked** → another day off within **6 calendar days before or after** that Sunday (else by reference-period end). **Holiday worked** → another day off **anywhere in the reference period**. **Only if no day off can be granted** → the **+100%** cash premium (§3b) for each hour worked. | A retail worker who works a Sunday gets a compensating day off the following Wednesday (inside the ±6-day window) rather than a cash premium. | — | [Kodeks pracy Art. 151¹¹](https://lexlege.pl/kp/art-151-11/) |
| **At least 1 Sunday off every 4 weeks** | Even workers permitted to work Sundays must get **one full Sunday free** within every rolling **4-week** window. | A retail worker rostered on 3 consecutive Sundays must get the 4th Sunday off. | Exception: the `weekendowy` [weekend-only] working-time system (Art. 144). | [Kodeks pracy Art. 151¹²](https://lexlege.pl/kp/art-151-12/) |
| **Retail Sunday-trading restriction — a separate statute** | Governs **whether** a retail outlet may open on a Sunday at all (near-total ban, with named exceptions incl. a handful of pre-Christmas trading Sundays) — distinct from *whether working a permitted Sunday earns the day-off-in-lieu/premium* above. | A supermarket closed under the trading-ban statute has no Sunday-work T&A question to begin with; a permitted category (e.g. a petrol-station shop) still owes the day-off-in-lieu/premium rules. | Exempt categories: petrol stations, small owner-run shops, post offices, pharmacies, and others named in the Act. | [Ustawa z 10.01.2018 o ograniczeniu handlu w niedziele i święta](https://lexlege.pl/ustawa-z-dnia-10-stycznia-2018-r-o-ograniczeniu-handlu-w-niedziele-i-swieta-oraz-w-niektore-inne-dni/) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Time off in lieu of the overtime premium — two ratios by who initiates** | **1:1** (one hour off per OT hour) at the **worker's written request**; **1.5:1** (1.5 hours off per OT hour) at the **employer's initiative**, granted by end of the reference period without reducing full-month pay. Either way, the **cash premium is then not due**. | 10 OT hours: employee-requested TOIL banks 10h off; employer-initiated TOIL banks 15h off. | — | [Kodeks pracy Art. 151²](https://lexlege.pl/kp/art-151-2/) |
| **Equivalent/extended systems as implicit hours-averaging** | `równoważny` [equivalent] systems (12h/16h/24h days) and `ruch ciągły` [continuous operation] (avg 43h/week) function as a built-in hours-bank: longer days are balanced by shorter ones or extra days off across the reference period, rather than a separate named account. | A 24h-shift security guard's "bank" is simply the days off scheduled later in the ≤1-month reference period to keep the average at the norm. | — | [Kodeks pracy Art. 135–138](https://lexlege.pl/kp/art-135/) |
| **No separate long-term working-time account** | Unlike Germany's `Arbeitszeitkonto`/`Langzeitkonto`, Poland has **no** statutory long-horizon banked-value institution — banking is limited to the TOIL ratios above and the reference-period system mechanics. | — none identified beyond the above — | — | — |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **`Dyżur` [on-call standby] — not working time unless work is performed** | Time on standby outside normal hours, at the workplace or another designated place, is **not** working time unless the worker is actually called to work — but must **not** violate the 11h daily / 35h weekly rest floors (§4). | A doctor on overnight `dyżur` who is never called out logs no working hours for those idle hours, but the rest-period floor still applies to the following day. | Not applicable to managers (§1). | [Kodeks pracy Art. 151⁵ §1–2, §4](https://lexlege.pl/kp/art-151-5/) |
| **`Dyżur` compensation — equal time off, or 60% pay if none can be given** | The standby period earns **equal time off** in duration, or — if time off can't be given — **pay** at the worker's personal rate (**60% of salary** if no rate is specified). | An 8h `dyżur` shift with no call-outs earns 8h of compensating time off, or 60%-rate pay if scheduling can't accommodate it. | **Exception: `dyżur` at home** carries **no** time-off/pay entitlement — only actual work performed during it counts. | [Kodeks pracy Art. 151⁵ §3](https://lexlege.pl/kp/art-151-5/) |
| **Actual work during `dyżur` is ordinary (and potentially overtime) hours** | Hours **actually worked** during standby are normal working time and can trigger the daily/weekly-average OT triggers (§3a) like any other hours. | A call-out worked for 2h during an on-site `dyżur` counts toward the daily norm and can push the worker into daily overtime. | — | [Kodeks pracy Art. 151⁵](https://lexlege.pl/kp/art-151-5/) |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up or predictability pay** | Poland has **no** statutory show-up pay, reporting-time pay, or predictability-pay regime (unlike some US jurisdictions). Roster protections come via the Sunday/holiday lieu-scheduling rules (§6) and the rest floors (§4). | — | — | (none statutory) |
| **`przerywany` [interrupted/split-shift] system — Poland's split-shift mechanic** | A schedule with **one break, max 5h**, unpaid, but the worker is paid **at ½ the normal rate** for that break period. Cannot combine with `równoważny`/`ruch ciągły`/`skrócony tydzień`/`weekendowy`. | A worker on a 07:00–10:00 / (unpaid 5h split, ½-paid) / 15:00–19:00 schedule draws ½ pay across the 15:00 gap. | On written employee request only. | [Kodeks pracy Art. 139](https://lexlege.pl/kp/art-139/) |
| **`skrócony tydzień pracy` [shortened working week]** | On written employee request: work **fewer than 5 days/week**, with daily hours extended up to **12h**, average 40h/week; reference period ≤1 month. | A worker compresses a 40h week into 4×10h days by request. | — | [Kodeks pracy Art. 143](https://lexlege.pl/kp/art-143/) |
| **`weekendowy` [weekend-work] system** | On written employee request: work **only Friday–Sunday plus holidays**, daily up to **12h**; reference period ≤1 month; the **1-Sunday-in-4** rule (§6) does **not** apply. | A worker on this system works every Friday–Sunday and is exempt from the 4-week Sunday-off counter. | — | [Kodeks pracy Art. 144](https://lexlege.pl/kp/art-144/) |
| **Flexible/remote-work request right for parents of a child ≤8** | A parent of a child up to **8 years old** has the right to **request** remote work, flexible scheduling, a reduced schedule, or a weekend-only pattern; the employer may refuse only for defined organisational reasons. | A parent of a 5-year-old requests a compressed 4-day roster; the employer must justify any refusal. | 2023 work-life-balance reform (implementing EU Directive 2019/1158). | [Kodeks pracy Art. 188¹ (WLB amendment, 26 Apr 2023)](https://lexlege.pl/kp/art-188-1/) |
| **`praca zdalna` [remote work] — permanent Code institution** | Remote work is a standing Kodeks pracy arrangement (replacing the older `telepraca` [telework] concept) — a scheduling/location attribute rather than a separate working-time regime. | — | — | [Kodeks pracy Dział II, Rozdział IIc (2023 amendment)](https://lexlege.pl/kp/) 🔎 |
| **⚠ Pending — 4-day-week pilot** | See §1 — a **voluntary, grant-funded pilot**, not a statutory scheduling entitlement. 🔎 confirm current status before modelling. | — | — | [Ministry announcement (not enacted)](https://www.gov.pl/web/rodzina) 🔎 |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Annual leave (`urlop wypoczynkowy`) — 20 or 26 days** | **20 days** if total employment (incl. education credit, below) is **<10 years**; **26 days** if **≥10 years**. Part-time pro-rated; partial days rounded **up**. | A worker crossing the 10-year threshold mid-year has their entitlement recalculated from that point. | — | [Kodeks pracy Art. 154 §1–2](https://lexlege.pl/kp/art-154/) |
| **Education credited toward the 10-year threshold** | Prior education is **added** (not summed with overlapping work, whichever is more favourable) toward the leave-tenure count: **university +8 years**; post-secondary **+6**; secondary general **+4**; secondary vocational **+5**; basic vocational **up to +3**. | A graduate with only 2 years' work history already clears the 10-year line (2 + 8 = 10) and gets 26 days. | — | [Kodeks pracy Art. 155](https://lexlege.pl/kp/art-155/) |
| **First-ever job — 1/12 monthly accrual** | In the **first calendar year** of a first-ever job, leave accrues at **1/12 of the annual entitlement per completed month**; the full entitlement applies upfront from the following calendar year. | A first job starting 1 April accrues 9/12 × 20 = 15 days for that first calendar year. | — | [Kodeks pracy Art. 153 §1](https://lexlege.pl/kp/art-153/) |
| **On-demand leave (`urlop na żądanie`)** | Up to **4 days/calendar year**, requested no later than the **start day**; carved **out of** the 20/26-day total (not added), capped at 4 days/year **across all employers** for a multi-employer worker. | A worker calls in a same-day `urlop na żądanie` for a personal emergency; it draws down from their normal annual-leave balance. | — | [Kodeks pracy Art. 167²](https://lexlege.pl/kp/art-167-2/) |
| **⚠ Pending — leave-tenure credit for self-employment/`zlecenie`** | See §1 — proposed but **unconfirmed** expansion of what counts toward the 10-year threshold. 🔎 | — | — | [Ministry announcement (draft, 2026)](https://www.gov.pl/web/rodzina) 🔎 |
| **Sick pay — 33 (or 14) employer-paid days, then ZUS to 182 (or 270) days** | The **employer** pays the first **33 days**/calendar year of sickness absence (**14 days** for workers **over 50**) at **80%** of the calculation basis (**100%** for pregnancy, work accident, or organ-donation-related absence). From day 34 (or day 15 for over-50s), **ZUS** [Social Insurance Institution] pays `zasiłek chorobowy` [sickness benefit] at the same rates, up to a total of **182 days** of incapacity (**270 days** for tuberculosis or pregnancy-related absence). | A 45-year-old worker sick for 40 days: the employer pays the first 33 days, ZUS pays days 34–40. A 55-year-old worker in the same scenario: employer pays only 14 days, ZUS picks up from day 15. | The **days counters** (33/14, 182/270) are the T&A-relevant thresholds; the %/PLN amounts are downstream money. | [Kodeks pracy Art. 92](https://lexlege.pl/kp/art-92/); [Ustawa o świadczeniach pieniężnych z ubezpieczenia społecznego (ZUS), Art. 8, 9, 11](https://www.zus.pl/swiadczenia/zasilki/zasilek-chorobowy) 🔎 |
| **Maternity leave (`urlop macierzyński`) — 20 to 37 weeks by birth count** | **20 weeks** for one child; **31** for twins; **33** for triplets; **35** for quadruplets; **37** for quintuplets+. May start **up to 6 weeks before** the due date, or from the delivery date. Paid **100%** (ZUS). | A mother of twins is entitled to 31 weeks, startable up to 6 weeks pre-delivery. | — | [Kodeks pracy Art. 180](https://lexlege.pl/kp/art-180/) |
| **Paternity leave (`urlop ojcowski`) — 2 weeks** | **14 calendar days (2 weeks)**, usable any time until the child turns **12 months old** (or within 12 months of an adoption decision, not past the child's 14th birthday). May be taken **all at once or split into 2 parts**, each **≥1 week**. Written/electronic request **≥7 days** before the leave starts. Paid **100%** (ZUS). | A father splits his 2 weeks into a 1-week block right after birth and a second 1-week block at month 6. | Job-protected from the request date through completion (dismissal barred except disciplinary-with-union-consent or employer bankruptcy/liquidation). | [Kodeks pracy Art. 182³](https://lexlege.pl/kp/art-182-3/) |
| **Parental leave (`urlop rodzicielski`) — 41/43 weeks, 9 non-transferable** | **41 weeks** shared between both parents for one child (**43 weeks** for a multiple birth), of which **9 weeks are reserved per parent, non-transferable** (lost if not used by that parent). Usable in **up to 5 parts**, until the end of the calendar year the child turns **6**. Paid **70%**, or **81.5%** averaged across the combined maternity+parental period if claimed within **21 days** of the birth. | A couple splitting the 41 weeks: if the father doesn't use his reserved 9 weeks, those weeks are simply forfeited, not transferable to the mother. | 2023 work-life-balance reform implementing the non-transferable "daddy quota". | [Kodeks pracy Art. 182¹ᵃ–182¹ᵍ](https://lexlege.pl/kp/art-182-1a/) 🔎 |
| **Carer's leave (`urlop opiekuńczy`)** | **5 days/year**, **unpaid**, to provide personal care/support to a family member or household member with a serious medical need. | An employee takes 3 of their 5 carer days to accompany a parent through a hospital stay. | 2023 WLB reform (implementing EU dir. 2019/1158). | [Kodeks pracy Art. 173¹](https://lexlege.pl/kp/art-173-1/) |
| **Force-majeure leave (`zwolnienie z powodu siły wyższej`)** | **2 days or 16 hours/year** (worker's choice of unit for the first request in the year), for urgent family reasons from illness/accident, paid at **50%** of remuneration. | A worker takes 8 hours (of their 16h allotment) to handle a sudden family emergency, keeping 8h in reserve for later in the year. | 2023 WLB reform. | [Kodeks pracy Art. 148¹](https://lexlege.pl/kp/art-148-1/) |
| **Occasional/special leave (`urlop okolicznościowy`)** | **2 days**: employee's own marriage; birth of the employee's child; death of the employee's spouse, child, parent, or stepparent. **1 day**: marriage of the employee's child; death of the employee's sibling, grandparent, parent-in-law, or another dependant. | An employee's parent passes away → 2 paid days; a sibling's death → 1 paid day. | — | [Rozporządzenie MPiPS z 15.05.1996 (usprawiedliwianie nieobecności), §15](https://isap.sejm.gov.pl/) 🔎 |
| **Nursing breaks (`przerwy na karmienie`)** | A nursing mother working **≥6h/day** is owed **2×30-minute** paid breaks (or **1×60-minute**), doubled to **2×45 min** for twins/multiples — counted as working time, not deducted from pay. | A mother working 8h/day nursing twins takes 2×45min paid breaks in addition to her ordinary meal break. | Up to the child's first birthday (customary; verify exact cutoff 🔎). | [Kodeks pracy Art. 187](https://lexlege.pl/kp/art-187/) |
| **Educational leave (`urlop szkoleniowy`) for job-related training** | **6 days** for an external certifying/vocational exam or the *matura* [school-leaving exam]; **21 days** in the final year of study, for diploma-thesis preparation and the diploma exam — where the employer directs/agrees to the training ("raising professional qualifications"). | An employee in their final year of a part-time degree, sponsored by the employer, draws the 21-day block for thesis work. | Only where the employer has agreed to fund/direct the qualification-raising. | [Kodeks pracy Art. 103²](https://lexlege.pl/kp/art-103-2/) |
| **Disabled-worker additional leave — +10 days** | Workers with a **significant or moderate** disability degree get **+10 working days/year** of additional leave, **after 1 year** from the date the disability status was acquired. | A worker certified with a moderate disability degree in March 2025 becomes eligible for the extra 10 days from March 2026. | **Doesn't apply** to a worker already entitled to ≥26 days' leave, or already receiving extra leave under another provision (no stacking). | [Ustawa o rehabilitacji zawodowej Art. 19](https://lexlege.pl/ustawa-o-rehabilitacji-zawodowej-i-spolecznej-oraz-zatrudnianiu-osob-niepelnosprawnych/art-19/) |
| **Blood-donor time off** | An honorary blood donor is owed time off for the day of donation (**and the following day**, if needed for recovery), 🔎 exact duration/paid status to confirm. | — | — | [Ustawa o publicznej służbie krwi; Rozporządzenie MPiPS 1996](https://isap.sejm.gov.pl/) 🔎 |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Working-time records (`ewidencja czasu pracy`)** | Employers must keep **per-worker time records** sufficient to determine pay and benefits — hours worked incl. start/end, **night hours**, **overtime hours**, Sunday/holiday hours, days off and their reason, leave, and absences. Available to the worker **on request**. | — | — | [Kodeks pracy Art. 149 §1](https://lexlege.pl/kp/art-149/) |
| **Exemptions from hour-by-hour recording** | `Zadaniowy` [task-based] employees, managing staff, and workers on an OT/night lump sum (`ryczałt`) are exempt from **detailed** hour-by-hour recording — a daily record still exists for pay purposes. | — | — | [Kodeks pracy Art. 149 §2](https://lexlege.pl/kp/art-149/) |
| **Retention — 10 years** | Records kept **10 years** from the end of the calendar year employment ended. | An employee whose employment ended in 2020 has their time records retained until the end of 2030. | — | [Kodeks pracy Art. 149 (implementing documentation regulation)](https://lexlege.pl/kp/art-149/) |
| **No statutory punch tolerance/rounding** | No Code-mandated grace period or rounding rule — any tolerance is a `regulamin`/policy choice, constrained by the fact that **all** actual worked (and break) time is paid. | — | — | (none statutory) |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/poland.md` (2026-07-18) — the richest source for this
  file; itself sourced from the consolidated Kodeks pracy (`isap.sejm.gov.pl`, WDU19740240141),
  Art. 128–150 (working time & systems), 151–151¹² (overtime, night, Sunday/holiday, on-call),
  132–134 (rest/breaks), 152–175 (leave), 149 (recordkeeping); the Ustawa z 18.01.1951 o dniach
  wolnych od pracy (as amended Dec 2024); the Rozporządzenie RM z 11.09.2025 (2026 minimum wage);
  and the Ustawa z 10.01.2018 o ograniczeniu handlu w niedziele i święta.
- **Primary-source mirror used for links:** [`lexlege.pl/kp/`](https://lexlege.pl/kp/) — a per-article
  mirror of the Kodeks pracy confirmed live this pass (the official `isap.sejm.gov.pl` register is
  behind a captcha wall that blocks automated fetches); the disabled-workers Act and the 2018
  Sunday-trading Act are similarly mirrored at their own `lexlege.pl` slugs (both confirmed live).
- **Prior support memo:** `support-memos/poland.md` (predecessor verdict-first memo, preserved
  verbatim in the appendix below).
- **Sick pay (Art. 92 KP; ZUS benefits law):** ZUS/gov.pl sick-pay guidance (33/14-day employer
  period, 80%/100% rates, 182/270-day ZUS ceiling). 🔎 ZUS statute deep-link not individually
  re-verified this pass.
- **Maternity/paternity/parental leave (2023 WLB reform):** gov.pl/web/rodzina paternity-leave page
  (`urlop ojcowski`); Kodeks pracy Art. 180, 182¹ᵃ–182¹ᵍ, 182³; multi-source cross-check against
  Calamari Poland Leave Laws, RemoFirst Poland maternity/paternity overview, and Polish HR-press
  coverage (livecareer.pl, forsal.pl, inewi.pl) of the 2026 parental-leave figures (41/43 weeks,
  9-week non-transferable quota, 70%/81.5% pay bands).
- **Disabled-worker regime:** Ustawa o rehabilitacji zawodowej i społecznej oraz zatrudnianiu osób
  niepełnosprawnych (27.08.1997), Art. 15 (hours cap), 17 (extra break), 19 (extra leave) — linked
  via the `lexlege.pl` mirror (Art. 15 confirmed live this pass; 17/19 follow the same confirmed
  URL pattern).
- **Occasional leave (`urlop okolicznościowy`):** Rozporządzenie MPiPS z 15.05.1996 w sprawie sposobu
  usprawiedliwiania nieobecności w pracy oraz udzielania pracownikom zwolnień od pracy, §15.
  🔎 No confirmed article-level mirror found this pass; linked to the ISAP register base.
- **Minors (`młodociani`):** Kodeks pracy Dział IX, Art. 190–206 (definition, hours caps, break,
  rest, night ban). 🔎 The combined school+work daily ceiling is flagged for confirmation.
- **Fixed-term contracts:** Kodeks pracy Art. 25¹ (33-month/3-contract rule).
- **⚠ Pending items:** shortened-working-week pilot (Ministry of Family, Labour and Social Policy,
  2024–2025 grant program — not yet statutory) and the leave-tenure credit expansion for
  self-employment/`zlecenie` periods (seed-file flag) — both **not yet law**, do not model as settled.

---

## Appendix (parked) — day.io capability & compliance-support analysis

Parked 2026-07-21. Former verdict-first memo content, kept intact.

# Poland — T&A compliance support

**Verdict: 🟠 Partial — a mixed fit.** Poland is a **statutory-premium** country (the Kodeks pracy prices
overtime at +50%/+100% and night at +20%), so unlike Germany/UK/NL the engine must *emit* premiums from
statute — and here it does well **on the daily axis**: our per-day surplus model + configurable rate rows by
day-type + day/night split cover the +50%/+100% overtime bands and night hours cleanly. The gaps cluster in
Poland's **cross-run and validation** machinery: the **average-weekly-norm** OT trigger, the **day-off-in-lieu-first**
Sunday/holiday remedy with its time windows, the **150h annual OT counter**, the **Art. 130 §2 Saturday-holiday
norm reduction**, and rest/break *validation*. Read with the scope, verdict key, and **Basis key** in
[`README.md`](./README.md). **Two-basis caution:** the OT premium rides the worker's own wage but the +20%
night premium rides the **statutory minimum wage** — but both the % and the basis are **money/downstream**;
we assess only that we emit the correct *hours + typed band*. No verdict is DB-confirmed this pass (IAM
blocked).

**Legal source:** `worldwide-calculations/poland.md` (2026-07-18). **Capability sources:**
`pay-policy-configuration.md` (+ §15 API map), `data-model/fields.md`.

## Governing sources — who actually sets the rules

The compliance answer is conditional — but Poland is the **unusual case where the operative T&A numbers live
*in* the national statute**, not below it. The Kodeks pracy sets almost every operative number (norm, OT
triggers, premiums, caps, rest, night, breaks, holidays, leave); the everyday levers a specific employer *does*
choose — the working-time **system**, the reference-period length, the 8h night window — live in the
**regulamin pracy** (work regulations). CBA coverage is low (~11.6%), so the collective-agreement layer rarely
moves the numbers. "Do we support Poland?" really means "**which working-time system (regulamin) applies?**"

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| Statute | Kodeks pracy | **Yes — dominant** (unlike SW Europe). 8h/40h norm, daily/weekly OT triggers, +50%/+100%, 150h annual OT cap, 11h/35h rest, night +20%, breaks, Sunday/holiday lieu, 14 holidays, leave. |
| Collective agreement | układ zbiorowy (mostly enterprise) | **Only to improve** — may raise the 150h cap, extend the reference period, set higher premiums / night window. Coverage very low (~11.6%). |
| Work regulations | regulamin pracy | **Yes, operationally** — the everyday document: chooses the working-time system, reference-period length, the 8h night window within 21:00–07:00, schedules, breaks. |
| Individual contract | umowa o pracę | Marginal. |
| Case law | Sąd Najwyższy | Doctrine only — *doba pracownicza* / repeated-start (see #25). |

**Illustrative secondary-source rules**

*⚠ ILLUSTRATIVE — varies by agreement/region/year; not universal; NOT a statement of our support.*

- Reference-period length: basic ≤4 months; extendable to 12 months only via CBA or works-council agreement (Art. 129) — *regulamin pracy / CBA* — ✅
- Working-time system: *równoważny* (daily norm to 12/16/24h), *ruch ciągły* (avg ≤43h/wk), *zadaniowy*, weekend, *przerywany* (Art. 135–139) — *regulamin pracy* — ✅
- 8h night window fixed by the employer inside 21:00–07:00 (Art. 151⁷) — *regulamin pracy* — ✅
- Annual OT cap raised above 150h (professional drivers 260h) — *CBA / regulamin / contract* — ✅
- Shift allowance (*dodatek zmianowy*) beyond the statutory +20% night premium — *CBA / regulamin* — 🔎 (non-statutory, varies)

## Rule-by-rule (Basis codes migrated inline into the Evidence / note cell)

| # | Poland requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Daily norm — 8h/day, avg 40h/week (Art. 129).** The statutory working-time norm is 8 hours a day and an average 40-hour, 5-day week; the first overtime trigger fires on every hour worked beyond the 8h daily norm | OT onset = surplus over planned (per day) | 🟡 Configurable | [API][UI] | The per-day surplus model maps directly to the **daily-norm** OT trigger — a genuine fit |
| 2 | **Second OT trigger — the average weekly norm.** Overtime also fires when hours exceed the *average* 40h/week measured across the whole settlement period (*okres rozliczeniowy*, default ≤4 months, extendable to 12), so a single busy week can stay OT-free if a later quiet week pulls the average back down | **Weekly OT trigger** (now ✅) covers the basic weekly case; no multi-week *averaging* window | 🟠 Partial | [PO][ABS] | The plain weekly trigger (per PO, 2026-07-18) covers a **non-averaged** week; **averaging over the ≤4-mo reference period** remains a Gap `[ABS]` |
| 3 | **48h weekly cap including overtime (Art. 131).** A hard ceiling: hours worked plus overtime must average no more than 48h/week over the settlement period — individual weeks may exceed 48h only if the average holds. The engine should flag a breach, not silently cap hours | No working-time-limit validation; no rolling average | ❌ Gap | [ABS] | **Pure rolling average** (no single-period cap bundled to split off) — **period-averaging**, same cross-run mechanic as the average-weekly-norm (#2) and annualisation (build M); we compute pay, not limit enforcement |
| 4 | **Overtime +50% on an ordinary day (Art. 151¹).** Overtime worked on a normal weekday earns a statutory +50% premium on top of normal pay, figured on the worker's own personal-grade wage | Rate row (`phases[]`) by `daysMask`, % per row | 🟡 Configurable | [API] | Day-type rate row ✅ `[API]`; the % is money — we emit the OT-hours + typed band |
| 5 | **Overtime +100% — night, Sunday, holiday, or day-in-lieu.** Overtime worked at night, on a Sunday, on a public holiday, or on a day granted off in exchange for Sunday/holiday work earns the higher +100% premium instead of the +50% | Rate rows by `daysMask` (Sunday, Holidays) + day/night split (`type`) | 🟡 Configurable | [API] | Sunday/Holiday day-groups + night split emit the +100% band; **exchange-day** context is a Gap (needs the lieu linkage, #9) |
| 6 | **+100% for exceeding the average weekly norm (Art. 151¹ §2).** Hours over the *average* weekly norm (the #2 trigger) also earn +100%, worked out at the close of the settlement period — but hours already paid +100% for a reason above (night, Sunday, holiday) are not counted twice | — (no weekly accumulation) | ❌ Gap | [ABS] | Depends on #2; the weekly-average excess band can't be computed |
| 7 | **150h annual overtime cap per worker (Art. 151).** Each worker may do at most 150 overtime hours per calendar year for the employer's "special needs" — a running YTD counter; a CBA or work-regulation can raise it (professional drivers 260h). Separate from, and additional to, the 48h weekly average | Overall **period cap** on OT (`hoursBankLimits[]` / extra-hours limits, e.g. per month) | 🟠 Partial | [API][ABS] | Per-period cap ✅ `[API]`; **per-worker YTD annual counter = Gap** — needs `SourceHistoricalState` `[DES]` (future) |
| 8 | **Time off in lieu of the overtime premium (Art. 151²).** The employer may give rest instead of paying the premium — 1 hour off per overtime hour at the *worker's* written request, or 1.5 hours off per overtime hour on the *employer's* initiative; either way the cash premium is then not due | Banked hours (comp-time-in-lieu) via `hoursBank*` + `phases[].extraHours` split | 🟠 Partial / 🔎 | [API] | Bank ✅ `[API]`; **non-unit 1.5:1 accrual ratio unconfirmed** — verify |
| 9 | **Sunday/holiday work — a day off comes first, cash only if not (Art. 151¹¹).** The primary remedy for working a Sunday or holiday is another day off (for a Sunday, within the 6 days before or after it; for a holiday, anywhere in the settlement period); the +100% premium is owed *only* when no such day off can be granted | Sunday/Holiday premium rows; banked rest | 🟠 Partial | [API][ABS] | Premium **emission** ✅ `[API]` and a rest bank exists; the **day-off-in-lieu-first ordering + the ±6-day/period window linkage = Gap** `[ABS]` |
| 10 | **At least one Sunday off every 4 weeks (Art. 151¹²).** Even workers allowed to work Sundays must get one full Sunday free within every rolling 4-week window — a cross-week counter, not a per-day rule (the weekend-only working-time system is the sole exception) | — | ❌ Gap | [ABS] | Cross-run consecutive-Sunday counter absent (cf. `workingDaysInARow` is a different axis) |
| 11 | **Night hours — +20% of the *minimum* wage (Art. 151⁸).** The employer fixes an 8-hour night window inside 21:00–07:00, every hour worked in it earns +20%, and unusually that premium is figured on the statutory minimum wage rather than the worker's own — so it is the same for junior and senior staff and shifts month to month | `nightShift {%, start, end, applyEntirePeriod}` | ✅ / 🟡 | [API][UI] | Night-hour **emission** ✅ `[API]`; window configurable; the % **and its minimum-wage basis are money/downstream** |
| 12 | **"Night worker" status + hazardous-work 8h cap (Art. 151⁷).** A worker counts as a *pracujący w nocy* if their schedule includes ≥3h of night work each 24h, or ≥¼ of their period hours fall in the night window; such a worker doing dangerous or heavy work is capped at 8h/day with no extension | — | ❌ Gap | [ABS] | No night-worker status classifier or hazard cap |
| 13 | **Daily rest — 11 consecutive hours (Art. 132).** Every worker is owed at least 11 unbroken hours of rest in each 24-hour period; a shorter gap between shifts should raise a flag | `crossShiftsInterval {interval=660min=11h, phases[]}` | 🟠 Partial / 🔎 | [API] | 11h field exists `[API]`; validation behaviour = 🔎 |
| 14 | **Weekly rest — 35 consecutive hours (Art. 133).** Each week owes at least 35 unbroken hours of rest (the 11h daily rest included), normally spanning Sunday; a breach should raise a flag | — (single daily interval only) | ❌ Gap | [ABS] | No weekly-rest accumulation window |
| 15 | **Tiered paid breaks (Art. 134).** A 15-minute break once the day reaches 6h worked, a second once it passes 9h, a third past 16h — all counted (and paid) as working time, and keyed to *actual* hours worked, so overtime counts toward the tiers | Break config (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | [DES] | Configurable `[DES]`; the **actual-hours-keyed tiering + validation** unconfirmed |
| 16 | **14 public holidays (Christmas Eve added 2025).** Poland has 14 statutory non-working holidays; 5 move each year with Easter, so the calendar must be computed per year rather than hard-coded (the old count of 13 is now wrong) | Holiday calendar (`SourceHoliday`) + Holiday bit in `daysMask` | ✅ | [FLD][API] | Calendar reference data; movable feasts are calendar content |
| 17 | **Saturday-holiday norm reduction (Art. 130 §2).** Every holiday that falls on a day other than Sunday cuts the period's working-time norm by 8h; when it lands on a Saturday (already a non-working day) the worker is owed an extra day off inside the same settlement period — a holiday on a Sunday cuts nothing | — | ❌ Gap | [ABS] | No per-holiday norm-reduction mechanic; the period norm is not holiday-adjusted |
| 18 | **Alternative working-time systems (Art. 135–150).** The Code lets a work-regulation redistribute hours — *równoważny* (equivalent: days stretched to 12, 16, or 24h, balanced by shorter ones), *ruch ciągły* (continuous operation), *zadaniowy* (task-based, no hour-by-hour recording), weekend-only, and more — each changing the daily cap that overtime is measured against | Planned hours come from the roster; OT = surplus above **planned** | 🟡 Configurable | [API][DES] | Variable/extended planned days fit the surplus-above-planned model (e.g. 12h planned → no OT ≤12h); *zadaniowy* (no time-tracking) is out-of-model |
| 19 | **Managerial-staff exemption (Art. 151⁴).** Employees managing the workplace, and heads of separate organizational units, work beyond the norms with no overtime premium; the one carve-back is that unit heads still get their Sunday/holiday overtime pay if not given a day off in exchange | — (crude workaround: assign no OT policy) | ❌ Gap / 🔎 | [ABS] | Exempt flag `SourceUserProfile.exempt` `[DES]` future |
| 20 | **Dyżur — on-call standby (Art. 151⁵).** Time spent on standby outside normal hours is not working time unless the worker is actually called to work; it earns an equal amount of time off (or 60% pay if none can be given) — except standby taken *at home*, which earns nothing beyond any work actually performed | `onCalls {compensation}` (availability + activation) | 🟠 Partial | [API] | `[API]` confirmed; the **at-home exception + equal-time-off rule** is a Gap |
| 21 | **Annual leave — 20 or 26 days (Art. 154).** Paid annual leave is 20 days for under 10 years' total employment and 26 days at 10+ years, with schooling counting toward that tenure (a degree adds 8 years); up to 4 of those days may be taken as same-day "on-demand" leave, carved out of the total rather than added to it | — | ❌ Gap | [ABS] | Cross-run leave-accrual counter + tenure-ladder gating absent |
| 22 | **Working-time records (*ewidencja czasu pracy*, Art. 149).** The employer must keep a per-worker time record detailing hours worked — including night, overtime, and Sunday/holiday hours — plus days off, leave, and absences, available to the worker on request | Engine records every punch; typed events; approved-event locking | ✅ | [FLD] | Records all hours; typed OT/night events exist as buckets |
| 23 | **Work-life-balance leave + minors' limits.** The 2023 reform added tracked absence types — carer's leave (*urlop opiekuńczy*, 5 days/year) and force-majeure leave (2 days or 16h/year) — alongside the stricter working-time limits that apply to under-18 workers | `SourceRequest.*` absence handling | 🟠 Partial | [DES][FLD] | Generic absence handling; specific Polish semantics not modeled |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for
> gaps — **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and
> cleanly-configurable (🟡) rules are omitted (they need no mitigation) — including the **daily-axis premium**
> rows we emit well: daily-norm OT (#1), the +50%/+100% bands (#4–5), night emission (#11), the holiday
> calendar (#16), variable/extended schedules (#18), and time recording (#22).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped) · 🟡 Medium (moderately common, or a usable mitigation, or moderate build) ·
> 🟢 Low (narrow population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Polish market* a rule bites. **⚠ Customer-relative** — shifts with
>   the customer's workforce: **weekend/Sunday-working retail & hospitality → #9–10 lieu-scheduling** bite
>   hardest; **high-OT manufacturing → #7 annual counter** and **#2–3 averaging** climb; **managerial-heavy →
>   #19 exemption** matters.
> - **Build-effort** = my estimate, **grounded in the capability sources** (Existing/`[API]` ≈ config/small
>   **S**; a cross-run YTD counter, a regime attribute, or a rolling/period average / band-logic on existing
>   primitives ≈ **M**; net-new subsystem ≈ **L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (PL market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#9 Day-off-in-lieu-FIRST (Sunday/holiday)** | **Partial** — premium rows emit +100% and BH banks rest, but the "rest first, cash only if no lieu given" ordering + the Sunday ±6-day / in-period window linkage is applied manually | **High** — any Sunday/holiday-working sector (retail, hospitality, manufacturing) | **M** — lieu-scheduling window + ordering on existing bank/premium primitives | 🟠 **High** |
| **#10 ≥1-Sunday-in-4 counter** | **Weak** — no cross-run consecutive-Sunday counter; manual rota monitoring only | **Med-High** — Sunday-working populations | **M** — cross-run Sunday counter (`workingDaysInARow` is a different axis) | 🟠 **High** |
| **#7 150h annual OT counter** | **Weak** — per-period OT cap (`hoursBankLimits[]`) ≠ a per-worker YTD counter; manual YTD tracking only | **High** — all OT workers; bites high-OT ones | **M** — `SourceHistoricalState` YTD counter (`[DES]`) | 🟠 **High** |
| **#2 Average-weekly-norm OT (averaging leg)** | **Partial** — the plain weekly OT trigger is now ✅ (a non-averaged week); averaging over the ≤4-mo reference period is manual, and pay stays correct on the daily/weekly axis | **High** as a legal obligation (non-corrupting); bites averaging-system workers | **M** — period-averaging over the reference window (same primitive as #3/#6) | 🟡 **Medium** |
| **#3 48h weekly-average cap validation** | **Partial** — manual monitoring; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **M** — pure rolling/period average (shares #2's primitive; no single-period cap to split off) | 🟡 **Medium** |
| **#6 +100% over the average weekly norm** | **Weak** — depends on the averaging window (#2); the weekly-average-excess band can't be computed today | **Med** — averaging-system workers with weekly-average excess | **M** — banding on top of the period-averaging primitive (#2) | 🟡 **Medium** |
| **#17 Art. 130 §2 Saturday-holiday norm reduction** | **Weak/None** — the period norm isn't holiday-adjusted; the extra day off is granted manually | **Med** — periods containing a non-Sunday (e.g. Saturday) holiday | **M** — per-holiday norm-reduction on the period-norm primitive | 🟡 **Medium** |
| **#12 Night-worker status + hazard cap** | **None** — no night-worker classifier (≥3h/24h or ≥¼ period) or hazard 8h/day cap | **Med** — night-working populations | **M** — status attribute + a cap flag | 🟡 **Medium** |
| **#15 Tiered paid breaks** | **Config** — configure breaks on the schedule; the actual-hours-keyed tiering (≥6h→15min; >9h→+15; >16h→+15) + validation is the open piece | **High** (all workers), legal obligation, non-corrupting | **S-M** — band logic on actual hours + validation | 🟡 **Medium** (⚠ tiering/validation unconfirmed) |
| **#21 Annual-leave ladder (20/26 + on-demand)** | **Partial** — leave handled as absences/requests; the 20/26-day tenure ladder + on-demand 4-day + education-counts gating needs a leave module or manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **M** — accrual counter + tenure-ladder gating | 🟡 **Medium** |
| **#8 Non-unit TOIL ratio (1.5:1)** | **Strong** — BH already gives comp-time-in-lieu; only the 1.5:1 employer-initiative accrual needs confirming (1:1 employee-request is the plain case) | **Med** — a common TOIL election | **S** (verify/param) | 🟢 **Low** |
| **#13 Daily 11h rest validation** | **Partial** — the 11h `crossShiftsInterval` field exists; whether it *validates* or only classifies is 🔎 | **High** as a legal obligation (non-corrupting) | **S-M** — threshold validation on the existing field | 🟢 **Low** |
| **#14 Weekly 35h rest validation** | **None** — no weekly-rest accumulation window (the 11h daily interval is a different axis) | **High** as a legal obligation (non-corrupting) | **S-M** — weekly-rest window + flag | 🟢 **Low** |
| **#19 Managerial-staff exemption (Art. 151⁴)** | **Strong** — exclude from OT calculation entirely (assign no OT policy) | **Low** — managerial staff only | **S** — exempt flag (`SourceUserProfile.exempt` `[DES]`); exclude-from-calc, not full regime-routing | 🟢 **Low** |
| **#20 Dyżur (on-call standby)** | **Partial** — `onCalls {compensation}` covers availability + activation; the at-home exception + equal-time-off rule is applied manually | **Med** — on-call populations | **M** — equal-time-off linkage + at-home exception param | 🟢 **Low** |
| **#23 Minors / WLB leave** | **Partial** — generic `SourceRequest` absence handling; the specific Polish semantics (carer 5d, force-majeure 2d, minors) aren't modeled | **Low** — narrow populations | **S-M** — absence/limit profiles | 🟢 **Low** |

### Severity roll-up
- **🔴 Critical (0):** none — the daily-axis +50%/+100% premiums emit cleanly and the basic weekly OT trigger is now ✅.
- **🟠 High (3):** day-off-in-lieu-first Sunday/holiday windows (#9), ≥1-Sunday-in-4 counter (#10), 150h annual OT counter (#7).
- **🟡 Medium (7):** average-weekly-norm OT averaging (#2), 48h-avg cap validation (#3), +100%-over-average-norm band (#6), Art. 130 §2 Saturday-holiday norm reduction (#17), night-worker status + hazard cap (#12), tiered breaks (#15), leave ladder (#21).
- **🟢 Low (6):** non-unit TOIL 1.5:1 (#8), daily 11h rest validation (#13), weekly 35h rest validation (#14), managerial exemption (#19), dyżur on-call (#20), minors/WLB leave (#23).

## The big gaps (all `[ABS]`)
1. **Average-weekly-norm OT + 48h cap validation** (#2, #3, #6) — Polish OT *averages* over the reference period; the plain **weekly OT trigger is now ✅** (per PO) but multi-week **averaging** + limit-validation remain gaps.
2. **Day off in lieu ordering + windows** (#9) and the **≥1-Sunday-in-4 counter** (#10) — Sunday/holiday compliance is rest-first, not cash-first.
3. **150h annual OT counter** (#7) — per-worker YTD counter, not a per-period cap.
4. **Art. 130 §2 Saturday-holiday norm reduction** (#17) — the period norm must drop 8h per non-Sunday holiday.
5. **Night-worker status + hazard cap** (#12), **weekly 35h rest** (#14), **leave ladder** (#21), **managerial exemption** (#19).

## Where Poland scores well (worth saying)
- **Daily-axis OT premiums** (#1, #4, #5): the per-day surplus model + `phases[]` rate rows by day-type + day/night split emit the +50%/+100% bands cleanly `[API]` — Poland's statutory premiums fit our premium-computation strength.
- **Night-hour emission** (#11), **holiday calendar** (#16), **variable/extended schedules** (#18 — *równoważny* fits surplus-above-planned), **comp-time-in-lieu bank** (#8), **record-all-hours + typed OT/night buckets** (#22) — all present `[API]`/`[FLD]`.

## 🔎 Verify before telling the customer
- **Non-unit TOIL ratio** (#8): can the bank express the 1.5:1 employer-initiative accrual, or only 1:1?
- **`crossShiftsInterval`** (#13): does it *validate* the 11h rest or only classify/reshape? Weekly 35h rest is absent regardless (#14).
- Whether **tiered breaks** (#15) are validated against **actual** hours, or only configured.
- Any **weekly/period accumulation** OT in the live product beyond the per-cycle bank (version drift vs the 2024 `[API]` sample).

## Bottom line for the customer
Poland is a **mixed fit**. Because it is a statutory-premium country and our engine's core strength is
**computing configurable premiums per day/hour type**, we emit its **daily-axis** overtime (+50%/+100%),
**night hours**, holiday premiums, and **variable/extended schedules** well today (`[API]`/`[FLD]`-grounded).
But Poland's **cross-run and validation** machinery — the **average-weekly-norm** OT (the plain weekly OT
trigger is now ✅ per PO, but multi-week **averaging** over the reference period is not), **day-off-in-lieu-first**
Sunday/holiday remedy with its windows, the **150h annual counter**, the **Art. 130 §2 Saturday-holiday norm
reduction**, night-worker status, weekly-rest validation, and the leave ladder — is **not shipping today.**
Honest status: **partial; good on daily-axis premiums, weak on the weekly/annual counters, lieu-scheduling,
and limit-validation.**
