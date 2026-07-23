"""Idempotent demo seed — transcribes the React prototype's hard-coded sample
data (`POLICIES` + `DOCS` in prototype/src/app.jsx) into database rows so the app
is fully populated on first run.

`seed_if_empty(db, log)` creates one demo user, every pay policy, every document
with its findings, and — for the single reviewed document (de-eh-2026) — the
verified output (Rule + ConfigValue) so those lists are non-empty out of the box.
Everything commits once at the end; the function returns immediately if the DB is
already seeded.
"""
from __future__ import annotations

import re
from datetime import datetime, timezone

from .models import (
    Classification,
    ConfigValue,
    Confidence,
    Document,
    DocStatus,
    DocType,
    Finding,
    LayerType,
    PayPolicy,
    PolicyVersion,
    ReviewStatus,
    Rule,
    UnsupportedCalculation,
    User,
)
from .security import hash_password


# --- source data (transcribed from prototype/src/app.jsx) --------------------

def m(t: str, c: str) -> dict:
    """A marked run inside a paragraph (mirrors the prototype's `m(t, c)`)."""
    return {"t": t, "c": c}


# Pay policies — the comparison target (prototype POLICIES).
POLICIES = [
    {"id": "ref-base", "flag": "\U0001F310", "name": "Reference — day.io Sample (Policy Learning)", "sub": "from pay-policy-configuration.md"},
    {"id": "br-retail", "flag": "\U0001F1E7\U0001F1F7", "name": "Brazil — Retail Standard", "sub": "CCT Comércio SP"},
    {"id": "br-botic", "flag": "\U0001F1E7\U0001F1F7", "name": "Brazil — Boticário Franchises", "sub": "Franquias"},
    {"id": "br-log", "flag": "\U0001F1E7\U0001F1F7", "name": "Brazil — Logistics", "sub": "Transporte SP"},
    {"id": "fr-syntec", "flag": "\U0001F1EB\U0001F1F7", "name": "France — Syntec Baseline", "sub": "CCN 1486"},
    {"id": "mx-retail", "flag": "\U0001F1F2\U0001F1FD", "name": "Mexico — Retail Baseline", "sub": "LFT"},
    {"id": "de-eh", "flag": "\U0001F1E9\U0001F1EA", "name": "Germany — Einzelhandel NRW", "sub": "Tarifvertrag"},
]

# Representative current-state config per policy (the values a document is compared against — the
# "current" side of each finding). Structured six-tab shape (app/pay_policy_schema.py): each field is
# keyed by its 17-taxonomy capability code under the pay-policy tab a reviewer edits.
POLICY_CONFIG = {
    "ref-base": {
        "Paid Overtime": {
            "OT/d": "Rate rows 50% / 100% (Specific days · Percentage)",
            "BH": "ON · 2-month compensation cycle · missing days: reduce from bank + mark · positive/negative balance at expiry: do nothing (keep as expired)",
        },
        "Hours Distribution": {"Not": "20% · window 22:00-05:00 · shift starting in-window counts entirely as night"},
        "Tolerance": {"Tol": "10 min · per punch"},
        "On Call": {"OnCall": "Follow pay policies"},
        "Special Rules": {"Inter": "11h minimum inter-shift rest"},
    },
    "br-retail": {
        "Paid Overtime": {"OT/d": "+50% first 2h / +70% after", "BH": "12-month compensation window", "Sun/Hol": "+50%"},
        "Hours Distribution": {"Not": "+20%"},
        "Tolerance": {"Tol": "5 min per punch · 10 min daily"},
    },
    "br-botic": {
        "Paid Overtime": {"OT/d": "+60%", "Jorn": "44h weekly"},
        "Special Rules": {"Intra": "1h meal break"},
    },
    "br-log": {
        "Paid Overtime": {"OT/d": "+50% first 2h"},
        "Hours Distribution": {"Not": "+20%"},
        "On Call": {"OnCall": "waiting time counted as journey"},
        "Special Rules": {"Inter": "11h daily rest"},
    },
    "fr-syntec": {
        "Paid Overtime": {"OT/d": "+25% flat", "OT wk/mo": "130h annual contingent · no comp-rest"},
        "Special Rules": {"Inter": "11h daily rest", "forfait_jours": "hours-based tracking only"},
    },
    "mx-retail": {
        "Paid Overtime": {"Jorn": "48h weekly", "OT/d": "+100%", "Sun/Hol": "not set", "OT wk/mo": "no weekly-cap phase-in"},
    },
    "de-eh": {
        "Paid Overtime": {"OT/d": "+20%", "Jorn": "37.5h weekly"},
        "Hours Distribution": {"Not": "+20% after 20:00"},
        "Special Rules": {"Inter": "11h daily rest", "Abono": "36 vacation days"},
    },
}

# A fully-configured pay policy — every capability across all six tabs set (from
# pay-policy-configuration.md). Used by the "Reference — Full Configuration" layer so the pay-policy
# view shows a complete config, not a thin one.
FULL_CONFIG = {
    "Paid Overtime": {
        "Jorn": "44h/week · 8h/day standard; daily & weekly OT thresholds set",
        "OT/d": "Specific days · Percentage; +50% first 2h → +100% after; day/night split off",
        "OT wk/mo": "weekly OT beyond 44h at +50%",
        "BH": "ON · 2-month cycle · reset cyclically (3 cycles before reset) · missing days: reduce from bank + mark · hide summary: off",
        "BH->pay": "positive balance at expiry → convert to Extra Hours (with multiplier); negative → carry forward",
        "Sun/Hol": "Sunday & holidays worked → +100% (dobra)",
        "Sun-rot": "rest-day rotation; a Sunday folga at least every 3 weeks",
    },
    "Hours Distribution": {
        "Not": "adicional noturno +20% · window 22:00–05:00 · shift starting in-window counts entirely as night",
        "Not-prg": "night premium extends to the full range after the night window (prorrogação, Súmula 60 II)",
        "Not-red": "hora noturna reduzida — 52'30\" counts as 60'",
    },
    "Tolerance": {
        "Tol": "5 min per punch · 10 min daily · per punch · breaks excluded",
    },
    "On Call": {
        "OnCall": "Follow pay policies · availability and activation paid separately",
    },
    "Special Rules": {
        "Intra": "intrajornada 1h meal break (shifts > 6h); partial suppression → indemnify suppressed portion +50%",
        "Inter": "interjornada 11h minimum rest between shifts",
        "12x36": "12×36 shift scale enabled",
        "Sem-esp": "semana espanhola — Saturday suppression enabled",
        "Abono": "faltas abonadas — conditional paid-absence triggers configured",
    },
}

_FLAG = {"US": "\U0001F1FA\U0001F1F8", "FR": "\U0001F1EB\U0001F1F7", "AU": "\U0001F1E6\U0001F1FA",
         "DE": "\U0001F1E9\U0001F1EA", "BR": "\U0001F1E7\U0001F1F7", "CA": "\U0001F1E8\U0001F1E6",
         "IN": "\U0001F1EE\U0001F1F3", "ES": "\U0001F1EA\U0001F1F8", "MX": "\U0001F1F2\U0001F1FD"}


