# Portugal — T&A requirements

> **What this is.** The ground-truth reference for Portugal's time-&-attendance legal requirements,
> detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive** and **atomic**:
> **one legal proposition per row**, each row self-contained (no "see §X" as the only content), with
> exact values, a worked example wherever a number is involved, variants, and a `Basis` that **links
> to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, €, tax, gross-to-net) is downstream *context* here
> (kept in `Values` so a policy can be configured; the deliverable is the typed hour/day event).
> **Portuguese-term convention:** every non-English term is glossed in English in brackets on first
> use, e.g. *trabalho suplementar* [overtime].
>
> **Legal sources & links:** the **Código do Trabalho** [Labour Code] (Lei n.º 7/2009), consolidated
> text at pgdlisboa.pt (`nid=1047`) — `CT Art. X` links resolve there; amendment laws (Lei n.º
> 13/2023, Lei n.º 93/2019) link to their diariodarepublica.pt publication page; ACT
> (Autoridade para as Condições do Trabalho) and Segurança Social pages for enforcement/benefits
> matters. Seeded from repo research `context/worldwide-calculations/portugal.md` (2026-07,
> statute-article-level) + the predecessor `support-memos/portugal.md` verdict memo + fresh web
> research (2026-07-21) on bereavement/marriage leave (Art. 251), minors' regime, part-time
> conditions (Art. 150–155), mandatory continuous training (Art. 131–134), and the **Trabalho XXI**
> reform's parliamentary outcome. Full list at the foot of the requirements section. 🔎 marks a
> figure or a deep link not independently re-verified this pass.
>
> **The one structural fact to hold onto.** Unlike an award-set country, Portugal's operative
> numbers sit **in the statute itself, not in a collective layer above it.** Portugal is a
> **statutory-premium country** — unlike Germany or the Netherlands, the **Código do Trabalho**
> [Labour Code] (Lei n.º 7/2009) *prices* overtime, night, and rest-day/holiday work directly in the
> statute (25/37.5/50/75/100%), and layers a **stateful annual 100-hour doubling counter** on top
> (Lei n.º 13/2023). An **IRCT** [instrumento de regulamentação coletiva de trabalho — collective
> agreement or equivalent] can adjust the statutory numbers — unusually, **in either direction**
> (Art. 268 §3) — so a configured IRCT table overrides the statutory default where one exists;
> absent an IRCT, the Code's own numbers apply directly. Each IRCT/company-agreement arrangement is
> modelled as its own pay policy (§1).

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statute prices premiums directly** | Código do Trabalho (Lei n.º 7/2009) sets **binding default rates** for overtime (25/37.5/50/75/100%), night (25%), and rest-day/holiday work — unlike Germany's limits-only posture. Absent an IRCT, these numbers apply as-is. | A silent-contract employer owes the full statutory +25%/+37.5% ordinary-day OT tiers with no CBA needed. | — | [Código do Trabalho (CT) Art. 268](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **IRCT [collective agreement] — one arrangement = one pay policy** | Each IRCT (sector/company *convenção coletiva* [collective bargaining agreement], extension ordinance, or company agreement) can set its own working-time regime, premiums, and — unusually — **depart from the statutory OT-rate table in either direction** (Art. 268 §3), not only improve it. Model each arrangement as a separate pay policy. | A sector IRCT sets ordinary-day OT at a flat 30% instead of the 25%/37.5% statutory tiers — that arrangement's own policy carries the flat rate. | 🔎 confirm current case law on "in pejus" (below-statute) departures before treating a sub-statutory IRCT rate as automatically valid. | [CT Art. 268 §3](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Employment-contract scope** | Applies to workers under a *contrato de trabalho* [subordinate employment contract]. **Independent workers** (*trabalhadores independentes* [independent workers], "recibos verdes" [green receipts, the freelance invoicing scheme]) are wholly outside the working-time/overtime/rest chapters. | A freelance "recibos verdes" contractor has no engine working-time policy at all. | — | [CT (general scope)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Managerial/autonomous-decision — daily-rest exemption only** | Workers in management/direction posts, or with autonomous decision-making power, plus specified continuity-of-service/force-majeure/fractioned-schedule cases, are **exempt from the 11h daily-rest guarantee** (§4) — a narrower carve-out than a blanket OT exemption. | A department head's shift may end and restart with <11h between, lawfully. | Distinct from *isenção de horário* (next row), which is broader. | [CT Art. 214 §2](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Isenção de horário de trabalho [exemption from work schedule] — 3 modalities** | Written agreement (copy to ACT [labour inspectorate]), available to management/confidence/inspection roles, work performable only outside normal-schedule limits, or **telework** without immediate hierarchical oversight. **(a) Non-subjection to maximum limits** → OT **never** owed. **(b) Agreed increase** of the normal period → OT owed only beyond the agreed increase. **(c) Flexible timing, same total hours** → ordinary OT rules apply in full. | A manager under modality (a) is called in at 22:00 with no OT premium ever due; a modality (c) worker doing the same is paid ordinary OT. | Regardless of modality, daily rest (subject to §1's separate exemption), weekly rest, and mandatory holidays keep binding — *isenção* never waives those. | [CT Art. 218–219](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Part-time regime (Art. 150–155)** | A part-time contract sets its own normal period (< the comparable full-time norm); part-timer OT is measured against **their own contractual hours**, and they get equal-treatment pro-rated benefits. Conversion to/from full-time is by written agreement. | A 20h/week part-timer working 25h has 5 additional hours from the 21st — not from a 40h line. | — | [CT Art. 150–155](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Young/protected-worker OT dispensation (Art. 227)** | Workers **under 18**, working students, employees with disability/chronic illness, parents of a child **under 1**, and pregnant/breastfeeding workers may **request** dispensation from overtime — the employer must grant it on an active request (not automatic). | A breastfeeding worker submits a written OT-dispensation request; the employer must honour it. | Request-gated, not a blanket auto-suppression. | [CT Art. 227](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Minors (<18) — protective regime** | Minimum working age generally **16**; 14–15 permitted only in cultural/artistic/sports roles under specific conditions. Minors may **never** work overtime; night work banned (values in §4/§5); tighter rest (§4). Admission requires completed compulsory schooling or concurrent secondary/vocational enrolment. | A 17-year-old apprentice cannot be rostered for OT under any circumstance, unlike an adult under modality (b)/(c) isenção. | — | [CT Art. 60–76](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis)(youth-work chapter) |
| **⚠ Trabalho XXI — labour-law reform, REJECTED June 2026** | The government's reform bill (Proposta de Lei n.º 77/XVII, approved in Council of Ministers 14 May 2026) proposed reviving an individual-style **"banco de horas por acordo"** [hours bank by individual agreement] (2h/day, 150h/year, 6-month use-or-pay-out-at-+25% window) plus parentalidade/dismissal/strike/telework changes. **Voted down in Parliament in June 2026** (Chega joined PS/Livre/PCP/BE/PAN/JPP against; only PSD/CDS/IL in favour) after a CGTP/UGT general strike. **Not law — do not model any of its provisions as current.** | Had it passed, a worker could have individually agreed to bank 2h/day up to 150h/year, cashed out at +25% if unused after 6 months — this never took legal effect, so no such event should ever be typed. | — | [Proposta de Lei 77/XVII](https://www.parlamento.pt) 🔎; parliamentary vote June 2026 |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Normal working period (PNT) — the baseline** | **8h/day, 40h/week** (*período normal de trabalho*) — the floor the engine measures overtime against before any flexibility regime is layered on. | A worker with no special regime crossing 8h on a Tuesday starts accruing *trabalho suplementar* [overtime] from hour 9. | Flexibility regimes in §3d redistribute (not reduce) this baseline. | [CT Art. 203](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **What counts as working time** | Time the worker is at the employer's disposal performing or ready to perform activity counts as working time; standby *at the workplace* counts in full (§8), pure availability from elsewhere does not until activated. | — | — | [CT Art. 197–201](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis)(general) |
| **Missing time / missing day** | Standard engine semantics: worked < scheduled (≥1 punch) → `MISSING_HOURS`; scheduled day with zero punches → `MISSING_DAY`. | A worker scheduled 8h clocks only 6h → 2h `MISSING_HOURS`. | — | (engine semantics, not a CT-specific rule) |

## 3. Overtime

*Portugal prices overtime directly in statute (Art. 268) — both onset and rate are statutory defaults, IRCT-adjustable in either direction (§1).*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Trabalho suplementar [overtime] — beyond the applicable schedule** | OT = work beyond the **normal period applicable to that worker** (baseline 8h/40h, or whatever flexibility regime from §3d redistributes it to). Workers are generally **obliged** to perform OT when requested, subject to the §1 dispensation categories. | A worker under *adaptabilidade* [averaging regime] scheduled to 10h on a given day only starts OT past that 10h, not past 8h. | Isenção modality (a) → never triggers OT (§1). | [CT Art. 226–227](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Part-time onset = contractual hours** | OT for part-timers starts above their own **contract** hours, not the full-time 40h line. | 20h contract, works 25h → 5 OT hours from the 21st. | — | [CT Art. 150 ff.](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Ordinary-day OT tiering, ≤100h/yr band** | **+25%** for the **1st overtime hour**, **+37.5%** for **subsequent hours**, on an ordinary working day, basis = worker's own hourly wage. | A worker with <100h YTD OT works 3 extra hours on a Tuesday: 1st hour `OT_ORD_25` (+25%), 2nd–3rd hours `OT_ORD_37_5` (+37.5% each). | IRCT may set different values in either direction (Art. 268 §3). | [CT Art. 268](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Rest-day/holiday OT — flat rate, ≤100h/yr band** | **+50%** flat, regardless of 1st-vs-subsequent hour, for OT on a weekly rest day (obrigatório or complementar, §6) or a public holiday. | 3 hours worked on a Sunday (mandatory rest day): all 3 hours at `OT_REST_50` (+50%), no tiering. | — | [CT Art. 268](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **>100h/year band — everything doubles** | Once the worker's **cumulative OT for the calendar year exceeds 100h**, every rate above **doubles**: ordinary-day 1st hour → **+50%**, subsequent → **+75%**; rest-day/holiday → **+100%** flat. | Same worker crosses 100h YTD mid-shift: the 101st hour re-bands to `OT_ORD_50`/`OT_ORD_75` (ordinary day) or `OT_REST_100` (rest day/holiday) going forward — already-paid hours before the crossing are **not** restated. | Reinstated by **Lei n.º 13/2023** (reversing the 2012 austerity halving, Lei 23/2012); **any pre-2023 source citing flat non-doubling rates is obsolete.** | [CT Art. 268](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) (as amended by [Lei 13/2023](https://diariodarepublica.pt/dr/detalhe/lei/13-2023-211340863)) |
| **Basis — always the worker's own wage** | No minimum-wage-basis premium (contrast Poland's night premium). Night and OT premiums share the same basis and are simply additive on a night-OT hour. | A night OT hour: base + OT premium + 25% night premium, all off the same hourly wage. | — | [CT Art. 268](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily OT cap — 2h on an ordinary working day** | **≤2h/day** OT on an ordinary working day; up to a **full normal daily period** on a weekly rest day or holiday; up to **half** the normal daily period on a half-day of complementary rest. Breach should flag, not silently cap. | A worker asked to do 3 OT hours on a normal Tuesday breaches the 2h cap on the 3rd hour. | — | [CT Art. 228 §1](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **The 100-hour annual doubling counter** | A **running per-worker annual OT-hours counter**, reset each calendar year, that determines the ≤100h vs. >100h band (§3b) — **stateful**, not a one-time threshold check; re-bands every subsequent OT hour and can split **mid-block** within a single overtime episode. | Worker at 99h YTD works a 3h OT block: hour 1 (99→100) still closes at the ≤100h band; hours 2–3 (100→102) type at the >100h band. | — | [CT Art. 268](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis); [Lei 13/2023](https://diariodarepublica.pt/dr/detalhe/lei/13-2023-211340863) |
| **Annual OT cap — by enterprise size** | **175h/year** (micro/small enterprises) · **150h/year** (medium/large) · **80h/year or pro-rata** (part-time workers, whichever is greater). IRCT may **raise any of these to 200h/year**. | A medium-enterprise worker who has logged 150h of OT this year should not be assigned further OT hours without an IRCT-raised cap. | IRCT-raisable to 200h. | [CT Art. 228 §2](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Adaptabilidade [schedule-averaging regimes] redistribute the OT baseline** | Several regimes redistribute (not reduce) the 8h/40h norm across days/weeks, so OT is measured against the **redistributed** norm, not the flat baseline: **coletiva** [collective, via IRCT] — daily +4h (≤12h/day), weekly ≤60h; **individual** [written individual agreement] — daily +2h, weekly ≤50h; **grupal** [group, IRCT + ≥60% union coverage] — daily +4h (≤12h/day), weekly ≤60h, average ≤50h over a 2-month window 🔎. | A worker on *adaptabilidade coletiva* scheduled to 11h on a peak day owes OT only past 11h that day, provided the pattern averages back down within the regime's reference period. | Regimes are not mutually exclusive with *banco de horas* (§7) under the same IRCT's different clauses. | [CT Art. 204–206](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Horário concentrado [compressed week]** | Same weekly total compressed into fewer days: **≤4 days** (individual agreement) or **≤3 consecutive days + ≥2 rest days** (IRCT), daily +4h. OT is measured against the compressed daily norm. | A worker on a 3-day/week IRCT-compressed schedule works 12h/day with no OT until beyond that 12h. | — | [CT Art. 209](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Banco de horas as an OT-suppression alternative** | Where *banco de horas* [hours bank, §7] is elected, surplus hours route to the bank (`BANKED_HOURS_PT`) instead of being typed as cash `OT_*` — OT typing resumes only for hours that expire uncompensated. | 5 surplus hours banked instead of paid as OT; only an unspent balance at cycle close converts to cash OT (`EXTRA_HOURS_PT`). | — | [CT Art. 208, 208-A/208-B](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night + OT — additive, same basis** | A night hour that is also an OT hour carries **both** the OT premium (§3b) and the +25% night premium (§5), additively, on the same own-wage basis — unlike Poland's two-basis split. | A night OT hour at ≤100h YTD: base + 25% (OT, 1st hour) + 25% (night) = +50% total. | — | [CT Art. 266, 268](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Comp rest — additive to the cash premium** | *Descanso compensatório* [compensatory rest, §7] is **additive to**, not a substitute for, the cash OT premium — unless an IRCT elects the trade-off (Art. 229 §5). | An OT hour earns both its cash premium **and** feeds the comp-rest ledger, unless the IRCT swaps one for the other. | IRCT may substitute an equivalent working-time reduction, cash, or a combination. | [CT Art. 229 §5](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **IRCT departure — either direction** | An IRCT may **replace** the entire statutory Art. 268 rate table (§3b) with its own numbers, in principle in either direction — unusual among statutory-premium countries. | A configured IRCT rate table overrides the statutory grid wholesale for that policy. | 🔎 flag below-statute ("in pejus") departures for legal review — unsettled case law. | [CT Art. 268 §3](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily rest — ≥11h** | **≥11 consecutive hours** between two working days. | Shift ends 22:00 → next start no earlier than 09:00. | **Exempt:** management/autonomous-decision workers, force-majeure OT, fractioned schedules, continuity-of-service activities (§1). | [CT Art. 214](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Weekly rest — obrigatório [mandatory] ≥1 day (default Sunday)** | **≥1 day/week**, defaulting to **Sunday**, displaceable by activity type (continuous-operation, shift work, vigilance/cleaning, retail/fairs). | A retail worker's mandatory rest day may be reassigned to a weekday under the activity-type carve-out. | Displaceable per sector, but always ≥1 day/week. | [CT Art. 232](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Weekly rest — complementar [complementary] (typically Saturday)** | An **additional** rest period, continuous or discontinuous — **only exists where an IRCT or the employment contract institutes it**; **not** a bare statutory floor the way the obrigatório day is. | A company with no IRCT/contract clause has **no** guaranteed Saturday rest — do not assume a two-day weekend by default. | Common where IRCT/contract grants it (the familiar two-day weekend). | [CT Art. 232](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Cumulation of daily + weekly rest** | Where weekly rest immediately precedes/follows a daily-rest period, they **combine into one continuous rest block** for compliance-counting. | A Saturday-evening-to-Monday-morning span counts as one continuous rest period, not two. | — | [CT Art. 233](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Intra-day break — 1–2h, positioned at 5h/6h** | The working day must be interrupted by a break of **≥1h and ≤2h**, positioned so the worker does not work more than **5 consecutive hours** (or **6h** if the shift exceeds 10h). | An 11h shift needs a 1–2h break inserted by hour 6 at the latest. | IRCT may allow up to 6 consecutive hours and may reduce, exclude, extend, or multiply the break. | [CT Art. 213](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Reference-period averaging — ≤48h/week including OT** | Working time is measured against a **reference period**: IRCT-set (max **12 months**), or absent IRCT provision, **4 months** (extendable to **6 months** in specified cases). Within it, **average weekly hours incl. OT must stay ≤48h** — a rolling ceiling independent of any adaptabilidade/banco-de-horas redistribution. | Five 11h days (55h) in a peak week are lawful only if lighter weeks pull the reference-period average to ≤48h. | Default 4 months; up to 6 in special cases; up to 12 via IRCT. | [CT Art. 203](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis)(ref. period) |
| **Minors — daily rest 14h (<16) / 12h (16–17)** | *Menor* [minor] under 16: **≥14h** daily rest; 16–17: **≥12h**. | A 16-year-old's shift ending 20:00 cannot restart before 08:00. | Tighter than the adult 11h floor. | [CT Art. 60–76](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis)(youth chapter) |
| **Minors — weekly rest, reducible to 36h or 1 day** | For 16–17s, weekly rest may be **reduced to 36h**, or to **1 day**, for technical/organisational reasons (IRCT) or in named sectors (maritime commerce, hospitals, agriculture, tourism, hospitality, restaurants) — with **compensatory rest of an equivalent period within the following 3 weeks**. | A 17-year-old hospitality worker's reduced weekly rest is made up within 3 weeks. | Sector-scoped carve-out. | [CT Art. 60–76](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis)(youth chapter) |
| **Minors — no overtime, ever** | Minors **may never work overtime**, under any circumstance or regime. | A 17-year-old cannot be assigned OT even under an adult IRCT that allows it. | — | [CT Art. 60–76](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis)(youth chapter) |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night window** | **22:00–07:00** the following day (default), IRCT-overridable. | A shift 21:00–06:00 has its 22:00–06:00 portion tagged as night hours. | IRCT may redefine the window. | [CT Art. 223](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Trabalhador noturno [night worker] — status test** | A worker who normally performs **≥3h** of daily work within the night window, or whose annual working time falls ≥3h/day-equivalent (or an IRCT-defined threshold) within it. | A rotating-shift worker regularly on 23:00–07:00 (4h night) qualifies as a night worker. | IRCT may set a different qualifying threshold. | [CT Art. 224](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Night worker — 8h/day cap, weekly average** | A night worker's normal daily working period under a variable-schedule regime must not exceed **8h as a weekly average**; mandatory/complementary rest days and holidays are excluded from the averaging denominator. | A night worker averaging 8.5h/day across a week (excluding rest days) breaches the cap. | — | [CT Art. 224](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Night premium** | **+25%**, on the worker's own hourly wage (not minimum-wage-based, unlike Poland). | A night hour: base + 25%. | IRCT may replace with an equivalent working-time reduction or a fixed base-pay increase, provided the worker is not left worse off; intrinsically-nocturnal activities (shows, events) may be carved out by IRCT. | [CT Art. 266](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Minors — night ban** | Under-16: banned **20:00–07:00**. 16–17: banned **22:00–07:00**. | A 16-year-old shop worker must finish by 22:00, a 15-year-old by 20:00. | Narrow exceptions for cultural/artistic/sports/advertising activities, with compensatory rest and adult supervision. | [CT Art. 60–76](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis)(youth chapter) |
| **Subsídio de turno [shift allowance]** | **Not statutory** — Portugal prices night and OT/rest-day work directly but not "shift work" as its own category; any differential is IRCT/contract-driven. | — | Common in manufacturing/continuous operations by IRCT. | IRCT/contract |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Feriados [public holidays] — 13 mandatory + 1 optional** | **13 mandatory** national holidays (Ano Novo [New Year's Day] 1 Jan; Sexta-feira Santa [Good Friday]; Páscoa [Easter Sunday]; Dia da Liberdade [Freedom Day] 25 Apr; Dia do Trabalhador [Labour Day] 1 May; Corpo de Deus [Corpus Christi, 60 days after Easter]; Dia de Portugal [Portugal Day] 10 Jun; Assunção [Assumption Day] 15 Aug; Implantação da República [Republic Day] 5 Oct; Todos os Santos [All Saints' Day] 1 Nov; Restauração da Independência [Restoration of Independence Day] 1 Dec; Imaculada Conceição [Immaculate Conception] 8 Dec; Natal [Christmas] 25 Dec) + **Carnaval** [Carnival/Shrove Tuesday] (facultativo [optional], employer/IRCT discretion) + **municipal holidays** per locality. | Good Friday, Easter Sunday, and Corpus Christi shift annually — computed off the Easter computus, not a static date table. | Carnaval defaults **off** unless employer/IRCT grants it (common as *tolerância de ponto* [time-clock tolerance, a de facto day off] in the public sector). | [CT (public-holiday chapter)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis); municipal ordinances |
| **Holiday-work premium — same band as rest-day OT** | Work on a mandatory holiday follows the **same premium band** as §3b's rest-day OT: **+50%** (≤100h/yr) / **+100%** (>100h/yr), flat. | A holiday hour at 105h YTD OT: `OT_REST_100` (+100%). | — | [CT Art. 268](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Holiday-work comp-rest — same as complementary-rest-day treatment** | Holiday OT earns the **25%-accrual** comp-rest (90-day expiry) — **unless** it also falls on the mandatory weekly rest day, in which case the **full-day** rule applies (§7). | A worked national holiday that isn't also the mandatory rest day earns 25%-of-hours comp rest. | — | [CT Art. 229](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Weekly-rest-day worked — obrigatório vs. complementar split (comp-rest only)** | The obrigatório/complementar distinction does **not** change the §3b **cash** premium (both are "weekly rest day," same rate) but **does** change the **comp-rest** rule: obrigatório-day OT → full paid day (3-business-day window); complementar-day OT → 25% accrual, same as an ordinary day. | Sunday (obrigatório) OT → full comp day; Saturday (complementar, if IRCT-granted) OT → 25% accrual only. | Classifying which day is which is the load-bearing configuration point. | [CT Art. 229, 232](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Banco de horas [hours bank] — grupal [group]** | **+2h/day, +50h/week, +150h/year** cap. Trigger: IRCT applied to a team, **or** a workforce referendum with **≥65% approval**. | A team votes 70% in favour; surplus hours bank up to the 150h/year ceiling. | — | [CT Art. 208-B](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) (added by [Lei 93/2019](https://diariodarepublica.pt/dr/detalhe/lei/93-2019-125148568) 🔎) |
| **Banco de horas — coletivo [collective]** | **+4h/day (≤12h/day), ≤60h/week, +200h/year** cap. Trigger: pure IRCT, no referendum needed. | An IRCT-covered plant banks up to 200h/year without a workforce vote. | — | [CT Art. 208](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Banco de horas — individual: ABOLISHED** | **No individual banco de horas exists** since **Lei n.º 93/2019** (effective 1 Oct 2019; transitional regimes expired 30 Sep 2020). Only *grupal* and *coletivo* survive. | A single-worker banco-de-horas agreement signed today would have no legal basis. | Trabalho XXI proposed reviving an individual-style "banco de horas por acordo" — **rejected by Parliament June 2026** (§1) — do not build. | [Lei 93/2019](https://diariodarepublica.pt/dr/detalhe/lei/93-2019-125148568) 🔎 Art. 10 |
| **Compensation methods** | Banked surplus offset via **(a)** an equivalent working-time reduction, **(b)** conversion into extra vacation days, or **(c)**, in defined cases, monetary payment. | A worker draws down 10 banked hours as a half-day off (method a). | — | [CT Art. 208](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Expiry — 12-month reference period, uncompensated → cash OT** | Hours must be compensated within the applicable reference period (statutory ceiling **12 months**); **uncompensated hours convert to ordinary OT pay** at period/contract end. Former employees have a **1-year** limitation period to claim outstanding banked-hours payment post-termination. | A worker leaves with a 20h unspent bank balance → paid as OT at termination. | Mirrors the engine's fixed cyclical-BH expiry rule (positive balance → EH conversion). | [CT Art. 208](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Banked hours are neutral while banked** | Hours routed into the bank are `BANKED_HOURS_PT` neutral ledger movements, **not** `OT_*` cash-typed events, until they expire uncompensated. | 5 surplus hours banked show as a ledger movement, not as an OT payroll event, until cycle close. | — | [CT Art. 208](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Descanso compensatório [compensatory rest for OT] — 25% accrual** | OT on a **normal working day, complementary rest day, or holiday** → paid comp rest = **25% of the OT hours performed**, accrued until a full normal daily period, taken within **90 days**. | 8h of such OT across a month accrues 2h of comp rest, taken within 90 days. | IRCT may replace with an equivalent working-time reduction, cash, or a combination (Art. 229 §5). | [CT Art. 229](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Descanso compensatório — full day for mandatory-rest-day OT** | OT on the **mandatory weekly rest day** → a **full paid day** of comp rest, taken within the **3 following business days**. | OT worked on a mandatory Sunday earns a full day off, scheduled by the following Wednesday. | Scheduling chosen by the worker unless it significantly harms the employer's organisation. | [CT Art. 229](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Regime de disponibilidade (prevenção) [on-call/standby]** | Worker remains available outside normal hours, ready to respond, without necessarily being at the workplace. **Not automatically working time** while merely on standby. Requires a **written agreement**, terminable by the worker with **30 days' notice**. | A technician on weekend standby is not paid working-time rates unless called out. | — | [CT (standby chapter)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Standby-period compensation** | The availability period itself is paid at **50%** of the amount due for equivalent time under normal on-premises conditions — a factual marker; the actual money computation is downstream. | A standby night is flagged with the 50%-equivalent marker even with no call-out. | — | [CT (standby chapter)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Call-out time = worked/OT** | Time **actually worked** during a call-out is ordinary working time, and may itself trigger OT typing per §3. | A 2am call-out lasting 40min types as `WORKED_HOURS`/OT per the normal rules. | — | [CT (standby chapter)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up pay** | Portugal has **no** statutory reporting-time, call-in, or predictability-pay regime (unlike US CA/NYC). | — | — | — none identified in current research — |
| **Isenção de horário — scheduling consequence (cross-ref §1)** | The 3 modalities (a/b/c) don't just gate OT pay (§3a) — they define the **scheduling regime** itself: (a) call-anytime, (b) fixed extra allowance built into the schedule, (c) flexible timing at the worker's choice, same total hours. | A modality (c) worker can start at 07:00 or 10:00 at will, provided the daily/weekly total is met. | — | [CT Art. 218–219](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Horário concentrado [compressed schedule]** | Same weekly total compressed into **≤4 days** (individual) or **≤3 consecutive days + ≥2 rest days** (IRCT). | A 4-day, 10h/day compressed schedule replaces a standard 5×8h week. | — | [CT Art. 209](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Subsídio de turno [shift allowance] — not statutory** | Any shift-differential premium is IRCT/contract-driven; the Code prices night and OT/rest-day work but not "shift work" as its own category. | — | Common in continuous-operation IRCTs. | IRCT/contract |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Férias [annual leave] — 22 working days, day-one vesting** | **22 working days** (*dias úteis*, Mon–Fri excl. holidays) per year, vesting **1 January**, day-one right. | A worker who joins on 1 Jan already has the full 22-day entitlement for that year (subject to the first-year sub-ladder below if hired mid-year). | — | [CT Art. 238](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **First-year sub-ladder** | **2 working days per complete month worked**, up to **20 days** max, in the **hiring year**; usable only after **6 complete months** of employment (unless otherwise agreed). | Hired 1 Sep → by year-end: 4 months × 2d = 8 days, usable from 1 Mar the following year (6-month gate). | — | [CT Art. 239](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Prémio de assiduidade [attendance bonus] — IRCT-conditional, not statutory** | **1–3 extra vacation days**, where an IRCT/company agreement grants it, for full attendance (excluding justified absences like sick/maternity leave). A justified absence doesn't reduce the base 22 days but may condition access to these bonus days. | An IRCT-covered worker with zero unjustified absences gets 2 extra days per the sector agreement. | ⚠ Trabalho XXI floated a **statutory** 3-day version — rejected June 2026; not current (§1). | IRCT/company agreement |
| **Marriage leave** | **15 consecutive days** (11 working days), fully paid, no salary deduction. | An employee marries and takes the 15-day licença without pay loss. | — | [CT Art. 249](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis)(justified absences) |
| **Bereavement leave (faltas por falecimento)** | **20 days** — death of child/stepchild/son- or daughter-in-law; **5 days** — death of spouse/de facto partner, or of parents/parents-in-law; **2 days** — death of siblings/brothers- or sisters-in-law, grandparents, great-grandparents, grandchildren, or great-grandchildren. No salary deduction (incl. meal allowance), unless an IRCT provides otherwise. | An employee's parent dies → 5 fully-paid days off. | — | [CT Art. 251](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Continuous professional training — 40h/year** | Employees on an open-ended contract are entitled to **≥40h/year** of continuous training (pro-rated for fixed-term contracts ≥3 months). Unprovided hours convert to a **credit of hours** for worker-initiated training after 2 years; the credit **expires after 3 years** if unused; owed as compensation on contract termination. | An employer that provides 0 training hours for 2 straight years owes the worker an 80h credit, usable at the worker's own initiative. | Pro-rated for fixed-term contracts. | [CT Art. 131–134](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Sick leave — subsídio de doença [sickness benefit]** | **Days 1–3: unpaid** (waiting period; hospitalisation/ambulatory surgery waives it, paid from day 1). Benefit tiers (money, downstream context): **55%** (days 4–30) · **60%** (31–90) · **70%** (91–365) · **75%** (>1 year) of reference remuneration; up to **1,095 days** max. Tuberculosis: 80%/100% by dependants. | A worker sick for 10 days: 3 unpaid waiting days, then days 4–10 paid at 55% (money, downstream) — but the **3-day waiting-window flag** is a T&A event. | — | [Segurança Social (Social Security) sick-pay regulations](https://www.seg-social.pt) |
| **Licença parental inicial [initial parental leave]** | **120 days at 100%** or **150 days at 80%** of reference pay, worker's choice. Mother: optional **≤30 days pre-birth** + **mandatory 42 days (6 weeks) post-birth**. | A mother takes the full 150-day option at 80% pay, including her mandatory 42 post-birth days. | — | [CT (parental-leave chapter)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Licença parental exclusiva do pai [paternity leave]** | **28 days**: first **7 consecutive** immediately post-birth (some mandatory), remaining **21** within the following **6 weeks (42 days)**. **Non-transferable.** | A father takes his 7 days right after birth, then spreads the remaining 21 across the next 6 weeks. | — | [CT (parental-leave chapter)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Shared-leave bonus** | **+30 days** if parents share the initial leave exclusively (alternating uptake, not concurrent); **+30 days per additional twin**. | Parents alternate the initial leave and gain 30 bonus days on top of the base 120/150. | — | [CT (parental-leave chapter)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Assistência a filho / assistência a neto [family-care leave]** 🔎 | Paid absence to give **necessary and unpostponable assistance** to a child under 12 (or a child of any age with a disability/chronic illness), commonly cited as **up to 30 days/year** (15 days/year if the child is 12+); a comparable **assistência a neto** [grandchild-care] provision exists where the grandchild's parent is under 16. 🔎 confirm the exact day-counts and gating conditions against the current consolidated Art. 49-area text before configuring. | A parent takes several days off to care for a sick 8-year-old, drawing on the annual family-care allotment. | 🔎 Not independently re-verified this pass (web-search budget exhausted mid-research) — treat as a well-known but unconfirmed figure. | [CT (family-assistance chapter, Art. ~49 area)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) 🔎 |
| **Adoption leave** 🔎 | Adoptive parents are generally entitled to leave analogous to the parental-leave scheme (§10 above); exact day-parity with birth-parent leave not independently re-verified this pass. | — | 🔎 confirm against current CT text | [CT (parental-leave chapter)](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) 🔎 |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Time-recording duty** | Employers must keep a **record of working times per worker** — start/end of each work period, interruptions, and rest breaks — sufficient to reconstruct daily/weekly totals. Applies **identically** to on-site and remote/telework staff. | A fully-remote employee's hours must be recorded exactly as an on-site worker's. | — | [CT Art. 202](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **Retention — 5 years** | Records must be kept **5 years**. | An ACT inspection in 2026 can lawfully request records back to 2021; anything older need not be retained. | — | [CT Art. 202](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=1047&tabela=leis) |
| **ACT enforcement** | The **ACT** (Autoridade para as Condições do Trabalho) [labour-conditions authority] classifies a recording-duty breach as a **contraordenação grave** [serious offence], fines historically **€612–€2,652** per affected worker for SMEs (scaling with company size). | A restaurant found without adequate time records faces a per-worker fine in that band. | Scales with company size. | [ACT enforcement framework](https://www.act.gov.pt) |
| **Tolerance / rounding — no statutory rule** | **No statutory** punch tolerance or rounding rule; any tolerance/rounding is **policy/IRCT configuration** and must not systematically understate recorded time (it would corrupt the §3c annual OT counter and §5's night tally). | — | — | (none statutory) |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/portugal.md` (2026-07) — statute-article-level research
  (Código do Trabalho Art. 197–268, Lei 93/2019, Lei 13/2023, Lei 23/2012); predecessor
  `support-memos/portugal.md` verdict memo (appendix below).
- **Código do Trabalho consolidated text:** diariodarepublica.pt/dr/legislacao-consolidada
  (`lei/2009-34546475`); portal.act.gov.pt full-text PDF; pgdlisboa.pt article lookups.
- **Bereavement / marriage leave (Art. 251):** fedfinance.pt Faltas Justificadas 2026; cgd.pt Saldo
  Positivo (falecimento de familiar); portal.act.gov.pt Nota Técnica n.º 7 (falecimento de familiar);
  sereneus.pt Faltas por Luto 2026.
- **Minors' regime:** cgtp.pt Trabalhadores/as Menores; lexology.com Portuguese Employment Law;
  usemultiplier.com Working Hours in Portugal; diariodarepublica.pt CT Art. 68.
- **Part-time (Art. 150–155):** sabiasque.pt / informador.pt Art. 154–155 lookups; cgtp.pt Trabalho a
  Tempo Parcial; pgdlisboa.pt Art. 154.
- **Continuous training (Art. 131–134):** blog.gti.pt 40 Horas Formação Obrigatória; adcecija.pt;
  factorialhr.pt; edenred.pt; doutorfinancas.pt.
- **Trabalho XXI reform status:** portugal.gov.pt (proposal + Council of Ministers approval, 14 May
  2026); eco.sapo.pt (Parliament submission, 19 May 2026; banco de horas individual detail); dn.pt
  (parliamentary rejection, June 2026); euronews.com; rtp.pt.
- **Sick pay (subsídio de doença):** fedfinance.pt Baixa Médica 2026; creditoportugues.com; tickelia.com;
  montepio.org; simuladorsocial.pt.
- 🔎 **Not independently re-verified this pass** (web-search budget exhausted mid-session): the exact
  *assistência a filho/neto* [family-care leave] day-counts and adoption-leave parity — both carried
  forward from general legal knowledge, flagged for confirmation before customer-facing use.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

**Verdict: 🟠 Partial — a *statutory-premium* fit, like Poland and Italy.** Portugal's **Código do
Trabalho** *prices* overtime, night, and rest-day/holiday work directly (25/37.5/50% and their doubles),
and two of its defining mechanics land squarely on shipped engine levers: the **ordinary-day first-hour vs.
subsequent-hour tiering** maps cleanly onto our **rate-chaining by hours** (`phases[].limit`), and Portugal's
**banco de horas** *is* our **Banked Hours** feature — the research file calls it "the direct analogue." The
gaps cluster where every statutory-premium country's does: the **stateful annual counters** (the 100-hour
doubling boundary, the 150/175/200h annual OT cap), **adaptabilidade / reference-period averaging**, the
**limit-validation** flags (daily 2h OT cap, 11h rest, 48h average, breaks), and the **leave-accrual ledger**.
**No Critical gaps** (unlike Spain), but three **High** gaps sit in the cross-run annual-counter / averaging
family. Read with the scope, verdict key, and **Basis key** in [`README.md`](./README.md). No verdict is
DB-confirmed this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). This covers Portugal's
> **40h/week** normal period as a weekly onset (OT on hours beyond the weekly threshold). Scope is *the plain
> weekly trigger only* — it does **not** close the **100h annual doubling counter**, the **150/175/200h annual
> cap**, or the **adaptabilidade / 48h reference-period averaging**, which remain as marked. **Caveat:** weekly
> OT is committed-in-delivery, **not yet `[API]/[UI]`-visible** — confirm ship status before a hard commitment.

**Legal source:** `context/worldwide-calculations/portugal.md` (authored July 2026). **⚠ Recent-reform note:**
**Lei n.º 13/2023** reinstated the **100-hour annual overtime-doubling** mechanism (reversing the 2012
austerity halving) — so every premium below **doubles** once a worker's cumulative OT for the year passes
100h. **Any pre-2023 source citing flat, non-doubling rates is obsolete** — 🔎 confirm the current Art. 268
table before quoting rates to a customer. The file is also explicit that **individual banco de horas was
abolished** (Lei 93/2019, since 1 Oct 2019 — only *grupal* and *coletivo* survive) and that **Trabalho XXI**
(the pending 2025–26 reform: banco-de-horas-por-acordo revival, statutory attendance-bonus days) was **not
enacted as of March 2026** — do not model either as current.

## Rule-by-rule (Basis = where the verdict comes from)

| # | Portugal requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Normal period — 8h/day.** *Trabalho suplementar* (OT) is work beyond the **applicable normal schedule** (Art. 226); the daily norm is 8h before any flexibility regime | **OT onset = surplus over the PLANNED shift** (per-day) | ✅ | [API][UI] | **Good fit** — because PT's OT is defined against the *applicable* schedule (not a fixed 8h), surplus-above-planned matches part-time and regime-redistributed norms too (S4) |
| 2 | **Normal period — 40h/week.** OT accrues on hours beyond the weekly normal period | **Weekly OT trigger** — OT on hours beyond a weekly threshold | ✅ | [PO] | Delivered per product-owner (2026-07-18); **not yet `[API]/[UI]`-visible** — see callout |
| 3 | **Ordinary-day OT tiering — +25% 1st hour, +37.5% subsequent hours.** On a normal working day the premium rises with the hour-index *within the OT block* | **Rate-chaining by hours** (`phases[].limit`) — 1st hour at one rate, chains to the next after a 1h limit | ✅ | [API] | **Best fit worth naming** — the first-hour-vs-subsequent tiering *is* `phases[].limit` rate-chaining (S3). The % is downstream; the tiering (which hour → which band) is time-modeling |
| 4 | **Rest-day / holiday OT — flat +50%** (≤100h band), on either weekly-rest type or a holiday | **Day-group OT rate rows** (`daysMask` — DSR & Rest days / Holidays) → typed premium event | ✅ | [API][UI] | Flat rest-day rate = a day-group rate row (S1); no first/subsequent split needed |
| 5 | **The 100-hour annual doubling.** Once cumulative OT for the calendar year passes **100h**, every subsequent rate **doubles** (+50/+75/+100%) — a stateful per-worker counter that re-bands every later OT hour, and can flip **mid-block** | — | ❌ Gap | [ABS] | **Cross-run YTD counter (G3)** — S7's period caps are single-period; nothing re-bands OT by a running annual total. **The single biggest PT trap** (the file's words). Pay-band-determining |
| 6 | **Daily OT cap — 2h** on an ordinary working day (Art. 228 §1); breach should flag, not silently cap | Notifications & alerts (`extraHoursBalanceAlert`, Daily period) | 🟠 Partial | [API] | **Alert-only** (S13) single-period flag; the engine won't *validate/enforce* the 2h cap. Cheap to formalize |
| 7 | **Annual OT cap by firm size — 175h (micro/small) / 150h (medium/large) / 80h (part-time); IRCT-raisable to 200h** | **Overall period cap** — yearly period option exists | 🟠 Partial | [API][ABS] | S7 gives a *yearly-period* cap **shape**, but it's a single-period primitive — the **per-worker cross-run YTD counter** that survives across pay runs is `[ABS]` (G3) |
| 8 | **Night work — window 22:00–07:00, premium +25%** on the worker's own wage (Art. 223, 266) | `nightShift {%, start, end, applyEntirePeriod}` — configurable window + premium | ✅ | [API][UI] | Emission ✅ (S8). Window is a **config value** (sample default 22:00–05:00; set 22:00–07:00). Basis = own wage → additive with OT (no Poland-style two-basis split) |
| 9 | **Trabalhador noturno — night-worker status + 8h/day cap (weekly average).** A worker doing ≥3h night ≥regularly is capped at 8h/day averaged weekly (Art. 224) | `nightShift` emits `NIGHT_HOURS`; no status classifier, no rolling average | ❌ Gap | [ABS] | Night-hour **emission** ✅; the **status determination + 8h weekly-average cap** need a rolling average (G2) + validation (G4). Mirrors FR #28 / DE #20 |
| 10 | **Adaptabilidade — working-time averaging.** Coletiva/individual/grupal regimes redistribute the norm (up to 12h/day, 60h/wk) averaged over a reference period; OT arises only against the **regime norm** | **Surplus-above-planned** captures the redistributed *schedule* when planned to the pattern | 🟠 Partial | [API][ABS] | S4 computes per-day OT correctly against the redistributed shift **when the schedule reflects it**; the **reference-period averaging/netting** (4–12mo) as an independent mechanic is `[ABS]` (G2). Pay-determining when actuals diverge from plan |
| 11 | **48h reference-period average.** Average weekly hours *incl. OT* must stay ≤48h over the reference period (default 4mo, up to 12mo) — a rolling compliance ceiling | — | ❌ Gap | [ABS] | **No period-averaging primitive** (G2). Same mechanic as adaptabilidade/annualisation; **pay stays correct** (this only decides legality). Mirrors FR #3b / DE #3 |
| 12 | **Banco de horas — hours bank.** Surplus hours stored as a time-credit, drawn down later or converted to cash at period-end; caps 150h (grupal) / 200h (coletivo), 12-month reference period | **Banked Hours (BH)** — 1–18mo cyclical/full cycle, BH↔EH split per row, positive balance → EH at cycle close | ✅ | [API][UI] | **Direct analogue** (S6) — the file names it so. 12mo cycle ✅; caps via hours-bank limits ✅; uncompensated surplus → cash ✅. 🔎 the *extra-vacation-days* conversion disposition; **individual banco is abolished — config only *grupal*/*coletivo*** |
| 13 | **Descanso compensatório.** OT earns paid rest too: **25% of OT hours** (ordinary/complementary-rest/holiday, 90-day expiry) *or* a **full day** (mandatory-rest-day OT, taken within 3 business days) | Banked Hours (comp-time-in-lieu) | 🟠 Partial | [ABS][DES] | The bank is real (S6); the **0.25:1 non-unit accrual ratio** is open (G13 🔎), and the **full-day-owed-within-3-days** is lieu-scheduling `[DES]`. Additive to the cash premium, not a substitute |
| 14 | **Daily rest — ≥11h** between workdays (Art. 214); **exempt** for management/autonomous-decision workers | `crossShiftsInterval {interval=660min=11h}` | 🟠 Partial / 🔎 | [API] | 11h threshold field exists (S12); **validation behaviour unconfirmed** 🔎; the management/autonomous **exemption gating** (regime axis) is `[ABS]` (G5) |
| 15 | **Weekly rest — obrigatório ≥1 day (default Sunday) + complementar** (Saturday, **IRCT/contract-conditional, not a statutory floor**); the obrigatório/complementar split drives the §13 comp-rest rule | Weekly rest handled at the schedule level; `workingDaysInARow` (🔎) | 🟠 Partial | [DES] | Rest days scheduled ✅; breach-flagging on-demand (G8 🔎). **Do not assume Saturday is guaranteed rest.** The obrigatório-vs-complementar **classifier** (rate rows have only "DSR & Rest days") is the open piece feeding #13 |
| 16 | **Intra-day break — 1–2h**, positioned so no more than **5h** (or 6h if shift >10h) consecutive work (Art. 213) | Break config on the schedule (mode, paid/unpaid, startAfter) | 🟠 Partial / 🔎 | [DES] | Breaks configurable; **min-break-by-consecutive-hours *validation/flagging* unconfirmed**. Mirrors DE #6 |
| 17 | **Public holidays — 13 mandatory + Carnaval (optional) + municipal**, with movable feasts (Good Friday, Easter, Corpus Christi computed off Easter each year) | Holiday calendar (`SourceHoliday`), jurisdiction/date-keyed; `daysMask` Holiday bit | ✅ | [FLD] | Per-year date-parameterised calendar = data entry (S11). **Worked-holiday premium** emits as a Holiday rate row ✅ (≤100h band); the >100h doubling shares #5's counter gap |
| 18 | **Annual leave — 22 working days**, day-one vesting (1 Jan); first-year sub-ladder 2d/complete-month (cap 20d, 6-month gate); IRCT attendance-bonus days | `SourceRequest.*` handles absences; no accrual ledger | ❌ Gap | [ABS] | **Leave-accrual ledger (G12)** — the 22d floor, day-one vesting, first-year sub-ladder, and attendance-bonus ledger are `[ABS]`. Adjacent to core T&A; **non-pay-corrupting** |
| 19 | **Other statutory leave as absence quantities** — parental (120d@100% / 150d@80%; 28d paternity; ±30 shared/twin bonus), sick (3-day waiting window) | `SourceRequest.*` generic absence handling | 🟠 Partial | [DES] | Absence *quantities* tracked; the **PT-specific semantics** (parental splits, sick waiting-period flag) not modeled. Adjacent |
| 20 | **Isenção de horário — 3 modalities.** (a) no-limit → **never earns OT**; (b) agreed-increase; (c) flexible-timing → ordinary OT rules apply (Art. 219) | — (crude workaround: modality (a) = assign no OT policy) | 🟠 Partial | [ABS][DES] | **Worker-regime gating (G5)** — modality (a) suppresses `OT_*` via the "no OT policy" workaround ✅; (b)/(c) need finer per-worker gating the engine lacks. Narrow population |
| 21 | **Young/protected workers — OT dispensation on request** (under-18, pregnant, parent of child <1, etc.; Art. 227) — employer must exempt on an *active* request | — | 🟠 Partial | [ABS] | Regime gating (G5) — no dispensation flag; a dedicated policy is the workaround. Narrow |
| 22 | **Time recording — every work period, break, and interruption; 5-year retention** (Art. 202; ACT-enforced) | Engine records every punch; approved-event locking | ✅ | [FLD] | Satisfied — the file calls this our compliance value-add (S15). Feeds the annual OT counter + night tally |
| 23 | **Tolerance / rounding — no statutory rule;** any tolerance is policy/IRCT config, must not systematically understate time | `tolerance {type, limit, scope, active, includeBreaks}` | ✅ | [API][UI] | Configurable (S9); anti-erosion is on the customer. No statutory floor to hit |
| 24 | **On-call — regime de disponibilidade (prevenção).** Standby availability paid at 50%-of-equivalent (a marker); call-out time folds into worked/OT | On-call compensation (`onCalls.compensation`); availability + activation paid separately | ✅ | [API][UI] | S10 — the 50% availability marker is a factual overlay (money downstream); call-out → `WORKED_HOURS`/`OT_*` |
| 25 | **IRCT-as-policy.** Each collective agreement sets its own working time / premiums; Art. 268 §3 lets an IRCT **depart from the statutory OT rate table** (either direction) | **One arrangement = one pay policy** with its own fully-configurable rate table | ✅ | [UI][DES] | Matches the model exactly (S16). A departing IRCT table = that policy's `phases[]`. 🔎 flag *below-statute* departures for legal review (unsettled "in pejus" case law) |

## Summary — rule-by-rule

**11 of 25 rules are ✅**, **10 are 🟠 Partial**, **4 are ❌ Gap**. The supported core is genuinely strong for
a statutory-premium country: the **ordinary-day OT tiering** (#3, via rate-chaining), **rest-day/holiday flat
premium** (#4), **weekly OT onset** (#2, `[PO]`), **banco de horas** (#12, our BH feature), **night** (#8),
**holidays** (#17), **records** (#22), **tolerance** (#23), **on-call** (#24), **IRCT-as-policy** (#25), and
the **surplus-above-planned daily onset** (#1).

The **14 non-✅ rules**:

| # | Rule | Verdict | Why it's still open |
|---|---|---|---|
| 5 | 100h annual doubling counter | ❌ Gap | Cross-run YTD counter that re-bands every later OT hour — `[ABS]` |
| 7 | Annual OT cap 150/175/200h | 🟠 Partial | S7 yearly-period *shape* exists; the per-worker cross-run YTD counter is `[ABS]` |
| 10 | Adaptabilidade averaging | 🟠 Partial | Surplus-above-planned handles the redistributed schedule; reference-period netting is `[ABS]` |
| 11 | 48h reference-period average | ❌ Gap | No period-averaging primitive (non-corrupting) |
| 9 | Night-worker 8h weekly-avg cap | ❌ Gap | No night-worker status + rolling average |
| 13 | Descanso compensatório | 🟠 Partial | Non-unit 0.25:1 ratio (🔎) + full-day lieu scheduling |
| 6 | Daily 2h OT cap | 🟠 Partial | Alert-only; no cap validation |
| 14 | Daily rest 11h | 🟠 Partial / 🔎 | Field exists; validation + exemption gating unconfirmed |
| 15 | Weekly rest + obrigatório/complementar split | 🟠 Partial | Schedule-level; classifier + breach-flag open |
| 16 | Intra-day break by consecutive hours | 🟠 Partial / 🔎 | Break config exists; min-break validation unconfirmed |
| 18 | Annual-leave accrual ledger | ❌ Gap | 22d floor + first-year sub-ladder ledger `[ABS]` (adjacent) |
| 19 | Other statutory leave semantics | 🟠 Partial | Generic absence tracking; PT semantics not modeled (adjacent) |
| 20 | Isenção de horário 3 modalities | 🟠 Partial | Regime gating; only modality (a) has a workaround |
| 21 | Young/protected OT dispensation | 🟠 Partial | No dispensation flag (narrow) |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) rules are omitted (they need
> no mitigation) — that's **11 of the 25 rows**; see the Summary above.
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common, no
> full mitigation, but scoped, or pay-determining) · 🟡 Medium (moderately common, or a usable mitigation, or
> moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow population, strong
> mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Portuguese market* a rule bites. **⚠ Customer-relative** — a
>   high-OT customer lifts **#5** (100h doubling) and **#7** (annual cap); an *adaptabilidade*/*banco de horas*
>   customer lifts **#10**; a night/shift-heavy customer lifts **#9**.
> - **Build-effort** = estimate, **grounded in `portugal.md`'s config surface** (config/`[API]` ≈ **S**;
>   `[DES]` ≈ **M**; net-new cross-run/averaging subsystem ≈ **L**). **⚠ Calendar time needs eng. validation.**

| Rule | Mitigation today | Prevalence (PT market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#5 100h annual doubling counter** | **Weak** — no cross-run YTD counter; manual tracking of each worker's annual OT total, or a manual mid-year policy swap when 100h is crossed. **Pay-band-determining** — mis-typing emits the wrong OT band | **High** for any regular-OT workforce (the doubling is universal statute) | **L** — per-worker cross-run YTD counter that re-bands OT, splitting mid-block at 100h | 🟠 **High** |
| **#7 Annual OT cap 150/175/200h** | **Partial** — a yearly-period overall cap approximates it, but doesn't accumulate per-worker across runs; manual monitoring for the firm-size/part-time variants | **High** as a legal obligation | **M** — per-worker cross-run YTD counter (shares #5's primitive) | 🟠 **High** |
| **#10 Adaptabilidade averaging** | **Partial** — schedule the redistributed pattern and S4 computes per-day OT correctly; the reference-period **netting** (when actuals diverge, and the 4–12mo true-up) is the missing reconciliation | **Med-High** — common in manufacturing/retail/seasonal (**Critical** in those accounts) | **L** — period-averaging + reference-period true-up | 🟠 **High** |
| **#11 48h reference-period average** | **Partial** — manual monitoring; **pay stays correct** (decides legality, not pay) | **High** as a legal obligation (non-corrupting) | **M** — rolling multi-week/month average (shares #10's primitive) | 🟡 **Medium** |
| **#9 Night-worker 8h weekly-avg cap** | **Partial** — night hours emit; no night-worker status or 8h-average cap | **Med** — night/shift workers (sector-dependent) | **M** — night-worker status + rolling weekly average | 🟡 **Medium** |
| **#13 Descanso compensatório** | **Partial** — the bank accrues comp-time; the **0.25:1 ratio** and **full-day-in-3-days** scheduling are the open pieces | **Med-High** — any OT-earning workforce | **M** — non-unit bank ratio + lieu-day scheduling window | 🟡 **Medium** |
| **#16 Intra-day break validation** | **Config** — configure the 1–2h break at the 5h/6h trigger; min-break *validation/flagging* is the open piece | **High** (all workers) | **S-M** | 🟡 **Medium** |
| **#18 Annual-leave accrual ledger** | **Partial** — leave handled as absences; the 22d floor + day-one vesting + first-year sub-ladder + attendance-bonus need a leave module or manual tracking | **High**, but adjacent to core T&A | **M** — accrual ledger + first-year sub-ladder | 🟡 **Medium** |
| **#19 Other statutory leave semantics** | **Partial** — `SourceRequest.*` tracks absence quantities; PT-specific parental/sick semantics not modeled | **Med**, adjacent (leave mgmt) | **M** — specific leave-type semantics on the request primitive | 🟡 **Medium** |
| **#6 Daily 2h OT cap** | **Partial** — alert/notification thresholds as manual monitoring; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **S** — single-period threshold flag (cheapest to add) | 🟢 **Low** |
| **#14 Daily rest 11h + exemption** | **Partial** — the 11h field exists; validation behaviour unconfirmed; management/autonomous exemption gating absent | **Med** | **S-M** | 🟢 **Low** |
| **#15 Weekly rest + rest-day classifier** | **Strong** — handled at the schedule level; reports can export the data, breach-flagging addable on demand; the obrigatório/complementar classifier is the finer open piece | **High** as a legal obligation (non-corrupting) | **S-M** — formalize export into a breach alert + a rest-day-type flag | 🟢 **Low** |
| **#20 Isenção de horário modalities** | **Strong** — modality (a) via "assign no OT policy"; (b)/(c) need finer gating | **Low** — management/confidence roles only | **S** — regime flag | 🟢 **Low** |
| **#21 Young/protected OT dispensation** | **Partial** — a dedicated no-OT policy is the workaround; no dispensation flag | **Low** — narrow protected population | **S** — dispensation flag | 🟢 **Low** |

### Severity roll-up
- **🔴 Critical (0):** none — unlike Spain, Portugal's OT determination is per-day/per-week surplus, not annualised; the annual mechanics are counters/averaging *on top of* a computable base.
- **🟠 High (3):** 100h annual doubling counter (#5), annual OT cap 150/175/200h (#7), adaptabilidade averaging (#10) — all in the **cross-run annual-counter / averaging** family.
- **🟡 Medium (6):** 48h reference-period average (#11), night-worker 8h cap (#9), descanso compensatório (#13), break validation (#16), annual-leave accrual (#18), other statutory leave (#19).
- **🟢 Low (5):** daily 2h OT cap (#6), daily rest 11h (#14), weekly rest + classifier (#15), isenção de horário (#20), young-worker dispensation (#21).

### The big gaps (all `[ABS]`)
1. **The 100h annual doubling counter** (#5) — a stateful per-worker YTD counter that re-bands every subsequent OT hour and splits mid-block at 100h. The file's named "single biggest trap"; `[ABS]` (G3).
2. **Annual OT cap 150/175/200h** (#7) — a second cross-run YTD counter (S7 is single-period only).
3. **Adaptabilidade / 48h reference-period averaging** (#10, #11) — the period-averaging primitive we don't ship; shared with FR annualisation and DE 6-mo averaging.
4. **Limit validation** (#6 daily 2h, #9 night 8h, #14 rest, #16 breaks) — all alert-only today; we compute pay, not limit enforcement.
5. **Leave-accrual ledger** (#18, #19) — 22d floor + first-year sub-ladder + parental/sick semantics; adjacent, non-corrupting.
6. **Descanso compensatório** (#13) — non-unit 0.25:1 accrual + full-day-owed lieu scheduling.

### Where Portugal scores well (worth saying)
- **Ordinary-day OT tiering** (#3): the **+25% first-hour / +37.5% subsequent-hour** structure *is*
  `phases[].limit` rate-chaining by hours (S3) — a clean, named fit `[API]`. This is the headline strength.
- **Banco de horas** (#12): Portugal's hours bank is the **direct analogue** of our Banked Hours feature (S6) —
  1–18mo cycle, per-row BH↔EH split, positive-balance → cash at cycle close all map; the research file says so `[API][UI]`.
- **Rest-day/holiday flat premium** (#4) + **holiday calendar** (#17) + **night premium/window** (#8) — all
  day-group rate rows / configurable windows, present `[API]/[FLD]`.
- **Weekly OT onset** (#2, #1): the 40h weekly trigger (S5, `[PO]`) plus surplus-above-planned daily onset (S4)
  cover the core *trabalho suplementar* determination.
- **IRCT-as-policy** (#25): one arrangement = one pay policy matches Portugal's IRCT model — including the
  unusual Art. 268 §3 rate-table departure, which is just that policy's own `phases[]` `[UI][DES]`.
- **Records** (#22), **tolerance** (#23), **on-call** (#24) — all shipped `[API]/[FLD]`.

### 🔎 Verify before telling the customer
- **OT-rate reform** — the **100h annual doubling** (Lei 13/2023) is current; **any pre-2023 source citing flat,
  non-doubling rates is obsolete**. Confirm the Art. 268 table before quoting.
- **Weekly OT** (#2): ✅ per product-owner (2026-07-18), **not yet `[API]/[UI]`-visible** — confirm ship status.
- **`crossShiftsInterval` behaviour** (#14): field is `[API]`-real, but does it *validate* the 11h rest or only classify/reshape?
- **Non-unit comp-rest ratio** (#13): can the bank express **0.25:1** accrual (25% of OT hours), not just 1:1?
- **IRCT below-statute departure** (#25): Art. 268 §3 allows either direction, but "in pejus" case law is unsettled — flag sub-statutory IRCT rates for legal review.
- **Trabalho XXI pending reform** — banco-de-horas-por-acordo revival and a *statutory* attendance-bonus day were **not enacted as of March 2026**; do not model as current.

### Bottom line for the customer
Portugal is a **good statutory-premium fit** — its two defining mechanics land on shipped levers: the
**ordinary-day first-hour/subsequent-hour OT tiering** on our rate-chaining, and **banco de horas** on our
Banked Hours feature. With **weekly OT now supported**, the core *trabalho suplementar* determination
(daily/weekly onset, tiered ordinary-day and flat rest-day/holiday premiums) computes. The remaining gaps are
the **stateful annual counters** — the **100-hour doubling boundary** and the **150/175/200h annual cap** — the
**adaptabilidade / 48h reference-period averaging**, the **limit-validation** flags, and the **leave-accrual
ledger**. **No Critical gaps** (unlike Spain), but the 100h doubling is a genuine pay-band-determining trap that
manual workarounds only partly cover. Honest status: **partial; strong on premium emission and the hours bank,
weak on the cross-run annual counters and averaging.**
