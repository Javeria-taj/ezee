"use client";

import { useState } from "react";
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
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPartnerAgreement, setShowPartnerAgreement] = useState(false);
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
                style={{ height: "28px", width: "auto", filter: "invert(1) brightness(1.8)" }}
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
              <Link
                href="/workshop/login"
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
                Shop Dashboard
              </Link>
              <Link
                href="/workshop/login"
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
                Become a Partner
              </Link>
              <button
                onClick={() => setShowPartnerAgreement(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  textAlign: "left",
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(250,247,241,.6)",
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
                Partner Agreement
              </button>
              <a
                href="#faq"
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
                Partner FAQ
              </a>
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
            borderTop: "1px solid rgba(250,247,241,.08)",
            paddingTop: 26,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13.5,
            color: "rgba(250,247,241,.4)",
            paddingBottom: 32,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "center" }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: "#FAF7F1",
                letterSpacing: ".02em"
              }}
            >
              EZEE™
            </span>
            <span>·</span>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Made in the study nook, one warm print at a time.</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "center", fontSize: 12.5, color: "rgba(250,247,241,.3)" }}>
            <button
              onClick={() => setShowPrivacy(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "rgba(250,247,241,.4)",
                fontFamily: "inherit",
                fontSize: "12.5px",
                transition: "color 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FAF7F1'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,241,.4)'}
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setShowTerms(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "rgba(250,247,241,.4)",
                fontFamily: "inherit",
                fontSize: "12.5px",
                transition: "color 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FAF7F1'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,241,.4)'}
            >
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => setShowPartnerAgreement(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "rgba(250,247,241,.4)",
                fontFamily: "inherit",
                fontSize: "12.5px",
                transition: "color 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FAF7F1'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,241,.4)'}
            >
              Partner Agreement
            </button>
            <span>·</span>
            <button
              onClick={() => setShowContact(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                color: "rgba(250,247,241,.4)",
                fontFamily: "inherit",
                fontSize: "12.5px",
                transition: "color 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FAF7F1'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(250,247,241,.4)'}
            >
              Contact
            </button>
            <span>·</span>
            <span>All trademarks acknowledged</span>
          </div>
        </div>
      </div>

      {showTerms && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(15, 12, 11, 0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowTerms(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "850px",
              height: "85vh",
              background: "#1F1917",
              border: "1px solid rgba(250, 247, 241, 0.1)",
              borderRadius: "24px",
              padding: "40px 32px 32px 40px",
              display: "flex",
              flexDirection: "column",
              color: "#FAF7F1",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowTerms(false)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(250, 247, 241, 0.05)",
                border: "1px solid rgba(250, 247, 241, 0.1)",
                color: "#FAF7F1",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D48A70";
                e.currentTarget.style.color = "#211b19";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 241, 0.05)";
                e.currentTarget.style.color = "#FAF7F1";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "28px", fontWeight: 800, color: "#D48A70", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                TERMS AND CONDITIONS
              </h2>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "14px", color: "rgba(250, 247, 241, 0.5)", margin: 0 }}>
                EzeePrints — Online Printing Platform (Website, Android Application &amp; iOS Application)
              </p>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "12px", color: "#A9B59D", margin: "4px 0 0 0", fontWeight: 500 }}>
                Last Updated: 23 July 2026
              </p>
            </div>

            {/* Scrollable Content Container */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "16px",
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: "14.5px",
                lineHeight: "1.7",
                color: "rgba(250, 247, 241, 0.8)",
              }}
            >
              <p style={{ fontStyle: "italic", marginBottom: "24px" }}>
                These Terms and Conditions constitute a legally binding agreement between the User and the Company (each as defined below) governing access to and use of the Platform (as defined below).
              </p>

              {/* Jump Nav */}
              <div style={{ background: "rgba(250, 247, 241, 0.03)", border: "1px solid rgba(250, 247, 241, 0.06)", borderRadius: "14px", padding: "16px", marginBottom: "32px" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "12px", color: "#A9B59D", margin: "0 0 10px 0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Quick Navigation
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {[
                    { id: 1, label: "1. Definitions" },
                    { id: 2, label: "2. Acceptance" },
                    { id: 6, label: "6. Order Placement" },
                    { id: 13, label: "13. Refunds" },
                    { id: 20, label: "20. Print Quality" },
                    { id: 22, label: "22. Privacy" },
                    { id: 23, label: "23. Liability" },
                    { id: 33, label: "33. Contact" }
                  ].map(link => (
                    <button
                      key={link.id}
                      onClick={() => document.getElementById(`terms-sec-${link.id}`)?.scrollIntoView({ behavior: "smooth" })}
                      style={{
                        background: "rgba(250, 247, 241, 0.05)",
                        border: "1px solid rgba(250, 247, 241, 0.08)",
                        borderRadius: "8px",
                        color: "rgba(250, 247, 241, 0.7)",
                        padding: "6px 12px",
                        fontSize: "12.5px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#D48A70";
                        e.currentTarget.style.color = "#D48A70";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(250, 247, 241, 0.08)";
                        e.currentTarget.style.color = "rgba(250, 247, 241, 0.7)";
                      }}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "40px" }}>
                {termsSections.map((sec, idx) => (
                  <div key={idx} id={`terms-sec-${idx + 1}`} style={{ scrollMarginTop: "20px" }}>
                    <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "16px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "14px" }}>
                      {sec.title}
                    </h3>
                    <div style={{ color: "rgba(250, 247, 241, 0.75)" }}>{sec.content}</div>
                  </div>
                ))}
              </div>

              {/* Final notice */}
              <div style={{ borderTop: "2px solid #D48A70", paddingTop: "20px", marginTop: "40px", textAlign: "center" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "12px", color: "#FAF7F1", letterSpacing: "0.05em", margin: 0 }}>
                  BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS IN THEIR ENTIRETY.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(15, 12, 11, 0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowPrivacy(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "850px",
              height: "85vh",
              background: "#1F1917",
              border: "1px solid rgba(250, 247, 241, 0.1)",
              borderRadius: "24px",
              padding: "40px 32px 32px 40px",
              display: "flex",
              flexDirection: "column",
              color: "#FAF7F1",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPrivacy(false)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(250, 247, 241, 0.05)",
                border: "1px solid rgba(250, 247, 241, 0.1)",
                color: "#FAF7F1",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D48A70";
                e.currentTarget.style.color = "#211b19";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 241, 0.05)";
                e.currentTarget.style.color = "#FAF7F1";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "28px", fontWeight: 800, color: "#D48A70", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                PRIVACY POLICY
              </h2>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "14px", color: "rgba(250, 247, 241, 0.5)", margin: 0 }}>
                EzeePrints — Online Printing Platform (Website, Android Application &amp; iOS Application)
              </p>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "13px", color: "rgba(250, 247, 241, 0.6)", margin: "4px 0 0 0" }}>
                Operated by Zarixa Infobytes Private Limited
              </p>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "12px", color: "#A9B59D", margin: "4px 0 0 0", fontWeight: 500 }}>
                Last Updated: 24 July 2026
              </p>
            </div>

            {/* Scrollable Content Container */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "16px",
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: "14.5px",
                lineHeight: "1.7",
                color: "rgba(250, 247, 241, 0.8)",
              }}
            >
              <p style={{ fontStyle: "italic", marginBottom: "24px" }}>
                Zarixa Infobytes Private Limited (operating as &quot;EzeePrints&quot;) is committed to protecting the privacy of Users who access or use the Platform. This Privacy Policy describes the manner in which personal data is collected, used, disclosed, transferred, retained and otherwise processed by the Company in connection with the Platform.
              </p>

              {/* Jump Nav */}
              <div style={{ background: "rgba(250, 247, 241, 0.03)", border: "1px solid rgba(250, 247, 241, 0.06)", borderRadius: "14px", padding: "16px", marginBottom: "32px" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "12px", color: "#A9B59D", margin: "0 0 10px 0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Quick Navigation
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {[
                    { id: 1, label: "1. Definitions" },
                    { id: 2, label: "2. Personal Data We Collect" },
                    { id: 3, label: "3. How We Use Data" },
                    { id: 4, label: "4. Sharing Data" },
                    { id: 5, label: "5. Confidentiality" },
                    { id: 6, label: "6. Retention" },
                    { id: 7, label: "7. Security" },
                    { id: 14, label: "14. Grievance Officer" },
                    { id: 17, label: "17. Contact" }
                  ].map(link => (
                    <button
                      key={link.id}
                      onClick={() => document.getElementById(`privacy-sec-${link.id}`)?.scrollIntoView({ behavior: "smooth" })}
                      style={{
                        background: "rgba(250, 247, 241, 0.05)",
                        border: "1px solid rgba(250, 247, 241, 0.08)",
                        borderRadius: "8px",
                        color: "rgba(250, 247, 241, 0.7)",
                        padding: "6px 12px",
                        fontSize: "12.5px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#D48A70";
                        e.currentTarget.style.color = "#D48A70";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(250, 247, 241, 0.08)";
                        e.currentTarget.style.color = "rgba(250, 247, 241, 0.7)";
                      }}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "40px" }}>
                {privacySections.map((sec, idx) => (
                  <div key={idx} id={`privacy-sec-${idx + 1}`} style={{ scrollMarginTop: "20px" }}>
                    <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "16px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "14px" }}>
                      {sec.title}
                    </h3>
                    <div style={{ color: "rgba(250, 247, 241, 0.75)" }}>{sec.content}</div>
                  </div>
                ))}
              </div>

              {/* Final notice */}
              <div style={{ borderTop: "2px solid #D48A70", paddingTop: "20px", marginTop: "40px", textAlign: "center" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "12px", color: "#FAF7F1", letterSpacing: "0.05em", margin: 0 }}>
                  BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND CONSENT TO THIS PRIVACY POLICY.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showContact && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(15, 12, 11, 0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowContact(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "850px",
              maxHeight: "85vh",
              background: "#1F1917",
              border: "1px solid rgba(250, 247, 241, 0.1)",
              borderRadius: "24px",
              padding: "40px 32px 32px 40px",
              display: "flex",
              flexDirection: "column",
              color: "#FAF7F1",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowContact(false)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(250, 247, 241, 0.05)",
                border: "1px solid rgba(250, 247, 241, 0.1)",
                color: "#FAF7F1",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D48A70";
                e.currentTarget.style.color = "#211b19";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 241, 0.05)";
                e.currentTarget.style.color = "#FAF7F1";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "28px", fontWeight: 800, color: "#D48A70", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                CONTACT DETAILS
              </h2>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "14px", color: "rgba(250, 247, 241, 0.5)", margin: 0 }}>
                EzeePrints — Online Printing Platform (Website, Android Application &amp; iOS Application)
              </p>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "13px", color: "rgba(250, 247, 241, 0.6)", margin: "4px 0 0 0" }}>
                Operated by Zarixa Infobytes Private Limited
              </p>
            </div>

            {/* Content Container */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "16px",
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: "14.5px",
                lineHeight: "1.75",
                color: "rgba(250, 247, 241, 0.8)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <p style={{ margin: 0 }}>
                For any questions, clarifications, complaints or grievances relating to these Terms, the Policies, or the Platform, Users may contact the Company through the following channels:
              </p>

              <div style={{ background: "rgba(250, 247, 241, 0.03)", border: "1px solid rgba(250, 247, 241, 0.08)", borderRadius: "16px", padding: "24px" }}>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                  <li style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <strong style={{ color: "#FAF7F1", minWidth: "220px" }}>• Customer Support Email:</strong>
                    <a href="mailto:support@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>support@ezeeprints.com</a>
                  </li>
                  <li style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <strong style={{ color: "#FAF7F1", minWidth: "220px" }}>• Grievance Officer Email:</strong>
                    <a href="mailto:grievance@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>grievance@ezeeprints.com</a>
                  </li>
                  <li style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <strong style={{ color: "#FAF7F1", minWidth: "220px" }}>• Registered / Corporate Office Address:</strong>
                    <span>Zarixa Infobytes Private Limited, #42, Cozy Lane, 3rd Block, Koramangala, Bengaluru, Karnataka, India - 560034</span>
                  </li>
                  <li style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <strong style={{ color: "#FAF7F1", minWidth: "220px" }}>• Support Hours:</strong>
                    <span>Monday to Saturday, 9:00 AM to 7:00 PM IST</span>
                  </li>
                  <li style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    <strong style={{ color: "#FAF7F1", minWidth: "220px" }}>• In-App Support:</strong>
                    <span>Available through the &quot;Help &amp; Support&quot; section of the Website, Android application and iOS application.</span>
                  </li>
                </ul>
              </div>

              <p style={{ margin: 0 }}>
                The Company shall endeavour to acknowledge all User grievances within forty-eight (48) hours of receipt and to resolve the same within the timelines prescribed under Applicable Law, including the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as applicable.
              </p>
            </div>
          </div>
        </div>
      )}

      {showPartnerAgreement && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(15, 12, 11, 0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowPartnerAgreement(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "850px",
              height: "85vh",
              background: "#1F1917",
              border: "1px solid rgba(250, 247, 241, 0.1)",
              borderRadius: "24px",
              padding: "40px 32px 32px 40px",
              display: "flex",
              flexDirection: "column",
              color: "#FAF7F1",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPartnerAgreement(false)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(250, 247, 241, 0.05)",
                border: "1px solid rgba(250, 247, 241, 0.1)",
                color: "#FAF7F1",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D48A70";
                e.currentTarget.style.color = "#211b19";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(250, 247, 241, 0.05)";
                e.currentTarget.style.color = "#FAF7F1";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "28px", fontWeight: 800, color: "#D48A70", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
                PRINT PARTNER AGREEMENT
              </h2>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "14px", color: "rgba(250, 247, 241, 0.5)", margin: 0 }}>
                EzeePrints — Marketplace Platform for On-Demand Printing Services
              </p>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "13px", color: "rgba(250, 247, 241, 0.6)", margin: "4px 0 0 0" }}>
                Between Zarixa Infobytes Private Limited and Onboarded Print Partners
              </p>
              <p style={{ fontFamily: "Instrument Sans, sans-serif", fontSize: "12px", color: "#A9B59D", margin: "4px 0 0 0", fontWeight: 500 }}>
                Template Version Dated: 24 July 2026
              </p>
            </div>

            {/* Scrollable Content Container */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                paddingRight: "16px",
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: "14.5px",
                lineHeight: "1.7",
                color: "rgba(250, 247, 241, 0.8)",
              }}
            >
              <p style={{ fontStyle: "italic", marginBottom: "24px" }}>
                THIS PRINT PARTNER AGREEMENT (&quot;Agreement&quot;) governs the onboarding, order routing, payment settlement, quality service levels, and operational standards between Zarixa Infobytes Private Limited (operating &quot;EzeePrints&quot;) and independent print shops and vendors (&quot;Print Partners&quot;).
              </p>

              {/* Jump Nav */}
              <div style={{ background: "rgba(250, 247, 241, 0.03)", border: "1px solid rgba(250, 247, 241, 0.06)", borderRadius: "14px", padding: "16px", marginBottom: "32px" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "12px", color: "#A9B59D", margin: "0 0 10px 0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Quick Navigation
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {[
                    { id: 1, label: "1. Definitions" },
                    { id: 2, label: "2. Appointment" },
                    { id: 3, label: "3. Onboarding" },
                    { id: 4, label: "4. Fulfilment" },
                    { id: 5, label: "5. Pricing & Commission" },
                    { id: 6, label: "6. Payments & Settlement" },
                    { id: 7, label: "7. Taxes & Invoicing" },
                    { id: 8, label: "8. Quality & SLAs" },
                    { id: 9, label: "9. Confidentiality" },
                    { id: 12, label: "12. Term & Termination" },
                    { id: 15, label: "15. Dispute Resolution" },
                    { id: 17, label: "Schedule A" }
                  ].map(link => (
                    <button
                      key={link.id}
                      onClick={() => document.getElementById(`partner-sec-${link.id}`)?.scrollIntoView({ behavior: "smooth" })}
                      style={{
                        background: "rgba(250, 247, 241, 0.05)",
                        border: "1px solid rgba(250, 247, 241, 0.08)",
                        borderRadius: "8px",
                        color: "rgba(250, 247, 241, 0.7)",
                        padding: "6px 12px",
                        fontSize: "12.5px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#D48A70";
                        e.currentTarget.style.color = "#D48A70";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(250, 247, 241, 0.08)";
                        e.currentTarget.style.color = "rgba(250, 247, 241, 0.7)";
                      }}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sections */}
              <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "40px" }}>
                {partnerAgreementSections.map((sec, idx) => (
                  <div key={idx} id={`partner-sec-${idx + 1}`} style={{ scrollMarginTop: "20px" }}>
                    <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "16px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "14px" }}>
                      {sec.title}
                    </h3>
                    <div style={{ color: "rgba(250, 247, 241, 0.75)" }}>{sec.content}</div>
                  </div>
                ))}
              </div>

              {/* Final notice */}
              <div style={{ borderTop: "2px solid #D48A70", paddingTop: "20px", marginTop: "40px", textAlign: "center" }}>
                <p style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "12px", color: "#FAF7F1", letterSpacing: "0.05em", margin: 0 }}>
                  BY ONBOARDING AS A PRINT PARTNER, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THIS AGREEMENT.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

