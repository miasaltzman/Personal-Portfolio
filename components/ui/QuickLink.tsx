import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";

type Tone = "light" | "dark";

/**
 * An understated pill link. When `href` is null (e.g. LinkedIn URL not added
 * yet) it renders as a quiet, non-clickable "soon" placeholder instead.
 */
export function QuickLink({
  href,
  label,
  external = false,
  primary = false,
  arrow = "right",
  tone = "light",
  className = "",
}: {
  href: string | null;
  label: string;
  external?: boolean;
  primary?: boolean;
  arrow?: "right" | "up-right" | "down";
  tone?: Tone;
  className?: string;
}) {
  const base =
    "group inline-flex min-h-12 items-center justify-between gap-3 rounded-full px-5 text-[0.95rem] font-medium transition-[background-color,border-color,color] duration-200 active:scale-[0.98] sm:justify-center";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${base} cursor-default border border-dashed ${
          tone === "dark" ? "border-white/20 text-white/40" : "border-line-strong text-faint"
        } active:scale-100 ${className}`}
      >
        {label}
        <span className="font-mono text-[0.6rem] tracking-[0.12em] uppercase">soon</span>
      </span>
    );
  }

  const style = primary
    ? "bg-ink text-paper hover:bg-accent"
    : tone === "dark"
      ? "border border-white/25 text-white hover:border-white/70"
      : "border border-line-strong text-ink hover:border-ink";

  const content = (
    <>
      {label}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
      <ArrowIcon
        direction={arrow}
        className={`shrink-0 transition-transform duration-300 ease-out-soft ${
          arrow === "down" ? "group-hover:translate-y-0.5" : arrow === "up-right" ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1"
        }`}
      />
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${style} ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${style} ${className}`}>
      {content}
    </Link>
  );
}
