/** Tiny rAF tween used by the Beyond AI illustrations. Returns a cancel fn. */
export function tween(
  duration: number,
  onFrame: (t: number) => void,
  onDone?: () => void,
  ease: (t: number) => number = easeInOutCubic,
) {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    onFrame(1);
    onDone?.();
    return () => {};
  }
  let raf = 0;
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    onFrame(ease(t));
    if (t < 1) raf = requestAnimationFrame(step);
    else onDone?.();
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
