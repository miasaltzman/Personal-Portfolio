/**
 * CONTACT — email, phone, LinkedIn, résumé, GitHub.
 *
 * Used by the hero quick links, the navigation "Resume" link,
 * the "Let's connect" section and the footer.
 */

type Contact = {
  heading: string;
  openTo: string[];
  phone: { display: string; tel: string };
  email: string;
  linkedin: { url: string; display: string };
  resume: { file: string; display: string };
  github: string;
  showGithub: boolean;
};

export const contact: Contact = {
  // Wrap one word in {braces} to set it in the italic accent.
  heading: "Let’s {connect}.",

  // The "OPEN TO" list in the contact section.
  openTo: [
    "Internships",
    "AI & product projects",
    "Interesting ideas",
    "Meeting people building cool things",
  ],

  email: "miasaltzman.ca@gmail.com",

  phone: {
    display: "310-591-6763",
    // Digits only — used for the tap-to-call link.
    tel: "3105916763",
  },

  /**
   * LINKEDIN
   * Paste your full profile URL between the quotes, e.g.
   *   url: "https://www.linkedin.com/in/your-name",
   * While it is empty, LinkedIn links show quietly as "coming soon".
   */
  linkedin: {
    url: "", // ← TODO: add LinkedIn URL
    display: "Mia Saltzman",
  },

  /**
   * RÉSUMÉ
   * 1. Save your résumé as a PDF.
   * 2. Put it at:  public/resume/mia-saltzman-resume.pdf
   *    (or change `file` below to match your file name).
   * Every Résumé link on the site switches on automatically once the file exists.
   */
  resume: {
    file: "/resume/mia-saltzman-resume.pdf",
    display: "View PDF",
  },

  /**
   * GITHUB — hidden until you turn it on.
   * 1. Paste your profile URL into `github`.
   * 2. Change `showGithub` to true.
   * Nothing about GitHub appears on the site while `showGithub` is false.
   */
  github: "",
  showGithub: false,
};
