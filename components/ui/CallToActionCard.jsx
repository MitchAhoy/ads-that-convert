import ScheduleCallButton from "@/components/ui/ScheduleCallButton";

export default function CallToActionCard({
  id,
  eyebrow,
  title,
  description,
  trustText,
  buttonHref = "#",
  className = "",
}) {
  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/90 px-6 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:px-8 sm:py-12 ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[#122338]/90 via-[#122338]/35 to-transparent"
      />

      {eyebrow ? (
        <p className="text-sm font-semibold uppercase leading-[1.4] tracking-[0.03em] text-[#122338]/75">{eyebrow}</p>
      ) : null}

      <h2
        id={id}
        className="mt-3 font-serif text-[clamp(2.25rem,5vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#122338]"
      >
        {title}
      </h2>

      <p className="mt-5 max-w-[480px] text-base leading-[1.6] text-zinc-700">{description}</p>

      <div className="mt-7">
        <ScheduleCallButton href={buttonHref} />
      </div>

      {trustText ? <p className="mt-4 text-sm leading-[1.5] text-zinc-500">{trustText}</p> : null}
    </div>
  );
}
