# Germany — T&A requirements

> **What this is.** The ground-truth reference for Germany's time-&-attendance legal requirements,
> grouped by topic — detailed enough to **build a day.io pay policy from**. It aims to be
> **exhaustive**: every statutory working-time, overtime, rest, night, weekend/holiday, banking,
> on-call, leave and record-keeping rule, with the exact values, worked examples, variants
> (sector/CBA/regional), and the governing statute.
>
> **Scope: time & day-events only** — money (%, €, tax, gross-to-net) is downstream *context* here
> (kept in `Values` so a policy can be configured; the deliverable is the typed hour/day event).
> **German-term convention:** every non-English term is glossed in English in brackets on first use.
>
> **Legal sources:** repo seed `context/worldwide-calculations/germany.md` (2026-04-20) + fresh web
> research (2026-07-21) — ArbZG, BUrlG, EntgFG, §3b EStG, JArbSchG, MuSchG, BEEG, PflegeZG/FPfZG,
> TzBfG, SGB IV/V/IX, state Bildungsurlaubsgesetze, and 2018/2024/2025 Bundesarbeitsgericht case law.
> Sources listed at the foot of the requirements section. 🔎 marks a figure to confirm.
>
> **Governing-source note.** German statute (chiefly the **ArbZG** [Working Time Act]) sets working-
> time *limits* and rest rules but puts **no pay uplift on overtime** — OT onset and every premium
> come from the **Tarifvertrag** [sector/company collective agreement], **Betriebsvereinbarung**
> [works agreement] or the individual contract. The operative premium numbers live *below* the
> statute, per arrangement (see §1).

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statute sets limits, not pay** | ArbZG governs max hours, rest, breaks, Sunday/holiday work — **no OT premium, no OT onset**. Those are 100% Tarifvertrag [collective agreement] / contract. | No CBA + silent contract → only the **ordinary** hourly rate is owed for extra hours. | ~50% of workers are covered by a Tarifvertrag; the rest rely on the individual contract. | ArbZG; BAG 2006/2019 |
| **Tarifvertrag [collective agreement] = one pay policy per arrangement** | Each agreement sets its own weekly hours, premiums, OT onset, leave. Model each as a **separate** policy. Mapping is not 1:1 — many policies can share a jurisdiction. | *IG Metall* [metalworkers] Metall-/Elektro: **35h/week** (West)/38h (East), OT ~25%, 30 leave days. *TVöD* [public sector] Bund: **39h/week**, OT 15–30% by grade, 30 days. *IG BCE* Chemie: ~37.5h 🔎. | Flächentarifvertrag [industry-wide] vs Firmentarifvertrag [single-employer]; often *in Bezug genommen* [incorporated by reference] into contracts. | TVG [Collective Agreements Act] |
| **Betriebsvereinbarung [works agreement] + co-determination** | Where a *Betriebsrat* [works council] exists, it **co-determines** the start/end of daily hours, break timing, temporary short/long-time work, and roster changes — the employer cannot set these unilaterally. | Introducing a Gleitzeit [flextime] scheme or a shift roster needs the works council's agreement. | Only where a works council exists (not automatic in small firms). | BetrVG §87(1) nos. 2, 3 |
| **§7 Öffnungsklauseln [opening clauses]** | A Tarifvertrag may lawfully deviate from ArbZG: extend the daily cap where standby is present, shorten the 11h rest by ≤2h, redistribute breaks, adjust Sunday rest — each with a health-protection offset. | A hospital CBA extends a shift beyond 10h because on-site standby is present, with compensating rest. | Sector-specific; carried by that arrangement's own policy. | ArbZG §7 |
| **Vollzeit [full-time]** | The default regime; weekly hours set by CBA/contract (typically **35–40h**). | — | — | contract/Tarif |
| **Teilzeit [part-time] regime + right to part-time** | OT baseline = the worker's **contractual** hours. Employees also have a **right to reduce** hours (and, via *Brückenteilzeit* [bridge part-time], to return to full-time) in firms >45 employees after 6 months. | 20h/week contract worker who works 25h has 5 additional hours from the 21st hour. | Brückenteilzeit: time-limited 1–5 years, firms >45 staff. | TzBfG §8 (reduction), §9a (Brückenteilzeit) |
| **Werkstudent [working student] — ≤20h/week in term** | Max **20h/week** during *Vorlesungszeit* [lecture period] to keep the Werkstudentenprivileg [social-insurance privilege]. A running weekly-hours counter. | Rostered 22h in a lecture week → breach (SV consequence downstream; the 20h measure is T&A). | Cap lifts in semester breaks; night/weekend hours may be exempt from the 20h count. | SGB (Werkstudentenprivileg) |
| **Minijob / Midijob — money-band regimes** | Classification is a **€/month** band (Minijob **≤ €603/mo**; Midijob **€603.01–2,000/mo**) 🔎 2026, tied to minimum wage × hours. For T&A these workers are **hour-counted like any other**. | A Minijobber at €13.90/h can work ~43h/month before crossing €603. | The €-bands + their SV treatment are downstream payroll, not T&A thresholds. | SGB IV; MiLoG |
| **Kurzfristige Beschäftigung [short-term employment] — ≤3 months or 70 workdays/year** | Year-to-date **day counter**: exemption holds only up to 3 months or 70 worked days/calendar year. | Seasonal worker hits their 71st worked day → SV exemption ends (downstream); the day count is T&A. | — | SGB IV |
| **Leitende Angestellte [senior executives] — exemption** | Sit **outside** the ArbZG limits — caps and rest rules don't apply. 🔎 *Not confirmed in the source research file.* | Assign no OT/limit policy to a qualifying executive. | Strict definition (hire/fire authority etc.); narrow population. | ArbZG §18 |
| **Schwerbehinderte [severely disabled] — regime** | Degree of disability (*Grad der Behinderung*) ≥50 (or ≥30 with equal status). Rights: **may refuse overtime** on request, plus **+5 days** annual leave (see §10). | A severely disabled worker declines a rostered OT shift — lawful, no penalty. | Extra leave pro-rated for part-week patterns. | SGB IX §207 (OT refusal), §208 (leave) |
| **Minors <18 (JArbSchG) — protective regime** | *Jugendliche* [young persons, 15–17]: **8h/day · 40h/week · max 5 days/week**; shift ≤10h; breaks 30min after 4.5h / 60min after 6h; **12h** daily rest; night ban 20:00–06:00. *Kind* [child, <15] generally may not work. (Values recur in §4/§5.) | A 16-year-old apprentice can't be rostered past 20:00 nor beyond 8h/day even where an adult CBA allows 10h. | Night ban eases by sector (hospitality to 22:00; bakeries from 05:00 for 16+); *Berufsschule* [vocational-school] time counts toward hours. | JArbSchG |
| **⚠ Pending ArbZG reform — single 48h weekly cap** | A proposed reform would drop the daily 8/10h ceiling, keeping only a **48h weekly** cap. **Not yet law — do not model as settled.** | — | — | (draft, Merz government) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **What counts as working time** | *Arbeitsbereitschaft* [alert readiness at work] and *Bereitschaftsdienst* [on-site standby] **count in full** as working time for ArbZG limits; *Rufbereitschaft* [reachability standby from home] is **rest time**, except hours actually worked when called (see §8). | An on-site standby night counts toward the daily/weekly caps even if largely inactive; home reachability counts only the minutes of an actual call-out. | Pay for standby may be a reduced Tarif rate. | ArbZG §2; ECJ SIMAP/Jaeger |
| **Reisezeit [travel time]** | Business travel time spent **in the employer's interest** is generally compensable working time — including travel beyond regular hours, when the employer specifies the means/route. | An employee sent abroad: the necessary outbound/return travel is compensable like working time (most cost-effective option if choice is left to the employee). | Contract/CBA may cap comp to regular-hours travel or set a partial rate. | BAG 17.10.2018 (5 AZR 553/17) |
| **Umkleidezeit [changing time]** | Time putting on/taking off **mandatory** protective/company clothing **at the workplace** counts as working time. | A worker required to change into hygiene gear on-site: that time is paid working time. | If clothing may be donned at home, usually not counted. | BAG case law (§611a BGB) 🔎 |