def _synthetic_layers() -> list[dict]:
    """Generate demo layers so the Layers tab can be exercised at scale: 5 countries, 15
    states/provinces (worldwide), 5 US CBAs, 5 AU Awards, 5 FR CCNs, plus one fully-configured
    reference layer. Configs are light (a couple of capabilities) except the full one."""
    out: list[dict] = []

    def add(key, name, jur, layer_type, subtitle, config):
        cc = jur.split("-")[0]
        out.append(dict(key=key, name=name, flag=_FLAG.get(cc, "\U0001F3F3️"), jurisdiction=jur,
                        layer_type=layer_type, subtitle=subtitle, config=config))

    # 5 country baselines (statutory floor)
    for code, name in [("US", "United States — Federal (FLSA)"), ("FR", "France — Code du travail"),
                       ("AU", "Australia — National Employment Standards"),
                       ("CA", "Canada — Canada Labour Code"), ("IN", "India — Central labour codes")]:
        add(f"ctry-{code.lower()}", name, code, LayerType.country, "Statutory floor",
            {"Paid Overtime": {"OT/d": "statutory minimum overtime premium"}})

    # 15 states/provinces from all over the world
    states = [("US-CA", "California"), ("US-NY", "New York"), ("US-TX", "Texas"),
              ("CA-ON", "Ontario"), ("CA-QC", "Québec"), ("CA-BC", "British Columbia"),
              ("AU-NSW", "New South Wales"), ("AU-VIC", "Victoria"),
              ("DE-NRW", "North Rhine-Westphalia"), ("DE-BY", "Bavaria"),
              ("BR-SP", "São Paulo"), ("BR-RJ", "Rio de Janeiro"),
              ("IN-MH", "Maharashtra"), ("IN-KA", "Karnataka"), ("ES-MD", "Madrid")]
    for code, name in states:
        add(f"state-{code.lower()}", f"{name} — state/provincial rules", code, LayerType.state,
            f"{code} · {name}", {"Hours Distribution": {"Not": "state night premium"}})

    # 5 US CBAs
    for i, (nm, sub) in enumerate([
        ("UAW–Ford Master Agreement", "Automotive · US-MI"),
        ("Teamsters National Master Freight", "Freight · US"),
        ("SEIU-UHW Healthcare", "Healthcare · US-CA"),
        ("IBEW Local 3", "Electrical · US-NY"),
        ("IATSE Basic Agreement", "Film/TV · US-CA")]):
        add(f"us-cba-{i+1}", nm, "US", LayerType.cba, sub,
            {"Paid Overtime": {"OT/d": "+50% after 8h/day", "Sun/Hol": "+100% holidays"}})

    # 5 AU Awards (Australia's CBA family)
    for i, (nm, sub) in enumerate([
        ("Nurses Award 2020 (MA000034)", "Health · AU"),
        ("General Retail Industry Award (MA000004)", "Retail · AU"),
        ("Hospitality (General) Award (MA000009)", "Hospitality · AU"),
        ("Clerks—Private Sector Award (MA000002)", "Clerical · AU"),
        ("Building & Construction Award (MA000020)", "Construction · AU")]):
        add(f"au-award-{i+1}", nm, "AU", LayerType.cba, sub,
            {"Paid Overtime": {"OT/d": "150% first 2–3h then 200%", "Sun/Hol": "Sat 150% · Sun 200%"}})

    # 5 FR CCNs (France's CBA family)
    for i, (nm, sub) in enumerate([
        ("Syntec (IDCC 1486)", "Consulting/IT · FR"),
        ("Métallurgie (IDCC 3248)", "Metallurgy · FR"),
        ("HCR — Hôtels Cafés Restaurants (IDCC 1979)", "Hospitality · FR"),
        ("Bâtiment (IDCC 1596)", "Construction · FR"),
        ("Transport routier (IDCC 16)", "Transport · FR")]):
        add(f"fr-ccn-{i+1}", nm, "FR", LayerType.cba, sub,
            {"Paid Overtime": {"OT/d": "+25% first 8h then +50%"}, "Special Rules": {"Inter": "11h rest"}})

    # the fully-configured reference layer (every capability across all six tabs)
    out.append(dict(key="ref-full", name="Reference — Full Configuration (all tabs)", flag="\U0001F310",
                    jurisdiction="—", layer_type=LayerType.company,
                    subtitle="every capability set — from pay-policy-configuration.md", config=FULL_CONFIG))
    return out


# Initial status per document (prototype `statuses` map).
STATUSES = {
    "br-cct-sp-2026": "ready",
    "br-cct-sp-adit": "new",
    "br-botic-2026": "analyzing",
    "br-log-2026": "ready",
    "br-pec-6x1": "new",
    "fr-syntec-2026": "ready",
    "mx-40h": "new",
    "de-eh-2026": "reviewed",
}

