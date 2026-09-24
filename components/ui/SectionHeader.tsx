import { Reveal } from "./Reveal";

/**
 * "01 — Selected Work" style section opener: a numbered label on a hairline,
 * then a large heading with an optional short line beside it.
 */
export function SectionHeader({
  index,
  label,
  title,
  subtitle,
  aside,
  id,
  tone = "light",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  aside?: React.ReactNode;
  id?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Reveal as="header">
      <div className="flex items-center gap-5">
        <p className={`eyebrow shrink-0 ${dark ? "!text-white/55" : "!text-ink"}`}>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden className="mx-2.5">
            —
          </span>
          {label}
        </p>
        <span aria-hidden className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-line-strong"}`} />
      </div>

      <div className="mt-10 grid grid-cols-1 items-end gap-6 sm:mt-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="flex items-start gap-3 lg:col-span-7">
          <h2 id={id} className="display-lg">
            {title}
          </h2>
          {aside}
        </div>
        {subtitle && (
          <div className={`lede max-w-[28rem] lg:col-span-5 lg:col-start-8 lg:justify-self-end ${dark ? "text-white/65" : "text-muted"}`}>
            {subtitle}
          </div>
        )}
      </div>
    </Reveal>
  );
}
