"use client";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
function ContactCard() {
  const ref = useScrollAnimationList();
  return (
    <div
      className="flex flex-col items-center gap-4 justify-center mx-auto bg-card-background home-contact border border-white/20 rounded-lg w-full text-center mt-16 h-auto py-8 overflow-hidden relative"
      ref={ref}
      data-animation="hoverInBottom"
    >
      <h3 className="text-lg">Have a project in mind?</h3>
      <Link
        className="bg-(image:--primary-gradient) py-2 px-5 flex gap-2 items-center text-sm font-bold rounded-full w-fit hover:-translate-y-1 hover:shadow-neon-hover btn-card"
        href={"/contact"}
      >
        <ArrowRight />
        Let&apos;s Talk
      </Link>
    </div>
  );
}

export default ContactCard;
