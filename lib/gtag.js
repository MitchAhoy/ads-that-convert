import { isAnalyticsDisabled } from "@/lib/analyticsOptOut";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-HG878FJ1B6";

// Sets up the gtag command queue if it isn't there yet. gtag.js loads after
// hydration, so page views and events sent before then wait in the queue
// instead of being dropped. Returns false when tracking is off in this browser.
export function ensureGtag() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || isAnalyticsDisabled()) {
    return false;
  }

  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  }

  return true;
}

// Query parameters GA must never see: personal details Fillout adds to the
// /call-confirmation redirect.
const PRIVATE_PARAMS = ["email", "name", "company_url"];
// utm_source values Fillout used to stamp on that redirect. If GA saw them it
// would start a new session and credit the booking to "call_booked".
const FAKE_SOURCES = new Set(["fillout", "call_booked"]);

function cleanUrl(href) {
  const url = new URL(href, window.location.origin);
  for (const key of PRIVATE_PARAMS) url.searchParams.delete(key);
  if (FAKE_SOURCES.has(url.searchParams.get("utm_source"))) {
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith("utm_")) url.searchParams.delete(key);
    }
  }
  return url;
}

// The current page address, safe to send to GA.
export function cleanPageLocation() {
  return cleanUrl(window.location.href).toString();
}

export function pageview(url) {
  if (!ensureGtag()) {
    return;
  }

  const clean = cleanUrl(url);
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: clean.pathname + clean.search,
    page_location: cleanPageLocation(),
    send_page_view: true,
  });
}

export function event(action, params = {}) {
  if (!ensureGtag()) {
    return;
  }

  window.gtag("event", action, params);
}
