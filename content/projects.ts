/**
 * PROJECTS — Selected Work + case study pages.
 *
 * Each project below becomes:
 *   • a feature in the "Selected Work" section on the home page
 *   • its own case study page at  /work/<slug>
 *
 * HOW TO EDIT
 * - Change any text between quotes.
 * - Leave a case study section empty ("" or []) and it is hidden
 *   automatically — no half-finished headings on the live site.
 * - `status` is the small label shown on the project (e.g. "In development").
 * - To add screenshots, put images in public/images/projects/ and list them
 *   in `gallery` (see the commented example in VITA).
 *
 * Please keep everything factual — no invented users, metrics, or results.
 */

export type Block = {
  text?: string[]; // paragraphs
  points?: string[]; // bullet points
};

export type Decision = { title: string; detail: string };

export type GalleryImage = { src: string; alt: string; caption?: string };

export type Project = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  status: string;
  role: string;
  tools: string[];
  /** Which interactive preview to show. Add new previews in components/previews. */
  preview: "mentr" | "vita";
  /** Short versions shown on the home page. */
  summary: { problem: string; idea: string };
  /** Optional note shown at the top of the case study (e.g. "Write-up in progress"). */
  caseStudyNote?: string;
  gallery?: GalleryImage[];
  caseStudy: {
    problem: Block;
    whyICared: Block;
    role: Block;
    approach: Block;
    decisions: Decision[];
    technical: Block;
    challenges: Block;
    learned: Block;
    next: Block;
  };
};

export const workIntro = {
  heading: "Selected Work",
  subtitle:
    "Products I’m building — and the thinking behind the decisions, not just the screens.",
};

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  /* MENTR AI                                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "mentr-ai",
    name: "MENTR AI",
    category: "AI career & personal development",
    tagline: "Personalized direction for people who feel behind — one useful next step at a time.",
    status: "In development",
    role: "Creator — product direction, experience design & prototyping",
    // TODO(Mia): update with the exact tools you're using.
    tools: ["AI-assisted development", "LLM prompting", "Product design"],
    preview: "mentr",
    summary: {
      problem:
        "Students and young professionals often feel lost, behind, or overwhelmed — unsure which skills matter or what to do next.",
      idea:
        "Give people personalized direction and one useful next action at a time. Continuous progress — about 1% better every day.",
    },
    caseStudy: {
      problem: {
        text: [
          "A lot of students and young professionals feel behind. There’s no shortage of advice — the problem is knowing which of it applies to you, which skills actually matter, and what to do next.",
        ],
        points: [
          "Unsure which career paths fit",
          "Unsure which skills are worth learning",
          "Overwhelmed by generic, one-size-fits-all advice",
          "No clear next step, so nothing happens",
        ],
      },
      whyICared: {
        text: [
          "I kept seeing people around me — smart, motivated people — feel lost about what to do next. Not because they lacked options, but because they had too many and no way to sort them.",
          "I wanted to build something that meets people where they are and helps them move, even a little, every day.",
        ],
      },
      role: {
        text: [
          "I’m building MENTR AI: shaping the product direction, deciding what the experience should (and shouldn’t) ask of people, and prototyping how it works.",
        ],
      },
      approach: {
        text: [
          "Start from the feeling, not the feature list. Someone opening MENTR AI is probably already overwhelmed — so the product’s job is to reduce decisions, not add them.",
        ],
        points: [
          "Explore career paths and understand what roles actually involve",
          "Surface the skills that matter for a direction",
          "Suggest one concrete next move and a resource to go with it",
          "Make small, continuous progress visible",
        ],
      },
      decisions: [
        {
          title: "Actions, not assignments",
          detail:
            "No essays, worksheets, or long reflections. If it feels like homework, people stop opening it. Every recommendation should end in something you can actually do.",
        },
        {
          title: "One next move, not a 40-step roadmap",
          detail:
            "A full plan can make someone feel further behind. A single, well-chosen next step is easier to start — and starting is the hard part.",
        },
        {
          title: "Personal, but lightweight",
          detail:
            "Personalization should come from a few meaningful inputs, not a long intake form. Useful quickly beats thorough eventually.",
        },
        {
          title: "Progress over perfection",
          detail:
            "The goal is roughly 1% better every day. The product should make momentum feel achievable, not measure people against an ideal.",
        },
      ],
      technical: {
        text: [
          "Rather than an open-ended chat, the AI’s output maps to a consistent structure — current focus, next move, relevant skill, resource, potential role. Structure keeps the interface scannable and keeps recommendations concrete.",
          "The preview on this page shows that structure. It’s a portfolio demo, not the live product — no AI runs here.",
        ],
      },
      challenges: {
        points: [
          "Making recommendations feel specific to one person instead of generic",
          "Personalizing without asking for a lot of upfront input",
          "Staying supportive and motivating without becoming another to-do list",
        ],
      },
      learned: {
        // TODO(Mia): replace with your own takeaways as the project evolves.
        points: [
          "The most important product decisions are often about what to leave out.",
          "Designing what an AI response looks like matters as much as what it says.",
        ],
      },
      next: {
        points: [
          "Put the core loop in front of real students and listen",
          "Refine how recommendations adapt as someone makes progress",
          "Keep the experience lightweight as features are added",
        ],
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* VITA                                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "vita",
    name: "VITA",
    category: "AI & news",
    tagline: "An AI-oriented news product exploring how staying informed could feel more personal and relevant.",
    // TODO(Mia): set the current status, e.g. "Prototype" or "In development".
    status: "",
    // TODO(Mia): describe your role on VITA.
    role: "",
    // TODO(Mia): list the tools you used.
    tools: [],
    preview: "vita",
    summary: {
      // TODO(Mia): replace with VITA's real problem statement.
      problem: "There’s more news than anyone can follow — and most of it isn’t organized around what matters to you.",
      // TODO(Mia): replace with VITA's real core idea.
      idea: "Use AI to organize news around relevance: a personal feed, clear categories, and alerts only when they’re worth it.",
    },
    caseStudyNote: "Full case study in progress — more detail coming soon.",
    // Example screenshot entry (uncomment and edit once you have images):
    // gallery: [
    //   { src: "/images/projects/vita-feed.png", alt: "VITA feed screen", caption: "The personalized feed" },
    // ],
    gallery: [],
    caseStudy: {
      // TODO(Mia): fill these in. Empty sections stay hidden on the site.
      problem: { text: [] },
      whyICared: { text: [] },
      role: { text: [] },
      approach: { text: [] },
      decisions: [],
      technical: { text: [] },
      challenges: { points: [] },
      learned: { points: [] },
      next: { points: [] },
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* ==================================================================== */
/* INTERACTIVE PREVIEW CONTENT                                          */
/* Sample data for the portfolio demos. These are illustrations of the  */
/* product concepts — not real users, stories, or outputs.              */
/* ==================================================================== */

