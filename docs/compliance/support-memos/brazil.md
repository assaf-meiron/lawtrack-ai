# Brazil — T&A requirements

> **What this is.** The ground-truth reference for Brazil's time-&-attendance legal requirements,
> grouped by topic — detailed enough to **build a day.io pay policy from**. It aims to be
> **exhaustive** and **atomic**: **one legal proposition per row**, each row self-contained (no
> "see §X" as the only content), with exact values, a worked example wherever a number is involved,
> variants, and a `Basis` that **links to the primary source** so any row can be checked against the
> law directly.
>
> **Scope: time & day-events only** — money (%, R$, tax, gross-to-net) is downstream *context* here
> (kept in `Values` so a policy can be configured; the deliverable is the typed hour/day event).
> **Portuguese-term convention:** every non-English term (CLT terms are almost all Portuguese) is
> glossed in English in brackets on first use, e.g. *horas extras* [overtime hours].
>
> **The one structural fact to hold onto:** Brazil is **federally uniform** — the CLT [*Consolidação
> das Leis do Trabalho*, Decree-Law 5.452/1943] is national, so the daily 8h/weekly 44h ceiling, the
> ≥50% OT floor, *adicional noturno* [night premium], DSR [paid weekly rest] and the *intervalo*
> [break] rules are the **same in every state** — there is no state-by-state T&A matrix like the
> US or India. The real variation axis is **collective bargaining**: each *convenção coletiva* [CCT,
> union-to-union] or *acordo coletivo* [ACT, company-level] can **raise** the statutory floors and
> **choose modalities** (higher OT %, the 1-year *banco de horas* [hours bank] window, a 30-minute
> *intrajornada* [intra-shift break] break) — each arrangement is modelled as its **own pay policy**
> (mapping is not 1:1). See §1. The only sub-national layer at all is the **municipal/state holiday
> calendar** (§6).
>
> **Legal sources & links:** CF/88 art. 7º and CLT (Decreto-Lei 5.452/1943) link to their consolidated
> texts on **planalto.gov.br** (the official federal legislation register); individual statutes link
> to their own planalto pages where the URL pattern could be confirmed, otherwise to the planalto
> legislation register with 🔎; TST *Súmulas* [binding case-law digests] / OJs link to the TST
> jurisprudence hub (tst.jus.br) and STF decisions to the STF jurisprudence portal (portal.stf.jus.br),
> both 🔎 pending a per-item deep-link pass. Repo seeds: `context/worldwide-calculations/brazil.md`
> (June 2026) + the prior `support-memos/brazil.md` (now the parked appendix below) + fresh web
> research (2026-07-21). Full source list at the foot of the requirements section. 🔎 marks a figure
> or link to confirm.

