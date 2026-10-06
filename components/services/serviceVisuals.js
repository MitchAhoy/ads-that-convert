import { ChatGPTAdsHeroVisual } from "@/components/services/chatgpt-ads/ChatGPTAdsVisuals";
import { GoogleAdsHeroVisual, googleAdsStepVisuals } from "@/components/services/google-ads/GoogleAdsVisuals";
import { MetaAdsHeroVisual } from "@/components/services/meta-ads/MetaAdsVisuals";
import { MicrosoftAdsHeroVisual } from "@/components/services/microsoft-ads/MicrosoftAdsVisuals";

// Channel mockups by service slug: `Hero` is the PageHero aside, `steps` line up
// with `process.steps` in lib/services.js (optional: step cards render without
// a mockup well when a channel has none).
export const serviceVisuals = {
  "google-ads": { Hero: GoogleAdsHeroVisual, steps: googleAdsStepVisuals },
  "chatgpt-ads": { Hero: ChatGPTAdsHeroVisual },
  "meta-ads": { Hero: MetaAdsHeroVisual },
  "microsoft-ads": { Hero: MicrosoftAdsHeroVisual },
};
