"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { focusRing } from "@/components/home/primitives";

// Same timing as the pre-redesign hero: first quote 3s after load, then a new
// random one every 3s.
const INITIAL_DELAY_MS = 3000;
const ROTATE_INTERVAL_MS = 3000;

function pickRandomIndex(count, exclude) {
  if (count <= 1) return 0;
  let next = Math.floor(Math.random() * (count - 1));
  if (next >= exclude) next += 1;
  return next;
}

// Keep tooltips at the ends of the stack inside the viewport by anchoring
// them to the avatar's outer edge instead of centring them.
function tooltipPosition(index, count) {
  if (index < 2) return { box: "left-0", arrow: "left-3" };
  if (index > count - 3) return { box: "right-0", arrow: "right-3" };
  return { box: "left-1/2 -translate-x-1/2", arrow: "left-1/2 -translate-x-1/2" };
}

// Hero client avatars. Quotes pop up on their own at random; hover or keyboard
// focus shows a chosen client's quote (pausing the rotation), and on touch
// screens a tap toggles it.
export default function HomeAvatarStack({ clients }) {
  const count = clients.length;
  // The quote the visitor opened, which wins over the auto-rotating one.
  const [userIndex, setUserIndex] = useState(null);
  const [autoIndex, setAutoIndex] = useState(null);
  // How the current press started, and whether its tooltip was already open
  // (on touch, focus opens it before the click arrives).
  const press = useRef({ type: "keyboard", wasOpen: false });
  const listRef = useRef(null);

  // Auto-rotate while the visitor isn't interacting. The random pick only runs
  // client-side, so there's no hydration mismatch.
  useEffect(() => {
    if (count === 0 || userIndex !== null) return undefined;
    const id = setTimeout(
      () => setAutoIndex((current) => pickRandomIndex(count, current ?? -1)),
      autoIndex === null ? INITIAL_DELAY_MS : ROTATE_INTERVAL_MS,
    );
    return () => clearTimeout(id);
  }, [count, userIndex, autoIndex]);

  // Tapping anywhere else closes an open tooltip.
  useEffect(() => {
    if (userIndex === null) return undefined;
    const onPointerDown = (event) => {
      if (!listRef.current?.contains(event.target)) {
        setUserIndex(null);
        setAutoIndex(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [userIndex]);

  const activeIndex = userIndex ?? autoIndex;
  const setActiveIndex = setUserIndex;

  return (
    <ul ref={listRef} className="flex items-center pl-2.5" aria-label="Clients">
      {clients.map((client, index) => {
        const isActive = index === activeIndex;
        const position = tooltipPosition(index, clients.length);
        const tooltipId = `hero-client-quote-${index}`;

        return (
          <li
            key={client.name}
            className={`relative -ml-2.5 ${isActive ? "z-20" : ""}`}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActiveIndex(index);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== "mouse") return;
              // Leave this quote showing; rotation resumes from here.
              setAutoIndex(index);
              setActiveIndex((current) => (current === index ? null : current));
            }}
          >
            <button
              type="button"
              aria-describedby={tooltipId}
              aria-expanded={isActive}
              className={`relative block rounded-full ${focusRing}`}
              onPointerDown={(event) => {
                press.current = { type: event.pointerType, wasOpen: activeIndex === index };
              }}
              onClick={() => {
                const { type, wasOpen } = press.current;
                press.current = { type: "keyboard", wasOpen: false };
                if (type === "mouse") {
                  // Hover already opened it; keep it open.
                  setActiveIndex(index);
                } else {
                  // Keyboard, touch or pen: a press toggles. Closing also clears
                  // the auto quote so it doesn't reappear underneath.
                  const open = type === "keyboard" ? userIndex !== index : !wasOpen;
                  setActiveIndex(open ? index : null);
                  if (!open) setAutoIndex(null);
                }
              }}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex((current) => (current === index ? null : current))}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setActiveIndex(null);
                  setAutoIndex(null);
                }
              }}
            >
              <Image
                src={client.avatarSrc}
                alt={client.name}
                width={68}
                height={68}
                className="size-8.5 rounded-full border-2 border-white bg-hp-tray object-cover"
              />
            </button>

            <div
              id={tooltipId}
              role="tooltip"
              className={`pointer-events-none absolute top-full mt-2.5 w-56 rounded-lg bg-hp-ink px-3 py-2 text-left shadow-[0_8px_24px_rgba(14,15,17,0.18)] transition-[opacity,translate,visibility] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:translate-y-0 ${position.box} ${
                isActive ? "visible translate-y-0 opacity-100 delay-100" : "invisible -translate-y-1 opacity-0"
              }`}
            >
              <span aria-hidden="true" className={`absolute bottom-full size-2 translate-y-1/2 rotate-45 bg-hp-ink ${position.arrow}`} />
              <span className="relative block font-hp text-sm/5 text-white">&quot;{client.highlight}&quot;</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
