import { useEffect, useRef } from "react";

export function useScrollAnimationList() {
  const refs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observers = refs.current.map((el: HTMLElement | null) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add(el.dataset.animation || "");
            obs.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const setRef = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  return setRef;
}
