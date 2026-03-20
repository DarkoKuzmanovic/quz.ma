# quz.ma Personal Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal website (blog, TIL, projects, about, uses) with a modern terminal aesthetic using Astro, deployed to Cloudflare Pages.

**Architecture:** Astro v5 static site with three content collections (blog, TIL, projects) and two standalone pages (about, uses). Tailwind CSS v4 (CSS-first config) with Catppuccin Mocha palette. JetBrains Mono font via Fontsource. RSS feed for blog + TIL. Deployed via GitHub → Cloudflare Pages.

**Tech Stack:** Astro v5, MDX, Tailwind CSS v4, TypeScript, @fontsource/jetbrains-mono, @astrojs/rss

**Design doc:** `docs/plans/2026-03-20-personal-website-design.md`

---

## File Structure

```
quz.ma/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro          # Sticky nav with $ prefixes
│   │   ├── Footer.astro          # Copyright, license, source link
│   │   ├── BlogPostCard.astro    # Card for blog listing page
│   │   ├── TilEntry.astro        # Compact date + title row
│   │   ├── ProjectCard.astro     # Card with <details> expandable
│   │   └── TagList.astro         # Reusable tag pills
│   ├── content/
│   │   ├── blog/
│   │   │   └── hello-world.mdx   # Seed post
│   │   ├── til/
│   │   │   └── first-til.md      # Seed entry
│   │   └── projects/
│   │       └── piksi.md          # Seed project
│   ├── content.config.ts         # Collection schemas (Astro v5 location)
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, font, meta, OG tags, header/footer
│   │   └── BlogPostLayout.astro  # Post wrapper: title, date, tags, reading time
│   ├── pages/
│   │   ├── index.astro           # Home: hero + recent posts + recent TILs
│   │   ├── about.astro           # About page
│   │   ├── uses.astro            # Uses page
│   │   ├── projects.astro        # Project cards listing
│   │   ├── blog/
│   │   │   ├── index.astro       # Blog listing
│   │   │   └── [...id].astro     # Dynamic blog post page
│   │   ├── til/
│   │   │   ├── index.astro       # TIL listing
│   │   │   └── [...id].astro     # Dynamic TIL page
│   │   └── rss.xml.ts            # RSS feed endpoint
│   └── styles/
│       └── global.css            # Tailwind v4 CSS-first config + theme
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── README.md
├── LICENSE-CODE
├── LICENSE-CONTENT
├── CHANGELOG.md
└── docs/plans/                   # (already exists)
```

**Note:** No `tailwind.config.mjs` — Tailwind v4 is CSS-first. All theme config lives in `src/styles/global.css`.

---

## Task 1: Scaffold Astro Project & Configure Tooling

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`

- [ ] **Step 1: Initialize Astro project**

```bash
cd ~/source/quz.ma
npm create astro@latest -- . --template minimal --typescript strict --install --no-git
```

- [ ] **Step 2: Install dependencies**

```bash
cd ~/source/quz.ma
npm install @astrojs/mdx @astrojs/rss @astrojs/sitemap
npm install @fontsource/jetbrains-mono
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography
```

**Note:** No `@astrojs/tailwind` — that's deprecated. We use `@tailwindcss/vite` directly.

- [ ] **Step 3: Configure Astro**

Replace `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://quz.ma',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Create global CSS with Tailwind v4 theme**