# Documents — metadata + rendered source ("PDF") + gap analysis (prototype DOCS).
DOCS = {
    "br-cct-sp-2026": {
        "title": "CCT Comércio Varejista — São Paulo",
        "subtitle": "Convenção Coletiva de Trabalho 2026/2027",
        "family": "CCT Comércio Varejista SP", "country": "Brazil",
        "kind": "CCT", "lang": "pt",
        "source": "Sindicato dos Comerciários de SP", "policyId": "br-retail",
        "pages": [
            [
                {"kind": "para", "body": ["Pelo presente instrumento, as entidades sindicais acima qualificadas celebram a presente Convenção Coletiva de Trabalho, estipulando as condições de trabalho previstas nas cláusulas seguintes, aplicáveis à categoria do comércio varejista na base territorial das entidades convenentes."]},
                {"kind": "clause", "num": "Cláusula 1ª", "title": "Vigência e Abrangência", "body": [
                    ["A presente Convenção Coletiva de Trabalho vigorará pelo prazo de 12 (doze) meses, aplicando-se a todos os empregados no comércio varejista representados pelas entidades convenentes, na base territorial do Estado de São Paulo, independentemente da forma de contratação."]]},
                {"kind": "clause", "num": "Cláusula 2ª", "title": "Reajuste Salarial", "body": [
                    ["Os salários da categoria serão reajustados no percentual correspondente à variação acumulada do índice oficial de preços no período, aplicado sobre os salários vigentes no mês anterior à data-base, compensadas as antecipações espontaneamente concedidas."]]},
                {"kind": "clause", "num": "Cláusula 3ª", "title": "Piso Salarial da Categoria", "body": [
                    ["Fica assegurado o piso salarial da categoria, vedada a admissão de empregado com remuneração inferior ao valor estabelecido, ressalvadas as jornadas contratadas em regime de tempo parcial, reduzidas proporcionalmente."]]},
                {"kind": "clause", "num": "Cláusula 4ª", "title": "Vale-Refeição e Cesta Básica", "body": [
                    ["As empresas fornecerão vale-refeição ou vale-alimentação a seus empregados, sem natureza salarial, nos termos do Programa de Alimentação do Trabalhador (PAT), facultada a coparticipação do empregado no limite legal."]]},
                {"kind": "clause", "num": "Cláusula 5ª", "title": "Vale-Transporte", "body": [
                    ["O vale-transporte será concedido a todos os empregados que dele necessitarem para o deslocamento residência-trabalho e vice-versa, observado o desconto legal máximo de 6% (seis por cento) sobre o salário-base."]]},
            ],
            [
                {"kind": "clause", "num": "Cláusula 6ª", "title": "Assistência Médica e Odontológica", "body": [
                    ["As empresas manterão plano de assistência médica e odontológica em benefício de seus empregados, facultada a coparticipação nas condições definidas entre as partes, sem que tais valores integrem a remuneração para quaisquer fins."]]},
                {"kind": "clause", "num": "Cláusula 7ª", "title": "Gratificação de Função", "body": [
                    ["Ao empregado que exercer função de confiança será devida gratificação de função não inferior a 40% (quarenta por cento) do salário do cargo efetivo, incorporável na forma da lei e da jurisprudência aplicável."]]},
                {"kind": "clause", "num": "Cláusula 8ª", "title": "Uniformes e Equipamentos de Proteção", "body": [
                    ["Quando exigido o uso de uniforme, este será fornecido gratuitamente pelo empregador, assim como os equipamentos de proteção individual necessários ao exercício das atividades, mediante recibo e substituição quando danificados."]]},
                {"kind": "clause", "num": "Cláusula 9ª", "title": "Estabilidade Provisória", "body": [
                    ["Fica assegurada estabilidade provisória à empregada gestante, desde a confirmação da gravidez até 5 (cinco) meses após o parto, e ao empregado a 12 (doze) meses da aquisição do direito à aposentadoria, desde que conte com mais de 5 (cinco) anos de vínculo com a empresa."]]},
            ],
            [
                {"kind": "clause", "num": "Cláusula 10ª", "title": "Jornada de Trabalho", "body": [
                    ["A duração normal do trabalho será de ", m("44 (quarenta e quatro) horas semanais", "c1"), ", não excedendo 8 (oito) horas diárias, ressalvadas as hipóteses de compensação e de jornada reduzida previstas nesta Convenção."]]},
                {"kind": "clause", "num": "Cláusula 11ª", "title": "Horas Extraordinárias", "body": [
                    ["As horas extraordinárias serão remuneradas com adicional de ", m("60% (sessenta por cento) para as duas primeiras horas diárias e 80% (oitenta por cento) para as horas subsequentes", "c2"), ", calculado sobre o valor da hora normal."],
                    ["Para efeito de apuração, será observado o registro individual de cada marcação de ponto, vedado o cômputo por médias ou totais."]]},
                {"kind": "clause", "num": "Cláusula 12ª", "title": "Adicional Noturno", "body": [
                    ["O trabalho noturno, prestado entre 22h e 5h, terá adicional de ", m("25% (vinte e cinco por cento)", "c3"), " sobre a hora diurna, computada a hora noturna como de 52 (cinquenta e dois) minutos e 30 (trinta) segundos."]]},
                {"kind": "clause", "num": "Cláusula 13ª", "title": "Intervalo Intrajornada", "body": [
                    ["Na hipótese de concessão parcial do intervalo intrajornada, será devido o pagamento, de natureza indenizatória, ", m("apenas do período suprimido, com acréscimo de 50% (cinquenta por cento)", "c4"), ", nos termos do art. 71, §4º, da CLT."]]},
            ],
            [
                {"kind": "clause", "num": "Cláusula 14ª", "title": "Banco de Horas", "body": [
                    ["As horas excedentes poderão ser compensadas mediante banco de horas, ", m("com prazo máximo de compensação de 6 (seis) meses", "c5"), ", findo o qual as horas não compensadas serão quitadas como extraordinárias, com o respectivo adicional."]]},
                {"kind": "clause", "num": "Cláusula 15ª", "title": "Descanso Semanal Remunerado", "body": [
                    ["O valor das ", m("horas extraordinárias habituais integrará a base de cálculo do descanso semanal remunerado", "c6"), " (DSR), na forma da Súmula nº 172 do TST."]]},
                {"kind": "clause", "num": "Cláusula 16ª", "title": "Tolerância de Marcação", "body": [
                    ["Serão desconsideradas as variações de ", m("até 5 (cinco) minutos por marcação, limitadas a 10 (dez) minutos diários", "c7"), ", não computadas como jornada extraordinária, nos termos do art. 58, §1º, da CLT."]]},
                {"kind": "clause", "num": "Cláusula 17ª", "title": "Trabalho aos Domingos e Feriados", "body": [
                    ["O trabalho aos domingos e feriados, quando não compensado por folga na mesma semana, será remunerado ", m("em dobro", "c8"), ", sem prejuízo da remuneração do descanso semanal."]]},
            ],
            [
                {"kind": "clause", "num": "Cláusula 18ª", "title": "Contribuição Assistencial", "body": [
                    ["Os empregadores descontarão dos empregados, em favor do sindicato profissional, a contribuição assistencial aprovada em assembleia geral da categoria, assegurado ao trabalhador o direito de oposição no prazo e na forma da lei."]]},
                {"kind": "clause", "num": "Cláusula 19ª", "title": "Comissão de Conciliação Prévia", "body": [
                    ["As partes reconhecem a Comissão de Conciliação Prévia como instância de tentativa de solução dos conflitos individuais do trabalho, sem prejuízo do livre acesso ao Poder Judiciário."]]},
                {"kind": "clause", "num": "Cláusula 20ª", "title": "Multa por Descumprimento", "body": [
                    ["O descumprimento de qualquer cláusula desta Convenção sujeitará a parte infratora ao pagamento de multa equivalente a 1 (um) piso salarial da categoria, por empregado prejudicado e por infração, revertida em favor da parte prejudicada."]]},
                {"kind": "clause", "num": "Cláusula 21ª", "title": "Disposições Gerais", "body": [
                    ["Os casos omissos serão resolvidos pelas entidades convenentes mediante negociação, prevalecendo, no que não contrariar esta Convenção, as disposições legais aplicáveis à categoria."]]},
                {"kind": "para", "body": ["E, por estarem assim justas e convencionadas, firmam as partes o presente instrumento para que produza seus jurídicos e legais efeitos."]},
            ],
        ],
        "changes": [
            {"id": "c1", "type": "supported", "clause": "Cláusula 10ª", "title": "Weekly hours 44h / 8h daily",
             "change": "Standard journey of 44h weekly, 8h daily. Matches the active policy exactly.",
             "current": "44h weekly · 8h daily", "required": "44h weekly · 8h daily",
             "mapping": "Journey → weekly & daily limits", "confidence": 98,
             "action": "No action. Policy is already aligned."},
            {"id": "c2", "type": "config", "clause": "Cláusula 11ª", "title": "Overtime bands raised to 60% / 80%",
             "change": "New tiered overtime: first 2 daily hours at +60%, subsequent hours at +80%.",
             "current": "First 2h +50% · after +70%", "required": "First 2h +60% · after +80%",
             "mapping": "Overtime → premium bands (additive-on-base)", "confidence": 96,
             "action": "Update the two OT band multipliers. Rounding stays at the punch level per the clause — daily/weekly totals are unaffected."},
            {"id": "c3", "type": "config", "clause": "Cláusula 12ª", "title": "Night premium raised to 25%",
             "change": "Night premium set above the CLT floor; reduced 52′30″ night hour unchanged.",
             "current": "Night premium +20% (CLT floor)", "required": "Night premium +25%",
             "mapping": "Night premium → rate", "confidence": 97,
             "action": "Raise the night premium rate to 25%. Reduced-hour handling already matches."},
            {"id": "c4", "type": "gap", "clause": "Cláusula 13ª", "title": "Partial intrajornada — indemnify suppressed portion only",
             "change": "Post-reform rule: pay only the suppressed portion of the meal break, +50%, as indemnity.",
             "current": "Engine pays the full interval as penalty", "required": "Indemnify suppressed minutes only, +50%",
             "mapping": "Intrajornada → partial-suppression indemnity — not supported", "confidence": 89,
             "action": "Engine capability gap. Log to the Roseman backlog; handle manually until the partial-suppression case ships."},
            {"id": "c5", "type": "conflict", "clause": "Cláusula 14ª", "title": "Hours-bank window is 6 months — policy says 12",
             "change": "Agreement caps the bank compensation cycle at 6 months; the active policy is set to 12.",
             "current": "Expiry window: 12 months", "required": "Expiry window: 6 months",
             "mapping": "Hours Bank → cycle expiry window", "confidence": 95,
             "action": "Policy is out of compliance. Set the expiry window to 6 months and recompute open-balance exposure before the next cycle closes."},
            {"id": "c6", "type": "config", "clause": "Cláusula 15ª", "title": "DSR reflex on habitual overtime",
             "change": "Habitual OT must feed the DSR base (Súmula 172). Currently disabled.",
             "current": "DSR-over-OT reflex: off", "required": "DSR-over-OT reflex: on",
             "mapping": "DSR → habitual-OT reflex accumulation", "confidence": 92,
             "action": "Enable the DSR reflex on habitual OT. Note it compounds with the new bands in Cláusula 11ª (c2)."},
            {"id": "c7", "type": "supported", "clause": "Cláusula 16ª", "title": "Punch tolerance 5 min / 10 min daily",
             "change": "Statutory tolerance window. Matches the engine's configured tolerance.",
             "current": "5 min per punch · 10 min daily", "required": "5 min per punch · 10 min daily",
             "mapping": "Punch tolerance window", "confidence": 99,
             "action": "No action. Aligned."},
            {"id": "c8", "type": "config", "clause": "Cláusula 17ª", "title": "Sunday & holiday pay — double",
             "change": "Uncompensated Sunday/holiday work paid at double (100% additional).",
             "current": "Sunday premium +50%", "required": "Sunday/holiday +100% (double) when uncompensated",
             "mapping": "Sunday/Holiday premium → rate", "confidence": 90,
             "action": "Set the Sunday/holiday premium to 100% additional for days not offset by a same-week rest day."},
        ],
    },

    "fr-syntec-2026": {
        "title": "Syntec — CCN 1486", "subtitle": "Avenant 2026 · heures & forfait",
        "family": "Syntec — CCN 1486", "country": "France",
        "kind": "Amendment", "lang": "fr",
        "source": "Legifrance", "policyId": "fr-syntec",
        "pages": [
            [
                {"kind": "para", "body": ["Le présent avenant modifie les dispositions de la convention collective nationale des bureaux d'études techniques (Syntec) relatives à la durée du travail."]},
                {"kind": "clause", "num": "Article 1", "title": "Champ d'application", "body": [
                    ["Le présent avenant s'applique à l'ensemble des salariés relevant de la convention collective nationale des bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseil (IDCC 1486)."]]},
                {"kind": "clause", "num": "Article 2", "title": "Durée du travail", "body": [
                    ["La durée légale du travail effectif est fixée à 35 heures par semaine. Les modalités d'aménagement sur l'année sont définies par accord d'entreprise, dans le respect des dispositions de branche."]]},
                {"kind": "clause", "num": "Article 3", "title": "Heures supplémentaires", "body": [
                    ["Les heures supplémentaires donnent lieu à une majoration de ", m("25 % pour les huit premières heures et 50 % au-delà", "c1"), ", calculée sur le taux horaire de base."]]},
                {"kind": "clause", "num": "Article 4", "title": "Forfait annuel en jours", "body": [
                    ["Le personnel autonome peut être soumis à un ", m("forfait de 218 jours travaillés par an, avec suivi de la charge de travail", "c3"), ", à l'exclusion de tout décompte horaire."]]},
            ],
            [
                {"kind": "clause", "num": "Article 5", "title": "Repos quotidien", "body": [
                    ["Chaque salarié bénéficie d'un ", m("repos quotidien minimal de 11 heures consécutives", "c2"), " entre deux journées de travail."]]},
                {"kind": "clause", "num": "Article 6", "title": "Contingent d'heures supplémentaires", "body": [
                    ["Au-delà du ", m("contingent annuel de 220 heures, une contrepartie obligatoire en repos est due", "c4"), ", en sus des majorations prévues à l'article 3."]]},
                {"kind": "clause", "num": "Article 7", "title": "Compte épargne-temps", "body": [
                    ["Les salariés peuvent affecter à un compte épargne-temps les jours de repos non pris, dans les limites et selon les modalités fixées par accord d'entreprise."]]},
                {"kind": "clause", "num": "Article 8", "title": "Date d'effet et durée", "body": [
                    ["Le présent avenant entre en vigueur à sa date d'application et est conclu pour une durée indéterminée. Il pourra être révisé ou dénoncé dans les conditions légales."]]},
                {"kind": "para", "body": ["Fait à Paris, en un nombre suffisant d'exemplaires originaux pour dépôt auprès des services compétents."]},
            ],
        ],
        "changes": [
            {"id": "c1", "type": "config", "clause": "Article 3", "title": "Overtime bands 25% / 50%",
             "change": "First 8 overtime hours at +25%, beyond at +50%.",
             "current": "Flat +25%", "required": "+25% (first 8h) · +50% (beyond)",
             "mapping": "Overtime → premium bands (additive-on-base)", "confidence": 95,
             "action": "Split the OT rate into two bands."},
            {"id": "c2", "type": "supported", "clause": "Article 5", "title": "Daily rest 11 hours",
             "change": "Minimum 11h consecutive daily rest — matches policy.",
             "current": "11h daily rest", "required": "11h daily rest",
             "mapping": "Rest rules → daily minimum", "confidence": 98, "action": "No action. Aligned."},
            {"id": "c3", "type": "gap", "clause": "Article 4", "title": "Forfait-jours (218 days) tracking",
             "change": "Day-based annual forfait with workload monitoring, no hourly count.",
             "current": "Hours-based tracking only", "required": "Day-count forfait with charge monitoring",
             "mapping": "Forfait-jours — not supported", "confidence": 87,
             "action": "Engine capability gap. Day-based forfait is unmodeled; log to backlog."},
            {"id": "c4", "type": "conflict", "clause": "Article 6", "title": "OT contingent 220h + mandatory rest counterpart",
             "change": "Annual contingent of 220h with a mandatory compensatory-rest counterpart above it.",
             "current": "Contingent set to 130h · no comp-rest", "required": "220h contingent · comp-rest above",
             "mapping": "OT contingent + compensatory rest", "confidence": 91,
             "action": "Contingent is misconfigured. Set to 220h and enable the compensatory-rest counterpart."},
        ],
    },

    "br-botic-2026": {
        "title": "CCT Boticário", "subtitle": "Convenção 2026/2027 · franquias",
        "family": "CCT Boticário", "country": "Brazil",
        "kind": "CCT", "lang": "pt",
        "source": "Sindicato do Comércio", "policyId": "br-botic",
        "pages": [
            [
                {"kind": "para", "body": ["Pelo presente instrumento, o sindicato profissional e o Grupo Boticário celebram a presente Convenção Coletiva de Trabalho, aplicável aos empregados das franquias na base territorial das entidades convenentes, nos termos das cláusulas seguintes."]},
                {"kind": "clause", "num": "Cláusula 1ª", "title": "Vigência e Abrangência", "body": [
                    ["A presente Convenção vigorará por 12 (doze) meses a contar da data-base, aplicando-se a todos os empregados das unidades franqueadas representadas pelas entidades convenentes."]]},
                {"kind": "clause", "num": "Cláusula 2ª", "title": "Reajuste Salarial", "body": [
                    ["Os salários serão reajustados pelo índice acumulado do período, aplicado sobre a remuneração vigente no mês anterior à data-base, compensadas as antecipações concedidas."]]},
                {"kind": "clause", "num": "Cláusula 3ª", "title": "Piso Salarial", "body": [
                    ["Fica assegurado o piso salarial da categoria, vedada a contratação por valor inferior, ressalvadas as jornadas parciais reduzidas proporcionalmente."]]},
                {"kind": "clause", "num": "Cláusula 4ª", "title": "Vale-Alimentação", "body": [
                    ["As empresas concederão vale-alimentação de natureza não salarial, nos termos do PAT, facultada a coparticipação do empregado no limite legal."]]},
                {"kind": "clause", "num": "Cláusula 5ª", "title": "Vale-Transporte", "body": [
                    ["O vale-transporte será concedido aos empregados que dele necessitarem, com desconto legal máximo de 6% (seis por cento) sobre o salário-base."]]},
                {"kind": "clause", "num": "Cláusula 6ª", "title": "Assistência Médica", "body": [
                    ["As empresas manterão plano de assistência médica em benefício dos empregados, facultada a coparticipação nas condições ajustadas entre as partes."]]},
                {"kind": "clause", "num": "Cláusula 7ª", "title": "Comissões de Venda", "body": [
                    ["As comissões sobre vendas, quando pactuadas, integram a remuneração para todos os efeitos legais e serão apuradas mensalmente, com demonstrativo entregue ao empregado."]]},
            ],
            [
                {"kind": "clause", "num": "Cláusula 8ª", "title": "Horas Extraordinárias", "body": [
                    ["As horas extraordinárias serão remuneradas com adicional de ", m("65% (sessenta e cinco por cento)", "c1"), " sobre a hora normal."]]},
                {"kind": "clause", "num": "Cláusula 9ª", "title": "Intervalo e Alimentação", "body": [
                    ["Fica assegurado o ", m("intervalo intrajornada de 1 (uma) hora", "c2"), " para refeição e descanso nas jornadas superiores a seis horas."]]},
                {"kind": "clause", "num": "Cláusula 10ª", "title": "Acúmulo de Função", "body": [
                    ["O empregado que exercer cumulativamente funções distintas fará jus a ", m("adicional de acúmulo de função de 20%", "c3"), " sobre o salário-base."]]},
                {"kind": "clause", "num": "Cláusula 11ª", "title": "Multa por Descumprimento", "body": [
                    ["O descumprimento de qualquer cláusula sujeitará a parte infratora a multa equivalente a 1 (um) piso salarial por empregado prejudicado, revertida em favor da parte prejudicada."]]},
                {"kind": "clause", "num": "Cláusula 12ª", "title": "Disposições Gerais", "body": [
                    ["Os casos omissos serão dirimidos pelas entidades convenentes, prevalecendo, no que não contrariar esta Convenção, a legislação aplicável à categoria."]]},
                {"kind": "para", "body": ["E, por estarem assim justas e acordadas, firmam as partes o presente instrumento para que produza seus efeitos legais."]},
            ],
        ],
        "changes": [
            {"id": "c1", "type": "config", "clause": "Cláusula 8ª", "title": "Overtime premium 65%",
             "change": "Single OT premium of +65%.", "current": "+60%", "required": "+65%",
             "mapping": "Overtime → premium rate", "confidence": 94, "action": "Update the OT premium rate."},
            {"id": "c2", "type": "supported", "clause": "Cláusula 9ª", "title": "Meal break 1 hour",
             "change": "1h intrajornada for shifts over 6h — matches policy.",
             "current": "1h meal break", "required": "1h meal break",
             "mapping": "Intrajornada → minimum", "confidence": 96, "action": "No action. Aligned."},
            {"id": "c3", "type": "gap", "clause": "Cláusula 10ª", "title": "Function-accumulation premium 20%",
             "change": "Premium for concurrently holding distinct roles.",
             "current": "Not modeled", "required": "+20% on base for accumulation",
             "mapping": "Function-accumulation premium — not supported", "confidence": 85,
             "action": "Engine capability gap. Log to backlog."},
        ],
    },

    "br-log-2026": {
        "title": "CCT Logística e Transporte — SP", "subtitle": "Convenção 2026",
        "family": "CCT Logística e Transporte SP", "country": "Brazil",
        "kind": "CCT", "lang": "pt",
        "source": "SETCESP", "policyId": "br-log",
        "pages": [
            [
                {"kind": "para", "body": ["Pelo presente instrumento, o Sindicato dos Trabalhadores em Transportes e o SETCESP celebram a presente Convenção Coletiva de Trabalho, aplicável aos trabalhadores em transporte e logística na base territorial das entidades convenentes."]},
                {"kind": "clause", "num": "Cláusula 1ª", "title": "Vigência e Abrangência", "body": [
                    ["A presente Convenção vigorará por 12 (doze) meses a contar da data-base, aplicando-se a motoristas, ajudantes e demais empregados das empresas de transporte e logística representadas."]]},
                {"kind": "clause", "num": "Cláusula 2ª", "title": "Reajuste Salarial", "body": [
                    ["Os salários serão reajustados pelo índice acumulado do período, aplicado sobre a remuneração vigente no mês anterior à data-base, compensadas as antecipações concedidas."]]},
                {"kind": "clause", "num": "Cláusula 3ª", "title": "Piso Salarial de Motoristas e Ajudantes", "body": [
                    ["Ficam assegurados os pisos salariais das funções de motorista e de ajudante, vedada a contratação por valor inferior ao estabelecido para cada categoria funcional."]]},
                {"kind": "clause", "num": "Cláusula 4ª", "title": "Diárias de Viagem", "body": [
                    ["As diárias destinadas a alimentação e pernoite em viagem não integram a remuneração, desde que não excedam 50% (cinquenta por cento) do salário mensal, nos termos da lei."]]},
                {"kind": "clause", "num": "Cláusula 5ª", "title": "Seguro de Vida em Grupo", "body": [
                    ["As empresas manterão seguro de vida e acidentes pessoais em grupo em favor dos empregados, com cobertura mínima estabelecida em cláusula específica."]]},
            ],
            [
                {"kind": "clause", "num": "Cláusula 6ª", "title": "Tempo de Espera", "body": [
                    ["Para motoristas profissionais, o ", m("tempo de espera não será computado como jornada, sendo indenizado à razão de 30% do salário-hora", "c1"), ", nos termos da Lei nº 13.103/2015."]]},
                {"kind": "clause", "num": "Cláusula 7ª", "title": "Adicional Noturno", "body": [
                    ["O adicional noturno será de ", m("20% (vinte por cento)", "c2"), ", com hora noturna reduzida de 52min30s."]]},
                {"kind": "clause", "num": "Cláusula 8ª", "title": "Horas Extraordinárias", "body": [
                    ["As horas extras serão pagas com adicional de ", m("50% para as duas primeiras e 70% para as demais", "c3"), "."]]},
                {"kind": "clause", "num": "Cláusula 9ª", "title": "Tempo de Direção e Descanso", "body": [
                    ["Serão observados os limites de tempo de direção e os intervalos de descanso previstos na legislação de trânsito e na Lei nº 13.103/2015, assegurado o repouso diário mínimo."]]},
                {"kind": "clause", "num": "Cláusula 10ª", "title": "Multa por Descumprimento", "body": [
                    ["O descumprimento de qualquer cláusula sujeitará a parte infratora a multa equivalente a 1 (um) piso salarial por empregado prejudicado, revertida em favor da parte prejudicada."]]},
                {"kind": "para", "body": ["E, por estarem assim justas e acordadas, firmam as partes o presente instrumento para que produza seus efeitos legais."]},
            ],
        ],
        "changes": [
            {"id": "c1", "type": "conflict", "clause": "Cláusula 6ª", "title": "Driver waiting time — not journey, indemnified 30%",
             "change": "Waiting time excluded from the journey, paid as a 30% indemnity (Lei 13.103).",
             "current": "Waiting time counted as journey", "required": "Excluded · indemnify at 30% of hourly wage",
             "mapping": "Journey → waiting-time treatment", "confidence": 88,
             "action": "Policy is out of compliance — it books waiting time into the journey. Reclassify as indemnified time."},
            {"id": "c2", "type": "supported", "clause": "Cláusula 7ª", "title": "Night premium 20%",
             "change": "Night premium at the floor with reduced hour — matches.",
             "current": "+20% · 52′30″", "required": "+20% · 52′30″",
             "mapping": "Night premium → rate", "confidence": 95, "action": "No action. Aligned."},
            {"id": "c3", "type": "config", "clause": "Cláusula 8ª", "title": "Overtime bands 50% / 70%",
             "change": "Tiered OT: +50% first two hours, +70% after.",
             "current": "Flat +50%", "required": "+50% / +70%",
             "mapping": "Overtime → premium bands", "confidence": 93, "action": "Split OT into two bands."},
        ],
    },

    "de-eh-2026": {
        "title": "Tarifvertrag Einzelhandel NRW", "subtitle": "Entgelttarifvertrag 2026",
        "family": "Tarifvertrag Einzelhandel NRW", "country": "Germany",
        "kind": "Tarifvertrag", "lang": "de",
        "source": "ver.di / HDE", "policyId": "de-eh",
        "pages": [
            [
                {"kind": "clause", "num": "§ 1", "title": "Geltungsbereich", "body": [
                    ["Dieser Tarifvertrag gilt für alle Beschäftigten des Einzelhandels im Tarifgebiet Nordrhein-Westfalen, soweit sie unter den fachlichen und persönlichen Geltungsbereich fallen."]]},
                {"kind": "clause", "num": "§ 2", "title": "Entgelt und Eingruppierung", "body": [
                    ["Die monatlichen Entgelte richten sich nach den Gehalts- und Lohngruppen der Entgelttabelle. Die Eingruppierung erfolgt nach der überwiegend ausgeübten Tätigkeit."]]},
                {"kind": "clause", "num": "§ 3", "title": "Regelmäßige Arbeitszeit", "body": [
                    ["Die regelmäßige wöchentliche Arbeitszeit beträgt 37,5 Stunden ausschließlich der Pausen. Die Verteilung erfolgt nach betrieblicher Vereinbarung."]]},
                {"kind": "clause", "num": "§ 4", "title": "Mehrarbeitszuschlag", "body": [
                    ["Für Mehrarbeit wird ein ", m("Zuschlag von 25 %", "c2"), " auf den Stundenlohn gewährt."]]},
            ],
            [
                {"kind": "clause", "num": "§ 5", "title": "Nachtzuschlag", "body": [
                    ["Für Nachtarbeit nach 20:00 Uhr wird ein ", m("Zuschlag von 20 %", "c1"), " gezahlt."]]},
                {"kind": "clause", "num": "§ 6", "title": "Ruhezeit", "body": [
                    ["Zwischen zwei Arbeitstagen ist eine ", m("Ruhezeit von 11 Stunden", "c3"), " einzuhalten."]]},
                {"kind": "clause", "num": "§ 7", "title": "Urlaub", "body": [
                    ["Der Erholungsurlaub beträgt 36 Werktage im Kalenderjahr. Der Urlaubsanspruch entsteht anteilig nach der Beschäftigungsdauer im Kalenderjahr."]]},
                {"kind": "clause", "num": "§ 8", "title": "Inkrafttreten und Kündigung", "body": [
                    ["Dieser Tarifvertrag tritt zum genannten Datum in Kraft und kann mit einer Frist von drei Monaten zum Monatsende gekündigt werden."]]},
            ],
        ],
        "changes": [
            {"id": "c1", "type": "supported", "clause": "§ 5", "title": "Night surcharge 20%",
             "change": "Night surcharge after 20:00 — matches policy.",
             "current": "+20% after 20:00", "required": "+20% after 20:00",
             "mapping": "Night premium → rate", "confidence": 96, "action": "No action. Aligned."},
            {"id": "c2", "type": "config", "clause": "§ 4", "title": "Overtime surcharge 25%",
             "change": "Mehrarbeit surcharge set to +25%.", "current": "+20%", "required": "+25%",
             "mapping": "Overtime → surcharge rate", "confidence": 92, "action": "Raise the surcharge to 25%."},
            {"id": "c3", "type": "supported", "clause": "§ 6", "title": "Daily rest 11 hours",
             "change": "11h between working days — matches.",
             "current": "11h rest", "required": "11h rest",
             "mapping": "Rest rules → daily minimum", "confidence": 98, "action": "No action. Aligned."},
        ],
    },

    "br-pec-6x1": {
        "title": "PL Fim da Escala 6x1", "subtitle": "Projeto de Lei · jornada semanal",
        "family": "PL Escala 6x1 (Federal)", "country": "Brazil",
        "kind": "Law", "lang": "pt",
        "source": "Câmara dos Deputados", "policyId": "br-retail",
        "pages": [[
            {"kind": "para", "body": ["Projeto de lei que altera a Consolidação das Leis do Trabalho para dispor sobre a duração máxima da jornada e a vedação da escala 6x1. Texto em tramitação — sujeito a alterações."]},
            {"kind": "clause", "num": "Art. 1º", "title": "Jornada máxima semanal", "body": [
                ["A duração do trabalho não excederá ", m("40 (quarenta) horas semanais, vedada a escala 6x1", "c1"), ", sem redução de salário."]]},
            {"kind": "clause", "num": "Art. 2º", "title": "Transição", "body": [
                ["A adaptação observará ", m("período de transição por setor, mediante negociação coletiva", "c2"), ", na forma do regulamento."]]},
            {"kind": "clause", "num": "Art. 3º", "title": "Regulamentação", "body": [
                ["O Poder Executivo regulamentará esta Lei no prazo de 180 (cento e oitenta) dias, dispondo sobre os critérios de fiscalização e as hipóteses de jornada especial."]]},
            {"kind": "clause", "num": "Art. 4º", "title": "Vigência", "body": [
                ["Esta Lei entra em vigor na data de sua publicação, produzindo efeitos após o decurso do período de transição de que trata o art. 2º."]]},
        ]],
        "changes": [
            {"id": "c1", "type": "conflict", "clause": "Art. 1º", "title": "Weekly cap 40h · 6x1 barred",
             "change": "Caps the week at 40h and prohibits the 6x1 scale, no pay cut.",
             "current": "Policies at 44h · 6x1 permitted", "required": "40h cap · 6x1 removed",
             "mapping": "Journey → weekly limit + shift-pattern rules", "confidence": 90,
             "action": "High-impact. Every Brazil policy would breach the cap. Model a 40h variant and stage per the transition rules — do not apply before enactment."},
            {"id": "c2", "type": "config", "clause": "Art. 2º", "title": "Sector transition window",
             "change": "Sector-specific transition via collective bargaining.",
             "current": "No transition handling", "required": "Effective-date staging per sector",
             "mapping": "Effective-date & transition handling", "confidence": 82,
             "action": "Prepare an effective-date staging path; hold until CBA-level transition terms are published."},
        ],
    },

    "mx-40h": {
        "title": "Reforma Jornada 40 Horas", "subtitle": "Reforma constitucional · jornada",
        "family": "Reforma Jornada 40h (Federal)", "country": "Mexico",
        "kind": "Law", "lang": "es",
        "source": "Diario Oficial de la Federación", "policyId": "mx-retail",
        "pages": [[
            {"kind": "para", "body": ["Decreto por el que se reforman diversas disposiciones de la Constitución Política de los Estados Unidos Mexicanos y de la Ley Federal del Trabajo en materia de jornada laboral. Texto sujeto a implementación gradual."]},
            {"kind": "clause", "num": "Art. 123", "title": "Jornada máxima", "body": [
                ["Se establece la ", m("reducción progresiva de la jornada máxima de 48 a 40 horas semanales", "c1"), ", de manera escalonada hasta 2030."]]},
            {"kind": "clause", "num": "Art. 71", "title": "Prima dominical", "body": [
                ["Los trabajadores que presten servicio en domingo tendrán derecho a una ", m("prima dominical del 25%", "c2"), " sobre el salario ordinario."]]},
            {"kind": "clause", "num": "Transitorio Primero", "title": "Entrada en vigor", "body": [
                ["El presente Decreto entrará en vigor al día siguiente de su publicación en el Diario Oficial de la Federación."]]},
            {"kind": "clause", "num": "Transitorio Segundo", "title": "Implementación escalonada", "body": [
                ["La reducción de la jornada máxima se aplicará de manera escalonada, disminuyendo una hora por año hasta alcanzar las 40 horas semanales a más tardar en 2030, conforme al calendario que emita la autoridad laboral."]]},
        ]],
        "changes": [
            {"id": "c1", "type": "conflict", "clause": "Art. 123", "title": "Weekly cap 48h → 40h phase-in",
             "change": "Staged reduction of the maximum week from 48h to 40h by 2030.",
             "current": "Policy at 48h", "required": "Phased reduction to 40h by 2030",
             "mapping": "Journey → weekly limit (time-phased)", "confidence": 89,
             "action": "Plan a multi-year, time-phased weekly cap. Stage each step to its statutory effective date."},
            {"id": "c2", "type": "config", "clause": "Art. 71", "title": "Sunday premium 25%",
             "change": "Prima dominical of 25% on ordinary wage.",
             "current": "Sunday premium not set", "required": "+25% Sunday premium",
             "mapping": "Sunday premium → rate", "confidence": 88, "action": "Set the Sunday premium to 25%."},
        ],
    },

    "br-cct-sp-adit": {
        "title": "CCT Comércio Varejista SP — Aditivo salarial", "subtitle": "Aditivo 2026 · reajuste",
        "family": "CCT Comércio Varejista SP", "country": "Brazil",
        "kind": "Amendment", "lang": "pt",
        "source": "FecomercioSP", "policyId": "br-retail",
        "pages": [[
            {"kind": "para", "body": ["Pelo presente Termo Aditivo à Convenção Coletiva de Trabalho vigente, as entidades convenentes ajustam a revisão salarial e as demais condições a seguir estipuladas."]},
            {"kind": "clause", "num": "Cláusula 1ª", "title": "Reajuste Salarial", "body": [
                ["Fica estabelecido o ", m("novo piso salarial de R$ 1.820,00 (mil, oitocentos e vinte reais)", "a1"), " para a categoria, a partir da vigência deste aditivo."]]},
            {"kind": "clause", "num": "Cláusula 2ª", "title": "Base de Cálculo das Horas Extras", "body": [
                ["Para o cálculo das horas extraordinárias, a base de incidência ", m("passa a compreender também o adicional de assiduidade", "a2"), ", quando habitualmente pago."]]},
            {"kind": "clause", "num": "Cláusula 3ª", "title": "Vigência do Aditivo", "body": [
                ["O presente aditivo vigora a partir de 1º de julho de 2026, mantidas as demais cláusulas da Convenção Coletiva de Trabalho em vigor até o término de sua vigência."]]},
            {"kind": "clause", "num": "Cláusula 4ª", "title": "Ratificação", "body": [
                ["Ficam ratificadas todas as demais cláusulas e condições da Convenção Coletiva de Trabalho vigente, naquilo que não conflitarem com o presente aditivo."]]},
            {"kind": "para", "body": ["E, por estarem assim ajustadas, firmam as partes o presente termo aditivo para que produza seus efeitos legais."]},
        ]],
        "changes": [
            {"id": "a1", "type": "config", "clause": "Cláusula 1ª", "title": "New salary floor R$ 1,820.00",
             "change": "Category salary floor raised, changing the hourly base used across premiums.",
             "current": "Floor R$ 1,640.00", "required": "Floor R$ 1,820.00",
             "mapping": "Base wage → hourly base", "confidence": 96,
             "action": "Update the salary floor. All rate-derived premiums recompute from the new hourly base."},
            {"id": "a2", "type": "config", "clause": "Cláusula 2ª", "title": "OT base now includes assiduity premium",
             "change": "Habitual assiduity premium must fold into the overtime calculation base.",
             "current": "OT base = base wage only", "required": "OT base = base wage + assiduity premium",
             "mapping": "Overtime → base composition (fold-into-base)", "confidence": 88,
             "action": "Add the habitual assiduity premium to the OT base before applying the band multipliers."},
        ],
    },
}


