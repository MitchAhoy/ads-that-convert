"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

export default function CallConfirmationPostHogCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasCaptured = useRef(false);

  useEffect(() => {
    if (hasCaptured.current || !pathname || !posthog.__loaded) {
      return;
    }

    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmContent = searchParams.get("utm_content");
    const utmTerm = searchParams.get("utm_term");
    const gclid = searchParams.get("gclid");

    posthog.capture("discovery_call_confirmed", {
      confirmation_path: pathname,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      gclid,
      referrer: document.referrer || null,
    });

    hasCaptured.current = true;
  }, [pathname, searchParams]);

  return null;
}