Create `src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-mono: "JetBrains Mono", monospace;

  --color-ctp-base: #1e1e2e;
  --color-ctp-mantle: #181825;
  --color-ctp-crust: #11111b;
  --color-ctp-text: #cdd6f4;
  --color-ctp-subtext1: #bac2de;
  --color-ctp-subtext0: #a6adc8;
  --color-ctp-overlay2: #9399b2;
  --color-ctp-overlay1: #7f849c;
  --color-ctp-overlay0: #6c7086;
  --color-ctp-surface2: #585b70;
  --color-ctp-surface1: #45475a;
  --color-ctp-surface0: #313244;
  --color-ctp-mauve: #cba6f7;
  --color-ctp-blue: #89b4fa;
  --color-ctp-green: #a6e3a1;
  --color-ctp-peach: #fab387;
  --color-ctp-red: #f38ba8;
  --color-ctp-yellow: #f9e2af;
  --color-ctp-teal: #94e2d5;
  --color-ctp-lavender: #b4befe;
}

@utility prose-terminal {
  --tw-prose-body: var(--color-ctp-text);
  --tw-prose-headings: var(--color-ctp-mauve);
  --tw-prose-lead: var(--color-ctp-subtext1);
  --tw-prose-links: var(--color-ctp-green);
  --tw-prose-bold: var(--color-ctp-text);
  --tw-prose-counters: var(--color-ctp-mauve);
  --tw-prose-bullets: var(--color-ctp-mauve);
  --tw-prose-hr: var(--color-ctp-surface1);
  --tw-prose-quotes: var(--color-ctp-subtext1);
  --tw-prose-quote-borders: var(--color-ctp-surface2);
  --tw-prose-captions: var(--color-ctp-subtext0);
  --tw-prose-code: var(--color-ctp-peach);
  --tw-prose-pre-code: var(--color-ctp-text);
  --tw-prose-pre-bg: var(--color-ctp-mantle);
  --tw-prose-th-borders: var(--color-ctp-surface2);
  --tw-prose-td-borders: var(--color-ctp-surface0);
}

@layer base {
  html {
    font-family: "JetBrains Mono", monospace;
    background-color: var(--color-ctp-base);
    color: var(--color-ctp-text);
  }

  ::selection {
    background-color: var(--color-ctp-surface2);
    color: var(--color-ctp-text);
  }
}

@keyframes blink {
  50% { opacity: 0; }
}
```

- [ ] **Step 5: Add a minimal favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#1e1e2e"/>
  <text x="4" y="24" font-family="monospace" font-size="22" fill="#a6e3a1">$</text>
</svg>
```

- [ ] **Step 6: Verify the build**

```bash
cd ~/source/quz.ma && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 7: Init git and commit**

```bash
cd ~/source/quz.ma
git init
git add -A
git commit -m "chore: scaffold Astro project with Tailwind v4 + Catppuccin Mocha"
```

---

## Task 2: Content Collection Schemas

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/hello-world.mdx` (seed)
- Create: `src/content/til/first-til.md` (seed)
- Create: `src/content/projects/piksi.md` (seed)

- [ ] **Step 1: Define collection schemas**

Create `src/content.config.ts` (note: Astro v5 uses `src/content.config.ts`, not `src/content/config.ts`):

```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const til = defineCollection({
  loader: glob({ base: './src/content/til', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    status: z.enum(['active', 'archived']),
    url: z.string().optional(),
    repo: z.string().optional(),
  }),
});

export const collections = { blog, til, projects };
```

- [ ] **Step 2: Create seed blog post**

Create `src/content/blog/hello-world.mdx`:

```mdx
---
title: "Hello, World"
date: 2026-03-20
description: "First post on the new site."
tags: ["meta"]
---

Welcome to quz.ma. This site is built with Astro and deployed to Cloudflare Pages.

More to come.
```

- [ ] **Step 3: Create seed TIL entry**

Create `src/content/til/first-til.md`:

```markdown
---
title: "Astro content collections are type-safe"
date: 2026-03-20
tags: ["astro"]
---

Astro validates frontmatter against Zod schemas at build time. If you misspell a field or use the wrong type, the build fails with a clear error. No runtime surprises.
```

- [ ] **Step 4: Create seed project entry**

Create `src/content/projects/piksi.md`:

```markdown
---
name: "Piksi"
description: "2-player online Pixies card game"
stack: ["TypeScript", "Fastify", "React", "WebSocket"]
status: "active"
url: "https://piksi.quz.ma"
repo: "https://github.com/quzma/piksi"
---

A real-time multiplayer card game built with a shared game engine. The server is authoritative — all game logic runs on the backend with the frontend receiving state updates over WebSocket.
```

- [ ] **Step 5: Verify build with collections**

```bash
cd ~/source/quz.ma && npm run build
```

Expected: Build succeeds, collections are recognized.

- [ ] **Step 6: Commit**

```bash
cd ~/source/quz.ma
git add src/content.config.ts src/content/
git commit -m "feat: add content collection schemas and seed content"
```

---

## Task 3: Base Layout (Header + Footer)

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro` (use layout for verification)

