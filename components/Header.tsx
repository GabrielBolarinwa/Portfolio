"use client";
import { Code, House, Menu, Toolbox, User } from "lucide-react";
import Menuspy from "menuspy";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Header() {
  const navbarButton = useRef<HTMLButtonElement | null>(null);
  const openMenu = () => {
    navbarButton.current?.classList.toggle("open");
  };
  const headerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const ms = new Menuspy("header", {
      activeClass: "active",
      enableLocationHash: false,
      threshold: 0.5,
    });
    return () => {
      ms.destroy();
    };
  }, []);
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
      <div className="flex items-center justify-between text-white px-(--size-value-big) w-98/100 py-2">
        <div className="navbar-logo">
          <Link href="/#" className="name-header headings">
            Bolarinwa <span>Gabriel</span>
          </Link>
        </div>
        <button
          type="button"
          className="lg:hidden p-2 rounded-md border border-white/20"
          ref={navbarButton}
          onClick={() => {
            openMenu();
          }}
          aria-expanded="false"
          aria-label="Navigation Dropdown Menu"
        >
          <Menu />
        </button>
        <nav
          className="hidden lg:flex items-center gap-6 nav-menu fadeInLeft"
          id="menu"
          aria-label="Primary Navigation"
        >
          <ul
            className="flex flex-col lg:flex-row items-center ml-auto gap-6 py-(--size-value-big) lg:py-0 landscape:lg:py-(--size-value-small)"
            role="list"
          >
            <li className="nav-item" role="list">
              <Link href="#main" aria-current="page" className="nav-link">
                <House size={24} className={"text-theme"} />{" "}
                <span className="link-text">Home</span>
              </Link>
            </li>
            <li className="nav-item" role="list">
              <Link href="/about" className="nav-link">
                <User size={24} className={"text-theme"} />
                <span className="link-text">About</span>
              </Link>
            </li>
            <li className="nav-item" role="list">
              <Link href="#services" className="nav-link">
                <Toolbox size={24} className={"text-theme"} />
                <span className="link-text">Services</span>
              </Link>
            </li>
            <li className="nav-item" role="list">
              <Link href="/projects" className="nav-link">
                <Code size={24} className={"text-theme"} />
                <span className="link-text">Projects</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
