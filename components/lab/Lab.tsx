import { experiments, labIntro, type ExperimentStatus } from "@/content/experiments";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Lab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="section-pad bg-paper-2">
      <div className="shell">
        <SectionHeader index="04" label="Lab" id="lab-title" title={labIntro.heading} subtitle={labIntro.subtitle} />

        {/* Column headings (desktop) */}
        <div
          aria-hidden
          className="eyebrow mt-14 hidden grid-cols-12 gap-8 border-b border-line-strong pb-3 sm:mt-20 lg:grid"
        >
          <span className="col-span-3">Experiment</span>
          <span className="col-span-5">What I’m testing</span>
          <span className="col-span-2">Tools</span>
          <span className="col-span-2 text-right">Status</span>
        </div>

        <ul className="mt-12 border-t border-line-strong sm:mt-16 lg:mt-0 lg:border-t-0">
          {experiments.map((x, i) => (
            <Reveal as="li" key={x.title} delay={i * 0.04} className="border-b border-line-strong">
              <article className="grid gap-x-8 gap-y-3 py-7 lg:grid-cols-12 lg:py-8">
                <div className="flex items-start justify-between gap-4 lg:col-span-3 lg:block">
                  <h3 className="text-[1.2rem] leading-snug font-medium tracking-[-0.02em]">{x.title}</h3>
                  <span className="lg:hidden">
                    <StatusBadge status={x.status} />
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <p className="sr-only">What I’m testing:</p>
                  <p className="max-w-[36rem] text-[0.98rem] leading-relaxed text-ink-2">{x.testing}</p>
                  {x.learning && (
                    <p className="mt-2 text-[0.9rem] text-muted">
                      <span className="font-medium text-ink-2">Learning:</span> {x.learning}
                    </p>
                  )}
                </div>
                <p className="font-mono text-[0.75rem] leading-relaxed tracking-[0.02em] text-muted lg:col-span-2 lg:pt-1">
                  <span className="sr-only">Tools: </span>
                  {x.tools}
                </p>
                <div className="hidden lg:col-span-2 lg:flex lg:justify-end lg:pt-0.5">
                  <StatusBadge status={x.status} />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const statusStyle: Record<ExperimentStatus, string> = {
  Exploring: "border border-dashed border-ink/40 bg-transparent",
  Prototype: "border border-accent bg-transparent",
  Building: "border border-accent bg-accent",
  Archived: "border border-faint bg-faint/30",
};

function StatusBadge({ status }: { status: ExperimentStatus }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-card px-3 py-1 text-[0.78rem] text-ink-2">
      <span aria-hidden className={`h-2 w-2 rounded-full ${statusStyle[status]}`} />
      <span className="sr-only">Status: </span>
      {status}
    </span>
  );
}
