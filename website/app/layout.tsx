import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Header } from "../components/header";
import { Mark } from "../components/brand";
import { origin, repositoryUrl } from "../lib/site";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionProvider } from "../components/motion";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PRAESIDIO AI | Runtime security for autonomous agents",
    template: "%s | PRAESIDIO AI",
  },
  description:
    "Inspect agent actions, understand risk, and intervene through policy and human review. Self-hosted AI-assisted runtime security.",
  metadataBase: new URL(origin || "http://127.0.0.1:3001"),
  robots: { index: Boolean(origin), follow: Boolean(origin) },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#0b101b" };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <footer className="wrap footer">
            <div>
              <Link className="brand" href="/">
                <Mark />
                PRAESIDIO AI
              </Link>
              <p>Secure every agent action.</p>
              <p className="small">
                Apache-2.0. <Link href="/about">Source and attribution</Link>
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <Link href="/product">Product</Link>
              <Link href="/security">Security</Link>
              <Link href="/docs">Documentation</Link>
              <a href={repositoryUrl}>GitHub repository</a>
              <Link href="/changelog">Changelog</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <div className="footer-bottom">
              <span>Built for considered autonomy</span>
              <span className="mono">PRAESIDIO / 2026</span>
            </div>
          </footer>
        </MotionProvider>
      </body>
    </html>
  );
}
