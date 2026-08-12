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
- Plain CSS with shared custom properties

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
- `src/styles/` — global tokens and component styles
- `src/assets/` — images processed by Vite
- `public/downloads/` — downloadable CV

## Deployment

The site uses `BrowserRouter`. Configure the hosting platform to serve `index.html` as the fallback for unknown paths so the client-side fallback route can run.
