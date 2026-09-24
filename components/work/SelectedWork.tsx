import Link from "next/link";
import { projects, workIntro, type Project } from "@/content/projects";
import { experiments, labIntro, type ExperimentStatus } from "@/content/experiments";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PointerShift } from "@/components/ui/PointerShift";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { ProjectPreview } from "@/components/previews/ProjectPreview";

export function SelectedWork() {
  const [featured, ...rest] = projects;
  return (
    <section id="work" aria-labelledby="work-title" className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeader index="01" label="Selected Work" id="work-title" title={workIntro.heading} subtitle={workIntro.subtitle} />

        <div className="mt-20 sm:mt-28">{featured && <FeaturedProject project={featured} />}</div>

        {rest.map((project, i) => (
          <div key={project.slug} className="mt-32 sm:mt-44">
            <SecondaryProject project={project} index={i + 2} />
          </div>
        ))}

        {experiments.length > 0 && <AlsoExploring />}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Featured project — full width, the largest visual on the page.       */
/* ------------------------------------------------------------------ */
function FeaturedProject({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6">
          <ProjectMeta index={1} project={project} featured />
          <h3 id={`${project.slug}-title`} className="mt-8 text-[clamp(3rem,1.6rem+6vw,7rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            {project.name}
          </h3>
          <p className="mt-5 text-[1.2rem] tracking-[-0.015em] text-ink-2 sm:text-[1.45rem]">{project.tagline}</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="lede text-ink-2">{project.description}</p>
          <ProjectFacts project={project} />
          <CaseStudyLink project={project} className="mt-9" />
        </div>
      </Reveal>

      <Reveal delay={0.06} className="mt-14 sm:mt-20">
        <PreviewStage wide large>
          <ProjectPreview preview={project.preview} />
        </PreviewStage>
        <p className="mt-4 text-[0.85rem] text-muted">Interactive concept preview — try it. Sample content, not the live product.</p>
      </Reveal>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Secondary projects — split layout, visual first on desktop.          */
/* ------------------------------------------------------------------ */
function SecondaryProject({ project, index }: { project: Project; index: number }) {
  return (
    <article aria-labelledby={`${project.slug}-title`} className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16">
      <Reveal className="lg:order-2 lg:col-span-5 lg:col-start-8 lg:self-center">
        <ProjectMeta index={index} project={project} />
        <h3 id={`${project.slug}-title`} className="display-lg mt-8">
          {project.name}
        </h3>
        <p className="mt-4 text-[1.15rem] tracking-[-0.015em] text-ink-2 sm:text-[1.3rem]">{project.tagline}</p>
        <p className="mt-7 text-[1.05rem] leading-[1.7] text-muted">{project.description}</p>
        <ProjectFacts project={project} />
        <CaseStudyLink project={project} className="mt-9" />
      </Reveal>
      <Reveal delay={0.06} className="lg:order-1 lg:col-span-7">
        <PreviewStage wide={project.preview === "mentr"}>
          <ProjectPreview preview={project.preview} />
        </PreviewStage>
      </Reveal>
    </article>
  );
}

function ProjectMeta({ index, project, featured = false }: { index: number; project: Project; featured?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink pt-4">
      <span className="font-mono text-[0.78rem] tabular-nums">{String(index).padStart(2, "0")}</span>
      <span className="eyebrow">{featured ? "Featured project" : project.category}</span>
      {project.status && (
        <span className="ml-auto inline-flex items-center gap-1.5 text-[0.82rem] whitespace-nowrap text-muted">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {project.status}
        </span>
      )}
    </div>
  );
}

function ProjectFacts({ project }: { project: Project }) {
  const facts = [
    { label: "Role", value: project.role },
    { label: "Tools", value: project.tools.join(", ") },
  ].filter((f) => f.value);
  if (!facts.length) return null;
  return (
    <dl className="mt-8 border-t border-line">
      {facts.map((f) => (
        <div key={f.label} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-3.5">
          <dt className="eyebrow pt-[3px]">{f.label}</dt>
          <dd className="text-[0.98rem]">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseStudyLink({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group inline-flex min-h-12 items-center gap-3 text-[1.02rem] font-medium ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-colors duration-200 group-hover:text-accent">
        Explore Case Study
      </span>
      <span className="sr-only">: {project.name}</span>
      <span className="grid h-10 w-10 place-items-center rounded-full border border-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
        <ArrowIcon className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Visual stage shared with the case study pages.                       */
/* ------------------------------------------------------------------ */
export function PreviewStage({
  children,
  wide,
  large = false,
}: {
  children: React.ReactNode;
  wide: boolean;
  large?: boolean;
}) {
  return (
    <div
      className={`group/stage relative overflow-hidden rounded-[2rem] ${
        wide
          ? `bg-paper-2 px-3 py-10 sm:px-10 sm:py-16 ${large ? "lg:px-24 lg:py-24 xl:px-36" : "lg:px-12 lg:py-16"}`
          : "bg-accent px-4 py-12 sm:py-16 lg:py-20"
      }`}
    >
      {wide ? (
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-60" preserveAspectRatio="none">
          <defs>
            <pattern id="stage-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="var(--color-line-strong)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stage-dots)" />
        </svg>
      ) : (
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
        <div className="transition-transform duration-700 ease-out-soft group-hover/stage:scale-[1.012]">{children}</div>
      </PointerShift>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Also exploring — lighter list of smaller experiments.                */
/* ------------------------------------------------------------------ */
const statusDot: Record<ExperimentStatus, string> = {
  Exploring: "border border-dashed border-ink/50",
  Prototype: "border border-accent",
  Building: "bg-accent",
  Archived: "bg-faint/40",
};

function AlsoExploring() {
  return (
    <div className="mt-32 sm:mt-44">
      <Reveal className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-x-12">
        <h3 className="text-[1.6rem] font-medium tracking-[-0.03em] lg:col-span-4">{labIntro.heading}</h3>
        <p className="text-[1rem] text-muted lg:col-span-6 lg:col-start-7 lg:pt-2">{labIntro.subtitle}</p>
      </Reveal>
      <ul className="mt-10 border-t border-line-strong">
        {experiments.map((x) => (
          <li key={x.title} className="border-b border-line">
            <div className="grid grid-cols-1 gap-x-12 gap-y-2 py-6 sm:grid-cols-[1fr_auto] lg:grid-cols-12">
              <p className="font-medium tracking-[-0.01em] lg:col-span-4">{x.title}</p>
              <p className="text-[0.95rem] leading-relaxed text-muted sm:col-start-1 lg:col-span-6 lg:col-start-5">
                {x.testing}
                <span className="mt-1 block font-mono text-[0.72rem] text-faint">{x.tools}</span>
              </p>
              <p className="inline-flex items-center gap-2 text-[0.85rem] text-ink-2 sm:col-start-2 sm:row-start-1 sm:justify-self-end lg:col-span-2 lg:col-start-11">
                <span aria-hidden className={`h-2 w-2 rounded-full ${statusDot[x.status]}`} />
                <span className="sr-only">Status: </span>
                {x.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
