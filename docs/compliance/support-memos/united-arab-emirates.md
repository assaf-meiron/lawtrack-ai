# United Arab Emirates — T&A requirements

> **What this is.** The ground-truth reference for the UAE's time-&-attendance legal
> requirements, detailed enough to **build a day.io pay policy from**. It aims to be **exhaustive**
> and **atomic**: **one legal proposition per row**, each row self-contained (no "see §X" as the
> only content), with exact values, a worked example wherever a number is involved, variants, and a
> `Basis` that **links to the primary source** so any row can be checked against the law directly.
>
> **Scope: time & day-events only** — money (%, AED, tax, gross-to-net, end-of-service gratuity,
> Wage Protection System transfer mechanics) is out of scope (premiums are named for context in
> `Values` but the deliverable is the typed hour/day event).
> **Term convention:** every non-English (Arabic) term is glossed in English in brackets on first
> use, e.g. *Hijri* [the Islamic lunar calendar], *Hajj* [the Islamic pilgrimage to Mecca].
>
> **Legal sources & links:** [Federal Decree-Law No. 33/2021](https://uaelegislation.gov.ae/en/legislations/1541)
> "Concerning the Regulation of Labour Relations" and its Executive Regulation,
> [Cabinet Resolution No. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547), both on the
> `uaelegislation.gov.ae` register; [Federal Decree-Law No. 9/2024](https://uaelegislation.gov.ae/en/legislations) 🔎
> (amendments); [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎
> "Employment Law" (as amended) on the DIFC legal database; the ADGM Employment Regulations
> 2019/2024 🔎 on the ADGM rulebook; cross-checked against [MOHRE guidance](https://www.mohre.gov.ae),
> `u.ae`, and Al Tamimi & Co./ATB Legal secondary guides. Repo seed:
> `context/worldwide-calculations/united-arab-emirates.md` (July 2026). This pass's primary-source
> WebFetch attempts at `uaelegislation.gov.ae`, `mohre.gov.ae`, `difc.com` and `adgm.com` returned
> **403/connection-refused (bot-blocked)**; the linked URLs are confirmed to **exist** via
> independent web-search indexing (exact title + path match) but their live content was **not**
> re-fetched this pass — treat every 🔎 figure/link here as **carried forward, not freshly
> verified**. Full source list at the foot of the requirements section.
>
> **The one structural fact that shapes this whole document.** The UAE is **not one law** — it is **three separate employment-law
> regimes** sharing one federal territory. The **mainland** ([Federal Decree-Law No. 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) +
> [Cabinet Resolution No. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547)) is a **statutory-premium** jurisdiction: the country layer itself
> fixes overtime at +25%/+50% — there is **no collective-bargaining layer** (UAE law does not
> provide for trade unions/CBAs in the private sector), so the operative numbers sit directly in
> the federal statute, unlike CBA-driven jurisdictions. **DIFC** (Dubai International Financial
> Centre) and **ADGM** (Abu Dhabi Global Market) are common-law free zones with their **own,
> self-contained statutes** that displace the mainland law entirely for entities licensed there —
> and both have moved, since April 2025, to a **contract-only overtime model** with no statutory
> premium at all. Which of the three regimes an employment contract sits in is a
> **per-entity/per-worker resolving fact** (§1) — get it wrong and every downstream rule (OT
> existence, leave ladder, sick-pay tiers) is wrong.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Three regimes, three statutes** | `employment_regime ∈ {mainland, difc, adgm}` — a hard branch, not a delta on one base law. Each regime is modelled as its **own** pay policy. | A DIFC-licensed bank and a JAFZA-licensed logistics firm both sit in Dubai, but only the JAFZA entity follows the federal mainland statute; the DIFC bank follows [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 entirely. | The great majority of "free zones" (JAFZA, DMCC, Dubai Media City, etc.) are **not** separate legal jurisdictions for employment — only DIFC and ADGM are. | [Federal Decree-Law No. 33/2021](https://uaelegislation.gov.ae/en/legislations/1541); [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎; [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |
| **Mainland governing instruments** | [Federal Decree-Law No. 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) "Concerning the Regulation of Labour Relations" (in force 2 Feb 2022) sets working-time, OT, rest, leave. [Cabinet Resolution No. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) (Executive Regulation) fills in the shift-system/Ramadan/travel-time detail. [Federal Decree-Law No. 9/2024](https://uaelegislation.gov.ae/en/legislations) 🔎 (in force 31 Aug 2024) amends both. | — | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541); [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547); [Decree-Law 9/2024](https://uaelegislation.gov.ae/en/legislations) 🔎 |
| **[Decree-Law 9/2024](https://uaelegislation.gov.ae/en/legislations) 🔎 — classification-adjacent amendments** | All employment contracts are now **fixed-term** (unlimited-term contracts abolished); administrative fines escalated to up to **AED 1,000,000** for the gravest breaches (money, context only); dispute-limitation period extended to **2 years**; MOHRE's own binding-decision authority widened to claims **≤ AED 50,000**. | A contract signed after 31 Aug 2024 cannot be "unlimited" — it must state a fixed term, which feeds notice/leave-proration logic downstream. A worker filing a wage claim of AED 40,000 in 2026 falls within MOHRE's own binding-decision authority (≤ AED 50,000) rather than requiring court referral, and still has time to file since the claim arose well within the 2-year limitation window. | — | [Federal Decree-Law No. 9/2024](https://uaelegislation.gov.ae/en/legislations) 🔎 |
| **Six work models** | `full-time` (single employer, 8h/day–48h/week baseline) · `part-time` (one-or-more employers, agreed reduced hours) · `temporary` (task/project-bound) · `flexible` (hours/days vary within an agreed envelope) · `remote` (contract must fix specific hours — no default to unmeasured time) · `job-sharing` (duties/hours split between 2+ workers by agreement). | A part-time worker on a 24h/week contract has their OT baseline set at 24h, not 48h; a job-sharing pair each carry their own agreed-share baseline as two separate T&A subjects. | 🔎 Cabinet Resolution article numbers enumerating each model's operating conditions are not consistently cited across secondary sources — the *definitions* are settled (MOHRE's u.ae platform), article-level citations need verification. | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 4; [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) |
| **Managerial / board / maritime exemption (Art. 17)** | Chairmen and board members; persons in a genuinely supervisory position **exercising the capacities of an employer** (narrower than a job title); maritime crews/workers at sea under their own service conditions — exempt from the general working-hours limits and OT premium. Still recorded. | A department head with real hire/fire/budget authority is exempt from the 8h/48h caps and OT pricing; a "senior analyst" with no such authority is not. | Structurally analogous to Germany's *Leitende Angestellte* / the Netherlands' high-earner exemption — framed around genuine authority or a distinct legal regime (maritime), not title or pay level. | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 17; [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) (Executive Reg.) |
| **Free zones generally = mainland** | Any UAE-incorporated entity defaults to `employment_regime = mainland` **unless** specifically licensed in DIFC or ADGM — other free zones (JAFZA, DMCC, Dubai Media City, etc.) only differ on visa/licensing, not employment law. | A DMCC-licensed trading company follows the federal mainland statute in full. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) (general applicability) |
| **DIFC — separate common-law statute** | DIFC Law No. 2 of 2019 "Employment Law", as amended (DIFC Laws No. 4/2020, 4/2021, 2/2022, 1/2024, 1/2025) governs any DIFC-licensed entity **entirely** in place of the mainland statute — working time, OT (none statutory), rest, leave all differ (detail in §3–§10). | — | — | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 (as amended) |
| **ADGM — separate common-law statute, 2024 reform in force** | ADGM Employment Regulations, originally 2019, now the **Employment Regulations 2024** (in force **1 Apr 2025**, replacing the 2019 regime) governs any ADGM-licensed entity entirely. The 2024 reform **removed statutory overtime provisions entirely** — a load-bearing, time-sensitive change (detail §3). | Any material still citing ADGM's 25%/50% OT rates as current describes the **superseded 2019 regime**. | A legacy entity demonstrably still governed by the superseded 2019 Regulations (rare, transitional) keeps the old 25%/50% table. | [ADGM Employment Regulations 2019](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 & 2024 |
| **Juveniles / minors — protected regime 🔎** | UAE law sets a minimum working age and (under the pre-2021 [Federal Law No. 8/1980](https://uaelegislation.gov.ae/en/legislations) 🔎, Arts. 20–24) capped juvenile (15–18) hours at **~6h/day** with a break **≥1h after 4 consecutive hours**, banned **night work ~19:00–07:00**, barred OT/rest-day/holiday work, and required a medical-fitness certificate + guardian consent. **🔎 Not confirmed whether these exact figures carry unchanged into [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541)'s executive-regulation framework** — the 2021 law replaced the 1980 law wholesale; treat as the last-known baseline, verify article-level detail before configuring. | A 16-year-old apprentice would (on the pre-2021 baseline) be capped at 6h/day and barred from a 20:00 shift. | — | [Federal Law No. 8/1980](https://uaelegislation.gov.ae/en/legislations) 🔎 Arts. 20–24 (superseded baseline); [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) (current, article-level detail unconfirmed) |
| **No collective-bargaining / CBA layer** | Unlike Germany or the Netherlands, UAE private-sector law does **not** provide for trade unions or collective agreements — the country/regime layer is the *only* layer; there is no "policy per CBA" fan-out to model. | — | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) (silence on CBAs) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Travel time excluded by default (mainland)** | Home↔workplace commute is **not** working time, unless one of three carve-ins applies: (a) delay from severe weather per a National Centre of Meteorology warning; (b) accident/breakdown of **employer-provided** transport; (c) employer and employee **expressly agree** to include it. | A worker delayed 40min by an NCM-flagged sandstorm warning while on employer transport: that 40min counts as working time. | DIFC/ADGM equivalents not confirmed in available sources — verify separately if modelling those regimes. | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 17; [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) |
| **Remote work — contract must fix specific hours** | [MOHRE guidance](https://www.mohre.gov.ae) requires a remote-work contract to state **specific working hours** — remote does not default to an unmeasured/output-only arrangement. | A fully remote worker still has a defined 9:00–17:00 schedule against which OT/shortfall is measured. | Check-in/check-out software may substitute for physical punches. | [MOHRE guidance](https://www.mohre.gov.ae) (work-model definitions) |
| **Flexible work model — needs a period norm** | Hours/days vary within an **agreed envelope**, but the engine still needs a period norm (the agreed average) to detect overtime — flexibility changes the scheduling, not the existence of the 8h/48h-equivalent ceiling test. | A flexible-model worker with an agreed 40h/week average who logs 50h in one week is 10h over, even though daily start/end times vary. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 4; [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) |
| **Job-sharing — individual baseline** | Each worker's own agreed share of the role is their **individual** `contract_hours` baseline; tracked as separate T&A subjects, not a combined entity. | Two workers splitting one role 60/40 each carry their own OT baseline at 60% and 40% of the full-time norm. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 4 |
| **Ramadan — a norm change, not working-time exclusion** | During Ramadan [the Islamic fasting month], the **daily norm itself drops from 8h to 6h** (a −2h reduction) for the **whole workforce, regardless of religion**, with **no pay reduction**. The change alters what "working time" a full day *is*, for the whole month — placed here and cross-referenced at OT onset (§3a). | An 8h-norm worker in Ramadan has a 6h norm; working 7h that day already puts 1h into overtime. | (Superseded) ADGM 2019 Regulations applied a **25% reduction to Muslim employees only** — narrower scope; not confirmed whether ADGM 2024 retains, broadens, or drops this. DIFC treatment not confirmed 🔎. | [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15; [MOHRE guidance](https://www.mohre.gov.ae) |

## 3. Overtime

*Mainland UAE prices overtime **directly and statutorily** — the opposite posture from Germany's silent statute. DIFC and ADGM, as of April 2025, are both **contract-only** — no statutory OT premium at all.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Mainland norm — 8h/day or 48h/week (Art. 17)** | The two figures are alternative framings of one norm (not independently binding) — the **weekly** figure governs scheduling flexibility across a 5–6 day week. Hours beyond the norm are overtime. | A worker doing 9h Mon–Thu and 8h Fri (44h) has no OT; the same worker doing 10h Mon–Thu (40h) plus 8h Fri (48h) has no OT either — but a 50h week has 2h OT. | Successive-shift/continuous-operation sectors get a **9h/day, avg 56h/week** norm instead (next row). | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 17 |
| **Successive-shifts / continuous-operation exception — 9h/day, avg 56h/week** | MOHRE-approved sectors whose technical nature requires successive shifts/rounds (hotels, cafeterias, security, similar continuous operations) may run a **9h/day** norm averaging **≤56h/week**. A narrow, sector-conditioned accommodation, not a general scheduling licence. | A hotel security team on the MOHRE-approved designation works 9h/day, 6 days/week (54h) with no OT — under the mainland default this would already be 6h into overtime. | `shift_system_designation` (bool, MOHRE-approved) gates this; also gates the night-OT carve-out (§3b) and the 56h weekly-average ceiling (§4). | [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **Ramadan reduction shifts the OT-onset threshold** | The Ramadan-reduced **6h/day** norm (§2) is what OT is measured against for the whole month — a day at 7h is already 1h into overtime, whereas outside Ramadan the same 7h day has none. | A non-Ramadan 7h day at the 8h norm has 0 OT; the identical 7h day *during* Ramadan (6h norm) has 1h OT. | ADGM 2019 (superseded): 25%-of-day reduction, Muslim employees only — not the mainland's blanket 2h/all-workers rule. | [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **Part-time onset = the agreed hours** | OT for a part-time worker starts above their **own contract's** agreed hours, not the 48h full-time line. | A 20h/week part-time contract worker doing 25h has 5 OT hours from the 21st hour. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 4 (work models) |
| **DIFC — no statutory OT, so no statutory onset** | 48h/week averaged over 7 days is a **working-time limit** (§4), not an OT trigger — DIFC has **no statutory overtime entitlement or rate** at all; any OT pay exists only where the contract/policy grants it. | A DIFC employee working 55h in a week (within the 78h opt-out ceiling) is owed OT pay only if their contract says so — the statute is silent. | Contractual-premium jurisdiction, like the Netherlands or UK. | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 Art. 22 |
| **ADGM — no statutory OT since 1 Apr 2025** | Same posture as DIFC under the 2024 Regulations: 48h/7-day cap is a limit, not an OT trigger; overtime is contract-only, and any overtime now additionally requires the **employee's written consent**. | An ADGM employee working past 48h/week needs written consent for the extra hours; whether those hours carry a premium is contract-defined. | The **superseded 2019 Regulations** did trigger statutory OT beyond the 48h/7-day cap at +25%/+50% (21:00–04:00) — no longer current for entities on the 2024 Regulations. | [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎; (superseded) 2019 Regs |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Mainland ordinary OT — +25%** | **+25%** of the worker's **basic wage** (housing/transport allowances, commissions and other benefits excluded from the base) for overtime on an ordinary day outside the night window. | A worker on an AED 100/day basic-wage-equivalent rate doing 2h OT on an ordinary day: 2h typed `OT_125`, priced at 125% of the hourly basic-wage rate (money downstream). | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19 |
| **Mainland night OT — +50%, window 22:00–04:00** | Overtime hours falling **between 22:00 and 04:00** carry **+50%** instead of +25% — but **only for hours that are already overtime** (it does not attach to ordinary scheduled night hours). | A non-shift worker doing 11h (15:00–02:00, break already deducted): 8h `WORKED_HOURS`, then 3h OT of which all 3h fall in 22:00–04:00 → all 3h type `OT_NIGHT_HOURS` (+50%), not `OT_125`. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19; [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **Shift-worker night-OT carve-out — flat +25%** | A worker on a **shift-rotation system** gets the flat **+25%** even for overtime hours inside 22:00–04:00 — the +50% uplift is switched off entirely for this population. | The same 3 OT hours above, if the worker were shift-rostered, type `OT_125: 3h` (+25%) instead of `OT_NIGHT_HOURS`. | Easy to mis-model as a blanket night premium (EU/Netherlands/Poland-style) — doing so overpays every shift worker's night overtime. | [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **DIFC / ADGM (current) — no statutory rate** | Neither regime prescribes an OT %; any premium is whatever the contract/internal policy states. | — | ADGM **superseded 2019** Regulations: +25% general, +50% for 21:00–04:00 (note the wider night window vs. mainland's 22:00) — not current post-1 Apr 2025. | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎; [ADGM Employment Regs 2019](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 (superseded)/2024 |
| **Basis of calculation — basic wage only** | All mainland OT premiums multiply the worker's **basic wage** — never total remuneration. | — | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Mainland daily OT cap — 2h/day** | OT may not exceed **2 hours/day**, except to **prevent a gross loss or serious accident**, or mitigate its effects (an emergency carve-out, not routine scheduling). | A worker doing 3h OT in one day breaches the cap unless the loss/accident exception applies → flag for compliance review. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19 |
| **Mainland 3-week aggregate ceiling — 144h/3 weeks** | Total working hours (**including** overtime) must not exceed **144 hours in any rolling 3-week period** — binds in parallel with the daily 2h cap. | Five 10h days/week for 3 weeks (150h) breaches the 144h ceiling even if no single day breached the 2h OT cap. | — | [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **DIFC — up to ~78h/week with written consent** | The 48h/7-day-averaged cap may be exceeded only with the employee's **prior written consent** — commonly cited up to **~78h/week** (subject to daily/weekly rest floors). An EU-Working-Time-Directive-style individual opt-out. | A DIFC employee signs a written opt-out and works 60h in a week — lawful; without the opt-out, 60h would breach the 48h-averaged cap. | 🔎 The ~78h figure is a commonly-cited outer bound, not a numbered statutory ceiling in every summary consulted — verify against the current consolidated DIFC Employment Law text. | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 Art. 22 |
| **ADGM — written consent required beyond 48h/7-day, plus a health/safety overlay** | Beyond 48h/7-day period requires the employee's **prior written consent**; separately, employers may **never** require hours "excessive or detrimental to health/safety," **regardless of consent** — a general-duty ceiling on top of the numeric one. | An ADGM employer cannot rely on a signed consent alone to schedule hours a regulator would deem unsafe. | — | [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No OT-determining averaging** | Mainland OT is computed **per period** (day against the 8h/9h norm, week against 48h/56h) — not netted over a rolling window the way Germany's 6-month averaging validates a working-time limit. The rolling ceilings that *do* exist (144h/3-week mainland; 48h/7-day DIFC/ADGM) are working-time **limits**, addressed in §4, not OT-rate averaging. | — | The 56h/week **average** for the successive-shifts exception (§3a, §4) decides whether the *schedule* is lawful, not how much OT premium is owed — placed in §4. | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541); [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Night-OT bands are mutually exclusive substitutes, not additive** | An overtime hour in 22:00–04:00 types as **either** `OT_125` (+25%, shift workers) **or** `OT_NIGHT_HOURS` (+50%, non-shift workers) — never both, and never a night premium *stacked on top of* the ordinary OT rate. Unlike Germany's additive night+Sunday stacking. | A non-shift worker's 2 a.m. OT hour is priced once, at +50% total — not +25% (OT) plus a separate night uplift. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19; [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **Rest-day/holiday election is mutually exclusive per incident** | The **+50%** cash premium and the **day-off-in-lieu** are alternative remedies for the *same* incident — never both, and never a running balance (detail §7). | A rest-day worked either draws +50% cash **or** a substitute day off — not both. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Arts. 19–20, 28 |
| **OT-plus-rest-day/holiday interaction 🔎** | Whether an overtime hour that also falls on a worked rest day or public holiday draws **both** the OT band (§3b) and the rest-day/holiday +50% (§6), or whether one supersedes the other, is **not confirmed** in available sources. | — | Flag for verification before configuring a policy where rest-day OT is common. | 🔎 not confirmed in [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) secondary guides consulted |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekly rest day — ≥1 paid day/week, no statutory default day** | At least **1 paid rest day/week**, as fixed in the **employment contract or internal work regulation** — the pre-2022 law named Friday; the current statute leaves the day to the employer/contract entirely. | An employer runs a Sun–Thu working week with Fri–Sat rest, or a Mon–Fri week with Sat–Sun rest — both lawful; changing an existing pattern needs the employee's written agreement (a contract variation). | A Cabinet resolution may increase the minimum. Friday retains social/religious significance (congregational prayer) even where not the statutory rest day. | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 20 |
| **Breaks — mainland: >5 consecutive hours → ≥1h aggregate** | A worker may not work more than **5 consecutive hours** without a break, or breaks totalling **≥1 hour in aggregate** across the day. Breaks are **unpaid** and **excluded** from working time. A hard statutory floor, not configurable downward. | An 8h shift needs at least one break before the 6th hour, totalling ≥1h across the day (e.g., 2×30min or 1×60min). | DIFC/ADGM: threshold is **>6 hours** instead of 5 (next rows). | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 18 |
| **Successive-shifts averaging — 9h/day, avg 56h/week (validation)** | For the MOHRE-approved successive-shift/continuous-operation designation, the schedule is lawful only if the **weekly average stays ≤56h** — the 9h/day figure is the individual-day ceiling this average is checked against. | A hotel security roster of 9h × 6 days = 54h/week is within the 56h average; a run of 9h × 7 days (63h) would breach it. | — | [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **No explicit mainland inter-shift daily rest rule identified 🔎** | Unlike Germany's 11h ArbZG rest or ADGM's 11h rule (next row), no explicit "X hours between shifts" provision for the mainland was identified in available sources. | — | The daily-norm cap (8h/9h) plus the 2h OT cap functionally limit same-day hours, but a dedicated inter-shift rest floor is unconfirmed. | 🔎 not identified — [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) / [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) silent in sources consulted |
| **DIFC — 48h/7-day average, opt-out to ~78h** | Weekly hours must not exceed **48h averaged over 7 days**, unless the employee gives **prior written consent** to more (up to ~78h/week, §3c). | A DIFC employee averaging 45h/week across a rolling 7-day window has no breach; without written consent, a sustained 55h/week average would breach the 48h line. | Structurally unlike the mainland's hard cap; unlike ADGM's current no-opt-out framing (a general-duty overlay instead). | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 Art. 22 |
| **DIFC — breaks: >6 hours → ≥1h aggregate** | Rest/prayer breaks totalling **≥1 hour** where the working day exceeds **6 hours** (vs. the mainland's 5-hour threshold). | A DIFC employee working a 7h day must get ≥1h of break across that day (e.g. one 60min break, or two 30min breaks); a 6h-or-shorter day has no statutory break floor. | — | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 |
| **ADGM — 48h/7-day, ≥11h daily rest, ≥24h weekly rest** | Not more than **48h/7-day period** absent written consent; **≥11 consecutive hours** rest per 24h; **≥24 consecutive hours** rest per 7-day period (a full day, unlike the mainland's flexible "≥1 day as contracted"). Plus breaks **≥1h aggregate** where the day exceeds **6h**. | An ADGM employee finishing at 20:00 may not restart before 07:00 the next day (11h rest). | Employers may not require hours "excessive or detrimental to health/safety" regardless of consent. | [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No general "night worker" status or standalone night-shift regime** | The UAE has no EU-Working-Time-Directive-style night-worker classification, no separate night-shift hours cap, and no rest-after-night-shift entitlement. The **only** statutory meaning of "night" is the 22:00–04:00 **overtime**-premium window (§3b). | A worker regularly scheduled 22:00–06:00 as *ordinary* (non-OT) hours draws **no** night premium at all — only the portion that is *overtime* and falls in the window does. | Contrast Germany (ArbZG §6 night-worker 8h cap) or the Netherlands (ATW Art. 1:7). | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19; [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **Night OT window — 22:00–04:00 (mainland)** | Overtime hours in this 6-hour window carry **+50%** instead of +25% (non-shift workers). | A non-shift worker's overtime hour worked at 23:30 types `OT_NIGHT_HOURS` at +50%; the same worker's overtime hour worked at 20:00 types `OT_125` at +25%. | ADGM (superseded 2019): window is **21:00–04:00** (7 hours, wider) — not current post-1 Apr 2025. | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19 |
| **Shift-worker night-OT carve-out** | Rotating-shift workers get the flat **+25%** even for OT inside 22:00–04:00 — the night uplift is switched off for this population entirely (§3b). | A shift-rostered worker's overtime hour at 01:00 still types `OT_125` (+25%), not `OT_NIGHT_HOURS` (+50%), unlike a non-shift worker's identical hour. | `is_shift_worker` gates which band an OT hour in the window receives. | [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **No day/night reclassification of ordinary hours** | Ordinary (non-overtime) hours never change typed band based on time of day — the night window only ever gates the *overtime* premium, never a base-pay uplift. | A worker's ordinary 23:00–07:00 night shift is priced identically to a day shift; only hours beyond their norm that fall in 22:00–04:00 draw +50%. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19 |
| **DIFC / ADGM (current) — no night-OT distinction** | Since neither regime prescribes a statutory OT rate at all post-April 2025, there is no statutory night-OT uplift to configure either — any night differential is contract-defined. | — | — | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎; [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Public-holiday calendar — Cabinet-set annually, lunar-dependent** | Fixed **by Cabinet resolution each year**, not a static statutory list. Fixed-Gregorian holidays (New Year's Day 1 Jan; Commemoration Day ~1 Dec; National Day 2–3 Dec) sit alongside **Hijri [Islamic lunar calendar]** holidays (Eid al-Fitr [festival marking the end of Ramadan], Arafat Day + Eid al-Adha [festival of sacrifice, marking the culmination of Hajj], Hijri New Year [Islamic calendar new year], Mawlid [the Prophet's birthday]) whose Gregorian date **moves every year** and is only moon-sighting-confirmed **days before**. 2026 indicative dates: Eid al-Fitr ~19–22 Mar; Arafat Day ~26 May; Eid al-Adha ~27–29 May; Hijri New Year ~15 Jun; Mawlid ~24 Aug — **all 🔎, confirm near-date**. | A payroll calendar built in January cannot hard-code Eid al-Fitr's exact date for the following year with certainty — it must be refreshed as an external Cabinet-sourced input. | Never formula-derive (unlike Poland's computable Easter-offset feasts). | [Cabinet Resolution "Concerning the Public Holidays in the State"](https://u.ae/en/information-and-services/jobs/public-holidays) (annual) 🔎 |
| **Public holiday not worked — full pay** | A worker not required to work a public holiday receives full pay for the day (paid day off). | — | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 28 |
| **Public holiday worked — day off in lieu OR +50%** | Employer elects, **per incident**: (a) **another rest day**, or (b) the day's wage **plus at least +50%** of basic wage. Not both; not a running balance. | A worker required to staff National Day is given a substitute day off the following week — or paid the day's wage plus 50% extra, at the employer's choice. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 28 |
| **Weekly rest day worked — same day-off-or-+50% structure** | Working the designated weekly rest day (§4) draws the **identical** either/or remedy as a worked holiday. | A worker called in on their designated Saturday rest day is given a substitute rest day the following week, or paid that day's wage plus 50% extra — the employer's election, exactly as for a worked holiday. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Arts. 19–20 |
| **DIFC — public holidays follow the UAE list, full pay; worked-holiday comp 🔎** | DIFC observes the same Cabinet-set holiday list (full pay if not worked); if worked, compensation is **contract/policy-defined**, not a fixed statutory +50%/day-off split like the mainland. | — | 🔎 Verify the exact contractual default — not confirmed in sources consulted. | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 |
| **ADGM — follows UAE federal holiday list, full pay** | Same Cabinet-set list; full pay on the day. | — | Holidays are treated as **excluded from** (not absorbed into) an annual-leave block — opposite of the mainland's Art. 29(7) absorption default (§10). | [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No accruing hours bank exists — a deliberate absence** | Unlike the Netherlands' ADV/ATV or Poland's TOIL ledger, UAE mainland law provides **no** general banked-hours or time-off-in-lieu system for **ordinary** overtime — ordinary OT is *always* cash-premiumed (§3), never convertible to banked time under the statute. Resist modelling a UAE "hours bank": the absence is itself the modelling fact. | 10 OT hours in a week are paid at +25%/+50% that pay period — never banked toward a future day off. | A contract *may* offer TOIL as a more-favourable term (statute doesn't forbid it), but nothing requires or structures it. | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 19 (silence on banking) |
| **Per-incident comp-day right — rest-day or holiday worked only** | The **only** substitute-time entitlement: working the designated weekly rest day or an official public holiday triggers a **per-incident** right to another rest day **or** the +50% cash alternative (§6) — the employer's election, decided incident by incident. **No accrual rate, no cap, no expiry** — it is created the moment the day is worked and consumed as scheduled, never a rolling balance. | A worker who staffs both a rest day and a holiday in the same month has **two separate, independent** comp-day-or-cash decisions — not a combined 2-day balance. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Arts. 19–20, 28 |
| **No second/parallel bank identified** | No long-term or sabbatical-funding account (contrast Germany's *Wertguthaben*) was identified in available sources for the mainland or either free zone. | — | — | — none identified in current research — |

## 8. On-call & standby

— none identified in current research —

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up or predictability pay identified** | The UAE has no equivalent of US CA/NYC reporting-time pay or EU predictability-pay directives for schedule changes. | — | — | — none identified in current research — |
| **Successive-shift / continuous-operation designation (MOHRE-approved)** | Unlocks the alternative **9h/day, avg 56h/week** schedule in place of the 8h/48h default (§3a, §4) for sectors whose technical nature requires successive shifts/rounds. | — | Narrow, sector-conditioned; not a general convenience licence — MOHRE approval required. | [Cabinet Res. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547) Art. 15 |
| **Flexible-model scheduling** | Hours/days vary within an **agreed envelope** set in the contract — a distinct configuration axis from the successive-shift exception. | — | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 4 |
| **Remote-work scheduling — fixed hours required** | Even fully remote arrangements must have contractually **fixed working hours** (§2) — no default to unmeasured/output-based time. | — | — | [MOHRE guidance](https://www.mohre.gov.ae) |
| **No split-shift premium or make-up-time provision identified** | No statutory split-shift premium, and the Ramadan reduction (§2–3a) is a **permanent** monthly norm change, not a make-up-time mechanic requiring hours to be recovered later. | — | — | — none identified in current research — |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Mainland annual leave — 30 calendar days/yr** | **30 calendar days** fully paid, after **1 year** of continuous service; **2 calendar days/month** proration between **6–12 months**; **no** entitlement under 6 months. **Calendar days**, not working days — weekends inside a leave block count against the balance. | An employee at 8 months' service has accrued 2 × 2 = 4 days; at 14 months, the full 30-day annual entitlement applies. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 29 |
| **Art. 29(7) — holiday-absorption inside a leave block** | A public holiday (or other agreed leave day) falling **inside** a taken annual-leave block is **absorbed into** the leave count and does **not** extend the block — unless the contract/internal regulations are more generous. The **opposite default** from many jurisdictions (which exclude and extend). | A worker takes 10 days' leave that happens to include National Day (2 Dec) — the leave block still counts as 10 days used, not 11. | Contract/internal regulations may provide otherwise. ADGM does the **reverse** (holidays excluded from the leave block — §6, §13). | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 29(7) |
| **Mainland sick leave — 90 days/yr tiered** | Up to **90 days/year** (continuous or intermittent), after probation: **15 days full pay → 30 days half pay → remainder unpaid**. **Not available during probation** (unpaid sick leave only, at employer discretion, with a Medical Authority report). | An employee sick for 50 days in the year: 15 full pay + 30 half pay + 5 unpaid. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 31 |
| **Mainland maternity leave — 60 days** | **60 days**: **45 days full pay + 15 days half pay**, from **day one** of employment (no minimum-service qualifying period). **+30 days full pay** extension if the newborn has a health condition requiring constant care (medical report), further extendable **+30 days unpaid**. | A new hire in her second week who gives birth is still entitled to the full 60-day leave. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 30 |
| **Mainland parental leave — 5 working days** | **5 working days**, continuous or intermittent, available to **both parents**, within the **first 6 months** after the child's birth. | Either parent may take the 5 days any time in the child's first half-year. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 32 |
| **Mainland bereavement leave** | **5 days** for the death of a spouse; **3 days** for the death of a child, parent, sibling, grandchild, or grandparent. Full pay; does **not** draw down annual leave. | An employee whose parent dies takes 3 paid bereavement days, and their annual-leave balance is unaffected; an employee whose spouse dies takes 5. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 32 |
| **Mainland study leave** | **10 days/year**, after **2+ years** of service, for exams at a UAE-recognised educational institution. | An employee with 3 years' service sitting a university exam block takes up to 10 paid study days that year; an employee with 18 months' service has no entitlement yet. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 32 |
| **Mainland sabbatical / national-service leave** | Duration per the National Service legislation (typically **11 months–3 years**); **UAE nationals only**, for compulsory/reserve national service; job held open. | A UAE-national employee called up for reserve national service takes leave for the service's full duration, with their role held open for return. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 32 |
| **Mainland Hajj leave** | Up to **30 days, unpaid**, **once only** across the entire employment relationship, requiring **≥2 years'** service. | An employee with 5 years' service takes 25 unpaid days for Hajj [the Islamic pilgrimage to Mecca] — that employee's one-time Hajj-leave entitlement is now exhausted for the rest of their tenure with any employer. | — | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) Art. 32 |
| **DIFC annual leave — 20 working days/yr** | **20 working days/year** — distinctly **lower** than the mainland's 30 calendar days. 🔎 Some sources describe a step up to 25 days at 3+ years' service; unconfirmed against the current consolidated text. | A DIFC employee in their second year accrues 20 working days' leave, versus 30 calendar days for an equivalent mainland employee. | — | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 |
| **DIFC sick leave 🔎** | Commonly cited tiering: **~10 days full pay → ~30 days half pay → unpaid beyond ~40 days** (annual cap sometimes described up to 60 workdays) — materially different from the mainland's 15/30 split. **🔎 exact tier boundaries vary across secondary sources** — verify against the current DIFC Employment Law text before configuring. | A DIFC employee sick for 35 days in the year: on the commonly-cited tiering, ~10 full pay + ~25 half pay — narrower bands than the mainland's 15/30/45 split. | — | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 |
| **DIFC maternity leave — 65 days** | **65 consecutive days**: **33 days full pay + 32 days half pay** — numerically distinct from the mainland's 60-day/45+15 split. | A DIFC employee's 65-day maternity leave breaks down as 33 days at full pay followed by 32 days at half pay, versus the mainland's 45+15. | — | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 |
| **DIFC paternity leave — 5 days** | **5 consecutive working days**, within a defined window after birth/adoption, with advance notice to the employer. | A DIFC employee whose partner gives birth takes 5 consecutive working days within the defined post-birth window, having given the employer advance notice. | — | [DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 |
| **ADGM annual leave — accrues 1/12/month, ≥20 working days/yr floor, holidays excluded** | Accrues at **1/12 of the annual entitlement per month** in the first year; **≥20 working days/year** floor (employers may grant more, not less). Public/national holidays are **excluded from** (not absorbed into) a leave block — the **opposite** of mainland Art. 29(7). | A leave block spanning a UAE public holiday is extended by that day under ADGM, unlike the mainland where it is absorbed. | — | [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |
| **ADGM sick leave 🔎** | Pro-rated for part-time workers; the specific full/half/unpaid tier structure under the **2024** Regulations was **not confirmed** in available sources — do not assume it mirrors either the mainland's 15/30 split or DIFC's ~10/30 split. | — | — | [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |
| **ADGM maternity leave — 65 working days** | **65 working days**, extending to **adoptive mothers** (child under 5) and covering **stillbirth/miscarriage after the 24th week**. | An ADGM employee adopting a 3-year-old is entitled to the same 65 working days as a biological mother; a stillbirth after 26 weeks also triggers the full entitlement. | — | [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |
| **ADGM paternity leave — ≥5 working days** | **≥5 working days**, within **2 months** of birth/adoption, covering both biological and adoptive fathers. | An ADGM employee whose child is born takes 5 working days at any point in the 2 months following the birth. | — | [ADGM Employment Regulations 2024](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎 |
| **Juveniles / minors — protected-population leave 🔎** | No UAE-specific juvenile leave entitlement beyond the general regime was identified in available sources. | — | — | — none identified in current research — |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Attendance/payroll recordkeeping obligation** | MOHRE requires employers to maintain records sufficient to demonstrate Labour Law compliance — working hours, overtime, leave, deductions — and to support Wage Protection System (WPS) reporting and inspection. No specific technology (biometric, punch-clock) is mandated for the general private-sector workforce. | An employer must be able to produce hours/OT/leave records for any worked period on MOHRE request. | Sector-specific rules exist for some blue-collar/labour-camp categories 🔎 — out of scope for an office/professional-workforce-oriented reference; verify separately if modelling construction/labour-camp workforces. | [Decree-Law 33/2021](https://uaelegislation.gov.ae/en/legislations/1541) (general compliance obligation); [MOHRE guidance](https://www.mohre.gov.ae) |
| **Retention period 🔎** | No specific statutory retention duration for T&A records was confirmed in available sources. [Decree-Law 9/2024](https://uaelegislation.gov.ae/en/legislations) 🔎's **2-year** dispute-limitation period is the closest cited figure and a reasonable proxy for a recommended minimum retention window, but is **not itself a recordkeeping-retention statute**. | — | — | [Federal Decree-Law No. 9/2024](https://uaelegislation.gov.ae/en/legislations) (dispute-limitation, proxy only) 🔎 |
| **No statutory punch tolerance / rounding rule** | Any tolerance or rounding is an **employer policy** choice, constrained only by the general requirement that recorded time support accurate OT/leave calculation. | — | — | — none statutory — |
| **DIFC / ADGM recordkeeping** | No regime-specific recordkeeping rule distinct from the general compliance obligation was identified in available sources. | — | — | — none identified in current research — |

## Sources (requirements section)

- **Repo seed:** `context/worldwide-calculations/united-arab-emirates.md` (current as of July 2026) —
  itself sourced from `uaelegislation.gov.ae/en/legislations/1541` ([Federal Decree-Law No. 33/2021](https://uaelegislation.gov.ae/en/legislations/1541)),
  `uaelegislation.gov.ae/en/legislations/1547` ([Cabinet Resolution No. 1/2022](https://uaelegislation.gov.ae/en/legislations/1547)), `mohre.gov.ae`,
  `u.ae/en/information-and-services/jobs/employment-in-the-private-sector`, `difc.com/business/laws-and-regulations/legal-database/difc-laws`
  ([DIFC Law No. 2/2019](https://www.difc.com/business/laws-and-regulations/legal-database/difc-laws) 🔎 as amended), `assets.adgm.com` + ADGM Employment Affairs Office guidance/FAQs
  (Feb 2025) for the [ADGM Employment Regulations 2019](https://www.adgm.com/doing-business/operating-in-adgm/employment) 🔎/2024, and Al Tamimi & Co. ("10 Things You Should
  Know About the New UAE Labour Law," tamimi.com) plus other UAE-qualified law-firm summaries (ATB
  Legal, Clyde & Co, HFW, BSA Law) for corroboration where primary text was not directly fetchable.
- **Prior support-memo pass** (2026-07-19): `support-memos/united-arab-emirates.md` verdict-first memo
  (now the parked appendix below) — cross-checked, no new factual conflicts found.
- **This pass (2026-07-21, refinement/linking round):** one `WebSearch` (query on
  `uaelegislation.gov.ae` + Federal Decree-Law No. 33/2021) confirmed the exact `/legislations/1541`
  and `/legislations/1547` paths exist via independently indexed titles; direct `WebFetch` attempts
  against `uaelegislation.gov.ae`, `mohre.gov.ae` (and, before this pass, `difc.com`/`adgm.com`)
  returned 403/connection-refused — the sites are bot-blocked, not absent. Every Basis cell in
  §1–§11 now carries a markdown link; deep article-level anchors aren't exposed by the register, so
  links point to the statute's full-text page. No new figure was verified this pass — 🔎 flags are
  carried forward from the prior pass, not newly resolved.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

**Verdict: 🟠 Partial — a strong *premium-emission* fit, no Critical or High gaps.** The UAE prices
overtime **statutorily and tiered** — **+25%** on an ordinary day, **+50%** for overtime falling in the
**22:00–04:00** night window — and this maps almost exactly onto our **OT rate rows by day-group (S1) +
day/night split (S2/S8)**: the day/night OT tier *is* our shipped shape. Weekly-rest-day and public-holiday
work (+50% cash) ride the same rate rows. The gaps are not in *computing* the premiums — they cluster in
**limit-*validation*** (the 2h/day OT cap, the 144h/3-week aggregate, the 5-hour break rule, weekly rest),
the **Ramadan norm reshape**, **day-off-in-lieu** synthesis, the **free-zone regime split** (DIFC/ADGM), and
**leave-accrual ledgers** — all **non-pay-corrupting**. Read with the scope, verdict key, and **Basis key**
in [`README.md`](./README.md). No verdict is DB-confirmed this pass (IAM blocked).

> **Weekly-OT update (2026-07-18):** a **weekly OT trigger** is now supported (`[PO]`). The UAE's **48h/week**
> norm rides it directly. Scope is the *weekly trigger only* — it is **committed-in-delivery, not yet
> `[API]/[UI]`-visible**, so confirm ship status before a hard commitment. It does **not** close the 2h/day
> OT-cap validation, the 144h/3-week aggregate, or the 56h weekly-*average* successive-shift ceiling.

**Legal source:** `worldwide-calculations/united-arab-emirates.md` (July 2026). The reference is explicit that
the UAE is **three separate employment-law regimes** (mainland / DIFC / ADGM) and prices overtime directly on
the mainland; it flags 🔎 the **Ramadan-reduction mechanic** (2h/all mainland vs ADGM's superseded 25%/Muslim-only
rule), the **ADGM 2024 overtime removal** (in force 1 Apr 2025 — old 25%/50% figures no longer current), and
several free-zone leave-tier boundaries. Those are carried as 🔎, not asserted.

## Governing sources — who actually sets the rules

The UAE is **not one law**. Resolving "do we support the UAE?" first means resolving **which of three regimes**
the contract sits in — this is a per-entity/per-employee configuration fact, not a national constant. Each
regime is modelled as its **own pay policy** (S16). Unlike France/Italy, there is **no CBA layer** — the
mainland country layer carries real statutory premium numbers.

| Regime | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| **Mainland** (default) | Federal Decree-Law No. 33/2021 + Cabinet Resolution No. 1/2022 (Executive Reg) + Federal Decree-Law No. 9/2024 | **Yes — statutory premiums (+25% / +50%)**, 8h/day–48h/week, 2h/day + 144h/3-week OT caps, 30-day leave ladder, Ramadan −2h. The country layer carries the numbers; no CBA layer to defer to |
| **DIFC** free zone | DIFC Law No. 2 of 2019 (Employment Law), as amended (to 2025) | **Yes — a parallel common-law statute.** 48h averaged/7 days with an **individual written opt-out (~78h)**; **no statutory OT** (contract-only, like NL/UK); 20 working-days leave; ≥1h break after 6h |
| **ADGM** free zone | ADGM Employment Regulations **2024** (in force **1 Apr 2025**, replacing 2019) | **Yes — own statute.** 48h/7-day (written consent to exceed); **no statutory OT since 1 Apr 2025** (contract-only — converged with DIFC); ≥20 working-days leave, holidays **excluded** from a leave block (opposite of mainland absorption) |

> **The 2019→2024 ADGM shift is load-bearing:** the superseded 2019 Regulations priced OT at +25% / +50%
> (21:00–04:00); the 2024 Regulations **removed OT from statute entirely.** Any material citing ADGM's
> 25%/50% as current describes the old regime — 🔎 verify the entity's Regulations version.

## Rule-by-rule (Basis = where the verdict comes from)

| # | UAE requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **8h/day norm — daily OT onset (Art. 17).** Normal hours 8h/day; hours beyond are overtime | OT onset = **surplus above the planned shift** (S4); set the planned shift to 8h | ✅ / 🟡 | [API][UI] | **Good fit** when planned = 8h. The **fixed statutory 8h norm *independent* of the planned shift** (jurisdiction-seeded) is target `[DES]` (G1) — distinguish. Part-time: OT above the *agreed* hours = the same surplus-above-planned model |
| 2 | **48h/week — weekly norm.** The figure governing a 5–6 day week; OT beyond it | **Weekly OT trigger** (S5) | ✅ | [PO] | Weekly OT committed-in-delivery (2026-07-18); **not yet `[API]/[UI]`-visible** — confirm ship status |
| 3 | **Successive-shifts exception — 9h/day, avg 56h/week** (MOHRE-approved continuous-operation sectors) | Alternate daily norm on a **separate policy** (S16); 9h daily norm is a config value | 🟡 / 🟠 | [UI][ABS] | 9h/day = config; the **56h *weekly-average* ceiling** is period-averaging validation `[ABS]` (G2/G4) — non-corrupting, sector-narrow |
| 4 | **Overtime +25% (ordinary day).** Statutory, on the basic wage | **OT rate row by day-group** → typed premium event (S1) | ✅ | [API][UI] | Emit the `OT_125` band via a rate row; the % itself is downstream money |
| 5 | **Night OT (22:00–04:00) → +50%.** Overtime hours in the night window (non-shift workers) | OT rate row + **day/night split** (S1 + S2/S8); night window configurable | ✅ | [API][UI] | **Star fit** — the +25%-day / +50%-night tier maps directly onto a **day/night-split OT rate row**; the window is a config value. It prices *overtime* hours only (not ordinary night) — matches our OT-phase night split, which composes onto the OT state |
| 6 | **Shift-worker night-OT carve-out.** Rotating-shift workers get +25% even at night (the +50% is switched off) | Worker-regime gating (G5); model shift workers on a **separate policy** without the day/night split (S16) | 🟡 | [DES][UI] | No `is_shift_worker` axis today; the separate-policy workaround covers it cleanly `[DES]` |
| 7 | **Weekly-rest-day work → substitute day OR +50%.** Employer's per-incident election | "DSR & Rest days" day-group **rate row** → +50% band (S1); substitute day = lieu-scheduling | ✅ / 🟠 | [API][UI] | **Cash +50% ✅** via rate row; the **day-off-in-lieu** election (per-incident `COMP_DAY_OFF`) is not synthesized as a typed event — lieu-scheduling `[DES]` (G13). **No accruing bank — correct**, the UAE has none (do not build one) |
| 8 | **Public-holiday work → substitute day OR +50%.** Same either/or structure | **Holiday calendar** (S11) + Holiday bit on rate rows (`daysMask`) → +50% band | ✅ / 🟠 | [API][FLD] | Cash +50% ✅; the substitute-day-in-lieu election shares #7's lieu gap 🟠 |
| 9 | **OT cap — 2h/day** (loss/serious-accident exception aside) | Limit **validation** / breach flag = Gap; **alert-only** (S13) | 🟠 | [ABS] | Single-period **daily** limit-flag — `extraHoursBalanceAlert` (Daily) can *notify*; the engine does not validate/block. Per-row `Add Limit` chains rates, it does not flag |
| 10 | **3-week aggregate ceiling — 144h/3 weeks** (incl. OT) | **Overall period cap** (S7, custom period) — caps/converts, not a compliance flag | 🟠 | [API][ABS] | A custom-period cap exists; a **3-week rolling *breach flag*** is `[ABS]` — alert-only mitigation |
| 11 | **Ramadan −2h/day.** Daily norm drops 8h→6h for the whole month, **all workers**, no pay cut | **Schedule / expected-shift reshape** — plan 6h shifts for the month; surplus-above-planned then keys off 6h | 🟡 | [DES][LAW] | Configurable as a scheduling change (OT onset auto-adjusts to the reduced norm). **🔎 verify the mechanic** — a per-month manual reshape, not an automatic Ramadan rule; free-zone variants differ (superseded ADGM 25% / Muslim-only) |
| 12 | **Weekly rest — ≥1 paid day/week** (employer-set day; no statutory Friday default) | Consecutive-days / weekly-rest = `workingDaysInARow` 🔎 (G8); schedule-level + report export | 🟠 | [DES] | Handled at the **schedule level**; breach-flagging is on-demand, not standard. `workingDaysInARow` field 🔎 |
| 13 | **Breaks — no >5 consecutive hours; ≥1h aggregate** (Art. 18, statutory floor, unpaid) | Break config on the schedule; **validation/flagging** of the 5h rule unconfirmed | 🟡 / 🟠 | [DES] | Breaks configurable `[DES]`; the **5-consecutive-hour / min-aggregate *validation*** is the open piece (same shape as DE #6) |
| 14 | **Public-holiday calendar (lunar).** Cabinet-set annual list; Hijri dates move yearly, moon-sighting-confirmed | **Holiday calendar** (`SourceHoliday`), jurisdiction-keyed (S11) | ✅ | [FLD] | Calendar as reference data ✅; the **per-year, Cabinet-sourced** refresh is an annually-refreshed data input (not formula-derivable, unlike Poland's Easter offsets) — a data-maintenance task, **not** a capability gap |
| 15 | **Record all working hours** (MOHRE recordkeeping) | Engine **records every punch** (S15); approved-event locking | ✅ | [FLD] | Satisfied — a genuine compliance value-add |
| 16 | **Annual-leave accrual — 30 calendar days/yr** (2 d/month, 6–12 mo) + **Art. 29(7) holiday-absorption** | Absences/requests handled generically (`SourceRequest`); the accrual **ledger** = Gap | ❌ | [ABS] | Accrual counter + proration + Art. 29(7) absorption-on-drawdown = a leave module we don't ship. Adjacent to core T&A, non-corrupting |
| 17 | **Other statutory leave** — sick (15 full/30 half/unpaid) · maternity 60d · parental 5d · bereavement · study · sabbatical · Hajj | Generic request/absence handling; **tiered ledgers** = Gap | 🟠 / ❌ | [ABS][DES] | Request handling exists `[DES]`; the tiered day-counters (e.g. sick 15/30) are not modeled. Adjacent to core T&A |
| 18 | **Managerial / maritime exemption (Art. 17).** Suppress hour-limit + OT calc; worker still recorded | Exclude from OT/limit policy (assign no OT policy) — crude workaround; no regime axis | 🟡 | [DES] | Exempt flag `[DES]` future; the assign-no-OT-policy workaround covers it. Narrow population |
| 19 | **DIFC / ADGM — separate employment regime.** DIFC: 48h-avg **opt-out (~78h w/ consent)**, no statutory OT. ADGM: 48h/7-day, **no statutory OT since 1 Apr 2025** | **One arrangement = one pay policy** (S16); model each regime as its own policy | ✅ / 🟡 | [UI][DES] | The regime split fits the policy-per-arrangement model **exactly**; contract-only OT is modeled as rate rows (or none). The **48h opt-out / weekly-cap *validation*** inside each free zone is a limit-flag gap `[ABS]` (G4) |

## Summary — rule-by-rule (2026-07-19 pass)

The UAE sits in the **best-fit tier**: its overtime is statutorily priced and **tiered by day/night**, which is
precisely the shape our OT rate rows emit. **8 of 19 rules are ✅** (four fully, four with a caveat/partial
overlay), and the remainder are **limit-validation, lieu-scheduling, leave-ledger, and regime-split** gaps —
**none pay-corrupting**, **none Critical or High**.

| # | Rule | Verdict | Why it's still open |
|---|---|---|---|
| 3 | 56h weekly-average successive-shift ceiling | 🟡/🟠 | 9h/day configurable; the weekly-*average* cap is period-averaging validation |
| 6 | Shift-worker night-OT carve-out | 🟡 | Separate-policy workaround; no `is_shift_worker` axis |
| 7 / 8 | Day-off-in-lieu election (rest-day / holiday) | 🟠 | Cash +50% works; the substitute-day typed event isn't synthesized |
| 9 | OT cap 2h/day | 🟠 | Alert-only; no limit-*validation* |
| 10 | 144h/3-week aggregate | 🟠 | Custom-period cap exists; rolling breach-flag absent |
| 11 | Ramadan −2h/day | 🟡 | Schedule-reshape workaround; mechanic 🔎 |
| 12 | Weekly rest ≥1 day | 🟠 | Schedule + report export; breach-flag on-demand |
| 13 | Breaks — 5h-continuous / ≥1h aggregate | 🟡/🟠 | Configurable; validation unconfirmed |
| 16 | Annual-leave accrual (30d + Art. 29(7)) | ❌ | No accrual ledger |
| 17 | Other statutory leave ledgers | 🟠/❌ | Generic requests; tiered counters not modeled |
| 18 | Managerial / maritime exemption | 🟡 | Assign-no-OT-policy workaround; no exempt flag |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — including the ✅ tiered-premium rows (#4, #5, #7-cash,
> #8-cash), the ✅ record-all-hours / holiday-calendar / weekly-trigger rows (#1, #2, #14, #15), and the
> ✅ regime-split row (#19).
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped, or core to the OT model) · 🟡 Medium (moderately common, or a usable
> mitigation, or moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow
> population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general UAE market* a rule bites. **⚠ Customer-relative** — shifts with the
>   workforce: **hospitality/retail/security (successive-shifts) → #3 + #6**; **DIFC/ADGM financial-sector
>   entities → #19 regime split**. **None flips to Critical** — the UAE prices OT statutorily and per-day/
>   per-incident, so there is **no annual-pay-corrupting averaging regime**; every gap is limit-*validation*,
>   a schedule reshape, a lieu event, or a leave ledger — all non-corrupting to computed pay.
> - **Build-effort** = my estimate, **grounded in the toolkit** (Existing/`[API]` ≈ config/small **S**;
>   `[DES]` ≈ **M**; net-new subsystem ≈ **L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (UAE market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#16 Annual-leave accrual (30d + Art. 29(7))** | **Partial** — leave taken as absences/requests; the 30d/yr accrual + 2d/mo proration + holiday-absorption-on-drawdown need a leave module or manual tracking; **pay stays correct** | **High** as a legal obligation (non-corrupting; adjacent to core T&A) | **M** — accrual counter + Art. 29(7) drawdown rule | 🟡 **Medium** |
| **#17 Other statutory leave ledgers** | **Partial** — generic request/absence handling; the tiered day-counters (sick 15/30, maternity 45/15, etc.) aren't modeled | **Med** — sickness common; the rest population-specific | **M** — tiered leave-type semantics on the request primitive | 🟡 **Medium** |
| **#9 OT cap 2h/day** | **Partial** — `extraHoursBalanceAlert` (Daily) notifies; **pay stays correct** (the cap decides legality, not amount) | **High** as a legal obligation (non-corrupting) | **S** — single-period daily threshold flag (cheapest to add) | 🟡 **Medium** |
| **#10 144h/3-week aggregate** | **Partial** — a custom-period cap approximates it; the rolling 3-week *breach flag* is absent; **pay stays correct** | **Med** — bites high-OT operations | **S-M** — custom-period rolling counter + flag | 🟡 **Medium** |
| **#13 Breaks — 5h-continuous / ≥1h aggregate** | **Config** — configure the break rule on the schedule; the 5h-continuous *validation/flagging* is the open piece | **High** (all workers) | **S-M** | 🟡 **Medium** |
| **#11 Ramadan −2h/day** | **Config** — reshape the planned shift to 6h for the month; surplus-above-planned then keys off 6h. **🔎 mechanic** — per-month manual reshape, not an automatic rule | **High** for one month/yr (all mainland staff) | **S-M** — a scheduled norm-override for the Ramadan window | 🟡 **Medium** |
| **#7 / #8 Day-off-in-lieu election** | **Partial** — the **+50% cash** alternative is fully supported via a rate row; the substitute-day (`COMP_DAY_OFF`, per-incident) isn't synthesized as a typed event | **Med** — common where employers elect the day-off over cash | **M** — per-incident lieu-day event (not an accruing bank) | 🟡 **Medium** |
| **#3 56h weekly-average ceiling** | **Partial** — 9h/day norm is configurable on a separate policy; the weekly-*average* cap is manual-monitoring; **pay stays correct** | **Low-Med** — successive-shift/continuous-operation sectors only | **M** — period-averaging over a trailing week | 🟢 **Low** |
| **#6 Shift-worker night-OT carve-out** | **Strong** — model shift workers on a separate policy without the day/night split; +25% applies flat | **Med** — shift-rostered populations | **S** — an `is_shift_worker` gate (or the separate-policy workaround) | 🟢 **Low** |
| **#12 Weekly rest ≥1 day** | **Strong** — handled at the schedule level; reports can export the data, breach-flagging addable on demand | **High** as a legal obligation (non-corrupting) | **S** — formalize the on-demand export into a standard breach alert | 🟢 **Low** |
| **#18 Managerial / maritime exemption** | **Strong** — exclude from working-time/OT rules (assign no OT policy) | **Low** — genuine managerial/maritime only | **S** — exempt flag | 🟢 **Low** |
| **#19 Free-zone weekly-cap opt-out validation** | **Partial** — the regime split itself is ✅ (separate policy); the DIFC 48h-opt-out / ADGM 48h-consent *breach flag* is absent | **Low-Med** — DIFC/ADGM financial-sector entities only | **S-M** — weekly-cap flag inside the free-zone policy | 🟢 **Low** |

### Severity roll-up (2026-07-19 pass)
- **🔴 Critical (0):** none — the UAE has no annual-pay-corrupting OT regime; overtime is statutorily tiered and rides our rate rows (#4, #5).
- **🟠 High (0):** none — every gap is limit-*validation*, a schedule reshape, a lieu event, or a leave ledger, all non-corrupting to computed pay.
- **🟡 Medium (7):** annual-leave accrual (#16), other statutory leave (#17), 2h/day OT cap (#9), 144h/3-week aggregate (#10), breaks validation (#13), Ramadan reshape (#11), day-off-in-lieu synthesis (#7/#8).
- **🟢 Low (5):** 56h weekly-average ceiling (#3), shift-worker night carve-out (#6), weekly rest ≥1 day (#12), managerial/maritime exempt (#18), free-zone opt-out validation (#19).

## The big gaps
1. **Limit-validation** (#9, #10, #12, #13) — the 2h/day OT cap, the 144h/3-week aggregate, weekly rest, and the 5-hour break rule. We *alert*, we don't *validate/block* `[ABS]`.
2. **Leave-accrual ledgers** (#16, #17) — the 30-day annual ladder (with Art. 29(7) absorption) and the tiered statutory-leave counters — a leave module we don't ship `[ABS]`.
3. **Day-off-in-lieu synthesis** (#7, #8) — the +50% cash alternative works; the per-incident substitute-day (never a bank) isn't a typed event `[DES]`.
4. **Ramadan norm reshape** (#11) — a schedule-level norm-override for the fasting month; a manual reshape today, mechanic 🔎.
5. **Worker-regime gating** (#6, #18) — shift-worker carve-out and managerial/maritime exemption; separate-policy workarounds cover both, but no first-class regime axis.

## Where the UAE scores well (worth saying)
- **The tiered day/night OT premium is our star fit** (#4, #5): **+25% ordinary / +50% night (22:00–04:00)**
  maps directly onto an **OT rate row (S1) with a day/night split (S2/S8)** — the night window is a config
  value, and the split composes onto the OT state exactly as the statute prices it `[API][UI]`.
- **Rest-day / public-holiday +50%** (#7, #8): the "DSR & Rest days" day-group and the `daysMask` Holiday bit
  emit the premium via the same rate table `[API][FLD]`.
- **Weekly-40/48 trigger** (#2): the UAE's 48h/week norm rides the now-supported weekly OT trigger `[PO]`.
- **Regime-as-policy** (#19): one arrangement = one pay policy matches the mainland/DIFC/ADGM split exactly
  `[UI][DES]` — including modeling the free zones' **contract-only OT** as configurable rate rows.
- **Holiday calendar** (#14) + **record-all-hours** (#15) — both present `[FLD]`; **no hours-bank needed** —
  the UAE deliberately has none, and we don't force one.

## 🔎 Verify before telling the customer
- **Weekly OT (#2)**: ✅ per PO confirmation (2026-07-18), **not yet `[API]/[UI]`-visible** — confirm ship status.
- **Ramadan mechanic (#11)**: the −2h/day reduction is modeled as a **schedule reshape** (plan 6h shifts for the
  month) — verify the engine supports a clean per-month norm-override, and that the free-zone variants (superseded
  ADGM 25% / Muslim-only) aren't in scope for the customer's entities.
- **Free-zone divergence (#19)**: which regime each entity sits in (mainland / DIFC / ADGM) is a **required
  resolving fact** — get it wrong and OT existence, caps, and leave ladders are all wrong. Confirm the ADGM
  entities are on the **2024 Regulations** (no statutory OT since 1 Apr 2025), not the superseded 2019 rates.
- **`crossShiftsInterval` / break validation (#13)**: field is configurable, but does the engine *flag* the
  5-hour-continuous breach or only classify?

## Bottom line for the customer
The UAE is one of our **cleaner fits**: overtime is priced **statutorily and tiered by day/night** (+25%/+50%),
and that tier lands squarely on our shipped OT rate rows with a day/night split — as do weekly-rest-day and
public-holiday +50%. With weekly OT now supported, the 48h/week trigger is covered too. What we **don't** do is
**enforce the limits** (the 2h/day OT cap, the 144h/3-week aggregate, weekly rest, the 5-hour break rule — we
alert, not validate), **synthesize the day-off-in-lieu** alternative, **reshape the norm for Ramadan**
automatically, or **run the leave-accrual ledgers** — all non-pay-corrupting, all Medium-or-below. The one
structural must-get-right is the **regime split**: mainland vs DIFC vs ADGM are three different statutes, and
each is a separate pay policy. Honest status: **partial, no Critical or High gaps; the standard mainland case
is servable on the premium side, with limit-validation, Ramadan, lieu-days, and leave ledgers as the roadmap.**
