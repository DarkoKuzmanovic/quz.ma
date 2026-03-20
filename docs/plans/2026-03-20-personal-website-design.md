# quz.ma — Personal Website Design

**Date:** 2026-03-20
**Status:** Approved

## Overview

Personal website with a modern terminal aesthetic, built with Astro and deployed to Cloudflare Pages.

## Content Sections

- **Blog** — long-form posts in MDX/MD, with tags and dates
- **TIL** — short "Today I Learned" entries, quick snippets
- **Projects** — card list with metadata and optional expandable description
- **About** — standalone page
- **Uses** — dev setup, tools, hardware

## Tech Stack

- Astro with MDX support
- Tailwind CSS (Catppuccin Mocha palette)
- TypeScript
- JetBrains Mono via Fontsource
- Content collections for blog, TIL, projects

## Deployment

- GitHub repo (public) → Cloudflare Pages
- Build command: `astro build`, output dir: `dist`
- Custom domain: `quz.ma`
- Auto-deploy on push to `main`

## Visual Identity

- **Font:** JetBrains Mono throughout (Fontsource, not Google Fonts)
- **Palette:** Catppuccin Mocha — base `#1e1e2e`, text `#cdd6f4`, accents from palette
- **Layout:** max-width ~720px, generous line-height (1.7)
- **Terminal touches:** blinking cursor in hero, `$` prompt prefixes in nav
- No scanlines or retro gimmicks — clean and modern

## Site Structure

```
/                  → Home (hero, recent blog posts, recent TILs)
/blog              → Blog listing (all posts, sorted by date, with tags)
/blog/[slug]       → Individual blog post
/til               → TIL listing (compact list)
/til/[slug]        → Individual TIL entry
/projects          → Project cards with expandable descriptions
/about             → Who you are, what you do
/uses              → Dev setup, tools, hardware
/rss.xml           → RSS feed (blog + TIL)
```

## Content Collections

### Blog (`src/content/blog/`)

MDX/MD files with frontmatter:

```yaml
title: string
date: date
description: string
tags: string[]
draft: boolean (optional, default false)
```

### TIL (`src/content/til/`)

MD files with frontmatter:

```yaml
title: string
date: date
tags: string[]
```

### Projects (`src/content/projects/`)

MD files with frontmatter + optional body for expandable section:

```yaml
name: string
description: string
stack: string[]
status: "active" | "archived"
url: string (optional)
repo: string (optional)
```

## Layout & Components

### Layout

- Max-width container (~720px)
- Sticky header: site name (`quz.ma`) + nav with `$` prefix
- Minimal footer: copyright, license note, source link

### Components

- `BaseLayout` — head (fonts, meta, OG tags), header, main, footer
- `BlogPost` — title, date, tags, reading time, content
- `TilEntry` — compact: date + title
- `ProjectCard` — name, description, stack tags, status badge, links, collapsible `<details>` for longer description
- `TagList` — reusable tag display

## Licensing

- `LICENSE-CODE` — MIT for source code
- `LICENSE-CONTENT` — CC BY 4.0 for written content (blog, TIL)

## Project Files

- `README.md` — project overview, local dev, content authoring guide
- `CHANGELOG.md` — dated entries (no semver)
