"""The scanner endpoints (app/routers/agent.py).

What's asserted is the part that has to hold for the review surface: a scan run lands a real document
with real findings in the inbox, marked as agent-found, and the status endpoint counts it inside the
48-hour window. Detection itself is a prepared pool (see the router docstring), which is exactly why
`pool_remaining` is part of the contract — the UI reads it to know whether a scan can still find
anything.
"""
from __future__ import annotations

from app.seed_extra import AGENT_SOURCE_PREFIX, SCAN_POOL


def test_status_on_an_empty_inbox(authed):
    s = authed.get("/api/agent/status").json()
    assert s["source_count"] > 0                      # the watch list is static config, always present
    assert len(s["sources"]) == s["source_count"]
    assert s["found_total"] == 0 and s["found_in_window"] == 0
    assert s["feed"] == []
    assert s["pool_remaining"] == len(SCAN_POOL)
    assert all(src["checked_at"] for src in s["sources"])


def test_scan_surfaces_a_document_into_the_inbox(authed):
    r = authed.post("/api/agent/scan")
    assert r.status_code == 200, r.text
    report = r.json()

    assert report["sources_checked"] > 0
    assert report["triaged_out"] > 0                  # triage is what keeps volume off the digest
    assert len(report["discovered"]) == 1
    found = report["discovered"][0]
    assert found["findings"] > 0                      # a find arrives already digested, with cited findings
    assert report["pool_remaining"] == len(SCAN_POOL) - 1

    # the find is an ordinary document, reviewable through the same Phase-1 queue as an upload
    detail = authed.get(f"/api/documents/{found['id']}").json()
    assert detail["source"].startswith(AGENT_SOURCE_PREFIX)
    assert len(detail["findings"]) == found["findings"]
    assert all(f["source_quote"] for f in detail["findings"])
    assert all(f["review_status"] == "proposed" for f in detail["findings"])  # nothing lands decided


def test_status_counts_the_find_in_the_window(authed):
    authed.post("/api/agent/scan")
    s = authed.get("/api/agent/status").json()
    assert s["found_total"] == 1
    assert s["found_in_window"] == 1                  # just found, so inside the 48h window
    assert s["awaiting_review"] == 1
    assert s["feed"][0]["source"] and not s["feed"][0]["source"].startswith(AGENT_SOURCE_PREFIX)
    assert s["last_scan_at"]


def test_scan_drains_the_pool_then_reports_nothing_new(authed):
    for _ in range(len(SCAN_POOL)):
        assert len(authed.post("/api/agent/scan").json()["discovered"]) == 1

    exhausted = authed.post("/api/agent/scan").json()
    assert exhausted["discovered"] == []
    assert exhausted["pool_remaining"] == 0
    assert "No new documents" in exhausted["message"]
    # a drained pool must not lose the finds already in the inbox
    assert authed.get("/api/agent/status").json()["found_total"] == len(SCAN_POOL)


def test_scan_requires_auth(client):
    assert client.post("/api/agent/scan").status_code == 401
    assert client.get("/api/agent/status").status_code == 401
