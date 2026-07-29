"""Review-queue ordering (`Document.findings_ranked` / `Finding.value_signal`).

A long CCT yields findings in whatever order the model walked the PDF, which buries the clauses a
reviewer has to act on — the rates, thresholds and windows — under definitional and procedural text.
The contract asserted here is that the numbers lead.

The quotes are the real ones from `cct-sindpd-sp-2026-2027` (SINDPD São Paulo), so this doubles as a
regression test for the specific clauses the demo opens on.
"""
from __future__ import annotations

from app.models import Classification, Document, DocType, Finding

# The five clauses the demo has to surface first, verbatim from the CCT.
BANCO_HORAS_75 = (
    "O acerto do BANCO DE HORAS deverá ser feito quadrimestralmente, sendo o pagamento efetuado "
    "considerando o seguinte: até 120 (cento e vinte) horas remanescentes serão pagas com acréscimo "
    "de 75% (setenta e cinco por cento)"
)
BANCO_HORAS_100 = (
    "As horas remanescentes acima de 120 (cento e vinte) horas serão pagas com o acréscimo de 100% "
    "(cem por cento)."
)
NIGHT_PREMIUM = "Night premium 30% for hours 22:00-06:00"
SOBREAVISO = (
    "A todos os empregados que ficarem à disposição da Empresa, nos períodos fora da jornada normal "
    "de trabalho, será assegurado o pagamento de 1/3 (um terço) da hora normal por hora de sobreaviso."
)
NIGHT_WINDOW = (
    "As horas noturnas previstas pelo artigo 73 da CLT ficam, por força da presente CONVENÇÃO "
    "COLETIVA DE TRABALHO, ampliadas para o período das 22:00 (vinte e duas) horas de um dia às "
    "06:00 (seis) horas do dia seguinte e serão remuneradas com adicional de 30% (trinta por cento)"
)

# Real CCT text that carries no configurable value — the material that used to crowd the top.
NO_VALUE = [
    "As empresas descontarão a contribuição assistencial dos empregados sindicalizados, conforme "
    "deliberação da assembleia geral.",
    "Para os fins desta convenção, considera-se empregado todo aquele que presta serviço de natureza "
    "não eventual ao empregador.",
    "Fica instituída comissão de conciliação prévia para dirimir os conflitos individuais do trabalho.",
    "As horas extras serão remuneradas conforme a legislação vigente.",
]


def _finding(quote: str, proposed: str | None = None, summary: str = "") -> Finding:
    return Finding(
        clause_family="overtime",
        source_quote=quote,
        page=1,
        rule_summary=summary,
        classification=Classification.adjust,
        policy_tab="Paid Overtime",
        policy_field="test",
        proposed_value=proposed,
        rationale="",
        confidence_basis="",
    )


def test_value_bearing_clauses_outscore_prose():
    """Every named clause must score above every clause carrying no number."""
    valued = [
        _finding(BANCO_HORAS_75, "+75% up to 120h"),
        _finding(BANCO_HORAS_100, "+100% above 120h"),
        _finding(NIGHT_PREMIUM, "+30% 22:00–06:00"),
        _finding(SOBREAVISO, "1/3 of the normal hour"),
        _finding(NIGHT_WINDOW, "22:00–06:00 · +30%"),
    ]
    prose = [_finding(q) for q in NO_VALUE[:3]] + [_finding(NO_VALUE[3], "per statute")]

    assert min(f.value_signal for f in valued) > max(f.value_signal for f in prose)


def test_ranked_puts_the_demo_clauses_first():
    """Interleaved as extraction would emit them, the five still come out on top."""
    doc = Document(
        jurisdiction="BR", doc_type=DocType.cct, title="CCT SINDPD SP 2026/2027", status="analyzed",
    )
    # prose first, exactly the failure mode being fixed
    doc.findings = [
        _finding(NO_VALUE[0]),
        _finding(NO_VALUE[1]),
        _finding(BANCO_HORAS_75, "+75% up to 120h"),
        _finding(NO_VALUE[2]),
        _finding(NIGHT_WINDOW, "22:00–06:00 · +30%"),
        _finding(NO_VALUE[3], "per statute"),
        _finding(SOBREAVISO, "1/3 of the normal hour"),
        _finding(BANCO_HORAS_100, "+100% above 120h"),
        _finding(NIGHT_PREMIUM, "+30% 22:00–06:00"),
    ]

    ranked = doc.findings_ranked
    assert len(ranked) == len(doc.findings)                    # ordering, never filtering
    top5 = {f.source_quote for f in ranked[:5]}
    assert top5 == {BANCO_HORAS_75, BANCO_HORAS_100, NIGHT_PREMIUM, SOBREAVISO, NIGHT_WINDOW}


def test_ties_keep_extraction_order():
    """Equal scores must not reshuffle — the document's own sequence still reads through."""
    doc = Document(jurisdiction="BR", doc_type=DocType.cct, title="t", status="analyzed")
    doc.findings = [_finding(q) for q in NO_VALUE[:3]]
    assert [f.source_quote for f in doc.findings_ranked] == NO_VALUE[:3]
