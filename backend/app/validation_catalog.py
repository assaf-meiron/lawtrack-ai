"""Payroll Validation — the catalog: which rules exist, and which population each one governs.

LawTrack's review surface answers *"this document arrived, what does it change?"*. This answers the
question the customer asks next: **"fine — but are the punches we already collected in breach?"**

Three kinds of data live here, and the split between them is the whole point:

* **RULES** — one operative obligation per entry, each with the article or CCT clause that creates
  it, the verbatim clause text, the numeric limit, and what a breach costs. Every rule carries the
  17-taxonomy `capability` code, so a violation found in the punches lands on the same pay-policy
  field the review surface would have configured. A rule is a *specification*, never a detector: the
  detector lives in `validation.py` and knows nothing about who is expected to breach it.
* **AGREEMENTS** — one collective agreement, named in full and by registration number, together with
  the shift pattern its population works and the rules it is subject to. This is the legally
  meaningful unit: a rule applies because *an agreement* says so, not because a department does.
* **DEPARTMENTS** — what the customer actually picks. A department is *not* an agreement, and this is
  the fact the model exists to carry: Global operations is drivers under the transport CCT, warehouse
  staff under the commerce CCT, and planners under the administrative CCT, all in one box on the org
  chart. So a department is a tuple of **segments** — one slice of its headcount per agreement — and
  a validation run is the union of those slices, with every rule scored against the population
  actually subject to it rather than against the department total.

The departments are grouped into four organizational arms, which is how the chart reads top-down:
Finance & governance, Legal & risk, People & strategy, Commercial & operations.

Note the vocabulary difference the UI surfaces: a Brazilian *CCT* is a **Convenção** Coletiva de
Trabalho filed with the MTE, a Mexican *CCT* is a **Contrato** Colectivo de Trabajo registered with
the CFCRL. Same acronym, different instrument. A department sits in one jurisdiction — the exposure
estimate is a single currency, and a run that mixed BRL and MXN into one number would be lying.

`incidence` is demo scaffolding and is honest about it: it tells the punch generator in
`validation.py` which share of a *segment* to plant a given pattern in. The engine never reads it —
it re-derives every violation from the punch stream alone, so the numbers on the dashboard are
computed, not declared.

That also means **incidence is a planting rate, not an expected finding rate, and the two do not
match.** Three extra hours on a Tuesday breaches the daily cap, the weekly ceiling and — for a driver
— the four-hour driving limit, so one planted pattern legitimately surfaces under several rules.
Where a *configuration* is the breach the incidence is 0.0 and the finding still appears for everyone
it touches: the logistics night premium is set to the statutory 20% where the CCT promised 30%, and
that shortfall lands on every night hour the fleet works whether or not anything was planted.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date

# The period under validation: the most recently closed payroll month. An audit of the June close
# landing in late July is the normal rhythm — payroll shuts, then compliance reads it.
PERIOD_START = date(2026, 6, 1)
PERIOD_END = date(2026, 6, 30)
PERIOD_LABEL = "June 2026"

# Night windows differ by jurisdiction and both are half-open [start, end) in minutes from midnight,
# with the end past 1440 because the window crosses into the next day.
BR_NIGHT = (22 * 60, 29 * 60)   # 22:00 → 05:00  (CLT Art. 73 §2º)
MX_NIGHT = (20 * 60, 30 * 60)   # 20:00 → 06:00  (LFT Art. 60)

SEVERITIES = ("critical", "high", "medium")


@dataclass(frozen=True)
class Rule:
    """One operative obligation, and the clause that creates it."""

    code: str
    capability: str      # 17-taxonomy capability code — the pay-policy field a breach lands on
    title: str
    requirement: str     # the obligation in one sentence, in English
    limit_label: str     # the number itself, as a reviewer reads it
    severity: str        # critical | high | medium
    check: str           # which detector in validation.py evaluates it
    source: str          # article and/or CCT clause
    source_kind: str     # statute | cct
    quote: str           # the operative text, verbatim, in the language of the instrument
    consequence: str     # what a breach actually costs — the reason the row matters
    unit_cost: float     # indicative exposure per occurrence, in the agreement's currency
    params: dict = field(default_factory=dict)


# --- Brazil — CLT + the clauses a CCT tightens -------------------------------

_BR_RULES: list[Rule] = [
    Rule(
        code="br-inter-11h",
        capability="Inter",
        title="Interjornada — 11 consecutive hours between shifts",
        requirement="At least 11 uninterrupted hours must separate the end of one working day from the start of the next.",
        limit_label="≥ 11h between shifts",
        severity="critical",
        check="interjornada",
        source="CLT Art. 66",
        source_kind="statute",
        quote="Entre 2 (duas) jornadas de trabalho haverá um período mínimo de 11 (onze) horas consecutivas para descanso.",
        consequence="The suppressed rest is paid as overtime at the applicable premium (TST OJ 355), and a repeating "
                    "pattern is exactly what a fiscalização autuação and a collective claim are built on.",
        unit_cost=118.0,
        params={"min_hours": 11},
    ),
    Rule(
        code="br-intra-60m",
        capability="Intra",
        title="Intrajornada — 1 hour meal break above 6 hours worked",
        requirement="A shift longer than 6 hours must include a rest/meal break of at least 1 hour.",
        limit_label="≥ 60 min break over 6h worked",
        severity="high",
        check="intrajornada",
        source="CLT Art. 71 §4º · Cláusula 15ª da CCT",
        source_kind="statute",
        quote="Em qualquer trabalho contínuo, cuja duração exceda de 6 (seis) horas, é obrigatória a concessão de um "
              "intervalo para repouso ou alimentação, o qual será, no mínimo, de 1 (uma) hora. […] A não concessão ou a "
              "concessão parcial do intervalo intrajornada mínimo implica o pagamento, de natureza indenizatória, apenas "
              "do período suprimido, com acréscimo de 50% (cinquenta por cento) sobre o valor da remuneração da hora "
              "normal de trabalho.",
        consequence="Only the suppressed portion is owed post-2017, but it is owed at +50% on every day it happened — "
                    "and a short break recorded on the punch clock is the easiest breach in the file to prove.",
        unit_cost=34.0,
        params={"min_minutes": 60, "over_worked_minutes": 360},
    ),
    Rule(
        code="br-ot-daily-2h",
        capability="OT/d",
        title="Daily overtime capped at 2 hours",
        requirement="No more than 2 overtime hours may be worked on a single day.",
        limit_label="≤ 2h overtime per day",
        severity="high",
        check="daily_overtime_cap",
        source="CLT Art. 59",
        source_kind="statute",
        quote="A duração diária do trabalho poderá ser acrescida de horas suplementares, em número não excedente de 2 "
              "(duas), por acordo individual, convenção coletiva ou acordo coletivo de trabalho.",
        consequence="Hours past the cap are still payable at the premium, and the excess itself is an autuável "
                    "infraction independent of whether it was paid.",
        unit_cost=62.0,
        params={"max_overtime_minutes": 120},
    ),
    Rule(
        code="br-weekly-44h",
        capability="Jorn",
        title="44-hour working week",
        requirement="Contracted working time may not exceed 44 hours in a Monday–Sunday week.",
        limit_label="≤ 44h per week",
        severity="high",
        check="weekly_hours",
        source="CF Art. 7º XIII · CLT Art. 58 · Cláusula 12ª da CCT",
        source_kind="statute",
        quote="duração do trabalho normal não superior a oito horas diárias e quarenta e quatro semanais, facultada a "
              "compensação de horários e a redução da jornada, mediante acordo ou convenção coletiva de trabalho.",
        consequence="Everything above 44h is overtime whether or not it was booked as such; the week is the unit the "
                    "auditor recomputes, so a daily view that looks clean can still fail here.",
        unit_cost=88.0,
        params={"max_hours": 44},
    ),
    Rule(
        code="br-dsr-24h",
        capability="Sun-rot",
        title="Weekly paid rest — 24 consecutive hours",
        requirement="Every 7-day window must contain 24 uninterrupted hours of rest.",
        limit_label="≥ 24h rest every 7 days",
        severity="critical",
        check="weekly_rest",
        source="CLT Art. 67 · Lei 605/1949 Art. 1º",
        source_kind="statute",
        quote="Será assegurado a todo empregado um descanso semanal de 24 (vinte e quatro) horas consecutivas, o qual, "
              "salvo motivo de conveniência pública ou necessidade imperiosa do serviço, deverá coincidir com o domingo, "
              "no todo ou em parte.",
        consequence="A worked rest day is paid in dobro without extinguishing the right to the rest (Súmula 146 TST). "
                    "Seven straight worked days is the single finding most likely to escalate.",
        unit_cost=196.0,
        params={"min_rest_hours": 24, "window_days": 7},
    ),
    Rule(
        code="br-sunday-rotation",
        capability="Sun-rot",
        title="Sunday rotation — one Sunday off every 3 weeks",
        requirement="Sunday work requires a rotation scale that leaves at least one Sunday off in every three.",
        limit_label="≤ 3 consecutive Sundays worked",
        severity="high",
        check="sunday_rotation",
        source="Cláusula 21ª da CCT · Lei 10.101/2000 Art. 6º-A",
        source_kind="cct",
        quote="O trabalho em domingos e feriados será precedido de escala de revezamento, mensalmente organizada e "
              "constante de quadro sujeito à fiscalização, garantindo-se ao empregado, no mínimo, 1 (um) domingo de "
              "folga a cada 3 (três) semanas.",
        consequence="This is the clause the union checks first in retail. Breaching it voids the Sunday-opening "
                    "authorisation the whole store schedule rests on.",
        unit_cost=140.0,
        params={"max_consecutive_sundays": 3},
    ),
    Rule(
        code="br-tolerance-10m",
        capability="Tol",
        title="Punch tolerance — 5 min per punch, 10 min per day",
        requirement="Punch variance beyond 5 minutes per punch or 10 minutes per day is working time and must be paid.",
        limit_label="≤ 5 min/punch · 10 min/day",
        severity="medium",
        check="tolerance",
        source="CLT Art. 58 §1º · Súmula 366 TST",
        source_kind="statute",
        quote="Não serão descontadas nem computadas como jornada extraordinária as variações de horário no registro de "
              "ponto não excedentes de cinco minutos, observado o limite máximo de dez minutos diários.",
        consequence="Past the tolerance the *whole* variance becomes payable time, not just the excess — small daily "
                    "overruns absorbed by the clock add up to a large aggregate claim.",
        unit_cost=18.0,
        params={"per_punch_minutes": 5, "per_day_minutes": 10},
    ),
    Rule(
        code="br-night-premium",
        capability="Not",
        title="Night premium — CCT sets 30% above the statutory 20%",
        requirement="Hours between 22:00 and 05:00 carry the night premium the CCT commits to, not the statutory floor.",
        limit_label="30% on 22:00–05:00 (CCT)",
        severity="medium",
        check="night_premium",
        source="CLT Art. 73 · Cláusula 18ª da CCT",
        source_kind="cct",
        quote="Salvo nos casos de revezamento semanal ou quinzenal, o trabalho noturno terá remuneração superior a do "
              "diurno e, para esse efeito, sua remuneração terá um acréscimo de 20% (vinte por cento), pelo menos, sobre "
              "a hora diurna. […] Considera-se noturno o trabalho executado entre as 22 (vinte e duas) horas de um dia e "
              "as 5 (cinco) horas do dia seguinte. — A CCT eleva o adicional noturno para 30% (trinta por cento).",
        consequence="Paying the statutory 20% where the CCT promised 30% is a shortfall on every night hour worked, "
                    "and the CCT is the enforceable floor — the statute is not a defence.",
        unit_cost=9.0,
        params={"window": BR_NIGHT, "required_pct": 30},
    ),
    Rule(
        code="br-holiday-double",
        capability="Sun/Hol",
        title="Holiday work — double pay or a compensating day off",
        requirement="A holiday worked must be paid in dobro unless a compensating rest day is granted in the same week.",
        limit_label="2× pay or a comp day",
        severity="high",
        check="holiday_work",
        source="Lei 605/1949 Art. 9º · CLT Art. 70",
        source_kind="statute",
        quote="Nas atividades em que não for possível, em virtude das exigências técnicas das empresas, a suspensão do "
              "trabalho nos dias feriados civis e religiosos, a remuneração será paga em dobro, salvo se o empregador "
              "determinar outro dia de folga.",
        consequence="Neither leg of the alternative was satisfied: no comp day in the week, and the day was paid at the "
                    "ordinary rate.",
        unit_cost=210.0,
        params={},
    ),
    Rule(
        code="br-hour-bank",
        capability="BH",
        title="Banco de horas — 40h cap, settled inside the CCT window",
        requirement="The hour-bank balance stays under the negotiated cap and is compensated inside the agreed window.",
        limit_label="≤ 40h balance · 6-month window",
        severity="high",
        check="hour_bank",
        source="CLT Art. 59 §2º · Cláusula 14ª da CCT",
        source_kind="cct",
        quote="Poderá ser dispensado o acréscimo de salário se, por força de acordo ou convenção coletiva de trabalho, o "
              "excesso de horas em um dia for compensado pela correspondente diminuição em outro dia, de maneira que não "
              "exceda, no período máximo de um ano, à soma das jornadas semanais de trabalho previstas, nem seja "
              "ultrapassado o limite máximo de dez horas diárias.",
        consequence="A balance over the cap or past the window stops being compensable and converts to cash at the "
                    "overtime premium — the whole point of the bank is lost retroactively.",
        unit_cost=132.0,
        params={"cap_hours": 40, "window_months": 6},
    ),
    Rule(
        code="br-12x36-rest",
        capability="12x36",
        title="12×36 scale — 36 uninterrupted hours after a 12-hour shift",
        requirement="A 12-hour shift must be followed by 36 uninterrupted hours of rest.",
        limit_label="12h worked → ≥ 36h rest",
        severity="critical",
        check="rest_12x36",
        source="CLT Art. 59-A",
        source_kind="statute",
        quote="Em exceção ao disposto no art. 59 desta Consolidação, é facultado às partes, mediante acordo individual "
              "escrito, convenção coletiva ou acordo coletivo de trabalho, estabelecer horário de trabalho de 12 (doze) "
              "horas seguidas por 36 (trinta e seis) horas ininterruptas de descanso, observados ou indenizados os "
              "intervalos para repouso e alimentação.",
        consequence="Break the 36 hours and the scale itself is void — the whole roster reverts to the 8h/44h regime and "
                    "every 12-hour shift in the period becomes 4 hours of overtime.",
        unit_cost=240.0,
        params={"shift_hours": 12, "min_rest_hours": 36},
    ),
    Rule(
        code="br-minor-night",
        capability="Not",
        title="No night work for employees under 18",
        requirement="An employee under 18 may not work any minute between 22:00 and 05:00.",
        limit_label="0 night minutes under 18",
        severity="critical",
        check="minor_night",
        source="CLT Art. 404 · CF Art. 7º XXXIII",
        source_kind="statute",
        quote="Ao menor de 18 (dezoito) anos é vedado o trabalho noturno, considerado este o que for executado entre as "
              "22 (vinte e duas) e as 5 (cinco) horas.",
        consequence="A prohibition, not a priced premium: no payment cures it. It draws an MPT inquiry and personal "
                    "liability for the manager who set the roster.",
        unit_cost=620.0,
        params={"window": BR_NIGHT},
    ),
    Rule(
        code="br-driver-break",
        capability="Intra",
        title="Driver rest — 30 min every 4 hours of continuous driving",
        requirement="Continuous driving may not exceed 4 hours without a rest break of at least 30 minutes.",
        limit_label="≥ 30 min per 4h driving",
        severity="high",
        check="driving_break",
        source="CLT Art. 235-D (Lei 13.103/2015)",
        source_kind="statute",
        quote="Nas viagens de longa distância, assim consideradas aquelas em que o motorista profissional permanece "
              "fora da base da empresa por mais de 24 (vinte e quatro) horas, o motorista terá direito a intervalo "
              "mínimo de 30 (trinta) minutos para descanso a cada 4 (quatro) horas de tempo ininterrupto de direção, "
              "podendo ser fracionado.",
        consequence="Enforced roadside by the ANTT and the PRF, so a breach surfaces as a vehicle-level fine on the day "
                    "it happens — separate from the labour exposure it also creates.",
        unit_cost=96.0,
        params={"max_stretch_minutes": 240, "min_break_minutes": 30},
    ),
    Rule(
        code="br-banking-6h",
        capability="Jorn",
        title="Banking day — 6 continuous hours, 30 per week",
        requirement="Bank employees outside a trust position work 6 hours a day; anything above is overtime.",
        limit_label="≤ 6h/day · 30h/week",
        severity="high",
        check="banking_day",
        source="CLT Art. 224",
        source_kind="statute",
        quote="A duração normal do trabalho dos empregados em bancos, casas bancárias e Caixa Econômica Federal será de "
              "6 (seis) horas contínuas nos dias úteis, com exceção dos sábados, perfazendo um total de 30 (trinta) "
              "horas de trabalho por semana.",
        consequence="The 7th and 8th hours are overtime unless the employee genuinely holds a §2º trust position with "
                    "the 1/3 gratification — a distinction the roster has to be able to prove.",
        unit_cost=74.0,
        params={"max_hours": 6},
    ),
]


# --- Mexico — Ley Federal del Trabajo ---------------------------------------

_MX_RULES: list[Rule] = [
    Rule(
        code="mx-weekly-48h",
        capability="Jorn",
        title="48-hour working week",
        requirement="The ordinary day-shift week may not exceed 48 hours.",
        limit_label="≤ 48h per week",
        severity="high",
        check="weekly_hours",
        source="LFT Art. 61 · Cláusula 9ª del CCT",
        source_kind="statute",
        quote="La duración máxima de la jornada será: ocho horas la diurna, siete la nocturna y siete horas y media la "
              "mixta.",
        consequence="Time above 48h is extraordinary time and is priced as such; the week is also the unit the STPS "
                    "inspection recomputes.",
        unit_cost=240.0,
        params={"max_hours": 48},
    ),
    Rule(
        code="mx-ot-daily-3h",
        capability="OT/d",
        title="Overtime capped at 3 hours a day",
        requirement="Extraordinary time may not exceed 3 hours in a day.",
        limit_label="≤ 3h overtime per day",
        severity="high",
        check="daily_overtime_cap",
        source="LFT Art. 66",
        source_kind="statute",
        quote="Podrá también prolongarse la jornada de trabajo por circunstancias extraordinarias, sin exceder nunca de "
              "tres horas diarias ni de tres veces en una semana.",
        consequence="A hard cap, not a price: the article says *nunca*, so the hours are unlawful even when they are "
                    "paid at the double rate.",
        unit_cost=210.0,
        params={"max_overtime_minutes": 180},
    ),
    Rule(
        code="mx-ot-weekly-9h",
        capability="OT wk/mo",
        title="Overtime past 9 hours a week is paid at 200%",
        requirement="Extraordinary time beyond 9 hours in a week must be paid at 200% above the ordinary rate.",
        limit_label="≤ 9h/week at 100%",
        severity="high",
        check="weekly_overtime_cap",
        source="LFT Art. 66 y 68",
        source_kind="statute",
        quote="La prolongación del tiempo extraordinario que exceda de nueve horas a la semana, obliga al patrón a pagar "
              "al trabajador el tiempo excedente con un doscientos por ciento más del salario que corresponda a las "
              "horas de la jornada, sin perjuicio de las sanciones establecidas en esta Ley.",
        consequence="The tenth hour costs triple, not double. Paying the whole week at 100% understates the liability "
                    "on exactly the hours most likely to be audited.",
        unit_cost=340.0,
        params={"max_overtime_hours": 9},
    ),
    Rule(
        code="mx-rest-day-7",
        capability="Sun-rot",
        title="One full rest day per six worked",
        requirement="Every six days worked entitles the employee to at least one full paid rest day.",
        limit_label="≥ 1 rest day per 6 worked",
        severity="critical",
        check="weekly_rest",
        source="LFT Art. 69",
        source_kind="statute",
        quote="Por cada seis días de trabajo disfrutará el trabajador de un día de descanso, por lo menos, con goce de "
              "salario íntegro.",
        consequence="A missed rest day is payable at triple (the day plus double for working it) and is the finding an "
                    "STPS inspection escalates fastest.",
        unit_cost=420.0,
        params={"min_rest_hours": 24, "window_days": 7},
    ),
    Rule(
        code="mx-meal-30m",
        capability="Intra",
        title="Half-hour break in a continuous shift",
        requirement="A continuous shift must include a break of at least 30 minutes.",
        limit_label="≥ 30 min break",
        severity="high",
        check="intrajornada",
        source="LFT Art. 63",
        source_kind="statute",
        quote="Durante la jornada continua de trabajo se concederá al trabajador un descanso de media hora, por lo menos.",
        consequence="Where the break is not granted the half hour stays inside the shift, so the day runs long and the "
                    "overtime caps above start failing too.",
        unit_cost=130.0,
        params={"min_minutes": 30, "over_worked_minutes": 300},
    ),
    Rule(
        code="mx-night-7h",
        capability="Jorn",
        title="Night shift capped at 7 hours",
        requirement="A shift falling wholly inside 20:00–06:00 may not exceed 7 hours.",
        limit_label="≤ 7h on a night shift",
        severity="high",
        check="night_shift_cap",
        source="LFT Art. 60 y 61",
        source_kind="statute",
        quote="Jornada nocturna es la comprendida entre las veinte y las seis horas. […] La duración máxima de la jornada "
              "será: ocho horas la diurna, siete la nocturna y siete horas y media la mixta.",
        consequence="Rostering a night team on the 8-hour day-shift pattern breaches the cap on every single shift — a "
                    "systematic finding, not an incident.",
        unit_cost=260.0,
        params={"max_hours": 7, "window": MX_NIGHT},
    ),
    Rule(
        code="mx-mixed-7h30",
        capability="Jorn",
        title="Mixed shift capped at 7½ hours",
        requirement="A shift straddling the day and night windows may not exceed 7 hours 30 minutes.",
        limit_label="≤ 7h30 on a mixed shift",
        severity="medium",
        check="mixed_shift_cap",
        source="LFT Art. 60 y 61",
        source_kind="statute",
        quote="Jornada mixta es la que comprende períodos de tiempo de las jornadas diurna y nocturna, siempre que el "
              "período nocturno sea menor de tres horas y media. […] siete horas y media la mixta.",
        consequence="The mixed shift is the one most often paid as a day shift; the missing half hour is overtime on "
                    "every rotation the pattern touches.",
        unit_cost=190.0,
        params={"max_hours": 7.5, "window": MX_NIGHT},
    ),
    Rule(
        code="mx-sunday-prima",
        capability="Sun/Hol",
        title="Prima dominical — 25% for Sunday work",
        requirement="An employee whose rest day is not Sunday earns at least a 25% premium for Sunday work.",
        limit_label="+25% on Sundays worked",
        severity="medium",
        check="sunday_premium",
        source="LFT Art. 71",
        source_kind="statute",
        quote="En los reglamentos de esta Ley se procurará que el día de descanso semanal sea el domingo. Los "
              "trabajadores que presten servicio en día domingo tendrán derecho a una prima adicional de un veinticinco "
              "por ciento, por lo menos, sobre el salario de los días ordinarios de trabajo.",
        consequence="The prima is owed on top of ordinary pay and independently of any overtime — it is the premium most "
                    "commonly missing from a configuration that was ported from another country.",
        unit_cost=88.0,
        params={"required_pct": 25},
    ),
    Rule(
        code="mx-holiday-double",
        capability="Sun/Hol",
        title="Statutory holiday worked — double pay on top",
        requirement="A statutory holiday worked is paid at double, on top of the holiday pay itself.",
        limit_label="2× on top of holiday pay",
        severity="high",
        check="holiday_work",
        source="LFT Art. 73 y 75",
        source_kind="statute",
        quote="Los trabajadores no están obligados a prestar servicios en sus días de descanso. Si se quebranta esta "
              "disposición, el patrón pagará al trabajador, independientemente del salario que le corresponda por el "
              "descanso, un salario doble por el servicio prestado. […] tendrán derecho a que se les pague, "
              "independientemente del salario que les corresponda por el descanso obligatorio, un salario doble por el "
              "servicio prestado.",
        consequence="Triple pay in total for the day. Getting it wrong on a mandated holiday is a visible, dated event "
                    "the whole plant can point at.",
        unit_cost=380.0,
        params={},
    ),
]

RULES: dict[str, Rule] = {r.code: r for r in (*_BR_RULES, *_MX_RULES)}


# --- the collective agreements ----------------------------------------------


@dataclass(frozen=True)
class Profile:
    """The shift pattern an agreement's population is rostered on."""

    kind: str                 # office | it | commerce | logistics | scale_12x36 | banking | lab | mx_office | mx_retail | mx_plant
    scheduled_minutes: int    # contracted worked minutes on a working day
    break_minutes: int        # scheduled unpaid break
    start_minutes: int        # nominal first punch-in
    start_jitter: int         # per-employee spread around the nominal start
    work_days: tuple[int, ...]  # weekdays scheduled, 0 = Monday
    sunday_share: float = 0.0   # share of the population carrying a Sunday scale


