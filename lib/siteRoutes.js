import fs from "node:fs/promises";
import path from "node:path";

// Finds every static page in app/ so the sitemap and /llms.txt list the same
// pages without anyone editing them. Dynamic routes ([slug]) are skipped here:
// callers add those from their data sources.

const APP_DIR = path.join(process.cwd(), "app");
const PAGE_FILE_PATTERN = /^page\.(js|jsx|ts|tsx|mdx)$/;
// /call-confirmation is a post-booking thank-you page (noindex), so it stays out too.
const EXCLUDED_ROUTE_PREFIXES = ["/test", "/call-confirmation"];

function normalizeRoute(fullPath) {
  const segments = path.relative(APP_DIR, fullPath).split(path.sep);
  const pageFile = segments.pop();

  if (!pageFile || !PAGE_FILE_PATTERN.test(pageFile)) {
    return null;
  }

  // Dropping only the dynamic segment would list the parent (e.g. "/tools"),
  // which has no page of its own.
  if (segments.some((segment) => segment.startsWith("["))) {
    return null;
  }

  // Ignore route groups.
  const routeSegments = segments.filter(
    (segment) => segment && !(segment.startsWith("(") && segment.endsWith(")")),
  );

  return routeSegments.length === 0 ? "/" : `/${routeSegments.join("/")}`;
}

async function collectRoutes(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      routes.push(...(await collectRoutes(fullPath)));
      continue;
    }

    const route = normalizeRoute(fullPath);
    if (route) routes.push(route);
  }

  return routes;
}

// Match whole segments, so "/test" excludes "/test/..." but not "/testimonials".
export function isExcludedRoute(route) {
  return EXCLUDED_ROUTE_PREFIXES.some((prefix) => route === prefix || route.startsWith(`${prefix}/`));
}

export async function getStaticRoutes() {
  const routes = await collectRoutes(APP_DIR);
  return [...new Set(routes)].filter((route) => !isExcludedRoute(route)).sort();
}
