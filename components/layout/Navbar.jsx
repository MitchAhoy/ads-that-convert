"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import Logo from "@/components/ui/Logo";
import { tools } from "@/lib/tools/toolRegistry";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

const navLinks = [
  { label: "Results", href: "/results" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Newsletter",
    href: "https://grow.adsthatconvert.co/subscribe",
    external: true,
  },
];

const toolLinks = tools.map((tool) => ({
  label: tool.name,
  href: `/tools/${tool.slug}`,
}));

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileToolsOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileToolsOpen(false);
  }, [pathname]);

  // Transparent over the page background at the top; the elevated pill
  // styling only kicks in once the page scrolls.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      documentElement.style.overflow = previousHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-4.5 z-40 w-full px-6">
      <nav
        className={`relative z-30 mx-auto flex w-full max-w-270 items-center gap-5 rounded-full py-1.25 pr-1.25 pl-5.5 transition-[background-color,box-shadow] duration-300 lg:justify-between ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_2px_4px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.08)]"
            : "bg-transparent shadow-none"
        }`}
      >
        <Link href="/" className="shrink-0" aria-label="Ads That Convert home">
          <Logo />
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl text-body transition-colors hover:bg-zinc-100 hover:text-ink lg:hidden"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span aria-hidden="true" className="text-2xl leading-none">☰</span>
        </button>

        <ul className="ml-12 hidden items-center justify-center gap-7.5 text-base text-body lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="transition-colors hover:text-ink"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              aria-haspopup="true"
            >
              Tools
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </button>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <ul className="rounded-2xl border border-border bg-white p-2 shadow-[0_2px_4px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.08)]">
                {toolLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-xl px-3 py-2 text-sm text-body transition-colors hover:bg-zinc-100 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

        </ul>

        <div className="ml-auto hidden lg:block lg:ml-0">
          <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" size="nav" />
        </div>
      </nav>

      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-50 min-h-dvh overflow-y-auto bg-white p-6 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-190 flex-col">
          <div className="flex items-center justify-between">
            <Link href="/" className="shrink-0" aria-label="Ads That Convert home" onClick={closeMobileMenu}>
              <Logo />
            </Link>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-body transition-colors hover:bg-zinc-100 hover:text-ink"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <span aria-hidden="true" className="text-3xl leading-none">×</span>
            </button>
          </div>

          <ul className="mt-14 text-base leading-[1.4] text-body">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-border py-6">
                <Link
                  href={link.href}
                  className="block"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={link.external ? closeMobileMenu : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-border py-6">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-base text-body"
                onClick={() => setIsMobileToolsOpen((open) => !open)}
                aria-expanded={isMobileToolsOpen}
                aria-controls="mobile-tools-list"
              >
                <span className="tracking-[0.06em]">Tools</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 text-body transition-transform duration-200 ${
                    isMobileToolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <ul
                id="mobile-tools-list"
                className={`overflow-hidden pl-0 transition-all duration-200 ${
                  isMobileToolsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {toolLinks.map((link) => (
                  <li key={link.href} className="pt-3">
                    <Link href={link.href} className="block text-base text-body" onClick={closeMobileMenu}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

          </ul>

          <div className="mt-auto pb-2 pt-8">
            <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" size="mobile" className="w-full" onClick={closeMobileMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}
