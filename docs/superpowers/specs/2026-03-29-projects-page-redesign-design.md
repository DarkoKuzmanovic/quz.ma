# Projects Page Redesign

## Goal

Redesign the projects page to be visually distinctive (cards with image thumbnails, better hierarchy) and add stack-based filtering for browsing.

## Content Schema Changes

Add an optional `image` field to the projects collection in `src/content.config.ts`:

```ts
image: z.string().optional(), // filename in public/images/projects/
```

Example frontmatter:

```yaml
---
name: "Piksi"
description: "2-player online Pixies card game"
stack: ["TypeScript", "Fastify", "React", "WebSocket"]
status: "active"
url: "https://piksi.quz.ma"
repo: "https://github.com/DarkoKuzmanovic/piksi"
image: "piksi.png"
---
```

Images stored in `public/images/projects/`. Projects without an image render the card without the banner section.

## ProjectCard Component

Redesigned `src/components/ProjectCard.astro`:

- **Image banner**: ~120px height, `object-cover`, rounded top corners. Conditionally rendered.
- **Title + status badge**: Row with project name (bold, `ctp-mauve`) and active/archived badge.
- **Description**: Muted text (`ctp-subtext0`).
- **Stack tags**: Small badges showing the tech stack.
- **Links row**: "live" and "source" links at the bottom.
- **Hover state**: Border color shifts from `ctp-surface0` to `ctp-surface1`.
- **Removed**: The `<details>` expandable section is dropped. Description covers the summary.

Props change: add `image?: string`, remove `hasBody: boolean` and the `<slot>`.

## Filter Bar

- Row of clickable tag buttons at the top of the page, below the terminal heading.
- Tags derived from all unique `stack` values across all projects (both active and archived).
- "All" button active by default, shows everything.
- **Multi-select with OR logic**: clicking multiple tags shows projects matching any selected tag.
- Active filter: filled style (`bg-ctp-mauve/20 text-ctp-mauve`). Inactive: outline style.
- Clicking "All" clears all other selections. Clicking a tag while "All" is active deactivates "All".
- If all tags are deselected, "All" reactivates automatically.

## Implementation

Client-side filtering via a `<script>` block in `projects.astro`:

- Each project card gets a `data-stack` attribute with a JSON array of its stack values.
- The script toggles `hidden` on cards based on which filter tags are active.
- No framework or island needed — plain DOM manipulation.

## Page Layout

File: `src/pages/projects.astro`

1. Terminal heading: `> ls ~/projects` (unchanged)
2. Filter bar (new)
3. 2-column responsive grid: `grid-cols-1 md:grid-cols-2`, `gap-4`
4. Active projects section (no heading, just the grid)
5. Archived section: dimmed heading "Archived", same grid layout. Only renders if archived projects exist.
6. Projects sorted alphabetically within each group (unchanged).

## Files Changed

- `src/content.config.ts` — add `image` field to projects schema
- `src/components/ProjectCard.astro` — redesigned card component
- `src/pages/projects.astro` — add filter bar, update grid layout, add client-side script
- `public/images/projects/` — new directory for project thumbnails
- `src/content/projects/*.md` — add `image` field to existing entries (optional)

## Out of Scope

- Category/grouping beyond active/archived
- Search functionality
- Project detail pages (individual routes)
- Animated transitions on filter