# --- transcription lookups ---------------------------------------------------

_PREFIX_CODE = {"ref": "—", "br": "BR", "fr": "FR", "mx": "MX", "de": "DE"}
# most seeded policies are collective agreements; the Mexico baseline is a federal (country) layer;
# ref-base is the generic reference policy built from pay-policy-configuration.md
_LAYER_TYPE = {"mx-retail": LayerType.country, "ref-base": LayerType.company}
_COUNTRY_CODE = {"Brazil": "BR", "France": "FR", "Mexico": "MX", "Germany": "DE"}
_DOC_TYPE = {
    "CCT": DocType.cct, "ACT": DocType.act, "CBA": DocType.cba,
    "CCN": DocType.ccn, "Tarifvertrag": DocType.tarifvertrag, "Award": DocType.award,
    "Law": DocType.statute, "State Law": DocType.state_law, "Amendment": DocType.reform,
}
_STATUS = {
    "ready": DocStatus.analyzed,
    "reviewed": DocStatus.reviewed,
    "analyzing": DocStatus.analyzed,
    "new": DocStatus.analyzed,
}
_CLASSIFICATION = {
    "supported": Classification.match,
    "config": Classification.adjust,
    "gap": Classification.gap,
    "conflict": Classification.conflict,
}


# --- transforms --------------------------------------------------------------

