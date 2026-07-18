# Horizons — Case Study
---
## 1. Project Overview

Horizons is a responsive weather application built with Vue 3, TypeScript, and Pinia, consuming the WeatherAPI.com forecast endpoint to surface real-time meteorological data across three display formats — current conditions, hourly breakdown, and a 2-day forecast. Users can retrieve weather by city search or browser geolocation, toggle between Celsius and Fahrenheit, and switch between light, dark, and system-matched themes. The project was a deliberate exercise in composable-driven architecture, third-party API integration, and accessible UI design using Vue's Composition API without a dedicated backend.

---
## 2. Objective & Constraints

The standard of this project was to deliver multiple weather data formats through a clean, accessible, and responsive UI with reliable state management and clear user-facing feedback across all application states.

Objectives:
- Build a responsive, accessible interface for surfacing weather data across current, hourly, and forecast contexts.
- Display contextually relevant metrics per view — temperature, conditions, visibility, wind speed, pressure, humidity, UV index, and chance of rain.
- Implement dual input methods (city search and browser geolocation) with appropriate accuracy handling.
- Persist user preferences (theme and temperature unit) across sessions without a backend.
- Keep the user informed at all times through loading states, error toasts, and graceful API failure handling.

Constraints:
- No dedicated backend — the WeatherAPI.com key is exposed at the client via `import.meta.env`, meaning API key security relies entirely on environment variable scoping and platform-level secret management rather than a server-side proxy.
- WeatherAPI.com returns HTTP `200` with an `error` object in the body for invalid queries (e.g. unknown city, empty input) rather than a proper HTTP error code. Error handling had to account for this non-standard response pattern explicitly.
- Geolocation accuracy is browser and device dependent — accuracy below 500 metres cannot be guaranteed, requiring a threshold check and user notification for low-accuracy positions.

---
## 3. Process

The project began with a documentation-first phase before a single component was written. This produced three reference documents maintained throughout the build:

