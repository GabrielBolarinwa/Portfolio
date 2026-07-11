# Aether UI — Case Study
---
## 1. Project Overview

Aether UI is a faithful engineering study of the Apple iPhone 15 Pro official showcase website — one of the most technically demanding marketing experiences on the web. The project replicates the site's signature video orchestration, scroll-driven choreography, and interactive 3D product model in full, using GSAP for animation sequencing and Three.js for WebGL rendering. Built with React and Vite, it served as a deliberate exercise in pushing frontend engineering to production-grade visual fidelity without sacrificing measurable performance.

---
## 2. Objective & Constraints

The primary objective was to master advanced frontend engineering and motion design by faithfully recreating the immersive, production-grade experience of the official iPhone 15 Pro showcase — not as a superficial visual copy, but as a rigorous deconstruction of the engineering decisions behind it.

- **Bridge the gap between design and performance:** Recreate complex 3D product interactions and fluid scroll-driven animations without sacrificing Core Web Vitals.
- **Demonstrate component architecture mastery:** Build a scalable, modular codebase capable of handling heavy asset loading and intricate responsive layouts.
- **Deconstruct premium UX patterns:** Analyse and implement the micro-interactions, precise timing curves, and visual storytelling techniques used by world-class design teams to drive consumer engagement.

Replicating a cutting-edge production experience without access to original design documentation introduced the following technical constraints:

- **Asset & Performance Optimization:** WebGL rendering and high-resolution video assets can easily saturate the main thread. The constraint was to keep the experience fluid while managing media loading order and preventing memory leaks across component render cycles.
- **Cross-Browser Animation Consistency:** Browser engines handle hardware acceleration, scroll behaviour, and CSS transitions differently. Ensuring scroll-bound animations remained synchronized across Safari, Chrome, and Firefox required deliberate testing and fallback handling.
- **Responsive Motion Design:** Adapting desktop-first scroll choreography and wide-screen video presentations to smaller viewports required more than breakpoint adjustments — the hero section required entirely separate video assets per screen size to preserve visual fidelity and immersiveness across devices.

---
## 3. Architecture & Structure

**Module Breakdown**
```
├── public        - Static assets
|  ├── assets
|  |  ├── images        - SVG Icon assets
|  |  └── videos        - Video showcase files
|  ├── models        - 3D scene files
├── src
|  ├── components    - Application's reusable components
|  ├── constants      - Application mappable textual content
|  ├── index.css        - Application styles and TailwindCSS entry point
|  ├── main.jsx        - React entry point and Sentry initialization
|  └── utils
|     ├── animations.js        - Custom GSAP animation utilities
|     └── index.js        - Imports and re-exports all static assets in `public` folder
```

**Constants**
Contains mappable content configuration for dynamic text rendering across components — including video carousel copy, iPhone model variants (text, colours, and images), model size definitions for 3D rendering, and footer link text.

**Scroll Animations and Video Orchestration**
Scroll-driven video playback is gated using GSAP's `ScrollTrigger` plugin. Each video element is assigned a trigger with `toggleActions` and a `start` threshold that defines when in the scroll position the playback lifecycle begins. For example:

```javascript
gsap.to("#exploreVideo", {
  scrollTrigger: {
    trigger: "#exploreVideo",
    toggleActions: "play pause restart reverse",
    start: "-10% bottom",
  },
  onComplete: () => {
    videoRef.current.play();
  },
});
```

This pattern gates video playback to the viewport intersection point rather than page load, preventing off-screen media from consuming resources prematurely.

**Animation Utilities**
The `animations.js` file centralises two reusable GSAP utility functions:
- `animateWithGsap`: Constructs a standard scroll-triggered animation using `gsap.to` with a pre-configured `scrollTrigger` object. Accepts the animation target, tween properties, and optional scroll configuration overrides as parameters, keeping per-component animation calls concise.
- `animateWithGsapTimeline`: Constructs a timeline animation using `gsap.timeline` for composing sequenced tweens. Used specifically to animate the transition between the two iPhone model sizes. Accepts an existing timeline instance, the current model ref, its rotation value, both `ModelView` refs, and the animation properties (transforms and easing functions) as parameters.

**Highlights Video Carousel**
A self-contained GSAP-driven video carousel rendering sequentially playable videos with animated dot progress indicators and playback controls. Built as a single stateful component (`VideoCarousel`) composed inside a presentational wrapper (`Highlights`).

State is managed as a centralised object updated via functional updates, approximating a reducer pattern without `useReducer`. All video lifecycle transitions — play, pause, end, and reset — are dispatched through a single `handleProcess` function acting as an event handler and state machine:

