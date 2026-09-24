import Link from "next/link";
import { projects, workIntro, type Project } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PointerShift } from "@/components/ui/PointerShift";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ProjectPreview } from "@/components/previews/ProjectPreview";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-pad">
      <div className="shell">
        <SectionHeader index="01" label="Work" id="work-title" title={workIntro.heading} subtitle={workIntro.subtitle} />
        <div className="mt-16 space-y-24 sm:mt-20 lg:space-y-36">
          {projects.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Alternating editorial compositions: the first project leads with a wide
 * product window, the next with a tall phone-sized preview on a cobalt field.
 */
function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const wide = project.preview === "mentr";

  return (
    <article aria-labelledby={`${project.slug}-title`} className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-12">
      <Reveal
        className={`flex flex-col lg:col-span-5 ${flipped ? "lg:order-2 lg:col-start-8" : ""} ${wide ? "lg:pt-6" : "lg:justify-center"}`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink pt-4">
          <span className="font-mono text-[0.78rem] tabular-nums">{number}</span>
          <span className="eyebrow">{project.category}</span>
          {project.status && (
            <span className="ml-auto inline-flex items-center gap-1.5 text-[0.8rem] whitespace-nowrap text-muted">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {project.status}
            </span>
          )}
        </div>

        <h3 id={`${project.slug}-title`} className="display-lg mt-8">
          {project.name}
        </h3>
        <p className="lede mt-5 max-w-[30rem] text-ink-2">{project.tagline}</p>

        <dl className="mt-9 grid gap-5 text-[0.95rem] leading-relaxed">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
            <dt className="eyebrow pt-[3px]">Problem</dt>
            <dd className="text-muted">{project.summary.problem}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
            <dt className="eyebrow pt-[3px]">Idea</dt>
            <dd className="text-muted">{project.summary.idea}</dd>
          </div>
          {project.role && (
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
              <dt className="eyebrow pt-[3px]">My role</dt>
              <dd className="text-muted">{project.role}</dd>
            </div>
          )}
        </dl>

        <div className="mt-9">
          <Link
            href={`/work/${project.slug}`}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-ink px-5 text-[0.95rem] font-medium transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            Read the case study
            <span className="sr-only">: {project.name}</span>
            <ArrowIcon className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      <Reveal delay={0.08} className={`lg:col-span-7 ${flipped ? "lg:order-1 lg:col-start-1" : ""}`}>
        <PreviewStage wide={wide}>
          <ProjectPreview preview={project.preview} />
        </PreviewStage>
      </Reveal>
    </article>
  );
}

export function PreviewStage({ children, wide }: { children: React.ReactNode; wide: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] ${
        wide ? "bg-paper-2 px-3 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-14" : "bg-accent px-4 py-10 sm:py-14 lg:py-16"
      }`}
    >
      {!wide && (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" preserveAspectRatio="none">
          <defs>
            <pattern id="vita-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="white" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vita-grid)" />
        </svg>
      )}
      <PointerShift strength={5} className="relative">
        {children}
      </PointerShift>
    </div>
  );
}
