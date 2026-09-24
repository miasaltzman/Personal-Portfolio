"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { mentrPreview } from "@/content/projects";

/**
 * MENTR AI — miniature product preview.
 * Pick a direction and the card shows what a personalized "next 1%" could
 * look like. Sample content only; no AI runs here.
 */
export function MentrPreview() {
  const { paths, greeting } = mentrPreview;
  const [pathId, setPathId] = useState(paths[0].id);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const path = paths.find((p) => p.id === pathId) ?? paths[0];
  const isDone = Boolean(done[path.id]);

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-line bg-card text-ink shadow-[0_30px_80px_-40px_rgba(20,20,19,0.35)]">
      {/* App chrome */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="grid h-6 w-6 place-items-center rounded-md bg-ink text-[0.6rem] font-semibold text-paper">
            M
          </span>
          <span className="text-[0.85rem] font-semibold tracking-[-0.01em]">MENTR AI</span>
        </div>
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">
          Concept preview
        </span>
      </div>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        {/* Direction picker */}
        <div className="border-b border-line p-4 sm:p-5 md:border-r md:border-b-0">
          <p id="mentr-q" className="text-[0.95rem] font-medium tracking-[-0.01em]">
            Where do you want to grow?
          </p>
          <div role="radiogroup" aria-labelledby="mentr-q" className="mt-3 flex flex-wrap gap-2 md:flex-col md:gap-1.5">
            {paths.map((p) => {
              const selected = p.id === pathId;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setPathId(p.id)}
                  className={`flex min-h-11 items-center justify-between gap-3 rounded-xl border px-3.5 text-left text-[0.88rem] transition-colors duration-200 md:w-full ${
                    selected
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper/60 text-ink-2 hover:border-line-strong"
                  }`}
                >
                  <span>{p.label}</span>
                  <span
                    aria-hidden
                    className={`hidden h-1.5 w-1.5 rounded-full md:block ${selected ? "bg-accent" : "bg-transparent"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Personalized result */}
        <div className="p-4 sm:p-5" aria-live="polite">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[1.05rem] font-medium tracking-[-0.02em]">{greeting}</p>
            <ProgressDots filled={isDone} />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={path.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
            >
              <Row label="Current focus" value={path.focus} />

              <div className="mt-3 rounded-xl border border-accent/25 bg-accent-soft/60 p-3.5">
                <p className="font-mono text-[0.62rem] tracking-[0.12em] text-accent uppercase">Suggested next move</p>
                <p className="mt-1.5 text-[0.95rem] leading-snug text-ink">{path.nextMove}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <button
                    type="button"
                    aria-pressed={isDone}
                    onClick={() => setDone((d) => ({ ...d, [path.id]: !d[path.id] }))}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-[0.82rem] font-medium transition-colors duration-200 ${
                      isDone ? "bg-accent text-white" : "bg-card text-ink ring-1 ring-line-strong hover:ring-ink"
                    }`}
                  >
                    <Check on={isDone} />
                    {isDone ? "Done" : "Mark as done"}
                  </button>
                  <AnimatePresence>
                    {isDone && (
                      <m.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[0.82rem] text-accent-deep"
                      >
                        That’s today’s 1%.
                      </m.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <dl className="mt-1 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-5">
                <Row label="Relevant skill" value={path.skill} />
                <Row label="Resource" value={path.resource} />
                <Row label="Potential role" value={path.role} className="sm:col-span-2" />
              </dl>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`mt-3 border-t border-line pt-3 ${className}`}>
      <dt className="font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-[0.9rem] leading-snug text-ink-2">{value}</dd>
    </div>
  );
}

function ProgressDots({ filled }: { filled: boolean }) {
  return (
    <span className="flex items-center gap-1" aria-label={filled ? "Today’s step complete" : "Today’s step not started"}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
            i < 4 ? "bg-ink/70" : filled ? "bg-accent" : "bg-line-strong"
          }`}
        />
      ))}
    </span>
  );
}

function Check({ on }: { on: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity={on ? 0 : 0.5} />
      <path
        d="M4.8 8.3 7 10.4l4.3-4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 12,
          strokeDashoffset: on ? 0 : 12,
          transition: "stroke-dashoffset 300ms var(--ease-out-soft)",
        }}
      />
    </svg>
  );
}
