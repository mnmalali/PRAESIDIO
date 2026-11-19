# SPDX-License-Identifier: Apache-2.0
# Copyright (c) 2026 SecureAgentics

"""PII detection and redaction for Praesidio events.

Provides standalone ``redact_text()`` for arbitrary strings and
``PiiRedactor`` for redacting ``PairedEvent`` objects.  Redaction
is always on inside ``praesidio.init()``: every registered handler is
wrapped in ``RedactingHandler`` automatically, with no opt-out.
"""

from praesidio.pii._engine import PiiConfig, RedactionResult, redact_text
from praesidio.pii._patterns import Detection, PiiType
from praesidio.pii._redactor import PiiRedactor, RedactingHandler
from praesidio.pii._strategies import RedactionStrategy

__all__ = [
    "Detection",
    "PiiConfig",
    "PiiRedactor",
    "PiiType",
    "RedactionResult",
    "RedactingHandler",
    "RedactionStrategy",
    "redact_text",
]
