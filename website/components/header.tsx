"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Mark } from "./brand";
import { MotionToggle } from "./motion";

const links = [
  ["/product", "Product"],
  ["/security", "Security"],
  ["/docs", "Documentation"],
] as const;
export function Header() {
  const path = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  return (
    <header className="site-header wrap">
      <Link className="brand" href="/" aria-label="PRAESIDIO AI home">
        <Mark />
        <span>
          PRAESIDIO <span className="brand-ai">AI</span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={path === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <MotionToggle />
      <Link className="button header-cta" href="/#demo">
        Explore the demo <span aria-hidden="true">↗</span>
      </Link>
      <details
        className="mobile-menu"
        ref={menu}
        onKeyDown={(e) => {
          if (e.key === "Escape" && menu.current) {
            menu.current.open = false;
            menu.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary>Menu</summary>
        <nav aria-label="Mobile navigation">
          {[...links, ["/#demo", "Explore the demo"]].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (menu.current) menu.current.open = false;
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
