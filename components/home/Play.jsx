"use client";

import { useEffect, useRef } from "react";
import "./play.css";

// Like Reveal, but for bespoke one-off animations (DESIGN.md §16.7). Sets
// `data-play` to "ready" after hydration if the element is still below the
// fold, then "play" once it scrolls into view. CSS in play.css keys off it;
// `onReady`/`onPlay` run any JS-driven part (count-ups, typing). The server
// renders the finished state, and reduced-motion users keep it.
export default function Play({ as: Tag = "span", className = "", onReady, onPlay, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight) return undefined;

    el.dataset.play = "ready";
    onReady?.(el);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.play = "play";
        onPlay?.(el);
        observer.disconnect();
      },
      { rootMargin: "100% 0px -14% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // Runs once on mount; the callbacks are stable module-level functions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
