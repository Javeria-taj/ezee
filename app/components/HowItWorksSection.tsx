"use client";
import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const steps = [
  {
    num: "01",
    color: "#7A6D8C",
    rotate: "-1deg",
    title: "Upload your notes",
    desc: "Drag in a PDF, a photo, or a whole semester's worth of scribbles. Ezi keeps them tidy.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <rect x="9" y="14" width="30" height="24" rx="4" fill="#EAE4DD" />
        <path d="M24 30V13M24 13l-6 6M24 13l6 6" stroke="#7A6D8C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "02",
    color: "#D48A70",
    rotate: "1deg",
    title: "Customise everything",
    desc: "Colour or mono, single or double-sided, spiral-bound or stapled. Make it yours.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <circle cx="16" cy="16" r="6" fill="#D48A70" />
        <circle cx="32" cy="32" r="6" fill="#A9B59D" />
        <path d="M16 22v14M32 12v14" stroke="#2A2928" strokeWidth="2.4" strokeLinecap="round" opacity=".4" />
      </svg>
    ),
  },
  {
    num: "03",
    color: "#A9B59D",
    rotate: "-1deg",
    title: "Send it to print",
    desc: "We route your job to the nearest cozy shop with the best price and shortest wait.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <rect x="11" y="20" width="26" height="16" rx="3" fill="#EAE4DD" />
        <rect x="16" y="10" width="16" height="12" rx="2" fill="#A9B59D" />
        <rect x="16" y="30" width="16" height="10" rx="2" fill="#FAF7F1" stroke="#9aa78d" strokeWidth="2" />
      </svg>
    ),
  },
  {
    num: "04",
    color: "#2A2928",
    rotate: "1deg",
    title: "Pick it up warm",
    desc: "Ping! It's ready. Walk over, say hi, and collect your stack — no queue, no wait.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
        <path d="M24 8c7 0 12 5 12 12 0 9-12 20-12 20S12 29 12 20c0-7 5-12 12-12Z" fill="#D48A70" />
        <circle cx="24" cy="20" r="5" fill="#FAF7F1" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [eziPos, setEziPos] = useState({ x: 13.88, y: 9.21 }); // Default percentages based on M150 70

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !pathRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      progress = Math.max(0, Math.min(1, progress));
      
      const length = pathRef.current.getTotalLength();
      const point = pathRef.current.getPointAtLength(progress * length);
      
      setEziPos({
        x: (point.x / 1080) * 100,
        y: (point.y / 760) * 100
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // setTimeout handles the case where path length calculation needs layout first
    setTimeout(handleScroll, 100); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "clamp(90px,12vw,150px) clamp(22px,6vw,110px)",
        background: "var(--bg-tertiary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      <Reveal
        style={{
          textAlign: "center",
          maxWidth: 680,
          margin: "0 auto 70px",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "var(--accent-secondary)",
          }}
        >
          A gentle little journey
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
          How the magic happens
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
          Four small steps between you and a warm stack of freshly printed notes.
        </p>
      </Reveal>

      <div style={{ position: "relative", maxWidth: 1080, margin: "0 auto" }}>
        {/* winding dashed path */}
        <svg
          className="mobile-hide"
          viewBox="0 0 1080 760"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <path
            ref={pathRef}
            d="M150 70 C420 70 360 230 540 230 C720 230 660 430 360 430 C150 430 200 620 700 620"
            fill="none"
            stroke="#cbb8c4"
            strokeWidth="3"
            strokeDasharray="3 12"
            strokeLinecap="round"
          />
          <g style={{ animation: "planefly 5s ease-in-out infinite", transformOrigin: "540px 150px" }}>
            <path d="M520 150 l44 -14 -14 44 -10 -18 -20 -12Z" fill="#7A6D8C" />
          </g>
          <g style={{ animation: "planefly 6s ease-in-out 1s infinite", transformOrigin: "480px 520px" }}>
            <path d="M460 520 l44 -14 -14 44 -10 -18 -20 -12Z" fill="#D48A70" />
          </g>
        </svg>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(34px,4vw,56px)",
          }}
        >
          {steps.map((step, i) => (
            <Reveal
              key={i}
              delay={i * 0.05}
              className="mobile-align-center"
              style={{
                alignSelf: i % 2 === 0 ? "flex-start" : "flex-end",
                maxWidth: 340,
              }}
            >
              <div
                style={{
                  background: "var(--how-card-bg)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 22,
                  padding: 26,
                  boxShadow: "0 1px 0 rgba(255,255,255,.1) inset, 0 22px 40px -22px var(--shadow-color)",
                  transition: "transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.6s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = `translateY(-12px) rotate(${step.rotate}) scale(1.03)`;
                  e.currentTarget.style.boxShadow = "0 34px 54px -26px var(--shadow-color)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 1px 0 rgba(255,255,255,.1) inset, 0 22px 40px -22px var(--shadow-color)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "var(--text-inverse)",
                      background: step.color,
                      width: 30,
                      height: 30,
                      borderRadius: 9,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {step.num}
                  </span>
                  {step.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 23,
                    margin: "0 0 8px",
                    color: "var(--text-primary)"
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--text-secondary)", margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Ezi walking along the path */}
        <div
          className="mobile-hide"
          style={{
            position: "absolute",
            left: `calc(${eziPos.x}% - 60px)`,
            top: `calc(${eziPos.y}% - 140px)`,
            width: 120,
            animation: "bobwalk 1.2s ease-in-out infinite", // walks faster
            transition: "left 0.1s linear, top 0.1s linear",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <svg
            viewBox="0 0 140 170"
            style={{ width: "100%", filter: "drop-shadow(0 14px 16px rgba(42,41,40,.18))" }}
          >
            <ellipse cx="70" cy="160" rx="40" ry="8" fill="#2A2928" opacity=".12" />
            <path d="M44 122 q26 12 52 0 l-3 12 q-23 10 -46 0Z" fill="#A9B59D" />
            <path d="M70 40 C106 40 122 74 122 110 C122 142 102 156 70 156 C38 156 18 142 18 110 C18 74 34 40 70 40Z" fill="#39312B" />
            <ellipse cx="70" cy="102" rx="38" ry="40" fill="#FAF7F1" />
            <circle cx="57" cy="100" r="4.6" fill="#2A2928" />
            <circle cx="83" cy="100" r="4.6" fill="#2A2928" />
            <ellipse cx="47" cy="112" rx="7" ry="4.4" fill="#D48A70" opacity=".55" />
            <ellipse cx="93" cy="112" rx="7" ry="4.4" fill="#D48A70" opacity=".55" />
            <path d="M62 116 Q70 123 78 116" stroke="#2A2928" strokeWidth="2.8" fill="none" strokeLinecap="round" />
            <path d="M34 60 Q70 28 106 60 Q88 68 70 68 Q52 68 34 60Z" fill="#7A6D8C" />
            <circle cx="70" cy="37" r="5" fill="#7A6D8C" />
          </svg>
        </div>
      </div>
    </section>
  );
}