def _flatten(segments) -> str:
    """Concatenate a paragraph's segments to plain text.

    A plain string contributes itself; a marked run ``{"t", "c"}`` contributes
    its ``t``. Accepts a bare string too (the shape a "para" block carries).
    """
    if isinstance(segments, str):
        return segments
    parts = []
    for seg in segments:
        if isinstance(seg, str):
            parts.append(seg)
        elif isinstance(seg, dict):
            parts.append(seg.get("t", ""))
    return "".join(parts)


def _transform_pages(pages: list) -> list:
    """Render the prototype's nested page structure into the viewer's shape:
    ``[{"page": i+1, "blocks": [...]}]``."""
    out = []
    for i, page in enumerate(pages):
        blocks = []
        for block in page:
            if block["kind"] == "para":
                blocks.append({"kind": "para", "paras": [_flatten(block["body"][0])]})
            else:  # clause
                blocks.append({
                    "kind": "clause",
                    "num": block["num"],
                    "title": block["title"],
                    "paras": [_flatten(p) for p in block["body"]],
                })
        out.append({"page": i + 1, "blocks": blocks})
    return out


def _find_quote(pages: list, change_id: str):
    """Return ``(text, page_number)`` of the marked run whose ``c`` equals
    ``change_id``, searching every page/block/paragraph. ``(None, None)`` if
    the run is not found."""
    for i, page in enumerate(pages):
        for block in page:
            for para in block["body"]:
                if isinstance(para, str):
                    continue
                for seg in para:
                    if isinstance(seg, dict) and seg.get("c") == change_id:
                        return seg["t"], i + 1
    return None, None


