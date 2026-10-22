"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { cleanPageLocation, event as trackEvent } from "@/lib/gtag";
import { getAttribution } from "@/lib/attribution";

// Stamped on the redirect by older Fillout settings. Not a real traffic source.
const IGNORED_SOURCES = new Set(["fillout", "call_booked"]);

function normalizeEmail(value) {
  return value?.trim().toLowerCase() || "";
}

export default function CallConfirmationPostHogCapture() {
  const pathname = usePathname();
  const hasCaptured = useRef(false);

  useEffect(() => {
    if (hasCaptured.current || !pathname) {
      return;
    }

    hasCaptured.current = true;

    const searchParams = new URLSearchParams(window.location.search);
    // The confirmation URL only carries form details. Where the visitor came
    // from is read from what was saved on their landing page (lib/attribution).
    const saved = getAttribution();
    const fromUrlOrSaved = (key) => {
      const value = searchParams.get(key);
      return value && !IGNORED_SOURCES.has(value) ? value : saved[key] || null;
    };
    const attribution = {
      utm_source: fromUrlOrSaved("utm_source"),
      utm_medium: fromUrlOrSaved("utm_medium"),
      utm_campaign: fromUrlOrSaved("utm_campaign"),
      utm_content: fromUrlOrSaved("utm_content"),
      utm_term: fromUrlOrSaved("utm_term"),
      gclid: fromUrlOrSaved("gclid"),
      landing_page: saved.landing_page || null,
    };
    const submissionId = searchParams.get("submission_id");
    const fullName = searchParams.get("name");
    const email = normalizeEmail(searchParams.get("email"));
    const companyUrl = searchParams.get("company_url");

    // Google Analytics conversion. Doesn't depend on PostHog loading.
    trackEvent("book_call", {
      page_location: cleanPageLocation(),
      page_path: pathname,
      ...Object.fromEntries(Object.entries(attribution).filter(([, value]) => value)),
      referrer: document.referrer || undefined,
    });

    if (!posthog.__loaded) {
      return;
    }

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
      ...attribution,
      referrer: document.referrer || null,
    });
  }, [pathname]);

  return null;
}
