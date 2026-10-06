import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import TiltCard from "@/components/ui/TiltCard";

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
  className = "",
}) {
  const destination = buttonUrl ?? buttonHref;

  return (
    <TiltCard
      max={4}
      className={`relative flex min-h-[360px] items-center overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)] p-8 sm:min-h-[400px] sm:py-16 sm:px-12 lg:py-22 lg:px-18 ${className}`}
    >
      <div aria-hidden="true" className="grain cta-glow absolute inset-0" />

      <div className="relative z-10 max-w-[600px]">
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
    </TiltCard>
  );
}
