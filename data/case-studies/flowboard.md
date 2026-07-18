# Flowboard — Case Study

## 1. Project Overview

Flowboard is a fully client-side Kanban board application built as a portfolio project to demonstrate production-level frontend engineering. It supports multi-board management, drag-and-drop with keyboard parity, WIP limits, card activity logging, and board export. The intent was to build something with genuine feature complexity — not a todo list — at an engineering standard that could hold up to a senior review.

---

## 2. Objectives & Constraints

**Target standard:** Senior frontend engineer output — deliberate architecture, consistent patterns, and justifiable tradeoffs rather than just working code.

**Self-imposed constraints:**
- WCAG 2.1 AA compliance — keyboard-navigable DnD, aria-live regions, semantic markup throughout
- No backend — localStorage persistence via Pinia plugin, meaning state shape integrity had to be self-enforced
- Normalised flat state only — no nested card arrays inside column objects
- Maximums: six columns per board, fifty cards per column, ten boards total — enforced at the store level, not just the UI
- Single-file component discipline — stores own logic, components own presentation, no bleed between the two
- Router never imported inside stores

---

## 3. Process

The project began with a documentation-first phase before a single component was written. This produced six reference documents maintained throughout the build:

- **Tech Stack** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/flowboard-research-docs)) — full list of technologies to be  used for developing the application
- **Testing Plan** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/flowboard-research-docs/flowboard-testing-plan)) — planned out features to be tested for feature implementation accuracy.
- **Typography tokens** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/flowboard-research-docs/flowboard-typography-tokens)) — fluid type scale using `clamp()` across seven steps, ensuring text scales proportionally across viewport widths without breakpoint-specific overrides
- **Colour tokens** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/flowboard-research-docs/flowboard-colour-scheme-tokens)) — semantic CSS custom properties for both light and dark themes, covering surface, border, text, accent, and six status variants. Tokens were named by role rather than value, so swapping themes required no component changes
- **Spacing & sizing tokens** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/flowboard-research-docs/flowboard-spacing-and-sizing-tokens)) — fixed (not fluid) for component internals; card and column widths as named tokens to keep layout consistent regardless of content
- **Component inventory** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/flowboard-research-docs/flowboard-shadcn-vue-component-map)) — shadcn-vue components audited and mapped to features before installation, avoiding the pattern of installing a component library and discovering scope gaps mid-build

Feature scope was mapped against a checklist before implementation began. Architecture decisions — state shape, DnD strategy, component ownership — were resolved in planning and treated as locked during the build phase to avoid mid-implementation drift. Decisions made late tend to have downstream costs that compound; locking them early kept refactoring surface minimal.
[Flowboard — Feature List](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/flowboard-research-docs/flowboard-feature-list)
[Flowboard — Implementation Plan](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/flowboard-research-docs/flowboard-implementation-plan)

---

## 4. Architecture & Structure

**State shape — normalised flat records:**
All entities (`boards`, `columns`, `cards`) are stored as `Record<string, T>` keyed by ID. Render order is derived from `columnIds` on `Board` and `cardIds` on `Column`. This avoids deeply nested updates, makes cross-entity lookups O(1), and maps cleanly to a future API response shape. The alternative — nesting cards inside columns inside boards — was considered and rejected because it would make cross-column card moves a destructive nested update rather than a simple ID reassignment.

**DnD — two-phase pattern:**
`onDragOver` uses `move()` from `@dnd-kit/helpers` for live visual reordering — it writes to `cardIds` directly for immediate feedback. `onDragEnd` calls a side-effects-only `moveCard` action handling activity log entry, WIP limit check, `columnId` sync, and `updatedAt` stamp. The two phases never both write to `cardIds`. This separation was the resolution to a card duplication bug traced to dual writes, and is covered in detail in section 6.

**Empty column drop targets:**
Columns use `useSortable` with `CollisionPriority.Low` rather than `useDroppable`. This was discovered from reading the `@dnd-kit` MultipleLists story source directly — the prose documentation doesn't cover it. Giving columns a low-priority sortable role means cards always win collision detection when both are in range, but empty columns remain valid drop targets.

