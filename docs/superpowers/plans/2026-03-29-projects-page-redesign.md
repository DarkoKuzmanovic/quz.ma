# Projects Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the projects page with image thumbnails, better visual hierarchy, and multi-select stack-based filtering.

**Architecture:** Static Astro page with redesigned project cards (image banner, tags, links) and a client-side filter script. Filter state is managed in a plain `<script>` block — no framework or island needed. OR-logic multi-select filtering toggles card visibility via `data-stack` attributes.

**Tech Stack:** Astro v6, Tailwind v4 (CSS-first), TypeScript

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/content.config.ts` | Modify | Add optional `image` field to projects schema |
| `src/components/ProjectCard.astro` | Rewrite | Redesigned card with image banner, no expandable details |
| `src/pages/projects.astro` | Rewrite | Filter bar, 2-col grid layout, client-side filter script |
| `public/images/projects/` | Create dir | Project thumbnail images |
| `src/content/projects/piksi.md` | Modify | Add `image` field (optional) |
| `src/content/projects/wezterm-tui.md` | Modify | Add `image` field (optional) |

---

### Task 1: Add image field to projects schema

**Files:**
- Modify: `src/content.config.ts:25-35`

- [ ] **Step 1: Add the image field to the projects schema**

In `src/content.config.ts`, add `image` to the projects collection schema, after `repo`:

```ts
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    status: z.enum(['active', 'archived']),
    url: z.string().optional(),
    repo: z.string().optional(),
    image: z.string().optional(),
  }),
});
```

- [ ] **Step 2: Create the images directory**

```bash
mkdir -p public/images/projects
```

- [ ] **Step 3: Run the type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts public/images/projects/.gitkeep
git commit -m "feat: add image field to projects content schema"
```

Note: create an empty `.gitkeep` in `public/images/projects/` so the directory is tracked.

---

### Task 2: Redesign ProjectCard component

**Files:**
- Rewrite: `src/components/ProjectCard.astro`

- [ ] **Step 1: Rewrite the ProjectCard component**

Replace the entire contents of `src/components/ProjectCard.astro` with:

```astro
---
interface Props {
  name: string;
  description: string;
  stack: string[];
  status: 'active' | 'archived';
  url?: string;
  repo?: string;
  image?: string;
}

const { name, description, stack, status, url, repo, image } = Astro.props;
---

<div
  class="border border-ctp-surface0 rounded-lg overflow-hidden hover:border-ctp-surface1 transition-colors"
  data-stack={JSON.stringify(stack)}
>
  {image && (
    <img
      src={`/images/projects/${image}`}
      alt={`${name} screenshot`}
      class="w-full h-[120px] object-cover"
    />
  )}
  <div class="p-4 flex flex-col gap-2">
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
    <p class="text-sm text-ctp-subtext0">{description}</p>
    <ul class="flex flex-wrap gap-2">
      {stack.map((tag) => (
        <li class="text-xs px-2 py-0.5 rounded bg-ctp-surface0 text-ctp-subtext0">
          {tag}
        </li>
      ))}
    </ul>
    <div class="flex gap-3 text-sm">
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
  </div>
</div>
```

Key changes from the old component:
- Added `image` prop and conditional image banner
- Added `data-stack` attribute on the root div (needed for filtering in Task 3)
- Added `overflow-hidden` for image border radius
- Added `hover:border-ctp-surface1 transition-colors` for hover state
- Removed `hasBody` prop, `<slot>`, and the `<details>` expandable section
- Inlined the tag list (no longer imports `TagList.astro`) since the markup is identical

- [ ] **Step 2: Run the type check**

```bash
npm run check
```

