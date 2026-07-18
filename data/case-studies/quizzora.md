# Quizzora — Case Study

---

## 1. Project Overview

Quizzora is a customizable, interactive quiz application that lets users configure a session by topic, difficulty, and question count before taking a timed quiz. It's a ground-up rebuild of an earlier version — the original had questions hardcoded in HTML, answer state managed by DOM class inspection, and answers exposed in page source. The rebuild's intent wasn't to patch those issues but to restructure the architecture so that none of them could exist in the first place.

---

## 2. Objective & Constraints

The standard I held myself to was: every decision should be defensible. The original version worked, but for the wrong reasons. The rebuild had to fix that structurally, not symptomatically.

Self-imposed constraints:
- No state management library — all answer state handled in memory, in-module
- No backend — OpenTDB as the sole data source
- TypeScript throughout, with meaningful types (not `any` escapes)
- WCAG 2.1 AA accessibility compliance integrated during development, not audited afterward
- Zero UI component libraries — all UI written from scratch
- Two pages maximum — any extra pages would be padding for a utility-focused application
- Minimal UI — directed toward clarity and usability, not visual complexity

---

## 3. Process

Before writing any code, the project went through a structured planning phase documented in GitBook.

[Quizzora Application Plan](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quizzora-application-plan-two-page-architecture)

**Stack research**

Vanilla TypeScript was the working assumption from the start, but React and Vue were evaluated before committing. React added a router, component model, and state management overhead with no meaningful return for a two-page utility app — the complexity-to-value ratio didn't hold up across any evaluation axis: performance, accessibility, or UX. Vue was lighter but still introduced setup overhead that wasn't justified at this scope. Vanilla TypeScript handled the full feature set without it.

For styling, Tailwind CSS was chosen for the DX advantage — utility classes co-located with markup, a design token system ready to extend, and v4's CSS-first config which aligned directly with the custom property theming approach. Vite was chosen as the bundler for its minimal config, native ESM support, and first-class PWA plugin support — service worker registration and manifest handling that would otherwise require manual configuration. OpenTDB was chosen as the data source for its breadth of trivia categories and consistent, structured API responses. Lucide was chosen for its tree-shakeable, highly customizable icon set — FontAwesome was considered but loads all icons and style variants regardless of usage and offers limited per-icon customization by comparison.

[Quizzora GitBook Tech Stack Research Document](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quizzora-tech-stack-documentation)

**Feature mapping**

The feature set was defined around one goal: the best quiz-taking experience possible within the constraints of a no-backend, two-page application. Core features mapped before implementation:

- **Quiz configuration** — category, difficulty, and question count via a form that queries OpenTDB with the specified parameters
- **Adaptive timer** — total time calculated from a difficulty multiplier and question count, not a flat countdown
- **Non-linear navigation** — jump to any question, move forward or back, with visual indicators for answered, unanswered, current, correct, and incorrect states
- **Answer persistence** — selections survive question switching without a backend or form submission
- **Submission confirmation** — submit pauses the timer and shows answered vs total count before committing
- **Result breakdown** — score, percentage, time taken, and an expandable per-question breakdown with correct and user-selected answers shown for incorrect responses
- **Last result widget** — persisted to `localStorage`, surfaced on the homepage as a dismissable tab with a full breakdown modal
- **Keyboard shortcuts** — full navigation, submission, and dismissal mapped to keyboard for accessibility

[Quizzora Feature List](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quizzora-feature-list)
[Quizzora Feature Implementation Plan](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quiz-app-logic-implementation-reference)

**UI system definition**

Three system documents were produced before any UI was built.

The colour scheme was defined around neutrality — no brand tilt — with every token verified for sufficient contrast ratios. Tokens covered the full range of usage across both pages, light and dark variants included.
[Quizzora — Colour Scheme Specification](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quizzora-color-scheme)

The typography scale is a custom fluid scale built manually with `clamp()` functions, structured similarly to a Major Third (1.25×) progression. This ensures proportional scaling across device sizes without breakpoint-specific overrides.
[Quizzora — Typography Specification](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quizzora-typography-specification)

The spacing and sizing specification defines gap and padding values across components and includes interactive sizing targets to meet minimum touch and click target requirements.
[Quizzora — Spacing and Sizing Specification](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quizzora-spacing-and-sizing-specification)

