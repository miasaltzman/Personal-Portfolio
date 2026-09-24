/**
 * SITE — page title, description, social sharing, navigation & footer.
 */

export const site = {
  // Used for social previews. Change to your real domain once it's live,
  // e.g. "https://miasaltzman.com".
  url: "https://miasaltzman.vercel.app",
  title: "Mia Saltzman — AI Student at San Diego State University",
  description:
    "Portfolio of Mia Saltzman, an AI student at San Diego State University interested in AI product management and building products people actually want to use.",
  ogImageAlt: "Mia Saltzman — AI Student · Aspiring AI Product Manager",

  // Navigation links (the `id` must match a section id on the home page).
  // A "Resume ↗" link is added automatically once your résumé PDF exists.
  nav: [
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "about", label: "About" },
    { id: "beyond", label: "Beyond AI" },
    { id: "contact", label: "Contact" },
  ],
};
