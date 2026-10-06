import Image from "next/image";
import ScheduleCallButton from "@/components/ui/ScheduleCallButton";
import { SCHEDULE_CALL_URL } from "@/lib/urls";

const pressLogos = [
  // Heights are tuned per logo so they read at a similar optical size.
  { src: "/press-logos/sej.webp", alt: "Search Engine Journal", width: 598, height: 124, className: "h-5" },
  { src: "/press-logos/ppc-hero.png", alt: "PPC Hero", width: 778, height: 117, className: "h-4" },
  { src: "/press-logos/optmyzr.webp", alt: "Optmyzr", width: 544, height: 96, className: "h-4" },
  { src: "/press-logos/ppc-chat.png", alt: "PPC Chat", width: 602, height: 199, className: "h-6" },
];

// The publications are already named in the copy, so the logos are decorative.
function PressLogos() {
  return (
    <div aria-hidden="true" className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
      {pressLogos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          className={`${logo.className} w-auto object-contain`}
        />
      ))}
    </div>
  );
}

const reasons = [
  {
    title: "You own the account",
    description:
      "Campaigns run in your own Google Ads account, on your card. If we stop working together, everything stays with you.",
  },
  {
    title: "Tracking built by hand",
    description:
      "I write the tracking myself, so paid sign-ups and their value flow back into Google Ads. The dataLayer and UTM tools on this site are ones I built.",
  },
  {
    title: "No lock-in contracts",
    description: "Month-to-month, from $2,000.",
  },
  {
    title: "Published in the PPC press",
    description: "Search Engine Journal, PPC Hero, Optmyzr and PPC Chat.",
    extra: <PressLogos />,
  },
  {
    title: "References on request",
    description: "Talk to a current client before you sign.",
  },
];

export default function WhyFoundersStay() {
  return (
    <section aria-labelledby="why-founders-stay-title" className="pt-16 pb-12 sm:pt-20">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        {/* Two-column editorial grid: headings on the left, copy on the right.
            The intro and every reason share the same column lines. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-10">
          <h2 id="why-founders-stay-title" className="font-display text-h2 text-ink text-balance text-center lg:col-span-5 lg:text-left">
            Why founders hire me <span className="block text-muted">and why they stay</span>
          </h2>
          <div className="text-center lg:col-span-7 lg:self-end lg:text-left">
            <p className="mx-auto max-w-[32em] lg:mx-0 text-lg leading-[1.5] text-body text-pretty">
              You keep control of your account, your data and your contract.
            </p>
            <div className="mt-8">
              <ScheduleCallButton url={SCHEDULE_CALL_URL} label="Book a 15-min call" />
            </div>
          </div>
        </div>

        <ul className="mt-10 border-t border-border sm:mt-14">
          {reasons.map(({ title, description, extra }) => (
            <li
              key={title}
              className="grid grid-cols-1 gap-2 border-b border-border py-7 sm:py-8 lg:grid-cols-12 lg:gap-x-10"
            >
              <h3 className="text-xl font-bold text-ink sm:text-2xl lg:col-span-5">{title}</h3>
              <div className="lg:col-span-7">
                <p className="max-w-[36em] text-copy text-body text-pretty">{description}</p>
                {extra}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
