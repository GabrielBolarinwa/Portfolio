import {
  SiAngular,
  SiCss,
  SiCypress,
  SiFigma,
  SiGsap,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLunacy,
  SiReact,
  SiShadcnui,
  SiThreedotjs,
  SiTypescript,
  SiVite,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";

export const paragraph1 =
  "I'm Gabriel Bolarinwa, a self-taught frontend developer based in Nigeria with a focus on building performant, accessible, and visually deliberate web experiences. My path into software wasn't conventional — I started exploring development in 2022 alongside a demanding academic schedule and without the hardware to go deep. In 2025, I committed fully: new machine, structured roadmap, and a clear standard for what I expected of my own work.";

export const paragraph2 =
  "Roughly 90% of what I know came from YouTube, documentation, and deliberate practice — with structured learning from a full frontend certification course filling in the gaps. That self-directed nature shaped how I work: I research before I build, I document before I code, and I hold my output to a production standard regardless of whether a project has a client or a deadline.";

export const paragraph3 =
  "Every project in this portfolio was built as a self-imposed engineering challenge — not to fill a resume, but to close the gap between where my skills were and the standard I was holding myself to. The case studies reflect that: deliberate stack choices, honest trade-offs, and real post-mortems on what I'd change.";

export const tools = [
  {
    tool: "Shadcn/UI",
    icon: SiShadcnui,
  },
  {
    tool: "Cypress",
    icon: SiCypress,
  },
  {
    tool: "Jest",
    icon: SiJest,
  },
  {
    tool: "Vite",
    icon: SiVite,
  },
  {
    tool: "Figma",
    icon: SiFigma,
  },
  {
    tool: "Lunacy",
    icon: SiLunacy,
  },
  {
    tool: "GSAP",
    icon: SiGsap,
  },
  {
    tool: "Three.js",
    icon: SiThreedotjs,
  },
];

export const waecNarrative = {
  year: "2021 - 2024",
  detail: "Secondary education completion",
  text: "Completed the West African Senior School Certificate Examination with notable performance in mathematics and data processing — subjects that laid an early foundation for logical and computational thinking.",
};

export const udemyNarrative = {
  detail: "Instructor: Supriyo ∙ Completed 2024",
  text: "A comprehensive frontend certification course covering the full modern frontend stack — from core HTML, CSS, and JavaScript fundamentals through to frameworks, testing, and deployment. Served as the structured complement to three years of self-directed learning.",
};

export const universityNarrative = {
  year: "2025 — Present",
  text: "Currently pursuing a Bachelor of Science in Computer Science, building academic rigour in the theoretical foundations — algorithms, data structures, systems — that underpin production-grade engineering.",
};
export const educationItems = [
  {
    year: "2021 — 2024",
    title: "WAEC — West African Senior School Certificate",
    detail: "Secondary education completion",
    text: "Completed the West African Senior School Certificate Examination with notable performance in mathematics and data processing — subjects that laid an early foundation for logical and computational thinking.",
  },
  {
    year: "2024",
    title: "Udemy — The Ultimate Frontend Development Course",
    detail: "Instructor: Supriyo ∙ Completed 2024",
    text: "A comprehensive frontend certification course covering the full modern frontend stack — from core HTML, CSS, and JavaScript fundamentals through to frameworks, testing, and deployment. Served as the structured complement to three years of self-directed learning.",
  },
  {
    year: "2025 — Present",
    title: "B.Sc Computer Science — OAUSTECH",
    text: "Currently pursuing a Bachelor of Science in Computer Science, building academic rigour in the theoretical foundations — algorithms, data structures, systems — that underpin production-grade engineering.",
  },
];

export const skills = [
  {
    icon: SiHtml5,
    iconColor: "#e34c26",
    skill: "HTML5",
    skillLevel: "Expert",
    skillDetails: [
      "Semantic markup using the full range of HTML5 elements to communicate document structure meaningfully to browsers and assistive technologies",
      "Accessible form design using proper input types, labels, fieldsets, and ARIA attributes to support keyboard and screen reader navigation",
      "Embedded media handling — video, audio, and canvas — with appropriate fallback content and cross-browser attribute coverage",
      "SEO-aware document structure using heading hierarchy, landmark regions, and meta tag configuration for crawlability and social sharing",
    ],
  },
  {
    icon: SiCss,
    skill: "CSS3",
    skillLevel: "Expert",
    iconColor: "#663399",
    skillDetails: [
      "Layout architecture using Flexbox and CSS Grid, including complex multi-axis compositions, auto-placement, and named grid areas",
      "Fluid typography and spacing systems built with `clamp()` and CSS custom properties, scaling proportionally across viewport widths without breakpoint-specific overrides",
      "Scroll-driven animations using animation-timeline: scroll() and view() with @supports fallbacks for browsers without native support",
      "CSS architecture patterns including design token systems with semantic naming, specificity management, and utility class composition",
    ],
  },
  {
    icon: SiJavascript,
    skill: "JavaScript",
    skillLevel: "Expert",
    iconColor: "#f0db4f",
    skillDetails: [
      "Asynchronous patterns including Promises, async/await, AbortController-gated fetch requests, and callback-to-Promise conversion for APIs like the Geolocation interface",
      "DOM manipulation and event handling including delegation patterns, custom events, and performant scroll/resize handling via requestAnimationFrame debouncing",
      "ES6+ features including destructuring, optional chaining, nullish coalescing, modules, and iterables — applied consistently across projects",
      "Data structures and transformation patterns including Map, Set, and array methods for managing complex application state without framework overhead",
    ],
  },
  {
    icon: SiTypescript,
    skill: "Typescript",
    iconColor: "#3178c6",
    skillLevel: "Expert",
    skillDetails: [
      "Interface and type definition for third-party API response shapes, enabling compile-time safety when consuming deeply nested external data",
      "Generic types and utility types (Partial, Pick, Omit, ReturnType) applied to reusable utility functions and component props",
      "Strict mode configuration with no implicit any, enforcing type coverage across the full codebase",
      "Integration with React, Vue, and Next.js — typed props, typed store actions, typed composables, and typed server actions",
    ],
  },
  {
    icon: SiReact,
    skill: "React",
    iconColor: "#61dbfb",
    skillLevel: "Expert",
    skillDetails: [
      "Component architecture patterns including compound components, render props, and controlled/uncontrolled component design",
      "Hook patterns including custom hooks for scroll-spy, intersection observation, loading state, and animation orchestration with proper cleanup",
      "Performance optimisation using useMemo, useCallback, React.memo, and code splitting via React.lazy and Suspense",
      "Next.js App Router — static rendering, server-side rendering, mixed static/dynamic composition, server actions, and route-level caching strategies",
    ],
  },
  {
    icon: SiAngular,
    skill: "Angular",
    iconClass: "icon-angular",
    skillLevel: "Advanced",
    skillDetails: [
      "Component architecture using Angular's module system, decorators, and dependency injection container",
      "Reactive programming with RxJS Observables for handling asynchronous data streams and component communication",
      "Angular's template syntax including structural directives, pipes, two-way binding, and reactive forms with validation",
      "Service-based state management and Angular's change detection model — including `OnPush` strategy for performance optimisation",
    ],
  },
  {
    icon: SiVuedotjs,
    skill: "Vue",
    iconColor: "#41b883",
    skillLevel: "Expert",
    skillDetails: [
      "Composition API architecture with composables for isolating and reusing stateful logic across components — including custom fetch and browser API like geolocation composables",
      "Pinia store design using the Composition API store syntax, typed state, and pinia-plugin-persistedstate for preference persistence",
      "Reactive template patterns using v-model, computed properties, watch, watchEffect, and storeToRefs for maintaining Vue's reactivity across store boundaries",
      "Vue's lifecycle hooks and async component patterns for managing loading states, skeleton placeholders, and deferred content rendering",
    ],
  },
];

export const fullStackOverview =
  "Three years of focused frontend engineering have produced a clear picture of what I can build and, more importantly, what I cannot. I can architect a performant React or Vue application, design a component system from design tokens up, integrate third-party APIs, and ship to production with measurable Lighthouse scores to back the work. That standard is documented across the case studies in this portfolio.";

export const transitionNarrative =
  "The goal was never to be a frontend developer — it was to be a software engineer. Frontend was the entry point: the discipline with the lowest barrier to visual feedback, the fastest iteration cycle, and the clearest line between what you write and what the user sees. That foundation is now solid. The next phase is building the other half: server-side logic, database design, API architecture, and the systems knowledge that makes the difference between a developer who consumes backends and one who builds them.";

export const roadmapBlocks = {
  languages: ["Python", "Java"],
  fundamentals: [
    "Data Structures & Algorithmms",
    "HTTP & REST",
    "Security (OWASP)",
    "API Design",
  ],
  servers: ["Nginx", "Uvicorn", "Embedded Tomcat"],
  frameworks: ["FastAPI", "Spring Boot"],
  databases: ["PostgresSQL", "MongoDB", "Redis"],
  devops: ["GitHub Actions", "AWS", "Kubernetes", "Docker"],
  onthehorizon: ["Kafka", "RabbitMQ", "gRPC", "System Design"],
};
