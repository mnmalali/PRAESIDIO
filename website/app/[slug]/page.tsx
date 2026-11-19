import { notFound } from "next/navigation";
import Link from "next/link";
import { pageMetadata, repositoryUrl } from "../../lib/site";

const pages = {
  product: [
    "A checkpoint for agent actions.",
    "Inspect the context. Apply your policy. Keep a human close to consequential decisions.",
  ],
  security: [
    "Understand the boundary.",
    "Runtime analysis is one layer of defense. Know where enforcement happens, how failures behave, and what remains your responsibility.",
  ],
  docs: [
    "From source to oversight.",
    "Run the security engine on your infrastructure. Keep the public website separate from your private agent telemetry.",
  ],
  changelog: [
    "A record of what changed.",
    "Development notes for this independent derivative. No invented releases or performance claims.",
  ],
  about: [
    "Autonomy, with accountability.",
    "PRAESIDIO AI brings agent activity, model-assisted analysis, policy, and human review into one inspectable workflow.",
  ],
  contact: [
    "Start with the context.",
    "A public PRAESIDIO support address and issue tracker have not been configured yet.",
  ],
} as const;
export const dynamicParams = false;
type Slug = keyof typeof pages;
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in pages)) return {};
  const [title, description] = pages[slug as Slug];
  return pageMetadata(title, description, `/${slug}`);
}
export default async function Document({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in pages)) notFound();
  const [title, description] = pages[slug as Slug];
  return (
    <article className="wrap document">
      <p className="eyebrow">
        PRAESIDIO /{" "}
        {slug === "docs"
          ? "Documentation"
          : slug.charAt(0).toUpperCase() + slug.slice(1)}
      </p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      {slug === "product" && (
        <>
          <section>
            <h2>Guard: respond at the tool boundary</h2>
            <p>
              The SDK captures paired events and receives policy verdicts over
              WebSocket. Supported integrations can gate proposed tool execution
              in block or human review mode. Alert mode records activity without
              stopping tools.
            </p>
            <p>
              Integration coverage and failure behavior vary.{" "}
              <Link href="/security">Read the enforcement limits</Link> before
              connecting a consequential workflow.
            </p>
          </section>
          <section>
            <h2>Intelligence: assess actions in context</h2>
            <p>
              The Go engine builds a context window from agent activity,
              available reasoning, and the configured agent remit. It calls an
              OpenAI-compatible classifier endpoint and records the returned
              classification and reasoning.
            </p>
            <p>
              Model output is fallible. No measured detection-accuracy claim is
              made for PRAESIDIO.
            </p>
          </section>
          <section>
            <h2>Verify: review before resuming</h2>
            <p>
              The dashboard review queue supports approval and rejection for
              eligible held actions. The agent must remain connected and
              waiting; a persisted review is not a guarantee that a restarted
              SDK can resume.
            </p>
          </section>
          <section>
            <h2>Evidence: investigate the session</h2>
            <p>
              Browse agents, sessions, paired events, verdicts, and audit
              records. Manage API keys, agent profiles, policy, MCP inventory,
              and optional webhook notifications from the private dashboard.
            </p>
            <Link className="button" href="/#demo">
              Inspect a sample decision →
            </Link>
          </section>
        </>
      )}
      {slug === "security" && (
        <>
          <p className="notice">
            Development status: not certified or declared production-ready. Live
            classifier inference and deployment-specific enforcement still
            require validation.
          </p>
          <section>
            <h2>What enforces a decision?</h2>
            <p>
              The backend returns a verdict; supported SDK hooks enforce it in
              the tool execution path. Tools called outside those hooks are
              outside this boundary. Alert mode deliberately does not block.
            </p>
            <p>
              Use deterministic tool permissions, scoped credentials,
              operating-system isolation, and least privilege alongside
              model-assisted analysis. The classifier must never be your only
              authority for a hard permission boundary.
            </p>
          </section>
          <section>
            <h2>Failure is not a benign verdict</h2>
            <p>
              The supplied backend records classifier failures as an error with
              no model classification. This differs from older upstream
              architecture prose that described synthetic benign results.
            </p>
            <p>
              The supplied TypeScript gate allows execution when policy
              readiness fails or a verdict times out. Python includes
              fail-closed paths, but behavior is not uniform across
              integrations. PRAESIDIO does not claim universal fail-closed
              protection.
            </p>
          </section>
          <section>
            <h2>Your data and your providers</h2>
            <p>
              SDK defaults point to a local backend. Your configured classifier
              receives the context needed for analysis, which may include
              sensitive activity and reasoning. Configure redaction, retention,
              network boundaries, and provider access deliberately.
            </p>
            <p>
              Notifications go to explicitly configured destinations. This
              public website’s demo uses only local fixtures and never sends
              agent data or API keys to a backend.
            </p>
          </section>
          <section>
            <h2>Operate the private console separately</h2>
            <p>
              The dashboard uses authenticated backend sessions. Keep it behind
              appropriate network controls and TLS, protect the SQLite volume,
              rotate credentials, and test both authentication and authorization
              in your deployment.
            </p>
            <p>
              Do not expose the authenticated dashboard as an unprotected
              marketing demo. A UI cookie check alone does not validate a
              session; the backend must validate protected API requests.
            </p>
          </section>
          <section>
            <h2>Transparent origin</h2>
            <p>
              Released under Apache-2.0. Original source and notices
              are retained. <Link href="/about">Read the attribution</Link>.
            </p>
          </section>
        </>
      )}
      {slug === "docs" && (
        <>
          <section>
            <h2>Get PRAESIDIO</h2>
            <p>
              Download the source and read the setup guides in the{" "}
              <a href={repositoryUrl}>PRAESIDIO GitHub repository</a>.
            </p>
          </section>
          <section>
            <h2>01 / Prepare the runtime</h2>
            <p>
              Use the supplied PRAESIDIO source directory. You need Docker with
              Compose v2. The bundled llama.cpp profile expects NVIDIA drivers
              and container GPU support. Place a compatible, properly licensed
              GGUF model in <code>models/</code>; size and memory requirements
              depend on the model.
            </p>
            <p>
              Model inference has not been verified on every GPU. A 4 GB device
              may not fit the recommended model and context together.
            </p>
          </section>
          <section>
            <h2>02 / Bootstrap and start</h2>
            <pre tabIndex={0}>
              <code>
                {
                  "docker compose --profile setup run --rm setup bootstrap --gguf your-model.gguf\ndocker compose --profile llm up -d"
                }
              </code>
            </pre>
            <p>
              Replace <code>your-model.gguf</code> with the actual file name.
              Bootstrap writes local configuration, applies database migrations,
              and prints an initial administrator password. Keep that password
              private.
            </p>
            <p>
              Open <code>http://localhost:3000</code>, sign in as{" "}
              <code>admin@localhost</code>, and change the initial password.
              Configure an agent profile, its execution mode, and an API key in
              Settings.
            </p>
          </section>
          <section>
            <h2>03 / Connect the bundled SDK</h2>
            <pre tabIndex={0}>
              <code>
                {
                  "python -m venv .venv\n# Activate the environment using your shell\npython -m pip install -e ./sdk/python"
                }
              </code>
            </pre>
            <p>
              Use your environment or secret manager to supply{" "}
              <code>PRAESIDIO_API_KEY</code>.
            </p>
            <pre tabIndex={0}>
              <code>
                {
                  'import os\nimport praesidio\n\npraesidio.init(\n    api_key=os.environ["PRAESIDIO_API_KEY"],\n    ws_url="ws://localhost:8080/ws",\n)\n# Run your supported agent here.\n# Use shutdown in your agent’s normal cleanup path.\npraesidio.shutdown()'
                }
              </code>
            </pre>
            <p>
              This is connection scaffolding, not a runnable model example. Run
              an actual supported agent between initialization and cleanup. The
              TypeScript core and OpenAI adapter live under{" "}
              <code>sdk/typescript/</code> under the PRAESIDIO package names.
            </p>
          </section>
          <section>
            <h2>04 / Verify your boundary</h2>
            <p>
              Use synthetic actions to verify allowed, denied, review,
              disconnect, and classifier-error paths. Confirm the real tool did
              not execute when denied. Review{" "}
              <Link href="/security">known failure behavior</Link> before using
              sensitive tools.
            </p>
            <h3>Reset a lost administrator password</h3>
            <pre tabIndex={0}>
              <code>
                {"docker compose --profile setup run --rm setup reset-password"}
              </code>
            </pre>
            <p>
              See the <a href={repositoryUrl}>repository SDK guides</a> for further configuration.
            </p>
          </section>
        </>
      )}
      {slug === "changelog" && (
        <section>
          <p className="mono">2026-11-19 / Development snapshot</p>
          <h2>PRAESIDIO takes shape</h2>
          <ul>
            <li>
              Preserved the supplied source and recorded a local baseline
              with file hashes.
            </li>
            <li>
              Introduced an independent PRAESIDIO identity and public website.
            </li>
            <li>
              Added a browser-only simulated decision inspector and
              security-boundary documentation.
            </li>
            <li>
              Kept the private dashboard, backend, model integration, and SDK
              contracts separate from the website.
            </li>
          </ul>
          <p>
            This is a development record, not a production release announcement.
            Test evidence and open issues live in the repository’s{" "}
            <code>docs/praesidio/</code> reports.
          </p>
        </section>
      )}
      {slug === "about" && (
        <>
          <section>
            <h2>Source and license</h2>
            <p>
              PRAESIDIO AI is an independent derivative distributed under the{" "}
              <a href="/LICENSE.txt">Apache License 2.0</a>. It is not an
              official service of the original authors and does not imply endorsement.
              Full source acknowledgments are in the{" "}
              <a href={`${repositoryUrl}/blob/main/UPSTREAM_ATTRIBUTION.md`}>
                repository attribution file
              </a>.
            </p>
            <p>
              The derivative adds original branding, a separate public website,
              dashboard presentation improvements, and validation documentation.
              Original copyright notices remain in the source.
            </p>
          </section>
          <section>
            <h2>Design with a purpose</h2>
            <p>
              The visual system centers on a proposed action, a policy decision,
              and an evidence receipt. Quiet surfaces leave room for the details
              an operator needs to inspect.
            </p>
            <p>
              Design workflow: Unslop by{" "}
              <a href="https://heydamir.design/unslop">Damir Sokolovsky</a> (CC
              BY 4.0), UI Skills by ibelick (MIT), and the project’s PRAESIDIO
              design guidance. The website uses original code-based graphics and
              system fonts.
            </p>
          </section>
        </>
      )}
      {slug === "contact" && (
        <>
          <section>
            <h2>For this development build</h2>
            <p>
              Contact the maintainer who supplied your PRAESIDIO source or
              installation. Include the affected integration, a minimal
              synthetic reproduction, and the relevant version. Keep API keys,
              private prompts, and raw customer data out of reports.
            </p>
            <p>
              No message is collected or submitted on this page. A verified
              support channel will be added when one is available.
            </p>
            <Link className="button" href="/docs">
              Read the setup guide →
            </Link>
          </section>
        </>
      )}
    </article>
  );
}