def _has(text: str, *tokens: str) -> bool:
    for tok in tokens:
        if tok == "ot":
            if re.search(r"\bot\b", text):
                return True
        elif tok in text:
            return True
    return False


def _policy_tab(mapping: str, title: str) -> str:
    t = (mapping + " " + title).lower()
    if _has(t, "tolerance", "punch"):
        return "C · Tolerance"
    if _has(t, "on-call", "on call", "standby", "waiting"):
        return "D · On Call"
    if _has(t, "night", "noturno"):
        return "B · Hours Distribution"
    if _has(t, "forfait", "12x36", "6x1", "scale", "shift"):
        return "F · Schedule / scale"
    if _has(t, "absence", "abono"):
        return "G · Absences"
    if _has(t, "overtime", "ot", "premium", "bands", "sunday", "holiday",
            "dsr", "hours-bank", "hours bank", "journey", "weekly"):
        return "A · Paid Overtime"
    if _has(t, "break", "rest", "interval", "intrajornada", "repos", "ruhezeit"):
        return "E · Breaks & rest"
    return "A · Paid Overtime"


def _clause_family(mapping: str, title: str) -> str:
    t = (mapping + " " + title).lower()
    if _has(t, "hours-bank", "hours bank", "banco"):
        return "hours_bank"
    if _has(t, "sunday", "holiday", "domingo"):
        return "sunday_holiday"
    if _has(t, "night", "noturno"):
        return "night"
    if _has(t, "tolerance"):
        return "tolerance"
    if _has(t, "on-call", "on call", "standby", "waiting", "espera"):
        return "on_call"
    if _has(t, "break", "rest", "interval", "intrajornada", "repos"):
        return "breaks_rest"
    if _has(t, "scale", "12x36", "forfait", "6x1", "shift"):
        return "shift_scale"
    if _has(t, "absence", "abono"):
        return "absence"
    return "overtime"


