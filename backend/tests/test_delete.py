"""Delete-document endpoint — password-gated, allowed for uncommitted docs, blocked once finalized."""

PWD = {"X-Delete-Password": "Liranos"}


def test_delete_requires_correct_password(authed, basic_dataset):
    doc_id = basic_dataset["document_id"]
    # no password / wrong password -> 403, document survives
    assert authed.delete(f"/api/documents/{doc_id}").status_code == 403
    assert authed.delete(f"/api/documents/{doc_id}", headers={"X-Delete-Password": "nope"}).status_code == 403
    assert authed.get(f"/api/documents/{doc_id}").status_code == 200


def test_delete_uncommitted_document(authed, basic_dataset):
    doc_id = basic_dataset["document_id"]
    assert authed.delete(f"/api/documents/{doc_id}", headers=PWD).status_code == 204
    assert authed.get(f"/api/documents/{doc_id}").status_code == 404


def test_cannot_delete_finalized_document(authed, basic_dataset):
    doc_id = basic_dataset["document_id"]
    fid = basic_dataset["finding_id"]
    authed.post(f"/api/findings/{fid}/review", json={"action": "approve"})
    assert authed.post(f"/api/documents/{doc_id}/finalize").status_code == 200
    # correct password, but now part of the audit trail -> blocked
    res = authed.delete(f"/api/documents/{doc_id}", headers=PWD)
    assert res.status_code == 409, res.text
    assert authed.get(f"/api/documents/{doc_id}").status_code == 200  # still there
