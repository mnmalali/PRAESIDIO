// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 SecureAgentics
// Modified for PRAESIDIO AI, 2026-11-19: identity, responsive navigation and honest status.
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "@/lib/api";
import { ThemeToggle } from "./theme-toggle";
import { BrandMark } from "./brand-mark";

const nav = [
  {
    href: "/",
    label: "Overview",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
  },
  {
    href: "/agents",
    label: "Agents",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    href: "/events",
    label: "Events",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    href: "/reviews",
    label: "Reviews",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    href: "/mcp",
    label: "MCP servers",
    icon: "M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 14a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [pendingReviews, setPendingReviews] = useState(0);
  const [connection, setConnection] = useState<
    "checking" | "connected" | "unavailable"
  >("checking");
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    let cancelled = false;
    async function tick() {
      try {
        const r = await api("/api/reviews?status=pending&per_page=1");
        if (!cancelled) {
          setPendingReviews(r.data?.total || 0);
          setConnection("connected");
        }
      } catch {
        if (!cancelled) setConnection("unavailable");
      }
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);
  useEffect(() => {
    const node = dialog.current;
    if (open && !node?.open) node?.showModal();
    if (!open && node?.open) node.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (media.matches) onClose();
    };
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [open, onClose]);
  const content = (
    <>
      <div className="px-6 py-6 border-b border-surface-border">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <BrandMark />
          <div>
            <span className="text-sm font-semibold text-ink">PRAESIDIO AI</span>
            <p className="text-xs text-ink-3">Security console</p>
          </div>
        </Link>
      </div>
      <nav
        aria-label="Console navigation"
        className="flex-1 px-3 py-6 space-y-1"
      >
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${active ? "bg-surface-overlay text-accent font-medium" : "text-ink-2 hover:bg-surface-hover hover:text-ink"}`}
            >
              <svg
                className="size-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                />
              </svg>
              <span className="flex-1">{item.label}</span>
              {item.href === "/reviews" && pendingReviews > 0 && (
                <span className="text-xs font-mono text-warn">
                  {pendingReviews}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-5 border-t border-surface-border space-y-4">
        <ThemeToggle />
        <p className="text-xs text-ink-3" role="status">
          {connection === "connected"
            ? "Console API connected"
            : connection === "unavailable"
              ? "Console API unavailable"
              : "Checking console API…"}
        </p>
        <a
          href="https://github.com/mnmalali/PRAESIDIO"
          className="inline-flex min-h-11 items-center text-xs text-ink-3 hover:text-ink underline underline-offset-4"
        >
          Derived from Praesidio · Apache-2.0
        </a>
      </div>
    </>
  );
  return (
    <>
      <aside className="hidden md:flex w-64 border-r border-surface-border bg-surface h-dvh fixed left-0 top-0 flex-col z-40">
        {content}
      </aside>
      <dialog
        ref={dialog}
        onCancel={onClose}
        onClose={onClose}
        aria-label="Console navigation"
        className="m-0 h-dvh max-h-none w-72 max-w-[90vw] bg-surface p-0 border-0 border-r border-surface-border"
      >
        <div className="flex h-full flex-col">
          <button
            className="self-end px-4 text-sm text-ink-3"
            onClick={onClose}
            aria-label="Close navigation"
          >
            Close ×
          </button>
          {content}
        </div>
      </dialog>
    </>
  );
}
