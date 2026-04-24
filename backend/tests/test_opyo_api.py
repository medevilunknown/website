"""OPYO Studio backend API tests."""
import os
import pytest
import requests
from datetime import datetime

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://opyo-studio.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


# ============ Health / Root ============

class TestHealth:
    def test_root(self):
        r = requests.get(f"{API}/")
        assert r.status_code == 200
        d = r.json()
        assert d.get("service") == "OPYO.API"
        assert d.get("status") == "online"
        assert "version" in d

    def test_health(self):
        r = requests.get(f"{API}/health")
        assert r.status_code == 200
        d = r.json()
        assert d.get("status") == "ok"


# ============ Seeded Projects ============

class TestProjects:
    def test_projects_six_seeded(self):
        r = requests.get(f"{API}/projects")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6, f"expected 6 projects, got {len(data)}"
        required = {"id", "code", "name", "tagline", "description", "category", "status", "order"}
        for p in data:
            missing = required - set(p.keys())
            assert not missing, f"missing keys: {missing} in {p}"
            assert "_id" not in p

    def test_projects_sorted_by_order(self):
        r = requests.get(f"{API}/projects")
        data = r.json()
        orders = [p["order"] for p in data]
        assert orders == sorted(orders)


# ============ Seeded People ============

class TestPeople:
    def test_people_six_seeded(self):
        r = requests.get(f"{API}/people")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6
        for p in data:
            assert "_id" not in p
            assert "name" in p and "role" in p and "bio" in p


# ============ Careers ============

class TestCareers:
    def test_apply_valid_full(self):
        payload = {
            "name": "TEST_Applicant",
            "email": "test_applicant@example.com",
            "role": "Engineer",
            "portfolio_url": "https://example.com/portfolio",
            "message": "I would love to join OPYO and build the future."
        }
        r = requests.post(f"{API}/careers/apply", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert "id" in d
        assert d["name"] == payload["name"]
        assert d["email"] == payload["email"]
        assert "created_at" in d
        # ISO parse check
        datetime.fromisoformat(d["created_at"].replace("Z", "+00:00"))
        assert "_id" not in d

        # GET back and verify persistence
        r2 = requests.get(f"{API}/careers/applications")
        assert r2.status_code == 200
        apps = r2.json()
        assert any(a["id"] == d["id"] for a in apps)

    def test_apply_without_portfolio(self):
        payload = {
            "name": "TEST_NoPortfolio",
            "email": "tnp@example.com",
            "role": "Designer",
            "message": "Message long enough for validation."
        }
        r = requests.post(f"{API}/careers/apply", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["portfolio_url"] in (None, "")

    def test_apply_invalid_email(self):
        payload = {
            "name": "TEST_BadEmail",
            "email": "not-an-email",
            "role": "Engineer",
            "message": "Long enough message here."
        }
        r = requests.post(f"{API}/careers/apply", json=payload)
        assert r.status_code == 422

    def test_apply_short_name(self):
        payload = {
            "name": "A",
            "email": "a@example.com",
            "role": "Engineer",
            "message": "Long enough message here."
        }
        r = requests.post(f"{API}/careers/apply", json=payload)
        assert r.status_code == 422

    def test_apply_short_message(self):
        payload = {
            "name": "TEST_ShortMsg",
            "email": "sm@example.com",
            "role": "Engineer",
            "message": "short"
        }
        r = requests.post(f"{API}/careers/apply", json=payload)
        assert r.status_code == 422

    def test_applications_sorted_desc(self):
        r = requests.get(f"{API}/careers/applications")
        assert r.status_code == 200
        apps = r.json()
        if len(apps) >= 2:
            times = [a["created_at"] for a in apps]
            assert times == sorted(times, reverse=True)
        for a in apps:
            assert "_id" not in a
