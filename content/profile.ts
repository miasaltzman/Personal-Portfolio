/**
 * PROFILE — who Mia is, in one place.
 *
 * Name, title, headshot, hero intro, "currently building" status and the
 * About section all read from this file. Edit the text between the quotes
 * and save — the site updates everywhere.
 */

export const profile = {
  name: "Mia Saltzman",

  // Your professional title. Used in the page title, social previews & About.
  title: "AI Student at San Diego State University",

  // The two short lines under your name in the hero.
  roleLine: "AI Student · Aspiring AI Product Manager",
  school: "San Diego State University",
  schoolShort: "SDSU",

  hometown: "Los Angeles",
  basedIn: "San Diego",
  location: "San Diego, CA",

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
   *      Any size works — the frame crops it; nothing gets stretched.
   *
   * If the crop cuts off your hair or face, adjust `headshotPosition`:
   *   "50% 20%" = centered horizontally, focus near the top.
   *   Lower the second number to show more of the top of the photo.
   */
  headshot: "/images/mia-headshot.jpg",
  headshotPosition: "50% 22%",
  headshotAlt: "Portrait of Mia Saltzman, AI student at San Diego State University",

  /* ---------- Hero ---------- */
  hero: {
    greeting: "Hi, I’m Mia.",
    // Keep this short — two sentences is plenty.
    intro:
      "I’m an AI student interested in how technology becomes products people actually want to use — especially AI product management, and bridging user needs, business strategy, and technical teams.",
  },

  /**
   * "CURRENTLY BUILDING" STATUS
   * The small line in the hero. Links to that project's case study.
   * Set `show: false` to hide it.
   */
  status: {
    show: true,
    label: "Currently building MENTR AI",
    projectSlug: "mentr-ai",
  },

  /* ---------- About ---------- */
  about: {
    // Wrap one word in {braces} to set it in the italic accent.
    heading: "I’m most interested in the space between what people {need} and what gets built.",
    // Each string is one paragraph. Keep them short.
    paragraphs: [
      "I study AI, but the part I keep coming back to isn’t the model — it’s the product around it. What problem is it actually solving? Who is it for? Would they notice if it disappeared?",
      "That’s what draws me to AI product management: working between users, business strategy, and technical teams, and helping everyone agree on what’s worth building.",
      "I learn best by making things. I try new AI tools as they come out, turn half-formed ideas into prototypes, and pay attention to where people get confused — that’s usually where the interesting problems are.",
      "I grew up in Los Angeles and I’m based in San Diego now. I’m early in my career, which mostly means I’m curious about everything and building as much as I can.",
    ],
    details: [
      { label: "Studying", value: "Artificial Intelligence, SDSU" },
      { label: "From", value: "Los Angeles" },
      { label: "Based in", value: "San Diego" },
    ],
    /**
     * OPTIONAL second photo for the About section.
     * Leave "" for none, or add e.g. "/images/mia-about.jpg".
     */
    image: "",
    imageAlt: "Mia Saltzman",
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
};
