"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { event as trackEvent } from "@/lib/gtag";

function normalizeEmail(value) {
  return value?.trim().toLowerCase() || "";
}

export default function CallConfirmationPostHogCapture() {
  const pathname = usePathname();
  const hasCaptured = useRef(false);

  useEffect(() => {
    if (hasCaptured.current || !pathname || !posthog.__loaded) {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmContent = searchParams.get("utm_content");
    const utmTerm = searchParams.get("utm_term");
    const gclid = searchParams.get("gclid");
    const submissionId = searchParams.get("submission_id");
    const fullName = searchParams.get("name");
    const email = normalizeEmail(searchParams.get("email"));
    const companyUrl = searchParams.get("company_url");

    if (email) {
      posthog.identify(email, {
        email,
        name: fullName || undefined,
        website: companyUrl || undefined,
        discovery_call_submission_id: submissionId || undefined,
        lead_source: "discovery_call",
      });
    }

    posthog.capture("discovery_call_confirmed", {
      confirmation_path: pathname,
      submission_id: submissionId,
      has_email: Boolean(email),
      has_company_url: Boolean(companyUrl),
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      gclid,
      referrer: document.referrer || null,
    });

    trackEvent("book_call", {
      page_location: window.location.href,
      page_path: pathname,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      gclid,
      referrer: document.referrer || undefined,
    });

    hasCaptured.current = true;
  }, [pathname]);

  return null;
}