- [ ] **Step 1: Create Header component**

Create `src/components/Header.astro`:

```astro
---
const navItems = [
  { label: 'blog', href: '/blog' },
  { label: 'til', href: '/til' },
  { label: 'projects', href: '/projects' },
  { label: 'about', href: '/about' },
  { label: 'uses', href: '/uses' },
];

const currentPath = Astro.url.pathname;
---

<header class="sticky top-0 z-50 bg-ctp-base/90 backdrop-blur-sm border-b border-ctp-surface0">
  <nav class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
    <a href="/" class="text-ctp-green font-bold hover:text-ctp-mauve transition-colors">
      quz.ma
    </a>
    <ul class="flex gap-4 text-sm">
      {navItems.map(({ label, href }) => (
        <li>
          <a
            href={href}
            class:list={[
              'transition-colors',
              currentPath.startsWith(href)
                ? 'text-ctp-mauve'
                : 'text-ctp-overlay1 hover:text-ctp-text',
            ]}
          >
            <span class="text-ctp-surface2">$</span> {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>
```

- [ ] **Step 2: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---
const year = new Date().getFullYear();
---

<footer class="border-t border-ctp-surface0 mt-16">
  <div class="max-w-3xl mx-auto px-4 py-6 text-sm text-ctp-overlay0 flex flex-col sm:flex-row justify-between gap-2">
    <span>&copy; {year} quz.ma &middot; Code: MIT &middot; Content: CC BY 4.0</span>
    <a
      href="https://github.com/quzma/quz.ma"
      class="text-ctp-overlay1 hover:text-ctp-green transition-colors"
    >
      source
    </a>
  </div>
</footer>
```

- [ ] **Step 3: Create BaseLayout with OG tags**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Personal website of quzma' } = Astro.props;
const pageTitle = title === 'Home' ? 'quz.ma' : `${title} | quz.ma`;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url.href} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link rel="alternate" type="application/rss+xml" title="quz.ma" href="/rss.xml" />
    <title>{pageTitle}</title>
  </head>
  <body class="bg-ctp-base text-ctp-text min-h-screen flex flex-col font-mono leading-[1.7]">
    <Header />
    <main class="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 4: Wire up index page to verify layout**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Home">
  <p>Home page — under construction.</p>
</BaseLayout>
```

- [ ] **Step 5: Verify dev server**

```bash
cd ~/source/quz.ma && npm run dev
```

Open `http://localhost:4321` — verify header, footer, font, and colors render.

- [ ] **Step 6: Commit**

```bash
cd ~/source/quz.ma
git add src/layouts/ src/components/ src/pages/index.astro
git commit -m "feat: add BaseLayout with Header and Footer"
```

---

## Task 4: TagList Component

**Files:**
- Create: `src/components/TagList.astro`

- [ ] **Step 1: Create TagList component**

Create `src/components/TagList.astro`:

```astro
---
interface Props {
  tags: string[];
}

const { tags } = Astro.props;
---

<ul class="flex flex-wrap gap-2">
  {tags.map((tag) => (
    <li class="text-xs px-2 py-0.5 rounded bg-ctp-surface0 text-ctp-subtext0">
      {tag}
    </li>
  ))}
</ul>
```

- [ ] **Step 2: Commit**

```bash
cd ~/source/quz.ma
git add src/components/TagList.astro
git commit -m "feat: add TagList component"
```

---

## Task 5: Blog Listing + Post Pages

**Files:**
- Create: `src/components/BlogPostCard.astro`
- Create: `src/layouts/BlogPostLayout.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...id].astro`

- [ ] **Step 1: Create BlogPostCard component**

Create `src/components/BlogPostCard.astro`:

```astro
---
import TagList from './TagList.astro';

interface Props {
  title: string;
  date: Date;
  description: string;
  tags: string[];
  id: string;
}

const { title, date, description, tags, id } = Astro.props;
const dateStr = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
---

<article class="py-4 border-b border-ctp-surface0 last:border-0">
  <a href={`/blog/${id}`} class="group">
    <time class="text-xs text-ctp-overlay0">{dateStr}</time>
    <h3 class="text-lg text-ctp-mauve group-hover:text-ctp-lavender transition-colors mt-1">
      {title}
    </h3>
    <p class="text-sm text-ctp-subtext0 mt-1">{description}</p>
  </a>
  <div class="mt-2">
    <TagList tags={tags} />
  </div>
</article>
```

