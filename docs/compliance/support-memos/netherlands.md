# Netherlands — T&A requirements

> **What this is.** The ground-truth reference for the Netherlands' time-&-attendance legal
> requirements, grouped by topic — detailed enough to **build a day.io pay policy from**. It aims
> to be **exhaustive** and **atomic**: **one legal proposition per row**, each row self-contained (no
> "see §X" as the only content), with exact values, a worked example wherever a number is involved,
> variants, and a `Basis` that **links to the primary source** so any row can be checked against the
> law directly.
>
> **Scope: time & day-events only** — money (%, €, tax, gross-to-net, holiday allowance) is out of
> scope (premiums are named for context in `Values` but the deliverable is the typed hour/day event).
> **Dutch-term convention:** every non-English term is glossed in English in brackets on first use,
> e.g. *ploegentoeslag* [shift allowance].
>
> **The one structural fact to hold onto:** Dutch statute — chiefly the **Arbeidstijdenwet** [ATW,
> Working Hours Act] and its decree the **Arbeidstijdenbesluit** [ATB, Working Hours Decree] —
> fixes working-time *limits* (shift/week peaks, averaging windows, rest, night-work caps, breaks,
> recording) but sets **no pay uplift whatsoever** — no statutory overtime, night, weekend, or
> public-holiday premium, and no hours bank. Every premium, the ADV/ATV hours bank, and shift
> allowances (*ploegentoeslag* / ORT) come from the **CAO** [collectieve arbeidsovereenkomst,
> sector/company collective agreement] or the individual contract — a private instrument, not a
> single citable statute, so most `Basis` cells below read "CAO/contract" rather than a section
> number. This is the same statute-prices-nothing posture as Germany and the UK. So many rows below
> point to a CAO, not a statute — that genuinely is the law for those matters.
>
> **Legal sources & links:** Arbeidstijdenwet [ATW] and Arbeidstijdenbesluit [ATB]
> (wetten.overheid.nl), Burgerlijk Wetboek Boek 7 [BW7, Civil Code employment title], Wet
> minimumloon en minimumvakantiebijslag [WML], Wet arbeidsmarkt in balans [WAB], Wet arbeid en zorg
> [WAZO], Wet flexibel werken [Wfw], Wet op de ondernemingsraden [WOR], CJEU case law, and — for the
> CAO layer, which has no single register — a sector CAO directory. 🔎 marks a figure or link not
> independently confirmed live this pass.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statute sets limits, not pay** | ATW/ATB govern max hours, averaging, rest, night-work caps, breaks, time-recording — **no OT/night/weekend/holiday premium, no OT onset**. Those are 100% CAO/contract. | A silent contract with no CAO owes only the **ordinary** hourly rate for extra hours, however many are worked (subject only to the min-wage-average floor, §3b). | Most workers are CAO-covered (sector or company-level); the rest rely on the individual contract. | [ATW](https://wetten.overheid.nl/BWBR0007671); [ATB](https://wetten.overheid.nl/BWBR0007687) |
| **CAO = one pay policy per arrangement** | Each CAO sets its own contract hours, OT trigger/band, ADV/ATV rules, and shift allowances (*ploegentoeslag* [shift allowance] / ORT [*onregelmatigheidstoeslag*, irregular-hours allowance]). Model each as a **separate** policy. | *Bouw & Infra* CAO: OT first 3h @125%, further @150%; 20 vacation + 10 rest days 🔎. *Metalektro*: ADV ≈104 roster hrs/yr (~13 days ≈5.12%) 🔎. *Horeca (KHN)*: OT +25%; Sunday +50%; holiday +50% or time off; evening (after 22:00) +25%; night +40% 🔎. *VVT* (nursing/home care): ORT night ~47–49%; evening 20:00–22:00 22%; Sunday & holidays ~60% 🔎. | Sector-wide vs single-employer CAO; a CAO may also **relax** ATW limits within statutory floors (shorter daily rest, longer consecutive shifts). | [CAO directory](https://www.fnv.nl/cao-sector) 🔎 (per arrangement — no single register) |
| **Works-council co-determination (medezeggenschap)** | Where an **OR** [*ondernemingsraad*, works council] exists, it holds an **instemmingsrecht** [consent right] over any company-wide working-hours/roster **regeling** [regulation] affecting one or more groups of employees. | Introducing a new shift roster or changing standard start/end times for a department needs OR consent; changing one individual's hours does not. | Only where an OR exists; a unilateral-amendment clause + compelling business interest can override, subject to judicial replacement-consent if the OR refuses. | [WOR art. 27(1)(b)](https://wetten.overheid.nl/BWBR0002747) |
| **Self-employed (zzp'ers) largely out of scope** | The ATW applies to work **under an employer's authority** — employees, interns, temp/agency and posted workers. Self-employed contractors are excluded except narrow safety provisions. | A freelance zzp'er's hours are not ATW-limited. | — | [ATW](https://wetten.overheid.nl/BWBR0007671) (scope) |
| **High-earner exemption** | An employee **aged 18+ earning ≥3× the statutory minimum wage** (≈€84k/yr 🔎, computed from the live minimum hourly wage) is exempt from the ATW working-/rest-time chapters **and** the time-recording duty. **Night-work and dangerous/risky-work limits still bind.** | A senior specialist earning €90k/yr can be rostered outside the 12h/60h/averaging limits, but their night-shift hours still count toward the 10h/36-per-16wk caps (§5). | The recording carve-out is argued to conflict with CJEU *CCOO* (§11) — treat daily recording as effectively expected for everyone regardless. | [ATB art. 2.1:1(1)(a)](https://wetten.overheid.nl/BWBR0007687) |
| **Young workers 16–17** | **≤9h/shift · ≤45h/week**, averaging **≤40h/week over 4 weeks**; **≥12h** rest between shifts; **no work 23:00–06:00**; **no night shifts, no on-call, no overtime**; break **≥30min** (splittable 2×15) once a shift exceeds 4.5h. | A 17-year-old apprentice can't be rostered a 10h shift nor past 23:00, even where the adult CAO allows both. | A separate, non-waivable rule profile — overrides the adult limits entirely, not just the values. | [ATW](https://wetten.overheid.nl/BWBR0007671) (youth provisions) |
| **Children ≤15** | Generally **may not work** under an employment relationship; a stricter regime again than 16–17-year-olds. | — | Narrow permitted categories (e.g. light work, entertainment) with separate rules. | [ATW](https://wetten.overheid.nl/BWBR0007671) (youth provisions) |
| **Part-time regime — OT baseline = contractual hours** | Overtime for part-timers starts above their **contract** hours, not a full-time weekly line; CAO/contract sets the exact daily/weekly trigger. | 24h/week contract worker who works 30h has 6 additional (over-contract) hours from the 25th hour. | The equal-treatment principle (no less favourable treatment for part-timers) is a general Dutch labour-law norm, not a distinct T&A counter. | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Flexible-working request (Wfw)** | After **26 weeks** of employment, an employee may request a change to **working hours, schedule, or location**. Request in writing **≥2 months** before the desired start; employer must respond **≥1 month** before, in writing — **silence = granted**. Hours/schedule requests may be refused only for **weighty business reasons**; location requests face a **lower** refusal bar. | An employee requests moving from 40h/5 days to 32h/4 days; if the employer doesn't respond within the window, the new pattern is deemed approved. | Firms <10 employees may set their own comparable procedure instead of following Wfw's exact timelines. | [Wet flexibel werken](https://wetten.overheid.nl/BWBR0011173) |
| **Fixed-term chain rule (ketenregeling)** | A **4th consecutive** fixed-term contract, or fixed-term service **exceeding 36 months (3 years)** total, automatically converts to a **permanent** contract. A gap **>6 months** between contracts resets the chain. | Three 1-year fixed-term contracts back-to-back → the employer must either end the relationship or the next contract is permanent by operation of law. | CAO may adjust the max-contracts-before-conversion (e.g. to 6) for specific functions (seasonal work). | [BW art. 7:668a](https://wetten.overheid.nl/BWBR0005290) |
| **⚠ Pending reform — reset-gap extension (not yet law)** | A 2027 reform proposal would extend the ketenregeling reset gap from 6 months to 5 years. **Not yet law — do not model as settled.** | — | — | (draft proposal, no BWBR yet) 🔎 |
| **On-call / zero-hours contracts (oproepovereenkomst)** | Applies where **<15h/week** is agreed and either the work times aren't fixed or the scope isn't unambiguously fixed. Governed by WAB: **≥4 calendar days'** advance call notice (floor **24h** by CAO); **minimum 3h pay per call-out** under 3h worked; **fixed-hours offer** after 12 months at the trailing 12-month average (values detailed in §9). | A retail worker on a 0-hour contract called in for a 2h shift with no fixed schedule is paid for at least 3h. | Students, minors, and state-pension-age (AOW) workers may keep on-call contracts under relaxed conditions even after the pending reform (below) takes effect. | [WAB](https://wetten.overheid.nl/BWBR0042307); [BW art. 7:628a](https://wetten.overheid.nl/BWBR0005290) |
| **Probationary period (proeftijd)** | **No probation** on contracts ≤6 months. **≤1 month** max for fixed-term contracts >6 months and <2 years. **≤2 months** max for permanent contracts or fixed-term ≥2 years. Must be in writing and identical for both parties, or the clause is void ("iron probationary period" — courts enforce strictly, no cure). | A 9-month fixed-term contract may carry at most a 1-month probation clause; a 2-month clause on it is entirely invalid (not capped, void). | — | [BW art. 7:652](https://wetten.overheid.nl/BWBR0005290) |
| **⚠ Pending reform — Wet meer zekerheid flexwerkers (36.746)** | Adopted by the **Tweede Kamer** [lower house of parliament] **12 May 2026** and the **Eerste Kamer** [Senate/upper house] **7 Jul 2026**. Abolishes zero-hours contracts for most employers, replacing them with **bandwidth contracts** (agreed min–max, max spread **30%** i.e. max ≤130% of the min). Extends the ketenregeling reset gap from 6 months to **3 years** for temp/flex chains. **Timeline: temp-worker equal-conditions from 31 Dec 2026; bandwidth contracts + stricter chain rules earliest 1 Jan 2028.** **Not yet fully in force — do not model the bandwidth/chain changes as settled.** | A bandwidth contract with a 20h/week floor may set its ceiling **no higher than 26h/week** (130% × 20h); once the reform is in force (earliest 1 Jan 2028), a 0-hour contract offered today could not simply continue unchanged. | Students, school pupils, and AOW-age workers may retain on-call contracts under conditions. | [Eerste Kamer wetsvoorstel 36746](https://www.eerstekamer.nl/) 🔎 (bill not yet promulgated with a BWBR) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **What counts as working time** | Time worked **under the employer's authority**. On-site standby (*aanwezigheidsdienst* [on-premises availability]) counts **in full**; reachable-from-home standby (*consignatie* [on-call, reachable]) counts only the minutes of an actual call-out response (see §8). | An on-premises standby night counts toward the daily/weekly ATW caps; a reachable-from-home night counts only the call-out minutes actually worked. | CAO may set a reduced pay rate for standby without changing the ATW hours count. | [ATW art. 1:1](https://wetten.overheid.nl/BWBR0007671) |
| **Commute excluded; business travel included** | Ordinary **home–work commute is not working time**. Travel **for business purposes** (client visits, no fixed/habitual workplace) **is** working time — including the outbound/return leg when the worker starts and ends the day from home to a first/last client. | A field engineer with no fixed office who drives from home directly to the first customer, and from the last customer home, has both legs counted as working time (*Tyco* line of case law). | A worker with a fixed office excludes ordinary commute even on a day starting with a client visit en route. | [CJEU C-266/14 (*Tyco*)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62014CJ0266) 🔎; [ATW art. 1:1](https://wetten.overheid.nl/BWBR0007671) |
| **Changing / waiting time — CAO-driven** | No general statutory rule; some CAOs count mandatory changing time (*omkleedtijd*) or login/system-startup time as working time; case law treats **unproductive waiting time** (unable to use it freely) as working time even if brief. | A pharma-plant CAO counts changing into required protective gear as paid working time; a call-centre worker required to be logged in and system-ready at shift start has that lead time counted. | CAO-specific; absent a CAO clause this is a case-by-case working-time question. | [CAO](https://www.fnv.nl/cao-sector) 🔎; case law (Hoge Raad; Teleperformance-type disputes) 🔎 |
| **Cross-midnight & the night window** | A shift crossing midnight is handled once for worked-hours attribution; the **night-hour count** (00:00–06:00, §5) is tallied against the calendar window regardless of which "shift day" the hours are attributed to. | A 22:00–06:00 shift: worked hours attribute to the shift-start day; night hours (00:00–06:00) are tagged from the calendar window. | — | [ATW art. 1:7](https://wetten.overheid.nl/BWBR0007671) |

## 3. Overtime (overwerk)

*The Netherlands has no statutory overtime premium — both onset and rate are policy-defined (CAO/contract). The ATW caps working-time volume; it never prices the extra hours.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory OT onset** | Onset is wholly CAO/contract-defined — a daily threshold, a weekly threshold, or a hybrid. There is no statutory fallback value. | A CAO defines OT as "hours beyond 40/week"; a 38h-contract worker doing 44h has 6 OT hours per that CAO's rule, not per any statutory default. | Common patterns: over-contract-hours (daily) or over-40h (weekly). | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Part-time onset = contractual hours** | For part-timers, OT starts above their own **contract** hours, not a full-time weekly line. | 24h/week contract worker doing 30h has 6 additional hours from the 25th hour. | — | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Overtime is factual first, banded second** | The engine's role is to emit **neutral over-contract hours**; the CAO then maps them to a premium band (e.g. absorbed at 1.0×, or 1.25×/1.5×/2.0×). Absent CAO terms, default is **1.0× (no premium)**. | 38h contract, 44h worked, CAO says "38→40h absorbed, 40h+ at 125%": 2h at 1.0×, 4h at 1.25×. | — | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory OT premium** | No legal uplift on overtime anywhere in Dutch law. Where CAOs provide one, ranges are **~25%–100%** depending on time-of-day/weekday/holiday, sometimes expressed as 125–150% of the ordinary rate. | *Bouw & Infra*: first 3h @125%, further @150% 🔎. *Horeca (KHN)*: OT +25% 🔎. | Cross-CAO Sunday/holiday surcharges span roughly ~50–200% 🔎 — always CAO, never statutory. | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Minimum-wage-average floor** | The only statutory pay constraint on extra hours: **average pay across the pay period must not fall below the statutory minimum wage** (see §11 for the 2026 rate). | A worker paid a low base plus no OT premium must still average ≥ the minimum hourly wage across the period once all hours are counted. | — | [WML](https://wetten.overheid.nl/BWBR0002638) |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-specific annual hours cap** | The ATW caps **working-time volume** (12h/shift, 60h/week peaks; 55h/4wk and 48h/16wk averages — see §4), not "overtime hours" as a separate ceiling. | — | The volume ceilings apply to all worked hours, OT or not; see §4 for the exact figures. | [ATW](https://wetten.overheid.nl/BWBR0007671) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-determining averaging** | The ATW's two reference-period averages (55h/4 weeks, 48h/16 weeks — §4) validate the **working-time limit**, not OT pay. OT is not netted at period close by statute. | A peak week of 55h is a limit question (does the 4-week average hold?), not a question of how many hours get an OT premium. | A CAO may set its own annualised-hours or averaging scheme for OT purposes specifically — that is CAO design, not a statutory mechanism. | [ATW art. 5:8](https://wetten.overheid.nl/BWBR0007671) (see §4); [CAO](https://www.fnv.nl/cao-sector) 🔎 |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **CAO overlays stack per the CAO's own rule — no statutory default** | Night (ORT), weekend, and holiday premiums are each **CAO-defined bands**; whether they compose additively on one hour (e.g. a night hour on a Sunday) or the CAO applies only the highest band (anti-pyramiding) is set entirely by that CAO — there is no national default either way. | A *VVT* CAO's ORT table may pay night (~47–49%) and treat Sunday hours under a separate ~60% band; whether a night-Sunday hour gets both or the higher only is a CAO-specific stacking rule. | — | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Never infer a premium from calendar facts** | Night/weekend/holiday status is a **factual overlay** only (tag the hours); a premium attaches **only if the applicable CAO defines one** for that window — default is **no premium**. | An evening shift with no CAO evening clause carries the base rate only, even though the hours are correctly tagged "evening." | — | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Max shift — 12h** | **≤12 hours** per shift (*dienst*), an absolute peak ceiling. | A 13h shift breaches the ATW regardless of any averaging headroom. | Night-shift variants extend to 11h/12h under narrow conditions (§5). | [ATW art. 5:7](https://wetten.overheid.nl/BWBR0007671) 🔎 |
| **Max week — 60h (peak)** | **≤60 hours** per week, an absolute peak — not sustainable week-on-week, governed by the averaging windows below. | A single 60h week is lawful only if the 4-week and 16-week averages (below) still hold. | — | [ATW art. 5:7](https://wetten.overheid.nl/BWBR0007671) 🔎 |
| **Averaging — ≤55h/week over 4 weeks** | Average working time must stay **≤55h/week** across any rolling **4-week** window. | A 60h peak week is legal only if three lighter weeks in the same 4-week window pull the average to ≤55h. | Both averaging windows (this + next row) apply **simultaneously**. | [ATW art. 5:8](https://wetten.overheid.nl/BWBR0007671) |
| **Averaging — ≤48h/week over 16 weeks** | Average working time must also stay **≤48h/week** across any rolling **16-week** window. | Several peak weeks early in a 16-week window must be offset by lighter weeks later for the average to hold. | A regular night-worker's equivalent average is **stricter (≤40h/week over 16 weeks)** — see §5. | [ATW art. 5:8](https://wetten.overheid.nl/BWBR0007671) |
| **Daily rest — ≥11h between shifts** | **≥11 consecutive hours** rest per 24h, **reducible to 8h once per any 7-day period** where operationally necessary or CAO-permitted. | Shift ends 22:00 → next start no earlier than 09:00, except once per week where an 8h gap is used instead. | CAO may formalise the 8h-once/week relaxation for specific rosters. | [ATW Ch. 5](https://wetten.overheid.nl/BWBR0007671) |
| **Weekly rest — ≥36h/7 days OR ≥72h/14 days** | **≥36 consecutive hours** off in each 7-day period, **or ≥72 hours** across 14 days split into blocks of **≥32 hours** each. | A worker without a clean 36h weekly break must instead get 72h over the fortnight in ≥32h chunks. | — | [ATW Ch. 5](https://wetten.overheid.nl/BWBR0007671) |
| **Breaks by shift length** | Shift **>5.5h worked → ≥30min** break (splittable **2×15min**); shift **>10h → ≥45min** (splittable). CAO may reduce the >5.5h break to a floor of **15min**. | An 8h shift needs ≥30min (or 2×15min); a 12h shift needs ≥45min. Breaks are **unpaid by default** unless the CAO says otherwise. | CAO may reduce/restructure within the floors. | [ATW art. 5:4](https://wetten.overheid.nl/BWBR0007671) |
| **Young workers (16–17) — tighter limits** | **≤9h/shift · ≤45h/week**, averaging **≤40h/week over 4 weeks**; **≥12h** rest; break **≥30min** (splittable 2×15) past 4.5h worked; **no night work** at all. | A 17-year-old cannot be rostered the adult 12h peak shift nor averaged the adult way. | Non-waivable — a separate rule profile, not just tighter numbers. | [ATW](https://wetten.overheid.nl/BWBR0007671) (youth provisions) |
| **High-earner exemption — limits suppressed** | A qualifying high earner (§1) is exempt from **all** the above working-time/rest limits **except night-work and dangerous-work limits**, which still bind in full. | A ≥3×-min-wage employee may be rostered outside the 12h/60h/averaging ceilings, but their night-shift caps (§5) still apply. | — | [ATB art. 2.1:1(1)(a)](https://wetten.overheid.nl/BWBR0007687) |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night-shift definition** | A **night shift** = any shift with **>1 hour worked between 00:00 and 06:00**. Hours in that window are tagged `NIGHT_HOURS` regardless of premium status. | A 22:00–06:00 shift has 6h in the night window → classified as a night shift. A 20:00–00:30 shift has only 30min in-window → not a night shift by this test. | — | [ATW art. 1:7](https://wetten.overheid.nl/BWBR0007671) |
| **Max night shift — 10h (extendable)** | **≤10 hours** for a standard night shift; **≤11h** in a defined weekend window (Fri 18:00–Mon 08:00, **≤2×/week**); **≤12h** in limited cases, capped at **5× per 2 weeks and 22× per year**. | A hospital rostering a 12h night shift may do so at most 5 times in any 2-week span and 22 times across the year. | — | [ATB](https://wetten.overheid.nl/BWBR0007687) (night-work provisions) |
| **Night shifts ending after 02:00 — 36 per 16 weeks** | **≤36** night shifts ending after 02:00 in any rolling **16-week** window (standard); an alternative arrangement allows **≤140 per 52 weeks** (or 38h/2 weeks). | A worker regularly finishing at 03:00 can do so at most 36 times in any 16-week span under the standard scheme. | CAO may elect the 52-week alternative scheme instead. | [ATB](https://wetten.overheid.nl/BWBR0007687) (night-work provisions) |
| **Regular-night-worker averaging — ≤40h/16wk** | A worker doing **≥16 night shifts in any 16 weeks** counts as a regular night worker, and their average working time must then stay **≤40h/week** over that 16-week window — stricter than the general 48h/16wk average (§4). | A night-heavy healthcare/logistics worker averaging 44h/week across a 16-week window with ≥16 night shifts in it breaches this stricter cap even though the general 48h/16wk average holds. | — | [ATW art. 5:8](https://wetten.overheid.nl/BWBR0007671) |
| **Rest after a night shift — 11h or 14h** | **≥11h** rest if the shift ended by 02:00; **≥14h** if it ended after 02:00. | A night shift ending 01:30 needs ≥11h before the next shift; one ending 03:00 needs ≥14h. | — | [ATB](https://wetten.overheid.nl/BWBR0007687) (night-work provisions) |
| **Rest after ≥3 consecutive night shifts — 46h** | After a run of **≥3 consecutive night shifts**, the worker is owed **≥46 hours** of rest. | Three nights in a row (e.g. Mon–Wed) → the worker cannot be rostered again until the 46h rest has elapsed. | — | [ATB](https://wetten.overheid.nl/BWBR0007687) (night-work provisions) |
| **Max consecutive shifts including a night shift — 7 (8 by CAO)** | A run of consecutive shifts that includes night work may not exceed **7 in a row**, extendable to **8 by CAO**. | An 8-day consecutive roster including nights is lawful only if the applicable CAO permits the 8-shift extension. | — | [ATB](https://wetten.overheid.nl/BWBR0007687) (night-work provisions) |
| **Young workers — night ban** | Workers 16–17 may not work **23:00–06:00** and may not be rostered **any** night shift at all — stricter than the adult 00:00–06:00 test. | A 16-year-old shop worker must finish by 23:00 with no exceptions for occasional night cover. | — | [ATW](https://wetten.overheid.nl/BWBR0007671) (youth provisions) |
| **No statutory night premium** | Any night uplift is **CAO-driven** (the ORT [*onregelmatigheidstoeslag*, irregular-hours allowance] table). Emit `NIGHT_HOURS` as a factual tag; attach a premium band only if the CAO defines one — default **no premium**. | *VVT* CAO: night ORT ~47–49% 🔎; *Horeca (KHN)*: night (after 22:00/00:00) +40% 🔎. | Illustrative ranges: two-shift ~10–15%, three-shift ~15–25%, evening (after ~18:00) ~25%, night up to ~40%+ 🔎 — CAO-specific, no national floor. | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Night limits bind even for high-earner-exempt workers** | The high-earner exemption (§1/§4) does **not** relieve night-work or dangerous-work limits — those counters keep running regardless of exemption status. | A ≥3×-min-wage night worker still has their 10h/night-shift cap and 36-per-16wk counter enforced. | — | [ATB art. 2.1:1(1)(a)](https://wetten.overheid.nl/BWBR0007687) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Public holidays (feestdagen) — the calendar** | **~11 nationally recognised** holidays: Nieuwjaarsdag [New Year's Day, 1 Jan], Goede Vrijdag [Good Friday], Eerste + Tweede Paasdag [Easter Sun/Mon], Koningsdag [King's Day, 27 Apr], Bevrijdingsdag [Liberation Day, 5 May], Hemelvaartsdag [Ascension], Eerste + Tweede Pinksterdag [Whit Sun/Mon], Eerste + Tweede Kerstdag [Christmas, 25–26 Dec]. | 2026 calendar includes 1 Jan, 3 Apr (Good Friday), 5–6 Apr (Easter), 27 Apr, 5 May (Liberation Day, non-lustrum), 14 May (Ascension), 24–25 May (Whitsun), 25–26 Dec. | Regional/municipal holidays are not a general feature (unlike Germany's per-state calendar). The list is statutorily named (for deadline purposes) but the statute confers no paid-day-off right. | [Algemene termijnenwet art. 3](https://wetten.overheid.nl/BWBR0002448) |
| **No statutory right to a paid holiday off** | Whether a public holiday is a paid day off is **entirely CAO/contract**; most CAOs grant it as paid (market standard, not a legal floor). | A silent contract with no CAO may treat a public holiday as an ordinary unpaid-if-not-worked day, though this is rare in practice. | — | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **No statutory worked-holiday premium** | Any uplift or replacement day for working a public holiday is **CAO-only**; many CAOs pay **150–200%** or grant a substitute day off, but nothing is statutory. | *Horeca (KHN)*: holiday +50% or time off 🔎. | Cross-CAO holiday surcharges span roughly ~50–200% 🔎. | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Bevrijdingsdag (5 May) — the lustrum quirk** | An official holiday **every year**, but paid-day-off status is CAO-dependent: many CAOs grant it paid **only once every 5 years** (lustrum years, e.g. 2025, 2030). **2026 is not a lustrum year.** | For most workforces, 5 May 2026 is a normal working day unless the specific CAO grants it paid regardless. | Treat "is 5 May paid this year?" as a CAO-configured flag, not a fixed annual truth. | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Sunday work — permission + ≥13 free Sundays/year** | Sunday work is permitted only where **agreed** (the nature of the work requires it) or **incidentally necessary** with the employee's consent each time. Even where permitted, the employer must ensure **≥13 Sundays free of work per rolling 52 weeks**; a worker performs ≥40 Sunday shifts/52 weeks only with their specific consent. | A retail worker rostered most Sundays must still get at least 13 Sunday-free weeks across the year; rostering a 41st Sunday needs that worker's individual consent. | Deviating from the base rule needs OR (or, absent an OR, affected-employee) agreement where business circumstances require it. | [ATW art. 5:6](https://wetten.overheid.nl/BWBR0007671) |
| **No statutory Sunday premium** | Any Sunday uplift is **CAO/ORT-driven**; ranges commonly run **~50–100%**, sometimes higher, entirely by agreement. | *VVT* CAO: Sunday & holiday ORT ~60% 🔎. *Horeca (KHN)*: Sunday +50% 🔎. | — | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **ADV / ATV — the Dutch hours bank** | *Arbeidsduurverkorting* [working-time reduction] / *arbeidstijdverkorting* [working-time reduction, alt. term] — **entirely CAO/contract, no statutory right**. Surplus hours (working more than the contract's nominal week) accrue and are drawn down as paid days off; accrual rate, cap and drawdown are all CAO parameters. | Contracted 38h but working 40h → **+2 ADV hours accrue weekly**, banked and drawn down as free days — commonly ~6.5 or ~13 days/year depending on CAO 🔎 (*Metalektro* ≈104 roster hrs/yr ≈13 days ≈5.12% 🔎). | ADV (shortens the actual workweek at unchanged salary) vs ATV (keeps the nominal contract, banks the surplus) — CAO chooses the mechanism. | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **Overtime routed to TOIL instead of a premium** | Where the CAO elects it, over-contract hours are compensated as **time off** (added to the ADV/ATV ledger) rather than a cash premium, at a ratio the CAO defines. | 6 OT hours taken as 6h (or more, if the CAO applies the uplift as banked time) added to the ADV balance. | Ratio and eligibility fully CAO-defined. | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |
| **No statutory bank cap or expiry** | Because ADV/ATV is not a statutory scheme, there is no national cap, minimum, or expiry rule — those are entirely CAO-set (commonly annual "use it or partially carry over" clauses). | A CAO might cap the bank at +80h and force year-end drawdown or forfeiture of the excess. | — | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Consignatie [on-call, reachable]** | Available for **emergency** calls **away from the workplace** (worker chooses location); only the minutes actually spent responding to a call count as working time. **No consignatie may be imposed in the 11h before or 14h after a night shift.** | A worker reachable overnight but not called counts zero working hours from the standby itself; a 30-minute call-out counts as 30 minutes worked. | Any standby **allowance** is CAO-driven. | [ATB](https://wetten.overheid.nl/BWBR0007687) (on-call regimes) |
| **Aanwezigheidsdienst [on-premises availability]** | Must **remain at the workplace**, ready to work immediately; permitted only where the work's nature requires it. **≥11h rest (without work) before and after**; **max 52 services per 26 weeks**; average working time **≤48h/week over 26 weeks**. | A hospital doctor's on-premises standby night counts in full toward the daily/weekly ATW caps and the 52-per-26-week ceiling. | — | [ATB](https://wetten.overheid.nl/BWBR0007687) (on-call regimes) |
| **Bereikbaarheidsdienst [reachability duty, healthcare]** | Like *consignatie* but being called is a **normal, expected** part of the role (typically healthcare). Capped at **≤3 per week and ≤32 per 16 weeks**. | A GP-practice worker's reachability duty is capped at 3 shifts/week and 32/16 weeks. | Healthcare-specific regime; other sectors default to *consignatie* or *aanwezigheidsdienst*. | [ATB](https://wetten.overheid.nl/BWBR0007687) (on-call regimes) |
| **A call-out can break daily rest** | Where an actual call-out interrupts the required inter-shift rest, compensatory rest handling applies (the missed rest must be made good). | A call-out at 03:00 during what should have been an 11h rest window triggers a compensatory-rest requirement before the next shift. | — | [ATB](https://wetten.overheid.nl/BWBR0007687) (on-call regimes) |
| **Standby allowance — CAO only** | Any pay for being on standby (as opposed to working when called) is a CAO/contract allowance; count-based (per shift/period), not statutory. | A CAO might pay a flat allowance per *aanwezigheidsdienst* shift regardless of whether a call-out occurs. | — | [CAO/contract](https://www.fnv.nl/cao-sector) 🔎 |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Minimum 3h pay per call-out (WAB)** | An on-call worker (<15h/week, unfixed times/scope) called for **<3 hours** worked must be paid for **3 hours** for that call-out. | Called in for a 1h task → paid for 3h. Called twice in a day for 1h each → 3h owed **per call**, i.e. 6h total. | Applies to on-call contracts and to <15h/week jobs generally with unfixed times. | [BW art. 7:628a](https://wetten.overheid.nl/BWBR0005290) |
| **≥4 days' advance call notice** | The employer must notify the on-call worker of shift times **≥4 calendar days** in advance (in writing/electronically); the worker may refuse a call given with less notice. A CAO may shorten this **but not below 24 hours**. | A shift proposed with 2 days' notice (no CAO override) can be lawfully declined. | Individual contracts cannot reduce the notice period; only a CAO may, down to the 24h floor. | [BW art. 7:628a](https://wetten.overheid.nl/BWBR0005290) |
| **Cancellation/change within the notice window = paid** | If the employer cancels or changes a call within the notice window, the worker **keeps pay** for the originally scheduled hours. | A shift cancelled the day before (inside the 4-day window) is still paid as if worked. | — | [BW art. 7:628a](https://wetten.overheid.nl/BWBR0005290) |
| **Fixed-hours offer after 12 months** | After **12 months** on an on-call contract, the employer must **offer** a fixed-hours contract at **≥ the average hours actually worked** over the trailing 12 months. | An on-call worker averaging 20h/week over the past year must be offered a ≥20h/week fixed contract. | Failure to offer preserves the worker's right to claim the wages as if the offer had been made. | [BW art. 7:628a](https://wetten.overheid.nl/BWBR0005290) |
| **No statutory split-shift or reporting-time premium beyond WAB** | Outside the on-call min-3h/notice rules above, Dutch statute has **no** general show-up pay, split-shift premium, or predictability-pay regime for standard (non-on-call) contracts. | A regularly scheduled worker sent home early has no statutory reporting-pay floor; any such protection is CAO-specific. | CAO may add split-shift or reporting premiums. | (none statutory beyond WAB); [CAO](https://www.fnv.nl/cao-sector) 🔎 |
| **Flexible-working request as a scheduling lever** | An employee may formally request a different hours/schedule/location pattern after 26 weeks (§1), with the deemed-granted default on employer silence. | An employee moves a start time earlier by an hour after their employer fails to respond within the statutory window. | — | [Wfw](https://wetten.overheid.nl/BWBR0011173) |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory annual leave — 4× weekly hours** | The legal minimum = **4 × the agreed weekly working hours** per year. Full-time 40h/week → **20 days = 160h**; part-time pro rata. A **day-one right**, accruing through the year (and during sickness). | A 32h/week part-timer accrues 4×32 = 128h (16 days) per year. | CAOs commonly grant **more** (25 days is a typical market standard 🔎). | [BW art. 7:634](https://wetten.overheid.nl/BWBR0005290) |
| **Two-tier leave expiry** | **Statutory** days (the 4×weekly-hours floor) **expire 6 months** after the end of the accrual year — **unless** (a) the employer failed to actively **warn** the worker to take them, or (b) the worker was reasonably **unable** to take them (chiefly long-term sickness), in which case the clock doesn't run. **Extra-statutory** (*bovenwettelijke*, CAO-granted above the floor) days expire after **5 years** (general civil limitation). Parties may extend the statutory 6-month term (up to 5 years) by agreement. | 2025's statutory days lapse 1 July 2026 **only if** the employer actively warned the worker in time; extra-statutory 2025 days remain until 2030. | A CAO may lengthen the statutory-day carryover window. | [BW art. 7:640a](https://wetten.overheid.nl/BWBR0005290) |
| **Leave keeps accruing during sickness** | Statutory annual leave continues to accrue **during sick leave**, at the same 4×weekly-hours rate. | An employee out sick for 3 months still accrues leave for that quarter as if working. | — | [BW art. 7:635](https://wetten.overheid.nl/BWBR0005290) |
| **Full wages during leave; payout only at termination** | Wages continue in full while on leave (BW 7:639); statutory leave days **cannot be cashed out** while employed — only paid out at termination (BW 7:641). Extra-statutory days may be bought out by agreement. | An employee resigning with 40h of unused statutory leave is paid it out on the final payslip. | — | [BW art. 7:639, 7:641](https://wetten.overheid.nl/BWBR0005290) |
| **Drawdown order — soonest-expiring first** | To minimise forfeiture, statutory days nearing their 6-month expiry should be drawn **before** extra-statutory (5-year) days. | A worker with both 2025 statutory (expiring 1 Jul 2026) and 2023 extra-statutory (expiring 2028) balances draws the 2025 statutory hours first. | Policy choice, but the compliant default given the differing expiries. | [BW art. 7:640a](https://wetten.overheid.nl/BWBR0005290) |
| **Sick pay — up to 104 weeks, ≥70%** | Employer continues wages for up to **104 weeks (2 years)** per illness. **Year 1:** ≥70% of salary, with a **statutory-minimum-wage floor** (i.e. never below min wage). **Year 2 (weeks 53–104):** ≥70%, but the minimum-wage floor **no longer applies** — if 70% is below min wage, only 70% is owed. Many CAOs top up to **100%** in year 1. | A worker on €3,000/month sick for 8 months receives ≥70% (topped to 100% under most CAOs) in year 1; if still sick into year 2, the floor drops to a plain 70%. | CAO-typical top-ups vary; a low earner's 70% may equal or exceed min wage regardless in year 2. | [BW art. 7:629](https://wetten.overheid.nl/BWBR0005290) |
| **Transition to WIA at 104 weeks** | At the end of the 104-week sick-pay period, dismissal protection ends if a **WIA** [Wet werk en inkomen naar arbeidsvermogen, work-and-income-per-capacity act] claim/assessment is in progress; ongoing incapacity moves to **UWV**-administered long-term disability benefit. | A worker still unable to work at week 104 transitions from employer-paid sick leave to a WIA benefit assessment. | — | [WIA](https://wetten.overheid.nl/BWBR0019057) 🔎 |
| **Zwangerschaps-/bevallingsverlof [pregnancy/maternity leave] — 16 weeks** | **6 weeks pregnancy leave** (self-chosen start, 4–6 weeks before the due date) **+ ≥10 weeks maternity leave** after birth = **≥16 weeks total**, at **100%** pay (via **UWV** [*Uitvoeringsinstituut Werknemersverzekeringen*, the state employee-insurance agency], capped). Taking fewer than 6 weeks pregnancy leave (min 4) adds the difference to the post-birth portion. | Choosing a 5-week pregnancy-leave start (instead of 6) adds 1 week to the post-birth maternity leave, for 5+11 = 16 weeks total. | The leave window auto-adjusts to the actual birth date so the 16-week total always holds. | [WAZO](https://wetten.overheid.nl/BWBR0013008) |
| **Geboorteverlof [birth/partner leave] — 1 week** | The partner gets **1 week** of fully paid leave immediately after birth, at the employer's expense. | A partner working 5 days/week takes those 5 working days off in the week following the birth, paid in full by the employer. | — | [WAZO](https://wetten.overheid.nl/BWBR0013008) |
| **Aanvullend geboorteverlof [additional birth leave] — up to 5 weeks** | Up to **5 additional weeks**, paid at **~70%** via UWV, must be taken within **6 months** of the birth. | A partner takes the 1-week geboorteverlof, then a further 3 weeks of the 5-week allowance spread across the following months. | — | [WAZO](https://wetten.overheid.nl/BWBR0013008) |
| **Ouderschapsverlof [parental leave] — 26× weekly hours, 9 weeks paid** | Total entitlement = **26 × the weekly contracted hours** per parent per child, usable until the child turns **8**. Of this, **9 weeks are paid at ~70%** via UWV (capped ~€197.78/day gross, 2026 🔎) — **but only if taken within the child's first year**; taken later, those 9 weeks are also unpaid. The remaining 17 weeks are unpaid unless the CAO tops up. | A 40h/week parent has 26×40 = 1,040h total entitlement; using the 9 paid weeks (9×40=360h) within year one secures the UWV payment; the same hours used after the 1st birthday would be unpaid. | CAOs commonly add partial pay for some of the unpaid weeks. | [WAZO](https://wetten.overheid.nl/BWBR0013008) |
| **Kortdurend zorgverlof [short-term care leave] — up to 2× weekly hours/12mo** | Up to **2 × weekly contracted hours** per 12-month period, paid at **≥70%** by the employer, to care for a sick family member. | A 32h/week worker has up to 64h of short care leave available in a rolling 12-month period. | — | [WAZO](https://wetten.overheid.nl/BWBR0013008) |
| **Langdurend zorgverlof [long-term care leave] — up to 6× weekly hours/12mo** | Up to **6 × weekly contracted hours** per 12-month period for the long-term care of a seriously ill person; **unpaid** unless the CAO provides otherwise. | A 32h/week worker can take up to 192h of unpaid long-term care leave across a year. | — | [WAZO](https://wetten.overheid.nl/BWBR0013008) |
| **Calamiteitenverlof [emergency leave] — short, fully paid** | A short period (hours to a few days) of **fully paid** leave for sudden, unforeseeable personal circumstances (e.g. a death in the family, an urgent medical emergency); duration is "reasonable" for the circumstance, not a fixed number. | An employee takes an afternoon off, fully paid, to deal with a home emergency (burst pipe, sudden family crisis). | Covers short bereavement/urgent-appointment needs; no separate statutory bereavement-day count exists. | [WAZO](https://wetten.overheid.nl/BWBR0013008) |
| **Sick leave / absence as a non-working, non-counting event** | A sick day is an absence type: **not worked time**, does **not** count toward any ATW limit or OT threshold; statutory leave continues accruing (per row above), and sickness can **suspend** the statutory-leave 6-month expiry clock. | A sick week doesn't advance the 4-week or 16-week ATW averaging denominators, nor does it reduce statutory-leave accrual for that week. | — | [BW art. 7:629, 7:635, 7:640a](https://wetten.overheid.nl/BWBR0005290) |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Recording duty** | The employer must keep a **proper record** (*deugdelijke registratie* [reliable record]) of working and rest times, sufficient to verify ATW/ATB compliance. | An engine that records every punch and derives daily/weekly totals satisfies the recording duty. | The high-earner exemption (§1) statutorily excuses recording, but is treated as effectively expected anyway (next row). | [ATW art. 4:3](https://wetten.overheid.nl/BWBR0007671) |
| **CJEU *CCOO* — objective daily recording** | Employers must operate an **objective, reliable, and accessible** system recording each worker's **daily** working time; recording overtime alone is **insufficient**, and retroactive/estimated entries do not qualify. The Dutch Labour Inspectorate applies this strictly. | A system that only logs OT hours (not total daily hours) does not satisfy *CCOO*; every punch must be captured. | Applied even where the high-earner statutory carve-out formally excuses recording. | [CJEU C-55/18 (*CCOO*)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62018CJ0055) |
| **Minimum-wage floor (context, not tolerance)** | The statutory minimum hourly wage (2026: **€14.71/hr from 1 Jan**, rising to **€14.99/hr from 1 Jul**, age 21+; youth rates scale down by age — e.g. 20yo 80% / 18yo 50% / 16yo 34.5%) sets the pay floor average hours must clear (§3b); not a T&A tolerance rule itself. | A 20-year-old's minimum rate from 1 Jul 2026 is 80% × €14.99 ≈ €11.99/hr. | Adjusted every 6 months (1 Jan / 1 Jul). | [WML](https://wetten.overheid.nl/BWBR0002638) |
| **No statutory punch tolerance or rounding rule** | Dutch law sets **no** rounding/grace-period rule for punches. Any tolerance or rounding is a **policy/CAO configuration**, constrained only by the minimum-wage-average floor (rounding must not systematically strip recorded time below that floor). | A company policy might round punches to the nearest 5 minutes; this is a configuration choice, not a legal requirement or prohibition. | — | no rounding statute; constrained by [WML](https://wetten.overheid.nl/BWBR0002638) |
| **Missing time / missing day** | Standard engine semantics: worked **< scheduled** with ≥1 punch → shortfall event; a scheduled day with **zero punches** → missing-day event. Any ADV/ATV deduction for shortfalls is a policy choice. | A worker scheduled 8h who logs only 6h has a 2h shortfall flagged. | — | (engine convention; no statutory rule) |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/netherlands.md` (2026-07-17).
- **ATW / ATB (working time, rest, night, Sunday, on-call, recording):** [wetten.overheid.nl/BWBR0007671](https://wetten.overheid.nl/BWBR0007671)
  (ATW) and [BWBR0007687](https://wetten.overheid.nl/BWBR0007687) (ATB), confirmed live 2026-07-21; omgevingsweb.nl ATW
  art. 5:6 (Sunday work / 13 free Sundays); rijksoverheid.nl "Ben ik verplicht om op zondag te werken?"; hr-kiosk.nl
  Zondagsdienst.
- **BW7 (Burgerlijk Wetboek Boek 7):** [wetten.overheid.nl/BWBR0005290](https://wetten.overheid.nl/BWBR0005290), confirmed live 2026-07-21.
- **WAB / WML / WAZO / Wfw / WOR:** [BWBR0042307](https://wetten.overheid.nl/BWBR0042307) (WAB),
  [BWBR0002638](https://wetten.overheid.nl/BWBR0002638) (WML), [BWBR0013008](https://wetten.overheid.nl/BWBR0013008)
  (WAZO), [BWBR0011173](https://wetten.overheid.nl/BWBR0011173) (Wfw), [BWBR0002747](https://wetten.overheid.nl/BWBR0002747)
  (WOR) — all confirmed live 2026-07-21 via wetten.overheid.nl.
- **High-earner exemption / averaging:** ATB art. 2.1:1; bd-advocaten.nl on ATW reference-period wording.
- **Overtime / CAO illustrative rates:** prior support-memo research (Bouw & Infra, Metalektro, Horeca
  KHN, VVT CAOs) — 🔎 illustrative, verify per engagement; CAOs have no single government register, so
  `Basis` cells point to the [FNV sector CAO directory](https://www.fnv.nl/cao-sector) (confirmed live) rather
  than a specific instrument.
- **Travel/changing time:** [CJEU *Tyco* C-266/14](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62014CJ0266)
  🔎 (CELEX pattern, not individually refetched); rijksoverheid.nl woon-werkverkeer Q&A; nl.indeed.com
  reistijd-werktijd; case-law summaries re: omkleedtijd/wachttijd (Hoge Raad, Teleperformance-type disputes).
- **Minimum wage 2026:** business.gov.nl minimum wage increases July 2026; nlcompass.com minimum wage
  Netherlands 2026; fnv.nl youth sub-minimum-wage factsheet (Jan 2026).
- **Chain rule (ketenregeling) / probation:** dutch-law.com chain rule & trial periods; asanify.com
  probation period Netherlands 2026; BW art. 7:668a, 7:652.
- **On-call / WAB / zero-hours (BW 7:628a):** wetboekplus.nl art. 7:628a; dekempenaer.nl oproepkrachten;
  workxadvocaten.nl WAB update 7.
- **Flexible working (Wfw):** kvk.nl Flexible Working Act in practice; paltheoberman.nl Wet Flexibel Werken.
- **Works council (WOR art. 27):** rendement.nl instemmingsrecht bij wijziging rooster; fundamentvoor.nl.
- **Pending reform (Wet meer zekerheid flexwerkers, 36.746):** eerstekamer.nl wetsvoorstel 36746 🔎 (deep
  bill-page link not confirmed — linked to the Eerste Kamer site base); rijksoverheid.nl "Meer zekerheid
  voor mensen met een flexcontract" (8 Jul 2026); hmp.nl update.
- **Leave (annual/statutory expiry, sick pay, WAZO):** BW art. 7:634, 7:635, 7:639, 7:640a, 7:641,
  7:629; dutch-law.com two-year sick leave rule; ontslaglegal.nl sick pay; rijksoverheid.nl
  zwangerschapsverlof/bevallingsverlof calculator; intropersoneel.nl / werktijden.nl ouderschapsverlof 2026.
  WIA BWBR number (BWBR0019057) 🔎 not independently refetched this pass.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

**Verdict: 🟠 Partial — a strong-pay fit alongside Germany and the UK.** Like both, **Dutch statute (the
Arbeidstijdenwet) prices nothing** — no statutory overtime, night, weekend, or public-holiday premium;
every premium, the ADV/ATV hours bank, and shift allowances (*ploegentoeslag*/ORT) are **CAO-driven**. That
maps cleanly onto our policy-defined, surplus-above-planned model. The gaps are the familiar shape:
Dutch compliance is **working-time-limit *validation*** (the 12h/60h peaks + two averaging windows), **night
limits**, and a **two-tier statutory-leave ledger** — which our pay engine does not enforce or accrue. Read
with the scope, verdict key, and **Basis key** in [`README.md`](./README.md). No verdict is DB-confirmed
this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). Dutch statute prices
> no OT, so this only adds a weekly onset option for **CAO-driven** OT; it doesn't change the verdict — NL's
> gaps are the 12h/60h peaks + two averaging windows, night limits, and the leave ledger, not an OT trigger.

**Legal source:** `worldwide-calculations/netherlands.md` (2026-07-17). **Capability sources:**
`pay-policy-configuration.md` (+ §15 API map), `data-model/fields.md`.

## Governing sources — who actually sets the rules

The compliance answer is conditional: the operative T&A numbers usually live **below** the national
statute, in the **CAO** (sector/company collective agreement) — the *Arbeidstijdenwet* sets limits but
prices no premium — so "do we support the Netherlands?" really means "**which CAO applies?**"

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| EU | WTD 2003/88/EC | No — outer envelope only |
| Statute | *Arbeidstijdenwet* (ATW) + *Arbeidstijdenbesluit* | No — working-time & rest **limits** only; prices no premium |
| CAO (sector/company) | Collective labour agreement | **Yes — the operative layer:** OT onset/threshold/rate, *ploegentoeslag*, ORT, ADV/ATV, Sunday/holiday supplements, and CAO-permitted relaxations of ATW limits |
| Individual contract | Employment contract | Fills gaps, ≥ ATW/CAO minima |
| Case law | CJEU *CCOO*; Dutch leave-expiry information duty | Interpretation only |

**Illustrative secondary-source rules**

⚠ ILLUSTRATIVE — varies by agreement/region/year; not universal; NOT a statement of our support.

- OT first 3h @125%, further @150%; 20 vacation + 10 rest days — *Bouw & Infra 2025–2027* — 🔎
- ADV ≈104 roster hrs/yr (~13 days ≈5.12%) — *Metalektro 2024–2025* — 🔎
- ORT night ~47–49%; evening 20:00–22:00 22%; Sunday & holidays ~60% — *VVT (nursing/home care)* — 🔎
- OT +25%; Sunday +50%; holiday +50% (or time off); evening (after 22:00) +25%; night +40% — *Horeca (KHN)* — 🔎
- Cross-CAO Sunday/holiday surcharges span ~50–200% — *cross-CAO cluster* — 🔎

## Rule-by-rule (Basis = where the verdict comes from)

| # | Netherlands requires (time/day-event only) | Our current capability | Verdict | Evidence / note |
|---|---|---|---|---|
| 1 | **No statutory overtime premium — it's all CAO.** The *Arbeidstijdenwet* (Working Hours Act) caps how many hours may be worked but never prices them, so whether overtime exists, when it starts, and at what rate come entirely from the sector collective agreement (*CAO*) or contract; default is no premium | OT onset = surplus over planned; `phases[]` rates fully configurable; default no premium | ✅ / 🟡 | [API][UI] **Good fit** (as Germany/UK): engine has no statutory OT default anyway |
| 2 | **Over-contract hours typed factually, banded by CAO.** Hours beyond the contracted amount are emitted as neutral overtime hours; the *CAO* then decides the trigger (a daily or weekly threshold) and which premium band, if any, attaches | Per-day surplus over planned; `phases[].limit` chains rates by **daily** OT minutes | 🟠 Partial | [API] Daily-trigger CAOs fit; a **weekly** over-contract threshold has no weekly-accumulation field `[ABS]` |
| 3 | **Max 12h per shift · 60h per week (peak ceilings).** The *Arbeidstijdenwet* sets hard volume caps — no single shift over 12h, no single week over 60h — that the engine should flag as breaches rather than silently trim; these are compliance limits, not pay triggers | No working-time-limit validation | ❌ Gap | [ABS] We compute pay, not ATW limit enforcement |
| 4 | **Two averaging windows, both binding.** On top of the peak caps, average working time must stay ≤55h/week over any rolling 4 weeks AND ≤48h/week over any rolling 16 weeks — two independent running averages that apply at the same time | No rolling-average counters | ❌ Gap | [ABS] Two simultaneous reference-period averages; period-averaging is design-only `[DES]` |
| 5 | **ADV/ATV — the Dutch hours bank.** *Arbeidsduurverkorting* / *arbeidstijdverkorting* are working-time-reduction days: surplus hours (e.g. working 40h on a 38h contract) accrue and are drawn down later as paid days off; entirely *CAO*-based, with accrual rate, cap and drawdown all set by the agreement | Banked hours (`hoursBank*`, cycle, caps, expiry, HIFO) + `phases[].extraHours` split | 🟡 Configurable | Maps to the banked-hours model; accrual rate/cap/drawdown are config `[API]` |
| 6 | **Night-work limits (*nachtdienst*).** A night shift is any shift with more than 1h worked between 00:00 and 06:00; for those workers the law caps the shift at 10h, limits shifts ending after 02:00 to 36 per 16 weeks, and requires extra rest (11h or 14h after a night shift, 46h after a run of 3) — all limits to flag, not pay | `nightShift {%, start, end, applyEntirePeriod}` emits night hours | 🟠 Partial | Night-hour **emission** ✅ `[API]`; **all the night *limits/counters* = Gap** `[ABS]` |
| 7 | **No statutory night premium.** Any night uplift is *CAO*-driven (the *onregelmatigheidstoeslag* / ORT irregular-hours allowance); the engine emits the factual night hours and attaches a premium only if the agreement defines one — default none | `nightShift` % configurable; per-row day/night `type` | ✅ / 🟡 | [API][UI] Emission ✅; % defaults off (CAO supplies it) |
| 8 | **Daily rest ≥11h per 24h.** At least 11 consecutive hours off between workdays, reducible to 8h once in any 7-day period where operations require it; a shortfall should raise a flag | `crossShiftsInterval {interval=660min=11h, phases[]}` | 🟠 Partial / 🔎 | 11h field exists `[API]`; validation behaviour + the "8h once/7d" relaxation = 🔎/Gap |
| 9 | **Weekly rest ≥36h per week (or ≥72h per fortnight).** At least 36 consecutive hours off in each 7-day period, or 72h across 14 days split into blocks of no less than 32h; a shortfall should raise a flag | — (single daily interval only) | ❌ Gap | [ABS] No weekly-rest accumulation window |
| 10 | **Break minimums by shift length.** A shift over 5.5h earns at least a 30-minute break (splittable into 2×15); a shift over 10h at least 45 minutes; breaks are unpaid unless the *CAO* says otherwise | Break config (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | Configured `[DES]`; min-break-by-hours *validation/flagging* unconfirmed |
| 11 | **Statutory annual leave = 4 × weekly hours.** The legal minimum is four times the agreed weekly hours per year — 20 days (160h) for a full-time 40h week, pro-rated for part-timers — accruing across the year and needing a running balance | — | ❌ Gap | [ABS] Cross-run leave-accrual counter absent |
| 12 | **Two-tier leave expiry (the leave trap).** Statutory leave (the 4×weekly-hours floor) lapses just 6 months after the accrual year — but only if the employer gave the required warning and the worker was actually able to take it — whereas extra days granted above the floor (*bovenwettelijk*) expire after 5 years; the ledger must track the two categories separately | — | ❌ Gap | [ABS] Category-split ledger + conditional expiry; not shipping |
| 13 | **Public holidays (*feestdagen*) — nothing is statutory.** There is no legal right to a paid day off on a public holiday and no legal premium for working one; both are *CAO*-driven. Note the *Bevrijdingsdag* (Liberation Day, 5 May) quirk: many CAOs grant it paid only in lustrum years (every 5th), and 2026 is not one | Holiday calendar (`SourceHoliday`) + Holiday bit in `daysMask` | ✅ / 🟡 | Calendar ✅ `[FLD]`; worked-holiday premium row 🟡 `[API]`; paid-off status is CAO config |
| 14 | **CAO shift allowances (*ploegentoeslag* / ORT).** Percentage uplifts on top of base pay for evening, night, weekend or holiday hours — *ploegentoeslag* for rotating-shift systems, *onregelmatigheidstoeslag* (ORT) for irregular hours — applied to the hours falling in each qualifying window; all rates and windows are *CAO*-defined, with no statutory floor | Rate rows by `daysMask` + day/night split; night premium | 🟠 Partial | Windowed % rate rows ✅ `[API]`; **parallel overlay stacking** (an hour that is night+Sunday+holiday at once) = target `[DES]` |
| 15 | **On-call — three distinct regimes.** Dutch law separates *consignatie* (reachable off-site, only call-out response counts as work), *aanwezigheidsdienst* (on-premises availability, with 11h rest buffers and a cap of 52 services per 26 weeks), and *bereikbaarheidsdienst* (reachability duty in healthcare, capped at 3 per week); each carries its own caps and rest rules | `onCalls {compensation}` (availability + activation) | 🟠 Partial | Compensation ✅ `[API]`; the **regime-specific caps** (52/26wk, 11h buffers, 3/wk) = Gap `[ABS]` |
| 16 | **WAB flex-work protections for on-call workers (*oproepkrachten*).** Under the *Wet arbeidsmarkt in balans* an on-call worker must get ≥4 days' notice of a shift (pay is kept if it's cancelled late), at least 3 hours' pay per call-out even when less is worked — the **min-3h rule biting specifically on contracts <15h/wk without fixed working times (and where a CAO has shortened the ≥4-day notice)** — and, after 12 months, an offer of fixed hours at their rolling 12-month average (corrected per 2026-07-18 research) | — | ❌ Gap | [ABS] Min-call-out top-up + advance-notice + rolling-12-mo average all absent |
| 17 | **High-earner exemption from working-time limits.** An employee earning ≥3× the statutory minimum wage (≈€84k/yr) is exempt from the *Arbeidstijdenwet* working-time and rest limits — but NOT from the night-work or dangerous-work limits, which still bind | — | ❌ Gap / 🔎 | [ABS] Per-worker exempt flag `SourceUserProfile.exempt` `[DES]` future; also moot until limit-validation exists |
| 18 | **Young workers (under 18) — stricter, non-waivable limits.** Workers aged 16–17 are capped at 9h per shift and 45h per week, do no night work, and need at least 12h rest between shifts; children ≤15 are stricter again | — | ❌ Gap | [ABS] No minor rule-profile |
| 19 | **Duty to record working time.** The *Arbeidstijdenwet* (art. 4:3) and the EU *CCOO* ruling require an objective, reliable record of each worker's daily working and rest time — recording overtime alone is not enough | Engine records every punch; approved-event locking | ✅ | [FLD] Compliance value-add |
| 20 | **Sick and statutory (*WAZO*) leave as absence types.** Sickness and the statutory *WAZO* leaves (birth, parental, care, emergency, maternity) are tracked as absences that are not worked time and don't count toward any working-time or overtime threshold; statutory annual leave keeps accruing during sickness | `SourceRequest.*` request/absence handling | 🟠 Partial | [DES][FLD] Absence handling exists; specific Dutch leave semantics + leave-accrual-during-sickness not modeled |
| 21 | ⚠ **Wet meer zekerheid flexwerkers — pending reform.** A new law that abolishes zero-hours contracts (*nulurencontracten*) and replaces them with bandwidth contracts (*bandbreedtecontracten*) — an agreed min–max with a maximum 30% spread; **adopted by the Tweede Kamer (lower house) 12 May 2026 and the Eerste Kamer (Senate) 7 Jul 2026, but entry into force is by royal decree and not yet dated (commonly targeted 1 Jan 2028)**, so treat it as not-yet-settled (corrected per 2026-07-18 research) | n/a (pending) | — | [LAW] Tweede Kamer 12 May 2026; Eerste Kamer 7 Jul 2026; entry by royal decree, not yet dated (~1 Jan 2028) — **do not model as settled** |
| 22 | **Regular-night-worker averaging — 40h/16wk.** A worker doing **≥16 night shifts in any 16 weeks** counts as a regular night worker, and their average working time must then stay **≤40h/week over that 16-week window** — stricter than the general 48h/16wk average — a limit to flag, not pay | No rolling-average counters | ❌ Gap | [ABS] Night-worker 40h/16wk average, stricter than the general 48h/16wk (#4); period-averaging is design-only `[DES]`; ATW 5:8 ✅ |
| 23 | **Max consecutive shifts (incl. night) = 7 (8 by CAO).** A run of consecutive shifts that includes night work may not exceed **7 in a row** (extendable to **8 by CAO**); a longer run should raise a flag | No consecutive-shift counter | ❌ Gap | [ABS] Consecutive-shift run counter absent; the 8-max is CAO-configurable; ATW/ATB ✅ |
| 24 | **Sunday scheduling — ≥13 free Sundays/yr.** Work on a Sunday is allowed only where agreed or where the nature of the work requires it, and by default a worker must have **at least 13 free Sundays per year**; a scheduling constraint to flag, not pay | — (no annual free-Sunday counter) | ❌ Gap | [ABS] Sunday work is `daysMask`-identifiable but the ≥13-free-Sundays/yr limit is untallied; ATW 5:6 ✅ |
| 25 | **Rest after a 12h shift = min 12h.** After a shift of 12h the daily-rest floor rises from 11h to **12 consecutive hours** (the 8h-once-per-7-day relaxation still applies); a shortfall should raise a flag | `crossShiftsInterval {interval=660min=11h}` (single fixed interval) | 🟠 Partial / 🔎 | [API][ABS] Base 11h `crossShiftsInterval` field exists `[API]`, but a shift-length-conditional 12h floor after a 12h shift is not expressible `[ABS]` (and whether it *validates* is 🔎, per #8); ATW 5:3 ✅ |
| 26 | **Break splitting into blocks.** The statutory break may be split — the ≥30-min break (shift >5.5h) into **2×15min**, the ≥45-min break (shift >10h) into **3×15min** — on the same shift-length triggers | Break config (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | [DES] Break config exists (mode/paid-unpaid/startAfter); whether it can express the 2×15 / 3×15 split — and *validate* the block minimums — is unconfirmed 🔎; ATW 5:4 ✅ |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — including the now-✅ weekly-OT row **#2**, whose weekly
> over-contract threshold the `[PO]` weekly-OT trigger now closes.
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped) · 🟡 Medium (moderately common, or a usable mitigation, or moderate build;
> legal obligations that don't corrupt pay) · 🟢 Low (narrow population, strong mitigation, or trivial build).
>
> **Dutch note:** statute prices **no premium** (OT/night/weekend/holiday are all CAO-driven), so almost every
> gap is **working-time-limit *validation*** or **leave-ledger** work that **doesn't corrupt pay** — hence the
> skew to 🟡/🟢. The one exception is **#16 WAB** (min-3h call-out is a pay top-up), which is why it lands 🟠 High.
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Dutch market* a rule bites. **⚠ Customer-relative** — shifts with
>   the customer's workforce: **retail/hospitality with *oproepcontracten* → #16 WAB** more acute; **night-heavy
>   healthcare/logistics → #6 night limits** more central; **ploegendienst industrial → #14 overlay stacking**
>   more central. Money is out of scope.
> - **Build-effort** = my estimate, keyed to the memo's **Basis tags** (`[API]`/`[FLD]` field-exists ≈ **S**;
>   `[DES]` design-only ≈ **M**; `[ABS]` absent ≈ **M-L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (NL market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#16 WAB on-call/zero-hours** | **Weak/None** — the min-3h call-out top-up, ≥4-day call notice, and rolling-12-mo fixed-hours average are all absent; only manual per-call top-ups | **High** — *oproepcontracten* are widespread (retail, hospitality, healthcare) | **M** — reporting-pay synthesis (min-3h + advance-notice) + rolling-12-mo average | 🟠 **High** |
| **#3 12h-shift / 60h-week peaks** | **Partial** — expose the peaks as alert thresholds for manual monitoring; **pay stays correct** | **High** as a legal obligation (all ATW workers; non-corrupting) | **S** — single-period threshold flag (cheapest to add) | 🟡 **Medium** |
| **#4 55h/4wk + 48h/16wk averages** | **Partial** — manual monitoring of both reference-period averages; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **M** — two simultaneous period-averaging windows (`[DES]`) | 🟡 **Medium** |
| **#6 Night limits / counters** | **Partial** — night hours emit correctly for pay (`nightShift`); the 10h-max, 36-shift/16wk and 46h-after-3-nights counters need manual monitoring | **Med** — night-work sectors (healthcare, logistics, manufacturing); higher for night-heavy customers | **M** — night-limit counters + windows | 🟡 **Medium** |
| **#10 Break minimums (30/45 min)** | **Config** — configure the breaks on the schedule; min-break-by-hours *validation* is the open piece `[DES]` | **High** (all workers) | **S-M** | 🟡 **Medium** |
| **#9 Weekly rest 36h/72h** | **Weak** — no weekly-rest accumulation window; manual monitoring only; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **M** — weekly-rest accumulation window | 🟡 **Medium** |
| **#11 Statutory-leave accrual (4× weekly hrs)** | **Partial** — leave handled as absences/requests; the accrual counter needs a leave module or manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **M** — accrual counter | 🟡 **Medium** |
| **#12 Two-tier leave expiry (6-mo / 5-yr)** | **Weak** — no category-split ledger; the statutory-6-mo (w/ warning-duty) vs extra-statutory-5-yr expiry tracked manually | **High**, leave-mgmt adjacent | **M** — accrual + conditional-expiry ledger | 🟡 **Medium** |
| **#14 Parallel overlay stacking** | **Partial** — windowed % rate rows cover single overlays (the common case); stacking night+Sat/Sun+holiday on one hour is target `[DES]` | **Med** — *ploegentoeslag*/ORT common, but concurrent overlaps are the edge | **M** — parallel overlay composition | 🟡 **Medium** |
| **#15 On-call regime caps** | **Partial** — `onCalls` compensation works `[API]`; the regime-specific caps (52/26wk, 11h buffers, 3/wk) need counters | **Med** — healthcare / technical standby | **M** — regime caps/counters | 🟡 **Medium** |
| **#22 Night-worker 40h/16wk average** | **Partial** — manual monitoring of the night-worker 16-week average; **pay stays correct** | **Med** — night-work sectors (healthcare, logistics, manufacturing) | **M** — night-worker status + 16wk period-average | 🟡 **Medium** |
| **#23 Consecutive-shift cap (7/8)** | **Weak** — no consecutive-shift counter; manual monitoring; **pay stays correct** | **Med** — shift/roster-driven sectors; higher for night-heavy customers | **S-M** — consecutive-shift run counter | 🟡 **Medium** |
| **#24 ≥13 free Sundays/yr** | **Weak** — no annual free-Sunday counter; manual monitoring; **pay stays correct** | **Med** — Sunday-working sectors (retail, hospitality, healthcare) | **M** — annual free-Sunday counter | 🟡 **Medium** |
| **#26 Break splitting (2×15 / 3×15)** | **Config** — breaks configurable; expressing + validating the 2×15 / 3×15 split is the open piece | **Med-High** — all workers over the shift-length triggers | **S-M** | 🟡 **Medium** |
| **#8 Daily rest 11h validation** | **Partial** — the 11h `crossShiftsInterval` field exists `[API]`; whether it *validates* + the "8h once/7d" relaxation unconfirmed | **Med** (all workers; field partly covers it) | **S-M** | 🟢 **Low** |
| **#20 Sick / WAZO leave semantics** | **Partial** — absence handling exists (`SourceRequest`); Dutch leave semantics + leave-accrual-during-sickness not modeled | **High** but leave-mgmt adjacent | **M** | 🟢 **Low** |
| **#18 Young-worker (<18) limits** | **None** — no minor rule-profile; also moot until base limit-validation exists | **Low** — under-18s are a small share of hours (retail/hospitality) | **M** — a minor limit-profile | 🟢 **Low** |
| **#17 High-earner exemption (≥3× min wage)** | **N/A** — moot until limit-validation exists; exclude the worker manually if needed | **Low** — only ≥3× min-wage earners | **S** — exempt flag (`SourceUserProfile.exempt` `[DES]`) | 🟢 **Low** |
| **#25 12h rest after a 12h shift** | **Partial** — base 11h `crossShiftsInterval` field exists; the conditional 12h-after-12h floor + validation unconfirmed | **Low-Med** — only where 12h shifts are rostered | **S-M** — shift-length-conditional rest floor | 🟢 **Low** |

### Severity roll-up (after weekly-OT support)
- **🔴 Critical (0):** none — Dutch statute prices no premium, so no gap corrupts pay outright, and the weekly-OT trigger now closes the weekly over-contract threshold (#2).
- **🟠 High (1):** WAB on-call/zero-hours (#16).
- **🟡 Medium (13):** 12h/60h peaks (#3), 55h/4wk + 48h/16wk averages (#4), night limits (#6), break minimums (#10), weekly rest (#9), statutory-leave accrual (#11), two-tier leave expiry (#12), parallel overlay stacking (#14), on-call regime caps (#15), night-worker 40h/16wk average (#22), consecutive-shift cap (#23), ≥13 free Sundays/yr (#24), break splitting (#26).
- **🟢 Low (5):** daily 11h-rest validation (#8), sick/WAZO leave semantics (#20), young-worker limits (#18), high-earner exemption (#17), 12h rest after a 12h shift (#25).

## The big gaps (all `[ABS]`)
1. **ATW limit validation** (#3, #4, #6, #8–10) — the 12h/60h peaks, the **two** averaging windows (55h/4wk + 48h/16wk), night limits, weekly rest, break minimums. We don't *flag limit breaches*.
2. **Two-tier statutory-leave ledger** (#11–12) — 4×weekly-hours accrual with the 6-mo/5-yr category split and conditional expiry.
3. **WAB on-call/zero-hours mechanics** (#16) — min-3h call-out, advance-notice, 12-mo fixed-hours average.
4. **Parallel overlay stacking** (#14) and **regime-specific on-call caps** (#15).

## Where the Netherlands scores well (worth saying)
- **OT pay** (#1–2 daily): no statutory premium → our policy-defined onset+rates fit cleanly `[API]`.
- **ADV/ATV as banked hours** (#5), **night/holiday premium emission** (#7, #13), **holiday calendar** (#13), **on-call compensation** (#15 partial), **record-all-hours** (#19), **tolerance** — all present `[API]`/`[FLD]`.

## 🔎 Verify before telling the customer
- **`crossShiftsInterval`** (#8): does it *validate* the 11h rest (and the "8h once/7d" relaxation), or only classify/reshape? Weekly 36h/72h rest is absent regardless (#9).
- Whether **ADV/ATV** (#5) can express the exact CAO accrual rate + drawdown-as-days behaviour, or only a generic bank.
- Whether **min-break-by-hours** (#10) is *validated/flagged* or only configured.
- Any **weekly-accumulation** over-contract logic in the live product (version drift vs the 2024 `[API]` sample).

## Bottom line for the customer
The Netherlands is a **strong-pay fit** with Germany and the UK — no statutory premium, so our per-day
surplus engine, CAO rate rows, night/holiday premium emission, ADV/ATV-as-banked-hours, and holiday
calendar all apply today (`[API]`/`[UI]`/`[FLD]`-grounded). But Dutch compliance is dominated by
**working-time-limit validation** (the 12h/60h peaks and the two averaging windows), **night limits**, a
**two-tier statutory-leave ledger**, and the **WAB flex-work mechanics** — **none of which our pay engine
does today.** Honest status: **partial; good on pay, weak on limit-validation and statutory leave.**
