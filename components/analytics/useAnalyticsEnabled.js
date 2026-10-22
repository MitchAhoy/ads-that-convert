"use client";

import { useSyncExternalStore } from "react";
import { isAnalyticsDisabled } from "@/lib/analyticsOptOut";

const subscribe = () => () => {};

// False on the server and on first paint, then whether this browser allows tracking.
export default function useAnalyticsEnabled() {
  return useSyncExternalStore(
    subscribe,
    () => !isAnalyticsDisabled(),
    () => false,
  );
}
