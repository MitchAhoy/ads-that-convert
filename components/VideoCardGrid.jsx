import VideoCard from "@/components/VideoCard";

export default function VideoCardGrid({ videos = [] }) {
  return (
    // Below `lg` the cards are a swipe row (one card plus a peek of the next),
    // so four videos don't stack into several screens. The negative margin lets
    // the row bleed to the viewport edge; the vertical padding leaves room for
    // the card shadows inside the scroll container.
    <ul className="hide-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-6 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5.5 lg:overflow-visible lg:p-0">
      {videos.map((video) => (
        <li key={video.playbackId} className="w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
          <VideoCard
            playbackId={video.playbackId}
            src={video.src}
            title={video.title}
            quote={video.quote}
            clientName={video.clientName}
            clientPosition={video.clientPosition}
            companyName={video.companyName}
            companyLogoSrc={video.companyLogoSrc}
            companyLogoAlt={video.companyLogoAlt}
            companyLogoClassName={video.companyLogoClassName}
          />
        </li>
      ))}
    </ul>
  );
}
