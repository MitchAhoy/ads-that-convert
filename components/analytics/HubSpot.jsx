import Script from "next/script";

const HUBSPOT_PORTAL_ID = "442934845";

export default function HubSpot() {
  return (
    <Script
      id="hubspot-tracking"
      src={`https://js-ap1.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
      strategy="afterInteractive"
    />
  );
}
