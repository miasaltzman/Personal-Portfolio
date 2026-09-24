/**
 * BEYOND AI — "A few things that don’t fit on a résumé."
 *
 * Each fact pairs with a small illustration (in components/beyond/).
 *   label  — always visible, so the fact reads fine without tapping
 *   reveal — the line that appears after someone taps / clicks
 *   detail — optional second line under the reveal
 *
 * To hide a moment, set `show: false`.
 */

export const beyondIntro = {
  heading: "Beyond AI",
  subtitle: "A few things that don’t fit on a résumé.",
};

export const personalFacts = {
  snowboarding: {
    show: true,
    label: "Snowboarding",
    reveal: "Preferred terrain: somewhere with a chairlift.",
    hint: "Send it",
  },
  cities: {
    show: true,
    label: "Los Angeles → San Diego",
    reveal: "LA-grown. San Diego-based.",
    hint: "Trace the route",
  },
  matcha: {
    show: true,
    label: "Go-to order",
    reveal: "Matcha + oat milk. Always.",
    hint: "Pour one",
  },
  depop: {
    show: true,
    label: "Depop seller",
    reveal: "120+ items sold on Depop.",
    detail: "An early lesson in selling things people actually want.",
    hint: "Flip through",
    // Abstract tags shown in the illustration (no prices, on purpose).
    tags: ["Vintage tee", "Denim jacket", "Knit sweater", "Mini skirt"],
  },
  building: {
    show: true,
    label: "Idea → prototype",
    reveal: "Has an idea. Immediately wonders if she can build it.",
    hint: "Build it",
  },
  // The tiny constellation easter egg beside the section heading.
  leo: {
    show: true,
    reveal: "Leo. Interpret responsibly.",
  },
} as const;
