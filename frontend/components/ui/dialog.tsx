// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 SecureAgentics
// Modified for PRAESIDIO AI, 2026-11-19: native modal focus, Escape and focus restoration.
"use client";
import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const node = ref.current;
    if (open && !node?.open) node?.showModal();
    if (!open && node?.open) node.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const widths = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-2xl" };
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClose={onClose}
      aria-labelledby={id}
      aria-describedby={description ? `${id}-description` : undefined}
      className={`w-[calc(100%_-_32px)] ${widths[size]} text-ink bg-surface-raised border border-surface-border rounded-xl p-0`}
    >
      <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-surface-border">
        <div>
          <h2 id={id} className="text-lg font-medium text-ink">
            {title}
          </h2>
          {description && (
            <p id={`${id}-description`} className="text-sm text-ink-3 mt-1">
              {description}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-ink-3 hover:text-ink min-w-11 min-h-11 flex items-center justify-center"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>
      </div>
      <div className="px-6 py-6 max-h-[70dvh] overflow-y-auto">{children}</div>
    </dialog>
  );
}
