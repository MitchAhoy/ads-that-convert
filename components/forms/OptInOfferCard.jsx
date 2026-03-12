import { CheckCircle2 } from "lucide-react";

import HubSpotLeadForm from "@/components/forms/HubSpotLeadForm";

export default function OptInOfferCard({
  title,
  description,
  bullets = [],
  formKey = "reduce-wasted-ad-spend",
  submitLabel = "Get the guide",
  trustText,
  imageEyebrow = "Preview",
  imageTitle = "Guide preview",
  imageCaption = "A compact lead magnet mockup that can be swapped for a real cover later.",
  showFirstName = false,
  onSuccess,
  compact = false,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-zinc-200 bg-zinc-100/90 shadow-[0_18px_60px_rgba(24,24,27,0.12),inset_0_1px_0_rgba(255,255,255,0.75)] ${
        compact ? "p-5 sm:p-6" : "p-5 sm:p-6 lg:p-7"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-[#122338]/80 via-[#122338]/25 to-transparent"
      />

      <div className={`grid gap-6 ${compact ? "lg:grid-cols-[minmax(0,1.2fr)_220px]" : "lg:grid-cols-[minmax(0,1.25fr)_280px]"}`}>
        <div>
          <p className="text-sm font-semibold uppercase leading-[1.4] tracking-[0.03em] text-[#122338]/70">
            Free download
          </p>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-zinc-950">
            {title}
          </h2>
          <p className="mt-4 max-w-[58ch] text-base sm:text-md text-zinc-700">{description}</p>

          {bullets.length > 0 ? (
            <ul className="mt-5 space-y-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-base text-zinc-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#122338]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6">
            <HubSpotLeadForm
              formKey={formKey}
              submitLabel={submitLabel}
              successMessage="Success. The test lead was sent to HubSpot."
              showFirstName={showFirstName}
              onSuccess={onSuccess}
            />
          </div>

          {trustText ? <p className="mt-2 text-sm text-zinc-600">{trustText}</p> : null}
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <div className="relative w-full max-w-[280px]">
            <div className="absolute inset-x-8 bottom-[-24px] h-10 rounded-full bg-[#122338]/15 blur-2xl" />
            <div className="relative rotate-[9deg] rounded-[28px] border border-zinc-300 bg-white px-6 py-10 shadow-[0_20px_50px_rgba(18,35,56,0.16)]">
              <p className="text-sm font-semibold uppercase leading-[1.4] tracking-[0.03em] text-[#122338]/65">
                {imageEyebrow}
              </p>
              <div className="mt-8 rounded-[24px] border border-dashed border-zinc-300 bg-zinc-100/80 px-6 py-12 text-center">
                <p className="text-xl font-medium leading-[1.25] tracking-[-0.02em] text-zinc-900">{imageTitle}</p>
              </div>
              <p className="mt-6 text-sm leading-[1.5] text-zinc-600">{imageCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
