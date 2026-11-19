import Image from "next/image";
import Link from "next/link";
import { Demo } from "../components/demo";
import { Features } from "../components/features";
import { LogoJourney } from "../components/motion";
import { Mark } from "../components/brand";
import { pageMetadata, repositoryUrl } from "../lib/site";

export const metadata = pageMetadata(
  "Runtime security for autonomous agents",
  "Let agents work. Stay in control with model-assisted analysis, policy decisions, human review and evidence.",
  "/",
);

export default function Home() {
  return (
    <div className="home-page">
      <LogoJourney />
      <section className="hero">
        <div className="hero-light" aria-hidden="true" />
        <div className="binary-field" aria-hidden="true">{Array.from({length: 18}, (_, row) => <div key={row}>{Array.from({length: 95}, (_, col) => ((row * 17 + col * 13) % 7 < 3 ? "1" : "0")).join("  ")}</div>)}</div>
        <div className="hero-copy wrap">
          <p className="eyebrow">
            <span className="small-mark" />
            Runtime security for autonomous agents
          </p>
          <h1>
            Let agents work.
            <br />
            <span>Stay in control.</span>
          </h1>
          <p className="hero-description">
            Give your agents room to act.
            <br className="desktop-break" /> Bring context, policy, and human
            judgment to the moment that matters.
          </p>
          <div className="actions">
            <Link className="button primary" href="#demo">
              Explore the demo <span aria-hidden="true">↗</span>
            </Link>
            <a className="button quiet" href={repositoryUrl}>
              View source on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="product-stage wrap">
          <div className="stage-caption">
            <span>
              <span className="tiny-dot" />
              From proposed action to considered decision
            </span>
            <span className="mono">PRAESIDIO / 01</span>
          </div>
          <Demo />
          <p className="stage-note">
            A little more context. A better place to intervene.
          </p>
        </div>
      </section>
      <section
        className="integrations wrap"
        aria-label="Supported integrations"
      >
        <p>Fits the way you build agents.</p>
        <ul>
          {[["python", "Python"], ["typescript", "TypeScript"], ["langchain", "LangChain / LangGraph"], ["anthropic", "Anthropic"], ["openai", "OpenAI"], ["claude", "Claude Code"]].map(([icon, name]) => <li key={icon}><Image src={`/logos/${icon}.${icon === "hermes" ? "png" : "svg"}`} width={28} height={28} alt="" />{name}</li>)}
        </ul>
        <p className="ecosystem-label">Also in the agent ecosystem</p>
        <ul>{[["hermes", "Hermes Agent"], ["openclaw", "OpenClaw"]].map(([icon, name]) => <li key={icon}><Image src={`/logos/${icon}.${icon === "hermes" ? "png" : "svg"}`} width={28} height={28} alt="" />{name}</li>)}</ul>
        <p className="integration-note">Hermes Agent and OpenClaw compatibility has not yet been verified.</p>
      </section>
      <section className="section wrap workflow-section" id="how-it-works">
        <div className="section-heading centered">
          <p className="section-kicker">The space between intent and action</p>
          <h2>
            Context. Judgment.
            <br />
            <span>A clear next step.</span>
          </h2>
          <p>
            Follow an agent action from the first signal to the final decision.
            Keep the reason and the record together.
          </p>
        </div>
        <Features />
        <p className="boundary-note">
          Enforcement depends on the integration, policy, and failure path.{" "}
          <Link href="/security">
            Understand the security boundary <span aria-hidden="true">↗</span>
          </Link>
        </p>
      </section>
      <section className="control-section">
        <div className="wrap section">
          <div className="section-heading">
            <p className="section-kicker">
              Built for the people behind the agents
            </p>
            <h2>
              More autonomy.
              <br />
              <span>Less guesswork.</span>
            </h2>
          </div>
          <div className="control-grid">
            <article className="context-feature">
              <div
                className="feature-illustration context-illustration"
                aria-hidden="true"
              >
                <div className="context-source">
                  <span className="mini-label">Agent context</span>
                  <strong>
                    Help the customer.
                    <br />
                    Stay within the remit.
                  </strong>
                  <div className="context-chips">
                    <span>Task</span>
                    <span>Tool</span>
                    <span>Reasoning</span>
                  </div>
                </div>
                <div className="context-connector">↓</div>
                <div className="context-verdict">
                  <Mark />
                  <div>
                    <span>Model-assisted assessment</span>
                    <strong>The reason behind the verdict.</strong>
                  </div>
                  <span>↗</span>
                </div>
              </div>
              <div className="card-copy">
                <span className="section-kicker">01 / Intelligence</span>
                <h3>Understand more than the tool call.</h3>
                <p>
                  Assess activity with the agent’s remit and available
                  reasoning. Examine the context behind a classification.
                </p>
              </div>
            </article>
            <article className="review-feature">
              <div
                className="feature-illustration review-illustration"
                aria-hidden="true"
              >
                <div className="review-mini">
                  <span className="review-tag">Human review</span>
                  <h4>A decision worth a second look.</h4>
                  <div className="review-tool">
                    <code>issue_refund()</code>
                    <span>$240.00</span>
                  </div>
                  <div className="review-actions">
                    <span>Reject</span>
                    <span>Approve ↗</span>
                  </div>
                  <small>Illustrative review state</small>
                </div>
              </div>
              <div className="card-copy">
                <span className="section-kicker">02 / Human judgment</span>
                <h3>Pause at the consequential moments.</h3>
                <p>
                  Review held actions from the console. Give the waiting agent
                  an explicit approval or rejection.
                </p>
              </div>
            </article>
            <article className="evidence-feature">
              <div className="card-copy">
                <span className="section-kicker">03 / Evidence</span>
                <h3>
                  Every decision has a story.
                  <br />
                  Keep it within reach.
                </h3>
                <p>
                  Move from a verdict to the events and session behind it.
                  Inspect what happened with the context still attached.
                </p>
                <Link className="text-link" href="/product">
                  Explore the platform <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="evidence-visual" aria-hidden="true">
                <div className="evidence-title">
                  <span>Session timeline</span>
                  <span>Illustrative</span>
                </div>
                <div>
                  <time>14:02:08</time>
                  <i />
                  <span>Agent task received</span>
                </div>
                <div>
                  <time>14:02:09</time>
                  <i />
                  <span>Tool action proposed</span>
                </div>
                <div className="highlight-event">
                  <time>14:02:09</time>
                  <i />
                  <span>
                    Held for review <small>Policy decision</small>
                  </span>
                </div>
                <div>
                  <time>14:02:12</time>
                  <i />
                  <span>Operator response recorded</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="self-host section wrap" id="self-host">
        <div>
          <p className="section-kicker">Your infrastructure. Your context.</p>
          <h2>
            Keep the engine
            <br />
            <span>close to your agents.</span>
          </h2>
          <p>
            A private dashboard, a Go security engine, and a configurable model.
            Deploy the stack where it belongs: with you.
          </p>
          <Link className="button primary" href="/docs">
            Read the self-hosting guide <span aria-hidden="true">↗</span>
          </Link>
          <div className="host-facts">
            <span>Local model support</span>
            <span>Python + TypeScript SDKs</span>
            <span>Apache-2.0 foundation</span>
          </div>
        </div>
        <div className="code-panel">
          <div className="code-header">
            <span>
              <i />
              <i />
              <i />
            </span>
            <span className="mono">quickstart.sh</span>
            <span>01</span>
          </div>
          <pre tabIndex={0}>
            <code>
              <span className="code-comment">
                # Bootstrap with your local model
              </span>
              {
                "\ndocker compose --profile setup run --rm \\\n  setup bootstrap --gguf your-model.gguf\n\n"
              }
              <span className="code-comment">
                # Start the runtime and dashboard
              </span>
              {"\ndocker compose --profile llm up -d"}
            </code>
          </pre>
          <div className="code-footer">
            <span className="tiny-dot" />
            <p>
              Docker + Compose and a compatible GGUF model required. The bundled
              profile expects NVIDIA GPU support.
            </p>
          </div>
        </div>
      </section>
      <section className="faq section wrap">
        <div className="section-heading centered">
          <p className="section-kicker">A few things worth knowing</p>
          <h2>
            Clear answers.
            <br />
            <span>Before you connect.</span>
          </h2>
        </div>
        <div className="faq-list">
          {[
            [
              "Is the demo using a live model?",
              "No. The scenarios use deterministic fixtures in your browser. No agent, tool, or model is connected to this public demonstration.",
            ],
            [
              "Does it guarantee every unsafe action is blocked?",
              "No. Enforcement is limited to supported, instrumented execution paths. Classifiers can be wrong, and some SDK failure paths allow actions. Use least-privilege tool permissions alongside runtime analysis.",
            ],
            [
              "Can I run it without a paid AI service?",
              "Yes, with a suitable local OpenAI-compatible model endpoint. You supply the hardware and licensed model weights. The website demo needs neither a provider nor an API key.",
            ],
            [
              "Where does my agent data go?",
              "Your SDK connects to your configured backend. The classifier receives the context needed for analysis. Choose your provider, redaction, retention, and network boundaries deliberately.",
            ],
            [
              "Is PRAESIDIO open source?",
              "Yes. PRAESIDIO is available under Apache-2.0. Source provenance and third-party notices are documented on the About page.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="closing">
        <div className="wrap">
          <div className="closing-mark">
            <Mark />
          </div>
          <p className="section-kicker">Built for considered autonomy</p>
          <h2>
            Let agents move.
            <br />
            Keep your say.
          </h2>
          <p>Start with a clear view of the next action.</p>
          <div className="actions">
            <Link className="button primary" href="/docs">
              Build your first boundary <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button quiet" href="/security">
              Read the security model <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
