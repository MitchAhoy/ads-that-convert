// Server-side error tracking: Next.js calls onRequestError for errors thrown
// while rendering pages, route handlers, server actions and the proxy.
export function register() {}

// Reads the visitor's PostHog id from the browser cookie, so server errors
// link to the same person (and their session replay) as their browser events.
function getDistinctId(cookieHeader) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!cookieHeader || !key) return undefined;

  const name = `ph_${key}_posthog=`;
  const cookie = cookieHeader.split(";").map((c) => c.trim()).find((c) => c.startsWith(name));
  if (!cookie) return undefined;

  try {
    return JSON.parse(decodeURIComponent(cookie.slice(name.length))).distinct_id;
  } catch {
    return undefined;
  }
}

export async function onRequestError(error, request, context) {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    const { createPostHogServerClient } = await import("./lib/posthog-server");
    const posthog = createPostHogServerClient();
    if (!posthog) return;

    const cookieHeader = request.headers?.cookie;
    const cookie = Array.isArray(cookieHeader) ? cookieHeader.join("; ") : cookieHeader;

    await posthog.captureExceptionImmediate(error, getDistinctId(cookie), {
      $current_url: request.path,
      request_method: request.method,
      router_kind: context.routerKind,
      route_path: context.routePath,
      route_type: context.routeType,
    });
    await posthog.shutdown();
  } catch {
    // Never let error reporting break the response.
  }
}
