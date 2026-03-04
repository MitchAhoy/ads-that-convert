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
];

export default function Testimonials() {
  return (
    <section aria-labelledby="video-testimonials-title" className="py-5 sm:py-6">
      <div className="flex items-end justify-between gap-4">
        <h2 id="video-testimonials-title" className="text-3xl font-semibold tracking-[-0.02em] text-zinc-900">
          Don&apos;t take our word for it
        </h2>
      </div>

      <div className="mt-4 sm:mt-5">
        <VideoCardGrid videos={videos} />
      </div>
    </section>
  );
}
