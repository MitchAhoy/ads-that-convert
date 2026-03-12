"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { SCHEDULE_CALL_URL } from "@/lib/urls";
import FilloutPopupTrigger from "@/components/ui/FilloutPopupTrigger";

const sizeClasses = {
  desktop: "h-12 px-6 text-base",
  mobile: "h-14 px-6 text-base",
};

export default function ScheduleCallButton({
  url,
  href,
  className = "",
  onClick,
  size = "desktop",
  label = "Schedule a Call",
  variant = "primary",
}) {
  const destination = url ?? href ?? SCHEDULE_CALL_URL;
  const interactionType = destination === SCHEDULE_CALL_URL ? "fillout_popup" : "link";
  const variantClasses =
    variant === "secondary"
      ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
      : "bg-zinc-950 text-white hover:bg-zinc-800";
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-colors ${variantClasses} ${sizeClasses[size] ?? sizeClasses.desktop} ${className}`;
  const content = (
    <>
      <Image
        src="/google-meet-logo.png"
        alt=""
        width={size === "mobile" ? 20 : 18}
        height={size === "mobile" ? 20 : 18}
        aria-hidden="true"
      />
      <span className="text-inherit">{label}</span>
    </>
  );
  const handleClick = (event) => {
    onClick?.(event);

    if (event?.defaultPrevented) {
      return;
    }

    if (posthog.__loaded) {
      posthog.capture("schedule_call_clicked", {
        destination,
        interaction_type: interactionType,
        button_size: size,
        page_path: window.location.pathname,
      });
    }
  };

  if (destination === SCHEDULE_CALL_URL) {
    return (
      <FilloutPopupTrigger className={classes} onClick={handleClick}>
        {content}
      </FilloutPopupTrigger>
    );
  }

  return (
    <Link
      href={destination}
      onClick={handleClick}
      className={classes}
    >
      {content}
    </Link>
  );
}