- [ ] **Step 2: Create BlogPostLayout**

Create `src/layouts/BlogPostLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import TagList from '../components/TagList.astro';

interface Props {
  title: string;
  date: Date;
  description: string;
  tags: string[];
}

const { title, date, description, tags } = Astro.props;
const dateStr = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

// Rough reading time: words / 200 wpm
const content = await Astro.slots.render('default');
const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
const readingTime = Math.max(1, Math.ceil(words / 200));
---

<BaseLayout title={title} description={description}>
  <article>
    <header class="mb-8">
      <time class="text-sm text-ctp-overlay0">{dateStr}</time>
      <span class="text-sm text-ctp-overlay0"> &middot; {readingTime} min read</span>
      <h1 class="text-2xl font-bold text-ctp-mauve mt-2">{title}</h1>
      <div class="mt-3">
        <TagList tags={tags} />
      </div>
    </header>
    <div class="prose prose-terminal max-w-none">
      <slot />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: Create blog listing page**

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import BlogPostCard from '../../components/BlogPostCard.astro';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title="Blog">
  <h1 class="text-2xl font-bold text-ctp-mauve mb-6">
    <span class="text-ctp-green">$</span> ls ~/blog
  </h1>
  {posts.length === 0 ? (
    <p class="text-ctp-overlay0">No posts yet.</p>
  ) : (
    <div>
      {posts.map((post) => (
        <BlogPostCard
          title={post.data.title}
          date={post.data.date}
          description={post.data.description}
          tags={post.data.tags}
          id={post.id}
        />
      ))}
    </div>
  )}
</BaseLayout>
```

- [ ] **Step 4: Create dynamic blog post page**

Create `src/pages/blog/[...id].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BlogPostLayout
  title={post.data.title}
  date={post.data.date}
  description={post.data.description}
  tags={post.data.tags}
>
  <Content />
</BlogPostLayout>
```

- [ ] **Step 5: Verify build**

```bash
cd ~/source/quz.ma && npm run build
```

Expected: Build succeeds. `/blog` and `/blog/hello-world` pages generated.

- [ ] **Step 6: Commit**

```bash
cd ~/source/quz.ma
git add src/components/BlogPostCard.astro src/layouts/BlogPostLayout.astro src/pages/blog/
git commit -m "feat: add blog listing and post pages"
```

---

## Task 6: TIL Listing + Entry Pages

**Files:**
- Create: `src/components/TilEntry.astro`
- Create: `src/pages/til/index.astro`
- Create: `src/pages/til/[...id].astro`

- [ ] **Step 1: Create TilEntry component**

Create `src/components/TilEntry.astro`:

```astro
---
interface Props {
  title: string;
  date: Date;
  id: string;
}

const { title, date, id } = Astro.props;
const dateStr = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
---

<a href={`/til/${id}`} class="flex gap-4 py-2 group">
  <time class="text-xs text-ctp-overlay0 shrink-0 pt-0.5 tabular-nums">{dateStr}</time>
  <span class="text-sm text-ctp-text group-hover:text-ctp-mauve transition-colors">{title}</span>
</a>
```

- [ ] **Step 2: Create TIL listing page**

Create `src/pages/til/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import TilEntry from '../../components/TilEntry.astro';

const entries = (await getCollection('til'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<BaseLayout title="TIL">
  <h1 class="text-2xl font-bold text-ctp-mauve mb-6">
    <span class="text-ctp-green">$</span> cat ~/til
  </h1>
  {entries.length === 0 ? (
    <p class="text-ctp-overlay0">Nothing yet.</p>
  ) : (
    <div class="divide-y divide-ctp-surface0">
      {entries.map((entry) => (
        <TilEntry title={entry.data.title} date={entry.data.date} id={entry.id} />
      ))}
    </div>
  )}
</BaseLayout>
```

- [ ] **Step 3: Create dynamic TIL page**

