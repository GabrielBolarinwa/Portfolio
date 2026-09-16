"use client";
import { useLoadAnimation } from "@/src/hooks/useLoadAnimation";
import { useScrollAnimationList } from "@/src/hooks/useScrollAnimationList";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"a"> & {
  href: string;
  nextLink?: boolean;
  variant?: "primary" | "secondary";
  trigger?: "load" | "scroll";
};

function LinkTag(props: Props) {
  const {
    children,
    className,
    nextLink = true,
    variant = "primary",
    trigger,
    ...linkProps
  } = props;

  const setRef = useScrollAnimationList();
  const setRef2 = useLoadAnimation();

  if (!nextLink) {
    return (
      <a
        className={`${variant === "secondary" ? "secondary-link" : "primary-link"} ${className || ""}`}
        ref={trigger ? (trigger === "load" ? setRef : setRef2) : null}
        rel="noopener noreferrer"
        {...linkProps}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={trigger ? (trigger === "load" ? setRef : setRef2) : null}
      className={`${variant === "secondary" ? "secondary-link" : "primary-link"} ${className || ""}`}
      {...linkProps}
    >
      {children}
    </Link>
  );
}

export default LinkTag;