- **Typography tokens** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/horizons/typography-specifications)) — fluid type scale using `clamp()` across seven steps, ensuring text scales proportionally across viewport widths without breakpoint-specific overrides.
- **Colour tokens** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/horizons)) — semantic CSS custom properties for both light and dark themes, covering surface, border, text, accent, and status variants. Tokens were named by role rather than value, so theme switching required no component-level changes.
- **Spacing & sizing tokens** ([reference](https://gabrielbolarinwa.gitbook.io/gabrielbolarinwa-docs/project-overview/horizons/spacing-and-sizing-specifications)) — fixed scale for component internals with named tokens for card and column widths to keep layout consistent regardless of content length.

This pre-build documentation phase established a consistent visual language before implementation began, reducing design drift across components.

---
## 4. Architecture & Structure

**Module Breakdown**
```
src/
├── components/
│   ├── CurrentWeather.vue    - Current conditions card (temp, wind, pressure, humidity, visibility)
│   ├── Header.vue            - App branding, theme toggle, temperature unit toggle
│   ├── HourlyWeather.vue     - Swiper-based hourly forecast slider
│   ├── Loader.vue            - Full-screen loading state
│   ├── Skeleton.vue          - Content skeleton placeholder
│   ├── Weather.vue           - Weather data layout wrapper (composes the three data views)
│   └── WeatherForm.vue       - City search input and current location trigger
├── composables/
│   ├── useFetchWeather.ts    - Fetch composable with AbortController timeout handling
│   └── useGeolocation.ts     - Promise-wrapped Geolocation API composable
├── stores/
│   ├── app.ts                - AppStore: theme and temperature unit state with persistence
│   └── weather.ts            - WeatherStore: weather data, loading state, fetch actions
├── types/
│   └── index.ts              - Full TypeScript type definitions for WeatherAPI response shape
├── utils/
│   └── index.ts              - Date formatting utilities and temperature colour mapping
├── App.vue                   - Root component: theme watcher, layout shell, Toaster mount
├── main.ts                   - App entry: Pinia + pinia-plugin-persistedstate + Sentry init
└── style.css                 - Design token definitions, resets, and global utility classes
```

**Data Flow**
```
WeatherForm (user input / geolocation trigger)
  → WeatherStore action (getCityWeatherData / getCurrLocationWeather)
    → useFetchWeather composable (AbortController-gated fetch)
      → WeatherAPI.com forecast endpoint
    → weatherData ref updated in WeatherStore
      → Components consume via storeToRefs(useWeatherStore())
```

**Weather Fetch Composable**
`useFetchWeather.ts` accepts a location string and timeout value, constructs the WeatherAPI.com forecast URL using the environment-scoped API key, and calls `fetch` with an `AbortController` signal. A `setTimeout` fires `controller.abort()` if the request exceeds the timeout threshold, triggering an abort error that the calling store catches and handles. On success, the raw `Response` object is returned to the store for JSON parsing and status inspection.

**Geolocation Composable**
`useGeolocation.ts` wraps `navigator.geolocation.getCurrentPosition` — which uses a callback interface, not Promises — in an explicit `Promise`. This allows the store to `await` the geolocation result inline within an `async` action, keeping the loading state lifecycle synchronous and predictable. The promise rejects if `"geolocation" in navigator` is false (unsupported browser) or if the position query fails, with the rejection reason propagated to the store's catch block for error classification.

**Weather fetch by city search**
`WeatherForm` calls `getCityWeatherData` on form submission with the input value. The store sets `loading` to `true`, calls `useFetchWeather`, then inspects the response status. Because WeatherAPI.com returns `200` for invalid queries rather than a proper HTTP error, the store explicitly checks `response.status === 400` and reads the `error.code` from the parsed body to dispatch the appropriate toast — distinguishing between empty input (1003), location not found (1006), and internal API errors (9999). On a clean response, `weatherData` is set and `loading` is cleared.

**Weather fetch by geolocation**
`getCurrLocationWeather` awaits `useCurrentLocation()`, checks the returned position's `accuracy` property against a 500m threshold (warning the user via toast if exceeded), constructs a coordinate string (`"lat lon"`), and passes it to `useFetchWeather`. The same status-code inspection pattern applies for the API response. Two independent `try/catch` blocks are used — one scoped to the geolocation query (handling permission denied, position unavailable, and timeout via `GeolocationPositionError.code`) and a nested one scoped to the weather fetch — keeping error classification clean and preventing location errors from masking API errors.

**AppStore — Theme & Temperature Unit**
Theme state cycles through `"system" → "light" → "dark"` via `toggleTheme`. The active theme is applied to the document root using a `watch` on the theme ref in `App.vue`, which sets `document.documentElement.setAttribute("data-theme", theme)` immediately and on every change. The `style.css` defines `[data-theme="light"]` and `[data-theme="dark"]` attribute selectors alongside `@media (prefers-color-scheme)` fallbacks, so the system default is respected before any user toggle.

Temperature unit cycles between `"celsius"` and `"fahrenheit"` via `toggleTemperatureUnit`. Since WeatherAPI.com returns both `temp_c` and `temp_f` (and equivalents for feels-like, min/max, etc.) in every response, unit switching requires no re-fetch — components read the active unit from `storeToRefs(useAppStore())` and conditionally render the appropriate value. Both `theme` and `temperatureUnit` are persisted to `localStorage` via `pinia-plugin-persistedstate`, so user preferences survive page refreshes.

**Component Store Access**
Components access store state reactively via `storeToRefs()` — for example, `CurrentWeather.vue` destructures `weatherData` from `storeToRefs(useWeatherStore())` and `temperatureUnit` from `storeToRefs(useAppStore())`. This preserves Vue's reactivity system across store boundaries without requiring prop drilling or provide/inject.

---
## 5. Stack & Tooling

| Tool | Justification |
|---|---|
| Vue 3 | Composition API composables map cleanly to the two primary data concerns (geolocation and weather fetching), keeping each concern isolated and independently testable. For a focused single-page data application, Vue's reactivity model and lower ecosystem overhead are a better fit than React's additional abstraction layers without meaningful benefit at this scale. |
| TypeScript | Full type coverage on the WeatherAPI.com response shape — modelled across `CurrentWeather`, `HourlyData`, `ForecastDay`, `AstroData`, and `Location` interfaces — catches property access errors at compile time and makes working with a deeply nested third-party API response significantly safer. |
| Vite | Default build tool for projects without a prescribed bundler. Native ESM dev server provides near-instant HMR, which matters during iterative UI work. Webpack was the alternative but its configuration overhead is unjustified for a single-page application at this scale. |
| Pinia | Vue's officially recommended state management solution. The Composition API store syntax mirrors component setup blocks, keeping the mental model consistent. Vuex was the predecessor but is now considered legacy in the Vue ecosystem and offers no advantage over Pinia for new projects. |
| `pinia-plugin-persistedstate` | Synchronises nominated Pinia stores to `localStorage` with a single `{ persist: true }` option, avoiding manual `watch` + `localStorage.setItem` wiring for theme and temperature unit preferences. |
| WeatherAPI.com | Provides current conditions, hourly data, and multi-day forecast in a single endpoint call (`/forecast.json`), eliminating the need for multiple requests per render. Both Celsius and Fahrenheit values are returned simultaneously, enabling client-side unit switching without re-fetching. |
| Swiper.js | Accessible, touch-friendly slider for the hourly weather view. Built-in `A11y`, `Navigation`, `Pagination`, and `Autoplay` modules cover the full interaction surface without custom implementation. |
| vue-sonner | Accessible toast notification system for user-facing feedback on errors, warnings, and request timeouts. |
| Lucide Vue | Consistent icon set with stroke-based design, full customisability, and no licensing overhead. |
| Sentry | Production error tracking with session replay, browser tracing, and performance profiling. |

---
## 6. Key Engineering Challenges

- **Geolocation API Promise Wrapping**
  `navigator.geolocation.getCurrentPosition` is callback-based — it does not return a Promise natively. Using it directly inside an `async` store action meant the action would resolve before the position was returned, causing the loading state to be cleared prematurely. Wrapping it in an explicit `Promise` constructor — resolving on success and rejecting on error — allowed the store to `await` the geolocation result like any other async operation, keeping the loading lifecycle accurate and the error handling consistent with the rest of the fetch flow.

- **Non-Standard API Error Responses**
  WeatherAPI.com does not return HTTP error status codes for invalid queries — a search for an unknown city returns `200 OK` with an `error` object in the body containing a numeric code. Standard response handling (checking `response.ok`) would treat these as successes, silently setting `weatherData` to a malformed object. The fix was to explicitly check `response.status === 400` before parsing the body, then read `error.code` from the parsed JSON to dispatch the appropriate user-facing toast for each failure mode.

- **API Key Exposure Without a Backend Proxy**
  With no server-side layer, the WeatherAPI.com key is embedded in the client bundle via `import.meta.env.VITE_API_KEY`. While environment variables are excluded from source control via `.env`, the key remains readable in browser network requests. This is an accepted constraint at the project's scale, but it represents a known security gap that a serverless proxy function would close.

---
## 7. Outcomes & Reflections on the Objective

**Lighthouse Report ([full report](https://pagespeed.web.dev/analysis/https-gabrielbolarinwa-horizons-vercel-app/h8ncq8cdak?form_factor=desktop)):**
- Performance: 99
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Bundle size: 536.89 kB | gzip: 171.26 kB

The application met the standard it was held to — both input methods (search and geolocation) function reliably across browsers, all three weather data formats are surfaced clearly, user preferences persist across sessions, and every application state (loading, error, empty, populated) communicates appropriately to the user.

---
## 8. What I'd Do Differently

**Proxy the API key through a serverless function**
The current implementation exposes the WeatherAPI.com key in client-side network requests. A thin Vercel or Netlify serverless function acting as a proxy would keep the key entirely server-side, accepting the location query from the client and forwarding the response — eliminating the exposure without requiring a full backend.

**Reset loading state on all error paths**
The `loading` ref is set to `false` at the end of the happy path in `getCityWeatherData`, but if any `catch` block returns early, `loading` remains `true` indefinitely, leaving the UI stuck in a loading state. A `finally` block — or a consistent `loading.value = false` at the start of every `catch` — would guarantee the loading state is always cleared regardless of outcome.

**Add an empty state for initial load**
On first open, before any weather has been requested, the application renders only the header and search form with no contextual prompt. An illustrated empty state with a prompt directing users to search or use their current location would reduce ambiguity and improve first-impression UX.

**Refactor error handling into a shared utility**
Both `getCityWeatherData` and `getCurrLocationWeather` duplicate the same `response.status === 400` inspection and `error.code` switch logic. Extracting this into a shared `handleWeatherAPIError(response)` utility would eliminate the duplication and make future API error code additions a single-point change.