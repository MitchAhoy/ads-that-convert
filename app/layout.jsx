import { Suspense } from "react";
import { Google_Sans, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleAnalyticsPageView from "@/components/analytics/GoogleAnalyticsPageView";
import HubSpot from "@/components/analytics/HubSpot";
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

export const metadata = generateMeta();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${googleSans.variable} ${figtree.variable} antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <HubSpot />
        <div className="min-h-screen bg-white">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
