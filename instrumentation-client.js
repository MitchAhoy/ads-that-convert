import posthog from "posthog-js";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const posthogOptOutStorageKey = "ads-that-convert-posthog-opt-out";

function isLocalTraffic(hostname) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

function isVercelPreviewTraffic(hostname) {
  return hostname.endsWith(".vercel.app");
}

function syncOptOutPreference() {
  const params = new URLSearchParams(window.location.search);
  const optOutValue = params.get("ph_optout");

  if (optOutValue === "1" || optOutValue === "true") {
    window.localStorage.setItem(posthogOptOutStorageKey, "true");
  }

  if (optOutValue === "0" || optOutValue === "false") {
    window.localStorage.removeItem(posthogOptOutStorageKey);
  }

  return window.localStorage.getItem(posthogOptOutStorageKey) === "true";
}

function attachPostHogDeviceControls() {
  window.adsThatConvertPostHogOptOut = () => {
    window.localStorage.setItem(posthogOptOutStorageKey, "true");
    posthog.opt_out_capturing();
  };

  window.adsThatConvertPostHogOptIn = () => {
    window.localStorage.removeItem(posthogOptOutStorageKey);
    posthog.opt_in_capturing();
  };
}

if (typeof window !== "undefined" && posthogKey) {
  const hostname = window.location.hostname;
  const hasOptedOut = syncOptOutPreference();
  const shouldDisableTracking =
    hasOptedOut ||
    isLocalTraffic(hostname) ||
    isVercelPreviewTraffic(hostname);

  if (!window.__adsThatConvertPostHogControlsAttached) {
    attachPostHogDeviceControls();
    window.__adsThatConvertPostHogControlsAttached = true;
  }

  if (shouldDisableTracking) {
    if (posthog.__loaded) {
      posthog.opt_out_capturing();
    }
  } else if (!window.__adsThatConvertPostHogInitialized) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      defaults: "2026-01-30",
      capture_pageview: "history_change",
    });

    window.__adsThatConvertPostHogInitialized = true;
  }
}
