import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject, type Block, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { PreviewStage } from "@/components/work/SelectedWork";
import { ProjectPreview } from "@/components/previews/ProjectPreview";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case study`,
    description: project.tagline,
    openGraph: { title: `${project.name} — Case study`, description: project.tagline, url: `/work/${project.slug}` },
  };
}

/** Section order + headings for every case study. Empty sections are skipped. */
function sectionsFor(p: Project) {
  const cs = p.caseStudy;
  const all = [
    { id: "problem", title: "Problem", block: cs.problem },
    { id: "why", title: "Why I cared", block: cs.whyICared },
    { id: "role", title: "My role", block: cs.role },
    { id: "approach", title: "Approach", block: cs.approach },
    { id: "decisions", title: "Product decisions", decisions: cs.decisions },
    { id: "technical", title: "Technical implementation", block: cs.technical },
    { id: "challenges", title: "Challenges", block: cs.challenges },
    { id: "learned", title: "What I learned", block: cs.learned },
    { id: "next", title: "What’s next", block: cs.next },
  ];
  const hasBlock = (b?: Block) => Boolean(b && ((b.text?.length ?? 0) > 0 || (b.points?.length ?? 0) > 0));
  return all.filter((s) => (s.decisions ? s.decisions.length > 0 : hasBlock(s.block)));
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = sectionsFor(project);
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Status", value: project.status },
    { label: "Tools", value: project.tools.join(", ") },
    { label: "Category", value: project.category },
  ].filter((m) => m.value);

  return (
    <article className="pt-24 sm:pt-28">
      <div className="shell">
        <Link
          href="/#work"
          className="group -ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-[0.9rem] text-muted transition-colors hover:text-ink"
        >
          <ArrowIcon direction="left" className="transition-transform duration-300 ease-out-soft group-hover:-translate-x-0.5" />
          All work
        </Link>

        <header className="mt-10 grid gap-10 border-t border-ink pt-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <p className="eyebrow hero-in">Case study · {String(idx + 1).padStart(2, "0")}</p>
            <h1 className="display-xl hero-in mt-6" style={{ animationDelay: "60ms" }}>
              {project.name}
            </h1>
            <p className="lede hero-in mt-6 max-w-[34rem] text-ink-2" style={{ animationDelay: "120ms" }}>
              {project.tagline}
            </p>
          </div>
          <dl className="hero-in grid content-start gap-0 lg:col-span-4 lg:col-start-9" style={{ animationDelay: "160ms" }}>
            {meta.map((m) => (
              <div key={m.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3.5 first:border-t lg:first:border-t-0">
                <dt className="eyebrow pt-[3px]">{m.label}</dt>
                <dd className="text-[0.95rem] leading-snug">{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {project.caseStudyNote && (
          <p className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-4 py-2 text-[0.88rem] text-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {project.caseStudyNote}
          </p>
        )}

        <Reveal className="mt-12 sm:mt-16">
          <PreviewStage wide={project.preview === "mentr"}>
            <ProjectPreview preview={project.preview} />
          </PreviewStage>
          <p className="mt-4 text-[0.85rem] text-muted">
            Interactive concept preview — try it. Sample content; not the live product.
          </p>
        </Reveal>

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.gallery.map((img) => (
              <figure key={img.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-paper-2">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                </div>
                {img.caption && <figcaption className="mt-3 text-[0.85rem] text-muted">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        {sections.length > 0 && (
          <div className="mt-20 grid gap-12 sm:mt-28 lg:grid-cols-12 lg:gap-x-12">
            <nav aria-label="Case study sections" className="hidden lg:col-span-3 lg:block">
              <ol className="sticky top-28 space-y-1 border-l border-line">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-[0.88rem] text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      <span className="font-mono text-[0.72rem] tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="space-y-16 sm:space-y-20 lg:col-span-8 lg:col-start-5">
              {sections.map((s, i) => (
                <Reveal as="section" key={s.id}>
                  <div id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24 border-t border-line pt-6">
                    <h2 id={`${s.id}-h`} className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.75rem] tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
                      <span className="display-md">{s.title}</span>
                    </h2>
                    <div className="mt-6 sm:pl-9">
                      {s.decisions ? <Decisions items={s.decisions} /> : s.block && <BlockBody block={s.block} />}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {next && next.slug !== project.slug && (
          <Link
            href={`/work/${next.slug}`}
            className="group mt-28 mb-20 flex flex-col gap-4 border-t border-ink pt-8 sm:mt-36 sm:mb-28 sm:flex-row sm:items-end sm:justify-between"
          >
            <span>
              <span className="eyebrow block">Next project</span>
              <span className="display-lg mt-4 block transition-colors duration-300 group-hover:text-accent">{next.name}</span>
            </span>
            <span className="grid h-14 w-14 place-items-center rounded-full border border-ink transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowIcon className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5" />
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}

function BlockBody({ block }: { block: Block }) {
  return (
    <div className="max-w-[40rem] space-y-5">
      {block.text?.map((t) => (
        <p key={t} className="text-[1.075rem] leading-[1.7] text-ink-2">
          {t}
        </p>
      ))}
      {block.points && block.points.length > 0 && (
        <ul className="space-y-0 border-t border-line">
          {block.points.map((pt) => (
            <li key={pt} className="flex gap-4 border-b border-line py-3.5 text-[1rem] leading-snug text-ink-2">
              <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
              {pt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Decisions({ items }: { items: { title: string; detail: string }[] }) {
  return (
    <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((d, i) => (
        <li key={d.title} className="rounded-[1.1rem] border border-line bg-card p-5 sm:p-6">
          <span className="font-mono text-[0.7rem] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-[1.15rem] leading-snug font-medium tracking-[-0.02em]">{d.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{d.detail}</p>
        </li>
      ))}
    </ol>
  );
}
