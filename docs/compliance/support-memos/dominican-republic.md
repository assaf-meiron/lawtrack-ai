# Dominican Republic — T&A requirements

> **What this is.** The ground-truth reference for the Dominican Republic's time-&-attendance legal
> requirements, detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive**
> and **atomic**: **one legal proposition per row**, each row self-contained (no "see §X" as the only
> content), with exact values, a worked example wherever a number is involved, variants, and a
> `Basis` that **links to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, RD$, tax, gross-to-net) is out of scope (premiums
> are named for context in `Values` but the deliverable is the typed hour/day event, never the
> money). **Term convention:** every Spanish term of art is glossed in English in brackets on first
> use in a section, e.g. *Código de Trabajo* [Labor Code], *convenio colectivo* [collective
> bargaining agreement].
>
> **The one structural fact that shapes this whole document.** Unlike Australia's three stacked
> layers (federal floor → award → state) or Germany's statute-sets-limits/Tarifvertrag-sets-pay
> split, the Dominican Republic runs almost entirely on **one layer**: the primary statute — the
> *Código de Trabajo* [Labor Code] (**Ley 16-92**, 1992) plus its implementing **Reglamento
> 258-93** — fixes the operative numbers **directly**: workweek, OT bands, night/rest/holiday
> premiums, rest windows, vacation accrual. No CBA is needed for the baseline, and none exists for
> most of the private sector. A *convenio colectivo* [collective bargaining agreement] layer exists
> and can **raise** premiums above the floor, but it is comparatively rare and can never lower them
> (Art. 25 — *irrenunciabilidad* [non-waivability]) — so almost every `Basis` cell below cites a
> Code article directly, not an award or agreement.
>
> **Legal sources & links:** *Código de Trabajo* (Ley 16-92) via the official government legal
> repository — **[Consultoría Jurídica del Poder Ejecutivo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1)**
> (confirmed live 2026-07-21; a scanned full-text PDF of the statute, no per-article anchors, so
> every Código article below links to this same document) — plus Reglamento 258-93, Ley 87-01
> (SDSS), Ley 139-97 (holiday movement), Ley 8-90 (free zones), and SIRLA (`ovi.mt.gob.do`), linked
> via the **[Consultoría Jurídica search portal](https://www.consultoria.gov.do/Consulta)** 🔎 where
> a direct document link could not be confirmed in this pass. Supplemented by the repo seed
> `context/worldwide-calculations/dominican-republic.md` and multi-country guides (Rivermate) for
> leave items the seed didn't cover. 🔎 marks a figure or link to confirm.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Primary statute sets the operative numbers directly** | *Código de Trabajo* [Labor Code] (**Ley 16-92**, 1992) + implementing **Reglamento 258-93** fix workweek, OT bands, premiums, rest, and leave **by statute** — no CBA needed for the baseline. | A DR employer with no *convenio colectivo* still owes the full 45–68h/+35%, >68h/+100%, night +15% etc. — these are statutory floors, not bargained defaults. | *Convenio colectivo* may **raise** premiums (e.g. night 25% vs 15%, §1) but may never lower them (Art. 25 — *irrenunciabilidad* [non-waivability]). | [Código de Trabajo, Ley 16-92](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 25 |
| **Territorial scope** | Any work performed on Dominican soil falls under the Code, regardless of the parties' nationality or residence; statutory rights are **non-waivable**. | A foreign-owned free-zone plant in Santiago is fully subject to the Code's working-time rules. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) (territoriality principle) |
| **Worker-class / contract-type gating** | Four base contract types: **indefinido** [open-ended], **tiempo fijo** [fixed-term], **obra o servicio determinado** [work-or-service-defined], **doméstico** [domestic worker, separate sub-regime]. | A construction crew hired for a single project sits on an *obra o servicio determinado* contract, ending with the project rather than a notice period. | *Doméstico* workers sit under a distinct, less-documented sub-regime (rest/hours specifics 🔎 not confirmed in sources reviewed). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) (contract-type provisions) |
| **Managerial / executive exemption (Art. 150)** | Executives/managers are exempt from the **8h/day · 44h/week** cap and may work up to **10h/day** with **no OT triggers** at all. | A plant manager working 10h/day, 6 days/week draws no OT — the cap simply doesn't apply. | Narrow, role-based; no earnings-threshold test found (unlike US exempt tests). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 150 |
| **Free-zone (zona franca) workers — full Code applies** | *Zona franca* [free zone] employers under **Ley 8-90** get **tax/duty** exemptions only — the full Código de Trabajo (hours, OT, premiums, leave) applies unchanged. | A garment-assembly worker in a *zona franca* still gets the 44h week, weekly OT tiers, and night +15% exactly as any other DR worker. | Free-zone inspectors specifically target **night and weekend shifts** for compliance audits. | Ley 8-90 [(register)](https://www.consultoria.gov.do/Consulta) 🔎 |
| **Minors — working-hours cap (Art. 247)** | Workers under 18 are capped at **6h/day** (vs. the adult 8h). | A 16-year-old apprentice cannot be rostered past 6h in a day even on a shift where an adult colleague works 8h. | Night-work ban for minors not confirmed in sources reviewed 🔎 — flag for the customer if the workforce includes minors. Cross-ref §4. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 247 |
| **Minimum working age — 14 (unconfirmed)** | Minimum working age is commonly cited as **14** in practitioner sources. | A 13-year-old cannot lawfully be hired for any role under this figure. | 🔎 Not confirmed against primary statute text in this pass — verify before relying on it for a customer's protected-population screen. | [Rivermate — DR employee rights](https://www.rivermate.com/guides/dominican-republic/rights) 🔎 (practitioner citation, not independently verified against the Código text) |
| **Cartel de Horario [schedule poster] — mandatory posting & MT registration (Art. 159)** | Every employer must post a schedule notice **visibly** at the establishment, on the Ministry of Labor's [**MT**] approved form, and **register it with the Departamento de Trabajo** [Labor Department] — two originals, one filed with the authority, one posted. Only labor inspectors may annotate it post-registration. | A retail chain must file and post the exact opening/shift schedule per location before it can lawfully roster against it. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 159 |
| **Convenio colectivo [collective agreement] — overlay above the statutory floor (Arts. 103–128)** | Requires the union to represent an **absolute majority** of the affected workforce and be **MT-registered**. Can enhance wage scales, hours/rest, vacation, and premiums (e.g. night 25% vs statutory 15%). Model each convenio as its own pay-policy layer above the floor. | A hospitality-sector convenio raises the night premium from the statutory 15% to 25% — the engine applies the higher, convenio rate. | Convenios are **far less prevalent** in the DR private sector than in France/Germany — concentrated in public-sector, healthcare, large free-zone, sugar, and hospitality employers. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Arts. 103–128; Art. 25 |
| **Reglamento Interior [internal company rules] — employer-set overlay (Arts. 129–134)** | Employer may unilaterally set punch-tolerance grace periods, tardiness sanctions, and OT pre-approval workflow — **must be registered with the MT** before it is enforceable against employees. | A manufacturer's Reglamento sets a 5-minute pre-shift punch grace; unregistered, that grace is unenforceable in a labor dispute. | Cannot contravene public-order law, any convenio, or individual contracts. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Arts. 129–134 |
| **⚠ Pending modernization bill — not yet law** | A *Código de Trabajo* reform bill (submitted Oct 2024, passed Senate 2nd reading Jul 2025) covering telework, dispute conciliation, and a **+1 week** parental-leave extension remains in the Chamber of Deputies' committee as of mid-2026. **Do not model as settled.** | — | — | [Senado de la República Dominicana](https://www.senadord.gob.do/senado-aprobo-en-primera-lectura-las-modificaciones-a-la-ley-16-92-que-aprueba-el-codigo-de-trabajo/) (draft bill, Chamber of Deputies committee stage) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Standard workday & workweek (Art. 147)** | **8h/day**, **44h/week** — the workweek, not the day, is the primary unit OT is measured against. | A worker doing 9h Monday and 7h Tuesday (16h across 2 days, both ≤44h/week) owes no OT from the daily split alone — only the weekly total (§3a) matters. | Managerial exemption raises the daily figure to 10h with no weekly cap consequence (§1). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 147 |
| **Day / night window definition (Art. 149)** | **Daytime** = 07:00–21:00; **Nighttime** = 21:00–07:00. These are the base windows; whether a *shift* is classified day or night as a whole is a separate reclassification rule (§5). | A shift running 08:00–16:00 sits entirely in the daytime window. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 149 |
| **No *hora ficta* [fictional/compressed hour] — a worked hour is a worked hour** | Unlike Brazil, the DR has **no time-compression** rule for night work; the night premium (§5) is the sole compensating mechanism, not a shortened "counted" hour. | A worker's 8 clock-hours at night count as 8 worked hours (not compressed to fewer "paid" hours as some jurisdictions do); the +15% premium is the only adjustment. | — | Seed research (comparative note); [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) (silent on *hora ficta*) |
| **Travel / on-hand / presence time** | — none identified in current research — | — | — | — |

## 3. Overtime

*The DR's OT is computed on a **weekly**, not daily, index — a two-tier progressive band unique among the
five reference jurisdictions in this project (US flat 1.5×; France 25%/50%; Germany no statutory premium).*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekly OT onset — beyond 44h/week** | OT starts on the **45th hour of the week**, regardless of how the 44 base hours are distributed across days. | A worker doing 9h × 4 days + 8h × 1 day = 44h owes **no** OT even though four days exceeded 8h — only the 45th cumulative weekly hour triggers it. | Managerial/executive workers (Art. 150) have **no** weekly OT trigger at all (§1). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 147 |
| **No daily OT trigger** | The DR does **not** compute OT off a per-day threshold (contrast US daily-OT states) — only the weekly cumulative total matters. | A single 10h day inside an otherwise-light 40h week produces no OT on that day alone. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 147 |
| **OT must be voluntary — no-compulsion rule (§3.4.5)** | Workers **cannot be compelled** to work overtime; a contract or *Reglamento Interior* clause purporting to make OT mandatory is **null**. OT scheduling must be opt-in, event-by-event. | An employer cannot discipline a worker for declining a rostered OT shift. | Reglamento Interior may set a **pre-approval workflow** (bilateral, since OT can't be unilaterally imposed) — §9. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) (no-compulsion doctrine) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Tier 1 — hours 45–68/week** | **+35%** over the ordinary hourly rate (1.35×). | A worker at 55 weekly hours has 11 hours (45th–55th) paid at 1.35×. | Convenio may raise this rate (rare; §1). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §3.4.1 |
| **Tier 2 — hours beyond 68/week** | **+100%** over the ordinary hourly rate (2.00× — "*horas dobles*" [double hours]). | A worker at 75 weekly hours has 24 hours at 1.35× (45th–68th) plus 7 hours at 2.00× (69th–75th). | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §3.4.1 |
| **Daily divisor for hourly-rate conversion** | **23.83** — the MT-recognized divisor for converting a monthly salary to an hourly rate on a 44h week. | A worker earning RD$30,000/month has an hourly ordinary rate of RD$30,000 ÷ 23.83 ≈ RD$1,259 (context: the divisor feeds every OT/premium rate calc). | — | MT practice implementing [Reglamento 258-93](https://www.consultoria.gov.do/Consulta) 🔎 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory ceiling on total OT hours** | Research located **no numeric cap** on OT hours per week/month/year — the two-tier bands imply hours beyond 68/week are simply uncapped double-time. 🔎 Confirm before ruling out (or asserting) an "80h/quarter"-style ceiling. | — | — | 🔎 (silent in [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) as reviewed) |
| **DGT-2 per-event OT reporting (SIRLA)** | Every OT hour must be filed through **Planilla DGT-2** in **SIRLA** [Integrated Labor Registry System]; the weekly *Lista de Horas Extras* [overtime log] is the source document. | A week with 11 tier-1 + 7 tier-2 hours generates one DGT-2 filing for that worker/week. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 16; [SIRLA](https://ovi.mt.gob.do) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No cross-week netting — weeks are sealed** | OT is determined **per calendar week**; a light week does not offset (net against) a heavy week, and vice versa — there is no rolling/reference-period averaging as in Germany's 6-month window. | A 50h week (6h of tier-1 OT) followed by a 38h week: the OT from week 1 is owed in full; week 2's 6h shortfall is **not** netted against it. | Biweekly/monthly payroll cycles must run a **mid-week cut-off** aligned to each 44h weekly boundary before pay finalizes. | Seed research (weekly-tier architecture note); [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 147 |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night × OT stacking — multiplicative by common interpretation** | An hour that is **both** night and OT stacks **multiplicatively**: 1.35 × 1.15 = **1.5525×** ordinary (tier-1 OT at night). Some employer policies/convenios instead treat it **additively** as **1.50×**. | A tier-1 OT hour worked at 22:00: 1.5525× by the orthodox reading, or 1.50× under an additive convenio. | Convenios colectivos frequently resolve the composition mode explicitly — confirm with the customer's convenio (or absence of one) before configuring. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §3.4.2 ("common interpretation", not a single statutory constant) |
| **Typed premium buckets** | Night, rest-day/Sunday, and holiday premiums are separately identifiable hour-types that can combine on one hour (e.g., a night hour on a worked rest day carries both). | A night hour worked on the weekly rest day: base + night (+15%) + rest-day (+100%), combined per the composition mode above. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §§3.4.2–3.4.3 |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily ceiling — 8h (10h managerial)** | **8h/day** standard; **10h/day** for managerial/executive-exempt workers (§1); no OT trigger for the exempt group even at 10h. | A non-exempt worker's day is capped at the ordinary 8h before any hour becomes OT-eligible (via the weekly index, §3a). | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Arts. 147, 150 |
| **Weekly ceiling — 44h ordinary** | **44h/week** is the ordinary-pay ceiling; hours beyond it are OT (§3), not a hard prohibition. | A worker logging exactly 44h Mon–Fri draws only ordinary pay; a 45th hour that same week converts to tier-1 OT (§3a). | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 147 |
| **Night-shift ceiling — 6h/day · 36h/week** | A shift **classified as nocturnal** (§5) is capped at **6h/day, 36h/week** — a statutory maximum; a breach should be flagged, not silently permitted. | A fully-night warehouse shift scheduled at 8h/day breaches the 6h nocturnal ceiling even though 8h would be fine for a daytime shift. | Gated behind the §5 day/night classification (whether the shift counts as "nocturnal" at all). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §2.4 |
| **Weekly rest — 36 consecutive hours** | **≥36h** continuous rest per week, traditionally **Sunday**. | A worker's rest window runs Saturday 22:00 to Monday 10:00 (36h) satisfying the minimum. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 163 |
| **Intra-shift meal break — ≥1h** | At least **1 hour** of meal break within the shift when the shift exceeds the (unspecified) meal-period threshold; unpaid, netted from the worked total. | An 8h shift nets 1h unpaid meal break → 7h counted as worked time. | Code is silent on the exact hours-worked trigger for the break; Reglamento Interior/convenio may set finer detail. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §2.4 |
| **No statutory inter-shift daily-rest figure distinct from weekly rest** | Research located **no minimum-hours-between-shifts** rule (e.g. an "11h between shifts" analog to Germany's ArbZG) beyond the 36h weekly rest window. | — | — | 🔎 (not found in [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) as reviewed) |
| **Minors — 6h/day cap (Art. 247)** | Workers under 18: **6h/day** maximum (vs. the adult 8h). | A minor scheduled for 7h breaches the cap even where an adult in the same role could work 8h. | Night-work ban for minors — 🔎 not confirmed in sources reviewed. Cross-ref §1. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 247 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night window (Art. 149)** | **21:00–07:00** [9 PM–7 AM]. Daytime window is 07:00–21:00. | Hours worked 22:00–02:00 fall entirely in the night window. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 149 |
| **Day/night 3-hour whole-shift reclassification rule** | A shift stays classified as **daytime** as long as **≤3 hours** fall after 21:00. Once **>3** night-hours occur, the **entire shift** reclassifies to **nocturnal** — triggering the reduced 6h/36h night ceiling (§4) for the whole shift, not just the night portion. | An 8h shift 15:00–23:00 has 2 night-hours (21:00–23:00) → stays daytime (8h cap applies). A shift 16:00–01:00 has 4 night-hours → the **whole 9h shift** reclassifies nocturnal, breaching the 6h nocturnal cap. | Labor jurisprudence, not a bright-line statutory sentence, resolves the boundary this way — treat as a jurisprudential, not purely textual, rule. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 149; labor jurisprudence 🔎 |
| **Night premium — +15%, independent of OT** | **+15%** over the ordinary rate for all hours actually worked in the 21:00–07:00 window, **regardless** of whether the OT threshold has been crossed. | A worker on their 30th weekly hour (well under the 44h OT threshold) still earns +15% for any hour worked 21:00–07:00. | Convenio colectivo can raise this — e.g. **25%** instead of the statutory 15% (§1). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §3.4.2 |
| **Night-worker ceiling (cross-ref §4)** | A shift classified nocturnal (per the 3-hour rule above) is capped at **6h/day · 36h/week**. | A worker whose shift reclassifies nocturnal under the 3-hour rule (e.g. the 16:00–01:00 example above) must not be rostered past 6h that day or 36h that week. | Gated entirely behind the day/night classification. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §2.4 |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **13 statutory public holidays** | 1 Jan (*Año Nuevo* [New Year]), 6 Jan (*Reyes* [Epiphany/Three Kings' Day]), 21 Jan (*Altagracia* [Our Lady of Altagracia]), 26 Jan (*Duarte* [Duarte's birthday, founding father]), 27 Feb (*Independencia* [Independence Day]), Good Friday, 1 May (*Trabajo* [Labor Day]), Corpus Christi, 16 Aug (*Restauración* [Restoration Day]), 24 Sep (*Mercedes* [Our Lady of Mercedes]), 6 Nov (*Constitución* [Constitution Day]), 25 Dec (*Navidad* [Christmas]) — **12 named + Corpus Christi movable = 13 total**. | A calendar built for 2026 carries all 13 dates, with the Monday-movement rule (below) then adjusting the observed date for the movable ones. | The calendar is national, not regional (no DR sub-national holiday layer identified, unlike Germany's per-Bundesland calendar). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) §2.5 |
| **Ley 139-97 — Monday-movement rule** | Most holidays falling **Tue/Wed/Thu/Fri** shift to the **nearest Monday**. Four holidays stay on their exact calendar date regardless of weekday: **1 Jan, 27 Feb, Good Friday, 25 Dec**. | A holiday falling on a Wednesday moves to the following Monday for pay/rest purposes; 27 Feb (Independencia) never moves even if it falls on a Wednesday. | — | Ley 139-97 [(register)](https://www.consultoria.gov.do/Consulta) 🔎 |
| **Worked-holiday premium — +100%, no comp-off option** | **+100%** on top of the ordinary day's pay for work on a statutory holiday; the worker keeps **both** the holiday pay and the worked-day premium — **no** compensatory-day-off alternative (unlike rest-day work below). | A worker rostered on 25 Dec earns their normal holiday pay **plus** a full +100% premium on the hours actually worked. | — | Labor jurisprudence (§3.4.3); [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) |
| **Rest-day worked premium — +100% OR compensatory day off, worker's election (Art. 163)** | Working the 36h weekly rest day pays **+100%**, **or**, at the worker's election, a **compensatory day off** the following week. | A worker called in on their Sunday rest day may choose the 2.00× pay for that day, or take an equivalent day off the next week instead. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 163 |
| **Holiday-on-rest-day doctrine** | — none identified in current research — (no confirmed rule found for a statutory holiday that also falls on the worker's designated weekly rest day) | — | — | 🔎 (not found in sources reviewed) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Rest-day comp-day-off election (cross-ref §6)** | The **only** TOIL-style mechanism identified: a worker who works their weekly rest day may elect a compensatory day off the following week **instead of** the +100% premium. | — | Worker-elected, not employer-imposed. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 163 |
| **No broader hours-bank / working-time-account system** | Research located **no** DR analog to Brazil's *banco de horas* [hours bank] or Germany's *Arbeitszeitkonto* [working-time account] — the DR has no general TOIL/banking regime beyond the single rest-day election above. | — | — | 🔎 (not found in sources reviewed) |

## 8. On-call & standby

— none identified in current research — (no DR-specific on-call/standby availability, activation-pay, or classification regime was located in the sources reviewed for this memo; flag for confirmation if the customer has an on-call workforce) 🔎

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting / show-up / predictability pay** | Research located **no** DR equivalent to US-style reporting-time or predictability pay. | — | — | 🔎 (not found in sources reviewed) |
| **OT scheduling — opt-in, bilateral pre-approval (cross-ref §3a)** | Because OT cannot be compelled, best-practice (and typical Reglamento Interior content) is a **pre-shift approval workflow** between supervisor and worker for each OT event. | A supervisor requests OT for a specific shift; the worker consents event-by-event rather than under a standing OT-mandatory clause. | Reglamento Interior formalizes the workflow per employer. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Arts. 129–134 (Reglamento content) |
| **Cartel de Horario — schedule must be filed before it can be rostered against (cross-ref §1)** | The registered schedule poster (Art. 159) is the legal baseline the actual roster must match; deviations risk unenforceability / inspection findings. | — | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 159 |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Vacation accrual (Arts. 177–184)** | **14 working days** after 1 year continuous service; **18 working days** after 5 years. Less than 1 year: **1 day per 11 days worked** (pro-rata). | A worker at 2 years gets 14 days; at 6 years, 18 days; a worker with 132 worked days in their first year accrues 12 days (132 ÷ 11). | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Arts. 177–184 |
| **Vacation pay timing & no-cash-substitution while employed (Arts. 181–182)** | Paid at the **ordinary salary** rate **before** the vacation begins; vacation **cannot be cashed out** while employment continues — it only converts to a cash payout on termination. | An employee due 14 days off must be paid for those days in advance, not after returning. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Arts. 181, 182 |
| **Maternity leave — 14 weeks (Art. 236 area)** | **14 weeks** total, typically **6–7 weeks pre-natal + 7–8 weeks post-natal** (minimum 12 weeks confirmed in the seed research), split as medically advised. | A worker due 1 September takes ~6–7 weeks before the due date and the balance after. | Pending reform would extend related parental leave by **+1 week** — **not yet law** (§1). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) (maternity provisions, Art. 236 area) |
| **Pregnancy dismissal protection** | A pregnant worker (or one within **3 months post-partum**) cannot be dismissed via no-cause *desahucio* [unilateral termination without cause]; a for-cause dismissal requires **prior MT approval** confirming the cause is unrelated to pregnancy. | An employer seeking to dismiss a worker 2 months post-partum must first obtain MT sign-off. | Unauthorized dismissal triggers an additional 5-month-salary indemnity (money, downstream). | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) (maternity protection provisions) |
| **Paternity leave — 2 days** | **2 working days** of paid leave upon the birth of a child. | A new father takes 2 paid days following the birth. | Pending reform bill would extend parental leave generally by **+1 week** — not yet law. | [Rivermate — DR leave guide](https://rivermate.com/guides/dominican-republic/leave) 🔎 — statute article not located in primary source in this pass |
| **Sick leave — up to 26 weeks/year via social security** | Workers can access **up to 26 weeks/year**; compensation (~**60%** of regular wage) is paid through the **SFS** [Family Health Insurance] social-security system, **not** the employer directly, after an initial employer-covered period. Requires a medical certificate from an **SFS-affiliated** physician. | A worker out sick for 8 weeks draws SFS-administered sick pay for the bulk of that period rather than direct employer salary continuation. | Exact split between employer-covered initial days and SFS-covered balance not confirmed in sources reviewed 🔎. | Ley 87-01 (SDSS) [(register)](https://www.consultoria.gov.do/Consulta) 🔎; Rivermate country guide 🔎 |
| **Marriage leave — 5 days** | **5 days** of paid leave when an employee marries. | An employee takes 5 paid days around their wedding date. | 🔎 Statute article not located in primary source in this pass — reported by a multi-country guide, not confirmed against Código de Trabajo text. | [Rivermate — DR leave guide](https://rivermate.com/guides/dominican-republic/leave) 🔎 |
| **Bereavement leave — 3 days** | **3 days** of paid leave following the death of a grandparent, parent, child, or spouse. | An employee takes 3 paid days after a parent's death. | 🔎 Statute article not located in primary source in this pass. | [Rivermate — DR leave guide](https://rivermate.com/guides/dominican-republic/leave) 🔎 |
| **Nursing / breastfeeding breaks** | — not confirmed in current research — multi-country guides note working mothers generally have a right to paid nursing time, but the exact minutes/frequency were not located in the sources reviewed for this memo. | — | — | 🔎 (not found in sources reviewed) |
| **Domestic-worker leave carve-out** | *Trabajador doméstico* [domestic worker] sits under a distinct sub-regime; specific leave entitlements for this class were **not confirmed** in sources reviewed. | — | — | 🔎 (not found in sources reviewed) |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Mandatory recordkeeping + reversed burden of proof (Art. 16)** | Employers must keep records the Code obligates them to communicate/register/conserve; if they **cannot produce** these when challenged, the **worker's allegation of hours/days/pay is presumed true**. | A worker claims 10 unpaid OT hours; without a produced *Lista de Horas Extras* for that week, the claim is legally presumed correct. | No specific clock **technology** is mandated — badge, biometric, mobile app, or paper are all acceptable as long as records exist. | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 16; Reglamento 258-93 |
| **Required registers** | **Libro de Sueldos y Jornales** [wage/payroll book] · **Cartel de Vacaciones del Personal** [posted annual vacation schedule] · **Lista de Horas Extras trabajadas** [weekly OT log per worker] · **Libro de Inspecciones** [bound inspector's-notes book]. | A labor inspector's unannounced visit expects all four to be producible on the spot. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Art. 16; Reglamento 258-93 |
| **DGT-2 — per-event OT filing (cross-ref §3c)** | Every OT hour must be reported through **Planilla DGT-2** in **SIRLA**, contemporaneously (per event), not just at year-end. | — | — | [SIRLA](https://ovi.mt.gob.do) |
| **DGT-3 — annual fixed-personnel filing** | **DGT-3 Planilla del Personal Fijo** [Fixed-Personnel Roster] refreshed **annually, by 15 January**, covering the full active workforce. | An employer with 40 permanent staff on 1 January must have the DGT-3 roster filed for all 40 by 15 January, before that year's inspections begin. | — | [SIRLA](https://ovi.mt.gob.do) |
| **Record retention** | No explicit statutory retention period was located; **5–10 years** is the commonly cited practitioner recommendation (10 years for litigation safety, given the reversed burden of proof). 🔎 | A worker files a wage claim 8 years after leaving; an employer following the 10-year practitioner recommendation still has the *Lista de Horas Extras* on hand to rebut it. | — | 🔎 (practitioner recommendation, not a located statutory duration) |
| **Tolerance / rounding — no statutory rule; employer-set via Reglamento Interior** | The Code is **silent** on punch micro-tolerances; employers configure grace periods in the *Reglamento Interior* (typical **5–10 minutes**), which must be **registered with the MT** to be enforceable. | An employer sets a 5-minute pre-shift grace in its registered Reglamento; an unregistered grace period is unenforceable in a labor dispute. | — | [Código de Trabajo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1) Arts. 129–134 (silence in Art. 16/Reglamento 258-93 on tolerance itself) |

## Sources (requirements section)

- **Primary law:** *Código de Trabajo* (Ley 16-92, 1992) — full text confirmed live 2026-07-21 at the
  official government legal repository, [Consultoría Jurídica del Poder Ejecutivo](https://www.consultoria.gov.do/Consulta/Home/FileManagement?documentId=3332020&managementType=1)
  (scanned PDF, no per-article anchors — every Código citation above links to this same document).
  Reglamento 258-93, Ley 87-01 (SDSS), Ley 139-97 (holiday movement), Ley 8-90 (free zones), and
  Ley 5235 (*Regalía Pascual* [Christmas bonus] — money, not cited above) were not individually
  confirmed at a specific document URL in this pass; linked to the
  [Consultoría Jurídica search portal](https://www.consultoria.gov.do/Consulta) 🔎 as the register's
  stable base.
- **Repo seed:** `context/worldwide-calculations/dominican-republic.md` (2026 pass), plus practitioner
  sources (Guzmán Ariza & Asociados; Pellerano & Herrera; Acento/Diario Libre/El Caribe/Bloomberg
  Línea reform reporting 2024–2026; Esco Global Strategies free-zone compliance guide 2026).
- **Predecessor memo:** `support-memos/dominican-republic.md` (prior verdict-first pass) — preserved
  verbatim in the Appendix below.
- **Fresh web research (2026-07-21):** Rivermate country guides — Dominican Republic leave
  entitlements (paternity 2 days, sick leave up to 26 weeks/~60% via SFS, marriage 5 days,
  bereavement 3 days), working hours/overtime, employment-termination (probation period), employee
  rights & protections. These leave figures are flagged 🔎 where a Código de Trabajo article could
  not be independently located in this pass.
- 🔎 **Open verification items:** the numeric OT-hour ceiling (if any, §3c); minimum working age for
  minors (§1, commonly cited as 14); night-work ban for minors (§1/§4); nursing/breastfeeding break
  minutes (§10); marriage/bereavement leave statute articles (§10); on-call/standby regime (§8);
  holiday-on-rest-day doctrine (§6); record-retention statutory duration vs. practitioner
  recommendation (§11); individual document URLs for Reglamento 258-93, Ley 87-01, Ley 139-97,
  Ley 8-90 (all linked to the register's search portal, not a confirmed direct document link).

---

## Appendix (parked) — day.io capability & compliance-support analysis

Parked 2026-07-21. Former verdict-first memo content, kept intact.

# Dominican Republic — T&A compliance support

**Verdict: 🟠 Partial — a strong premium-emission fit.** The DR's defining machinery is its **statutory
tiered weekly overtime** — hours 45–68/week at **+35%**, hours beyond 68/week at **+100%** — which maps
cleanly onto our **weekly OT trigger** (S5) chained with **rate-by-hours** (`phases[].limit`, S3). Night
+15%, rest-day/holiday +100%, the holiday calendar, record-keeping, and convenio-as-policy all fit. The
gaps cluster in the **day/night 3-hour classification** (a net-new whole-shift classifier), **limit-validation**
(6h night cap, 36h weekly rest), **premium-composition mode** (DR stacks night×OT multiplicatively),
**worker-regime gating** (Art. 150 managerial exemption), and **leave accrual** — none of which corrupts the
core weekly-OT computation, so **0 Critical**. Read with the scope, verdict key, and **Basis key** in
[`README.md`](./README.md). No verdict is DB-confirmed this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`), and it is the DR's
> load-bearing capability. Both the **44h/week onset** *and* the **68h/week second-tier boundary** ride on
> S5 (the weekly accumulation window) + S3 (rate-chaining by the weekly hour-index). Scope is *the weekly
> trigger only* — it does **not** close the day/night classifier, the limit-validation gaps, or the
> composition mode. **Status caveat:** weekly OT is committed-in-delivery, **not yet `[API]/[UI]`-visible** —
> confirm ship status before a hard customer commitment.

**Legal source:** `worldwide-calculations/dominican-republic.md` (Ley 16-92 *Código de Trabajo*, Reglamento
258-93; 2026 pass). **⚠ Source silences flagged 🔎, not asserted:**
- The file gives **no numeric statutory ceiling on OT hours** — the tiers imply hours beyond 68/week are
  simply uncapped double-time. Any "80h/quarter"-style cap is **not** in the research file; treated as 🔎 (#9).
- Night×OT composition is given as a **"common interpretation"** (multiplicative, 1.35×1.15 = 1.5525×) with
  an additive employer/convenio variant (1.50×) — **not** a single statutory constant (#17).
- A modernization bill (Senate 2nd reading July 2025) is **pending, not law** — all rows reflect current
  law; the reform is not modeled.

## Rule-by-rule (Basis = where the verdict comes from)

| # | Dominican Republic requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **44h/week · 8h/day — weekly OT onset (Art. 147).** The workweek is the unit of OT measurement; OT starts beyond 44h in the week, **not** on a daily trigger. Weeks must be sealed before pay finalizes (biweekly payers cut mid-week to align to the 44h boundary) | **Weekly OT trigger** — OT on hours beyond the weekly threshold, over a configurable week window | ✅ | [PO] | Committed-in-delivery 2026-07-18; **not yet `[API]/[UI]`-visible** — confirm ship status |
| 2 | **Tiered weekly OT bands — hrs 45–68 → +35%, hrs >68 → +100% (weekly-tier model, §3.4.1).** Two progressive bands chosen by the **cumulative weekly hour-index** | Weekly OT + **rate-chaining by hours** (`phases[].limit`) keyed to the weekly total — a +35% row up to the 68h boundary, chained to a +100% row beyond | ✅ | [PO][API] | **Marquee fit**: S5 weekly trigger × S3 `phases[].limit` maps the two-band weekly tier exactly (cf. FR 25/50 bands, keyed to the weekly index) |
| 3 | **Night premium +15% (9 PM–7 AM), independent of OT (Art. 149/§3.4.2).** In-window hours carry +15% regardless of whether OT thresholds are crossed | `nightShift {%, start, end, applyEntirePeriod}` — window + premium | ✅ | [API][UI] | Emission ✅ (S8); configure window 21:00–07:00, % 15 |
| 4 | **Day/night classification — 3-hour boundary rule (Art. 149).** A shift with **>3 night-hours** reclassifies daytime→night **as a whole**, extending night treatment and dropping the daily cap 8h→6h | Opt-in per-minute day/night split + night window; **no threshold-gated whole-shift reclassification** | 🟠 Partial | [API][ABS] | Base +15% on **in-window** hours ✅ `[API]`; the **whole-shift flip + class-dependent cap = net-new** (workbench run `dominican-republic-day-night-classification.md`; **flow-finding #23**) `[ABS]` |
| 5 | **Night-shift caps — 6h/day · 36h/week (fully-night shifts, §2.4).** A nocturnal shift is capped at 6h/day and 36h/week — a statutory **maximum**; the engine should flag a breach, not silently cap hours | No working-time-limit breach flagging | ❌ Gap | [ABS] | Limit-validation (G4), gated behind #4's classification; alert-only (S13) today |
| 6 | **Rest-day worked → +100% OR compensatory day off (Art. 163).** Working the 36h weekly-rest day pays +100% **or**, at the worker's election, a comp day off the following week | Rest-day/DSR rate row (`daysMask` DSR & Rest days) | 🟠 Partial | [API][ABS] | +100% premium row ✅ `[API]` (S1); the **comp-day-off-in-lieu election** (a day-off-owed-in-window) is not a typed event `[ABS]` |
| 7 | **Holiday worked → +100%, no comp option (jurisprudence, §3.3).** A worked statutory holiday pays +100% on top of the day's pay; the worker keeps both | Sunday & Holidays rate row | ✅ | [API] | S1 `daysMask` Holiday bit |
| 8 | **Weekly rest — 36 consecutive hours, usually Sunday (Art. 163).** A minimum 36h continuous weekly rest; a breach should raise a flag | Schedule assigns the rest day; reports export the data | 🟠 Partial | [ABS] | Schedule + report surface it; breach-**validation** is alert-only (G4) `[ABS]` |
| 9 | **OT caps + no-compulsion (§3.4.5).** Workers **cannot be compelled** to work OT (opt-in per event); any statutory ceiling on OT hours would need a running per-worker counter | Overall **period cap**, single period (S7); no cross-run YTD counter | 🔎 Verify | [LAW][ABS] | **Research file is silent on any numeric OT hour cap** — tiers imply >68h is uncapped double-time. IF a cap exists → G3 cross-run counter. The consent/opt-in rule is a **scheduling workflow**, not a calc quantity |
| 10 | **13 public holidays + Ley 139-97 Monday-movement (§2.5).** 13 statutory holidays; most Tue–Fri holidays shift to the nearest Monday (except 1 Jan, 27 Feb, Good Friday, 25 Dec) | Holiday calendar (`SourceHoliday`), jurisdiction-keyed | ✅ | [FLD] | Monday-movement = which **observed dates** populate the calendar (reference data) |
| 11 | **Intra-shift meal break ≥1h (§2.4).** At least 1h meal break when the shift exceeds the threshold; unpaid, netted from the worked total | Break config on the schedule (mode, paid/unpaid, startAfter) | 🟠 Partial | [DES] | Break configurable `[DES]`; **adequacy-validation/flagging unconfirmed** 🔎 |
| 12 | **Vacation accrual — 14 days @1yr → 18 days @5yrs; <1yr pro-rata (Arts. 177–184).** Paid-leave entitlement rises with service years | — | ❌ Gap | [ABS] | Leave-accrual ledger keyed to **service-year tiers** (G12); adjacent to core T&A |
| 13 | **Record every hour — reversed burden of proof (Art. 16 · Reglamento 258-93).** Employer must keep append-only, tamper-evident records incl. the weekly *Lista de Horas Extras*; unrecorded facts are presumed in the worker's favor | Engine records every punch; approved-event locking; weekly OT report | ✅ | [FLD] | Compliance value-add; the DGT-2 weekly-OT filing is an output cut of this |
| 14 | **Convenio colectivo as policy overlay (Arts. 103–128).** A CBA can raise premiums (e.g. night 25% vs statutory 15%) and sits **above** the statutory floor | One compensation arrangement = one pay policy | ✅ | [UI][DES] | S16; more-favorable-rule selection is operational, per bargaining unit |
| 15 | **Managerial/executive exemption (Art. 150).** Executives/managers sit outside the 8h/44h cap (up to 10h/day, no OT triggers) | — (crude workaround: assign a no-weekly-OT policy) | 🟠 Partial | [ABS][DES] | Worker-regime gating / exempt flag (G5) not first-class; workaround exists |
| 16 | **Minors — max 6h/day (Art. 247).** Under-age workers are capped at 6h/day | — | 🟠 Partial | [DES] | Dedicated pay policy + age-flagging workflow (cf. FR minors) |
| 17 | **Premium composition — night × OT stack multiplicatively (§3.4.2).** A night OT hour compounds (1.35 × 1.15 = 1.5525×) by orthodox reading; some employers/convenios treat it additively (1.50×) | Named payroll-event per rate row; day/night `type`; the day/night split **composes** onto the OT state | 🟠 Partial | [DES] | Typed buckets ✅ (S1/S2); the **composition MODE** (multiplicative vs additive) is not first-class configurable (G6). The % itself is downstream money |

## Summary — rule-by-rule (2026 pass)

The DR posture is **strong on pay-emission, thin on limit-validation**: **7 of 17 rules are ✅** — the two
weekly OT bands (#1–2), night +15% (#3), holiday +100% (#7), the holiday calendar (#10), record-keeping
(#13), and convenio-as-policy (#14). The load-bearing win is the **tiered-weekly-OT fit** (#1–2): the +35%
→ +100% weekly tiering is *exactly* what S5+S3 express.

Ten rules remain non-fully-supported:

| # | Rule | Verdict | Why it's still open |
|---|---|---|---|
| 17 | Premium composition (night × OT multiplicative) | 🟠 Partial | Composition MODE (multiplicative/additive) not first-class — the one pay-shaping gap |
| 4 | Day/night 3h reclassification | 🟠 Partial | Net-new threshold-gated whole-shift classifier (flow-finding #23); base in-window +15% works |
| 5 | Night 6h/36h caps | ❌ Gap | Limit-validation; gated behind #4's classifier; alert-only |
| 6 | Rest-day +100% OR comp day off | 🟠 Partial | +100% works; comp-day-off-in-lieu election is not a typed event |
| 8 | Weekly rest 36h | 🟠 Partial | Schedule + report surface it; breach-validation is on-demand, not standard |
| 9 | OT caps / no-compulsion | 🔎 Verify | Research file silent on any numeric OT cap; consent is a scheduling workflow |
| 11 | Meal break ≥1h | 🟠 Partial | Break config exists; adequacy-validation unconfirmed |
| 12 | Vacation accrual (14/18 days by service) | ❌ Gap | No service-year leave-accrual ledger |
| 15 | Managerial exemption (Art. 150) | 🟠 Partial | Regime gate not first-class; crude no-OT-policy workaround |
| 16 | Minors 6h/day | 🟠 Partial | Dedicated policy + age-flagging workflow |

Net effect: the DR's *pay determination* — the tiered weekly OT plus night/rest-day/holiday premiums — is
servable today; what's left open is **classification** (the 3h rule), **limit-validation** (caps, weekly
rest, break adequacy), **composition mode**, **regime gating**, and **leave accrual** — none of which
corrupts the computed weekly-OT quantity.

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) rules are omitted (they
> need no mitigation) — that's **7 of the 17 rows**; see the Summary above.
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped, or core to the OT model) · 🟡 Medium (moderately common, or a usable
> mitigation, or moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow
> population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general DR market* a rule bites. **⚠ Customer-relative** — shifts with the
>   workforce: **free-zone / hospitality / healthcare night-and-weekend operations → #4 classification, #5
>   night cap, #17 composition**; **manager-heavy employers → #15**.
> - **Build-effort** = my estimate, **grounded in engine ground truth** (Existing/`[API]` ≈ config/small **S**;
>   `[DES]`/net-new field ≈ **M**; net-new subsystem/classifier ≈ **L**). **⚠ Calendar time needs engineering
>   validation.**

| Rule | Mitigation today | Prevalence (DR market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#17 Premium composition (night × OT multiplicative)** | **Partial** — typed night/OT buckets emit today; the multiplicative-vs-additive composition mode isn't first-class, and convenios often resolve it downstream anyway (the % is money) | **Med-High** — bites every hour that is both night AND OT (44h+ night operations) | **M** — a composition-mode axis on stacked premiums | 🟠 **High** |
| **#4 Day/night 3h reclassification** | **Partial** — the statute-compliant **in-window +15%** is supported; the whole-shift flip + class-dependent 6h cap is the net-new piece (flow-finding #23) | **Med** — mixed/night shifts (free-zone, hospitality) | **L** — a threshold-gated whole-shift classifier (net-new); pay stays statute-correct on the in-window base | 🟡 **Medium** |
| **#5 Night 6h/36h caps** | **Partial** — manual monitoring; **pay stays correct** (a cap decides legality, not pay); gated behind #4 | **Med** — fully-night populations | **M** — class-dependent cap flag + weekly counter | 🟡 **Medium** |
| **#6 Rest-day comp-day-off election** | **Strong** — always pay the +100% default (worker-favorable, statute-safe); the comp-off *alternative* is the missing lieu-scheduling event | **Med** — workers who work their rest day and elect comp-off | **M** — day-off-owed-in-window typed event | 🟡 **Medium** |
| **#11 Meal break ≥1h** | **Config** — configure the ≥1h unpaid break on the schedule; adequacy-*validation/flagging* is the open piece | **High** (all workers) | **S-M** | 🟡 **Medium** |
| **#12 Vacation accrual (14/18 by service)** | **Partial** — leave handled as absences; the 14→18-day service-year accrual ledger + <1yr pro-ration need a leave module or manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **M** — service-year-tiered accrual counter | 🟡 **Medium** |
| **#8 Weekly rest 36h** | **Strong** — assigned at the schedule level; reports already export the data; breach-flagging can be added on demand | **High** as a legal obligation (non-corrupting) | **S** — formalize the on-demand export into a standard breach alert | 🟢 **Low** |
| **#9 OT caps / no-compulsion** | **Strong** — a single-period cap (S7) exists; OT is opt-in via scheduling workflow; **no numeric cap confirmed in the research file** | **Low** — unconfirmed whether any statutory cap even applies | **M** — cross-run YTD counter *if* a cap is confirmed | 🟢 **Low** / 🔎 Verify |
| **#15 Managerial exemption (Art. 150)** | **Strong** — exclude from the weekly-OT policy entirely (assign a no-OT policy) | **Low-Med** — executives/managers only | **S** — exempt flag | 🟢 **Low** |
| **#16 Minors 6h/day** | **Partial** — a dedicated pay policy caps the schedule; the age-flagging workflow is the missing gate | **Low** — minors are a narrow population | **S-M** — age flag + dedicated policy | 🟢 **Low** |

### Severity roll-up (2026 pass)
- **🔴 Critical (0):** none — the DR has **no annualised/averaging OT** (OT is weekly, and weekly OT is supported); nothing pay-corrupting on the core computation.
- **🟠 High (1):** premium composition mode (#17) — the one pay-shaping gap, and DR-distinctive (multiplicative stacking).
- **🟡 Medium (5):** day/night reclassification (#4), night 6h/36h caps (#5), rest-day comp-off election (#6), meal break (#11), vacation accrual (#12).
- **🟢 Low (4):** weekly rest 36h (#8), OT caps/no-compulsion (#9, 🔎), managerial exemption (#15), minors (#16).

## The big gaps
1. **Day/night 3-hour classifier** (#4–5, `[ABS]`) — the spine has no *threshold-gated whole-shift classifier*: count in-window hours, flip the whole shift's class, and let that class select a downstream parameter (the 6h/8h cap + premium scope). Logged as **flow-finding #23**; the DR 3h rule is its first confirmed instance.
2. **Limit-validation** (#5, #8, #11, `[ABS]`) — the 6h night cap, 36h weekly rest, and break-adequacy are all *flag-a-breach* obligations; we compute pay, not statutory limit enforcement (alert-only today).
3. **Premium-composition mode** (#17, `[DES]`) — multiplicative vs additive stacking of night×OT isn't a first-class axis.
4. **Regime gating + leave accrual** (#15, #12, `[ABS]`) — the Art. 150 managerial exemption has no worker-regime axis (crude workaround only), and the 14/18-day service-year vacation ledger isn't modeled.

## Where the Dominican Republic scores well (worth saying)
- **Tiered weekly OT** (#1–2): the marquee fit. The +35% (45–68h) → +100% (>68h) weekly tiering computes on the **weekly hour-index** via the OT `phases[].limit` table — S5 (weekly trigger) × S3 (rate-chaining) express it exactly `[PO]/[API]`. This is arguably our **cleanest premium-emission fit** among the memo'd countries, because DR OT is purely weekly with **no annualisation/averaging** to unbuild.
- **Night / rest-day / holiday premium emission** (#3, #6–7): +15% night, +100% rest-day/holiday all emit as typed rate rows via `daysMask` and the night window `[API][UI]`.
- **Convenio-as-separate-policy** (#14): one arrangement = one policy matches the DR overlay model exactly `[UI][DES]`.
- **Record-all-hours** (#13): a genuine compliance value-add — the DR's reversed-burden-of-proof regime makes append-only, audit-trailed capture a *legal defense*, and the engine records every punch `[FLD]`.
- **Holiday calendar** (#10): the 13 statutory holidays + Ley 139-97 Monday-movement resolve to jurisdiction-keyed reference data `[FLD]`.

## 🔎 Verify before telling the customer
- **Weekly OT (#1–2)**: marked ✅ per product-owner confirmation (2026-07-18) — **not yet `[API]/[UI]`-visible**. Since *both* the 44h onset and the 68h second-tier boundary depend on it, confirm ship status before a hard commitment.
- **OT hour cap (#9)**: the research file is **silent** on any numeric statutory OT ceiling — do **not** assert an "80h/quarter"-style cap. Confirm whether one applies before promising (or ruling out) a counter.
- **Premium composition (#17)**: confirm whether the customer's convenio resolves night×OT as multiplicative (1.5525×) or additive (1.50×) — the engine doesn't pick the mode first-class.
- **Day/night classifier (#4)**: the whole-shift reclassification is a **proposed** workbench run, not built — never cite it as shipped.
- **Break adequacy (#11)** and **weekly-rest breach (#8)**: config exists; whether the engine *validates/flags* is the open piece.

## Bottom line for the customer
With **weekly overtime supported**, the DR is one of our **cleanest premium-emission fits**: the statutory
**tiered weekly OT** (+35% then +100%, by weekly hour-index) maps directly onto our weekly trigger + rate-
chaining, and night, rest-day, holiday premiums, the holiday calendar, record-keeping, and convenio-as-policy
all fit. The remaining gaps are **classification** (the 3-hour day/night rule), **limit-validation** (6h night
cap, 36h weekly rest, break adequacy), the **composition mode** (multiplicative night×OT), and **regime /
leave** machinery (Art. 150 exemption, service-year vacation) — none of which blocks a standard-workforce
deal or corrupts the computed OT. Honest status: **partial, no Critical gaps; the standard case is servable,
with the day/night classifier and composition mode the items to watch for free-zone / night-heavy customers.**
