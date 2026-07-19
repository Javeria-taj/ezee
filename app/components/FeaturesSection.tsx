"use client";
import React from "react";
import { Reveal } from "./Reveal";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        position: "relative",
        padding: "clamp(90px,12vw,150px) clamp(22px,6vw,110px)",
        background: "var(--bg-secondary)",
      }}
    >
      <Reveal
        style={{
          textAlign: "center",
          maxWidth: 700,
          margin: "0 auto 64px",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "var(--accent-tertiary)",
          }}
        >
          Everything in the drawer
        </span>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(34px,5vw,62px)",
            lineHeight: 1.02,
            letterSpacing: "-.03em",
            margin: "14px 0 16px",
            color: "var(--text-primary)"
          }}
        >
          Everything you need,
          <br />
          nothing you don&apos;t
        </h2>
      </Reveal>

      <div
        className="mobile-col-1"
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: 20,
        }}
      >
        {/* Real-time tracking — big card */}
        <Reveal
          style={{
            gridColumn: "span 4",
          }}
        >
          <div
            style={{
              position: "relative",
              minHeight: 230,
              background: "var(--bg-tertiary)",
              backdropFilter: "blur(12px)",
              borderRadius: 24,
              padding: 30,
              overflow: "hidden",
              boxShadow: "0 26px 46px -26px var(--shadow-color)",
              border: "1px solid var(--border-subtle)",
              transition: "transform 0.6s var(--anim-easing)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px) scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            {/* notebook spiral */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 34,
                background: "#7A6D8C",
                borderRadius: "24px 0 0 24px",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 11,
                top: 24,
                bottom: 24,
                width: 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{ width: 12, height: 12, borderRadius: "50%", background: "#FAF7F1" }}
                />
              ))}
            </div>

            <div style={{ paddingLeft: 30 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#3e4636",
                  background: "rgba(169,181,157,.25)",
                  padding: "5px 11px",
                  borderRadius: 100,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#A9B59D",
                    boxShadow: "0 0 0 3px rgba(169,181,157,.3)",
                  }}
                />
                Live now
              </div>
               <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 27,
                  margin: "0 0 8px",
                  color: "var(--text-primary)",
                }}
              >
                Ambient preparation
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--text-secondary)",
                  maxWidth: 340,
                  margin: "0 0 20px",
                }}
              >
                Follow the journey of your notes from a quiet draft to a beautifully bound keepsake resting on the shelf.
              </p>
              {/* Ambient preparation icons */}
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', opacity: 0.85 }}>
                <span style={{ fontSize: '1.5rem' }}>✈️</span>
                <span style={{ fontSize: '0.9rem', color: '#7A6D8C', fontFamily: 'Space Grotesk' }}>→</span>
                <span style={{ fontSize: '1.5rem' }}>🖨️</span>
                <span style={{ fontSize: '0.9rem', color: '#7A6D8C', fontFamily: 'Space Grotesk' }}>→</span>
                <span style={{ fontSize: '1.5rem' }}>🌿</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* One-tap payments */}
        <Reveal delay={0.05} style={{ gridColumn: "span 2" }}>
          <div
            style={{
              minHeight: 230,
              background: "var(--text-primary)",
              color: "var(--bg-primary)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 26px 46px -26px var(--shadow-color)",
              transition: "transform 0.6s var(--anim-easing)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px) scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="12" width="32" height="24" rx="5" fill="#D48A70" />
              <rect x="8" y="18" width="32" height="6" fill="#2A2928" />
              <rect x="13" y="28" width="12" height="4" rx="2" fill="#FAF7F1" />
            </svg>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, margin: "0 0 6px", color: "var(--bg-primary)" }}>
                One-tap payments
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text-card-reverse-desc)", margin: 0 }}>
                UPI, cards, wallets. Pay before you arrive, collect and go.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Deep customisation */}
        <Reveal delay={0} style={{ gridColumn: "span 2" }}>
          <div
            style={{
              minHeight: 210,
              background: "#D48A70",
              color: "#FAF7F1",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 26px 46px -26px rgba(212,138,112,.7)",
              transition: "transform .5s cubic-bezier(.2,.9,.3,1.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px) rotate(-1deg)";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#FAF7F1" }} />
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#7A6D8C" }} />
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#A9B59D" }} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, margin: "0 0 6px" }}>
                Deep customisation
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "#fbeee7", margin: 0 }}>
                Paper, colour, binding, layout — tuned to taste.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Gentle nudges */}
        <Reveal delay={0.05} style={{ gridColumn: "span 2" }}>
          <div
            style={{
              minHeight: 210,
              background: "var(--bg-tertiary)",
              backdropFilter: "blur(12px)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 26px 46px -26px var(--shadow-color)",
              border: "1px solid var(--border-subtle)",
              transition: "transform 0.6s var(--anim-easing)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px) scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path d="M24 8a10 10 0 0 0-10 10v8l-4 6h28l-4-6v-8A10 10 0 0 0 24 8Z" fill="#A9B59D" />
              <path d="M20 38a4 4 0 0 0 8 0" fill="#A9B59D" />
              <circle cx="34" cy="12" r="6" fill="#D48A70" />
            </svg>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, margin: "0 0 6px", color: "var(--text-primary)" }}>
                Gentle nudges
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text-secondary)", margin: 0 }}>
                A soft ping when your prints are warm and ready.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Print history */}
        <Reveal delay={0.1} style={{ gridColumn: "span 2" }}>
          <div
            style={{
              position: "relative",
              minHeight: 210,
              background: "var(--bg-card-gray)",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 26px 46px -26px var(--shadow-color)",
              border: "1px solid var(--border-subtle)",
              transition: "transform 0.6s var(--anim-easing)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px) rotate(2deg) scale(1.02)";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            {/* tape */}
            <div
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%) rotate(-3deg)",
                width: 74,
                height: 24,
                background: "rgba(169,181,157,.55)",
                border: "1px dashed rgba(62,70,54,.3)",
              }}
            />
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="16" fill="none" stroke="#7A6D8C" strokeWidth="3" />
              <path d="M24 15v9l6 4" stroke="#7A6D8C" strokeWidth="3" strokeLinecap="round" fill="none" />
            </svg>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, margin: "0 0 6px", color: "var(--text-primary)" }}>
                Your print history
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text-secondary)", margin: 0 }}>
                Reprint last week&apos;s notes in two taps.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Queue-free pickup */}
        <Reveal delay={0.15} style={{ gridColumn: "span 2" }}>
          <div
            style={{
              minHeight: 210,
              background: "#A9B59D",
              color: "#2A2928",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 26px 46px -26px rgba(169,181,157,.7)",
              transition: "transform .5s cubic-bezier(.2,.9,.3,1.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path d="M10 18h28l-2 22H12L10 18Z" fill="#FAF7F1" />
              <path d="M17 18a7 7 0 0 1 14 0" fill="none" stroke="#2A2928" strokeWidth="3" />
            </svg>
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, margin: "0 0 6px" }}>
                Queue-free pickup
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: "#33392c", margin: 0 }}>
                Skip the line. Your stack is set aside with your name on it.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
