import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactNumber(number: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

export function progressLength(skillLevel: string) {
  if (skillLevel === "Expert") {
    return 100;
  } else if (skillLevel === "Advanced") {
    return 75;
  } else if (skillLevel === "Intermediate") {
    return 50;
  } else if (skillLevel === "Beginner") {
    return 25;
  }
}