@dataclass(frozen=True)
class Agreement:
    """One collective agreement: who it covers, how they work, and which rules bind them.

    This — not the department — is what makes a rule apply. Two departments whose staff sit under the
    same agreement are subject to the same clauses, and one department whose staff sit under three are
    subject to the union of all three.
    """

    key: str
    short: str            # the name the UI puts on a chip — "Comerciários (SECSP)"
    country: str          # BR | MX
    currency: str         # BRL | MXN
    category: str         # the employee category *as the agreement defines it*
    cct_official: str     # the agreement's official name, in its own language
    cct_registration: str  # MTE Sistema Mediador (BR) / CFCRL (MX) registry number
    cct_validity: str
    union_official: str   # the workers' side, named in full
    employer_body: str    # the employers' side — a CCT has two signatories, both are named
    profile: Profile
    rules: tuple[str, ...]
    config: dict[str, float] = field(default_factory=dict)  # configured values a check compares against
    policy_key: str | None = None      # the reviewed pay-policy layer this population runs on
    holidays: tuple[tuple[str, str], ...] = ()   # (ISO date, name) falling inside the period
    # Rules deliberately *not* applied to this population, and the reason. A rule that does not apply
    # and a rule nobody checked look identical on a dashboard unless the exclusion is stated.
    exclusions: tuple[tuple[str, str], ...] = ()


