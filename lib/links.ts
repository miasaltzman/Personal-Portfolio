import fs from "node:fs";
import path from "node:path";
import { contact } from "@/content/contact";

/**
 * Resolves which personal links are live, from content/contact.ts.
 * The résumé counts as live once its PDF exists in /public (checked at build time).
 */
export function getLinks() {
  let resume: string | null = null;
  try {
    if (fs.existsSync(path.join(process.cwd(), "public", contact.resume.file))) resume = contact.resume.file;
  } catch {
    resume = null;
  }
  return {
    email: `mailto:${contact.email}`,
    phone: `tel:${contact.phone.tel}`,
    linkedin: contact.linkedin.url || null,
    resume,
    github: contact.showGithub && contact.github ? contact.github : null,
  };
}

export type Links = ReturnType<typeof getLinks>;
