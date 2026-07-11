"use client";
import Menuspy from "menuspy";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface Props {
  addAnimationClass: (element: HTMLElement) => void;
}

export function Header({ addAnimationClass }: Props) {
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
    headerRef.current && addAnimationClass(headerRef.current);
    return () => {
      ms.destroy();
    };
  }, [addAnimationClass]);
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
      className="w-100 row justify-content-center m-auto header"
      data-animation="slideInTop"
      style={
        {
          "--i": "0",
          opacity: "0",
          visibility: "hidden",
        } as React.CSSProperties
      }
    >
      <div className="navbar navbar-dark navbar-expand-lg">
        <div className="navbar-logo">
          <Link href="/#" className="name-header headings">
            Bolarinwa <span>Gabriel</span>
          </Link>
        </div>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          id="navbar-toggler"
          ref={navbarButton}
          onClick={() => {
            openMenu();
          }}
          aria-expanded="false"
          aria-label="Navigation Dropdown Menu"
        >
          <div className="bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </button>
        <nav
          className="navbar-collapse collapse nav-menu fadeInLeft"
          id="menu"
          aria-label="Primary Navigation"
        >
          <ul className="navbar-nav ms-auto" role="list">
            <li className="nav-item" role="list">
              <a href="#main" aria-current="page" className="nav-link">
                <span
                  className="fa fa-regular fa-house"
                  style={{
                    color: "var(--theme-color)",
                    paddingRight: "15px",
                  }}
                ></span>{" "}
                <span className="link-text">Home</span>
              </a>
            </li>
            <li className="nav-item" role="list">
              <a href="#about" className="nav-link">
                <span
                  className="fas fa-user"
                  style={{
                    color: "var(--theme-color)",
                    paddingRight: "15px",
                  }}
                ></span>{" "}
                <span className="link-text">About</span>
              </a>
            </li>
            <li className="nav-item" role="list">
              <a href="#services" className="nav-link">
                <span
                  className="fa fa-regular fa-briefcase"
                  style={{
                    color: "var(--theme-color)",
                    paddingRight: "15px",
                  }}
                ></span>{" "}
                <span className="link-text">Services</span>
              </a>
            </li>
            <li className="nav-item" role="list">
              <a href="#portfolio" className="nav-link">
                <span
                  className="fas fa-image"
                  style={{
                    color: "var(--theme-color)",
                    paddingRight: "15px",
                  }}
                ></span>{" "}
                <span className="link-text">Portfolio</span>
              </a>
            </li>
            <li className="nav-item" role="list">
              <a href="#projects" className="nav-link">
                <span
                  className="fas fa-code"
                  style={{
                    color: "var(--theme-color)",
                    paddingRight: "15px",
                  }}
                ></span>
                <span className="link-text">Projects</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
