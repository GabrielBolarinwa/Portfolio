"use client";
import { useLoadingContext } from "@/app/context/LoadingContext";

export default function useLoadingState() {
  return useLoadingContext();
}
