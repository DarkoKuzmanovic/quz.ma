# Task Completion Checklist

When a task is completed, run the following:

1. **Type check**: `npm run check` — Runs `astro check` for TypeScript and Astro diagnostics
2. **Build**: `npm run build` — Ensure production build succeeds (output to `./dist`)
3. **Visual review** (if UI changes): `npm run dev` and check in browser

Note: No linter (eslint) or formatter (prettier) configured. No test framework present.
