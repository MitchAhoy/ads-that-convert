"use client";

import { useState } from "react";
import Image from "next/image";
import useAnalyticsEnabled from "@/components/analytics/useAnalyticsEnabled";
import { focusRing } from "@/components/home/primitives";

// One video testimonial. Mux setup: an
// animated.webp preview, and the player is only loaded when play is pressed.
export default function HomeVideoCard({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(false);
  const [MuxPlayerComponent, setMuxPlayerComponent] = useState(null);
  const analyticsEnabled = useAnalyticsEnabled();

  const previewSrc = `https://image.mux.com/${video.playbackId}/animated.webp?width=640&end=6&fps=15`;

  const handlePlay = async () => {
    if (isPlaying || isLoadingPlayer) return;
    setIsLoadingPlayer(true);
    const muxPlayerModule = await import("@mux/mux-player-react");
    setMuxPlayerComponent(() => muxPlayerModule.default);
    setIsPlaying(true);
    setIsLoadingPlayer(false);
  };

  return (
    <article className="flex h-full flex-col gap-5.5">
      <div className="relative h-77.5 shrink-0 overflow-hidden rounded-[14px] bg-hp-tray shadow-[0_0_0_1px_rgba(14,15,17,0.06)]">
        {isPlaying && MuxPlayerComponent ? (
          <MuxPlayerComponent
            src={video.src}
            autoPlay
            muted
            controls
            playsInline
            disableTracking={!analyticsEnabled}
            className="h-full w-full"
          />
        ) : (
          <>
            {/* Mux animated previews are direct image URLs. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt={`${video.clientName}, ${video.companyName}, video testimonial preview`}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <button
              type="button"
              aria-label={`Play ${video.clientName}'s video testimonial`}
              onClick={handlePlay}
              className={`group absolute inset-0 rounded-[14px] ${focusRing}`}
            >
              <span className="absolute bottom-3.5 left-3.5 flex size-10 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(14,15,17,0.18)] transition-transform duration-200 group-hover:scale-105">
                {isLoadingPlayer ? (
                  <span className="size-3.5 animate-spin rounded-full border-2 border-hp-ink border-t-transparent" />
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5">
                    <path d="M7 4.5v15l13-7.5z" fill="#0E0F11" />
                  </svg>
                )}
              </span>
            </button>
          </>
        )}
      </div>

      <blockquote className="grow px-1 font-hp text-[17px]/6.25 font-medium tracking-[-0.01em] text-hp-ink">
        &quot;{video.quote}&quot;
      </blockquote>

      <div className="flex h-15.5 shrink-0 items-center justify-between gap-3 border-t border-hp-line-soft px-1 pt-4.5">
        <div className="flex flex-col">
          <p className="font-hp text-[15px]/5 font-medium text-hp-ink">{video.clientName}</p>
          <p className="font-hp text-sm/5 text-hp-fine">{video.role}</p>
        </div>
        <span className={`relative block shrink-0 ${video.logoBox}`}>
          <Image src={video.companyLogoSrc} alt={video.companyLogoAlt} fill sizes="128px" className="object-contain object-right" />
        </span>
      </div>
    </article>
  );
}
