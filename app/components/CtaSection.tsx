"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";

export default function CtaSection() {
  return (
    <section
      id="cta"
      style={{
        position: "relative",
        padding:
          "clamp(100px,14vw,170px) clamp(22px,6vw,110px) clamp(70px,8vw,90px)",
        background:
          "radial-gradient(100% 80% at 50% 110%, #3a2f2a 0%, #29211e 45%, #211b19 100%)",
        color: "#FAF7F1",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* stars */}
      {[
        { top: "12%", left: "18%", size: 4, delay: "0s", dur: "3.4s" },
        { top: "20%", left: "46%", size: 3, delay: ".6s", dur: "4.2s" },
        { top: "16%", left: "74%", size: 4, delay: "1.1s", dur: "3.8s" },
        { top: "30%", left: "30%", size: 3, delay: ".2s", dur: "5s" },
        { top: "34%", left: "62%", size: 3, delay: ".9s", dur: "4.6s" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#FAF7F1",
            animation: `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}

      {/* desk lamp glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 560,
          height: 360,
          background:
            "radial-gradient(circle at 50% 100%, rgba(240,199,155,.4), rgba(240,199,155,0) 64%)",
          pointerEvents: "none",
          animation: "lampglow 5s ease-in-out infinite",
        }}
      />

      <Reveal
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 680,
          margin: "0 auto",
        }}
      >
        {/* Ezi waving */}
        <div
          style={{
            width: 150,
            margin: "0 auto 18px",
            animation: "breathe 4s ease-in-out infinite",
          }}
        >
          <svg
            viewBox="0 0 160 180"
            style={{
              width: "100%",
              overflow: "visible",
              filter: "drop-shadow(0 18px 26px rgba(0,0,0,.45))",
            }}
          >
            <ellipse cx="80" cy="168" rx="46" ry="9" fill="#000" opacity=".25" />
            <path d="M50 128 q30 14 60 0 l-3 14 q-27 12 -54 0Z" fill="#A9B59D" />
            <path
              d="M80 44 C118 44 136 80 136 118 C136 152 114 168 80 168 C46 168 24 152 24 118 C24 80 42 44 80 44Z"
              fill="#39312B"
            />
            <ellipse cx="80" cy="110" rx="42" ry="44" fill="#FAF7F1" />
            <circle cx="66" cy="108" r="5" fill="#2A2928" />
            <circle cx="94" cy="108" r="5" fill="#2A2928" />
            <circle cx="67.6" cy="106.2" r="1.7" fill="#fff" />
            <circle cx="95.6" cy="106.2" r="1.7" fill="#fff" />
            <ellipse cx="55" cy="121" rx="8" ry="5" fill="#D48A70" opacity=".55" />
            <ellipse cx="105" cy="121" rx="8" ry="5" fill="#D48A70" opacity=".55" />
            <path
              d="M71 125 Q80 133 89 125"
              stroke="#2A2928"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M40 64 Q80 30 120 64 Q100 72 80 72 Q60 72 40 64Z" fill="#7A6D8C" />
            <circle cx="80" cy="40" r="6" fill="#7A6D8C" />
            {/* waving arm */}
            <g
              style={{
                transformOrigin: "128px 120px",
                animation: "sway 1.4s ease-in-out infinite",
              }}
            >
              <path
                d="M122 122 q22 -10 26 -30"
                fill="none"
                stroke="#39312B"
                strokeWidth="13"
                strokeLinecap="round"
              />
              <circle cx="150" cy="90" r="9" fill="#39312B" />
            </g>
          </svg>
        </div>

        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(40px,6.4vw,82px)",
            lineHeight: 0.98,
            letterSpacing: "-.035em",
            margin: "0 0 18px",
          }}
        >
          Ready to print?
        </h2>
        <p
          style={{
            fontSize: "clamp(16px,1.7vw,19px)",
            lineHeight: 1.6,
            color: "#c9bfb6",
            maxWidth: 440,
            margin: "0 auto 36px",
          }}
        >
          The nook&apos;s still warm and the lamp&apos;s still on. Bring your notes — Ezi will
          handle the rest.
        </p>

        <Link
          href="/auth"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 11,
            fontSize: 17,
            fontWeight: 600,
            color: "#2A2928",
            background: "#F0C79B",
            padding: "18px 32px",
            borderRadius: 18,
            boxShadow: "0 18px 40px -14px rgba(240,199,155,.7)",
            transition:
              "transform .4s cubic-bezier(.2,.9,.3,1.3), box-shadow .4s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
            e.currentTarget.style.boxShadow =
              "0 26px 50px -16px rgba(240,199,155,.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow =
              "0 18px 40px -14px rgba(240,199,155,.7)";
          }}
        >
          Start Your Journey
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2A2928"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>

        <div
          style={{
            marginTop: 70,
            paddingTop: 26,
            borderTop: "1px solid rgba(250,247,241,.12)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13.5,
            color: "#9a9085",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "center" }}>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: "#EAE4DD",
                letterSpacing: ".02em"
              }}
            >
              EZEE™
            </span>
            <span>·</span>
            <span>Made in the study nook, one warm print at a time.</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "center", fontSize: 12.5 }}>
            <Link href="/privacy" style={{ color: "#9a9085", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = '#FAF7F1'} onMouseLeave={e => e.currentTarget.style.color = '#9a9085'}>Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" style={{ color: "#9a9085", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = '#FAF7F1'} onMouseLeave={e => e.currentTarget.style.color = '#9a9085'}>Terms &amp; Conditions</Link>
            <span>·</span>
            <Link href="/contact" style={{ color: "#9a9085", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = '#FAF7F1'} onMouseLeave={e => e.currentTarget.style.color = '#9a9085'}>Contact</Link>
            <span>·</span>
            <span>All trademarks acknowledged</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
