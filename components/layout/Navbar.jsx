"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import Logo from "@/components/ui/Logo";
import { serviceIcons } from "@/components/services/serviceIcons";
import { services } from "@/lib/services";
import { tools } from "@/lib/tools/toolRegistry";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

const navLinks = [
  { label: "Results", href: "/results" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
];

// TEMPORARY: channels without a page yet, linked to their future URLs (404 until
// built). Each one drops out of this list once lib/services.js has its entry.
// Delete the list when all four are built.
const plannedServices = [
  { slug: "chatgpt-ads", name: "ChatGPT Ads" },
  { slug: "meta-ads", name: "Meta Ads" },
  { slug: "microsoft-ads", name: "Microsoft Ads" },
];

const serviceLinks = [
  ...services,
  ...plannedServices.filter((planned) => !services.some((service) => service.slug === planned.slug)),
].map((service) => ({
  label: service.name,
  href: `/services/${service.slug}`,
  Icon: serviceIcons[service.slug],
}));

const toolLinks = tools.map((tool) => ({
  label: tool.name,
  href: `/tools/${tool.slug}`,
}));

// Desktop: opens on hover or keyboard focus.
function NavDropdown({ label, links, widthClassName }) {
  return (
    <li className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 transition-colors hover:text-body"
        aria-haspopup="true"
      >
        {label}
        <ChevronDown aria-hidden="true" className="h-4 w-4" />
      </button>
      <div
        className={`pointer-events-none absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 ${widthClassName}`}
      >
        <ul className="rounded-2xl border border-border bg-white p-2 shadow-[0_2px_4px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.08)]">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-base text-body transition-colors hover:bg-surface hover:text-ink"
              >
                {link.Icon ? <link.Icon className="h-4.5 w-4.5 shrink-0" /> : null}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

// Mobile menu: an accordion row.
function MobileNavDropdown({ id, label, links, isOpen, onToggle, onNavigate }) {
  return (
    <li className="border-b border-border py-6">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-base text-body"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="tracking-[0.06em]">{label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 text-body transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <ul
        id={id}
        className={`overflow-hidden pl-0 transition-all duration-200 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {links.map((link) => (
          <li key={link.href} className="pt-3">
            <Link href={link.href} className="flex items-center gap-2.5 text-base text-body" onClick={onNavigate}>
              {link.Icon ? <link.Icon className="h-4.5 w-4.5 shrink-0" /> : null}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Which mobile accordion is open ("services", "tools" or null).
  const [openMobileSection, setOpenMobileSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMobileSection(null);
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
        className={`relative z-30 mx-auto flex w-full max-w-270 items-center gap-5 rounded-full py-2 pr-2 pl-6 transition-[background-color,box-shadow] duration-300 lg:justify-between ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_2px_4px_rgba(26,26,24,0.05),0_12px_28px_rgba(26,26,24,0.08)]"
            : "bg-transparent shadow-none"
        }`}
      >
        <Link href="/" className="shrink-0" aria-label="Ads That Convert home">
          <Logo iconClassName="h-5 w-5 sm:h-6 sm:w-6" textClassName="text-lg sm:text-xl" />
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

        <ul className="ml-12 hidden items-center justify-center gap-8 text-base font-medium text-ink lg:flex">
          <NavDropdown label="Services" links={serviceLinks} widthClassName="w-[220px]" />
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="transition-colors hover:text-body"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <NavDropdown label="Tools" links={toolLinks} widthClassName="w-[320px]" />
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
              <Logo iconClassName="h-5 w-5 sm:h-6 sm:w-6" textClassName="text-lg sm:text-xl" />
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
            <MobileNavDropdown
              id="mobile-services-list"
              label="Services"
              links={serviceLinks}
              isOpen={openMobileSection === "services"}
              onToggle={() => setOpenMobileSection((open) => (open === "services" ? null : "services"))}
              onNavigate={closeMobileMenu}
            />
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
            <MobileNavDropdown
              id="mobile-tools-list"
              label="Tools"
              links={toolLinks}
              isOpen={openMobileSection === "tools"}
              onToggle={() => setOpenMobileSection((open) => (open === "tools" ? null : "tools"))}
              onNavigate={closeMobileMenu}
            />
          </ul>

          <div className="mt-auto pb-2 pt-8">
            <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" size="mobile" className="w-full" onClick={closeMobileMenu} />
          </div>
        </div>
      </div>
    </header>
  );
}
