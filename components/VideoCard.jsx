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
    <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-2.5">
      <div className="relative h-47.5 overflow-hidden rounded-lg bg-zinc-100">
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
              className="absolute inset-0"
            >
              <span className="absolute bottom-3.5 left-3.5 inline-flex h-11.5 w-11.5 items-center justify-center rounded-full bg-white/94">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-0.5 h-4.5 w-4.5 fill-ink">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.29-6.86a1 1 0 0 0 0-1.66L9.53 4.29A1 1 0 0 0 8 5.14z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        {quote ? (
          <blockquote className="grow text-base leading-normal text-body">
            &quot;{quote}&quot;
          </blockquote>
        ) : null}

        <div className="mt-auto pt-4">
          <div className="border-t border-border pt-3.5">
            <p className="text-lg font-bold leading-normal tracking-[-0.03em] text-ink">
              {clientName || title || "Client Name"}
            </p>
            <p className="text-sm leading-normal text-muted">
              {clientPosition || "Position"}
            </p>
            {companyLogoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={companyLogoSrc}
                alt={companyLogoAlt || `${companyName || "Company"} logo`}
                className={companyLogoClassName ?? "mt-4 h-8 w-auto object-contain object-left"}
              />
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
