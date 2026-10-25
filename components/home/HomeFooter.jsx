import Image from "next/image";
import Link from "next/link";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { HomeLogo } from "@/components/home/HomeNavbar";
import { focusRing } from "@/components/home/primitives";
import { tools } from "@/lib/tools/toolRegistry";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

// Homepage footer (DESIGN.md §16). Same links as components/layout/Footer.jsx.

const pressLogos = [
  { src: "/press-logos/sej.webp", alt: "Search Engine Journal", box: "h-4.25 w-20.5 lg:h-5 lg:w-24.25", href: "https://www.searchenginejournal.com/hyper-local-ppc-landing-pages/464792/" },
  { src: "/press-logos/optmyzr.webp", alt: "Optmyzr", box: "h-3.75 w-21 lg:h-4.25 lg:w-24", href: "https://www.youtube.com/watch?v=GkNDnQZVK4M&t=42s&pp=ygUgb3B0eW16ciBwb2RjYXN0IG1pdGNoIGNhcnR3cmlnaHQ%3D" },
  { src: "/press-logos/ppc-hero.png", alt: "PPC Hero", box: "h-3.5 w-23 lg:h-4 lg:w-26.5", href: "https://ppchero.com/how-to-set-up-and-optimize-end-to-end-lead-gen-funnel-tracking-with-no-crm-required/" },
  { src: "/press-logos/ppc-chat.png", alt: "PPC Chat", box: "h-5 w-15.5 lg:h-6 lg:w-18.25", href: "https://officialppcchat.com/meet-mitch-cartwright/" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Results", href: "/results" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
];

const linkClass = `rounded font-hp text-[15px]/5.5 text-hp-body transition-colors hover:text-hp-ink lg:text-sm/5 ${focusRing}`;
const headingClass = "pb-1.5 font-hp text-[13px]/4.5 font-normal tracking-normal text-hp-muted lg:text-[13px]/5";

function Column({ title, className = "", children }) {
  return (
    <nav aria-label={title} className={`flex flex-col gap-2.5 ${className}`}>
      <h2 className={headingClass}>
        <span className="block font-hp text-[13px]/4.5 font-normal tracking-normal lg:text-[13px]/5">{title}</span>
      </h2>
      <ul className="flex flex-col items-start gap-2.5 [&>li]:flex">{children}</ul>
    </nav>
  );
}

export default function HomeFooter() {
  return (
    <footer data-booking-cta-zone className="bg-hp-wash">
      <div className="mx-auto w-full max-w-[1120px] lg:bg-white min-[1121px]:border-x min-[1121px]:border-hp-line">
        <div className="flex flex-wrap gap-x-6 gap-y-8 px-5 pt-10 sm:px-8 lg:flex-nowrap lg:gap-12 lg:px-12 lg:pt-16 lg:pb-18">
          <div className="flex w-full flex-col gap-4.5 lg:w-70 lg:shrink-0 lg:gap-7">
            <Link href="/" aria-label="Ads That Convert home" className={`w-fit rounded ${focusRing}`}>
              <span className="lg:hidden">
                <HomeLogo size="sm" />
              </span>
              <span className="hidden lg:inline">
                <HomeLogo />
              </span>
            </Link>
            <div className="flex flex-col gap-2.5 lg:gap-2">
              <p className="font-hp text-[13px]/4.5 text-hp-muted">As seen in</p>
              <ul className="flex flex-wrap items-center gap-4.5 lg:grid lg:w-fit lg:grid-cols-[auto_auto] lg:gap-x-5.5 lg:gap-y-3.5 lg:pt-1">
                {pressLogos.map((logo) => (
                  <li key={logo.src}>
                    <Link
                      href={logo.href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className={`relative block ${logo.box} ${focusRing}`}
                    >
                      <Image src={logo.src} alt={`${logo.alt} (opens in a new tab)`} fill sizes="106px" className="object-contain object-left" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Column title="Company" className="flex-1 basis-0">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Tools" className="order-last w-full lg:order-none lg:w-auto lg:flex-[1.6] lg:basis-0">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link href={`/tools/${tool.slug}`} className={linkClass}>
                  {tool.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="https://www.marketingjobs.fyi/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                Marketing Jobs <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </Link>
            </li>
          </Column>

          <Column title="Contact" className="flex-[1.3] basis-0 lg:flex-[1.2]">
            <li>
              <ScheduleCallButton
                url={SCHEDULE_CALL_URL}
                variant="bare"
                size="footer"
                showIcon={false}
                className={linkClass}
              />
            </li>
            <li>
              <Link href="mailto:mitch@adsthatconvert.co" className={linkClass}>
                mitch@adsthatconvert.co
              </Link>
            </li>
            <li>
              <Link href="tel:+61290984766" className={linkClass}>
                +61 2 9098 4766
              </Link>
            </li>
            <li className="font-hp text-sm/5 text-hp-muted lg:w-47.5">Suite 302, 13/15 Wentworth Ave, Sydney NSW 2000</li>
          </Column>
        </div>

        <div className="mx-5 mt-8 flex flex-col gap-3.5 border-t border-hp-line pt-5 pb-7 sm:mx-8 lg:mx-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-5.5">
          <div className="flex gap-4">
            <Link
              href="https://x.com/PayPerMitch"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="Follow PayPerMitch on X (opens in a new tab)"
              className={`rounded text-hp-muted transition-colors hover:text-hp-ink ${focusRing}`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
                <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.1-9.3L1.4 2h6.9l4.8 6.3zm-1.2 18h1.7L7.4 3.9H5.6z" fill="currentColor" />
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/ads-that-convert/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="Follow Ads That Convert on LinkedIn (opens in a new tab)"
              className={`rounded text-hp-muted transition-colors hover:text-hp-ink ${focusRing}`}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
                <path
                  d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
          <p className="font-hp text-[13px]/4.75 text-hp-muted lg:text-[13px]/4.5">
            {`© ${new Date().getFullYear()} Ads That Convert. All rights reserved. ABN 20673751856`}
          </p>
        </div>
      </div>
    </footer>
  );
}
