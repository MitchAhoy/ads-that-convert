import PageHero from "@/components/sections/PageHero";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CTABanner from "@/components/sections/CTABanner";
import GridFrame from "@/components/ui/GridFrame";
import GridDivider from "@/components/ui/GridDivider";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Registry descriptions mark code with backticks; render those spans as inline code.
function renderInlineCode(text) {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={index} className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}

// Shared shell for every /tools/[slug] page (DESIGN.md §7.13): stage-card hero,
// the tool in a white Level-2 card, sidebar FAQ, final CTA. Each tool's own UI
// lives in components/tools/<tool>/.
export default function ToolPageTemplate({ title, description, faqTitle, faqItems, children }) {
  return (
    <>
      <GridFrame bleedTop>
        <PageHero
          id="tool-page-heading"
          title={title}
          description={description ? renderInlineCode(description) : null}
          showCta={false}
        />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <section aria-label="Tool" className="py-12">
          <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)] sm:p-8">
              {children}
            </div>
          </div>
        </section>
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <FaqAccordion numbered title={faqTitle} items={faqItems} sidebar={{ href: SCHEDULE_CALL_URL }} />
      </GridFrame>

      <GridDivider />

      <GridFrame>
        <CTABanner />
      </GridFrame>
    </>
  );
}