With those three documents in place, each page's UI was mapped component by component, with design tokens assigned per element before implementation began.
[Quizzora Homepage — UI Implementation Plan](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quizzora-homepage-ui-implementation-plan)
[Quizzora Quiz Page — UI Implementation Plan](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/quizzora-quiz-page-ui-implementation-plan)

---

## 4. Architecture & Structure

**Module breakdown**

```
src/
├── home.ts         — Landing page logic (theme switching, last result widget, animations)
├── quiz.ts         — QuizSession class, DOM refs, API fetch
├── events.ts       — Quiz start flow, option selection, event binding
├── session.ts      — Singleton session instance and setter
├── types/index.ts  — Shared TypeScript interfaces and types
├── utils/index.ts  — Shared utilities (decode, timer calc, event listener helper)
└── utils/home.ts   — Home-specific utilities (trapFocus, decode)
```

The app has two pages (`index.html`, `quiz.html`). Each page has a corresponding entry point, with shared logic extracted into utilities and types. The split was intentional — quiz logic has no business running on the landing page, and keeping them separate keeps the dependency graph shallow.

**State management**

Answer state lives in a `Map<number, string>` on the `QuizSession` class, keyed by question index. Moving state out of the DOM entirely made it predictable and independent of browser rendering behavior. On every question render, the stored answer is explicitly restored:

```ts
input.checked = userAnswer === option;
```

`map.size` gives an accurate answered count without iteration, used directly by the progress bar and confirmation modal. Compiling results at submission is a single `Map` traversal.

**Session singleton**

`session.ts` exports a single `QuizSession | null` instance and a `setSession` setter. This gives `events.ts` and keyboard handlers access to the active session without prop drilling or global mutation — a lightweight alternative to a shared store for a two-page app with no component tree.

**`QuizSession` as a class**

The quiz has a real lifecycle: constructed from session config on quiz form submission, timer started on rules confirmation, paused on proposed submission, and destroyed through one of three exits — rules cancellation, submission confirmation, or timer end which triggers an `autoSubmit` flow. Rather than exposing methods for external code to call in any order, `QuizSession` orchestrates every required UI update, event listener change, and state transition internally — the lifecycle is enforced, not implicit.

**Quiz timing**

Timer duration is calculated from difficulty and question count rather than set to a flat value:

```typescript
const BASE_TIME: Record<Difficulty, number> = {
  easy: 20,
  medium: 25,
  hard: 30
}

const DIFFICULTY_MULTIPLIER: Record<Difficulty, number> = {
  easy: 1,
  medium: 1.25,
  hard: 1.5
}

function calculateTimer(difficulty: Difficulty, questionCount: number): number {
  return Math.round(questionCount * BASE_TIME[difficulty] * DIFFICULTY_MULTIPLIER[difficulty])
}

// e.g. 10 hard questions: 10 × 30 × 1.5 = 450s (7m 30s)
```

This means a 10-question easy quiz and a 10-question hard quiz don't share a timer — time pressure scales with what the session actually demands.

---

## 5. Stack & Tooling

| Tool | Why |
|---|---|
| **Vanilla TypeScript** | Compiler-enforced contracts across modules. The value isn't having types — it's the compiler catching incorrect assumptions before runtime. React was considered but the complexity-to-value ratio didn't hold — for a two-page utility app, adding a router, component model, and state management layer would have been overhead without payoff. |
| **Vite** | Fast cold starts and native ESM. No meaningful alternative was considered — for a project this size, Webpack's config overhead isn't justified. |
| **Tailwind CSS v4** | Utility-first layout and spacing. The v4 CSS-first config is the specific differentiator — it aligns with the custom property theming approach without requiring a JS config file, unlike v3. |
| **Custom CSS properties** | `--primary`, `--surface-1`, `--border`, etc. toggled by body class (`light`/`dark`), falling back to `prefers-color-scheme`. Theme resolves before JS executes — no flash of incorrect theme on load. Tailwind alone can't do this without either JS or shipping both theme variants in the initial payload. |
| **OpenTDB API** | Removes the need for a backend entirely. The trade-off is no control over question quality, rate limits, and occasional downtime. A self-hosted question set was considered but adds a maintenance surface that isn't justified for a portfolio project. |
| **Lucide** | Tree-shakeable icon set with consistent stroke weight and high per-icon customizability. FontAwesome was considered but loads all icons and style variants regardless of usage. |
| **Vercel** | Zero-config deployment for static sites. No meaningful alternative considered at this scale. |
| **Google Fonts** | Montserrat, Inter, Open Sans, Lato. `font-display: swap` on all faces to avoid invisible text during load. |

