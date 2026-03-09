import PageHeadline from "@/components/ui/PageHeadline";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTABanner from "@/components/sections/CTABanner";

export default function ToolPageTemplate({
  title,
  description,
  faqTitle,
  faqItems,
  children,
}) {
  return (
    <>
      <PageHeadline id="tool-page-heading" title={title} description={description} />

      <section className="py-5 sm:py-6" aria-label="Tool">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
            {children}
          </div>
        </div>
      </section>

      <FaqAccordion title={faqTitle} items={faqItems} />
      <CTABanner />
    </>
  );
}
