import { SiReact } from "@icons-pack/react-simple-icons";
import { Gauge, PencilRuler, Plug2, ShieldHalf } from "lucide-react";

export const services = [
  {
    icon: PencilRuler,
    serviceName: "UI/UX Implementation",
    serviceDescription:
      "Translating designs into precise, responsive interface — from component-level fidelity to full design system implementation with consistent spacing, typography and colour tokens across every breakpoint",
  },
  {
    icon: SiReact,
    serviceName: "Frontend Engineering",
    serviceDescription:
      "Build scalable application architectures across React, Vue and Angular — with TypeScript throughout, deliberate state management strategies and routing patters that hold up as complexity grows.",
  },
  {
    icon: Gauge,
    serviceName: "Performance Optimization",
    serviceDescription:
      "Auditing and improving frontend performance through lazy loading, code splitting, PWA Implementation and Core Web Vitals analysis — with Lighthouse scores as the measurable benchmark, not intuition.",
  },
  {
    icon: Plug2,
    serviceName: "API Integration",
    serviceDescription:
      "Connecting frontend to external services reliably — REST consumption,, JWT and OAuth authentication flows, debounced and cached async data handling and graceful degradation when network conditions fail.",
  },
  {
    icon: ShieldHalf,
    serviceName: "Accessibility & Security",
    serviceDescription:
      "Building interfaces that meet WCAG 2.1 AA standards as a baseline, not an afterthought — with semantic markup, ARIA implementation, keyboard navigation, XSS prevention and Content Security Policy configuration applied from the start",
  },
];
