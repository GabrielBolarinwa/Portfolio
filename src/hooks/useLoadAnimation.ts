"use client";
import { useEffect, useRef } from "react";
import useLoadingState from "./useLoadingState";

export function useLoadAnimation(threshold = 0.2) {
  const refs = useRef<HTMLElement[]>([]);
  const { progress } = useLoadingState();
  useEffect(() => {
    if (progress < 100) return;
    const observers = refs.current.map((el: HTMLElement | null) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (el.dataset.animation) el.classList.add(el.dataset.animation);
              obs.disconnect();
            }, 1000);
          }
        },
        { threshold },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, [progress, threshold]);

  const setRef = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  return setRef;
}
