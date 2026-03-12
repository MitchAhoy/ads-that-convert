"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import HubSpotLeadForm from "@/components/forms/HubSpotLeadForm";

export default function FloatingOptInWidget({
  scrollThreshold = 280,
  title,
  description,
  trustText,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function handleScroll() {
      const hasCrossedThreshold = window.scrollY > scrollThreshold;

      if (hasCrossedThreshold) {
        setIsVisible(true);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed, scrollThreshold]);

  useEffect(() => {
    if (!isVisible || isDismissed) {
      return undefined;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      setIsAnimatedIn(true);
    });

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isDismissed, isVisible]);

  function dismissWidget() {
    setIsAnimatedIn(false);
    setIsDismissed(true);
  }

  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 hidden w-[min(420px,calc(100vw-2rem))] md:block">
      <div className="pointer-events-auto">
        <div
          className={`relative max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[26px] border border-[#d7d9df] bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(246,247,249,0.96)_48%,rgba(236,238,241,0.98))] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.88)] transition duration-300 ease-out motion-reduce:transition-none sm:p-6 ${
            isAnimatedIn
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-[0.985] opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100"
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-1 w-28 rounded-tr-2xl bg-gradient-to-r from-[#122338] via-[#122338]/60 to-transparent"
          />
          <button
            type="button"
            onClick={dismissWidget}
            className="absolute right-3 top-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center text-zinc-500 transition-colors hover:text-zinc-900"
            aria-label="Dismiss opt-in"
          >
            <X className="h-5 w-5 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:hover:rotate-[360deg]" />
          </button>

          <h2 className="max-w-[16ch] pr-12 text-[clamp(1.45rem,2.6vw,1.95rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-zinc-950">
            {title}
          </h2>
          <p className="mt-3 max-w-[36ch] text-base sm:text-md text-zinc-700">{description}</p>
          <div className="mt-4 h-px w-full bg-gradient-to-r from-[#122338]/30 via-zinc-300/70 to-transparent" />

          <HubSpotLeadForm
            className="mt-5"
            submitLabel="Get the guide"
            successMessage="Success. The test lead was sent to HubSpot."
            emailLabel="Work email"
            buttonClassName="mt-1"
          />

          {trustText ? <p className="mt-1 max-w-[34ch] text-sm leading-[1.5] text-zinc-600">{trustText}</p> : null}
        </div>
      </div>
    </div>
  );
}
