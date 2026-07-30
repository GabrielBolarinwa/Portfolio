"use client";

import { useEffect, useState } from "react";

export function useAnimatedCounter(
  targetValue: number,
  isVisible: boolean,
  duration: number = 2000,
) {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutProgress = 1 - (1 - progress) * (1 - progress);

      setCount(Math.floor(easeOutProgress * targetValue));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [targetValue, duration, isVisible]);

  return count;
}
