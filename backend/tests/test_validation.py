"""Payroll Validation — the detectors, the scoring, and the two endpoints.

The detectors are tested against hand-written punch cards rather than the generated roster, because
that is the only way to assert the thing that matters: a finding appears when the *clock data* says so
and not otherwise. Each test pairs a breach with the near-miss that must stay silent — a rest eleven
hours and one minute long, a break of exactly sixty minutes, a day nine minutes over its schedule.
"""
from __future__ import annotations

from datetime import date, timedelta

import pytest

from app import validation as V
from app.validation_catalog import GROUPS, GROUPS_BY_KEY, RULES

JUN = date(2026, 6, 1)      # a Monday, so ISO weeks line up with the period


def emp(days, *, age=30, trust=False, bank=0):
    return V.Employee(matricula="T-1", name="Test Subject", role="Vendedor", site="Loja",
                      age=age, trust_position=trust, bank_opening_minutes=bank, days=days)


def day(offset, punches, scheduled=480):
    return V.Day(day=JUN + timedelta(days=offset), punches=list(punches), scheduled_minutes=scheduled)


def rest_days(offsets):
    return [day(o, [], 0) for o in offsets]


def run(check, employee, group_key="br-retail-sp", rule_code=None):
    group = GROUPS_BY_KEY[group_key]
    rule = RULES[rule_code]
    return V._CHECKS[check](employee, group, rule)


# --- rest between shifts -----------------------------------------------------


def test_interjornada_flags_a_short_rest_and_reports_the_gap():
    # Closes 23:00, opens 07:00 the next day: eight hours, three short of eleven.
    e = emp([day(0, [(9 * 60, 23 * 60)]), day(1, [(7 * 60, 17 * 60)])])
    found = run("interjornada", e, rule_code="br-inter-11h")
    assert len(found) == 1
    assert "8h00 rest" == found[0].observed
    assert "23:00" in found[0].detail and "07:00" in found[0].detail


def test_interjornada_allows_exactly_eleven_hours():
    e = emp([day(0, [(9 * 60, 20 * 60)]), day(1, [(7 * 60, 17 * 60)])])   # 20:00 → 07:00
    assert run("interjornada", e, rule_code="br-inter-11h") == []


def test_interjornada_tolerates_only_the_statutory_punch_drift():
    """A rest measured a few minutes short is two punches drifting, not a breach of Art. 66 — but the
    grace stops at the tolerance, so a rest an hour short still reports."""
    near = emp([day(0, [(9 * 60, 20 * 60 + 15)]), day(1, [(7 * 60, 17 * 60)])])   # 10h45
    assert run("interjornada", near, rule_code="br-inter-11h") == []
    real = emp([day(0, [(9 * 60, 21 * 60)]), day(1, [(7 * 60, 17 * 60)])])        # 10h00
    assert len(run("interjornada", real, rule_code="br-inter-11h")) == 1


def test_a_break_inside_a_shift_is_not_rest():
    """Two punch pairs an hour apart are one working day, so the 11 hours are measured from the last
    punch-out — not from the meal break in the middle."""
    e = emp([day(0, [(9 * 60, 13 * 60), (14 * 60, 23 * 60)]), day(1, [(7 * 60, 13 * 60)])])
    found = run("interjornada", e, rule_code="br-inter-11h")
    assert len(found) == 1 and found[0].observed == "8h00 rest"


# --- the meal break ----------------------------------------------------------


def test_intrajornada_flags_a_short_break_above_six_hours():
    e = emp([day(0, [(9 * 60, 13 * 60), (13 * 60 + 25, 18 * 60)])])   # 8h35 worked, 25 min break
    found = run("intrajornada", e, rule_code="br-intra-60m")
    assert len(found) == 1
    assert found[0].observed == "25 min break"
    assert "35 minutes suppressed" in found[0].detail


def test_intrajornada_allows_exactly_sixty_minutes():
    e = emp([day(0, [(9 * 60, 13 * 60), (14 * 60, 18 * 60)])])
    assert run("intrajornada", e, rule_code="br-intra-60m") == []


def test_intrajornada_ignores_a_short_day():
    """At or under six hours the article asks for 15 minutes, not an hour — so a 5h50 shift with a
    20-minute break is not this rule's business."""
    e = emp([day(0, [(9 * 60, 12 * 60), (12 * 60 + 20, 15 * 60 + 10)])], )
    assert run("intrajornada", e, rule_code="br-intra-60m") == []


# --- hours, and the statutory tolerance -------------------------------------


def test_daily_overtime_cap_flags_hours_past_two():
    e = emp([day(0, [(9 * 60, 20 * 60)], scheduled=480)])      # 11h worked on an 8h schedule
    found = run("daily_overtime_cap", e, rule_code="br-ot-daily-2h")
    assert len(found) == 1 and found[0].observed == "3h00 overtime"


