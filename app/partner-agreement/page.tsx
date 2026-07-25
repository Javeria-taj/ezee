"use client";

import Navbar from "../components/Navbar";
import PaperGrain from "../components/PaperGrain";
import Footer from "../components/Footer";
import CursorGlow from "../components/CursorGlow";

export default function PartnerAgreementPage() {
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
              PRINT PARTNER AGREEMENT
            </h1>
            <p style={{ fontSize: "14.5px", color: "rgba(250, 247, 241, 0.6)", margin: "0 0 6px 0" }}>
              EzeePrints — Marketplace Platform for On-Demand Printing Services
            </p>
            <p style={{ fontSize: "14.5px", color: "rgba(250, 247, 241, 0.6)", margin: "0 0 14px 0" }}>
              Between Zarixa Infobytes Private Limited and Onboarded Print Partners
            </p>
            <p style={{ fontSize: "13px", color: "#A9B59D", margin: 0, fontWeight: 600 }}>
              Template Version Dated: 24 July 2026
            </p>
          </div>

          {/* Intro */}
          <div style={{ fontSize: "15px", color: "rgba(250, 247, 241, 0.85)", marginBottom: "32px" }}>
            <p style={{ fontStyle: "italic" }}>
              THIS PRINT PARTNER AGREEMENT (&quot;Agreement&quot;) governs the onboarding, order routing, payment settlement, quality service levels, and operational standards between Zarixa Infobytes Private Limited (operating &quot;EzeePrints&quot;) and independent print shops and vendors (&quot;Print Partners&quot;).
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                1. DEFINITIONS
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p><strong>1.1 Commission</strong>: Means the fee payable by the Partner to the Company on each Order, as set out in Schedule A.</p>
                <p><strong>1.2 Fulfilment Centre</strong>: Means the Partner&apos;s premises to which Orders are routed for production, as referenced in the Terms and Conditions.</p>
                <p><strong>1.3 Onboarding Documents</strong>: Means the KYC, business registration, GST registration, and other documents required by the Company or the Payment Gateway to activate the Partner on the Platform.</p>
                <p><strong>1.4 Settlement Cycle</strong>: Means the periodic cycle on which the Partner&apos;s dues are paid out, as set out in Schedule A.</p>
                <p><strong>1.5 Service Levels</strong>: Means the turnaround time and quality standards set out in Schedule A.</p>
                <p><strong>1.6 Capitalised Terms</strong>: Capitalised terms used but not defined in this Agreement, including &quot;Applicable Law&quot;, &quot;Content&quot;, &quot;Order&quot;, &quot;Order Value&quot;, &quot;Payment Gateway&quot;, &quot;Platform&quot;, &quot;Services&quot; and &quot;User&quot;, shall have the meanings assigned to such terms in the Terms and Conditions published on the Platform.</p>
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                2. APPOINTMENT AND RELATIONSHIP
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p><strong>2.1</strong> The Company hereby appoints the Partner, on a non-exclusive basis, to receive and fulfil Orders placed by Users through the Platform, and the Partner accepts such appointment, subject to the terms of this Agreement.</p>
                <p><strong>2.2 Independent Contractors</strong>: The relationship between the Company and the Partner is that of independent contracting parties. Nothing in this Agreement shall be construed as creating a relationship of employer-employee, principal-agent, partnership, or joint venture between the Parties. The Partner shall be solely responsible for its own personnel, equipment, and business operations.</p>
                <p><strong>2.3 No Authority to Bind</strong>: Save as expressly agreed in writing, neither Party shall have the authority to bind the other or to make any representation or commitment on the other&apos;s behalf.</p>
                <p><strong>2.4 Non-Exclusive</strong>: This Agreement is non-exclusive. Either Party may enter into similar arrangements with other counterparties, including, in the case of the Partner, other online or offline platforms.</p>
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                6. PAYMENTS AND SETTLEMENT
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p><strong>6.1 Collection</strong>: Payments for Orders shall be collected from Users through the Payment Gateway integrated with the Platform.</p>
                <p><strong>6.2 Settlement Dues</strong>: Subject to the Partner completing the KYC and onboarding requirements of the Payment Gateway, the Partner&apos;s dues (being the Order Value less the Commission and any applicable fees) shall be settled to the Partner&apos;s designated bank account on the Settlement Cycle set out in Schedule A, in accordance with Applicable Law governing payment aggregation and settlement.</p>
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                SCHEDULE A — SERVICE LEVELS AND COMMERCIAL TERMS
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14.5px", color: "rgba(250, 247, 241, 0.8)" }}>
                <ul style={{ listStyleType: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <li><strong>Turnaround Time</strong>: Standard documents — same Business Day; bulk or bound printing — within agreed schedule window.</li>
                  <li><strong>Quality / Rework Policy</strong>: Free reprint where a print defect is attributable to the Partner and reported within the reporting window in the Refund and Cancellation Policy.</li>
                  <li><strong>Commission</strong>: Standard percentage of Order Value as agreed per partner rate card.</li>
                  <li><strong>Settlement Cycle</strong>: T+2 Business Days from Order completion directly to bank account.</li>
                  <li><strong>Order Acceptance Window</strong>: Thirty (30) minutes from routing to the Fulfilment Centre.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
