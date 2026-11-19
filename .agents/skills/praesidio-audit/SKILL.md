---
name: praesidio-audit
description: Audit source code and architecture for exploitable security issues, validate findings, and prepare evidence-based remediation.
---

# PRAESIDIO source audit

Start with entry points, trust boundaries, authentication, authorization, secret handling, and external data flows. Trace each candidate from controllable source to sensitive sink and inspect guards in the actual execution path. Separate hypotheses from validated findings; give reproducible evidence, affected code, preconditions, impact, and a narrow fix.

Use available local analyzers such as Semgrep or Codex Security as supporting signals. Treat their output as leads until source review confirms exploitability. Review the diff after patching and run the affected tests. For multi-component issues, ask an independent reviewer to challenge the finding when one is available and authorized.

PRAESIDIO's runtime verdicts are additional evidence, not proof that source code is safe. Do not infer detection rates or prevention guarantees from fixtures.
