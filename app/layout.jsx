import { Suspense } from "react";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import GoogleAnalyticsPageView from "@/components/analytics/GoogleAnalyticsPageView";
import HubSpot from "@/components/analytics/HubSpot";
import { generateMeta } from "@/lib/seo";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata = generateMeta();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <HubSpot />
        <div className="min-h-screen bg-[#e9eaec] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-1">
            <Navbar />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
