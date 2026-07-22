def test_status_lifecycle_analyzed_to_in_review_to_reviewed(authed, dataset_multi):
    doc_id = dataset_multi["document_id"]
    f1, f2 = dataset_multi["finding_ids"]

    assert authed.get(f"/api/documents/{doc_id}").json()["status"] == "analyzed"

    authed.post(f"/api/findings/{f1}/review", json={"action": "approve"})
    assert authed.get(f"/api/documents/{doc_id}").json()["status"] == "in_review"  # resumable, not done

    authed.post(f"/api/findings/{f2}/review", json={"action": "reject"})
    assert authed.get(f"/api/documents/{doc_id}").json()["status"] == "reviewed"   # all decided


def test_reviewer_display_name_recorded(authed, dataset_multi):
    f1 = dataset_multi["finding_ids"][0]
    r = authed.post(f"/api/findings/{f1}/review", json={"action": "approve"}).json()
    assert r["reviewer"] == "tester"          # stable username (audit id)
    assert r["reviewer_name"] == "Tester"     # human display name


def test_no_original_file_for_dataset(authed, dataset_multi):
    doc_id = dataset_multi["document_id"]
    assert authed.get(f"/api/documents/{doc_id}").json()["has_file"] is False
    assert authed.get(f"/api/documents/{doc_id}/file").status_code == 404
