import fs from "node:fs";
import path from "node:path";
import { contact } from "@/content/contact";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { CopyButton } from "./CopyButton";

/** True once the résumé PDF has been added to /public. Checked at build time. */
function resumeExists() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", contact.resume.file));
  } catch {
    return false;
  }
}

type Row = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  action: string;
  extra?: React.ReactNode;
};

export function Contact() {
  const hasResume = resumeExists();

  const rows: Row[] = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      action: "Send an email",
      extra: <CopyButton value={contact.email} label="Copy email address" />,
    },
    {
      label: "Phone",
      value: contact.phone.display,
      href: `tel:${contact.phone.tel}`,
      action: "Call",
    },
    {
      label: "LinkedIn",
      value: contact.linkedin.url ? contact.linkedin.display : "Link coming soon",
      href: contact.linkedin.url || undefined,
      external: true,
      action: "Open LinkedIn profile in a new tab",
    },
    {
      label: "Résumé",
      value: hasResume ? contact.resume.display : "PDF coming soon",
      href: hasResume ? contact.resume.file : undefined,
      external: true,
      action: "Open résumé PDF in a new tab",
      extra: hasResume ? (
        <a
          href={contact.resume.file}
          download
          className="relative z-10 inline-flex h-11 items-center rounded-full border border-white/20 px-4 text-[0.82rem] text-white/80 transition-colors hover:border-white/60 hover:text-white"
        >
          Download
        </a>
      ) : undefined,
    },
  ];

  if (contact.showGithub && contact.github) {
    rows.push({
      label: "GitHub",
      value: contact.github.replace(/^https?:\/\/(www\.)?/, ""),
      href: contact.github,
      external: true,
      action: "Open GitHub profile in a new tab",
    });
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink text-paper">
      <div className="shell section-pad">
        <Reveal as="header" className="grid gap-6 md:grid-cols-12 md:gap-8">
          <p className="eyebrow !text-white/55 md:col-span-3 md:pt-6">
            <span className="tabular-nums">06</span>
            <span aria-hidden className="mx-2 opacity-50">
              /
            </span>
            {contact.eyebrow}
          </p>
          <div className="md:col-span-9">
            <h2 id="contact-title" className="display-xl">
              {contact.heading}
            </h2>
            <p className="lede mt-6 max-w-[30rem] text-white/65">{contact.line}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-3 sm:mt-20 md:grid-cols-12">
          {rows.map((row, i) => (
            <Reveal
              as="li"
              key={row.label}
              delay={i * 0.05}
              className="md:col-span-9 md:col-start-4"
            >
              <ContactRow row={row} />
            </Reveal>
          ))}
        </ul>
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
