"use client";
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
        style={{
          background: "#FAF7F1",
          border: "1px solid rgba(42,41,40,.08)",
          borderRadius: "20px 20px 22px 22px",
          overflow: "hidden",
          boxShadow: "0 26px 44px -24px rgba(42,41,40,.5)",
          transition: "transform .5s cubic-bezier(.2,.9,.3,1.2), box-shadow .5s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 40px 60px -28px rgba(42,41,40,.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 26px 44px -24px rgba(42,41,40,.5)";
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
          <p style={{ fontSize: 13.5, color: "#8a7d6d", margin: "0 0 18px" }}>
            {shop.desc}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <div style={{ background: "#F4EEE4", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#9a8d7d", letterSpacing: ".06em" }}>DISTANCE</div>
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontWeight: 600, fontSize: 16, color: "#2A2928" }}>
                {shop.distance}
              </div>
            </div>
            <div style={{ background: "#F4EEE4", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#9a8d7d", letterSpacing: ".06em" }}>FROM</div>
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontWeight: 600, fontSize: 16, color: "#2A2928" }}>
                {shop.price}
              </div>
            </div>
            <div style={{ background: "#F4EEE4", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#9a8d7d", letterSpacing: ".06em" }}>READY IN</div>
              <div style={{ fontFamily: "'Space Grotesk', monospace", fontWeight: 600, fontSize: 16, color: "#2A2928" }}>
                {shop.readyIn}
              </div>
            </div>
            <div
              style={{
                background: "#2A2928",
                borderRadius: 12,
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FAF7F1",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "background .3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = shop.hoverColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#2A2928")
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
  return (
    <section
      id="city"
      style={{
        position: "relative",
        padding: "clamp(90px,12vw,150px) clamp(22px,6vw,110px) 0",
        background:
          "linear-gradient(180deg,#F4EDE2 0%, #F3E3CF 55%, #EFD8BE 100%)",
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
          background: "#FAF7F1",
          borderRadius: 40,
          opacity: 0.7,
          boxShadow: "34px 8px 0 -6px #FAF7F1, -28px 6px 0 -8px #FAF7F1",
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
          background: "#FAF7F1",
          borderRadius: 40,
          opacity: 0.6,
          boxShadow: "26px 6px 0 -5px #FAF7F1",
          animation: "drift 22s ease-in-out infinite alternate-reverse",
        }}
      />

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
          }}
        >
          Find your corner shop
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "#6a5a48", margin: 0 }}>
          Little print shops tucked all around town — each one a tiny storefront with its own warmth.
        </p>
      </Reveal>

      {/* Shop cards */}
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
          <line x1="0" y1="202" x2="1440" y2="202" stroke="#FAF7F1" strokeWidth="3" strokeDasharray="34 30" opacity=".55" />
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
