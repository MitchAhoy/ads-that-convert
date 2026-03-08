"use client";

import { useState } from "react";
import { FilloutPopupEmbed } from "@fillout/react";
import { SCHEDULE_CALL_FILL_OUT_ID } from "@/lib/urls";

export default function FilloutPopupTrigger({
  children,
  className = "",
  onClick,
  filloutId = SCHEDULE_CALL_FILL_OUT_ID,
  width = 1080,
  height = 760,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event) => {
    onClick?.(event);

    if (event?.defaultPrevented) {
      return;
    }

    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      <FilloutPopupEmbed
        filloutId={filloutId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        inheritParameters
        width={width}
        height={height}
      />
    </>
  );
}