**Component ownership:**
`Card.vue` and `Column.vue` own their root `li` elements so `useSortable` is called per-instance. Lifting DnD registration into a parent `v-for` was considered and rejected because it breaks the handle ref model — each draggable needs its own element reference at setup time.

**Dialog pattern:**
`CardDetail.vue` takes a `mode` prop (`'create' | 'edit'`) — one component covers both flows with shared validation schema and field definitions. `AlertDialog` is used exclusively for destructive confirmation; `Dialog` for all editing flows. No mixing — the distinction matters for accessibility since `AlertDialog` carries a different ARIA role and focus trap behaviour.

---

## 5. Stack & Tooling

| Tool | Why | Alternatives considered |
|---|---|---|
| **Vue 3 + Composition API** | Explicit data flow, strong TypeScript ergonomics, `<script setup>` reduces boilerplate | React — rejected; personal stack preference for Vue |
| **TypeScript** | Catches interface mismatches across stores and components early | — |
| **Vite** | Fast cold start, native ESM, straightforward config | CRA — not viable for Vue |
| **Pinia** | Idiomatic Vue 3 state, first-class TypeScript, `storeToRefs` for reactivity | Vuex — superseded |
| **pinia-plugin-persistedstate** | One-liner persistence without manual `localStorage` plumbing | Manual watch + `localStorage` — rejected for verbosity |
| **@dnd-kit/vue** | Headless, accessible-by-default, keyboard DnD without custom implementation | vue-draggable-next — limited accessibility story |
| **Tailwind CSS v4** | Utility-first, CSS variable integration, no context switching | UnoCSS — less ecosystem maturity at time of build |
| **shadcn-vue** | Unstyled accessible primitives, full component ownership | Radix Vue direct — shadcn adds useful composition defaults |
| **VeeValidate + Zod** | Schema-first validation with type inference into form fields | Vuelidate — weaker TypeScript integration |
| **vue-sonner** | Minimal toast with rich-colors and theme prop | vue-toastification — heavier |
| **nanoid** | URL-safe IDs, smaller than uuid | crypto.randomUUID — less consistent browser support at time of build |
| **Vitest** | Native Vite integration, same config surface | Jest — additional transform config for ESM |
| **Cypress** | Real browser E2E, strong selector API | Playwright — viable alternative, Cypress chosen for familiarity |
| **cypress-real-events** | CDP-level hardware events — the only approach compatible with `@dnd-kit`'s custom event model | `@4tw/cypress-drag-drop` and custom `PointerEvent` — both incompatible with `@dnd-kit`'s non-native event system |

---

## 6. Key Engineering Challenges

**Card duplication on drop**
Cards were duplicating on cross-column drop. The root cause was `onDragOver` and `onDragEnd` both writing to `cardIds` — the live reorder and the committed state update were additive rather than one replacing the other. Diagnosed by logging `cardIds` at each phase. Resolution was making `moveCard` side-effects-only and removing its `cardIds` write entirely, relying on `onDragOver`'s already-correct final state.

**Empty column drop targets**
Cards couldn't be dropped into empty columns. `useDroppable` was the obvious first approach but produced unreliable hit detection — empty columns had no children to anchor collision geometry. The actual fix — `useSortable` with `CollisionPriority.Low` on the column itself — came from reading `@dnd-kit`'s own MultipleLists demo source rather than the documentation. The low collision priority ensures cards win detection when overlapping a populated column, while still registering as a valid target when the column is empty.

**WIP limit false positives on drag**
The WIP check in `moveCard` fires after `onDragOver` has already mutated `cardIds`. By that point `toColumn.cardIds.length` already includes the moved card, so the check is off by one and triggers one card early. Fix: compare against `toColumn.cardIds.length - 1`.

