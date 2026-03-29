# Style and Conventions

## Code Style
- TypeScript with strict mode (`astro/tsconfigs/strict`)
- ES modules (`"type": "module"` in package.json)
- Astro components (`.astro`) for pages, layouts, and components
- MDX for blog content, plain Markdown for TIL and projects

## Design Conventions
- **Terminal aesthetic**: prompt prefixes, monospace font, dark theme
- `PROMPT_PREFIX` constant in `src/consts.ts` controls the terminal prompt character site-wide (currently `">"`)
- Catppuccin Mocha color tokens: `ctp-base`, `ctp-mauve`, `ctp-green`, `ctp-peach`, `ctp-text`, etc.
- Custom `prose-terminal` Tailwind utility maps `@tailwindcss/typography` prose vars to Catppuccin colors

## Tailwind v4 (CSS-First)
- No `tailwind.config.js` — all config in `src/styles/global.css` using `@theme` and `@utility` directives
- Integrated via `@tailwindcss/vite` plugin in `astro.config.mjs`

## Content Collections
- Defined in `src/content.config.ts` with Zod schemas
- **blog**: title, date, description, tags[], draft (boolean)
- **til**: title, date, tags[]
- **projects**: name, description, stack[], status (active|archived), url?, repo?
- Draft support: `draft: true` in blog frontmatter

## File Structure
```
src/
├── components/    # Reusable Astro components (Header, Footer, cards, etc.)
├── content/       # Content collections (blog/, til/, projects/)
├── layouts/       # BaseLayout.astro, BlogPostLayout.astro
├── pages/         # File-based routing (index, about, uses, blog/, til/, projects, 404, rss)
├── styles/        # global.css (Tailwind v4 CSS-first config + Catppuccin theme)
└── consts.ts      # Site-wide constants (PROMPT_PREFIX)
```
