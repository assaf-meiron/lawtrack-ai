"""Config translation + diff + the mandatory gap file.

Covers the owner's three asks: a structured pay-policy config, a current→proposed diff traceable to
each clause, and every 🔴 Gap captured in the dedicated gap store + generated file.
"""
from app import models
from app.db import SessionLocal


def _seed_layer_with_findings():
    """A layer with a structured current config + one document carrying an adjust and a gap finding."""
    db = SessionLocal()
    try:
        policy = models.PayPolicy(
            key="br-retail", name="Brazil — Retail", jurisdiction="BR", flag="🇧🇷",
            config={"Hours Distribution": {"Not": "+20%"}},  # structured current config
        )
        db.add(policy)
        db.flush()
        doc = models.Document(
            jurisdiction="BR", cba_name="CCT SP", doc_type=models.DocType.cct,
            title="CCT Comércio SP", status=models.DocStatus.analyzed, policy_id=policy.id,
        )
        db.add(doc)
        db.flush()
        adjust = models.Finding(
            document_id=doc.id, clause_family="night", capability_code="Not",
            clause_ref="Cláusula 12ª", title="Night premium 25%", source_quote="adicional de 25%",
            page=3, rule_summary="Night premium to 25%", classification=models.Classification.adjust,
            policy_tab="B · Hours Distribution", policy_field="night premium",
            current_value="+20%", proposed_value="+25%", rationale="raise",
            confidence=models.Confidence.high, confidence_basis="explicit_clause",
        )
        gap = models.Finding(
            document_id=doc.id, clause_family="breaks_rest", capability_code="Intra",
            clause_ref="Cláusula 13ª", title="Partial intrajornada indemnity", source_quote="apenas o período suprimido",
            page=3, rule_summary="Indemnify only the suppressed meal-break portion, +50%",
            classification=models.Classification.gap, policy_tab="E · Breaks & rest",
            policy_field="intrajornada partial", current_value=None, proposed_value="+50% suppressed only",
            rationale="engine gap", confidence=models.Confidence.medium, confidence_basis="no_direct_field",
        )
        db.add_all([adjust, gap])
        db.commit()
        return {"policy_id": str(policy.id), "document_id": str(doc.id),
                "adjust_id": str(adjust.id), "gap_id": str(gap.id)}
    finally:
        db.close()


def test_config_diff_shows_current_proposed_and_gaps(authed):
    ids = _seed_layer_with_findings()
    doc_id = ids["document_id"]

    dd = authed.get(f"/api/documents/{doc_id}/config-diff")
    assert dd.status_code == 200, dd.text
    body = dd.json()

    # structured six-tab config on both sides
    assert set(body["tabs"]) == set(body["current_config"].keys())
    assert body["current_config"]["Hours Distribution"]["Not"] == "+20%"

    # the adjust finding is a diff row, current->proposed, traceable to its clause
    night = [d for d in body["diff"] if d["code"] == "Not"][0]
    assert night["current"] == "+20%"
    assert night["proposed"] == "+25%"
    assert night["changed"] is True
    assert night["applied"] is False          # not yet reviewed
    assert night["page"] == 3 and night["source_quote"]

    # the gap is surfaced separately, not as a config field
    assert body["gap_count"] == 1
    assert body["gaps"][0]["capability"] == "Intra"
    assert all(d["code"] != "Intra" for d in body["diff"])

    # once accepted, the change is applied into proposed_config
    authed.post(f"/api/findings/{ids['adjust_id']}/review", json={"action": "approve"})
    body2 = authed.get(f"/api/documents/{doc_id}/config-diff").json()
    assert body2["proposed_config"]["Hours Distribution"]["Not"] == "+25%"
    assert body2["change_count"] == 1


def test_gap_lands_in_the_dedicated_gap_file(authed):
    ids = _seed_layer_with_findings()
    doc_id = ids["document_id"]

    # accept the adjust and the gap, then finalize
    authed.post(f"/api/findings/{ids['adjust_id']}/review", json={"action": "approve"})
    authed.post(f"/api/findings/{ids['gap_id']}/review", json={"action": "approve"})
    res = authed.post(f"/api/documents/{doc_id}/finalize")
    assert res.status_code == 200, res.text
    assert res.json()["gaps_logged"] == 1

    # the gap is a durable DB row...
    rows = authed.get("/api/unsupported-calculations").json()
    assert any(r["capability"] == "Intra" for r in rows), rows

    # ...and it regenerates the dedicated gap file with the clause + citation
    txt = authed.get("/api/unsupported-calculations.txt")
    assert txt.status_code == 200
    assert "Intra" in txt.text
    assert "apenas o período suprimido" in txt.text
