# Backlog

Proposed work, not yet approved. When an item is picked, it becomes a GitHub issue, plus a DECISIONS entry if it changes scope.

Sizes: **S** ≤ half a day · **M** ≈ 1–2 days · **L** = a milestone. **scope** = adds something the site doesn't do today.

## v2 redesign: "terminal session"

Designed 2026-10-18 in pen.dev. Darko liked it; nothing is built yet.

- **Design file:** `~/hermes/designs/quz-ma/quz-ma-v2.pen`, in the designs folder Syncthing keeps in step between the desktop and the laptop. Needs Pen 1.2.18 or newer.
- **PNG exports:** `exports/` next to it: `home-desktop`, `home-mobile`, `projects-desktop`, `about-desktop`, `404-desktop`, `system` and `overview`.
- **Boards:** Home (desktop 1440 px and phone 390 px), Projects, About, 404, System (palette, type, rules), and screenshots of the live site on 2026-10-18 for comparison.

What the design changes:

- **Every page reads like a tmux session.** A status bar on top has window tabs (`1:home 2:work 3:about`), a 14-day commit sparkline and a local clock. A key bar at the bottom lists shortcuts: `j k` move, `↵` open, `/` search, `g h` home, `?` help.
- **Home:**
  - the name in Departure Mono 88 px with a block cursor
  - a `neofetch` panel with a pixel "Q" logo and the setup
  - section heads written as commands (`~/work $ ls --featured`)
  - three featured cards whose previews are drawn in text: kuota's usage bars, pi-hud's status line, ponytail's diff
  - a `ls -t | head -5` list of recent projects
  - two panels: `ps -u darko` (what I'm working on now) and `cat note.txt`
- **Projects:** two panes, the list with a cursor row on the left and the selected project's preview on the right. Category chips and a `/` filter above them.
- **About:** written as a man page, `DARKO(1)`.
- **404:** a `cd` error line and a pixel-art "404".
- **Kept from today's site:** Catppuccin Mocha, Departure Mono and the `╟──◈──╢` footer divider.

Rules from the System board, to carry into the code:

- Departure Mono only at 11, 22, 33, 44 or 88 px. It is drawn on an 11 px grid, and today's 14 px base blurs it.
- Block-character art (`▀ ▄ █`) needs line-height 1.2727 (700/550) so the rows join. Departure Mono has no `▶`; set that glyph in JetBrains Mono.
- JetBrains Mono for anything read for more than a line: body 16 px / 1.7, lede 20 px / 1.6, meta 13 px.
- Green means you can act (prompts, links, the primary button). Mauve means you are here (active tab, cursor row). Pink and lavender appear only in the logo.
- Project previews are text, never screenshots.
- Content width up to 1200 px (today `max-w-3xl`).
- Meta text uses overlay2 (#9399b2, about 5.8:1 on base). overlay0 (#6c7086, about 3.4:1) is too faint for small text: decoration only.

## Next up (suggested order)

1. **Check what the design guessed or made up** (S). Do this before anything ships.
   - From today's About page, maybe out of date: VS Code Insiders, Zed, Ryzen 5 3600, RX 580, 32 GB RAM.
   - Guessed: zsh, "herdr · Konsole", QML in kuota's stack.
   - Placeholders: the "now" list (sudoku-blocks isn't public), the commit sparkline, the BUGS line on the About page, and the numbers inside the previews.
2. **Fonts and tokens** (S). Self-host JetBrains Mono next to Departure Mono (both are OFL). Put the type scale and colour roles in `src/styles/global.css` and drop the 14 px base.
3. **Refresh the projects collection** (S). It is out of date (checked 2026-10-18):
   - **Moved:** KUsage, fleet-review and GitJot now live in the `DarkoKuzmanovic-archived` org, and Djordje is `simlab-eu/djordje-mcp`. `DarkoKuzmanovic/piksi` doesn't exist, though piksi.quz.ma may still run. The repo links in `src/content/projects/` still point at the old places.
   - **Missing:** kuota, ponytail, herdr-web-ui, subagent-tui, pixoo-jelcrko, pi-todo, KolorPiker, zmijice.
   - **Featured:** set `SELECTED_PROJECTS` in `src/consts.ts` to kuota, pi-hud, ponytail.
   - **Schema:** add a `category` field (pi, agents, desktop, terminal, fun) for the filter chips, and a place for each featured project's text preview.
4. **Status bar, key bar and footer** (M). Replace `Header.astro` and `Footer.astro`, and widen the layout in `BaseLayout.astro`.
5. **Home page** (M), desktop and phone, following the boards.
6. **Projects page** (M): the list and preview panes, chips and filter.
7. **About as a man page** (S) and **the 404 page** (S).
8. **scope: keyboard navigation** (M).
   - `j`/`k` move the cursor row, `↵` opens, `/` filters, `g h` goes home, `[ ]` jump between About sections, `?` opens a help overlay.
   - This would be the site's first client-side script; today it ships none.
   - Shortcuts must not fire while typing in the filter box. Hide the key bar on touch screens.
9. **scope: real data at build time** (M).
   - Stars, update dates and the 14-day commit sparkline come from the GitHub API during `astro build`.
   - Decide whether the build gets a GitHub token in Cloudflare's build settings. Without one, GitHub allows 60 requests an hour.
   - Add a fallback so a GitHub outage can't fail the deploy.
   - The status-bar clock needs a few lines of script; or drop it.

## Later, not designed yet

- Phone layouts for Projects, About and 404 (only Home has one).
- A light theme (Catppuccin Latte).
- Blog and TIL pages. The collections exist but are empty, and the design leaves writing out.

## Check before shipping

- **Which deploy path is live.** README and `docs/cloudflare-pages-setup.md` say a push to `main` auto-deploys on Cloudflare Pages. But `wrangler.jsonc` describes a Worker (`quzma`) serving `./dist`, and the DNS record for quz.ma is set up for a Worker. Confirm which one serves the site before the first redesign push.
