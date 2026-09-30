import VideoCardGrid from "@/components/VideoCardGrid";

const videos = [
  {
    playbackId: "NIOe3Q01id1Zo1EQuk45sl00n2n1udc2nIgM00cLOjmGX4",
    src: "https://stream.mux.com/NIOe3Q01id1Zo1EQuk45sl00n2n1udc2nIgM00cLOjmGX4.m3u8?redundant_streams=true",
    title: "Video One",
    quote:
      "Not only was he able to deliver paying customers below our target cost per acquisition, but he is incredible at helping us stay on top of what's going on in the account.",
    clientName: "Olly",
    clientPosition: "Founder @ Senja",
    companyName: "Senja",
    companyLogoSrc: "/client-logos/senja.png",
    companyLogoAlt: "Senja logo",
  },
  {
    playbackId: "o39ijYbskxaXcbPNzyGSPfZ01lHLi02bDHF57u6ClC1GI",
    src: "https://stream.mux.com/o39ijYbskxaXcbPNzyGSPfZ01lHLi02bDHF57u6ClC1GI.m3u8",
    title: "Video Two",
    quote:
      "He was very proactive in keeping tabs on our ad programs, making great recommendations, and we've driven several million dollars in ARR because of him.",
    clientName: "Natasha",
    clientPosition: "Marketing @ Nooks",
    companyName: "Nooks",
    companyLogoSrc: "/client-logos/nooks.png",
    companyLogoAlt: "Nooks logo",
  },
  {
    playbackId: "1IcqeeLIerQu8erBrVpnNQGz902Y6ogvjCOI7O02QG5jk",
    src: "https://stream.mux.com/1IcqeeLIerQu8erBrVpnNQGz902Y6ogvjCOI7O02QG5jk.m3u8?redundant_streams=true",
    title: "Video Three",
    quote:
      "Mitch is a true expert at what he does and I would highly recommend him to other SaaS companies looking for a paid ad specialist.",
    clientName: "Lauren",
    clientPosition: "Marketing @ Paperless Pipeline",
    companyName: "Paperless Pipeline",
    companyLogoSrc: "/client-logos/paperlesspipeline.png",
    companyLogoAlt: "Paperless Pipeline logo",
  },
  {
    playbackId: "PJZ1UP1vj14AceCj4lHVKfZ17ETXsRLPJojNL2N4nrs",
    src: "https://stream.mux.com/PJZ1UP1vj14AceCj4lHVKfZ17ETXsRLPJojNL2N4nrs.m3u8",
    title: "Video Four",
    quote:
      "Some consultants, they kind of have their secret sauce and they want to keep it to themselves. But for Mitch, that's not the case.",
    clientName: "Sander",
    clientPosition: "Founder @ Checkout Page",
    companyName: "Checkout Page",
    companyLogoSrc: "/client-logos/checkout-page-logo.png",
    companyLogoAlt: "Checkout Page logo",
  },
];

export default function Testimonials({
  title = "Don't take my word for it",
  titleAlign = "left",
  sectionId = "dont-take-my-word-for-it",
}) {
  const hasTitle = Boolean(title);
  const isCenteredTitle = titleAlign === "center";

  return (
    <section
      id={sectionId}
      aria-labelledby={hasTitle ? "video-testimonials-title" : undefined}
      aria-label={hasTitle ? undefined : "Video testimonials"}
      className="py-16"
    >
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        {hasTitle ? (
          <div
            className={`flex items-end gap-4 ${isCenteredTitle ? "justify-center" : "justify-between"}`}
          >
            <h2
              id="video-testimonials-title"
              className={`font-display text-h2 text-ink ${isCenteredTitle ? "text-center" : "text-left"}`}
            >
              {title}
            </h2>
          </div>
        ) : null}

        <div className={hasTitle ? "mt-10 sm:mt-14" : ""}>
          <VideoCardGrid videos={videos} />
        </div>
      </div>
    </section>
  );
}
