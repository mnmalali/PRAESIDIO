---
name: praesidio-ai-redteam
description: Evaluate an owned LLM application or agent for prompt injection, leakage, tool misuse, and policy failures.
---

# PRAESIDIO AI evaluation

Define the application's intended behavior, protected data, tool permissions, and evaluation scope. Build tests for prompt injection, retrieval contamination, sensitive-data leakage, unsafe tool calls, and recovery after refusal. Use synthetic secrets and accounts.

Promptfoo, Garak, PyRIT, and AI-Infra-Guard are optional external evaluators. Pin their versions and review test data destinations before running them. Keep prompts, model configuration, and expected outcomes in versioned fixtures when permitted. Record both successful attacks and clean controls; a scanner score alone is insufficient evidence.

When PRAESIDIO is connected, compare its captured event, classifier result, policy decision, and actual application behavior. State whether a test was blocked, merely logged, or uninstrumented.
