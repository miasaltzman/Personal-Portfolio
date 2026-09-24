"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { personalFacts } from "@/content/personalFacts";
import { MomentCard } from "./MomentCard";
import { tween } from "./tween";

/* ------------------------------------------------------------------ */
/* Snowboarding — a rider carves one run down a simple slope.           */
/* ------------------------------------------------------------------ */
const SLOPE = "M26 70 C 90 72, 128 96, 170 120 S 250 160, 300 164";

export function SnowboardMoment({ className }: { className?: string }) {
  const fact = personalFacts.snowboarding;
  const [revealed, setRevealed] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const riderRef = useRef<SVGGElement>(null);
  const sprayRef = useRef<SVGGElement>(null);
  const cancel = useRef<() => void>(() => {});

  const place = useCallback((t: number) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const p = path.getPointAtLength(len * t);
    const q = path.getPointAtLength(Math.min(len, len * t + 1));
    const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
    riderRef.current?.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
    trailRef.current?.setAttribute("stroke-dashoffset", String(1 - t));
  }, []);

  useEffect(() => {
    place(0);
    return () => cancel.current();
  }, [place]);

  const run = () => {
    cancel.current();
    sprayRef.current?.setAttribute("opacity", "0");
    cancel.current = tween(1500, place, () => {
      setRevealed(true);
      sprayRef.current?.setAttribute("opacity", "1");
    });
  };

  return (
    <MomentCard fact={fact} revealed={revealed} onActivate={run} className={className}>
      <svg viewBox="0 0 320 190" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {/* Mountains */}
        <path d="M150 108 L186 64 L208 86 L244 42 L282 92 L300 80 L320 96" fill="none" stroke="var(--color-line-strong)" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M232 57 L244 42 L256 57 L249 54 L244 59 L238 54 Z" fill="var(--color-line-strong)" />
        {/* Chairlift */}
        <line x1="60" y1="30" x2="200" y2="6" stroke="var(--color-faint)" strokeWidth="0.8" />
        <g transform="translate(130 18)" stroke="var(--color-faint)" strokeWidth="1" fill="none" strokeLinecap="round">
          <line x1="0" y1="0" x2="0" y2="16" />
          <path d="M-7 16 H6 M-7 16 V22 H6" />
        </g>
        {/* Slope + trail */}
        <path ref={pathRef} d={SLOPE} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
        <path ref={trailRef} d={SLOPE} pathLength={1} strokeDasharray="1" strokeDashoffset="1" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
        {/* Spray at the bottom */}
        <g ref={sprayRef} opacity="0" className="transition-opacity duration-500" fill="var(--color-accent)">
          <circle cx="306" cy="156" r="1.6" />
          <circle cx="312" cy="160" r="1.2" />
          <circle cx="309" cy="151" r="1" />
        </g>
        {/* Rider */}
        <g ref={riderRef}>
          <g transform="translate(0 -2)">
            <rect x="-10" y="-1.6" width="20" height="3.2" rx="1.6" fill="var(--color-ink)" />
            <path d="M-3 -2 L-1 -11 L3 -2 M-1 -11 L-1 -16 M-6 -13 L4 -14" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <circle cx="-1" cy="-19.5" r="3" fill="var(--color-accent)" />
          </g>
        </g>
      </svg>
    </MomentCard>
  );
}

/* ------------------------------------------------------------------ */
/* Los Angeles → San Diego — a route traced down the coast.             */
/* ------------------------------------------------------------------ */
const COAST = "M0 34 C 40 40, 70 52, 96 70 C 122 88, 150 96, 178 110 C 206 124, 226 142, 238 170 L 240 190 L 0 190 Z";
const ROUTE = "M104 64 C 138 84, 168 94, 196 110 S 240 138, 252 160";

