"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";



export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    // Force light mode on load
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,.1), 0 20px 40px -12px rgba(0,0,0,.15), 0 4px 12px rgba(0,0,0,.08)";
        nav.style.background = "var(--nav-bg)";
        nav.style.transform = "translateX(-50%) translateY(4px)";
      } else {
        nav.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,.05), 0 10px 30px -12px rgba(0,0,0,.1), 0 2px 6px rgba(0,0,0,.05)";
        nav.style.background = "var(--nav-bg)";
        nav.style.transform = "translateX(-50%) translateY(0px)";
      }
    };
    const onScrollProgress = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      if (total > 0) setScrollPct((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScrollProgress, { passive: true });
    onScroll();
    onScrollProgress();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScrollProgress);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9000,
          height: 2.5,
          width: `${scrollPct}%`,
          background: "linear-gradient(to right, #D48A70, #A9B59D)",
          transition: "width 0.1s linear",
          pointerEvents: "none",
          borderRadius: "0 2px 2px 0",
        }}
      />
      <nav
        id="main-nav"
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%) translateY(0px)",
          zIndex: 8000,
          opacity: menuOpen ? 0 : 1,
          pointerEvents: menuOpen ? "none" : "auto",
          display: "flex",
          alignItems: "center",
          gap: "clamp(12px, 1.8vw, 24px)",
          padding: "16px 16px 16px 26px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          background: "var(--nav-bg)",
          border: "1px solid var(--nav-border)",
          borderRadius: 32,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.05), 0 10px 30px -12px rgba(0,0,0,.1), 0 2px 6px rgba(0,0,0,.05)",
          transition: "opacity .3s ease, box-shadow .4s ease, background .4s ease, transform .4s cubic-bezier(.16, 1, .3, 1)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            transition: "transform .2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(0.96)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
          }}
        >
          <Image
            src="/logo.png"
            alt="Ezee Logo"
            width={92}
            height={30}
            style={{
              width: "auto",
              height: "30px",
              objectFit: "contain",
              borderRadius: "6px",
              filter: "contrast(1.05)"
            }}
          />
        </Link>

        {/* Divider — hidden on mobile via .nav-divider class */}
        <div className="nav-divider" style={{ width: 1, height: 16, background: "var(--border-subtle)" }} />

        {/* Nav links — hidden on mobile via .nav-links class */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 13.5,
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
            color: "var(--text-secondary)",
            letterSpacing: "0.01em",
          }}
        >
          {[
            { href: "#how", label: "How it works" },
            { href: "#city", label: "Find a shop" },
            { href: "#stories", label: "Stories" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                position: "relative",
                textDecoration: "none",
                color: "inherit",
                transition: "color .25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#D48A70";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "inherit";
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Divider — hidden on mobile via .nav-divider class */}
        <div className="nav-divider" style={{ width: 1, height: 16, background: "var(--border-subtle)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href="/auth"
            style={{
              textDecoration: "none",
              fontSize: 13.5,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#FAF7F1",
              background: "linear-gradient(135deg, #D48A70 0%, #C2674A 100%)",
              padding: "8px 20px",
              borderRadius: 16,
              boxShadow: "0 4px 12px -4px rgba(212,138,112,.5)",
              transition:
                "transform .3s cubic-bezier(.175, .885, .32, 1.275), box-shadow .3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1.5px) scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 8px 16px -6px rgba(212,138,112,.75)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 4px 12px -4px rgba(212,138,112,.5)";
            }}
          >
            Start Printing
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            style={{
              background: "transparent",
              border: "1px solid var(--border-subtle)",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              transition: "transform 0.3s var(--anim-easing), background 0.3s var(--anim-easing)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
              e.currentTarget.style.background = "var(--border-subtle)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Hamburger button — hidden on desktop via CSS (.mob-menu-btn only shows at ≤820px) */}
        <button
          className="mob-menu-btn"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile slide-in overlay — hidden on desktop via CSS (.mob-menu-overlay only displays at ≤820px) */}
      <div
        className={`mob-menu-overlay${menuOpen ? " open" : ""}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      >
        <div className="mob-menu-panel" onClick={(e) => e.stopPropagation()}>
          <button className="mob-close-icon-btn" onClick={closeMenu} aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          <div className="mob-menu-logo-container">
            <Image src="/logo.png" alt="Ezee" width={80} height={26} style={{ height: 26, width: "auto" }} />
          </div>

          {[
            { href: "#how", label: "How it works" },
            { href: "#city", label: "Find a shop" },
            { href: "#stories", label: "Stories" },
            { href: "#faq", label: "FAQ" },
          ].map(({ href, label }) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}

          <Link href="/auth" className="mob-cta" onClick={closeMenu}>
            Start Printing →
          </Link>
        </div>
      </div>
    </>
  );
}
