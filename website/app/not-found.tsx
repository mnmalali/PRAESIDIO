import Link from "next/link";
export default function NotFound() {
  return (
    <div className="wrap document">
      <p className="eyebrow">404 / Page unavailable</p>
      <h1>This path ends here.</h1>
      <p className="lead">
        The page may have moved, or this address does not exist.
      </p>
      <Link href="/" className="button primary">
        Return home →
      </Link>
    </div>
  );
}