def _capability_code(mapping: str, title: str) -> str:
    """Best-effort map of a demo change to one of the 17 taxonomy codes (app/pay_policy_schema.py).
    Demo data only — real runs get the code from the model."""
    t = (mapping + " " + title).lower()
    if _has(t, "hours-bank", "hours bank", "banco"):
        return "BH"
    if _has(t, "dsr", "sunday", "holiday", "domingo"):
        return "Sun/Hol"
    if _has(t, "night", "noturno"):
        return "Not"
    if _has(t, "tolerance", "punch"):
        return "Tol"
    if _has(t, "on-call", "on call", "standby", "waiting", "espera"):
        return "OnCall"
    if _has(t, "intrajornada", "meal", "intraday"):
        return "Intra"
    if _has(t, "interjornada", "daily rest", "repos", "rest"):
        return "Inter"
    if _has(t, "12x36"):
        return "12x36"
    if _has(t, "semana espanhola"):
        return "Sem-esp"
    if _has(t, "absence", "abono", "vacation"):
        return "Abono"
    if _has(t, "contingent", "weekly", "monthly", "40h", "banded"):
        return "OT wk/mo"
    if _has(t, "forfait", "journey", "jornada", "44h", "weekly hours", "standard"):
        return "Jorn"
    return "OT/d"


