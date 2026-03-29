# Project Overview

**quz.ma** — Personal website for Darko Kuzmanovic.

## Tech Stack
- **Framework**: Astro v6 (static site, file-based routing)
- **Styling**: Tailwind CSS v4 (CSS-first config via Vite plugin, no JS config file)
- **Content**: MDX for blog, Markdown for TIL and projects (Astro content collections with Zod schemas)
- **Theme**: Catppuccin Mocha dark color palette
- **Font**: JetBrains Mono (monospace throughout — terminal aesthetic)
- **Deployment**: Cloudflare Pages (via Wrangler, static assets from `./dist`)
- **Language**: TypeScript (strict mode, extends `astro/tsconfigs/strict`)
- **Node**: >=22.12.0

## Site URL
https://quz.ma

## Key Integrations
- `@astrojs/mdx` — MDX support for blog posts
- `@astrojs/rss` — RSS feed generation
- `@astrojs/sitemap` — Sitemap generation
- `@tailwindcss/typography` — Prose styling (with custom `prose-terminal` utility)
