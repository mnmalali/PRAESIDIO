"""Isolated synthetic runtime for local QA; never use as a production classifier.

Creates a temporary database outside the source tree, uses real backend auth,
and saves a short-lived browser session only in ignored .playwright-cli/.
No customer data, real model, paid provider, or external notifications.
"""

from __future__ import annotations
import importlib.util
import json
import os
from pathlib import Path
import secrets
import subprocess
import tempfile
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
STATE = ROOT / ".playwright-cli"
STATE.mkdir(exist_ok=True)
binary = Path(os.environ["LOCALAPPDATA"]) / "praesidio-tools/praesidio.exe"


class FixtureClassifier(BaseHTTPRequestHandler):
    def log_message(self, *_):
        pass

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(b'{"data":[],"status":"synthetic-fixture"}')

    def do_POST(self):
        self.rfile.read(int(self.headers.get("Content-Length", "0")))
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(b'{"choices":[{"message":{"content":"M0"}}]}')


def request(path, data=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = Request(
        "http://127.0.0.1:18080" + path,
        data=json.dumps(data).encode() if data is not None else None,
        headers=headers,
    )
    try:
        with urlopen(req, timeout=5) as res:
            body = res.read()
            parsed = (
                json.loads(body)
                if body and "application/json" in res.headers.get("Content-Type", "")
                else None
            )
            return res.status, parsed, res.headers
    except HTTPError as error:
        return error.code, None, error.headers


with tempfile.TemporaryDirectory(prefix="praesidio-qa-") as tmp:
    spec = importlib.util.spec_from_file_location(
        "praesidio_setup", ROOT / "scripts/setup.py"
    )
    setup = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(setup)
    db_path = Path(tmp) / "synthetic.db"
    conn = setup.open_db(db_path)
    setup.apply_migrations(conn, ROOT / "backend/migrations")
    password = secrets.token_urlsafe(24)
    setup.upsert_admin(conn, "admin@localhost", setup.hash_password(password))
    conn.close()
    server = ThreadingHTTPServer(("127.0.0.1", 18081), FixtureClassifier)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    env = dict(
        os.environ,
        PRAESIDIO_BACKEND_PORT="18080",
        PRAESIDIO_DB_PATH=str(db_path),
        PRAESIDIO_DASHBOARD_URL="http://localhost:3000",
        PRAESIDIO_LLM_URL="http://127.0.0.1:18081/v1/chat/completions",
        PRAESIDIO_LLM_API_KEY="synthetic-fixture-only",
        PRAESIDIO_LLM_MODEL="synthetic-fixture",
        PRAESIDIO_LLM_MODEL_PATH="synthetic-fixture-no-model",
        PRAESIDIO_SESSION_SECRET=secrets.token_urlsafe(32),
    )
    with (Path(tmp) / "backend.log").open("w", encoding="utf-8") as log:
        process = subprocess.Popen(
            [str(binary)], cwd=tmp, env=env, stdout=log, stderr=log
        )
        try:
            for _ in range(60):
                try:
                    if request("/healthz")[0] == 200:
                        break
                except (URLError, TimeoutError):
                    time.sleep(0.25)
            checks = []

            def check(name, actual, expected):
                assert actual == expected, (name, actual, expected)
                checks.append({"check": name, "result": "PASS", "status": actual})

            check("Health", request("/healthz")[0], 200)
            check("Readiness with synthetic classifier", request("/readyz")[0], 200)
            check("Unauthenticated protected data", request("/api/events")[0], 401)
            check(
                "Forged session rejected",
                request("/api/events", token="synthetic-invalid")[0],
                401,
            )
            check(
                "Wrong password",
                request(
                    "/api/auth/login",
                    {"email": "admin@localhost", "password": "invalid"},
                )[0],
                401,
            )
            status, body, headers = request(
                "/api/auth/login", {"email": "admin@localhost", "password": password}
            )
            check("Login", status, 200)
            assert body["data"]["must_change_password"] is True
            cookie = headers.get("Set-Cookie")
            assert (
                "HttpOnly" in cookie and "Secure" in cookie and "SameSite=Lax" in cookie
            )
            token = cookie.split(";")[0].split("=", 1)[1]
            check(
                "First login requires rotation",
                request("/api/events", token=token)[0],
                403,
            )
            check(
                "Password rotation",
                request(
                    "/api/auth/change-password",
                    {
                        "old_password": password,
                        "new_password": secrets.token_urlsafe(24),
                    },
                    token,
                )[0],
                204,
            )
            for endpoint in [
                "/auth/me",
                "/events",
                "/verdicts",
                "/agents",
                "/agent-profiles",
                "/keys",
                "/settings/policy",
                "/stats/overview",
                "/stats/activity",
                "/reviews",
                "/mcp/servers",
                "/audit-log",
            ]:
                check(endpoint, request("/api" + endpoint, token=token)[0], 200)
            storage = {
                "cookies": [
                    {
                        "name": "praesidio_token",
                        "value": token,
                        "domain": "localhost",
                        "path": "/",
                        "expires": time.time() + 3600,
                        "httpOnly": True,
                        "secure": True,
                        "sameSite": "Lax",
                    }
                ],
                "origins": [],
            }
            (STATE / "qa-auth.json").write_text(json.dumps(storage), encoding="utf-8")
            (ROOT / "docs/praesidio/runtime-qa.json").write_text(
                json.dumps(
                    {
                        "mode": "SYNTHETIC CLASSIFIER; REAL BACKEND AUTH + SQLITE",
                        "checks": checks,
                    },
                    indent=2,
                ),
                encoding="utf-8",
            )
            print(
                f"QA runtime ready: {len(checks)} checks passed. Synthetic classifier only. Session saved to ignored browser state.",
                flush=True,
            )
            while not (STATE / "stop-runtime").exists():
                time.sleep(1)
        finally:
            process.terminate()
            process.wait(timeout=10)
            server.shutdown()
            (STATE / "qa-auth.json").unlink(missing_ok=True)
            (STATE / "stop-runtime").unlink(missing_ok=True)
