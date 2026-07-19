"use client";

import React from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import PartnerShopArt from "./PartnerShopArt";

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
            <PartnerShopArt />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
