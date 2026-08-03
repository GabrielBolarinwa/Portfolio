import {
  BriefcaseBusiness,
  CircleDot,
  Home,
  Mail,
  Menu,
  User,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useNav } from "@/app/context/NavContext";

export function AppSidebar() {
  const { sections } = useNav();
  const pages = [
    { title: "Home", href: "/", icon: Home },
    { title: "About", href: "/about", icon: User },
    { title: "Contact", href: "/contact", icon: Mail },
    { title: "Projects", href: "/projects", icon: BriefcaseBusiness },
  ];

  const activeRoute = usePathname();

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
      >
        <div className="flex flex-col gap-6 mt-12">
          <p className={"font-bold uppercase tracking-widest text-sm"}>
            Sections
          </p>
          <nav className={"flex flex-col gap-4"}>
            {sections.map((section) => (
              <Link
                href={section.id}
                key={section.label}
                className={`flex gap-4 group items-center hover:translate-x-1 font-medium`}
              >
                <CircleDot className={"group-hover:text-accent-neon"} />
                <span>{section.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-6 mt-12">
          <p className={"font-bold uppercase tracking-widest text-sm"}>Pages</p>
          <nav className={"flex flex-col gap-4"}>
            {pages.map((page) => (
              <Link
                href={page.href}
                key={page.title}
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
