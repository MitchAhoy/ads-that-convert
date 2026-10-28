import SaasCacLtvGuide from "@/components/guides/SaasCacLtvGuide";
import { guideFaqItems, guidePath } from "@/lib/guides/saasCacLtv";
import { generateMeta } from "@/lib/seo";

// Long-form guide (DESIGN.md §16.16). Static route, so app/sitemap.js picks it
// up automatically.

export function generateMetadata() {
  return generateMeta({
    title: "SaaS Paid Search: CAC, LTV and Payback Guide | Ads That Convert",
    description:
      "How I plan and judge SaaS Google Ads on CAC, LTV, LTV:CAC, payback period and pipeline quality, with formulas, CRM offline conversions and a worked example.",
    path: guidePath,
    keywords: [
      "SaaS paid search CAC",
      "SaaS Google Ads LTV CAC",
      "SaaS payback period paid search",
      "paid search agency SaaS metrics",
    ],
  });
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: guideFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
  })),
};

export default function SaasCacLtvGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SaasCacLtvGuide />
    </>
  );
}
