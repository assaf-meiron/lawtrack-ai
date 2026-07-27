"""Second seed pass: the statutory / state-province half of the demo corpus, and the scanner's finds.

`seed_if_empty` only ever runs against a virgin database, and its dataset is almost entirely
collective agreements. This pass is idempotent *per document* (keyed on title), so it also lands on a
database that is already populated — the demo corpus can grow without a reset.

Two things it adds:

* **Statutes, reform bills, and state/province laws** across eight jurisdictions. These are the
  Conflict floor (docs/lawtrack-ai/document-types.md): the layer that puts a policy *out of
  compliance* rather than merely changing it.
* **Discovery provenance.** A document found by the Phase-2 scanner records the registry it came from
  in `source`, prefixed `Agent · ` (`AGENT_SOURCE_PREFIX`), and its `created_at` is when the scanner
  found it. That's the whole convention — the UI derives "N documents found in the past 24 hours"
  from those two fields, so nothing here is a mock the frontend has to be told about separately.
"""
from __future__ import annotations

from datetime import datetime, timedelta, timezone

from .models import (
    Classification,
    Confidence,
    Document,
    DocStatus,
    DocType,
    Finding,
    PayPolicy,
    ReviewStatus,
)
from .seed import (
    _CLASSIFICATION,
    _capability_code,
    _clause_family,
    _confidence,
    _find_quote,
    _policy_tab,
    _transform_pages,
    m,
)

# A document whose `source` starts with this was found by the scanner rather than uploaded by hand.
AGENT_SOURCE_PREFIX = "Agent · "


# --- the corpus ---------------------------------------------------------------
# `found_h` is hours before seed time (the scan that surfaced it) — the spread straddles the reported
# window on purpose, so the badge count is a real subset of the corpus rather than everything in it.

