"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { leo } from "@/content/personalFacts";

/** A tiny constellation beside the "Beyond AI" heading. */
const STARS: [number, number][] = [
  [6, 20], [12, 11], [20, 7], [27, 11], [24, 19], [30, 26], [44, 22], [54, 28], [46, 13],
];
const LINES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 6];

export function LeoEasterEgg() {
  const [open, setOpen] = useState(false);
  if (!leo.show) return null;
  const d = LINES.map((s, i) => `${i === 0 ? "M" : "L"}${STARS[s][0]} ${STARS[s][1]}`).join(" ");
  return (
    <span className="relative mt-1 inline-flex shrink-0 items-center sm:mt-3">
      <button
        type="button"
        aria-expanded={open}
        aria-label="A small constellation"
        onClick={() => setOpen((o) => !o)}
        className="group/leo grid h-11 w-16 place-items-center rounded-lg"
      >
        <svg viewBox="0 0 60 34" width="52" height="30" aria-hidden>
          <path
            d={d}
            fill="none"
            stroke={open ? "var(--color-accent)" : "var(--color-line-strong)"}
            strokeWidth="0.8"
            className="transition-[stroke] duration-300 group-hover/leo:stroke-[var(--color-faint)]"
          />
          {STARS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 5 ? 1.8 : 1.2} fill={open ? "var(--color-accent)" : "var(--color-faint)"} className="transition-[fill] duration-300" />
          ))}
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <m.span
            role="status"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full right-0 z-10 mt-1 whitespace-nowrap rounded-full border border-line bg-card px-3 py-1.5 text-[0.82rem] text-ink-2 shadow-[0_10px_24px_-16px_rgba(20,20,19,0.35)] sm:top-1/2 sm:right-auto sm:left-full sm:mt-0 sm:ml-1 sm:-translate-y-1/2"
          >
            {leo.reveal}
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
}
