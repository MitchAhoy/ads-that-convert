import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Mitch is super competent and most importantly produces results. My campaigns are at a 4x ROAS!!",
    name: "Cathy Paraggio",
    role: "Owner, NoNetz",
    avatarSrc: "/client pfp/cathy.png",
  },
  {
    quote:
      "Hiring Mitch has been one of the best decisions I've made for my business this year. Mitch's ability to diagnose wasted ad spend, understand new industries, and make suggestions to lower costs has really helped.",
    name: "Jordon Chavis",
    role: "Founder, Forgematic",
    avatarSrc: "/client pfp/jordan.png",
  },
  {
    quote:
      "From the minute we started the project, the in-depth research that was put into it impressed me. Off the bat performance was strong. Amazing team, amazing results.",
    name: "Bob Thompson",
    role: "Owner, Biosol Organics",
    avatarSrc: "/client pfp/bob.png",
  },
  {
    quote:
      "It's been a true pleasure working with Mitch. We are delighted with the landing page delivered, specifically the attention to detail, quick turnaround times, and great communication.",
    name: "Menachem Ani",
    role: "Founder, JXT Group",
    avatarSrc: "/client pfp/Menachem Ani.png",
  },
  {
    quote:
      "Mitch is a fantastic PPC marketer. He is a no-nonsense, straight-to-the-point marketer who really delivered for us on our campaign. I highly recommend working with him!",
    name: "Sunny Jain",
    role: "CEO, A&J Education",
    avatarSrc: "/client pfp/sunny.png",
  },
  {
    quote:
      "Responsiveness was amazing and we were able to get everything resolved. Shoulda just paid Mitch to start with... so many headaches solved at once!",
    name: "Lachlan Thompson",
    role: "Owner, Social Slingshot",
    avatarSrc: "/client pfp/lachie.png",
  },
  {
    quote: "Mitch is definitely a sharp operator, and very knowledgeable. Certainly would recommend.",
    name: "Mitchell Anderson",
    role: "IT & Technology Manager, Amtech",
    avatarSrc: "/client pfp/mitchell.png",
  },
  {
    quote:
      "Mitch has been great to work with, he really takes charge and gets stuff done without a lot of handholding, which is great! We'd highly recommend him.",
    name: "Dave Batchelor",
    role: "Founder, DialMyCalls",
    avatarSrc: "/client pfp/dave batchelor.png",
  },
  {
    quote:
      "Mitch knows Google Ads really well and he is super responsive. He's on the case in terms of making sure landing pages are well optimised and everything's set up to obtain as many customers as possible.",
    name: "Ed Forrester",
    role: "Owner, Brand Vine",
    avatarSrc: "/client pfp/ed.png",
  },
  {
    quote:
      "Mitch is extremely talented and has achieved stellar results for us, unachievable through previous managers. Mitch is also right on to new Google trends and requirements.",
    name: "Jacob Reichman",
    role: "Practice Manager, DLG",
    avatarSrc: "/client pfp/jacob.png",
  },
  {
    quote:
      "Working with Mitch from Ads That Convert has been a game-changer for our startup. He helped us iron out issues we were having with our Google Ads.",
    name: "Dominic Whyte",
    role: "Founder, Fillout",
    avatarSrc: "/client pfp/dominic whyte.png",
  },
  {
    quote:
      "The level of detail and insight that Mitch shared was mind-blowing. He's extremely knowledgeable and responsive. Immediate and clear plan of action.",
    name: "Oliver Meakings",
    role: "Co-Founder, Senja",
    avatarSrc: "/client pfp/olly.png",
  },
];

function TestimonialCard({ item, className = "" }) {
  return (
    <li
      className={`flex h-[200px] w-[320px] shrink-0 flex-col rounded-[20px] border border-zinc-400 bg-[#eeeff1] p-3 sm:h-[215px] sm:w-[360px] sm:p-4 ${className}`}
    >
      <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-3.5 w-3.5 fill-black text-black" strokeWidth={1.5} aria-hidden="true" />
        ))}
      </div>

      <p className="mt-2 text-sm leading-[1.45] text-zinc-900">{`"${item.quote}"`}</p>

      <div className="mt-auto flex items-center gap-2 pt-2.5">
        <Image
          src={item.avatarSrc}
          alt={item.name}
          width={56}
          height={56}
          className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8"
        />
        <div>
          <p className="text-sm font-semibold leading-[1.25] tracking-tight text-zinc-900">{item.name}</p>
          <p className="mt-0.5 text-sm leading-[1.35] text-zinc-800">{item.role}</p>
        </div>
      </div>
    </li>
  );
}

const testimonialRows = [0, 1].map((rowIndex) =>
  testimonials.filter((_, testimonialIndex) => testimonialIndex % 2 === rowIndex)
);

const mobileMaxCardsPerRow = 4;

export default function TestimonialSlider({
  title = "Don't take our word for it",
  description = "What happens when paid ads actually work.",
}) {
  return (
    <section aria-labelledby="testimonial-slider-title" className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <h2 id="testimonial-slider-title" className="text-3xl font-semibold tracking-[-0.02em] text-zinc-900">
            {title}
          </h2>
          <p className="max-w-3xl text-base leading-[1.6] text-zinc-800 sm:text-lg">{description}</p>
        </div>
      </div>

      <div className="relative left-1/2 mt-5 w-screen -translate-x-1/2">
        <div className="relative">
          <div className="space-y-4 overflow-hidden px-4 sm:space-y-5 sm:px-6 lg:px-8">
            {testimonialRows.map((row, rowIndex) => {
              const mobileRow = row.slice(0, mobileMaxCardsPerRow);
              const shouldHideOnMobile = rowIndex === 1;

              return (
              <div
                key={`row-${rowIndex}`}
                className={`overflow-hidden ${shouldHideOnMobile ? "hidden sm:block" : ""}`}
              >
                <ul
                  className="testimonial-horizontal-marquee flex w-max gap-4 sm:gap-5"
                  style={{
                    animationDuration: "40s",
                    animationDirection: rowIndex % 2 === 0 ? "normal" : "reverse",
                  }}
                  aria-label="Client testimonial cards"
                >
                  {[...mobileRow, ...mobileRow].map((item, itemIndex) => (
                    <TestimonialCard
                      key={`${item.name}-mobile-${itemIndex}`}
                      item={item}
                      className="sm:hidden"
                    />
                  ))}
                  {[...row, ...row].map((item, itemIndex) => (
                    <TestimonialCard
                      key={`${item.name}-desktop-${itemIndex}`}
                      item={item}
                      className="hidden sm:flex"
                    />
                  ))}
                </ul>
              </div>
            )})}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32"
            style={{
              background:
                "linear-gradient(to right, rgba(233, 234, 236, 1) 0%, rgba(233, 234, 236, 0.92) 35%, rgba(233, 234, 236, 0.55) 68%, rgba(233, 234, 236, 0) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32"
            style={{
              background:
                "linear-gradient(to left, rgba(233, 234, 236, 1) 0%, rgba(233, 234, 236, 0.92) 35%, rgba(233, 234, 236, 0.55) 68%, rgba(233, 234, 236, 0) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
