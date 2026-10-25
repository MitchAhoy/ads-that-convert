"use client";

import { useEffect, useState } from "react";
import useInView from "@/lib/hooks/useInView";

// Counts a metric like "$2,219" or "2x" up from zero when it scrolls into
// view, adapted from transitions.dev ("Number pop-in"). The server render and
// screen readers get the final value; an invisible copy of it reserves the
// width so the layout never shifts while the digits change.
const DURATION = 1400;

function parse(value) {
  const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  const decimals = number.includes(".") ? number.split(".")[1].length : 0;
  return { prefix, suffix, target: Number(number.replace(/,/g, "")), decimals, grouped: number.includes(",") };
}

function format(n, { decimals, grouped }) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}

// easeOutExpo: fast start, long settle, so the final digits land gently.
const ease = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

export default function CountUp({ value, className = "" }) {
  const parsed = parse(value);
  const [ref, inView] = useInView({ threshold: 0.6 });
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  // Reset to zero after hydration (so no-JS and SSR still show the real value),
  // unless the viewer prefers reduced motion.
  useEffect(() => {
    if (!parsed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay(`${parsed.prefix}${format(0, parsed)}${parsed.suffix}`);
    setArmed(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!armed || !inView) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      const n = parsed.target * ease(t);
      const rounded = parsed.decimals ? n : Math.round(n);
      setDisplay(`${parsed.prefix}${format(rounded, parsed)}${parsed.suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, inView]);

  return (
    <span ref={ref} className={`relative inline-block tabular-nums ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible">
        {value}
      </span>
      <span aria-hidden="true" className="absolute inset-y-0 left-0 whitespace-nowrap">
        {display}
      </span>
    </span>
  );
}
