/**
 * BEYOND AI — personal facts, revealed one at a time.
 *
 * Visitors see only the labels at first ("Outside the screen", …) and pick
 * one to open it. Each fact pairs with a small illustration.
 *
 *   label   — the clickable label (shown in capitals)
 *   title   — what the fact is about, shown once opened
 *   reveal  — the main line
 *   detail  — optional second line
 *   show    — set to false to hide a fact
 *
 * `illustration` picks the drawing: "snowboard" | "coffee" | "route" | "tags" | "build"
 */

export type Illustration = "snowboard" | "coffee" | "route" | "tags" | "build";

export type PersonalFact = {
  id: string;
  label: string;
  title: string;
  reveal: string;
  detail?: string;
  illustration: Illustration;
  show: boolean;
};

export const beyondIntro = {
  heading: "Beyond AI",
  line: "There’s more to me than my major.",
  prompt: "Pick one",
};

export const personalFacts: PersonalFact[] = [
  {
    id: "outside",
    label: "Outside the screen",
    title: "Snowboarding",
    reveal: "Preferred terrain: somewhere with a chairlift.",
    illustration: "snowboard",
    show: true,
  },
  {
    id: "ritual",
    label: "Daily ritual",
    title: "Coffee",
    reveal: "Coffee. Always.",
    illustration: "coffee",
    show: true,
  },
  {
    id: "home",
    label: "Home base",
    title: "Los Angeles → San Diego",
    reveal: "LA-grown. San Diego-based.",
    illustration: "route",
    show: true,
  },
  {
    id: "entrepreneurial",
    label: "Entrepreneurial side",
    title: "Depop",
    reveal: "120+ items sold on Depop.",
    detail: "An early lesson in figuring out what people actually want.",
    illustration: "tags",
    show: true,
  },
  {
    id: "build",
    label: "From idea to build",
    title: "Idea → prototype",
    reveal: "Has an idea. Immediately wonders if she can build it.",
    illustration: "build",
    show: true,
  },
];

// Abstract tags flipped through in the Depop illustration (no prices, on purpose).
export const depopTags = ["Vintage tee", "Denim jacket", "Knit sweater", "Mini skirt"];

// The tiny constellation easter egg beside the "Beyond AI" heading.
export const leo = {
  show: true,
  reveal: "Leo. Interpret responsibly.",
};
