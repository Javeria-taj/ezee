"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";

export default function PartnerBannerSection() {
  return (
    <section
      style={{
        background: "#232221",
        padding: "90px clamp(24px, 7vw, 120px)",
        color: "#FAF7F1",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "60px",
        }}
        className="partner-grid"
      >
        <Reveal>
          <div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#D48A70",
                display: "block",
                marginBottom: 16,
              }}
            >
              FOR PRINT SHOPS
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4.5vw, 52px)",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
                margin: "0 0 20px 0",
              }}
            >
              Bring your shop into the network.
            </h2>
            <p
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 17,
                lineHeight: 1.6,
                color: "rgba(250, 247, 241, 0.65)",
                margin: "0 0 36px 0",
                maxWidth: 460,
              }}
            >
              Join the print shops already printing for students down the street.
            </p>
            <Link
              href="/workshop/login"
              style={{
                display: "inline-block",
                background: "#FAF7F1",
                color: "#232221",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 15.5,
                padding: "16px 28px",
                borderRadius: 10,
                textDecoration: "none",
                transition: "transform .2s, box-shadow .2s",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)";
              }}
            >
              Become a Print Partner
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              viewBox="0 0 300 180"
              width="100%"
              height="auto"
              style={{
                maxWidth: 380,
                stroke: "rgba(250, 247, 241, 0.45)",
                fill: "none",
                strokeWidth: 1.5,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              {/* Ground line */}
              <line x1="10" y1="170" x2="290" y2="170" />
              {/* Outer building outline */}
              <path d="M 40 170 L 40 105 L 150 48 L 260 105 L 260 170" />
              {/* Top rectangular window */}
              <rect x="141" y="70" width="18" height="28" />
              <line x1="150" y1="70" x2="150" y2="98" />
              {/* Garage door frame */}
              <path d="M 70 170 L 70 112 L 230 112 L 230 170" />
              {/* Left inner window (terracotta border) */}
              <rect
                x="92"
                y="130"
                width="38"
                height="26"
                style={{ stroke: "#D48A70", strokeWidth: 1.8 }}
              />
              {/* Right inner window (sage green border) */}
              <rect
                x="166"
                y="130"
                width="38"
                height="26"
                style={{ stroke: "#7E8C6F", strokeWidth: 1.8 }}
              />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
