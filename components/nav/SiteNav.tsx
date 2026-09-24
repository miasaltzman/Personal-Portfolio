"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { site } from "@/content/site";
import { profile } from "@/content/profile";
import { useActiveSection } from "./useActiveSection";

const ids = site.nav.map((n) => n.id);

export function SiteNav({ resumeHref }: { resumeHref: string | null }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const sectionActive = useActiveSection(ids, onHome);
  const active = onHome ? sectionActive : pathname.startsWith("/work") ? "work" : null;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const activeLabel = site.nav.find((n) => n.id === active)?.label;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? `border-b border-line/80 backdrop-blur-md ${open ? "bg-paper" : "bg-paper/92"}`
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href={onHome ? "#top" : "/"}
          className="-ml-1 rounded-md px-1 text-[0.95rem] font-medium tracking-[-0.01em]"
          onClick={() => setOpen(false)}
        >
          {profile.name}
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <DesktopLinks active={active} href={href} />
          {resumeHref && (
            <>
              <span aria-hidden className="h-4 w-px bg-line-strong" />
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-10 items-center gap-1 rounded-full px-3 text-[0.9rem] font-medium text-accent"
              >
                Resume
                <span aria-hidden className="transition-transform duration-300 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          )}
        </div>

        {/* Mobile: current section + compact menu */}
        <div className="flex items-center gap-1 md:hidden">
          <AnimatePresence mode="wait" initial={false}>
            {activeLabel && !open && (
              <m.span
                key={activeLabel}
                aria-hidden
                className="eyebrow pr-2"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {activeLabel}
              </m.span>
            )}
          </AnimatePresence>
          <MobileMenu open={open} setOpen={setOpen} active={active} href={href} resumeHref={resumeHref} />
        </div>
      </nav>
    </header>
  );
}

function DesktopLinks({
  active,
  href,
}: {
  active: string | null;
  href: (id: string) => string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const el = active ? list.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    if (!el) return setBar(null);
    setBar({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    // Fonts can shift widths after first paint.
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <ul ref={listRef} className="relative flex items-center gap-0.5">
      {site.nav.map((item) => {
        const isActive = active === item.id;
        return (
          <li key={item.id} data-id={item.id}>
            <Link
              href={href(item.id)}
              aria-current={isActive ? "location" : undefined}
              className={`relative block rounded-full px-3.5 py-2 text-[0.9rem] transition-colors duration-200 ${
                isActive ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0.5 left-0 h-[2px] rounded-full bg-accent transition-[transform,width,opacity] duration-400 ease-out-soft"
        style={{
          width: bar ? bar.w - 28 : 0,
          transform: `translateX(${bar ? bar.x + 14 : 0}px)`,
          opacity: bar ? 1 : 0,
        }}
      />
    </ul>
  );
}

function MobileMenu({
  open,
  setOpen,
  active,
  href,
  resumeHref,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: string | null;
  href: (id: string) => string;
  resumeHref: string | null;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="-mr-2 flex h-11 items-center gap-2.5 rounded-full px-3 text-[0.9rem] font-medium"
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden className="relative block h-3 w-4">
          <span
            className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300 ease-out-soft ${
              open ? "top-[5px] rotate-45" : "top-[2px]"
            }`}
          />
          <span
            className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300 ease-out-soft ${
              open ? "top-[5px] -rotate-45" : "top-[8px]"
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            className="absolute inset-x-0 top-16 border-b border-line bg-paper shadow-[0_24px_48px_-24px_rgba(20,20,19,0.18)] backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="shell pb-6 pt-2">
              {site.nav.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="border-b border-line last:border-b-0">
                    <Link
                      href={href(item.id)}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "location" : undefined}
                      className="flex min-h-14 items-center justify-between py-3"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="eyebrow tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className={`text-[1.6rem] font-medium tracking-[-0.03em] ${isActive ? "text-accent" : ""}`}>
                          {item.label}
                        </span>
                      </span>
                      {isActive && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </Link>
                  </li>
                );
              })}
              {resumeHref && (
                <li className="pt-4">
                  <a
                    href={resumeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink px-5 text-[1rem] font-medium"
                  >
                    Resume <span aria-hidden>↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