Create `src/pages/til/[...id].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import TagList from '../../components/TagList.astro';

export async function getStaticPaths() {
  const entries = await getCollection('til');
  return entries.map((entry) => ({
    params: { id: entry.id },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
const dateStr = entry.data.date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
---

<BaseLayout title={entry.data.title}>
  <article>
    <header class="mb-6">
      <time class="text-sm text-ctp-overlay0">{dateStr}</time>
      <h1 class="text-xl font-bold text-ctp-mauve mt-2">{entry.data.title}</h1>
      {entry.data.tags.length > 0 && (
        <div class="mt-3">
          <TagList tags={entry.data.tags} />
        </div>
      )}
    </header>
    <div class="prose prose-terminal max-w-none">
      <Content />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 4: Verify build**

```bash
cd ~/source/quz.ma && npm run build
```

Expected: `/til` and `/til/first-til` pages generated.

- [ ] **Step 5: Commit**

```bash
cd ~/source/quz.ma
git add src/components/TilEntry.astro src/pages/til/
git commit -m "feat: add TIL listing and entry pages"
```

---

## Task 7: Projects Page

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/pages/projects.astro`

- [ ] **Step 1: Create ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
import TagList from './TagList.astro';

interface Props {
  name: string;
  description: string;
  stack: string[];
  status: 'active' | 'archived';
  url?: string;
  repo?: string;
  hasBody: boolean;
}

const { name, description, stack, status, url, repo, hasBody } = Astro.props;
---

<div class="border border-ctp-surface0 rounded-lg p-4">
  <div class="flex items-start justify-between gap-2">
    <h3 class="text-lg font-bold text-ctp-mauve">{name}</h3>
    <span
      class:list={[
        'text-xs px-2 py-0.5 rounded shrink-0',
        status === 'active'
          ? 'bg-ctp-green/10 text-ctp-green'
          : 'bg-ctp-surface0 text-ctp-overlay0',
      ]}
    >
      {status}
    </span>
  </div>
  <p class="text-sm text-ctp-subtext0 mt-2">{description}</p>
  <div class="mt-3">
    <TagList tags={stack} />
  </div>
  <div class="flex gap-3 mt-3 text-sm">
    {url && (
      <a href={url} class="text-ctp-green hover:text-ctp-teal transition-colors">
        live &rarr;
      </a>
    )}
    {repo && (
      <a href={repo} class="text-ctp-blue hover:text-ctp-lavender transition-colors">
        source &rarr;
      </a>
    )}
  </div>
  {hasBody && (
    <details class="mt-3 text-sm">
      <summary class="text-ctp-overlay1 cursor-pointer hover:text-ctp-text transition-colors">
        more info
      </summary>
      <div class="prose prose-terminal prose-sm max-w-none mt-2">
        <slot />
      </div>
    </details>
  )}
</div>
```

- [ ] **Step 2: Create projects listing page**

Create `src/pages/projects.astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';

const projects = await getCollection('projects');
const active = projects.filter((p) => p.data.status === 'active');
const archived = projects.filter((p) => p.data.status === 'archived');
---

<BaseLayout title="Projects">
  <h1 class="text-2xl font-bold text-ctp-mauve mb-6">
    <span class="text-ctp-green">$</span> ls ~/projects
  </h1>
  <div class="grid gap-4">
    {active.map(async (project) => {
      const { Content } = await render(project);
      const hasBody = project.body && project.body.trim().length > 0;
      return (
        <ProjectCard
          name={project.data.name}
          description={project.data.description}
          stack={project.data.stack}
          status={project.data.status}
          url={project.data.url}
          repo={project.data.repo}
          hasBody={hasBody}
        >
          <Content />
        </ProjectCard>
      );
    })}
  </div>
  {archived.length > 0 && (
    <>
      <h2 class="text-lg font-bold text-ctp-overlay1 mt-10 mb-4">Archived</h2>
      <div class="grid gap-4">
        {archived.map(async (project) => {
          const { Content } = await render(project);
          const hasBody = project.body && project.body.trim().length > 0;
          return (
            <ProjectCard
              name={project.data.name}
              description={project.data.description}
              stack={project.data.stack}
              status={project.data.status}
              url={project.data.url}
              repo={project.data.repo}
              hasBody={hasBody}
            >
              <Content />
            </ProjectCard>
          );
        })}
      </div>
    </>
  )}
