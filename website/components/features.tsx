"use client";
import { useState } from "react";
import { Mark } from "./brand";

const modes = [
  {
    name: "Observe",
    title: "See the action in context.",
    copy: "Paired events bring the tool call, the agent’s task, and available reasoning into one view.",
    label: "Context captured",
    tone: "observe",
    rows: ["Agent remit", "Proposed tool call", "Available reasoning"],
  },
  {
    name: "Assess",
    title: "Give every verdict a reason.",
    copy: "Your configured model assesses the activity against the agent’s remit. The console keeps the classification and its reasoning together.",
    label: "Context → classification",
    tone: "assess",
    rows: ["Context window", "Model-assisted analysis", "Recorded verdict"],
  },
  {
    name: "Intervene",
    title: "Keep a human in the decision.",
    copy: "Supported SDK hooks can hold a flagged action for review. Approve or reject it from the console before the waiting agent continues.",
    label: "Held for review",
    tone: "intervene",
    rows: ["Policy: human review", "Operator decision", "Response to the SDK"],
  },
  {
    name: "Investigate",
    title: "Follow the evidence back.",
    copy: "Trace a verdict to the session and its events. Keep the context close when you investigate what happened.",
    label: "Decision recorded",
    tone: "investigate",
    rows: ["Session timeline", "Event and verdict", "Audit record"],
  },
] as const;

export function Features() {
  const [selected, setSelected] = useState(0);
  const mode = modes[selected];
  return (
    <div className="feature-explorer">
      <fieldset className="feature-switcher">
        <legend className="sr-only">Explore the security workflow</legend>
        {modes.map((m, i) => (
          <label key={m.name}>
            <input
              type="radio"
              name="workflow"
              checked={selected === i}
              onChange={() => setSelected(i)}
            />
            <span>
              <span className="mono">0{i + 1}</span>
              {m.name}
              <span aria-hidden="true">↗</span>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="feature-panel" aria-live="polite" aria-atomic="true">
        <div className="feature-copy">
          <span className="section-kicker">
            0{selected + 1} / {mode.name}
          </span>
          <h3>{mode.title}</h3>
          <p>{mode.copy}</p>
        </div>
        <div className={`workflow-visual ${mode.tone}`}>
          <span className="visual-caption">Illustrative workflow</span>
          <div className="workflow-card">
            <div className="workflow-card-title">
              <Mark />
              <span>PRAESIDIO AI</span>
              <span className="tiny-dot" />
            </div>
            {mode.rows.map((row, i) => (
              <div className="workflow-row" key={row}>
                <span className="step-circle">{i + 1}</span>
                <span>{row}</span>
                <span aria-hidden="true">{i === 2 ? "↗" : "✓"}</span>
              </div>
            ))}
            <div className="workflow-result">
              {mode.label}
              <span aria-hidden="true">↳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
