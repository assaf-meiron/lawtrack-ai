# France — T&A requirements

> **What this is.** The ground-truth reference for France's time-&-attendance legal requirements,
> grouped by topic — detailed enough to **build a day.io pay policy from**. It aims to be
> **exhaustive** and **atomic**: **one legal proposition per row**, each row self-contained (no
> "see §X" as the only content), with exact values, a worked example wherever a number is involved,
> variants, and a `Basis` that **links to the primary source** so any row can be checked against the
> law directly.
>
> **Scope: time & day-events only** — money (%, €, cotisations, gross-to-net) is downstream
> *context* here (kept in `Values` so a policy can be configured; the deliverable is the typed
> hour/day event — e.g. the requirement is "emit the *heure supplémentaire* hour, separately
> totalled," not "compute its euro value").
>
> **French-term convention:** every non-English term is glossed in English in brackets on first use,
> e.g. *heures supplémentaires* [overtime hours].
>
> **The one structural fact to hold onto:** France runs a **three-tier statute** (*ordre public*
> [absolute floor] / *champ de la négociation collective* [space collective bargaining may fill] /
> *dispositions supplétives* [fallback defaults if silent]). Since the 2017 *Ordonnances Macron*, the
> **company/establishment *accord*** [company-level agreement] is the **primary operative layer** for
> OT rate, contingent, and annualisation — it out-ranks the branch-level CCN (*convention collective
> nationale*, keyed by an **IDCC** [*identifiant de convention collective* — collective-agreement
> identifier] code). The branch CCN is the fallback where no company *accord* exists (in practice
> dominant for SMEs). National statute sets the **ceilings** (48h/wk, 44h/12wk, 10h/day, 11h rest)
> and the **supplétif defaults** (35h, 25%/50% majoration, 220h contingent) that apply only where no
> agreement displaces them. So "which numbers apply" is always conditional on **which *accord*/CCN
> governs this workforce** — each arrangement is modelled as its own pay policy (§1).
>
> **Legal sources & links:** Code du travail (Livre I *Durée du travail, repos et congés*, L3111 →
> L3172) via **Légifrance**'s article-search — `https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=<article>`
> (confirmed live, resolves to the exact article text) — used for every statutory `Basis` cell below;
> **service-public.gouv.fr** F-code pages (`https://www.service-public.gouv.fr/particuliers/vosdroits/<Fcode>`,
> confirmed live) for a few administrative-guidance cites; **Cour de cassation** case law and
> **CCN/IDCC** citations link to the relevant register's stable base page (no confirmed deep-link
> pattern found this pass) and are marked 🔎. Repo seeds: `context/worldwide-calculations/france.md`
> (2026-04-20) + `support-memos/france-rules-full.md` (2026-07-19 rule sweep, now superseded by this
> file) + fresh web research (2026-07-21) — code.travail.gouv.fr, service-public.gouv.fr, and CCN
> examples (Syntec IDCC 1486, HCR IDCC 1979, Métallurgie). Full list at the foot of the requirements
> section. 🔎 marks a figure or link to confirm.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Three-tier statute + accord-first hierarchy** | *Ordre public* [absolute floor: max hours, rest, breaks] → *négociation collective* [bargainable band] → *dispositions supplétives* [fallback if silent]. Since 2017, the **company *accord*** beats the **branch CCN** on OT rate/contingent/annualisation. | A company *accord* setting HS at +20% (above the CCN's +15%) prevails for that company. | Alsace-Moselle (Bas-Rhin, Haut-Rhin, Moselle) — see below — is the only genuine **sub-national** statutory layer. | [Code du travail 3-tier structure](https://www.legifrance.gouv.fr/) 🔎 (loi travail 2016 / Ordonnances 2017) |
| **Regime gate — three working-time regimes** | Before any Overtime logic runs, classify the worker: **Heures** [hours-counted, 35h/week] → HS branch fires; **Forfait jours** [day-counted, ≤218 days/yr] → **no** HS; **Cadre dirigeant** [senior executive] → **excluded** from all working-time rules. | A Syntec *ingénieur* on *forfait jours* accrues zero *heures supplémentaires* even working 50h in a week — only day-count matters. | Regime is set by CCN eligibility rules + individual convention (below). | [L3121-27](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-27) (heures); [L3121-58 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-58) (forfait jours); [L3111-2](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3111-2) (cadre dirigeant) |
| **Forfait jours — eligibility & ceiling** | **≤218 days/year** (incl. *journée de solidarité*). Requires **ALL**: CCN/branch authorisation, a written individual *convention de forfait*, an *autonomous* role (schedule not predetermined), an annual *entretien* [review interview], employer *suivi de la charge de travail* [workload monitoring]. Missing any → forfait is **void**. | Syntec: reserved for *IC* [cadres/engineers] at **position 2.3+** or pay > 2× PASS [*plafond annuel de la sécurité sociale* — annual social-security ceiling]. | Forfait jours count computed from working days available (365 − week-ends − CP − holidays − rest days); **9 rest days ("JRTT") in 2026** to land at 218. | [L3121-58 to -66](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-58) |
| **Forfait annuel en heures — hours-package regime** | An **annual hours package** (commonly **1 607h**/yr, the France full-time annual reference: 35h×52 weeks less 5 weeks CP and holidays, incl. *journée de solidarité*) — OT arises only on hours **beyond** the annual package, not week by week. Open to any employee (not reserved to autonomous cadres, unlike forfait jours). | A 1 607h-forfait worker doing 1 650h in the year has 43h of annual HS, resolved only at year close. | Weekly/monthly hours-forfaits also exist (L3121-56) — same mechanic, shorter window. | [L3121-56](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-56) |
| **Cadre dirigeant [senior executive] — full exemption** | Sits **entirely outside** working-time law: no 35h, no HS, no daily/weekly rest rules, no maximums. Time is simply **not measured**. | A C-suite executive with full decision-making autonomy and among the highest pay in the company — no OT policy applies. | Narrow, strictly-defined population; courts routinely **down-qualify** an over-used title (see retro-recompute risk below). | [L3111-2](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3111-2) |
| **Temps partiel [part-time] — regime & 24h/week floor** | Part-time contracts default to a **≥24h/week** floor (contractual minimum). OT-equivalent onset for part-timers is the **contractual** hours, not 35h (§3a). | A 20h/week contract needs an employee-requested or CCN-permitted exception to go below the 24h floor. | Exceptions: employee request (e.g. for personal/study reasons, or students <26), CDD <8 days, some CCN carve-outs. | [L3123-1 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3123-1) |
| **Alsace-Moselle *droit local* [local law]** | The **only** genuine sub-national statutory layer (Bas-Rhin, Haut-Rhin, Moselle): **13** public holidays (vs 11 nationally — adds Good Friday + 26 Dec, St-Étienne's Day), plus **stronger Sunday/holiday-rest** protection. | A Strasbourg-based workforce needs a **different holiday calendar** than the rest of France. | Rooted in pre-1918 German/local law retained after reunification with France. | [Local law (droit local Alsace-Moselle)](https://www.legifrance.gouv.fr/) 🔎 |
| **Cumul d'emplois [holding multiple jobs] — cross-employer aggregate cap** | A worker with **several employers** must not exceed **10h/day and 48h/week in aggregate across all of them** — a limit no single-employer engine can see unassisted. | A worker doing 6h at Employer A + 5h at Employer B on the same day breaches the 10h aggregate cap even though neither employer alone exceeds it. | Enforcement in practice relies on the worker's own declaration to each employer. | [L8261-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L8261-1) |
| **Retroactive full recompute — regime invalidation risk** | If a **forfait jours** is later voided (missing CCN authorisation / convention / entretien / autonomy) or a **cadre dirigeant** title is down-qualified by a court, the worker reverts to **35h + HS for the entire past period** — a full retroactive recompute, not a going-forward fix. | A forfait-jours worker whose employer never held the required annual *entretien* can claim back-pay HS for the whole employment period under the forfait. | — | [Cass. soc. case law](https://www.courdecassation.fr/) 🔎 (forfait-jours validity); [L3111-2](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3111-2) (cadre dirigeant down-qualification) |
| **Minors <18 — protective regime (classification)** | A distinct, **tighter** working-time regime applies to workers under 18 (full mechanics in §4/§5): 8h/day · 35h/week (no annualisation), enhanced breaks/rest, night-work ban. | A 17-year-old apprentice cannot be scheduled under the same 35h-annualised CCN terms as an adult colleague. | *Apprentis* [apprentices] follow the same minors regime while <18. | [L3164-1 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3164-1) (Titre VI, Travail des enfants) |
| **Worker/contract-type note** | *CDI/CDD/intérim/apprentissage* [permanent/fixed-term/temp/apprenticeship] contract types drive mostly **downstream money** (précarité premiums, exonérations) — for T&A, all are hour- or day-counted per their assigned **regime** (above) the same way. | — | — | [Code du travail, Livre II (contrats)](https://www.legifrance.gouv.fr/) 🔎 |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Temps de travail effectif [effective working time]** | Time during which the worker is **at the employer's disposal** and must comply with directives without being free to attend to personal matters. Only this time counts toward the 35h/10h/48h thresholds. | Idle waiting time at a workstation, ready to act, counts; a lunch break where the worker is fully free does not. | *Astreinte* [on-call from home, §8] and pure commute are **excluded** by default. | [L3121-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-1) |
| **Heures d'équivalence [equivalence hours]** | In designated **slack-heavy-presence** sectors (e.g. road transport, some hospitality roles), a longer **presence** duration is treated as a shorter **effective** duration before OT is assessed — e.g. **39h presence → 35h effective**. | A worker present 39h/week in an equivalence-sector role has **0** HS (39h presence = 35h effective = exactly the threshold). | Sector list + ratio set by decree/CCN. | [L3121-13](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-13) |
| **Temps de trajet [travel/commute time]** | The **normal home ↔ usual workplace** commute is **not** working time. Professional travel **exceeding** that normal commute (e.g. to a client site or temporary post) is compensated — in **rest or money**, not counted as effective work time — if it exceeds the normal commute. | A consultant's trip to a client 2h from their usual office: the excess over the normal commute is compensated, but not logged as worked hours. | Compensation form (time vs money) is contract/CCN-set; case-by-case, often handled outside the calc engine. | [L3121-4](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-4) |
| **Temps d'habillage/déshabillage [dressing/undressing time]** | Where **required** protective/company clothing must be **put on/off at the workplace**, that time is **compensated** — as rest or money — even though it is not necessarily counted as effective working time. | A hygiene-gowning requirement for a food-plant worker earns a per-shift compensation (fixed amount set by contract/CCN). | If clothing may be donned at home, generally not owed. | [L3121-3](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-3) |
| **Temps de restauration / pause repas [meal break]** | By default, a meal break is **neither paid nor counted** as working time — **unless** the worker must remain at the employer's disposal (can't leave the post) during it, in which case it **flips to paid, effective working time**. | A receptionist required to answer calls through lunch: that break is paid working time; a worker free to leave the premises is not paid for it. | CCN may also make it paid regardless of constraint. | [L3121-2](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-2) |
| **Heures de délégation [staff-representative hours]** | Elected CSE [*comité social et économique* — works council] members / union delegates get a **monthly hour credit** to exercise their mandate — this time is **paid and counted as normal effective working time** (legal presumption of proper use). | A CSE member in a 40-employee firm uses their monthly credit hours during working time; those hours are paid exactly like ordinary work. | Credit runs **10h/month** (firms <50) up to **~34h/month** (largest firms); unused hours carry over up to **1.5×** the monthly amount within 12 months. | [L2315-7 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L2315-7); [L2143-13](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L2143-13) |
| **Civil-week midnight boundary split** | A shift crossing **Sunday 24:00 → Monday 00:00** must be **split at midnight**, each portion counting toward its own *civil week's* [Mon 00:00–Sun 24:00] 35h threshold (§3a). | A shift running 22:00 Sun → 06:00 Mon: 2h count in the ending week, 6h in the new week. | — | [L3121-35](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-35) (civil-week definition) |

## 3. Overtime

*France's overtime (heures supplémentaires [HS]) is the richest single mechanic in this file: a
weekly onset, tiered bands, an annual counter with a mandatory-rest kicker, and — for autonomous
cadres and part-timers — entirely different day-count / contractual-baseline regimes running in
parallel.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **35h/week — HS onset** | Every hour of **effective work** beyond **35h** in the *civil week* (Mon 00:00 → Sun 24:00) is an *heure supplémentaire* [HS]. A **weekly** trigger, not daily. | 40h worked in the civil week → 5 HS. | Monday is the **supplétif default** anchor (overridable "sauf accord"); annualised/forfait regimes (§3d/§1) bypass this trigger entirely. | [L3121-27](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-27) (35h); [L3121-28](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-28), [L3121-35](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-35) (weekly window, "sauf accord") |
| **OT must be requested or (tacit) accepted** | HS is owed when performed **at the employer's request** — explicit **or implicit** (e.g. the employer knew and did not object, or the workload made it unavoidable). Pure self-initiated overrun without any employer awareness is contestable. | An employee routinely staying late to finish an employer-set workload, with manager awareness and no objection, has HS even absent a written order. | — | [Cass. soc. case law](https://www.courdecassation.fr/) 🔎 (accord implicite de l'employeur) |
| **Heures complémentaires [additional hours, part-time] — onset = contractual baseline** | For a *temps partiel* [part-time] worker, an hour above their **contractual** hours but still **below 35h** is a *complémentaire*, not a *supplémentaire* — a distinct regime (see 3b for rates). Baseline may be **daily, weekly, or monthly** per the contract. | A 20h/week contract worker doing 25h has 5 complémentaires (not HS, since still <35h). | Worker may **refuse** with <3 days' notice. | [L3123-28](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3123-28) |
| **Complément d'heures [temporary contractual-hours rider]** | A part-timer's contractual hours may be **temporarily raised** by a signed *avenant* [rider] (e.g. 20h → 30h/week for a period). Hours within the raised baseline pay at normal rate (or a CCN majoration); only hours **beyond** the avenant count as complémentaires. | A 6-month avenant raising a 20h contract to 28h/week: hours up to 28h/week are "avenant hours," not complémentaires. | Branch agreement typically caps riders at **~8/year** per employee (excluding absence-cover riders). | [L3123-22](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3123-22) |
| **Forfait annuel en heures — onset = annual package** | For a worker on an **hours-package** (§1), HS arises only on hours **beyond** the annual total (commonly 1 607h), not per week. | A 1 607h-forfait worker at 1 640h has 33h HS for the year, known only at year close. | — | [L3121-56](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-56) |
| **Forfait jours — renonciation [waiver] as the day-count analog of OT onset** | A forfait-jours worker may **waive rest days** and work **above the 218-day ceiling** (absolute cap **~235 days** 🔎), earning a **minimum +10% per excess day** — the day-count regime's OT-equivalent trigger. | A forfait-jours worker waives 5 rest days, working 223 days instead of 218 → 5 days at ≥+10% each. | Requires a written *avenant* each year; ceiling set by CCN/accord. | [L3121-59](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-59) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **HS tiered bands (statutory default)** | Within the civil week: hours **36–43 → +25%** (1,25×); hour **44 and beyond → +50%** (1,50×). Band is chosen by the **cumulative weekly hour-count**. | 46h worked in one week: 35h normal + 8h at +25% (hrs 36–43) + 3h at +50% (hrs 44–46). | — | [L3121-36](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-36) |
| **CCN floor — never below +10%** | A CCN/company *accord* may set its **own** HS rates, but **never lower than +10%**. | Some CCNs set a flat +10% for all HS hours instead of the tiered 25/50%. | Examples: **HCR** (hospitality) bands **+10% (HS 1–8) / +20% (9–20) / +50% (21+)**, post-annualisation (§3d); **Syntec** ETAM keeps the legal 25%/50%. | [L3121-33](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-33) |
| **Heures complémentaires — rate bands** | Up to **1/10 of contractual hours → +10%**; from **1/10 to 1/3 of contractual hours → +25%**. | A 20h contract worked to 22h (10% = 2h) → the first 2h at +10%; a further hour to 23h → that hour at +25%. | CCN may adjust, never below +10%. | [L3123-29](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3123-29) |
| **Forfait jours renonciation rate** | **Minimum +10%/excess day** — a CCN/accord may set a higher rate. | A forfait-jours worker waiving 5 rest days (223 days worked instead of 218) earns at least +10% extra pay on each of those 5 days. | — | [L3121-59](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-59) |
| **1 May worked — statutory +100%** | Working the one **mandatorily paid + non-worked** holiday (1 May) earns **double pay** — normal pay for the day **plus** an equal amount again. | A hospital nurse working 1 May earns 1× base + 1× premium = 2× that day's pay. | The only holiday with a **statutory** worked-premium; the other 10 are CCN/agreement-set (§6). | [L3133-4 to -6](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3133-4) |
| **Astreinte [on-call] indemnisation** | Commonly **~10% of the hourly rate** per on-call hour for availability, **separate from** pay for hours actually worked if called in. | A worker on a 10h weekend astreinte at a €20/h rate earns ~€20 in availability pay, plus full pay for any hours actually worked if called out. | Fully CCN-dependent; some CCNs pay flat per-period amounts instead. | [L3121-9 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-9) |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Contingent annuel [annual OT allowance] — 220h/year/worker (statutory default)** | A **YTD cap** on HS per worker: default **220h/year**, CCN-adjustable up or down. Cross-run, period-spanning counter. | A worker at 215 HS for the year has 5h of headroom before the contingent is crossed. | See the three CCN-specific rows immediately below for sector variants with their own source. | [R3121-8](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=R3121-8) (default) |
| **Contingent annuel — Syntec variant (IDCC 1486)** | **130h/year** for ETAM staff (**90h/year** if the employee is on an annualised-hours arrangement). | A Syntec ETAM employee not annualised has a 130h ceiling instead of the statutory 220h default. | Syntec cadres on forfait jours use the day-count regime instead (§1/§3a), not this hourly contingent. | [CCN Syntec IDCC 1486](https://www.legifrance.gouv.fr/) 🔎 |
| **Contingent annuel — HCR variant (IDCC 1979)** | **360h/year** for permanent staff; **90h/quarter** for seasonal staff. | A permanent HCR restaurant worker has more than 1.6× the statutory 220h contingent. | Seasonal staff are measured quarterly, not annually. | [CCN HCR IDCC 1979](https://www.legifrance.gouv.fr/) 🔎 |
| **Contingent annuel — Métallurgie variant** | **220h/year** (matches the statutory default), reduced to **175h/year** where the workforce is on an annualisation arrangement (§3d). | A Métallurgie worker under annualisation has a lower 175h ceiling than a non-annualised colleague on the same 220h base. | — | [CCN Métallurgie](https://www.legifrance.gouv.fr/) 🔎 |
| **COR [contrepartie obligatoire en repos — mandatory rest above contingent]** | Above the 220h contingent, every further HS hour earns, **on top of** its pay+majoration, **mandatory paid rest**: **50%** of the excess hours (companies **≤20** employees), **100%** (companies **>20**). | A 100-employee company: the 221st HS hour of the year banks **1h** of mandatory rest in addition to its +50% pay. | Consequence of non-compliance: a **€750/employee fine** (R3124-11). | [L3121-30](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-30) (contingent), [L3121-38](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-38) (COR) |
| **Heures hors contingent — clarifying overlap** | Hours beyond the 220h contingent are **not** a separate rate regime — they are simply ordinary HS (tiered bands, 3b) **plus** the COR mandatory-rest kicker above. Not to be modelled as a fourth pay band. | — | The older individually-agreed *heures choisies* variant is now largely obsolete. | [L3121-30](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-30); [L3121-38](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-38) |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Aménagement pluri-hebdomadaire / cycles / modulation [multi-week averaging]** | The week may be measured **averaged over a reference period of 2 to 52 weeks** (up to **3 years** if a branch agreement allows), instead of week-by-week. HS is counted **once, at period close**, on hours exceeding the period average (e.g. 1 607h/yr or 35h × #weeks). | A busy 44h week and a slack 28h week within the same period **net out**; only the period-end excess over the average is HS. | Company vs branch agreement sets the exact window. | [L3121-41 to -47](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-41) |
| **Forfait annuel en heures — 1 607h annualisation** | The **1 607h/year** package (§1/§3a) is a direct instance of annual averaging: HS is the excess over 1 607h, **resolved only at year close**, not per week. | See §1/§3a worked example (1 640h worked → 33h annual HS). | — | [L3121-56](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-56) |
| **HCR annualisation — sector instance (1 607h)** | **Hôtels-Cafés-Restaurants** (IDCC 1979) annualises the 35h threshold over the **12-month reference period**; the full-time annual standard is **1 607h**. A busy summer week generates **no weekly HS** on its own — only the annual total counts. | 44h summer weeks + 28h winter weeks netting to 1 650h/yr → 43h are the **year's** HS, banded per HCR's 10%/20%/50% (3b). | Contingent **360h/yr** (permanent) / **90h/quarter** (seasonal); **2** weekly rest days (vs. 1 legal default). | [CCN HCR IDCC 1979](https://www.legifrance.gouv.fr/) 🔎 |
| **RTT/JRTT [reduced-working-time days] — an OT-avoidance device** | A company keeping a nominal week **above 35h** (e.g. 39h) "repays" the excess as **whole days off** across the year, landing the *average* week back at 35h — instead of paying weekly HS. Day-count is **"réaliste"** [counted from actual >35h weeks] or **"forfaitaire"** [a fixed number/year set by accord]. | A 39h-nominal-week company grants ~23 RTT days/year so the annual average lands at 35h. | Distinct from RCR (§7) — RCR converts HS that **has already triggered** into rest; RTT **prevents** HS from triggering at all. | [F34151](https://www.service-public.gouv.fr/particuliers/vosdroits/F34151) (service-public); [Loi 2008-789](https://www.legifrance.gouv.fr/) 🔎 |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Additive stacking of premiums** | Night, Sunday, and holiday uplifts **stack additively** with the HS tier — an HS hour that is also a night hour carries **both** majorations, not the larger of the two. | A night hour that is also the week's 44th hour: base + 50% HS majoration + night majoration (CCN-set), totalled separately. | Standard across French CCNs (contrast winner-take-all regimes). | [CCN practice](https://www.legifrance.gouv.fr/) 🔎 (no single statute; composition follows from separate legal bases per premium) |
| **Majoration basis [which pay elements feed the multiplied OT base]** | **Included**: work-linked primes (danger, *insalubrité* [unhealthy conditions], Sunday). **Excluded**: *prime d'ancienneté* [seniority pay], 13th-month, *congés payés* pay, *intéressement/participation* [profit-sharing], expense reimbursements. Mostly downstream money, but the engine must **tag each earning** `majoration_eligible`. | — | CCN may adjust the exact included/excluded list. | [Cass. soc. case law](https://www.courdecassation.fr/) 🔎 on "assiette de calcul des heures supplémentaires" |
| **Typed HS output requirement** | HS must be emitted as a **distinct, separately-totalled hour bucket** (not merged into ordinary hours), so downstream payroll can apply the HS-specific social-charge/tax exemption. | — | Same requirement extends to *forfait jours* renonciation days (excess-day bucket). | [LFSS provisions on HS exonération](https://www.legifrance.gouv.fr/) 🔎 (money, downstream — the **typed-output requirement** itself is T&A) |
| **Heures d'équivalence effect on composition** | Where equivalence hours apply (§2), the OT tier is assessed on the **converted effective** hours, not the raw presence hours — happens **before** any premium composition. | — | Sector-specific (road transport, some hospitality). | [L3121-13](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-13) |

## 4. Rest, breaks & working-time limits

*Hard limits → flag a breach, don't silently cap hours; the consequence is a fine, not a pay uplift.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily max — 10h/day** | **≤10h/day**, absolute ceiling for standard-regime workers. | An 11h day is a breach requiring a flag, not a silent cap. | CCN/decree may raise via derogation for specific activities (continuous ops, urgent work). | [L3121-18](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-18) |
| **Weekly max — 48h single week** | **≤48h** in any single civil week — the absolute one-week ceiling. | A 50h week is a breach. | — | [L3121-20](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-20) |
| **Rolling 12-week average — 44h** *(validates the weekly limit, does not determine OT)* | Average weekly hours across **any 12 consecutive weeks** must stay **≤44h/week**. Caps *sustained* overtime — a single 48h week is fine, but not repeated for months. | Five straight 46h weeks would breach the 44h/12-week average even though each week is individually under the 48h ceiling. | — | [L3121-22](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-22) |
| **Daily rest — 11h between shifts** | **≥11h** uninterrupted rest between two workdays. | A shift ending 22:00 → next start no earlier than 09:00. | May be **lowered to a floor of 9h** by CCN/decree for named activities (continuous operations, split-shift jobs, urgent work) — see next row. | [L3131-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3131-1) |
| **Dérogation to daily rest — floor 9h** | A collective agreement — or decree for specific activities — may **reduce the 11h daily rest**, but **never below 9h**. | A hospital CCN reduces inter-shift rest to 10h for a rotating unit. | — | [L3131-2](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3131-2); [D3131-1 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=D3131-1) |
| **Weekly rest — 35h consecutive** | **≥35h** consecutive rest each week (the 24h weekly-rest day **+** the 11h daily rest). | A worker resting Saturday 20:00 → Monday 07:00 gets 35h. | — | [L3132-2](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3132-2) |
| **Max consecutive working days — 6** | No worker may be scheduled **more than 6 consecutive days** — a 7th consecutive day is prohibited. | A worker rostered Mon–Sun with no rest breaches at day 7. | Distinct from the 35h weekly-rest *duration* above — this is a **consecutive-day count**. | [L3132-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3132-1) |
| **Max daily amplitude — 13h** | The span from **first to last punch** within a single calendar day may not exceed **13h**, regardless of breaks in between. | Clock-in 07:00, clock-out 20:30 = 13.5h amplitude → breach, even if actual worked time is well under 13h. | Distinct from the 11h inter-shift rest (different axis: span, not gap). | [Case law](https://www.courdecassation.fr/) 🔎 + [L3131-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3131-1) |
| **Intra-day break — ≥20min after 6h** | A break of **at least 20 minutes** is owed after **6h** of continuous work. | An 8h shift with no break by hour 6 must get ≥20min before continuing. | May be paid or unpaid; CCN may set a longer break. | [L3121-16](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-16) |
| **Part-time *coupure* [split shift] limit** | The working day may carry **at most one interruption**, capped at **≤2h**, unless an *accord* provides otherwise. | A part-time retail shift split 09:00–12:00 / 17:00–20:00 (a 5h coupure) needs CCN authorisation to exceed the 2h default. | — | [L3123-1 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3123-1) |
| **Cumul d'emplois — aggregate limit variant** | The 10h/day and 48h/week ceilings above apply **in aggregate across all employers** for a worker holding multiple jobs (§1). | — | Practically enforced via worker self-declaration to each employer. | [L8261-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L8261-1) |
| **Minors <18 — tighter limits** | **8h/day · 35h/week** (no annualisation permitted); break **30min after 4.5h**; daily rest **12h** (**14h if <16**); **2** rest days; night work **prohibited** (night ban detailed in §5). | A 16-year-old apprentice cannot be scheduled to an annualised 39h-average CCN pattern the way an adult can. | Enhanced protections stack; apprentices <18 follow the same regime. | [L3164-1 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3164-1) |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Legal night-work envelope** | Any period of **≥9 consecutive hours including 00:00–05:00**, starting **no earlier than 21:00** and ending **no later than 07:00**. A company/branch *accord* may fix a specific sub-window inside that envelope (commonly **21:00–06:00**), but it must always cover 00:00–05:00. | A CCN sets 21:30–06:30 as its night window — valid, since it sits inside 21:00–07:00 and covers 00:00–05:00. | Named sectors (press editorial/production, radio, TV, film, live entertainment, nightclubs) may use a **shorter 7-consecutive-hour** envelope, still covering 00:00–05:00. | [L3122-2](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3122-2) |
| **Travailleur de nuit [night worker] — status thresholds** | A worker gains protected night-worker status at **≥3h night work, ≥2×/week**, **OR** **≥270h night work over any 12 months**. | A worker regularly on 22:00–06:00 shifts twice weekly crosses the 3h/2× threshold and gains night-worker status. | 🔎 Whether the 3h/2× threshold **auto-confers** status vs. requires manual assignment is unconfirmed in current research. | [L3122-5](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3122-5) |
| **Night-worker caps — 8h/day, 40h/week (12-week average)** | Once night-worker status applies: **≤8h/day** (may exceed only via accord provision); **≤40h/week averaged over 12 weeks** — tighter than the general 10h/48h/44h ceilings (§4). | A night worker's daily cap is 8h, not the general 10h. | — | [L3122-6](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3122-6); [L3122-7](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3122-7) |
| **Night premium (*majoration de nuit*)** | **No statutory %** — fully CCN/contract-set. | Syntec-style CCNs commonly set night uplifts alongside the Sunday/holiday premiums (§6). | Rate varies widely by sector/CCN. | [CCN practice](https://www.legifrance.gouv.fr/) 🔎 (no controlling statute on the %) |
| **Repos compensateur de nuit [night compensatory rest]** | Every recognised night worker must **by law receive compensatory rest** for night work — **separate from, and on top of**, any night pay premium. The statute sets the **obligation**, not the amount; a common CCN figure is **~20min rest/week worked at night** (**+20% for workers ≥57**). Compulsory — cannot be swapped for money unless the agreement explicitly allows. | A night worker doing 5 night shifts/week banks ~20min rest per week worked, in addition to their night-pay premium. | Amount is CCN-set. | [L3122-8](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3122-8) |
| **Minors — night-work ban** | Workers **<18** may **not** work in the legal night window at all. | A 17-year-old cannot be rostered 22:00–06:00 even where the adult CCN permits it. | Narrow, sector-specific exemptions exist by decree (e.g. bakeries) — 🔎 confirm scope for France specifically. | [L3164-1 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3164-1) |
| **Travail en soirée [evening work] — ZTI regime** | In **Zones Touristiques Internationales** [International Tourist Zones], evening work **21:00–24:00** is a **distinct regime** from night work (§5 above): **volunteer-only**, with pay/rest compensation **≥100% uplift** typical. | A Paris ZTI retail store staffing 21:00–23:00 must use only volunteering staff, compensated at ≥2× for those hours. | Geographically scoped to designated ZTI/ZC/ZT zones. | [L3122-19 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3122-19) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Jours fériés [public holidays] — 11 nationally, 13 in Alsace-Moselle** | **11** public holidays nationwide. **Alsace-Moselle** (Bas-Rhin, Haut-Rhin, Moselle) adds **Good Friday** + **26 December** (St-Étienne's Day) → **13**. | A Strasbourg office observes 2 more paid holidays than a Paris office. | Region-keyed holiday calendar input. | [Code du travail](https://www.legifrance.gouv.fr/) 🔎; droit local Alsace-Moselle |
| **1 May — the only mandatorily paid AND non-worked holiday** | **1 May** (*Fête du Travail*) must be **both paid and not-worked** for everyone by default. | A 1 May falling on a Tuesday is paid as if worked, and the business is normally closed. | Businesses that **must** operate (hospitals, hotels, transport) may work it — see §3b for the +100% worked premium. | [L3133-4 to -6](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3133-4) |
| **Other 10 holidays — paid/worked per CCN or agreement** | The remaining **10** holidays are **not** statutorily mandated to be paid-if-not-worked or off — that is set by CCN/company agreement. | A CCN may make all 11 holidays paid-if-not-worked; another may pay only 6 of them. | Highly CCN-dependent — check the applicable agreement per policy. | [CCN/company agreement](https://www.legifrance.gouv.fr/) 🔎 (no single statute) |
| **Sunday/holiday worked premium — habitual vs occasional** | The premium rate **depends on frequency**: workers doing Sunday/holiday work **occasionally** (**<16 worked-days/year**) draw a **different (typically higher)** rate than **habitual** Sunday/holiday workers. Needs a running **YTD worked-day count**. | A retail worker crossing their 16th worked Sunday of the year switches from the "occasional" to the "habitual" rate for subsequent Sundays. | Rate levels + the 16-day threshold itself are CCN-set (e.g. Syntec: +25% habitual / +100% occasional). | [CCN practice](https://www.legifrance.gouv.fr/) 🔎 (e.g. Syntec IDCC 1486); statutory basis is the *dérogation* framework below |
| **Sunday-rest default + *dérogations* [authorised exceptions]** | Sunday is the **default weekly rest day**; working it requires an authorisation regime: **ZTI/ZC/ZT** [tourist/commercial zones], **gares** [certain train stations], or *préfectorale* [prefectural permit] categories. Weekly rest may also be given **by rotation** rather than fixed to Sunday. | A grocery store in a designated ZC (commercial zone) may open Sundays under that authorisation; a store outside any zone generally may not. | Authorisation category, zone boundaries, and rotation rules are location- and sector-specific. | [L3132-12 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3132-12) (dérogations); [L3132-24 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3132-24) (repos par roulement) |
| **Journée de solidarité [solidarity day]** | **One extra day worked without additional pay** (≈**7h** for a full-time worker) to fund elderly/disability solidarity support (CNSA). Prorated for part-timers (e.g. **80% FTE → 5h36**). Date/form (a specific day, fractioned e.g. 1h × 7 days, or absorbed into a suppressed RTT day) is set by company/branch agreement, or by the employer after CSE consultation if silent — **no longer statutorily fixed** to *Lundi de Pentecôte* [Whit Monday] since the 2008 reform. | A company designates 1h of solidarity work spread over 7 different days rather than a single day. | Fully flexible in form/date since 2008; only the **~7h/year unpaid** quantum (prorated) is fixed. | [L3133-7](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3133-7) |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Repos compensateur de remplacement [RCR] — pay-for-rest substitution** | A CCN/accord may **replace** HS *pay* with equivalent paid rest at **non-unit ratios**: 1h at +25% → **1h15** of rest; 1h at +50% → **1h30**. **Replaces** the cash (contrast COR, §3c, which **adds** rest on top). | A worker owed 10 HS hours at +25% instead receives 12h30 of paid rest, no cash HS payment. | CCN sets whether/how much HS is convertible. | [L3121-28](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-28) |
| **COR — mandatory rest above the contingent** | See §3c — mandatory paid rest (50%/100% by company size) owed **on top of** pay once the 220h annual contingent is crossed. | — | — | [L3121-38](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-38) |
| **RTT/JRTT — annual day-off banking** | See §3d — days off banked across the year so the *average* week lands at 35h, avoiding weekly HS from arising at all. | — | — | [F34151](https://www.service-public.gouv.fr/particuliers/vosdroits/F34151); [Loi 2008-789](https://www.legifrance.gouv.fr/) 🔎 |
| **Compte épargne-temps [CET, time-savings account]** | A **long-horizon personal balance**: an employee **parks** unused *congés payés*, RTT days, or OT into the account and draws on it much later — to fund a long leave, early retirement, training, or (sometimes) a payout. Set up by collective agreement; distinct from the OT hours-bank. | An employee banks 10 unused RTT days/year for 5 years, then draws a 6-month funded sabbatical from the accumulated balance. | Terms (what can be deposited, withdrawal rules, payout option) are fully accord-defined. | [L3151-1 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3151-1) |
| **Don de jours de repos [donating rest days]** | An employee may **donate** unused rest days to a colleague who is the parent of a gravely-ill child, or a *proche aidant* [family carer]; the beneficiary keeps pay while absent on the donated days. | A colleague donates 5 banked days to a coworker caring for a hospitalised child. | Anonymous, voluntary; employer may facilitate but not compel. | [L1225-65-1 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L1225-65-1); [L3142-25-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3142-25-1) |
| **Récupération des heures perdues [recovery of lost hours]** | Hours lost to a **collective** stoppage (bad weather/*force majeure*, stock-taking inventory, or a "bridge" closure of 1–2 days around a holiday) may be **made up later at the normal rate — NOT as overtime**. Capped at **+1h/day and +8h/week**; recovery window is **12 months** before or after the loss. | A plant closed 1 day for inventory recovers those 7h spread across the following weeks at +1h/day max, none of it counted as HS. | — | [L3121-50](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-50); [L3121-51](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-51) |
| **Horaires individualisés / report d'heures [flextime credit-debit carryover]** | Under individualised schedules (flextime around core hours), a worker may **carry a running credit/debit balance** week to week instead of settling immediately. Default cap: **+3h/week** carried, balance capped at **10h** overall. Carried hours are **not** HS — HS exists only on hours the employer actually requested beyond the schedule. | An employee running +2h this week carries it forward; if the running balance would exceed 10h, further credit cannot accrue until drawn down. | Accord may set different caps. | [L3121-48 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-48) |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Astreinte [on-call from home]** | A period where the worker, **without being at the employer's disposal or at the workplace**, must remain available to intervene for the employer. **Not** counted as effective working time (except the actual intervention). | A technician on a weekend on-call rota is free to be at home; only a call-out counts as worked time. | — | [L3121-9](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-9) |
| **Astreinte — daily/weekly rest still applies** | Time spent in *astreinte* **counts toward** the daily 11h / weekly 35h rest **unless and until** the worker is actually called to intervene — an intervention **interrupts** the rest clock. | A worker resting under astreinte from 22:00 who is called at 02:00 has their 11h rest clock reset from the intervention. | — | [L3121-9 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-9); [L3131-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3131-1) |
| **Astreinte indemnisation** | See §3b — commonly **~10% of the hourly rate**/on-call hour, separate from actual-work pay if called in. | — | Fully CCN-dependent. | [L3121-9 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3121-9) |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/predictability (show-up) pay** | France has **no** general statutory show-up-pay or predictability-pay regime (unlike US CA/NYC). Scheduling protections come via *coupure* limits (§4), the *amplitude* cap (§4), and complément-d'heures rider caps (below). | — | Some sector CCNs (hospitality, transport) pay a *coupure* premium for split shifts — 🔎 confirm per CCN. | (none statutory) |
| **Complément d'heures avenant — annual rider cap** | Riders temporarily raising a part-timer's contractual baseline (§3a) are typically capped at **~8/year** per employee by branch agreement (excluding absence-cover riders). | An employer proposing a 9th complément-d'heures avenant in a year for the same employee needs a branch-agreement carve-out. | Cap is branch-agreement-set, not a single national number. | [L3123-22](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3123-22) |
| **Cumul d'emplois — scheduling implication** | Where a worker holds multiple jobs (§1/§4), each employer's schedule must be built with awareness that the worker's **aggregate** daily/weekly hours (across all employers) may not exceed the general ceilings. | — | Enforcement relies on worker self-declaration; a single-employer system cannot see the aggregate on its own. | [L8261-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L8261-1) |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Congés payés [paid annual leave] — accrual** | **2,5 jours ouvrables [working days]/month worked → 30 JO (5 weeks)/year**. *Période de référence* [reference period] **1 June – 31 May** by default (CCN may change). | A worker joining 1 October has accrued 3 × 2,5 = 7,5 JO by the following 1 January. | CCN may grant more; some set a different reference period (e.g. calendar year). | [L3141-3](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3141-3); [L3141-10 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3141-10) |
| **Congés payés — accrual during sickness (case-law expansion)** | Following CJUE 2023 / Cass. soc. 2023, **paid leave now accrues even during long sickness absences** (previously excluded) — requiring **retroactive corrections** to accrual counters. | A worker on 4 months' sick leave now accrues CP for that period, retroactively if not already applied. | Employer *maintien de salaire*-covered sickness vs. uncovered — 🔎 confirm treatment of unpaid non-occupational absence continuing to accrue. | [Cass. soc. 2023](https://www.courdecassation.fr/) 🔎 (following CJUE C-118/13 line) |
| **Jours de fractionnement [split-leave bonus days]** | Splitting the main leave so part falls **outside** the **1 May – 31 Oct** peak season earns bonus days: **≥12 continuous days** taken in-season **+ ≥3 taken out-of-season** → **+1 day** for 3–5 out-of-season days, **+2 days** for **6+**. | A worker taking 15 continuous days in July + 4 days in November earns **+1** fractionnement day. | Conditions/waivable by employee written consent in some cases. | [L3141-19 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3141-19) |
| **Congé maternité [maternity leave]** | **16 weeks total** (6 before + 10 after) for the 1st/2nd child; **26 weeks** (8 before + 18 after) from the **3rd child**; extended for **multiple births**. Up to **3 weeks** of the prenatal period may shift to postnatal on request + medical approval. Counted as effective work for CP accrual. | Due 1 June, 2nd child → protected roughly 20 April – 27 July (16 weeks). | Premature/pathological-pregnancy extensions apply; adoption leave runs a parallel regime. | [L1225-17](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L1225-17) |
| **Congé de naissance [birth leave] + congé paternité [paternity leave]** | **3 calendar days** mandatory birth leave (any partner, paid by employer) immediately at birth, **plus** a **25-calendar-day** *congé paternité et d'accueil de l'enfant* (**32 days** for multiple births): a further **4 mandatory** days right after the birth leave (7 consecutive mandatory days total including birth leave), then an **optional 21 days** (28 for multiples), splittable into **up to 3 periods of ≥5 days each**, to be taken within **6 months** of birth. | A father takes the 3-day birth leave + 4 mandatory paternity days (7 consecutive days off), then later splits the remaining 21 days into a 10-day block and an 11-day block within 6 months. | The birth leave (3 days) is separate from and additional to the 25/32-day paternity leave. | [L1225-35](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L1225-35) (paternité); [L3142-4](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3142-4) (naissance) |
| **Congé parental d'éducation [parental leave]** | Up to **1 year initially**, **renewable twice** (max 3 renewals total), ending **no later than the child's 3rd birthday**. Requires **1 year** company seniority. May be taken as **full suspension** or **part-time (≥16h/week)**. | A parent takes 1 year, renews for a 2nd year, stopping at the child's 2nd birthday. | Job-protected; full seniority retained; guaranteed return to the same/similar post. | [L1225-47 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L1225-47) |
| **Arrêt maladie [sick leave] — employer maintien de salaire [pay continuation]** | Requires **≥1 year** seniority (CCN may lower). Waiting period: **7 days** for ordinary illness (from day 8), **day 1** for *accident du travail*/*maladie professionnelle* [workplace accident/occupational illness]. Pay: **90%** of gross for the **first 30 days**, then **two-thirds (66,6%)** for the **next 30 days**; each threshold **+10 days per 5-year seniority band** from year 6 onward. | An employee with 11–15 years' seniority is covered 90%-then-66,6% for **100 days total** (vs. 60 for a newer employee), unless the CCN is more generous. | CCN commonly more favourable (shorter/no waiting period, higher %, longer duration). | [L1226-1](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L1226-1) (Loi de mensualisation 1978) |
| **Congé sabbatique [sabbatical leave]** | **6 to 11 months**, unpaid, job-protected (contract suspended). Requires **≥36 months** (3 years) company seniority, **≥6 years** total professional experience, and **no** sabbatical/CIF [*congé individuel de formation* — individual training leave]/business-creation leave of ≥6 months in the **preceding 6 years**. | An employee with 5 years at the company and 8 years' total experience takes a 9-month sabbatical. | Employer may defer (not refuse outright) for operational reasons within limits. | [L3142-91 to -95](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3142-91) |
| **Congé pour événements familiaux [family-event leave]** | Paid days, counted as time worked (no dent to CP/seniority): **4 days** — own marriage/PACS; **3 days** — birth/adoption (in addition to the birth-leave row above, where applicable to the relevant parent); **1 day** — child's marriage; **3 days** — death of spouse/partner/parent/sibling/parent-in-law; **12 days** — death of a child (**14 days** if the child was **<25**, or the deceased child was themself a parent, or **any person <25** in the employee's effective/permanent care). | An employee's spouse's parent dies → 3 paid days; an employee's 30-year-old child dies → 12 paid days (14 if under 25). | — | [L3142-1 to -5](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3142-1) |
| **Congé de deuil [bereavement leave, 2020 law]** | An **additional 8 days** (on top of the row above) specifically for the death of a **child <25** or a **person <25** under the employee's effective/permanent care — partly CPAM-indemnified. Applies to deaths from **1 July 2020** onward. | The 12–14-day family-event leave (above) **plus** 8 congé-de-deuil days = up to **22 days** for the death of a child under 25. | — | [Loi n°2020-692](https://www.legifrance.gouv.fr/) 🔎 (8 June 2020) |
| **Pause d'allaitement [nursing breaks]** | For **1 year after birth**: **1h/working day**, normally split into **two 30-min** breaks (reduced to **20-min each** where the employer provides a nursing room). Statutorily **unpaid and not counted** as working time, unless the applicable CCN provides otherwise. | A nursing mother on an 8h shift takes 2×30min unpaid nursing breaks in addition to her normal meal break. | CCN may make it paid. | [L1225-30 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L1225-30); [R1225-5](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=R1225-5) |
| **Congé de proche aidant [family-carer leave]** | **Unpaid**, job-protected leave to care for a dependent relative — for T&A this is simply an absence code reshaping the planned day. | — | Duration/renewal terms set by decree; partial *allocation journalière* [daily allowance] money is downstream. | [L3142-16 ff.](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=L3142-16) |
| **Congé supplémentaire — travailleur handicapé [disabled-worker extra leave]** | **No general national statutory floor** — extra leave for RQTH-recognised [*reconnaissance de la qualité de travailleur handicapé*] workers depends on the **applicable CCN**. Where granted, a common figure is **6 working days/year** with **≥1 year** seniority. 🔎 confirm before quoting as a universal French requirement. | Métallurgie / aide-à-domicile / ESAT / broadcast CCNs explicitly grant this; a CCN silent on the point grants **none** beyond ordinary CP. | Part-time workers get a pro-rated number of days where the CCN grants it. | [CCN-specific](https://www.legifrance.gouv.fr/) 🔎 (no controlling Code du travail article) |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily/weekly recordkeeping obligation** | Where workers do **not** share the same displayed collective schedule, the employer must record: **daily** — start/end of each work period (or total hours worked); **weekly** — a summary of total hours worked per employee. | A shift-based warehouse (individualised schedules) must log daily start/end punches and produce a weekly hours summary per worker. | Workers on a single displayed collective schedule may be exempted from individual daily logging. | [D3171-8](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=D3171-8) |
| **Retention periods** | Standard hours-recording documents: **1 year** (or the length of the reference period, if a working-time arrangement exceeds 1 year — e.g. annualisation). *Astreinte* monthly records: **1 year**. **Forfait-jours** day-count records: **3 years**. | An HCR employer using annualisation over 1 year keeps records for that full reference period; forfait-jours day logs are kept 3 years. | — | [D3171-16](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=D3171-16) |
| **Tolerance / rounding** | **No statutory** rounding or grace-period rule for punch times; any tolerance is a policy choice, constrained by the duty to record the **actual** start/end of each work period (§11 recordkeeping). | — | — | (none statutory on rounding); [D3171-8 (actual-times recording duty)](https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=D3171-8) |

## Sources (requirements section)

- **Repo seeds:** `context/worldwide-calculations/france.md` (2026-04-20, "France Payroll Law &
  Salary Calculation — Comprehensive Technical Reference"); `support-memos/france-rules-full.md`
  (2026-07-19 rule sweep) — **both now superseded by this file** for the requirements layer.
- **Working time / HS / contingent / annualisation:** Légifrance Code du travail L3121 series
  (35h, HS bands, contingent, aménagement, forfaits) via the confirmed article-search endpoint
  `https://www.legifrance.gouv.fr/search/code?tabSelected=CODE&query=<article>`; code.travail.gouv.fr
  *Temps de travail* theme index; service-public.gouv.fr F19261 (forfait en heures), F75
  (aménagement), F74 (horaires individualisés), F34151 (RTT — confirmed live).
- **Rest / breaks / amplitude:** Légifrance L3131 (repos quotidien), L3132 (repos hebdomadaire,
  dérogations), D3131-1 ff.
- **Night work:** Légifrance L3122 series (L3122-2 window, L3122-5 status, L3122-6/7 caps, L3122-8
  repos compensateur, L3122-19 ff. ZTI soirée); legisocial.fr *Votre salarié est-il travailleur de
  nuit ?*.
- **Public holidays / journée de solidarité:** Légifrance L3133 series; blog.laboris.fr and
  joursferies.fr *journée de solidarité 2026*; droit local Alsace-Moselle sources.
- **Leave (maternité/paternité/parental/sabbatique/handicapé/deuil/proche aidant):** Légifrance
  L1225 series (maternité, paternité, parental, allaitement), L3142 series (événements familiaux,
  sabbatique, proche aidant, don de jours), Loi n°2020-692 (congé de deuil); ameli.fr, msa.fr,
  pikari.fr, cfdt.fr explainers.
- **Sick leave / maintien de salaire:** Légifrance L1226-1 (loi de mensualisation 1978); apicil.com,
  ircem.com, l-expert-comptable.com explainers.
- **Recordkeeping:** Légifrance D3171-8, D3171-16.
- **CCN examples:** Syntec (IDCC 1486), HCR (IDCC 1979), Métallurgie — via the repo seed's original
  research + CCN-explainer sources (PayFit, Eurecia, Sage). No confirmed deep-link pattern for
  individual CCN/IDCC texts was found this pass — CCN Basis cells link Légifrance's base and are
  flagged 🔎.

> **⚠ Verification note.** Two Légifrance URL patterns were confirmed live this pass: the
> article-search endpoint (`/search/code?tabSelected=CODE&query=<article>`, returns the exact
> article) and the service-public.gouv.fr F-code page (`/particuliers/vosdroits/F34151`). No
> resolvable pattern was found for individual CCN/IDCC texts or Cour de cassation case citations —
> those Basis cells link the register's base page and are flagged 🔎 pending a follow-up pass with
> web-search budget to locate the specific decision/CCN-article IDs.

---

## Appendix (parked) — day.io capability & compliance-support analysis

> Parked 2026-07-21. Former verdict-first memo content, kept intact.

# France — T&A compliance support

Verdict: 🟠 Partial. The
remaining gaps are the **annual-counter / regime machinery** (220h contingent, annualisation, forfait jours)
and part-time — all **High or below, none Critical**. Read with the scope, verdict key, and **Basis key** in
[`README.md`](./README.md). 


## Governing sources — who actually sets the rules

The compliance answer is conditional — the operative T&A numbers usually live **below** the national
statute, in the **company/establishment *accord*** (the primary operative layer since the 2017
Ordonnances Macron), with the **branch CCN** as fallback; the statute mostly sets ceilings and
*supplétif* defaults. So "do we support France?" really means "**which *accord* / CCN applies?**"

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| Statute | Code du travail (3-tier: *ordre public* / *négociation* / *supplétif*) | **Ceilings + fallback defaults only** — hard limits (48h/wk, 44h/12wk, 10h/day, 11h rest, 35h weekly rest) + *supplétif* defaults (35h, 25/50%, 220h contingent) |
| Sub-national | Alsace-Moselle *droit local* (Bas-Rhin, Haut-Rhin, Moselle) | **Partly** — 13 holidays (+Good Friday, +26 Dec) + stronger Sunday/holiday rest; the ONLY genuine sub-national layer |
| Company/establishment *accord* | Company / establishment agreement | **Yes — the PRIMARY operative layer since 2017** for OT rate / contingent / annualisation (out-ranks the branch) |
| Branch CCN (IDCC) | *Convention collective nationale* | **Fallback** where no company *accord*; keeps "Bloc 1" primacy on equivalence + some annualisation reference periods; in practice dominant for SMEs |
| Case law | Cour de cassation | **Interpretation only** — 13h amplitude, forfait validity, CP-during-sickness |

**Illustrative secondary-source rules**

⚠ ILLUSTRATIVE — varies by agreement/region/year; not universal; NOT a statement of our support.

- 39h base week; OT +10/+20/+50; contingent 360h perm / 90h-quarter seasonal — *HCR IDCC 1979* — 🔎
- Contingent 220h, cut to 175h under annualisation; forfait 218→235 days — *Métallurgie (2024 CCN)* — 🔎
- 3 *modalités*: 35h / ~38h30 + 218-day cap + JRTT / pure forfait 218 days (regime-select inside the CCN) — *Syntec IDCC 1486* — 🔎

## Rule-by-rule

| # | France requires (time/day-event only) | Our current capability | Verdict | Evidence / note |
|---|---|---|---|---|
| 1 | **35h/week — OT onset.** Overtime (*heures supplémentaires*, "HS") starts on every hour worked beyond 35h in the civil week (Mon-Sat) — France's full-time legal week, not a daily trigger | **Weekly OT trigger** — OT on hours beyond the weekly threshold (per-week accumulation) | ✅ |  |
| 2 | **Accumulation window = the civil week, Monday-anchored by *supplétif* default.** HS are tallied per calendar week (Mon 00:00→Sun 24:00); Monday is the *supplétif* default anchor (L3121-35, "sauf accord"), overridable by a branch/company *accord* — not an immutable national constant (corrected per L3121-35) | Weekly accumulation window with a configurable week anchor | ✅ |  |
| 3a | **Daily max 10h AND single-week max 48h**. The engine should flag a breach, not silently cap hours. (48h is the one-week absolute limit | Notifications & alerts levers Exist | ✅ | Payroll event can be sent, too, if desired |
| 3b | **44h average over any rolling 12 weeks** → violation flag. Over any 12 consecutive weeks the average must stay ≤44h/wk (L3121-22) — this caps *sustained* OT, whereas 3a's 48h is the single-week hard limit | No rolling multi-week average | ❌  |  |
| 4 | **Absences don't count toward the 35h.** Paid leave/holiday hours aren't "effective work," so they don't push a worker over 35h into HS (28h worked + 7h leave = 0 HS) | Weekly OT + **paid-absence-include-in-OT** toggle (default exclude) | ✅ |  |
| 5 | **cap on TOTAL overtime hours in a year — 220h/yr per worker.** separate from the weekly HS onset; a CCN may raise/lower it | Overall **period cap** on OT (e.g. 40h/mo) | ✅  | One of the consecuences of not complying is 750EURO fine per employee (article R3124-11) |
| 6 | **Tiered bands — hrs 36–43 → +25%, 44+ → +50%.** The HS premium rises with the weekly hour-count; the band is chosen by the cumulative hour index *within the week* | Weekly OT + **rate chaining by hours** (`phases[].limit`) keyed to the weekly total | ✅ |  |
| 7 | **A CCN may set the bands (never below +10%).** A *convention collective* (sector-level agreement) can substitute its own HS rates; each CCN arrangement is modelled as its own pay policy |  | ✅ |  |
| 8 | **COR — *contrepartie obligatoire en repos*.** Above the 220h contingent, the worker is owed paid REST *on top of* the OT pay — 50% of the excess hours if ≤20 employees, 100% if >20 |  | ✅ | Require payroll event setup and pre-configuration |
| 9 | **Repos compensateur de remplacement.** A CCN may replace OT *pay* with equivalent paid rest at **non-unit ratios** — 1h at +25% → 1h15 of rest; 1h at +50% → 1h30 | Banked hours (comp-time-in-lieu)  | ✅ | France "*paid-rest*" is HB as long as "Missing Days" is paid as "Reduce hours from the bank" |
| 11 | **Night premium.** A night-hours uplift that **stacks additively** with the HS tier — a night HS hour carries both the HS majoration and the night majoration |  | ✅  |  |
| 12 | **Daily rest 11h · weekly rest 35h** → violation flag. Minimum rest between two workdays (11h) and across the week (35h consecutive); a breach should raise a flag | `crossShiftsInterval` | ✅ |verify w/ Liran |
| 13 | **11 public holidays (13 in Alsace-Moselle).** Only May 1 (*Fête du Travail*) is statutorily paid AND non-worked for all; the other 10 are paid/worked per CCN or agreement; **Alsace-Moselle *droit local* (Bas-Rhin, Haut-Rhin, Moselle) adds Good Friday + 26 Dec → 13, with stronger Sunday/holiday rest** (corrected per Alsace-Moselle droit local) | Holiday calendar (`SourceHoliday`) + `daysMask` Holiday bit on rate rows | ✅  |  |
| 14 | **Sunday/holiday premium — habitual vs occasional.** The band depends on frequency: working Sundays/holidays *habitually* vs *occasionally* (<16 worked-days/yr) draws different rates — so it needs a YTD worked-day count | Sunday/Holiday rate rows | ✅ * | Requires rate change once 16 worked days a year is crossed. Can be done with a workaround currently. |
| 15 | **Heures complémentaires (part-time).** For part-timers, hours above the CONTRACTUAL hours but still below 35h are "complémentaires," not "supplémentaires": +10% up to 1/10 of contract, +25% from 1/10 to 1/3. Contractual hours can be daily, weekly or monthly (depends on the contract) |  | ✅ * | Requires e/o year intervention for the yearly contractual employement agreement (see Google Slide) |
| 16 | **Astreinte (on-call).** A per-on-call-hour payment for being available (distinct from the hours actually worked if the worker is called in) |  | ✅ | In France it's common to pay 10% of the hourly rate for on-call-hour (L3121-9 ff.), but it really depends on the CCN|
| 17 | **Forfait jours — day-count regime.** Eligible cadres are measured in DAYS worked per year (ceiling 218), not hours, and accrue NO *heures supplémentaires* at all; days above 218 (*renonciation*) earn a +10%/day minimum |  | ✅ * | operational, verify w/ Liran |
| 18 | **Cadre dirigeant.** Senior executives whose working time isn't measured at all — no 35h, no HS, no rest rules — so there is nothing to calculate |  (crude workaround: assign no OT policy) | ✅ |  |
| 19 | **Regime gate before Overtime.** Before any OT runs, the worker's regime (hours / *forfait jours* / *cadre dirigeant*) must be selected — it decides whether the hourly OT branch fires at all |  | ✅ | |
| 20 | **Congés payés accrual.** Paid leave accrues at 2.5 days/month → 30 days (5 weeks)/yr; recent case law forces retro-corrections  |  | ✅ | verify that unpaid unprofessional leaves keeps accruing|
| 21 | **Retroactive full recomputes.** If a *forfait jours* is later voided or a *cadre dirigeant* title is down-qualified, the worker reverts to 35h+HS for the WHOLE past period — a full recompute | | 🟠  | asked Avi |
| 22 | **Majoration basis.** Which pay elements feed the multiplied OT base: work-linked primes (danger, *insalubrité*, Sunday) are included; *ancienneté*, 13th-month and holiday pay are excluded — mostly downstream money |  | ✅ |  mostly operational|
| 23 | **Typed HS output.** HS must be emitted as a distinct, separately-totalled hour bucket so downstream payroll can apply the HS charge/tax *exonération* (§11) |   | ✅ |   |
| 24 | **Civil-week boundary split.** A shift crossing Sunday→Monday must split at midnight so each part counts toward the correct week's 35h HS threshold (edge case 3) |   | ✅ |   |
| 25 | **Intra-day break.** A break of ≥20 min is owed after 6h of continuous work (L3121-16); the requirement is the entitlement/flag | Break config on the schedule | ✅ | both paid & unpaid |
| 26 | **Night-work window — default 21:00–06:00.** The statutory night period is 21:00–06:00 by default; any substitute band set by *accord* must sit inside 21:00–07:00 and cover 24:00–05:00 (L3122) |  | ✅ |   |
| 27 | **Travailleur de nuit — night-worker status.** A worker gains protected night-worker status at ≥3h night work ≥2×/week OR ≥270h night work over 12 months (L3122-5) — the status that triggers the tighter night-worker caps |  |🟠 | Dedicated pay policy for Travailleur de nuit. Need to clarify if ≥3h night work ≥2×/week automatically triggers tighter caps |
| 28 | **Night-worker caps — 8h/day and 40h/week (12-week average).** Once a worker is a *travailleur de nuit*, daily work is capped at 8h and weekly at 40h averaged over 12 weeks — tighter than the general 10h/day and 48h ceilings (L3122-6/7) | No working-time-limit breach flagging (nor rolling multi-week average) | ❌  | Same gap as §3b |
| 29 | **Max daily amplitude 13h.** The span from first to last punch within a 0–24h day may not exceed 13h (case law + L3131-1) — a maximum *amplitude*, distinct from the 11h inter-shift rest |  | ❌  | Same as "New York Spread-out Hours" of 11 hours|
| 30 | **Weekly rest — max 6 consecutive working days.** No more than 6 consecutive days may be worked (L3132-1) — a consecutive-day limit distinct from the 35h weekly-rest *duration* in #12 |  | 🟠 | Handled in the schedule level. Plus, report can export this data and if needed -we'll flag breaches.. |
| 31 | **Journée de solidarité.** One extra day (+7h/yr) is worked without pay to fund autonomy/old-age support, pro-rated for part-timers (L3133-7) |  | ✅ | Either operational, or maybe using payroll event |
| 32 | **Minors <18 — protective regime.** Under-18s: 8h/day, 35h/week (no annualisation), a 30-min break every 4.5h, 12h daily rest (14h if <16), 2 rest days, night work prohibited |  | ✅ | Dedicated pp. Require age flagging workflow|
| 33 | **Part-time floor + coupure.** Part-time contracts default to a 24h/week minimum, and the working day may carry at most one interruption, none exceeding 2h unless an *accord* provides otherwise (L3123) | No working-time-limit breach flagging | ✅ | 24h/week minimum - legal on customer side. <br> Duration type break is the solution |
| 34 | **Forfait annuel en heures — 1607h annual hours package.** An annual-hours forfait where overtime arises only on hours beyond the annual forfait (L3121-56) — distinct from forfait *jours* (#17) |  | 🟠  | can be somehow computed at the e/o the year?.. |
| 35 | **Heures d'équivalence.** In designated slack-heavy-presence sectors a presence→effective transform applies (e.g. 39h presence counts as 35h effective) before overtime is assessed (L3121-13) |  | ✅ |  |

## Summary — rule-by-rule (2026-07-19 pass)

France's support posture shifted sharply this pass: **28 of 35 rules are now ✅**. Three of those carry a
workaround/manual-intervention caveat, marked **✅\*** — #14 Sunday habitual-vs-occasional (rate-change
workaround once 16 worked-days/yr is crossed), #15 heures complémentaires (needs e/o-year intervention on the
yearly contractual agreement), #17 forfait jours (operational; verify w/ Liran). *(Note: #10 Annualisation
was folded into #34 Forfait annuel en heures — both are the same 1607h annual-hours mechanism, so they're
tracked as one row going forward.)*

Only **7 rules remain non-fully-supported**:

| # | Rule | Verdict | Why it's still open |
|---|---|---|---|
| 34 | Forfait annuel en heures / Annualisation (1607h) | 🟠 Partial | Year-end computation unconfirmed |
| 3b | Rolling-12wk 44h average | ❌ Gap | No period-averaging primitive |
| 21 | Retroactive recomputes | 🟠 Partial | Question open with Avi |
| 27 | Travailleur de nuit status | 🟠 Partial | Auto-trigger classification unclear |
| 28 | Night-worker 8h/40h caps | ❌ Gap | Shares #3b's period-averaging gap |
| 29 | Max daily amplitude 13h | ❌ Gap | Reuse candidate — mirrors US NY spread-of-hours |
| 30 | Max 6 consecutive working days | 🟠 Partial | Schedule + report export cover it; breach-flagging is on-demand, not standard |

Net effect: the prior "annual-counter / regime machinery" storyline (220h contingent, forfait jours, cadre
dirigeant, heures complémentaires) is now supported, with caveats. The one real remaining High is the merged
annual-hours regime (#34); everything else left open is a working-time-limit *validation* gap (non-pay-corrupting)
or a verification item.

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (❌/🟠/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) and cleanly-configurable
> (🟡) rules are omitted (they need no mitigation) — that's **28 of the 35 rows** this pass; see the Summary
> above for the full omitted list.
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common,
> no full mitigation, but scoped) · 🟡 Medium (moderately common, or a usable mitigation, or moderate build) ·
> 🟢 Low (narrow population, strong mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general French market* a rule bites. **⚠ Customer-relative** — shifts with
>   the customer's workforce: **autonomous/annualised-hours or hospitality/seasonal → #34** Critical.
> - **Build-effort** = my estimate, **grounded in `france.md`'s Status column** (Existing ≈ config/small;
>   `(draft)` ≈ **M**; Future/target ≈ **L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (FR market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#34 Forfait annuel en heures / Annualisation (1607h)** *(merges former #10)* | **Partial** — a 12-month banked-hours cycle can approximate annual netting for both the general forfait-annuel-en-heures package and HCR-style annualisation; OT stays computed per-day/week during the year — the annual excess over 1607h is only reconcilable via an unconfirmed manual end-of-year computation | **Med-High** — autonomous/annualised-hours contracts + HCR hospitality/seasonal customers (**Critical** in those accounts) | **L** — annual period-averaging + year-close true-up; mechanism itself needs confirming before sizing the build | 🟠 **High** |
| **#3b Rolling-12wk 44h average** | **Partial** — manual monitoring; **pay stays correct** | **High** as a legal obligation (non-corrupting) | **M** — rolling multi-week average = period-averaging (shares #34's primitive) | 🟡 **Medium** |
| **#21 Retroactive recomputes** | **Partial** — recalc + forward propagation exists; regime-invalidation retro not modeled — **question open with Avi** | **Low** — rare triggers (forfait voided / cadre dirigeant down-qualified) | **M** — pending Avi's answer on what's actually missing | 🟢 **Low** / 🔎 Verify |
| **#27 Travailleur de nuit status** | **Partial** — a dedicated pay policy for *travailleur de nuit* exists; whether ≥3h night work ≥2×/week (or ≥270h/12mo) **auto-confers** the status, vs. manual assignment, is unclear | **Med** — night-shift populations | **S-M** — likely just the auto-classification counter, pending clarification | 🟢 **Low** / 🔎 Verify |
| **#28 Night-worker 8h/40h caps** | **Partial** — manual monitoring; **pay stays correct**; shares the period-averaging gap with #3b, and is gated behind #27's status classification | **Med** — night workers only | **M** — single-period flag + rolling 12-wk average (shares #3b) | 🟢 **Low** |
| **#29 Daily amplitude 13h** | **Partial** — manual monitoring; **pay stays correct**; mirrors the US NY spread-of-hours mechanic (11h) — a reuse candidate, not a novel build | **High** as a legal obligation (non-corrupting) | **S** — single-period span-vs-limit flag, likely reusable from the NY spread-of-hours field | 🟢 **Low** |
| **#30 Max 6 consecutive working days** | **Strong** — handled at the schedule level; reports can already export the data, and breach-flagging can be added on demand | **High** as a legal obligation (non-corrupting) | **S** — formalize the on-demand export into a standard breach alert | 🟢 **Low** |

### Severity roll-up (2026-07-19 pass)
- **🔴 Critical (0):** none.
- **🟠 High (1):** forfait annuel en heures / annualisation (#34, merged with former #10).
- **🟡 Medium (1):** rolling-12wk 44h average (#3b).
- **🟢 Low (5):** retroactive recomputes (#21, 🔎), travailleur-de-nuit status (#27, 🔎), night-worker 8h/40h caps (#28), daily amplitude 13h (#29), max 6 consecutive days (#30).

## The big gaps (regime / annual machinery; all `[ABS]`)
1. **Annual contingent counter (220h) + COR** (#5, #8) — need cross-run per-worker YTD counters.
2. **Annualisation / 1607h** (#10) — year-close netting; a period-averaging primitive we don't ship.
3. **Forfait jours** (#17) — a whole day-count regime with no hourly OT.
4. **Regime gating + cadre dirigeant exemption** (#18–19).
5. **Heures complémentaires** (#15) — a distinct part-time additional-hours regime.

## Where France scores well (worth saying)
- **Weekly HS onset** (#1–2, #6): the 35h weekly trigger + banded majorations (25/50, CCN-floor +10%) now
  compute on the weekly hour-index via the OT `phases[]` table `[PO]/[API]`.
- **CCN-as-separate-policy** (#7): one arrangement = one policy matches France's IDCC model exactly `[UI][DES]`.
- **Part-time contractual-baseline onset** (#15 — surplus-above-planned), **night/Sunday/holiday premium
  emission** (#11, #13–14), **astreinte on-call** (#16), **BH rest-in-lieu** (#9, partial), the **holiday
  calendar** (#13), and **typed HS output** (#23) — all present `[API]`/`[FLD]`.
- **Daily-10h / weekly-48h cap alerts** (#3a): existing Notifications & alerts levers (`extraHoursBalanceAlert`,
  `hoursBankBalanceAlert`) flag a breach today, alert-only `[API]` — reuses shipped infrastructure, no new build.

## 🔎 Verify before telling the customer
- **Weekly OT (#1–2, #6, #24)**: marked ✅ per product-owner confirmation (2026-07-18) that it's being
  delivered — **not yet `[API]/[UI]`-visible**. Confirm ship status before a hard customer commitment.
- **`crossShiftsInterval` behaviour** (#12): field is `[API]`-real, but does it *validate* rest or only classify/reshape? Weekly 35h rest is absent regardless.
- **Non-unit comp-rest ratios** (#9): can the bank express 1h@25%→1h15, or only 1:1?

## Bottom line for the customer
With **weekly overtime now supported**, we can compute France's core *heures*-regime OT (35h weekly trigger,
banded majorations) plus rate structures, night, holidays, on-call and comp-time-in-lieu. The remaining gaps
are the **annual/regime machinery** — the 220h contingent counter, HCR annualisation, and the *forfait jours*
/ *cadre dirigeant* regimes — none of which blocks a standard-workforce deal, though they matter for high-OT,
hospitality/seasonal, or cadre-heavy customers. Honest status: **partial, no Critical gaps; the standard case
is servable, the annual/regime machinery is roadmap.**
