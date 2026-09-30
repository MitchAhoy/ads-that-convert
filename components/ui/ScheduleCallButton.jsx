"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import { SCHEDULE_CALL_URL } from "@/lib/urls";
import FilloutPopupTrigger from "@/components/ui/FilloutPopupTrigger";

const sizeClasses = {
  nav: "py-3.25 px-5.5 text-base",
  desktop: "py-4 px-6.5 text-base",
  mobile: "py-4.5 px-6 text-base",
};

const iconSize = {
  nav: 15,
  desktop: 16,
  mobile: 18,
};

const variantClassMap = {
  secondary: "bg-zinc-100 text-ink hover:bg-zinc-200",
  primary: "bg-ink text-white hover:bg-[#2d2d2a]",
};

export default function ScheduleCallButton({
  url,
  href,
  className = "",
  onClick,
  size = "desktop",
  label = "Schedule a call",
  variant = "primary",
}) {
  const destination = url ?? href ?? SCHEDULE_CALL_URL;
  const interactionType = destination === SCHEDULE_CALL_URL ? "fillout_popup" : "link";
  const variantClasses = variantClassMap[variant] ?? variantClassMap.primary;
  const classes = `inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-colors ${variantClasses} ${sizeClasses[size] ?? sizeClasses.desktop} ${className}`;
  const content = (
    <>
      <Image
        src="/google-meet-logo.png"
        alt=""
        width={iconSize[size] ?? iconSize.desktop}
        height={iconSize[size] ?? iconSize.desktop}
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
