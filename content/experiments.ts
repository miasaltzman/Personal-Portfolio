/**
 * LAB — experiments, prototypes & things Mia is curious about.
 *
 * Lighter than Selected Work on purpose. Each entry is a quick note, not a
 * case study. Leave `learning` as "" if there's no takeaway yet — the line
 * is simply hidden until you add one.
 *
 * Status options: "Exploring" | "Prototype" | "Building" | "Archived"
 *
 * TODO(Mia): these are starter entries based on what you're working on —
 * swap in your own experiments and results whenever you like.
 */

export type ExperimentStatus = "Exploring" | "Prototype" | "Building" | "Archived";

export type Experiment = {
  title: string;
  testing: string; // what I was testing
  tools: string; // tool / model
  learning: string; // result or learning
  status: ExperimentStatus;
};

export const labIntro = {
  heading: "Lab",
  subtitle: "Experiments, prototypes & things I’m curious about.",
};

export const experiments: Experiment[] = [
  {
    title: "This portfolio",
    testing:
      "How far AI-assisted development can take a design-led build — from a written brief to a responsive, accessible site.",
    tools: "Claude Code · Next.js · TypeScript",
    learning: "",
    status: "Building",
  },
  {
    title: "Personalized next steps",
    testing:
      "Whether a few simple inputs are enough for a model to suggest a next step that feels personal instead of generic.",
    tools: "LLM prompting",
    learning: "",
    status: "Exploring",
  },
  {
    title: "Same brief, different models",
    testing:
      "Giving multiple AI models the same product question and comparing how they reason, where they differ, and what they miss.",
    tools: "Multiple LLMs",
    learning: "",
    status: "Exploring",
  },
  {
    title: "Small agents for small workflows",
    testing:
      "Where lightweight AI agents are genuinely useful for everyday tasks — and where a simple checklist still wins.",
    tools: "AI agents",
    learning: "",
    status: "Exploring",
  },
];
