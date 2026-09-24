"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { beyondIntro, personalFacts, type PersonalFact } from "@/content/personalFacts";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { FactIllustration } from "./illustrations";

const DESKTOP = "(min-width: 1024px)";

function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(DESKTOP);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => false,
  );
}

/**
 * Pick-one explorer. Only labels are visible at first; opening one reveals
 * its fact. One fact is open at a time.
 *  - Desktop: labels on the left, the open fact in a large panel on the right.
 *  - Phones: the fact unfolds directly under its label.
 */
export function BeyondExplorer() {
  const facts = personalFacts.filter((f) => f.show);
  const [openId, setOpenId] = useState<string | null>(null);
  const isDesktop = useIsDesktop();
  const open = facts.find((f) => f.id === openId) ?? null;

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));

  return (
    <div
      className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-12"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpenId(null);
      }}
    >
      <div className="lg:col-span-5">
        <p className="eyebrow flex items-center gap-2 !text-ink">
          {beyondIntro.prompt}
          <ArrowIcon direction={isDesktop ? "right" : "down"} className="text-accent" />
        </p>

        <ul className="mt-6 border-t border-ink">
          {facts.map((fact, i) => {
            const isOpen = fact.id === openId;
            const panelId = isDesktop ? "beyond-panel" : `fact-${fact.id}`;
            return (
              <li key={fact.id} className="border-b border-line-strong">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(fact.id)}
                    className="group flex min-h-[4.75rem] w-full items-center gap-5 py-5 text-left focus-visible:outline-offset-[-2px]"
                  >
                    <span className={`font-mono text-[0.75rem] tabular-nums transition-colors ${isOpen ? "text-accent" : "text-faint"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-[1.02rem] font-medium tracking-[0.08em] uppercase transition-[color,transform] duration-300 ease-out-soft sm:text-[1.15rem] ${
                        isOpen ? "translate-x-1 text-accent" : "text-ink group-hover:translate-x-1"
                      }`}
                    >
                      {fact.label}
                    </span>
                    <span
                      aria-hidden
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-300 ease-out-soft ${
                        isOpen
                          ? "rotate-45 border-accent bg-accent text-white"
                          : "border-line-strong text-ink group-hover:border-ink"
                      }`}
                    >
                      <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                        <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>

                {!isDesktop && (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8">
                          <FactPanel fact={fact} />
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {isDesktop && (
        <div className="lg:col-span-7">
          <div
            id="beyond-panel"
            aria-live="polite"
            className="sticky top-28 min-h-[36rem] overflow-hidden rounded-[2rem] border border-line bg-card"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <m.div
                  key={open.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                >
                  <FactPanel fact={open} large />
                </m.div>
              ) : (
                <m.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <EmptyState count={facts.length} />
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

function FactPanel({ fact, large = false }: { fact: PersonalFact; large?: boolean }) {
  const [replay, setReplay] = useState(0);
  return (
    <div className={large ? "" : "overflow-hidden rounded-[1.5rem] border border-line bg-card"}>
      <div className={`relative border-b border-line bg-paper px-4 py-5 ${large ? "h-[21rem] px-10 py-10" : "h-52 sm:h-64"}`}>
        <FactIllustration key={replay} kind={fact.illustration} />
        <button
          type="button"
          onClick={() => setReplay((r) => r + 1)}
          className="absolute top-3 right-3 inline-flex min-h-9 items-center rounded-full border border-line bg-card/90 px-3 font-mono text-[0.6rem] tracking-[0.12em] text-muted uppercase transition-colors hover:border-line-strong hover:text-ink"
        >
          Replay<span className="sr-only"> illustration</span>
        </button>
      </div>
      <div className={large ? "p-10" : "p-6"}>
        <p className="eyebrow !text-accent">{fact.label}</p>
        <p className="mt-3 text-[1rem] text-muted">{fact.title}</p>
        <p
          className={`mt-3 font-medium tracking-[-0.03em] text-balance ${
            large ? "text-[2.2rem] leading-[1.1]" : "text-[1.45rem] leading-[1.15]"
          }`}
        >
          {fact.reveal}
        </p>
        {fact.detail && <p className="mt-3 max-w-[30rem] text-[1rem] leading-relaxed text-muted">{fact.detail}</p>}
      </div>
    </div>
  );
}

/** Closed "cards" waiting to be opened. */
function EmptyState({ count }: { count: number }) {
  return (
    <div className="flex min-h-[36rem] flex-col items-center justify-center p-10 text-center">
      <svg viewBox="0 0 200 160" width="220" height="176" aria-hidden>
        {Array.from({ length: count }).map((_, i) => {
          const x = 30 + i * 9;
          const y = 16 + i * 12;
          return (
            <g key={i}>
              <path
                d={`M${x} ${y + 8} q0 -8 8 -8 h30 l8 8 h72 q8 0 8 8 v60 q0 8 -8 8 h-110 q-8 0 -8 -8 z`}
                fill="var(--color-card)"
                stroke={i === count - 1 ? "var(--color-ink)" : "var(--color-line-strong)"}
                strokeWidth="1.2"
              />
              <text x={x + 10} y={y + 6} className="fill-faint font-mono text-[6px]">
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-8 text-[1.35rem] font-medium tracking-[-0.02em]">Nothing open yet.</p>
      <p className="mt-2 text-[1rem] text-muted">Pick one on the left.</p>
    </div>
  );
}
