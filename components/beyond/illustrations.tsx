"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { depopTags, type Illustration } from "@/content/personalFacts";
import { tween } from "./tween";

/**
 * Line illustrations for Beyond AI. Each one plays once when it mounts
 * (i.e. when its fact is opened) and ends in a complete, static drawing.
 * With reduced motion they render straight to the final frame.
 */
export function FactIllustration({ kind }: { kind: Illustration }) {
  switch (kind) {
    case "snowboard":
      return <Snowboard />;
    case "coffee":
      return <Coffee />;
    case "route":
      return <Route />;
    case "tags":
      return <Tags />;
    case "build":
      return <Build />;
  }
}

const svgProps = {
  viewBox: "0 0 320 190",
  className: "h-full w-full",
  preserveAspectRatio: "xMidYMid meet",
  "aria-hidden": true,
} as const;

/** Runs `fn` once after mount, on the next frame (so CSS transitions fire). */
function useOnMount(fn: () => void | (() => void), delay = 60) {
  useEffect(() => {
    let cleanup: void | (() => void);
    const t = setTimeout(() => {
      cleanup = fn();
    }, delay);
    return () => {
      clearTimeout(t);
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------------------------------------------ */
/* Snowboarding — one run down the slope, under a chairlift.            */
/* ------------------------------------------------------------------ */
const SLOPE = "M26 70 C 90 72, 128 96, 170 120 S 250 160, 300 164";

function Snowboard() {
  const pathRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const riderRef = useRef<SVGGElement>(null);
  const [landed, setLanded] = useState(false);

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

  useEffect(() => place(0), [place]);
  useOnMount(() => tween(1500, place, () => setLanded(true)), 150);

  return (
    <svg {...svgProps}>
      <path d="M150 108 L186 64 L208 86 L244 42 L282 92 L300 80 L320 96" fill="none" stroke="var(--color-line-strong)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M232 57 L244 42 L256 57 L249 54 L244 59 L238 54 Z" fill="var(--color-line-strong)" />
      <line x1="60" y1="30" x2="200" y2="6" stroke="var(--color-faint)" strokeWidth="0.8" />
      <g transform="translate(130 18)" stroke="var(--color-faint)" strokeWidth="1" fill="none" strokeLinecap="round">
        <line x1="0" y1="0" x2="0" y2="16" />
        <path d="M-7 16 H6 M-7 16 V22 H6" />
      </g>
      <path ref={pathRef} d={SLOPE} fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
      <path ref={trailRef} d={SLOPE} pathLength={1} strokeDasharray="1" strokeDashoffset="1" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <g opacity={landed ? 1 : 0} className="transition-opacity duration-500" fill="var(--color-accent)">
        <circle cx="306" cy="156" r="1.6" />
        <circle cx="312" cy="160" r="1.2" />
        <circle cx="309" cy="151" r="1" />
      </g>
      <g ref={riderRef}>
        <g transform="translate(0 -2)">
          <rect x="-10" y="-1.6" width="20" height="3.2" rx="1.6" fill="var(--color-ink)" />
          <path d="M-3 -2 L-1 -11 L3 -2 M-1 -11 L-1 -16 M-6 -13 L4 -14" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <circle cx="-1" cy="-19.5" r="3" fill="var(--color-accent)" />
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Coffee — a mug fills, then a little steam.                           */
/* ------------------------------------------------------------------ */
function Coffee() {
  const [on, setOn] = useState(false);
  useOnMount(() => setOn(true));

  const MUG = "M112 62 H198 V132 Q198 166 164 166 H146 Q112 166 112 132 Z";
  const steam = ["M138 50 q-7 -9 0 -18 t0 -18", "M155 50 q-7 -9 0 -18 t0 -18", "M172 50 q-7 -9 0 -18 t0 -18"];
  return (
    <svg {...svgProps}>
      <defs>
        <clipPath id="mug-clip">
          <path d={MUG} />
        </clipPath>
      </defs>
      {/* Saucer */}
      <path d="M84 172 H226" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M100 178 H210" stroke="var(--color-ink)" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
      {/* Coffee */}
      <g clipPath="url(#mug-clip)">
        <rect
          x="108"
          y="74"
          width="96"
          height="96"
          fill="var(--color-coffee)"
          style={{
            transformBox: "fill-box",
            transformOrigin: "bottom",
            transform: on ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <rect
          x="108"
          y="72"
          width="96"
          height="5"
          fill="var(--color-crema)"
          style={{ opacity: on ? 1 : 0, transition: "opacity 300ms ease 700ms" }}
        />
      </g>
      {/* Mug + handle */}
      <path d={MUG} fill="none" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M198 84 Q228 84 228 108 Q228 132 198 132" fill="none" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" />
      {/* Steam */}
      {steam.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="1"
          style={{
            strokeDashoffset: on ? 0 : 1,
            opacity: on ? 0.8 : 0,
            transition: `stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1) ${900 + i * 140}ms, opacity 300ms ease ${900 + i * 140}ms`,
          }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Home base — a route traced down the coast.                           */
/* ------------------------------------------------------------------ */
const COAST = "M0 34 C 40 40, 70 52, 96 70 C 122 88, 150 96, 178 110 C 206 124, 226 142, 238 170 L 240 190 L 0 190 Z";
const ROUTE = "M104 64 C 138 84, 168 94, 196 110 S 240 138, 252 160";

function Route() {
  const routeRef = useRef<SVGPathElement>(null);
  const traceRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const place = useCallback((t: number) => {
    const path = routeRef.current;
    if (!path) return;
    const p = path.getPointAtLength(path.getTotalLength() * t);
    dotRef.current?.setAttribute("cx", String(p.x));
    dotRef.current?.setAttribute("cy", String(p.y));
    traceRef.current?.setAttribute("stroke-dashoffset", String(1 - t));
  }, []);

  useEffect(() => place(0), [place]);
  useOnMount(() => tween(1300, place), 150);

  return (
    <svg {...svgProps}>
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
      <path ref={routeRef} d={ROUTE} fill="none" stroke="var(--color-ink)" strokeOpacity="0.3" strokeDasharray="2 5" strokeLinecap="round" />
      <path ref={traceRef} d={ROUTE} pathLength={1} strokeDasharray="1" strokeDashoffset="1" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="104" cy="64" r="4.5" fill="var(--color-card)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <text x="116" y="52" className="fill-ink text-[11px] font-medium">Los Angeles</text>
      <text x="116" y="64" className="fill-muted font-mono text-[7.5px] tracking-[0.14em]">GREW UP</text>
      <circle cx="252" cy="160" r="4.5" fill="var(--color-card)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <text x="228" y="130" className="fill-ink text-[11px] font-medium">San Diego</text>
      <text x="228" y="142" className="fill-muted font-mono text-[7.5px] tracking-[0.14em]">NOW</text>
      <circle ref={dotRef} r="4" fill="var(--color-accent)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Entrepreneurial side — a small stack of tags flips through.          */
/* ------------------------------------------------------------------ */
function Tags() {
  const [index, setIndex] = useState(0);

  useOnMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(3);
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setIndex(n);
      if (n >= 3) clearInterval(id);
    }, 520);
    return () => clearInterval(id);
  }, 250);

  const top = depopTags[index % depopTags.length];

  return (
    <div aria-hidden className="relative grid h-full w-full place-items-center">
      <div className="relative h-[7.5rem] w-[8.5rem]">
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
      <span className="absolute bottom-1 left-2 font-mono text-[0.62rem] tracking-[0.14em] text-muted uppercase tabular-nums">
        {index > 0 ? `Sold · ${String(index).padStart(2, "0")}` : " "}
      </span>
    </div>
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
/* From idea to build — a scribbled idea becomes an interface.          */
/* ------------------------------------------------------------------ */
function Build() {
  const [built, setBuilt] = useState(false);
  useOnMount(() => setBuilt(true), 350);

  const t = (delay: number) => ({
    transition: `opacity 450ms ease ${delay}ms, stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, fill 400ms ease ${delay}ms`,
  });

  return (
    <svg {...svgProps}>
      <g style={{ opacity: built ? 0.4 : 1, transition: "opacity 400ms ease" }}>
        <path d="M34 58 q3 -3 50 -2 q4 30 1 66 q-24 3 -50 1 q-3 -32 -1 -65 z" fill="var(--color-oat)" stroke="var(--color-ink)" strokeOpacity="0.5" strokeWidth="1.2" />
        <path d="M44 76 q8 -4 16 0 t16 0 M44 90 q6 -3 12 0 t12 0 M44 104 q8 -3 14 0" fill="none" stroke="var(--color-ink)" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
        <text x="46" y="142" className="fill-muted font-serif text-[15px] italic">idea?</text>
      </g>
      <path d="M108 95 H142 M136 89 L142 95 L136 101" fill="none" stroke={built ? "var(--color-accent)" : "var(--color-faint)"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 300ms ease" }} />
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
  );
}
