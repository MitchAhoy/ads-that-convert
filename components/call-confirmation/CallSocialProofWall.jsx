import Image from "next/image";
import { Star } from "lucide-react";
import { textTestimonials } from "@/components/sections/testimonialsData";

const featuredTestimonials = textTestimonials.slice(0, 8);

function SocialProofCard({ testimonial }) {
  return (
    <article className="h-full rounded-2xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
      <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-zinc-900 text-zinc-900" strokeWidth={1.5} aria-hidden="true" />
        ))}
      </div>
      <p className="mt-3 text-base leading-[1.6] text-zinc-900">{`"${testimonial.quote}"`}</p>
      <footer className="mt-4 border-t border-zinc-300 pt-4">
        <div className="flex items-center gap-3">
          <Image
            src={testimonial.avatarSrc}
            alt={testimonial.name}
            width={56}
            height={56}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-base font-semibold leading-[1.35] text-zinc-900">{testimonial.name}</p>
            <p className="text-base text-zinc-600">{testimonial.role}</p>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default function CallSocialProofWall() {
  return (
    <section className="py-5 sm:py-6" aria-labelledby="social-proof-title">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px] text-center">
          <h2
            id="social-proof-title"
            className="text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950"
          >
            Founders trust this process for a reason
          </h2>
          <p className="mt-3 text-base sm:text-lg text-zinc-700">
            Real feedback from teams that wanted predictable growth, tighter ad efficiency, and clearer direction.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:grid-cols-2 xl:grid-cols-4">
          {featuredTestimonials.map((testimonial) => (
            <SocialProofCard key={`${testimonial.name}-${testimonial.role}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
