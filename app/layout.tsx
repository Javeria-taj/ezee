import type { Metadata } from "next";
import "./globals.css";
import "./universe/universe.css";
import { UniverseProvider } from "./universe/UniverseProvider";
import InkSpirit from "./universe/components/InkSpirit";

export const metadata: Metadata = {
  title: "EZEE — Print. Study. Repeat.",
  description:
    "Upload your notes, customise every print, and collect them from a cozy shop nearby — no more waiting in queues.",
  openGraph: {
    title: "EZEE — Print. Study. Repeat.",
    description: "Upload your notes, customise every print, and collect them from a cozy shop nearby.",
    url: 'https://ezee.edu',
    siteName: 'EZEE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "EZEE — Print. Study. Repeat.",
    description: "Upload your notes, customise every print, and collect them from a cozy shop nearby.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts loaded via link tags (React 19 / Next.js 16 pattern) */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        {/* Fontshare for Cabinet Grotesk */}
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <UniverseProvider>
          {children}
          <InkSpirit />
        </UniverseProvider>
      </body>
    </html>
  );
}
