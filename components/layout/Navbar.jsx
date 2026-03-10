"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
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
  const pathname = usePathname();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileToolsOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    if (isMobileMenuOpen) {
      body.style.overflow = "hidden";
      documentElement.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-4 z-40 w-full sm:top-6 lg:top-8">
      <nav className="relative z-30 mx-auto flex w-full max-w-[1120px] items-center rounded-3xl border border-zinc-200 bg-zinc-100/90 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur sm:px-6 lg:justify-between lg:gap-6 lg:px-8 lg:py-3">
        <Link href="/" className="shrink-0" aria-label="Ads That Convert home">
          <Image src="/logo.svg" alt="Ads That Convert" width={180} height={15} priority />
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-700 transition-colors hover:bg-zinc-200 hover:text-zinc-950 lg:hidden"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span aria-hidden="true" className="text-2xl leading-none">☰</span>
        </button>

        <ul className="ml-12 hidden items-center justify-center gap-8 text-base font-medium text-zinc-700 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="transition-colors hover:text-zinc-950"
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
              className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950"
              aria-haspopup="true"
            >
              Tools
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </button>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[320px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <ul className="rounded-2xl border border-zinc-200 bg-zinc-100/95 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur">
                {toolLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-xl px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-200/70 hover:text-zinc-950"
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
          <ScheduleCallButton url={SCHEDULE_CALL_URL} />
        </div>
      </nav>

      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-50 overflow-y-auto bg-zinc-100 p-6 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[760px] flex-col">
          <div className="flex items-center justify-between">
            <Link href="/" className="shrink-0" aria-label="Ads That Convert home" onClick={closeMobileMenu}>
              <Image src="/logo.svg" alt="Ads That Convert" width={180} height={15} priority />
            </Link>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <span aria-hidden="true" className="text-3xl leading-none">×</span>
            </button>
          </div>

          <ul className="mt-14 text-base leading-[1.4] text-zinc-700">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-zinc-300 py-6">
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
            <li className="border-b border-zinc-300 py-6">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left text-base text-zinc-700"
                onClick={() => setIsMobileToolsOpen((open) => !open)}
                aria-expanded={isMobileToolsOpen}
                aria-controls="mobile-tools-list"
              >
                <span className="tracking-[0.06em]">Tools</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-5 w-5 text-zinc-700 transition-transform duration-200 ${
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
                    <Link href={link.href} className="block text-base text-zinc-700" onClick={closeMobileMenu}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

          </ul>

          {isMobileMenuOpen && (
            <div className="mt-auto pb-2 pt-8">
              <ScheduleCallButton url={SCHEDULE_CALL_URL} size="mobile" className="w-full" onClick={closeMobileMenu} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