```javascript
{
  isEnd: false,       // current video finished
  startPlay: false,   // scroll trigger fired
  videoId: 0,         // active video index
  isLastVideo: false, // reached final video
  isPlaying: false,   // play/pause toggle
}
```

```javascript
// State update reducer
function handleProcess(type, i) {
    switch (type) {
      case "video-end":       // Advances to the next video
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":      // Flags the final video as active
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
        break;
      case "video-reset":     // Restarts the carousel from the beginning
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "toggle":          // Toggles playback between play and pause
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;
      default:
        return video;
    }
  }
```

Two parallel GSAP animation systems run concurrently:
- **Carousel translation** — triggered on `videoId` change via `useGSAP`. Animates `#slider` `translateX` to bring the active video into view.
- **Progress indicator** — driven by `gsap.ticker` (per-frame), reads `video.currentTime` against a known `videoDuration` to derive progress percentage and animates dot width proportionally. The ticker is added and removed based on `isPlaying` to avoid orphaned frame callbacks.

Video playback is gated behind a `loadedData` accumulator populated by `onLoadedMetadata` events. Play/pause logic is skipped until all videos confirm readiness, preventing premature `.play()` calls on unready elements.

DOM element arrays are built via callback refs with a deduplication guard, avoiding per-element `useRef` declarations across mapped lists. Three ref arrays are maintained: `videoRef` (video elements), `videoDivRef` (dot containers), and `videoSpanRef` (dot fill indicators).

**The iPhone 15 Pro 3D Model**
The 3D model rendering pipeline is built on Three.js via its React ecosystem. The `iPhone` component was generated from `scene.glb` using the `gltfjsx` CLI utility, which converts a binary glTF model into a typed React component with material and mesh references exposed as props. This component receives the active colour and size as props to update material textures and geometry scale accordingly.

Both size variants are rendered as two separate `ModelView` instances simultaneously — each receiving its own `Three.Group()` state, rotation value, camera controls, and model configuration (colour, image). The `ModelView` component renders the 3D scene using `View` from `@react-three/drei`, configuring `OrbitControls` and `PerspectiveCamera` for interactive camera behaviour. Lighting is defined in a dedicated `Lights` component using drei primitives. Both `ModelView` instances are mounted inside a shared `Canvas` from `@react-three/fiber`, which acts as the WebGL rendering context for the React component tree.

Colour and size transitions between the two models are animated using the `animateWithGsapTimeline` utility, interpolating rotation and opacity to create seamless visual handoffs between variants.

---
## 4. Stack & Tooling

|  Tool |  Justification |
|---|---|
| React | Component model and unidirectional data flow make managing complex, interdependent animation state — across 3D models, video carousels, and scroll triggers — predictable and debuggable. The primary justification over Vue is ecosystem depth for 3D tooling: `@react-three/fiber`, `@react-three/drei`, and `gltfjsx` are React-native with no Vue equivalents of comparable maturity. |
| Vite | Default bundler for projects without a prescribed build system. Vite's native ESM dev server gives near-instant HMR which matters during heavy animation iteration. Webpack was the alternative but its configuration overhead is unjustified for a single-page project of this scale. |
| Three.js | WebGL-based 3D rendering with full support for lighting, camera controls, material systems, and glTF model loading. `@react-three/fiber` integrates Three.js natively into React's component tree, and `@react-three/drei`'s `useGLTF`, `OrbitControls`, and `View` abstractions make glTF loading and camera interaction trivial. Babylon.js was considered for its built-in scene inspector and solid glTF support, but its lack of first-class React integration made it unsuitable for a component-driven architecture. |
| GSAP | Scroll-position-gated animation sequencing via `ScrollTrigger`, per-frame progress tracking via `gsap.ticker`, and multi-element timeline choreography. Complex animation sequences are expressed as a single timeline with labelled waypoints, keeping animation logic centralized and debuggable via GSAP DevTools. |
| @react-three/fiber | React renderer for Three.js. Exposes Three.js primitives as JSX components, integrating 3D scene management directly into React's reconciler and lifecycle — eliminating manual imperative scene graph management. |
| @react-three/drei | Helper library for `@react-three/fiber`. Provides production-ready abstractions for `OrbitControls`, `PerspectiveCamera`, `useGLTF`, and `View` — removing significant boilerplate from the 3D setup without sacrificing control. |
| Sentry | Production error tracking with session replay, browser tracing, and performance profiling. |
| Tailwind CSS | Utility-first styling for rapid layout construction and responsive breakpoint management. Eliminates specificity conflicts and keeps style co-located with markup. |

