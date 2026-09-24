import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Headshot } from "@/components/ui/Headshot";

export function About() {
  const { about } = profile;
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad border-t border-line">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">
            <span className="tabular-nums">02</span>
            <span aria-hidden className="mx-2 opacity-50">
              /
            </span>
            About
          </p>
          <figure className="mt-8 max-w-[28rem] lg:sticky lg:top-28 lg:max-w-none">
            <Headshot className="aspect-[4/5] rounded-[1.5rem]" />
            <figcaption className="mt-4 flex items-center justify-between gap-4 font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
              <span>{profile.name}</span>
              <span>
                {profile.hometown} <span aria-hidden>→</span>
                <span className="sr-only">to</span> {profile.basedIn}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
          <Reveal>
            <h2 id="about-title" className="display-md max-w-[20ch]">
              {about.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="mt-10 max-w-[34rem] space-y-5 text-[1.075rem] leading-[1.7] text-ink-2">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.05}>
            <dl className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-3">
              {about.details.map((d, i) => (
                <div
                  key={d.label}
                  className={`border-b border-line py-5 sm:pr-5 ${i > 0 ? "sm:border-l sm:pl-5" : ""}`}
                >
                  <dt className="eyebrow">{d.label}</dt>
                  <dd className="mt-2 text-[1rem] leading-snug">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.05} className="mt-12">
            <h3 className="eyebrow">Thinking about</h3>
            <ul className="mt-4 flex flex-wrap gap-x-1 gap-y-2 text-[1.05rem] leading-snug">
              {profile.interests.map((item, i) => (
                <li key={item} className="text-ink-2">
                  {item}
                  {i < profile.interests.length - 1 && (
                    <span aria-hidden className="px-2 text-faint">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
