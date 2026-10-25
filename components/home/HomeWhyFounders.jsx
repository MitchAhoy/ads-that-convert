import { CodeChip, MrrChip, OwnerChip, PressLogos, ReferencesChip, TermsChip } from "@/components/home/WhyFoundersChips";
import { Section, SectionHead } from "@/components/home/primitives";

const pressLogos = [
  { src: "/press-logos/sej.webp", alt: "Search Engine Journal", width: 598, height: 124, box: "h-4.25 w-20.5" },
  { src: "/press-logos/optmyzr.webp", alt: "Optmyzr", width: 544, height: 96, box: "h-3.75 w-21" },
  { src: "/press-logos/ppc-hero.png", alt: "PPC Hero", width: 778, height: 117, box: "h-3.5 w-23" },
  { src: "/press-logos/ppc-chat.png", alt: "PPC Chat", width: 602, height: 199, box: "h-5 w-15.5" },
];

// Each reason has a small animated chip above it (WhyFoundersChips.jsx).
const reasons = [
  {
    title: "Reported in MRR",
    body: "Weekly, fortnightly or monthly reports on pipeline and new MRR, not clicks.",
    visual: <MrrChip />,
  },
  {
    title: "You own the account",
    body: "Campaigns run in your Google Ads account. If we stop, everything stays with you.",
    visual: <OwnerChip />,
  },
  {
    title: "Tracking built by hand",
    body: "I write it myself, so paid sign-ups and their value flow back into Google Ads.",
    visual: <CodeChip />,
  },
  {
    title: "No lock-in contracts",
    body: "Month-to-month from $2,000. Clients stay because it works, not because they're stuck.",
    visual: <TermsChip />,
  },
  {
    title: "Published in the PPC press",
    body: "Written for Search Engine Journal, PPC Hero, Optmyzr and PPC Chat.",
    visual: <PressLogos logos={pressLogos} />,
  },
  {
    title: "References on request",
    body: "Speak to someone I work with now before you sign anything.",
    visual: <ReferencesChip />,
  },
];

export default function HomeWhyFounders() {
  return (
    <Section id="why-founders" labelledBy="why-founders-title">
      <SectionHead
        id="why-founders-title"
        marker={5}
        eyebrow="06 · Why me"
        lead="Why founders hire me"
        accent="and why they stay."
        intro="You keep control of your account, your data and your contract."
      />

      <ul className="grid grid-cols-1 lg:grid-cols-3 lg:border-t lg:border-hp-line">
        {reasons.map((reason, index) => (
          <li
            key={reason.title}
            className={`flex min-w-0 flex-col gap-3 border-t border-hp-line px-5 pt-6.5 pb-7.5 sm:px-8 lg:gap-3.5 lg:border-t-0 lg:px-10 lg:pt-9 lg:pb-10 ${
              index % 3 < 2 ? "lg:border-r lg:border-hp-line" : ""
            } ${index < 3 ? "lg:border-b lg:border-hp-line" : ""}`}
          >
            <div className="flex h-48 shrink-0 items-end">{reason.visual}</div>
            <h3 className="pt-1.5 font-hp text-[21px]/6.75 font-medium tracking-[-0.02em] text-hp-ink">
              <span className="block font-hp text-[21px]/6.75 font-medium tracking-[-0.02em]">{reason.title}</span>
            </h3>
            <p className="font-hp text-base/6 text-hp-soft">{reason.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
