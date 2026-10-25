import { Suspense } from "react";
import { Google_Sans, Figtree, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import GeistFont from "@/components/home/GeistFont";
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeFooter from "@/components/home/HomeFooter";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleAnalyticsPageView from "@/components/analytics/GoogleAnalyticsPageView";
import HubSpot from "@/components/analytics/HubSpot";
import WebMcpTools from "@/components/webmcp/WebMcpTools";
import { getCaseStudies } from "@/lib/caseStudies";
import { generateMeta } from "@/lib/seo";

// Google Sans, Figtree and Instrument Serif belong to the pre-§16 system and
// now only reach the internal /test pages, so they aren't preloaded.
// next/font has no fallback metrics for Google Sans, so the fallback
// adjustment is off (it only logged a build warning).
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  preload: false,
  adjustFontFallback: false,
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  preload: false,
  subsets: ["latin"],
});

// Display serif for headlines only (see `.font-display` in globals.css).
// Instrument Serif ships one weight (400) in normal and italic.
const instrumentSerif = Instrument_Serif({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  preload: false,
});

// Mono for code text in mockups and tools (`.font-mono` in globals.css).
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata = generateMeta();

export default async function RootLayout({ children }) {
  // Trimmed to what the WebMCP list_case_studies tool returns, to keep the
  // client payload small.
  const caseStudies = (await getCaseStudies()).map(({ title, slug, excerpt, category, summaryMetric }) => ({
    title,
    slug,
    excerpt,
    category,
    summaryMetric,
  }));

  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${googleSans.variable} ${figtree.variable} ${instrumentSerif.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <HubSpot />
        <WebMcpTools caseStudies={caseStudies} />
        <GeistFont />
        {/* Every page uses the homepage system (DESIGN.md §16): its nav and footer. */}
        <div className="min-h-screen bg-white">
          <HomeNavbar />
          {children}
          <HomeFooter />
        </div>
      </body>
    </html>
  );
}
