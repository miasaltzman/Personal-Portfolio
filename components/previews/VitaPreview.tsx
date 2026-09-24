"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { vitaPreview } from "@/content/projects";

/**
 * VITA — restrained feed preview: switch categories, see why each story is
 * there, and preview a notification. Sample stories only.
 */
export function VitaPreview() {
  const { categories, stories, notification } = vitaPreview;
  const [category, setCategory] = useState(categories[0]);
  const [notify, setNotify] = useState(false);

  const visible = category === categories[0] ? stories.slice(0, 4) : stories.filter((s) => s.category === category);

  return (
    <div className="mx-auto w-full max-w-[21.5rem]">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-ink/10 bg-card p-2 shadow-[0_40px_90px_-45px_rgba(20,20,19,0.45)]">
        <div className="relative overflow-hidden rounded-[1.8rem] border border-line bg-paper">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.14em] text-muted uppercase">Good morning</p>
              <p className="mt-0.5 text-[1.35rem] font-semibold tracking-[-0.04em]">VITA</p>
            </div>
            <button
              type="button"
              aria-pressed={notify}
              aria-label={notify ? "Hide notification preview" : "Preview a notification"}
              onClick={() => setNotify((n) => !n)}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-200 ${
                notify ? "border-accent bg-accent text-white" : "border-line bg-card text-ink hover:border-line-strong"
              }`}
            >
              <BellIcon />
            </button>
          </div>

          {/* Notification */}
          <AnimatePresence>
            {notify && (
              <m.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-3 top-3 z-10 rounded-2xl border border-line bg-card/95 p-3.5 shadow-[0_18px_40px_-20px_rgba(20,20,19,0.4)] backdrop-blur"
                role="status"
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden className="grid h-5 w-5 place-items-center rounded-md bg-ink text-[0.55rem] font-bold text-paper">
                    V
                  </span>
                  <span className="text-[0.72rem] font-medium">{notification.app}</span>
                  <span className="ml-auto text-[0.68rem] text-faint">now</span>
                </div>
                <p className="mt-1.5 text-[0.85rem] font-medium">{notification.title}</p>
                <p className="text-[0.8rem] leading-snug text-muted">{notification.body}</p>
              </m.div>
            )}
          </AnimatePresence>

          {/* Categories */}
          <div
            role="tablist"
            aria-label="News categories"
            className="flex gap-1 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((c) => {
              const selected = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setCategory(c)}
                  className={`h-9 shrink-0 rounded-full px-2.5 text-[0.76rem] font-medium transition-colors duration-200 ${
                    selected ? "bg-ink text-paper" : "bg-paper-2 text-ink-2 hover:bg-line"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Feed */}
          <div role="tabpanel" aria-label={`${category} stories`} className="h-[22rem] overflow-hidden px-3 pb-3">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={category}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
              >
                {visible.map((s) => (
                  <article key={s.headline} className="mb-2 rounded-2xl border border-line bg-card p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[0.6rem] tracking-[0.14em] text-accent uppercase">{s.category}</span>
                      <span className="text-[0.68rem] text-faint">{s.read}</span>
                    </div>
                    <h4 className="mt-1.5 text-[0.95rem] leading-snug font-medium tracking-[-0.015em]">{s.headline}</h4>
                    <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-muted">
                      <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                      {s.why}
                    </p>
                  </article>
                ))}
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[0.62rem] tracking-[0.12em] text-white/75 uppercase">
        Concept preview · sample stories
      </p>
    </div>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" width="18" height="18" fill="none">
      <path
        d="M5 8.5a5 5 0 0 1 10 0c0 3.2 1.2 4.6 1.8 5.2H3.2C3.8 13.1 5 11.7 5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8.2 16.2a2 2 0 0 0 3.6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
