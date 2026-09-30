import { Clock, Database, UsersRound } from "lucide-react";
import SlackChangeHistoryIllustration from "@/components/sections/illustrations/SlackChangeHistoryIllustration";
import QuoteAttribution from "@/components/ui/QuoteAttribution";

const points = [
  { text: "8+ years in paid media across 85+ verticals, and tens of millions in managed spend.", Icon: Database },
  { text: "A small client list, so your account gets real hours.", Icon: Clock },
  { text: "Want a reference? I'll put you in touch with a current client.", Icon: UsersRound },
];

export default function SeniorHands() {
  return (
    <section aria-labelledby="senior-hands-title" className="py-12">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <SlackChangeHistoryIllustration />
          </div>

          <div className="min-w-0">
            <h2
              id="senior-hands-title"
              className="font-display text-h2 text-ink text-balance"
            >
              The person on the call is the person in your account
            </h2>

            <p className="mt-5 max-w-[30em] text-lg leading-[1.5] text-body text-wrap-pretty">
              At most agencies a senior sells the account and a junior runs it. I have no juniors to hand it to.
              Strategy, build, weekly changes and reporting are all done by me.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {points.map(({ text, Icon }) => (
                <li key={text} className="flex items-start gap-3.5 text-base leading-[1.5] text-ink">
                  <Icon aria-hidden="true" className="mt-px h-5.5 w-5.5 shrink-0" strokeWidth={1.75} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border pt-5">
              <QuoteAttribution
                compact
                quote="Working with Mitch from Ads That Convert has been a game-changer for our startup."
                person="Dominic Whyte"
                role="Founder"
                company="Fillout"
                companyLogoSrc="/client-logos/fillout.png"
                companyLogoAlt="Fillout logo"
                avatarSrc="/client pfp/dominic whyte.png"
                avatarAlt="Dominic Whyte"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
