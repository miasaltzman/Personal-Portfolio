/**
 * CONTACT — phone, email, LinkedIn, résumé, GitHub.
 *
 * The "Let's Connect" section is built entirely from this file.
 */

type Contact = {
  eyebrow: string;
  heading: string;
  line: string;
  phone: { display: string; tel: string };
  email: string;
  linkedin: { url: string; display: string };
  resume: { file: string; display: string };
  github: string;
  showGithub: boolean;
};

export const contact: Contact = {
  eyebrow: "Get in touch",
  heading: "Let’s Connect",
  // Keep this line exactly as written unless you want to change the message.
  line: "Open to projects, ideas, collaborations, and thoughtful conversations.",

  phone: {
    display: "310-591-6763",
    // Digits only — used for the tap-to-call link.
    tel: "3105916763",
  },

  email: "miasaltzman.ca@gmail.com",

  /**
   * LINKEDIN
   * Paste your full profile URL between the quotes, e.g.
   *   url: "https://www.linkedin.com/in/your-name",
   * While it is empty the row shows quietly as "Link coming soon".
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
   * The Résumé row switches on automatically once the file exists.
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
