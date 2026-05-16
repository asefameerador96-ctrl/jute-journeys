# Shah Agro Limited — Jute Journeys

Marketing site for Shah Agro Limited, a premium jute exporter from Bangladesh.

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Vitest (unit) and Playwright (e2e) for tests
- ESLint for linting

## Local development

```bash
# install dependencies
npm install   # or: bun install

# start the dev server (http://localhost:5173)
npm run dev

# run unit tests
npm test

# lint
npm run lint

# production build
npm run build
npm run preview
```

## Project layout

```
src/
  pages/        # route-level views
  components/   # reusable UI (shadcn-based)
  hooks/        # custom React hooks
  lib/          # utilities
  assets/       # images and other static assets
  test/         # vitest setup and shared test helpers
public/         # served as-is at the site root
```

## Deployment

The repo was bootstrapped with Lovable. To deploy, run `npm run build` and serve the
generated `dist/` folder on any static host (Netlify, Vercel, GitHub Pages, etc.).