def _confidence(n: int):
    if n >= 95:
        return Confidence.high, "explicit_clause"
    if n >= 88:
        return Confidence.medium, "inferred_field"
    return Confidence.low, "ambiguous_wording"


# --- the seed ----------------------------------------------------------------

def _finalize_seed_document(db, doc, pol) -> None:
    """Commit a reviewed seed document as version 1 of its layer (config + PolicyVersion + gaps),
    so the ground-truth store shows a real committed version out of the box."""
    if pol is None:
        return
    from . import pay_policy_schema
    cfg = pay_policy_schema.normalize(pol.config)
    changes = 0
    for f in doc.findings:
        if f.classification == Classification.gap:
            db.add(UnsupportedCalculation(
                policy_id=pol.id, document_id=doc.id, finding_id=f.id,
                capability=f.capability_code or f.clause_family,
                title=f.title, description=f.rule_summary, source_quote=f.source_quote, page=f.page,
                derived_from=doc.cba_name or doc.jurisdiction,
            ))
        else:
            pay_policy_schema.set_field(
                cfg, f.capability_code or f.clause_family,
                f.proposed_value or f.current_value or "", taxonomy_tab=f.policy_tab,
            )
            changes += 1
        f.committed_version = 1
    pol.config = cfg
    pol.version = 1
    db.add(PolicyVersion(
        policy_id=pol.id, version=1, config=cfg, source_document_id=doc.id,
        source_document_title=doc.title, change_count=changes, approver="a.levi",
        note=f"Initial reconciliation from {doc.title}",
    ))
    doc.status = DocStatus.complete
    doc.finalized_at = datetime.now(timezone.utc)


def seed_if_empty(db, log) -> None:
    """Populate an empty database with the prototype's demo dataset.

    Idempotent: returns immediately if any pay policy already exists. Commits
    exactly once at the end.
    """
    if db.query(PayPolicy).first() is not None:
        return

    # demo user (username/password auth backing)
    if db.query(User).first() is None:
        db.add(User(
            username="demo",
            password_hash=hash_password("demo"),
            display_name="Demo Reviewer",
        ))
        log.warning(
            "Seeded a default demo/demo login — change it before any real deployment."
        )

    # pay policies (the comparison baseline)
    policies_by_key: dict[str, PayPolicy] = {}
    for p in POLICIES:
        code = _PREFIX_CODE[p["id"].split("-")[0]]
        policy = PayPolicy(
            key=p["id"], name=p["name"], flag=p["flag"], subtitle=p["sub"],
            jurisdiction=code, layer_type=_LAYER_TYPE.get(p["id"], LayerType.cba),
            config=POLICY_CONFIG[p["id"]],
        )
        db.add(policy)
        policies_by_key[p["id"]] = policy

    # synthetic demo layers (scale test for the Layers tab) — no documents attached
    for s in _synthetic_layers():
        db.add(PayPolicy(
            key=s["key"], name=s["name"], flag=s["flag"], subtitle=s["subtitle"],
            jurisdiction=s["jurisdiction"], layer_type=s["layer_type"], config=s["config"],
        ))

    db.flush()  # assign policy ids for the FK

    n_docs = n_findings = n_rules = 0
    for doc_key, meta in DOCS.items():
        status = _STATUS[STATUSES[doc_key]]
        is_reviewed = status == DocStatus.reviewed

        doc = Document(
            jurisdiction=_COUNTRY_CODE[meta["country"]],
            cba_name=meta["family"],
            doc_type=_DOC_TYPE.get(meta["kind"], DocType.other),
            title=meta["title"],
            subtitle=meta["subtitle"],
            source=meta["source"],
            language=meta["lang"],
            status=status,
            pages=_transform_pages(meta["pages"]),
            policy=policies_by_key.get(meta["policyId"]),
        )
        db.add(doc)
        n_docs += 1

        for ch in meta["changes"]:
            quote, page = _find_quote(meta["pages"], ch["id"])
            if quote is None:
                quote, page = ch["change"], 1
            conf, basis = _confidence(ch["confidence"])
            clause_family = _clause_family(ch["mapping"], ch["title"])
            policy_tab = _policy_tab(ch["mapping"], ch["title"])
            capability_code = _capability_code(ch["mapping"], ch["title"])

            finding = Finding(
                document=doc,
                classification=_CLASSIFICATION[ch["type"]],
                clause_ref=ch["clause"],
                title=ch["title"],
                source_quote=quote,
                page=page,
                rule_summary=ch["change"],
                policy_tab=policy_tab,
                policy_field=ch["mapping"],
                capability_code=capability_code,
                current_value=ch["current"],
                proposed_value=ch["required"],
                rationale=ch["action"],
                confidence=conf,
                confidence_basis=basis,
                clause_family=clause_family,
            )

            if is_reviewed:
                # materialize the verified output: approved finding -> Rule + ConfigValue
                finding.review_status = ReviewStatus.approved
                finding.reviewer = "a.levi"
                finding.reviewer_name = "A. Levi"
                finding.reviewed_at = datetime.now(timezone.utc)
                value = ch["required"] or ch["current"] or ""
                rule = Rule(
                    capability=clause_family,
                    value=value,
                    derived_from=doc.cba_name or doc.jurisdiction,
                    approver="A. Levi",
                )
                rule.config_values.append(ConfigValue(
                    policy_tab=policy_tab, policy_field=ch["mapping"], value=value,
                ))
                finding.rule = rule
                n_rules += 1

            db.add(finding)
            n_findings += 1

        if is_reviewed:
            db.flush()  # attach findings so doc.findings is populated
            _finalize_seed_document(db, doc, policies_by_key.get(meta["policyId"]))

    db.commit()
    log.info(
        "Seeded %d pay policies, %d documents, %d findings, %d verified rules.",
        len(POLICIES), n_docs, n_findings, n_rules,
    )
