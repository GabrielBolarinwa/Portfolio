"use client";
import { useEffect, useRef } from "react";
import useLoadingState from "./useLoadingState";

export function useLoadAnimation() {
  const refs = useRef<HTMLElement[]>([]);
  const { progress } = useLoadingState();
  useEffect(() => {
    if (progress < 100) return;
    refs.current.forEach((el) => {
      setTimeout(() => {
        if (el.dataset.animation) el.classList.add(el.dataset.animation);
      }, 500);
    });
  }, [progress]);

  const setRef = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };

  return setRef;
}
