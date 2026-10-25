"use client";

import { useEffect, useRef } from "react";
import "./reveal.css";

// Scroll-in animation for homepage illustrations (DESIGN.md §16.7).
// Children opt in with the `rv*` classes in reveal.css, staggered by `--rv-i`.
// The server renders everything visible; only after hydration, and only for
// illustrations still below the fold, are they hidden and then revealed once
// they scroll into view. Reduced-motion users see them static.
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    // Already on screen: leave it alone rather than flashing it out and back in.
    if (el.getBoundingClientRect().top < window.innerHeight) return undefined;

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      // The tall top margin also counts anything just scrolled past (e.g. a
      // fast flick that skips over it), so nothing is left hidden.
      { rootMargin: "100% 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
