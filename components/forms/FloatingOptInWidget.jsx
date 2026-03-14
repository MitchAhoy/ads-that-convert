"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import posthog from "posthog-js";

import HubSpotLeadForm from "@/components/forms/HubSpotLeadForm";

const DISMISS_KEY = "lead-magnet-optin-dismissed";

export default function FloatingOptInWidget({
  scrollThreshold = 280,
  triggerAfterId,
  mobileTriggerAfterId,
  title,
  description,
  trustText = "No spam. Just actionable Google Ads insights. Unsubscribe anytime.",
  offerSlug = "wasted-ad-spend",
  optInType = "lead_magnet",
  placement = "floating_bottom_right",
  formKey = "reduce-wasted-ad-spend",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(DISMISS_KEY) === "true";
  });
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const hasTrackedShownRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    function handleScroll() {
      const activeTriggerId =
        window.innerWidth < 768 && mobileTriggerAfterId ? mobileTriggerAfterId : triggerAfterId;
      const triggerElement = activeTriggerId ? document.getElementById(activeTriggerId) : null;
      const triggerPoint = triggerElement
        ? window.scrollY + triggerElement.getBoundingClientRect().bottom
        : scrollThreshold;
      const hasCrossedThreshold = window.scrollY > triggerPoint;

      if (hasCrossedThreshold) {
        setIsVisible(true);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileTriggerAfterId, scrollThreshold, triggerAfterId]);

  useEffect(() => {
    if (!isVisible || isDismissed) {
      return undefined;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      setIsAnimatedIn(true);
    });

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isDismissed, isVisible]);

  useEffect(() => {
    if (!isVisible || isDismissed || hasTrackedShownRef.current) {
      return;
    }

    if (posthog.__loaded) {
      posthog.capture("lead_magnet_optin_shown", {
        optin_type: optInType,
        offer_slug: offerSlug,
        offer_title: title,
        placement,
        form_key: formKey,
      });
    }

    hasTrackedShownRef.current = true;
  }, [formKey, isDismissed, isVisible, offerSlug, optInType, placement, title]);

  useEffect(() => {
    if (!isClosing) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setIsDismissed(true);
      setIsClosing(false);
    }, 260);

    return () => window.clearTimeout(timeoutId);
  }, [isClosing]);

  function dismissWidget() {
    if (isClosing) {
      return;
    }

    if (posthog.__loaded) {
      posthog.capture("lead_magnet_optin_dismissed", {
        optin_type: optInType,
        offer_slug: offerSlug,
        offer_title: title,
        placement,
        form_key: formKey,
      });
    }

    setIsAnimatedIn(false);
    setIsClosing(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_KEY, "true");
    }
  }

  function handleFormSuccess() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_KEY, "true");
    }
  }

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center p-3 md:inset-auto md:bottom-4 md:right-4 md:block md:p-0">
      <div aria-hidden="true" className="absolute inset-0 bg-white/40 backdrop-blur-[8px] md:hidden" />
      <div className="pointer-events-auto relative w-[min(420px,calc(100vw-1.25rem))] md:w-[min(420px,calc(100vw-2rem))]">
        <div
          className={`relative max-h-[calc(100vh-2rem)] origin-bottom-right overflow-y-auto rounded-[26px] border border-[#d7d9df] bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(246,247,249,0.96)_48%,rgba(236,238,241,0.98))] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.88)] transition duration-300 ease-out motion-reduce:transition-none sm:p-6 ${
            isClosing
              ? "translate-y-2 -rotate-[22deg] scale-[0.95] opacity-0"
              : isAnimatedIn
                ? "translate-x-0 translate-y-0 scale-100 opacity-100"
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

          <h2
            className="max-w-[30ch] pr-12 font-semibold tracking-[0] text-zinc-950"
            style={{
              fontSize: "1.5rem",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h2>
          <p className="mt-3 max-w-[36ch] text-base sm:text-md text-zinc-700">{description}</p>
          <div className="mt-4 h-px w-full bg-gradient-to-r from-[#122338]/30 via-zinc-300/70 to-transparent" />

          <HubSpotLeadForm
            formKey={formKey}
            className="mt-5"
            submitLabel="Show me where I'm wasting money"
            successMessage="Sent. Broad match just saw its life flash before its eyes."
            emailLabel="Work email"
            buttonClassName="mt-1"
            analyticsEventBase="lead_magnet_optin"
            analyticsProperties={{
              optin_type: optInType,
              offer_slug: offerSlug,
              offer_title: title,
              placement,
            }}
            collapseOnSuccess
            hideControlsOnSuccess
            onSuccess={handleFormSuccess}
          />

          {trustText ? (
            <p className="mt-1 max-w-full text-[0.6875rem] leading-[1.35] tracking-[-0.005em] text-zinc-600 sm:text-xs">
              {trustText}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