def test_punch_drift_inside_the_tolerance_is_not_overtime():
    """Art. 58 §1º: up to ten minutes a day is not extraordinary time. Eleven minutes is."""
    inside = emp([day(0, [(9 * 60, 17 * 60 + 9)], scheduled=480)])
    assert run("daily_overtime_cap", inside, rule_code="br-ot-daily-2h") == []
    assert V._countable(inside.days[0]) == 480

    outside = emp([day(0, [(9 * 60, 17 * 60 + 11)], scheduled=480)])
    # Past the tolerance the whole variance counts (Súmula 366), so nothing is subtracted.
    assert V._countable(outside.days[0]) == 491


def test_weekly_ceiling_catches_what_the_daily_cap_misses():
    """Five days an hour over is under the daily cap every single day and still breaks the week."""
    days = [day(i, [(9 * 60, 18 * 60)], scheduled=480) for i in range(5)] + rest_days([5, 6])
    found = run("weekly_hours", emp(days), rule_code="br-weekly-44h")
    assert len(found) == 1 and found[0].observed == "45h00 in the week"
    assert run("daily_overtime_cap", emp(days), rule_code="br-ot-daily-2h") == []


def test_a_partial_week_at_the_edge_of_the_period_is_not_scored():
    """A three-day fragment would report a total that is an artefact of where the period was cut."""
    days = [day(i, [(9 * 60, 18 * 60)], scheduled=480) for i in range(3)]
    assert run("weekly_hours", emp(days), rule_code="br-weekly-44h") == []


def test_banking_day_exempts_a_genuine_trust_position():
    card = [day(i, [(10 * 60, 18 * 60)], scheduled=480) for i in range(5)] + rest_days([5, 6])
    assert len(run("banking_day", emp(card), "br-banking", "br-banking-6h")) == 5
    assert run("banking_day", emp(card, trust=True), "br-banking", "br-banking-6h") == []


# --- weekly rest -------------------------------------------------------------


def test_weekly_rest_flags_a_closed_over_run_of_worked_days():
    days = [day(i, [(9 * 60, 17 * 60)]) for i in range(V.PERIOD_DAYS)]     # every day of the month
    found = run("weekly_rest", emp(days), rule_code="br-dsr-24h")
    assert found, "a month with no rest day at all must report"
    assert "no\n24-hour break" in found[0].detail or "24-hour break" in found[0].detail


def test_weekly_rest_credits_a_long_break_that_straddles_the_window_edge():
    """The bug this guards: a night-shift week whose 41-hour Sunday break ends on Monday evening has
    plainly had its rest, and clipping the gap at the window boundary invented a violation from it."""
    days = []
    for i in range(V.PERIOD_DAYS):
        d = JUN + timedelta(days=i)
        if d.weekday() == 6:                       # Sunday off
            days.append(day(i, [], 0))
        else:                                      # 22:00 → 04:45, recorded on the starting date
            days.append(day(i, [(22 * 60, 28 * 60 + 45)], scheduled=390))
    assert run("weekly_rest", emp(days), rule_code="br-dsr-24h") == []


def test_weekly_rest_reports_each_run_once_not_once_per_window():
    days = [day(i, [(9 * 60, 17 * 60)]) for i in range(V.PERIOD_DAYS)]
    found = run("weekly_rest", emp(days), rule_code="br-dsr-24h")
    assert len(found) <= V.PERIOD_DAYS // 7 + 1


# --- the 12×36 scale ---------------------------------------------------------


def test_12x36_flags_a_call_in_that_breaks_the_thirty_six_hours():
    days = [day(0, [(7 * 60, 13 * 60), (14 * 60, 19 * 60)], scheduled=660),
            day(1, [(9 * 60, 15 * 60)], scheduled=360),          # called in on the rest day
            day(2, [(7 * 60, 13 * 60), (14 * 60, 19 * 60)], scheduled=660)]
    found = run("rest_12x36", emp(days), "br-healthcare-12x36", "br-12x36-rest")
    assert len(found) == 1 and found[0].observed.startswith("14h00 rest")


def test_12x36_allows_the_scale_running_as_designed():
    days = [day(0, [(7 * 60, 13 * 60), (14 * 60, 19 * 60)], scheduled=660),
            day(1, [], 0),
            day(2, [(7 * 60, 13 * 60), (14 * 60, 19 * 60)], scheduled=660)]
    assert run("rest_12x36", emp(days), "br-healthcare-12x36", "br-12x36-rest") == []


# --- night work --------------------------------------------------------------


