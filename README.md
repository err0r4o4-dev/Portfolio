# Thirawat Duangta Portfolio

A bilingual personal portfolio for Thirawat Duangta, focused on software projects, practical engineering work, and current areas of growth.

## Highlights

- English and Thai content with a persisted language preference
- Responsive single-page layout with accessible section navigation
- Project case-note modal with keyboard focus management
- Reduced-motion support for animated presentation
- Downloadable CV and direct contact links

## Stack

- React 19
- TypeScript
- Vite 8
- React Router 7
- Tailwind CSS v4
- `@tailwindcss/vite` integration
- CSS-first design tokens with `@theme`

## Local development

```powershell
npm install
npm run dev
```

## Quality checks

```powershell
npm run lint
npm run build
```

## Project structure

- `src/screens/` — route-level page composition
- `src/components/` — reusable interface components
- `src/styles/index.css` — Tailwind entrypoint, theme tokens, shared utilities, base rules, animations, and exceptional global selectors
- `src/assets/` — images processed by Vite
- `public/downloads/` — downloadable CV

## Styling conventions

- Use Tailwind utilities directly in React components for layout, spacing, typography, responsive behavior, and interactive states.
- Define shared semantic tokens in `src/styles/index.css` with Tailwind CSS v4 CSS-first `@theme` configuration.
- Keep global CSS for base rules, keyframes, pseudo-elements, browser-specific selectors, and state orchestration that utilities cannot express clearly.
- Prefer reusable `@utility` primitives for shared project patterns; no `tailwind.config.js` is required for the current setup.

## Deployment

The site uses `BrowserRouter`. Configure the hosting platform to serve `index.html` as the fallback for unknown paths so the client-side fallback route can run.