EXTRA_DOCS = [
    {
        "title": "FLSA — Overtime Exemption Salary Threshold 2026",
        "subtitle": "29 CFR Part 541 · final rule",
        "family": "US Federal — FLSA", "jurisdiction": "US", "lang": "en",
        "doc_type": DocType.statute, "policy_key": "ctry-us",
        "source": f"{AGENT_SOURCE_PREFIX}Federal Register", "found_h": 3, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["Final rule amending the regulations implementing the exemption from minimum wage and overtime pay for executive, administrative, and professional employees under section 13(a)(1) of the Fair Labor Standards Act."]},
            {"kind": "clause", "num": "§ 541.600", "title": "Salary basis threshold", "body": [
                ["To qualify for exemption, an employee must be compensated on a salary basis at a rate of not less than ", m("$1,128 per week", "f1"), ", exclusive of board, lodging, or other facilities."]]},
            {"kind": "clause", "num": "§ 778.107", "title": "Overtime after forty hours", "body": [
                ["No employer shall employ any covered, nonexempt employee for a workweek longer than forty hours unless such employee receives compensation at ", m("a rate not less than one and one-half times the regular rate", "f2"), " for all hours worked in excess of forty."]]},
            {"kind": "clause", "num": "§ 778.115", "title": "Regular rate — two or more rates", "body": [
                ["Where an employee performs two or more kinds of work for which different straight-time rates are established, the regular rate is ", m("the weighted average of such rates", "f3"), " for the workweek."]]},
        ]],
        "changes": [
            {"id": "f2", "type": "conflict", "clause": "§ 778.107", "title": "Weekly overtime floor is 1.5× after 40h",
             "change": "Federal floor: all hours over 40 in a workweek at not less than 1.5× the regular rate.",
             "current": "statutory minimum overtime premium", "required": "+50% after 40h weekly (federal floor)",
             "mapping": "Overtime → weekly threshold + premium", "confidence": 97,
             "action": "The US federal layer carries no explicit weekly threshold, so every CBA under it is compared against nothing. Set the 40h/+50% floor here — CBA layers may exceed it, never undercut it."},
            {"id": "f3", "type": "gap", "clause": "§ 778.115", "title": "Regular rate = weighted average of multiple rates",
             "change": "An employee working at two straight-time rates has a regular rate equal to the weighted average across the week.",
             "current": "Single base rate per employee", "required": "Weighted-average regular rate across rate codes",
             "mapping": "Overtime → base composition (weighted average) — not supported", "confidence": 86,
             "action": "Engine capability gap. Multi-rate weighted averaging is unmodeled; log to the backlog — it affects any US client with shift-differential rate codes."},
            {"id": "f1", "type": "config", "clause": "§ 541.600", "title": "Exemption threshold $1,128/week",
             "change": "Salary threshold below which an employee cannot be treated as exempt.",
             "current": "not set", "required": "$1,128 per week",
             "mapping": "Exemption → salary-basis threshold", "confidence": 94,
             "action": "Record the threshold on the federal layer so exempt classification can be validated against pay, not asserted."},
        ],
    },
    {
        "title": "California AB 2288 — Meal Period Premium Recovery",
        "subtitle": "Labor Code §§ 226.7, 512 · amendment",
        "family": "California — state rules", "jurisdiction": "US-CA", "lang": "en",
        "doc_type": DocType.state_law, "policy_key": "state-us-ca",
        "source": f"{AGENT_SOURCE_PREFIX}California Legislative Counsel", "found_h": 9, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["An act to amend Sections 226.7 and 512 of the Labor Code, relating to meal and rest periods and to the premium owed when a compliant period is not provided."]},
            {"kind": "clause", "num": "Sec. 512(a)", "title": "Meal period", "body": [
                ["An employer shall not employ an employee for a work period of more than five hours per day without providing ", m("a meal period of not less than 30 minutes", "c1"), ", except that if the total work period per day is no more than six hours, the meal period may be waived by mutual consent."]]},
            {"kind": "clause", "num": "Sec. 226.7(c)", "title": "Premium for a missed period", "body": [
                ["If an employer fails to provide a compliant meal or rest period, the employer shall pay the employee ", m("one additional hour of pay at the employee's regular rate of compensation for each workday that the period is not provided", "c2"), "."]]},
            {"kind": "clause", "num": "Sec. 226.7(d)", "title": "Regular rate of compensation", "body": [
                ["For purposes of subdivision (c), the regular rate of compensation ", m("includes all nondiscretionary payments for work performed, not the base hourly rate alone", "c3"), "."]]},
            {"kind": "clause", "num": "Sec. 510(a)", "title": "Daily overtime", "body": [
                ["Eight hours of labour constitutes a day's work. Any work in excess of eight hours in one workday shall be compensated at ", m("one and one-half times the regular rate, and any work in excess of 12 hours in one day at twice the regular rate", "c4"), "."]]},
        ]],
        "changes": [
            {"id": "c4", "type": "conflict", "clause": "Sec. 510(a)", "title": "Daily overtime 1.5× after 8h, 2× after 12h",
             "change": "California requires daily overtime tiers, not merely weekly.",
             "current": "state night premium only", "required": "+50% after 8h/day · +100% after 12h/day",
             "mapping": "Overtime → daily thresholds (tiered)", "confidence": 96,
             "action": "The California layer has no daily OT rule, so any policy inheriting it under-pays daily overtime. Set both tiers before the next pay run."},
            {"id": "c2", "type": "adjust_premium", "clause": "Sec. 226.7(c)", "title": "One hour premium per missed meal/rest period",
             "change": "A missed compliant period owes one additional hour of pay, per workday, per period type.",
             "current": "not set", "required": "1h premium at regular rate per missed period",
             "mapping": "Breaks → missed-period premium", "confidence": 93,
             "action": "Configure the missed-period premium. Note it is per period type per day, so meal and rest can both trigger on one day."},
            {"id": "c3", "type": "gap", "clause": "Sec. 226.7(d)", "title": "Premium base includes nondiscretionary pay",
             "change": "The premium is computed on regular rate of compensation, which folds in nondiscretionary bonuses and differentials.",
             "current": "Premiums computed on base hourly rate", "required": "Base = hourly + nondiscretionary payments",
             "mapping": "Premium base composition (fold-into-base) — not supported", "confidence": 84,
             "action": "Engine capability gap. The premium base cannot yet absorb nondiscretionary components; log to the backlog and compute manually for CA clients."},
        ],
    },
    {
        "title": "New York — Frequency of Pay & Manual Worker Amendment",
        "subtitle": "Labor Law § 191 · amendment",
        "family": "New York — state rules", "jurisdiction": "US-NY", "lang": "en",
        "doc_type": DocType.state_law, "policy_key": "state-us-ny",
        "source": f"{AGENT_SOURCE_PREFIX}New York State Register", "found_h": 21, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["An act to amend the labor law in relation to the frequency of payment of wages to manual workers and to the liquidated damages available for a late payment."]},
            {"kind": "clause", "num": "§ 191(1)(a)", "title": "Weekly pay for manual workers", "body": [
                ["A manual worker shall be paid ", m("weekly and not later than seven calendar days after the end of the week in which the wages are earned", "n1"), "."]]},
            {"kind": "clause", "num": "§ 191(1)(d)", "title": "Spread of hours", "body": [
                ["An employee whose workday spans more than ten hours shall receive ", m("one additional hour of pay at the basic minimum hourly rate", "n2"), " for that day."]]},
            {"kind": "clause", "num": "§ 198(1-a)", "title": "Liquidated damages", "body": [
                ["Upon a finding that wages were not paid within the required frequency, the court shall allow liquidated damages equal to one hundred percent of the wages found to be due, unless the employer proves a good-faith basis for believing the underpayment was lawful."]]},
        ]],
        "changes": [
            {"id": "n2", "type": "gap", "clause": "§ 191(1)(d)", "title": "Spread-of-hours premium over a 10h span",
             "change": "A workday spanning more than 10 hours owes one extra hour at minimum wage — driven by span, not by hours worked.",
             "current": "Not modeled", "required": "+1h at minimum rate when the day's span exceeds 10h",
             "mapping": "Spread-of-hours premium (span-based) — not supported", "confidence": 87,
             "action": "Engine capability gap. Every premium in the engine is worked-hours-based; this one is span-based (first punch to last). Log to the backlog — it hits NY split-shift retail directly."},
            {"id": "n1", "type": "adjust_premium", "clause": "§ 191(1)(a)", "title": "Manual workers paid weekly, within 7 days",
             "change": "Manual-worker classification forces a weekly pay frequency with a 7-day lag ceiling.",
             "current": "not set", "required": "Weekly · ≤7 days after period end (manual workers)",
             "mapping": "Pay cycle → frequency by worker class", "confidence": 91,
             "action": "Set the weekly frequency for the manual-worker class on the NY layer. Semi-monthly cycles are non-compliant for that class regardless of the CBA."},
        ],
    },
    {
        "title": "Ontario — Employment Standards Amendment (Three-Hour Rule)",
        "subtitle": "ESA 2000 · O. Reg. amendment",
        "family": "Ontario — provincial rules", "jurisdiction": "CA-ON", "lang": "en",
        "doc_type": DocType.state_law, "policy_key": "state-ca-on",
        "source": f"{AGENT_SOURCE_PREFIX}Ontario e-Laws", "found_h": 30, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["A regulation amending the Employment Standards Act, 2000 with respect to minimum reporting pay, eating periods, and daily rest for employees who regularly work more than three hours a day."]},
            {"kind": "clause", "num": "s. 21.2", "title": "Three-hour rule", "body": [
                ["If an employee who regularly works more than three hours a day is required to present for work but works less than three hours, the employer shall pay the employee ", m("wages for three hours, being the greater of the amount earned and three hours at the regular rate", "o1"), "."]]},
            {"kind": "clause", "num": "s. 20", "title": "Eating periods", "body": [
                ["An employer shall give an employee ", m("an eating period of at least 30 minutes at intervals that will result in the employee working no more than five consecutive hours", "o2"), " without an eating period."]]},
            {"kind": "clause", "num": "s. 18(1)", "title": "Daily rest", "body": [
                ["An employer shall give an employee ", m("at least 11 consecutive hours free from performing work in each day", "o3"), "."]]},
        ]],
        "changes": [
            {"id": "o1", "type": "gap", "clause": "s. 21.2", "title": "Three-hour minimum reporting pay",
             "change": "An employee sent home early is paid the greater of hours earned and three hours at the regular rate.",
             "current": "Not modeled", "required": "Top up to 3h at regular rate when a shift is cut short",
             "mapping": "Reporting pay → shortfall top-up — not supported", "confidence": 88,
             "action": "Engine capability gap. A guaranteed-minimum top-up (pay the greater of two amounts) has no home in the current model. Log to the backlog; it is table stakes for Canadian retail."},
            {"id": "o2", "type": "adjust_premium", "clause": "s. 20", "title": "Eating period 30 min per 5 consecutive hours",
             "change": "A 30-minute eating period must break any run of more than five consecutive hours.",
             "current": "not set", "required": "30 min break within every 5 consecutive worked hours",
             "mapping": "Breaks → maximum consecutive hours", "confidence": 95,
             "action": "Set the 5-hour consecutive-work ceiling with a 30-minute break on the Ontario layer."},
            {"id": "o3", "type": "supported", "clause": "s. 18(1)", "title": "Daily rest 11 hours",
             "change": "11 consecutive hours free from work each day.",
             "current": "11h daily rest", "required": "11h daily rest",
             "mapping": "Rest rules → daily minimum", "confidence": 97, "action": "No action. Aligned."},
        ],
    },
    {
        "title": "Québec — Normes du travail : repos et étalement",
        "subtitle": "LNT · modification réglementaire",
        "family": "Québec — provincial rules", "jurisdiction": "CA-QC", "lang": "fr",
        "doc_type": DocType.state_law, "policy_key": "state-ca-qc",
        "source": f"{AGENT_SOURCE_PREFIX}Publications Québec", "found_h": 43, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["Règlement modifiant la Loi sur les normes du travail en matière de repos hebdomadaire, d'étalement des heures et de refus de travailler au-delà des heures habituelles."]},
            {"kind": "clause", "num": "art. 78", "title": "Repos hebdomadaire", "body": [
                ["Le salarié a droit à ", m("un repos hebdomadaire d'une durée minimale de 32 heures consécutives", "q1"), "."]]},
            {"kind": "clause", "num": "art. 53", "title": "Étalement des heures", "body": [
                ["L'employeur peut, sur entente écrite avec le salarié, ", m("étaler les heures de travail sur une base autre qu'une base hebdomadaire, à condition que la moyenne n'excède pas la semaine normale de travail", "q2"), "."]]},
            {"kind": "clause", "num": "art. 59.0.1", "title": "Refus de travailler", "body": [
                ["Le salarié peut refuser de travailler ", m("plus de deux heures au-delà de ses heures habituelles quotidiennes ou plus de 14 heures par période de 24 heures", "q3"), ", selon la période la plus courte."]]},
        ]],
        "changes": [
            {"id": "q2", "type": "adjust_premium", "clause": "art. 53", "title": "Hours averaging on a non-weekly basis",
             "change": "Written agreement allows averaging over a longer reference period, provided the average stays within the normal week.",
             "current": "not set", "required": "Averaging window permitted · average ≤ normal week",
             "mapping": "Hours bank → averaging reference period", "confidence": 90,
             "action": "Configure a Québec averaging window. It behaves like a compensation cycle with an average-based, not balance-based, test."},
            {"id": "q3", "type": "gap", "clause": "art. 59.0.1", "title": "Right to refuse beyond +2h / 14h in 24h",
             "change": "The employee may refuse work beyond two hours over their usual day, or beyond 14 hours in any 24-hour period.",
             "current": "Not modeled", "required": "Refusal thresholds: +2h over usual day · 14h/24h",
             "mapping": "Working-time limits → refusal right — not supported", "confidence": 83,
             "action": "Engine capability gap. A refusal right is a scheduling constraint, not a pay rule; log to the backlog and surface it in scheduling instead."},
            {"id": "q1", "type": "supported", "clause": "art. 78", "title": "Weekly rest 32 consecutive hours",
             "change": "Minimum 32 consecutive hours of weekly rest.",
             "current": "32h weekly rest", "required": "32h weekly rest",
             "mapping": "Rest rules → weekly minimum", "confidence": 94, "action": "No action. Aligned."},
        ],
    },
    {
        "title": "General Retail Industry Award MA000004 — Annual Wage Review 2026",
        "subtitle": "Fair Work Commission · determination",
        "family": "General Retail Industry Award (MA000004)", "jurisdiction": "AU", "lang": "en",
        "doc_type": DocType.award, "policy_key": "au-award-2",
        "source": f"{AGENT_SOURCE_PREFIX}Fair Work Commission", "found_h": 5, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["Determination varying the General Retail Industry Award 2020 to give effect to the Annual Wage Review, including penalty rates, overtime, and the span of ordinary hours."]},
            {"kind": "clause", "num": "cl. 21.2", "title": "Penalty rates — weekends", "body": [
                ["A full-time or part-time employee performing ordinary hours on a weekend is entitled to ", m("125% of the minimum hourly rate on a Saturday and 150% on a Sunday", "a1"), "."]]},
            {"kind": "clause", "num": "cl. 21.4", "title": "Evening penalty", "body": [
                ["Ordinary hours worked after 6.00 pm Monday to Friday attract ", m("a loading of 25% of the minimum hourly rate", "a2"), " for those hours."]]},
            {"kind": "clause", "num": "cl. 22.1", "title": "Overtime", "body": [
                ["Overtime is paid at ", m("150% for the first three hours and 200% thereafter", "a3"), ", calculated on the minimum hourly rate."]]},
            {"kind": "clause", "num": "cl. 15.3", "title": "Span of ordinary hours", "body": [
                ["Ordinary hours are worked within the span of 7.00 am to 9.00 pm Monday to Friday, and 7.00 am to 6.00 pm on a Saturday or Sunday, subject to rostering requirements."]]},
        ]],
        "changes": [
            {"id": "a1", "type": "adjust_premium", "clause": "cl. 21.2", "title": "Weekend penalties Sat 125% / Sun 150%",
             "change": "Weekend ordinary hours attract award penalty rates, expressed as a percentage of the minimum rate.",
             "current": "Sat 150% · Sun 200%", "required": "Sat 125% · Sun 150%",
             "mapping": "Weekend premiums → Saturday / Sunday rate", "confidence": 95,
             "action": "Lower both weekend rates to the reviewed figures. These are total-of-rate (125%), not additive-on-base (+25%) — confirm the layer's rate convention before saving."},
            {"id": "a3", "type": "supported", "clause": "cl. 22.1", "title": "Overtime 150% then 200%",
             "change": "First three overtime hours at 150%, thereafter 200% — matches the layer.",
             "current": "150% first 2–3h then 200%", "required": "150% first 3h then 200%",
             "mapping": "Overtime → premium bands", "confidence": 92,
             "action": "No action. The layer already bands at three hours."},
            {"id": "a2", "type": "config", "clause": "cl. 21.4", "title": "Evening loading 25% after 6pm",
             "change": "Weekday ordinary hours after 18:00 carry a 25% loading.",
             "current": "not set", "required": "+25% loading after 18:00 Mon–Fri",
             "mapping": "Night premium → evening window", "confidence": 93,
             "action": "Set an evening window from 18:00 with a 25% loading, distinct from any night-window rule."},
        ],
    },
    {
        "title": "Ladenöffnungsgesetz NRW — Sonntagsarbeit im Einzelhandel",
        "subtitle": "Änderungsgesetz 2026",
        "family": "North Rhine-Westphalia — state rules", "jurisdiction": "DE-NRW", "lang": "de",
        "doc_type": DocType.state_law, "policy_key": "state-de-nrw",
        "source": f"{AGENT_SOURCE_PREFIX}Landtag NRW", "found_h": 17, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["Gesetz zur Änderung des Ladenöffnungsgesetzes Nordrhein-Westfalen sowie der Vorschriften über Sonn- und Feiertagsarbeit im Einzelhandel."]},
            {"kind": "clause", "num": "§ 6", "title": "Sonntagsarbeit", "body": [
                ["Für Arbeit an Sonn- und Feiertagen ist ", m("ein Zuschlag von 50 % auf den Stundenlohn", "d1"), " zu zahlen; ein Ersatzruhetag innerhalb von zwei Wochen ist zu gewähren."]]},
            {"kind": "clause", "num": "§ 7", "title": "Höchstarbeitszeit", "body": [
                ["Die tägliche Arbeitszeit darf ", m("acht Stunden nicht überschreiten und nur auf bis zu zehn Stunden verlängert werden, wenn im Ausgleichszeitraum von sechs Kalendermonaten acht Stunden werktäglich nicht überschritten werden", "d2"), "."]]},
            {"kind": "clause", "num": "§ 8", "title": "Ruhepausen", "body": [
                ["Die Arbeit ist durch ", m("Ruhepausen von mindestens 30 Minuten bei einer Arbeitszeit von mehr als sechs bis zu neun Stunden", "d3"), " zu unterbrechen."]]},
        ]],
        "changes": [
            {"id": "d1", "type": "config", "clause": "§ 6", "title": "Sunday/holiday surcharge 50% + replacement rest day",
             "change": "Sunday and holiday work carries a 50% surcharge and requires a replacement rest day within two weeks.",
             "current": "not set", "required": "+50% Sunday/holiday · replacement rest day ≤2 weeks",
             "mapping": "Sunday/Holiday premium → rate + compensating rest", "confidence": 94,
             "action": "Set the surcharge and enable the replacement-rest-day requirement. The rest day is a scheduling obligation, not a pay item — both halves must be configured."},
            {"id": "d2", "type": "conflict", "clause": "§ 7", "title": "Daily cap 8h, 10h only against a 6-month average",
             "change": "Ten-hour days are permitted only if the six-month average stays at eight hours per working day.",
             "current": "state night premium only", "required": "8h/day cap · 10h extension against a 6-month average",
             "mapping": "Journey → daily limit + averaging period", "confidence": 92,
             "action": "The NRW layer has no daily cap, so 10-hour days pass unchecked with no averaging test behind them. Configure the cap and the six-month averaging window together."},
            {"id": "d3", "type": "adjust_premium", "clause": "§ 8", "title": "Break 30 min for 6–9h worked",
             "change": "A shift of more than six and up to nine hours requires a 30-minute break.",
             "current": "not set", "required": "30 min break for shifts >6h and ≤9h",
             "mapping": "Breaks → duration by shift length", "confidence": 96,
             "action": "Configure the break ladder by shift length on the NRW layer."},
        ],
    },
    {
        "title": "Décret durée du travail — repos quotidien et contingent",
        "subtitle": "JORF · décret d'application",
        "family": "France — Code du travail", "jurisdiction": "FR", "lang": "fr",
        "doc_type": DocType.statute, "policy_key": "ctry-fr",
        "source": f"{AGENT_SOURCE_PREFIX}Légifrance (JORF)", "found_h": 12, "status": DocStatus.in_review,
        "pages": [[
            {"kind": "para", "body": ["Décret relatif à la durée du travail, au repos quotidien et au contingent annuel d'heures supplémentaires, pris pour l'application des articles L. 3121-18 et suivants du code du travail."]},
            {"kind": "clause", "num": "Art. L. 3121-18", "title": "Durée quotidienne maximale", "body": [
                ["La durée quotidienne de travail effectif ne peut excéder ", m("dix heures, sauf dérogation accordée dans les conditions fixées par décret", "e1"), "."]]},
            {"kind": "clause", "num": "Art. L. 3121-20", "title": "Durée hebdomadaire maximale", "body": [
                ["Au cours d'une même semaine, la durée maximale hebdomadaire de travail est de ", m("quarante-huit heures, et de quarante-quatre heures en moyenne sur une période de douze semaines consécutives", "e2"), "."]]},
            {"kind": "clause", "num": "Art. L. 3131-1", "title": "Repos quotidien", "body": [
                ["Tout salarié bénéficie d'un ", m("repos quotidien d'une durée minimale de onze heures consécutives", "e3"), "."]]},
        ]],
        "changes": [
            {"id": "e2", "type": "conflict", "clause": "Art. L. 3121-20", "title": "Weekly ceiling 48h · 44h averaged over 12 weeks",
             "change": "Two simultaneous ceilings: an absolute 48h week and a 44h average across any 12 consecutive weeks.",
             "current": "statutory minimum overtime premium", "required": "48h absolute · 44h average over 12 weeks",
             "mapping": "Journey → weekly limit + rolling average", "confidence": 95,
             "action": "The France layer carries no ceiling at all, so a Syntec-style annual contingent can breach the rolling average undetected. Configure both tests — the rolling one is the binding constraint in practice."},
            {"id": "e1", "type": "config", "clause": "Art. L. 3121-18", "title": "Daily cap 10h, derogation permitted",
             "change": "Effective daily working time capped at ten hours, subject to authorised derogation.",
             "current": "not set", "required": "10h/day cap · derogation flag",
             "mapping": "Journey → daily limit", "confidence": 93,
             "action": "Set the 10h daily cap on the country layer, with the derogation as an explicit exception rather than a raised cap."},
            {"id": "e3", "type": "supported", "clause": "Art. L. 3131-1", "title": "Daily rest 11 hours",
             "change": "Minimum 11 consecutive hours of daily rest.",
             "current": "11h daily rest", "required": "11h daily rest",
             "mapping": "Rest rules → daily minimum", "confidence": 98, "action": "No action. Aligned."},
        ],
    },
    {
        "title": "Lei Estadual SP — Trabalho em Feriados no Comércio",
        "subtitle": "Lei estadual · comércio varejista",
        "family": "São Paulo — state rules", "jurisdiction": "BR-SP", "lang": "pt",
        "doc_type": DocType.state_law, "policy_key": "state-br-sp",
        "source": f"{AGENT_SOURCE_PREFIX}Diário Oficial do Estado de SP", "found_h": 6, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["Lei que dispõe sobre o trabalho em feriados no comércio varejista no Estado de São Paulo e sobre as condições de compensação e remuneração da jornada nesses dias."]},
            {"kind": "clause", "num": "Art. 1º", "title": "Trabalho em feriados", "body": [
                ["O trabalho em feriados no comércio varejista fica autorizado desde que ", m("previsto em convenção coletiva e observada a folga compensatória em outro dia da mesma semana", "s1"), "."]]},
            {"kind": "clause", "num": "Art. 2º", "title": "Remuneração", "body": [
                ["Não havendo folga compensatória na mesma semana, o trabalho em feriado será remunerado ", m("em dobro, sem prejuízo do descanso semanal remunerado", "s2"), "."]]},
            {"kind": "clause", "num": "Art. 3º", "title": "Adicional noturno estadual", "body": [
                ["Nas jornadas iniciadas após as 22 horas em véspera de feriado, será devido ", m("adicional noturno de 30% (trinta por cento)", "s3"), " sobre a hora normal."]]},
        ]],
        "changes": [
            {"id": "s2", "type": "config", "clause": "Art. 2º", "title": "Holiday work paid double without same-week folga",
             "change": "Holiday work is paid at double unless offset by a compensating rest day in the same week.",
             "current": "not set", "required": "+100% (dobra) when no same-week folga",
             "mapping": "Sunday/Holiday premium → conditional rate", "confidence": 94,
             "action": "Configure the conditional holiday rate on the SP state layer. The condition (same-week folga) is what makes it conditional — a flat +100% would over-pay compensated holidays."},
            {"id": "s3", "type": "config", "clause": "Art. 3º", "title": "State night premium 30% on holiday eve",
             "change": "Shifts starting after 22:00 on a holiday eve carry a 30% night premium, above the CLT floor.",
             "current": "state night premium", "required": "+30% night premium (holiday eve, from 22:00)",
             "mapping": "Night premium → rate by calendar condition", "confidence": 89,
             "action": "Raise the state night premium to 30% for the holiday-eve condition, leaving the ordinary CLT 20% intact for other nights."},
            {"id": "s1", "type": "adjust_premium", "clause": "Art. 1º", "title": "Holiday work requires CBA authorisation + folga",
             "change": "Holiday work is lawful only with collective-agreement authorisation and a same-week compensating rest day.",
             "current": "not set", "required": "CBA authorisation required · same-week folga",
             "mapping": "Holiday work → authorisation + compensating rest", "confidence": 90,
             "action": "Record the authorisation requirement so a holiday roster without a CBA basis is flagged before it is worked, not after."},
        ],
    },
    {
        "title": "Karnataka — Code on Wages Rules (Working Hours)",
        "subtitle": "State gazette · draft rules",
        "family": "Karnataka — state rules", "jurisdiction": "IN-KA", "lang": "en",
        "doc_type": DocType.reform, "policy_key": "state-in-ka",
        "source": f"{AGENT_SOURCE_PREFIX}Karnataka Gazette", "found_h": 39, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["Draft rules framed under the Code on Wages and the Occupational Safety, Health and Working Conditions Code, relating to working hours, spread-over, and overtime wages in the State of Karnataka. Draft — open for objections."]},
            {"kind": "clause", "num": "Rule 6", "title": "Daily and weekly hours", "body": [
                ["The number of hours constituting a normal working day shall not exceed ", m("nine hours, and the weekly limit shall be forty-eight hours", "k1"), "."]]},
            {"kind": "clause", "num": "Rule 7", "title": "Spread-over", "body": [
                ["The periods of work of an employee shall be so arranged that, inclusive of intervals for rest, ", m("they shall not spread over more than twelve hours in any day", "k2"), "."]]},
            {"kind": "clause", "num": "Rule 9", "title": "Overtime wages", "body": [
                ["Where an employee works beyond the normal working day, they shall be entitled to overtime wages at ", m("twice the ordinary rate of wages", "k3"), " for the excess period."]]},
        ]],
        "changes": [
            {"id": "k3", "type": "config", "clause": "Rule 9", "title": "Overtime at twice the ordinary rate",
             "change": "Draft rules set overtime at 2× the ordinary rate beyond the normal working day.",
             "current": "statutory minimum overtime premium", "required": "200% of ordinary rate beyond 9h/day",
             "mapping": "Overtime → premium rate (total-of-rate)", "confidence": 91,
             "action": "Draft, not enacted. Stage a 2× overtime variant against the effective date; do not apply until the rules are notified."},
            {"id": "k2", "type": "gap", "clause": "Rule 7", "title": "Spread-over ceiling of 12 hours",
             "change": "Total span of the working day, rest intervals included, may not exceed twelve hours.",
             "current": "Not modeled", "required": "12h maximum daily span (spread-over)",
             "mapping": "Working-time limits → daily span — not supported", "confidence": 85,
             "action": "Engine capability gap — the same span-based limit as the New York spread-of-hours premium. Worth modelling once as a shared span primitive rather than twice per jurisdiction."},
            {"id": "k1", "type": "config", "clause": "Rule 6", "title": "Normal day 9h · week 48h",
             "change": "Normal working day of nine hours with a forty-eight-hour week.",
             "current": "not set", "required": "9h/day · 48h/week",
             "mapping": "Journey → daily & weekly limits", "confidence": 93,
             "action": "Set both limits on the Karnataka layer, staged to the notification date."},
        ],
    },
    {
        "title": "NSW — Long Service Leave Amendment (Casual Service)",
        "subtitle": "Long Service Leave Act · amendment",
        "family": "New South Wales — state rules", "jurisdiction": "AU-NSW", "lang": "en",
        "doc_type": DocType.state_law, "policy_key": "state-au-nsw",
        "source": f"{AGENT_SOURCE_PREFIX}NSW Legislation", "found_h": 76, "status": DocStatus.analyzed,
        "pages": [[
            {"kind": "para", "body": ["An Act to amend the Long Service Leave Act in relation to the recognition of casual and intermittent service and the treatment of breaks in service."]},
            {"kind": "clause", "num": "s. 4(2)", "title": "Continuous service", "body": [
                ["Service is not broken by an absence of up to ", m("two months in any period of twelve months where the absence is not on the employee's initiative", "w1"), ", and such absence does not count towards the period of service."]]},
            {"kind": "clause", "num": "s. 4(6)", "title": "Casual service", "body": [
                ["Service performed on a casual or intermittent basis ", m("counts towards continuous service where the employee is engaged on a regular and systematic basis", "w2"), "."]]},
        ]],
        "changes": [
            {"id": "w2", "type": "gap", "clause": "s. 4(6)", "title": "Casual service counts when regular and systematic",
             "change": "Casual engagement counts towards long-service accrual where the pattern is regular and systematic.",
             "current": "Not modeled", "required": "Accrue service for regular/systematic casual engagement",
             "mapping": "Service accrual → casual recognition — not supported", "confidence": 82,
             "action": "Engine capability gap. Long-service accrual over an irregular pattern needs a service-continuity model; log to the backlog."},
            {"id": "w1", "type": "adjust_premium", "clause": "s. 4(2)", "title": "Absences ≤2 months don't break service",
             "change": "A non-voluntary absence of up to two months in twelve preserves continuity but does not accrue.",
             "current": "not set", "required": "≤2 months/12 preserves continuity · no accrual",
             "mapping": "Service accrual → break-in-service tolerance", "confidence": 88,
             "action": "Configure the break-in-service tolerance, keeping the preserve-but-don't-accrue distinction — collapsing the two over-accrues."},
        ],
    },
]

