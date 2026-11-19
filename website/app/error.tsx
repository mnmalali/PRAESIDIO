"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="wrap document" role="alert">
      <h1>We couldn’t load this page.</h1>
      <p className="lead">Try loading it again.</p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
