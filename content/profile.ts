/**
 * PROFILE — who Mia is, in one place.
 *
 * Everything about Mia that appears on the site (name, headshot, bio,
 * hero copy, "currently building" status) is read from this file.
 * Edit the text between the quotes and save — the site updates everywhere.
 */

export const profile = {
  name: "Mia Saltzman",

  /**
   * HEADSHOT
   * --------
   * Every portrait on the site reads from this ONE value.
   *
   * To replace the photo:
   *   1. Put your new image in:  public/images/
   *   2. Either name it  mia-headshot.jpg  (overwriting the old one)
   *      — or — change the path below to match your new file name.
   *   3. Portrait (vertical) photos work best. At least 1200px tall is ideal.
   *
   * If the crop cuts off your hair or face, adjust `headshotPosition`:
   *   "50% 20%" = centered horizontally, focus near the top.
   *   Lower the second number to show more of the top of the photo.
   */
  headshot: "/images/mia-headshot.jpg",
  headshotPosition: "50% 22%",
  headshotAlt:
    "Portrait of Mia Saltzman, Artificial Intelligence student at San Diego State University",

  school: "San Diego State University",
  schoolShort: "SDSU",
  program: "Artificial Intelligence",
  hometown: "Los Angeles",
  basedIn: "San Diego",

  /* ---------- Hero ---------- */
  hero: {
    // The large statement. Wrap one word in {braces} to set it in the italic
    // serif accent — e.g. "…AI, product & {people}."
    statement: "Building at the intersection of AI, product & {people}.",
    supporting:
      "Artificial Intelligence student at San Diego State University exploring how emerging technology becomes products people actually want to use.",
    primaryCta: { label: "View My Work", href: "#work" },
    secondaryCta: { label: "About Me", href: "#about" },
  },

  /**
   * "CURRENTLY BUILDING" STATUS
   * Shown under the hero buttons. Set `show: false` to hide it.
   * `projectSlug` links the panel to that project's case study.
   */
  status: {
    show: true,
    label: "Currently building MENTR AI",
    title: "MENTR AI",
    summary:
      "An AI-powered career and personal development product. It gives students and young professionals personalized direction and one useful next step — so progress feels lightweight, not like homework.",
    projectSlug: "mentr-ai",
  },

  /* ---------- About ---------- */
  about: {
    heading: "I like the part where an idea meets the people it’s for.",
    // Each string is one paragraph. Keep them short — two or three sentences.
    paragraphs: [
      "I grew up in Los Angeles and now study Artificial Intelligence at San Diego State University.",
      "I’m drawn to the space between what people actually need and what technical teams can build — translating a fuzzy problem into something clear enough to prototype, test, and improve.",
      "Most of my learning happens by making things. I experiment with new AI tools, turn half-formed product ideas into prototypes, and try to understand why something works for the people using it — not just whether it runs.",
      "I’m still early, and I like it that way: curious, building, and getting sharper at the product side of AI with every project.",
    ],
    // Short labelled facts shown beside the bio.
    details: [
      { label: "Studying", value: "Artificial Intelligence, SDSU" },
      { label: "From", value: "Los Angeles" },
      { label: "Based in", value: "San Diego" },
    ],
  },

  // Topics listed under "Thinking about" in the About section.
  interests: [
    "AI product management",
    "Emerging AI technology",
    "Product strategy",
    "Understanding user needs",
    "Prototyping",
    "AI-assisted development",
    "Human-centered technology",
  ],
} as const;
