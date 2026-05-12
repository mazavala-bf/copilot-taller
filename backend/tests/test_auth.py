"""Integration tests for the JWT Authentication API."""
import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _login() -> dict:
    """Helper: perform a successful login and return the token response dict."""
    response = client.post(
        "/auth/login",
        json={"username": "admin", "password": "admin123"},
    )
    assert response.status_code == 200
    return response.json()


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


# ---------------------------------------------------------------------------
# Login
# ---------------------------------------------------------------------------

def test_login_success():
    data = _login()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password():
    response = client.post(
        "/auth/login",
        json={"username": "admin", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert "detail" in response.json()


def test_login_unknown_user():
    response = client.post(
        "/auth/login",
        json={"username": "nobody", "password": "admin123"},
    )
    assert response.status_code == 401


# ---------------------------------------------------------------------------
# Refresh
# ---------------------------------------------------------------------------

def test_refresh_success():
    tokens = _login()
    response = client.post(
        "/auth/refresh",
        json={"refresh_token": tokens["refresh_token"]},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


def test_refresh_with_invalid_token():
    response = client.post(
        "/auth/refresh",
        json={"refresh_token": "this.is.not.a.valid.token"},
    )
    assert response.status_code == 401


def test_refresh_with_access_token_rejected():
    """Access tokens must NOT be accepted as refresh tokens."""
    tokens = _login()
    response = client.post(
        "/auth/refresh",
        json={"refresh_token": tokens["access_token"]},
    )
    assert response.status_code == 401