export function CitiesMoment({ className }: { className?: string }) {
  const fact = personalFacts.cities;
  const [revealed, setRevealed] = useState(false);
  const routeRef = useRef<SVGPathElement>(null);
  const traceRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const cancel = useRef<() => void>(() => {});

  const place = useCallback((t: number) => {
    const path = routeRef.current;
    if (!path) return;
    const p = path.getPointAtLength(path.getTotalLength() * t);
    dotRef.current?.setAttribute("cx", String(p.x));
    dotRef.current?.setAttribute("cy", String(p.y));
    traceRef.current?.setAttribute("stroke-dashoffset", String(1 - t));
  }, []);

  useEffect(() => {
    place(0);
    return () => cancel.current();
  }, [place]);

  const run = () => {
    cancel.current();
    cancel.current = tween(1300, place, () => setRevealed(true));
  };

  return (
    <MomentCard fact={fact} revealed={revealed} onActivate={run} className={className}>
      <svg viewBox="0 0 320 190" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {/* Ocean, abstracted */}
        <path d={COAST} fill="var(--color-accent-soft)" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${14 + i * 26} ${120 + i * 18} q6 -4 12 0 t12 0`}
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeLinecap="round"
          />
        ))}
        <text x="22" y="176" className="fill-accent/60 font-mono text-[8px] tracking-[0.2em]">
          PACIFIC
        </text>
        {/* Route */}
        <path ref={routeRef} d={ROUTE} fill="none" stroke="var(--color-ink)" strokeOpacity="0.3" strokeDasharray="2 5" strokeLinecap="round" />
        <path ref={traceRef} d={ROUTE} pathLength={1} strokeDasharray="1" strokeDashoffset="1" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
        {/* Cities */}
        <g>
          <circle cx="104" cy="64" r="4.5" fill="var(--color-card)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="116" y="52" className="fill-ink text-[11px] font-medium">Los Angeles</text>
          <text x="116" y="64" className="fill-muted font-mono text-[7.5px] tracking-[0.14em]">GREW UP</text>
        </g>
        <g>
          <circle cx="252" cy="160" r="4.5" fill="var(--color-card)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <text x="228" y="130" className="fill-ink text-[11px] font-medium" textAnchor="start">San Diego</text>
          <text x="228" y="142" className="fill-muted font-mono text-[7.5px] tracking-[0.14em]">NOW</text>
        </g>
        <circle ref={dotRef} r="4" fill="var(--color-accent)" />
      </svg>
    </MomentCard>
  );
}

/* ------------------------------------------------------------------ */
/* Matcha — a glass fills: oat milk first, matcha poured over.          */
/* ------------------------------------------------------------------ */
export function MatchaMoment({ className }: { className?: string }) {
  const fact = personalFacts.matcha;
  const [revealed, setRevealed] = useState(false);
  const [filled, setFilled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const run = () => {
    clearTimeout(timer.current);
    if (filled) {
      // Empty and pour again.
      setFilled(false);
      timer.current = setTimeout(() => setFilled(true), 450);
      return;
    }
    setFilled(true);
    timer.current = setTimeout(() => setRevealed(true), 900);
  };

  const GLASS = "M112 30 L208 30 L198 168 Q197 178 187 178 L133 178 Q123 178 122 168 Z";
  return (
    <MomentCard fact={fact} revealed={revealed} onActivate={run} className={className}>
      <svg viewBox="0 0 320 190" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <clipPath id="glass-clip">
            <path d={GLASS} />
          </clipPath>
        </defs>
        <g clipPath="url(#glass-clip)">
          {/* Oat milk */}
          <rect
            x="100"
            y="96"
            width="120"
            height="90"
            fill="var(--color-oat)"
            style={{
              transformBox: "fill-box",
              transformOrigin: "bottom",
              transform: filled ? "scaleY(1)" : "scaleY(0)",
              transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
          {/* Matcha, poured on top */}
          <path
            d="M100 70 Q130 64 160 70 T220 70 L220 100 Q190 106 160 100 T100 100 Z"
            fill="var(--color-matcha)"
            style={{
              opacity: filled ? 1 : 0,
              transform: filled ? "translateY(0)" : "translateY(26px)",
              transition: "transform 700ms cubic-bezier(0.22,1,0.36,1) 380ms, opacity 400ms ease 380ms",
            }}
          />
          {/* Ice */}
          <g fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="1.3" style={{ opacity: filled ? 1 : 0, transition: "opacity 400ms ease 500ms" }}>
            <rect x="136" y="60" width="20" height="20" rx="4" transform="rotate(-10 146 70)" />
            <rect x="164" y="76" width="18" height="18" rx="4" transform="rotate(12 173 85)" />
          </g>
        </g>
        {/* Straw */}
        <path d="M176 14 L166 150" stroke="var(--color-ink)" strokeWidth="3.5" strokeLinecap="round" strokeOpacity="0.7" />
        {/* Glass */}
        <path d={GLASS} fill="none" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M128 44 L124 150" stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </MomentCard>
  );
}

/* ------------------------------------------------------------------ */
/* Depop — flip through a small stack of tags.                          */
/* ------------------------------------------------------------------ */
export function DepopMoment({ className }: { className?: string }) {
  const fact = personalFacts.depop;
  const tags = fact.tags;
  const [revealed, setRevealed] = useState(false);
  const [index, setIndex] = useState(0);

  const run = () => {
    setIndex((i) => i + 1);
    setRevealed(true);
  };

  const top = tags[index % tags.length];

  return (
    <MomentCard fact={fact} revealed={revealed} onActivate={run} className={className}>
      <div aria-hidden className="absolute inset-0 grid place-items-center">
        <div className="relative h-[7.5rem] w-[8.5rem]">
          {/* Stack behind */}
          <Tag className="absolute inset-0 rotate-[7deg] opacity-50" />
          <Tag className="absolute inset-0 rotate-[3deg] opacity-80" />
          <AnimatePresence initial={false}>
            <m.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 8, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              exit={{ opacity: 0, x: 90, rotate: 14, transition: { duration: 0.4 } }}
              transition={{ duration: 0.35 }}
            >
              <Tag label={top} />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
      <span aria-hidden className="absolute bottom-3 left-4 font-mono text-[0.62rem] tracking-[0.14em] text-muted uppercase tabular-nums">
        {revealed ? `Sold · ${String(index).padStart(2, "0")}` : " "}
      </span>
    </MomentCard>
  );
}

function Tag({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`h-full w-full ${className}`}>
      <div className="relative flex h-full w-full flex-col justify-end rounded-[0.9rem] border border-line-strong bg-card p-3.5 shadow-[0_10px_24px_-16px_rgba(20,20,19,0.35)]">
        <span className="absolute top-3 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-line-strong bg-paper" />
        {label && (
          <>
            <span className="font-mono text-[0.55rem] tracking-[0.14em] text-muted uppercase">Item</span>
            <span className="mt-0.5 text-[0.9rem] leading-tight font-medium tracking-[-0.01em] text-ink">{label}</span>
            <span className="mt-2 h-1 w-10 rounded-full bg-accent" />
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Building — a scribbled idea becomes an interface.                    */
/* ------------------------------------------------------------------ */
export function BuildingMoment({ className }: { className?: string }) {
  const fact = personalFacts.building;
  const [revealed, setRevealed] = useState(false);
  const [built, setBuilt] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const run = () => {
    clearTimeout(timer.current);
    if (built) {
      setBuilt(false);
      timer.current = setTimeout(() => setBuilt(true), 350);
      return;
    }
    setBuilt(true);
    timer.current = setTimeout(() => setRevealed(true), 700);
  };

  const t = (delay: number) => ({
    transition: `opacity 450ms ease ${delay}ms, stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, fill 400ms ease ${delay}ms`,
  });

  return (
    <MomentCard fact={fact} revealed={revealed} onActivate={run} className={className}>
      <svg viewBox="0 0 320 190" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        {/* The idea: a quick sketch */}
        <g style={{ opacity: built ? 0.35 : 1, transition: "opacity 400ms ease" }}>
          <path d="M34 58 q3 -3 50 -2 q4 30 1 66 q-24 3 -50 1 q-3 -32 -1 -65 z" fill="var(--color-oat)" stroke="var(--color-ink)" strokeOpacity="0.5" strokeWidth="1.2" />
          <path d="M44 76 q8 -4 16 0 t16 0 M44 90 q6 -3 12 0 t12 0 M44 104 q8 -3 14 0" fill="none" stroke="var(--color-ink)" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
          <text x="46" y="142" className="fill-muted font-serif text-[15px] italic">idea?</text>
        </g>
        {/* Arrow */}
        <path d="M108 95 H142 M136 89 L142 95 L136 101" fill="none" stroke={built ? "var(--color-accent)" : "var(--color-faint)"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 300ms ease" }} />
        {/* The interface */}
        <g fill="none" strokeLinecap="round">
          <rect x="158" y="40" width="130" height="110" rx="10" pathLength={1} stroke="var(--color-ink)" strokeWidth="1.4" strokeDasharray="1" style={{ strokeDashoffset: built ? 0 : 0.999, ...t(0) }} />
          <rect x="158" y="40" width="130" height="110" rx="10" stroke="var(--color-ink)" strokeOpacity="0.25" strokeDasharray="3 4" style={{ opacity: built ? 0 : 1, transition: "opacity 300ms ease" }} />
          <line x1="158" y1="60" x2="288" y2="60" pathLength={1} stroke="var(--color-ink)" strokeOpacity="0.4" strokeDasharray="1" style={{ strokeDashoffset: built ? 0 : 1, ...t(200) }} />
          <g style={{ opacity: built ? 1 : 0, ...t(250) }}>
            <circle cx="170" cy="50" r="2.4" fill="var(--color-line-strong)" stroke="none" />
            <circle cx="179" cy="50" r="2.4" fill="var(--color-line-strong)" stroke="none" />
            <rect x="170" y="72" width="64" height="7" rx="3.5" fill="var(--color-ink)" stroke="none" />
            <rect x="170" y="86" width="100" height="5" rx="2.5" fill="var(--color-line-strong)" stroke="none" />
            <rect x="170" y="96" width="84" height="5" rx="2.5" fill="var(--color-line-strong)" stroke="none" />
          </g>
          <rect x="170" y="116" width="54" height="20" rx="10" stroke="none" style={{ fill: built ? "var(--color-accent)" : "transparent", ...t(450) }} />
        </g>
      </svg>
    </MomentCard>
  );
}

/* ------------------------------------------------------------------ */
/* Leo — a tiny constellation beside the section heading.               */
/* ------------------------------------------------------------------ */
const LEO_STARS: [number, number][] = [
  [6, 20], [12, 11], [20, 7], [27, 11], [24, 19], [30, 26], [44, 22], [54, 28], [46, 13],
];
const LEO_LINES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 6];

export function LeoEasterEgg() {
  const fact = personalFacts.leo;
  const [open, setOpen] = useState(false);
  if (!fact.show) return null;
  const d = LEO_LINES.map((s, i) => `${i === 0 ? "M" : "L"}${LEO_STARS[s][0]} ${LEO_STARS[s][1]}`).join(" ");
  return (
    <span className="relative mt-2 inline-flex shrink-0 items-center sm:mt-4">
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
          {LEO_STARS.map(([x, y], i) => (
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
            className="absolute top-full left-0 mt-1 whitespace-nowrap rounded-full border border-line bg-card px-3 py-1.5 text-[0.82rem] text-ink-2 shadow-[0_10px_24px_-16px_rgba(20,20,19,0.35)] sm:top-1/2 sm:left-full sm:mt-0 sm:ml-1 sm:-translate-y-1/2"
          >
            {fact.reveal}
          </m.span>
        )}
      </AnimatePresence>
    </span>
  );
}
