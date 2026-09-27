import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { SCHEDULE_CALL_URL } from "@/lib/urls";
import { tools } from "@/lib/tools/toolRegistry";
import FilloutPopupTrigger from "@/components/ui/FilloutPopupTrigger";
import Logo from "@/components/ui/Logo";

const pressLogos = [
  {
    src: "/as seen in logos/search engine journal.webp",
    alt: "Search Engine Journal logo",
    width: 354,
    height: 85,
    href: "https://www.searchenginejournal.com/hyper-local-ppc-landing-pages/464792/",
  },
  {
    src: "/as seen in logos/optmyzr.webp",
    alt: "Optmyzr logo",
    width: 356,
    height: 82,
    href: "https://www.youtube.com/watch?v=GkNDnQZVK4M&t=42s&pp=ygUgb3B0eW16ciBwb2RjYXN0IG1pdGNoIGNhcnR3cmlnaHQ%3D",
  },
  {
    src: "/as seen in logos/ppc hero.png",
    alt: "PPC Hero logo",
    width: 344,
    height: 78,
    href: "https://ppchero.com/how-to-set-up-and-optimize-end-to-end-lead-gen-funnel-tracking-with-no-crm-required/",
  },
  {
    src: "/as seen in logos/ppc chat.png",
    alt: "PPC Chat logo",
    width: 289,
    height: 90,
    href: "https://officialppcchat.com/meet-mitch-cartwright/",
  },
];

const companyLinks = [
  { label: "Home", href: "/" },
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

const contactItems = [
  { label: "Schedule a Call", href: SCHEDULE_CALL_URL, isScheduleCall: true },
  { label: "mitch@adsthatconvert.co", href: "mailto:mitch@adsthatconvert.co" },
  { label: "+61 2 9098 4766", href: "tel:+61290984766" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10 sm:pt-22">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.8fr_1fr_1fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4.5">
              <Link href="/" className="inline-flex w-fit" aria-label="Ads That Convert home">
                <Logo iconClassName="h-6.5 w-6.5" textClassName="text-2xl" />
              </Link>
              <p className="max-w-[24em] text-base leading-[1.55] text-body">
                High-performance Google Ads management for SaaS companies focused on qualified pipeline growth.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <Link
                href="https://x.com/PayPerMitch"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Follow PayPerMitch on X"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-black transition-opacity duration-300 hover:opacity-85"
              >
                <Image
                  src="/32px-X_logo_2023.svg.png"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className="invert"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/company/ads-that-convert/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Follow Ads That Convert on LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a66c2] transition-opacity duration-300 hover:opacity-85"
              >
                <Linkedin className="h-4 w-4 text-white" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col gap-3.5">
              <p className="text-base font-semibold text-ink">As seen in</p>
              <ul className="flex flex-wrap items-center gap-4">
                {pressLogos.map((logo) => (
                  <li key={logo.src} className="flex h-6 items-center">
                    <Link
                      href={logo.href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      aria-label={`Open ${logo.alt}`}
                      className="flex h-full items-center"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="h-full w-auto object-contain"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav aria-label="Company">
            <h3 className="mb-5 text-base! font-semibold text-ink">Company</h3>
            <ul className="space-y-4 text-base text-body">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 hover:text-ink"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tools">
            <h3 className="mb-5 text-base! font-semibold text-ink">Tools</h3>
            <ul className="space-y-4 text-base text-body">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-300 hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://www.marketingjobs.fyi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-ink"
                >
                  Marketing Jobs
                </Link>
              </li>
            </ul>
          </nav>

          <section aria-label="Contact">
            <h3 className="mb-5 text-base! font-semibold text-ink">Contact</h3>
            <ul className="space-y-4 text-base text-body">
              {contactItems.map((item) => (
                <li key={item.label}>
                  {item.isScheduleCall ? (
                    <FilloutPopupTrigger className="inline-flex items-start transition-colors duration-300 hover:text-ink">
                      {item.label}
                    </FilloutPopupTrigger>
                  ) : (
                    <Link href={item.href} className="inline-flex items-start transition-colors duration-300 hover:text-ink">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <p className="text-base text-body">
                  Suite 302, 13/15 Wentworth Ave, Sydney NSW 2000
                </p>
              </li>
            </ul>
          </section>
          </div>

          <div className="mt-18 border-t border-border pt-6">
            <p className="text-sm text-fine">{`© ${new Date().getFullYear()} Ads That Convert. All rights reserved. ABN 20673751856`}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
