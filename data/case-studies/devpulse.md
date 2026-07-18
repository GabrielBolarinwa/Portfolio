# DevPulse — Case Study

---

## 1. Project Overview

DevPulse is a personal GitHub analytics dashboard that consolidates developer activity metrics — commit history, language distribution, repository stats, and contribution heatmaps — into a single, visually coherent interface powered by the GitHub REST and GraphQL APIs. It was built as a portfolio project to demonstrate senior-level frontend engineering through deliberate, documented decision-making — not feature breadth.

---

## 2. Objective & Constraints

The engineering standard was production-grade implementation: a deployed, defensible codebase where every meaningful decision has a documented rationale. The self-imposed constraints that shaped the build were:

- **Real API integration only** — no static JSON masquerading as data. A mock layer exists purely for development convenience via `VITE_USE_MOCK` and is toggled out in production.
- **Suspense-first data fetching** — all async data flows through React Suspense with per-section error boundaries. No manual `isLoading` flag management.
- **WCAG AA as a target** — semantic markup, keyboard accessibility, and ARIA attributes were prioritized, though edge cases around SVG accessibility remained challenging.
- **Documented design system** — a full token system (colour, typography, spacing, sizing) was defined and documented before any component was written.
- **Scroll-based responsiveness** — the app targets desktop but must remain usable on smaller screens. Full chart reflows were ruled out as disproportionate effort for a personal, desktop-primary tool.
- **Spec-driven build** — a feature checklist was drafted and signed off before development began. No features were added mid-build without justification.

---

## 3. Process

The first phase was mapping data visualization requirements: identifying which GitHub API endpoints provided useful metrics and determining the visualization method for each (status cards, bar charts, pie charts, heatmaps). The scope was constrained by available personal activity data, focusing on frontend engineering contributions only.
[DevPulse — Metrics & Visualization Plan](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs)

The feature checklist was drafted next, detailing every visualization component, data transformation step, and environment configuration required. This became the build spec that no mid-build features deviated from.
[DevPulse — Full Feature Checklist](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs/devpulse-full-feature-checklist)

The tech stack was then evaluated against the feature requirements. React 19 was chosen for Suspense data fetching primitives; Vite for dev iteration speed; TanStack Query for cache and async state management; Tailwind v4 for the `@theme` design token system; shadcn/ui for accessible base components; Recharts for SVG chart composition.
[DevPulse — Tech Stack](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs/devpulse-dashboard-ui-tech-stack)

The GitHub API surface was mapped comprehensively — REST and GraphQL endpoints studied, responses documented, and TypeScript types generated before any data fetching code was written. Mock data was structured to exactly mirror the real API shape.
[DevPulse — GitHub API Reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs/devpulse-github-api-reference)
[DevPulse — Typescript Type Reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs/devpulse-typescript-types-reference)
[DevPulse — Mock Implementation Plan](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs/devpulse-mock-implementation-plan)

Finally, the UI system was designed upfront: colour tokens ensuring visual consistency and semantic meaning, typography pairing choices (DM Sans + JetBrains Mono), and a complete spacing/sizing scale. All tokens were defined in Tailwind's `@theme` before any component was written.
[DevPulse — Colour Tokens](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs/devpulse-colour-tokens)
[DevPulse — Typography Specifications](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs/devpulse-typography-specifications)
[DevPulse — Spacing & Sizing Specifications](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/devpulse-research-docs/devpulse-spacing-and-sizing-specifications)

Evidence of this layered approach:
- The design token system (`@theme` in `index.css`) is comprehensive — colour, typography, spacing, radius, sizing all defined upfront, not emerged organically.
- The mock data layer (`githubData.ts`) mirrors real API response shapes exactly, indicating pre-build API contract study.
- The feature set maps cleanly to GitHub's API capabilities with no workarounds or approximations, showing features were derived from API research, not retrofitted.

---

## 4. Architecture & Structure

