import Link from "next/link";
import { profile } from "@/content/profile";
import { AccentText } from "@/components/ui/AccentText";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { RelationshipDiagram } from "./RelationshipDiagram";
import { StatusPill } from "./StatusPill";

export function Hero() {
  const { hero } = profile;
  return (
    <section id="top" aria-labelledby="hero-name" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-40 lg:pb-28">
      <div className="shell grid items-center gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7 xl:col-span-7">
          <h1
            id="hero-name"
            className="hero-in flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.78rem] tracking-[0.22em] text-ink uppercase"
          >
            {profile.name}
            <span aria-hidden className="h-px w-10 bg-line-strong" />
            <span className="text-muted">
              {profile.program} · {profile.schoolShort}
            </span>
          </h1>

          <p className="hero-in display-xl mt-7 max-w-[13ch] sm:mt-8" style={{ animationDelay: "60ms" }}>
            <AccentText text={hero.statement} accentClassName="text-accent" />
          </p>

          <p className="hero-in lede mt-7 max-w-[35rem] text-muted sm:mt-8" style={{ animationDelay: "120ms" }}>
            {hero.supporting}
          </p>

          <div className="hero-in mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "180ms" }}>
            <Link
              href={hero.primaryCta.href}
              className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-[0.95rem] font-medium text-paper transition-colors duration-200 hover:bg-accent active:scale-[0.98]"
            >
              {hero.primaryCta.label}
              <ArrowIcon direction="down" className="transition-transform duration-300 ease-out-soft group-hover:translate-y-0.5" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-[0.95rem] font-medium transition-colors duration-200 hover:border-ink active:scale-[0.98]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          {profile.status.show && (
            <div className="hero-in mt-10" style={{ animationDelay: "240ms" }}>
              <StatusPill />
            </div>
          )}
        </div>

        <div className="hero-in lg:col-span-5" style={{ animationDelay: "200ms" }}>
          <RelationshipDiagram />
        </div>
      </div>
    </section>
  );
}
