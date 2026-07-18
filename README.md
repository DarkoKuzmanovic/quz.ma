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

## Configuration

Site-wide constants live in `src/consts.ts`:

- `PROMPT_PREFIX` — the terminal prompt character used across all pages (default: `>`)

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
url: "https://example.com"
repo: "https://github.com/you/repo"
---
```

## Deployment

Push to `main` → Cloudflare Pages auto-deploys.

## License

- Code: [MIT](LICENSE-CODE)
- Content: [CC BY 4.0](LICENSE-CONTENT)
