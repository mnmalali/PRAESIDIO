---
description: Show Praesidio security status - backend URL, key presence, and connection health.
---

Report the current Praesidio configuration and whether it can reach the backend.
NEVER print, `cat`, or `echo` the API key value or the `.env` contents.

Check connectivity + auth (prints OK/FAIL + backend mode, never the key):
```
praesidio-python -m praesidio_cc.agent verify
```
Report its output verbatim.

If the key is missing or `verify` FAILs, suggest running `/praesidio-cc:praesidio-init`.
