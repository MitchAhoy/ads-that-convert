"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const INITIAL_DELAY_MS = 800;
const ROTATE_INTERVAL_MS = 3000;

function buildExcerpt(text, maxLength = 72) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "").trim()}...`;
}

function pickRandomIndex(count, exclude) {
  if (count <= 1) return 0;
  let next = Math.floor(Math.random() * (count - 1));
  if (next >= exclude) next += 1;
  return next;
}

// Keep bubbles at the ends of the stack from overflowing the viewport by
// anchoring them to the avatar's outer edge instead of centring them.
function bubblePosition(index, count) {
  if (index < 2) {
    return { bubble: "left-0 origin-top-left", arrow: "left-5 -translate-x-1/2" };
  }
  if (index > count - 3) {
    return { bubble: "right-0 origin-top-right", arrow: "right-5 translate-x-1/2" };
  }
  return {
    bubble: "left-1/2 -translate-x-1/2 origin-top",
    arrow: "left-1/2 -translate-x-1/2",
  };
}

export default function ClientTestimonialAvatarStack({
  clients = [],
  trustText = "",
  ctaText = "View client results",
  ctaHref = "/results",
  maxVisible = 7,
  className = "",
}) {
  const visibleClients = clients.slice(0, maxVisible);
  const count = visibleClients.length;
  const [autoIndex, setAutoIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    if (count === 0 || hoverIndex !== null) return undefined;

    // The random pick only happens client-side (avoids a hydration mismatch);
    // the first bubble shows shortly after mount, then rotates every interval.
    const id = setTimeout(
      () => setAutoIndex((current) => pickRandomIndex(count, current ?? -1)),
      autoIndex === null ? INITIAL_DELAY_MS : ROTATE_INTERVAL_MS,
    );

    return () => clearTimeout(id);
  }, [count, hoverIndex, autoIndex]);

  if (count === 0) {
    return null;
  }

  const activeIndex = hoverIndex ?? autoIndex;

  // Leave the bubble on the avatar the visitor just left rather than snapping
  // back to the last auto-rotated one; rotation resumes from there.
  const releaseHover = (index) => {
    setAutoIndex(index);
    setHoverIndex(null);
  };

  return (
    <div className={`flex shrink-0 flex-col items-start gap-2 ${className}`}>
      <ul className="flex items-center">
        {visibleClients.map((client, index) => {
          const excerpt = client.highlight || buildExcerpt(client.quote);
          const isActive = index === activeIndex;
          const position = bubblePosition(index, count);

          return (
            <li
              key={client.name}
              className={`relative first:ml-0 -ml-3 ${isActive ? "z-20" : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => releaseHover(index)}
              onFocus={() => setHoverIndex(index)}
              onBlur={() => releaseHover(index)}
            >
              <button
                type="button"
                className="relative block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label={`${client.name}: ${excerpt}`}
              >
                <Image
                  src={client.avatarSrc}
                  alt={client.name}
                  width={56}
                  height={56}
                  className="h-11 w-11 rounded-full border-2 border-white bg-surface object-cover"
                />
              </button>

              <div
                aria-hidden="true"
                className={`pointer-events-none absolute top-full mt-3 w-56 rounded-xl bg-ink px-3 py-2 shadow-lg transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:translate-y-0 ${position.bubble} ${
                  isActive
                    ? "z-10 translate-y-0 opacity-100 delay-100"
                    : "z-0 -translate-y-1 opacity-0"
                }`}
              >
                <p className="text-base leading-[1.5] text-white">{`"${excerpt}"`}</p>
                <div
                  className={`absolute bottom-full h-2 w-2 translate-y-1/2 rotate-45 bg-ink ${position.arrow}`}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {trustText ? (
        <p className="text-sm leading-[1.5] text-zinc-700">{trustText}</p>
      ) : null}

      {ctaText ? (
        <a
          href={ctaHref}
          className="inline-block whitespace-nowrap self-center text-center text-sm leading-[1.5] text-[#0c2237] underline underline-offset-4"
        >
          {ctaText}
        </a>
      ) : null}
    </div>
  );
}
