"""Payroll Validation — read the punches, apply the rules, report what is in breach.

The review surface ends at a configuration change. This starts where that ends: the config is live,
the month is closed, and the question is whether the punches the T&A system actually collected obey
the agreement they were collected under.

**Three parts, and the separation between them is the whole point.**

1. `roster(dept, segment, agreement)` builds one slice of the population — employees with their
   contract facts (age, trust position, opening hour-bank balance) and one `Day` per calendar day of
   the period, each carrying the punch pairs as recorded.
2. The detectors (`_CHECKS`) read *only* a `Day` stream plus the employee's contract facts, the
   agreement's configured values and the rule's numeric limit. They cannot see which patterns were
   planted or what incidence was expected, and they re-derive every interval, break, weekly total and
   rest gap from the punches.
3. `validate(dept_key)` runs every rule every one of the department's agreements is subject to, over
   the slice of the population that agreement covers, then merges the findings and scores the result.

Because (2) cannot see (1)'s intent, the dashboard's numbers are computed rather than declared: a
planted late punch-out that happens to *also* push a week past its ceiling is reported under both
rules, exactly as it would be in a real audit. That overlap is a feature — it is what happens when one
rostering decision breaches three clauses at once.

**A department is not an agreement.** Global operations is drivers under the transport CCT, warehouse
staff under the commerce CCT and planners under the administrative CCT. So a rule row carries *two*
denominators and both are on screen: how much of the population the rule actually binds is in breach
(the meter), and how much of the whole department that is (what the score spends). Scoring off the
first would let a 400-person clinical team drag a 3,900-person department to a failing grade;
reporting only the second would bury a rule broken for one in eight of the people it covers.

**One rule about clock noise, and it is statutory.** Every base roster is generated *under* its weekly
ceiling rather than exactly on it, and `_countable()` strips the Art. 58 §1º tolerance before any
hour-based test. So a couple of minutes of punch drift can never by itself produce a finding — which
means every violation on the dashboard is a rostering fact, not a rounding artefact. The one place the
absorbed minutes *are* the finding is `_check_tolerance`, where the agreement's own tolerance setting
is wider than the law allows.

**Where the punches come from.** In production this reads the T&A system's punch store — in Brazil the
REP-P electronic register CLT Art. 74 §2º requires. Here the stream is generated deterministically
from the catalog's `incidence` map so a demo is reproducible and the totals add up; nothing is
persisted, because a punch is the T&A product's record, not LawTrack's.
"""
from __future__ import annotations

import random
from dataclasses import dataclass, field
from datetime import date, timedelta
from functools import lru_cache

from .validation_catalog import (
    AGREEMENTS,
    ARMS,
    ARMS_BY_KEY,
    COUNTRY_META,
    DEPARTMENTS,
    DEPARTMENTS_BY_KEY,
    ORGANIZATION,
    PERIOD_END,
    PERIOD_LABEL,
    PERIOD_START,
    RULES,
    Agreement,
    Department,
    Rule,
    Segment,
)

PERIOD_DAYS = (PERIOD_END - PERIOD_START).days + 1

# How much of a rule's violation list travels to the browser. The full occurrence count always travels
# with it, so a truncated list reads as "312 occurrences · 40 shown" and never as coverage.
MAX_VIOLATIONS_PER_RULE = 40

# CLT Art. 58 §1º — variations up to 10 minutes a day are not extraordinary time, so they are not
# hours for any hour-based test either.
LEGAL_DAILY_TOLERANCE = 10

# A rest interval is bounded by two punches, and each carries the statutory tolerance — so a rest
# period measured 12 minutes short of eleven hours is a clock artefact, not a breach of Art. 66. Rest
# tests allow that much and no more; anything past it is a rostering decision.
REST_GRACE = 2 * LEGAL_DAILY_TOLERANCE

# Below this, night minutes are punch drift across the window's edge rather than night work: a shift
# clocking in at 05:54 has not become a night shift, and an 8-hour day shift has not become a *mixta*.
NIGHT_FLOOR = 30

# What one point of a rule's breach rate costs the score, by severity. A rule breached across the whole
# department spends its full weight; one breached for 5% of it spends a twentieth.
SEVERITY_WEIGHT = {"critical": 45.0, "high": 25.0, "medium": 12.0}

# What a breach costs *before* its reach is priced in. The share-scaled weight above is the bulk of the
# penalty — a rule broken for everyone must dominate one broken for a handful — but scaling alone lets a
# real finding round away to nothing: a critical rule reaching 1% of a large department costs 0.45
# points, and the department then reports a spotless 100 with a live violation listed underneath it. The
# floor is what makes "some breaches" and "no breaches" different numbers no matter how few people are
# caught by them, which is the whole claim the score is making.
SEVERITY_FLOOR = {"critical": 6.0, "high": 3.0, "medium": 1.5}


# --- the population ----------------------------------------------------------

_BR_FIRST = ("Ana", "Bruno", "Carla", "Diego", "Eduarda", "Felipe", "Gabriela", "Henrique", "Isabela",
             "João", "Karina", "Lucas", "Mariana", "Nathan", "Otávio", "Patrícia", "Rafael", "Sabrina",
             "Thiago", "Vanessa", "Wesley", "Yasmin", "Amanda", "Caio", "Débora", "Emerson", "Fernanda",
             "Gustavo", "Helena", "Igor", "Juliana", "Leandro", "Michele", "Nívea", "Paulo", "Renata")
_BR_LAST = ("Silva", "Santos", "Oliveira", "Souza", "Lima", "Pereira", "Costa", "Rodrigues", "Almeida",
            "Nascimento", "Carvalho", "Araújo", "Ribeiro", "Fernandes", "Gomes", "Martins", "Barbosa",
            "Rocha", "Dias", "Moreira", "Cardoso", "Teixeira", "Correia", "Mendes", "Freitas")
_MX_FIRST = ("Alejandro", "Brenda", "Carlos", "Daniela", "Emilio", "Fernanda", "Gerardo", "Hilda",
             "Ignacio", "Jazmín", "Karla", "Luis", "Mónica", "Néstor", "Olivia", "Pablo", "Rocío",
             "Salvador", "Tania", "Ulises", "Verónica", "Xavier", "Yolanda", "Adriana", "Braulio",
             "Cecilia", "Diego", "Elena", "Francisco", "Guadalupe", "Héctor", "Itzel", "Joaquín")
_MX_LAST = ("Hernández", "García", "Martínez", "López", "González", "Pérez", "Rodríguez", "Sánchez",
            "Ramírez", "Cruz", "Flores", "Gómez", "Morales", "Vázquez", "Reyes", "Jiménez", "Torres",
            "Díaz", "Ruiz", "Mendoza", "Aguilar", "Ortiz", "Castillo", "Domínguez", "Guerrero")


