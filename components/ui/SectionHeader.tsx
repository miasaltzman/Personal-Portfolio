import { Reveal } from "./Reveal";

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
  subtitle?: string;
  aside?: React.ReactNode;
  id?: string;
  tone?: "light" | "dark";
}) {
  const muted = tone === "dark" ? "text-white/60" : "text-muted";
  return (
    <Reveal as="header" className="grid gap-6 md:grid-cols-12 md:gap-8">
      <p className={`eyebrow md:col-span-3 md:pt-3 ${tone === "dark" ? "!text-white/55" : ""}`}>
        <span className="tabular-nums">{index}</span>
        <span aria-hidden className="mx-2 opacity-50">
          /
        </span>
        {label}
      </p>
      <div className="md:col-span-9">
        <div className="flex items-start gap-4">
          <h2 id={id} className="display-lg">
            {title}
          </h2>
          {aside}
        </div>
        {subtitle && <p className={`lede mt-5 max-w-[34rem] ${muted}`}>{subtitle}</p>}
      </div>
    </Reveal>
  );
}
