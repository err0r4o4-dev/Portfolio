# Portfolio Project Instructions

## Project Scope

- Build and maintain this portfolio as a React 19, TypeScript, and Vite application.
- Preserve existing behavior unless the user explicitly requests a behavior change.
- Keep changes focused on the current task. Do not perform unrelated refactors or add speculative features.
- Inspect the relevant implementation, styles, and configuration before editing.

## Development Workflow

1. Understand the requested outcome and identify the smallest relevant code path.
2. For non-trivial code changes, apply `karpathy-guidelines` to keep the solution simple and surgical.
3. For UI work, inspect `src/styles/index.css`, the affected component, and its stylesheet before implementing.
4. Reuse existing components, CSS variables, and patterns before creating new abstractions.
5. Implement the smallest complete change that satisfies the request.
6. Run the checks appropriate to the change:
   - `npm run lint`
   - `npm run build`
7. Report what changed, how it was validated, and any remaining limitation.

Do not create temporary planning files such as `TODO.md` unless the task is large enough to benefit from a persistent checklist. Remove task-only temporary files before completion.

## Tech Stack

| Layer | Tool |
| --- | --- |
| UI framework | React 19 |
| Language | TypeScript with strict checks |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Styling | Plain CSS and shared CSS custom properties |
| Linting | ESLint 9 with TypeScript and React Hooks rules |

- Do not introduce another framework, UI library, state library, styling system, or icon package without a clear need and user approval.
- Do not add dependencies for behavior that can be implemented clearly with the existing stack.
- Keep browser APIs and React code compatible with the current Vite setup.

## Project Structure

- `src/screens/`: route-level screens.
- `src/components/`: reusable React components.
- `src/styles/`: global and component-specific styles.
- `src/styles/index.css`: global reset and design tokens; treat its `:root` variables as the visual source of truth.
- `src/assets/`: assets processed by Vite.
- `public/`: static files served without bundling.
- `dist/`, `node_modules/`: generated content; never edit directly.

Keep component-specific CSS in `src/styles/` and use a name matching the component when practical.

## React and TypeScript Rules

- Use function components and typed props.
- Prefer explicit domain types over `any`. Do not use `@ts-ignore` or weaken TypeScript settings to hide errors.
- Follow the Rules of Hooks. Keep hooks at the top level and declare hook dependencies accurately.
- Keep state as local as practical. Lift state only when multiple components genuinely need the same source of truth.
- Derive values during rendering when possible instead of duplicating derived state.
- Use stable, meaningful keys for rendered lists; do not use array indexes when item identity exists.
- Keep components focused. Extract a component or helper when it improves reuse, testing, or readability—not merely to reduce line count.
- Use early returns to avoid deeply nested conditionals.
- Use `PascalCase` for components and types, `camelCase` for variables and functions, and `UPPER_SNAKE_CASE` for true constants.
- Prefix booleans with names such as `is`, `has`, `can`, or `should` when appropriate.
- Prefer self-explanatory names over comments. Comment only non-obvious decisions, constraints, or workarounds.
- Remove debugging `console.log` calls before completing work.

## Styling and Design Rules

- Reuse CSS variables from `src/styles/index.css` for colors, typography, shadows, and shared visual values.
- Preserve the current dark visual identity with cyan and purple accents unless the user requests a redesign in another direction.
- Avoid inline styles when a CSS class can express the design clearly.
- Avoid hardcoded colors when an existing CSS variable represents the intended role.
- Reuse existing spacing, radius, border, and shadow patterns before introducing new ones.
- Make UI changes responsive for mobile, tablet, and desktop layouts.
- Avoid horizontal overflow at narrow viewport widths.
- Preserve readable line lengths, clear visual hierarchy, and consistent spacing rhythm.
- Provide visible hover and focus states for interactive controls.
- Use semantic HTML and accessible names. Ensure keyboard interaction works for buttons, links, dialogs, and other controls.
- Respect `prefers-reduced-motion` when adding substantial animation.
- Do not replace working visual patterns solely to match a generic template.

