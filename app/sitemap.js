import { getCaseStudySlugs } from "@/lib/caseStudies";
import { getToolSlugs } from "@/lib/tools/toolRegistry";
import { getIndexableServiceSlugs } from "@/lib/services";
import { getStaticRoutes, isExcludedRoute } from "@/lib/siteRoutes";

const BASE_URL = "https://www.adsthatconvert.co";

export const revalidate = 3600;

export default async function sitemap() {
  const staticRoutes = await getStaticRoutes();
  const caseStudySlugs = await getCaseStudySlugs();
  const resultRoutes = caseStudySlugs.map((slug) => `/results/${slug}`);
  const toolRoutes = getToolSlugs().map((slug) => `/tools/${slug}`);
  // Noindexed services (currently google-ads) are left out on purpose.
  const serviceRoutes = getIndexableServiceSlugs().map((slug) => `/services/${slug}`);
  const urls = [...new Set([...staticRoutes, ...resultRoutes, ...toolRoutes, ...serviceRoutes])].filter(
    (route) => !isExcludedRoute(route),
  );

  return urls.map((route) => ({
    url: new URL(route, BASE_URL).toString(),
    lastModified: new Date(),
  }));
}
