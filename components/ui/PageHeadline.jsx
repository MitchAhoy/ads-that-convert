export default function PageHeadline({
  id,
  title,
  description,
  sectionClassName = "pt-4 pb-5 sm:pt-5 sm:pb-6",
  titleClassName = "mx-auto mt-3 max-w-[22ch] text-center text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-zinc-950",
  descriptionClassName = "mx-auto mt-4 max-w-[56ch] text-center text-base sm:text-md text-zinc-700",
}) {
  return (
    <section className={sectionClassName} aria-labelledby={id}>
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <h1 id={id} className={titleClassName}>
          {title}
        </h1>
        {description ? <p className={descriptionClassName}>{description}</p> : null}
      </div>
    </section>
  );
}
