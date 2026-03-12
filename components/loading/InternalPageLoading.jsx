import Skeleton from "@/components/ui/Skeleton";

function LoadingAnnouncer({ label = "Loading page" }) {
  return (
    <div className="sr-only" role="status" aria-live="polite">
      {label}
    </div>
  );
}

function HeadlineSkeleton() {
  return (
    <section className="pt-4 pb-5 sm:pt-5 sm:pb-6" aria-hidden="true">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <Skeleton className="mx-auto mt-3 h-12 w-full max-w-[22rem] rounded-2xl sm:h-14 sm:max-w-[30rem]" />
        <Skeleton className="mx-auto mt-4 h-5 w-full max-w-[42rem] rounded-2xl sm:h-6" />
        <Skeleton className="mx-auto mt-3 h-5 w-4/5 max-w-[30rem] rounded-2xl sm:h-6" />
      </div>
    </section>
  );
}

function CaseStudyCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="flex h-full flex-col rounded-[1.5rem] border border-zinc-200 bg-zinc-100/90 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-4"
    >
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />

      <div className="flex flex-1 flex-col px-1 pb-2 pt-4">
        <Skeleton className="mt-2 h-8 w-4/5 rounded-2xl" />
        <Skeleton className="mt-3 h-5 w-full rounded-2xl" />
        <Skeleton className="mt-2 h-5 w-11/12 rounded-2xl" />
        <Skeleton className="mt-4 h-5 w-1/3 rounded-2xl" />
        <Skeleton className="mt-5 h-12 w-32 rounded-2xl" />
      </div>
    </article>
  );
}

export function CaseStudyListLoading({ title }) {
  return (
    <>
      <LoadingAnnouncer label={`Loading ${title}`} />
      <HeadlineSkeleton />

      <section className="py-5 sm:py-6" aria-label={`${title} loading`}>
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <CaseStudyCardSkeleton />
            <CaseStudyCardSkeleton />
            <CaseStudyCardSkeleton />
            <CaseStudyCardSkeleton />
          </div>
        </div>
      </section>
    </>
  );
}

export function CaseStudyDetailLoading() {
  return (
    <>
      <LoadingAnnouncer label="Loading case study" />
      <section className="pt-4 pb-5 sm:pt-5 sm:pb-6" aria-label="Case study loading">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:items-start">
            <div>
              <Skeleton className="h-12 w-full max-w-[18rem] rounded-2xl sm:h-14 sm:max-w-[26rem]" />
              <Skeleton className="mt-4 h-6 w-full max-w-[20rem] rounded-2xl" />
              <Skeleton className="mt-8 h-5 w-40 rounded-2xl" />
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100/90 p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
              <Skeleton className="aspect-[16/9] w-full rounded-none" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-6" aria-hidden="true">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="rounded-[1.75rem] border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
              <Skeleton className="h-7 w-48 rounded-2xl" />
              <Skeleton className="mt-5 h-5 w-full rounded-2xl" />
              <Skeleton className="mt-3 h-5 w-full rounded-2xl" />
              <Skeleton className="mt-3 h-5 w-5/6 rounded-2xl" />
            </div>

            <div className="rounded-[1.75rem] border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
              <Skeleton className="h-7 w-56 rounded-2xl" />
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Skeleton className="h-24 rounded-[1.25rem]" />
                <Skeleton className="h-24 rounded-[1.25rem]" />
                <Skeleton className="h-24 rounded-[1.25rem]" />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
              <Skeleton className="h-14 w-full rounded-[1.25rem]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ToolPageLoading() {
  return (
    <>
      <LoadingAnnouncer label="Loading tool" />
      <HeadlineSkeleton />

      <section className="py-5 sm:py-6" aria-label="Tool loading">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-100/90 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-32 rounded-[1.25rem] sm:col-span-2" />
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-12 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-6" aria-hidden="true">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 rounded-[1.75rem] border border-zinc-200 bg-zinc-100/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:p-6">
            <Skeleton className="h-8 w-56 rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-[1.25rem]" />
            <Skeleton className="h-14 w-full rounded-[1.25rem]" />
            <Skeleton className="h-14 w-full rounded-[1.25rem]" />
          </div>
        </div>
      </section>
    </>
  );
}
