"use client";
import { useState } from "react";

const scenarios = [
  {
    label: "Risky action",
    status: "Denied",
    tone: "denied",
    tool: "send_customer_export",
    input: "destination: external-mailbox.example",
    intent: "Summarize support tickets",
    reason:
      "The proposed export leaves the agent’s support remit. This sample policy blocks the action.",
    outcome: "Tool execution prevented",
    code: "M4 · Out of remit",
    receipt: "DEMO-0142",
  },
  {
    label: "Routine action",
    status: "Allowed",
    tone: "allowed",
    tool: "search_help_center",
    input: "query: reset account password",
    intent: "Find the account recovery guide",
    reason:
      "The proposed read-only lookup stays within the support task. This sample policy allows it.",
    outcome: "Continue with the lookup",
    code: "M0 · Within remit",
    receipt: "DEMO-0143",
  },
  {
    label: "Human review",
    status: "Held for review",
    tone: "held",
    tool: "issue_refund",
    input: "amount: 240 · currency: USD",
    intent: "Resolve a billing dispute",
    reason:
      "The proposed refund needs an operator’s decision under this sample review policy.",
    outcome: "Waiting for human approval",
    code: "M3 · Review required",
    receipt: "DEMO-0144",
  },
] as const;

export function Demo() {
  const [selected, setSelected] = useState(0);
  const s = scenarios[selected];
  return (
    <section
      className="decision-console"
      id="demo"
      aria-labelledby="demo-heading"
    >
      <div className="console-top">
        <h2 id="demo-heading">Action inspector</h2>
        <span className="demo-label">SIMULATED DEMO</span>
      </div>
      <fieldset className="scenario-picker">
        <legend className="sr-only">Choose a sample scenario</legend>
        {scenarios.map((scenario, i) => (
          <label key={scenario.label}>
            <input
              type="radio"
              name="scenario"
              checked={selected === i}
              onChange={() => setSelected(i)}
            />
            <span>{scenario.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="decision-body" aria-live="polite" aria-atomic="true">
        <div className="agent-line">
          <span className="agent-avatar" aria-hidden="true">
            S
          </span>
          <div>
            <strong>Support agent</strong>
            <span>{s.intent}</span>
          </div>
          <span className="mono agent-id">agent / 07</span>
        </div>
        <div className="tool-step">
          <div className="step-label">
            <span>01 / Proposed tool call</span>
            <span aria-hidden="true">↳</span>
          </div>
          <code className="tool-name">
            {s.tool}
            <span>()</span>
          </code>
          <code className="tool-input">{s.input}</code>
        </div>
        <div className="trace-line" aria-hidden="true">
          <span />
        </div>
        <div className={`receipt ${s.tone}`}>
          <div className="receipt-top">
            <span className="decision-status">
              <span aria-hidden="true">
                {s.tone === "denied" ? "⊘" : s.tone === "allowed" ? "✓" : "Ⅱ"}
              </span>
              {s.status}
            </span>
            <span className="mono">02 / Policy decision</span>
          </div>
          <p>{s.reason}</p>
          <div className="receipt-bottom">
            <span>{s.code}</span>
            <span className="mono">{s.receipt}</span>
          </div>
        </div>
        <div className="outcome">
          <span aria-hidden="true">↳</span> {s.outcome}
        </div>
      </div>
      <p className="demo-note">
        Illustrative scenarios. No live agent or model connected.
      </p>
    </section>
  );
}
