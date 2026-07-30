"use client";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import React from "react";

interface Props {
  label: string;
  value: number | null;
  index: number;
}

export default function StatsCard(props: Props) {
  const { label, value, index } = props;
  const ref = useScrollAnimationList();
  return (
    <div
      className="bg-card-background border p-6 col-span-6 md:col-span-3 lg:col-span-2 flex flex-col gap-2 hover:-translate-y-1 hover:border-accent-neon rounded-lg w-full text-center text-muted uppercase"
      ref={ref}
      data-animation="hoverInBottom"
      style={{ "--i": `0.${index + 1}` } as React.CSSProperties}
    >
      <p className="bg-(image:--primary-gradient) bg-clip-text text-transparent headings font-bold text-xl">
        {value ?? "—"}
      </p>
      <p className="text-[1rem] tracking-wider">{label}</p>
    </div>
  );
}
