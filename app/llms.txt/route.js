import { getCaseStudies } from "@/lib/caseStudies";
import { services } from "@/lib/services";
import { tools } from "@/lib/tools/toolRegistry";
import { locationPages } from "@/lib/locations";
import { guides } from "@/lib/guides";
import { getStaticRoutes } from "@/lib/siteRoutes";

// /llms.txt (llmstxt.org): a plain Markdown map of the site for AI assistants.
// It lists the same indexable pages as the sitemap, built from the same data,
// so new pages appear here without an edit: case studies, services, tools,
// guides and location pages come from their data files, and any other new
// page in app/ is caught by the same page finder the sitemap uses and listed
// under "Other pages" (give it a proper entry in MAIN_PAGES to add a description).
// Unlisted case studies are included on purpose: this file and the sitemap
// are how they get found.

export const dynamic = "force-static";

const BASE_URL = "https://www.adsthatconvert.co";

const MAIN_PAGES = [
  { path: "/", name: "SaaS Google Ads agency", description: "Homepage: what I do, results, pricing and FAQ." },
  { path: "/pricing", name: "Pricing", description: "Month-to-month Google Ads management pricing for SaaS, in USD." },
  { path: "/results", name: "Results", description: "SaaS Google Ads case studies reported in new MRR, payback and pipeline." },
  { path: "/testimonials", name: "Testimonials", description: "Feedback from SaaS founders and marketing leads." },
];

// "/some-new-page" -> "Some new page", for pages with no entry yet.
const nameFromPath = (path) => {
  const words = path.split("/").filter(Boolean).pop().replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const link = (title, path, description) =>
  `- [${title}](${BASE_URL}${path})${description ? `: ${description}` : ""}`;

export async function GET() {
  const caseStudies = await getCaseStudies({ includeUnlisted: true });
  const indexableServices = services.filter((service) => service.indexable);
  const listed = new Set([...MAIN_PAGES, ...locationPages, ...guides].map((page) => page.path));
  const otherRoutes = (await getStaticRoutes()).filter((route) => !listed.has(route));

  const body = [
    "# Ads That Convert",
    "",
    "> Ads That Convert is a SaaS paid-ads agency run by one senior specialist, Mitch. I run Google Ads for B2B and B2C SaaS companies myself and report in trials, pipeline, new MRR and payback, not clicks. Month-to-month, from $2,000 a month (USD). I run campaigns in the USA, the UK, Canada, Australia, New Zealand and Europe.",
    "",
    "Google Ads is the main service, with ChatGPT, Meta, Microsoft and LinkedIn Ads alongside it. Every account gets conversion tracking through to revenue, with CRM and offline conversions so Google bids for paying customers and qualified pipeline. Campaigns are usually live within 7 days of onboarding.",
    "",
    "## Main pages",
    "",
    ...MAIN_PAGES.map((page) => link(page.name, page.path, page.description)),
    ...locationPages.map((page) => link(page.name, page.path, page.seo.description)),
    "",
    "## Guides",
    "",
    ...guides.map((guide) => link(guide.name, guide.path, guide.description)),
    "",
    "## Case studies",
    "",
    ...caseStudies.map((study) =>
      link(study.seoTitle || study.title, `/results/${study.slug}`, study.seoDescription || study.excerpt),
    ),
    "",
    "## Services",
    "",
    ...indexableServices.map((service) =>
      link(service.seo?.title || service.name, `/services/${service.slug}`, service.seo?.description),
    ),
    "",
    "## Free tools",
    "",
    ...tools.map((tool) => link(tool.title || tool.name, `/tools/${tool.slug}`, tool.description)),
    "",
    ...(otherRoutes.length
      ? ["## Other pages", "", ...otherRoutes.map((route) => link(nameFromPath(route), route)), ""]
      : []),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
