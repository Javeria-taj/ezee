"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Typewriter cycling subheadlines
  const subtitles = [
    "No more waiting in queues.",
    "Deadline? Already handled.",
    "Your notes, warm and waiting.",
  ];
  const [subIdx, setSubIdx] = useState(0);
  const [subVisible, setSubVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubVisible(false);
      setTimeout(() => {
        setSubIdx((i) => (i + 1) % subtitles.length);
        setSubVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // For 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 150]);
  const opParallax = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="mobile-hero-pad mobile-stack mobile-center-items mobile-text-center"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px clamp(22px,6vw,110px) 80px",
        background:
          "radial-gradient(120% 90% at 78% 18%, var(--bg-tertiary) 0%, var(--bg-primary) 46%, var(--bg-secondary) 100%)",
        overflow: "hidden",
      }}
    >
      {/* warm sun wash */}
      <div
        style={{
          position: "absolute",
          top: "-12%",
          right: "6%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,138,112,.35), rgba(212,138,112,0) 62%)",
          filter: "blur(8px)",
          animation: "sunpulse 9s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* floating dust particles */}
      {[
        { left: "14%", top: "26%", size: 7, color: "#D48A70", opacity: 0.4, anim: "floaty 7s ease-in-out infinite" },
        { left: "42%", top: "18%", size: 5, color: "#A9B59D", opacity: 0.5, anim: "floaty2 9s ease-in-out infinite" },
        { left: "64%", top: "62%", size: 6, color: "#7A6D8C", opacity: 0.35, anim: "floaty 8s ease-in-out .6s infinite" },
        { left: "30%", top: "70%", size: 4, color: "#D48A70", opacity: 0.45, anim: "floaty2 11s ease-in-out 1s infinite" },
        { left: "84%", top: "40%", size: 5, color: "#A9B59D", opacity: 0.4, anim: "floaty 10s ease-in-out .3s infinite" },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: p.opacity,
            animation: p.anim,
          }}
        />
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1240,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 48,
          justifyContent: "space-between",
        }}
      >
        {/* Hero Copy */}
        <Reveal
          className="mobile-center-items mobile-text-center"
          style={{
            flex: "1 1 420px",
            maxWidth: 560,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "7px 14px 7px 9px",
              background: "rgba(169,181,157,.18)",
              border: "1px solid rgba(169,181,157,.4)",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
              color: "#5e6b53",
              marginBottom: 26,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#A9B59D",
                boxShadow: "0 0 0 4px rgba(169,181,157,.25)",
              }}
            />
            Now open in your study nook
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.2 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(46px,7.4vw,92px)",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              margin: "0 0 22px",
              color: "var(--text-primary)",
            }}
          >
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}>Print.</motion.span>
            <br />
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} style={{ color: "var(--accent-primary)" }}>Study.</motion.span>
            <br />
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>Repeat.</motion.span>
          </motion.h1>

          <p
            style={{
              fontSize: "clamp(16px,1.7vw,19.5px)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              maxWidth: 430,
              margin: "0 0 12px",
            }}
          >
            Upload your notes, customise every print, and collect them from a
            cozy shop nearby.
          </p>

          {/* Cycling typewriter tagline */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 34,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--accent-primary)",
                animation: "sunpulse 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(14px,1.3vw,16px)",
                color: "var(--accent-primary)",
                opacity: subVisible ? 1 : 0,
                transform: subVisible ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                display: "inline-block",
              }}
            >
              {subtitles[subIdx]}
            </span>
          </div>

          <div
            className="mobile-center-items"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              alignItems: "center",
            }}
          >
            <Link
              href="/auth"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 16,
                fontWeight: 600,
                color: "var(--text-inverse)",
                background: "var(--text-primary)",
                padding: "16px 26px",
                borderRadius: 17,
                boxShadow: "0 14px 26px -12px var(--shadow-color)",
                transition:
                  "transform .6s cubic-bezier(.2,.9,.3,1.3), box-shadow .6s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 22px 34px -14px var(--shadow-color)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 14px 26px -12px var(--shadow-color)";
              }}
            >
              Start Printing
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <a
              href="#how"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 16,
                fontWeight: 600,
                color: "var(--text-primary)",
                background: "var(--glass-bg)",
                border: "1.5px solid var(--border-subtle)",
                padding: "15px 24px",
                borderRadius: 17,
                transition:
                  "transform .6s cubic-bezier(.2,.9,.3,1.3), background .6s, border-color .6s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                e.currentTarget.style.background = "var(--bg-primary)";
                e.currentTarget.style.borderColor = "var(--text-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.background = "var(--glass-bg)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
            >
              Meet Ezi
            </a>
          </div>
        </Reveal>

        {/* Hero Illustration */}
        {/* Right side graphic */}
        <motion.div
          className="mobile-hide"
          style={{
            flex: "1 1 480px",
            height: 520,
            perspective: 1200,
            position: "relative",
            y: yParallax,
            opacity: opParallax,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1/.94",
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
            }}
          >
            <svg
              viewBox="0 0 560 530"
              style={{
                width: "100%",
                height: "100%",
                overflow: "visible",
                filter: "drop-shadow(0 30px 50px rgba(42,41,40,.16))",
              }}
            >
              <defs>
                <clipPath id="winclip">
                  <rect x="60" y="40" width="250" height="250" rx="18" />
                </clipPath>
              </defs>
              {/* wall */}
              <rect x="0" y="0" width="560" height="440" rx="26" fill="#F3ECE1" className="hero-wall" />
              {/* window */}
              <rect x="48" y="28" width="274" height="274" rx="26" fill="#cdbfa9" className="hero-window-border" />
              <g clipPath="url(#winclip)">
                <rect x="60" y="40" width="250" height="250" fill="#F3DCC0" className="hero-window-sky" />
                <circle cx="225" cy="120" r="46" fill="#F0C79B" className="hero-sun" />
                <circle
                  cx="225"
                  cy="120"
                  r="62"
                  fill="#F0C79B"
                  opacity=".35"
                  className="hero-sun-glow"
                  style={{ animation: "sunpulse 8s ease-in-out infinite", transformOrigin: "225px 120px" }}
                />
                <path d="M60 250 Q120 210 185 240 T310 235 V290 H60Z" fill="#cdbf9f" opacity=".7" className="hero-mountain-1" />
                <path d="M60 268 Q140 238 220 262 T310 258 V290 H60Z" fill="#bdb091" opacity=".6" className="hero-mountain-2" />
              </g>
              {/* window frame bars */}
              <rect x="48" y="28" width="274" height="274" rx="26" fill="none" stroke="#bfae93" strokeWidth="12" className="hero-window-frame" />
              <rect x="181" y="34" width="8" height="262" fill="#bfae93" className="hero-window-bars" />
              <rect x="54" y="161" width="262" height="8" fill="#bfae93" className="hero-window-bars" />
              {/* plant swaying */}
              <g style={{ transformOrigin: "96px 318px", animation: "sway 5s ease-in-out infinite" }}>
                <path d="M96 318 C96 300 84 286 78 274 C90 280 96 292 99 304 C100 290 100 276 108 266 C108 282 104 298 100 312 C108 304 118 300 128 300 C120 312 110 318 100 322Z" fill="#A9B59D" />
              </g>
              <rect x="78" y="316" width="44" height="34" rx="6" fill="#C98E6F" />
              <rect x="78" y="316" width="44" height="11" rx="4" fill="#b97f60" />
              {/* second plant */}
              <g style={{ transformOrigin: "268px 320px", animation: "sway2 6s ease-in-out infinite" }}>
                <path d="M268 320 C266 300 272 286 284 276 C282 292 278 304 274 314 C284 308 296 308 306 312 C296 322 282 324 272 324Z" fill="#8c9a80" />
                <path d="M268 320 C268 302 258 292 248 286 C254 298 260 308 264 318Z" fill="#A9B59D" />
              </g>
              <rect x="250" y="318" width="38" height="30" rx="6" fill="#7A6D8C" />
              {/* desk */}
              <rect x="0" y="392" width="560" height="138" rx="20" fill="#B98A63" />
              <rect x="0" y="392" width="560" height="20" rx="10" fill="#caa078" />
              <rect x="0" y="408" width="560" height="6" fill="#a87b56" opacity=".5" />
              {/* books stack */}
              <g>
                <rect x="372" y="338" width="150" height="20" rx="4" fill="#7A6D8C" />
                <rect x="382" y="318" width="140" height="20" rx="4" fill="#A9B59D" />
                <rect x="364" y="298" width="158" height="22" rx="4" fill="#D48A70" />
                <rect x="364" y="305" width="158" height="4" fill="#2A2928" opacity=".12" />
              </g>
              {/* desk lamp */}
              <g>
                <rect x="430" y="250" width="14" height="60" rx="6" fill="#5b554f" />
                <ellipse cx="437" cy="392" rx="40" ry="9" fill="#5b554f" />
                <path d="M437 256 L470 214" stroke="#5b554f" strokeWidth="11" strokeLinecap="round" />
                <path d="M470 214 L500 230 L488 256 L456 240Z" fill="#2A2928" />
                <polygon points="476,250 380,392 550,392" fill="#F0C79B" className="hero-lamp-beam" />
                <ellipse cx="476" cy="250" rx="34" ry="14" fill="#F0C79B" opacity=".55" className="hero-lamp-bulb" style={{ animation: "lampglow 4s ease-in-out infinite" }} />
              </g>
              {/* coffee cup + steam */}
              <g>
                <path d="M70 396 q-3 28 6 40 q9 12 30 12 q21 0 30 -12 q9 -12 6 -40Z" fill="#FAF7F1" />
                <path d="M142 404 q22 2 20 22 q-2 18 -22 16" fill="none" stroke="#FAF7F1" strokeWidth="7" />
                <ellipse cx="106" cy="398" rx="38" ry="9" fill="#6f4a32" />
                <path d="M96 372 q-8 10 0 20 q8 10 0 20" fill="none" stroke="#cdbfae" strokeWidth="4" strokeLinecap="round" opacity=".7" style={{ animation: "steam 3.4s ease-out infinite" }} />
                <path d="M114 366 q-8 12 0 22 q8 10 0 22" fill="none" stroke="#cdbfae" strokeWidth="4" strokeLinecap="round" opacity=".7" style={{ animation: "steam 3.4s ease-out .9s infinite" }} />
              </g>
              {/* tiny printer */}
              <g>
                <rect x="208" y="348" width="120" height="50" rx="10" fill="#EAE4DD" />
                <rect x="208" y="348" width="120" height="14" rx="7" fill="#d9d1c6" />
                <rect x="232" y="318" width="72" height="40" rx="5" fill="#FAF7F1" stroke="#d9d1c6" strokeWidth="2" />
                <line x1="244" y1="332" x2="292" y2="332" stroke="#cbb8c4" strokeWidth="3" strokeLinecap="round" />
                <line x1="244" y1="342" x2="282" y2="342" stroke="#cbb8c4" strokeWidth="3" strokeLinecap="round" />
                <circle cx="300" cy="378" r="5" fill="#A9B59D" />
              </g>
              {/* sticky notes */}
              <g style={{ transformOrigin: "380px 90px", animation: "sway2 7s ease-in-out infinite" }}>
                <rect x="356" y="56" width="62" height="60" rx="3" fill="#F0C79B" transform="rotate(-5 387 86)" />
                <line x1="368" y1="78" x2="404" y2="76" stroke="#b98a63" strokeWidth="2.5" transform="rotate(-5 387 86)" />
                <line x1="368" y1="90" x2="398" y2="89" stroke="#b98a63" strokeWidth="2.5" transform="rotate(-5 387 86)" />
              </g>
              <g style={{ transformOrigin: "460px 110px", animation: "sway 8s ease-in-out infinite" }}>
                <rect x="436" y="78" width="58" height="56" rx="3" fill="#A9B59D" transform="rotate(6 465 106)" />
                <path d="M448 110 l8 8 16 -18" stroke="#3e4636" strokeWidth="3" fill="none" strokeLinecap="round" transform="rotate(6 465 106)" />
              </g>
              {/* EZI reading */}
              <g style={{ transformOrigin: "175px 430px", animation: "breathe 4.5s ease-in-out infinite" }}>
                <ellipse cx="175" cy="470" rx="62" ry="13" fill="#2A2928" opacity=".12" />
                <path d="M138 432 q37 18 74 0 l-4 16 q-33 14 -66 0Z" fill="#D48A70" />
                <path d="M175 352 C214 352 230 388 230 426 C230 458 210 472 175 472 C140 472 120 458 120 426 C120 388 136 352 175 352Z" fill="#39312B" />
                <ellipse cx="175" cy="416" rx="40" ry="42" fill="#FAF7F1" />
                <circle cx="161" cy="414" r="5" fill="#2A2928" />
                <circle cx="189" cy="414" r="5" fill="#2A2928" />
                <circle cx="162.6" cy="412.4" r="1.6" fill="#fff" />
                <circle cx="190.6" cy="412.4" r="1.6" fill="#fff" />
                <ellipse cx="150" cy="426" rx="8" ry="5" fill="#D48A70" opacity=".55" />
                <ellipse cx="200" cy="426" rx="8" ry="5" fill="#D48A70" opacity=".55" />
                <path d="M167 430 Q175 437 183 430" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M138 372 Q175 338 212 372 Q193 380 175 380 Q157 380 138 372Z" fill="#7A6D8C" />
                <circle cx="175" cy="348" r="5.5" fill="#7A6D8C" />
                <g transform="rotate(34 214 392)">
                  <rect x="208" y="362" width="9" height="48" rx="2" fill="#F0C79B" />
                  <path d="M208 410 l4.5 9 4.5 -9Z" fill="#39312B" />
                  <rect x="208" y="362" width="9" height="7" fill="#D48A70" />
                </g>
                <g transform="rotate(-7 130 452)">
                  <rect x="104" y="430" width="56" height="44" rx="4" fill="#FAF7F1" stroke="#e2d9cd" strokeWidth="2" />
                  <line x1="114" y1="444" x2="150" y2="444" stroke="#cbb8c4" strokeWidth="2.6" />
                  <line x1="114" y1="453" x2="146" y2="453" stroke="#cbb8c4" strokeWidth="2.6" />
                  <line x1="114" y1="462" x2="140" y2="462" stroke="#cbb8c4" strokeWidth="2.6" />
                </g>
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "#9a9085",
          fontSize: 12,
          letterSpacing: ".18em",
          textTransform: "uppercase",
        }}
      >
        <span>Scroll into the nook</span>
        <div
          style={{
            width: 22,
            height: 34,
            border: "1.5px solid rgba(42,41,40,.25)",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: "#9a9085",
              animation: "floaty 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
