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
  { src: "/client-logos/rezi.svg", alt: "Rezi", width: 215, height: 91 },
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

// Rendered heights (px) are tuned per logo so each wordmark reads at a similar
// optical size (the source files have very different padding/aspect ratios).
// Used by the logo marquee (components/home/HomeLogos.jsx).
export const logoRowOne = [
  ["Fillout", 48],
  ["ContentStudio", 50],
  ["Nooks", 56],
  ["AutoRFP", 23],
  ["ProsperOps", 58],
  ["LiveTourney", 54],
  ["StoreLeads", 56],
  ["FreebieFlow", 46],
];

export const logoRowTwo = [
  ["Everwall", 50],
  ["DialMyCalls", 50],
  ["Senja", 56],
  ["Rezi", 24],
  ["SEOBuddy", 60],
  ["SetSail", 56],
  ["PVCR", 41],
  ["DealBuyer", 64],
];
