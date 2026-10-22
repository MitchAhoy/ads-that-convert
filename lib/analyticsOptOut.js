// One switch that turns off every tracker on the site (PostHog, Google
// Analytics, HubSpot) for this browser, so our own visits don't skew the data.
//
// Turn off:  visit any page with ?internal=1
// Turn on:   visit any page with ?internal=0
//
// The choice is saved in localStorage, so it sticks per browser and per domain.

const STORAGE_KEY = "ads-that-convert-analytics-opt-out";
// Older PostHog-only key. Still honoured so devices already opted out stay out.
const LEGACY_POSTHOG_KEY = "ads-that-convert-posthog-opt-out";
const URL_PARAMS = ["internal", "ph_optout"];

function isLocalOrPreviewHost(hostname) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".vercel.app")
  );
}

function readUrlChoice() {
  const params = new URLSearchParams(window.location.search);
  for (const name of URL_PARAMS) {
    const value = params.get(name);
    if (value === "1" || value === "true") return true;
    if (value === "0" || value === "false") return false;
  }
  return null;
}

export function setAnalyticsOptOut(optedOut) {
  try {
    if (optedOut) {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(LEGACY_POSTHOG_KEY);
    }
  } catch {
    // Storage blocked: the choice just won't persist.
  }
}

function hasStoredOptOut() {
  try {
    return (
      window.localStorage.getItem(STORAGE_KEY) === "true" ||
      window.localStorage.getItem(LEGACY_POSTHOG_KEY) === "true"
    );
  } catch {
    return false;
  }
}

let announced = false;

// True when no tracking should run in this browser. Client-side only.
export function isAnalyticsDisabled() {
  if (typeof window === "undefined") return true;

  const urlChoice = readUrlChoice();
  if (urlChoice !== null) setAnalyticsOptOut(urlChoice);

  const disabled = isLocalOrPreviewHost(window.location.hostname) || hasStoredOptOut();

  if (disabled && !announced) {
    announced = true;
    console.info("[analytics] Tracking is off in this browser. Visit with ?internal=0 to turn it back on.");
  }

  return disabled;
}
