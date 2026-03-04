import VideoCard from "@/components/VideoCard";

export default function VideoCardGrid({ videos = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
      {videos.map((video) => (
        <VideoCard
          key={video.playbackId}
          playbackId={video.playbackId}
          src={video.src}
          title={video.title}
          quote={video.quote}
          clientName={video.clientName}
          clientPosition={video.clientPosition}
          companyName={video.companyName}
          companyLogoSrc={video.companyLogoSrc}
          companyLogoAlt={video.companyLogoAlt}
        />
      ))}
    </div>
  );
}