# Holidays inside June 2026. Brazil: Corpus Christi (4 June 2026) is a municipal holiday across the
# São Paulo metro and observed as one by office, store, warehouse and hospital rosters alike. Mexico
# has no Art. 74 holiday in June — so `mx-holiday-double` is evaluated and reported clear *because
# nothing fell in the period*, which is a materially different statement from "we didn't check".
_BR_HOLIDAYS = (("2026-06-04", "Corpus Christi — feriado municipal (SP)"),)

# The rule sets the two office agreements share, named once. An office population is subject to the
# working-time floor and the clock, and to nothing that only a shift roster can breach.
_BR_OFFICE_RULES = ("br-inter-11h", "br-intra-60m", "br-ot-daily-2h", "br-weekly-44h", "br-dsr-24h",
                    "br-tolerance-10m", "br-holiday-double", "br-hour-bank")

# Why the night and Sunday clauses are kept *out* of an office agreement rather than reported as
# passes: a rule that cannot fire is not a rule that was satisfied.
_BR_OFFICE_EXCLUSIONS = (
    ("Night premium (CLT Art. 73 · Cláusula 18ª)",
     "No office roster in the period reaches 22:00 — the buildings close at 20:00 and the badge log "
     "confirms it. There is no night work to price, so the clause is kept out of the score rather "
     "than reported as a pass."),
    ("Sunday rotation (Cláusula 21ª da CCT)",
     "The rotation clause governs establishments authorised to open on Sundays. An administrative "
     "population is rostered Monday–Friday, so no rotation scale exists for it to breach."),
)