</BaseLayout>
```

- [ ] **Step 3: Verify build**

```bash
cd ~/source/quz.ma && npm run build
```

Expected: `/projects` page generated with Piksi card.

- [ ] **Step 4: Commit**

```bash
cd ~/source/quz.ma
git add src/components/ProjectCard.astro src/pages/projects.astro
git commit -m "feat: add projects page with expandable cards"
```

---

## Task 8: Home Page

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Build home page with hero + recent content**

Replace `src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import BlogPostCard from '../components/BlogPostCard.astro';
import TilEntry from '../components/TilEntry.astro';

const recentPosts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

const recentTils = (await getCollection('til'))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 5);
---

<BaseLayout title="Home">
  <section class="mb-12">
    <h1 class="text-2xl font-bold text-ctp-green">
      <span class="inline-block" style="animation: blink 1s step-end infinite;">_</span> quz.ma
    </h1>
    <p class="text-ctp-subtext0 mt-2">Software engineer. Building things on the web.</p>
  </section>

  {recentPosts.length > 0 && (
    <section class="mb-12">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-ctp-mauve">
          <span class="text-ctp-green">$</span> recent posts
        </h2>
        <a href="/blog" class="text-sm text-ctp-overlay1 hover:text-ctp-green transition-colors">
          all &rarr;
        </a>
      </div>
      {recentPosts.map((post) => (
        <BlogPostCard
          title={post.data.title}
          date={post.data.date}
          description={post.data.description}
          tags={post.data.tags}
          id={post.id}
        />
      ))}
    </section>
  )}

  {recentTils.length > 0 && (
    <section>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-ctp-mauve">
          <span class="text-ctp-green">$</span> recent til
        </h2>
        <a href="/til" class="text-sm text-ctp-overlay1 hover:text-ctp-green transition-colors">
          all &rarr;
        </a>
      </div>
      <div class="divide-y divide-ctp-surface0">
        {recentTils.map((entry) => (
          <TilEntry title={entry.data.title} date={entry.data.date} id={entry.id} />
        ))}
      </div>
    </section>
  )}
</BaseLayout>
```

- [ ] **Step 2: Verify build and dev**

```bash
cd ~/source/quz.ma && npm run build
```

- [ ] **Step 3: Commit**

```bash
cd ~/source/quz.ma
git add src/pages/index.astro
git commit -m "feat: add home page with hero and recent content"
```

---

## Task 9: About & Uses Pages

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/uses.astro`

- [ ] **Step 1: Create About page**

Create `src/pages/about.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="About">
  <h1 class="text-2xl font-bold text-ctp-mauve mb-6">
    <span class="text-ctp-green">$</span> whoami
  </h1>
  <div class="prose prose-terminal max-w-none">
    <p>TODO: Write about yourself here.</p>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create Uses page**

Create `src/pages/uses.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Uses">
  <h1 class="text-2xl font-bold text-ctp-mauve mb-6">
    <span class="text-ctp-green">$</span> cat ~/.uses
  </h1>
  <div class="prose prose-terminal max-w-none">
    <h2>Editor</h2>
    <ul>
      <li>TODO</li>
    </ul>

    <h2>Terminal</h2>
    <ul>
      <li>TODO</li>
    </ul>

    <h2>Hardware</h2>
    <ul>
      <li>TODO</li>
    </ul>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Verify build**

```bash
cd ~/source/quz.ma && npm run build
```

- [ ] **Step 4: Commit**

```bash
cd ~/source/quz.ma
git add src/pages/about.astro src/pages/uses.astro
git commit -m "feat: add About and Uses pages"
```

---

## Task 10: RSS Feed

**Files:**
- Create: `src/pages/rss.xml.ts`

- [ ] **Step 1: Create RSS endpoint**

