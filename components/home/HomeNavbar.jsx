"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { BookButton, Eyebrow, focusRing } from "@/components/home/primitives";
import { serviceIcons } from "@/components/services/serviceIcons";
import { services } from "@/lib/services";
import { tools } from "@/lib/tools/toolRegistry";

// Homepage nav (DESIGN.md §16). Same links and behaviour as the shared
// Navbar: dropdowns open on hover or keyboard focus on desktop, and the
// mobile menu is a full-screen overlay (services grid, page rows, a tools
// accordion and a pinned booking panel).

const navLinks = [
  { label: "Results", href: "/results" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
];

// Order of the Services dropdown and the mobile services grid.
const serviceOrder = ["google-ads", "meta-ads", "microsoft-ads", "linkedin-ads", "chatgpt-ads"];

const serviceLinks = [...services]
  .sort((a, b) => serviceOrder.indexOf(a.slug) - serviceOrder.indexOf(b.slug))
  .map((service) => ({
  label: service.name,
  href: `/services/${service.slug}`,
  Icon: serviceIcons[service.slug],
}));

const toolLinks = tools.map((tool) => ({
  label: tool.name,
  href: `/tools/${tool.slug}`,
}));

// Three dots narrowing from traffic to conversions; the last one (the
// conversion) is the accent blue. The viewBox is cropped to the shape's
// edges so the mark matches the wordmark's height. Same mark as
// public/favicon.svg and the PNGs made by scripts/generate-logo-assets.mjs.
function LogoMark({ className }) {
  return (
    <svg viewBox="11 28 73 51" className={className} fill="none" aria-hidden="true">
      <path d="M28 62 L52 40" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
      <path d="M52 40 L74 58" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
      <circle cx="28" cy="62" r="15" fill="currentColor" />
      <circle cx="52" cy="40" r="10" fill="currentColor" />
      <circle cx="74" cy="58" r="8" className="fill-hp-accent" />
    </svg>
  );
}

export function HomeLogo({ size = "md" }) {
  const small = size === "sm";
  return (
    <span className={`inline-flex items-center text-hp-ink ${small ? "gap-2" : "gap-2.25"}`}>
      <LogoMark className={small ? "h-4 w-5.75" : "h-4.75 w-6.75"} />
      <span className={`font-hp font-bold tracking-[-0.03em] ${small ? "text-[17px]/5.5" : "text-lg/6"}`}>
        adsthatconvert
      </span>
    </span>
  );
}

// Hand-drawn chevron for the nav dropdowns: uneven arms and a soft, slightly
// off-centre tip so it reads as drawn rather than a system glyph.
function SketchChevron({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.4 4.6c1.1.9 2.3 2.2 3.3 3.5.2.3.5.3.7 0 .9-1.4 2-2.6 3.3-3.9" />
    </svg>
  );
}

function NavDropdown({ label, links, widthClassName }) {
  // The panel opens on CSS hover/focus, which would keep it open after a
  // click (the cursor is still over it and the link keeps focus). Clicking a
  // link dismisses it until the pointer leaves or the trigger is refocused.
  const [dismissed, setDismissed] = useState(false);

  const handleLinkClick = () => {
    setDismissed(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  };

  const openClasses = dismissed
    ? ""
    : "group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100";

  return (
    <li className="group relative" onMouseLeave={() => setDismissed(false)}>
      <button
        type="button"
        aria-haspopup="true"
        onFocus={() => setDismissed(false)}
        className={`inline-flex items-center gap-1 rounded font-hp text-sm/5 font-medium text-hp-body transition-colors group-focus-within:text-hp-ink group-hover:text-hp-ink ${focusRing}`}
      >
        {label}
        <SketchChevron className="mt-px size-3 text-hp-muted transition-[transform,color] duration-200 group-focus-within:-rotate-180 group-focus-within:text-hp-ink group-hover:-rotate-180 group-hover:text-hp-ink" />
      </button>
      <div
        className={`pointer-events-none absolute top-full left-1/2 z-50 -translate-x-1/2 pt-4.5 opacity-0 transition-opacity duration-150 ${openClasses} ${widthClassName}`}
      >
        <ul className="flex flex-col rounded-2xl border border-[#e4e6ea] bg-white p-2 shadow-[0_2px_4px_rgba(14,15,17,0.05),0_12px_28px_rgba(14,15,17,0.08)]">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={handleLinkClick}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 font-hp text-base/6 text-hp-body transition-colors hover:bg-hp-tray hover:text-hp-ink focus-visible:bg-hp-tray focus-visible:text-hp-ink ${focusRing}`}
              >
                {link.Icon ? <link.Icon className="size-4.5 shrink-0" /> : null}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

// Mobile menu: page links get a one-line note so the rows read as choices,
// not just labels.
const mobilePageNotes = {
  "/results": "Case studies, reported in MRR",
  "/testimonials": "Founders on video",
  "/pricing": "One plan, month to month",
};

// Each block of the mobile menu fades up in turn as the menu opens (none
// with reduced motion). `step` is its place in the sequence.
function menuStagger(isOpen, step) {
  return {
    className: `transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${
      isOpen ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
    }`,
    style: { transitionDelay: isOpen ? `${60 + step * 50}ms` : "0ms" },
  };
}

const mobileRow = `flex w-full items-center justify-between gap-4 border-b border-hp-line px-5 py-4 text-left sm:px-8 ${focusRing} focus-visible:-outline-offset-2`;

function MobileToolsRow({ isOpen, onToggle, onNavigate }) {
  // The list opens below the fold on phones, so bring it into view.
  const panelRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return undefined;
    const id = setTimeout(() => panelRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }), 220);
    return () => clearTimeout(id);
  }, [isOpen]);

  return (
    <div ref={panelRef}>
      <button type="button" className={mobileRow} onClick={onToggle} aria-expanded={isOpen} aria-controls="home-mobile-tools">
        <span className="flex flex-col gap-0.5">
          <span className="font-hp text-lg/6 font-medium text-hp-ink">Free tools</span>
          <span className="font-hp text-sm/5 text-hp-fine">{toolLinks.length} calculators and generators</span>
        </span>
        <SketchChevron
          className={`size-4.5 shrink-0 transition-[transform,color] duration-200 ${isOpen ? "-rotate-180 text-hp-ink" : "text-hp-muted"}`}
        />
      </button>
      <div
        id="home-mobile-tools"
        inert={!isOpen}
        className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <ul className="overflow-hidden">
          {toolLinks.map((link, index) => (
            <li key={link.href} className="border-b border-hp-line-soft bg-hp-band last:border-hp-line">
              <Link
                href={link.href}
                onClick={onNavigate}
                className={`flex items-center gap-3.5 px-5 py-3.5 font-hp text-base/5.5 text-hp-text sm:px-8 ${focusRing} focus-visible:-outline-offset-2`}
              >
                <span aria-hidden="true" className="font-hp-mono text-xs/4 text-hp-fine">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu({ isOpen, hasBooked, toolsOpen, onToggleTools, onClose }) {
  return (
    <div
      id="home-mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!isOpen}
      className={`fixed inset-0 z-50 flex h-dvh flex-col bg-white transition-opacity duration-300 lg:hidden ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Mirrors the nav bar, so opening the menu only swaps the button. */}
      <div className="flex h-15 shrink-0 items-center justify-between border-b border-hp-line px-5 sm:px-8">
        <Link href="/" aria-label="Ads That Convert home" className={`rounded ${focusRing}`} onClick={onClose}>
          <HomeLogo size="sm" />
        </Link>
        <button
          type="button"
          className={`flex size-9.5 items-center justify-center rounded-[10px] text-hp-ink shadow-[0_0_0_1px_#eaebed] ${focusRing}`}
          aria-label="Close menu"
          onClick={onClose}
        >
          <X aria-hidden="true" className="size-4.5" strokeWidth={1.75} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav aria-label="Mobile">
          <div {...menuStagger(isOpen, 0)}>
            <div className="px-5 pt-6 pb-3.5 sm:px-8">
              <Eyebrow>01 · Services</Eyebrow>
            </div>
            <ul className="grid grid-cols-2 border-t border-hp-line">
              {serviceLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={`border-b border-hp-line ${
                    index % 2 === 0 && index === serviceLinks.length - 1 ? "col-span-2" : index % 2 === 0 ? "border-r" : ""
                  }`}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`flex h-full flex-col gap-3 px-5 py-4.5 transition-colors active:bg-hp-tray sm:px-8 ${focusRing} focus-visible:-outline-offset-2`}
                  >
                    <span className="flex size-9 items-center justify-center rounded-[10px] bg-white shadow-[0_0_0_1px_#eaebed,0_1px_2px_rgba(14,15,17,0.05)]">
                      <link.Icon className="size-4.5" />
                    </span>
                    <span className="font-hp text-base/5.5 font-medium text-hp-ink">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div {...menuStagger(isOpen, 1)}>
            <div className="px-5 pt-7 pb-3.5 sm:px-8">
              <Eyebrow>02 · Explore</Eyebrow>
            </div>
            <ul className="border-t border-hp-line">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={onClose} className={`${mobileRow} transition-colors active:bg-hp-tray`}>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-hp text-lg/6 font-medium text-hp-ink">{link.label}</span>
                      <span className="font-hp text-sm/5 text-hp-fine">{mobilePageNotes[link.href]}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="size-4.5 shrink-0 text-hp-muted" strokeWidth={1.75} />
                  </Link>
                </li>
              ))}
              <li>
                <MobileToolsRow isOpen={toolsOpen} onToggle={onToggleTools} onNavigate={onClose} />
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Booking panel, pinned so the call is always one tap away. */}
      <div
        style={menuStagger(isOpen, 2).style}
        className={`hp-cta-dots shrink-0 border-t border-hp-line px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 ${menuStagger(isOpen, 2).className}`}
      >
        {hasBooked ? (
          <Link
            href="/results"
            onClick={onClose}
            className={`flex w-full justify-center rounded-xl bg-white px-4.5 py-3.75 font-hp text-[17px]/5.5 font-medium text-hp-ink shadow-[inset_0_0_0_1px_#0e0f11] ${focusRing}`}
          >
            Read the case studies
          </Link>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/team/mitch-headline-portrait.png"
                alt=""
                width={80}
                height={80}
                className="size-10 shrink-0 rounded-full object-cover shadow-[0_0_0_2px_#fff,0_0_0_3px_#eaebed]"
              />
              <p className="flex flex-col font-hp">
                <span className="text-[15px]/5.5 font-medium text-hp-ink">Talk to me, not a sales rep</span>
                <span className="text-sm/5 text-hp-fine">15 minutes · Free · No commitment</span>
              </p>
            </div>
            <BookButton
              size="block"
              trackingSize="mobile"
              className="w-full shadow-[0_1px_2px_rgba(14,15,17,0.2),0_10px_28px_rgba(21,94,239,0.28)]"
              onClick={onClose}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function HomeNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const pathname = usePathname();
  // Someone on /call-confirmation has just booked, so the nav points them to
  // the case studies instead of asking them to book again.
  const hasBooked = pathname === "/call-confirmation";

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
  };

  // Close the mobile menu on navigation (state adjusted during render, as in Navbar).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
  }

  // Lock page scroll behind the open mobile menu; Escape closes it.
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const previous = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      htmlOverflow: documentElement.style.overflow,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    documentElement.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setOpenMobileSection(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      documentElement.style.overflow = previous.htmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="hp-hatch sticky top-0 z-40 w-full border-b border-hp-line bg-white">
      <nav
        aria-label="Main"
        className="mx-auto flex h-15 w-full max-w-[1120px] items-center bg-white justify-between px-5 sm:px-8 lg:h-16 lg:px-6 min-[1121px]:border-x min-[1121px]:border-hp-line"
      >
        <Link href="/" aria-label="Ads That Convert home" className={`shrink-0 rounded ${focusRing}`}>
          <span className="lg:hidden">
            <HomeLogo size="sm" />
          </span>
          <span className="hidden lg:inline">
            <HomeLogo />
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          <NavDropdown label="Services" links={serviceLinks} widthClassName="w-55" />
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded font-hp text-sm/5 font-medium text-hp-body transition-colors hover:text-hp-ink ${focusRing}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <NavDropdown label="Tools" links={toolLinks} widthClassName="w-80" />
        </ul>

        <div className="hidden lg:block">
          {hasBooked ? (
            <Link
              href="/results"
              className={`rounded-lg px-3.5 py-2 font-hp text-sm/5 font-medium text-hp-ink shadow-[inset_0_0_0_1px_#0e0f11] transition-colors hover:bg-hp-tray ${focusRing}`}
            >
              Read the case studies
            </Link>
          ) : (
            <BookButton size="nav" trackingSize="nav" iconPx={17} />
          )}
        </div>

        <button
          type="button"
          className={`flex size-9.5 flex-col items-center justify-center gap-1.25 rounded-[10px] shadow-[0_0_0_1px_#eaebed] lg:hidden ${focusRing}`}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="home-mobile-menu"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span aria-hidden="true" className="h-[1.6px] w-4 rounded-xs bg-hp-ink" />
          <span aria-hidden="true" className="h-[1.6px] w-4 rounded-xs bg-hp-ink" />
        </button>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        hasBooked={hasBooked}
        toolsOpen={openMobileSection === "tools"}
        onToggleTools={() => setOpenMobileSection((open) => (open === "tools" ? null : "tools"))}
        onClose={closeMobileMenu}
      />
    </header>
  );
}
