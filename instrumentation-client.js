import posthog from "posthog-js";
import { isAnalyticsDisabled, setAnalyticsOptOut } from "@/lib/analyticsOptOut";
import { captureAttribution } from "@/lib/attribution";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

function attachDeviceControls() {
  // Console helpers. Reload the page after calling either one.
  window.adsThatConvertAnalyticsOptOut = () => {
    setAnalyticsOptOut(true);
    if (posthog.__loaded) posthog.opt_out_capturing();
  };

  window.adsThatConvertAnalyticsOptIn = () => {
    setAnalyticsOptOut(false);
    if (posthog.__loaded) posthog.opt_in_capturing();
  };

  // Old names, kept so existing bookmarks/habits still work.
  window.adsThatConvertPostHogOptOut = window.adsThatConvertAnalyticsOptOut;
  window.adsThatConvertPostHogOptIn = window.adsThatConvertAnalyticsOptIn;
}

if (typeof window !== "undefined" && posthogKey) {
  if (!window.__adsThatConvertPostHogControlsAttached) {
    attachDeviceControls();
    window.__adsThatConvertPostHogControlsAttached = true;
  }

  if (isAnalyticsDisabled()) {
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

// Remember the landing page's UTM tags and click IDs for the booking form.
if (typeof window !== "undefined") {
  captureAttribution();
}
