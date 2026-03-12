import PageHeadline from "@/components/ui/PageHeadline";
import HubSpotTestForm from "@/components/forms/HubSpotTestForm";

export const metadata = {
  title: "HubSpot Form Test | Ads That Convert",
  description: "Internal HubSpot form prototype page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HubSpotFormTestPage() {
  return (
    <>
      <PageHeadline
        id="hubspot-form-test-heading"
        title="HubSpot form test"
        description="A simple internal page for testing a future HubSpot contact form connection."
      />

      <section className="py-5 sm:py-6" aria-labelledby="hubspot-form-card-heading">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[640px] rounded-3xl border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
            <h2
              id="hubspot-form-card-heading"
              className="text-xl font-semibold leading-[1.2] text-zinc-950 sm:text-2xl"
            >
              Test contact form
            </h2>
            <p className="mt-3 text-base sm:text-md text-zinc-700">
              This test form sends leads into HubSpot and tags them with the acquisition source.
            </p>
            <HubSpotTestForm />
          </div>
        </div>
      </section>
    </>
  );
}