export const mentrPreview = {
  greeting: "Here’s your next 1%.",
  paths: [
    {
      id: "ai-pm",
      label: "AI Product Management",
      focus: "Understanding how AI features get scoped and shipped",
      nextMove: "Pick an AI feature you use every week. Write the problem it solves in one sentence.",
      skill: "Writing clear problem statements",
      resource: "Guide · Writing a one-page product spec",
      role: "Associate Product Manager, AI",
    },
    {
      id: "ux-research",
      label: "UX Research",
      focus: "Hearing what people mean, not just what they say",
      nextMove: "Ask a friend about an app they stopped using. Note the exact moment they gave up.",
      skill: "Asking open-ended questions",
      resource: "Guide · Running your first user interview",
      role: "UX Researcher",
    },
    {
      id: "data",
      label: "Data Analytics",
      focus: "Turning raw numbers into a decision",
      nextMove: "Find a public dataset about something you care about and answer one question with it.",
      skill: "SQL fundamentals",
      resource: "Practice set · Beginner SQL queries",
      role: "Product Analyst",
    },
    {
      id: "swe",
      label: "Software Engineering",
      focus: "Shipping something small, end to end",
      nextMove: "Build a one-page tool that fixes a tiny annoyance in your week.",
      skill: "Version control with Git",
      resource: "Tutorial · Deploying your first web app",
      role: "Software Engineer",
    },
  ],
};

export const vitaPreview = {
  categories: ["For you", "AI", "Tech", "Business", "Science"],
  stories: [
    {
      category: "AI",
      headline: "What smaller, faster AI models could mean for everyday apps",
      read: "4 min",
      why: "You follow AI",
    },
    {
      category: "Tech",
      headline: "Why more apps are moving features on-device",
      read: "3 min",
      why: "Related to stories you saved",
    },
    {
      category: "AI",
      headline: "A plain-language guide to this week’s AI releases",
      read: "5 min",
      why: "Popular in AI",
    },
    {
      category: "Business",
      headline: "How startups are thinking about pricing AI features",
      read: "4 min",
      why: "You follow Business",
    },
    {
      category: "Science",
      headline: "Researchers test AI tools for earlier weather forecasts",
      read: "3 min",
      why: "New in Science",
    },
  ],
  notification: {
    app: "VITA",
    title: "Your morning brief",
    body: "3 stories worth your time today — about 10 minutes.",
  },
};
