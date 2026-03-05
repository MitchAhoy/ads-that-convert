import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "Results", href: "/results" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Newsletter", href: "/subscribe" },
];

const toolLinks = [
  { label: "PPC Keyword Concatenation Tool", href: "/tools/ppc-keyword-concatenation-tool" },
  { label: "UTM Builder", href: "/tools/utm-builder" },
  { label: "Datalayer Push Snippet Generator", href: "/tools/datalayer-push-snippet-generator" },
];

const contactItems = [
  { label: "Schedule a Call", href: SCHEDULE_CALL_URL },
  { label: "mitch@adsthatconvert.co", href: "mailto:mitch@adsthatconvert.co" },
  { label: "+61 2 9098 4766", href: "tel:+61290984766" },
];

export default function Footer() {
  return (
    <footer className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-100/90 px-6 pt-20 pb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:px-8 lg:px-10 lg:pt-24 lg:pb-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] lg:gap-12">
          <div className="space-y-6">
            <Link href="/" className="inline-flex w-fit" aria-label="Ads That Convert home">
              <Image src="/logo.svg" alt="Ads That Convert" width={248} height={22} />
            </Link>
            <p className="max-w-[34ch] text-base text-zinc-600">
              High-performance Google Ads management for SaaS companies focused on qualified pipeline growth.
            </p>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-900">Follow</p>
              <div className="flex items-center gap-3">
                <Link
                  href="https://x.com/PayPerMitch"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Follow PayPerMitch on X"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 bg-white transition-all duration-300 hover:border-[#122338] hover:bg-zinc-50"
                >
                  <Image
                    src="/32px-X_logo_2023.svg.png"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/ads-that-convert/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Follow Ads That Convert on LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300 bg-white transition-all duration-300 hover:border-[#122338] hover:bg-zinc-50"
                >
                  <Linkedin className="h-4 w-4 text-zinc-700" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <nav aria-label="Company">
            <h3 className="mb-5 !text-base font-semibold uppercase tracking-[0.06em] text-zinc-900">Company</h3>
            <ul className="space-y-3 text-base text-zinc-600">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-300 hover:text-[#122338]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tools">
            <h3 className="mb-5 !text-base font-semibold uppercase tracking-[0.06em] text-zinc-900">Tools</h3>
            <ul className="space-y-3 text-base text-zinc-600">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors duration-300 hover:text-[#122338]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-label="Contact">
            <h3 className="mb-5 !text-base font-semibold uppercase tracking-[0.06em] text-zinc-900">Contact</h3>
            <ul className="space-y-3 text-base text-zinc-600">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="inline-flex items-start transition-colors duration-300 hover:text-[#122338]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <p className="text-base text-zinc-600">
                  Suite 302, 13/15 Wentworth Ave, Sydney NSW 2000
                </p>
              </li>
            </ul>
          </section>
          </div>

          <div className="mt-8 border-t border-zinc-300/70 pt-4">
            <p className="text-base text-zinc-500">{`© ${new Date().getFullYear()} Ads That Convert. All rights reserved. ABN 20673751856`}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
