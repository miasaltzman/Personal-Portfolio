import { contact } from "@/content/contact";
import { getLinks } from "@/lib/links";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AccentText } from "@/components/ui/AccentText";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CopyButton } from "./CopyButton";

type Row = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  action: string;
  extra?: React.ReactNode;
};

/** The finale: what Mia is open to, and every way to reach her. */
export function Contact() {
  const links = getLinks();

  const rows: Row[] = [
    {
      label: "Email",
      value: contact.email,
      href: links.email,
      action: "Send an email",
      extra: <CopyButton value={contact.email} label="Copy email address" />,
    },
    {
      label: "Phone",
      value: contact.phone.display,
      href: links.phone,
      action: "Call",
    },
    {
      label: "LinkedIn",
      value: links.linkedin ? contact.linkedin.display : "Link coming soon",
      href: links.linkedin ?? undefined,
      external: true,
      action: "Open LinkedIn profile in a new tab",
    },
    {
      label: "Resume",
      value: links.resume ? contact.resume.display : "PDF coming soon",
      href: links.resume ?? undefined,
      external: true,
      action: "Open résumé PDF in a new tab",
      extra: links.resume ? (
        <a
          href={links.resume}
          download
          className="relative z-10 inline-flex h-11 items-center rounded-full border border-white/20 px-4 text-[0.82rem] text-white/80 transition-colors hover:border-white/60 hover:text-white"
        >
          Download
        </a>
      ) : undefined,
    },
  ];

  if (links.github) {
    rows.push({
      label: "GitHub",
      value: links.github.replace(/^https?:\/\/(www\.)?/, ""),
      href: links.github,
      external: true,
      action: "Open GitHub profile in a new tab",
    });
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-ink text-paper">
      <div className="shell section-pad">
        <SectionHeader
          index="05"
          label="Let’s Connect"
          id="contact-title"
          tone="dark"
          title={
            <span className="block text-[clamp(3.2rem,1.4rem+7vw,8rem)] leading-[0.92] tracking-[-0.05em]">
              <AccentText text={contact.heading} accentClassName="text-accent-light" />
            </span>
          }
        />

        <div className="mt-20 grid grid-cols-1 gap-16 sm:mt-28 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-4">
            <h3 className="eyebrow !text-white/55">Open to</h3>
            <ul className="mt-6 space-y-4">
              {contact.openTo.map((item) => (
                <li key={item} className="flex items-baseline gap-4 text-[1.2rem] leading-snug tracking-[-0.015em] text-white/90 sm:text-[1.35rem]">
                  <span aria-hidden className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-accent-light" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className="grid grid-cols-1 gap-3 lg:col-span-7 lg:col-start-6">
            {rows.map((row, i) => (
              <Reveal as="li" key={row.label} delay={i * 0.05}>
                <ContactRow row={row} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ row }: { row: Row }) {
  const live = Boolean(row.href);
  const hasActions = Boolean(row.extra) || live;
  return (
    <div
      className={`group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 rounded-[1.1rem] border px-4 py-5 transition-[border-color,background-color] duration-300 sm:min-h-[5.5rem] sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:gap-x-6 sm:px-7 ${
        live
          ? "border-white/15 hover:border-white/45 hover:bg-white/[0.035] has-[a:focus-visible]:border-white/60"
          : "border-dashed border-white/12"
      }`}
    >
      <span className="col-start-1 row-start-1 font-mono text-[0.7rem] tracking-[0.14em] text-white/50 uppercase">
        {row.label}
      </span>

      {live ? (
        <a
          href={row.href}
          {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={`${row.action}: ${row.value}`}
          className="col-span-2 row-start-2 text-[1.15rem] font-medium tracking-[-0.02em] [overflow-wrap:anywhere] after:absolute after:inset-0 after:rounded-[1.1rem] focus-visible:outline-none xs:text-[1.3rem] sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:text-[1.6rem] lg:text-[1.9rem]"
        >
          {row.value}
        </a>
      ) : (
        <span
          className={`text-[1rem] text-white/40 sm:col-start-2 sm:row-start-1 ${
            hasActions ? "col-span-2 row-start-2 sm:col-span-1" : "col-start-2 row-start-1 justify-self-end sm:justify-self-start"
          }`}
        >
          {row.value}
        </span>
      )}

      {hasActions && (
        <span className="col-start-2 row-start-1 flex items-center gap-2 justify-self-end sm:col-start-3">
          {row.extra}
          {live && (
            <span
              aria-hidden
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-[background-color,border-color] duration-300 group-hover:border-accent group-hover:bg-accent"
            >
              <ArrowIcon
                direction={row.external ? "up-right" : "right"}
                className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
              />
            </span>
          )}
        </span>
      )}
    </div>
  );
}
