import PageHeadline from "@/components/ui/PageHeadline";
import FloatingOptInWidget from "@/components/forms/FloatingOptInWidget";
import OptInOfferCard from "@/components/forms/OptInOfferCard";

export const metadata = {
  title: "HubSpot Form Test | Ads That Convert",
  description: "Internal HubSpot form prototype page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HubSpotFormTestPage() {
  const bullets = [
    "Spot expensive campaign leakage before it drains next month's budget.",
    "See the wasted-spend checks we would run in the first 15 minutes of an audit.",
    "Use a tighter opt-in pattern built to convert without hijacking the page.",
  ];

  return (
    <>
      <PageHeadline
        id="hubspot-form-test-heading"
        title="Reusable HubSpot opt-in test"
        description="Prototype a higher-converting floating lead magnet pattern, validate the HubSpot submission flow, and pressure-test the reusable component system."
      />

      <section className="py-5 sm:py-6" aria-labelledby="hubspot-form-card-heading">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[28px] border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
              <h2
                id="hubspot-form-card-heading"
                className="max-w-[20ch] text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950"
              >
                Planned conversion direction
              </h2>
              <div className="mt-5 space-y-4 text-base sm:text-md text-zinc-700">
                <p>
                  This version shifts the test away from a plain form block and toward a reusable opt-in system that can
                  become a floating widget, inline section, or future modal without changing the HubSpot plumbing.
                </p>
                <p>
                  The conversion-first default is a single required email field, a strong value proposition, a compact
                  fixed card, and a dismissible desktop widget that appears only after the visitor scrolls beyond the
                  header.
                </p>
              </div>
            </div>

            <aside className="rounded-[28px] border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
              <p className="text-sm font-semibold uppercase leading-[1.4] tracking-[0.03em] text-[#122338]/70">
                Interaction notes
              </p>
              <ul className="mt-4 space-y-3 text-base text-zinc-700">
                <li>Desktop widget waits until the page is scrolled before appearing in the bottom-right corner.</li>
                <li>Mobile stays inline so it does not cover content or create a cramped fixed widget.</li>
                <li>The fixed card includes headline, subheadline, and a single work-email field by default.</li>
                <li>Closing the test widget hides it for the current page view and returns on refresh.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-6" aria-labelledby="inline-opt-in-heading">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-zinc-200 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),rgba(244,244,245,0.88)_42%,rgba(228,228,231,0.95))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-6 lg:p-8">
            <p className="text-sm font-semibold uppercase leading-[1.4] tracking-[0.03em] text-[#122338]/70">
              Mobile-safe inline version
            </p>
            <div className="mt-5">
              <OptInOfferCard
                title="How to save thousands a month on wasted ad spend"
                description="A tight lead magnet layout with stronger hierarchy, reduced form friction, and a clear benefit-led CTA for colder traffic."
                bullets={bullets}
                trustText="Internal test only. Current submissions route into the configured HubSpot form."
                submitLabel="Get the guide"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-6" aria-labelledby="scroll-zone-heading">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
            <h2
              id="scroll-zone-heading"
              className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950"
            >
              Scroll to trigger the desktop widget
            </h2>
            <p className="mt-4 max-w-[60ch] text-base sm:text-md text-zinc-700">
              This spacer section exists so the floating preview behaves like it would on a real landing page. Keep
              scrolling on desktop and the teaser should appear in the bottom-right corner after the threshold.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-5">
                <h3 className="text-xl font-semibold leading-[1.2] text-zinc-950">Why fixed content works here</h3>
                <p className="mt-3 text-base text-zinc-700">
                  Showing the full form immediately reduces clicks and ambiguity. Visitors understand the offer and can
                  act in one step without opening an additional panel.
                </p>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-5">
                <h3 className="text-xl font-semibold leading-[1.2] text-zinc-950">Why one required field</h3>
                <p className="mt-3 text-base text-zinc-700">
                  For a first-touch lead magnet, a single email field usually gives you the cleanest tradeoff between
                  volume and intent. Extra fields can be layered in later if lead quality becomes the bottleneck.
                </p>
              </div>
            </div>

            <div className="mt-6 h-[50vh] rounded-[28px] border border-dashed border-zinc-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(228,228,231,0.35))]" />
          </div>
        </div>
      </section>

      <FloatingOptInWidget
        title="How to save thousands a month on wasted ad spend"
        description="A reusable floating opt-in template with stronger hierarchy, lower friction, and a HubSpot-backed submission flow."
        bullets={bullets}
        trustText="Internal test widget. Closing it hides this panel until the page is refreshed."
      />
    </>
  );
}
