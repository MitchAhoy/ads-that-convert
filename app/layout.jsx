import { Suspense } from "react";
import { Google_Sans, Figtree, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleAnalyticsPageView from "@/components/analytics/GoogleAnalyticsPageView";
import HubSpot from "@/components/analytics/HubSpot";
import WebMcpTools from "@/components/webmcp/WebMcpTools";
import { getCaseStudies } from "@/lib/caseStudies";
import { generateMeta } from "@/lib/seo";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

// Display serif for headlines only (see `.font-display` in globals.css).
// Variable font with the optical-size axis so large headings get the
// display cut automatically.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
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
      <body className={`${googleSans.variable} ${figtree.variable} ${newsreader.variable} antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <HubSpot />
        <WebMcpTools caseStudies={caseStudies} />
        <div className="min-h-screen bg-page">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
