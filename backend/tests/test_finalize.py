def test_finalize_commits_a_layer_version(authed, dataset_multi):
    doc_id = dataset_multi["document_id"]
    f1, f2 = dataset_multi["finding_ids"]
    authed.post(f"/api/findings/{f1}/review", json={"action": "approve"})
    authed.post(f"/api/findings/{f2}/review", json={"action": "approve"})

    res = authed.post(f"/api/documents/{doc_id}/finalize")
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["committed_version"] == 1
    assert body["changes_committed"] == 2
    assert body["gaps_logged"] == 0
    assert body["document_status"] == "complete"

    pid = authed.get(f"/api/documents/{doc_id}").json()["policy_id"]
    detail = authed.get(f"/api/policies/{pid}").json()
    assert detail["version"] == 1
    assert len(detail["versions"]) == 1
    assert detail["versions"][0]["change_count"] == 2
    assert "OT rate" in detail["config"]
    assert len(detail["editions"]) == 1


def test_finalize_requires_something_to_commit(authed, dataset_multi):
    doc_id = dataset_multi["document_id"]
    assert authed.post(f"/api/documents/{doc_id}/finalize").status_code == 400


def test_finalize_is_idempotent_after_commit(authed, dataset_multi):
    doc_id = dataset_multi["document_id"]
    f1, f2 = dataset_multi["finding_ids"]
    authed.post(f"/api/findings/{f1}/review", json={"action": "approve"})
    authed.post(f"/api/findings/{f2}/review", json={"action": "approve"})
    authed.post(f"/api/documents/{doc_id}/finalize")
    # nothing new to commit -> 400, no phantom v2
    assert authed.post(f"/api/documents/{doc_id}/finalize").status_code == 400


def test_create_new_layer(authed):
    res = authed.post("/api/policies", json={"name": "Texas — US", "jurisdiction": "US", "layer_type": "state"})
    assert res.status_code == 201, res.text
    body = res.json()
    assert body["layer_type"] == "state"
    assert body["version"] == 0
    assert body["key"] == "texas-us"
