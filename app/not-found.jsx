import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HomeFinalCta from "@/components/home/HomeFinalCta";
import HomePageHero, { secondaryLinkClass } from "@/components/home/HomePageHero";
import { Section, SectionHead, focusRing } from "@/components/home/primitives";
import MissingUrl from "@/components/not-found/MissingUrl";
import NotFoundIllustration from "@/components/not-found/NotFoundIllustration";
import { tools } from "@/lib/tools/toolRegistry";

// 404 page on the homepage system (DESIGN.md §16.15). Next.js marks it
// noindex on its own.

export const metadata = {
  title: "Page not found | Ads That Convert",
};

const destinations = [
  { href: "/", label: "Homepage", note: "How I run Google Ads for SaaS" },
  { href: "/results", label: "Results", note: "Case studies, reported in MRR" },
  { href: "/pricing", label: "Pricing", note: "One plan, month to month" },
  { href: `/tools/${tools[0].slug}`, label: "Free tools", note: `${tools.length} calculators and generators` },
];

// Hairlines between cells: one column on phones, 2×2 from sm, one row from lg.
const cellBorders = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
];

export default function NotFound() {
  return (
    <main>
      <HomePageHero
        pill={<MissingUrl />}
        lead="This click didn't"
        accent="convert."
        underlineSeed="not-found"
        description="You clicked through, but the page isn't here. The link may be old or mistyped. Unlike a bad ad, this one cost you nothing."
      >
        <div className="flex w-full max-w-87.5 flex-col items-center gap-1.5 pt-7 sm:w-auto sm:max-w-none sm:flex-row sm:gap-6 lg:pt-8.5">
          <Link
            href="/"
            className={`inline-flex w-full items-center justify-center gap-2.25 rounded-xl bg-hp-ink px-4.5 py-3.75 font-hp text-[17px]/5.5 font-medium text-white hover:bg-[#26282c] sm:w-auto sm:rounded-[10px] sm:py-2.75 sm:text-base/5.5 ${focusRing}`}
          >
            Back to the homepage
            <ArrowRight aria-hidden="true" className="size-4.5" strokeWidth={2} />
          </Link>
          <Link href="/results" className={secondaryLinkClass}>
            See client results
          </Link>
        </div>
        <div className="flex w-full justify-center pt-10 lg:pt-12">
          <NotFoundIllustration />
        </div>
      </HomePageHero>

      <Section labelledBy="next-title">
        <SectionHead
          id="next-title"
          eyebrow="01 · Where to next"
          lead="That page is gone."
          accent="These ones aren't."
          marker={0}
          intro="Pick up where you meant to go. Everything on the site is one of these four places."
        />
        <ul className="grid grid-cols-1 border-t border-hp-line sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((item, index) => (
            <li
              key={item.href}
              className={`border-hp-line ${cellBorders[index]}`}
            >
              <Link
                href={item.href}
                className={`group flex h-full items-center justify-between gap-4 px-5 py-4.5 sm:px-8 lg:flex-col lg:items-start lg:px-8 lg:pt-7.5 lg:pb-8.5 ${
                  index === 0 ? "lg:pl-12" : ""
                } ${index === destinations.length - 1 ? "lg:pr-12" : ""} ${focusRing} focus-visible:-outline-offset-2`}
              >
                <span className="flex flex-col gap-0.5 lg:gap-2">
                  <span className="font-hp text-lg/6 font-medium text-hp-ink lg:text-[19px]/6.25 lg:tracking-[-0.02em]">
                    {item.label}
                  </span>
                  <span className="font-hp text-sm/5 text-hp-fine lg:text-[15px]/5.75 lg:text-hp-soft">{item.note}</span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4.5 shrink-0 text-hp-muted transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-hp-accent"
                  strokeWidth={1.75}
                />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <HomeFinalCta lead="While you're here," accent="let's fix your funnel." underlineSeed="not-found" />
    </main>
  );
}
