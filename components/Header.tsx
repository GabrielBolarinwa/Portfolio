"use client";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useRef } from "react";
import { AppSidebar } from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { useNav } from "@/app/context/NavContext";
import { useScrollSpy } from "@/src/hooks/useScrollSpy";

export function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const activeRoute = usePathname();
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.opacity = "1";
      headerRef.current.style.visibility = "visible";
      headerRef.current.classList.add(
        headerRef.current.dataset.animation || "",
      );
    }
  }, []);
  useEffect(() => {
    if (!headerRef.current) return;
    const innerHeight = headerRef.current.offsetHeight;
    document.documentElement.style.setProperty(
      "--header-height",
      `${innerHeight}px`,
    );
  }, []);

  const { sections } = useNav();
  const activeId = useScrollSpy(
    useMemo(() => sections.map((s) => s.id), [sections]),
    {
      offset:
        Number(
          document.documentElement.style
            .getPropertyValue("--header-height")
            .slice(0, -2),
        ) + 20,
    },
  );

  return (
    <header
      role="banner"
      ref={headerRef}
      className="w-full flex flex-wrap justify-center mx-auto header text-(length:--font-size-default) opacity-0 invisible"
      data-animation="hoverInTop"
      style={
        {
          "--i": "0",
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between text-white px-6 w-98/100 py-3">
        <div className="navbar-logo">
          <Link
            href="/#"
            className="name-header headings flex gap-2 items-center"
          >
            <Code2 className={"text-main-text gradient-icon"} /> BG
          </Link>
        </div>
        <div className="flex gap-6 font-medium items-center text-base">
          {sections.length > 0 && (
            <nav
              className="hidden lg:flex items-center gap-6 nav-menu fadeInLeft"
              id="menu"
              aria-label="Primary Navigation"
            >
              <ul
                className="flex items-center ml-auto gap-6 text-muted"
                role="list"
              >
                {sections.map((section) => (
                  <li
                    className={`nav-item ${activeId === section.id && "active"}`}
                    role="list"
                    key={section.id}
                  >
                    <Link
                      href={`#${section.id}`}
                      aria-current="page"
                      className="nav-link"
                    >
                      <span className="link-text">{section.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <Link
            href={"/projects"}
            className={`flex gap-2 items-center py-2 px-3 bg-(image:--primary-gradient) rounded-full ${activeRoute === "projects" && "hidden"} shadow-xs text-sm shadow-accent-neon  hover:-translate-y-0.5 hover:shadow-neon-hover`}
          >
            <ArrowRight size={15} /> View Projects
          </Link>
          <AppSidebar />
        </div>
      </div>
    </header>
  );
}
