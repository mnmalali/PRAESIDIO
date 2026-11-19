---
description: Configure the PRAESIDIO Claude Code security plugin for a self-hosted backend.
---

Set up this plugin in one session. Ask for the user's self-hosted WebSocket URL, defaulting to `ws://localhost:8080/ws`. Do not suggest a hosted PRAESIDIO service. Write `PRAESIDIO_WS_URL` to `~/.praesidio/.env`; preserve any existing `PRAESIDIO_API_KEY` without displaying it. If no key exists, tell the user to create one in the local dashboard and enter it into that file directly. Never ask for or echo the key in chat.

Set `PRAESIDIO_CC_VERDICT_TIMEOUT=15`. Explain that `PRAESIDIO_CC_FAIL_OPEN=true` allows tool calls if the backend is unavailable; set it according to the user's policy choice. When the key is set, run `praesidio-python -m praesidio_cc.agent verify` and report its OK/FAIL result without revealing credentials. Repeat verification after the user corrects a failed setting. Finish with the config file path and the verified result.
