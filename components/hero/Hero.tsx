import Link from "next/link";
import { profile } from "@/content/profile";
import { getLinks } from "@/lib/links";
import { Headshot } from "@/components/ui/Headshot";
import { QuickLink } from "@/components/ui/QuickLink";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

/**
 * The opening screen: Mia first. Name + title on the left, a large editorial
 * portrait on the right, then a short intro and quick links.
 * On phones the portrait sits between the name and the intro.
 */
export function Hero() {
  const links = getLinks();
  const { hero, status } = profile;

  return (
    <section id="top" aria-labelledby="hero-name" className="relative pt-28 pb-28 sm:pt-36 lg:pt-36 lg:pb-40">
      <div className="shell grid grid-cols-1 gap-y-12 sm:gap-y-16 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-14 xl:gap-x-24">
        {/* Name + title */}
        <div className="hero-in lg:col-span-7 lg:row-start-1 lg:self-end">
          <h1
            id="hero-name"
            className="text-[clamp(3.4rem,1.2rem+8.4vw,8.5rem)] leading-[0.88] font-medium tracking-[-0.055em]"
          >
            Mia
            <br />
            Saltzman
          </h1>
          <div className="mt-8 flex items-start gap-4 sm:mt-10">
            <span aria-hidden className="mt-[0.7em] h-px w-8 shrink-0 bg-ink sm:w-12" />
            <div>
              <p className="text-[1.15rem] font-medium tracking-[-0.02em] sm:text-[1.4rem]">{profile.roleLine}</p>
              <p className="mt-1 text-[1rem] text-muted sm:text-[1.1rem]">{profile.school}</p>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div
          className="hero-in lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center"
          style={{ animationDelay: "80ms" }}
        >
          <figure className="relative mx-auto w-full max-w-[24rem] pr-3 pb-3 sm:max-w-[27rem] sm:pr-5 sm:pb-5 lg:mr-0 lg:max-w-[30rem]">
            <span aria-hidden className="absolute inset-0 top-3 left-3 rounded-[1.75rem] border border-accent/70 sm:top-5 sm:left-5" />
            <Headshot
              priority
              className="relative aspect-[4/5] rounded-[1.75rem]"
              sizes="(min-width: 1024px) 36vw, (min-width: 640px) 27rem, 90vw"
            />
            <figcaption className="absolute -bottom-9 left-0 flex w-full justify-between pr-3 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase sm:pr-5">
              <span>{profile.name}</span>
              <span>{profile.location}</span>
            </figcaption>
          </figure>
        </div>

        {/* Intro, quick links, status */}
        <div className="hero-in mt-6 lg:col-span-7 lg:row-start-2 lg:mt-0" style={{ animationDelay: "140ms" }}>
          <p className="serif-accent text-[2.1rem] leading-none text-ink sm:text-[2.5rem]">{hero.greeting}</p>
          <p className="lede mt-5 max-w-[33rem] text-ink-2">{hero.intro}</p>

          <nav aria-label="Quick links" className="mt-9">
            <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <li className="col-span-2 sm:col-span-1">
                <QuickLink href="#work" label="View My Work" arrow="down" primary className="w-full sm:w-auto" />
              </li>
              <li>
                <QuickLink href={links.resume} label="Resume" external arrow="up-right" className="w-full sm:w-auto" />
              </li>
              <li>
                <QuickLink href={links.linkedin} label="LinkedIn" external arrow="up-right" className="w-full sm:w-auto" />
              </li>
              <li className="col-span-2 sm:col-span-1">
                <QuickLink href="#contact" label="Contact Me" className="w-full sm:w-auto" />
              </li>
            </ul>
          </nav>

          {status.show && (
            <Link
              href={`/work/${status.projectSlug}`}
              className="group mt-10 -ml-1 inline-flex min-h-11 items-center gap-3 rounded-full px-1 text-[0.95rem] text-ink-2"
            >
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="status-pulse absolute inset-0 rounded-full bg-accent" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out-soft group-hover:bg-[length:100%_1px]">
                {status.label}
              </span>
              <ArrowIcon className="text-accent transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
