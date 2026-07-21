# Mexico — T&A requirements

> **What this is.** The ground-truth reference for Mexico's time-&-attendance legal requirements,
> grouped by topic — detailed enough to **build a day.io pay policy from**. It aims to be
> **exhaustive** and **atomic**: **one legal proposition per row**, each row self-contained (no
> "see §X" as the only content), with exact values, a worked example wherever a number is involved,
> variants, and a `Basis` that **links to the primary source** so any row can be checked against the
> law directly.
>
> **Scope: time & day-events only** — money (%, MXN, tax, gross-to-net) is downstream *context*
> here (kept in `Values` so a policy can be configured; the deliverable is the typed hour/day
> event). **Term convention:** every non-English (Spanish) term is glossed in English in brackets
> on first use, e.g. *jornada* [shift/workday].
>
> **The one structural fact to hold onto:** Mexico is **federally uniform, not CBA-fragmented** —
> the *Ley Federal del Trabajo* [LFT, Federal Labor Law] (Constitution Art. 123, Apartado A) sets
> the entire T&A rule surface **identically across all 32 states**; there is **no state-by-state
> matrix** the way the US or India has. The only variation layer is the ***Contrato Colectivo de
> Trabajo* [CCT, collective bargaining agreement]**, which may **improve, never reduce**, the LFT
> floor (Art. 5, 386–403) — model each CCT as its own pay policy. The statute itself is
> **mid-reform**: the 40-hour-workweek phase-in (2026→2030) moves the weekly cap and the OT-band
> boundary on a fixed calendar — model these as **date-effective parameters**, not constants.
>
> **Legal sources & links:** the *Ley Federal del Trabajo* (LFT) — Arts. 5, 9, 42, 47, 58–81, 84,
> 132, 170, 173–180, 330-A–K, 331–343, 386–403, 784, 804, 994 — official PDF at
> [diputados.gob.mx](http://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf), with per-article deep
> links via the confirmed-live mirror [leyes-mx.com/ley_federal_del_trabajo/&lt;article&gt;.htm](https://leyes-mx.com/ley_federal_del_trabajo/76.htm);
> the 2026 40-hour-workweek reform decrees (*Diario Oficial de la Federación* [DOF, Federal Official
> Gazette] 3 Mar / 1 May 2026); the 2025 digital-platform-workers reform (DOF, in force 22 Jun
> 2025); and reputable multi-source guides (Greenberg Traurig, Boundless HQ, Deel, PayrollMexico,
> Infobae, Justia México). Sources listed at the foot of the requirements section. 🔎 marks a figure
> or deep link not independently confirmed this pass.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Federal uniformity — one statute, 32 states** | The LFT applies identically nationwide; no state-level T&A variation (contrast US/India). The only sub-national wrinkles are civic-holiday calendar additions and the 2 minimum-wage zones (money, not T&A). | A worker in Sonora and a worker in Yucatán have the same jornada caps, OT band, and vacation ladder — no state variance. | — | [Constitution Art. 123 Apdo. A](https://leyes-mx.com/constitucion_politica_de_los_estados_unidos_mexicanos/123.htm) 🔎 |
| **CCT [collective bargaining agreement] = its own pay policy** | A *sindicato* [union]-negotiated CCT can **improve but never reduce** the LFT floor — richer OT multipliers, more vacation, shorter *jornadas* [shifts], extra premiums. Model each CCT as a **separate** policy, not conditionals in one (mapping not 1:1). | A metalworking CCT sets a 44h week + 30% night premium vs the statutory 48h/no-fixed-night-%. | Ratified via secret ballot per the 2019 reform + USMCA labor chapter. | [LFT Art. 5](https://leyes-mx.com/ley_federal_del_trabajo/5.htm) · [Art. 386](https://leyes-mx.com/ley_federal_del_trabajo/386.htm) |
| **Jornada [shift/workday] type = the classification gate** | Three statutory shift types set the **daily cap** and thereby the **daily OT onset**: *diurna* [day] 8h, *nocturna* [night] 7h, *mixta* [mixed] 7.5h. Typing the shift is a prerequisite to Overtime (see §3a). | A worker rostered 06:00–14:00 is *diurna* (8h cap); 22:00–05:00 is *nocturna* (7h cap). | — | [LFT Art. 60](https://leyes-mx.com/ley_federal_del_trabajo/60.htm) · [Art. 61](https://leyes-mx.com/ley_federal_del_trabajo/61.htm) |
| **⚠ 40-hour reform — phased, date-effective** | Constitutional amendment (DOF 3 Mar 2026) + secondary LFT reform (DOF 1 May 2026) move the ordinary weekly cap from **48h → 40h across 2026–2030** (see §4) and re-cut the OT weekly band (see §3c). **Salaries/benefits may not be reduced.** Model as **year-keyed parameters**, not a flag flip. | 2026: cap is 48h; 2030: cap reaches 40h — a worker's contract wage may not drop as the cap falls. | Post-2028 exact OT re-cut is still settling across sources — 🔎 re-verify against the DOF text before modelling 2028+. | [LFT Art. 59 (reformed)](https://leyes-mx.com/ley_federal_del_trabajo/59.htm) 🔎; DOF 03-Mar/01-May-2026 🔎 |
| **Trabajadores de confianza [trust/managerial employees] — NOT OT-exempt** | A common myth: status follows the **function** (*dirección, inspección, vigilancia, fiscalización* of a general character — Art. 9), not the job title, but the **2×/3× OT entitlement still applies in full**. Only the evidentiary burden shifts (worker must prove hours worked). Model as a worker **attribute**, never an exempt gate. | A *confianza* branch manager who works 12 OT hours in a week is still owed the full 2×/3× band. | Contrast the US exempt/non-exempt gate — Mexico has none. | [LFT Art. 9](https://leyes-mx.com/ley_federal_del_trabajo/9.htm) |
| **Contract types — affect tenure accruals only** | *Planta* [permanent], *eventual* [temporary], *por obra* [project-based], *a prueba* [trial period, ≤30/180 days] shape **seniority-keyed** entitlements (vacation tier, severance) but **not** the hours/OT math — every contract type gets the same jornada/OT/premium rules. | A 90-day *eventual* contract worker gets the same 2×/3× OT band as a *planta* worker. | Trial period ≤180 days for managerial/specialized roles (2012 reform). | [LFT Art. 35](https://leyes-mx.com/ley_federal_del_trabajo/35.htm) · Art. 39-A–39-F 🔎 |
| **Minors <18 — protective regime, minimum age 15** | Employment below age 15 is **generally barred**. *Menores* [minors] 15–17 face: no overtime, no Sunday/mandatory-rest-day work, a night-work ban, tighter daily hours (see §4/§5), and **richer vacation** (≥18 workdays vs the adult 12, see §10). | A 16-year-old cannot be rostered for OT or a Sunday shift under any circumstance. | Hazardous/insalubrious work categorically barred regardless of hours. | [LFT Art. 173](https://leyes-mx.com/ley_federal_del_trabajo/173.htm) 🔎 |
| **Personas trabajadoras del hogar [domestic workers] — distinct regime, its own chapter** | Domestic workers (Título Sexto, Cap. XIII) follow a **separate weekly-rest, night-rest and day-cap regime**, distinct from the general jornada rules — see §4 for the specific figures. A written contract is mandatory (listing hours, rest, pay). | A live-in domestic worker's day and rest structure differ entirely from a factory worker's (§4). | — | [LFT Art. 331](https://leyes-mx.com/ley_federal_del_trabajo/331.htm) Ter |
| **Trabajadores de plataformas digitales [digital-platform workers] — subordination test (2025 reform)** | Workers are **subordinate employees** when physically present executing the platform-mediated activity; social-security/labor rights attach once monthly income reaches the **minimum-wage threshold**. Workers retain freedom to connect/disconnect at will — no fixed schedule (the >288h/yr benefit-eligibility counter is its own rule, see §9). | A courier meeting the income threshold while physically executing deliveries is a subordinate employee for labor-rights purposes. | In force since 22 Jun 2025; pilot enrolment program ran Jun–Dec 2025. | LFT reform DOF 22-Jun-2025 🔎 |
| **Teletrabajo [telework/home office] — its own chapter, ≥40%-of-time threshold** | Governs remote/hybrid work with **≥40% of time from home** over a month. Distinct obligations: equipment provision, cost reimbursement (downstream money), and the **right to disconnect** (see §2). | An employee working 3 of 5 days remotely qualifies as *teletrabajo*. | 2021 reform introduced the chapter; the disconnect right strengthened by the 2026 reform. | [LFT Art. 330-A](https://leyes-mx.com/ley_federal_del_trabajo/330-a.htm) 🔎 |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Jornada [workday] = time at the employer's disposal** | Working time is the time the worker is **at the employer's disposal** to render service — the LFT's baseline definition feeding the jornada-type classification (§1, §3a). | — | — | [LFT Art. 58](https://leyes-mx.com/ley_federal_del_trabajo/58.htm) |
| **Meal/rest break — counts as worked if the worker can't leave** | A break in a continuous shift is **not** working time by default, **unless** the worker cannot leave the workplace during it — then it counts in full. | A cashier who must stay at the register during a "break" has that time counted as worked. | — | [LFT Art. 63](https://leyes-mx.com/ley_federal_del_trabajo/63.htm) · [Art. 64](https://leyes-mx.com/ley_federal_del_trabajo/64.htm) |
| **Derecho a la desconexión [right to disconnect] — teletrabajo boundary** | *Teletrabajo* [telework] employees are **not obliged** to answer calls/messages/emails/work orders **outside their agreed schedule**. Strengthened in the 2026 reform (Art. 330-E fr. VI). | A remote employee is not required to reply to a 9pm work email. | Applies to teletrabajo/home-office workers specifically, not the general workforce. | [LFT Art. 330-E](https://leyes-mx.com/ley_federal_del_trabajo/330-e.htm) fr. VI 🔎 |
| **Platform-worker "connected time"** | For digital-platform workers, working time is the **actual effective connection/execution time**, not a fixed roster — workers may connect/disconnect freely. | A courier is only "working" while actively connected and executing deliveries, not during idle app-open time. | — | LFT reform DOF 22-Jun-2025 🔎 |
| **Business travel time** | 🔎 The LFT does not separately codify business-travel time as working time (unlike Germany/France); no confirmed statutory rule found. | — | — | — none identified in current research — |

## 3. Overtime

*Mexico's central mechanic: OT onset is set by the **shift-type daily cap**, but the OT **pay band** pivots on the **running weekly OT total**, not the daily distribution — the single most-conflated pair of rules in Mexican payroll.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily OT onset = the shift-type cap** | OT (*tiempo extraordinario*) begins above the worker's **jornada-type daily cap**: **8h** (diurna), **7h** (nocturna), **7.5h** (mixta). Typing the shift correctly is a prerequisite. | A diurna worker rostered 8h who stays a 9th hour has 1h of OT. | — | [LFT Art. 60](https://leyes-mx.com/ley_federal_del_trabajo/60.htm) · [Art. 61](https://leyes-mx.com/ley_federal_del_trabajo/61.htm) |
| **Mixta → nocturna reclassification at 3.5h night portion** | A *mixta* [mixed] shift whose **night portion (20:00–06:00) reaches ≥3.5h** is **reclassified as nocturna** — its daily cap drops to **7h**, silently moving where OT begins. | A mixed shift with 4h in the night window is nocturna (7h cap), not mixta (7.5h cap) — OT starts an hour earlier than expected. | Requires correct night-portion measurement on midnight-crossing shifts. | [LFT Art. 60](https://leyes-mx.com/ley_federal_del_trabajo/60.htm) |
| **Routine OT requires the worker's agreement** | Overtime under the ordinary regime (Art. 66, §3c) may only be required with the worker's consent — it is not a unilateral employer power. | A worker may lawfully decline a request to stay past their jornada cap outside an emergency. | — | [LFT Art. 66](https://leyes-mx.com/ley_federal_del_trabajo/66.htm) |
| **Art. 65 emergency exception — uncapped, distinct trigger** | Separately from routine OT, Art. 65 permits **unlimited-hours emergency work** — fire, disaster, *riesgo inminente* [imminent risk] to life/property — with no daily/weekly cap, distinct from ordinary OT. | A factory fire requires all-hands overtime with no 3h/day ceiling — Art. 65, not Art. 66. | Emergency OT is a narrow, fact-specific carve-out — not a routine scheduling tool. | [LFT Art. 65](https://leyes-mx.com/ley_federal_del_trabajo/65.htm) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **OT pay — first N hours/week → 2×; beyond → 3×** | The double→triple pivot is the **running weekly OT total**, phased: **9h/week** (2026–2027) → **10h** (2028) → **11h** (2029) → **12h** (2030) 🔎. First tranche pays **2.0×** the ordinary hourly rate (*horas extra dobles* [double overtime hours]); hours beyond pay **3.0×** (*horas extra triples* [triple overtime hours]). | 2026: a week with 4h OT on 3 days = 12h OT → first 9h × 2.0× = 18.0R; last 3h × 3.0× = 9.0R; total 27.0R-equivalent. | The post-2027 phase-in figures are **still settling across sources** — re-verify against the DOF text before modelling 2028+. | [LFT Art. 67](https://leyes-mx.com/ley_federal_del_trabajo/67.htm) · [Art. 68](https://leyes-mx.com/ley_federal_del_trabajo/68.htm) (as reformed, DOF 01-May-2026) 🔎 |
| **Rate basis — ordinary hourly rate = daily wage ÷ shift-type hours** | The divisor is the **jornada-type length** (8/7/7.5h) — a night worker's ordinary hourly rate is computed off a **7h divisor** (higher per-hour base for the same daily wage); the 2×/3× multipliers are **uniform across shift types**. | A nocturna worker's ordinary hourly rate = daily wage ÷ 7, vs a diurna worker's daily wage ÷ 8, for the same daily wage. | Night work earns its shorter jornada, not a distinct OT multiplier (see §5). | [LFT Art. 67](https://leyes-mx.com/ley_federal_del_trabajo/67.htm); practitioner convention |
| **OT must be paid in cash** | No statutory time-off-in-lieu for OT — it must be paid, unless a CCT expressly allows compensatory time off (see §7). | — | CCT-permitted TOIL is the only lawful substitute. | [LFT Art. 67](https://leyes-mx.com/ley_federal_del_trabajo/67.htm) · [Art. 68](https://leyes-mx.com/ley_federal_del_trabajo/68.htm) |
| **Legality breach ≠ pay forfeiture** | Overworking the legality cap (§3c) does **not** void the pay — the excess hours are still owed at the applicable 2×/3× rate; the breach exposes the employer to fines instead. | A day with 4h OT breaches the 3h/day legality cap but the 4h are still paid at 2×/3× per the weekly band. | — | [LFT Art. 66](https://leyes-mx.com/ley_federal_del_trabajo/66.htm); [Art. 994](https://leyes-mx.com/ley_federal_del_trabajo/994.htm) 🔎 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **OT legality cap — weekly, phased** | Pre-reform: **≤3h/day, ≤3 days/week ⇒ ≤9h/week**. Reformed (from 2026 phase-in): weekly OT cap **9h** (2026–2027) → **10h** (2028) → **11h** (2029) → **12h** (2030) 🔎, distributed **≤4h/day, ≤4 days/week**. Breach → violation flag, not a silent cap. | A worker doing 5h OT on 2 days (10h/week, 2026) breaches both the daily-hours and weekly-total legality ceilings. | 🔎 One source cites an additional **12h/day total (ordinary+OT)** hard ceiling — unconfirmed, treat as a flag to verify. | [LFT Art. 66 (as reformed)](https://leyes-mx.com/ley_federal_del_trabajo/66.htm) 🔎 |
| **Emergency OT (Art. 65) — uncapped** | No daily/weekly ceiling for genuine *riesgo inminente* [imminent-risk] emergency work — distinct counter from routine OT. | A multi-day emergency response can run OT hours with no weekly ceiling, unlike routine OT. | Narrow, fact-specific; not a scheduling tool. | [LFT Art. 65](https://leyes-mx.com/ley_federal_del_trabajo/65.htm) |
| **No statutory annual OT-hours ceiling** | Beyond the recurring weekly band (§3b) and its legality cap, Mexico has **no separate annual OT-hour budget** to track. | — | — | [LFT Art. 66](https://leyes-mx.com/ley_federal_del_trabajo/66.htm)–[68](https://leyes-mx.com/ley_federal_del_trabajo/68.htm) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-determining averaging — the band resets weekly** | Unlike Germany's 6-month working-time-limit average or France's annualisation regimes, Mexico's OT pay band is **decided fresh each week** — no rolling or annual netting moves an hour between the 2× and 3× tranches. | A heavy week (12h OT) and a light week (0h OT) are each assessed independently — no averaging smooths them. | — | [LFT Art. 67](https://leyes-mx.com/ley_federal_del_trabajo/67.htm)–[68](https://leyes-mx.com/ley_federal_del_trabajo/68.htm) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **OT is a separate per-hour layer** | Overtime multipliers apply **per hour**, independent of the day-level premium composition (Sunday/rest-day/holiday, §6). | An OT hour and a Sunday-premium hour are tracked as two independent dimensions before composing (§5/§6). | — | [LFT Art. 67](https://leyes-mx.com/ley_federal_del_trabajo/67.htm)–[68](https://leyes-mx.com/ley_federal_del_trabajo/68.htm) |
| **OT on a premium day — statute-silent, practitioner convention** | The LFT does **not** prescribe the OT-on-a-Sunday/rest-day/holiday interaction. Practitioner convention pays such OT at a flat **3×/hour regardless of the weekly band** (the day already carries its own premium) — treat as a **configurable policy decision**, not a hard statutory rule. | An OT hour worked on a paid holiday is commonly paid at 3× outright, bypassing the 2×/9h-then-3× band. | Some employers/CCTs instead apply the ordinary weekly band on top of the day premium — a genuine open configuration choice. | practitioner convention (not LFT) 🔎 |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily caps by jornada type** | **Diurna** [day, 06:00–20:00] **8h**; **nocturna** [night, 20:00–06:00] **7h**; **mixta** [mixed, night portion <3.5h] **7.5h** (else reclassified nocturna, §3a). | A diurna shift 08:00–16:00 (8h) is at the cap exactly; one more hour is OT. | — | [LFT Art. 60](https://leyes-mx.com/ley_federal_del_trabajo/60.htm) · [Art. 61](https://leyes-mx.com/ley_federal_del_trabajo/61.htm) |
| **Weekly caps — phased 2026–2030** | Mid-2026: diurna **48h** / nocturna **42h** / mixta **45h** (the long-established 6× derivation). The **40-hour reform phases the diurna weekly cap down**: 48h (through 2026) → 46h (2027) → 44h (2028) → 42h (2029) → 40h (2030). 🔎 Corresponding nocturna/mixta weekly-cap steps are not yet clearly published — model the **daily caps as stable** and the **diurna weekly cap as the moving, year-keyed number**. | A 2027 diurna week is capped at 46h ordinary + the phase's OT allowance (§3c). | — | [LFT Art. 59](https://leyes-mx.com/ley_federal_del_trabajo/59.htm) 🔎 · [Art. 61](https://leyes-mx.com/ley_federal_del_trabajo/61.htm) (reformed); DOF 03-Mar/01-May-2026 🔎 |
| **No statutory minimum inter-shift rest window** | 🔎 Unlike Germany's 11h or similar EU rules, the LFT does **not** codify a minimum number of rest hours between two shifts beyond the daily-cap + weekly-rest-day structure — no confirmed statutory figure found. | — | — | — none identified in current research — |
| **Weekly rest — séptimo día [seventh day]** | **1 paid rest day per 6 days worked** (ideally Sunday); for daily-wage workers an explicit paid non-worked day, for monthly-salaried workers embedded in salary. | A 6-day working week earns a 7th paid rest day. | Carry the **wage type** — double-paying or omitting séptimo día for daily-wage workers is a classic error. | [LFT Art. 69](https://leyes-mx.com/ley_federal_del_trabajo/69.htm) · [Art. 70](https://leyes-mx.com/ley_federal_del_trabajo/70.htm) |
| **Meal/rest break — ≥30 min** | **≥30 minutes** in a continuous shift; counts as **worked time** if the worker cannot leave the workplace during it (§2). | An 8h continuous diurna shift includes a ≥30-min break. | — | [LFT Art. 63](https://leyes-mx.com/ley_federal_del_trabajo/63.htm) · [Art. 64](https://leyes-mx.com/ley_federal_del_trabajo/64.htm) |
| **Minors <16 — 6h/day, split into ≤3h blocks** | *Menores* [minors] under 16: **≤6h/day**, divided into periods of **≤3h** each, with **≥1h rest** between periods. | A 15-year-old works two 3h blocks separated by a 1h break — 6h total. | 16–17-year-olds fall under the general adult daily caps (8/7/7.5h) but keep the OT/Sunday/holiday bans (§1, §5, §6). | [LFT Art. 177](https://leyes-mx.com/ley_federal_del_trabajo/177.htm) 🔎 |
| **Minors <18 — barred from OT, Sunday & mandatory-rest-day work** | *Menores* under 18 may **never** be rostered for overtime, Sunday work, or mandatory-rest-day (*día de descanso obligatorio*) work — an absolute bar, not a premium-triggering condition. | A 17-year-old cannot be scheduled on a Dec 25 holiday under any circumstance. | — | [LFT Art. 178](https://leyes-mx.com/ley_federal_del_trabajo/178.htm) 🔎 |
| **Domestic workers — live-in rest structure** | Live-in *personas trabajadoras del hogar* [domestic workers]: **≥9 consecutive hours** nightly rest + **≥3h** midday rest between morning/afternoon periods; day-shift capped at **8h**. | A live-in domestic worker works ≤8h daytime, takes a 3h midday break, then gets ≥9h uninterrupted night rest before the next day starts. | Non-live-in domestic workers follow the general jornada rules. | [LFT Art. 337](https://leyes-mx.com/ley_federal_del_trabajo/337.htm) · Art. 338 🔎 |
| **Domestic workers — weekly rest = 1.5 days** | **1.5 consecutive days/week**, preferably Sat–Sun; may be **accumulated over 2 weeks** if ≥1 full consecutive day/week is kept. | A domestic worker banks a half-day across two weeks into one extra full day off, keeping ≥1 full day each week. | — | [LFT Art. 336](https://leyes-mx.com/ley_federal_del_trabajo/336.htm) Bis 🔎 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night window** | *Jornada nocturna* [night shift] = **20:00–06:00**. | A shift rostered 21:00–05:00 falls entirely inside the nocturna window. | — | [LFT Art. 60](https://leyes-mx.com/ley_federal_del_trabajo/60.htm) |
| **No separate night-premium %** | Unlike Germany/France, the LFT sets **no additional night-differential percentage** — the "premium" is structural: the **shorter 7h daily cap** (vs 8h diurna) for the **same daily wage**, which raises the effective **ordinary hourly rate** (÷7 instead of ÷8, see §3b). A common misconception treats this as a missing night %; it is deliberately embedded in the shift-length divisor instead. | A night worker's daily wage ÷ 7 vs a day worker's ÷ 8 — the night worker earns more per hour for the identical daily wage, with no extra "night premium" line. | Some CCTs layer an *additional* contractual night bonus on top — a variant, not the statutory default. | [LFT Art. 61](https://leyes-mx.com/ley_federal_del_trabajo/61.htm) · [Art. 67](https://leyes-mx.com/ley_federal_del_trabajo/67.htm) (rate-basis mechanic) |
| **Mixta reclassification threshold** | A *mixta* shift's night portion reaching **≥3.5h** reclassifies it to **nocturna** (7h cap) — see §3a/§4. | A mixed shift with 4h in the night window is treated as nocturna (7h cap), not mixta (7.5h cap). | — | [LFT Art. 60](https://leyes-mx.com/ley_federal_del_trabajo/60.htm) |
| **Minors — night-work ban** | *Menores* [minors] under 18 barred from **industrial night work** entirely, and from work **after 22:00** ("las diez de la noche") in non-industrial establishments. | A 17-year-old retail worker must finish by 22:00; industrial night shifts are barred outright. | — | [LFT Art. 175](https://leyes-mx.com/ley_federal_del_trabajo/175.htm) 🔎 |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Días de descanso obligatorio [mandatory public holidays] — national calendar** | **7 fixed/movable annual holidays** in a non-sexennial, non-election year: Jan 1; 1st Monday of Feb (for "Feb 5"); 3rd Monday of Mar (for "Mar 21"); May 1; Sep 16; 3rd Monday of Nov (for "Nov 20"); Dec 25. Plus **Oct 1 every 6 years** (federal-executive transmission; next **2030**) and **election-day** in federal/local election years. | 2026 calendar: Jan 1 (Thu), Feb 2 (Mon), Mar 16 (Mon), May 1 (Fri), Sep 16 (Wed), Nov 16 (Mon), Dec 25 (Fri) = **7 applicable holidays**. | Movable Feb/Mar/Nov Mondays and the sexennial Oct 1 (reformed from Dec 1 in 2024) must be **calculated**, not hard-coded. May 5 and Día de Muertos are **not** statutory holidays. | [LFT Art. 74](https://leyes-mx.com/ley_federal_del_trabajo/74.htm) |
| **Holiday paid if not worked** | Embedded in monthly salary for salaried workers; an explicit **paid non-worked day** for daily-wage workers — carry the wage type. | A monthly-salaried worker's Dec 25 pay is unaffected; a daily-wage worker is paid an explicit holiday-day wage despite not working. | Same wage-type nuance as séptimo día (§4). | [LFT Art. 74](https://leyes-mx.com/ley_federal_del_trabajo/74.htm) |
| **No default Sunday-work prohibition** | Unlike Germany, Mexico does **not** ban Sunday work by default — any employer may roster Sundays; the *prima dominical* premium (below) compensates instead of a prohibition regime. | A retailer may roster Sunday shifts freely, subject only to paying the Sunday premium. | — | [LFT Art. 71](https://leyes-mx.com/ley_federal_del_trabajo/71.htm) |
| **Prima dominical [Sunday premium]** | **+0.25×** (≥25%) of the ordinary daily wage for **any Sunday worked** — attaches regardless of whether Sunday is the worker's designated rest day; **additive** on the daily-wage base. | A worker's ordinary Sunday shift earns base (1×) + 0.25× = **1.25×**. | — | [LFT Art. 71](https://leyes-mx.com/ley_federal_del_trabajo/71.htm) |
| **Rest-day (séptimo día) worked** | **Base day (1×) + 2× service premium = effective 3×** — *not* a flat 3× multiplier; the service premium is owed **independently of** the rest-day pay already due. | A worker called in on their rest day earns their normal rest-day pay (1×) plus a double-for-service (2×) = 3× total. | Modelling this as a flat 3× (omitting the base) is the **#1 Mexican underpayment error**. | [LFT Art. 73](https://leyes-mx.com/ley_federal_del_trabajo/73.htm) |
| **Mandatory holiday worked** | Same structure: **base (1×) + 2× service = effective 3×**. | A worker rostered on Dec 25 earns 3× total. | — | [LFT Art. 75](https://leyes-mx.com/ley_federal_del_trabajo/75.htm) |
| **Stacking — rest day or holiday worked on a Sunday** | Base (1×) + service (2×) + prima dominical (0.25×) = **effective 3.25×**. | A holiday that falls on and is worked on a Sunday pays 3.25×. | — | [LFT Art. 71](https://leyes-mx.com/ley_federal_del_trabajo/71.htm), [73](https://leyes-mx.com/ley_federal_del_trabajo/73.htm), [75](https://leyes-mx.com/ley_federal_del_trabajo/75.htm) (composed) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory hours-bank / averaging account** | Mexico has **no** working-time-account mechanic — the weekly OT band (§3b) is computed and paid **in cash**, fresh each week; there is no accumulation/averaging structure to bank surplus hours against future rest. | — | — | [LFT Art. 67](https://leyes-mx.com/ley_federal_del_trabajo/67.htm)–[68](https://leyes-mx.com/ley_federal_del_trabajo/68.htm) |
| **TOIL only via CCT** | Time-off-in-lieu of OT pay is **not** a statutory default — only lawful where a *Contrato Colectivo de Trabajo* expressly permits it. | A CCT-covered worker may bank 10 OT hours as time off instead of cash, if the CCT so provides. | Ratio (1:1, 1:2, etc.) is CCT-defined. | CCT practice (not LFT) 🔎 |
| **Séptimo día is a recurring cycle, not a bank** | The 1-rest-day-per-6-worked-days rule (§4) resets every cycle — it is **not** an accumulating balance a worker can bank or carry forward. | — | — | [LFT Art. 69](https://leyes-mx.com/ley_federal_del_trabajo/69.htm)–[70](https://leyes-mx.com/ley_federal_del_trabajo/70.htm) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory standby/on-call classification** | 🔎 The LFT does **not** codify a *guardia* [on-call/standby duty] regime (contrast Germany's *Bereitschaftsdienst* [on-call duty on-site] / *Rufbereitschaft* [on-call duty reachable off-site] or the EU *Matzak* line) — availability pay and call-in classification are **contract/CCT-defined**, not statutory. | — | — | — none identified in current research — |
| **Emergency-risk work (Art. 65) functions like an uncapped callout** | Genuine *riesgo inminente* [imminent-risk] emergencies (fire, disaster) trigger paid, uncapped work — the closest LFT analog to an emergency on-call activation, but it is a narrow safety carve-out, not a standing standby regime. | — | — | [LFT Art. 65](https://leyes-mx.com/ley_federal_del_trabajo/65.htm) |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up pay** | 🔎 The LFT has no show-up-pay or predictability-pay regime akin to US CA/NYC rules. | — | — | — none identified in current research — |
| **No statutory split-shift premium** | 🔎 A jornada may be continuous or split by an intermediate rest period (§2/§4) without a separate split-shift premium in the LFT. | — | — | — none identified in current research — |
| **Digital-platform workers — >288h/year YTD counter** | Crossing **288 worked hours in the calendar year** triggers statutory-benefit eligibility (aguinaldo [year-end Christmas bonus], vacaciones, prima vacacional [vacation bonus], PTU [*Participación de los Trabajadores en las Utilidades*, profit-sharing]) — a **year-to-date hours counter**, distinct from the weekly OT band. | A platform worker who logs 300h by October crosses the 288h threshold and becomes eligible for the associated statutory benefits. | Income-threshold subordination test runs in parallel (§1). | LFT reform DOF 22-Jun-2025 🔎 |
| **Teletrabajo — right to disconnect bounds the schedule** | The disconnect right (§2) is the closest Mexican analog to a predictability/scheduling protection, applicable to telework only. | A remote worker's schedule effectively ends at the agreed hour, with no obligation to remain reachable after it. | — | [LFT Art. 330-E](https://leyes-mx.com/ley_federal_del_trabajo/330-e.htm) fr. VI 🔎 |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Vacaciones [paid annual leave] — anniversary-keyed ladder** | **12 working days** at year 1; **+2/year** to **20 days** at year 5; then **+2 days per completed 5-year block** (22 at yrs 6–10, 24 at 11–15, 26 at 16–20, 28 at 21–25…). Days are **working days**, net of rest days/holidays. | A worker at year 3 has 16 days; at year 7, 22 days. | Minors <18 get a **richer** floor — see below. | [LFT Art. 76](https://leyes-mx.com/ley_federal_del_trabajo/76.htm) (*Vacaciones Dignas* [Dignified Vacations reform], in force 1 Jan 2023) |
| **Vacation — vesting, splitting, granting window** | Vests on completing **1 full year**. **≥12 continuous days** must be granted; the remainder splits at the **worker's discretion**. Must be granted within **6 months** of the anniversary. **No cash substitution** while employed; **proportional payout** on termination. | A worker due 20 days may take 12 continuous + split the remaining 8 across the year, all within the 6-month grant window. | — | [LFT Art. 78](https://leyes-mx.com/ley_federal_del_trabajo/78.htm) · [Art. 79](https://leyes-mx.com/ley_federal_del_trabajo/79.htm) · [Art. 81](https://leyes-mx.com/ley_federal_del_trabajo/81.htm) 🔎 |
| **Minors <18 — richer vacation floor** | **≥18 working days/year** — nearly 1.5× the adult year-1 floor of 12. | A 17-year-old employee accrues 18 vacation days after their first year, vs 12 for an adult in the same year-1 slot. | — | [LFT Art. 179](https://leyes-mx.com/ley_federal_del_trabajo/179.htm) 🔎 |
| **Prima vacacional [vacation bonus]** | **≥25%** of the vacation-day wages — a money multiplier; the engine supplies only the day count and eligibility (downstream). | A worker paid for 12 vacation days also receives ≥25% of that vacation-day wage as prima vacacional. | — | [LFT Art. 80](https://leyes-mx.com/ley_federal_del_trabajo/80.htm) 🔎 |
| **Maternity leave** | **6 weeks pre + 6 weeks post-birth (84 days total)**; up to **4 pre-birth weeks transferable** to the post-birth period on medical authorization; **+8 additional weeks** for birth/pregnancy complications requiring disability/hospitalization. | A worker transfers 4 of her 6 pre-birth weeks to post-birth, taking 2 pre + 10 post. | *Instituto Mexicano del Seguro Social* [IMSS, Mexican Social Security Institute] pays maternity subsidy from day 1 (downstream money). | [LFT Art. 170](https://leyes-mx.com/ley_federal_del_trabajo/170.htm) fr. II |
| **Adoption leave** | **6 weeks** from placement of the child. | An adopting parent takes 6 weeks of paid leave starting the day the child is placed with them. | — | [LFT Art. 170](https://leyes-mx.com/ley_federal_del_trabajo/170.htm) fr. II Bis |
| **Breastfeeding — intraday reshaper** | **2 × 30-min breaks/day** OR a **1h reduced workday**, for up to **6 months** post-birth. | A returning mother works a 7h day instead of 8h for up to 6 months, or takes two 30-min breaks. | Worker's choice between the two structures. | [LFT Art. 170](https://leyes-mx.com/ley_federal_del_trabajo/170.htm) fr. IV |
| **Paternity leave** | **5 working days**, fully paid, **no seniority requirement**. | A father takes 5 paid working days off starting the day of the birth, regardless of tenure. | — | [LFT Art. 132](https://leyes-mx.com/ley_federal_del_trabajo/132.htm) fr. XXVII Bis 🔎 |
| **Incapacidad [medical/sickness leave]** | Duration per the **IMSS certificate** (in **calendar days**, including weekends/holidays). Employer/worker obligations **suspend** for the period. IMSS pays from **day 4** (general illness, **60% of SBC** [contribution-base wage], rising to **70%** from day 27); occupational-risk and maternity incapacidades pay from **day 1** at a higher rate (downstream money). | A worker's 10-calendar-day illness certificate suppresses the expected shift for all 10 days, including any weekend within it. | The first 3 days of general-illness incapacidad are an unpaid gap (neither IMSS nor, absent contract, the employer) — a scheduling/pay-continuity nuance to flag, not compute. | [LFT Art. 42](https://leyes-mx.com/ley_federal_del_trabajo/42.htm) fr. II; Ley del Seguro Social 🔎 |
| **Incapacidad counts toward seniority** | Time on incapacidad does **not** interrupt *antigüedad* [seniority] — it continues accruing for vacation tier, prima vacacional, and other seniority-keyed entitlements. | A worker on a 2-month incapacidad returns with seniority unaffected, as if the period were worked for tier purposes. | — | Ley del Seguro Social practice 🔎 |
| **Bereavement / marriage — not statutory** | 🔎 No statutory paid leave for bereavement or marriage — only where granted by contract or CCT. | — | Common CCT grants: 1–3 days for bereavement, 1 day for marriage. | — none identified in current research — |
| **OT/weekly-band interaction** | Leave/absence hours are **not effective work** and do **not** count toward the weekly OT band (§3). | A week with 2 days of incapacidad and 3 days worked computes the weekly OT band only against the 3 worked days. | — | [LFT Art. 67](https://leyes-mx.com/ley_federal_del_trabajo/67.htm)–[68](https://leyes-mx.com/ley_federal_del_trabajo/68.htm) (implied) |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Electronic timekeeping duty — from 1 Jan 2027** | Employers must keep **electronic records** of each worker's start/end times, available to labor authorities and carrying **full evidentiary weight** in disputes. An engine that captures every punch already satisfies this. | From 1 Jan 2027, an inspector may request a worker's electronic punch history as proof of hours in a dispute. | *Secretaría del Trabajo y Previsión Social* [STPS, federal labor ministry] implementing *reglamento* [implementing regulation] (exact fields/format) is **pending** — re-verify before any compliance-export feature. | [LFT Art. 132](https://leyes-mx.com/ley_federal_del_trabajo/132.htm) fr. XXXIV 🔎 |
| **Burden of proof shifts to the employer without records** | In a labor dispute, the employer bears the burden of proof on start date, seniority, absences, ordinary/extraordinary hours, rest-day and holiday pay, vacations, and salary. **Without attendance records**, the facts alleged by the worker are **presumed true**. | An employer with no punch records effectively loses an hours/OT dispute by default. | — | [LFT Art. 784](https://leyes-mx.com/ley_federal_del_trabajo/784.htm) 🔎 |
| **Document retention — 1 year** | Payroll lists, salary receipts, and attendance records (when kept at the workplace) must be conserved for the **last year worked + 1 year after** the employment relationship ends. Individual work contracts: for the entire relationship + 1 year after. | A worker who leaves the company in March 2026 must have their last year's payroll/attendance records kept on file until at least March 2027. | — | [LFT Art. 804](https://leyes-mx.com/ley_federal_del_trabajo/804.htm) 🔎 |
| **No statutory rounding/tolerance rule** | The LFT sets **no** minimum punch-tolerance or rounding rule; any grace period (commonly 10–15 min in practice) is a **company-internal policy** choice, not a legal requirement. Delays (*retardos*) alone are **not** a listed cause for lawful termination unless internal regulations equate repeated delays with absences. | — | — | (none statutory); [LFT Art. 47](https://leyes-mx.com/ley_federal_del_trabajo/47.htm) 🔎 |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/mexico.md` (June 2026 research) — primary LFT
  article citations, DOF decree references, and the pipeline-mapping analysis.
- **LFT primary text:** official PDF [diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf](http://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf);
  per-article deep-link mirror [leyes-mx.com/ley_federal_del_trabajo/&lt;n&gt;.htm](https://leyes-mx.com/ley_federal_del_trabajo/76.htm)
  (confirmed live, Art. 76 fetched 2026-07-21) — Arts. 9, 42, 47, 58–81, 132, 170, 173–180, 330-A–K,
  331–343, 386–403, 784, 804, 994.
- **40-hour reform (2026–2030 phase-in, OT re-cut):** Greenberg Traurig "Reforma a la LFT — Reducción
  Gradual de la Jornada Laboral"; Infobae (15 May 2026, turno nocturno); El Informador; El Imparcial;
  tress.com.mx; SDV Asesores Art. 66/173/175/177 compendia; tucalculadorasat.com horas extra 2026.
- **Digital-platform-workers reform (2025):** Xataka México; Tatem; Coparmex Jalisco; STPS FAQ
  (gob.mx); Justia México blog.
- **Teletrabajo / right to disconnect:** Expansión Política (5 Mar 2026); Justia México blog (20 Apr
  2026); Factorial.mx.
- **Domestic workers (Arts. 331–343):** Justia México; Infobae (Sep 2025 series).
- **Recordkeeping / burden of proof:** FiscoClic (demandas sin registro electrónico); IDC Online;
  vLex México; leyes-mx.com Art. 784/804.
- **Incapacidad / IMSS subsidy:** El Imparcial (Feb 2026); Fortia; elconta.mx; CalculoSeguro.mx;
  tucalculadorasat.com.
- **Minors (Arts. 173–180):** Justia México; SDV Asesores; Infobae (Sep 2025).

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

# Mexico — T&A compliance support

**Verdict: 🟠 Partial — a strong "premium-emission" fit (the IT/PL tier).** Mexico's defining OT
mechanic — **2× for the first 9 OT-hours in the week, 3× beyond** — maps cleanly onto our **tiered
rate-chaining (`phases[].limit`) driven off a weekly OT accumulator**, and the Sunday / rest-day /
holiday premiums fit our day-group rate rows. The gaps are the **shift-type-maxima validation**, the
**"base + 2× service" premium-*composition* mode** (so a rest-day/holiday hour isn't mis-modelled as a
flat 3×), the **consecutive-days / weekly-rest mechanic**, and the **anniversary-keyed vacaciones
ladder** — **none Critical, none High**: Mexico has no annualised/averaging pay-corrupting regime. Read
with the scope, verdict key, and **Basis key** in [`README.md`](./README.md). No verdict is DB-confirmed
this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). This is
> load-bearing for Mexico: the double→triple pivot keys off the **running *weekly* OT total** (9 OT-hours),
> not the daily distribution, so the whole 2×/3× band leans on a weekly accumulation window feeding the
> `phases[].limit` rate-chain. Scope is *the weekly trigger only* — it does **not** ship the shift-type-max
> validation, the composition mode, or the vacaciones counter (all still as marked).

**Legal source:** `worldwide-calculations/mexico.md` (June 2026 research, LFT-anchored). **⚠ Source note:**
the file is well-sourced but **mid-reform and time-sensitive** — the **40-hour reform** phases the weekly
cap **48 → 40 h across 2026–2030** (binding ceiling in mid-2026 is **still 48 h**), and the post-2028 OT
re-cut is flagged by sources as **not yet fully clear**; the LFT is **silent** on the OT-on-a-premium-day
interaction (practitioner convention = 3×/hr — a config decision, not statute). Those are 🔎, not asserted.
Model the weekly cap and OT thresholds as **date-effective parameters**, not constants.

## Rule-by-rule (Basis = where the verdict comes from)

| # | Mexico requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Ordinary workweek ceiling — 48 h (mid-2026), phasing to 40 h by 2030.** The max ordinary week (Art. 61 + transitorios); OT onset itself is anchored to the **daily** shift-type cap (#2), so 48 h is a parallel *legality ceiling* — breach → flag, hours still paid | Weekly accumulation window (S5, `[PO]`); breach flagging via alerts only (S13) | 🟠 Partial | [PO][API][ABS] | Weekly window exists (S5); as a **cap** it's **alert-only** — no limit-validation. Phase-in handled per #15 |
| 2 | **Three statutory shift types set the daily cap = daily OT onset — diurna 8 h · nocturna 7 h · mixta 7.5 h**, and a mixta whose night portion reaches **3.5 h reclassifies to nocturna** (7 h), silently moving where OT begins (Art. 60–61) | **OT onset = surplus above the PLANNED shift** (S4): set the planned shift to 8/7/7.5 and the daily surplus becomes OT | 🟡 Configurable | [API][UI]/[DES] | Per-type daily OT onset **works via the planned-shift baseline** (S4). The **fixed statutory max per type** as a validation ceiling (G1) and the **automatic 3.5 h night-portion reclassification** are `[DES]` — 🔎 |
| 3 | **OT pay band — first 9 OT-h *in the week* → 2× (dobles); beyond 9 h → 3× (triples).** The pivot is the **running weekly OT total**, not the daily distribution (Art. 67–68) | **Weekly OT trigger (S5) + tiered rate-chaining (S3, `phases[].limit`)**: 2× up to 9 OT-h, then 3× | 🟡 Configurable | [API][PO] | **The star fit** — two-phase rate table keyed to the weekly OT index. **🔎 confirm the phase boundary counts *weekly OT-hours* (9) and resets weekly** (G3), not daily |
| 4 | **OT legality cap — ≤ 3 h/day AND ≤ 3 days/week (⇒ 9 h/week).** Breach doesn't void pay (still owed at triple) but is unlawful to require → violation flag, not a silent cap (Art. 66) | Notifications & alerts levers exist (S13) | 🟠 Partial | [API][ABS] | **Alert-only** — no breach *validation/flag* (G4). **Pay stays correct**; the cap only gates legality |
| 5 | **Prima dominical — +25 % of the ordinary daily wage for *any* Sunday worked** (Art. 71), regardless of whether Sunday is the designated rest day; additive on the daily-wage base | A **Sunday** day-group rate row (S1) → typed Sunday premium event | 🟡 Configurable | [API][UI] | Rate rows carry a "Sunday" day-group. **🔎 confirm an *ordinary* (non-surplus) Sunday premium can be emitted** — our rate rows are OT-rate rows; the night-premium precedent (premium on in-window ordinary hours, independent of surplus, §4.1) suggests a parallel path — verify |
| 6 | **Séptimo día — 1 paid rest day per 6 worked; working it = triple.** Base day (1×) **+ 2× service** = effective 3×, *not* a flat 3×, so it composes correctly with prima dominical and partial days (Art. 69–73) | Rest-day classification (schedule) + a **DSR & Rest days** rate row (S1) | 🟠 Partial | [API][UI]/[DES] | Rest-day **generation** and the rest-day-worked **premium row** exist; the **"base + 2× service" additive composition** (vs flat 3×) is the composition axis (G6, `[DES]`) — the #1 Mexican underpayment error |
| 7 | **Días de descanso obligatorio (Art. 74) worked = triple** (base + 2× service), same structure as #6; the list has **floating Mondays** (Feb/Mar/Nov) + a **sexennial Oct 1** — hard-coding dates is wrong | Holiday calendar (S11, `SourceHoliday`) + a **Holidays** rate row (S1) | 🟠 Partial | [FLD][API]/[DES] | Calendar + worked-holiday premium row emit; **movable-Monday / sexennial-Oct-1 resolution** is a calendar-config detail (🔎), and the base+2×service composition = G6 (shares #6) |
| 8 | **Night premium (jornada nocturna window).** In-window worked hours carry a night uplift; separately totalled | `nightShift {%, start, end}` (S8) + per-row day/night split (S2) | ✅ Supported | [API][UI] | Emission ✅. The nocturna **7 h daily cap** is the shift-type norm (#2); the night **premium** is separate and shipped |
| 9 | **Weekly rest — 6 worked days + 1 rest (Art. 69); no undue consecutive-day stretch.** The rest-day generation + a consecutive-day guard | Rest-day generation at the schedule level; `workingDaysInARow` consecutive-day driver | 🟠 Partial | [FLD]/[DES] | Generation handled at schedule level (Existing); **consecutive-day breach flag via `workingDaysInARow`** is 🔎 (alert/schedule-level, not a standard breach validation) |
| 10 | **Premium composition — additive stacking.** Sunday (+0.25×) / rest-day (+2×) / holiday (+2×) are orthogonal dimensions that compose additively (rest day *on* a Sunday worked = **3.25×**); OT-on-a-premium-day is LFT-silent (practitioner 3×/hr) | Typed premium buckets emit per rate row (S1) | 🟠 Partial | [API]/[DES] | Buckets emit; the **additive-composition MODE** is G6 (`[DES]`). OT-on-premium-day = a **config knob**, not statute (🔎) |
| 11 | **Vacaciones ladder — 12 days at yr 1, +2/yr to 20 (yr 5), then +2 per 5-yr block; *working* days** (Art. 76, *Vacaciones Dignas* 2023). Prima vacacional ≥ 25 % is adjacent (downstream money) | — | ❌ Gap | [ABS] | **Anniversary-keyed step-function accrual counter** (working-days, ≥12-continuous constraint, 6-mo grant window, proration-on-termination) — a cross-run ledger we don't ship (G12). Prima vacacional % is downstream |
| 12 | **Record every worker's start/end times** — the electronic-timekeeping duty from **1 Jan 2027** (Art. 132 frac. XXXIV); full-proof weight in disputes | Engine records every punch (S15); approved-event locking | ✅ Supported | [FLD] | A **value-add** — capturing every punch already satisfies the duty (also pulls *confianza* hours into recorded territory). 🔎 exact STPS *reglamento* fields pending |
| 13 | **CCT (collective agreement) = its own arrangement.** A *Contrato Colectivo de Trabajo* can improve — never reduce — the LFT floor (richer OT/vacation/premiums, shorter jornadas) | One arrangement = one pay policy (S16) | ✅ Supported | [UI][DES] | Each CCT resolves to a **separate policy that replaces the floor for that group** (mapping not 1:1) — direct analog of FR CCN / DE Tarifvertrag |
| 14 | **Trabajadores de confianza are NOT overtime-exempt** (a common myth) — the 2×/3× entitlement still applies; only the *proof burden* shifts. Model as a worker attribute, keep them **inside** the OT pipeline | No exempt/non-exempt gate; `SourceUserProfile` *confianza* attribute (draft) | ✅ Supported | [DES] | **Correct-by-default**: with no exempt gate to wrongly apply, confianza stay in the hours/OT pipeline — the *inverse* of the US exempt-classification problem (a place the missing gate helps us) |
| 15 | **40-h reform is date-effective, not a flag flip** — weekly cap steps 48→46→44→42→40 (2026–2030) and OT thresholds shift with it; salaries/benefits may not be cut | Effective-dated policies (Start date + create-new-and-reassign) as a workaround; no year-keyed statutory parameters | 🟡 Configurable | [UI][DES] | Each phase modellable as a **new policy from its effective date** (policies are effective-dated + versioned-by-reassignment). **Native year-keyed jurisdiction parameters** are target — the cleanest Mexico flow-finding (🔎 post-2028 OT re-cut not yet clear in sources) |
| 16 | **Meal/rest break — ≥ 30 min in a continuous shift; counts as worked time if the worker can't leave the workplace** (Art. 63–64) | Break config on the schedule (mode, paid/unpaid, startAfter) | 🟡 Configurable | [DES] | Break duration + **paid/unpaid mode** cover "counts as worked if can't leave"; min-break *validation/flagging* unconfirmed |
| 17 | **Statutory leave reshapes the planned day** — maternity (84 d), paternity (5 d), adoption (6 wk), *incapacidad* (IMSS cert, calendar days), **breastfeeding** (1 h/day reduction) | `SourceRequest` types + `hoursCalculationType` (generic) | 🟠 Partial | [FLD][DES] | Generic request/absence handling exists; **Mexico-specific leave semantics + the breastfeeding *intraday* reshaper** aren't specifically modelled. Leave hours correctly **excluded** from the weekly OT band |
| 18 | **OT rate basis — ordinary hourly rate = daily wage ÷ shift-type hours (8/7/7.5 divisor).** A night worker's ordinary hour rides a 7-h divisor; the 2×/3× multipliers are uniform | Rate-base composition (`[DES]`) | — | [DES] | **Mostly downstream money** — the *time* layer (which hours are OT, at which tier) is #2–#3; the per-hour money base is a payroll concern (G11) |

## Summary — rule-by-rule (2026-07-19 pass)

Of the **17 scored rules** (#18 is downstream money): **4 ✅ · 5 🟡 · 7 🟠 · 1 ❌**. Mexico sits firmly in the
**premium-emission fit tier** — the hour mechanics (2×/3× weekly OT band, Sunday/rest/holiday premium
rows, night, CCT-as-policy, records) land, and the residual work is **composition + validation + one
leave ledger**, none of it pay-corrupting.

| # | Rule | Verdict | Why it's still open |
|---|---|---|---|
| 11 | Vacaciones ladder (12→20→+2/5yr) | ❌ Gap | No anniversary-keyed cross-run accrual counter |
| 1 | 48 h weekly ceiling (breach flag) | 🟠 Partial | Weekly window exists (S5); limit-validation is alert-only |
| 4 | OT legality cap (3 h/day, 3×/wk) | 🟠 Partial | Alert-only; no breach validation |
| 6 | Séptimo día — rest-day worked = base+2× | 🟠 Partial | "base + 2× service" composition mode is `[DES]` |
| 7 | Holiday worked = base+2× | 🟠 Partial | Same composition gap + movable-Monday resolution 🔎 |
| 9 | Weekly rest / consecutive days | 🟠 Partial | `workingDaysInARow` breach flag is on-demand, not standard |
| 10 | Additive premium composition | 🟠 Partial | Composition MODE (3.25× stacking) is `[DES]` |
| 17 | Mexico-specific leave semantics | 🟠 Partial | Generic request handling; breastfeeding intraday not modelled |
| 2 | Three shift types + 3.5 h reclassification | 🟡 Configurable | Daily onset works via planned shift; reclassification + max-validation `[DES]` |
| 3 | OT 2×/3× weekly band | 🟡 Configurable | Maps to S3+S5; 🔎 confirm weekly-OT reset |
| 5 | Prima dominical +25% | 🟡 Configurable | 🔎 confirm ordinary (non-surplus) Sunday premium emission |
| 15 | 40-h date-effective phase-in | 🟡 Configurable | Workaround via effective-dated policies; native year-keying is target |
| 16 | ≥30-min break | 🟡 Configurable | Configurable; min-break validation unconfirmed |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🟡 with 🔎):** the **mitigation** we can offer today, and —
> for gaps — **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) rows are omitted
> (they need no mitigation) — the 4 ✅ rows (#8 night, #12 records, #13 CCT, #14 confianza) + the downstream
> #18.
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped) · 🟡 Medium (moderately common, or a usable mitigation, or moderate build;
> typically validation/composition that doesn't corrupt pay) · 🟢 Low (narrow population, strong mitigation,
> or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Mexican market* a rule bites. **⚠ Customer-relative** — shifts with
>   the workforce: **6-day-week retail/manufacturing → #6 rest-day / #9 consecutive-days**; **Sunday-trading
>   retail/hospitality → #5 prima dominical**; **night-shift populations → #2 reclassification**.
> - **Build-effort** = my estimate, **grounded in mexico.md's pipeline-mapping table** (Existing/`[API]` ≈
>   config/small **S**; Future/composition/`[DES]` ≈ **M**; net-new cross-run subsystem ≈ **L**). **⚠ Calendar
>   time needs engineering validation.**

| Rule | Mitigation today | Prevalence (MX market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#2 Three shift types + 3.5 h reclassification** | **Partial** — set the planned shift to 8/7/7.5 and daily OT onset is correct; the auto-reclassification (mixta→nocturna at 3.5 h night) and per-type max-validation are the missing pieces | **Med-High** — nocturna/mixta populations | **M** — night-portion typing + a per-shift-type OT-threshold gate | 🟡 **Medium** |
| **#4 OT legality cap (3 h/day, 3×/wk)** | **Partial** — alert thresholds as manual monitoring; **pay stays correct** (still owed at triple) | **High** as a legal obligation (non-corrupting) | **S-M** — coupled daily + weekly-frequency breach flag | 🟡 **Medium** |
| **#5 Prima dominical (ordinary-hours emission)** | **Partial** — a Sunday rate row emits the premium; whether it fires on *ordinary* (non-surplus) Sunday hours vs OT-only is the open piece | **Med-High** — Sunday-trading sectors | **S** — likely reuses the night-premium "independent-of-surplus" path | 🟡 **Medium** / 🔎 Verify |
| **#6 Séptimo día composition (base + 2× service)** | **Partial** — a DSR/Rest-days rate row emits a premium; modelling it as base+2× (not flat 3×) so it composes with prima dominical needs the composition mode | **High** — 6-day-week workforces | **M** — additive premium-composition axis (shares #10) | 🟡 **Medium** |
| **#10 Additive premium composition mode** | **Partial** — typed buckets emit; the additive stacking (rest-day-on-Sunday = 3.25×) is `[DES]` | **Med-High** — any premium-day work | **M** — composition mode (underlies #6/#7 correctness) | 🟡 **Medium** |
| **#11 Vacaciones ladder** | **Partial** — vacation handled as absences; the 12→20→+2/5-yr **working-day accrual counter** (anniversary-keyed, step function) needs a leave module or manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **M** — anniversary-keyed cross-run accrual (same pattern as FR *congés* / DE *Urlaub*) | 🟡 **Medium** |
| **#17 Mexico leave semantics** | **Partial** — `SourceRequest` handles absences generically; the specific maternity/paternity/incapacidad semantics + breastfeeding intraday reshaper aren't modelled | **Med** — across the workforce | **M** — specific leave-type semantics on the existing request primitive | 🟡 **Medium** |
| **#1 48 h weekly ceiling** | **Partial** — S5 weekly window + alert thresholds as manual monitoring; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **S** — single-period threshold flag | 🟢 **Low** |
| **#3 OT 2×/3× weekly band** | **Strong** — S3 rate-chaining + S5 weekly trigger express the band today; residual is a **confirmation** that the phase boundary counts weekly OT-hours and resets weekly | **High** (any OT-using employer) | **S** — confirm/adjust the weekly reset on the phase counter | 🟢 **Low** / 🔎 Verify |
| **#7 Holiday worked composition + movable-Monday** | **Strong** — holiday calendar + Holidays rate row emit; composition shares #6, movable-Monday is a calendar-config detail | **Med** — ~7 holidays/yr | **S-M** — calendar resolution + shared composition | 🟢 **Low** |
| **#9 Weekly rest / consecutive days** | **Strong** — handled at schedule level; `workingDaysInARow` can drive a breach alert on demand | **High** as a legal obligation (non-corrupting) | **S** — formalize the on-demand flag into a standard alert | 🟢 **Low** |
| **#15 40-h date-effective phase-in** | **Strong** — model each phase as a new effective-dated policy + reassign; native year-keying is the roadmap nicety | **High** (every employer, but operationally managed) | **M** — year-keyed jurisdiction parameters | 🟢 **Low** / 🔎 Verify |
| **#16 ≥30-min break** | **Config** — break rules on the schedule (30 min, paid/unpaid); min-break *validation* is the open piece | **High** (all workers) | **S** — set a config value | 🟢 **Low** |

### Severity roll-up (2026-07-19 pass)
- **🔴 Critical (0):** none — Mexico has no annualised / averaging pay-corrupting regime; OT is a weekly-band
  premium that fits S3+S5, and confianza correctly stays in-pipeline.
- **🟠 High (0):** none — every gap is premium-*composition*, limit-*validation*, or a leave-accrual ledger,
  all non-corrupting to the computed hour pay and scoped.
- **🟡 Medium (7):** shift-type typing + 3.5 h reclassification (#2), OT legality cap (#4), prima dominical
  ordinary emission (#5, 🔎), séptimo día composition (#6), additive composition mode (#10), vacaciones
  ladder (#11), Mexico leave semantics (#17).
- **🟢 Low (6):** 48 h weekly ceiling (#1), OT 2×/3× band confirm (#3, 🔎), holiday composition (#7), weekly
  rest / consecutive days (#9), 40-h phase-in (#15, 🔎), break minimum (#16).

## The big gaps
1. **Premium-composition mode** (#6, #7, #10) — the **"base + 2× service" additive stacking** that makes a
   rest-day/holiday hour *effective 3×* (and 3.25× on a Sunday) without mis-modelling it as a flat 3×. Typed
   buckets emit today; the composition *mode* is `[DES]`. This is the highest-leverage Mexico build — it's
   the #1 Mexican underpayment error and it underlies three rules.
2. **Shift-type typing + 3.5 h reclassification** (#2) — the per-type daily cap works via the planned-shift
   baseline (S4), but the automatic mixta→nocturna reclassification and per-type max-validation are `[DES]`.
3. **Vacaciones accrual ledger** (#11) — anniversary-keyed, working-day, step-function cross-run counter.
4. **Limit-validation** (#1, #4, #9) — the 48 h ceiling, the 3 h/day-3×/week OT cap, consecutive-days: all
   **alert-only** today; we don't *flag* limit breaches (pay stays correct regardless).
5. **Date-effective 40-h phase-in** (#15) — year-keyed weekly cap + OT re-cut; workaround via effective-dated
   policies exists, native year-keying is the roadmap candidate.

## Where Mexico scores well (worth saying)
- **The 2×/3× weekly OT band** (#3) — the standout fit: **S3 tiered rate-chaining (`phases[].limit`) keyed to
  a weekly OT accumulator (S5)** expresses "first 9 OT-h double, beyond triple" directly `[API][PO]`. The
  boundary sits at **9 OT-hours**, not a 40/48-hour total — the one thing to confirm is the weekly reset.
- **Premium *emission*** (#5, #6, #7, #8) — Sunday / rest-day / holiday / night premiums all emit as typed
  events off day-group rate rows + the night window `[API][UI]`. (The *composition* mode is the gap, not the
  emission.)
- **CCT-as-separate-policy** (#13) — one arrangement = one pay policy matches Mexico's CCT model exactly `[UI][DES]`.
- **Confianza stays in-pipeline** (#14) — the *absence* of an exempt gate is a **feature** here: confianza
  workers keep their 2×/3× entitlement by default, the correct LFT posture (contrast the US exempt-gate risk).
- **Records-all-hours** (#12) — captures every punch, already satisfying the 2027 electronic-timekeeping duty `[FLD]`.
- **Holiday calendar + rest-day generation** (#7, #9) — `SourceHoliday` + schedule-level rest-day classification
  are Existing paths.

## 🔎 Verify before telling the customer
- **Weekly OT band reset** (#3): confirm the `phases[].limit` boundary counts **weekly OT-hours (9)** and
  **resets weekly** — not a daily or total-hours threshold. Weekly OT itself is `[PO]`, not yet `[API]/[UI]`-visible.
- **Prima dominical on ordinary hours** (#5): our rate rows are OT-rate rows — confirm an *ordinary*
  (non-surplus) Sunday premium can be emitted (the night-premium "independent-of-surplus" path suggests yes).
- **3.5 h night-portion reclassification** (#2): whether mixta→nocturna typing is automatic or manual.
- **`workingDaysInARow`** (#9): can it drive a standard consecutive-days breach flag, not just an on-demand one?
- **Date-effective parameters** (#15): confirm the effective-dated-policy workaround is acceptable, and note
  the **post-2028 OT re-cut is not yet clear in sources** — re-verify against the DOF text + STPS *reglamento*.
- **STPS *reglamento*** (#12): exact electronic-record fields/format pending — re-verify before any compliance-export feature.

## Bottom line for the customer
With **weekly overtime now supported**, we can compute Mexico's defining OT mechanic — the **2× / 3× weekly
band** — plus the Sunday, rest-day, holiday and night premiums, the CCT-as-policy model, and full punch
records (satisfying the 2027 timekeeping duty). The remaining gaps are the **"base + 2× service" premium-
composition mode** (so rest-day/holiday work stacks to the correct 3× / 3.25% — the highest-leverage build),
the **shift-type reclassification**, the **vacaciones accrual ladder**, and **limit-validation** for the 48 h
week and the 3 h/day-3×/week OT ceiling — none of which corrupts the computed hour pay, and each with a usable
mitigation or workaround. Honest status: **partial, no Critical/High gaps; the standard case is servable, and
the biggest lever is premium composition, not the OT trigger.**