# A couple of the entries above use a classification key that reads better in this corpus than the
# prototype's "config"/"supported" vocabulary; both mean "a configuration recommendation".
_EXTRA_CLASSIFICATION = dict(_CLASSIFICATION)
_EXTRA_CLASSIFICATION["adjust_premium"] = Classification.adjust


# --- demo curation ------------------------------------------------------------
# This pass contributes three of the five documents the inbox opens with (`seed.DEMO_INBOX_DOCS`
# holds the other two): one per country, so "cards · by country" reads as five distinct flags and
# the queue looks like a morning's work rather than a backlog. All three were found inside the
# 24-hour window the agent reports on, which is what makes the chip's count non-zero on first load.
DEMO_INBOX_TITLES = {
    "California AB 2288 — Meal Period Premium Recovery",              # 🇺🇸 found 9h ago
    "General Retail Industry Award MA000004 — Annual Wage Review 2026",  # 🇦🇺 found 5h ago
    "Décret durée du travail — repos quotidien et contingent",         # 🇫🇷 found 12h ago, mid-review
}


# --- the scan pool ------------------------------------------------------------
# Held back from the startup seed and surfaced one at a time by `POST /api/agent/scan`, so a scan run
# genuinely lands a new document in the inbox instead of animating over a static list. All three are
# *renewals of instruments already tracked as layers* — the Phase-2 case that matters most, because
# detection has to answer "is this new, or a new edition of something we track?" and the answer fans
# the digest out to every tenant under that layer.