Expected: may show errors in `projects.astro` because it still passes `hasBody` and `<Content />`. That's fine — we fix the page in Task 3.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "feat: redesign ProjectCard with image banner and hover state"
```

---

### Task 3: Rewrite projects page with filter bar and grid layout

**Files:**
- Rewrite: `src/pages/projects.astro`

- [ ] **Step 1: Rewrite the projects page**

Replace the entire contents of `src/pages/projects.astro` with:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { PROMPT_PREFIX } from '../consts';

const projects = (await getCollection('projects'))
  .sort((a, b) => a.data.name.localeCompare(b.data.name));
const active = projects.filter((p) => p.data.status === 'active');
const archived = projects.filter((p) => p.data.status === 'archived');

const allTags = [...new Set(projects.flatMap((p) => p.data.stack))].sort();
---

<BaseLayout title="Projects">
  <h1 class="text-2xl font-bold text-ctp-mauve mb-6">
    <span class="text-ctp-green">{PROMPT_PREFIX}</span> ls ~/projects
  </h1>

  <div class="flex flex-wrap gap-2 mb-6" id="filter-bar">
    <button
      class="text-xs px-3 py-1 rounded border border-ctp-mauve bg-ctp-mauve/20 text-ctp-mauve transition-colors"
      data-filter="all"
    >
      All
    </button>
    {allTags.map((tag) => (
      <button
        class="text-xs px-3 py-1 rounded border border-ctp-surface1 text-ctp-subtext0 hover:border-ctp-mauve hover:text-ctp-mauve transition-colors"
        data-filter={tag}
      >
        {tag}
      </button>
    ))}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="active-grid">
    {active.map((project) => (
      <ProjectCard
        name={project.data.name}
        description={project.data.description}
        stack={project.data.stack}
        status={project.data.status}
        url={project.data.url}
        repo={project.data.repo}
        image={project.data.image}
      />
    ))}
  </div>

  {archived.length > 0 && (
    <>
      <h2 class="text-lg font-bold text-ctp-overlay1 mt-10 mb-4" id="archived-heading">Archived</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="archived-grid">
        {archived.map((project) => (
          <ProjectCard
            name={project.data.name}
            description={project.data.description}
            stack={project.data.stack}
            status={project.data.status}
            url={project.data.url}
            repo={project.data.repo}
            image={project.data.image}
          />
        ))}
      </div>
    </>
  )}

  <script>
    const filterBar = document.getElementById('filter-bar')!;
    const buttons = filterBar.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const cards = document.querySelectorAll<HTMLElement>('[data-stack]');
    const archivedHeading = document.getElementById('archived-heading');

    const activeClass = 'border-ctp-mauve bg-ctp-mauve/20 text-ctp-mauve';
    const inactiveClass = 'border-ctp-surface1 text-ctp-subtext0';

    const selectedTags = new Set<string>();

    function updateButtons() {
      const allActive = selectedTags.size === 0;
      buttons.forEach((btn) => {
        const filter = btn.dataset.filter!;
        const isActive = filter === 'all' ? allActive : selectedTags.has(filter);

        activeClass.split(' ').forEach((c) => btn.classList.toggle(c, isActive));
        inactiveClass.split(' ').forEach((c) => btn.classList.toggle(c, !isActive));
      });
    }

    function updateCards() {
      const showAll = selectedTags.size === 0;
      let archivedVisible = 0;

      cards.forEach((card) => {
        const stack: string[] = JSON.parse(card.dataset.stack!);
        const match = showAll || stack.some((tag) => selectedTags.has(tag));
        card.classList.toggle('hidden', !match);

        if (match && card.closest('#archived-grid')) {
          archivedVisible++;
        }
      });

      if (archivedHeading) {
        archivedHeading.classList.toggle('hidden', archivedVisible === 0 && !showAll);
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter!;

        if (filter === 'all') {
          selectedTags.clear();
        } else {
          if (selectedTags.has(filter)) {
            selectedTags.delete(filter);
          } else {
            selectedTags.add(filter);
          }
        }

        updateButtons();
        updateCards();
      });
    });
  </script>
</BaseLayout>
```

