# SPDX-License-Identifier: Apache-2.0
# Copyright (c) 2026 SecureAgentics
#
# Licensed under the Apache Licence, Version 2.0 (the "Licence").
# You may not use this file except in compliance with the Licence.
# A copy of the Licence is included at LICENSE in the repository root.
"""Streaming quickstart: monitor Anthropic streamed calls with Praesidio.

The streaming counterpart to ``anthropic_quickstart.py``.  Text deltas arrive as
usual; the Praesidio event is emitted -- and, under BLOCK / HITL, the verdict gate
runs -- when the final message is requested.

Run::

    export ANTHROPIC_API_KEY="sk-ant-..."
    python examples/python/anthropic_streaming.py
"""

from __future__ import annotations

import asyncio
import os

import anthropic
import praesidio

# ------------------------------------------------------------------
# 1. Initialise Praesidio.  This auto-instruments Anthropic by default.
# ------------------------------------------------------------------
praesidio.init(
    api_key=os.environ.get("PRAESIDIO_API_KEY", ""),
    session_id="anthropic-streaming-session",
)

client = anthropic.AsyncAnthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


async def main() -> None:
    print("Streaming response...\n")

    # ------------------------------------------------------------------
    # 2. Wrap the call so the event carries a real invocation_id.  Without
    #    this it is emitted as "no_invocation" -- a raw Anthropic call has no
    #    unit of work for Praesidio to scope an invocation to.
    # ------------------------------------------------------------------
    async with praesidio.anthropic_invocation():
        async with client.messages.stream(
            model="claude-haiku-4-5-20251001",
            max_tokens=256,
            system="You are a concise assistant.",
            messages=[{"role": "user", "content": "Count to five, one word per line."}],
        ) as stream:
            # Text deltas stream through untouched.
            async for text in stream.text_stream:
                print(text, end="", flush=True)

            # ------------------------------------------------------------------
            # 3. The Praesidio event is emitted here.  Under BLOCK / HITL this also
            #    holds for the classifier verdict and rewrites any halted
            #    tool_use block to "[BLOCKED by security policy]".
            # ------------------------------------------------------------------
            message = await stream.get_final_message()

    print(f"\n\nStop reason: {message.stop_reason}")

    # ------------------------------------------------------------------
    # 4. Always shut down Praesidio cleanly to flush any pending events.
    # ------------------------------------------------------------------
    praesidio.shutdown()
    print("Done.  Check your Praesidio dashboard for the captured event.")


if __name__ == "__main__":
    asyncio.run(main())
