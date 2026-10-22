"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, ensureGtag } from "@/lib/gtag";
import useAnalyticsEnabled from "@/components/analytics/useAnalyticsEnabled";

// The gtag queue itself is created by `ensureGtag` (lib/gtag.js), so page
// views and events fired before this script loads are kept, not lost.
export default function GoogleAnalytics() {
  const enabled = useAnalyticsEnabled();

  useEffect(() => {
    if (enabled) ensureGtag();
  }, [enabled]);

  if (!GA_MEASUREMENT_ID || !enabled) {
    return null;
  }

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
