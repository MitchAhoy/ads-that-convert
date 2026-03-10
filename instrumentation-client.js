import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

if (
  typeof window !== "undefined" &&
  posthogKey &&
  !window.__adsThatConvertPostHogInitialized
) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    defaults: "2026-01-30",
    capture_pageview: "history_change",
  });

  window.__adsThatConvertPostHogInitialized = true;
}
