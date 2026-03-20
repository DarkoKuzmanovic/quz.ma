# quz.ma

Personal website. Blog, TIL, and projects.

Built with [Astro](https://astro.build), styled with [Catppuccin Mocha](https://catppuccin.com), deployed to [Cloudflare Pages](https://pages.cloudflare.com).

## Local Development

npm install
npm run dev

Open http://localhost:4321

## Build

npm run build

Static output goes to `dist/`.

## Writing Content

### Blog Post

Create `src/content/blog/your-slug.mdx` with frontmatter: title, date, description, tags, draft

### TIL Entry

Create `src/content/til/your-slug.md` with frontmatter: title, date, tags

### Project

Create `src/content/projects/your-slug.md` with frontmatter: name, description, stack, status, url, repo. Optional body for expandable section.

## Deployment

Push to `main` → Cloudflare Pages auto-deploys.

## License

- Code: MIT (LICENSE-CODE)
- Content: CC BY 4.0 (LICENSE-CONTENT)
