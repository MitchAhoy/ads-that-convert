import fs from "node:fs/promises";
import path from "node:path";
import { getCaseStudySlugs } from "@/lib/caseStudies";
import { getToolSlugs } from "@/lib/tools/toolRegistry";
import { getIndexableServiceSlugs } from "@/lib/services";

const BASE_URL = "https://www.adsthatconvert.co";
const APP_DIR = path.join(process.cwd(), "app");
const PAGE_FILE_PATTERN = /^page\.(js|jsx|ts|tsx|mdx)$/;
const EXCLUDED_ROUTE_PREFIXES = ["/test"];

function normalizeRoute(fullPath) {
  const relativePath = path.relative(APP_DIR, fullPath);
  const segments = relativePath.split(path.sep);

  const pageFile = segments.pop();

  if (!pageFile || !PAGE_FILE_PATTERN.test(pageFile)) {
    return null;
  }

  // Pages under a dynamic segment are added explicitly below, from their data
  // sources. Dropping only the segment would list the parent (e.g. "/tools"),
  // which has no page of its own.
  if (segments.some((segment) => segment.startsWith("["))) {
    return null;
  }

  // Ignore route groups during auto-discovery.
  const routeSegments = segments.filter(
    (segment) => segment && !(segment.startsWith("(") && segment.endsWith(")")),
  );

  if (routeSegments.length === 0) {
    return "/";
  }

  return `/${routeSegments.join("/")}`;
}

async function collectStaticRoutes(dir = APP_DIR) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      routes.push(...(await collectStaticRoutes(fullPath)));
      continue;
    }

    const route = normalizeRoute(fullPath);

    if (route) {
      routes.push(route);
    }
  }

  return routes;
}

export const revalidate = 3600;

export default async function sitemap() {
  const staticRoutes = await collectStaticRoutes();
  const caseStudySlugs = await getCaseStudySlugs();
  const toolSlugs = getToolSlugs();
  const resultRoutes = caseStudySlugs.map((slug) => `/results/${slug}`);
  const toolRoutes = toolSlugs.map((slug) => `/tools/${slug}`);
  // Noindexed services (currently google-ads) are left out on purpose.
  const serviceRoutes = getIndexableServiceSlugs().map((slug) => `/services/${slug}`);
  const urls = [...new Set([...staticRoutes, ...resultRoutes, ...toolRoutes, ...serviceRoutes])]
    // Match whole segments, so "/test" excludes "/test/..." but not "/testimonials".
    .filter((route) => !EXCLUDED_ROUTE_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`)));

  return urls.map((route) => ({
    url: new URL(route, BASE_URL).toString(),
    lastModified: new Date(),
  }));
}
