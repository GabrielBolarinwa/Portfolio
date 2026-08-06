"use client";
import { RotateCw } from "lucide-react";
import { Button } from "../ui/button";

function RetryButton() {
  return (
    <Button
      onClick={() => window.location.reload()}
      className="border-main-text border hover:border-accent-pink hover:-translate-y-0.5 py-6! px-6! flex items-center hover:shadow-pink-hover rounded-full gap-2 font-bold text-sm bg-transparent hover:bg-transparent! hover:text-accent-pink text-main-text"
    >
      <RotateCw /> Retry
    </Button>
  );
}

export default RetryButton;
