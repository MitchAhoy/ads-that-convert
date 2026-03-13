 "use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const HUBSPOT_PORTAL_ID = "442934845";

export default function HubSpot() {
  const pathname = usePathname();

  if (pathname?.startsWith("/test")) {
    return null;
  }

  return (
    <Script
      id="hubspot-tracking"
      src={`https://js-ap1.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
      strategy="afterInteractive"
    />
  );
}