AGREEMENTS: dict[str, Agreement] = {a.key: a for a in (
    # -- Brazil ---------------------------------------------------------------
    Agreement(
        key="br-admin",
        short="Administrativos (SINDEEPRES)",
        country="BR",
        currency="BRL",
        category="Empregados administrativos — sede e escritórios regionais",
        cct_official="Convenção Coletiva de Trabalho 2026/2027 — Empregados em Empresas de Serviços "
                     "Administrativos, Assessoria e Consultoria",
        cct_registration="MTE / Sistema Mediador nº SP003118/2026",
        cct_validity="1 Jan 2026 – 31 Dec 2026 (data-base 1º de janeiro)",
        union_official="Sindicato dos Empregados em Empresas de Prestação de Serviços a Terceiros, "
                       "Colocação e Administração de Mão de Obra do Estado de São Paulo (SINDEEPRES)",
        employer_body="Federação Nacional das Empresas de Serviços e Recursos Humanos (FENASERHTT)",
        profile=Profile(kind="office", scheduled_minutes=480, break_minutes=60, start_minutes=9 * 60,
                        start_jitter=60, work_days=(0, 1, 2, 3, 4)),
        rules=_BR_OFFICE_RULES,
        config={"tolerance_minutes": 10.0},
        policy_key=None,
        holidays=_BR_HOLIDAYS,
        exclusions=_BR_OFFICE_EXCLUSIONS,
    ),
    Agreement(
        key="br-accounting",
        short="Contabilistas (SINDCONT-SP)",
        country="BR",
        currency="BRL",
        category="Contabilistas, auditores e técnicos em contabilidade",
        cct_official="Convenção Coletiva de Trabalho 2026/2027 — Empregados em Empresas de Serviços "
                     "Contábeis, Perícia e Auditoria do Estado de São Paulo",
        cct_registration="MTE / Sistema Mediador nº SP002471/2026",
        cct_validity="1 Jan 2026 – 31 Dec 2026 (data-base 1º de janeiro)",
        union_official="Sindicato dos Contabilistas de São Paulo (SINDCONT-SP)",
        employer_body="Federação Nacional das Empresas de Serviços Contábeis e das Empresas de "
                      "Assessoramento, Perícias, Informações e Pesquisas (FENACON)",
        profile=Profile(kind="office", scheduled_minutes=480, break_minutes=60, start_minutes=9 * 60,
                        start_jitter=45, work_days=(0, 1, 2, 3, 4)),
        rules=_BR_OFFICE_RULES,
        config={"tolerance_minutes": 10.0},
        policy_key=None,
        holidays=_BR_HOLIDAYS,
        exclusions=_BR_OFFICE_EXCLUSIONS,
    ),
    Agreement(
        key="br-it",
        short="Processamento de dados (SINDPD-SP)",
        country="BR",
        currency="BRL",
        category="Profissionais de tecnologia — desenvolvimento, infraestrutura e plantão de suporte",
        cct_official="Convenção Coletiva de Trabalho 2026/2027 — Empregados em Empresas de "
                     "Processamento de Dados e Tecnologia da Informação de São Paulo",
        cct_registration="MTE / Sistema Mediador nº SP004230/2026",
        cct_validity="1 Jan 2026 – 31 Dec 2026 (data-base 1º de janeiro)",
        union_official="Sindicato dos Trabalhadores em Processamento de Dados e Tecnologia da "
                       "Informação de São Paulo (SINDPD-SP)",
        employer_body="Sindicato das Empresas de Informática do Estado de São Paulo (SEPROSP)",
        profile=Profile(kind="it", scheduled_minutes=480, break_minutes=60, start_minutes=9 * 60 + 30,
                        start_jitter=90, work_days=(0, 1, 2, 3, 4)),
        # The plantão rotation is why this population carries the night premium and the hour bank that
        # a purely administrative one does not: an on-call engineer genuinely works at 02:00.
        rules=("br-inter-11h", "br-intra-60m", "br-ot-daily-2h", "br-weekly-44h", "br-dsr-24h",
               "br-tolerance-10m", "br-night-premium", "br-holiday-double", "br-hour-bank"),
        # 15 minutes a day is what the T&A instance was configured with for the on-call population, and
        # Art. 58 §1º allows 10 — so the five minutes in between are the finding, on every day they
        # occur. This is a configuration breach, not a rostering one, and it is the one on this
        # dashboard that a single change clears.
        config={"tolerance_minutes": 15.0, "night_premium_pct": 30.0},
        policy_key=None,
        holidays=_BR_HOLIDAYS,
        exclusions=(_BR_OFFICE_EXCLUSIONS[1],),
    ),
    Agreement(
        key="br-engineering",
        short="Engenheiros e técnicos (SEESP)",
        country="BR",
        currency="BRL",
        category="Engenheiros, tecnólogos e técnicos de laboratório",
        cct_official="Convenção Coletiva de Trabalho 2026/2027 — Engenheiros, Arquitetos e Técnicos "
                     "no Estado de São Paulo",
        cct_registration="MTE / Sistema Mediador nº SP002903/2026",
        cct_validity="1 Mar 2026 – 28 Feb 2027 (data-base 1º de março)",
        union_official="Sindicato dos Engenheiros no Estado de São Paulo (SEESP)",
        employer_body="Federação das Indústrias do Estado de São Paulo (FIESP)",
        profile=Profile(kind="lab", scheduled_minutes=480, break_minutes=60, start_minutes=8 * 60,
                        start_jitter=45, work_days=(0, 1, 2, 3, 4)),
        rules=_BR_OFFICE_RULES,
        config={"tolerance_minutes": 10.0},
        policy_key=None,
        holidays=_BR_HOLIDAYS,
        exclusions=_BR_OFFICE_EXCLUSIONS,
    ),
    Agreement(
        key="br-commerce",
        short="Comerciários (SECSP)",
        country="BR",
        currency="BRL",
        category="Comerciários — lojas de rua, shopping centers e retaguarda",
        cct_official="Convenção Coletiva de Trabalho 2026/2027 — Empregados no Comércio Varejista de São Paulo",
        cct_registration="MTE / Sistema Mediador nº SP002145/2026",
        cct_validity="1 Jan 2026 – 31 Dec 2026 (data-base 1º de janeiro)",
        union_official="Sindicato dos Empregados no Comércio de São Paulo (SECSP)",
        employer_body="Federação do Comércio de Bens, Serviços e Turismo do Estado de São Paulo (FecomercioSP)",
        profile=Profile(kind="commerce", scheduled_minutes=460, break_minutes=60, start_minutes=9 * 60,
                        start_jitter=90, work_days=(0, 1, 2, 3, 4, 5), sunday_share=0.42),
        rules=("br-inter-11h", "br-intra-60m", "br-ot-daily-2h", "br-weekly-44h", "br-dsr-24h",
               "br-sunday-rotation", "br-tolerance-10m", "br-night-premium", "br-holiday-double",
               "br-hour-bank", "br-minor-night"),
        config={"night_premium_pct": 30.0, "tolerance_minutes": 10.0},
        policy_key="br-retail",
        holidays=_BR_HOLIDAYS,
    ),
    Agreement(
        key="br-logistics",
        short="Transporte rodoviário (SINDMOTORISTAS)",
        country="BR",
        currency="BRL",
        category="Motoristas, ajudantes e operadores logísticos",
        cct_official="Convenção Coletiva de Trabalho 2026 — Transporte Rodoviário de Cargas do Estado de São Paulo",
        cct_registration="MTE / Sistema Mediador nº SP003912/2026",
        cct_validity="1 May 2026 – 30 Apr 2027 (data-base 1º de maio)",
        union_official="Sindicato dos Trabalhadores em Transportes Rodoviários de São Paulo (SINDMOTORISTAS)",
        employer_body="Sindicato das Empresas de Transportes de Carga de São Paulo e Região (SETCESP)",
        profile=Profile(kind="logistics", scheduled_minutes=440, break_minutes=60, start_minutes=5 * 60,
                        start_jitter=200, work_days=(0, 1, 2, 3, 4, 5), sunday_share=0.18),
        rules=("br-inter-11h", "br-intra-60m", "br-ot-daily-2h", "br-weekly-44h", "br-dsr-24h",
               "br-tolerance-10m", "br-night-premium", "br-holiday-double", "br-hour-bank",
               "br-driver-break"),
        # The night premium is configured at the statutory 20% while Cláusula 18ª commits to 30%. Half
        # the fleet clocks in before 05:00, so this single configured number shorts every one of those
        # night hours — no pattern has to be planted for the finding to be real.
        config={"night_premium_pct": 20.0, "tolerance_minutes": 10.0},
        policy_key="br-log",
        holidays=_BR_HOLIDAYS,
    ),
    Agreement(
        key="br-healthcare",
        short="Saúde 12×36 (SindSaúde-SP)",
        country="BR",
        currency="BRL",
        category="Enfermagem, técnicos e auxiliares — escala 12×36",
        cct_official="Convenção Coletiva de Trabalho 2026/2027 — Empregados em Estabelecimentos de "
                     "Serviços de Saúde do Estado de São Paulo",
        cct_registration="MTE / Sistema Mediador nº SP002684/2026",
        cct_validity="1 Mar 2026 – 28 Feb 2027 (data-base 1º de março)",
        union_official="Sindicato dos Trabalhadores em Estabelecimentos de Serviços de Saúde de São Paulo (SindSaúde-SP)",
        employer_body="Sindicato dos Hospitais, Clínicas e Laboratórios do Estado de São Paulo (SindHosp)",
        profile=Profile(kind="scale_12x36", scheduled_minutes=650, break_minutes=60, start_minutes=7 * 60,
                        start_jitter=0, work_days=(0, 1, 2, 3, 4, 5, 6), sunday_share=1.0),
        rules=("br-12x36-rest", "br-inter-11h", "br-intra-60m", "br-dsr-24h",
               "br-tolerance-10m", "br-night-premium", "br-holiday-double"),
        config={"night_premium_pct": 30.0, "tolerance_minutes": 10.0},
        policy_key=None,
        holidays=_BR_HOLIDAYS,
        exclusions=(
            ("44-hour working week (CF Art. 7º XIII)",
             "Displaced by CLT Art. 59-A: a valid 12×36 scale compensates through the 36-hour rest, so the "
             "weekly ceiling is not the test — the 36 hours are. Break those and this rule comes back."),
            ("Daily overtime cap of 2 hours (CLT Art. 59)",
             "The same Art. 59-A exception authorises the 12-hour shift itself, so hours 9–12 are not "
             "overtime while the scale holds."),
        ),
    ),
    Agreement(
        key="br-banking",
        short="Bancários (FENABAN)",
        country="BR",
        currency="BRL",
        category="Bancários — crédito ao consumidor e serviços financeiros (6h, art. 224)",
        cct_official="Convenção Coletiva de Trabalho 2026/2027 — FENABAN (Federação Nacional dos Bancos)",
        cct_registration="MTE / Sistema Mediador nº MR045821/2026",
        cct_validity="1 Sep 2026 – 31 Aug 2027 (data-base 1º de setembro)",
        union_official="Confederação Nacional dos Trabalhadores do Ramo Financeiro (CONTRAF-CUT)",
        employer_body="Federação Nacional dos Bancos (FENABAN)",
        profile=Profile(kind="banking", scheduled_minutes=360, break_minutes=15, start_minutes=10 * 60,
                        start_jitter=30, work_days=(0, 1, 2, 3, 4)),
        rules=("br-banking-6h", "br-inter-11h", "br-ot-daily-2h", "br-weekly-44h", "br-dsr-24h",
               "br-tolerance-10m", "br-holiday-double", "br-hour-bank"),
        config={"tolerance_minutes": 10.0},
        policy_key=None,
        holidays=_BR_HOLIDAYS,
        exclusions=(
            ("Night premium (CLT Art. 73)",
             "The consumer-credit desks close at 18:00 and no roster in the period reaches 22:00, so there "
             "is no night work to price. Kept out of the score rather than reported as a pass."),
        ),
    ),
    # -- Mexico ---------------------------------------------------------------
    Agreement(
        key="mx-office",
        short="Oficina y confianza (CROC)",
        country="MX",
        currency="MXN",
        category="Empleados administrativos y profesionales — oficinas corporativas",
        cct_official="Contrato Colectivo de Trabajo 2026 — Empleados de oficina y de confianza, "
                     "Ciudad de México y Nuevo León",
        cct_registration="CFCRL nº 09/2026/CCT/0658",
        cct_validity="1 Feb 2026 – 31 Jan 2027 (revisión salarial anual)",
        union_official="Confederación Revolucionaria de Obreros y Campesinos (CROC) — Sección Empleados de Oficina",
        employer_body="Cámara Nacional de Comercio, Servicios y Turismo de la Ciudad de México (CANACO CDMX)",
        profile=Profile(kind="mx_office", scheduled_minutes=480, break_minutes=30, start_minutes=9 * 60,
                        start_jitter=60, work_days=(0, 1, 2, 3, 4)),
        rules=("mx-weekly-48h", "mx-ot-daily-3h", "mx-ot-weekly-9h", "mx-rest-day-7", "mx-meal-30m",
               "mx-sunday-prima", "mx-holiday-double"),
        config={"sunday_premium_pct": 25.0},
        policy_key=None,
        holidays=(),
        exclusions=(
            ("Jornada nocturna capped at 7 hours (LFT Art. 60 y 61)",
             "The corporate offices run a single diurnal shift; no roster in the period falls inside "
             "20:00–06:00, so there is no jornada nocturna to measure against the cap."),
            ("Jornada mixta capped at 7h30 (LFT Art. 60 y 61)",
             "Same reason: a shift has to straddle 20:00 to be mixta, and none does."),
        ),
    ),
    Agreement(
        key="mx-retail",
        short="Comercio al por menor (CROC)",
        country="MX",
        currency="MXN",
        category="Empleados de tienda, caja y almacén",
        cct_official="Contrato Colectivo de Trabajo 2026 — Comercio al por menor, Ciudad de México y Estado de México",
        cct_registration="CFCRL nº 09/2026/CCT/0412",
        cct_validity="1 Feb 2026 – 31 Jan 2027 (revisión salarial anual)",
        union_official="Confederación Revolucionaria de Obreros y Campesinos (CROC) — Sección Comercio CDMX",
        employer_body="Cámara de Comercio, Servicios y Turismo de la Ciudad de México (CANACO CDMX)",
        profile=Profile(kind="mx_retail", scheduled_minutes=480, break_minutes=30, start_minutes=10 * 60,
                        start_jitter=90, work_days=(0, 1, 2, 3, 4, 5), sunday_share=0.46),
        rules=("mx-weekly-48h", "mx-ot-daily-3h", "mx-ot-weekly-9h", "mx-rest-day-7", "mx-meal-30m",
               "mx-sunday-prima", "mx-holiday-double"),
        config={"sunday_premium_pct": 25.0},
        policy_key="mx-retail",
        holidays=(),
    ),
    Agreement(
        key="mx-plant",
        short="Manufactura NL (CTM)",
        country="MX",
        currency="MXN",
        category="Operarios y técnicos — turnos rotativos (diurno / nocturno / mixto)",
        cct_official="Contrato Colectivo de Trabajo 2026 — Industria manufacturera del Estado de Nuevo León",
        cct_registration="CFCRL nº 19/2026/CCT/0873",
        cct_validity="1 Apr 2026 – 31 Mar 2028 (bienal, con revisión salarial anual)",
        union_official="Confederación de Trabajadores de México (CTM) — Federación de Trabajadores de Nuevo León",
        employer_body="Cámara de la Industria de Transformación de Nuevo León (CAINTRA)",
        profile=Profile(kind="mx_plant", scheduled_minutes=480, break_minutes=30, start_minutes=6 * 60,
                        start_jitter=0, work_days=(0, 1, 2, 3, 4, 5), sunday_share=0.22),
        rules=("mx-weekly-48h", "mx-ot-daily-3h", "mx-ot-weekly-9h", "mx-rest-day-7", "mx-meal-30m",
               "mx-night-7h", "mx-mixed-7h30", "mx-sunday-prima", "mx-holiday-double"),
        config={"sunday_premium_pct": 25.0},
        policy_key=None,
        holidays=(),
    ),
)}


