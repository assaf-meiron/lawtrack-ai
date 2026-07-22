def test_login_rejects_bad_credentials(client, make_user):
    make_user()
    res = client.post("/api/auth/login", json={"username": "tester", "password": "wrong"})
    assert res.status_code == 401


def test_login_and_me(client, make_user):
    make_user()
    res = client.post("/api/auth/login", json={"username": "tester", "password": "s3cret"})
    assert res.status_code == 200
    token = res.json()["access_token"]
    me = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me.status_code == 200
    assert me.json()["username"] == "tester"


def test_protected_routes_require_auth(client):
    # no bearer token -> rejected
    assert client.get("/api/documents").status_code in (401, 403)
    assert client.get("/api/rules").status_code in (401, 403)


def test_health_is_public(client):
    assert client.get("/api/health").json() == {"status": "ok"}
