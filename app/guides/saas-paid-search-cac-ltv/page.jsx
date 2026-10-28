import SaasCacLtvGuide from "@/components/guides/SaasCacLtvGuide";
import { guideFaqItems, guidePath, guideSeo } from "@/lib/guides/saasCacLtv";
import { generateMeta } from "@/lib/seo";

// Long-form guide (DESIGN.md §16.16). Static route, so app/sitemap.js picks it
// up automatically.

export function generateMetadata() {
  return generateMeta({ ...guideSeo, path: guidePath });
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
