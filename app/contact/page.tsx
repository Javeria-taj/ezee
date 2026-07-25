"use client";

import Navbar from "../components/Navbar";
import PaperGrain from "../components/PaperGrain";
import Footer from "../components/Footer";
import CursorGlow from "../components/CursorGlow";

export default function ContactPage() {
  return (
    <>
      <CursorGlow />
      <PaperGrain />
      <Navbar />

      <main
        style={{
          background: "#1F1917",
          color: "#FAF7F1",
          minHeight: "100vh",
          padding: "140px clamp(16px, 5vw, 40px) 80px",
          fontFamily: "'Instrument Sans', sans-serif",
          lineHeight: "1.75",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            background: "rgba(250, 247, 241, 0.02)",
            border: "1px solid rgba(250, 247, 241, 0.08)",
            borderRadius: "24px",
            padding: "50px clamp(20px, 6vw, 60px)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: "1px solid rgba(250, 247, 241, 0.1)", paddingBottom: "24px", marginBottom: "32px" }}>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 800,
                color: "#D48A70",
                margin: "0 0 10px 0",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              CONTACT DETAILS
            </h1>
            <p style={{ fontSize: "14.5px", color: "rgba(250, 247, 241, 0.6)", margin: "0 0 6px 0" }}>
              EzeePrints — Online Printing Platform (Website, Android Application and iOS Application)
            </p>
            <p style={{ fontSize: "14.5px", color: "rgba(250, 247, 241, 0.6)", margin: 0 }}>
              Operated by Zarixa Infobytes Private Limited
            </p>
          </div>

          {/* Body */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontSize: "15px", color: "rgba(250, 247, 241, 0.85)" }}>
            <p style={{ margin: 0 }}>
              For any questions, clarifications, complaints or grievances relating to these Terms, the Policies, or the Platform, Users may contact the Company through the following channels:
            </p>

            <div style={{ background: "rgba(250, 247, 241, 0.03)", border: "1px solid rgba(250, 247, 241, 0.08)", borderRadius: "16px", padding: "28px" }}>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <strong style={{ color: "#FAF7F1", minWidth: "240px" }}>• Customer Support Email:</strong>
                  <a href="mailto:support@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>support@ezeeprints.com</a>
                </li>
                <li style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <strong style={{ color: "#FAF7F1", minWidth: "240px" }}>• Grievance Officer Email:</strong>
                  <a href="mailto:grievance@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>grievance@ezeeprints.com</a>
                </li>
                <li style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <strong style={{ color: "#FAF7F1", minWidth: "240px" }}>• Registered / Corporate Office Address:</strong>
                  <span>Zarixa Infobytes Private Limited, #42, Cozy Lane, 3rd Block, Koramangala, Bengaluru, Karnataka, India - 560034</span>
                </li>
                <li style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <strong style={{ color: "#FAF7F1", minWidth: "240px" }}>• Support Hours:</strong>
                  <span>Monday to Saturday, 9:00 AM to 7:00 PM IST</span>
                </li>
                <li style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <strong style={{ color: "#FAF7F1", minWidth: "240px" }}>• In-App Support:</strong>
                  <span>Available through the &quot;Help &amp; Support&quot; section of the Website, Android application and iOS application.</span>
                </li>
              </ul>
            </div>

            <p style={{ margin: 0 }}>
              The Company shall endeavour to acknowledge all User grievances within forty-eight (48) hours of receipt and to resolve the same within the timelines prescribed under Applicable Law, including the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, as applicable.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
