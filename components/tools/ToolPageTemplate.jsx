import Link from "next/link";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import HomePageHero from "@/components/home/HomePageHero";
import { BookButton, Section, focusRing, hpBookingBarButton } from "@/components/home/primitives";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import { tools } from "@/lib/tools/toolRegistry";

// Shared page for every /tools/[slug] (DESIGN.md §16.13): hero, the tool in
// its own hairline section, a tracking pitch, the other tools, FAQ, final CTA.
// Each tool's own UI lives in components/tools/<tool>/.

// Registry descriptions mark code with backticks; render those spans as inline code.
function renderInlineCode(text) {
  return text.split(/(`[^`]+`)/g).map((part, index) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={index} className="rounded-md bg-hp-tray px-1.5 py-0.5 font-hp-mono text-[0.9em] text-hp-ink">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );
}

const toolGlyphs = {
  "datalayer-push-snippet-generator": "dL",
  "ppc-keyword-concatenation-tool": "[+]",
  "utm-builder": "?u=",
  "ab-testing-significance-calculator": "A/B",
};

function Glyph({ slug, index }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-8.5 shrink-0 items-center justify-center rounded-[9px] bg-white font-hp-mono text-xs text-hp-accent shadow-[0_0_0_1px_rgba(14,15,17,0.1)] lg:size-9 lg:rounded-[10px] ${
        index % 2 === 0 ? "-rotate-4" : "rotate-4"
      }`}
    >
      {toolGlyphs[slug]}
    </span>
  );
}

function FreeToolPill() {
  return (
    <span className="flex items-center gap-2 rounded-full bg-white py-1.5 pr-3 pl-2.5 shadow-[0_0_0_1px_#e4e6ea,0_2px_6px_rgba(14,15,17,0.04)]">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-hp-up" />
      <span className="font-hp text-sm/4.5 text-hp-body">
        <span className="font-medium text-hp-ink">Free tool</span> · No sign-up
      </span>
    </span>
  );
}

function TrackingPitch() {
  return (
    <Section label="Conversion tracking" data-booking-cta-zone innerClassName="bg-hp-band">
      <div className="flex flex-col gap-3.5 px-5 py-5.5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12 lg:py-7">
        <div className="flex items-start gap-4 lg:items-center">
          <span
            aria-hidden="true"
            className="hidden size-11 shrink-0 -rotate-4 items-center justify-center rounded-xl bg-white font-hp-mono text-[13px] font-medium text-hp-accent shadow-[0_0_0_1px_rgba(14,15,17,0.1),0_2px_6px_rgba(14,15,17,0.06)] sm:flex"
          >
            {"{ }"}
          </span>
          <div className="flex flex-col gap-0.5">
            <p className="font-hp text-[17px]/6 font-medium text-hp-ink lg:text-lg/6">
              Want tracking that reports paid sign-ups, not just clicks?
            </p>
            <p className="font-hp text-[15px]/5.5 text-hp-body">
              I write it by hand for every account, so paid sign-ups and their value flow back into Google Ads.
            </p>
          </div>
        </div>
        <BookButton size="none" className="w-full shrink-0 gap-2.25 rounded-xl px-4.5 py-3.5 text-[17px]/5.5 lg:w-auto lg:rounded-[10px] lg:py-2.75 lg:text-base/5.5" />
      </div>
    </Section>
  );
}

function MoreTools({ currentSlug }) {
  const others = tools.filter((tool) => tool.slug !== currentSlug);
  return (
    <Section labelledBy="more-tools-title">
      <div className="flex flex-col gap-2.5 px-5 pt-10 pb-5 sm:px-8 lg:px-12 lg:pt-14 lg:pb-8">
        <p className="font-hp-mono text-xs/4 tracking-[0.08em] text-hp-fine uppercase">More tools</p>
        <h2 id="more-tools-title">
          <span className="block font-hp text-2xl/7.5 font-medium tracking-[-0.025em] text-hp-ink lg:text-[28px]/8.5">
            More free tools for paid search
          </span>
        </h2>
      </div>
      <ul className="grid grid-cols-1 lg:grid-cols-3 lg:border-t lg:border-hp-line">
        {others.map((tool, index) => (
          <li key={tool.slug} className={`border-t border-hp-line lg:border-t-0 ${index < others.length - 1 ? "lg:border-r" : ""}`}>
            <Link
              href={`/tools/${tool.slug}`}
              className={`group flex h-full items-center gap-3.5 px-5 py-4 sm:px-8 lg:flex-col lg:items-start lg:gap-3 lg:px-8 lg:pt-7.5 lg:pb-8.5 ${
                index === 0 ? "lg:pl-12" : ""
              } ${index === others.length - 1 ? "lg:pr-12" : ""} ${focusRing} focus-visible:-outline-offset-2`}
            >
              <Glyph slug={tool.slug} index={index} />
              <span className="flex flex-1 flex-col gap-2">
                <span className="font-hp text-base/5.5 font-medium text-hp-ink lg:text-[19px]/6.25 lg:tracking-[-0.02em]">
                  {tool.name}
                </span>
                <span className="hidden font-hp text-[15px]/5.75 text-hp-soft lg:block">{tool.description.replace(/`/g, "")}</span>
                <span className="hidden w-fit border-b border-hp-ink py-1 font-hp text-[15px]/5 font-medium text-hp-ink transition-colors group-hover:border-hp-accent group-hover:text-hp-accent lg:block">
                  Open tool →
                </span>
              </span>
              <span aria-hidden="true" className="font-hp text-lg text-hp-fine lg:hidden">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default function ToolPageTemplate({ slug, title, heroAccent, description, faqItems, children }) {
  const items = faqItems.map(({ question, answer }) => ({
    question,
    answer: Array.isArray(answer) ? answer : [answer],
  }));

  return (
    <>
      <main className="bg-white">
        <HomePageHero
          lead={heroAccent ? `${title},` : title}
          accent={heroAccent}
          description={description ? renderInlineCode(description) : null}
          pill={<FreeToolPill />}
          underlineSeed={`tool:${slug}`}
        />
        <Section label="Tool" innerClassName="font-hp">
          <div className="px-5 py-8 sm:px-8 lg:px-12 lg:py-11">{children}</div>
        </Section>
        <TrackingPitch />
        <MoreTools currentSlug={slug} />
        <HomeFaq eyebrow="FAQ" marker={0} lead="Common questions," accent="answered." items={items} />
        <HomeFinalCta underlineSeed={`tool:${slug}`} />
      </main>
      <MobileBookingBar buttonProps={hpBookingBarButton} />
    </>
  );
}
