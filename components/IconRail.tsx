"use client";
import { pages } from "@/data/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function IconRail() {
  const activeRoute = usePathname();
  return (
    <div
      className={
        "fixed top-1/2 -translate-y-1/2 right-3 z-12 text-muted flex items-center flex-col gap-8"
      }
    >
      <p
        className={
          "[writing-mode:vertical-rl] rotate-180 text-xs uppercase tracking-[2px]"
        }
      >
        Pages
      </p>
      <ul className={"flex flex-col gap-6 items-center"}>
        {pages.map((page) => (
          <Tooltip key={page.href}>
            <TooltipTrigger
              render={
                <li
                  className={`p-2 rounded-lg border border-white/20 bg-card ${activeRoute === page.href && "border-accent-neon text-accent-neon"} hover:bg-(image:--primary-gradient) hover:text-main-text hover:scale-105`}
                >
                  <Link href={page.href} aria-label={page.title}>
                    <page.icon />
                  </Link>
                </li>
              }
            />
            <TooltipContent
              side={"left"}
              className={"bg-card max-w-none w-fit text-main-text"}
            >
              <p>{page.title}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </ul>
    </div>
  );
}

export default IconRail;
