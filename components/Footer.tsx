import { profile } from "@/content/profile";
import { getLinks } from "@/lib/links";

export function Footer() {
  const links = getLinks();
  const year = new Date().getFullYear();
  const small = [
    links.linkedin && { label: "LinkedIn", href: links.linkedin, external: true },
    { label: "Email", href: links.email, external: false },
    links.resume && { label: "Resume", href: links.resume, external: true },
  ].filter(Boolean) as { label: string; href: string; external: boolean }[];

  return (
    <footer className="bg-ink text-white/55">
      <div className="shell flex flex-col gap-4 border-t border-white/10 py-10 text-[0.88rem] sm:flex-row sm:items-center sm:justify-between">
        <p className="flex flex-wrap gap-x-3 gap-y-1">
          <span className="text-white/85">{profile.name}</span>
          <span aria-hidden>·</span>
          <span>{profile.location}</span>
          <span aria-hidden>·</span>
          <span>© {year}</span>
        </p>
        <ul className="-ml-2 flex items-center gap-1 sm:ml-0">
          {small.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex min-h-11 items-center rounded-md px-2 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