Key changes from the old page:
- Removed `render` import and `Content` rendering (no more expandable details)
- Added `allTags` computed from all projects' stack arrays
- Added filter bar with "All" + per-tag buttons
- Changed grid to `grid-cols-1 md:grid-cols-2`
- Passes `image` prop to `ProjectCard`
- Added `<script>` block for multi-select OR-logic filtering
- Archived heading hides when filtering results in zero archived matches

- [ ] **Step 2: Run the type check**

```bash
npm run check
```

Expected: no errors.

- [ ] **Step 3: Run the build**

```bash
npm run build
```

Expected: successful build.

- [ ] **Step 4: Commit**

```bash
git add src/pages/projects.astro
git commit -m "feat: add stack filter bar and 2-column grid to projects page"
```

---

### Task 4: Add placeholder images to existing projects

**Files:**
- Modify: `src/content/projects/piksi.md`
- Modify: `src/content/projects/wezterm-tui.md`

- [ ] **Step 1: Add placeholder images**

Since we don't have real screenshots yet, create simple SVG placeholders so the layout can be verified:

```bash
cat > public/images/projects/piksi.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
  <rect fill="#1e1e2e" width="800" height="400"/>
  <text fill="#cba6f7" font-family="monospace" font-size="32" x="400" y="200" text-anchor="middle" dominant-baseline="central">Piksi</text>
</svg>
EOF
```

```bash
cat > public/images/projects/wezterm-tui.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
  <rect fill="#1e1e2e" width="800" height="400"/>
  <text fill="#cba6f7" font-family="monospace" font-size="32" x="400" y="200" text-anchor="middle" dominant-baseline="central">wezterm-tui</text>
</svg>
EOF
```

- [ ] **Step 2: Add image field to piksi.md frontmatter**

Add `image: "piksi.svg"` to the frontmatter of `src/content/projects/piksi.md`:

```yaml
---
name: "Piksi"
description: "2-player online Pixies card game"
stack: ["TypeScript", "Fastify", "React", "WebSocket"]
status: "active"
url: "https://piksi.quz.ma"
repo: "https://github.com/DarkoKuzmanovic/piksi"
image: "piksi.svg"
---
```

- [ ] **Step 3: Add image field to wezterm-tui.md frontmatter**

Add `image: "wezterm-tui.svg"` to the frontmatter of `src/content/projects/wezterm-tui.md`:

```yaml
---
name: "wezterm-tui"
description: "Terminal UI for managing WezTerm settings without editing Lua files"
stack: ["Python", "Textual"]
status: "active"
repo: "https://github.com/DarkoKuzmanovic/wezterm-tui"
image: "wezterm-tui.svg"
---
```

- [ ] **Step 4: Run the build to verify everything works end-to-end**

```bash
npm run build
```

Expected: successful build.

- [ ] **Step 5: Start dev server and visually verify**

```bash
npm run dev
```

Open the projects page in the browser. Verify:
- Filter bar shows: All, Fastify, Python, React, Textual, TypeScript, WebSocket
- Both cards show with SVG placeholder banners
- Clicking "Python" shows only wezterm-tui
- Clicking "TypeScript" while "Python" is selected shows both (OR logic)
- Clicking "All" resets to show everything
- Deselecting all filters re-activates "All"
- Cards have hover border effect

- [ ] **Step 6: Commit**

```bash
git add public/images/projects/ src/content/projects/piksi.md src/content/projects/wezterm-tui.md
git commit -m "feat: add placeholder images to project entries"
```

---

### Task 5: Clean up unused TagList import

**Files:**
- Check: `src/components/TagList.astro`

- [ ] **Step 1: Check if TagList is used anywhere else**

```bash
grep -r "TagList" src/ --include="*.astro" --include="*.ts" --include="*.tsx"
```

If `TagList.astro` is only referenced in the old `ProjectCard.astro` (which no longer imports it), and nowhere else, it's now unused.

- [ ] **Step 2: If unused, delete TagList.astro**

```bash
rm src/components/TagList.astro
```

Skip this step if other files still import it.

- [ ] **Step 3: Run the build**

```bash
npm run build
```

Expected: successful build.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused TagList component"
```
