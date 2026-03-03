"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Results", href: "/results" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Newsletter", href: "/subscribe" },
];

const toolLinks = [
  { label: "PPC Keyword Concatenation Tool", href: "/tools/ppc-keyword-concatenation-tool" },
  { label: "PPC Keyword Concatenation Tool", href: "/tools/ppc-keyword-concatenation-tool" },
  { label: "UTM Builder", href: "/tools/utm-builder" },
  { label: "Datalayer Push Snippet Generator", href: "/tools/datalayer-push-snippet-generator" },
];

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileToolsOpen(false);
  };

  return (
    <header className="w-full">
      <nav className="mx-auto flex w-full max-w-[1120px] items-center rounded-3xl border border-zinc-200 bg-zinc-100/90 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur sm:px-6 lg:justify-between lg:gap-6 lg:px-8 lg:py-3">
        <Link href="#" className="shrink-0" aria-label="Ads That Convert home">
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

        <ul className="ml-12 hidden items-center justify-center gap-8 text-sm font-medium text-zinc-700 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="transition-colors hover:text-zinc-950">
                {link.label}
              </Link>
            </li>
          ))}

          <li className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1 transition-colors hover:text-zinc-950"
              aria-haspopup="menu"
            >
              Tools
              <span aria-hidden="true">▾</span>
            </button>
            <ul className="invisible absolute left-1/2 top-[calc(100%+10px)] z-10 w-52 -translate-x-1/2 rounded-xl border border-zinc-200 bg-white p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {toolLinks.map((tool, index) => (
                <li key={`${tool.label}-${index}`}>
                  <Link
                    href={tool.href}
                    className="block rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <Link
          href="#"
          className="ml-auto hidden h-12 items-center gap-2 rounded-2xl bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 lg:inline-flex lg:ml-0"
        >
          <Image src="/google-meet-logo.png" alt="" width={18} height={18} aria-hidden="true" />
          <span>Schedule a Call</span>
        </Link>
      </nav>

      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-50 bg-zinc-100 p-6 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[760px] flex-col">
          <div className="flex items-center justify-between">
            <Link href="#" className="shrink-0" aria-label="Ads That Convert home" onClick={closeMobileMenu}>
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

          <ul className="mt-14 text-[17px] leading-[1.35] text-zinc-700">
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-zinc-300 py-6">
                <Link href={link.href} className="block">
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="border-b border-zinc-300 py-6">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isMobileToolsOpen}
                onClick={() => setIsMobileToolsOpen((current) => !current)}
              >
                <span>Tools</span>
                <span aria-hidden="true" className="text-[32px] font-light leading-none text-zinc-500">
                  {isMobileToolsOpen ? "−" : "+"}
                </span>
              </button>

              <ul
                className={`overflow-hidden pl-1 transition-all duration-300 ease-out ${
                  isMobileToolsOpen ? "mt-3 max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {toolLinks.map((tool, index) => (
                  <li key={`${tool.label}-${index}`}>
                    <Link
                      href={tool.href}
                      className="block py-2 text-[15px] text-zinc-600"
                    >
                      {tool.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="mt-auto pb-2 pt-8">
            <Link
              href="#"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-zinc-950 px-6 text-[1.15rem] font-medium text-white transition-colors hover:bg-zinc-800"
              onClick={closeMobileMenu}
            >
              <Image src="/google-meet-logo.png" alt="" width={20} height={20} aria-hidden="true" />
              <span>Schedule a Call</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
