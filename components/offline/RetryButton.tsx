"use client";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function RetryButton() {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      onClick={() => router.refresh()}
      className="border-main-text hover:border-accent-pink hover:-translate-y-0.5 py-3 px-6 flex items-center hover:shadow-pink-hover rounded-full gap-2 font-bold text-sm hover:text-accent-pink"
    >
      <RotateCw /> Retry
    </Button>
  );
}

export default RetryButton;
