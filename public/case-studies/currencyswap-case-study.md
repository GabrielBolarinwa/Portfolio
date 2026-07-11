# CurrencySwap — Case Study

---

## 1. Project Overview

CurrencySwap is a client-side currency converter supporting over 300 world and digital currencies, built with vanilla JavaScript, HTML, and CSS. The intent was to produce a polished, production-grade frontend application that demonstrates UX thinking and engineering fundamentals — without the structural overhead of a framework — as one deliberate piece of a broader frontend portfolio.

---

## 2. Objective & Constraints

**Engineering standard targeted:** A senior-level frontend implementation — readable, accessible, performant, and maintainable — evaluated on the merits of its decisions, not on the volume of tooling involved.

**Self-imposed constraints:**

- **Zero runtime dependencies** — No UI frameworks, no utility libraries. Every behaviour is implemented natively, with each decision justified on its own terms.
- **WCAG 2.1 AA compliance** — Semantic HTML, offscreen labels, `aria-live` regions, `aria-busy` state management, focus ring preservation, and `prefers-reduced-motion` support.
- **Offline capability** — The application must remain functional with cached data when the user loses connectivity, with clear, honest feedback when it cannot.
- **Theme fidelity** — System preference respected by default (`prefers-color-scheme`), with a manual override cycle (Light → Dark → Auto) persisted across sessions.

---

## 3. Process

The build began with a planning phase covering feature scope, UI system definition, and API evaluation before a line of code was written.

**UI system definition** produced three specification documents — typography, colour tokens, and spacing/sizing — which were finalised before implementation. Key decisions from that process:

- Inter and IBM Plex Mono chosen for their functional clarity; IBM Plex Mono specifically for `tabular-nums` layout stability on the output display
- A continuous spacing scale (`--space-1` through `--space-20`) with no gaps, preventing ad-hoc values in the stylesheet
- Shadow tokens named semantically (`--shadow-card`, `--shadow-glow`) rather than by colour role
- Dual theming implemented via `prefers-color-scheme` media queries plus explicit `body.light` / `body.dark` class overrides — no JavaScript required for the default system-preference path

**API evaluation:** The fawazahmed0 Currency API was selected for its zero-authentication, CDN-delivered JSON, and broad currency coverage including crypto. The primary tradeoff accepted was that rate data is updated daily rather than in real time — mitigated by surfacing the fetch timestamp to the user.

[CurrencySwap — Typography Specification](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/currencyswap-research-docs)
[CurrencySwap — Color Scheme Specification](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/currencyswap-research-docs/currencyswap-color-scheme-specification)
[CurrencySwap — Spacing & Sizing Specification](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/currencyswap-research-docs/currencyswap-spacing-and-sizing-specification)

---

## 4. Architecture & Structure

```
src/
├── script.js   — All application logic
├── style.css   — Design system + component styles
├── codes.js    — Currency code → display name map
index.html      — Application shell
```

**State management:** Kept intentionally flat. `currencyData` is a module-level object holding all cached rate data in memory. `localStorage` handles cross-session persistence for the selected currency pair, last-used amount, theme preference, and individual rate caches keyed by currency code.

**Data flow:**
1. On load, `init()` populates dropdowns from `codes.js`, reads `localStorage` for any cached rates, and fetches only the `fromCurr` rate if not already cached (lazy fetch strategy)
2. On user interaction, `getExchangeRate()` reads from the in-memory `currencyData` object — no network call required unless the rate for a new base currency is missing
3. Rate refreshes are user-initiated via the refresh button, which triggers `getAllRates()` and updates both the cache and the display

**Event handling:** Listeners are registered directly on the `<input>` and `<select>` elements rather than delegated through form wrapper children, ensuring `change` events are captured reliably.

**Debounce:** The amount `input` event is debounced at 300ms using a native `setTimeout`/`clearTimeout` pattern. Lodash was evaluated and ruled out — for a single trailing debounce with no cancellation or leading-edge requirement, the native pattern is functionally identical and adding a dependency to solve a two-line problem is the wrong call.

---

## 5. Stack & Tooling

