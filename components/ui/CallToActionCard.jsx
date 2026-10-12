import Image from "next/image";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import TiltCard from "@/components/ui/TiltCard";
import { textTestimonials } from "@/components/sections/testimonialsData";

// Proof beside the last decision on the page: one short client line with a face.
const defaultProof = textTestimonials.find((testimonial) => testimonial.name === "Jordon Chavis");

export default function CallToActionCard({
  id,
  eyebrow,
  title,
  description,
  trustText,
  buttonUrl,
  buttonHref,
  // Replaces the booking button where the visitor has already booked (/call-confirmation).
  action,
  // Pass `null` to drop the client quote.
  proof = defaultProof,
  className = "",
}) {
  const destination = buttonUrl ?? buttonHref;

  return (
    <TiltCard
      max={4}
      className={`relative flex min-h-[360px] flex-col justify-center gap-9 overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)] p-8 sm:min-h-[400px] sm:py-16 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:py-22 lg:px-18 ${className}`}
    >
      <div aria-hidden="true" className="grain cta-glow absolute inset-0" />

      <div className="relative z-10 max-w-[600px] min-w-0 lg:flex-1">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase leading-[1.4] tracking-[0.03em] text-body">{eyebrow}</p>
        ) : null}

        <h2 id={id} className="font-display text-cta-h2 text-ink">
          {title}
        </h2>

        <p className="mt-5 max-w-[30em] text-lg leading-[1.5] text-body">{description}</p>

        <div className="mt-8.5 flex flex-wrap items-center gap-5">
          {action ?? <ScheduleCallButton url={destination} className="shadow-[0_6px_18px_rgba(26,26,24,0.18)]" />}
          {trustText ? <p className="whitespace-nowrap text-sm leading-[1.5] text-fine">{trustText}</p> : null}
        </div>
      </div>

      {proof ? (
        <figure className="relative z-10 border-t border-border pt-7 lg:w-[290px] lg:shrink-0 lg:border-t-0 lg:border-l lg:py-2 lg:pl-10">
          <blockquote className="text-lg font-medium leading-[1.5] text-ink text-pretty">
            &ldquo;{proof.highlight ?? proof.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <Image
              src={proof.avatarSrc}
              alt={proof.name}
              width={88}
              height={88}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-base font-bold leading-[1.4] tracking-[-0.03em] text-ink">{proof.name}</p>
              <p className="text-sm leading-[1.5] text-fine">{proof.role}</p>
            </div>
          </figcaption>
        </figure>
      ) : null}
    </TiltCard>
  );
}