@dataclass
class Day:
    """One calendar day for one employee, as the punch clock recorded it."""

    day: date
    punches: list[tuple[int, int]]   # (in, out) minutes from midnight of `day`; out may exceed 1440
    scheduled_minutes: int           # contracted worked minutes; 0 on a rostered rest day

    @property
    def worked(self) -> int:
        return sum(out - inn for inn, out in self.punches)

    @property
    def span(self) -> int:
        """First punch-in to last punch-out — the *jornada* an inspector reads off the card."""
        return 0 if not self.punches else self.punches[-1][1] - self.punches[0][0]

    @property
    def break_minutes(self) -> int:
        return sum(self.punches[i + 1][0] - self.punches[i][1] for i in range(len(self.punches) - 1))

    def night_minutes(self, window: tuple[int, int]) -> int:
        """Minutes worked inside a night window. The window is checked on yesterday's, today's and
        tomorrow's instance, because a shift recorded on one date can sit inside the window that
        opened on another — a 19:00→07:00 shift spends 22:00→05:00 inside yesterday's."""
        start, end = window
        length = end - start
        total = 0
        for inn, out in self.punches:
            for offset in (-1440, 0, 1440):
                total += max(0, min(out, start + offset + length) - max(inn, start + offset))
        return total


@dataclass
class Employee:
    matricula: str
    name: str
    role: str
    site: str
    age: int
    trust_position: bool          # CLT Art. 224 §2º — outside the 6-hour banking day
    bank_opening_minutes: int     # hour-bank balance carried into the period from the T&A system
    agreement: str                # the agreement this person sits under — which clauses bind them
    segment: str                  # the slice of the department they belong to, in its own words
    days: list[Day] = field(default_factory=list)


def _dates() -> list[date]:
    return [PERIOD_START + timedelta(days=i) for i in range(PERIOD_DAYS)]


def _plan(dept: Department, segment: Segment) -> dict[int, set[str]]:
    """Which employees in a segment carry which pattern. Demo scaffolding: detectors never see this.

    Incidence is realised as an exact count rather than a per-employee coin flip, so "1% of the
    segment" is 1% of the segment.
    """
    rng = random.Random(f"plan:{dept.key}:{segment.agreement}")
    plan: dict[int, set[str]] = {i: set() for i in range(segment.headcount)}
    for code, rate in sorted(segment.incidence.items()):
        n = round(segment.headcount * rate)
        if n <= 0:
            continue
        pool = list(range(segment.headcount))
        rng.shuffle(pool)
        for i in pool[:n]:
            plan[i].add(code)
    return plan


def _punches(first_in: int, worked: int, break_len: int) -> list[tuple[int, int]]:
    """A working day as punch pairs around one break. Jitter rides the outer punches only, so the
    break is never shortened by clock noise — a break shortfall in the data is always a rostering
    fact."""
    if break_len <= 0 or worked <= 0:
        return [(first_in, first_in + worked)]
    half = worked // 2
    return [(first_in, first_in + half), (first_in + half + break_len, first_in + worked + break_len)]


