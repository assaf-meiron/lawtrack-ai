"""Test fixtures. Points the app at a throwaway SQLite DB and disables startup
seeding, so tests run with no Postgres and no Anthropic credentials.

Env must be set before importing any app module (config caches settings at import).
"""
from __future__ import annotations

import os
import tempfile

_TMP = tempfile.mkdtemp(prefix="lawtrack-test-")
os.environ.setdefault("LAWTRACK_DATABASE_URL", f"sqlite:///{_TMP}/test.db")
os.environ["LAWTRACK_SEED_ON_STARTUP"] = "false"
os.environ["LAWTRACK_JWT_SECRET"] = "test-secret"

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app import models  # noqa: E402,F401
from app.db import Base, SessionLocal, engine  # noqa: E402
from app.main import app  # noqa: E402
from app.security import hash_password  # noqa: E402

TEST_USER = "tester"
TEST_PASS = "s3cret"


@pytest.fixture()
def client():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def make_user():
    def _make(username=TEST_USER, password=TEST_PASS, display_name="Tester"):
        db = SessionLocal()
        try:
            db.add(models.User(username=username, password_hash=hash_password(password), display_name=display_name))
            db.commit()
        finally:
            db.close()
    return _make


@pytest.fixture()
def authed(client, make_user):
    make_user()
    res = client.post("/api/auth/login", json={"username": TEST_USER, "password": TEST_PASS})
    assert res.status_code == 200, res.text
    token = res.json()["access_token"]
    client.headers.update({"Authorization": f"Bearer {token}"})
    return client


@pytest.fixture()
def basic_dataset():
    """Insert one policy + one analyzed document + one proposed finding. Returns ids as str."""
    db = SessionLocal()
    try:
        policy = models.PayPolicy(key="br-retail", name="Brazil — Retail", jurisdiction="BR",
                                  flag="🇧🇷", subtitle="CCT SP", config={"night_premium": "20%"})
        db.add(policy)
        db.flush()
        doc = models.Document(
            jurisdiction="BR", cba_name="CCT SP", doc_type=models.DocType.cct,
            title="CCT Comércio SP", subtitle="2026", source="Sindicato", language="pt",
            status=models.DocStatus.analyzed, policy_id=policy.id,
            pages=[{"page": 1, "blocks": [{"kind": "clause", "num": "Cláusula 12ª",
                    "title": "Adicional Noturno", "paras": ["adicional de 25% sobre a hora diurna"]}]}],
        )
        db.add(doc)
        db.flush()
        finding = models.Finding(
            document_id=doc.id, clause_family="night", clause_ref="Cláusula 12ª",
            title="Night premium raised to 25%", source_quote="25% sobre a hora diurna", page=1,
            rule_summary="Night premium set to 25%", classification=models.Classification.adjust,
            policy_tab="B · Hours Distribution", policy_field="Night premium → rate",
            current_value="20%", proposed_value="25%", rationale="Raise the night premium rate.",
            confidence=models.Confidence.high, confidence_basis="explicit_clause",
        )
        db.add(finding)
        db.commit()
        return {"policy_id": str(policy.id), "document_id": str(doc.id), "finding_id": str(finding.id)}
    finally:
        db.close()


@pytest.fixture()
def dataset_multi():
    """A policy + one analyzed document with TWO proposed findings (for status-lifecycle tests)."""
    db = SessionLocal()
    try:
        policy = models.PayPolicy(key="br-log", name="Brazil — Logistics", jurisdiction="BR", config={})
        db.add(policy)
        db.flush()
        doc = models.Document(jurisdiction="BR", cba_name="CCT Log", doc_type=models.DocType.cct,
                              title="CCT Log", status=models.DocStatus.analyzed, policy_id=policy.id)
        db.add(doc)
        db.flush()
        fids = []
        for i, cls in enumerate([models.Classification.adjust, models.Classification.conflict]):
            f = models.Finding(
                document_id=doc.id, clause_family="overtime", source_quote=f"quote {i}", page=1,
                rule_summary=f"rule {i}", classification=cls, policy_tab="A · Paid Overtime",
                policy_field="OT rate", current_value="x", proposed_value="y",
                confidence=models.Confidence.medium, confidence_basis="inferred_field",
            )
            db.add(f)
            db.flush()
            fids.append(str(f.id))
        db.commit()
        return {"document_id": str(doc.id), "finding_ids": fids}
    finally:
        db.close()
