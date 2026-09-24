"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently under the top third of the viewport.
 */
export function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        // The last section in document order that crosses the band wins.
        const current = [...ids].reverse().find((id) => visible.get(id));
        setActive(current ?? null);
      },
      // A thin band ~35% down the viewport.
      { rootMargin: "-35% 0px -64% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}
