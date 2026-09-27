import ScheduleCallButton from "@/components/ui/ScheduleCallButton";

export default function CallToActionCard({
  id,
  eyebrow,
  title,
  description,
  trustText,
  buttonUrl,
  buttonHref,
  className = "",
}) {
  const destination = buttonUrl ?? buttonHref;

  return (
    <div
      className={`relative flex min-h-[360px] items-center overflow-hidden rounded-[28px] bg-surface p-8 sm:min-h-[400px] sm:py-16 sm:px-12 lg:py-22 lg:px-18 ${className}`}
    >
      <div
        aria-hidden="true"
        className="grain absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 30% 55% at 92% 25%, #93c5fd 0%, transparent 60%), radial-gradient(ellipse 35% 60% at 78% 85%, #f472c9 0%, transparent 60%), radial-gradient(ellipse 25% 45% at 70% 30%, #fdf0dc 0%, transparent 60%), linear-gradient(95deg, transparent 35%, #b48be3 75%, #8b9ef0 100%)",
          maskImage: "linear-gradient(90deg, transparent 30%, #000 80%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 30%, #000 80%)",
        }}
      />

      <div className="relative z-10 max-w-[600px]">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase leading-[1.4] tracking-[0.03em] text-body">{eyebrow}</p>
        ) : null}

        <h2 id={id} className="text-cta-h2 text-ink">
          {title}
        </h2>

        <p className="mt-5 max-w-[30em] text-lg leading-[1.5] text-body">{description}</p>

        <div className="mt-8.5 flex flex-wrap items-center gap-5">
          <ScheduleCallButton url={destination} className="shadow-[0_6px_18px_rgba(26,26,24,0.18)]" />
          {trustText ? <p className="whitespace-nowrap text-[15px] leading-[1.5] text-fine">{trustText}</p> : null}
        </div>
      </div>
    </div>
  );
}