# --- the departments ---------------------------------------------------------


@dataclass(frozen=True)
class Segment:
    """One slice of a department's headcount, under one agreement.

    `sites` and `roles` live here rather than on the agreement because they are what makes a
    violation row readable: "Analista de RH · Sede Faria Lima" and "Motorista carreteiro · CD
    Guarulhos" can sit in the same department and must not be described by the same list.
    """

    agreement: str            # Agreement.key
    label: str                # what this slice is, in the department's own words
    headcount: int
    sites: tuple[str, ...]
    roles: tuple[str, ...]
    incidence: dict[str, float] = field(default_factory=dict)   # demo scaffolding — see the docstring


@dataclass(frozen=True)
class Department:
    """What a customer picks off the org chart. One jurisdiction, one or more agreements."""

    key: str
    arm: str                  # Arm.key
    name: str
    country: str              # BR | MX — must match every segment's agreement
    mandate: str              # one line: what this department is for
    segments: tuple[Segment, ...]

    @property
    def headcount(self) -> int:
        return sum(s.headcount for s in self.segments)


@dataclass(frozen=True)
class Arm:
    """An organizational arm — the top level of the chart."""

    key: str
    name: str
    blurb: str


ARMS: list[Arm] = [
    Arm(key="finance-governance", name="Finance & governance",
        blurb="The books, the forecast, the audit trail and the market story."),
    Arm(key="legal-risk", name="Legal & risk",
        blurb="Counsel, the ethics line, and the register of what could go wrong."),
    Arm(key="people-strategy", name="People & strategy",
        blurb="Who the company hires, where it is going, and what it owes the outside."),
    Arm(key="commercial-operations", name="Commercial & operations",
        blurb="Everything that moves product: demand, supply, the labs and the systems."),
]