_RENEWALS = [
    {
        "title": "CCT Comércio Varejista — São Paulo 2027/2028",
        "subtitle": "Renovação · reajuste e jornada",
        "family": "CCT Comércio Varejista SP", "jurisdiction": "BR", "lang": "pt",
        "doc_type": DocType.cct, "policy_key": "br-retail",
        "source": f"{AGENT_SOURCE_PREFIX}Sistema Mediador (MTE)",
        "renewal_of": "CCT Comércio Varejista — São Paulo",
        "pages": [[
            {"kind": "para", "body": ["Convenção Coletiva de Trabalho 2027/2028 celebrada entre o Sindicato dos Comerciários de São Paulo e a FecomercioSP, renovando o instrumento anterior com as alterações a seguir."]},
            {"kind": "clause", "num": "Cláusula 11ª", "title": "Horas Extraordinárias", "body": [
                ["As horas extraordinárias serão remuneradas com adicional de ", m("70% (setenta por cento) para as duas primeiras horas diárias e 100% (cem por cento) para as horas subsequentes", "r1"), ", calculado sobre o valor da hora normal."]]},
            {"kind": "clause", "num": "Cláusula 14ª", "title": "Banco de Horas", "body": [
                ["O banco de horas passa a observar ", m("prazo máximo de compensação de 4 (quatro) meses", "r2"), ", findo o qual as horas não compensadas serão quitadas como extraordinárias."]]},
            {"kind": "clause", "num": "Cláusula 12ª", "title": "Adicional Noturno", "body": [
                ["Mantém-se o adicional noturno de ", m("25% (vinte e cinco por cento)", "r3"), " sobre a hora diurna, computada a hora noturna como de 52 minutos e 30 segundos."]]},
        ]],
        "changes": [
            {"id": "r1", "type": "config", "clause": "Cláusula 11ª", "title": "Overtime bands raised to 70% / 100%",
             "change": "Renewal raises both overtime bands: first 2 daily hours to +70%, subsequent to +100%.",
             "current": "First 2h +60% · after +80%", "required": "First 2h +70% · after +100%",
             "mapping": "Overtime → premium bands (additive-on-base)", "confidence": 96,
             "action": "Update both band multipliers. Every tenant under the São Paulo retail layer inherits this — check the fan-out list before committing."},
            {"id": "r2", "type": "conflict", "clause": "Cláusula 14ª", "title": "Hours-bank window shortened to 4 months",
             "change": "The renewal shortens the bank compensation cycle from 6 to 4 months.",
             "current": "Expiry window: 6 months", "required": "Expiry window: 4 months",
             "mapping": "Hours Bank → cycle expiry window", "confidence": 94,
             "action": "Shortening the window strands any balance older than four months. Recompute open balances before the cycle closes, then set the window."},
            {"id": "r3", "type": "supported", "clause": "Cláusula 12ª", "title": "Night premium unchanged at 25%",
             "change": "Night premium and the reduced night hour carry over unchanged.",
             "current": "Night premium +25%", "required": "Night premium +25%",
             "mapping": "Night premium → rate", "confidence": 97, "action": "No action. Carried over from the prior edition."},
        ],
    },
    {
        "title": "Nurses Award MA000034 — Variation 2026",
        "subtitle": "Fair Work Commission · shift penalties",
        "family": "Nurses Award 2020 (MA000034)", "jurisdiction": "AU", "lang": "en",
        "doc_type": DocType.award, "policy_key": "au-award-1",
        "source": f"{AGENT_SOURCE_PREFIX}Fair Work Commission",
        "renewal_of": None,
        "pages": [[
            {"kind": "para", "body": ["Determination varying the Nurses Award 2020 in relation to shift penalties, broken shifts, and overtime for part-time employees."]},
            {"kind": "clause", "num": "cl. 20.2", "title": "Shift penalties", "body": [
                ["An afternoon shift attracts ", m("a loading of 12.5% and a night shift 15% of the minimum hourly rate", "u1"), ", payable for the whole of the shift."]]},
            {"kind": "clause", "num": "cl. 20.5", "title": "Broken shift allowance", "body": [
                ["An employee required to work a broken shift is entitled to ", m("an allowance per broken shift, and the span of the broken shift must not exceed 12 hours", "u2"), "."]]},
            {"kind": "clause", "num": "cl. 22.3", "title": "Part-time overtime", "body": [
                ["A part-time employee is entitled to overtime for hours worked ", m("in excess of the rostered hours agreed with the employee, not only beyond 38 hours per week", "u3"), "."]]},
        ]],
        "changes": [
            {"id": "u1", "type": "config", "clause": "cl. 20.2", "title": "Shift loadings 12.5% afternoon / 15% night",
             "change": "Whole-of-shift loadings for afternoon and night shifts, expressed on the minimum hourly rate.",
             "current": "not set", "required": "Afternoon +12.5% · night +15% (whole shift)",
             "mapping": "Night premium → whole-shift loading by shift type", "confidence": 94,
             "action": "Configure two shift-type loadings that apply to the entire shift, not only the in-window hours — a different mechanic from a night-window premium."},
            {"id": "u3", "type": "gap", "clause": "cl. 22.3", "title": "Part-time overtime beyond agreed rostered hours",
             "change": "Part-time overtime triggers on the individually agreed roster, not the 38-hour full-time threshold.",
             "current": "Weekly threshold per policy", "required": "Per-employee agreed-hours threshold",
             "mapping": "Overtime → per-employee threshold — not supported", "confidence": 85,
             "action": "Engine capability gap. The overtime threshold is per-employee here, not per-policy; log to the backlog — it blocks any AU part-time nursing roster."},
            {"id": "u2", "type": "gap", "clause": "cl. 20.5", "title": "Broken-shift allowance with a 12h span cap",
             "change": "A per-occurrence allowance plus a 12-hour cap on the span of the broken shift.",
             "current": "Not modeled", "required": "Broken-shift allowance · 12h span cap",
             "mapping": "Allowances → per-occurrence + daily span cap — not supported", "confidence": 83,
             "action": "Engine capability gap. Per-occurrence allowances and span caps are both unmodeled; log to the backlog."},
        ],
    },
    {
        "title": "Tarifvertrag Einzelhandel NRW 2027",
        "subtitle": "Entgelttarifvertrag · Neuabschluss",
        "family": "Tarifvertrag Einzelhandel NRW", "jurisdiction": "DE", "lang": "de",
        "doc_type": DocType.tarifvertrag, "policy_key": "de-eh",
        "source": f"{AGENT_SOURCE_PREFIX}ver.di Tarifarchiv",
        "renewal_of": "Tarifvertrag Einzelhandel NRW",
        "pages": [[
            {"kind": "para", "body": ["Entgelttarifvertrag für den Einzelhandel in Nordrhein-Westfalen, Neuabschluss 2027, ersetzt den vorangehenden Tarifvertrag mit Wirkung zum Inkrafttreten."]},
            {"kind": "clause", "num": "§ 3", "title": "Regelmäßige Arbeitszeit", "body": [
                ["Die regelmäßige wöchentliche Arbeitszeit beträgt ", m("36,5 Stunden ausschließlich der Pausen", "t1"), "."]]},
            {"kind": "clause", "num": "§ 4", "title": "Mehrarbeitszuschlag", "body": [
                ["Für Mehrarbeit wird ein ", m("Zuschlag von 30 %", "t2"), " auf den Stundenlohn gewährt."]]},
            {"kind": "clause", "num": "§ 5", "title": "Nachtzuschlag", "body": [
                ["Für Nachtarbeit nach 20:00 Uhr wird ein ", m("Zuschlag von 25 %", "t3"), " gezahlt."]]},
        ]],
        "changes": [
            {"id": "t1", "type": "config", "clause": "§ 3", "title": "Weekly hours cut to 36.5",
             "change": "The new agreement reduces the regular week from 37.5 to 36.5 hours excluding breaks.",
             "current": "37.5h weekly", "required": "36.5h weekly",
             "mapping": "Journey → weekly limit", "confidence": 96,
             "action": "Lower the weekly threshold. Overtime now begins an hour earlier, so the OT volume forecast changes with it."},
            {"id": "t2", "type": "config", "clause": "§ 4", "title": "Overtime surcharge 30%",
             "change": "Mehrarbeit surcharge raised from 25% to 30%.",
             "current": "+25%", "required": "+30%",
             "mapping": "Overtime → surcharge rate", "confidence": 95,
             "action": "Raise the surcharge to 30%, effective with the new agreement — not retroactively."},
            {"id": "t3", "type": "config", "clause": "§ 5", "title": "Night surcharge 25% after 20:00",
             "change": "Night surcharge raised from 20% to 25% for work after 20:00.",
             "current": "+20% after 20:00", "required": "+25% after 20:00",
             "mapping": "Night premium → rate", "confidence": 95,
             "action": "Raise the night surcharge to 25%; the 20:00 window boundary is unchanged."},
        ],
    },
]

