def test_document_detail_lists_findings(authed, basic_dataset):
    res = authed.get(f"/api/documents/{basic_dataset['document_id']}")
    assert res.status_code == 200
    body = res.json()
    assert body["policy"]["name"] == "Brazil — Retail"
    assert len(body["findings"]) == 1
    assert body["findings"][0]["classification"] == "adjust"


def test_approve_materializes_rule_and_config(authed, basic_dataset):
    fid = basic_dataset["finding_id"]
    res = authed.post(f"/api/findings/{fid}/review", json={"action": "approve"})
    assert res.status_code == 200
    assert res.json()["review_status"] == "approved"
    assert res.json()["reviewer"] == "tester"  # audit "who" is the logged-in user

    rules = authed.get("/api/rules").json()
    configs = authed.get("/api/config-values").json()
    assert len(rules) == 1 and rules[0]["value"] == "25%"
    assert len(configs) == 1 and configs[0]["policy_field"] == "Night premium → rate"


def test_correct_requires_final_value(authed, basic_dataset):
    fid = basic_dataset["finding_id"]
    assert authed.post(f"/api/findings/{fid}/review", json={"action": "correct"}).status_code == 400
    ok = authed.post(f"/api/findings/{fid}/review", json={"action": "correct", "final_value": "22%"})
    assert ok.status_code == 200 and ok.json()["final_value"] == "22%"
    assert authed.get("/api/rules").json()[0]["value"] == "22%"


def test_reject_removes_materialized_output(authed, basic_dataset):
    fid = basic_dataset["finding_id"]
    authed.post(f"/api/findings/{fid}/review", json={"action": "approve"})
    assert len(authed.get("/api/rules").json()) == 1
    rej = authed.post(f"/api/findings/{fid}/review", json={"action": "reject", "notes": "not applicable"})
    assert rej.status_code == 200 and rej.json()["review_status"] == "rejected"
    assert authed.get("/api/rules").json() == []


def test_exports(authed, basic_dataset):
    doc_id = basic_dataset["document_id"]
    fid = basic_dataset["finding_id"]
    authed.post(f"/api/findings/{fid}/review", json={"action": "approve"})

    csv = authed.get(f"/api/documents/{doc_id}/change-set.csv")
    assert csv.status_code == 200 and "text/csv" in csv.headers["content-type"]
    assert "Night premium" in csv.text

    rec = authed.get(f"/api/documents/{doc_id}/decision-record").json()
    assert rec["document"]["compared_to_policy"] == "Brazil — Retail"
    assert rec["findings"][0]["review_status"] == "approved"


def test_policies_list(authed, basic_dataset):
    res = authed.get("/api/policies")
    assert res.status_code == 200
    assert any(p["key"] == "br-retail" for p in res.json())
