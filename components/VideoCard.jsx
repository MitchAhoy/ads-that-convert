"use client";

import { useMemo, useState } from "react";

export default function VideoCard({
  playbackId,
  src,
  title,
  quote,
  clientName,
  clientPosition,
  companyName,
  companyLogoSrc,
  companyLogoAlt,
  companyLogoClassName,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingPlayer, setIsLoadingPlayer] = useState(false);
  const [MuxPlayerComponent, setMuxPlayerComponent] = useState(null);

  const previewSrc = useMemo(
    () => `https://image.mux.com/${playbackId}/animated.webp?width=640&end=6&fps=15`,
    [playbackId]
  );

  const handlePlay = async () => {
    if (isPlaying || isLoadingPlayer) return;

    setIsLoadingPlayer(true);
    const muxPlayerModule = await import("@mux/mux-player-react");
    setMuxPlayerComponent(() => muxPlayerModule.default);
    setIsPlaying(true);
    setIsLoadingPlayer(false);
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white px-2 pt-2 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]">
      <div className="relative h-47.5 overflow-hidden rounded-[18px] bg-surface">
        {isPlaying && MuxPlayerComponent ? (
          <MuxPlayerComponent
            src={src}
            autoPlay
            muted
            controls
            playsInline
            className="h-full w-full"
          />
        ) : (
          <>
            {/* Mux animated previews are delivered as direct image URLs. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewSrc}
              alt={title ? `${title} video preview` : "Video testimonial preview"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <button
              type="button"
              aria-label={title ? `Play ${title}` : "Play video"}
              onClick={handlePlay}
              className="group absolute inset-0"
            >
              <span className="absolute bottom-3.5 left-3.5 inline-flex h-11.5 w-11.5 items-center justify-center rounded-full bg-white/94 shadow-[0_1px_2px_rgba(26,26,24,0.08),0_6px_16px_rgba(26,26,24,0.16)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-0.5 h-4.5 w-4.5 fill-ink">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.29-6.86a1 1 0 0 0 0-1.66L9.53 4.29A1 1 0 0 0 8 5.14z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pt-5.5 pb-6">
        {quote ? (
          <blockquote className="grow text-copy leading-normal text-body">
            &quot;{quote}&quot;
          </blockquote>
        ) : null}

        <div className="mt-auto pt-5">
          <div className="border-t border-border pt-4">
            <p className="text-lg font-bold leading-normal tracking-[-0.03em] text-ink">
              {clientName || title || "Client Name"}
            </p>
            <p className="text-sm leading-normal text-fine">
              {clientPosition || "Position"}
            </p>
            {companyLogoSrc ? (
              // Fixed-height slot keeps every card's footer the same height, so
              // the dividers line up even when a logo is nudged via its className.
              <div className="mt-4 h-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={companyLogoSrc}
                  alt={companyLogoAlt || `${companyName || "Company"} logo`}
                  className={companyLogoClassName ?? "h-8 w-auto object-contain object-left"}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