## Component Rules

- Search `src/components/` before creating a new component.
- Reuse or extend a close existing component when that keeps the API clear.
- Keep route-level composition in `src/screens/` and reusable UI in `src/components/`.
- Keep component APIs small and typed. Avoid boolean-prop combinations that create ambiguous states.
- Preserve the behavior of `Header`, `Footer`, and `ProjectModal` when changing their presentation.
- For dialogs and modals, maintain focus behavior, Escape handling, backdrop behavior, scroll locking, and accessible labels.

## Debugging Rules

- Use `diagnose` for bugs, runtime failures, build errors, broken behavior, and performance regressions.
- Reproduce the problem before proposing a fix when reproduction is possible.
- Trace the actual failing code path and gather evidence; do not guess from the visible symptom alone.
- State the working hypothesis and try to falsify it.
- Fix the root cause with the smallest safe change.
- Run a regression check covering both the reported failure and the surrounding behavior.
- Use `debug-mantra` only when the user explicitly requests its stricter checklist format; do not stack it with `diagnose` by default.

## Skill Selection

Use project Skills only when they add clear value. Prefer the most specific single Skill and load no more than two UI Skills for one task.

| Situation | Preferred Skill |
| --- | --- |
| Non-trivial writing or refactoring | `karpathy-guidelines` |
| Bug or failing behavior | `diagnose` |
| Review, audit, or second opinion | `scrutinize` |
| Create a new page or visually important component | `design-taste-frontend` |
| Redesign an existing page or component | `redesign-existing-projects` |
| Editorial or intentionally minimal design | `minimalist-ui` |
| Premium landing page or hero section | `high-end-visual-design` |
| Implement from an actual screenshot or mockup | `image-to-code` |
| User explicitly requests test-first development | `tdd` |
| User explicitly requires complete unabridged output | `full-output-enforcement` |

Additional constraints:

- Do not load `design-taste-frontend-v1` together with `design-taste-frontend`; default to the current `design-taste-frontend`.
- Do not use `nuxt-ui`, `vue-best-practices`, `vue-debug-guides`, `vue-pinia-best-practices`, `vue-router-best-practices`, or `vuetify0` for this React project unless the task explicitly concerns migrating or analyzing Vue code.
- Do not stack broad design Skills by default. Select the one matching the requested visual direction.
- Use `improve-codebase-architecture` only for explicit architecture or substantial refactoring work, not small fixes.

## Dependency and Security Rules

- Before adding a dependency, confirm that the existing stack cannot reasonably solve the problem and explain the tradeoff.
- Use maintained packages with suitable licenses and avoid packages with known high-severity vulnerabilities.
- Never commit secrets, tokens, passwords, private keys, or environment-specific credentials.
- Treat user-controlled content as untrusted. Avoid unsafe HTML injection and do not use `dangerouslySetInnerHTML` without explicit sanitization and justification.
- Use safe URL handling for external links; add `rel="noopener noreferrer"` when opening an untrusted external site in a new tab.
- Do not expose private configuration through Vite client environment variables.

## Quality Gates

Run checks proportional to the change, with these commands as the default final gate:

```powershell
npm run lint
npm run build
```

- Both commands must pass before declaring a code change complete.
- Do not suppress ESLint or TypeScript failures merely to make checks pass.
- If a check cannot run, report the exact command, failure, and impact.
- The project currently has no automated test script. Do not claim tests passed unless a test framework and relevant tests actually exist.
- For visual changes, also inspect the affected page at representative viewport sizes when browser tooling is available.

## Completion Checklist

- The requested behavior or design is implemented.
- Existing unrelated behavior remains intact.
- Existing components and CSS variables were reused where appropriate.
- Accessibility and responsive behavior were considered for UI changes.
- No unrelated files or dependencies were changed.
- `npm run lint` passes.
- `npm run build` passes.
- The final response identifies changed files and validation results.