**Vitest worker timeouts on Windows**
The test suite was timing out sporadically during local development. Traced to Vitest's default `forks` pool conflicting with Windows process spawning behaviour. Fixed by switching to `pool: 'threads'` in Vitest config — a constraint not prominently documented, surfaced via community issue threads.

**E2E testing drag and drop**
Testing DnD against `@dnd-kit` proved unexpectedly involved. The standard Cypress approach — `@4tw/cypress-drag-drop` — failed silently, with no drag events registering. A manual fallback using the `PointerEvent` browser API to dispatch `pointerdown`, `pointermove`, and `pointerup` in sequence also failed.

The root cause is that `@dnd-kit` does not use the browser's native HTML5 Drag and Drop API. It is built entirely on custom event listeners to support pointer, touch, and keyboard input with full accessibility parity. Because it manages its own interaction state, synthetic events dispatched by test utilities don't satisfy its internal preconditions and are effectively ignored.

`cypress-real-events` resolves this by using the Chrome DevTools Protocol (CDP) to issue genuine hardware-level input events directly to the browser. These are indistinguishable from real user interaction — the full event sequence fires with correct timing, coordinates, and properties — which is precisely what `@dnd-kit`'s event model requires.

---

## 7. Outcome & Reflections on the Objective

Lighthouse Audit Outcomes ([full report](https://pagespeed.web.dev/analysis/https-gabrielbolarinwa-flowboard-vercel-app/94odc7xd29?form_factor=mobile)):

| Metric | Score |
|---|---|
| Performance | 100 |
| Accessibility | 94 |
| Best Practices | 100 |
| SEO | 92 |

**Build bundle:** 669.03 kB | gzip: 197.14 kB

**Unit test coverage (Vitest):**

| Suite | Coverage |
|---|---|
| `moveCard` | columnId sync, activity log, no-op guard, invalid cardId, invalid toColId, WIP toast, updatedAt — all passed |
| `addCard` | store addition, card limit, WIP limit, invalid columnId, activity entry — all passed |
| `deleteCard` | store deletion, orphaned reference cleanup, invalid cardId — all passed |
| `addColumn` | store addition, column limit, invalid boardId — all passed |
| `deleteColumn` | column deletion, cascade card deletion, orphan check, invalid columnId — all passed |
| `addBoard` | store addition, board limit — all passed |
| `deleteBoard` | store deletion, cascade column and card deletion, orphan check, invalid boardId — all passed |
| `moveColumn` | columnIds order, move to index 0, move to last index — all passed |
| WIP limit | limit set, limit cleared — all passed |
| Board export | board entry, column scope, card scope, createObjectURL mock, revokeObjectURL mock — all passed |
| Activity log | entry content, timestamp format — all passed |

**Qualitative:**
The engineering standard targeted was met in architecture, state management, and testing. The primary shortfall against a strict senior bar is error handling — persisted state corruption and invalid route navigation were treated as afterthoughts rather than first-class concerns. Both are addressed in the release checklist but were absent at initial completion.

---

## 8. What I'd Do Differently

**Error handling first.** Corrupted `localStorage` and missing board routes should have been specced in planning, not surfaced in review. A Pinia hydration validation plugin and a board route guard are straightforward to build but expensive to retrofit into a test suite that was written without them in scope.

**Fewer shadcn components, more custom primitives.** Some shadcn components required enough style override work that building the primitive directly would have been faster and produced cleaner markup. `Select` in particular carries meaningful DOM overhead relative to what the feature actually needs.

**Reconsider the 50-card hard cap in favour of virtual scrolling.** The current limit is a pragmatic constraint that avoids a real rendering bottleneck, but it's an architectural assumption dressed up as a product decision. A `vue-virtual-scroller` integration would remove the ceiling without a performance tradeoff — and is considerably harder to introduce once the column scroll behaviour is already established.

**E2E test data strategy.** Cypress tests that build application state entirely through the UI are slow and couple test reliability to UI behaviour. A `cy.setState()` custom command seeding Pinia directly via the app's window object would make the suite faster, more focused, and more resilient to unrelated UI changes.