"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
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

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

        </ul>

        <div className="ml-auto hidden lg:block lg:ml-0">
          <ScheduleCallButton url={SCHEDULE_CALL_URL} />
        </div>
      </nav>

      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-50 bg-zinc-100 p-6 transition-opacity duration-300 lg:hidden ${
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
