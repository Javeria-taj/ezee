"use client";

import Link from "next/link";
import Image from "next/image";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const EziWaving = () => (
  <svg viewBox="0 0 200 250" width="50" height="62" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 30 C140 30 170 80 180 150 C185 190 160 230 100 230 C40 230 15 190 20 150 C30 80 60 30 100 30Z" fill="#2A2928" />
    <ellipse cx="100" cy="110" rx="57" ry="43" fill="#FAF7F1" />
    {/* Beret */}
    <path d="M34 60 Q70 28 106 60 Q88 68 70 68 Q52 68 34 60Z" fill="#D48A70" />
    {/* Scarf */}
    <path d="M60 148 C80 162 120 162 140 148 C145 158 135 172 100 177 C65 172 55 158 60 148Z" fill="#7A6D8C" />
    <path d="M125 158 Q135 182 120 196 Q110 182 125 158Z" fill="#7A6D8C" />
    {/* Happy eyes */}
    <path d="M75 105 Q85 95 90 105" stroke="#2A2928" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M110 105 Q115 95 125 105" stroke="#2A2928" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Cheeks */}
    <ellipse cx="68" cy="118" rx="10" ry="7" fill="#D48A70" opacity="0.5" />
    <ellipse cx="132" cy="118" rx="10" ry="7" fill="#D48A70" opacity="0.5" />
    {/* Waving arm */}
    <g style={{ transformOrigin: "165px 140px", animation: "eziWave 1.8s ease-in-out infinite" }}>
      <path d="M160 140 Q175 115 180 95" stroke="#2A2928" strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx="180" cy="92" r="9" fill="#2A2928" />
    </g>
    <style>{`
      @keyframes eziWave {
        0%, 100% { transform: rotate(0deg); }
        30%       { transform: rotate(-20deg); }
        60%       { transform: rotate(10deg); }
      }
    `}</style>
  </svg>
);

const navLinks = [
  { href: "#how", label: "How it works" },
  { href: "#city", label: "Find a shop" },
  { href: "#stories", label: "Stories" },
  { href: "#faq", label: "FAQ" },
];

const socialLinks = [
  { href: "https://x.com/EzeePrintsIn", label: "Follow us on X", icon: <XIcon /> },
  { href: "https://www.instagram.com/ezee.prints?igsh=MXE0ZDF0Y3B6cGE1bg==", label: "Follow us on Instagram", icon: <InstagramIcon /> },
  { href: "https://www.linkedin.com/company/ezeeprints/", label: "Connect on LinkedIn", icon: <LinkedInIcon /> },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        background: "#211b19",
        color: "#FAF7F1",
        padding: "72px clamp(22px,6vw,110px) 0",
        overflow: "hidden",
      }}
    >
      {/* Warm gradient glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 240,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,138,112,.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1080,
          margin: "0 auto",
        }}
      >
        {/* Top row */}
        <div
          className="footer-top-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 56,
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Image
                src="/logo.png"
                alt="Ezee Logo"
                width={88}
                height={28}
                style={{ height: 28, width: "auto", filter: "invert(1) brightness(1.8)" }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.65,
                color: "rgba(250,247,241,.55)",
                margin: "0 0 22px",
              }}
            >
              Built for the generation that prints before exams. Upload, customise, collect — warm prints, no queues.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {socialLinks.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "1px solid rgba(250,247,241,.15)",
                    color: "rgba(250,247,241,.6)",
                    transition: "background .25s ease, color .25s ease, transform .25s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(212,138,112,.2)";
                    e.currentTarget.style.color = "#D48A70";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.borderColor = "rgba(212,138,112,.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(250,247,241,.6)";
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.borderColor = "rgba(250,247,241,.15)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: ".15em",
                textTransform: "uppercase",
                color: "rgba(250,247,241,.35)",
                margin: "0 0 18px",
              }}
            >
              Navigate
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "rgba(250,247,241,.6)",
                    textDecoration: "none",
                    transition: "color .2s ease, paddingLeft .2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D48A70";
                    e.currentTarget.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(250,247,241,.6)";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* For shops */}
          <div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: ".15em",
                textTransform: "uppercase",
                color: "rgba(250,247,241,.35)",
                margin: "0 0 18px",
              }}
            >
              Print Partners
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "/workshop/login", label: "Shop Dashboard" },
                { href: "/workshop/login", label: "Become a Partner" },
                { href: "#faq", label: "Partner FAQ" },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "rgba(250,247,241,.6)",
                    textDecoration: "none",
                    transition: "color .2s ease, paddingLeft .2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#A9B59D";
                    e.currentTarget.style.paddingLeft = "4px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(250,247,241,.6)";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CTA card */}
          <div
            style={{
              background: "rgba(212,138,112,.1)",
              border: "1px solid rgba(212,138,112,.25)",
              borderRadius: 18,
              padding: "24px 26px",
              maxWidth: 240,
            }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: "#FAF7F1",
                margin: "0 0 8px",
              }}
            >
              Ready to print?
            </p>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 13.5,
                color: "rgba(250,247,241,.5)",
                margin: "0 0 18px",
                lineHeight: 1.5,
              }}
            >
              Your first order is one upload away.
            </p>
            <Link
              href="/auth"
              style={{
                display: "inline-block",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#211b19",
                background: "#FAF7F1",
                padding: "11px 20px",
                borderRadius: 11,
                textDecoration: "none",
                transition: "transform .2s ease, background .2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D48A70";
                e.currentTarget.style.color = "#FAF7F1";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FAF7F1";
                e.currentTarget.style.color = "#211b19";
                e.currentTarget.style.transform = "";
              }}
            >
              Start Printing →
            </Link>
          </div>
        </div>

        {/* Divider with Ezi waving */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "rgba(250,247,241,.08)" }} />
          <EziWaving />
          <div style={{ flex: 1, height: 1, background: "rgba(250,247,241,.08)" }} />
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 32,
          }}
        >
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 13,
              color: "rgba(250,247,241,.3)",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Ezee. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 13,
              color: "rgba(250,247,241,.3)",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            Made with ☕ for students everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
