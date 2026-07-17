"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";



export default function Navbar() {
  useEffect(() => {
    const nav = document.getElementById("main-nav");
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,.9), 0 20px 40px -12px rgba(42,41,40,.12), 0 4px 12px rgba(42,41,40,.04)";
        nav.style.background = "linear-gradient(135deg, rgba(250,247,241,0.92) 0%, rgba(245,241,235,0.85) 100%)";
        nav.style.transform = "translateX(-50%) translateY(4px)";
      } else {
        nav.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,.9), 0 10px 30px -12px rgba(42,41,40,.08), 0 2px 6px rgba(42,41,40,.02)";
        nav.style.background = "linear-gradient(135deg, rgba(250,247,241,0.82) 0%, rgba(245,241,235,0.72) 100%)";
        nav.style.transform = "translateX(-50%) translateY(0px)";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="main-nav"
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 8000,
        display: "flex",
        alignItems: "center",
        gap: "clamp(12px, 1.8vw, 24px)",
        padding: "8px 8px 8px 18px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: 24,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,.9), 0 10px 30px -12px rgba(42,41,40,.08), 0 2px 6px rgba(42,41,40,.02)",
        transition: "box-shadow .4s ease, background .4s ease, transform .4s cubic-bezier(.16, 1, .3, 1)",
      }}
    >
      <a
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
            height: 30, 
            objectFit: "contain", 
            borderRadius: "6px",
            filter: "contrast(1.05)"
          }} 
        />
      </a>

      {/* Thin elegant vertical divider */}
      <div style={{ width: 1, height: 16, background: "rgba(42,41,40,.1)" }} />

      <div
        className="nav-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontSize: 13.5,
          fontWeight: 600,
          fontFamily: "'Space Grotesk', sans-serif",
          color: "#5b554f",
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

      {/* Thin elegant vertical divider */}
      <div style={{ width: 1, height: 16, background: "rgba(42,41,40,.1)" }} />

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
      </div>
    </nav>
  );
}