const termsSections = [
  {
    title: "1. DEFINITIONS",
    content: (
      <>
        <p>In these Terms and Conditions, unless the context otherwise requires, the following expressions shall have the meanings assigned to them below, and cognate expressions shall be construed accordingly:</p>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
          <li><strong>&quot;Account&quot;</strong> means the registered profile created by a User on the Platform for availing the Services.</li>
          <li><strong>&quot;Applicable Law&quot;</strong> means all applicable statutes, enactments, acts of legislature, ordinances, rules, bye-laws, regulations, notifications, guidelines, policies, directions, directives and orders of any governmental authority, statutory authority, board, tribunal or court of India, and, where the context requires, of any other jurisdiction.</li>
          <li><strong>&quot;App&quot;</strong> means the EzeePrints mobile application made available on the Android and iOS operating systems.</li>
          <li><strong>&quot;Company&quot;, &quot;EzeePrints&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;</strong> means EzeePrints, a technology platform engaged in the business of providing online document printing and related services, together with its directors, officers, employees, affiliates, successors and permitted assigns.</li>
          <li><strong>&quot;Content&quot;</strong> means any document, file, image, design, artwork, text, photograph or other material uploaded, submitted or transmitted by a User through the Platform for the purpose of availing the Services.</li>
          <li><strong>&quot;Coupon&quot;</strong> means any promotional code, discount code or voucher code issued by the Company that may be redeemed by a User subject to the applicable terms of such Coupon.</li>
          <li><strong>&quot;Delivery Partner&quot;</strong> means any third-party logistics service provider engaged by the Company or a Print Partner to effect delivery of a completed Order to a User.</li>
          <li><strong>&quot;Order&quot;</strong> means a request placed by a User through the Platform for the printing, binding, lamination or related processing of Content, together with any associated delivery or pickup instructions.</li>
          <li><strong>&quot;Order Value&quot;</strong> means the total amount payable by a User in respect of an Order, inclusive of applicable taxes, delivery charges and convenience fees, and net of any Coupon or Wallet Credit applied.</li>
          <li><strong>&quot;Partner&quot; or &quot;Print Partner&quot;</strong> means a third-party print vendor, print shop, franchisee or business entity that has been verified and onboarded by the Company to fulfil Orders on behalf of Users through the Platform.</li>
          <li><strong>&quot;Payment Gateway&quot;</strong> means the third-party payment aggregator or payment gateway service provider integrated with the Platform to process payments.</li>
          <li><strong>&quot;Platform&quot;</strong> means, collectively, the website located at www.ezeeprints.com (or such other domain as the Company may adopt), the Android application and the iOS application, together with all sub-domains, features, tools and services made available thereon.</li>
          <li><strong>&quot;Services&quot;</strong> means the online printing, customisation, binding, lamination, pickup and delivery services and all ancillary services made available by the Company through the Platform, whether performed by the Company directly or through a Print Partner.</li>
          <li><strong>&quot;User&quot;, &quot;You&quot; or &quot;Your&quot;</strong> means any natural person, or a business entity acting through an authorised representative, who accesses, browses, downloads, registers on or otherwise uses the Platform.</li>
          <li><strong>&quot;Wallet Credit&quot;</strong> means any monetary value credited to a User&apos;s Account on the Platform, whether through refunds, promotional credits, cashback or direct top-up, which may be applied towards the Order Value of a future Order, subject to these Terms.</li>
          <li><strong>&quot;Wallet&quot;</strong> means the digital ledger maintained on the Platform reflecting the Wallet Credit balance of a User.</li>
          <li><strong>&quot;Business Day&quot;</strong> means a day other than a Saturday, Sunday or a public holiday on which scheduled banks are open for business in Bengaluru, Karnataka.</li>
          <li><strong>&quot;Institution&quot;</strong> means a school, college, university, coaching centre, corporate entity or other organisation that has entered into a specific institutional arrangement with the Company as contemplated under Clause 4.5.</li>
          <li><strong>&quot;Intellectual Property Rights&quot;</strong> means all patents, copyrights, trademarks, service marks, trade names, trade secrets, database rights, design rights, moral rights and any other intellectual or industrial property rights, whether registered or unregistered, anywhere in the world.</li>
          <li><strong>&quot;Turnaround Time&quot;</strong> means the estimated period, as displayed on the Platform, between confirmation of an Order and the Order being made ready for pickup or dispatched for delivery, as more particularly described in Clause 7.4.</li>
        </ul>
      </>
    )
  },
  {
    title: "2. ACCEPTANCE OF TERMS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>2.1</strong> These Terms and Conditions (these &quot;Terms&quot;), read together with the Privacy Policy, Refund and Cancellation Policy, and any other policy, guideline or notice published on the Platform from time to time (collectively, the &quot;Policies&quot;), constitute the entire agreement between You and the Company in relation to Your use of the Platform and the Services.</p>
        <p><strong>2.2</strong> By accessing, browsing, downloading, installing, registering on, or otherwise using the Platform in any manner whatsoever, You acknowledge that You have read, understood and agree to be unconditionally bound by these Terms and the Policies. If You do not agree with any part of these Terms, You must immediately discontinue use of the Platform.</p>
        <p><strong>2.3</strong> Your acceptance of these Terms may be indicated by (a) clicking on an &quot;I Agree&quot;, &quot;Accept&quot; or similarly worded button or checkbox at the time of registration or checkout; (b) continued use of the Platform following notification of any amendment to these Terms; or (c) the placement of an Order through the Platform. Each of the foregoing shall constitute valid electronic acceptance under Applicable Law, including the Information Technology Act, 2000 and the rules framed thereunder.</p>
        <p><strong>2.4</strong> These Terms apply uniformly to the website, the Android application and the iOS application. Where a provision applies specifically to only one of these access channels, the same shall be expressly stated; in the absence of such express statement, the provision shall be construed as applying to all access channels.</p>
        <p><strong>2.5</strong> The Company reserves the right, at its sole discretion, to refuse access to the Platform or provision of Services to any person or entity without assigning any reason, to the extent permissible under Applicable Law.</p>
      </div>
    )
  },
  {
    title: "3. ELIGIBILITY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>3.1</strong> The Platform is intended for use by persons who are competent to contract under the Indian Contract Act, 1872, being persons who have attained the age of eighteen (18) years and are of sound mind, and are not disqualified from entering into a contract under any Applicable Law.</p>
        <p><strong>3.2</strong> If You are accessing or using the Platform on behalf of a company, educational institution, firm or other legal entity, You represent and warrant that You are duly authorised to act on behalf of such entity and to bind it to these Terms, and references to &quot;User&quot; shall, in such case, include both You individually and the entity so represented, jointly and severally.</p>
        <p><strong>3.3</strong> Persons who have been temporarily or permanently suspended or debarred from using the Platform by the Company shall not be entitled to access or use the Platform, whether under the same Account, a new Account, or on behalf of any third party, during the period of such suspension or debarment.</p>
        <p><strong>3.4</strong> The Company does not knowingly permit use of the Platform by minors. If the Company becomes aware that an Account has been created or is being operated by a person below eighteen (18) years of age without appropriate supervision, the Company reserves the right to suspend or terminate such Account forthwith.</p>
      </div>
    )
  },
  {
    title: "4. USER ACCOUNTS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>4.1 Registration</strong>: To avail certain Services, You are required to register and create an Account on the Platform by providing accurate, current and complete information, including but not limited to Your name, mobile number, email address and, where applicable, institutional or business affiliation. You may be permitted to register using Your mobile number with One-Time-Password (&quot;OTP&quot;) verification, email address, or a supported third-party sign-in service (such as Google or Apple sign-in).</p>
        <p><strong>4.2 Accuracy of Information</strong>: You are solely responsible for ensuring that the information provided at the time of registration and at all times thereafter is accurate, current and complete. The Company shall not be liable for any loss or damage arising from Your failure to comply with this obligation, including non-delivery of Orders due to incorrect address or contact details.</p>
        <p><strong>4.3 Account Security</strong>: You are solely responsible for maintaining the confidentiality of Your Account credentials, including any password, PIN or OTP associated with Your Account, and for all activities that occur under Your Account, whether or not authorised by You. You agree to immediately notify the Company of any unauthorised use of Your Account or any other breach of security through the contact channels specified in Clause 33.</p>
        <p><strong>4.4 One Account Per User</strong>: Unless expressly authorised by the Company in writing, each User shall be permitted to maintain only one Account. The Company reserves the right to merge, suspend or deactivate multiple Accounts identified as belonging to the same User, particularly where such multiple registrations are used to misuse Coupons, referral incentives or promotional offers.</p>
        <p><strong>4.5 Institutional Accounts</strong>: Where the Company enters into a specific arrangement with an educational institution, business or organisation for bulk or institutional access, such access shall additionally be governed by the specific terms of the arrangement between the Company and such institution, which shall prevail to the extent of any inconsistency with these Terms concerning that institutional arrangement alone.</p>
        <p><strong>4.6 Accuracy of Account Information for Invoicing</strong>: Where a User provides GSTIN or other tax registration details for the purposes of invoicing, the User shall be solely responsible for the correctness of such details, and the Company shall not be liable for any adverse tax consequence arising from incorrect details furnished by the User.</p>
      </div>
    )
  },
  {
    title: "5. PLATFORM SERVICES",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>5.1 Nature of the Platform</strong>: EzeePrints is a technology platform that facilitates the online submission of print orders. The Company enables Users to upload Content, select customisation options and make payment, and thereafter facilitates the fulfilment of such Orders either through its own print facilities or through verified Print Partners, and the subsequent pickup or delivery of the printed output.</p>
        <p><strong>5.2 Facilitator Role</strong>: Save where an Order is fulfilled directly by the Company, the Company acts solely as a technology intermediary within the meaning of the Information Technology Act, 2000, facilitating a transaction between the User and the relevant Print Partner. The contract for printing services in such cases is between the User and the Print Partner, and the Company&apos;s role is limited to providing the technology platform, payment facilitation, quality assurance protocols and customer support in relation to such transaction.</p>
        <p><strong>5.3 Service Availability</strong>: The Services, including the availability of specific print options, delivery, pickup and turnaround times, are subject to serviceability at the User&apos;s location and may vary by city, pin code, campus or institution. The Company does not guarantee that all Services will be available at all locations at all times.</p>
        <p><strong>5.4 Modification of Services</strong>: The Company reserves the right to add, modify, suspend or discontinue any Service, feature or functionality of the Platform, in whole or in part, at any time, with or without prior notice, without incurring any liability to any User.</p>
        <p><strong>5.5 No Guarantee of Continuous Access</strong>: While the Company endeavours to keep the Platform operational at all times, the Company does not warrant that the Platform will be uninterrupted, error-free, secure or free from viruses or other harmful components. Access to the Platform may be suspended temporarily for maintenance, upgrades, or due to circumstances beyond the Company&apos;s reasonable control.</p>
        <p><strong>5.6 Future Services and New Verticals</strong>: The Company may, from time to time, introduce new categories of Services beyond document printing, including but not limited to photo printing, merchandise and apparel printing, design and layout assistance, subscription or membership plans offering discounted rates, loyalty or rewards programmes, and business-to-business bulk printing solutions for Institutions. Each such new Service shall be governed by these Terms, read together with any additional terms specific to that Service published by the Company at the relevant time.</p>
        <p><strong>5.7 Geographic Expansion</strong>: The Company may expand the Services to new cities, states or countries at its discretion. Where Services are offered in a jurisdiction outside India, the Company may publish jurisdiction-specific supplementary terms to address local consumer protection, taxation, and data protection requirements, which shall prevail over these Terms to the extent of any inconsistency for Users in that jurisdiction alone.</p>
        <p><strong>5.8 Customer Support</strong>: The Company provides customer support through in-app chat, email and/or telephone helpline, as more particularly described in Clause 33. Response and resolution timelines communicated by customer support representatives are indicative and shall not be construed as a contractual commitment unless confirmed in writing by an authorised representative of the Company.</p>
      </div>
    )
  },
  {
    title: "6. ORDER PLACEMENT",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>6.1 Process</strong>: To place an Order, a User shall (a) upload the Content in a format supported by the Platform; (b) select the desired print specifications, including paper size, paper type, colour or black-and-white printing, binding, lamination, number of copies and any other customisation option made available; (c) select a fulfilment method, being pickup from a designated location or delivery to a specified address, subject to serviceability; and (d) complete payment of the Order Value through the payment options available on the Platform.</p>
        <p><strong>6.2 Order Confirmation</strong>: An Order shall be deemed to be placed only upon generation of an order confirmation and successful debit of the Order Value (or successful application of Wallet Credit in full settlement thereof). An Order confirmation does not constitute a guarantee of a specific delivery or pickup time, which shall remain subject to Clause 15 and Clause 16.</p>
        <p><strong>6.3 User&apos;s Responsibility for Specifications</strong>: The User is solely responsible for verifying the accuracy of the uploaded Content and the print specifications selected before submitting the Order. Once an Order has entered production, the Company shall use reasonable efforts, but shall not be obliged, to accommodate a request for modification or cancellation.</p>
        <p><strong>6.4 Rejection of Orders</strong>: The Company reserves the right to refuse, cancel or hold in abeyance any Order, at any stage prior to or during fulfilment, where: (a) the Content is unlawful, offensive or in violation of Clause 9 (Intellectual Property) or Clause 10 (User Content); (b) the Content is technically defective, corrupted, or incompatible with the Platform&apos;s print specifications; (c) the User has provided false, incomplete or misleading information; (d) the Order appears fraudulent, or is placed using stolen payment credentials or in violation of Applicable Law; or (e) circumstances of Force Majeure under Clause 25 render fulfilment impracticable. In such event, the Company shall refund any amount already paid, less any costs already reasonably incurred, in accordance with Clause 13.</p>
        <p><strong>6.5 Multiple Orders</strong>: Where a User places multiple Orders for delivery to a common address or in a manner that appears designed to circumvent minimum order value, delivery charge thresholds or promotional restrictions, the Company reserves the right to treat such Orders as a single Order for billing and delivery-charge purposes.</p>
      </div>
    )
  },
  {
    title: "7. THE PRINTING PROCESS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>7.1 Assignment to Fulfilment Centre</strong>: Upon confirmation, an Order shall be automatically or manually routed by the Platform to the Company&apos;s own print facility or to a Print Partner located nearest to, or best suited to serve, the User&apos;s selected pickup or delivery location, based on factors including capacity, specification compatibility and turnaround time.</p>
        <p><strong>7.2 Production</strong>: The assigned facility shall process the Content in accordance with the specifications selected by the User. Colours, finishes and material shall be reproduced using industry-standard equipment and processes; however, Users acknowledge and accept the print quality disclaimers set out in Clause 20.</p>
        <p><strong>7.3 Quality Checks</strong>: The Company implements reasonable quality-assurance protocols, including but not limited to pre-print file validation and post-print visual inspection, which Print Partners are contractually required to follow. However, the Company does not inspect every individual page of every Order and relies on sampling-based and process-based quality assurance.</p>
        <p><strong>7.4 Turnaround Time</strong>: Estimated turnaround times displayed on the Platform are indicative and may vary depending on Order volume, complexity, time of placement, and Force Majeure events. Turnaround time commences from the point of Order confirmation and successful payment, and not from the time of upload.</p>
        <p><strong>7.5 Handling of Sensitive Content</strong>: Where a User uploads Content of a confidential or sensitive nature, the User acknowledges that such Content will, of necessity, be accessible to personnel at the print facility solely for the purpose of production, and the Company shall implement reasonable technical and organisational measures, and require equivalent undertakings from Print Partners, to protect the confidentiality of such Content, subject to Clause 22 (Data Privacy).</p>
      </div>
    )
  },
  {
    title: "8. USER RESPONSIBILITIES",
    content: (
      <>
        <p>By using the Platform, You agree that You shall:</p>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
          <li><strong>(a)</strong> use the Platform solely for lawful purposes and in accordance with these Terms;</li>
          <li><strong>(b)</strong> upload only Content that You are legally entitled to reproduce, print and distribute, and that does not infringe the Intellectual Property Rights, privacy rights or any other right of any third party;</li>
          <li><strong>(c)</strong> not upload Content that is obscene, defamatory, pornographic (including content involving minors, which shall be reported to appropriate authorities), seditious, promotes enmity between groups, infringes any statute including the Copyright Act, 1957, the Trade Marks Act, 1999, or is otherwise unlawful under Applicable Law including the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021;</li>
          <li><strong>(d)</strong> not use any automated means, including bots, scrapers or crawlers, to access the Platform or extract data therefrom, save to the extent expressly permitted by the Company;</li>
          <li><strong>(e)</strong> not attempt to gain unauthorised access to the Platform, any Account not belonging to You, or any server, system or network connected to the Platform;</li>
          <li><strong>(f)</strong> not reverse engineer, decompile, disassemble or otherwise attempt to derive the source code of the Platform or any part thereof;</li>
          <li><strong>(g)</strong> not upload viruses, malware, or any code designed to disrupt, damage or limit the functionality of the Platform or any computer resource;</li>
          <li><strong>(h)</strong> not misuse the Coupon, referral, or Wallet Credit mechanisms of the Platform, including by creating multiple Accounts or engaging in any form of self-referral;</li>
          <li><strong>(i)</strong> not impersonate any person or entity or misrepresent Your affiliation with any person or entity;</li>
          <li><strong>(j)</strong> provide accurate delivery or pickup information and be reasonably available to receive the Order at the specified location and time window; and</li>
          <li><strong>(k)</strong> comply with all Applicable Law in connection with Your use of the Platform, including in respect of the nature of Content printed for onward distribution or commercial use;</li>
          <li><strong>(l)</strong> not use the Services to print counterfeit currency, forged documents, forged academic certificates, fraudulent identity documents, or any other material the possession or reproduction of which is prohibited under Applicable Law; and</li>
          <li><strong>(m)</strong> maintain up-to-date device software and take reasonable precautions (such as using licensed antivirus software) to protect the security of the device used to access the Platform.</li>
        </ul>
        <p style={{ marginTop: "12px" }}>Breach of any provision of this Clause 8 shall entitle the Company to suspend or terminate the User&apos;s Account in accordance with Clause 27, in addition to any other remedy available to the Company in law or equity.</p>
      </>
    )
  },
  {
    title: "9. INTELLECTUAL PROPERTY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>9.1 Platform IP</strong>: The Platform, including its name, logo, trademarks, &quot;EzeePrints&quot; brand identity, look and feel, source code, object code, design, graphics, layout and all software, algorithms and databases underlying the Platform (collectively, the &quot;Company IP&quot;), are the exclusive property of the Company or its licensors and are protected under the Copyright Act, 1957, the Trade Marks Act, 1999, and other Applicable Law and international treaties. Nothing in these Terms shall be construed as transferring or granting any right, title or interest in the Company IP to any User, save for the limited, revocable, non-exclusive, non-transferable licence to access and use the Platform strictly in accordance with these Terms.</p>
        <p><strong>9.2 Restrictions</strong>: You shall not copy, reproduce, republish, frame, mirror, upload, transmit, distribute, modify or create derivative works from any part of the Company IP without the Company&apos;s prior written consent.</p>
        <p><strong>9.3 Trademarks</strong>: All trademarks, service marks, trade names and logos displayed on the Platform, other than those belonging to third parties, are the property of the Company. Use of the Company&apos;s trademarks in any manner without prior written authorisation is strictly prohibited.</p>
        <p><strong>9.4 Feedback</strong>: Any suggestion, idea, enhancement request or feedback provided by You in relation to the Platform shall be deemed to be provided on a non-confidential and gratuitous basis, and the Company shall be free to use, reproduce, modify and incorporate the same into the Platform without any obligation of attribution or compensation to You.</p>
      </div>
    )
  },
  {
    title: "10. USER CONTENT",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>10.1 Ownership Retained by User</strong>: As between the Company and the User, the User retains all Intellectual Property Rights in and to the Content uploaded by the User. The Company does not claim ownership over any Content.</p>
        <p><strong>10.2 Limited Licence to the Company</strong>: By uploading Content to the Platform, the User grants to the Company and, to the extent necessary for fulfilment, to the relevant Print Partner and Delivery Partner, a limited, non-exclusive, royalty-free, worldwide licence to access, store, reproduce, process, transmit and print such Content solely for the purpose of fulfilling the User&apos;s Order and for no other purpose whatsoever. This licence shall automatically terminate upon completion of the Order, save to the limited extent that retention is required for legal, regulatory, dispute-resolution or backup purposes, in accordance with the Company&apos;s data retention practices.</p>
        <p><strong>10.3 User Warranties Regarding Content</strong>: The User represents and warrants that: (a) the User owns or has obtained all necessary rights, licences, consents and permissions to upload, reproduce and print the Content; (b) the Content does not infringe the copyright, trademark, moral right, right of privacy, right of publicity or any other right of any third party; and (c) the printing and, where applicable, distribution of the Content by or on behalf of the User does not violate any Applicable Law.</p>
        <p><strong>10.4 No Obligation to Pre-Screen</strong>: The Company is not obliged to pre-screen Content prior to printing, save for automated technical validation. However, the Company reserves the right, but not the obligation, to review, refuse to print, or remove any Content that it reasonably believes to be in violation of Clause 8 or Clause 10.3, without incurring any liability to the User.</p>
        <p><strong>10.5 Deletion of Content</strong>: Uploaded Content shall be retained on the Company&apos;s servers only for such period as is reasonably necessary to fulfil the Order and to address any post-Order query or dispute, after which it shall be deleted or anonymised in accordance with the Company&apos;s data retention schedule, save where retention is required under Applicable Law.</p>
      </div>
    )
  },
  {
    title: "11. PRICING",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>11.1 Display of Prices</strong>: Prices for the Services are displayed on the Platform on a per-page, per-copy, per-unit or per-Order basis, as applicable, and are subject to change by the Company at any time without prior notice. The price applicable to a particular Order shall be the price displayed on the Platform at the time the Order is confirmed and paid for.</p>
        <p><strong>11.2 Inclusive of Taxes</strong>: Unless expressly stated otherwise, prices displayed on the Platform are inclusive of applicable Goods and Services Tax (&quot;GST&quot;) and other statutory levies in force at the time of the transaction. Any change in the rate of GST or introduction of any new levy subsequent to display of price but prior to Order confirmation may be passed on to the User, and shall be reflected at the time of checkout.</p>
        <p><strong>11.3 Delivery and Convenience Charges</strong>: Delivery charges, convenience fees, rush/priority processing fees, and other ancillary charges, where applicable, shall be displayed separately at the time of checkout and shall form part of the Order Value.</p>
        <p><strong>11.4 Variable Pricing</strong>: Prices may vary based on factors including geographic location, Print Partner, demand, time of day, urgency of processing, and prevailing promotional offers. Variation in price across users, locations or time periods shall not, by itself, entitle any User to a price adjustment, refund or claim of unfair pricing.</p>
        <p><strong>11.5 Errors in Pricing</strong>: In the event of an obvious pricing error (such as a technical glitch resulting in a materially incorrect price), the Company reserves the right to cancel the affected Order and refund the amount paid, notwithstanding that the Order may have been confirmed, and shall not be obliged to honour the erroneous price.</p>
      </div>
    )
  },
  {
    title: "12. PAYMENTS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>12.1 Payment Methods</strong>: Payment for an Order may be made through the payment methods made available on the Platform from time to time, including debit cards, credit cards, net banking, Unified Payments Interface (&quot;UPI&quot;), digital wallets, and Wallet Credit, processed through the Payment Gateway.</p>
        <p><strong>12.2 Third-Party Payment Processing</strong>: All payment transactions are processed by the Payment Gateway, which is an independent third-party service provider regulated by the Reserve Bank of India and/or other applicable regulatory authorities. The Company does not store or have access to Your complete card details, and such information is handled directly by the Payment Gateway in accordance with applicable data security standards, including the Payment Card Industry Data Security Standard (&quot;PCI-DSS&quot;).</p>
        <p><strong>12.3 Authorisation</strong>: By initiating a payment, You authorise the Company and the Payment Gateway to charge the applicable payment instrument for the Order Value, and any applicable taxes and charges thereon.</p>
        <p><strong>12.4 Failed or Delayed Transactions</strong>: In the event a payment is debited from Your account or instrument but the corresponding Order is not confirmed on the Platform due to a technical failure, the amount shall ordinarily be reversed to the original payment method by the Payment Gateway within the timelines prescribed by the Payment Gateway or the applicable bank, which the Company shall not be liable to expedite beyond making reasonable representations on Your behalf.</p>
        <p><strong>12.5 No Liability for Payment Gateway Acts</strong>: The Company shall not be liable for any loss, delay, failure or breach of security attributable to the Payment Gateway or the User&apos;s bank or card issuer, including denial of authorisation, unauthorised use of a payment instrument by a third party, or downtime of the Payment Gateway.</p>
        <p><strong>12.6 Invoicing</strong>: A tax invoice for each Order shall be generated and made available to the User electronically through the Platform or via email, in accordance with Applicable Law.</p>
      </div>
    )
  },
  {
    title: "13. REFUNDS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>13.1 General Principle</strong>: Refunds, where applicable, shall be processed in accordance with the Company&apos;s Refund and Cancellation Policy as published on the Platform and as may be amended from time to time, which is incorporated by reference into these Terms.</p>
        <p><strong>13.2 Refund to Original Source or Wallet</strong>: Refunds shall, at the Company&apos;s discretion, be processed either to the original payment method or as Wallet Credit, save where Applicable Law mandates refund to the original payment method only.</p>
        <p><strong>13.3 Circumstances for Refund</strong>: A refund may be considered where: (a) the Order is cancelled prior to commencement of production in accordance with Clause 14; (b) the Company is unable to fulfil the Order for reasons attributable to the Company or a Print Partner; (c) the delivered or collected Order is materially defective through no fault of the User, subject to Clause 20 and the reporting timelines specified in the Refund and Cancellation Policy; or (d) an erroneous or duplicate payment has occurred.</p>
        <p><strong>13.4 Non-Refundable Situations</strong>: No refund shall be payable where: (a) the defect or discrepancy arises from an error in the Content uploaded by the User, including incorrect file, formatting or specification selection by the User; (b) the User fails to collect the Order within the stipulated pickup window or is unavailable to receive delivery within a reasonable number of delivery attempts; (c) the claim is raised after expiry of the reporting window specified in the Refund and Cancellation Policy; or (d) the Order has already been printed in accordance with the User&apos;s specifications and no defect attributable to the Company or Print Partner is established.</p>
        <p><strong>13.5 Processing Timeline</strong>: Approved refunds shall be processed within the timeline specified in the Refund and Cancellation Policy, which shall in any event not exceed the timelines prescribed under Applicable Law, it being clarified that the actual credit to the User&apos;s account is subject to the processing timelines of the Payment Gateway and the User&apos;s bank, over which the Company has no control.</p>
      </div>
    )
  },
  {
    title: "14. CANCELLATION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>14.1 Cancellation by User</strong>: A User may cancel an Order without charge at any time before the Order enters production. Once an Order has entered production, cancellation may be permitted at the sole discretion of the Company, and, if permitted, shall be subject to deduction of costs already incurred (including materials consumed and processing charges).</p>
        <p><strong>14.2 Non-Cancellable Orders</strong>: Orders involving custom, made-to-specification items, or Orders explicitly marked as non-cancellable at the time of checkout, shall not be eligible for cancellation once confirmed, save where required otherwise under Applicable Law.</p>
        <p><strong>14.3 Cancellation by the Company</strong>: The Company may cancel an Order, in whole or in part, at any stage, in the circumstances described in Clause 6.4, or where fulfilment is rendered impossible or commercially impracticable due to Force Majeure, unavailability of a Print Partner, or any other reason beyond the Company&apos;s reasonable control. In such event, the Company shall refund any amount paid in respect of the cancelled Order, subject to Clause 13.</p>
        <p><strong>14.4 Effect of Cancellation</strong>: Upon valid cancellation, the licence granted under Clause 10.2 in respect of the cancelled Order shall terminate, and the Company shall take reasonable steps to delete the associated Content, save to the extent retention is otherwise required.</p>
      </div>
    )
  },
  {
    title: "15. DELIVERY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>15.1 Serviceable Areas</strong>: Delivery of Orders is available only in locations designated as serviceable on the Platform, as updated from time to time. Serviceability is determined based on factors including the availability of a Print Partner or Delivery Partner network in the relevant area.</p>
        <p><strong>15.2 Delivery Timelines</strong>: Estimated delivery timelines displayed on the Platform are indicative and not guaranteed, and may be affected by factors including weather, traffic, regulatory restrictions, incorrect address details furnished by the User, and other circumstances beyond the Company&apos;s reasonable control.</p>
        <p><strong>15.3 Delivery Attempts</strong>: The Delivery Partner shall make a reasonable number of attempts, as specified in the Company&apos;s operational policy (ordinarily up to two attempts), to deliver the Order to the address specified by the User. If delivery cannot be effected despite such attempts due to the User&apos;s unavailability, incorrect address, or refusal to accept delivery, the Order may be treated as undelivered, and the User may be required to arrange pickup or bear re-delivery charges, at the Company&apos;s discretion.</p>
        <p><strong>15.4 Risk of Loss</strong>: Risk in the printed Order shall pass to the User upon delivery to the address specified by the User or to a person reasonably appearing to be authorised to receive the same at that address.</p>
        <p><strong>15.5 Inspection at Delivery</strong>: The User is encouraged to inspect the Order at the time of delivery. Any claim of visible damage or discrepancy must be reported in accordance with the timelines specified in the Refund and Cancellation Policy.</p>
      </div>
    )
  },
  {
    title: "16. PICKUP",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>16.1 Pickup Locations</strong>: Where a User selects pickup as the fulfilment method, the Order shall be made available for collection at the designated pickup point (which may be the Company&apos;s facility, a Print Partner location, or a designated campus or institutional collection point) specified at the time of Order placement.</p>
        <p><strong>16.2 Collection Window</strong>: The User shall collect the Order within the collection window communicated on the Platform (ordinarily a specified number of days from the date the Order is marked ready for pickup). Orders not collected within such window may be subject to storage charges or may be cancelled, at the Company&apos;s discretion, without entitlement to refund, save as required under Applicable Law.</p>
        <p><strong>16.3 Identity Verification</strong>: The Company or Print Partner may require the User, or a person authorised by the User, to produce the order confirmation, a one-time pickup code, or valid identification prior to handing over the Order, as a reasonable anti-fraud measure.</p>
        <p><strong>16.4 Risk of Loss on Pickup</strong>: Risk in the printed Order shall pass to the User upon collection at the designated pickup location.</p>
      </div>
    )
  },
  {
    title: "17. PROMOTIONS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>17.1 Nature of Promotions</strong>: The Company may, at its sole discretion, run promotional campaigns, offers, contests or schemes (&quot;Promotions&quot;) on the Platform from time to time, each of which shall be governed by these Terms read together with the specific terms applicable to that Promotion, as published on the Platform.</p>
        <p><strong>17.2 Eligibility</strong>: Eligibility for a Promotion may be restricted based on criteria such as User category (for example, first-time Users, students, or institutional Users), geographic location, minimum Order Value, or specific payment method, and the Company reserves the right to verify eligibility and to deny or reverse the benefit of a Promotion where eligibility criteria are not satisfied or are found to have been circumvented.</p>
        <p><strong>17.3 Modification and Withdrawal</strong>: The Company reserves the right to modify, suspend or withdraw any Promotion at any time without prior notice, provided that such modification or withdrawal shall not affect Orders already confirmed under the terms of the Promotion prior to such modification or withdrawal.</p>
        <p><strong>17.4 No Cash Value</strong>: Unless expressly stated otherwise, the benefit of a Promotion has no cash value, is non-transferable, cannot be exchanged for cash or Wallet Credit, and cannot be combined with any other Promotion or Coupon save as expressly permitted.</p>
      </div>
    )
  },
  {
    title: "18. COUPONS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>18.1 Redemption</strong>: A Coupon may be applied to an eligible Order at checkout, subject to the specific terms of that Coupon, including any minimum Order Value, applicable Services, maximum discount cap, validity period, and usage limit per User.</p>
        <p><strong>18.2 Validity</strong>: A Coupon shall be valid only for the period specified by the Company and shall automatically expire and become void thereafter, whether or not such expiry is separately notified to the User.</p>
        <p><strong>18.3 Non-Transferability</strong>: A Coupon is personal to the User to whom it is issued (or, where issued generally, to the first User who validly redeems it) and shall not be sold, transferred, exchanged for cash, or used for any commercial purpose.</p>
        <p><strong>18.4 Reversal for Misuse</strong>: Where the Company reasonably determines that a Coupon has been availed fraudulently, in violation of its terms, or through the creation of multiple or fictitious Accounts, the Company reserves the right to reverse the benefit of the Coupon, cancel the associated Order, deduct an equivalent amount from the User&apos;s Wallet, or suspend the User&apos;s Account, in addition to any other remedy available under Applicable Law.</p>
        <p><strong>18.5 Company&apos;s Discretion</strong>: The Company reserves the right to modify the terms of, or discontinue, any Coupon at any time without prior notice, save that Coupons already validly applied to a confirmed Order shall not be affected retrospectively.</p>
      </div>
    )
  },
  {
    title: "19. WALLET CREDITS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>19.1 Crediting of Wallet</strong>: Wallet Credit may be credited to a User&apos;s Account pursuant to a refund, a promotional grant, a cashback offer, or a direct top-up, as applicable, and shall be reflected in the User&apos;s Wallet on the Platform.</p>
        <p><strong>19.2 Utilisation</strong>: Wallet Credit may be applied, in whole or in part, towards the Order Value of a future Order, subject to any conditions specified at the time such Wallet Credit was credited (including expiry, minimum Order Value, or restriction to specific categories of Services).</p>
        <p><strong>19.3 Non-Withdrawability</strong>: Save as required under Applicable Law or as expressly stated by the Company at the time of crediting, Wallet Credit is not withdrawable, encashable, or transferable to a bank account, another payment instrument, or another User&apos;s Account, and shall be usable solely for placing Orders on the Platform.</p>
        <p><strong>19.4 Expiry</strong>: Wallet Credit, particularly promotional Wallet Credit, may carry a validity period, upon expiry of which the unutilised balance shall lapse without any obligation on the Company to compensate the User, save where such lapse is not permitted under Applicable Law.</p>
        <p><strong>19.5 Forfeiture on Account Closure</strong>: Upon voluntary closure of an Account by a User, or termination of an Account by the Company for cause under Clause 27, any unutilised Wallet Credit that constitutes a promotional or non-monetary grant shall stand forfeited, provided that any Wallet Credit representing a monetary refund due to the User shall, upon request, be processed to the User&apos;s original payment method or bank account, subject to verification, and subject to Applicable Law including provisions relating to unclaimed amounts.</p>
        <p><strong>19.6 Accuracy of Wallet Balance</strong>: The Company shall use reasonable efforts to ensure the accuracy of the Wallet balance displayed on the Platform, and reserves the right to correct any erroneous crediting of Wallet Credit arising from a technical error, whether or not such Wallet Credit has already been utilised, by adjusting future Wallet balances or Order Values accordingly.</p>
      </div>
    )
  },
  {
    title: "20. PRINT QUALITY DISCLAIMER",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>20.1 Dependence on Source File</strong>: The quality of the printed output is materially dependent on the resolution, format, colour profile and overall quality of the Content uploaded by the User. The Company does not warrant or guarantee that the printed output will replicate, without variance, the appearance of the Content as displayed on the User&apos;s own screen or device, on account of inherent differences between screen display (RGB colour space) and print output (CMYK colour space), device calibration, and paper or material characteristics.</p>
        <p><strong>20.2 Colour Variance</strong>: Minor variance in colour reproduction, shade, or tone between what is displayed on-screen and the final printed output shall not, by itself, constitute a defect entitling the User to a refund or reprint, unless such variance is material and clearly attributable to an error on the part of the Company or the Print Partner and not to the characteristics of the source file or the inherent limitations of the printing process or medium.</p>
        <p><strong>20.3 Binding and Lamination</strong>: Binding, spiral, lamination and similar finishing options are subject to reasonable industry-standard tolerances in alignment, trimming and finish, and minor variance therein shall not constitute a defect.</p>
        <p><strong>20.4 Low-Resolution or Defective Files</strong>: Where a User uploads Content that is low-resolution, pixelated, corrupted, incorrectly formatted, or otherwise likely to produce sub-optimal print output, the Company and the Print Partner shall bear no liability for the resultant quality of the printed output, notwithstanding that the Platform may, on a best-effort basis, notify the User of such likely issues prior to production, without any obligation to do so.</p>
        <p><strong>20.5 No Warranty of Fitness for Particular Purpose</strong>: Save as expressly stated in these Terms, the Company makes no warranty, express or implied, as to the fitness of the printed Order for any particular purpose (including, without limitation, submission to any academic, governmental, or regulatory authority), and the User is solely responsible for ascertaining any format, size, or quality requirements imposed by the intended recipient of the printed Order prior to placing the Order.</p>
        <p><strong>20.6 Sample and Proof Requests</strong>: Where the Platform offers a &quot;preview&quot; or &quot;proof&quot; feature prior to final submission of an Order, the User is strongly encouraged to utilise the same and to carefully verify layout, pagination, orientation and colour scheme before confirming the Order, as the availability of such preview feature, where offered, shall be deemed to shift responsibility for undetected but visible errors in layout or pagination onto the User to the extent such errors were reasonably capable of detection through the preview.</p>
      </div>
    )
  },
  {
    title: "21. THIRD-PARTY SERVICES",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>21.1 Print Partners</strong>: Orders may be fulfilled by verified Print Partners rather than directly by the Company. The Company conducts reasonable onboarding diligence and periodic quality audits of Print Partners; however, the Company does not guarantee the acts, omissions, solvency, or continued availability of any Print Partner.</p>
        <p><strong>21.2 Delivery Partners</strong>: Delivery of Orders may be undertaken by third-party Delivery Partners engaged by the Company or by a Print Partner. The Company shall use reasonable efforts to ensure that Delivery Partners are reputable and reliable but does not guarantee, and shall not be liable for, any act or omission of a Delivery Partner, save to the extent such liability cannot be excluded under Applicable Law.</p>
        <p><strong>21.3 Payment Gateway</strong>: As set out in Clause 12, payment processing is undertaken by an independent Payment Gateway, and the Company&apos;s liability in respect of the acts or omissions of the Payment Gateway is as set out in Clause 12.5.</p>
        <p><strong>21.4 Third-Party Links and Integrations</strong>: The Platform may contain links to, or integrations with, third-party websites, applications or services (including social media sign-in, analytics, and customer support tools). The Company does not control and is not responsible for the content, privacy practices, or terms of use of such third-party services, and Your use thereof shall be governed by the respective terms and privacy policies of such third parties.</p>
        <p><strong>21.5 No Agency Beyond Stated Scope</strong>: Save as expressly set out in these Terms, nothing herein shall be construed as creating any agency, partnership, joint venture, or employment relationship between the Company, on the one hand, and any Print Partner or Delivery Partner, on the other.</p>
      </div>
    )
  },
  {
    title: "22. DATA PRIVACY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>22.1 Privacy Policy</strong>: The Company&apos;s collection, use, storage, sharing and processing of personal information of Users is governed by its Privacy Policy, published on the Platform, which is incorporated by reference into these Terms. By using the Platform, You consent to the collection and processing of Your personal data in accordance with the Privacy Policy.</p>
        <p><strong>22.2 Compliance with Law</strong>: The Company shall process personal data in accordance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, the Digital Personal Data Protection Act, 2023 (upon and to the extent it comes into force and applies), and other Applicable Law relating to data protection and privacy.</p>
        <p><strong>22.3 Content Confidentiality</strong>: Content uploaded for printing shall be treated as confidential and accessed only to the extent necessary for order fulfilment, quality assurance, and legal compliance, by authorised personnel of the Company and, where applicable, the Print Partner, each of whom shall be subject to confidentiality obligations no less protective than those set out herein.</p>
        <p><strong>22.4 Data Sharing with Partners</strong>: The Company may share such Content and personal data as is reasonably necessary with the assigned Print Partner and Delivery Partner solely for the purpose of fulfilling the Order, and such Print Partners and Delivery Partners shall be contractually bound to use such data solely for that purpose and to implement reasonable security safeguards.</p>
        <p><strong>22.5 Security Measures</strong>: The Company implements reasonable technical and organisational security measures designed to protect User data against unauthorised access, alteration, disclosure or destruction; however, no method of electronic transmission or storage is entirely secure, and the Company cannot guarantee absolute security.</p>
        <p><strong>22.6 Data Breach Notification</strong>: In the event of a data breach affecting Your personal information, the Company shall notify You and, where required, the appropriate regulatory authority, in accordance with the timelines and manner prescribed under Applicable Law.</p>
        <p><strong>22.7 Data Retention</strong>: The Company shall retain personal data and Content only for as long as is reasonably necessary to fulfil the purposes for which it was collected, including provision of the Services, compliance with Applicable Law (including applicable limitation periods and tax record-keeping requirements), and resolution of disputes, following which such data shall be securely deleted or anonymised in accordance with the Company&apos;s internal data retention schedule.</p>
        <p><strong>22.8 Cross-Border Transfer</strong>: Where the Company uses cloud infrastructure, analytics, or customer support tools hosted outside India, Your personal data may be transferred to, stored, and processed in a jurisdiction outside India. The Company shall ensure that any such transfer is undertaken in accordance with Applicable Law and subject to contractual or technical safeguards no less protective than those applicable within India.</p>
        <p><strong>22.9 Cookies and Tracking Technologies</strong>: The Platform (particularly the website) may use cookies, local storage, and similar tracking technologies to enhance User experience, remember preferences, and analyse usage patterns, as more particularly described in the Privacy Policy. You may control cookie preferences through Your browser settings, provided that disabling certain cookies may affect the functionality of the Platform.</p>
      </div>
    )
  },
  {
    title: "23. LIMITATION OF LIABILITY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>23.1</strong> To the maximum extent permitted under Applicable Law, the Platform and the Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, whether express, implied, statutory or otherwise, including, without limitation, implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement, save to the extent such warranties cannot be excluded under Applicable Law.</p>
        <p><strong>23.2</strong> In no event shall the Company, its directors, officers, employees, or agents be liable to any User for any indirect, incidental, special, consequential, exemplary or punitive damages, including but not limited to loss of profit, loss of business, loss of data, loss of goodwill, or loss of anticipated savings, arising out of or in connection with the use of, or inability to use, the Platform or the Services, whether based in contract, tort (including negligence), strict liability or otherwise, even if the Company has been advised of the possibility of such damages.</p>
        <p><strong>23.3</strong> Notwithstanding anything to the contrary in these Terms, the aggregate liability of the Company to a User, arising out of or in connection with a particular Order, whether in contract, tort or otherwise, shall not exceed the higher of (a) the Order Value actually paid by the User in respect of that Order; and (b) Rupees Five Thousand (INR 5,000), save in cases of proven wilful misconduct, fraud, or gross negligence directly attributable to the Company, or where a higher liability cannot lawfully be excluded or limited under Applicable Law.</p>
        <p><strong>23.4</strong> The limitations set out in this Clause 23 shall apply irrespective of the number of claims, and shall survive any termination or expiry of these Terms.</p>
        <p><strong>23.5</strong> Nothing in these Terms shall be construed to exclude or limit the Company&apos;s liability for death or personal injury caused by its proven negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot lawfully be excluded or limited under Applicable Law.</p>
      </div>
    )
  },
  {
    title: "24. INDEMNIFICATION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>24.1</strong> You agree to indemnify, defend and hold harmless the Company, its directors, officers, employees, affiliates, Print Partners and Delivery Partners (collectively, the &quot;Indemnified Parties&quot;), from and against any and all claims, demands, actions, proceedings, losses, liabilities, damages, costs and expenses (including reasonable legal fees) arising out of or in connection with: (a) Your breach of these Terms or any Applicable Law; (b) Your use or misuse of the Platform; (c) any Content uploaded by You that infringes the Intellectual Property Rights, privacy rights, or any other right of a third party, or is otherwise unlawful; (d) any inaccurate, false or misleading information provided by You; or (e) any dispute between You and a third party arising out of or in connection with Your use of the Platform.</p>
        <p><strong>24.2</strong> The Company shall have the right, at its own expense, to assume the exclusive defence and control of any matter otherwise subject to indemnification by You, in which event You shall cooperate with the Company in asserting any available defence, without prejudice to Your obligation to indemnify the Company hereunder.</p>
      </div>
    )
  },
  {
    title: "25. FORCE MAJEURE",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>25.1</strong> The Company shall not be liable for any failure or delay in the performance of its obligations under these Terms where such failure or delay arises from causes beyond its reasonable control, including but not limited to acts of God, natural disasters, fire, flood, earthquake, pandemic or epidemic, governmental action, change in Applicable Law, strikes, lockouts, labour disputes, war, civil unrest, terrorism, act of any government or regulatory authority, failure of telecommunications or internet infrastructure, failure of the Payment Gateway, or failure of a Print Partner or Delivery Partner attributable to any of the foregoing causes (each, a &quot;Force Majeure Event&quot;).</p>
        <p><strong>25.2</strong> Upon occurrence of a Force Majeure Event, the Company&apos;s obligations under these Terms shall be suspended for the duration of such event, and the Company shall use reasonable efforts to notify affected Users and to resume performance as soon as reasonably practicable.</p>
        <p><strong>25.3</strong> Where a Force Majeure Event renders fulfilment of an Order permanently impracticable, the Company shall refund the Order Value paid by the User in respect of the affected Order, subject to Clause 13.</p>
      </div>
    )
  },
  {
    title: "26. SUSPENSION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>26.1 Grounds for Suspension</strong>: The Company may, at its sole discretion and without prior notice, suspend a User&apos;s Account or access to the Platform, in whole or in part, where the Company reasonably believes that: (a) the User has breached these Terms or any Policy; (b) the User&apos;s Account has been or is likely to be used for fraudulent, unlawful or abusive activity; (c) suspension is necessary to comply with Applicable Law, a court order, or a direction of a governmental or regulatory authority; or (d) suspension is necessary to protect the security or integrity of the Platform or the rights of other Users or third parties.</p>
        <p><strong>26.2 Effect of Suspension</strong>: During the period of suspension, the User shall not be able to place new Orders or access certain features of the Platform, but any Order confirmed prior to suspension shall, save where the suspension arises from fraud in relation to that specific Order, ordinarily continue to be processed, unless the Company determines otherwise.</p>
        <p><strong>26.3 Notice and Opportunity to Respond</strong>: Where practicable, and save in cases of suspected fraud, security threat, or legal compulsion where prior notice would be inappropriate, the Company shall provide the User with notice of the grounds for suspension and a reasonable opportunity to respond, prior to or promptly following such suspension.</p>
      </div>
    )
  },
  {
    title: "27. TERMINATION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>27.1 Termination by User</strong>: A User may terminate these Terms at any time by ceasing to use the Platform and, if desired, requesting closure of the Account through the support channels specified in Clause 33, subject to settlement of any pending Order and, where applicable, refund of monetary Wallet Credit in accordance with Clause 19.5.</p>
        <p><strong>27.2 Termination by the Company</strong>: The Company may terminate a User&apos;s Account and access to the Platform, with or without prior notice, where: (a) the User has committed a material or repeated breach of these Terms; (b) the User&apos;s conduct exposes the Company, other Users, or third parties to legal liability or risk of harm; (c) required to do so by Applicable Law or by direction of a governmental or regulatory authority; or (d) the Company decides, at its sole commercial discretion, to discontinue the Platform or Services generally, in which case reasonable prior notice shall be provided to Users where practicable.</p>
        <p><strong>27.3 Effect of Termination</strong>: Upon termination of these Terms, howsoever arising: (a) the User&apos;s right to access and use the Platform shall immediately cease; (b) any provision of these Terms which by its nature is intended to survive termination (including, without limitation, Clauses 9, 10.1, 10.3, 22, 23, 24, 28 and 29) shall survive; and (c) the Company shall process any refund due to the User strictly in accordance with Clause 13 and Clause 19.5.</p>
        <p><strong>27.4 No Liability for Termination</strong>: Save as expressly provided in these Terms, the Company shall not be liable to any User for any termination or suspension of the User&apos;s access to the Platform carried out in accordance with this Clause 27.</p>
      </div>
    )
  },
  {
    title: "28. GOVERNING LAW",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>28.1</strong> These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims) shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of laws principles.</p>
        <p><strong>28.2</strong> The United Nations Convention on Contracts for the International Sale of Goods shall not apply to these Terms.</p>
      </div>
    )
  },
  {
    title: "29. DISPUTE RESOLUTION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>29.1 Good Faith Resolution</strong>: In the event of any dispute, controversy or claim arising out of or in connection with these Terms, including any question regarding its existence, validity, interpretation, performance, breach or termination (a &quot;Dispute&quot;), the parties shall first attempt to resolve the Dispute amicably through good-faith negotiation, by raising the Dispute through the grievance mechanism described in Clause 29.2.</p>
        <p><strong>29.2 Grievance Officer</strong>: In accordance with the Information Technology Act, 2000 and the rules made thereunder, the Company has appointed a Grievance Officer, whose details are set out in Clause 33. Any User grievance regarding the Platform or these Terms may be addressed to the Grievance Officer, who shall acknowledge the complaint and endeavour to redress the same within the timelines prescribed under Applicable Law.</p>
        <p><strong>29.3 Arbitration</strong>: If a Dispute is not resolved through the process set out in Clause 29.1 within thirty (30) days of one party notifying the other of such Dispute in writing, the Dispute shall be referred to and finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, as amended from time to time. The arbitration shall be conducted by a sole arbitrator appointed by the Company, the seat and venue of arbitration shall be Bengaluru, Karnataka, India, the language of arbitration shall be English, and the award rendered shall be final and binding on the parties, subject to Applicable Law.</p>
        <p><strong>29.4 Interim Relief</strong>: Nothing in this Clause 29 shall preclude either party from seeking urgent interim or injunctive relief from a court of competent jurisdiction, pending constitution of the arbitral tribunal or pending the outcome of arbitration.</p>
        <p><strong>29.5 Jurisdiction</strong>: Subject to Clause 29.3, the courts at Bengaluru, Karnataka, India shall have exclusive jurisdiction over any matter arising out of or in connection with these Terms that is not required to be referred to arbitration.</p>
        <p><strong>29.6 Consumer Rights Preserved</strong>: Nothing in this Clause 29 shall be construed to prevent a User who qualifies as a &quot;consumer&quot; under the Consumer Protection Act, 2019 from approaching the appropriate consumer forum or the National Consumer Helpline / E-Daakhil platform for redressal of grievances, to the extent such recourse is available to the User as a matter of statutory right notwithstanding this arbitration clause, and to the extent Applicable Law renders this arbitration clause inapplicable to such consumer disputes.</p>
      </div>
    )
  },
  {
    title: "30. ELECTRONIC COMMUNICATIONS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>30.1 Consent to Electronic Communication</strong>: By using the Platform, You consent to receive communications from the Company electronically, including by way of email, SMS, push notification, WhatsApp or other instant messaging service, and in-app notification, in relation to Your Account, Orders, these Terms, the Policies, and promotional communications (subject to Your right to opt out of promotional communications as described below).</p>
        <p><strong>30.2 Legal Effect</strong>: You agree that all agreements, notices, disclosures and other communications provided to You electronically satisfy any legal requirement that such communication be in writing, to the fullest extent permitted under Applicable Law, including the Information Technology Act, 2000.</p>
        <p><strong>30.3 Opt-Out of Promotional Communication</strong>: You may opt out of receiving promotional communications by using the unsubscribe mechanism provided in such communication, adjusting Your notification preferences within the Platform, or writing to the Company at the contact details in Clause 33, provided that You shall continue to receive essential transactional and service-related communications concerning Your Account and Orders notwithstanding such opt-out.</p>
        <p><strong>30.4 Accuracy of Contact Details</strong>: It is Your responsibility to ensure that the contact details registered on Your Account are current, and the Company shall not be liable for Your failure to receive any communication on account of outdated or incorrect contact details.</p>
      </div>
    )
  },
  {
    title: "31. AMENDMENTS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>31.1 Right to Amend</strong>: The Company reserves the right to amend, modify, update or revise these Terms at any time, at its sole discretion, to reflect, among other things, changes in Applicable Law, Platform functionality, business practices, or industry standards.</p>
        <p><strong>31.2 Notification of Changes</strong>: Material amendments to these Terms shall be notified to Users through reasonable means, which may include a notice on the Platform, an in-app notification, or an email to the registered email address, and the &quot;Last Updated&quot; date at the top of these Terms shall be revised accordingly.</p>
        <p><strong>31.3 Effect of Continued Use</strong>: Continued use of the Platform following the effective date of any amendment shall constitute Your acceptance of the amended Terms. If You do not agree to the amended Terms, Your sole remedy is to discontinue use of the Platform and, if desired, close Your Account in accordance with Clause 27.1.</p>
        <p><strong>31.4 Orders Unaffected</strong>: Save as required under Applicable Law, an amendment to these Terms shall not retrospectively affect an Order that was validly confirmed prior to the effective date of such amendment, which shall continue to be governed by the Terms in force at the time such Order was confirmed.</p>
      </div>
    )
  },
  {
    title: "32. MISCELLANEOUS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>32.1 Entire Agreement</strong>: These Terms, together with the Policies incorporated by reference herein, constitute the entire agreement between You and the Company in relation to Your use of the Platform, and supersede all prior agreements, understandings and communications, whether written or oral, on the subject matter hereof.</p>
        <p><strong>32.2 Severability</strong>: If any provision of these Terms is held by a court or tribunal of competent jurisdiction to be invalid, illegal or unenforceable, such provision shall be severed and the remaining provisions of these Terms shall continue in full force and effect, and the parties shall negotiate in good faith to replace the invalid provision with a valid provision that most closely reflects the original commercial intent of the parties.</p>
        <p><strong>32.3 Waiver</strong>: No failure or delay by the Company in exercising any right, power or remedy under these Terms shall operate as a waiver thereof, nor shall any single or partial exercise of any right, power or remedy preclude any other or further exercise thereof.</p>
        <p><strong>32.4 Assignment</strong>: You may not assign or transfer Your rights or obligations under these Terms without the prior written consent of the Company. The Company may assign or transfer its rights and obligations under these Terms, in whole or in part, to any affiliate, successor entity, or in connection with a merger, acquisition, corporate reorganisation, or sale of all or substantially all of its assets, without requiring Your consent, and upon such assignment shall be released from further liability to the extent so assigned.</p>
        <p><strong>32.5 Relationship of Parties</strong>: Nothing in these Terms shall be construed as creating any partnership, joint venture, agency, franchise, sales representative, or employment relationship between You and the Company. You shall have no authority to make or accept any offer or representation on behalf of the Company.</p>
        <p><strong>32.6 Notices</strong>: Any notice required to be given by the Company to a User under these Terms may be given by way of a general notice on the Platform, or by electronic mail to the registered email address of the User, or by SMS or push notification to the registered mobile number, and shall be deemed to have been duly given twenty-four (24) hours after posting or transmission, as applicable.</p>
        <p><strong>32.7 Third-Party Rights</strong>: Save as expressly set out in these Terms in favour of Print Partners, Delivery Partners and other Indemnified Parties, a person who is not a party to these Terms shall have no right to enforce any provision of these Terms.</p>
        <p><strong>32.8 Scalability and Future Services</strong>: These Terms are drafted to accommodate the introduction of new features, service categories, business verticals (including but not limited to design services, merchandise printing, corporate and institutional bulk printing programmes, subscription plans, and franchise or partner-onboarding programmes), and geographic expansion, whether within India or internationally. Any new feature or service shall be governed by these Terms to the extent applicable, read together with any additional or supplemental terms specific to such feature or service, as may be published by the Company at the relevant time. In the event of any conflict between such supplemental terms and these Terms in respect of that specific feature or service, the supplemental terms shall prevail to the extent of such conflict.</p>
        <p><strong>32.9 Language</strong>: These Terms are drafted in the English language. Any translation provided for convenience shall not have any legal effect, and the English version shall prevail in the event of any inconsistency.</p>
        <p><strong>32.10 Headings</strong>: The clause and sub-clause headings used in these Terms are inserted for convenience of reference only and shall not affect the construction or interpretation of these Terms.</p>
        <p><strong>32.11 Device and Software Compatibility</strong>: The App requires a compatible device running a supported version of Android or iOS, as specified from time to time on the respective app store listing. The Company is not responsible for the App&apos;s performance on unsupported, modified (including rooted or jailbroken), or outdated devices or operating systems.</p>
        <p><strong>32.12 App Store Terms</strong>: Use of the App is additionally subject to the applicable terms of service of the Google Play Store or Apple App Store, as the case may be, through which the App was downloaded, including any terms relating to in-app purchases, updates, and removal of the App. In the event of any conflict between such app store terms and these Terms solely in respect of the distribution mechanics of the App, the app store terms shall prevail to that limited extent.</p>
        <p><strong>32.13 Export Control and Sanctions Compliance</strong>: You represent that You are not located in, or a resident of, any country subject to a comprehensive trade embargo under Applicable Law, and are not otherwise a person with whom the Company is prohibited from transacting under any applicable sanctions or export control regime.</p>
        <p><strong>32.14 Accessibility</strong>: The Company is committed to making the Platform reasonably accessible to Users with disabilities and shall endeavour, on a best-effort basis, to align the Platform&apos;s design with recognised web and mobile accessibility guidelines, without warranting full compliance at all times.</p>
      </div>
    )
  },
  {
    title: "33. CONTACT DETAILS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p>For any questions, clarifications, complaints or grievances relating to these Terms, the Policies, or the Platform, Users may contact the Company through the following channels:</p>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li><strong>Customer Support Email</strong>: <a href="mailto:support@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>support@ezeeprints.com</a></li>
          <li><strong>Grievance Officer Email</strong>: <a href="mailto:grievance@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>grievance@ezeeprints.com</a></li>
          <li><strong>Registered / Corporate Office Address</strong>: EzeePrints Tech Private Limited, #42, Cozy Lane, 3rd Block, Koramangala, Bengaluru, Karnataka, India - 560034</li>
          <li><strong>Support Hours</strong>: Monday to Saturday, 9:00 AM to 7:00 PM IST</li>
          <li><strong>In-App Support</strong>: Available through the &quot;Help &amp; Support&quot; section of the Website, Android application and iOS application.</li>
        </ul>
        <p style={{ marginTop: "8px" }}>The Company shall endeavour to acknowledge all User grievances within forty-eight (48) hours of receipt and to resolve the same within the timelines prescribed under Applicable Law, including the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as applicable.</p>
      </div>
    )
  }
];

