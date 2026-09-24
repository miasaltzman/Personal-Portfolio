# Mia Saltzman — Portfolio

Personal portfolio for Mia Saltzman, AI Student at San Diego State University and aspiring AI product manager.

The homepage runs: **Hero → 01 Selected Work → 02 Experience → 03 About → 04 Beyond AI → 05 Let’s Connect**, and each project has its own case study page at `/work/<slug>`.

Built with Next.js, React, TypeScript, Tailwind CSS and Motion.

---

## How to Update This Portfolio

Nearly everything you'd want to change is in the **`content/`** folder. Each file is plain text inside quotes, with comments explaining each part. You shouldn't need to open any design or component files.

```
content/
  profile.ts         ← name, title, headshot, hero intro, "currently building", About
  projects.ts        ← Selected Work + case study pages (MENTR AI, VITA)
  experiments.ts     ← the "Also exploring" list at the end of Selected Work
  experience.ts      ← Experience section
  personalFacts.ts   ← Beyond AI facts
  contact.ts         ← email, phone, LinkedIn, résumé, GitHub, "Open to" list
  site.ts            ← page title, description, navigation
```

**The golden rule:** only change text *between the quotes*. Keep the quotes, commas and brackets where they are.

### 1. Headshot

1. Put your photo in `public/images/`.
2. Either name it **`mia-headshot.jpg`** (replacing the placeholder that's there now), or open `content/profile.ts` and change `headshot:` to your new file name.
3. If the crop cuts off your head or hair, change `headshotPosition` in the same file. `"50% 22%"` means "center horizontally, focus near the top". A smaller second number shows more of the top of the photo.

Every portrait on the site reads from that one setting. Any size or shape of photo works: the frame crops it, and nothing gets stretched.

Want a second photo in the About section? Put it in `public/images/` and set `about.image` in `content/profile.ts` (e.g. `"/images/mia-about.jpg"`). Leave it `""` for none.

### 2. Bio

In `content/profile.ts`:
- `title`: your professional title ("AI Student at San Diego State University"), used in the page title and social previews.
- `roleLine` and `school`: the two lines under your name in the hero.
- `hero.greeting` and `hero.intro`: "Hi, I’m Mia." and the short intro. Keep it to two sentences.
- `status`: the "● Currently building MENTR AI →" link. Set `show: false` to hide it.
- `about.heading`: the large line in About. Put `{braces}` around one word to set it in the blue italic accent.
- `about.paragraphs`: each item in quotes is one paragraph.
- `about.details` and `interests`: the short facts and the "Thinking about" list.

### 3. Projects

In `content/projects.ts`, each project gets its own section on the home page and its own case study page at `/work/<slug>`.
- The **first** project in the list is the big featured project (MENTR AI). Reorder the list to change that.
- `tagline`, `description` and `role` are what shows on the home page.
- Change `status` (e.g. `"In development"`, `"Prototype"`) to update the label everywhere.
- Case study sections left empty (`[]` or `""`) are **hidden automatically**, so you can fill in VITA bit by bit.
- To add screenshots, put images in `public/images/projects/` and list them under `gallery` (there's an example in VITA).
- The sample content in the interactive previews (`mentrPreview`, `vitaPreview`) is at the bottom of the file.

### 4. Experience

In `content/experience.ts`, copy a `{ … }` block to add a role. Add dates in `period`, e.g. `"2025 — Present"`. While a period is empty, the site shows a quiet "Dates TBA".

### 5. Contact information

In `content/contact.ts`, change `email` and `phone` (both `display` and the digits-only `tel`). The `openTo` list is the "Open to" column in the contact section.

### 6. LinkedIn

In `content/contact.ts`, paste your full profile URL:

```ts
linkedin: {
  url: "https://www.linkedin.com/in/your-name",
```

Until then, LinkedIn shows as a quiet "soon" placeholder in the hero and "Link coming soon" in the contact section. Once you add the URL, it becomes a link everywhere.

### 7. Résumé

Save your résumé as a PDF at **`public/resume/mia-saltzman-resume.pdf`**. That's it: the hero Resume button, a "Resume ↗" link in the navigation, the contact row (open + download) and the footer link all turn on by themselves. To use a different file name, change `resume.file` in `content/contact.ts`.

### 8. GitHub

GitHub is hidden right now. To show it, in `content/contact.ts`:

```ts
github: "https://github.com/your-username",
showGithub: true,
```

### 9. Beyond AI facts

In `content/personalFacts.ts`, each fact has:
- `label`: the clickable label, e.g. "Daily ritual". It's the only thing visible until someone opens it.
- `title`, `reveal` and optional `detail`: what appears once it's open.
- `show: false` hides a fact.

Only one fact is open at a time. On phones, facts unfold under their label; on desktop they open in a panel on the right.

The smaller experiments at the end of Selected Work ("Also exploring") live in `content/experiments.ts`. Status can be `"Exploring"`, `"Prototype"`, `"Building"` or `"Archived"`.

### Page title & social preview

`content/site.ts` holds the browser title, the description search engines show, and `url`. Set `url` to your real domain once the site is live so link previews work. The social preview image is generated automatically from your name and title.

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
components/          one folder per section (hero, work, experience, about, beyond, contact)
components/previews  the interactive MENTR AI and VITA product previews
content/             ← all editable text and settings
public/              images, résumé PDF
```

Motion respects the visitor's "reduce motion" setting, and every interaction works by tap, click or keyboard.