---
## 5. Key Engineering Challenges

- **Reverse-Engineering the Design**
  Building a faithful replica without access to the original design documentation, Figma files, or asset manifests required extensive pre-build research. Design tokens — including spacing rhythms, colour values, animation timing curves, and typographic scales — were reconstructed entirely through visual inspection using browser DevTools and frame-by-frame video analysis. Assets including the 3D glTF model, video files, and SVG icons were sourced independently, cross-referenced against the live site, and validated for visual accuracy before a single line of implementation code was written.

- **3D Model Event Source**
  The 3D model was non-interactive on initial render — `OrbitControls` and pointer events were unresponsive until a re-render was triggered by a colour or size change. The root cause was `Canvas`'s `eventSource` prop being set to a container `div` ref that was `null` at mount time, meaning the WebGL event dispatcher had no valid DOM target to bind to until React re-rendered the component. The fix was to point `eventSource` at `document.body` — defined in `index.html` and fully available in the DOM before React's render cycle begins — ensuring the event dispatcher is bound immediately on mount, independent of component lifecycle timing.

- **Responsive Video Presentation**
  Adapting the video-heavy layout across screen sizes required more than standard breakpoint adjustments. The hero section required two entirely separate video assets — one optimised for desktop aspect ratios and one for mobile — conditionally rendered based on viewport width, since a single video could not maintain visual fidelity and composition across both contexts. Beyond the hero, sizing and positioning secondary video elements correctly across breakpoints to preserve the immersive presentation without layout overflow or aspect ratio distortion was a sustained challenge throughout the build.

---
## 6. Outcomes & Reflections on the Objective

**Lighthouse Report ([full report](https://pagespeed.web.dev/analysis/https-gabrielbolarinwa-aether-ui-vercel-app/uz579ec4gq?form_factor=desktop)):**
- Performance: 90
- Accessibility: 93
- Best Practices: 100
- SEO: 100

Bundle size: 1662.22 kB | gzip: 491.32 kB

Average INP: 176ms — within Google's "Good" threshold of under 200ms, though notably higher than a typical content site. The overhead is attributable to WebGL rendering on the main thread and GSAP ticker callbacks running concurrently during video playback, rather than JavaScript execution cost alone.

The raw bundle size of 1662.22 kB is significant — Three.js and GSAP together account for the majority of it. The gzip-compressed transfer size of 491.32 kB is more acceptable in practice, but it remains an area where targeted optimisation would yield meaningful improvement.

The application met the engineering standard it was held to — scroll-driven animations, interactive 3D model rendering, and video orchestration were all delivered at a level of fidelity that closely mirrors the reference experience, with Core Web Vitals remaining within acceptable thresholds despite the rendering complexity.

---
## 7. What I'd Do Differently

**Apply Draco compression to the glTF model**
The `scene.glb` model is loaded at full uncompressed size, contributing significantly to both initial load time and bundle weight. Draco compression — natively supported by `@react-three/drei`'s `useGLTF` — can reduce glTF geometry by up to 90% with minimal visual loss. This is the highest-impact single optimisation available to this project.

**Offload GSAP ticker callbacks to a Web Worker**
The `gsap.ticker` used to drive dot progress indicators runs on the main thread concurrently with WebGL rendering, contributing to the elevated INP. Offloading per-frame progress calculations to a Web Worker and passing updates via `postMessage` would free the main thread for rendering, reducing jank during simultaneous scroll and video playback.

**Migrate all GSAP animations to `useGSAP` with scoped cleanup**
Animations created outside the `useGSAP` hook's execution context — such as those inside event handlers or deferred callbacks — are not automatically context-safe and will not be reverted on component unmount. The correct approach is to migrate all GSAP and `ScrollTrigger` instances to `useGSAP` from `@gsap/react` with a scoped `containerRef`, which automatically reverts all animations and kills all `ScrollTrigger` instances when the component unmounts — preventing memory leaks and updates on detached nodes without requiring manual cleanup code:

```javascript
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const container = useRef();

useGSAP(() => {
  gsap.to("#exploreVideo", {
    scrollTrigger: {
      trigger: "#exploreVideo",
      toggleActions: "play pause restart reverse",
      start: "-10% bottom",
    },
  });
}, { scope: container }); // All ScrollTriggers reverted automatically on unmount
```

**Compress and lazy-load video assets**
The video files currently load eagerly. Converting to a more aggressive lazy-loading strategy — using `IntersectionObserver` to begin loading only when a video approaches the viewport — combined with format optimisation (WebM with H.265 fallback) would meaningfully reduce the initial page weight and time-to-interactive.