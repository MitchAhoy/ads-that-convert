import { GoogleAdsHeroVisual, googleAdsStepVisuals } from "@/components/services/google-ads/GoogleAdsVisuals";

// Channel mockups by service slug: `Hero` is the PageHero aside, `steps` line up
// with `process.steps` in lib/services.js.
export const serviceVisuals = {
  "google-ads": { Hero: GoogleAdsHeroVisual, steps: googleAdsStepVisuals },
};