def test_night_minutes_count_the_window_that_opened_yesterday():
    """A shift clocking in at 03:20 is inside the 22:00→05:00 window that opened the day before."""
    d = day(0, [(3 * 60 + 20, 11 * 60 + 40)])
    assert d.night_minutes((22 * 60, 29 * 60)) == 100


def test_night_premium_shortfall_is_priced_per_night_hour():
    e = emp([day(0, [(16 * 60, 24 * 60)])])       # two hours inside the window
    found = run("night_premium", e, rule_code="br-night-premium")
    assert len(found) == 1
    assert found[0].weight == pytest.approx(2.0)
    assert "20% where the CCT commits to 30%" in found[0].detail


def test_a_few_minutes_across_the_window_edge_is_not_night_work():
    e = emp([day(0, [(5 * 60 - 6, 13 * 60)])])    # clocks in at 04:54
    assert run("night_premium", e, rule_code="br-night-premium") == []


def test_an_eight_hour_day_shift_is_not_reclassified_as_mixed_by_punch_drift():
    """LFT Art. 60 classifies the jornada. Six minutes across 06:00 must not measure an 8-hour day
    shift against the 7h30 mixed cap."""
    from app.validation_catalog import MX_NIGHT
    drifted = day(0, [(6 * 60 - 6, 14 * 60 + 30)])
    assert V._classify_shift(drifted, MX_NIGHT) == "diurna"
    genuine = day(0, [(14 * 60, 21 * 60 + 15)])           # 75 minutes past 20:00
    assert V._classify_shift(genuine, MX_NIGHT) == "mixta"


def test_minor_night_work_is_a_prohibition_not_a_premium():
    card = [day(0, [(16 * 60, 23 * 60)])]
    assert run("minor_night", emp(card, age=17), "br-botic-franchise", "br-minor-night")
    assert run("minor_night", emp(card, age=18), "br-botic-franchise", "br-minor-night") == []


# --- driving, holidays, the hour bank, the tolerance setting -----------------


def test_driving_break_merges_stints_separated_by_less_than_a_real_break():
    """Two stretches twelve minutes apart are one stint at the wheel; an hour apart they are two."""
    merged = emp([day(0, [(5 * 60, 8 * 60), (8 * 60 + 12, 11 * 60)])])
    found = run("driving_break", merged, "br-logistics-sp", "br-driver-break")
    assert len(found) == 1 and found[0].observed == "6h00 continuous driving"

    split = emp([day(0, [(5 * 60, 8 * 60), (9 * 60, 12 * 60)])])
    assert run("driving_break", split, "br-logistics-sp", "br-driver-break") == []


def test_holiday_work_is_cured_by_a_compensating_day_off():
    holiday = date(2026, 6, 4)
    offset = (holiday - JUN).days
    week = []
    for i in range(7):
        week.append(day(i, [(9 * 60, 17 * 60)]) if i != 5 else day(i, [], 0))
    week[offset] = day(offset, [(9 * 60, 15 * 60)], scheduled=330)
    assert len(run("holiday_work", emp(week), rule_code="br-holiday-double")) == 1

    # Wednesday was rostered to work and not worked — that is the comp day, so the day is cured.
    week[2] = V.Day(day=JUN + timedelta(days=2), punches=[], scheduled_minutes=480)
    assert run("holiday_work", emp(week), rule_code="br-holiday-double") == []


def test_hour_bank_adds_the_opening_balance_to_what_the_period_accrued():
    days = [day(i, [(9 * 60, 18 * 60)], scheduled=480) for i in range(5)] + rest_days([5, 6])
    assert run("hour_bank", emp(days, bank=39 * 60), rule_code="br-hour-bank")     # 39h + 5h
    assert run("hour_bank", emp(days, bank=10 * 60), rule_code="br-hour-bank") == []


def test_tolerance_finding_needs_a_setting_wider_than_the_law():
    """The finding is the absorbed minutes — so it exists only where the engine's own tolerance is
    wider than the ten minutes Art. 58 §1º allows."""
    thirteen = [day(0, [(9 * 60, 17 * 60 + 13)], scheduled=480)]
    assert run("tolerance", emp(thirteen), "br-retail-sp", "br-tolerance-10m")     # absorbed by the 15
    # The franchise absorbs only 12, so those same thirteen minutes were paid as overtime instead —
    # visible under the overtime rules, and not this one.
    assert run("tolerance", emp(thirteen), "br-botic-franchise", "br-tolerance-10m") == []
    eleven = [day(0, [(9 * 60, 17 * 60 + 11)], scheduled=480)]
    assert run("tolerance", emp(eleven), "br-botic-franchise", "br-tolerance-10m")

    # Nine minutes is inside the statutory limit, so nothing was absorbed that should have been paid.
    inside = [day(0, [(9 * 60, 17 * 60 + 9)], scheduled=480)]
    assert run("tolerance", emp(inside), "br-retail-sp", "br-tolerance-10m") == []


