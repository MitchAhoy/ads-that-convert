export const clientLogos = [
  { src: "/client-logos/autorfp.svg", alt: "AutoRFP", width: 160, height: 48 },
  { src: "/client-logos/contentstudio.png", alt: "ContentStudio", width: 160, height: 64 },
  { src: "/client-logos/dealbuyer.png", alt: "DealBuyer", width: 170, height: 72 },
  { src: "/client-logos/dialmycalls.png", alt: "DialMyCalls", width: 160, height: 64 },
  { src: "/client-logos/everwall.png", alt: "Everwall", width: 160, height: 64 },
  { src: "/client-logos/fillout.png", alt: "Fillout", width: 160, height: 64 },
  { src: "/client-logos/freebieflow.svg", alt: "FreebieFlow", width: 160, height: 48 },
  { src: "/client-logos/livetourney.svg", alt: "LiveTourney", width: 160, height: 48 },
  { src: "/client-logos/nooks.png", alt: "Nooks", width: 160, height: 64 },
  { src: "/client-logos/prosperops.png", alt: "ProsperOps", width: 160, height: 64 },
  { src: "/client-logos/pvcr.png", alt: "PVCR", width: 140, height: 56 },
  { src: "/client-logos/senja.png", alt: "Senja", width: 160, height: 64 },
  { src: "/client-logos/seobuddy.png", alt: "SEOBuddy", width: 160, height: 64 },
  { src: "/client-logos/setsail.png", alt: "SetSail", width: 160, height: 64 },
  { src: "/client-logos/storeleads.svg", alt: "StoreLeads", width: 160, height: 48 },
];

export const clientLogosByName = clientLogos.reduce((acc, logo) => {
  acc[logo.alt] = logo;
  return acc;
}, {});

export const heroClientLogoOrder = [
  "Fillout",
  "ContentStudio",
  "Nooks",
  "AutoRFP",
  "ProsperOps",
  "LiveTourney",
  "StoreLeads",
  "FreebieFlow",
  "Everwall",
  "DialMyCalls",
  "Senja",
  "SEOBuddy",
  "SetSail",
  "PVCR",
  "DealBuyer",
];
