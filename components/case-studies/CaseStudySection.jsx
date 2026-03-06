export default function CaseStudySection({ title, children }) {
  return (
    <section className="py-5 sm:py-6">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[760px]">
          <h2 className="text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#011428] sm:text-[2.25rem]">
            {title}
          </h2>
          <div className="case-study-content mt-4 text-base text-zinc-700">{children}</div>
        </div>
      </div>
    </section>
  );
}