## 3. Overtime

*Germany has no statutory overtime premium — the single most important distinction. Both onset and rate are policy-defined (Tarif/contract).*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory OT onset** | Onset is wholly policy-defined. *Überstunden* [overtime] = hours beyond **contractual** working time; *Mehrarbeit* [additional work] = hours beyond the **statutory** 8h/day cap. | A 40h-contract worker doing 45h has 5 Überstunden; whether they carry a premium is purely CBA/contract. | Common onsets: "beyond contracted weekly time" or "premium on the first ~5h/week over base". | ArbZG (limits only); Tarif/contract |
| **Teilzeit [part-time] onset = contractual hours** | OT for part-timers starts above their **contract** hours, not the full-time line. | 20h contract, works 25h → additional hours from the 21st. | — | TzBfG |
| **Part-timer OT-pay equality (BAG 2024/2025)** | Part-timers get the **same** OT pay as full-timers **from the first OT hour**. CBA clauses requiring part-timers to first exceed *full-time* hours = unlawful discrimination. | A CBA paying a part-timer OT premium only above 39h/week is now unlawful; the premium is owed from the 21st hour on a 20h contract. | Landmark BAG 5 Dec 2024, confirmed 26 Nov 2025. | BAG 8 AZR 370/20; TzBfG §4 |
| **Overtime must be ordered/approved** | OT is only owed (and only counts) if **ordered, approved, or at least tolerated** by the employer and necessary — unilateral self-extension generally isn't compensable OT. | An employee who stays 2 extra hours without instruction generally can't claim OT pay for them. | CBA may require prior written authorisation. | BAG case law |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory OT premium** | No legal uplift. Typical CBA *Mehrarbeitszuschlag* [overtime premium]: **~15–40%** (industry-dependent); some agreements express total pay as 125–150% of the ordinary rate. Silent contract → ordinary rate only. | IG Metall ~25% for the first hours over base; TVöD 15–30% by *Entgeltgruppe* [pay grade]. | Many CBAs allow **Freizeitausgleich** [compensatory time off] instead of a premium (see §7). | Tarif/contract; BAG 2006/2019 |
| **Severely disabled — OT refusal** | A severely disabled worker may **decline overtime** on request (no premium question arises if none is worked). | — | — | SGB IX §207 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory annual OT-hours cap** | Germany caps *working time* (§4), not OT hours specifically — no per-worker annual OT ceiling. | — | The regime counters (Werkstudent 20h/week, Kurzfristige 70-day) are in §1; the working-time ceilings are in §4. | ArbZG |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-determining averaging** | Germany's reference-period averaging (6 months / 24 weeks) validates the **daily working-time cap**, not OT pay — placed in §4. OT is not netted at period close. | — | A CBA may extend the averaging window to **12 months** (§7). | ArbZG §3, §7 (see §4) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Zuschläge [premiums] stack additively; typed buckets** | Night, Sunday and holiday premiums are tracked as **separate hour buckets by type** and stack **additively** on the base — a night hour on a Sunday carries **both**. | A night hour on a Sunday: base + Nachtzuschlag + Sonntagszuschlag, each totalled separately. | Separate typed totals let payroll apply the **§3b EStG** tax-free caps (money math downstream). | §3b EStG; Tarif |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily cap — 8h, extendable to 10h** | **≤8h/day**, extendable to **≤10h/day** only if the average stays ≤8h/day across the reference period (next row). | A 10h Tuesday is legal only if offset by ≤8h-average days across the window. | CBA may extend beyond 10h where standby is present (§7). | ArbZG §3 |
| **Reference-period averaging — 8h avg over 6 months / 24 weeks** | The 8h/day average must hold over a rolling **6 calendar months or 24 weeks**; a >8h day breaches only if not offset in-window (confirmable at window close). | Five 10h days (50h) in a peak week are fine if lighter weeks pull the 24-week average to ≤8h/day. | A **CBA may extend the window to 12 months** (§7). Working-time-limit averaging — distinct from OT-determining averaging. | ArbZG §3, §7 |
| **Weekly ceiling — 48h / 60h peak** | *Werktag* [working day] = **Mon–Sat**, so the implied weekly ceiling is **48h** (8×6), peaking to **60h** (10×6) while the 6-month average holds. | A 60h week is lawful only within the averaging window. | — | ArbZG §3 |
| **Daily rest — 11h between shifts** | **≥11h** uninterrupted rest between two workdays; reducible to **10h** in named sectors (hospitals, care, transport, hospitality, agriculture) if the missing hour is made up within **4 weeks**. | Shift ends 22:00 → next start no earlier than 09:00. | §7 CBA may shorten by ≤2h with offset. | ArbZG §5 |
| **Breaks by hours worked** | **≥30 min** for 6–9h worked; **≥45 min** for >9h; splittable into blocks of **≥15 min**; no stretch >6h without a break. | An 8h shift needs ≥30min; a 10h shift needs ≥45min. Breaks are unpaid and excluded from working time. | CBA may redistribute breaks (§7). | ArbZG §4 |
| **Screen-work breaks (Bildschirmarbeit)** | Display-screen work must be **regularly interrupted** by breaks or a change of activity to reduce strain (no fixed statutory minutes; a common works-agreement figure is ~5min/hour). | An all-day data-entry role must build in regular screen breaks / task changes. | Amount set by works agreement / risk assessment. | ArbStättV Anhang 6; ArbSchG |
| **Minors — tighter limits** | *Jugendliche* [15–17]: **8h/day · 40h/week · max 5 days/week**, shift ≤10h; break **30min after 4.5h / 60min after 6h**; **12h** daily rest. No 6-month averaging — the 8h cap is firm. | A 17-year-old may not average 10h days the way an adult can. | *Kind* [<15] generally barred; *Berufsschule* time counts toward hours. | JArbSchG §§8, 11, 13 |
| **Severely disabled — OT exemption on request** | May be **released from work beyond 8h/day** on request (in addition to the OT-refusal right in §3b). | — | — | SGB IX §207 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **ArbZG night window & night-worker status** | ArbZG night time = **23:00–06:00** (bakeries 22:00–05:00). *Nachtarbeitnehmer* [night worker] = works >2h in that window in rotating shifts, or ≥48 nights/year. Daily cap **8h** (to 10h only if the average holds over **1 calendar month**), plus a right to regular occupational health checks. | A rotating-shift worker regularly on 23:00–07:00 is a night worker → tighter 8h cap (1-month averaging) + health-check entitlement. | 🔎 Confirm whether >2h-regularly auto-confers status vs. manual assignment. | ArbZG §2, §6 |
| **Night worker — transfer & compensation rights** | A night worker has a right to **transfer to a day post** if health is endangered or they must care for a child <12 / a dependent, and to an **appropriate number of paid days off or a pay premium** for night hours (statute mandates "adequate" compensation; the % is CBA-set). | A night worker with a young child may request a day-shift transfer where a suitable post exists. | Compensation form (time vs money) is CBA-defined. | ArbZG §6(4)–(5) |
| **Nachtzuschlag [night premium]** | **No statutory %.** Typical CBA: **20–25%**. For *tax* (§3b EStG), night = **20:00–06:00**, tax-free up to **25%**, rising to **40%** for hours 00:00–04:00 if the shift began before midnight (base capped at €50/h). | Note **two windows**: ArbZG protection 23:00–06:00 vs tax-free premium 20:00–06:00 — configure the premium window to the CBA/tax basis. | Rate is CBA-set; the tax-free cap is context. | ArbZG §6 (window); §3b EStG (tax) |
| **Minors — night ban** | *Jugendliche* [15–17] may not work **20:00–06:00**. | A 16-year-old shop worker must finish by 20:00. | Hospitality to 22:00; bakeries/confectioners from 05:00 (16+); agriculture from 05:00; multi-shift industry to 23:00 for 16+ 🔎. | JArbSchG §14 |
| **Schichtzulage [shift allowance]** | Variable premium for shift-pattern work, CBA-set (no statutory rate). | — | Common in manufacturing / continuous operations. | Tarif |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Feiertage [public holidays] — per-Bundesland calendar** | **9 nationwide** holidays; states add their own for a total of **10 (Berlin, fewest) to 13 (Bavaria, most)**. The calendar is a **state-level** input. | *Mariä Himmelfahrt* [Assumption, 15 Aug] only in Bayern + Saarland; *Reformationstag* [Reformation Day, 31 Oct] in the 9 northern/eastern (Protestant) states; *Heilige Drei Könige* [Epiphany, 6 Jan], *Fronleichnam* [Corpus Christi], *Allerheiligen* [All Saints, 1 Nov] in the Catholic south. | Same date can be a normal workday in one state and a paid holiday in another; *Internationaler Frauentag* [Women's Day] is a holiday in Berlin & Mecklenburg-Vorpommern. | Länder Feiertagsgesetze |
| **Feiertag paid if not worked** | A holiday on a *Werktag* → full salary as if worked (no deduction), via the *Lohnausfallprinzip* [lost-pay principle]. | Holiday on a Tuesday the worker would have worked → paid as a normal day. | — | EntgFG §2 |
| **Sunday/holiday work — prohibited by default** | Work on Sundays/holidays is **banned** (§9). **§10 permits** ~15 named categories: emergency/rescue/fire services; public safety/order, courts, administration, defence; hospitals & care; hospitality & lodging & private households; culture (music, theatre, film, radio/TV, exhibitions, events); sport & leisure; agriculture & animal husbandry; services on the day (repairs, non-postponable); plus regulated production/energy/bakery/finance subsections. | A hospital may roster Sundays under §10 no. 3; a factory generally may not without a §10 subsection or exemption. | Sector-specific; some need a supervisory-authority permit. | ArbZG §9, §10 |
| **≥15 free Sundays/year + replacement rest day** | Even permitted workers must get **≥15 work-free Sundays/year** (a running annual counter), and an *Ersatzruhetag* [replacement rest day] — within **2 weeks** for Sunday work, **8 weeks** for holiday work. | A hospital worker rostered many Sundays must still keep ≥15 Sundays/year free and get a replacement rest day within 2 weeks of each worked Sunday. | — | ArbZG §11 |
| **Sonntagszuschlag [Sunday premium]** | **No statutory %.** §3b EStG tax-free up to **50%** for work Sun 00:00–24:00. | A Sunday hour: base + Sunday premium (CBA-set), totalled separately. | Rate is CBA/contract. | §3b EStG (tax); Tarif |
| **Feiertagszuschlag [holiday premium]** | **No statutory %.** §3b EStG tax-free up to **125%**; up to **150%** for 24 Dec from 14:00, 25–26 Dec, 1 May, and 31 Dec from 14:00. | A 1 May hour: base + up to 150% tax-free premium. | Night+Sunday and night+holiday premiums stack additively within their §3b caps. | §3b EStG (tax); Tarif |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Arbeitszeitkonto [working-time account] — short-term** | Per-worker account: worked time **credited**, time off / compensation **debited**. Typical ceilings **+40 to +80h** (some to +200h); minus balance typically **−20 to −40h**. Positive balance is **paid out on termination**. | Bank 45h in a busy period, later draw 5 days off; any positive balance at exit is paid in the final salary. | Underpins *Gleitzeit* [flextime] (core hours + free margins) and annualised hours; scope/limits set by works agreement or CBA. | ArbZG §16 (recording); Betriebsvereinbarung/Tarif |
| **Langzeitkonto / Wertguthaben [long-term account]** | A long-horizon account (*Wertguthabenvereinbarung* [value-credit agreement], written) that banks pay/time to fund a future **long paid absence** — care, parental leave, sabbatical, phased/early retirement. Employer-managed, interest-bearing, **insolvency-protected**. | An employee banks value over years, then draws a 6-month funded sabbatical. | Distinct from the OT hours-bank; SV contributions deferred until payout. | SGB IV §7b ff. |
| **Freizeitausgleich [compensatory time off]** | Many CBAs let OT be settled as **time off** instead of a premium, commonly at the same ratio the premium would imply. | 10 OT hours taken as 10h off (or more, where the CBA applies the uplift as time). | Ratio is CBA-defined. | Tarif/contract |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Bereitschaftsdienst [on-site standby]** | Standby **at an employer-set location**: counts **in full as working time** for ArbZG limits; pay may be a reduced CBA rate. | A hospital doctor's on-site standby night counts toward daily/weekly caps. | CBA sets the pay rate. | ArbZG §2; ECJ Jaeger |
| **Rufbereitschaft [on-call from home]** | Worker must be **reachable** and able to start, but chooses location: counts as **rest time**, except hours actually worked when called out. | Reachable overnight → only the 40 minutes of an actual call-out count as working time. | CBA sets any standby allowance. | ArbZG §2; ECJ Matzak line |
| **Arbeitsbereitschaft [alert readiness]** | "Watchful presence" at work (e.g. quiet reception cover): counts as working time; can extend the daily cap via §7. | — | CBA-dependent. | ArbZG §7 |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/predictability pay** | Germany has **no** statutory show-up / reporting-time / predictability-pay regime (unlike US CA/NYC). Roster protections come via the Sunday replacement-rest rule (§6) and works-council co-determination. | — | Roster/shift-change rules set by works agreement (BetrVG §87). | (none statutory); BetrVG |
| **Kurzarbeit [short-time work]** | A temporary, authorised **reduction of working hours** (down to 0) in an economic downturn; the state pays *Kurzarbeitergeld* [short-time allowance] on the lost hours — **60%** of lost net (**67%** with ≥1 child). Up to **24 months** (extension in force through 31 Dec 2026). | A plant cuts to 50% hours: employees work half, are released from the rest, and receive Kurzarbeitergeld for the lost half. | Needs works-council/employee consent + Agentur für Arbeit approval; reshapes the *planned* hours the engine expects. | SGB III §§95 ff. |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Urlaub [statutory annual leave]** | Floor **24 Werktage** [working days, Mon–Sat] at a 6-day week = **20 days** (4 weeks) at a 5-day week. Accrues **1/12 per month**; full entitlement after a **6-month** *Wartezeit* [waiting period]. Carryover only into the first **3 months** of the next year, for urgent reasons. | 5-day-week worker after 6 months has full 20-day entitlement; before that ~1.67 days/month. Joined 1 Oct → *Teilurlaub* [partial-year leave] = 3/12 × 20 = 5 days for the year. | CBA typically **25–30 days**. **Warn-or-no-forfeit**: unused leave does *not* expire if the employer failed to actively warn the worker to take it (BAG/CJEU). | BUrlG §3, §4, §5, §7; CJEU C-684/16 |
| **Schwerbehinderte [severely disabled] — additional leave** | **+5 working days/year** (at a 5-day week; pro-rated for other patterns) on top of the ordinary entitlement. | A severely disabled 5-day-week worker with 30 CBA days gets **35**. | Pro-rated for part-week; minimum — CBA may give more. | SGB IX §208 |
| **Bildungsurlaub [educational leave]** | Paid leave for approved training: typically **5 days/year (10 over 2 years)**. **No entitlement in Bayern or Sachsen** (no state law). Usually after **6 months** service (Saarland 1 yr; Rheinland-Pfalz 2 yr). | A Berlin employee takes 5 paid days for an approved language/skills course. | State-varying (each Bundesland has its own *Bildungsurlaubsgesetz*; two states none). | State Bildungsurlaubs-/Bildungszeitgesetze |
| **Entgeltfortzahlung [continued pay in sickness]** | Full salary up to **6 weeks (42 calendar days) per *Krankheitsfall* [illness case]** (needs ≥4 weeks' employment + unfit-for-work certificate). A **new** illness resets the clock; the **same** illness recurring within 6 months continues it. Then *Krankengeld* [statutory sick pay, ~70%] (downstream). | Sick 3 weeks with flu, recovers, then breaks an arm → the arm is a **new** case with a fresh 42-day entitlement. | *Lohnausfallprinzip*: worker gets what they *would have earned* incl. would-have-worked night/Sunday premiums, but **not** overtime; holidays don't extend the 42 days. | EntgFG §3 |
| **Kind-krank [child-sickness leave]** | Paid release + *Kinderkrankengeld* [child-sickness benefit] to care for a sick child <12: **15 working days per child per parent per year** (single parents **30**), capped **35/70** 🔎 (recent increases). | Two-child couple: each parent up to 15 days/child → substantial combined entitlement. | Statutory-insurance benefit; §616 BGB may give short paid release first. | SGB V §45 |
| **§616 BGB — short paid personal absence** | Paid release for a **relatively short** unavoidable personal event (e.g. own wedding, close-relative death, key medical appointment) — unless excluded by contract/CBA (it often is). | 1–2 paid days for a close bereavement, where not contracted out. | Frequently excluded or capped by CBA/contract. | §616 BGB |
| **Mutterschutz [maternity protection]** | **6 weeks before + 8 weeks after** birth (**12 weeks** after for premature/multiple/disabled child); protected absence reshaping the planned day. *Beschäftigungsverbot* [employment ban]: a doctor-ordered pregnancy work ban is paid at full average earnings (*Mutterschutzlohn*), distinct from sick leave. | Due 1 June → protected from ~20 April to ~27 July (later if premature/multiple). | *Mutterschaftsgeld* money is downstream (insurer up to €13/day + employer top-up). | MuSchG §3 (ban), §§3–6 |
| **Stillzeit [nursing breaks]** | A nursing mother is owed **paid** nursing time: **2×30 min or 1×60 min/day** (2×45 min if >8h worked with <2h total break). **Not deducted** from pay and **not counted** against other breaks. | An 8h-shift nursing mother takes 2×30min paid nursing breaks on top of her normal meal break. | Up to 12 months after birth. | MuSchG §7 |
| **Elternzeit [parental leave]** | Up to **36 months per parent per child**; up to **24 months** transferable to any time before the child's **8th birthday**. Job-protected unpaid absence with absolute dismissal protection. | A parent takes 12 months now and reserves 24 for the child's first school year. | *Elterngeld* money is downstream. | BEEG §15, §16, §18 |
| **Elternteilzeit [part-time during parental leave]** | Right to work **≤32h/week** (monthly average) during Elternzeit (≤30h if child born before 1 Sep 2021), in firms >15 employees. Request ≥7 weeks ahead in writing. | A parent works 25h/week during parental leave and draws partial Elterngeld. | Employer may refuse only for urgent operational reasons (in writing, within 4 weeks). | BEEG §15(4)–(7) |
| **Pflegezeit / Familienpflegezeit [care leave]** | **Short-term**: up to **10 working days** off for an acute care situation + *Pflegeunterstützungsgeld* [care support allowance]. **Pflegezeit**: up to **6 months** full/partial release (firms >15). **Familienpflegezeit**: up to **24 months** at ≥15h/week (firms >25). | An employee takes 10 days to organise a parent's sudden care, then 6 months' Pflegezeit. | Firm-size thresholds differ per scheme; job-protected. | PflegeZG §2, §3; FPfZG |
| **Sonderurlaub [special leave] via CBA** | CBAs/works agreements commonly grant extra paid days for marriage, moving, milestone events. | 1 day for own wedding, 1 for a house move (CBA-set). | Fully CBA/contract-defined. | Tarif/Betriebsvereinbarung |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Record all working hours** | Employers must capture **every** hour worked, not just overtime (an engine recording every punch satisfies this). | — | A statutory codification is expected but the BAG/CJEU duty already applies. | BAG 13.09.2022 (1 ABR 22/21); CJEU C-55/18 (*CCOO*) |
| **OT & Sunday-work records — 2-year retention** | Records of hours beyond 8h/day and of Sunday/holiday work must be kept **2 years**. | — | — | ArbZG §16(2) |
| **MiLoG documentation** | In minijob and named at-risk sectors (construction, hospitality, logistics, meat, etc.), start/end/duration of daily hours must be recorded within **7 days** and kept **2 years**. | A restaurant must log each minijobber's daily hours within a week. | Sector-scoped (MiLoG §17 + §2a SchwarzArbG list). | MiLoG §17 |
| **Tolerance / rounding** | **No statutory** rounding or grace rule; any punch tolerance is a policy choice. | — | — | (none statutory) |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/germany.md` (2026-04-20).
- **ArbZG / working time / night / Sunday §§9–11:** timesheet.io ArbZG 2026; fmcgroup.com Germany
  Working Time 2026; gesetze-im-internet.de ArbZG §10; reiner-sct.com Sunday/holiday work.
- **§3b EStG premiums:** bundesfinanzministerium.de LStH 2026 §3b; gesetze-im-internet.de §3b EStG;
  taxmaro.com Nachtzuschlag 2026.
- **Public holidays:** transparent-hiring.com Public Holidays Germany 2026; publicholidays.de;
  Wikipedia Public holidays in Germany.
- **Minors (JArbSchG):** howtogermany.com Youth Labor Laws; zoll.de Protection of young people at work.
- **Overtime / part-time equality:** papayaglobal.com Germany overtime; littler.com BAG part-time OT
  (5 Dec 2024 / 26 Nov 2025).
- **Arbeitszeitkonto / Langzeitkonto:** taxmaro.com Zeitkonto 2026; de.wikipedia.org Wertguthaben;
  gesetze-im-internet.de §7b SGB IV; aivy.app Lebensarbeitszeitkonto.
- **Leave (Urlaub / disabled / educational / care / maternity / parental):** teamed.global Germany
  leave 2026; gesetze-im-internet.de SGB IX §208; asana.com Bildungsurlaub 2026; liveingermany.de
  Mutterschutz 2026; MuSchG §7 (Stillzeit); BEEG §15 Elternteilzeit; PflegeZG §2.
- **Reisezeit:** BAG 17.10.2018 (5 AZR 553/17) via advant-beiten.com / littler.com.
- **Kurzarbeit:** cms.law Short-time working FAQ; littler.com short-time-work framework.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. This is the former verdict-first memo content — kept intact for when we
> resume the "can the engine do this?" question. Not maintained as part of the requirements
> reference above. The `#` numbers are the original rule IDs.

**Verdict: 🟠 Partial — our *best* fit of the three on OT pay.** Germany has **no statutory OT premium**
(onset is policy/Tarif-defined), which maps cleanly onto our policy-defined, surplus-above-planned model.
Gaps cluster in **working-time-limit *validation*** (flagging ArbZG breaches) and **cross-run counters** —
German compliance is more *enforce limits* than *compute premiums*, and our engine computes premiums. Read
with the scope, verdict key, and **Basis key** in [`README.md`](./README.md). No verdict is DB-confirmed
this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). It strengthens
> Germany's already-good policy-defined onset (a Tarif can set OT on a weekly threshold), but doesn't change
> the verdict — Germany's gaps are ArbZG **limit-validation** and cross-run counters, not an OT trigger.

**⚠ Source note (original):** the reference gave the night window as ~20:00–06:00 and was silent on
*Arbeitszeitkonto*, *leitende Angestellte* (§18), and the ArbZG §6 night-worker 8h cap. *The requirements
section above now resolves these from fresh web research (night: ArbZG 23:00–06:00 vs §3b EStG 20:00–06:00;
Arbeitszeitkonto in §7; §6 night-worker 8h cap confirmed).*

### Rule-by-rule (Basis = where the verdict comes from)

| # | Germany requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **ArbZG absolute caps — 10h/day · 60h/week.** The hard ceilings on working time (§3): a day may reach 10h and a week 60h (a "Werktag" runs Mon–Sat) but never more — the engine should flag a breach, not silently cap hours. The 8h/48h *average* those peaks depend on is the 6-month leg in #3 | No working-time-limit breach flagging | ❌ Gap | [ABS] | **Instantaneous single-period caps** — a threshold-vs-total flag (build S); we compute pay, not ArbZG limit enforcement. The **8h/48h *average*** these peaks depend on is the 6-mo averaging leg in **#3** |
| 2 | **Mehrarbeit — no statutory OT premium.** Unlike France or the US, German law sets working-time *limits* but puts no pay uplift on overtime; both the OT onset and its rate come wholly from the Tarifvertrag or contract, with no legal default (a silent contract means only the ordinary rate for the extra hours) | OT onset = surplus over planned; `phases[]` rates fully configurable | ✅ / 🟡 | [API][UI] | **Good fit**: engine has no statutory default anyway (S1–S3). 🔎 confirm Overtime step is happy with onset purely policy-defined |
| 3 | **Period-averaging — a 6-month / 24-week window.** A 10h day (see #1) is legal only if the worker's average stays ≤8h/day across a rolling 6-month or 24-week window, so a single long day is a breach only when it isn't offset by lighter ones — confirmable at window close, not per day. The *average* leg paired with #1's absolute caps | — | ❌ Gap | [ABS] | **Period-averaging** primitive (build M) — same cross-run mechanic as annualisation; design-only `[DES]` |
| 4 | **Nachtzuschlag (night premium).** Night hours (window commonly 20:00–06:00, set by the Tarif, not statute) are separately totalled and carry an uplift, typically 20–25% — the window value itself is a configurable setting | `nightShift {%, start, end, applyEntirePeriod}` | ✅ / 🔎 | [API][UI] | Emission ✅ `[API]`. **Window value: file says ~20:00–06:00, not 23:00–06:00 — verify which to configure** |
| 5 | **Ruhezeit — 11h daily rest.** A minimum 11h uninterrupted rest between two shifts (§5); named sectors (hospitals, care, transport, hospitality) may cut it to 10h only if the missing hour is made up within 4 weeks — a breach should raise a flag | `crossShiftsInterval {interval=660min=11h, phases[]}` | 🟠 Partial / 🔎 | [API] | 11h threshold field exists `[API]`; **make-up tracking = Gap** `[ABS]`; validation behaviour = 🔎 |
| 6 | **Break minimums by hours worked (§4).** At least 30min of break on a 6–9h day and 45min above 9h (splittable into blocks of ≥15min each), and no stretch longer than 6h may be worked without a break | Break config on schedule (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | [DES] | Breaks configurable `[DES]`; **min-break-by-hours *validation/flagging* unconfirmed** |
| 7 | **Feiertage — a per-Bundesland holiday calendar.** Each of the 16 federal states keeps its own public-holiday list (e.g. *Mariä Himmelfahrt* only in Bayern/Saarland, *Reformationstag* in the eastern states), so the same date can be a normal workday in one state and a paid holiday in another | Holiday calendar (`SourceHoliday`), jurisdiction-keyed | ✅ | [FLD] | Per-Bundesland = jurisdiction-keyed reference data |
| 8 | **Sonntagsruhe — Sunday/holiday work is prohibited by default.** Working Sundays and holidays is banned (§9) except for 16 named categories (§10, e.g. healthcare, hospitality), and even permitted workers must get at least 15 work-free Sundays a year (§11) — a running annual counter | Sunday/Holiday premium rate rows | ❌ / 🟡 | [API][ABS] | Premium **emission** 🟡 `[API]`; **prohibition + exception categories + annual free-Sunday counter = Gap** `[ABS]` |
| 9 | **Record all working hours (BAG 2022 · CJEU *CCOO*).** Employers must capture every hour worked, not just overtime — an engine that records every punch already satisfies this | Engine records every punch; approved-event locking | ✅ | [FLD] | The file calls this our "compliance value-add" |
| 10 | **Werkstudent — ≤20h/week cap.** A working student may work at most 20h/week during term time to keep the Werkstudentenprivileg; the engine must track the weekly hours as a running counter (exceeding it changes the worker's social-insurance status, which is downstream) | — | ❌ Gap | [ABS] | YTD-style counter; SV status downstream but the 20h measure is T&A |
| 11 | **Kurzfristige Beschäftigung — ≤3 months or 70 workdays/year.** Short-term employment is capped at three months or 70 worked days in a calendar year; the engine must keep a year-to-date day count (the count is T&A even though the exemption it gates is downstream) | — | ❌ Gap | [ABS] | Cross-run day counter |
| 12 | **Urlaub (BUrlG paid leave) — accrual + warn-or-no-forfeit.** Statutory paid leave accrues at 1/12 per month toward a floor of 24 Werktage (a Mon–Sat count; = 20 days at a 5-day week), with full entitlement after a 6-month Wartezeit; crucially, unused leave does *not* expire if the employer failed to actively warn the worker to take it | — | ❌ Gap | [ABS] | Accrual counter + employer-warning gate (an input the engine lacks) |
| 13 | **Entgeltfortzahlung — 6 weeks' sick pay per Krankheitsfall.** The employer continues full pay for up to 42 calendar days per *illness case* — a new illness resets the clock, the same one recurring within 6 months continues it — reconstructing the day the worker *would have* worked (the *Lohnausfallprinzip*) | — | ❌ Gap | [ABS] | Condition-keyed cross-run counter, not a flat annual budget |
| 14 | **Zuschläge — typed premium buckets, composed additively.** Night, Sunday and holiday premiums are tracked as separate hour buckets by type and stack additively (a night hour worked on a Sunday carries both) — the separate totals are what lets downstream apply the §3b EStG tax-free caps | Named payroll-event per rate row; day/night `type` | ✅ / 🟠 | [API][UI] | Typed buckets ✅ (`phases[].name`/`type` `[API]`); **additive composition mode = Partial** `[DES]` |
| 15 | **Tarifvertrag — each collective agreement is its own pay policy.** Germany's collective-bargaining agreements set working time, premiums and OT onset per arrangement; each one is modelled as a separate pay policy rather than conditionals inside a single policy (and many policies can share a jurisdiction, so the mapping is not 1:1) | One compensation arrangement = one policy | ✅ | [UI][DES] | Matches our model exactly |
| 16 | **Leitende Angestellte — exemption from working-time rules.** Senior managerial employees are treated as outside the working-time limits, so those caps and rest rules don't apply to them (flagged 🔎 — the research file does not confirm this requirement) | — | ❌ Gap / 🔎 | [ABS] | Exempt flag `[DES]` future; **also absent from the research file** — verify the requirement |
| 17 | **Mutterschutz · Elternzeit · Pflegezeit — statutory leave that reshapes the planned day.** Maternity protection (6 weeks before + 8, or 12, after birth), parental leave (up to 3 years per child) and care leave enter as absence types that rebuild what the worker was expected to do | `SourceRequest.*` request/absence handling | 🟠 Partial | [DES][FLD] | Request handling exists; specific German leave semantics not modeled |
| 18 | **Teilzeit — overtime measured against contractual hours.** For part-timers, overtime starts above the hours their *contract* sets, not a statutory weekly threshold — Germany's analog of France's *heures complémentaires* | OT onset = surplus over the **planned/contractual** shift | ✅ / 🟡 | [API][UI] | **Good fit**: the per-day surplus-over-planned model *is* a contractual baseline. Reference maps it "Existing (baseline)" |
| 19 | **§7 ArbZG Öffnungsklauseln — a collective agreement may override the statutory limits.** A Tarifvertrag can lawfully deviate from ArbZG (extend the daily cap where stand-by duty is present, shorten the 11h rest, redistribute breaks), each override carried by that arrangement's own pay policy | One arrangement = one pay policy with its own working-time params | ✅ / 🟡 | [UI][DES] | Per-policy working-time overrides fit the Tarif-as-policy model; reference maps it "Existing" |
| 20 | **Nachtarbeitnehmer — 8h/day cap (ArbZG §6).** A worker classified as a night worker is limited to 8h per day, so the engine would need to flag a breach of that cap (flagged 🔎 — the research file is silent on §6, so the requirement is unconfirmed) | `nightShift` emits night hours; no night-limit counter | 🟠 / 🔎 | [API][ABS] | Night-hour **emission** ✅ `[API]`; the **8h cap validation = Gap** — but the research file is **silent** on §6, so 🔎 verify the requirement |
| 21 | **⚠ Pending ArbZG reform — a single 48h weekly cap.** A proposed reform would drop the daily 8/10h ceiling and keep only a 48h weekly cap; it is not yet law and must not be modelled as settled | n/a | — | [LAW] | File says **not yet law — do not model as settled** |

### Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — including the ✅/🟡 policy-defined-onset rows (#2, #18,
> #19) and the ✅ record-all-hours / holiday-calendar / Tarif-as-policy rows (#7, #9, #15).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped, or core to the OT model) · 🟡 Medium (moderately common, or a usable
> mitigation, or moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow
> population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general German market* a rule bites. **⚠ Customer-relative** — shifts with
>   the customer's workforce: **hospitality/healthcare/retail → #8 Sunday work + #20 night-worker cap**;
>   **student/seasonal employers → #10 Werkstudent + #11 Kurzfristige counters**. **None flips to Critical** —
>   Germany has no annual-pay-corrupting regime; every gap is limit-*validation* or a cross-run counter, all
>   non-corrupting to the computed pay.
> - **Build-effort** = my estimate, **grounded in `germany.md`'s Basis/Evidence** (Existing/`[API]` ≈ config/small
>   **S**; `[DES]`/`(draft)` ≈ **M**; net-new subsystem ≈ **L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (DE market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#3 6-mo / 24-wk averaging** | **Partial** — manual monitoring; **pay stays correct** (the average only decides whether a 10h day was legal, not what's paid) | **High** as a legal obligation (non-corrupting) | **M** — period-averaging over a trailing 24-week window (shares the annualisation primitive; `[DES]`) | 🟡 **Medium** |
| **#6 Breaks by hours** | **Config** — configure the break rules on the schedule (30/45min, 15min blocks); min-break-by-hours *validation/flagging* is the open piece | **High** (all workers) | **S-M** | 🟡 **Medium** |
| **#8 Sunday prohibition + free-Sunday counter** | **Partial** — configure the Sunday/holiday premium rows; the §9 prohibition, §10 exempt categories, and ≥15-free-Sundays/yr counter need manual tracking | **Med** — sector-specific (most German workers don't work Sundays; bites exempt sectors) | **M** — free-Sunday YTD counter + exception categories + prohibition flag | 🟡 **Medium** |
| **#13 Entgeltfortzahlung (6-wk sick pay)** | **Partial** — sickness handled as absences; the 42-day-per-*Krankheitsfall* counter + Lohnausfall day reconstruction need a leave module or manual tracking | **High**, but adjacent to core T&A (absence-pay continuation) | **M** — condition-keyed cross-run counter (per illness case, not a flat annual budget) | 🟡 **Medium** |
| **#12 Urlaub accrual** | **Partial** — Urlaub handled as absences/requests; the 1/12-per-mo accrual + 6-mo Wartezeit + warn-or-no-forfeit gate need a leave module or manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **M** — accrual counter + an employer-warning input the engine lacks | 🟡 **Medium** |
| **#20 Night-worker 8h/day cap (§6)** | **Partial** — night hours are emitted; no night-worker-status determination or 8h-cap counter | **Med** — night workers (sector-dependent) | **M** — night-worker status + rolling cap | 🟡 **Medium** (⚠ requirement now confirmed via web research) |
| **#17 Mutterschutz / Elternzeit / Pflegezeit** | **Partial** — `SourceRequest.*` handles absences generically; the German-specific leave semantics that reshape the planned day aren't modeled | **Med** — parental/care leave across the workforce | **M** — specific leave-type semantics on the existing request primitive | 🟡 **Medium** |
| **#10 Werkstudent ≤20h/week** | **Weak** — no per-worker cross-run counter; manual 20h/week tracking (the SV consequence is downstream money) | **Low-Med** — student-heavy employers only (customer-relative) | **M** — YTD-style weekly-hours counter | 🟡 **Medium** |
| **#11 Kurzfristige ≤3mo / 70 workdays** | **Weak** — no cross-run day counter; manual 3-mo / 70-workday tracking | **Low-Med** — seasonal / short-term employers only (customer-relative) | **M** — cross-run day counter | 🟡 **Medium** |
| **#14 Additive Zuschläge composition** | **Partial** — typed night/Sunday/holiday buckets emit today; the general additive-composition mode is `[DES]` | **Med** | **M** | 🟢 **Low** |
| **#5 Daily rest 11h + make-up** | **Partial** — the 11h inter-shift field exists (`crossShiftsInterval`); the 10h-with-4-week-make-up tracking is absent; validation behaviour unconfirmed | **Med** | **S-M** | 🟢 **Low** |
| **#1 Absolute 10h/day · 60h/week caps** | **Partial** — notification/alert thresholds as manual monitoring; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **S** — single-period threshold flag (cheapest to add) | 🟢 **Low** |
| **#16 Leitende Angestellte exemption** | **Strong** — exclude from working-time rules entirely (assign no OT/limit policy) | **Low** — senior executives only | **S** — exempt flag | 🟢 **Low** (⚠ requirement unconfirmed — absent from research file) |
| **#4 Night-window value** | **Strong** — the night window is a configurable value; just confirm 23:00–06:00 (ArbZG) vs 20:00–06:00 (§3b EStG) with the customer | **Med** (night-working populations) | **S** — set a config value | 🟢 **Low** |

### Severity roll-up
- **🔴 Critical (0):** none — Germany has no annual-pay-corrupting regime; OT onset is policy-defined and fits (#2, #18–19).
- **🟠 High (0):** none — every gap is limit-*validation* or a cross-run counter, all non-corrupting to computed pay and scoped.
- **🟡 Medium (9):** 6-mo averaging (#3), breaks validation (#6), Sunday prohibition + free-Sunday counter (#8), Entgeltfortzahlung sick pay (#13), Urlaub accrual (#12), night-worker 8h cap (#20), German leave semantics (#17), Werkstudent 20h (#10), Kurzfristige 70-day (#11).
- **🟢 Low (5):** additive Zuschläge stacking (#14), daily rest 11h + make-up (#5), 10h/60h caps (#1), leitende Angestellte exempt (#16), night-window value (#4).

### The big gaps (all `[ABS]`)
1. **ArbZG limit validation** (#1, #3, #5, #6, #8, #20) — **instantaneous caps (#1, build S)** vs the **6-mo averaging (#3, period-averaging, build M)**, plus 11h rest make-up, Sunday prohibition + free-Sunday counter, night-worker 8h cap. We don't *flag limit breaches*.
2. **Cross-run counters** (#10–13) — Werkstudent 20h, Kurzfristige 70-day, Urlaub accrual, 6-wk sick pay.
3. **Additive premium composition** (#14) for stacked night+Sunday+holiday.

### Where Germany scores well (worth saying)
- **OT pay** (#2): no statutory premium → our configurable, policy-defined onset+rates fit cleanly `[API]`.
- **Teilzeit contractual-baseline OT** (#18) + **§7 Öffnungsklauseln per-policy overrides** (#19) — both map to **Existing** engine paths, reinforcing the no-statutory-premium fit.
- **Record-all-hours** (#9): satisfied — a genuine compliance value-add `[FLD]`.
- **Tarifvertrag-as-policy** (#15) + **holiday calendar** (#7) + **typed premium buckets** (#14) — all present.

### 🔎 Verify before telling the customer
- **Night window** value (ArbZG 23:00–06:00 vs §3b EStG 20:00–06:00) — a config value, not a capability.
- **`crossShiftsInterval`** validation behaviour + make-up tracking (make-up is absent).
- Whether **min-break-by-hours** is *validated/flagged* or only configured.
- Whether **leitende Angestellte** exemption is even a stated requirement (absent from the research file).

### Bottom line for the customer
Germany is our **strongest OT-pay fit** (no statutory premium; Tarif-as-policy; records all hours). But
**statutory working-time compliance is largely limit-*validation*** (flag breaches of daily/weekly caps,
the 6-mo average, 11h rest, the Sunday prohibition) — which our **pay-calculation** engine does **not** do
today — plus several SV counters. Honest status: **partial; good on pay, weak on limit-enforcement.**
