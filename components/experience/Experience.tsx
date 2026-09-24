import { experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader index="03" label="Experience" id="experience-title" title="Experience" />

        <ol className="mt-14 border-t border-ink sm:mt-20">
          {experience.map((item, i) => (
            <Reveal as="li" key={`${item.role}-${item.organization}`} delay={i * 0.04} className="border-b border-line">
              <div className="grid gap-x-8 gap-y-3 py-8 sm:py-10 md:grid-cols-12">
                <span className="font-mono text-[0.78rem] tabular-nums text-faint md:col-span-1 md:pt-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-5">
                  <h3 className="text-[1.6rem] leading-[1.1] font-medium tracking-[-0.03em] sm:text-[2rem]">{item.role}</h3>
                  {item.period && <p className="mt-2 font-mono text-[0.72rem] tracking-[0.1em] text-muted uppercase">{item.period}</p>}
                </div>
                <div className="md:col-span-6 md:pt-1.5">
                  <p className="flex items-start gap-2.5 text-[1.02rem] leading-snug font-medium">
                    <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      {item.organization}
                      {item.context && <span className="font-normal text-muted"> · {item.context}</span>}
                    </span>
                  </p>
                  <p className="mt-3 max-w-[32rem] pl-4 text-[0.98rem] leading-relaxed text-muted">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