# Site lists, named once each — a department's staff are not spread across every building the company
# owns, and reusing one list per kind of workplace keeps the violation rows plausible.
_HQ = ("Sede Faria Lima (SP)", "Escritório Alphaville", "CSC Barueri")
_HQ_WIDE = ("Sede Faria Lima (SP)", "Escritório Alphaville", "Escritório Rio de Janeiro",
            "Escritório Belo Horizonte", "CSC Barueri")
_STORES = ("Loja Paulista", "Loja Ibirapuera", "Loja Morumbi", "Loja Tatuapé", "Loja Campinas",
           "Loja Santos")
_CDS = ("CD Guarulhos", "CD Jundiaí", "CD Ribeirão Preto", "CD Contagem", "Pátio Cubatão")
_TECH = ("Sede Faria Lima (SP)", "Hub Tecnológico Campinas", "Escritório Recife")
_LABS = ("Laboratório Campinas", "Centro Técnico Jundiaí")
_CLINICS = ("Ambulatório Sede", "Ambulatório CD Guarulhos", "Ambulatório Loja Paulista")
_MX_OFFICES = ("Corporativo Polanco", "Oficina Santa Fe", "Oficina Monterrey")
_MX_PLANTS = ("Planta Apodaca", "Planta Santa Catarina", "Planta García", "Planta Escobedo")