const privacySections = [
  {
    title: "1. DEFINITIONS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p>In this Privacy Policy, unless the context otherwise requires, the following expressions shall have the meanings assigned to them below. All other capitalised terms used but not defined in this Privacy Policy, including “Account”, “App”, “Applicable Law”, “Company”, “Content”, “Delivery Partner”, “Institution”, “Order”, “Payment Gateway”, “Platform”, “Print Partner”, “Services”, “User”, “Wallet” and “Wallet Credit”, shall have the meanings assigned to such terms in the Terms and Conditions.</p>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li><strong>&quot;Consent&quot;</strong> means the free, specific, informed and unambiguous indication of a User’s wishes by which the User, by a clear affirmative action, signifies agreement to the processing of personal data relating to them.</li>
          <li><strong>&quot;Cookies&quot;</strong> means small text files or similar tracking technologies placed on a User’s device to store information relating to preferences, sessions, and usage of the Platform.</li>
          <li><strong>&quot;Data Protection Board&quot;</strong> means the Data Protection Board of India constituted under the Digital Personal Data Protection Act, 2023.</li>
          <li><strong>&quot;Grievance Officer&quot;</strong> means the officer appointed by the Company under Clause 14 of this Privacy Policy and Clause 29 of the Terms and Conditions to address grievances relating to personal data.</li>
          <li><strong>&quot;Personal Data&quot;</strong> means any data about a User by or in relation to which the User is identifiable, whether directly or indirectly, including but not limited to name, contact details, financial information, Content, and device and location data.</li>
          <li><strong>&quot;Processing&quot;</strong> means any operation performed on Personal Data, whether automated or not, including collection, recording, organisation, storage, adaptation, retrieval, use, disclosure, restriction, erasure or destruction.</li>
          <li><strong>&quot;Sensitive Personal Data or Information&quot; or &quot;SPDI&quot;</strong> has the meaning assigned to it under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and includes passwords and financial information such as bank account or payment instrument details.</li>
        </ul>
      </div>
    )
  },
  {
    title: "2. THE PERSONAL DATA WE COLLECT",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>2.1 Account Data</strong>: When You register for an Account, We collect Your name, mobile number, email address, and, where applicable, institutional or business affiliation. Where You register using a third-party sign-in service, We receive such basic profile information as that service makes available to Us, subject to Your permissions on that service.</p>
        <p><strong>2.2 Order Data</strong>: When You place an Order, We collect the Content You upload for printing, Your selected print specifications, Your delivery or pickup address, and details of the fulfilment method You choose.</p>
        <p><strong>2.3 Payment-Related Data</strong>: We receive limited transaction metadata from the Payment Gateway, including the Order Value, payment status, and any Coupon or Wallet Credit applied. The Company does not collect, store, or have access to Your complete card, UPI, or other payment instrument details; such information is collected and processed directly by the Payment Gateway in accordance with its own privacy policy and applicable data security standards, including the Payment Card Industry Data Security Standard.</p>
        <p><strong>2.4 Communications Data</strong>: We collect records of Your interactions with Our customer support and Grievance Officer, including the content of Your queries, complaints, and correspondence with Us.</p>
        <p><strong>2.5 Device and Usage Data</strong>: We automatically collect certain technical information when You use the Platform, including Your IP address, device identifiers, operating system and browser type, App version, and log data relating to Your use of the Platform’s features.</p>
        <p><strong>2.6 Location Data</strong>: Where relevant to serviceability, delivery routing, or fraud prevention, We may collect Your approximate or precise location, subject to the permissions You grant on Your device.</p>
        <p><strong>2.7 Cookies</strong>: The Website uses Cookies and similar tracking technologies as described in Clause 9 below.</p>
      </div>
    )
  },
  {
    title: "3. HOW WE USE YOUR PERSONAL DATA",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>3.1</strong> We use Personal Data for the following purposes: (a) creating and administering Your Account; (b) processing, routing, producing and fulfilling Your Orders, including quality assurance; (c) processing payments and administering Wallet Credit and Coupons; (d) coordinating pickup and delivery of Orders; (e) providing customer support and resolving grievances; (f) preventing fraud, abuse, and unauthorised use of the Platform; (g) complying with Applicable Law, including tax record-keeping and responding to lawful requests from governmental or regulatory authorities; (h) improving and personalising the Platform and Our Services; and (i) sending You transactional communications relating to Your Account and Orders, and, subject to Your consent and right to opt out, promotional communications.</p>
        <p><strong>3.2</strong> We process Personal Data on the basis of Your Consent, where processing is necessary to perform the contract represented by an Order, where processing is necessary to comply with a legal obligation, and, in limited circumstances, on the basis of Our legitimate interest in maintaining the security and integrity of the Platform, balanced against Your rights as a data principal.</p>
      </div>
    )
  },
  {
    title: "4. HOW WE SHARE YOUR PERSONAL DATA",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>4.1</strong> With Print Partners, to the extent necessary to fulfil Your Order, including access to Content and relevant Order details.</p>
        <p><strong>4.2</strong> With Delivery Partners, including Your name, contact number, and delivery address, to the extent necessary to complete delivery of Your Order.</p>
        <p><strong>4.3</strong> With the Payment Gateway, to process payment for Your Order.</p>
        <p><strong>4.4</strong> With an Institution, where You access the Platform pursuant to an institutional arrangement under Clause 4.5 of the Terms and Conditions.</p>
        <p><strong>4.5</strong> With Our professional advisors, auditors, and service providers who are bound by confidentiality obligations and process Personal Data solely on Our instructions.</p>
        <p><strong>4.6</strong> With governmental, regulatory, or law enforcement authorities, or courts of competent jurisdiction, where required under Applicable Law or a valid legal process.</p>
        <p><strong>4.7</strong> With a successor entity, in connection with a merger, acquisition, corporate reorganisation, or sale of assets, as contemplated under Clause 32.4 of the Terms and Conditions.</p>
        <p><strong>4.8</strong> We do not sell Your Personal Data to third parties for their own independent marketing purposes.</p>
      </div>
    )
  },
  {
    title: "5. CONFIDENTIALITY OF CONTENT",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>5.1</strong> Content uploaded by You is treated as confidential and is accessed only by authorised personnel of the Company and, where applicable, the assigned Print Partner, solely for the purpose of production, quality assurance, and legal compliance.</p>
        <p><strong>5.2</strong> Print Partners and Delivery Partners are contractually bound to use Content and Personal Data shared with them solely for the purpose of fulfilling Your Order, and to implement reasonable security safeguards.</p>
        <p><strong>5.3</strong> The licence granted by You in respect of Content under Clause 10.2 of the Terms and Conditions automatically terminates on completion or valid cancellation of the relevant Order, save to the extent retention is otherwise required.</p>
      </div>
    )
  },
  {
    title: "6. DATA RETENTION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>6.1</strong> We retain Personal Data and Content only for as long as is reasonably necessary to fulfil the purposes described in this Privacy Policy, including provision of the Services, compliance with Applicable Law (including applicable limitation periods and tax record-keeping requirements), and resolution of disputes.</p>
        <p><strong>6.2</strong> Content is retained only for such period as is reasonably necessary to fulfil the relevant Order and to address any post-Order query or dispute, following which it is deleted or anonymised in accordance with Our data retention schedule.</p>
        <p><strong>6.3</strong> Account data is retained for as long as Your Account remains active, and for a reasonable period thereafter to address legal, regulatory, or dispute-resolution requirements.</p>
      </div>
    )
  },
  {
    title: "7. DATA SECURITY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>7.1</strong> We implement reasonable technical and organisational security measures designed to protect Personal Data against unauthorised access, alteration, disclosure, or destruction, in accordance with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</p>
        <p><strong>7.2</strong> No method of electronic transmission or storage is entirely secure, and while We strive to protect Your Personal Data, We cannot guarantee its absolute security.</p>
      </div>
    )
  },
  {
    title: "8. CROSS-BORDER TRANSFER OF PERSONAL DATA",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>8.1</strong> Where We use cloud infrastructure, analytics, or customer support tools hosted outside India, Your Personal Data may be transferred to, stored, and processed in a jurisdiction outside India.</p>
        <p><strong>8.2</strong> We undertake any such transfer in accordance with Applicable Law, including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and, once its relevant provisions come into force, the Digital Personal Data Protection Act, 2023, under which transfers are permitted to all countries other than those specifically restricted by the Central Government by notification.</p>
      </div>
    )
  },
  {
    title: "9. COOKIES AND TRACKING TECHNOLOGIES",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>9.1</strong> The Website may use essential Cookies (necessary for the Website to function), functional Cookies (to remember Your preferences), and analytics Cookies (to help Us understand how the Website is used).</p>
        <p><strong>9.2</strong> You may control Cookie preferences through Your browser settings. Disabling certain Cookies may affect the functionality of the Website.</p>
      </div>
    )
  },
  {
    title: "10. CHILDREN’S PRIVACY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>10.1</strong> The Platform is intended for use only by persons who have attained the age of eighteen (18) years, in accordance with Clause 3.1 of the Terms and Conditions.</p>
        <p><strong>10.2</strong> We do not knowingly collect Personal Data from persons below eighteen (18) years of age. If We become aware that We have collected Personal Data from a minor without appropriate consent, We will take reasonable steps to delete such data and, where applicable, suspend the relevant Account in accordance with Clause 3.4 of the Terms and Conditions.</p>
        <p><strong>10.3</strong> Where processing of a child’s personal data becomes applicable to the Platform, We will implement verifiable parental consent and related safeguards as required under Section 9 of the Digital Personal Data Protection Act, 2023, as and when its relevant provisions come into force.</p>
      </div>
    )
  },
  {
    title: "11. YOUR RIGHTS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>11.1</strong> Subject to Applicable Law, You may: (a) request access to the Personal Data We hold about You; (b) request correction of inaccurate or incomplete Personal Data; (c) withdraw Your Consent to processing, prospectively, without affecting the lawfulness of processing before such withdrawal; (d) request erasure of Your Personal Data, subject to Our legal retention requirements under Clause 6; and (e) raise a grievance in accordance with Clause 14 below.</p>
        <p><strong>11.2</strong> Additional rights available to a data principal under the Digital Personal Data Protection Act, 2023, including the right to nominate another individual to exercise these rights in the event of Your death or incapacity, will be made available progressively as the relevant provisions of that Act come into force.</p>
        <p><strong>11.3</strong> To exercise any of the above rights, please contact Us using the details in Clause 17 below. We may take reasonable steps to verify Your identity before acting on Your request.</p>
      </div>
    )
  },
  {
    title: "12. MARKETING COMMUNICATIONS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>12.1</strong> We may send You promotional communications relating to Our Services, subject to Your right to opt out at any time by using the unsubscribe mechanism provided in such communication, adjusting Your notification preferences on the Platform, or writing to Us at the contact details in Clause 17.</p>
        <p><strong>12.2</strong> You will continue to receive essential transactional and service-related communications concerning Your Account and Orders notwithstanding such opt-out.</p>
      </div>
    )
  },
  {
    title: "13. DATA BREACH NOTIFICATION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p>In the event of a breach affecting Your Personal Data, We will notify You and, where required, the Data Protection Board or other appropriate regulatory authority, in accordance with the timelines and manner prescribed under Applicable Law.</p>
      </div>
    )
  },
  {
    title: "14. GRIEVANCE OFFICER AND GRIEVANCE REDRESSAL",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>14.1</strong> In accordance with the Information Technology Act, 2000 and the rules made thereunder, the Company has appointed a Grievance Officer to address grievances relating to the processing of Personal Data. The Grievance Officer may be contacted at <a href="mailto:grievance@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>grievance@ezeeprints.com</a>.</p>
        <p><strong>14.2</strong> The Grievance Officer shall acknowledge a grievance within twenty-four (24) hours of receipt and shall endeavour to resolve it within fifteen (15) days from the date of receipt, in accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.</p>
        <p><strong>14.3</strong> Additional grievance-redressal rights and timelines available under the Digital Personal Data Protection Act, 2023 will apply as its relevant provisions come into force.</p>
      </div>
    )
  },
  {
    title: "15. CHANGES TO THIS PRIVACY POLICY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>15.1</strong> We reserve the right to amend, modify, update, or revise this Privacy Policy at any time, to reflect changes in Applicable Law, Platform functionality, or Our data-processing practices.</p>
        <p><strong>15.2</strong> Material amendments will be notified through reasonable means, including a notice on the Platform, an in-app notification, or an email to Your registered email address, and the “Last Updated” date at the top of this Privacy Policy will be revised accordingly.</p>
        <p><strong>15.3</strong> Continued use of the Platform following the effective date of any amendment constitutes Your acceptance of the amended Privacy Policy.</p>
      </div>
    )
  },
  {
    title: "16. GOVERNING LAW AND DISPUTE RESOLUTION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>16.1</strong> This Privacy Policy shall be governed by and construed in accordance with the laws of the Republic of India.</p>
        <p><strong>16.2</strong> Any dispute, controversy, or claim arising out of or in connection with this Privacy Policy shall be resolved in accordance with the dispute resolution mechanism set out in Clause 29 of the Terms and Conditions (including the preservation of a User’s rights as a “consumer” under the Consumer Protection Act, 2019), which is incorporated herein by reference.</p>
      </div>
    )
  },
  {
    title: "17. CONTACT US",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p>For any questions, clarifications, or grievances relating to this Privacy Policy or the processing of Your Personal Data, You may contact Us through the following channels:</p>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <li><strong>Customer Support Email</strong>: <a href="mailto:support@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>support@ezeeprints.com</a></li>
          <li><strong>Grievance Officer Email</strong>: <a href="mailto:grievance@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>grievance@ezeeprints.com</a></li>
          <li><strong>Registered / Corporate Office Address</strong>: Zarixa Infobytes Private Limited, #42, Cozy Lane, 3rd Block, Koramangala, Bengaluru, Karnataka, India - 560034</li>
          <li><strong>Support Hours</strong>: Monday to Saturday, 9:00 AM to 6:00 PM IST</li>
          <li><strong>In-App Support</strong>: Available through the “Help & Support” section of the Website, Android application and iOS application.</li>
        </ul>
      </div>
    )
  }
];

