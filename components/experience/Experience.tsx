import { experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Editorial rows: dates · organization · role + summary.
 * On phones each row stacks as role → organization → dates → summary.
 */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader index="02" label="Experience" id="experience-title" title="Experience" />

        <div aria-hidden className="eyebrow mt-20 hidden grid-cols-12 gap-x-12 pb-4 sm:mt-28 lg:grid">
          <span className="col-span-2">When</span>
          <span className="col-span-4">Where</span>
          <span className="col-span-6">What</span>
        </div>

        <ol className="mt-16 border-t border-ink sm:mt-20 lg:mt-0">
          {experience.map((item, i) => (
            <Reveal as="li" key={`${item.role}-${item.organization}`} delay={i * 0.04} className="border-b border-line-strong">
              <article className="grid grid-cols-1 gap-x-12 gap-y-4 py-10 sm:py-14 lg:grid-cols-12">
                <p
                  className={`order-3 font-mono text-[0.75rem] tracking-[0.08em] uppercase lg:order-none lg:col-span-2 lg:pt-2 ${
                    item.period ? "text-ink-2" : "text-faint"
                  }`}
                >
                  {item.period || "Dates TBA"}
                </p>
                <div className="order-2 lg:order-none lg:col-span-4 lg:pt-1">
                  <p className="text-[1.05rem] leading-snug font-medium">{item.organization}</p>
                  {item.context && <p className="mt-1 text-[0.95rem] text-muted">{item.context}</p>}
                </div>
                <div className="order-1 lg:order-none lg:col-span-6">
                  <h3 className="text-[1.75rem] leading-[1.1] font-medium tracking-[-0.03em] sm:text-[2.2rem]">{item.role}</h3>
                  <p className="mt-4 hidden max-w-[34rem] text-[1.02rem] leading-relaxed text-muted lg:block">{item.description}</p>
                </div>
                <p className="order-4 max-w-[34rem] text-[1.02rem] leading-relaxed text-muted lg:hidden">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
