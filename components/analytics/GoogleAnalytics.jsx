"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import useAnalyticsEnabled from "@/components/analytics/useAnalyticsEnabled";

export default function GoogleAnalytics() {
  const enabled = useAnalyticsEnabled();

  if (!GA_MEASUREMENT_ID || !enabled) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
