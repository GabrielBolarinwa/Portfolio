import { useState, useEffect, useRef, useCallback } from "react";

interface ScrollSpyOptions {
  offset?: number;
  defaultActive?: string | null;
}

export function useScrollSpy(
  sectionIds: string[] = [],
  options: ScrollSpyOptions = {},
) {
  const { offset = 0, defaultActive = null } = options;

  const [activeId, setActiveId] = useState<string | null>(defaultActive);
  const frameRef = useRef<number | null>(null);

  const getActiveSection = useCallback(() => {
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionIds[i]);
      if (!el) continue;

      const { top } = el.getBoundingClientRect();

      if (top <= offset) {
        return sectionIds[i];
      }
    }

    return defaultActive;
  }, [sectionIds, offset, defaultActive]);

  useEffect(() => {
    if (!sectionIds.length) return;

    const handleScroll = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const next = getActiveSection();
        setActiveId((prev) => (prev !== next ? next : prev));
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [getActiveSection, sectionIds]);

  return activeId;
}
