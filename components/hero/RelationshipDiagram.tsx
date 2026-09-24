"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AI × Product × People
 *
 * Three typographic points, the curves between them, and the point where
 * they meet. On desktop the geometry leans a few pixels toward the pointer;
 * on touch, tapping a point highlights its connections. It is complete as a
 * static drawing — motion only adds depth.
 */

type NodeId = "ai" | "product" | "people";

const W = 480;
const H = 440;
const CENTER = { x: 240, y: 260 };

const NODES: {
  id: NodeId;
  label: string;
  line: string;
  x: number;
  y: number;
  depth: [number, number];
  labelPos: string; // where the label sits relative to the point
}[] = [
  { id: "ai", label: "AI", line: "What’s newly possible.", x: 240, y: 62, depth: [9, 6], labelPos: "above" },
  { id: "product", label: "Product", line: "What’s worth building.", x: 92, y: 360, depth: [6, 9], labelPos: "below" },
  { id: "people", label: "People", line: "What’s actually needed.", x: 388, y: 360, depth: [11, 5], labelPos: "below" },
];

const EDGES: [NodeId, NodeId][] = [
  ["ai", "product"],
  ["product", "people"],
  ["people", "ai"],
];

const DEFAULT_LINE = "Where the three meet is where I want to work.";

export function RelationshipDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const edgeRefs = useRef<(SVGPathElement | null)[]>([]);
  const spokeRefs = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const centerRef = useRef<SVGGElement>(null);

  const [hovered, setHovered] = useState<NodeId | null>(null);
  const [selected, setSelected] = useState<NodeId | null>(null);
  const active = hovered ?? selected;

  // Pointer-follow: lerp toward a target, only while something is moving.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    const draw = () => {
      const scale = wrap.clientWidth / W;
      const pos = NODES.map((n) => ({
        x: n.x + cur.x * n.depth[0],
        y: n.y + cur.y * n.depth[1],
      }));
      const c = { x: CENTER.x + cur.x * 16, y: CENTER.y + cur.y * 14 };

      NODES.forEach((n, i) => {
        nodeRefs.current[i]?.setAttribute("transform", `translate(${pos[i].x} ${pos[i].y})`);
        const label = labelRefs.current[i];
        if (label) {
          label.style.transform = `translate(${(pos[i].x - n.x) * scale}px, ${(pos[i].y - n.y) * scale}px)`;
        }
        spokeRefs.current[i]?.setAttribute("x1", String(c.x));
        spokeRefs.current[i]?.setAttribute("y1", String(c.y));
        spokeRefs.current[i]?.setAttribute("x2", String(pos[i].x));
        spokeRefs.current[i]?.setAttribute("y2", String(pos[i].y));
      });
      centerRef.current?.setAttribute("transform", `translate(${c.x} ${c.y})`);

      EDGES.forEach(([a, b], i) => {
        const pa = pos[NODES.findIndex((n) => n.id === a)];
        const pb = pos[NODES.findIndex((n) => n.id === b)];
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2;
        // Bow each curve slightly toward the meeting point, and toward the pointer.
        const cx = mx + (c.x - mx) * 0.22 + cur.x * 10;
        const cy = my + (c.y - my) * 0.22 + cur.y * 10;
        edgeRefs.current[i]?.setAttribute("d", `M${pa.x} ${pa.y} Q${cx} ${cy} ${pb.x} ${pb.y}`);
      });
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.1;
      cur.y += (target.y - cur.y) * 0.1;
      draw();
      if (Math.abs(target.x - cur.x) > 0.001 || Math.abs(target.y - cur.y) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (reduce.matches) return;
      const r = wrap.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const edgeActive = (a: NodeId, b: NodeId) => active === a || active === b;
  const activeNode = NODES.find((n) => n.id === active);

  return (
    <figure className="mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:ml-auto lg:mr-0">
      <div ref={wrapRef} className="relative aspect-[480/440] w-full select-none touch-manipulation">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={188}
            fill="none"
            stroke="var(--color-line)"
            strokeDasharray="2 7"
            strokeLinecap="round"
          />
          <circle cx={CENTER.x} cy={CENTER.y} r={96} fill="none" stroke="var(--color-line)" />

          {NODES.map((n, i) => (
            <line
              key={n.id}
              ref={(el) => {
                spokeRefs.current[i] = el;
              }}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={n.x}
              y2={n.y}
              stroke={active === n.id ? "var(--color-accent)" : "var(--color-line-strong)"}
              strokeWidth={1}
              strokeDasharray="3 5"
              className="transition-[stroke] duration-300"
            />
          ))}

          {EDGES.map(([a, b], i) => (
            <path
              key={`${a}-${b}`}
              ref={(el) => {
                edgeRefs.current[i] = el;
              }}
              pathLength={1}
              fill="none"
              stroke={edgeActive(a, b) ? "var(--color-accent)" : "var(--color-ink)"}
              strokeOpacity={edgeActive(a, b) ? 1 : 0.55}
              strokeWidth={edgeActive(a, b) ? 1.75 : 1.25}
              strokeLinecap="round"
              className="draw-in transition-[stroke,stroke-width,stroke-opacity] duration-300"
              style={{ animationDelay: `${300 + i * 140}ms` }}
            />
          ))}

          {NODES.map((n, i) => (
            <g
              key={n.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              transform={`translate(${n.x} ${n.y})`}
            >
              <circle
                r={active === n.id ? 16 : 0}
                fill="var(--color-accent)"
                fillOpacity={0.12}
                className="transition-[r] duration-300 ease-out-soft"
              />
              <circle
                r={6}
                fill={active === n.id ? "var(--color-accent)" : "var(--color-paper)"}
                stroke={active === n.id ? "var(--color-accent)" : "var(--color-ink)"}
                strokeWidth={1.5}
                className="transition-[fill,stroke] duration-300"
              />
            </g>
          ))}

          <g ref={centerRef} transform={`translate(${CENTER.x} ${CENTER.y})`}>
            <circle r={18} fill="none" stroke="var(--color-accent)" strokeOpacity={0.35} />
            <circle r={6.5} fill="var(--color-accent)" />
          </g>
        </svg>

        {NODES.map((n, i) => {
          const isActive = active === n.id;
          return (
            <div
              key={n.id}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className="absolute will-change-transform"
              style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
            >
              <button
                type="button"
                aria-pressed={selected === n.id}
                aria-label={`${n.label}: ${n.line}`}
                onClick={() => setSelected((s) => (s === n.id ? null : n.id))}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(n.id)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                className={`absolute top-0 left-0 -translate-x-1/2 rounded-lg px-3 py-1.5 text-[1.6rem] leading-none font-medium tracking-[-0.035em] whitespace-nowrap transition-colors duration-300 sm:text-[2rem] ${
                  n.labelPos === "above" ? "-translate-y-[calc(100%+14px)]" : "translate-y-[14px]"
                } ${isActive ? "text-accent" : "text-ink hover:text-accent"}`}
              >
                <span className="flex min-h-8 items-center">{n.label}</span>
              </button>
            </div>
          );
        })}
      </div>

      <figcaption className="mt-3 flex min-h-12 items-start gap-3 border-t border-line pt-4" aria-live="polite">
        <span className="eyebrow shrink-0 pt-[3px] tabular-nums">{activeNode ? activeNode.label : "AI × Product × People"}</span>
        <span className="text-[0.95rem] leading-snug text-muted">{activeNode ? activeNode.line : DEFAULT_LINE}</span>
      </figcaption>
    </figure>
  );
}
