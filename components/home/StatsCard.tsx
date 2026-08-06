"use client";
import { formatCompactNumber } from "@/lib/utils";
import { useAnimatedCounter } from "@/src/hooks/useAnimatedCounter";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  value: number | null;
  index: number;
}

export default function StatsCard(props: Props) {
  const { label, value, index } = props;

  const cardElementRef = useRef<HTMLElement | null>(null);
  const ref = useScrollAnimationList();

  const cardRef = (el: HTMLDivElement | null) => {
    if (!el) return;
    ref(el);
    cardElementRef.current = el;
  };

  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const element = cardElementRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const currentCount = useAnimatedCounter(value || 0, visible, 2000);
  return (
    <div
      className="bg-card-background border p-6 col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-2 hover:-translate-y-1 hover:border-accent-neon rounded-md w-full text-center text-muted uppercase hover:shadow-card-hover"
      ref={cardRef}
      data-animation="hoverInBottom"
      style={{ "--i": `0.${index + 1}` } as React.CSSProperties}
      tabIndex={0}
    >
      <p className="bg-(image:--primary-gradient) bg-clip-text text-transparent headings font-bold text-lg">
        {value
          ? index === 1
            ? formatCompactNumber(currentCount)
            : currentCount
          : "—"}
      </p>
      <p className="text-[1rem] tracking-wider">{label}</p>
    </div>
  );
}
