"use client";

import { useEffect, useRef } from "react";

/**
 * Shifts its child a few pixels toward the pointer — desktop only.
 * No effect on touch devices or with reduced motion.
 */
export function PointerShift({
  children,
  strength = 6,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (!fine.matches || reduce.matches || e.pointerType !== "mouse") return;
      const r = o.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        i.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      i.style.transform = "";
    };
    o.addEventListener("pointermove", onMove);
    o.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      o.removeEventListener("pointermove", onMove);
      o.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="transition-transform duration-700 ease-out-soft">
        {children}
      </div>
    </div>
  );
}
