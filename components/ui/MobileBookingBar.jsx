"use client";

import { useEffect, useState } from "react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Below `lg` the nav has no booking button, so this floating pill keeps
// "Book a 15-min call" in reach while scrolling. It hides whenever an element
// marked `data-booking-cta-zone` (hero, final CTA, footer) is on screen, so
// it never doubles up with a button that's already visible.
// `buttonProps` restyles the button (the homepage passes its own variant).
export default function MobileBookingBar({ buttonProps }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const zones = document.querySelectorAll("[data-booking-cta-zone]");
    if (zones.length === 0 || typeof IntersectionObserver === "undefined") return undefined;

    const onScreen = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setIsVisible(onScreen.size === 0);
    });

    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      inert={!isVisible}
      className={`fixed inset-x-4 bottom-4 z-30 pb-[env(safe-area-inset-bottom)] transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 lg:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ScheduleCallButton
        url={SCHEDULE_CALL_URL}
        size="mobile"
        className="w-full shadow-[0_2px_4px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.08)] sm:w-auto"
        {...buttonProps}
      />
    </div>
  );
}
