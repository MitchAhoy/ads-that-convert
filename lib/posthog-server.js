import { PostHog } from "posthog-node";

export function createPostHogServerClient() {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://d.adsthatconvert.co";

  if (!posthogKey) {
    return null;
  }

  return new PostHog(posthogKey, {
    host: posthogHost,
  });
}
