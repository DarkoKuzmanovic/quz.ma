# quz.ma

Personal website for Darko Kuzmanovic, built with Astro v6 and deployed to Cloudflare Pages.

## Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run preview` — Preview production build locally

## Architecture

```
src/
├── components/    # Reusable Astro components
├── content/       # Content collections (blog, til, projects)
├── layouts/       # BaseLayout + BlogPostLayout
├── pages/         # File-based routing
└── styles/        # Tailwind v4 CSS-first config + Catppuccin theme
```

- **Content collections** with Zod schemas in `content.config.ts`
- **Tailwind v4** via Vite plugin (CSS-first, no JS config)
- **Catppuccin Mocha** color palette throughout
- **JetBrains Mono** monospace font, terminal aesthetic

## Conventions

- Terminal aesthetic: prompt prefixes, monospace, dark theme
- `PROMPT_PREFIX` const in `src/consts.ts` controls the terminal prompt character site-wide
- Catppuccin color tokens: `ctp-base`, `ctp-mauve`, `ctp-green`, etc.
- Content types: blog (MDX), TIL (MD), projects (MD with status enum)
- Draft support via `draft: true` in blog frontmatter

## Lessons Learned
