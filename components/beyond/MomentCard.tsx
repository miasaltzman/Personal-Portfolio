"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useId } from "react";

/**
 * Shared shell for a Beyond AI moment: an illustration you can tap, a label
 * that is always visible, and a short line revealed after interacting.
 */
export function MomentCard({
  fact,
  revealed,
  onActivate,
  children,
  className = "",
}: {
  fact: { label: string; reveal: string; detail?: string; hint: string };
  revealed: boolean;
  onActivate: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  const id = useId();
  const { label, reveal, detail, hint } = fact;
  return (
    <div className={`group flex flex-col overflow-hidden rounded-[1.25rem] border border-line bg-card ${className}`}>
      <button
        type="button"
        onClick={onActivate}
        aria-describedby={`${id}-reveal`}
        className="relative block h-44 w-full overflow-hidden bg-paper text-left transition-colors duration-300 hover:bg-paper-2/70 sm:h-52 focus-visible:-outline-offset-4"
      >
        <span className="sr-only">
          {label}. {hint}
        </span>
        {children}
        <span
          aria-hidden
          className="absolute top-3 right-3 rounded-full border border-line bg-card/90 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.12em] text-muted uppercase transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink"
        >
          {revealed ? "Again" : hint}
        </span>
      </button>
      <div className="flex min-h-[7.5rem] flex-1 flex-col border-t border-line p-5">
        <p className="eyebrow">{label}</p>
        <div id={`${id}-reveal`} aria-live="polite" className="mt-2">
          <AnimatePresence mode="wait" initial={false}>
            {revealed ? (
              <m.div
                key="reveal"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-[1.12rem] leading-snug font-medium tracking-[-0.02em]">{reveal}</p>
                {detail && <p className="mt-1.5 text-[0.92rem] leading-snug text-muted">{detail}</p>}
              </m.div>
            ) : (
              <m.p
                key="hint"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[0.95rem] text-faint"
              >
                <span className="pointer-fine:hidden">Tap</span>
                <span className="hidden pointer-fine:inline">Click</span> the illustration.
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
