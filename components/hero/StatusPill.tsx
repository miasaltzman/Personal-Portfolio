"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { profile } from "@/content/profile";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export function StatusPill() {
  const { status } = profile;
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative max-w-[26rem]">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="group -ml-3 inline-flex min-h-11 items-center gap-3 rounded-full px-3 text-[0.92rem] text-ink-2 transition-colors hover:bg-paper-2"
      >
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inset-[-4px] rounded-full bg-accent/15" />
          <span className="relative h-2 w-2 rounded-full bg-accent" />
        </span>
        <span>{status.label}</span>
        <span
          aria-hidden
          className={`text-faint transition-transform duration-300 ease-out-soft ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            role="region"
            aria-label={`About ${status.title}`}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            style={{ transformOrigin: "top left" }}
            className="absolute top-full left-0 z-20 mt-2 w-[min(26rem,calc(100vw-2.5rem))] rounded-2xl border border-line bg-card p-5 shadow-[0_24px_60px_-28px_rgba(20,20,19,0.28)]"
          >
            <p className="eyebrow">Now building</p>
            <p className="mt-2 text-lg font-medium tracking-[-0.02em]">{status.title}</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{status.summary}</p>
            <Link
              href={`/work/${status.projectSlug}`}
              className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[0.92rem] font-medium text-accent"
            >
              Read the case study
              <ArrowIcon className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
