"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * One motion language for the whole site: quick, calm, precise.
 * `reducedMotion="user"` honours the visitor's system setting.
 */
export const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.45, ease }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
