// Remembers where a visitor came from (UTM tags and Google click IDs) so the
// booking form and /call-confirmation can report it, even after the visitor
// has clicked around the site and the landing URL's parameters are gone.
//
// Kept in this browser's localStorage only. Nothing is sent anywhere from here.

const STORAGE_KEY = "ads-that-convert-attribution";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

export const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
];

// Values Fillout used to stamp on the confirmation redirect. Never treat them as a real source.
const IGNORED_SOURCES = new Set(["fillout", "call_booked"]);

function readStored() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (!stored || Date.now() - stored.capturedAt > MAX_AGE_MS) return null;
    return stored;
  } catch {
    return null;
  }
}

// Call once per full page load. Saves the URL's campaign parameters, if it has any.
export function captureAttribution() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  if (IGNORED_SOURCES.has(params.get("utm_source"))) return;

  const touch = {};
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key);
    if (value) touch[key] = value.slice(0, 200);
  }
  if (Object.keys(touch).length === 0) return;

  const referrer = document.referrer && !document.referrer.startsWith(window.location.origin)
    ? document.referrer.slice(0, 300)
    : undefined;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...touch,
        landing_page: window.location.pathname,
        referrer,
        capturedAt: Date.now(),
      }),
    );
  } catch {
    // Storage blocked: attribution just won't carry across pages.
  }
}

// The saved campaign parameters (plus landing page), as plain strings.
export function getAttribution() {
  if (typeof window === "undefined") return {};

  const stored = readStored();
  if (!stored) return {};

  const result = {};
  for (const key of [...ATTRIBUTION_PARAMS, "landing_page"]) {
    if (stored[key]) result[key] = stored[key];
  }
  return result;
}