Create `src/pages/rss.xml.ts`:

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = (await getCollection('blog', ({ data }) => !data.draft))
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    }));

  const til = (await getCollection('til'))
    .map((entry) => ({
      title: `TIL: ${entry.data.title}`,
      pubDate: entry.data.date,
      description: entry.data.title,
      link: `/til/${entry.id}/`,
    }));

  const items = [...blog, ...til].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: 'quz.ma',
    description: 'Blog and TIL from quz.ma',
    site: context.site!,
    items,
  });
}
```

- [ ] **Step 2: Verify build**

```bash
cd ~/source/quz.ma && npm run build
```

Expected: `dist/rss.xml` is generated with entries.

- [ ] **Step 3: Commit**

```bash
cd ~/source/quz.ma
git add src/pages/rss.xml.ts
git commit -m "feat: add RSS feed for blog and TIL"
```

---

## Task 11: Project Files (README, Licenses, Changelog)

**Files:**
- Create: `README.md`
- Create: `LICENSE-CODE`
- Create: `LICENSE-CONTENT`
- Create: `CHANGELOG.md`

- [ ] **Step 1: Create README**

Create `README.md`:

~~~markdown
# quz.ma

Personal website. Blog, TIL, and projects.

Built with [Astro](https://astro.build), styled with [Catppuccin Mocha](https://catppuccin.com), deployed to [Cloudflare Pages](https://pages.cloudflare.com).

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
```

Static output goes to `dist/`.

## Writing Content

### Blog Post

Create `src/content/blog/your-slug.mdx`:

```yaml
---
title: "Your Title"
date: 2026-01-01
description: "Short description."
tags: ["tag1", "tag2"]
draft: false
---
```

### TIL Entry

Create `src/content/til/your-slug.md`:

```yaml
---
title: "What you learned"
date: 2026-01-01
tags: ["topic"]
---
```

### Project

Create `src/content/projects/your-slug.md`:

```yaml
---
name: "Project Name"
description: "One-liner"
stack: ["Tech1", "Tech2"]
status: "active"
url: "https://example.com"
repo: "https://github.com/you/repo"
---

Optional longer description shown in expandable section.
```

## Deployment

Push to `main` → Cloudflare Pages auto-deploys.

## License

- Code: [MIT](LICENSE-CODE)
- Content: [CC BY 4.0](LICENSE-CONTENT)
~~~

- [ ] **Step 2: Create MIT license for code**

Create `LICENSE-CODE`:

```
MIT License

Copyright (c) 2026 quzma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: Create CC BY 4.0 license for content**

Create `LICENSE-CONTENT`:

```
Creative Commons Attribution 4.0 International License (CC BY 4.0)

Copyright (c) 2026 quzma

You are free to:
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material for any purpose,
  even commercially

Under the following terms:
- Attribution — You must give appropriate credit, provide a link to the
  license, and indicate if changes were made.

Full license text: https://creativecommons.org/licenses/by/4.0/legalcode
```

- [ ] **Step 4: Create Changelog**

Create `CHANGELOG.md`:

```markdown
# Changelog

## 2026-03-20

- Initial release: blog, TIL, projects, about, uses pages
- Catppuccin Mocha theme with JetBrains Mono
- RSS feed
- Deployed to Cloudflare Pages
```

- [ ] **Step 5: Commit**

```bash
cd ~/source/quz.ma
git add README.md LICENSE-CODE LICENSE-CONTENT CHANGELOG.md
git commit -m "docs: add README, licenses, and changelog"
```

---

## Task 12: Final Verification & GitHub Setup

- [ ] **Step 1: Full build verification**

```bash
cd ~/source/quz.ma && npm run build
```

Verify all pages are generated in `dist/`:
```bash
find dist -name "*.html" | sort
```

Expected pages: `index.html`, `blog/index.html`, `blog/hello-world/index.html`, `til/index.html`, `til/first-til/index.html`, `projects/index.html`, `about/index.html`, `uses/index.html`

- [ ] **Step 2: Visual check with dev server**

```bash
cd ~/source/quz.ma && npm run dev
```

Walk through every page and verify layout, colors, fonts, links.

- [ ] **Step 3: Create GitHub repo and push**

```bash
cd ~/source/quz.ma
gh repo create quz.ma --public --source=. --push
```

- [ ] **Step 4: Connect Cloudflare Pages**

Manual step: Go to Cloudflare Dashboard → Pages → Create Project → Connect GitHub → Select `quz.ma` repo.
- Build command: `npm run build`
- Build output directory: `dist`
- Add custom domain: `quz.ma`
