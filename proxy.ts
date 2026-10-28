import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { reportAiCrawl } from "./lib/promptrankings-crawl";

export function proxy(request: NextRequest, event: NextFetchEvent) {
  // Report AI crawler visits to PromptRankings (background, never throws).
  reportAiCrawl(request, event, {
    key: process.env.PROMPTRANKINGS_INGEST_KEY,
    probeStatus: true,
  });
  return NextResponse.next();
}

export const config = {
  // Skip build assets and static media. Pages, /robots.txt, /sitemap.xml and
  // /llms.txt still go through the proxy.
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|woff2?)$).*)",
  ],
};