DEPARTMENTS: list[Department] = [
    # ---------------------------------------------------------------- Finance & governance
    Department(
        key="fin-controller",
        arm="finance-governance",
        name="Finance / controller",
        country="BR",
        mandate="Closes the books, owns the ledger, and answers for what the numbers say.",
        segments=(
            Segment(agreement="br-accounting", label="Contabilidade e fiscal", headcount=2300,
                    sites=_HQ, roles=("Analista contábil", "Contador sênior", "Coordenador fiscal",
                                      "Controller", "Analista de tributos")),
            Segment(agreement="br-admin", label="Contas a pagar e a receber", headcount=1500,
                    sites=_HQ, roles=("Analista de contas a pagar", "Analista de crédito e cobrança",
                                      "Assistente administrativo", "Coordenador de tesouraria")),
            Segment(agreement="br-banking", label="Crédito ao consumidor — mesa de atendimento",
                    headcount=400, sites=("Sede Faria Lima (SP)", "Escritório Rio de Janeiro"),
                    roles=("Analista de crédito", "Operador de mesa", "Gerente de carteira",
                           "Assistente de retaguarda")),
        ),
    ),
    Department(
        key="fin-fpa",
        arm="finance-governance",
        name="Financial planning & analysis",
        country="BR",
        mandate="Turns the close into a forecast, and the forecast into a budget anyone can defend.",
        segments=(
            Segment(agreement="br-admin", label="Planejamento e orçamento", headcount=1800,
                    sites=_HQ_WIDE, roles=("Analista de planejamento", "Analista de FP&A",
                                           "Business partner financeiro", "Coordenador de orçamento")),
            Segment(agreement="br-accounting", label="Controladoria de negócios", headcount=800,
                    sites=_HQ, roles=("Analista de controladoria", "Contador de custos",
                                      "Especialista em margem")),
        ),
    ),
    Department(
        key="fin-audit",
        arm="finance-governance",
        name="Internal audit",
        country="MX",
        mandate="Tests the controls the rest of the company says it has, including on the plant floor.",
        segments=(
            Segment(agreement="mx-office", label="Auditoría corporativa", headcount=1300,
                    sites=_MX_OFFICES, roles=("Auditor interno", "Auditor senior",
                                              "Especialista en controles", "Gerente de auditoría")),
            # Auditors embedded on the rotating plant turns — they are audited by the same clock as
            # the line they observe, and they inherit its rest-day exposure.
            Segment(agreement="mx-plant", label="Auditoría de planta — turnos rotativos", headcount=600,
                    sites=_MX_PLANTS, roles=("Auditor de planta", "Inspector de procesos",
                                             "Supervisor de cumplimiento"),
                    incidence={"mx-rest-day-7": 0.006}),
        ),
    ),
    Department(
        key="fin-ir",
        arm="finance-governance",
        name="Investor relations",
        country="BR",
        mandate="One version of the company's story, told to the market on the market's calendar.",
        segments=(
            Segment(agreement="br-admin", label="Relações com investidores", headcount=1300,
                    sites=("Sede Faria Lima (SP)", "Escritório Rio de Janeiro"),
                    roles=("Analista de RI", "Especialista em mercado de capitais",
                           "Coordenador de RI", "Assistente de RI")),
        ),
    ),
    # ---------------------------------------------------------------- Legal & risk
    Department(
        key="legal-counsel",
        arm="legal-risk",
        name="General counsel / law",
        country="BR",
        mandate="Every contract, every claim, every regulator letter — and the labour docket itself.",
        segments=(
            Segment(agreement="br-admin", label="Jurídico corporativo e trabalhista", headcount=2400,
                    sites=_HQ_WIDE, roles=("Advogado trabalhista", "Advogado societário",
                                           "Paralegal", "Analista jurídico", "Coordenador jurídico")),
        ),
    ),
    Department(
        key="legal-compliance",
        arm="legal-risk",
        name="Compliance & ethics",
        country="BR",
        mandate="The ethics line, the third-party checks, and loss prevention where the stock is.",
        segments=(
            Segment(agreement="br-admin", label="Compliance corporativo", headcount=1200,
                    sites=_HQ, roles=("Analista de compliance", "Especialista em integridade",
                                      "Investigador interno", "Coordenador de ética")),
            # Loss prevention reports into compliance but is rostered on store hours, Sundays
            # included — which is why a compliance department can breach a retail rotation clause.
            Segment(agreement="br-commerce", label="Prevenção de perdas — rede de lojas", headcount=600,
                    sites=_STORES, roles=("Fiscal de prevenção", "Inspetor de loja",
                                          "Coordenador de prevenção"),
                    incidence={"br-sunday-rotation": 0.006}),
        ),
    ),
    Department(
        key="legal-risk",
        arm="legal-risk",
        name="Risk management office",
        country="MX",
        mandate="Keeps the risk register honest and prices what the company is exposed to.",
        segments=(
            Segment(agreement="mx-office", label="Gestión de riesgos", headcount=1500,
                    sites=_MX_OFFICES, roles=("Analista de riesgos", "Especialista en seguros",
                                              "Modelador cuantitativo", "Gerente de riesgo operativo")),
        ),
    ),
    # ---------------------------------------------------------------- People & strategy
    Department(
        key="people-hr",
        arm="people-strategy",
        name="Human resources",
        country="BR",
        mandate="Hiring, payroll, relations with every union in this catalog — and occupational health.",
        segments=(
            Segment(agreement="br-admin", label="RH corporativo e folha de pagamento", headcount=2600,
                    sites=_HQ_WIDE, roles=("Analista de RH", "Analista de folha de pagamento",
                                           "Business partner de RH", "Especialista em relações sindicais",
                                           "Recrutador")),
            Segment(agreement="br-commerce", label="RH de campo — rede de lojas", headcount=900,
                    sites=_STORES, roles=("Business partner de loja", "Analista de RH de campo",
                                          "Instrutor de treinamento")),
            # SESMT — the occupational-health team CLT Art. 162 requires, on the hospital 12×36 scale
            # because the clinics run around the clock. The department that owns compliance for
            # everyone else is subject to Art. 59-A itself here.
            Segment(agreement="br-healthcare", label="SESMT — saúde ocupacional (escala 12×36)",
                    headcount=400, sites=_CLINICS,
                    roles=("Enfermeiro do trabalho", "Técnico de enfermagem", "Auxiliar de enfermagem",
                           "Técnico de segurança"),
                    incidence={"br-12x36-rest": 0.012}),
        ),
    ),
    Department(
        key="people-strategy",
        arm="people-strategy",
        name="Strategy & transformation",
        country="BR",
        mandate="Picks the bets, then runs the programmes that land them.",
        segments=(
            Segment(agreement="br-admin", label="Estratégia e PMO", headcount=1600,
                    sites=_HQ, roles=("Consultor interno", "Gerente de projetos", "Analista de estratégia",
                                      "Especialista em processos")),
            Segment(agreement="br-it", label="Transformação digital", headcount=700,
                    sites=_TECH, roles=("Product owner", "Analista de negócios",
                                        "Arquiteto de soluções", "Scrum master")),
        ),
    ),
    Department(
        key="people-sustainability",
        arm="people-strategy",
        name="Sustainability",
        country="BR",
        mandate="Measures what the company emits and consumes, and reports it where it counts.",
        segments=(
            Segment(agreement="br-admin", label="ESG e relatórios", headcount=1000,
                    sites=_HQ, roles=("Analista de ESG", "Especialista em relatórios de sustentabilidade",
                                      "Coordenador de projetos socioambientais")),
            Segment(agreement="br-engineering", label="Engenharia ambiental", headcount=400,
                    sites=_LABS, roles=("Engenheiro ambiental", "Técnico de meio ambiente",
                                        "Analista de eficiência energética")),
        ),
    ),
    Department(
        key="people-corpaffairs",
        arm="people-strategy",
        name="Corporate affairs",
        country="MX",
        mandate="Government, press and community — the company's face outside its own walls.",
        segments=(
            Segment(agreement="mx-office", label="Asuntos corporativos y comunicación", headcount=1700,
                    sites=_MX_OFFICES, roles=("Analista de asuntos públicos", "Especialista en comunicación",
                                              "Coordinador de relaciones institucionales",
                                              "Gestor de comunidad")),
        ),
    ),
    # ---------------------------------------------------------------- Commercial & operations
    Department(
        key="com-marketing",
        arm="commercial-operations",
        name="Marketing",
        country="BR",
        mandate="Brand, media and the trade calendar that lands it in the stores.",
        segments=(
            Segment(agreement="br-admin", label="Marketing corporativo e mídia", headcount=2100,
                    sites=_HQ_WIDE, roles=("Analista de marketing", "Especialista em mídia",
                                           "Gerente de marca", "Analista de CRM")),
            Segment(agreement="br-commerce", label="Trade marketing — campo", headcount=1500,
                    sites=_STORES, roles=("Promotor de vendas", "Analista de trade marketing",
                                          "Repositor de campanha")),
        ),
    ),
    Department(
        key="com-sales",
        arm="commercial-operations",
        name="Commercial (sales)",
        country="BR",
        mandate="The floor, the till and the pipeline — where the revenue is actually taken.",
        segments=(
            Segment(agreement="br-commerce", label="Rede de lojas — vendas e caixa", headcount=7100,
                    sites=_STORES, roles=("Vendedor", "Operador de caixa", "Estoquista de loja",
                                          "Supervisor de loja", "Gerente de loja"),
                    incidence={"br-sunday-rotation": 0.005, "br-inter-11h": 0.004}),
            Segment(agreement="br-admin", label="Vendas internas e sales ops", headcount=1700,
                    sites=_HQ, roles=("Executivo de contas", "Analista de sales ops",
                                      "Analista comercial", "Coordenador de vendas")),
        ),
    ),
    Department(
        key="com-operations",
        arm="commercial-operations",
        name="Global operations",
        country="BR",
        mandate="Moves the goods: the fleet, the distribution centres and the plan behind them.",
        segments=(
            Segment(agreement="br-logistics", label="Frota e transporte", headcount=6800,
                    sites=_CDS, roles=("Motorista carreteiro", "Motorista de entrega",
                                       "Ajudante de carga", "Conferente", "Operador de empilhadeira"),
                    incidence={"br-driver-break": 0.010, "br-inter-11h": 0.005}),
            Segment(agreement="br-commerce", label="Armazenagem e retaguarda", headcount=4300,
                    sites=_CDS, roles=("Operador de CD", "Separador", "Conferente de recebimento",
                                       "Supervisor de armazém"),
                    incidence={"br-dsr-24h": 0.003}),
            Segment(agreement="br-admin", label="Planejamento de operações", headcount=1300,
                    sites=_HQ, roles=("Analista de planejamento logístico", "Analista de S&OP",
                                      "Coordenador de transporte")),
        ),
    ),
    Department(
        key="com-rnd",
        arm="commercial-operations",
        name="Research & development",
        country="MX",
        mandate="Formulates, prototypes and proves it on a pilot line that runs three turns.",
        segments=(
            Segment(agreement="mx-plant", label="Línea piloto — turnos rotativos", headcount=2900,
                    sites=_MX_PLANTS, roles=("Operario de línea piloto", "Técnico de proceso",
                                             "Supervisor de turno", "Inspector de calidad"),
                    incidence={"mx-rest-day-7": 0.005, "mx-ot-weekly-9h": 0.003}),
            Segment(agreement="mx-office", label="Investigación y laboratorio", headcount=2200,
                    sites=_MX_OFFICES, roles=("Investigador", "Químico de formulación",
                                              "Analista de laboratorio", "Gerente de proyecto técnico")),
        ),
    ),
    Department(
        key="com-it",
        arm="commercial-operations",
        name="Information technology",
        country="BR",
        mandate="Builds and runs the systems, including the on-call rotation that keeps them up.",
        segments=(
            Segment(agreement="br-it", label="Engenharia, infraestrutura e plantão", headcount=4600,
                    sites=_TECH, roles=("Engenheiro de software", "Analista de infraestrutura",
                                        "SRE de plantão", "Analista de suporte N2", "Tech lead"),
                    # The plantão rotation is what breaks the interjornada: an 02:00 call-out lands
                    # inside the 11 hours that were supposed to separate two working days.
                    incidence={"br-inter-11h": 0.007, "br-tolerance-10m": 0.020}),
            Segment(agreement="br-admin", label="Governança de TI e dados", headcount=1700,
                    sites=_TECH, roles=("Analista de governança de TI", "Analista de dados",
                                        "Especialista em segurança da informação", "Gestor de contratos de TI")),
        ),
    ),
]

DEPARTMENTS_BY_KEY: dict[str, Department] = {d.key: d for d in DEPARTMENTS}
ARMS_BY_KEY: dict[str, Arm] = {a.key: a for a in ARMS}

ORGANIZATION = "Oitchau Group"

COUNTRY_META = {
    "BR": {"name": "Brazil", "flag": "\U0001F1E7\U0001F1F7", "law": "CLT + CCT/ACT",
           "instrument": "Convenção Coletiva de Trabalho", "registry": "MTE · Sistema Mediador",
           "currency": "BRL", "symbol": "R$"},
    "MX": {"name": "Mexico", "flag": "\U0001F1F2\U0001F1FD", "law": "Ley Federal del Trabajo",
           "instrument": "Contrato Colectivo de Trabajo", "registry": "CFCRL",
           "currency": "MXN", "symbol": "$"},
}
