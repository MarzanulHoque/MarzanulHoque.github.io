# MarzanulHoque.github.io

Personal portfolio of **Marzanul Hoque** — a fast, single-page, scroll-driven developer
portfolio deployed on GitHub Pages.

**Live site:** https://marzanulhoque.github.io/

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 (CSS-only config) · Three.js /
react-three-fiber · self-hosted fonts · GitHub Pages + Actions.

## Highlights

- **Content-driven** — all personal content lives in a single data file (`src/data/profile.ts`);
  components are purely presentational.
- **Animated 3D background** — lazy-loaded Three.js scenes behind the page, disabled under
  `prefers-reduced-motion`.
- **Light/dark theming** with no flash on load (theme applied before first paint).
- **Scroll-driven UX** — reveal animations, active-nav highlighting, scroll progress bar,
  cursor-follow glow.

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run lint      # oxlint
```

## Deployment

Every push to `main` builds `dist/` and publishes it via the GitHub Actions Pages workflow
(`.github/workflows/deploy.yml`). No manual steps.

## Architecture docs

The full build blueprint — design system, data model, component specs, 3D layer, and a
customization cookbook — is maintained as a reusable knowledge base
(`PORTFOLIO_KNOWLEDGEBASE.md`, kept alongside this repo).
