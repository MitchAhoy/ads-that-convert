import Link from "next/link";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Full-width plan button: primary pill on the recommended plan, outline pill
// (DESIGN.md §8) everywhere else.
export default function PlanCta({ ctaHref, ctaLabel, highlighted = false }) {
  if (ctaHref === SCHEDULE_CALL_URL) {
    return (
      <ScheduleCallButton
        url={ctaHref}
        className={highlighted ? "w-full sm:w-auto" : "w-full"}
        label={ctaLabel}
        variant={highlighted ? "primary" : "secondary"}
      />
    );
  }

  return (
    <Link
      href={ctaHref}
      className="inline-flex w-full items-center justify-center rounded-full bg-white px-6.5 py-4 text-base font-semibold text-ink ring-1 ring-ink ring-inset transition-colors hover:bg-surface"
    >
      {ctaLabel}
    </Link>
  );
}
