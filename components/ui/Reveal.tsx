"use client";

import * as m from "motion/react-m";
import { ease } from "@/components/MotionProvider";

/**
 * Section-level reveal. Used sparingly — on headings and major blocks,
 * not on every element.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </Comp>
  );
}