def _schedule(ag: Agreement, idx: int, rng: random.Random) -> list[tuple[date, int, int]]:
    """The roster before anything goes wrong: (date, scheduled worked minutes, nominal first punch-in).

    Every roster sits under its weekly ceiling with room to spare, which is both what a real schedule
    does and what keeps clock noise from tripping a weekly rule on its own.
    """
    p = ag.profile
    holidays = {date.fromisoformat(iso) for iso, _ in ag.holidays}
    dates = _dates()
    rows: list[tuple[date, int, int]] = []

    if p.kind == "scale_12x36":
        night_team = idx % 3 == 0
        parity = idx % 2
        for d in dates:
            on = (d - PERIOD_START).days % 2 == parity
            first_in = 19 * 60 if night_team else 7 * 60
            rows.append((d, p.scheduled_minutes if on else 0, first_in))
    elif p.kind == "mx_plant":
        turn_offset = idx % 3
        works_sunday = rng.random() < p.sunday_share
        sundays = [d for d in dates if d.weekday() == 6]
        worked_sundays = {d for k, d in enumerate(sundays) if works_sunday and (k + idx) % 3 != 0}
        comp = {s - timedelta(days=2) for s in worked_sundays}   # the Friday of the same week
        for d in dates:
            turn = ((d - PERIOD_START).days // 7 + turn_offset) % 3
            # nocturno 22:00→04:45 and mixto 14:00→21:15 both sit under their Art. 61 span caps.
            worked, first_in = ((480, 6 * 60), (375, 22 * 60), (405, 14 * 60))[turn]
            if turn == 0 and d.weekday() == 5:
                worked = 360
            if d in comp:
                worked = 0
            elif d.weekday() == 6:
                worked = worked if d in worked_sundays else 0
            elif d.weekday() not in p.work_days:
                worked = 0
            rows.append((d, worked, first_in))
    else:
        start_shift = rng.randint(-p.start_jitter // 2, p.start_jitter // 2) if p.start_jitter else 0
        nominal = p.start_minutes + start_shift
        works_sunday = rng.random() < p.sunday_share
        # A Sunday scale is a *rotation*: two Sundays on, one off, which is what keeps a store
        # population inside the CCT's one-Sunday-in-three clause until something goes wrong. The
        # compensating rest lands on the Friday of the same week — late enough that no run of worked
        # days reaches nine, which is where a seven-day window stops being able to find 24 hours of
        # rest either side of it. An office roster has `sunday_share=0.0`, so none of this fires.
        sundays = [d for d in dates if d.weekday() == 6]
        worked_sundays = {d for k, d in enumerate(sundays) if works_sunday and (k + idx) % 3 != 0}
        comp = {s - timedelta(days=2) for s in worked_sundays}
        saturday = {"commerce": 220, "logistics": 180, "mx_retail": 360}.get(
            p.kind, p.scheduled_minutes // 2)
        for d in dates:
            wd = d.weekday()
            if d in comp:
                worked = 0
            elif wd == 6:
                worked = 330 if d in worked_sundays else 0
            elif wd not in p.work_days:
                worked = 0
            elif wd == 5:
                worked = 0 if (p.kind == "logistics" and idx % 5 >= 2) else saturday
            else:
                worked = p.scheduled_minutes
            rows.append((d, worked, nominal))

    # A holiday is a rostered day off everywhere. Working one then becomes an event the punch data can
    # show, instead of the baseline every employee in the population shares.
    return [(d, 0 if d in holidays else worked, first_in) for d, worked, first_in in rows]


def roster(dept: Department, segment: Segment, ag: Agreement) -> list[Employee]:
    """One segment's employees with their month of punches."""
    plan = _plan(dept, segment)
    dept_ord = list(DEPARTMENTS_BY_KEY).index(dept.key) + 1
    seg_ord = list(dept.segments).index(segment) + 1
    first_pool, last_pool = (_BR_FIRST, _BR_LAST) if ag.country == "BR" else (_MX_FIRST, _MX_LAST)
    people: list[Employee] = []

    for idx in range(segment.headcount):
        rng = random.Random(f"{dept.key}:{segment.agreement}:{idx}")
        planted = plan[idx]
        # A minor is only ever placed in a population whose rule set actually covers minors, so the
        # under-18 finding is never an accident of who got generated where.
        age = 17 if "br-minor-night" in planted else rng.randint(19, 58)
        trust = ag.profile.kind == "banking" and idx % 5 == 0
        emp = Employee(
            matricula=f"{ag.country}{dept_ord:02d}{seg_ord}-{100000 + idx * 7:06d}",
            name=f"{rng.choice(first_pool)} {rng.choice(last_pool)}",
            role=rng.choice(segment.roles),
            site=rng.choice(segment.sites),
            age=age,
            trust_position=trust,
            bank_opening_minutes=(rng.randint(31 * 60, 44 * 60) if "br-hour-bank" in planted
                                  else rng.randint(0, 9 * 60)),
            agreement=ag.key,
            segment=segment.label,
        )

        tolerance_plant = "br-tolerance-10m" in planted
        for d, scheduled, first_in in _schedule(ag, idx, rng):
            if scheduled <= 0:
                emp.days.append(Day(day=d, punches=[], scheduled_minutes=0))
                continue
            if trust:
                scheduled = 480      # a genuine Art. 224 §2º trust position is contracted for 8 hours
            break_len = ag.profile.break_minutes if scheduled > 300 else 15
            variance = rng.randint(-4, 7)
            if tolerance_plant and rng.random() < 0.45:
                # Absorbed by a tolerance setting wider than the law allows — see `_check_tolerance`.
                variance = rng.randint(11, 15)
            emp.days.append(Day(day=d, punches=_punches(first_in + rng.randint(-6, 2),
                                                        scheduled + variance, break_len),
                                scheduled_minutes=scheduled))

        _plant(ag, emp, planted, random.Random(f"plant:{dept.key}:{segment.agreement}:{idx}"))
        people.append(emp)
    return people


def _plant(ag: Agreement, emp: Employee, planted: set[str], rng: random.Random) -> None:
    """Write the patterns into the punch stream. Everything here edits *punches* — never a flag a
    detector could read — so each finding still has to be re-derived from the clock data."""
    holidays = {date.fromisoformat(iso) for iso, _ in ag.holidays}
    worked = [i for i, d in enumerate(emp.days) if d.punches]
    if not worked:
        return

    def shift_out(i: int, minutes: int) -> None:
        """Add worked time to the end of a day. Anything more than a few minutes is punched — a driver
        asked to stay three hours late clocks out and back in, so extending the *existing* pair would
        invent one continuous stint at the wheel and fire the driving-break rule by construction."""
        d = emp.days[i]
        if not d.punches:
            return
        if minutes > 20:
            last_out = d.punches[-1][1]
            d.punches.append((last_out + 30, last_out + 30 + minutes))
        else:
            inn, out = d.punches[-1]
            d.punches[-1] = (inn, out + minutes)

    def move_to_end_at(i: int, last_out: int) -> None:
        """Slide a whole shift so it finishes at `last_out` — a different roster, not a longer day."""
        d = emp.days[i]
        delta = last_out - d.punches[-1][1]
        d.punches = [(a + delta, b + delta) for a, b in d.punches]

    def fill(i: int, minutes: int, first_in: int, break_len: int) -> None:
        emp.days[i].scheduled_minutes = minutes
        emp.days[i].punches = _punches(first_in, minutes, break_len)

    for code in sorted(planted):     # sorted: the plant order must not depend on set iteration
        # Recomputed each round: an earlier pattern can have opened or closed a day (the Sunday
        # rotation trades a weekday away), and a stale index would edit a day that no longer exists.
        worked = [i for i, d in enumerate(emp.days) if d.punches]
        if not worked:
            return

        if code == "br-inter-11h":
            # A late close followed by an early open — the "fechamento e abertura" pattern in a store,
            # and the 02:00 plantão call-out in an on-call engineering rotation.
            for i in rng.sample(worked, min(len(worked), rng.randint(1, 3))):
                nxt = next((j for j in worked if j > i), None)
                if nxt is None or emp.days[nxt].day != emp.days[i].day + timedelta(days=1):
                    continue
                shift_out(i, rng.randint(150, 260))
                inn, out = emp.days[nxt].punches[0]
                emp.days[nxt].punches[0] = (inn - rng.randint(60, 140), out)

        elif code in ("br-intra-60m", "mx-meal-30m"):
            required = RULES[code].params["min_minutes"]
            for i in rng.sample(worked, min(len(worked), rng.randint(2, 6))):
                d = emp.days[i]
                if len(d.punches) < 2 or d.worked <= RULES[code].params["over_worked_minutes"]:
                    continue
                short = rng.randint(max(5, required - 42), required - 12)
                (i0, o0), (_i1, o1) = d.punches[0], d.punches[1]
                d.punches = [(i0, o0), (o0 + short, o1)]     # the break shrinks; the day ends earlier

        elif code in ("br-ot-daily-2h", "mx-ot-daily-3h"):
            cap = RULES[code].params["max_overtime_minutes"]
            for i in rng.sample(worked, min(len(worked), rng.randint(2, 4))):
                shift_out(i, cap + rng.randint(18, 85))

        elif code in ("br-weekly-44h", "mx-weekly-48h"):
            # Under the daily cap every single day, over the weekly ceiling by Friday — the breach a
            # day-at-a-time review cannot see.
            week = rng.randrange(0, max(1, PERIOD_DAYS // 7))
            days = [i for i in worked if (emp.days[i].day - PERIOD_START).days // 7 == week]
            for i in days[:4]:
                shift_out(i, rng.randint(52, 70))

        elif code == "mx-ot-weekly-9h":
            week = rng.randrange(0, max(1, PERIOD_DAYS // 7))
            days = [i for i in worked if (emp.days[i].day - PERIOD_START).days // 7 == week]
            for i in days[:4]:
                shift_out(i, rng.randint(145, 175))

        elif code in ("br-dsr-24h", "mx-rest-day-7"):
            # Close over every rest day inside a ten-day span, so at least one seven-day window sits
            # wholly inside the run with no 24-hour break either side of it to rescue the week.
            # Holidays are left alone — working one of those is a different rule.
            start = rng.choice(worked[: max(1, len(worked) - 9)])
            for i in range(start, min(start + 10, len(emp.days))):
                d = emp.days[i]
                if d.punches or d.day in holidays:
                    continue
                fill(i, 420, 9 * 60 + rng.randint(0, 30), 60)

        elif code == "br-sunday-rotation":
            # Every Sunday in the period worked. The compensating weekday rest stays in place, so the
            # only thing broken is the rotation clause itself.
            for i, d in enumerate(emp.days):
                if d.day.weekday() == 6 and not d.punches:
                    fill(i, 330, 9 * 60 + rng.randint(0, 30), 60)
                    comp = i - 2
                    if 0 <= comp < len(emp.days) and emp.days[comp].punches:
                        emp.days[comp].punches = []
                        emp.days[comp].scheduled_minutes = 0

        elif code in ("br-holiday-double", "mx-holiday-double"):
            for iso, _label in ag.holidays:
                target = date.fromisoformat(iso)
                for i, d in enumerate(emp.days):
                    if d.day == target and not d.punches:
                        fill(i, 330, 9 * 60, 60)

        elif code == "br-12x36-rest":
            # The 36 hours broken by a call-in on the rest day: the scale's own condition fails.
            for i in rng.sample(worked, min(len(worked), 2)):
                nxt = i + 1
                if nxt >= len(emp.days) or emp.days[nxt].punches or emp.days[nxt].day in holidays:
                    continue
                fill(nxt, 300, emp.days[i].punches[0][0] + 60, 30)

        elif code == "br-minor-night":
            for i in rng.sample(worked, min(len(worked), rng.randint(2, 5))):
                move_to_end_at(i, 22 * 60 + rng.randint(30, 130))

        elif code == "br-night-premium":
            for i in rng.sample(worked, min(len(worked), rng.randint(4, 9))):
                if emp.days[i].night_minutes(RULES[code].params["window"]) == 0:
                    move_to_end_at(i, 22 * 60 + rng.randint(45, 200))

        elif code == "br-driver-break":
            # One stint at the wheel past four hours, then a proper meal break — so this is a driving
            # finding and not a meal-break one.
            for i in rng.sample(worked, min(len(worked), rng.randint(2, 5))):
                d = emp.days[i]
                total, first_in = d.worked, d.punches[0][0]
                stretch = min(rng.randint(265, 300), total - 45)
                if stretch <= 240:
                    continue
                d.punches = [(first_in, first_in + stretch),
                             (first_in + stretch + 60, first_in + total + 60)]

        elif code == "br-banking-6h":
            if emp.trust_position:
                continue
            for i in rng.sample(worked, min(len(worked), rng.randint(3, 8))):
                shift_out(i, rng.randint(35, 110))

        elif code == "br-hour-bank":
            for i in rng.sample(worked, min(len(worked), rng.randint(5, 10))):
                shift_out(i, rng.randint(40, 95))

        elif code == "mx-night-7h":
            for i in worked:
                if emp.days[i].punches[0][0] >= 20 * 60:        # the nocturno rotation only
                    shift_out(i, rng.randint(40, 95))

        elif code == "mx-mixed-7h30":
            for i in worked:
                if 13 * 60 <= emp.days[i].punches[0][0] < 16 * 60:   # the mixto rotation only
                    shift_out(i, rng.randint(35, 80))


# --- the detectors -----------------------------------------------------------


@dataclass
class Violation:
    employee: Employee
    when: date
    observed: str
    detail: str
    punches: list[str]
    weight: float = 1.0     # occurrences this row stands for, for the exposure estimate


def _hhmm(minutes: int) -> str:
    minutes = int(round(minutes))
    return f"{(minutes // 60) % 24:02d}:{minutes % 60:02d}"


def _dur(minutes: float) -> str:
    minutes = int(round(minutes))
    sign = "-" if minutes < 0 else ""
    minutes = abs(minutes)
    return f"{sign}{minutes // 60}h{minutes % 60:02d}"


def _card(day: Day) -> list[str]:
    return [f"{_hhmm(inn)} → {_hhmm(out)}" for inn, out in day.punches]


def _countable(day: Day) -> int:
    """Worked minutes after the statutory punch tolerance is stripped.

    CLT Art. 58 §1º: a variation of up to 10 minutes a day is not extraordinary time, so it is not
    hours for any of the hour-based tests either. Past the tolerance the *whole* variance counts
    (Súmula 366 TST) — hence the branch rather than a subtraction.
    """
    if not day.scheduled_minutes:
        return day.worked
    excess = day.worked - day.scheduled_minutes
    return day.scheduled_minutes if 0 < excess <= LEGAL_DAILY_TOLERANCE else day.worked


def _blocks(emp: Employee) -> list[tuple[int, int, date]]:
    """Each worked day as one absolute-minute block. Rest is the space *between* blocks — a break
    inside a shift is not rest, which is why the interjornada test uses these and not punches."""
    out = []
    for d in emp.days:
        if d.punches:
            base = d.day.toordinal() * 1440
            out.append((base + d.punches[0][0], base + d.punches[-1][1], d.day))
    return out


def _weeks(emp: Employee) -> dict[date, list[Day]]:
    weeks: dict[date, list[Day]] = {}
    for d in emp.days:
        monday = d.day - timedelta(days=d.day.weekday())
        weeks.setdefault(monday, []).append(d)
    return weeks


def _check_interjornada(emp, ag, rule) -> list[Violation]:
    need = rule.params["min_hours"] * 60
    out = []
    blocks = _blocks(emp)
    for (_s1, e1, d1), (s2, _e2, _d2) in zip(blocks, blocks[1:]):
        rest = s2 - e1
        if rest < need - REST_GRACE:
            out.append(Violation(
                emp, d1,
                observed=f"{_dur(rest)} rest",
                detail=f"The shift closed at {_hhmm(e1)} and the next opened at {_hhmm(s2)} — "
                       f"{_dur(need - rest)} short of the eleven hours.",
                punches=_card(next(d for d in emp.days if d.day == d1)),
            ))
    return out


def _check_intrajornada(emp, ag, rule) -> list[Violation]:
    need = rule.params["min_minutes"]
    above = rule.params["over_worked_minutes"]
    out = []
    for d in emp.days:
        if not d.punches or d.worked <= above or d.break_minutes >= need:
            continue
        out.append(Violation(
            emp, d.day,
            observed=f"{d.break_minutes} min break",
            detail=f"{_dur(d.worked)} worked with a {d.break_minutes}-minute break — "
                   f"{need - d.break_minutes} minutes suppressed, payable at +50%.",
            punches=_card(d),
        ))
    return out


def _check_daily_overtime_cap(emp, ag, rule) -> list[Violation]:
    cap = rule.params["max_overtime_minutes"]
    out = []
    for d in emp.days:
        if not d.punches or not d.scheduled_minutes:
            continue
        ot = _countable(d) - d.scheduled_minutes
        if ot > cap:
            out.append(Violation(
                emp, d.day,
                observed=f"{_dur(ot)} overtime",
                detail=f"{_dur(_countable(d))} worked against a {_dur(d.scheduled_minutes)} schedule — "
                       f"{_dur(ot - cap)} beyond the {_dur(cap)} daily cap.",
                punches=_card(d),
            ))
    return out


def _check_weekly_hours(emp, ag, rule) -> list[Violation]:
    cap = int(rule.params["max_hours"] * 60)
    out = []
    for monday, days in sorted(_weeks(emp).items()):
        # Only a week that lies wholly inside the period is scored; a partial week at either end would
        # report a total that is an artefact of where the period was cut.
        if len(days) < 7:
            continue
        total = sum(_countable(d) for d in days)
        if total > cap:
            out.append(Violation(
                emp, monday,
                observed=f"{_dur(total)} in the week",
                detail=f"Week of {monday:%d %b}: {_dur(total)} recorded against a {_dur(cap)} ceiling — "
                       f"{_dur(total - cap)} over, across {sum(1 for d in days if d.punches)} worked days.",
                punches=[f"{d.day:%a %d} · {_dur(_countable(d))}" for d in days if d.punches],
            ))
    return out


def _check_weekly_overtime_cap(emp, ag, rule) -> list[Violation]:
    cap = int(rule.params["max_overtime_hours"] * 60)
    out = []
    for monday, days in sorted(_weeks(emp).items()):
        if len(days) < 7:
            continue
        ot = sum(max(0, _countable(d) - d.scheduled_minutes) for d in days if d.punches)
        if ot > cap:
            out.append(Violation(
                emp, monday,
                observed=f"{_dur(ot)} overtime in the week",
                detail=f"Week of {monday:%d %b}: {_dur(ot)} of extraordinary time, {_dur(ot - cap)} of it "
                       f"past the nine-hour line — that portion is owed at 200%, not 100%.",
                punches=[f"{d.day:%a %d} · +{_dur(max(0, _countable(d) - d.scheduled_minutes))}"
                         for d in days if d.punches and _countable(d) > d.scheduled_minutes],
            ))
    return out


def _check_weekly_rest(emp, ag, rule) -> list[Violation]:
    """A sliding seven-day window, not a calendar week: the statute grants 24 hours in every seven
    days, and a run of worked days that straddles a Sunday is the one a calendar-week test misses.

    A rest period counts for a window if it *overlaps* it and is itself long enough — measured at full
    length, not clipped to the boundary. Both halves of that matter. Clipping would invent violations
    out of where the window was drawn: a night-shift week whose 41-hour Sunday break happens to end on
    Monday evening has plainly had its rest, and no reading of the statute penalises the roster for it.
    Requiring the rest to overlap at all is what still catches the real thing — a closed-over run of
    worked days has no long gap anywhere near it to be rescued by.
    """
    need = rule.params["min_rest_hours"] * 60 - REST_GRACE
    span = rule.params["window_days"] * 1440
    blocks = _blocks(emp)
    if len(blocks) < 2:
        return []
    gaps = [(e1, s2) for (_s1, e1, _d1), (s2, _e2, _d2) in zip(blocks, blocks[1:])]
    days = [d.day for d in emp.days]
    out: list[Violation] = []
    skip_until = 0
    for wi, start_day in enumerate(days[: max(0, len(days) - rule.params["window_days"] + 1)]):
        if wi < skip_until:
            continue
        w0 = start_day.toordinal() * 1440
        w1 = w0 + span
        longest = max((end - begin for begin, end in gaps if begin < w1 and end > w0), default=0)
        if longest >= need:
            continue
        inside = [b for b in blocks if b[1] > w0 and b[0] < w1]
        last_day = start_day + timedelta(days=rule.params["window_days"] - 1)
        out.append(Violation(
            emp, start_day,
            observed=f"{_dur(longest)} longest rest",
            detail=f"{len(inside)} worked days between {start_day:%d %b} and {last_day:%d %b} with no "
                   f"24-hour break — the longest continuous rest in the window was {_dur(longest)}.",
            punches=[f"{b[2]:%a %d} · {_hhmm(b[0])} → {_hhmm(b[1])}" for b in inside],
        ))
        skip_until = wi + rule.params["window_days"]
    return out


def _check_sunday_rotation(emp, ag, rule) -> list[Violation]:
    limit = rule.params["max_consecutive_sundays"]
    sundays = [d for d in emp.days if d.day.weekday() == 6]
    run, out = 0, []
    for d in sundays:
        run = run + 1 if d.punches else 0
        if run > limit:
            out.append(Violation(
                emp, d.day,
                observed=f"{run} Sundays in a row",
                detail=f"{run} consecutive Sundays worked — the rotation scale owes a Sunday off in every "
                       f"{limit}, and none was taken in the period.",
                punches=[f"{s.day:%d %b} · {'worked' if s.punches else 'off'}" for s in sundays],
            ))
            run = 0
    return out


def _check_tolerance(emp, ag, rule) -> list[Violation]:
    """A configuration finding, read off the punches: the T&A instance absorbs a wider variance than
    Art. 58 §1º allows for this population, so the minutes between the two limits are worked time that
    was neither paid nor recorded as overtime."""
    legal = rule.params["per_day_minutes"]
    configured = ag.config.get("tolerance_minutes", legal)
    if configured <= legal:
        return []
    out = []
    for d in emp.days:
        if not d.punches or not d.scheduled_minutes:
            continue
        excess = d.worked - d.scheduled_minutes
        if legal < excess <= configured:
            out.append(Violation(
                emp, d.day,
                observed=f"{excess} min absorbed",
                detail=f"{excess} minutes past the schedule — inside the {configured:.0f}-minute tolerance "
                       f"configured for this population but past the {legal} the law allows, so "
                       f"{excess - legal} minutes of worked time were absorbed rather than paid.",
                punches=_card(d),
                weight=(excess - legal) / 10,
            ))
    return out


def _check_night_premium(emp, ag, rule) -> list[Violation]:
    required = rule.params["required_pct"]
    configured = ag.config.get("night_premium_pct", required)
    if configured >= required:
        return []
    window = rule.params["window"]
    out = []
    for d in emp.days:
        night = d.night_minutes(window) if d.punches else 0
        if night < NIGHT_FLOOR:
            continue
        out.append(Violation(
            emp, d.day,
            observed=f"{_dur(night)} night work",
            detail=f"{_dur(night)} inside 22:00–05:00 paid at {configured:.0f}% where the CCT commits to "
                   f"{required:.0f}% — a {required - configured:.0f}-point shortfall on every one of those hours.",
            punches=_card(d),
            weight=night / 60,
        ))
    return out


def _check_holiday_work(emp, ag, rule) -> list[Violation]:
    out = []
    for iso, label in ag.holidays:
        target = date.fromisoformat(iso)
        day = next((d for d in emp.days if d.day == target), None)
        if day is None or not day.punches:
            continue
        monday = target - timedelta(days=target.weekday())
        week = [d for d in emp.days if monday <= d.day < monday + timedelta(days=7)]
        # A compensating day off is an *extra* rest day: rostered to work, and not worked.
        if any(d.scheduled_minutes > 0 and not d.punches for d in week):
            continue
        out.append(Violation(
            emp, target,
            observed=f"{_dur(day.worked)} on the holiday",
            detail=f"{label} worked, with no compensating day off anywhere in the week of {monday:%d %b} — "
                   f"so the day is owed in dobro.",
            punches=_card(day),
        ))
    return out


def _check_hour_bank(emp, ag, rule) -> list[Violation]:
    cap = rule.params["cap_hours"] * 60
    accrued = sum(_countable(d) - d.scheduled_minutes for d in emp.days if d.punches and d.scheduled_minutes)
    balance = emp.bank_opening_minutes + accrued
    if balance <= cap:
        return []
    return [Violation(
        emp, PERIOD_END,
        observed=f"{_dur(balance)} balance",
        detail=f"Opened the period at {_dur(emp.bank_opening_minutes)}, accrued {_dur(accrued)} and closed "
               f"at {_dur(balance)} — {_dur(balance - cap)} above the {_dur(cap)} cap the CCT negotiated.",
        punches=[f"opening {_dur(emp.bank_opening_minutes)}", f"accrued {_dur(accrued)}",
                 f"closing {_dur(balance)}"],
    )]


def _check_rest_12x36(emp, ag, rule) -> list[Violation]:
    need = rule.params["min_rest_hours"] * 60
    shift = rule.params["shift_hours"] * 60
    out = []
    blocks = _blocks(emp)
    for (s1, e1, d1), (s2, _e2, _d2) in zip(blocks, blocks[1:]):
        if (e1 - s1) < shift - 90:      # only a genuine 12-hour shift carries the 36-hour claim
            continue
        rest = s2 - e1
        if rest < need - REST_GRACE:
            out.append(Violation(
                emp, d1,
                observed=f"{_dur(rest)} rest after a {_dur(e1 - s1)} shift",
                detail=f"The 36 hours were broken after {_dur(rest)}. With the scale's own condition unmet, "
                       f"every 12-hour shift in the period reverts to 8 hours plus 4 of overtime.",
                punches=_card(next(d for d in emp.days if d.day == d1)),
            ))
    return out


def _check_minor_night(emp, ag, rule) -> list[Violation]:
    if emp.age >= 18:
        return []
    window = rule.params["window"]
    out = []
    for d in emp.days:
        night = d.night_minutes(window) if d.punches else 0
        if night <= 0:
            continue
        out.append(Violation(
            emp, d.day,
            observed=f"{_dur(night)} night work at {emp.age}",
            detail=f"{emp.name} is {emp.age} and worked {_dur(night)} inside the prohibited 22:00–05:00 "
                   f"window. This is a prohibition, not a premium — no payment cures it.",
            punches=_card(d),
        ))
    return out


def _check_driving_break(emp, ag, rule) -> list[Violation]:
    max_stretch = rule.params["max_stretch_minutes"]
    min_break = rule.params["min_break_minutes"]
    out = []
    for d in emp.days:
        if not d.punches:
            continue
        # Stints separated by less than a qualifying break are one continuous stretch at the wheel.
        merged: list[tuple[int, int]] = []
        for inn, o in d.punches:
            if merged and inn - merged[-1][1] < min_break:
                merged[-1] = (merged[-1][0], o)
            else:
                merged.append((inn, o))
        worst = max(((o - i) for i, o in merged), default=0)
        if worst > max_stretch:
            out.append(Violation(
                emp, d.day,
                observed=f"{_dur(worst)} continuous driving",
                detail=f"{_dur(worst)} at the wheel with no break of {min_break} minutes or more — "
                       f"{_dur(worst - max_stretch)} past the four-hour limit.",
                punches=_card(d),
            ))
    return out


def _check_banking_day(emp, ag, rule) -> list[Violation]:
    if emp.trust_position:
        return []      # Art. 224 §2º — a genuine trust position sits outside the 6-hour day
    cap = int(rule.params["max_hours"] * 60)
    out = []
    for d in emp.days:
        if d.punches and _countable(d) > cap:
            out.append(Violation(
                emp, d.day,
                observed=f"{_dur(_countable(d))} worked",
                detail=f"{_dur(_countable(d))} against the six-hour banking day — {_dur(_countable(d) - cap)} "
                       f"of overtime for an employee outside a §2º trust position.",
                punches=_card(d),
            ))
    return out


def _classify_shift(day: Day, window: tuple[int, int]) -> str:
    """LFT Art. 60: a shift wholly inside the night window is *nocturna*; one that mixes the two is
    *mixta* while its night portion stays under three and a half hours.

    The night portion has to be material. Art. 60 classifies the *jornada*, so six minutes of punch
    drift across 06:00 does not turn an eight-hour day shift into a mixed one — and reclassifying it
    would then measure it against the wrong cap.
    """
    if not day.punches:
        return "none"
    night = day.night_minutes(window)
    if night < NIGHT_FLOOR:
        return "diurna"
    if day.worked - night < NIGHT_FLOOR:
        return "nocturna"
    return "mixta" if night < 210 else "nocturna"


def _check_night_shift_cap(emp, ag, rule) -> list[Violation]:
    window, cap = rule.params["window"], int(rule.params["max_hours"] * 60)
    out = []
    for d in emp.days:
        if _classify_shift(d, window) != "nocturna" or d.span <= cap:
            continue
        out.append(Violation(
            emp, d.day,
            observed=f"{_dur(d.span)} night shift",
            detail=f"A jornada nocturna of {_dur(d.span)} — {_dur(d.span - cap)} past the seven hours "
                   f"Art. 61 allows for a shift inside 20:00–06:00.",
            punches=_card(d),
        ))
    return out


def _check_mixed_shift_cap(emp, ag, rule) -> list[Violation]:
    window, cap = rule.params["window"], int(rule.params["max_hours"] * 60)
    out = []
    for d in emp.days:
        if _classify_shift(d, window) != "mixta" or d.span <= cap:
            continue
        out.append(Violation(
            emp, d.day,
            observed=f"{_dur(d.span)} mixed shift",
            detail=f"A jornada mixta of {_dur(d.span)} — {_dur(d.span - cap)} past the 7h30 cap that applies "
                   f"once a shift straddles 20:00.",
            punches=_card(d),
        ))
    return out


def _check_sunday_premium(emp, ag, rule) -> list[Violation]:
    required = rule.params["required_pct"]
    configured = ag.config.get("sunday_premium_pct", required)
    if configured >= required:
        return []
    out = []
    for d in emp.days:
        if d.day.weekday() != 6 or not d.punches:
            continue
        out.append(Violation(
            emp, d.day,
            observed=f"{_dur(d.worked)} on a Sunday",
            detail=f"Sunday worked with the prima dominical configured at {configured:.0f}% against the "
                   f"{required:.0f}% Art. 71 requires — the premium is simply not being paid.",
            punches=_card(d),
        ))
    return out


_CHECKS = {
    "interjornada": _check_interjornada,
    "intrajornada": _check_intrajornada,
    "daily_overtime_cap": _check_daily_overtime_cap,
    "weekly_hours": _check_weekly_hours,
    "weekly_overtime_cap": _check_weekly_overtime_cap,
    "weekly_rest": _check_weekly_rest,
    "sunday_rotation": _check_sunday_rotation,
    "tolerance": _check_tolerance,
    "night_premium": _check_night_premium,
    "holiday_work": _check_holiday_work,
    "hour_bank": _check_hour_bank,
    "rest_12x36": _check_rest_12x36,
    "minor_night": _check_minor_night,
    "driving_break": _check_driving_break,
    "banking_day": _check_banking_day,
    "night_shift_cap": _check_night_shift_cap,
    "mixed_shift_cap": _check_mixed_shift_cap,
    "sunday_premium": _check_sunday_premium,
}


# --- the run -----------------------------------------------------------------


def grade(score: int) -> str:
    for floor, letter in ((90, "A"), (80, "B"), (70, "C"), (60, "D")):
        if score >= floor:
            return letter
    return "E"


def _clear_note(rule: Rule, ag: Agreement, people: list[Employee]) -> str | None:
    """Why a rule came back clear, where "clear" needs qualifying.

    A rule that passed and a rule that had nothing to test look identical on a dashboard unless the
    difference is said out loud — so it is said out loud.
    """
    if rule.check == "holiday_work" and not ag.holidays:
        return ("No statutory holiday fell inside the period, so the rule was evaluated with nothing to "
                "test — not passed on the merits.")
    if rule.check == "minor_night" and not any(e.age < 18 for e in people):
        return ("No employee under 18 is on this population's register for the period, so the "
                "prohibition was evaluated against an empty set — not passed on the merits.")
    if rule.check == "sunday_premium":
        configured = ag.config.get("sunday_premium_pct", rule.params["required_pct"])
        if configured >= rule.params["required_pct"]:
            return (f"The prima dominical is configured at {configured:.0f}%, at or above the "
                    f"{rule.params['required_pct']:.0f}% floor — so Sunday work in the period is priced "
                    f"correctly.")
    if rule.check == "night_premium":
        configured = ag.config.get("night_premium_pct", rule.params["required_pct"])
        if configured >= rule.params["required_pct"]:
            return (f"The night premium is configured at {configured:.0f}%, matching what the CCT commits "
                    f"to — every night hour in the period is priced correctly.")
    if rule.check == "tolerance":
        configured = ag.config.get("tolerance_minutes", rule.params["per_day_minutes"])
        if configured <= rule.params["per_day_minutes"]:
            return (f"Tolerance is configured at {configured:.0f} minutes a day, inside the "
                    f"{rule.params['per_day_minutes']} the statute allows.")
    return None


@dataclass
class _RuleRun:
    """One rule's findings across every segment of the department that is subject to it."""

    rule: Rule
    violations: list[Violation] = field(default_factory=list)
    population: int = 0                                  # headcount the rule actually binds
    agreements: list[str] = field(default_factory=list)   # the agreements that bring it in, in order
    notes: list[tuple[str, str]] = field(default_factory=list)   # (agreement short, clear note)


def _collapse_notes(notes: list[tuple[str, str]]) -> str | None:
    """One clear note per rule, attributed only where the agreements actually disagree.

    Three agreements each reporting "tolerance is configured at 10 minutes" is one fact about the
    department, not three, and prefixing each copy with a union's name turns a plain sentence into
    noise. Attribution earns its keep only when the reason differs between populations.
    """
    bodies = list(dict.fromkeys(note for _short, note in notes))
    if not bodies:
        return None
    if len(bodies) == 1:
        return bodies[0]
    return " ".join(f"{short} — {note}" for short, note in notes)


def _rule_payload(run: _RuleRun, dept_headcount: int) -> dict:
    rule = run.rule
    affected = {v.employee.matricula for v in run.violations}
    occurrences = len(run.violations)
    ranked = sorted(run.violations, key=lambda v: (-v.weight, v.when, v.employee.name))
    # Two denominators, both on screen. `affected_share` is of the population the rule binds — the
    # meter's claim. `org_share` is of the department — what the score spends. See the module docstring.
    return {
        "code": rule.code,
        "capability": rule.capability,
        "title": rule.title,
        "requirement": rule.requirement,
        "limit_label": rule.limit_label,
        "severity": rule.severity,
        "source": rule.source,
        "source_kind": rule.source_kind,
        "quote": rule.quote,
        "consequence": rule.consequence,
        "status": "breach" if occurrences else "clear",
        "clear_note": None if occurrences else _collapse_notes(run.notes),
        "agreements": [{"key": k, "short": AGREEMENTS[k].short} for k in dict.fromkeys(run.agreements)],
        "population": run.population,
        "affected_employees": len(affected),
        "affected_share": round(len(affected) / run.population, 4) if run.population else 0.0,
        "org_share": round(len(affected) / dept_headcount, 4) if dept_headcount else 0.0,
        "occurrences": occurrences,
        "exposure": round(sum(v.weight for v in run.violations) * rule.unit_cost, 2),
        "unit_cost": rule.unit_cost,
        "sites": sorted({v.employee.site for v in run.violations}),
        "segments": sorted({v.employee.segment for v in run.violations}),
        "violations_shown": min(occurrences, MAX_VIOLATIONS_PER_RULE),
        "violations": [
            {
                "employee": v.employee.name,
                "matricula": v.employee.matricula,
                "role": v.employee.role,
                "site": v.employee.site,
                "segment": v.employee.segment,
                "agreement": AGREEMENTS[v.employee.agreement].short,
                "agreement_key": v.employee.agreement,
                "date": v.when.isoformat(),
                "observed": v.observed,
                "detail": v.detail,
                "punches": v.punches,
                "exposure": round(v.weight * rule.unit_cost, 2),
            }
            for v in ranked[:MAX_VIOLATIONS_PER_RULE]
        ],
    }


@lru_cache(maxsize=None)
def validate(dept_key: str) -> dict:
    """Run every rule the department's agreements are subject to, over the punches of the population
    each one covers, and score the result.

    Cached because the punch stream is deterministic: a second visit to the same department is the same
    run, which is also what makes the number on the dashboard something a reviewer can quote.
    """
    dept = DEPARTMENTS_BY_KEY[dept_key]
    runs: dict[str, _RuleRun] = {}
    in_breach: set[str] = set()
    punch_records = days_analyzed = 0
    segments: list[dict] = []

    for segment in dept.segments:
        ag = AGREEMENTS[segment.agreement]
        people = roster(dept, segment, ag)
        punch_records += sum(len(d.punches) * 2 for e in people for d in e.days)
        days_analyzed += sum(1 for e in people for d in e.days if d.punches)
        seg_breached = 0

        for code in ag.rules:
            rule = RULES[code]
            run = runs.setdefault(code, _RuleRun(rule=rule))
            run.population += segment.headcount
            run.agreements.append(ag.key)
            found: list[Violation] = []
            for emp in people:
                found.extend(_CHECKS[rule.check](emp, ag, rule))
            run.violations.extend(found)
            if found:
                seg_breached += 1
                in_breach |= {v.employee.matricula for v in found}
            else:
                note = _clear_note(rule, ag, people)
                if note:
                    # Kept with its agreement so `_collapse_notes` can attribute it only where the
                    # populations genuinely differ — "no holiday fell in the period" can be true of
                    # one population and false of the next.
                    run.notes.append((ag.short, note))

        segments.append(segment_payload(segment, ag, seg_breached))

    headcount = dept.headcount
    rules = [_rule_payload(r, headcount) for r in runs.values()]
    order = {"critical": 0, "high": 1, "medium": 2}
    rules.sort(key=lambda r: (r["status"] != "breach", order[r["severity"]], -r["affected_employees"]))

    breached = [r for r in rules if r["status"] == "breach"]
    penalty = sum(SEVERITY_FLOOR[r["severity"]] + SEVERITY_WEIGHT[r["severity"]] * r["org_share"]
                  for r in breached)
    score = max(0, min(100, round(100 - penalty)))
    meta = COUNTRY_META[dept.country]

    return {
        "department": department_payload(dept),
        "period": period_payload(),
        "score": score,
        "grade": grade(score),
        "score_basis": (
            "100 minus, for every breached rule, a fixed cost for the breach existing at all "
            "(critical 6 · high 3 · medium 1.5) plus its severity weight (critical 45 · high 25 · "
            "medium 12) scaled by the share of the *department* it reaches. A rule breached for everyone "
            "spends its full weight; one breached for a single employee still costs the fixed part, so "
            "only a department with nothing found scores 100."
        ),
        "punch_source": ("Oitchau T&A · REP-P registro eletrônico de ponto (CLT Art. 74 §2º)"
                         if dept.country == "BR"
                         else "Oitchau T&A · registro de asistencia (LFT Art. 804)"),
        "segments": segments,
        "totals": {
            "employees": headcount,
            "employees_in_breach": len(in_breach),
            "punch_records": punch_records,
            "days_analyzed": days_analyzed,
            "agreements": len(dept.segments),
            "rules_evaluated": len(rules),
            "rules_breached": len(breached),
            "violations": sum(r["occurrences"] for r in rules),
            "exposure": round(sum(r["exposure"] for r in rules), 2),
            "currency": meta["currency"],
            "symbol": meta["symbol"],
        },
        "severity_counts": {
            sev: sum(1 for r in breached if r["severity"] == sev) for sev in ("critical", "high", "medium")
        },
        "rules": rules,
    }


# --- payloads ----------------------------------------------------------------


def segment_payload(segment: Segment, ag: Agreement, rules_breached: int | None = None) -> dict:
    """One slice of a department and the agreement that governs it. `rules_breached` is only present
    on a run — the catalog cannot know it, and must not imply it does."""
    meta = COUNTRY_META[ag.country]
    out = {
        "label": segment.label,
        "headcount": segment.headcount,
        "sites": list(segment.sites),
        "roles": list(segment.roles),
        "agreement": {
            "key": ag.key,
            "short": ag.short,
            "category": ag.category,
            "instrument": meta["instrument"],
            "registry": meta["registry"],
            "cct_official": ag.cct_official,
            "cct_registration": ag.cct_registration,
            "cct_validity": ag.cct_validity,
            "union_official": ag.union_official,
            "employer_body": ag.employer_body,
            "rule_count": len(ag.rules),
            "policy_key": ag.policy_key,
        },
    }
    if rules_breached is not None:
        out["rules_breached"] = rules_breached
    return out


def department_payload(dept: Department) -> dict:
    """Everything the UI can say about a department *without* having validated it.

    Deliberately carries no score, no breach count and no status: the compliance number is what
    running a validation is *for*, so nothing here may imply we already know it.
    """
    meta = COUNTRY_META[dept.country]
    agreements = [AGREEMENTS[s.agreement] for s in dept.segments]
    return {
        "key": dept.key,
        "arm": dept.arm,
        "arm_name": ARMS_BY_KEY[dept.arm].name,
        "name": dept.name,
        "mandate": dept.mandate,
        "country": dept.country,
        "country_name": meta["name"],
        "flag": meta["flag"],
        "instrument": meta["instrument"],
        "currency": meta["currency"],
        "symbol": meta["symbol"],
        "headcount": dept.headcount,
        "sites": sorted({site for s in dept.segments for site in s.sites}),
        "rule_count": len({code for a in agreements for code in a.rules}),
        "segments": [segment_payload(s, AGREEMENTS[s.agreement]) for s in dept.segments],
        "policy_keys": sorted({a.policy_key for a in agreements if a.policy_key}),
        # Per-agreement exclusions, attributed. A rule another rule displaces is not a rule that
        # passed, and on a 12×36 roster inside an HR department that distinction is the whole argument.
        "exclusions": [
            {"rule": r, "why": w, "agreement": a.short}
            for a in agreements for r, w in a.exclusions
        ],
    }


def period_payload() -> dict:
    return {
        "start": PERIOD_START.isoformat(),
        "end": PERIOD_END.isoformat(),
        "label": PERIOD_LABEL,
        "days": PERIOD_DAYS,
    }


def catalog() -> dict:
    """The org chart: four arms, their departments, and what each department is made of.

    Deliberately without a score, a status or a breach count anywhere in it. Nothing has been analysed
    at this point, and a chart that showed "3 breaches" before a run would be reporting a number it
    does not have. Choosing a department is what produces those numbers.
    """
    arms = []
    for arm in ARMS:
        departments = [department_payload(d) for d in DEPARTMENTS if d.arm == arm.key]
        arms.append({
            "key": arm.key,
            "name": arm.name,
            "blurb": arm.blurb,
            "employees": sum(d["headcount"] for d in departments),
            "departments": departments,
        })

    all_depts = [d for a in arms for d in a["departments"]]
    return {
        "period": period_payload(),
        "organization": {
            "name": ORGANIZATION,
            "employees": sum(d["headcount"] for d in all_depts),
            "departments": len(all_depts),
            "arms": len(arms),
            "agreements": len({s["agreement"]["key"] for d in all_depts for s in d["segments"]}),
            "countries": sorted({COUNTRY_META[d["country"]]["name"] for d in all_depts}),
        },
        "arms": arms,
    }
