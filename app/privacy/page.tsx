"use client";

import Navbar from "../components/Navbar";
import PaperGrain from "../components/PaperGrain";
import Footer from "../components/Footer";
import CursorGlow from "../components/CursorGlow";

export default function PrivacyPolicyPage() {
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
              PRIVACY POLICY
            </h1>
            <p style={{ fontSize: "14.5px", color: "rgba(250, 247, 241, 0.6)", margin: "0 0 6px 0" }}>
              EzeePrints — Online Printing Platform (Website, Android Application and iOS Application)
            </p>
            <p style={{ fontSize: "14.5px", color: "rgba(250, 247, 241, 0.6)", margin: "0 0 14px 0" }}>
              Operated by Zarixa Infobytes Private Limited
            </p>
            <p style={{ fontSize: "13px", color: "#A9B59D", margin: 0, fontWeight: 600 }}>
              Last Updated: 24 July 2026
            </p>
          </div>

          {/* Intro */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px", fontSize: "15px", color: "rgba(250, 247, 241, 0.85)" }}>
            <p>
              EzeePrints is committed to protecting the privacy of Users who access or use the Platform. This Privacy Policy describes the manner in which personal data is collected, used, disclosed, transferred, retained and otherwise processed by the Company in connection with the Platform, and the choices available to Users in relation to their personal data.
            </p>
            <p>
              This Privacy Policy is incorporated by reference into, and forms part of, the Terms and Conditions governing use of the Platform. Capitalised terms used in this Privacy Policy that are not separately defined herein shall have the meanings assigned to them in the Terms and Conditions. By accessing, browsing, downloading, installing, registering on, or otherwise using the Platform, You consent to the collection, use, disclosure and processing of Your personal data in the manner described in this Privacy Policy.
            </p>
            <p>
              This Privacy Policy applies to personal data collected by the Company through the Platform. It does not govern the privacy practices of Print Partners, Delivery Partners, the Payment Gateway, or any other third party, which are governed by their own respective privacy policies, and Users are encouraged to review the same.
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {/* Section 1 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                1. DEFINITIONS
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  In this Privacy Policy, unless the context otherwise requires, the following expressions shall have the meanings assigned to them below. All other capitalised terms used but not defined in this Privacy Policy, including “Account”, “App”, “Applicable Law”, “Company”, “Content”, “Delivery Partner”, “Institution”, “Order”, “Payment Gateway”, “Platform”, “Print Partner”, “Services”, “User”, “Wallet” and “Wallet Credit”, shall have the meanings assigned to such terms in the Terms and Conditions.
                </p>
                <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• “Consent”</strong> means the free, specific, informed and unambiguous indication of a User’s wishes by which the User, by a clear affirmative action, signifies agreement to the processing of personal data relating to them.
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• “Cookies”</strong> means small text files or similar tracking technologies placed on a User’s device to store information relating to preferences, sessions, and usage of the Platform.
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• “Data Protection Board”</strong> means the Data Protection Board of India constituted under the Digital Personal Data Protection Act, 2023.
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• “Grievance Officer”</strong> means the officer appointed by the Company under Clause 14 of this Privacy Policy and Clause 29 of the Terms and Conditions to address grievances relating to personal data.
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• “Personal Data”</strong> means any data about a User by or in relation to which the User is identifiable, whether directly or indirectly, including but not limited to name, contact details, financial information, Content, and device and location data.
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• “Processing”</strong> means any operation performed on Personal Data, whether automated or not, including collection, recording, organisation, storage, adaptation, retrieval, use, disclosure, restriction, erasure or destruction.
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• “Sensitive Personal Data or Information” or “SPDI”</strong> has the meaning assigned to it under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and includes passwords and financial information such as bank account or payment instrument details.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                2. THE PERSONAL DATA WE COLLECT
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>2.1 Account Data</strong>: When You register for an Account, We collect Your name, mobile number, email address, and, where applicable, institutional or business affiliation. Where You register using a third-party sign-in service, We receive such basic profile information as that service makes available to Us, subject to Your permissions on that service.
                </p>
                <p>
                  <strong>2.2 Order Data</strong>: When You place an Order, We collect the Content You upload for printing, Your selected print specifications, Your delivery or pickup address, and details of the fulfilment method You choose.
                </p>
                <p>
                  <strong>2.3 Payment-Related Data</strong>: We receive limited transaction metadata from the Payment Gateway, including the Order Value, payment status, and any Coupon or Wallet Credit applied. The Company does not collect, store, or have access to Your complete card, UPI, or other payment instrument details; such information is collected and processed directly by the Payment Gateway in accordance with its own privacy policy and applicable data security standards, including the Payment Card Industry Data Security Standard.
                </p>
                <p>
                  <strong>2.4 Communications Data</strong>: We collect records of Your interactions with Our customer support and Grievance Officer, including the content of Your queries, complaints, and correspondence with Us.
                </p>
                <p>
                  <strong>2.5 Device and Usage Data</strong>: We automatically collect certain technical information when You use the Platform, including Your IP address, device identifiers, operating system and browser type, App version, and log data relating to Your use of the Platform’s features.
                </p>
                <p>
                  <strong>2.6 Location Data</strong>: Where relevant to serviceability, delivery routing, or fraud prevention, We may collect Your approximate or precise location, subject to the permissions You grant on Your device.
                </p>
                <p>
                  <strong>2.7 Cookies</strong>: The Website uses Cookies and similar tracking technologies as described in Clause 9 below.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                3. HOW WE USE YOUR PERSONAL DATA
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>3.1</strong> We use Personal Data for the following purposes: (a) creating and administering Your Account; (b) processing, routing, producing and fulfilling Your Orders, including quality assurance; (c) processing payments and administering Wallet Credit and Coupons; (d) coordinating pickup and delivery of Orders; (e) providing customer support and resolving grievances; (f) preventing fraud, abuse, and unauthorised use of the Platform; (g) complying with Applicable Law, including tax record-keeping and responding to lawful requests from governmental or regulatory authorities; (h) improving and personalising the Platform and Our Services; and (i) sending You transactional communications relating to Your Account and Orders, and, subject to Your consent and right to opt out, promotional communications.
                </p>
                <p>
                  <strong>3.2</strong> We process Personal Data on the basis of Your Consent, where processing is necessary to perform the contract represented by an Order, where processing is necessary to comply with a legal obligation, and, in limited circumstances, on the basis of Our legitimate interest in maintaining the security and integrity of the Platform, balanced against Your rights as a data principal.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                4. HOW WE SHARE YOUR PERSONAL DATA
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>4.1</strong> With Print Partners, to the extent necessary to fulfil Your Order, including access to Content and relevant Order details.
                </p>
                <p>
                  <strong>4.2</strong> With Delivery Partners, including Your name, contact number, and delivery address, to the extent necessary to complete delivery of Your Order.
                </p>
                <p>
                  <strong>4.3</strong> With the Payment Gateway, to process payment for Your Order.
                </p>
                <p>
                  <strong>4.4</strong> With an Institution, where You access the Platform pursuant to an institutional arrangement under Clause 4.5 of the Terms and Conditions.
                </p>
                <p>
                  <strong>4.5</strong> With Our professional advisors, auditors, and service providers who are bound by confidentiality obligations and process Personal Data solely on Our instructions.
                </p>
                <p>
                  <strong>4.6</strong> With governmental, regulatory, or law enforcement authorities, or courts of competent jurisdiction, where required under Applicable Law or a valid legal process.
                </p>
                <p>
                  <strong>4.7</strong> With a successor entity, in connection with a merger, acquisition, corporate reorganisation, or sale of assets, as contemplated under Clause 32.4 of the Terms and Conditions.
                </p>
                <p>
                  <strong>4.8</strong> We do not sell Your Personal Data to third parties for their own independent marketing purposes.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                5. CONFIDENTIALITY OF CONTENT
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>5.1</strong> Content uploaded by You is treated as confidential and is accessed only by authorised personnel of the Company and, where applicable, the assigned Print Partner, solely for the purpose of production, quality assurance, and legal compliance.
                </p>
                <p>
                  <strong>5.2</strong> Print Partners and Delivery Partners are contractually bound to use Content and Personal Data shared with them solely for the purpose of fulfilling Your Order, and to implement reasonable security safeguards.
                </p>
                <p>
                  <strong>5.3</strong> The licence granted by You in respect of Content under Clause 10.2 of the Terms and Conditions automatically terminates on completion or valid cancellation of the relevant Order, save to the extent retention is otherwise required.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                6. DATA RETENTION
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>6.1</strong> We retain Personal Data and Content only for as long as is reasonably necessary to fulfil the purposes described in this Privacy Policy, including provision of the Services, compliance with Applicable Law (including applicable limitation periods and tax record-keeping requirements), and resolution of disputes.
                </p>
                <p>
                  <strong>6.2</strong> Content is retained only for such period as is reasonably necessary to fulfil the relevant Order and to address any post-Order query or dispute, following which it is deleted or anonymised in accordance with Our data retention schedule.
                </p>
                <p>
                  <strong>6.3</strong> Account data is retained for as long as Your Account remains active, and for a reasonable period thereafter to address legal, regulatory, or dispute-resolution requirements.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                7. DATA SECURITY
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>7.1</strong> We implement reasonable technical and organisational security measures designed to protect Personal Data against unauthorised access, alteration, disclosure, or destruction, in accordance with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                </p>
                <p>
                  <strong>7.2</strong> No method of electronic transmission or storage is entirely secure, and while We strive to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                8. CROSS-BORDER TRANSFER OF PERSONAL DATA
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>8.1</strong> Where We use cloud infrastructure, analytics, or customer support tools hosted outside India, Your Personal Data may be transferred to, stored, and processed in a jurisdiction outside India.
                </p>
                <p>
                  <strong>8.2</strong> We undertake any such transfer in accordance with Applicable Law, including the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 and, once its relevant provisions come into force, the Digital Personal Data Protection Act, 2023, under which transfers are permitted to all countries other than those specifically restricted by the Central Government by notification.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                9. COOKIES AND TRACKING TECHNOLOGIES
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>9.1</strong> The Website may use essential Cookies (necessary for the Website to function), functional Cookies (to remember Your preferences), and analytics Cookies (to help Us understand how the Website is used).
                </p>
                <p>
                  <strong>9.2</strong> You may control Cookie preferences through Your browser settings. Disabling certain Cookies may affect the functionality of the Website.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                10. CHILDREN’S PRIVACY
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>10.1</strong> The Platform is intended for use only by persons who have attained the age of eighteen (18) years, in accordance with Clause 3.1 of the Terms and Conditions.
                </p>
                <p>
                  <strong>10.2</strong> We do not knowingly collect Personal Data from persons below eighteen (18) years of age. If We become aware that We have collected Personal Data from a minor without appropriate consent, We will take reasonable steps to delete such data and, where applicable, suspend the relevant Account in accordance with Clause 3.4 of the Terms and Conditions.
                </p>
                <p>
                  <strong>10.3</strong> Where processing of a child’s personal data becomes applicable to the Platform, We will implement verifiable parental consent and related safeguards as required under Section 9 of the Digital Personal Data Protection Act, 2023, as and when its relevant provisions come into force.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                11. YOUR RIGHTS
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>11.1</strong> Subject to Applicable Law, You may: (a) request access to the Personal Data We hold about You; (b) request correction of inaccurate or incomplete Personal Data; (c) withdraw Your Consent to processing, prospectively, without affecting the lawfulness of processing before such withdrawal; (d) request erasure of Your Personal Data, subject to Our legal retention requirements under Clause 6; and (e) raise a grievance in accordance with Clause 14 below.
                </p>
                <p>
                  <strong>11.2</strong> Additional rights available to a data principal under the Digital Personal Data Protection Act, 2023, including the right to nominate another individual to exercise these rights in the event of Your death or incapacity, will be made available progressively as the relevant provisions of that Act come into force.
                </p>
                <p>
                  <strong>11.3</strong> To exercise any of the above rights, please contact Us using the details in Clause 17 below. We may take reasonable steps to verify Your identity before acting on Your request.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                12. MARKETING COMMUNICATIONS
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>12.1</strong> We may send You promotional communications relating to Our Services, subject to Your right to opt out at any time by using the unsubscribe mechanism provided in such communication, adjusting Your notification preferences on the Platform, or writing to Us at the contact details in Clause 17.
                </p>
                <p>
                  <strong>12.2</strong> You will continue to receive essential transactional and service-related communications concerning Your Account and Orders notwithstanding such opt-out.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                13. DATA BREACH NOTIFICATION
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  In the event of a breach affecting Your Personal Data, We will notify You and, where required, the Data Protection Board or other appropriate regulatory authority, in accordance with the timelines and manner prescribed under Applicable Law.
                </p>
              </div>
            </div>

            {/* Section 14 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                14. GRIEVANCE OFFICER AND GRIEVANCE REDRESSAL
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>14.1</strong> In accordance with the Information Technology Act, 2000 and the rules made thereunder, the Company has appointed a Grievance Officer to address grievances relating to the processing of Personal Data. The Grievance Officer may be contacted at <a href="mailto:grievance@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>grievance@ezeeprints.com</a>.
                </p>
                <p>
                  <strong>14.2</strong> The Grievance Officer shall acknowledge a grievance within twenty-four (24) hours of receipt and shall endeavour to resolve it within fifteen (15) days from the date of receipt, in accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
                </p>
                <p>
                  <strong>14.3</strong> Additional grievance-redressal rights and timelines available under the Digital Personal Data Protection Act, 2023 will apply as its relevant provisions come into force.
                </p>
              </div>
            </div>

            {/* Section 15 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                15. CHANGES TO THIS PRIVACY POLICY
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>15.1</strong> We reserve the right to amend, modify, update, or revise this Privacy Policy at any time, to reflect changes in Applicable Law, Platform functionality, or Our data-processing practices.
                </p>
                <p>
                  <strong>15.2</strong> Material amendments will be notified through reasonable means, including a notice on the Platform, an in-app notification, or an email to Your registered email address, and the “Last Updated” date at the top of this Privacy Policy will be revised accordingly.
                </p>
                <p>
                  <strong>15.3</strong> Continued use of the Platform following the effective date of any amendment constitutes Your acceptance of the amended Privacy Policy.
                </p>
              </div>
            </div>

            {/* Section 16 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                16. GOVERNING LAW AND DISPUTE RESOLUTION
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>
                  <strong>16.1</strong> This Privacy Policy shall be governed by and construed in accordance with the laws of the Republic of India.
                </p>
                <p>
                  <strong>16.2</strong> Any dispute, controversy, or claim arising out of or in connection with this Privacy Policy shall be resolved in accordance with the dispute resolution mechanism set out in Clause 29 of the Terms and Conditions (including the preservation of a User’s rights as a “consumer” under the Consumer Protection Act, 2019), which is incorporated herein by reference.
                </p>
              </div>
            </div>

            {/* Section 17 */}
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#D48A70", borderBottom: "1px solid rgba(250, 247, 241, 0.08)", paddingBottom: "8px", marginBottom: "16px" }}>
                17. CONTACT US
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "15px", color: "rgba(250, 247, 241, 0.8)" }}>
                <p>For any questions, clarifications, or grievances relating to this Privacy Policy or the processing of Your Personal Data, You may contact Us through the following channels:</p>
                <ul style={{ listStyleType: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• Customer Support Email</strong>: <a href="mailto:support@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>support@ezeeprints.com</a>
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• Grievance Officer Email</strong>: <a href="mailto:grievance@ezeeprints.com" style={{ color: "#D48A70", textDecoration: "underline" }}>grievance@ezeeprints.com</a>
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• Registered / Corporate Office Address</strong>: Zarixa Infobytes Private Limited, #42, Cozy Lane, 3rd Block, Koramangala, Bengaluru, Karnataka, India - 560034
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• Support Hours</strong>: Monday to Saturday, 9:00 AM to 6:00 PM IST
                  </li>
                  <li>
                    <strong style={{ color: "#FAF7F1" }}>• In-App Support</strong>: Available through the “Help & Support” section of the Website, Android application and iOS application.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div style={{ borderTop: "2px solid #D48A70", paddingTop: "20px", marginTop: "40px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "12px", color: "#FAF7F1", letterSpacing: "0.05em", margin: 0 }}>
              BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND CONSENT TO THIS PRIVACY POLICY.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
