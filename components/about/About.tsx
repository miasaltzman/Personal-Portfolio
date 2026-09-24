import Image from "next/image";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AccentText } from "@/components/ui/AccentText";

export function About() {
  const { about } = profile;
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader index="03" label="About" id="about-title" title="About" />

        <div className="mt-20 grid grid-cols-1 gap-16 sm:mt-28 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-5">
            <p className="text-[clamp(1.75rem,1.2rem+1.9vw,2.9rem)] leading-[1.12] font-medium tracking-[-0.035em] text-balance">
              <AccentText text={about.heading} accentClassName="text-accent" />
            </p>
            {about.image && (
              <div className="relative mt-12 aspect-[4/5] max-w-[22rem] overflow-hidden rounded-[1.5rem] bg-paper-2">
                <Image src={about.image} alt={about.imageAlt} fill sizes="(min-width: 1024px) 22rem, 80vw" className="object-cover" />
              </div>
            )}
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="max-w-[36rem] space-y-6 text-[1.1rem] leading-[1.75] text-ink-2">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Reveal>
              <dl className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-3">
                {about.details.map((d, i) => (
                  <div key={d.label} className={`border-b border-line py-5 sm:pr-5 ${i > 0 ? "sm:border-l sm:pl-5" : ""}`}>
                    <dt className="eyebrow">{d.label}</dt>
                    <dd className="mt-2 text-[1rem] leading-snug">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="eyebrow">Thinking about</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {profile.interests.map((item) => (
                  <li key={item} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[0.92rem] text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
