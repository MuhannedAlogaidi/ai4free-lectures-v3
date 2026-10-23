# tests/test_api.py — checks every endpoint without starting a server.

from fastapi.testclient import TestClient

from src.api.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "version": "0.1.0"}


def test_info_has_python_version():
    data = client.get("/info").json()
    assert data["python_version"].startswith("3.12")


def test_ask_without_key(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)   # no real API call in tests
    response = client.post("/ask", json={"question": "What is RAG?"})
    assert response.status_code == 200
    assert response.json()["source"] == "no-key"


def test_ask_rejects_missing_question():
    response = client.post("/ask", json={})
    assert response.status_code == 422