# --- the run as a whole ------------------------------------------------------


@pytest.mark.parametrize("group", [g.key for g in GROUPS])
def test_every_group_validates_and_reports_a_coherent_run(group):
    r = V.validate(group)
    t = r["totals"]
    assert 0 <= r["score"] <= 100
    assert r["grade"] in ("A", "B", "C", "D", "E")
    assert t["employees"] == GROUPS_BY_KEY[group].headcount
    assert t["rules_evaluated"] == len(GROUPS_BY_KEY[group].rules)
    assert t["employees_in_breach"] <= t["employees"]
    assert t["punch_records"] > 0 and t["days_analyzed"] > 0
    # Breached rules sort ahead of clear ones, and critical ahead of the rest.
    statuses = [rule["status"] for rule in r["rules"]]
    assert statuses == sorted(statuses, key=lambda s: s != "breach")
    for rule in r["rules"]:
        assert (rule["occurrences"] > 0) == (rule["status"] == "breach")
        assert rule["affected_employees"] <= t["employees"]
        assert len(rule["violations"]) == min(rule["occurrences"], V.MAX_VIOLATIONS_PER_RULE)


def test_a_clear_rule_says_whether_it_passed_or_had_nothing_to_test():
    """Mexico has no Art. 74 holiday in June. That is a different statement from "compliant", and the
    payload has to make the difference visible."""
    r = V.validate("mx-retail-cdmx")
    holiday = next(x for x in r["rules"] if x["code"] == "mx-holiday-double")
    assert holiday["status"] == "clear"
    assert "nothing to test" in holiday["clear_note"]

    plant = V.validate("mx-plant-nl")
    prima = next(x for x in plant["rules"] if x["code"] == "mx-sunday-prima")
    assert prima["status"] == "clear" and "25%" in prima["clear_note"]


def test_the_score_falls_out_of_the_breaches_it_reports():
    r = V.validate("br-retail-sp")
    penalty = sum(V.SEVERITY_WEIGHT[x["severity"]] * x["affected_share"]
                  for x in r["rules"] if x["status"] == "breach")
    assert r["score"] == max(0, min(100, round(100 - penalty)))


def test_a_run_is_reproducible():
    """The number has to be quotable, so the same group validates to the same result every time."""
    V.validate.cache_clear()
    first = V.validate("br-logistics-sp")
    V.validate.cache_clear()
    assert V.validate("br-logistics-sp") == first


def test_generated_rosters_stay_inside_their_own_weekly_ceiling():
    """The guard behind every weekly finding: an *unplanted* employee must never breach a weekly rule,
    or clock noise rather than rostering would be driving the dashboard."""
    for key in ("br-retail-sp", "mx-retail-cdmx", "mx-plant-nl"):
        group = GROUPS_BY_KEY[key]
        weekly = next(c for c in group.rules if RULES[c].check == "weekly_hours")
        plan = V._plan(group)
        for i, employee in enumerate(V.roster(group)):
            if plan[i]:
                continue        # a planted pattern is supposed to breach something
            assert V._CHECKS["weekly_hours"](employee, group, RULES[weekly]) == [], (
                f"{key} employee {i} breaches {weekly} with no pattern planted")


# --- the endpoints -----------------------------------------------------------


def test_groups_endpoint_lists_both_countries_with_their_agreements(authed):
    body = authed.get("/api/validation/groups").json()
    assert [c["code"] for c in body["countries"]] == ["BR", "MX"]
    assert body["period"]["label"] == "June 2026"
    for country in body["countries"]:
        assert country["employees"] == sum(g["headcount"] for g in country["groups"])
        for g in country["groups"]:
            # The four facts the picker is built to show, plus who signed on each side.
            assert g["headcount"] > 0 and g["name"] and g["cct_official"] and g["union_official"]
            assert g["employer_body"] and g["cct_registration"]
            assert "score" not in g          # the compliance number is the dashboard's to reveal


def test_run_endpoint_returns_the_dashboard_payload(authed):
    body = authed.get("/api/validation/groups/br-retail-sp").json()
    assert body["group"]["union_official"].startswith("Sindicato")
    assert body["totals"]["currency"] == "BRL"
    assert body["rules"][0]["quote"] and body["rules"][0]["source"]


def test_run_endpoint_rejects_an_unknown_group(authed):
    assert authed.get("/api/validation/groups/nope").status_code == 404


def test_validation_needs_a_signed_in_user(client):
    assert client.get("/api/validation/groups").status_code == 401
    assert client.get("/api/validation/groups/br-retail-sp").status_code == 401
