"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Reveal } from "./Reveal";
interface Shop {
  name: string;
  rating: string;
  desc: string;
  distance: string;
  price: string;
  readyIn: string;
  accentColor: string;
  accentLight: string;
  hoverColor: string;
}

const shops: Shop[] = [
  {
    name: "Paper & Pine",
    rating: "4.9",
    desc: "Quiet shop with the softest cream paper.",
    distance: "0.4 km",
    price: "₹2/pg",
    readyIn: "12 min",
    accentColor: "#D48A70",
    accentLight: "#e7b39e",
    hoverColor: "#D48A70",
  },
  {
    name: "Inkwell Corner",
    rating: "4.7",
    desc: "Fast colour prints and great binding.",
    distance: "0.9 km",
    price: "₹1.5/pg",
    readyIn: "8 min",
    accentColor: "#7A6D8C",
    accentLight: "#9b8fab",
    hoverColor: "#7A6D8C",
  },
  {
    name: "The Margin",
    rating: "4.8",
    desc: "Open late, perfect for night-owl deadlines.",
    distance: "1.3 km",
    price: "₹2/pg",
    readyIn: "15 min",
    accentColor: "#A9B59D",
    accentLight: "#c2cbb8",
    hoverColor: "#A9B59D",
  },
];

function AnimatedCounter({ value, suffix, decimals = 0 }: { value: number, suffix: string, decimals?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => 
    latest.toFixed(decimals) + suffix
  );

  useEffect(() => {
    if (inView) {
      animate(motionValue, value, {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1], // easeOutCubic
      });
    }
  }, [inView, value, motionValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function ShopCard({ shop, delay }: { shop: Shop; delay: number }) {
  return (
    <Reveal
      delay={delay}
      style={{
        flex: "1 1 290px",
        maxWidth: 330,
      }}
    >
      <div
        className="shop-card"
        style={{
          background: "var(--bg-card-white)",
          backdropFilter: "blur(12px)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "20px 20px 22px 22px",
          overflow: "hidden",
          boxShadow: "0 26px 44px -24px var(--shadow-color)",
          transition: "transform .5s cubic-bezier(.2,.9,.3,1.2), box-shadow .5s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 40px 60px -28px var(--shadow-color)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 26px 44px -24px var(--shadow-color)";
        }}
      >
        {/* shop awning */}
        <div
          style={{
            height: 54,
            background: `repeating-linear-gradient(90deg,${shop.accentColor} 0 22px,${shop.accentLight} 22px 44px)`,
            borderRadius: "20px 20px 0 0",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -9,
              left: 0,
              right: 0,
              height: 14,
              background: `repeating-linear-gradient(90deg,${shop.accentColor} 0 22px,${shop.accentLight} 22px 44px)`,
              clipPath:
                "polygon(0 0,100% 0,100% 40%,91% 100%,82% 40%,73% 100%,64% 40%,55% 100%,46% 40%,37% 100%,28% 40%,19% 100%,10% 40%,0 100%)",
            }}
          />
          {/* Live activity pulse */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 12,
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(0,0,0,.28)",
              borderRadius: 20,
              padding: "3px 8px 3px 6px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#6ee7b7",
                boxShadow: "0 0 0 0 rgba(110,231,183,.4)",
                animation: "livePing 1.8s ease-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: ".04em",
                color: "rgba(255,255,255,.9)",
              }}
            >
              OPEN NOW
            </span>
          </div>
        </div>

        <div style={{ padding: "26px 22px 22px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 6,
            }}
          >
            <h3
               style={{
                 fontFamily: "'Space Grotesk', sans-serif",
                 fontWeight: 700,
                 fontSize: 21,
                 margin: 0,
                 color: "var(--text-primary)"
               }}
             >
              {shop.name}
            </h3>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "'Space Grotesk', monospace",
                fontWeight: 600,
                fontSize: 14,
                color: "#3e4636",
                background: "rgba(169,181,157,.22)",
                padding: "4px 9px",
                borderRadius: 9,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#A9B59D">
                <path d="M12 2l3 6.5 7 .6-5.3 4.6 1.6 6.8L12 16.9 5.7 20.5l1.6-6.8L2 9.1l7-.6z" />
              </svg>
              {shop.rating}
            </span>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--text-secondary)", margin: "0 0 18px" }}>
            {shop.desc}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <div style={{ background: "var(--bg-secondary)", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", letterSpacing: ".06em" }}>DISTANCE</div>
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
                <AnimatedCounter value={parseFloat(shop.distance)} suffix=" km" decimals={1} />
              </div>
            </div>
            <div style={{ background: "var(--bg-secondary)", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", letterSpacing: ".06em" }}>FROM</div>
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
                ₹<AnimatedCounter value={parseFloat(shop.price.replace('₹',''))} suffix="/pg" decimals={shop.price.includes('.') ? 1 : 0} />
              </div>
            </div>
            <div style={{ background: "var(--bg-secondary)", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", letterSpacing: ".06em" }}>READY IN</div>
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontWeight: 600, fontSize: 16, color: "var(--text-primary)" }}>
                <AnimatedCounter value={parseFloat(shop.readyIn)} suffix=" min" />
              </div>
            </div>
            <div
              style={{
                background: "var(--text-primary)",
                borderRadius: 12,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-inverse)",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "background .3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = shop.hoverColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--text-primary)")
              }
            >
              Print here →
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function CitySection() {
  const [perspective, setPerspective] = useState<'student' | 'vendor'>('student');
  return (
    <section
      id="city"
      style={{
        position: "relative",
        padding: "clamp(90px,12vw,150px) clamp(22px,6vw,110px) 0",
        background: "var(--bg-primary)",
        overflow: "hidden",
      }}
    >
      {/* drifting clouds */}
      <div
        style={{
          position: "absolute",
          top: "7%",
          left: "8%",
          width: 120,
          height: 40,
          background: "#ffffff",
          borderRadius: 40,
          opacity: 0.7,
          boxShadow: "34px 8px 0 -6px #ffffff, -28px 6px 0 -8px #ffffff",
          animation: "drift 16s ease-in-out infinite alternate",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "13%",
          right: "12%",
          width: 90,
          height: 32,
          background: "#ffffff",
          borderRadius: 40,
          opacity: 0.6,
          boxShadow: "26px 6px 0 -5px #ffffff",
          animation: "drift 22s ease-in-out infinite alternate-reverse",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "18%",
          left: "35%",
          width: 105,
          height: 36,
          background: "#ffffff",
          borderRadius: 40,
          opacity: 0.65,
          boxShadow: "30px 7px 0 -5px #ffffff",
          animation: "drift 19s ease-in-out infinite alternate",
        }}
      />

      {/* flying birds flock */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 5,
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            width: 60,
            height: 30,
            animation: "birdFly1 25s linear infinite",
            animationDelay: "0s",
          }}
          viewBox="-40 -20 80 40"
        >
          <path
            d="M0,0 Q-15,-15 -30,-5"
            stroke="var(--accent-tertiary)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{
              transformOrigin: "0px 0px",
              animation: "wingLeftFlap 0.65s ease-in-out infinite",
            }}
          />
          <path
            d="M0,0 Q15,-15 30,-5"
            stroke="var(--accent-tertiary)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{
              transformOrigin: "0px 0px",
              animation: "wingRightFlap 0.65s ease-in-out infinite",
            }}
          />
        </svg>
        <svg
          style={{
            position: "absolute",
            width: 60,
            height: 30,
            animation: "birdFly2 28s linear infinite",
            animationDelay: "2.2s",
          }}
          viewBox="-40 -20 80 40"
        >
          <path
            d="M0,0 Q-15,-15 -30,-5"
            stroke="var(--accent-tertiary)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{
              transformOrigin: "0px 0px",
              animation: "wingLeftFlap 0.72s ease-in-out infinite",
            }}
          />
          <path
            d="M0,0 Q15,-15 30,-5"
            stroke="var(--accent-tertiary)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{
              transformOrigin: "0px 0px",
              animation: "wingRightFlap 0.72s ease-in-out infinite",
            }}
          />
        </svg>
        <svg
          style={{
            position: "absolute",
            width: 60,
            height: 30,
            animation: "birdFly3 23s linear infinite",
            animationDelay: "1.0s",
          }}
          viewBox="-40 -20 80 40"
        >
          <path
            d="M0,0 Q-15,-15 -30,-5"
            stroke="var(--accent-tertiary)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{
              transformOrigin: "0px 0px",
              animation: "wingLeftFlap 0.6s ease-in-out infinite",
            }}
          />
          <path
            d="M0,0 Q15,-15 30,-5"
            stroke="var(--accent-tertiary)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            style={{
              transformOrigin: "0px 0px",
              animation: "wingRightFlap 0.6s ease-in-out infinite",
            }}
          />
        </svg>
      </div>

      {/* Perspective toggle pill */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          marginBottom: 36,
          zIndex: 4,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 100,
            padding: 4,
            gap: 2,
          }}
        >
          {(['student', 'vendor'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPerspective(p)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                border: "none",
                cursor: "pointer",
                padding: "8px 20px",
                borderRadius: 100,
                transition: "all .25s cubic-bezier(.2,.9,.3,1.2)",
                background: perspective === p ? "var(--text-primary)" : "transparent",
                color: perspective === p ? "var(--text-inverse)" : "var(--text-secondary)",
                boxShadow: perspective === p ? "0 2px 8px rgba(0,0,0,.15)" : "none",
              }}
            >
              {p === 'student' ? "🎓 I'm a Student" : "🏪 I run a Shop"}
            </button>
          ))}
        </div>
      </div>

      <Reveal
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: 680,
          margin: "0 auto 56px",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#b9744f",
          }}
        >
          Golden hour in the city
        </span>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(34px,5vw,62px)",
            lineHeight: 1.02,
            letterSpacing: "-.03em",
            margin: "14px 0 16px",
            color: "var(--text-primary)",
          }}
        >
          Find your corner shop
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "#6a5a48", margin: 0 }}>
          Little print shops tucked all around town — each one a tiny storefront with its own warmth.
        </p>
      </Reveal>

      {/* Shop cards / Vendor view */}
      {perspective === 'student' ? (
        <div
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 26,
            justifyContent: "center",
            paddingBottom: 70,
          }}
        >
          {shops.map((shop, i) => (
            <ShopCard key={shop.name} shop={shop} delay={i * 0.07} />
          ))}
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: 960,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            paddingBottom: 70,
          }}
        >
          {[
            { icon: "📡", title: "Get Discovered", color: "#D48A70", desc: "Students within 2km see your shop first. Every order that comes through Ezee is one you didn't have to wait for." },
            { icon: "📋", title: "Manage Orders Digitally", color: "#7A6D8C", desc: "No more sticky notes. Every job lands in your dashboard — file, specs, and payment, all in one place." },
            { icon: "⚡", title: "Get Paid Instantly", color: "#A9B59D", desc: "UPI and card payments clear before the student walks in. You collect, they collect. That's it." },
          ].map((benefit, i) => (
            <Reveal key={benefit.title} delay={i * 0.08}>
              <div
                style={{
                  background: "var(--bg-card-white)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 22,
                  padding: "32px 28px",
                  boxShadow: "0 20px 40px -20px var(--shadow-color)",
                  transition: "transform .4s cubic-bezier(.2,.9,.3,1.2)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-6px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: `${benefit.color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 20,
                  }}
                >
                  {benefit.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 19,
                    color: "var(--text-primary)",
                    margin: "0 0 10px",
                  }}
                >
                  {benefit.title}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--text-secondary)", margin: "0 0 20px" }}>
                  {benefit.desc}
                </p>
                <a
                  href="/workshop/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 13.5,
                    color: benefit.color,
                    textDecoration: "none",
                  }}
                >
                  Join as partner →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* city skyline */}
      <div className="city-skyline-wrap" style={{ position: "relative", height: 200, marginTop: 10 }}>
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="xMidYMax slice"
          className="city-skyline-svg"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {/* road */}
          <rect x="0" y="186" width="1440" height="34" fill="#9c8466" />
          <line x1="0" y1="202" x2="1440" y2="202" stroke="var(--bg-tertiary)" strokeWidth="3" strokeDasharray="34 30" opacity=".55" />
          {/* trees */}
          <g><rect x="60" y="150" width="8" height="40" fill="#8a6b4a" /><circle cx="64" cy="146" r="22" fill="#A9B59D" /></g>
          <g><rect x="1360" y="150" width="8" height="40" fill="#8a6b4a" /><circle cx="1364" cy="146" r="22" fill="#94a386" /></g>
          {/* buildings */}
          <g><rect x="120" y="96" width="120" height="92" rx="6" fill="#D9B99A" /><rect x="138" y="116" width="18" height="22" rx="3" fill="#F3DCC0" /><rect x="172" y="116" width="18" height="22" rx="3" fill="#F3DCC0" /><rect x="206" y="116" width="18" height="22" rx="3" fill="#F0C79B" /><rect x="138" y="150" width="18" height="22" rx="3" fill="#F0C79B" /><rect x="172" y="150" width="18" height="22" rx="3" fill="#F3DCC0" /></g>
          <g><rect x="270" y="64" width="96" height="124" rx="6" fill="#C99F87" /><rect x="286" y="84" width="16" height="20" rx="3" fill="#F0C79B" /><rect x="316" y="84" width="16" height="20" rx="3" fill="#F3DCC0" /><rect x="286" y="116" width="16" height="20" rx="3" fill="#F3DCC0" /><rect x="316" y="116" width="16" height="20" rx="3" fill="#F0C79B" /><rect x="286" y="148" width="16" height="20" rx="3" fill="#F0C79B" /></g>
          <g><rect x="392" y="110" width="110" height="78" rx="6" fill="#bfa9bd" /><rect x="408" y="128" width="18" height="20" rx="3" fill="#F3DCC0" /><rect x="442" y="128" width="18" height="20" rx="3" fill="#F0C79B" /><rect x="476" y="128" width="18" height="20" rx="3" fill="#F3DCC0" /></g>
          <g><rect x="1180" y="80" width="100" height="108" rx="6" fill="#D9B99A" /><rect x="1196" y="100" width="16" height="20" rx="3" fill="#F0C79B" /><rect x="1228" y="100" width="16" height="20" rx="3" fill="#F3DCC0" /><rect x="1196" y="132" width="16" height="20" rx="3" fill="#F3DCC0" /><rect x="1228" y="132" width="16" height="20" rx="3" fill="#F0C79B" /></g>
          <g><rect x="1020" y="104" width="120" height="84" rx="6" fill="#C99F87" /><rect x="1038" y="122" width="18" height="20" rx="3" fill="#F3DCC0" /><rect x="1072" y="122" width="18" height="20" rx="3" fill="#F0C79B" /><rect x="1106" y="122" width="18" height="20" rx="3" fill="#F3DCC0" /></g>
          {/* street lamps */}
          <g>
            <rect x="700" y="120" width="6" height="70" fill="#6a584a" />
            <path d="M703 120 q0 -14 16 -14" fill="none" stroke="#6a584a" strokeWidth="6" />
            <circle cx="722" cy="108" r="8" fill="#F0C79B">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
          <g>
            <rect x="900" y="120" width="6" height="70" fill="#6a584a" />
            <path d="M903 120 q0 -14 -16 -14" fill="none" stroke="#6a584a" strokeWidth="6" />
            <circle cx="884" cy="108" r="8" fill="#F0C79B">
              <animate attributeName="opacity" values="1;0.7;1" dur="5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>
    </section>
  );
}