const partnerAgreementSections = [
  {
    title: "1. DEFINITIONS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>1.1 Commission</strong>: Means the fee payable by the Partner to the Company on each Order, as set out in Schedule A.</p>
        <p><strong>1.2 Fulfilment Centre</strong>: Means the Partner&apos;s premises to which Orders are routed for production, as referenced in the Terms and Conditions.</p>
        <p><strong>1.3 Onboarding Documents</strong>: Means the KYC, business registration, GST registration, and other documents required by the Company or the Payment Gateway to activate the Partner on the Platform.</p>
        <p><strong>1.4 Settlement Cycle</strong>: Means the periodic cycle on which the Partner&apos;s dues are paid out, as set out in Schedule A.</p>
        <p><strong>1.5 Service Levels</strong>: Means the turnaround time and quality standards set out in Schedule A.</p>
        <p><strong>1.6 Capitalised Terms</strong>: Capitalised terms used but not defined in this Agreement, including &quot;Applicable Law&quot;, &quot;Content&quot;, &quot;Order&quot;, &quot;Order Value&quot;, &quot;Payment Gateway&quot;, &quot;Platform&quot;, &quot;Services&quot; and &quot;User&quot;, shall have the meanings assigned to such terms in the Terms and Conditions published on the Platform.</p>
      </div>
    )
  },
  {
    title: "2. APPOINTMENT AND RELATIONSHIP",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>2.1</strong> The Company hereby appoints the Partner, on a non-exclusive basis, to receive and fulfil Orders placed by Users through the Platform, and the Partner accepts such appointment, subject to the terms of this Agreement.</p>
        <p><strong>2.2 Independent Contractors</strong>: The relationship between the Company and the Partner is that of independent contracting parties. Nothing in this Agreement shall be construed as creating a relationship of employer-employee, principal-agent, partnership, or joint venture between the Parties. The Partner shall be solely responsible for its own personnel, equipment, and business operations.</p>
        <p><strong>2.3 No Authority to Bind</strong>: Save as expressly agreed in writing, neither Party shall have the authority to bind the other or to make any representation or commitment on the other&apos;s behalf.</p>
        <p><strong>2.4 Non-Exclusive</strong>: This Agreement is non-exclusive. Either Party may enter into similar arrangements with other counterparties, including, in the case of the Partner, other online or offline platforms.</p>
      </div>
    )
  },
  {
    title: "3. ONBOARDING AND ELIGIBILITY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>3.1 Documents Required</strong>: The Partner shall, prior to activation on the Platform, furnish such Onboarding Documents as the Company or its Payment Gateway may reasonably require, including proof of business registration, GST registration certificate, PAN, bank account details, and any Know Your Customer (&quot;KYC&quot;) documentation required for payment settlement under Applicable Law.</p>
        <p><strong>3.2 Licences and Approvals</strong>: The Partner represents and warrants that it holds all licences, registrations, and approvals necessary to operate its printing business and to fulfil Orders under Applicable Law.</p>
        <p><strong>3.3 Right to Suspend Onboarding</strong>: The Company reserves the right, acting reasonably, to decline or suspend onboarding where the Partner fails to furnish satisfactory Onboarding Documents or does not meet the Company&apos;s quality or capacity criteria.</p>
      </div>
    )
  },
  {
    title: "4. ORDER FULFILMENT",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>4.1 Acceptance Window</strong>: The Partner shall accept or decline Orders routed to its Fulfilment Centre within such time as may be specified on the Platform.</p>
        <p><strong>4.2 Order Specifications</strong>: The Partner shall fulfil accepted Orders in accordance with the specifications submitted by the User and the Service Levels set out in Schedule A.</p>
        <p><strong>4.3 Delay Notifications</strong>: The Partner shall promptly notify the Company of any delay, defect, or inability to fulfil an Order, to enable the Company to communicate with the affected User in accordance with the Terms and Conditions.</p>
        <p><strong>4.4 Confidentiality of Content</strong>: The Partner shall not use Content for any purpose other than fulfilling the Order for which it was submitted, and shall treat all Content and User information as confidential in accordance with Clause 9.</p>
      </div>
    )
  },
  {
    title: "5. PRICING AND COMMISSION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>5.1 Rate Card</strong>: The Partner shall price its Services in accordance with the rate card agreed with the Company from time to time.</p>
        <p><strong>5.2 Commission Fee</strong>: The Company shall be entitled to a commission of [Insert Commission Percentage]% of the Order Value on each Order fulfilled by the Partner through the Platform (&quot;Commission&quot;), or such other amount as may be agreed in writing between the Parties, as set out in Schedule A.</p>
        <p><strong>5.3 Transaction Fees</strong>: The Company may, in addition to the Commission, charge payment-gateway or transaction processing fees actually incurred, as disclosed to the Partner from time to time.</p>
      </div>
    )
  },
  {
    title: "6. PAYMENTS AND SETTLEMENT",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>6.1 Collection</strong>: Payments for Orders shall be collected from Users through the Payment Gateway integrated with the Platform.</p>
        <p><strong>6.2 Settlement Dues</strong>: Subject to the Partner completing the KYC and onboarding requirements of the Payment Gateway, the Partner&apos;s dues (being the Order Value less the Commission and any applicable fees) shall be settled to the Partner&apos;s designated bank account on the Settlement Cycle set out in Schedule A, in accordance with Applicable Law governing payment aggregation and settlement.</p>
        <p><strong>6.3 Split Settlement Onboarding</strong>: Where the Payment Gateway&apos;s settlement mechanism requires the Partner to be independently onboarded and KYC-verified as a merchant for split settlement, the Partner shall cooperate with such onboarding, failing which the Company may withhold or suspend activation of the Partner on the Platform.</p>
        <p><strong>6.4 Taxes</strong>: All amounts payable under this Agreement are exclusive of applicable taxes unless otherwise stated.</p>
      </div>
    )
  },
  {
    title: "7. TAXES AND INVOICING",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>7.1 Supplier Responsibility</strong>: The Partner is the supplier of printing and related Services to the User for the purposes of the Central Goods and Services Tax Act, 2017 and corresponding State or Union Territory legislation, and shall be solely responsible for its own GST registration and for issuing a GST-compliant tax invoice to the User in respect of each Order fulfilled by it.</p>
        <p><strong>7.2 Tax Collected at Source (TCS)</strong>: The Company, as an &quot;electronic commerce operator&quot; within the meaning of Section 2(45) of the Central Goods and Services Tax Act, 2017, shall collect tax at source (&quot;TCS&quot;) on the net value of taxable supplies made by the Partner through the Platform, at the rate prescribed under Section 52 of that Act, and shall remit the same to the appropriate government authority and reflect it in the Partner&apos;s electronic cash ledger in accordance with Applicable Law.</p>
        <p><strong>7.3 GSTIN Provision</strong>: The Partner shall promptly provide the Company with its GST registration number and such other information as is reasonably required for the Company to comply with its obligations under this Clause 7.</p>
      </div>
    )
  },
  {
    title: "8. QUALITY, RATINGS AND SERVICE LEVELS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>8.1 Service Levels</strong>: The Partner shall maintain the quality and turnaround standards set out in Schedule A.</p>
        <p><strong>8.2 Ratings & Feedback</strong>: Users may rate and provide feedback on Orders fulfilled by the Partner. The Company may display aggregated ratings, and the parameters used to determine any ranking of Print Partners on the Platform, to Users in accordance with Applicable Law.</p>
        <p><strong>8.3 Performance Impact</strong>: Repeated failure to meet the Service Levels, or a material decline in ratings, may result in reduced Order allocation, suspension, or termination in accordance with Clause 12.</p>
      </div>
    )
  },
  {
    title: "9. CONFIDENTIALITY AND DATA PROTECTION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>9.1 Confidentiality</strong>: The Partner shall treat all Content, User personal data, and other information shared with it through the Platform as strictly confidential, and shall use the same solely for fulfilling Orders.</p>
        <p><strong>9.2 Security Safeguards</strong>: The Partner shall implement reasonable security safeguards to protect Content and User personal data against unauthorised access, use, or disclosure, consistent with the Company&apos;s Privacy Policy and Applicable Law, including the Information Technology Act, 2000 and rules made thereunder.</p>
        <p><strong>9.3 Content Disposal</strong>: The Partner shall delete or securely dispose of Content and any physical or digital copies thereof promptly upon completion of the relevant Order, save to the extent retention is required under Applicable Law or this Agreement.</p>
        <p><strong>9.4 No Marketing Use</strong>: The Partner shall not use, disclose, or retain Content or User information for any purpose other than fulfilling the relevant Order, including for its own marketing purposes, without the Company&apos;s prior written consent.</p>
        <p><strong>9.5 Survival</strong>: This Clause 9 shall survive termination of this Agreement.</p>
      </div>
    )
  },
  {
    title: "10. INTELLECTUAL PROPERTY AND BRANDING",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>10.1 Content Rights</strong>: Nothing in this Agreement transfers any right, title, or interest in Content to the Partner, save a limited, non-exclusive licence to use Content solely to fulfil the relevant Order.</p>
        <p><strong>10.2 Brand Usage</strong>: The Partner may use the Company&apos;s name, logo, and the &quot;EzeePrints&quot; brand solely to the extent, and in the manner, expressly authorised by the Company in writing, including for the purpose of identifying itself as a Print Partner on the Platform.</p>
        <p><strong>10.3 IP Ownership</strong>: Each Party retains all right, title, and interest in its own intellectual property, and nothing in this Agreement shall be construed to grant either Party any right in the other&apos;s intellectual property save as expressly stated.</p>
      </div>
    )
  },
  {
    title: "11. REPRESENTATIONS, WARRANTIES AND INDEMNITY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>11.1 Authority</strong>: Each Party represents and warrants that it has full power and authority to enter into and perform this Agreement.</p>
        <p><strong>11.2 Non-Infringement</strong>: The Partner represents and warrants that its fulfilment of Orders will not infringe the intellectual property, privacy, or other rights of any third party, and will comply with Applicable Law.</p>
        <p><strong>11.3 Indemnity</strong>: Each Party shall indemnify and hold harmless the other Party from and against any claims, losses, or liabilities arising from the indemnifying Party&apos;s breach of this Agreement, negligence, or wilful misconduct.</p>
      </div>
    )
  },
  {
    title: "12. TERM AND TERMINATION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>12.1 Term</strong>: This Agreement shall commence on the Effective Date and shall continue until terminated in accordance with this Clause 12.</p>
        <p><strong>12.2 Termination for Convenience</strong>: Either Party may terminate this Agreement for convenience by providing thirty (30) days prior written notice to the other Party.</p>
        <p><strong>12.3 Immediate Termination for Cause</strong>: The Company may suspend or terminate the Partner&apos;s access to the Platform with immediate effect, by written notice, in the event of: (a) a material breach of this Agreement that remains uncured for fifteen (15) days after notice; (b) repeated failure to meet the Service Levels; (c) fraud, misrepresentation, or conduct harmful to Users or the Company&apos;s reputation; or (d) a requirement under Applicable Law.</p>
        <p><strong>12.4 Post-Termination Orders</strong>: On termination, the Partner shall complete any Orders already accepted (unless the Company directs otherwise), and each Party shall return or destroy the other&apos;s confidential information.</p>
        <p><strong>12.5 Survival</strong>: Clauses 7, 9, 11, 13, 15 and 16 shall survive termination of this Agreement.</p>
      </div>
    )
  },
  {
    title: "13. LIMITATION OF LIABILITY",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>13.1 Cap on Liability</strong>: Save in respect of a Party&apos;s indemnification obligations, breach of Clause 9 (Confidentiality and Data Protection), fraud, or wilful misconduct, neither Party&apos;s aggregate liability arising out of or in connection with this Agreement shall exceed the aggregate Commission paid or payable by the Partner to the Company in the three (3) months preceding the event giving rise to the claim.</p>
        <p><strong>13.2 Consequential Losses</strong>: Neither Party shall be liable to the other for any indirect, incidental, or consequential loss.</p>
      </div>
    )
  },
  {
    title: "14. FORCE MAJEURE",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p>Neither Party shall be liable for any failure or delay in performance under this Agreement to the extent caused by circumstances beyond its reasonable control, including natural disasters, pandemic or epidemic, strikes, governmental action, or failure of internet or power infrastructure, provided the affected Party promptly notifies the other and uses reasonable efforts to mitigate the impact.</p>
      </div>
    )
  },
  {
    title: "15. DISPUTE RESOLUTION",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>15.1 Negotiations</strong>: The Parties shall first attempt to resolve any dispute arising out of or in connection with this Agreement through good-faith negotiation between their authorised representatives within fifteen (15) days of a Party raising the dispute in writing.</p>
        <p><strong>15.2 Arbitration</strong>: If the dispute is not resolved under Clause 15.1, it shall be referred to and finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, seated and venued at Bengaluru, Karnataka, and conducted in the English language, by a sole arbitrator to be mutually appointed by the Parties within thirty (30) days.</p>
        <p><strong>15.3 Jurisdiction</strong>: This Agreement shall be governed by and construed in accordance with the laws of India, and, subject to Clause 15.2, the courts at Bengaluru, Karnataka shall have exclusive jurisdiction.</p>
      </div>
    )
  },
  {
    title: "16. GENERAL",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <p><strong>16.1 Assignment</strong>: Neither Party may assign this Agreement without the other&apos;s prior written consent, save that the Company may assign this Agreement to a successor in connection with a merger, acquisition, or sale of substantially all its assets.</p>
        <p><strong>16.2 Notices</strong>: Notices under this Agreement shall be in writing and delivered to the addresses or email addresses of the Parties set out in this Agreement or the Partner&apos;s onboarding record.</p>
        <p><strong>16.3 Amendments</strong>: This Agreement, including Schedule A, may be amended by the Company on reasonable prior notice to the Partner to reflect changes in the Company&apos;s business practices or Applicable Law.</p>
        <p><strong>16.4 Severability</strong>: If any provision of this Agreement is held invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
        <p><strong>16.5 Entire Agreement</strong>: This Agreement, together with Schedule A and any onboarding documentation, constitutes the entire agreement between the Parties.</p>
      </div>
    )
  },
  {
    title: "SCHEDULE A — SERVICE LEVELS AND COMMERCIAL TERMS",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <li><strong>Turnaround Time</strong>: Standard documents — same Business Day; bulk or bound printing — within agreed schedule window.</li>
          <li><strong>Quality / Rework Policy</strong>: Free reprint where a print defect is attributable to the Partner and reported within the reporting window in the Refund and Cancellation Policy.</li>
          <li><strong>Commission</strong>: Standard percentage of Order Value as agreed per partner rate card.</li>
          <li><strong>Settlement Cycle</strong>: T+2 Business Days from Order completion directly to bank account.</li>
          <li><strong>Order Acceptance Window</strong>: Thirty (30) minutes from routing to the Fulfilment Centre.</li>
        </ul>
      </div>
    )
  }
];