The project is organized around a strict three-layer separation:

```
GitHub API
    ↓
api/github.ts        — Raw fetch functions. No React, no transformation.
    ↓
services/queries.ts  — TanStack Query hooks. All data transformation lives here.
    ↓
Components           — Purely presentational. No component fetches directly.
```

**Data flow** is strictly unidirectional. Components call hooks, hooks call the API layer, API responses are transformed in the query layer before reaching the component. No component knows how data is fetched or shaped.

**State management** is intentionally minimal. React Query's cache serves as the client-side data store — all state is server-derived, there is no user-writable local state, and therefore no global state library is needed. Adding one would have been over-engineering for the problem.

**Error containment** is per-section via `ErrorBoundary` + `Suspense` pairs in `DashboardGrid`. A single failing query fails its own section, not the dashboard. The `key` reset pattern handles retries without unmounting the full tree.

**Mock system** mirrors the real API shape exactly, meaning `VITE_USE_MOCK=true` requires zero changes to components or hooks — the toggle is transparent to the entire React layer.

---

## 5. Stack & Tooling

| Tool | Role | Justification |
|---|---|---|
| **React 19** | UI framework | Chosen for the stable Suspense data fetching model. React 19 makes `useSuspenseQuery` a first-class pattern. Vue 3 was considered but lacks the same idiomatic integration of Suspense + ErrorBoundary + TanStack Query. |
| **TypeScript** | Type safety | Enforces API response shapes across the data pipeline. Caught shape mismatches between GraphQL responses and component expectations during development. |
| **Vite 5** | Build tooling | Fastest dev iteration cycle available. The gap between Vite and webpack for a project this size isn't worth debating. |
| **TanStack Query** | Data fetching & caching | `useSuspenseQuery` integrates cleanly with React Suspense boundaries. SWR was considered but its Suspense support and ErrorBoundary integration story are weaker. |
| **Tailwind CSS v4** | Styling | The `@theme` directive enables a proper design token system without a separate CSS variables file. CSS Modules were considered but co-located utility classes make component-level design intent more readable inline. |
| **Recharts** | Data visualization | Composable, React-native SVG charts. Chart.js was considered but its imperative canvas API works against React's declarative model. SVG output is accessible and inspectable. |
| **Axios** | HTTP client | Interceptor support and consistent error shape across REST and GraphQL calls. Native `fetch` was considered but Axios reduces boilerplate for the auth header setup every request requires and provides automatic JSON transformation. |
| **shadcn/ui** | Base UI components | Unstyled-by-default components (Card, Badge, Separator, Avatar, Skeleton) that inherit the token system without imposing visual opinions. Radix directly was considered but shadcn's pre-wired accessibility and composition layer reduces setup time without adding constraints. |
| **react-calendar-heatmap** | Contribution heatmap | Only React-native heatmap component matching GitHub's contribution graph layout out of the box. Poor TypeScript support was a known and accepted tradeoff. |
| **react-error-boundary** | Error handling | Declarative per-section error containment. A failing query should not crash the dashboard. |

---

## 6. Key Engineering Challenges

**Suspense with interdependent queries**

`useRepositoryLanguages` depends on both `useUser` (for the GitHub login) and `useRepos` (for repo names). The challenge was resolving this dependency chain inside Suspense without prop-drilling or lifting state. The solution was calling both hooks internally within `useRepositoryLanguages` — TanStack Query deduplicates the cache hits so no redundant fetches occur. The wrapping `Suspense` boundary handles the loading state for all three queries simultaneously, which required understanding that Suspense suspension bubbles to the nearest boundary rather than each query suspending independently.

**GraphQL `contributionsCollection` date range limitation**

GitHub's GraphQL `contributionsCollection` doesn't accept arbitrary date ranges spanning a year boundary in a single query. This was discovered mid-build when a single query spanning January–December returned incorrect totals. The resolution was 12 separate monthly queries run in parallel. The cleaner alternative — one query with 12 aliased `contributionsCollection` fields — was noted but deprioritised in favour of shipping. This is documented as a known improvement.