| Tool | Role | Justification |
|---|---|---|
| **Vanilla JS (ES Modules)** | Application logic | The application's state is simple and local. A framework would introduce abstraction without solving any problem present in this scope. |
| **Vite** | Dev server + bundler | Fast HMR, native ESM support, minimal config. Considered Parcel — Vite's ecosystem maturity and explicit config model were preferable. |
| **Lucide** | Icon library | Tree-shakeable, consistent stroke-based SVG system. Used via `createIcons()` to avoid bundling unused icons. |
| **Google Fonts** | Font delivery | High speed font library with `font-display: swap` on all faces to prevent invisible text during load   |
| **fawazahmed0 Currency API** | Rate data | Zero-auth, CDN-delivered, 300+ currencies including crypto. Daily update cadence accepted as a known tradeoff. |
| **localStorage** | Client-side persistence | Rate cache, user preferences, last-used pair. No server-side session required. |

---

## 6. Key Engineering Challenges

**Rate caching and staleness**

The API returns a `date` field accurate only to the day, which is insufficient for communicating freshness to a user. The solution was to record `Date.now()` at the point of fetch and store it separately from the rate data. The displayed message ("rates fetched X hours ago") reflects when _the application_ last populated its cache, not when the API last updated — a meaningful distinction when a user is deciding whether to refresh.

**Lazy fetching vs. bulk prefetch**

An early implementation fetched every currency in `codes.js` on load — potentially 300+ sequential requests. This was rearchitected to fetch only the `fromCurr` rate on init, since a single base currency response contains all cross-rates needed for the current conversion. Additional base currencies are fetched on demand when the user changes the `from` select. This reduced initial network activity to a single request in the common case.

**Theme implementation without flash**

The three-state theme toggle (Light → Dark → Auto) had to avoid a flash of the wrong theme on load. `setTheme()` is called synchronously from `localStorage` before any rendering, and the `body.light` / `body.dark` class approach means the CSS handles theming without waiting for JavaScript to repaint.

**`e` character in number inputs**

`type="number"` inputs accept `e` for scientific notation (e.g. `1e3`), which produces valid DOM values but semantically invalid currency amounts. The check was consolidated into `handleFormElementsChange` so it applies regardless of which input path triggered the recalculation.

**Offline UX**

`navigator.onLine` returns `true` even without real connectivity, so it can't be relied upon for anything beyond triggering an initial warning. The offline/online `window` event listeners handle the real connectivity state during the session, and cached data is surfaced gracefully when the network is unavailable.

---

## 7. Outcome & Reflections on the Objective

Lighthouse audit ([full report](https://pagespeed.web.dev/analysis/https-gabrielbolarinwa-currencyswap-vercel-app/pf6putviqa?form_factor=desktop)):
Performance: 99
Accessibility: 96 (improved from 90 after adding missing `aria-label` attributes to icon-only button elements)
Best Practices: 96
SEO: 100

Bundle size: 36.98 kB | gzip: 12.64 kB

The application meets the constraints set in Section 2. WCAG 2.1 AA targets were addressed structurally — semantic elements, offscreen labels, live regions, busy states, and reduced-motion support — rather than as a post-hoc checklist pass. The zero-dependency constraint held; every behaviour has a native equivalent that serves the need without the overhead.

---

## 8. What I'd Do Differently

**Rate data source.** The fawazahmed0 API's daily update cadence is a real limitation for users who need intraday accuracy. A more robust implementation would integrate a secondary source with a higher update frequency, with the current API as a fallback.

**Output skeleton state.** The `<output>` element initially displayed "Loading..." as raw text during data fetch. The right approach from the start would have been a CSS shimmer skeleton — it communicates a loading state without text that reads as an unfinished UI string.

**`codes.js` maintenance.** Several entries have empty display names (`eurc`, `kas`, `lunc`, etc.) because the API supports currencies that don't yet have widely accepted display names. These currently render as blank text in the dropdown. A better approach would be to filter them out of the populated list and maintain a separate registry for currencies pending name resolution.

**Error boundary on `singleFromCurrency`.** The primary null check in `getExchangeRate()` guarded the main rate but left `singleFromCurrency` — used for the inverse rate display — unguarded. A missing reverse pair in the cache would silently resolve to `0.00`, which is a worse failure than an explicit error. That guard should have been there from the start.