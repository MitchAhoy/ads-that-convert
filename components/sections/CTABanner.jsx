import CallToActionCard from "@/components/ui/CallToActionCard";

export default function CTABanner() {
  return (
    <section aria-labelledby="final-cta-title" className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <CallToActionCard
          id="final-cta-title"
          title="Ready to get more customers for your SaaS?"
          description="Book in a call and I'll show you how I'd scale your acquisition with Google Ads for your product."
          trustText="Free 15-min strategy call · No commitment"
          buttonHref="#"
        />
      </div>
    </section>
  );
}
