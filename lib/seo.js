const SITE_NAME = "Ads That Convert";
const DEFAULT_SITE_URL = "https://www.adsthatconvert.co";
const DEFAULT_TITLE = "SaaS Google Ads Agency | Ads That Convert";
const DEFAULT_DESCRIPTION =
  "We're a specialized SaaS Google Ads agency dedicated to scaling your SaaS business with high-converting campaigns.";
const DEFAULT_OG_IMAGE = "/favicon.png";

function normalizeUrl(url) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function resolveUrl(path = "/") {
  const siteUrl = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL);

  if (!path || path === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function generateMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords,
} = {}) {
  const canonical = resolveUrl(path);
  const resolvedTitle = title || DEFAULT_TITLE;
  const resolvedImage = image.startsWith("http") ? image : resolveUrl(image);
  const robots = noIndex ? { index: false, follow: false } : { index: true, follow: true };

  return {
    metadataBase: new URL(resolveUrl("/")),
    title: resolvedTitle,
    description,
    keywords,
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    alternates: {
      canonical,
    },
    robots,
    openGraph: {
      type: "website",
      url: canonical,
      title: resolvedTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [resolvedImage],
    },
  };
}
