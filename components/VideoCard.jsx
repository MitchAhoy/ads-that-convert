"use client";

import Image from "next/image";
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
    <article className="rounded-[1.5rem] border border-zinc-200 bg-zinc-100/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-4">
      <div className="relative aspect-video overflow-hidden rounded-[1.1rem] bg-zinc-200">
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
              className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black/55 text-white">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-6 w-6 fill-current"
                >
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.29-6.86a1 1 0 0 0 0-1.66L9.53 4.29A1 1 0 0 0 8 5.14z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>

      {quote ? (
        <blockquote className="mt-4 text-base leading-[1.6] text-zinc-800 italic">
          &quot;{quote}&quot;
        </blockquote>
      ) : null}

      <div className="mt-4 border-t border-zinc-300 pt-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-base font-semibold leading-[1.4] text-zinc-900">
              {clientName || title || "Client Name"}
            </p>
            <p className="text-base leading-[1.5] text-zinc-600">
              {clientPosition || "Position"}
            </p>
          </div>

          {companyLogoSrc ? (
            <Image
              src={companyLogoSrc}
              alt={companyLogoAlt || `${companyName || "Company"} logo`}
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