---

## 6. Key Engineering Challenges

**Radio state loss on navigation**
The symptom was present in the original application: selecting an answer, navigating away, and returning showed the question as unanswered. The original codebase addressed it by wrapping options in a `<form>` tag — it worked, but for reasons that weren't understood at the time. The actual root cause was that `display: none` on an input causes some browsers to drop its checked state — the DOM was being used as a state store, not just a view. Reframing it that way made the fix obvious: move state out of the DOM entirely and restore it explicitly on every render.

**Stacking `keydown` listeners**
Keyboard handlers were firing multiple times per keypress, compounding with each quiz question. The symptom pointed toward duplicate logic, but the cause was listener accumulation — anonymous functions were being passed to `addEventListener` on a repeatable code path, giving `removeEventListener` nothing to match against. Named function references fixed it, but the instructive part was that the bug was invisible until the interaction count got high enough to notice the duplication.

**Touch devices and tooltips**
CSS `focus-within` doesn't fire on tap on most mobile browsers — it requires an element that actually receives focus, which most non-input elements don't on touch. Replacing it with a click toggle and a `pointerdown` outside-click dismiss made the behavior consistent across input types without a media query branch.

**Focus trapping in modals**
The `trapFocus` utility needed to handle Tab from the last focusable element (wrap to first), Shift+Tab from the first (wrap to last), and modals where the focusable set changes after injection. The edge cases aren't hard individually, but getting the query selector right for all focusable element types — including disabled elements that should be excluded — was the time sink.

---

## 7. Outcome & Reflections on the Objective

The rebuild met the structural standard it set. The specific bugs from the original — state loss on navigation, answers exposed in source, no scalability without touching HTML — are resolved at the architectural level, not patched over. Accessibility attributes (`aria-live`, `role="dialog"`, `aria-modal`, `trapFocus`) were integrated during development.

What's still short of the bar:
- Non-null assertions (`!`) are used on certain DOM references. The selectors are tested and stable, but that's a runtime argument — it doesn't satisfy the TypeScript contract, and the compiler can't verify it
- `quiz.ts` handles rendering, DOM refs, class definition, and API fetch — a single-file responsibility problem that accumulated as features were added
- No API error handling beyond `window.alert`, and OpenTDB's `response_code` isn't checked — a silent failure on no-results that was known at ship time
- The quiz page constrains all session UI inside a single tall card — on mobile this pushes navigation buttons below the fold inside a scrollable container, creating a scroll-within-scroll pattern that competes with the page scroll and puts primary controls out of thumb reach.

Lighthouse outcomes ([full report](https://pagespeed.web.dev/analysis/https-gabrielbolarinwa-quizzora-vercel-app/b9tqwg4a89?form_factor=desktop)):

- **Performance: 71 → 100** — enabled text compression via Vercel, reduced and converted images to WebP
- **Accessibility: 90 → 100** — added `aria-label` to icon-only controls, improved footer text contrast ratio
- **SEO: 95 → 100** — added meta description tags

---

## 8. What I'd Do Differently

**Split `quiz.ts` from the start.** It grew into doing too much as the feature set expanded — rendering, DOM refs, session class definition, and API fetch in one file. The cost of splitting it retroactively is higher than enforcing the boundary upfront would have been.

**Stricter TypeScript config from day one.** `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` would have caught the non-null assertion habit before it became a pattern. Enabling them retroactively means auditing code that already passed review — the compiler becomes adversarial instead of collaborative.

**Error handling before shipping, not after.** The `response_code` gap and `window.alert` fallback were known issues at the point of deployment. Deferring them to a later version was the wrong call — error states are part of the feature surface, not a patch. Shipping with known silent failures sets a precedent for the codebase.

**Question transition animations.** The current implementation has no visual transition between questions — navigation is an immediate re-render. An entrance animation per question would reinforce the sense of progression and make the quiz feel more considered. This was descoped during development and is the most noticeable UX gap in the final product.

**Rearchitect the quiz page layout.** The single tall card is the wrong container for a multi-component session. The better layout surfaces each concern independently: a fixed top bar for the timer, a metadata strip for category and difficulty, the question and options as the main content area, and the navigation button grid directly below the options. On mobile, Previous/Next become a fixed footer, so primary navigation stays in thumb range regardless of scroll position. On larger screens, the metadata, question, options, and navigation grid sit side by side in a two-column layout with Previous, Next, and Submit stacked below.