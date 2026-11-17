import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import avatar from "../../Assets/images/avatar.jpg";
import { profile } from "../../Data/profile";
import { resumeUrl } from "../../Data/resume";
import { ArrowUpRight, Close, Menu } from "../ui/Icons";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-1.5 text-sm transition-colors ${
      isActive ? "bg-accent/15 text-accent" : "text-muted hover:text-fg"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-line bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-medium tracking-tight">
          <img
            src={avatar}
            alt=""
            className="h-8 w-8 rounded-full object-cover ring-2 ring-accent/60 ring-offset-2 ring-offset-bg"
          />
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary ml-3 !py-1.5"
          >
            Resume
            <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          type="button"
          className="icon-btn md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {menuOpen ? <Close size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className="container-page pb-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-1 border-t border-line pt-3">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-base ${
                    isActive ? "bg-surface-2 text-fg" : "text-muted"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-base text-muted"
            >
              Resume <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
