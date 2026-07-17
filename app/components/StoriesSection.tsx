"use client";
import { Reveal } from "./Reveal";
const EziSVG = ({ beretColor }: { beretColor: string }) => (
  <svg width="70" height="80" viewBox="0 0 140 170">
    <path
      d="M70 40 C106 40 122 74 122 110 C122 142 102 156 70 156 C38 156 18 142 18 110 C18 74 34 40 70 40Z"
      fill="#39312B"
    />
    <ellipse cx="70" cy="102" rx="38" ry="40" fill="#FAF7F1" />
    <circle cx="57" cy="100" r="4.6" fill="#2A2928" />
    <circle cx="83" cy="100" r="4.6" fill="#2A2928" />
    <path
      d="M62 116 Q70 123 78 116"
      stroke="#2A2928"
      strokeWidth="2.8"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M34 60 Q70 28 106 60 Q88 68 70 68 Q52 68 34 60Z"
      fill={beretColor}
    />
  </svg>
);

const testimonials = [
  {
    type: "polaroid" as const,
    rotate: "-4deg",
    bgGradient: "linear-gradient(135deg,#e7b39e,#D48A70)",
    beretColor: "#7A6D8C",
    quote: '"Picked up 200 pages between lectures. Zero queue. Pure joy."',
    author: "— Aanya, final year",
    tapeStyle: { top: -12, left: "50%", transform: "translateX(-50%) rotate(4deg)", width: 90, height: 26, background: "rgba(212,138,112,.5)", border: "1px dashed rgba(180,100,76,.4)" },
    delay: 0,
    width: 264,
    imgHeight: 170,
  },
  {
    type: "polaroid" as const,
    rotate: "3deg",
    bgGradient: "linear-gradient(135deg,#bcc8b0,#A9B59D)",
    beretColor: "#D48A70",
    quote: '"It feels less like an app and more like a friend who prints for you."',
    author: "— Rohan, 2nd year",
    pinStyle: { top: -10, right: 14, width: 18, height: 18, borderRadius: "50%", background: "#7A6D8C", boxShadow: "inset 0 0 0 4px #FAF7F1, 0 3px 6px rgba(0,0,0,.2)" },
    delay: 0.06,
    width: 248,
    imgHeight: 140,
    marginTop: 30,
  },
  {
    type: "sticky" as const,
    rotate: "-2deg",
    background: "#F0C79B",
    quote: '"Saved me the night before submission. Open at 1am. Legend."',
    author: "— Meera",
    delay: 0.12,
    width: 220,
  },
  {
    type: "polaroid" as const,
    rotate: "2.5deg",
    bgGradient: "linear-gradient(135deg,#9b8fab,#7A6D8C)",
    beretColor: "#A9B59D",
    quote: '"Found a shop 200m from my hostel I never knew existed."',
    author: "— Dev, 1st year",
    tapeStyle: { top: -12, left: 20, transform: "rotate(-6deg)", width: 84, height: 24, background: "rgba(169,181,157,.5)", border: "1px dashed rgba(80,100,70,.35)" },
    delay: 0.18,
    width: 252,
    imgHeight: 160,
    marginTop: 20,
  },
];

export default function StoriesSection() {
  return (
    <section
      id="stories"
      style={{
        position: "relative",
        padding: "clamp(90px,12vw,150px) clamp(22px,6vw,110px)",
        background: "linear-gradient(180deg,#EAE0D2 0%, #F2ECE2 100%)",
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
            color: "#b9744f",
          }}
        >
          Pinned to the wall
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
          Notes from the nook
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "#5b554f", margin: 0 }}>
          Little memories left behind by students who found their corner.
        </p>
      </Reveal>

      <div
        className="mobile-stack mobile-center-items"
        style={{
          maxWidth: 1040,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "34px 40px",
        }}
      >
        {testimonials.map((t, i) => {
          if (t.type === "sticky") {
            return (
              <Reveal
                key={i}
                delay={t.delay}
                className="mobile-stories-card"
              >
                <div
                  style={{
                    position: "relative",
                    width: t.width,
                    minHeight: 220,
                    background: t.background,
                    padding: "24px 22px",
                    boxShadow: "0 18px 30px -16px rgba(42,41,40,.45)",
                    transform: `rotate(${t.rotate})`,
                    transition: "transform .5s cubic-bezier(.2,.9,.3,1.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "rotate(0deg) translateY(-6px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${t.rotate})`;
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -9,
                      left: "50%",
                      transform: "translateX(-50%) rotate(-3deg)",
                      width: 80,
                      height: 22,
                      background: "rgba(250,247,241,.55)",
                      border: "1px dashed rgba(120,100,70,.35)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 18,
                      lineHeight: 1.4,
                      color: "#5a4326",
                      margin: "8px 0 14px",
                    }}
                  >
                    {t.quote}
                  </p>
                  <p style={{ fontSize: 13, color: "#7a6038", margin: 0 }}>{t.author}</p>
                </div>
              </Reveal>
            );
          }

          return (
            <Reveal
              key={i}
              delay={t.delay}
              className="mobile-stories-card"
              style={{
                marginTop: (t as any).marginTop ?? 0,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: t.width,
                  background: "#FAF7F1",
                  padding: "14px 14px 22px",
                  borderRadius: 4,
                  boxShadow: "0 22px 38px -20px rgba(42,41,40,.5)",
                  transform: `rotate(${t.rotate})`,
                  transition: "transform .5s cubic-bezier(.2,.9,.3,1.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "rotate(0deg) translateY(-6px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${t.rotate})`;
                }}
              >
                {(t as any).tapeStyle && (
                  <div style={{ position: "absolute", ...(t as any).tapeStyle }} />
                )}
                {(t as any).pinStyle && (
                  <div style={{ position: "absolute", ...(t as any).pinStyle }} />
                )}
                <div
                  style={{
                    height: (t as any).imgHeight,
                    borderRadius: 3,
                    background: (t as any).bgGradient,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <EziSVG beretColor={(t as any).beretColor} />
                </div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    lineHeight: 1.4,
                    color: "#2A2928",
                    margin: "14px 4px 8px",
                    textAlign: "center",
                  }}
                >
                  {t.quote}
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "#9a8d7d",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  {t.author}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
