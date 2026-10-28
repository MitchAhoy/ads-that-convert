/**
 * PromptRankings crawl snippet for Next.js (proxy.ts in Next 16+, middleware.ts before).
 * Copy this file into your project. It has no dependencies.
 *
 * It reports each request from an AI crawler (GPTBot, ClaudeBot, PerplexityBot…) to PromptRankings
 * in the background with `event.waitUntil`, so it never delays the page, and it swallows every
 * error, so it can never break your site. Ordinary visitors are never reported.
 *
 * The status code: a proxy runs before the page renders, so it can't see the response's status.
 * Visits are reported with no status unless you set `probeStatus: true`, which makes one extra
 * HEAD request to the same URL after the response, in the background, and reports what that got.
 * That request renders the page again on your server, so it costs one extra render per crawler hit.
 * The Cloudflare Worker variant (worker.ts) sees the real status and needs no probe.
 *
 * Usage, in proxy.ts:
 *
 *   import type { NextFetchEvent, NextRequest } from 'next/server'
 *   import { NextResponse } from 'next/server'
 *   import { reportAiCrawl } from './lib/promptrankings-crawl'
 *
 *   export function proxy(request: NextRequest, event: NextFetchEvent) {
 *     reportAiCrawl(request, event, { key: process.env.PROMPTRANKINGS_INGEST_KEY })
 *     return NextResponse.next()
 *   }
 */

/**
 * AI crawler user-agent tokens, as whole tokens. A cheap first filter so ordinary traffic never
 * leaves your server; PromptRankings re-checks every visit against its full registry. Keep in step
 * with packages/core/src/crawlers/registry.ts (a test checks it).
 */
export const AI_CRAWLER_PATTERN =
  /(?<![A-Za-z0-9-])(?:GPTBot|OAI-SearchBot|ChatGPT-User|OAI-AdsBot|ClaudeBot|Claude-SearchBot|Claude-User|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|Google-Agent|Google-GeminiNotebook|Google-NotebookLM|Googlebot|bingbot|meta-externalagent|meta-externalfetcher|FacebookBot|Applebot|Bytespider|CCBot|Amazonbot|DuckAssistBot|MistralAI-User|cohere-ai|cohere-training-data-crawler|AI2Bot|YouBot)(?![A-Za-z0-9-])/i

const DEFAULT_ENDPOINT = 'https://promptrankings.com/api/ingest/crawl'
const PROBE_HEADER = 'x-promptrankings-probe'
const TIMEOUT_MS = 3000

export interface CrawlReportOptions {
  /** The brand's ingest key from PromptRankings Settings. Nothing is sent without one. */
  key: string | undefined
  /** Your PromptRankings ingest URL, if you self-host. */
  endpoint?: string
  /** Make a background HEAD request to learn the status code. Off by default; see above. */
  probeStatus?: boolean
}

/** The bit of NextFetchEvent this needs, so the file doesn't import Next.js. */
interface WaitUntil {
  waitUntil(promise: Promise<unknown>): void
}

/** Reports the request if it comes from an AI crawler. Returns at once and never throws. */
export function reportAiCrawl(request: Request, event: WaitUntil, options: CrawlReportOptions): void {
  try {
    const userAgent = request.headers.get('user-agent') ?? ''
    if (!options.key || !AI_CRAWLER_PATTERN.test(userAgent) || request.headers.has(PROBE_HEADER)) return
    event.waitUntil(send(request, userAgent, options).catch(() => {}))
  } catch {
    // Never let reporting break the site.
  }
}

async function send(request: Request, userAgent: string, options: CrawlReportOptions): Promise<void> {
  const url = new URL(request.url)
  let status: number | null = null
  if (options.probeStatus && (request.method === 'GET' || request.method === 'HEAD')) {
    const probe = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      headers: { [PROBE_HEADER]: '1', 'user-agent': 'PromptRankings-Probe/1.0' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    }).catch(() => null)
    status = probe?.status || null
  }
  const headers = request.headers
  await fetch(options.endpoint ?? DEFAULT_ENDPOINT, {
    method: 'POST',
    headers: { authorization: `Bearer ${options.key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      path: url.pathname,
      userAgent: userAgent.slice(0, 1024),
      status,
      statusSource: status === null ? null : 'probe',
      occurredAt: new Date().toISOString(),
      ip: headers.get('x-real-ip') ?? headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
      country: headers.get('x-vercel-ip-country') ?? headers.get('cf-ipcountry') ?? null,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
}
