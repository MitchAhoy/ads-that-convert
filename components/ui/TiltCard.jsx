"use client";

import { useRef } from "react";

// 3D pointer tilt with cursor glare, adapted from transitions.dev ("3D tilt").
// The pointer is tracked on the outer wrapper, which never transforms, so the
// tilting card can't rotate its own edges out from under the cursor. Rotation
// and glare position are written to CSS vars; see `.tilt-card` in globals.css.
// Mouse/pen only, so touch scrolling on mobile is left alone.
export default function TiltCard({
  as: Wrapper = "div",
  max = 16,
  className = "",
  style,
  children,
}) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const handleMove = (event) => {
    if (event.pointerType === "touch") return;
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const rect = wrap.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const py = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));

    card.classList.add("is-tilting");
    card.style.setProperty("--tilt-ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    card.style.setProperty("--tilt-rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    card.style.setProperty("--tilt-gx", `${(px * 100).toFixed(1)}%`);
    card.style.setProperty("--tilt-gy", `${(py * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("is-tilting");
    card.style.setProperty("--tilt-rx", "0deg");
    card.style.setProperty("--tilt-ry", "0deg");
  };

  return (
    <Wrapper ref={wrapRef} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <div ref={cardRef} className={`tilt-card h-full ${className}`} style={style}>
        {children}
        <div className="tilt-glare" aria-hidden="true" />
      </div>
    </Wrapper>
  );
}
