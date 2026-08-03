import { useNav } from "@/app/context/NavContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { pages } from "@/data/routes";
import { CircleDot, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function AppSidebar() {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { sections } = useNav();
  const activeRoute = usePathname();

  useEffect(() => {
    closeRef.current && closeRef.current.click();
  }, [activeRoute]);
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant={"outline"}
            className="p-2 bg-transparent text-main-text rounded-md border border-white/20 lg:hidden"
            aria-expanded="false"
            aria-label="Sidebar Menu"
          >
            <Menu />
          </Button>
        }
      />
      <SheetContent
        className={
          "flex flex-col gap-6 text-base! max-w-[270px]! text-muted p-6 font-headings"
        }
        side={"right"}
        showCloseButton={false}
      >
        <SheetClose
          render={
            <Button
              variant={"ghost"}
              ref={closeRef}
              className={"absolute top-5 right-2 hover:bg-white/50 px-1.5"}
            >
              <X />
            </Button>
          }
        />
        {sections.length > 0 && (
          <div className="flex flex-col gap-6 mt-8">
            <p className={"font-bold uppercase tracking-widest text-sm"}>
              Sections
            </p>
            <nav className={"flex flex-col gap-4"}>
              {sections.map((section) => (
                <Link
                  href={`/#${section.id}`}
                  key={section.label}
                  className={`flex gap-4 group items-center hover:translate-x-1 font-medium`}
                >
                  <CircleDot className={"group-hover:text-accent-neon"} />
                  <span>{section.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
        <div className="flex flex-col gap-6 mt-6">
          <p className={"font-bold uppercase tracking-widest text-sm"}>Pages</p>
          <nav className={"flex flex-col gap-4"}>
            {pages.map((page) => (
              <Link
                href={page.href}
                key={page.href}
                className={`flex gap-4 group items-center hover:translate-x-1 font-medium ${page.href === activeRoute ? "text-accent-neon" : "hover:text-main-text"}`}
              >
                <page.icon className={"group-hover:text-accent-neon"} />
                <span>{page.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
