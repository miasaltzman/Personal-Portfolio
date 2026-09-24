# Mia Saltzman — Portfolio

Personal portfolio for Mia Saltzman, Artificial Intelligence student at San Diego State University.
**AI × Product × People.**

Built with Next.js, React, TypeScript, Tailwind CSS and Motion.

---

## How to Update This Portfolio

Nearly everything you'd want to change is in the **`content/`** folder. Each file is plain text inside quotes, with comments explaining each part. You shouldn't need to open any design or component files.

```
content/
  profile.ts         ← your name, headshot, hero text, bio, "currently building"
  projects.ts        ← Selected Work + case study pages (MENTR AI, VITA)
  experience.ts      ← Experience section
  experiments.ts     ← Lab section
  personalFacts.ts   ← Beyond AI moments
  contact.ts         ← phone, email, LinkedIn, résumé, GitHub
  site.ts            ← page title, description, nav, footer
```

**The golden rule:** only change text *between the quotes*. Keep the quotes, commas and brackets where they are.

### 1. Headshot

1. Put your photo in `public/images/`.
2. Either name it **`mia-headshot.jpg`** (replacing the placeholder that's there now), or open `content/profile.ts` and change `headshot:` to your new file name.
3. If the crop cuts off your head or hair, change `headshotPosition` in the same file. `"50% 22%"` means "center horizontally, focus near the top". A smaller second number shows more of the top of the photo.

Every portrait on the site reads from that one setting.

### 2. Bio

In `content/profile.ts`:
- `hero`: the big statement and the text under it. Put `{braces}` around one word to set it in the blue italic accent.
- `about.paragraphs`: each item in quotes is one paragraph.
- `about.details` and `interests`: the short facts and the "Thinking about" list.
- `status`: the "● Currently building…" line under the hero buttons. Set `show: false` to hide it.

### 3. Projects

In `content/projects.ts`, each project gets its own section on the home page and its own case study page at `/work/<slug>`.
- Change `status` (e.g. `"In development"`, `"Prototype"`) to update the label everywhere.
- Case study sections left empty (`[]` or `""`) are **hidden automatically**, so you can fill in VITA bit by bit.
- To add screenshots, put images in `public/images/projects/` and list them under `gallery` (there's an example in VITA).
- The sample content in the interactive previews (`mentrPreview`, `vitaPreview`) is at the bottom of the file.

### 4. Experience

In `content/experience.ts`, copy a `{ … }` block to add a role. `period` is optional (leave it `""` to hide it).

### 5. Contact information

In `content/contact.ts`, change `phone` (both `display` and the digits-only `tel`) and `email`.

### 6. LinkedIn

In `content/contact.ts`, paste your full profile URL:

```ts
linkedin: {
  url: "https://www.linkedin.com/in/your-name",
```

Until then, the row shows quietly as "Link coming soon".

### 7. Résumé

Save your résumé as a PDF at **`public/resume/mia-saltzman-resume.pdf`**. That's it: the Résumé row turns on by itself (open in new tab + download). To use a different file name, change `resume.file` in `content/contact.ts`.

### 8. GitHub

GitHub is hidden right now. To show it, in `content/contact.ts`:

```ts
github: "https://github.com/your-username",
showGithub: true,
```

### 9. Beyond AI facts

In `content/personalFacts.ts`, change the `label` (always visible) or `reveal` (shown after a tap) for each moment. Set `show: false` to hide one. The Lab entries are in `content/experiments.ts`. Status can be `"Exploring"`, `"Prototype"`, `"Building"` or `"Archived"`.

### Page title & social preview

`content/site.ts` holds the browser title, the description search engines show, and `url`. Set `url` to your real domain once the site is live so link previews work. The social preview image is generated automatically from your name and hero statement.

---

## Preview changes locally

You need [Node.js](https://nodejs.org) (version 20 or newer).

```bash
npm install      # first time only
npm run dev      # start the preview
```

Open **http://localhost:3000**. The page refreshes by itself every time you save a file. Press `Ctrl + C` in the terminal to stop.

Before publishing, you can check that everything builds:

```bash
npm run build
```

If there's a typo (a missing quote or comma), this command tells you the file and line.

## Publishing changes

The easiest host is **[Vercel](https://vercel.com)** (free for personal sites):

1. Sign in to Vercel with GitHub and click **Add New → Project**.
2. Pick this repository. Vercel detects Next.js, so keep the defaults and click **Deploy**.
3. After that, **every change you push to the main branch is published automatically** within a minute or two. Changes on other branches get their own preview link.

So the everyday workflow is: edit a file in `content/` → preview with `npm run dev` → commit and push → the site updates.

---

## Project structure (for reference)

```
app/                 pages: home (page.tsx), case studies (work/[slug]), metadata
components/          one folder per section (hero, work, about, experience, lab, beyond, contact)
components/previews  the interactive MENTR AI and VITA product previews
content/             ← all editable text and settings
public/              images, résumé PDF
```

Motion respects the visitor's "reduce motion" setting, and every interaction works by tap, click or keyboard.