## 1. Scope, classification & governing sources

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **CLT is the uniform federal floor** | Daily **8h**, weekly **44h**; OT floor **≥50%**; *adicional noturno* [night premium] ≥20%; DSR [paid weekly rest] ≥24h — identical nationwide, no state-by-state T&A matrix. | A worker in São Paulo and one in Amazonas have the identical 8h/44h ceiling and ≥50% OT floor. | Only the **holiday calendar** varies sub-nationally (state + up to 4 municipal days, §6). | [CF/88 art. 7º XIII, XVI](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [CLT arts. 58, 59, 73](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **CCT/ACT [collective agreement] = one pay policy per arrangement** | Each *convenção coletiva* (sector-wide) or *acordo coletivo* (company-level) can **raise** floors (OT 60/80/100%, never <50%) and **choose modalities** (1-yr *banco de horas*, 30-min break). Model each as a **separate** pay policy — mapping is not 1:1. | A metalworkers' CCT sets OT at 70% and a 1-year banco de horas window; a retail ACT sets 60% and a monthly window. | *"Negociado sobre o legislado"* [negotiated terms prevail over statute] on a defined list (art. 611-A); a non-negotiable reciprocal list survives (art. 611-B). | [CLT art. 611-A/B](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [STF Tema 1.046](https://portal.stf.jus.br/jurisprudencia/) 🔎 |
| **Jurisprudence layer — TST/STF** | *Súmulas* [binding case-law digests] and *Orientações Jurisprudenciais* [OJs] interpret and apply temporal splits to statute; STF *ADIs* [direct unconstitutionality actions] resolve constitutional questions. | Súmula 366 (tolerance → whole excess as OT); ADI 5994 (validates individual-agreement 12x36). | — | [TST Regimento Interno](https://www.tst.jus.br/jurisprudencia) 🔎; [CF/88 art. 102](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) |
| **Monthly-salary → hourly divisor** | **220** (44h-week convention) or **200** (40h-week); special categories differ (e.g. *bancários* [bank workers] 180/200 🔎). Not a CLT article — a jurisprudential/customary convention every premium multiplier rides on. | A worker earning R$2,200/month on the 220-divisor has an hourly base of R$10. | CBA may set its own divisor. | [jurisprudence (cf. TST Súmula 431)](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Part-time regime (art. 58-A)** | **≤30h/week with no OT**, **or** **≤26h/week + up to 6 supplementary h/week at +50%**. OT onset (where it applies) is the worker's **contractual** hours, not the full-time line. | A 26h/week part-timer working 30h has 4 supplementary hours at +50%; a 30h/week part-timer working 32h has no legal OT mechanism under this regime (contract-dependent). | Two distinct sub-regimes gate whether OT applies at all — a worker-classification choice, not a threshold. | [CLT art. 58-A (post-2017)](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Cargo de confiança [position of trust] — hour-control exemption (art. 62 II)** | Managers/directors/department heads holding a **cargo de confiança** are exempt from hour recording **and** from OT/night premium, if their function gratuity brings total pay to **≥140%** of the base position's salary (i.e. a **≥40%** *gratificação de função* [function gratuity]). Must be documented in the CTPS [work card] / contract. | A department head earning a 45% function gratuity on top of base salary is validly exempt — no OT, no night premium, however late they work. | 🔎 Recent TRT case law splits on whether the 40% figure is a strict precondition or merely evidentiary of trust-position status — contested. | [CLT art. 62 II](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **External/field staff — hour-control exemption (art. 62 I)** | Employees whose **activity is incompatible with hour control** (e.g. traveling sales reps) are exempt from OT/limits, **if** the incompatibility is noted in the employment contract. | A field sales rep with no fixed schedule and a contract clause stating the incompatibility is exempt from OT. | Employer retaining any remote monitoring/tracking of the worker's schedule can defeat the exemption in litigation. | [CLT art. 62 I](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Teletrabalho [telework/home office] — two sub-regimes (art. 75-A ff., as amended 2022)** | Paid **by jornada** [hours worked] → normal hour-control + OT rules apply; paid **by produção/tarefa** [output/task] → **exempt** from hour control (art. 62 III), like a cargo de confiança. | A remote developer paid hourly is hour-tracked and OT-eligible; one paid per completed ticket/task is exempt. | Regime is a contract election, not automatic. | [CLT arts. 75-A–E](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [Lei 14.442/2022](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14442.htm) 🔎 |
| **Minors <18 — protective regime (intro; detail in §4/§5)** | Night work **prohibited 22:00–05:00** (CLT art. 404; CF art. 7º XXXIII); hazardous/unhealthy work barred (art. 405); no work at all **<16** except as *aprendiz* [apprentice] from **14**. *Aprendiz* workday: **6h/day**, up to **8h/day** if the apprentice has completed elementary school and the extra hours are theoretical/practical training. | A 17-year-old cannot be rostered 22:00–06:00 even under a CBA that permits it for adults. | Apprenticeship contract capped in duration (typically ≤2 years). | [CLT arts. 402–441](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [CF/88 art. 7º XXXIII](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) |
| **Disabled workers (PCD) — no distinct hours regime** | The CLT applies the **same** general hour rules; the only special mechanism is an **individualised flexible/reduced schedule**, granted case-by-case on a **medical report** showing the reduction is required by the degree of disability — pay pro-rated to hours worked. | A PCD worker with a mobility-related medical report is granted a 6h/day schedule at proportional pay. | The **hiring quota** (Lei 8.213/91 art. 93, 2–5% of headcount by company size) is a staffing obligation, not a T&A rule. | [general CLT](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [Lei 8.213/91 art. 93 (quota, adjacent)](https://www.planalto.gov.br/ccivil_03/leis/L8213compilado.htm) 🔎 |
| **Professional drivers — Lei do Motorista [Driver's Law] sector regime** | Daily jornada **8h**, extendable by **2h ordinary OT** or, via CBA, **4h**. Distinct **tempo de espera** [waiting time] category, indemnified separately (§8). Daily rest **11h/24h**, with a mandatory **8h uninterrupted** minimum even when split. | An interstate truck driver's loading-dock wait is tracked as *tempo de espera*, not ordinary hours, and rest can't be fragmented below the 8h floor. | Cargo vs passenger transport sub-rules differ in the full statute. | [Lei 13.103/2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13103.htm) 🔎 |
| **⚠ Pending reform — PEC 221/2019 ("fim da escala 6x1" [end of the 6-workdays/1-rest-day roster])** | Would phase the weekly ceiling from **44h → 40h** and mandate **two weekly rest days**. **Approved by the Câmara 27 May 2026; stalled in the Senado as of 21 July 2026** — no CCJ referral date set, recess 18–31 July. **Not in force — do not model as settled.** The 44h ceiling stands. | If/when enacted, a worker today rostered Mon–Sat (6x1, §4) would instead work at most 5 days with 2 rest days, and the 44h weekly cap in the row above would read 40h — none of this applies yet. | — | PEC 221/2019 — [Câmara tracking](https://www.camara.leg.br/propostas-legislativas) 🔎 · [agenciabrasil.ebc.com.br](https://agenciabrasil.ebc.com.br/politica/noticia/2026-05/camara-aprova-em-dois-turnos-pec-pelo-fim-da-escala-6x1) |

## 2. Working-time definition

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Tempo à disposição [time at the employer's disposal] — narrowed by the 2017 reform** | Counts as working time only while the worker is **actually** awaiting/executing orders. Art. 4 §2 (added 2017) **excludes**: changing clothes/PPE **unless mandatory on employer premises**, meal/rest/socialising/religious/prayer time on premises, and time spent on employer-provided transport. | A worker who changes into a personal-clothes locker off-premises has that time excluded; mandatory on-site hygiene-gear changing still counts. | Contracts pre-dating 11 Nov 2017 keep the pre-reform (broader) reading per TST intertemporal case law. | [CLT art. 4 §2](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) ([Lei 13.467/2017](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm)) |
| **Horas in itinere [commute time] — abolished** | Commute time, **even in employer-provided transport**, is **no longer** working time (removed §§2–3 of the pre-2017 art. 58). | A worker bused daily to a remote plant on company transport does **not** accrue working time for that ride. | Only pre-11-Nov-2017 contracts may still carry the old in-itinere entitlement (non-retroactive). | [CLT art. 58 (as amended)](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm), [Lei 13.467/2017](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm) |
| **Business travel beyond the commute** | Travel genuinely **at the employer's order** for business purposes (not the ordinary commute) can still count as time at disposal, distinct from the abolished in-itinere rule. | Sent to a client site in another city, the necessary travel hours are compensable. | 🔎 fact-specific; distinguish from ordinary commute case law. | [CLT art. 4 (general)](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); case law |
| **On-site standby counts in full** | Time waiting at an employer-set location, ready to act, counts as ordinary/OT hours per the normal rules (contrast with *sobreaviso* [on-call from home], §8). | A worker held on-site "on standby" between tasks has that time counted as worked. | — | [CLT art. 4](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Cross-midnight shift split (night prorrogação)** | A shift **starting inside** the night window and **extending past** its end keeps night-premium treatment on the extended portion (Súmula 60 II) — detailed in §5. | A 22:00–07:00 shift keeps the night premium on the 05:00–07:00 tail. | — | [TST Súmula 60 II](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Teletrabalho — hour-control applicability** | Applies **only** to task/output-paid telework (exempt, §1); jornada-paid telework is tracked like any on-site schedule, including cross-midnight and missing-punch handling. | — | — | [CLT arts. 62 III, 75-A ff.](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |

## 3. Overtime

*Brazilian overtime is fundamentally daily — the surplus over the 8h daily ceiling, not a weekly measure — which is why a per-day surplus-above-planned model matches the statute directly.*

### 3a. Onset / trigger

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Daily 8h → OT onset** | *Horas extras* [overtime hours] = the surplus over the **8h/day** limit. Brazil's OT is **daily, not weekly** — the 44h/week figure (§4) is a ceiling to observe, not a separate OT trigger. | A worker doing 10h on Tuesday has 2h of *horas extras* that day, independent of the week's total. | — | [CF/88 art. 7º XIII](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [CLT arts. 58, 59](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Part-time contractual baseline** | For art. 58-A part-timers, OT (where the sub-regime allows it) is measured against the **contractual** hours, not 8h/44h. | A 26h/week contract worker at 30h has 4 supplementary hours from the 27th. | The **≤30h-no-OT** sub-regime has no OT mechanism at all (§1). | [CLT art. 58-A](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Exempt roles have no OT onset at all** | *Cargo de confiança* (art. 62 II) and incompatible-external-activity (art. 62 I) workers are **outside** the OT model entirely — no onset, no premium. | — | — | [CLT art. 62 I/II](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Semana espanhola / banked-hour compensation defers OT onset** | Where a compensation arrangement (§3d, §7) is validly in place, hours above 8h/day are **not** OT if offset within the arrangement's window — onset is deferred to window close, not daily. | A worker doing 9h under a valid *banco de horas* has that hour credited, not paid as OT, until the bank's balance is settled. | — | [CLT art. 59 §2](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |

### 3b. Rate & bands

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Statutory OT floor — ≥50%** | The constitutional floor is **+50%** over the normal hour; the old CLT art. 61 figure of 25% is *não-recepcionado* [not received by the Constitution] — **never** encode 25%. | A R$10/h worker doing 2 OT hours earns R$10×1.5×2 = R$30 for that surplus. | CBAs commonly set **60/80/100%**, never below 50%. | [CF/88 art. 7º XVI](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [CLT art. 59 §1](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Sunday/holiday worked, uncompensated → +100% (em dobro [in double])** | A **separate** premium from daily OT — work on a DSR day or holiday without a compensatory day off is paid **double**, not merely OT-rated. | A Sunday shift with no comp day off pays 2× the normal hourly rate for those hours, on top of any daily-OT tier already crossed. | Employer may instead grant a *folga compensatória* [compensatory day off] — not both (§6). | [Lei 605/1949 art. 9](https://www.planalto.gov.br/ccivil_03/leis/L0605.htm) 🔎; [TST Súmula 146](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Rural night premium — +25%, no reduced hour** | Rural workers get a flat **+25%** night premium (vs. urban's ≥20%) with **no** 52′30″ hour compression (§5). | A rural worker's R$10/h night hour under Lei 5.889/1973 pays R$12.50, at a real 60-minute hour (no §5 compression). | Window also differs by crop/livestock sub-sector (§5). | [Lei 5.889/1973 art. 7](https://www.planalto.gov.br/ccivil_03/leis/L5889.htm) 🔎 |

### 3c. Caps & counters

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Ordinary daily OT cap — 2h/day (→10h max)** | OT is capped at **2h/day** under the ordinary regime, for a **10h/day** practical ceiling. | A worker cannot ordinarily be scheduled past 10h/day even with OT pay. | CBA may extend via a valid compensation/banking arrangement (§7) or the professional-driver 4h CBA extension (§1). | [CLT art. 59](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **No statutory annual OT-hours ceiling** | Brazil caps the **daily** surplus and the **weekly** total (44h, §4), not a running annual OT-hour budget. | — | 🔎 sector inspection guidance may impose practical monitoring, not a statutory ceiling. | [CLT (silent on an annual cap)](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Professional driver OT cap** | **2h ordinary**, or **4h via CBA** — a sector-specific widening of the general 2h cap (§1). | An interstate driver under a CBA extension can be scheduled up to 12h/day (8h base + 4h OT), vs 10h/day for the general workforce. | — | [Lei 13.103/2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13103.htm) 🔎 |

### 3d. Averaging & annualisation

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Semana espanhola [Spanish week] — alternating 48h/40h avg to 44h** | A valid CBA/ACT-based alternating schedule — **48h one week, 40h the next** — nets to the **44h weekly average**, so **no OT premium** is owed on the 48h week if the average holds. **OT-determining**: it decides whether the premium applies, not merely whether a limit was breached. | Week 1 = 48h (no OT paid, since the 2-week average is 44h); Week 2 = 40h. | Recognised by TST **OJ 323**; must be instituted via CCT/ACT to be valid — a bare individual agreement is not sufficient (TRT case law). | [TST OJ 323 (SDI-1)](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Compensação de jornada [schedule compensation]** | General mechanism allowing hours worked beyond 8h on one day to offset a shortfall on another within the same week (e.g. working extra Mon–Fri to get Saturday off), **without** an OT premium if the weekly total stays within 44h. | 4 days at 8.8h + 1 day off = 35.2h ≈ within the 44h/week envelope, no OT. | Requires individual written agreement or CBA. | [CLT art. 59 §6](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **No OT-determining averaging beyond these two mechanisms** | Outside a valid semana espanhola or compensação de jornada, Brazil's OT is decided **daily** (§3a) — there is no broader multi-month reference-period averaging that decides OT eligibility (contrast Germany's working-time-*limit* averaging, which is a §4-type concept, not present here for OT). | — | — | [CLT art. 59](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |

### 3e. Composition & stacking

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Premiums stack additively across orthogonal dimensions** | OT tier × night × Sunday/holiday are **separate, additive** dimensions — a night OT hour on a Sunday carries **all three** bands. | A night hour worked as OT on a Sunday: base + OT ≥50% + night ≥20% + Sunday/holiday +100%, each totalled separately (not compounded multiplicatively). | The **explicit** additive/multiplicative/winner-take-all composition *mode* as a configurable primitive is a modelling choice, not itself a CLT rule — night-on-OT additive stacking is the well-established instance. | [CLT arts. 59, 73](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [TST case law](https://www.tst.jus.br/jurisprudencia) 🔎 (implicit in separate-bucket calculation) |
| **DSR reflexo [ripple effect] of habitual OT — raises the DSR base** | Habitually-worked OT **increases** the DSR pay base (TST Súmula 172). Since **20 Mar 2023** (OJ-SDI1 394 / Tema Repetitivo 9), this uplift also **cascades** into férias+1/3, 13º salário, aviso prévio and FGTS — but **only for OT worked from that date onward** (temporal split; pre-2023 OT keeps the no-cascade rule). | A worker with habitual OT sees their DSR pay computed on an OT-inclusive average, not just the base rate; if that habitual OT began in 2024, the cascade applies. | Monthly-salaried workers already have normal-hours DSR embedded in salary — only the OT reflex is incremental. | [TST Súmula 172; OJ-SDI1 394 / Tema 9](https://www.tst.jus.br/jurisprudencia) 🔎 |

## 4. Rest, breaks & working-time limits

*Hard limits and rest entitlements → flag a breach or classify the day, don't silently reshape hours.*

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Weekly ceiling — 44h** | **44h/week** is the constitutional ceiling, paired with the 8h/day limit (§3a); a peak day is legal only insofar as the week (or the compensation/semana-espanhola window) stays within it. | A worker doing 8h Mon–Fri + 4h Saturday totals 44h — at the ceiling, no breach. | ⚠ PEC 221/2019 would drop this to 40h — **not in force** (§1). | [CF/88 art. 7º XIII](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) |
| **Daily rest — interjornada [between-shifts rest] ≥11h** | **≥11 consecutive hours** of rest between the end of one shift and the start of the next. | A shift ending at 22:00 cannot resume before 09:00 the next day. | No statutory sector reduction identified for interjornada (contrast Germany's §7 CBA shortenings) — 🔎. | [CLT art. 66](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Weekly rest — DSR ≥24h, preferably Sunday** | A paid weekly rest of **≥24 consecutive hours**, preferably falling on Sunday. | A worker rests Sunday 00:00–Monday 00:00 at minimum. | Where Sunday work is authorised (§6), the rest day rotates but the ≥24h/week entitlement remains. | [Lei 605/1949](https://www.planalto.gov.br/ccivil_03/leis/L0605.htm) 🔎; [CF/88 art. 7º XV](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [CLT art. 67](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **DSR forfeiture — unjustified absence/lateness** | An **unjustified** full-week absence or lateness **forfeits** that week's paid DSR; absences justified under art. 131/473 (§10) **preserve** it. | A worker with one unexcused no-show earlier in the week loses pay for that week's DSR. | — | [Lei 605/1949 art. 6](https://www.planalto.gov.br/ccivil_03/leis/L0605.htm) 🔎; [CLT art. 131](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Max consecutive workdays — the "escala 6x1" pattern** | Because DSR requires only **1 rest day per week**, employers can lawfully roster **6 consecutive workdays** before the rest day (colloquially "*escala 6x1*"). This is the **current** ceiling, not a distinct named regime. | A retail worker on Mon–Sat with Sunday off is at the legal maximum consecutive-workday pattern today. | ⚠ PEC 221/2019 (§1) would mandate **2** rest days/week, ending the 6x1 pattern — **not in force**. | [Lei 605/1949 (implied by the 1-day/week floor)](https://www.planalto.gov.br/ccivil_03/leis/L0605.htm) 🔎 |
| **Intrajornada break — shift >6h** | **≥1h** (max 2h unless CBA-extended), reducible to **30 min** via CBA/ACT (post-2017). | An 8h shift needs ≥1h unpaid break, or 30min if the sector CBA sets that. | Reduction requires a valid CBA/ACT, not a bare individual agreement. | [CLT art. 71](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); art. 611-A III |
| **Intrajornada break — 4–6h shift** | **15 min** minimum. | A 5h shift needs a 15-min break. | Shifts ≤4h require no mandatory break. | [CLT art. 71 §1](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Intrajornada suppression penalty (post-2017)** | Skipping/shortening the mandatory break owes **+50%** on the **suppressed portion only**, paid as an **indemnatory** (non-salary-integrating) amount — not the whole interval. | A worker denied 20 of their 60-minute break is owed 20 minutes × 1.5, indemnatory. | ⚠ The pre-reform rule (whole interval, salary-nature, TST Súmula 437) was **formally cancelled 30 Jun 2025** and governs only facts before 11 Nov 2017. | [CLT art. 71 §4](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Professional driver rest** | **11h/24h** rest, with a mandatory **8h uninterrupted** minimum even if the rest is split. | A driver splitting rest into blocks must still get one 8h uninterrupted stretch. | Sector-specific (§1). | [Lei 13.103/2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13103.htm) 🔎 |

## 5. Night & shift work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Adicional noturno [night premium] — urban** | **≥20%** over the day-hour rate, window **22:00 → 05:00**. | A worker's 22:00–05:00 hours each carry a ≥20% uplift over the ordinary rate. | CBA commonly raises the %. | [CLT art. 73 *caput* + §2](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Hora noturna reduzida [reduced night hour] — urban** | The night hour is **compressed to 52 min 30 s**, so **7 worked night-hours count as 8** for pay purposes — a **duration**, not a rate, effect. | A worker clocking 22:00–05:00 (7 clock-hours) is credited **8 paid hours** for that stretch. | Distinct from paid-but-non-OT sleep/standby time; **no** such reduction for rural workers. | [CLT art. 73 §1](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Rural night window & premium** | Window **21:00–05:00** (lavoura [crop agriculture]) or **20:00–04:00** (pecuária [livestock]); premium **+25%**; the hour is a **full 60 minutes**, no compression. | A livestock worker's 20:00–04:00 hours each carry +25%, at a real 60-minute hour. | Two different windows by crop vs livestock sub-sector. | [Lei 5.889/1973 art. 7](https://www.planalto.gov.br/ccivil_03/leis/L5889.htm) 🔎 |
| **Night prorrogação [extension] — Súmula 60 II** | A shift that **starts inside** the night window and is **extended past 05:00** keeps the night premium on the hours **after** 05:00 too. | A 23:00–07:00 shift carries the night premium on the full stretch, including 05:00–07:00. | — | [TST Súmula 60 II](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Night premium integrates salary — Súmula 60 I** | A **habitually**-paid night premium becomes part of the base salary for other calculations (13º, férias, etc. — downstream money). | — | — | [TST Súmula 60 I](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Moving to day shift loses the premium — Súmula 265** | A worker permanently transferred to a day shift **loses** the night premium going forward (no vested right to keep it). | — | — | [TST Súmula 265](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Minors — absolute night ban** | Workers **<18** may **never** work **22:00–05:00**, with no CBA override. | A 17-year-old apprentice must finish by 22:00 regardless of any CBA extending adult hours. | Applies even to *aprendiz* [apprentice] contracts from age 14. | [CLT art. 404](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [CF/88 art. 7º XXXIII](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) |

## 6. Weekend & public-holiday work

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Feriados [public holidays] — national calendar** | **7 fixed national holidays**: 1 Jan, 21 Apr, 1 May, 7 Sep, 2 Nov, 15 Nov, 25 Dec. | Every worker nationwide is off (or gets the +100% dobra, §3b) on 7 Sep regardless of state/municipality. | Carnival/Good Friday are customary, not all statutorily mandatory nationwide 🔎. | [Lei 662/1949](https://www.planalto.gov.br/ccivil_03/leis/L0662.htm) 🔎 as amended by [Lei 10.607/2002](https://www.planalto.gov.br/ccivil_03/leis/2002/L10607.htm) 🔎 |
| **Feriados — sub-national layer** | **Up to 4 municipal** religious holidays per municipality, plus **state**-level holidays by state law. | The same date can be a normal workday in one municipality and a paid holiday in a neighbouring one. | State/municipal calendars are external reference data, not a CLT rule. | [Lei 9.093/1995](https://www.planalto.gov.br/ccivil_03/leis/L9093.htm) 🔎 |
| **Worked holiday, uncompensated → +100% (em dobro)** | Work on a holiday **without** a compensatory day off is paid **double**. Employer chooses **either** the dobra **or** a *folga compensatória* [compensatory day off] — **not both**. | A worker rostered on 15 Nov with no comp day off earns double for those hours. | 12x36 shifts (§9) treat holidays as "*considerados compensados*" — no dobra (§9). | [Lei 605/1949 art. 9](https://www.planalto.gov.br/ccivil_03/leis/L0605.htm) 🔎; [TST Súmula 146](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Sunday work — prohibited by default, exception for commerce** | General commerce may work Sundays **subject to municipal authorisation**, with a **fortnightly rotation schedule** [*escala de revezamento quinzenal*] required. | A retail chain rosters Sunday shifts on a rotating two-week cycle per store, per municipal permit. | Non-commerce sectors need their own statutory/regulatory basis to work Sundays. | [Lei 10.101/2000 art. 6](https://www.planalto.gov.br/ccivil_03/leis/L10101.htm) 🔎 |
| **≥1 Sunday off per 3-week window** | Even under an authorised Sunday-work rotation, the worker's **paid weekly rest must coincide with Sunday at least once every 3 weeks**. | A commerce worker rostered most Sundays must still land a rest-day Sunday at least once every 21 days. | Historic sex-based restrictions on women's Sunday commerce work have been equalised (STF case law). | [Lei 10.101/2000 art. 6, sole paragraph](https://www.planalto.gov.br/ccivil_03/leis/L10101.htm) 🔎 |
| **Holiday-on-rest-day doctrine — 12x36 embedding** | Under the 12x36 regime (§9), the monthly pay **already embeds** DSR and holiday compensation — feriados worked and night-work extensions are **"considerados compensados"** [deemed compensated] → **no separate holiday dobra**, though *adicional noturno* still applies in full. | A 12x36 nurse working a holiday shift gets no additional dobra — it's embedded in the 12x36 monthly rate — but still earns the night premium if applicable. | — | [CLT art. 59-A, parágrafo único](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [OJ-SDI1 388](https://www.tst.jus.br/jurisprudencia) 🔎 |

## 7. Time banking & time-off-in-lieu

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Banco de horas [hours bank] — CBA window** | Surplus hours banked and offset by time off within **up to 1 year**, via *convenção*/*acordo coletivo*. | Hours banked in Q1 are drawn down as days off through year-end. | The widest of the three windows. | [CLT art. 59 §2](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Banco de horas — individual written-agreement window** | **Up to 6 months**, via an individual **written** agreement (no union required). | Hours banked in January can be drawn down as time off through end of June under a signed individual agreement, with no CBA involved. | ⚠ Contested — TST Súmula 85 V (requiring collective negotiation) conflicts with this post-2017 individual-agreement window; under TST *Recursos Repetitivos* [repetitive-appeals procedure] review since 2024 — flag the dispute. | [CLT art. 59 §5](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Banco de horas — tacit/same-month window** | **Same calendar month**, individual, tacit or written. | A surplus Monday is offset by a shorter Friday within the same month, no formal agreement needed. | Narrowest window; the default fallback. | [CLT art. 59 §6](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **In-window compensation is 1:1 — no premium** | Banked hours offset **1:1** ("*dispensado o acréscimo de salário*" [premium waived]) — no OT uplift while properly within the window. Daily ceiling while banking: **10h/day**. | 2 banked hours offset exactly 2 hours of time off — no 1.5× multiplier. | — | [CLT art. 59 §2](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Payout / uncompensated balance → OT at ≥50%** | A balance **not compensated within the window** converts to *horas extras* at the standard **≥50%** premium. | An expired banco balance of 5h is paid at 1.5× the hourly rate. | — | [CLT art. 59 §1](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Termination — balance valued at the termination-date rate** | Any positive balance owed at termination is valued using the **remuneration in effect on the termination date**, not the rate when the hours were originally worked. | A worker terminated after a raise has their old banked hours paid at the **new**, higher rate. | — | [CLT art. 59 §3](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Negative balance — discount rules** | A negative bank (more absence-offset than surplus) can be **discounted from pay only if** a written individual agreement or CBA expressly allows it; discount is capped at **one month's salary**; cannot touch FGTS/13º/other guaranteed rights. | An employee with −8h at termination has that value withheld from final pay only if the signed agreement permits it. | Without an explicit agreement clause, no negative-balance discount is lawful. | [CLT art. 59 §§2/6](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); case law |

## 8. On-call & standby

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Sobreaviso [on-call from home]** | Worker **reachable from home**, awaiting a call, for up to **24h** — paid **1/3** of the ordinary hourly wage for the availability period (activation hours paid separately, at the applicable rate). | A technician on a 24h home on-call rotation earns 1/3-rate for the standby block, plus full (or OT) pay for any actual call-out. | CBAs commonly raise the 1/3 floor. | [CLT art. 244 §2](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Prontidão [on-site standby]** | Worker **at the establishment**, awaiting orders, for up to **12h** — paid **2/3** of the ordinary hourly wage. | A firefighter/rail worker held on-site awaiting dispatch earns 2/3-rate for the standby block. | — | [CLT art. 244 §3](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Phone alone ≠ sobreaviso — Súmula 428** | Merely **carrying a company phone** is **not** sobreaviso (item I); a **remote-controlled *plantão*** [on-call regime with real reachability/response obligations] **is** (item II). | An employee with a phone but no obligation to respond has no sobreaviso claim; one on a rostered remote-support rotation does. | Originally a railway-sector rule, extended by analogy (IT/electrical on-call). | [TST Súmula 428](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Professional driver — tempo de espera [waiting time]** | Waiting time (e.g. at a loading dock) is a **distinct category** from ordinary hours or standby — indemnified at **30%** of the normal hourly wage. | A driver waiting 3h to load cargo earns 30%-rate indemnity for that block, not full hours or OT. | Sector-specific (§1). | [Lei 13.103/2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13103.htm) 🔎 |

## 9. Scheduling & premium pay

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **No statutory reporting/show-up or predictability pay** | Brazil has **no** statutory reporting-time, call-in, or predictability-pay regime (unlike US CA/NYC-style rules). | — | — | (none statutory) |
| **Jornada 12x36 — compressed schedule** | **12h worked / 36h uninterrupted rest**, by individual **written** agreement or CBA; validated for **individual** agreements without union sign-off. | A hospital nurse works a 12x36 rotation: one 12h shift, then 36h off. | Intrajornada break must be observed or indemnified within the 12h. | [CLT art. 59-A](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [STF ADI 5994 (30 Jun 2023)](https://portal.stf.jus.br/jurisprudencia/) 🔎 |
| **12x36 embeds DSR + holiday comp** | The monthly rate already **embeds** DSR and holiday pay ("*considerados compensados*") — see §6 — but *adicional noturno* is paid **in full** on top. | — | ⚠ Old Súmula 444 (12x36 only via CBA, dobro on feriados) was **cancelled 30 Jun 2025**, superseded by art. 59-A + ADI 5994. | [CLT art. 59-A parágrafo único](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Compensação de jornada / semana espanhola scheduling** | The scheduling mechanism behind §3d's OT-averaging — a valid written agreement/CBA lets daily surpluses offset shortfalls within the week without triggering OT. | — | — | [CLT art. 59 §6](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [TST OJ 323](https://www.tst.jus.br/jurisprudencia) 🔎 |
| **Sunday-work rotation scheduling (commerce)** | Employers running authorised Sunday commerce work must build a **fortnightly rotation roster**, ensuring the ≥1-Sunday-off-per-3-weeks entitlement (§6). | — | — | [Lei 10.101/2000 art. 6](https://www.planalto.gov.br/ccivil_03/leis/L10101.htm) 🔎 |
| **Split-shift premium — not specifically regulated** | No CLT-specific split-shift premium identified; a split day is governed by the ordinary hours/break/interjornada rules (§4). | — | — | — none identified in current research — |

## 10. Leave & absence

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Férias [annual leave] — entitlement** | **30 corridos** [consecutive calendar days] after each 12-month *período aquisitivo* [accrual period], to be granted within the following 12 months. Late grant → paid **in dobro** [double]. | A worker completing 12 months' service on 1 March is entitled to 30 days, grantable through the next 28 Feb. | — | [CLT arts. 130, 134, 137](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Férias — split (post-2017)** | May be split into **up to 3 periods**, one of which must be **≥14 consecutive days**, the others **≥5 days** each; employee consent required; may not start in the **2 days before a holiday or DSR**. | 20 + 6 + 4 days is invalid (last block <5); 16 + 9 + 5 is valid. | — | [CLT art. 134 §1](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Férias — absence-tier reduction (art. 130)** | *Unjustified* absences in the accrual year reduce the entitlement: **≤5 → 30 days**; **6–14 → 24**; **15–23 → 18**; **24–32 → 12**; **>32 → 0** days. Justified absences (art. 131) don't count. | A worker with 10 unjustified absences in the year gets 24 vacation days, not 30. | — | [CLT art. 130](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Abono pecuniário [cash conversion]** | Employee may convert **1/3** of the entitlement to cash, if requested **≥15 days** before the accrual period ends. | A worker converts 10 of 30 days to a cash payment, taking 20 days off. | — | [CLT art. 143](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Licença-maternidade [maternity leave]** | **120 calendar days** (constitutional floor), extendable to **180 days** for employers enrolled in the *Empresa Cidadã* [Corporate Citizen] program (+60 days). Applies identically to **adoptive** mothers/single adoptive fathers from the date of adoption/custody order, regardless of the child's age. | A worker at an Empresa-Cidadã-enrolled employer takes the full 180 days; one at a non-enrolled employer takes 120. | If the mother dies, the father inherits the remaining maternity-leave period. | [CF/88 art. 7º XVIII](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm); [CLT art. 392](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); art. 392-A (adoption); [Lei 11.770/2008 (Empresa Cidadã)](https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11770.htm) 🔎 |
| **Job stability — pregnant worker** | Dismissal protection from **confirmation of pregnancy** until **5 months after childbirth** (except for-cause dismissal). | An employee who discloses pregnancy mid-notice-period regains job stability retroactively to conception. | Adoptive employees get 5 months' stability from the adoption (art. 391-A). | [ADCT art. 10 §1 (CF/88)](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) |
| **Licença-paternidade [paternity leave] — evolving in 2026** | Statutory floor **5 business days**; employers in *Empresa Cidadã* already grant **20 days**. **⚠ Lei 15.371/2026** phases in an expansion: through 31 Dec 2026 the 5-day floor still applies broadly; the phase-in is projected to reach **up to 35 days** (20 + 15 additional) for Empresa-Cidadã employers by **2029**. **Treat as a phasing schedule, not yet a stable final figure** — recheck. | A worker at a non-enrolled employer takes 5 days in 2026; one at an enrolled employer takes 20 (rising over the phase-in). | Adoptive fathers (sole adopter) get the full maternity-length leave (120/180 days) instead, per art. 71-A Lei 8.213/91. | [CF/88 art. 7º XIX](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) + ADCT art. 10 §1 (5-day floor); [Lei 13.257/2016 (Empresa Cidadã 20-day)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13257.htm) 🔎; [Lei 15.371/2026 (2026 phase-in)](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15371.htm) 🔎 not fully settled |
| **Auxílio-doença [sickness benefit] — employer-paid first 15 days** | For **non-occupational** illness, the **employer** pays full salary for the first **15 consecutive days** from a medical certificate; from the **16th day**, the worker is referred to INSS [social-security institute] for *auxílio-doença* (money, downstream). Certificates for the **same illness** within a rolling **60-day** window and totalling >15 days may be **summed** by the employer to trigger the referral. | An employee out sick for 10 days, back a week, then out 8 more days for the same condition within 60 days: employer sums to 18 days and refers to INSS from day 16 of the combined count. | Occupational illness/accident (*auxílio-acidentário* [occupational-accident benefit]) follows a related but distinct track — 🔎 not detailed here (money/benefit-classification downstream). | [Lei 8.213/1991 art. 60 §3](https://www.planalto.gov.br/ccivil_03/leis/L8213compilado.htm) 🔎 |
| **Licença nojo [bereavement leave]** | **2 consecutive days**, for the death of a spouse, ascendant, descendant, sibling, or declared economic dependent. | An employee's parent dies → 2 paid days off, no salary deduction. | — | [CLT art. 473 II](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Licença gala [marriage leave]** | **3 consecutive days** for the employee's own marriage. | An employee marrying on a Thursday gets Thu–Sat off, paid, with no deduction. | — | [CLT art. 473 II](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Doação de sangue [blood donation]** | **1 day per 12-month period**, on proof from the blood bank. | An employee who donates blood in March cannot claim a second paid donation day before the following March. | — | [CLT art. 473 IV](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Other art. 473 justified absences** | A closed list of **~12 categories** of justified, paid absence — incl. voter registration/civic duties, jury/witness duty, university entrance exams, military-service obligations, and (2026 addition) time to attend HPV/cancer preventive exams. | An employee summoned for jury duty, or sitting a university entrance exam, is paid for that day with no deduction, each under its own art. 473 item. | Each item has its own day-count/condition; not exhaustively itemised here — 🔎 confirm the exact current list (Lei 15.377/2026 added the exam-attendance item). | [CLT art. 473 (I–XI as amended)](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [Lei 15.377/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15377.htm) 🔎 |
| **No general statutory family/care or educational leave** | Unlike Germany's *Bildungsurlaub* [statutory paid educational leave] or care-leave schemes, Brazil has **no** general federal paid educational leave or dependent-care leave entitlement beyond the specific art. 473 items and maternity/paternity/adoption leave. | — | Individual CBAs may grant sector-specific extras. | — none identified in current federal research — |

## 11. Recordkeeping & tolerance

| Rule | Values | Worked example | Variants | Basis |
|---|---|---|---|---|
| **Recording obligation — establishments >20 employees** | Employers with **more than 20** employees must record time punches (threshold raised from 10 by the 2019 reform). | A 25-employee shop must operate a *ponto* [time-clock] system; an 18-employee shop is exempt. | *Ponto por exceção* [exception-only recording] permitted by individual written agreement, CCT or ACT (record only deviations from the pre-set schedule). | [CLT art. 74 §§2/4](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm); [Lei 13.874/2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13874.htm) 🔎 |
| **REP [time-recording equipment] types** | **REP-C** (physical clock), **REP-A** (alternative device — authorised **only by CCT/ACT**), **REP-P** (software/mobile app). | A company using a mobile-app punch system operates under REP-P rules. | — | [Portaria MTP 671/2021](https://www.gov.br/trabalho-e-emprego/pt-br) 🔎 (+ predecessors 1.510/2009, 373/2011) |
| **Fiscal record files** | **AFD** [raw punch file] and **AEJ** [treated/processed journey file] are the statutory export formats for labour-inspection audits. | — | — | [Portaria MTP 671/2021](https://www.gov.br/trabalho-e-emprego/pt-br) 🔎 |
| **Tolerance — 5 min/punch, max 10 min/day** | Variations **≤5 minutes per punch**, up to a **maximum 10 minutes/day**, are **neither deducted nor paid** as OT. | A worker clocking in 3 minutes late and out 3 minutes late has both variations forgiven (6 min total, under the 10-min daily cap). | — | [CLT art. 58 §1](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm) |
| **Exceed daily tolerance → whole excess is OT — Súmula 366** | If the day's **total** deviation exceeds 10 minutes, the **entire** excess (not just the portion above 10 min) counts as *horas extras* or as a deduction. | A worker with 14 minutes of net daily deviation has the **full 14 minutes** — not just the 4 over the cap — treated as OT. | — | [TST Súmula 366](https://www.tst.jus.br/jurisprudencia) 🔎 |

## Sources (requirements section)

- **Repo seeds:** `context/worldwide-calculations/brazil.md` (June 2026); prior
  `support-memos/brazil.md` (now the parked appendix below).
- **Primary statute — planalto.gov.br (official federal legislation register):**
  [CF/88](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) art. 7º;
  [CLT (Decreto-Lei 5.452/1943)](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452compilado.htm)
  arts. 4, 58, 58-A, 59, 59-A, 61, 62, 66, 67, 71, 73, 74, 130–137, 143, 244, 392, 392-A, 402–441, 473,
  611-A/B — both URL patterns confirmed live; [Lei 605/1949](https://www.planalto.gov.br/ccivil_03/leis/L0605.htm) 🔎;
  [Lei 5.889/1973](https://www.planalto.gov.br/ccivil_03/leis/L5889.htm) 🔎;
  [Lei 8.213/1991](https://www.planalto.gov.br/ccivil_03/leis/L8213compilado.htm) 🔎 art. 60, art. 93, art. 71-A;
  [Lei 9.093/1995](https://www.planalto.gov.br/ccivil_03/leis/L9093.htm) 🔎;
  [Lei 10.101/2000](https://www.planalto.gov.br/ccivil_03/leis/L10101.htm) 🔎 art. 6;
  [Lei 11.770/2008](https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11770.htm) 🔎;
  [Lei 12.010/2009](https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12010.htm) 🔎;
  [Lei 13.103/2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13103.htm) 🔎;
  [Lei 13.257/2016](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/lei/l13257.htm) 🔎;
  [Lei 13.467/2017](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13467.htm) (URL confirmed live);
  [Lei 13.874/2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13874.htm) 🔎;
  [Lei 14.442/2022](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14442.htm) 🔎;
  [Lei 15.371/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15371.htm) 🔎;
  [Lei 15.377/2026](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15377.htm) 🔎.
- **Jurisprudence:** TST Súmulas 60, 85, 146, 172, 265, 366, 428, 431, 437 (cancelled 30/06/2025), 444
  (cancelled 30/06/2025); OJ-SDI1 323, 388, 394 (Tema Repetitivo 9); STF ADI 5994; STF Tema 1.046 —
  [tst.jus.br/jurisprudencia](https://www.tst.jus.br/jurisprudencia) 🔎, [portal.stf.jus.br/jurisprudencia](https://portal.stf.jus.br/jurisprudencia/) 🔎
  (hub links; per-Súmula/ADI deep links not yet confirmed).
- **PEC 221/2019 status:** [camara.leg.br](https://www.camara.leg.br/propostas-legislativas) 🔎; senado.leg.br;
  [sitepd.org.br (2026-07-17)](https://sitepd.org.br/2026/07/17/fim-da-escala-6x1-senado-final-recesso-parlamentar/);
  [meutudo.com.br (2026-07-08)](https://meutudo.com.br/blog/noticias/2026/07/08/escala-6x1-ja-acabou-projeto-aguarda-a-41-dias-no-senado-veja-previsao/);
  [agenciabrasil.ebc.com.br](https://agenciabrasil.ebc.com.br/politica/noticia/2026-05/camara-aprova-em-dois-turnos-pec-pelo-fim-da-escala-6x1).
- **Maternity/paternity leave 2026 update:** [conjur.com.br — Lei 15.371/2026](https://www.conjur.com.br/2026-abr-10/a-lei-no-15-371-2026-e-a-licenca-paternidade-no-brasil/);
  [marraclt.com.br](https://www.marraclt.com.br/direitos-da-gestante/licenca-paternidade-quantos-dias-2026-empresa-cidada);
  [barbieriadvogados.com](https://www.barbieriadvogados.com/licenca-maternidade-2026-direitos/).
- **Sick leave / auxílio-doença:** [nossodireito.com](https://nossodireito.com/auxilio-doenca/auxilio-doenca-quem-paga-primeiros-15-dias);
  [guiatrabalhista.com.br](https://www.guiatrabalhista.com.br/tematicas/atestado_nao_garantia.htm).
- **Art. 473 justified absences (nojo/gala/blood donation):** [pontotel.com.br](https://www.pontotel.com.br/artigo-473-clt/);
  [solides.com.br](https://solides.com.br/blog/artigo-473-da-clt/).
- **Minors / apprentices:** [tst.jus.br](https://www.tst.jus.br/noticias/-/asset_publisher/89Dk/content/id/4959439);
  [fazercurriculogratis.com.br](https://fazercurriculogratis.com.br/artigos/aprendiz-noturno).
- **Adoption leave:** [motaadvocacia.com](https://motaadvocacia.com/licenca-maternidade-a-adotante/);
  [jusbrasil.com.br — art. 392-A](https://www.jusbrasil.com.br/artigos/artigo-392-a-da-clt-direitos-da-empregada-adotante-ou-com-guarda-judicial/2272751508).
- **Disabled workers (PCD):** [genyo.com.br](https://genyo.com.br/direitos-pcd/); [pontotel.com.br](https://www.pontotel.com.br/contratacao-de-pcd/).
- **Semana espanhola / compensação de jornada:** [conjur.com.br](https://www.conjur.com.br/2026-abr-27/acordo-coletivo-valida-escala-alternada-entre-48h-e-40h-sem-aval-do-governo/);
  [bocchitrabalhista.com.br](https://bocchitrabalhista.com.br/semana-espanhola/); [genyo.com.br](https://genyo.com.br/semana-espanhola/).
- **Banco de horas negativo:** [pontotel.com.br](https://www.pontotel.com.br/banco-de-horas-negativo/);
  [solides.com.br](https://solides.com.br/blog/banco-de-horas-negativo-pode-ser-descontado/).
- **Cargo de confiança (art. 62):** [trt4.jus.br](https://www.trt4.jus.br/portais/trt4/modulos/noticias/50775787);
  [cerdeiraeadvogados.com.br](https://www.cerdeiraeadvogados.com.br/controle-de-jornada-excecoes-do-artigo-62-da-clt-e-a-configuracao-do-cargo-de-confianca/).
- **Tempo à disposição / horas in itinere (2017 reform):** [conjur.com.br](https://www.conjur.com.br/2018-dez-04/opiniao-reforma-trabalhista-nao-acabou-horas-in-itinere/);
  [konsi.com.br](https://www.konsi.com.br/postagens/artigo-4-clt-tempo-a-disposicao-servico-efetivo).
- **Sunday commerce work:** [coad.com.br](https://www.coad.com.br/files/trab/html/dp/em26311.htm); [migalhas.com.br](https://www.migalhas.com.br/depeso/438628/trabalho-em-domingos-e-feriados-regras-e-limites-legais).
- **Professional drivers (Lei 13.103/2015):** [infleet.com.br](https://infleet.com.br/blog/lei-13103/); [metadados.com.br](https://www.metadados.com.br/blog/lei-no-13-1032015-controle-de-jornada-de-trabalho-de-motoristas).

> **⚠ Verification note.** This pass confirmed live URL patterns for planalto.gov.br's CLT
> (`del5452compilado.htm`), CF/88 (`constituicao.htm`) and Lei 13.467/2017 via direct search-result
> hits from the planalto.gov.br domain itself. The remaining individual-statute planalto links follow
> the same, well-established planalto URL conventions (`/ccivil_03/leis/L####.htm` for pre-2000 laws,
> `/ccivil_03/_ato{range}/{year}/lei/l#####.htm` for later ones) but were **not individually
> fetch-confirmed** this pass (web budget exhausted at 3 searches) — flagged 🔎. TST/STF links point to
> the jurisprudence hub, not a per-Súmula/ADI deep page — also 🔎. Recommend a follow-up pass to
> resolve each 🔎 before customer-facing use.

---

## Appendix (parked) — day.io capability & compliance-support analysis

Parked 2026-07-21. Former verdict-first memo content, kept intact.

# Brazil — T&A compliance support

**Verdict: 🟠 Partial — but the portfolio's *strongest* fit.** Brazil is the jurisdiction the engine was
historically built around (CLT-derived), so its statutory T&A layer maps to **already-shipping ("Existing")
behavior** more than any other country: daily OT, the hours bank, adicional noturno, DSR as a *first-class*
concept, the validity-vs-tolerance model, on-call, holidays, and CCT-as-pay-policy are all present today. The
CCT-portfolio classification run (`brazil-cct-support-matrix.md`) found **no hard ❌ gaps** — every delta is
supported today or a config/roadmap ⚠️. The residual gaps are a handful of **Brazil-specific mechanics** (the
reduced night hour, the intrajornada-suppression penalty) plus the shared **cross-run counters** (férias
accrual) and **limit-validation** items — none Critical. Read with the scope, verdict key, and **Basis key**
in [`README.md`](./README.md). **No verdict is DB-confirmed this pass** (live-DB IAM-blocked, `403`).

> **Weekly-OT note.** A **weekly OT trigger** is now supported (`[PO]`, 2026-07-18). It is **not material for
> Brazil**: Brazilian OT is fundamentally **daily** (≥50% on the surplus over the 8h daily limit, 2h/day cap;
> CLT art. 59), which is exactly the engine's per-day surplus-above-planned model — the reason the engine
> accumulates OT per day. Brazil's **44h *weekly*** figure is a working-time **limit** to flag, not a premium
> trigger, so the weekly-OT capability doesn't change Brazil's posture.

## Legal source

`context/worldwide-calculations/brazil.md` — a multi-source June-2026 read of the CLT (Decreto-Lei 5.452/1943),
CF/88 art. 7º, the relevant TST Súmulas/OJs, STF decisions, the *Reforma Trabalhista* (Lei 13.467/2017), and
the *ponto* portarias. It is self-labelled *requirement side, not engineering ground truth*. **What it is
silent / uncertain on** (flagged 🔎 below, not asserted): whether `allow_night_reduced_hours` actually exists
and models the 52′30″ compression (it tracks this as **scan-unverified**, finding #19); whether the full
worked-holiday comp model ships (it calls this **gap #6**); whether the interjornada 11h rest is *validated*;
and the exact semantic match between `nightShiftExtendToFullRange` and Súmula 60 II *prorrogação*. The headline
moving part — **PEC 221/2019 ("fim da escala 6x1", 44h→40h)** — is **pending in the Senado, NOT in force**
(June 2026); the **44h ceiling stands**.

## Governing sources — who actually sets the operative numbers

Brazil is **federally uniform** (unlike the US/India): the CLT is national, so 8/44, the ≥50% OT floor,
adicional noturno, DSR and the intervalo rules are the **same in every state**. The real variation axis is
**collective bargaining** — each CCT/ACT resolves to a **separate pay policy** that replaces the floor for its
group (one arrangement = one policy; mapping is **not** 1:1). Direct analog of France's CCN / Germany's Tarif.

| Layer | Instrument | Sets the operative T&A numbers? |
|---|---|---|
| Statute (federal, uniform) | CLT (Decreto-Lei 5.452/1943) + CF/88 art. 7º | **Floors + ceilings** — 8h/day·44h/wk, ≥50% OT floor, +100% Sunday/holiday dobra, adicional noturno ≥20% (22:00–05:00), DSR ≥24h, intervalos, the three banco windows, 5/10-min tolerance |
| Sub-national | State law + up-to-4 municipal (religious) holidays (Lei 9.093/95) | **Only the holiday calendar** — there is **no** state-by-state T&A matrix |
| **CCT** (*convenção coletiva*, union↔union, sector-wide) | negotiated | **Raises floors + chooses modalities** — higher OT % (60/80/100, never <50), the 1-yr banco, 30-min intrajornada, REP-A recording ("negociado sobre o legislado", art. 611-A; STF Tema 1.046, within the art. 611-B non-negotiable list) |
| **ACT** (*acordo coletivo*, company-level) | negotiated | Same levers, company-scoped |
| Jurisprudence (TST / STF) | Súmulas · OJs · ADIs | **Interpretation + temporal splits** — Súmula 366 (tolerance→whole excess), 60 II (*prorrogação*), 146 (dobra), OJ-394/Tema 9 (DSR cascade from 20/03/2023), ADI 5994 (individual 12x36) |

## Rule-by-rule (Basis = where the verdict comes from)

| # | Brazil requires (time/day-event only) | Our current capability | Verdict | Basis | Evidence / note |
|---|---|---|---|---|---|
| 1 | **Daily 8h → OT onset.** OT (*horas extras*) is the surplus over the 8h daily limit; Brazil's OT is **daily, not weekly** (CF art. 7º XIII; CLT art. 58/59) | **OT onset = surplus of actual worked time above the planned shift** — the engine's core per-day model | ✅ | [API][UI][LAW] | **Brazil is *why* the engine accumulates OT per day** (S4). Set planned = 8h → surplus is daily OT, out of the box |
| 2 | **Daily OT premium ≥50%, ordinary cap 2h/day (→10h max).** Floor is +50% (CF art. 7º XVI); CBAs set 60/80/100 but **never <50** (25% is *não-recepcionado*) | Configurable OT **rate row** per day-group; **rate-chaining by hours** (`phases[].limit`) for a 2h-then-different tier | ✅ | [API][UI] | We emit the **OT-hours event + quantity**; the % is downstream money. The **2h/day cap** *as a breach flag* is alert-only (see #4) |
| 3 | **Sunday/holiday worked, uncompensated → +100% (dobra).** Separate from daily OT, not a substitute (Lei 605/49 art. 9; Súmula 146) | Sunday / Holiday / "DSR & Rest days" **rate rows** (`daysMask` day-groups) → typed premium event | ✅ | [API][UI] | S1. The +100% is money; we emit the typed Sunday/Holiday premium hours. Interaction with the folga alternative → #18 |
| 4 | **Weekly 44h & daily 2h-OT limits → flag a breach**, don't silently cap | Notifications/alerts levers (bank/EH thresholds) — **alert only, no hours effect** | 🟡 | [API][ABS] | Brazil OT is **daily**, so 44h/wk is a *limit to flag*, not a premium; **pay stays correct**. No breach-*validation* primitive (G4); a payroll event can also be emitted if desired |
| 5 | **Banco de horas windows — 1yr (CCT) · 6mo (individ. written) · same month (tacit).** (CLT art. 59 §§2/5/6) | **Banked Hours** cycle, duration **1–18 months**, cyclical or full reset | ✅ | [API][UI] | S6. All three CLT windows fit the cycle length (12 / 6 / 1 mo). Out of the box |
| 6 | **In-window compensation is 1:1, no premium** ("dispensado o acréscimo", art. 59 §2); daily ceiling 10h while banking | BH accrual is a **time credit** (1:1); **BH↔EH split per rate row** routes OT to bank vs cash | ✅ | [API][UI] | The bank's native accrual **is** 1:1. Non-unit lieu ratios would be the open question (G13) — but Brazil's banco *is* unit, so no gap here |
| 7 | **Payout / not compensated in time → OT at ≥50%; at termination valued at the *termination-date* rate** (art. 59 §§1/3) | Positive bank at cycle close → **Convert to Extra Hours (with multiplier)** (§3.2) | ✅ | [API][UI] | Emitting the balance as OT hours is supported. The **termination-date *revaluation*** is a rate-base/money concern (downstream) — 🔎 confirm the payout uses the current rate |
| 8 | **Adicional noturno ≥20%, urban window 22:00–05:00** (CLT art. 73 + §2) | **Night premium** — configurable window + %; sample default **22:00/05:00, 20%** | ✅ | [API][UI] | S8. Brazil-tuned out of the box; the % and window are policy-set values, not constants |
| 9 | **Hora noturna reduzida — 52′30″.** 7 worked night hours count as 8 (**duration compression**, CLT art. 73 §1) | `businessRules.allow_night_reduced_hours` — **⚠ code-scan-unverified** (finding #19) | 🟠 / 🔎 | [DES][ABS] | Genuine Brazil delta. If the field exists it's ✅; **it is quantity-affecting** (changes the credited night hours), so verify before asserting. Distinct from sleep time and from the night *rate* |
| 10 | **Night prorrogação (Súmula 60 II).** A full night shift extended past 05:00 keeps the premium on the post-05:00 hours | `SourceShift.businessRules.nightShiftExtendToFullRange` + the UI "schedules started inside the window count entirely as night" toggle | ✅ / 🔎 | [FLD][UI] | Brazil-confirmed field. 🔎 the field's semantics ("**starts** in window → all night") vs Súmula 60 II's "**extends past** 05:00 → premium continues" — confirm the exact match |
| 11 | **Intervalo intrajornada — ≥1h (shift >6h), 15min (4–6h); reducible to 30min via CBA** (CLT art. 71 + 611-A III) | **Break config on the schedule** (mode, paid/unpaid, startAfter); breaks net out of `shiftWorkingMinutes` | 🟡 / 🔎 | [DES][API] | Configurable; the CBA 30-min variant is just a value. **Min-break-by-hours *validation/flagging* unconfirmed** (G4) |
| 12 | **Intervalo interjornada — ≥11 consecutive h between shifts** (CLT art. 66) → violation | `crossShiftsInterval {interval=660min=11h, phases[]}` | 🟠 / 🔎 | [API][ABS] | S12. The 11h threshold field exists `[API]`; **what it does mechanically (validate? reshape? flag?) is unconfirmed** (finding #17). Noted as a gap in the spine |
| 13 | **Intrajornada suppression penalty — suppressed portion only, +50%, indemnatory** (post-2017, art. 71 §4) | — (no suppression-detection → penalty-emission primitive) | 🟠 | [ABS][DES] | **Pay-determining**: skipping the break owes a +50% indemnity on the suppressed minutes. Detecting suppression and emitting that premium isn't a standard lever — would route through OT-rates as a workaround |
| 14 | **DSR / RSR — ≥24 consecutive h paid weekly rest, preferably Sunday** (Lei 605/49; CF art. 7º XV; CLT art. 67) | **DSR is first-class** — `isDsrDay`, `paidAsDSR`, `countDsrInHours`, `dsrDayDuration`, `showDsrInReports`; own payroll-event category | ✅ | [FLD] | The spine states plainly "**DSR is live — first-class**". Out of the box, Brazil-confirmed |
| 15 | **DSR forfeiture — an *unjustified* full-week absence/lateness forfeits that week's DSR** (Lei 605/49 art. 6); justified absences preserve it | `SourceRequest.discountDsr` + `discountDsrForMissingMinutes {limit, active}` (**confirmed in the API payload**, §15) | ✅ | [API][FLD] | The attendance-condition forfeiture is modeled; the missing-minutes discount is no longer scan-only |
| 16 | **DSR reflexo of habitual OT (Súmula 172 / OJ-394).** Habitual OT **raises the DSR base**; OJ-394 cascade applies **only from 20/03/2023** | via the OT-rates / premium mechanism — **not a distinct calculation today** | 🟠 | [ABS][DES] | The DSR *hours* emit; the **reflexo is a base-uplift = rate-base composition, mostly downstream money** (G11). The OJ-394 **temporal split** is a flow-finding candidate |
| 17 | **Feriados calendar — national + state + up-to-4 municipal.** Same date can be a workday in one municipality, a paid holiday in another | Holiday calendar `SourceHoliday` (jurisdiction-keyed), `status ∈ {active,replaced,replacement,deleted}`, `holidayReplacementUuid` | ✅ | [FLD] | S11. External reference data feeding Expected-shift; out of the box |
| 18 | **Worked-holiday comp — dobra OR folga compensatória** (employer chooses one, not both; Súmula 146) | **Basic** worked-holiday comp emits (Holiday rate row → *Worked Holidays days/hours* + dobra); the **folga-substitution *choice* model is gap #6** (`holidayCompensationModelUuid`) | 🟠 | [API][ABS] | Shape exists (dobra emits); the *either/or* choice — grant folga **instead of** dobra — isn't modeled, risking double-count. Mitigate: grant the folga at schedule level + suppress the holiday rate |
| 19 | **Jornada 12x36 — 12h on / 36h off; DSR + feriados "considerados compensados" (no dobra, DSR embedded) BUT adicional noturno still applies** (CLT art. 59-A; ADI 5994) | Shift **placement** = Existing (a shift instance spanning 12h via `minStartTime`/`maxEndTime`); normal daily-OT rules apply | 🟠 | [API][DES] | Placement works. The **specific suppression profile** — turn *off* holiday-dobra + DSR pay while keeping the night regime *on* — is a modeling nuance; configure via a dedicated 12x36 policy (mitigation) |
| 20 | **Sobreaviso (home, 1/3, ≤24h) & prontidão (on-site, 2/3, ≤12h)** — availability paid separately from hours actually worked (CLT art. 244 §§2/3) | **On Call** tab (availability vs activation paid separately) + On Call payroll-event category | ✅ | [API][UI] | S10. The 1/3 vs 2/3 fractions are policy-set money values; sobreaviso vs prontidão = two arrangements. Out of the box |
| 21 | **Férias — 30 corridos after a 12-mo *período aquisitivo*; split ≤3 (one ≥14d); absence tiers (art. 130) reduce the day-count** | *Férias* as a `SourceRequest` (paid, all-day absence) = Existing; the **anniversary accrual counter + absence-tier step function = cross-run Future** (`SourceHistoricalState`) | 🟠 | [FLD][ABS] | The request/day-count works; the accrual **ledger** + art. 130 tier reduction is a cross-run concept we don't ship (G12) — adjacent to core T&A. The 1/3 bonus money is downstream |
| 22 | **Ponto tolerance — ≤5min/punch, ≤10min/day; exceed 10min/day → the *whole* excess is OT** (CLT art. 58 §1; Súmula 366) | **Validity vs tolerance** model — all-or-nothing (exceed → entire deviation counts), per-punch / per-day netting; `confines.*` thresholds | ✅ | [API][UI] | S9. Mirrors Súmula 366 **exactly**. The 5/10-min figures are **configured values, not hardcoded** — a core engine primitive Brazil shaped. Out of the box |
| 23 | **Recording obligation — establishments >20 employees must record; ponto por exceção allowed by agreement** (CLT art. 74 §§2/4; MTP 671/2021) | Engine **records every punch**; approved-event locking | ✅ / 🔎 | [FLD][ABS] | S15 — recording every punch satisfies the mandate (a compliance value-add). 🔎 whether an **exception-only** recording mode (*ponto por exceção*) is a supported capture mode |
| 24 | **Part-time (art. 58-A) — ≤30h/wk (no OT), OR ≤26h/wk + up to 6 supp. h/wk @+50%** | OT onset = surplus over the **planned/contractual** shift (S4 naturally handles a contractual baseline); the 6 supp. hours map to OT rate rows | 🟡 / 🔎 | [API][ABS] | Surplus-above-contractual works; the **modality *gating*** (which regime — 30h-no-OT vs 26+6 — and whether OT fires) is worker-regime logic (G5). Configure per part-time policy |
| 25 | **Minors <18 — protective regime** (night work prohibited; tighter caps/breaks) | **Dedicated pay policy** (one arrangement = one policy) + age-flagging workflow | 🟡 / 🔎 | [UI][DES] | S16. Model as a dedicated policy; the specific caps (night-prohibited, 8h/day) are limit-*validation* (G4). Narrow population |
| 26 | **CCT / ACT = a separate pay policy per arrangement** (art. 611-A; STF Tema 1.046) | **One compensation arrangement = one pay policy** (CBA/union modeled as separate policies, not conditionals) | ✅ | [UI][DES] | S16. Matches Brazil's CCT/ACT model exactly (mapping not 1:1). Out of the box conceptually |
| 27 | **PEC 6x1 — phased weekly cap 44h → 40h + two weekly rests.** **Câmara-approved 27/05/2026, PENDING Senado, NOT in force** | Weekly-cap value is policy-set; a date-effective parameter if it passes | — | [LAW] | **Not a current requirement — 44h stands.** Model the weekly cap as a **date-effective parameter**, not a constant. **Do not model as settled.** Highest-volatility item — recheck |
| 28 | **Premium composition — night × OT × Sunday/holiday stack** (e.g. a night OT hour carries both bands, additively) | **Day/night split per rate row** + Hours Distribution night band → the additive night-on-OT case; the general composition *mode* is target | 🟡 | [API][DES] | Night is the **proven orthogonal instance** (additive night+OT works `[API]`); the explicit additive/multiplicative/winner-take-all **mode** is `[DES]` (G6) |

## Summary — rule-by-rule

Brazil is the engine's home jurisdiction, and it shows: **15 of 28 rules are ✅**, with **no ❌ Gap** — the
strongest posture in the portfolio, consistent with the CCT-matrix finding of **no hard gaps**. The remaining
13 split into cleanly-configurable (🟡) and shape-exists-piece-missing (🟠) rules; one (#27 PEC 6x1) is a
not-yet-in-force forward-watch, not a gap.

| # | Rule | Verdict | Why it's still open |
|---|---|---|---|
| 9 | Hora noturna reduzida (52′30″) | 🟠 / 🔎 | `allow_night_reduced_hours` scan-unverified (finding #19) — quantity-affecting |
| 13 | Intrajornada suppression penalty (+50%) | 🟠 | No suppression-detect → penalty-emit primitive; pay-determining |
| 12 | Interjornada 11h rest | 🟠 / 🔎 | `crossShiftsInterval` field exists; validation behaviour unconfirmed (finding #17) |
| 16 | DSR reflexo of habitual OT | 🟠 | Not distinct today; mostly rate-base/money; OJ-394 temporal split |
| 18 | Worked-holiday comp (dobra OR folga) | 🟠 | Dobra emits; the folga-substitution choice model is gap #6 |
| 19 | 12x36 suppression profile | 🟠 | Placement works; the dobra/DSR-off-but-noturno-on combo is a nuance |
| 21 | Férias accrual + absence tiers | 🟠 | Request works; anniversary accrual + art. 130 tiers are cross-run Future |
| 4 | Weekly 44h / daily-2h breach flag | 🟡 | Alert-only; pay stays correct (Brazil OT is daily) |
| 11 | Intrajornada break validation | 🟡 / 🔎 | Breaks configurable; min-break-by-hours validation unconfirmed |
| 24 | Part-time modalities (30h / 26+6) | 🟡 / 🔎 | Surplus-above-contractual works; regime gating is the open piece |
| 25 | Minors <18 regime | 🟡 / 🔎 | Dedicated policy + age-flagging; caps are limit-validation |
| 28 | Premium composition mode | 🟡 | Additive night-on-OT works; general mode is target |
| 27 | PEC 6x1 (44h→40h) | — | Pending Senado, not in force — forward-watch, not a gap |

## Gap analysis — mitigation & severity

> **For every rule we don't fully support (🟠/🟡/🔎):** the **mitigation** we can offer today, and — for gaps —
> **how bad it is**, scored as **Prevalence × Build-effort**. Fully-supported (✅) rules are omitted (they need
> no mitigation) — that's **15 of the 28 rows** this pass; #27 (PEC 6x1) is omitted as not-in-force.
>
> **Severity scale:** 🔴 Critical (common + no real mitigation + blocks correct output) · 🟠 High (common, no
> full mitigation, but scoped, or corrupts computed pay) · 🟡 Medium (moderately common, or a usable mitigation,
> or moderate build; typically legal obligations that don't corrupt pay) · 🟢 Low (narrow population, strong
> mitigation, or trivial build).
>
> **Two axes, and their honesty caveats:**
> - **Prevalence** = share of the *general Brazilian market* a rule bites. **⚠ Customer-relative** — shifts with
>   the workforce: **night-shift populations → #9 reduced night hour**; **healthcare/security 12x36 → #19**;
>   **retail/hospitality holiday work → #18**.
> - **Build-effort** = my estimate, **grounded in `brazil.md`'s Status column** (Existing ≈ config/small **S**;
>   `(draft)`/finding ≈ **M**; cross-run/Future ≈ **L**). **⚠ Calendar time needs engineering validation.**

| Rule | Mitigation today | Prevalence (BR market) | Build to close (est.) | Severity |
|---|---|---|---|---|
| **#9 Hora noturna reduzida (52′30″)** | **Weak** — if `allow_night_reduced_hours` exists, it's a config value (✅); if absent, the credited night-hours count is wrong, no clean workaround | **Med** — all urban night workers (customer-relative → High for night-heavy) | **S** (verify) — **M** if it must be built | 🟠 **High** (⚠ 🔎 field scan-unverified — verify first; likely already ships given the CLT-derived engine) |
| **#13 Intrajornada suppression penalty (+50%)** | **Weak** — no auto suppression-detection; a manual OT-rate/exception workaround; **corrupts pay if missed** | **Med** — wherever breaks get skipped | **M** — detect suppressed break → emit indemnatory +50% on the suppressed portion | 🟠 **High** |
| **#18 Worked-holiday comp (dobra OR folga)** | **Partial** — dobra emits today; grant the folga at schedule level + suppress the holiday rate (avoids double-count) | **Med-High** — holiday-working sectors | **M** — the full comp-model (`holidayCompensationModelUuid`, gap #6) | 🟡 **Medium** |
| **#19 12x36 suppression profile** | **Strong** — configure a dedicated 12x36 policy with holiday-dobra + DSR pay off, night on | **Med** — healthcare / security | **M** — a clean per-shift suppression toggle | 🟡 **Medium** |
| **#16 DSR reflexo of habitual OT** | **Partial** — DSR hours emit; the base-uplift routes through OT-rates; **mostly downstream money** | **High** as an obligation, but rate-base (largely out of scope) | **M** — reflexo cascade + OJ-394 temporal split | 🟡 **Medium** |
| **#21 Férias accrual + absence tiers** | **Partial** — férias handled as requests; the anniversary accrual + art. 130 tier counter need a leave module / manual tracking | **High**, but adjacent to core T&A (leave mgmt) | **L** — cross-run anniversary counter + tiered step function | 🟡 **Medium** |
| **#11 Intrajornada break validation** | **Config** — configure the break rules on the schedule; min-break-by-hours *flagging* is the open piece | **High** (all workers) | **S-M** | 🟡 **Medium** |
| **#24 Part-time modalities** | **Partial** — surplus-above-contractual works via a part-time policy; modality gating (30h-no-OT vs 26+6) is manual | **Med** — part-time populations | **M** — worker-regime gating (G5) | 🟡 **Medium** |
| **#4 Weekly 44h / daily-2h breach flag** | **Partial** — notification/alert thresholds as manual monitoring; **pay stays correct** (Brazil OT is daily) | **High** as a legal obligation (non-corrupting) | **S** — single-period threshold flag | 🟢 **Low** |
| **#12 Interjornada 11h rest** | **Partial** — the 11h field exists (`crossShiftsInterval`); validation behaviour unconfirmed | **Med** | **S-M** | 🟢 **Low** (⚠ 🔎 mechanic unconfirmed) |
| **#25 Minors <18 regime** | **Strong** — dedicated pay policy + age-flagging; caps are limit-validation | **Low** — minors only | **S** — dedicated policy + flag | 🟢 **Low** |
| **#28 Premium composition mode** | **Partial** — the additive night-on-OT case works; the general mode is `[DES]` | **Med** | **M** | 🟢 **Low** |

### Severity roll-up
- **🔴 Critical (0):** none — Brazil has no annual-pay-corrupting regime; its daily-OT model *is* the engine's model.
- **🟠 High (2):** hora noturna reduzida (#9, 🔎 — quantity-affecting, verify the field), intrajornada suppression penalty (#13, pay-corrupting).
- **🟡 Medium (6):** worked-holiday comp/folga (#18), 12x36 suppression (#19), DSR reflexo (#16), férias accrual (#21), break validation (#11), part-time modalities (#24).
- **🟢 Low (4):** weekly/daily breach flag (#4), interjornada 11h (#12, 🔎), minors regime (#25), premium composition mode (#28).

## The big gaps (the genuine Brazil deltas — where even the *statute* outruns the model)
1. **Hora noturna reduzida** (#9) — the 52′30″ duration-compression field is **scan-unverified** (finding #19); it changes the credited night-hours *quantity*.
2. **Intrajornada suppression penalty** (#13) — no suppression-detect → indemnatory-+50% primitive.
3. **Full worked-holiday comp model** (#18) — the dobra-**or**-folga *choice* (gap #6).
4. **DSR reflexo of habitual OT + OJ-394 temporal split** (#16) — mostly rate-base/money.
5. **12x36 suppression profile** (#19) — dobra/DSR off, noturno on, cleanly.
6. **Férias anniversary accrual + art. 130 absence tiers** (#21) — the shared cross-run leave-counter gap.

## Where Brazil scores well (worth saying)
- **The engine's core model *is* Brazil's model.** Daily OT onset (#1), the rates table + Sunday/holiday dobra
  (#2–3), and the validity-vs-tolerance rule mirroring Súmula 366 (#22) are all Existing `[API][UI]` — Brazil is
  literally why the engine accumulates OT per day.
- **DSR is first-class** (#14–15): `isDsrDay`/`paidAsDSR`/`discountDsr` + a dedicated payroll-event category — a
  Brazil-specific concept most jurisdictions' engines don't have `[FLD]`.
- **Adicional noturno** (#8, #10): window + %, extend-to-full-range, opt-in day/night split — one of the
  most-implemented areas `[API][UI]`.
- **Banco de horas** (#5–7): the three CLT windows map cleanly onto the 1–18-month cycle, with per-row BH↔EH
  split and cyclical/full reset `[API][UI]`.
- **On-call** (#20), **holiday calendar** (#17), **CCT-as-pay-policy** (#26) — all present.

## 🔎 Verify before telling the customer
- **`allow_night_reduced_hours`** (#9) — confirm the field exists and models the 52′30″ compression (finding #19,
  scan-unverified). This is the single most important Brazil-specific verification — it's quantity-affecting.
- **`crossShiftsInterval` behaviour** (#12) — the field is `[API]`-real; does it *validate* the 11h rest, or only
  classify/reshape the next shift? (finding #17)
- **`nightShiftExtendToFullRange` semantics** (#10) — "starts in window → all night" vs Súmula 60 II's "extends
  past 05:00 → premium continues": confirm the exact match.
- **Worked-holiday comp model** (#18) — does anything beyond basic dobra emission ship (the folga-choice, gap #6)?
- **Ponto por exceção** (#23) — is exception-only recording a supported capture mode?
- **Banco payout rate at termination** (#7) — does it revalue at the termination-date rate (art. 59 §3)?
- **PEC 6x1** (#27) — recheck Senado status; **44h stands** as of June 2026. High-volatility.
- **Live-DB pass** — no verdict here is `[DB]`-confirmed (IAM `403`); rerun once access is granted to upgrade
  `[API]/[UI]` → `[DB]` and pull the configured Brazil defaults (night %, tolerance minutes, banco cycle).

## Bottom line for the customer
Brazil is our **strongest-fit jurisdiction** — the engine was built around the CLT, so its statutory T&A layer
(daily OT + rates, the hours bank, adicional noturno, DSR as a first-class concept, the ponto tolerance model,
on-call, holidays, CCT-as-pay-policy) maps to **shipping behavior today**, with **no hard ❌ gaps**. The residual
work is a small set of **Brazil-specific mechanics** — the reduced night hour (verify the field), the intrajornada
suppression penalty, the full worked-holiday comp choice, and the 12x36 suppression profile — plus the shared
cross-run **férias accrual** counter and a few limit-validation items. Honest status: **the strongest fit in the
portfolio; near-full support, no Critical gaps — the standard Brazilian case is servable today, with a handful
of statute-specific mechanics to confirm or close.**