# The renewals lead, because "is this a new edition of something we already track?" is the Phase-2
# question worth demonstrating first. Behind them sits every corpus document the curated inbox left
# out, so the pool doesn't run dry if a demo runs several scans back to back.
SCAN_POOL = _RENEWALS + [m for m in EXTRA_DOCS if m["title"] not in DEMO_INBOX_TITLES]


def insert_document(db, meta: dict, found_at: datetime, policy: PayPolicy | None) -> Document:
    """Materialize one corpus entry (document + its findings) as of `found_at`. Does not commit."""
    doc = Document(
        jurisdiction=meta["jurisdiction"],
        cba_name=meta["family"],
        doc_type=meta["doc_type"],
        title=meta["title"],
        subtitle=meta["subtitle"],
        source=meta["source"],
        language=meta["lang"],
        status=meta.get("status", DocStatus.analyzed),
        pages=_transform_pages(meta["pages"]),
        policy=policy,
        created_at=found_at,
        updated_at=found_at,
    )
    db.add(doc)

    for i, ch in enumerate(meta["changes"]):
        quote, page = _find_quote(meta["pages"], ch["id"])
        if quote is None:
            quote, page = ch["change"], 1
        conf, basis = _confidence(ch["confidence"])
        finding = Finding(
            document=doc,
            classification=_EXTRA_CLASSIFICATION[ch["type"]],
            clause_ref=ch["clause"],
            title=ch["title"],
            source_quote=quote,
            page=page,
            rule_summary=ch["change"],
            policy_tab=_policy_tab(ch["mapping"], ch["title"]),
            policy_field=ch["mapping"],
            capability_code=_capability_code(ch["mapping"], ch["title"]),
            current_value=ch["current"],
            proposed_value=ch["required"],
            rationale=ch["action"],
            confidence=conf,
            confidence_basis=basis,
            clause_family=_clause_family(ch["mapping"], ch["title"]),
        )
        # An in-review document is mid-queue: its first finding is already decided, which is what puts
        # it in `in_review` and gives the reviewer a resumable document to pick up.
        if doc.status == DocStatus.in_review and i == 0:
            finding.review_status = ReviewStatus.approved
            finding.reviewer = "demo"
            finding.reviewer_name = "Demo Reviewer"
            finding.reviewed_at = found_at
            finding.confidence = Confidence.high
        db.add(finding)
    return doc


def seed_extra_documents(db, log) -> None:
    """Add the curated inbox share of `EXTRA_DOCS` if it isn't in the database yet.

    Safe to call on every startup. Everything outside `DEMO_INBOX_TITLES` is deliberately skipped —
    it lives in `SCAN_POOL` instead, so the scanner has something real to find.
    """
    existing = {t for (t,) in db.query(Document.title).all()}
    policies = {p.key: p for p in db.query(PayPolicy).all()}
    if not policies:
        return  # first boot hasn't seeded the layers yet; the next startup picks these up

    now = datetime.now(timezone.utc)
    n_docs = n_findings = 0
    for meta in EXTRA_DOCS:
        if meta["title"] not in DEMO_INBOX_TITLES or meta["title"] in existing:
            continue
        insert_document(db, meta, now - timedelta(hours=meta["found_h"]), policies.get(meta["policy_key"]))
        n_docs += 1
        n_findings += len(meta["changes"])

    if n_docs:
        db.commit()
        log.info("Seeded %d statutory/state documents with %d findings.", n_docs, n_findings)
