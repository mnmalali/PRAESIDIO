// SPDX-License-Identifier: Apache-2.0
"use client";
export type LoadState = "loading" | "ready" | "error";
export function RequestState({
  state,
  title,
}: {
  state: LoadState;
  title: string;
}) {
  return (
    <section
      className="border border-surface-border rounded-xl bg-surface-raised p-6"
      aria-busy={state === "loading"}
    >
      <h1 className="text-xl text-ink mb-3">{title}</h1>
      {state === "error" ? (
        <>
          <p role="alert" className="text-sm text-ink-2 mb-4">
            We couldn’t load this data. Check your connection and permissions,
            then try again.
          </p>
          <button
            className="px-4 py-2 border border-surface-border rounded-lg text-sm hover:bg-surface-hover"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </>
      ) : (
        <p role="status" className="text-sm text-ink-3">
          Loading {title.toLowerCase()}…
        </p>
      )}
    </section>
  );
}
