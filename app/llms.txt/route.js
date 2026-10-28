import { getCaseStudies } from "@/lib/caseStudies";
import { services } from "@/lib/services";
import { tools } from "@/lib/tools/toolRegistry";
import { usaPage } from "@/lib/locations";

// /llms.txt (llmstxt.org): a plain Markdown map of the site for AI assistants.
// It lists the same indexable pages as the sitemap, built from the same data,
// so new case studies, services and tools appear here without an edit.
// Unlisted case studies are included on purpose: this file and the sitemap
// are how they get found.

export const dynamic = "force-static";

const BASE_URL = "https://www.adsthatconvert.co";

const link = (title, path, description) =>
  `- [${title}](${BASE_URL}${path})${description ? `: ${description}` : ""}`;

export async function GET() {
  const caseStudies = await getCaseStudies({ includeUnlisted: true });
  const indexableServices = services.filter((service) => service.indexable);

  const body = [
    "# Ads That Convert",
    "",
    "> Ads That Convert is a SaaS paid-ads agency run by one senior specialist, Mitch. I run Google Ads for B2B and B2C SaaS companies myself and report in trials, pipeline, new MRR and payback, not clicks. Month-to-month, from $2,000 a month (USD). I run campaigns in the USA, the UK, Canada, Australia, New Zealand and Europe.",
    "",
    "Google Ads is the main service, with ChatGPT, Meta, Microsoft and LinkedIn Ads alongside it. Every account gets conversion tracking through to revenue, with CRM and offline conversions so Google bids for paying customers and qualified pipeline. Campaigns are usually live within 7 days of onboarding.",
    "",
    "## Main pages",
    "",
    link("SaaS Google Ads agency", "/", "Homepage: what I do, results, pricing and FAQ."),
    link("Google Ads agency for US B2B SaaS", usaPage.path, usaPage.seo.description),
    link("Pricing", "/pricing", "Month-to-month Google Ads management pricing for SaaS, in USD."),
    link("Results", "/results", "SaaS Google Ads case studies reported in new MRR, payback and pipeline."),
    link("Testimonials", "/testimonials", "Feedback from SaaS founders and marketing leads."),
    "",
    "## Guides",
    "",
    link(
      "SaaS paid search: CAC, LTV and payback",
      "/guides/saas-paid-search-cac-ltv",
      "How I plan and judge SaaS Google Ads on CAC, LTV, LTV:CAC, payback period and pipeline quality, with formulas, CRM offline conversions and a worked example.",
    ),
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
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
