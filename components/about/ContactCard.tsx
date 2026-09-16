"use client";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import { Send } from "lucide-react";
import LinkTag from "../LinkTag";

function ContactCard() {
  const setRef = useScrollAnimationList();
  return (
    <div
      className="rounded-md bg-card-background p-6 flex flex-col gap-4 border-white/20 border border-l-6 border-l-accent-pink w-full md:max-w-3/5 lg:max-w-1/2 mt-5"
      ref={setRef}
      data-animation="slideInLeftCustom"
    >
      <h3 className="font-bold">Have a project in mind?</h3>
      <p className="text-muted text-sm">
        I&apos;m always open to discussing new projects, creative ideas or
        opportunities to be part of your vision.
      </p>
      <LinkTag className="p-4! text-sm!" href={"/contact"} variant="secondary">
        <Send size={20.8} color="transparent" fill="#fff" /> Get In Touch
      </LinkTag>
    </div>
  );
}

export default ContactCard;
