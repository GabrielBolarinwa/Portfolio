"use client";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import { ArrowRight } from "lucide-react";
import LinkTag from "../LinkTag";
function ContactCard() {
  const ref = useScrollAnimationList();
  return (
    <div
      className="flex flex-col items-center gap-4 justify-center mx-auto bg-card-background home-contact border border-white/20 rounded-md w-full text-center mt-16 h-auto py-8 overflow-hidden relative"
      ref={ref}
      data-animation="hoverInBottom"
    >
      <h3 className="text-lg">Have a project in mind?</h3>
      <LinkTag
        className="btn-card py-2! text-sm! px-5! font-bold"
        href={"/contact"}
      >
        <ArrowRight />
        Let&apos;s Talk
      </LinkTag>
    </div>
  );
}

export default ContactCard;
