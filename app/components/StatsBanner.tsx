"use client";

const stats = [
  { emoji: "✦", label: "3,842 orders printed this week" },
  { emoji: "🏪", label: "47 shops on the network" },
  { emoji: "⚡", label: "Avg wait: 9 minutes" },
  { emoji: "✅", label: "98% on-time pickup rate" },
  { emoji: "📄", label: "2.1 million pages printed" },
  { emoji: "⭐", label: "4.9 average shop rating" },
  { emoji: "✦", label: "Available 24 / 7 near you" },
];

export default function StatsBanner() {
  const items = [...stats, ...stats]; // Double for seamless loop

  return (
    <div
      style={{
        position: "relative",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden",
        padding: "14px 0",
      }}
    >
      {/* Left fade mask */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background:
            "linear-gradient(to right, var(--bg-secondary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Right fade mask */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background:
            "linear-gradient(to left, var(--bg-secondary), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        className="stats-marquee"
        style={{
          display: "flex",
          gap: 0,
          width: "max-content",
          animation: "marqueeScroll 38s linear infinite",
        }}
      >
        {items.map((stat, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "0 32px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 14 }}>{stat.emoji}</span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: ".03em",
                color: "var(--text-secondary)",
              }}
            >
              {stat.label}
            </span>
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "var(--accent-primary)",
                opacity: 0.5,
                marginLeft: 12,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .stats-marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}
