import { googleVisuals } from "@/components/services/illustrations/google";
import { chatgptVisuals } from "@/components/services/illustrations/chatgpt";
import { metaVisuals } from "@/components/services/illustrations/meta";
import { microsoftVisuals } from "@/components/services/illustrations/microsoft";
import { linkedinVisuals } from "@/components/services/illustrations/linkedin";

// Channel mockups for each /services/[slug] page, keyed by slug.
// `leaks` follows the order of leaks.items in lib/services.js.
export const serviceVisuals = {
  "google-ads": googleVisuals,
  "chatgpt-ads": chatgptVisuals,
  "meta-ads": metaVisuals,
  "microsoft-ads": microsoftVisuals,
  "linkedin-ads": linkedinVisuals,
};
