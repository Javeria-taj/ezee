"use client";

import { Reveal } from "./Reveal";

const oldWay = [
  { text: "Wait 20–40 min in queue", detail: "Especially brutal before submissions" },
  { text: "Forget your flash drive", detail: "Walk back. Repeat." },
  { text: "Pay cash, lose the receipt", detail: "No record of what you spent" },
  { text: "No idea when it's ready", detail: "Just stand there and hope" },
  { text: "₹4–6/page at walk-in counters", detail: "No negotiating, no transparency" },
  { text: "Closed after 7pm", detail: "Deadlines don't care about hours" },
];

const ezeeWay = [
  { text: "Ready in 8–15 minutes", detail: "Picked up between classes" },
  { text: "Upload from your phone", detail: "PDFs, Word, slides — all accepted" },
  { text: "Digital receipt, always", detail: "Track every order in your history" },
  { text: "Ping when it's warm", detail: "Notified the moment it's done" },
  { text: "₹1.5–2/page, shown upfront", detail: "No surprises at the counter" },
  { text: "Shops open late & weekends", detail: "Night Owl Copies: open till 2am" },
];

export default function ComparisonSection() {
  return (
    <section
      id="compare"
      style={{
        position: "relative",
        padding: "clamp(90px,12vw,140px) clamp(22px,6vw,110px)",
        background: "var(--bg-tertiary)",
        overflow: "hidden",
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--border-subtle) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <Reveal
        style={{
          position: "relative",
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
          Why switch?
        </span>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px,5vw,60px)",
            lineHeight: 1.04,
            letterSpacing: "-.03em",
            margin: "14px 0 16px",
            color: "var(--text-primary)",
          }}
        >
          The old way vs.{" "}
          <span style={{ color: "var(--accent-primary)" }}>the Ezee way</span>
        </h2>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            margin: 0,
          }}
        >
          This isn&apos;t about printing — it&apos;s about getting 45 minutes of your afternoon back.
        </p>
      </Reveal>

      <div
        className="compare-grid"
        style={{
          position: "relative",
          maxWidth: 980,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Old Way card */}
        <Reveal delay={0}>
          <div
            style={{
              background: "rgba(42,41,40,.04)",
              border: "1.5px solid rgba(42,41,40,.1)",
              borderRadius: 24,
              padding: "32px 30px",
              height: "100%",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
                paddingBottom: 20,
                borderBottom: "1px solid rgba(42,41,40,.08)",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: "rgba(180,60,60,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                😩
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    margin: 0,
                    color: "var(--text-primary)",
                  }}
                >
                  The old way
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  Walk in, wait, pray
                </p>
              </div>
            </div>

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {oldWay.map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      marginTop: 3,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(180,60,60,.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2 2l10 10M12 2L2 12"
                        stroke="#c0392b"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: 14.5,
                        margin: 0,
                        color: "var(--text-primary)",
                        textDecoration: "line-through",
                        textDecorationColor: "rgba(192,57,43,.4)",
                      }}
                    >
                      {item.text}
                    </p>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: "var(--text-secondary)",
                        margin: "2px 0 0",
                        fontStyle: "italic",
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Ezee way card */}
        <Reveal delay={0.1}>
          <div
            style={{
              background: "linear-gradient(145deg, #FFF3DF 0%, rgba(249,235,216,0.95) 100%)",
              border: "1.5px solid rgba(212,138,112,.3)",
              borderRadius: 24,
              padding: "32px 30px",
              height: "100%",
              boxShadow: "0 24px 48px -16px rgba(212,138,112,.22)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
                paddingBottom: 20,
                borderBottom: "1px solid rgba(212,138,112,.2)",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #D48A70, #C2674A)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                ✨
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: 18,
                    margin: 0,
                    color: "#2A2928",
                  }}
                >
                  The Ezee way
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6a5a48",
                    margin: 0,
                  }}
                >
                  Upload, walk in, collect
                </p>
              </div>
            </div>

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {ezeeWay.map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      marginTop: 3,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #A9B59D, #7E8C6F)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2 7l3.5 3.5L12 3"
                        stroke="#fff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: 14.5,
                        margin: 0,
                        color: "#2A2928",
                      }}
                    >
                      {item.text}
                    </p>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: "#6a5a48",
                        margin: "2px 0 0",
                        fontStyle: "italic",
                      }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Mobile: stack columns */}
      <style>{`
        @media (max-width: 820px) {
          .compare-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