**Chart responsiveness without layout reflow**

`ResponsiveContainer` on narrow viewports either collapsed to zero width or caused layout overflow. A full responsive reflow (separate mobile layouts per chart) was evaluated and ruled out as disproportionate effort for a desktop-primary personal tool. The resolution — `overflow-x-auto` wrapper with `min-w-150` inner container — is the standard pattern for data-dense chart responsiveness and was adopted as a deliberate product decision.

**TypeScript and `react-calendar-heatmap` type mismatch**

The library's type definitions don't correctly type the `tooltipDataAttrs` prop, which accepts either an object or a function returning an object. TypeScript rejected the function form, blocking the build. The resolution was casting the return object through `unknown` as an intermediate step: `tooltipDataAttrs={(value) => ({...}) as unknown as TooltipDataAttrs}`. This satisfies ESLint's `no-explicit-any` rule while preserving type safety in the rest of the file without needing file-level `@ts-nocheck`.

**SVG accessibility and prohibited ARIA attributes**

The contribution heatmap uses SVG `<rect>` elements with `aria-label` and `tabIndex`, but SVG rects don't have implicit ARIA roles, making `aria-label` prohibited. Additionally, the wrapper `<div>` had `aria-label` without an explicit role. The resolution required two fixes: adding `role="img"` to each rect in `transformDayElement` so the ARIA attributes become valid, and adding `role="region"` to the wrapper div. The broader lesson: ARIA attribute validity depends entirely on element semantics, and SVG accessibility requires explicit role assignment to override default non-interactive semantics.

---

## 7. Outcome & Reflections on the Objective

**Lighthouse Report ([full report](https://pagespeed.web.dev/analysis/https-gabrielbolarinwa-devpulse-vercel-app/kufmuzpes6?form_factor=desktop)):**
- Performance: 95
- Accessibility: 96
- Best Practices: 100
- SEO: 100

**Build metrics:**
- Bundle size: 793.76 kB | gzip: 241.08 kB

Initial Lighthouse runs flagged prohibited ARIA attributes on SVG elements. The heatmap's `<rect>` elements used `aria-label` without implicit ARIA roles, and the wrapper div lacked a role. Post-fixes (adding `role="img"` to rects and `role="region"` to the wrapper), accessibility now meets the WCAG AA constraint. The 91 score reflects remaining low-impact warnings unrelated to the core semantic issues.

The mock/real toggle worked — development on mock data required zero component changes when switching to live API.

The Suspense-first constraint held cleanly. `Footer` uses granular `Suspense` wrappers for precise loading states rather than a single boundary — a UX tradeoff worth the overhead.

Two copy-paste bugs in `ForksReposList` reached production (wrong title, wrong count field) — proof that render tests are non-negotiable, not optional.

---

## 8. What I'd Do Differently

**Batch the monthly commits query.** Twelve parallel GraphQL requests is avoidable. GitHub's GraphQL supports field aliasing — a single query returning all 12 months is the correct implementation. The parallel approach was a pragmatic first pass, but it should have been the final one given the rate limit constraints.

**Add render and unit tests for data transformation logic.** `parseTime`, language aggregation, and heatmap flattening are all pure functions — the easiest possible things to test. The copy-paste bugs in `ForksReposList` are exactly what a basic render test would have caught before deployment. Zero test coverage on a production-grade project is indefensible.

**Refactor `useRepositoryLanguages` to parallel requests.** The `for...of` with sequential `await` was up to 20 serial API calls. `Promise.all` should have been the initial implementation, not a post-build optimization.

**Test accessibility thoroughly with automated and manual methods.** The SVG ARIA violations that reached production would have been caught by running Lighthouse continuously during development, not just at the end. Making a11y testing part of the build pipeline rather than a final check would have caught the semantic issues earlier.