import Link from "next/link";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import TiltCard from "@/components/ui/TiltCard";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Gradient is illustration-only colour, masked in from the right so the copy
// side stays on the soft surface.
const gradient =
  "radial-gradient(ellipse 22% 45% at 57% 30%, #f4fbf6 0%, transparent 70%), radial-gradient(ellipse 18% 40% at 92% 25%, #dcef55 0%, transparent 65%), radial-gradient(ellipse 30% 45% at 63% 0%, #5ed3dc 0%, transparent 70%), radial-gradient(ellipse 30% 30% at 72% 55%, #6fd6d6 0%, transparent 70%), radial-gradient(ellipse 18% 35% at 67% 90%, #cfd4fb 0%, transparent 70%), radial-gradient(ellipse 35% 60% at 100% 85%, #62a9ea 0%, transparent 70%), linear-gradient(90deg, #eef3f1 40%, #b9e3ec 70%, #86c3ee 100%)";

export default function PricingCta() {
  return (
    <section aria-labelledby="pricing-cta-title" className="py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6">
        <TiltCard max={4} className="relative overflow-hidden rounded-[28px] bg-surface p-8 sm:px-12 lg:px-18 lg:py-11">
          <div
            aria-hidden="true"
            className="grain absolute inset-0"
            style={{
              background: gradient,
              maskImage: "linear-gradient(90deg, transparent 36%, #000 66%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 36%, #000 66%)",
            }}
          />

          <div className="relative z-10 max-w-[600px]">
            <h2 id="pricing-cta-title" className="font-display text-h2 text-ink">
              From $1,500 per month
            </h2>
            <p className="mt-4 text-lg leading-[1.5] text-body">No minimum term or lock-in contracts.</p>

            <div className="mt-8.5 flex flex-wrap items-center gap-5">
              <ScheduleCallButton
                url={SCHEDULE_CALL_URL}
                label="Book a 15-min call"
                className="shadow-[0_6px_18px_rgba(26,26,24,0.18)]"
              />
              <Link href="/pricing" className="border-b border-ink px-1 py-3.75 text-base font-semibold text-ink">
                See pricing
              </Link>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
