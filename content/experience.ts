/**
 * EXPERIENCE — roles shown in the Experience section, in display order.
 *
 * To add a role, copy one { … } block, paste it where you want it in the list,
 * and edit the text. `period` is optional — leave it "" to hide it.
 */

export type Experience = {
  role: string;
  organization: string;
  context?: string; // short line under the organization name
  period?: string; // e.g. "2025 — Present"
  description: string; // one or two factual sentences
};

export const experience: Experience[] = [
  {
    role: "AI Specialist",
    // TODO(Mia): replace with the organization's official name.
    organization: "Student computer science & technology organization",
    context: "San Diego State University",
    period: "",
    description:
      "Focused on the AI side of a student technology community — helping members explore AI tools and topics.",
  },
  {
    role: "Executive Board Member",
    organization: "World Computing Organization",
    context: "San Diego State University",
    period: "",
    description:
      "Part of the executive board helping run the organization and its programming for members.",
  },
  {
    role: "Program Logistics Intern",
    organization: "NFLA",
    context: "San Diego Chapter",
    period: "",
    description:
      "Supported the logistics behind chapter programs — the planning and coordination that help events run smoothly.",
  },
];
