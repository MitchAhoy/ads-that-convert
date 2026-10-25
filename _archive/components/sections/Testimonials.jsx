import VideoCardGrid from "@/components/VideoCardGrid";
import { videos } from "@/components/sections/videoTestimonialsData";

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
