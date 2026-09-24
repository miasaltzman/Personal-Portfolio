/**
 * SITE — page title, description, social sharing, navigation & footer.
 */

export const site = {
  // Used for social previews. Change to your real domain once it's live,
  // e.g. "https://miasaltzman.com".
  url: "https://miasaltzman.vercel.app",
  title: "Mia Saltzman — AI, Product & Emerging Technology",
  description:
    "Personal portfolio of Mia Saltzman, an Artificial Intelligence student at San Diego State University exploring AI, product, and human-centered technology.",
  ogImageAlt: "Mia Saltzman — Building at the intersection of AI, product & people.",

  // Navigation links (the `id` must match a section id on the home page).
  nav: [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "lab", label: "Lab" },
    { id: "beyond", label: "Beyond AI" },
    { id: "contact", label: "Contact" },
  ],

  footer: {
    credit: "Designed & built by Mia Saltzman.",
    aside: "Fueled by matcha + oat milk.",
  },
} as const;
