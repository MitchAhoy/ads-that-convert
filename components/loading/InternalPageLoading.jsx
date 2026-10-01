import GridFrame from "@/components/ui/GridFrame";
import Skeleton from "@/components/ui/Skeleton";

function LoadingAnnouncer({ label = "Loading page" }) {
  return (
    <div className="sr-only" role="status" aria-live="polite">
      {label}
    </div>
  );
}

const stageCard =
  "rounded-[28px] border border-border bg-white shadow-[0_2px_4px_rgba(26,26,24,0.04),0_16px_40px_rgba(26,26,24,0.06)]";
const featureCard =
  "flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white px-2 pt-2 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)]";

function CaseStudyCardSkeleton() {
  return (
    <div aria-hidden="true" className={featureCard}>
      <Skeleton className="aspect-16/10 w-full rounded-[18px]" />
      <div className="flex flex-1 flex-col px-4 pt-5.5 pb-6 sm:px-5">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-6 w-4/5" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-11/12" />
        <Skeleton className="mt-7 h-5 w-40" />
      </div>
    </div>
  );
}

export function CaseStudyListLoading({ title }) {
  return (
    <GridFrame bleedTop>
      <LoadingAnnouncer label={`Loading ${title}`} />
      <section className="py-8 sm:py-10" aria-hidden="true">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 xl:px-4">
          <div className={`${stageCard} px-5 py-12 sm:px-10 sm:py-16`}>
            <Skeleton className="h-8 w-60" />
            <Skeleton className="mt-6 h-12 w-full max-w-[34rem]" />
            <Skeleton className="mt-3 h-12 w-3/4 max-w-[26rem]" />
            <Skeleton className="mt-6 h-5 w-full max-w-[30rem]" />
            <Skeleton className="mt-9 h-13 w-52" />
          </div>
        </div>
      </section>

      <section className="pt-16 pb-12 sm:pt-20" aria-hidden="true">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-11 w-full max-w-[28rem]" />
          <Skeleton className="mt-5 h-5 w-full max-w-[36rem]" />
          <div className="mt-10 grid grid-cols-1 gap-5.5 sm:mt-14 md:grid-cols-2">
            <CaseStudyCardSkeleton />
            <CaseStudyCardSkeleton />
            <CaseStudyCardSkeleton />
            <CaseStudyCardSkeleton />
          </div>
        </div>
      </section>
    </GridFrame>
  );
}

export function CaseStudyDetailLoading() {
  return (
    <GridFrame bleedTop>
      <LoadingAnnouncer label="Loading case study" />
      <section className="py-8 sm:py-10" aria-hidden="true">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 xl:px-4">
          <div className={`${stageCard} px-2 pt-10 pb-2 sm:pt-14`}>
            <div className="px-3 sm:px-8">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="mt-10 h-4 w-24" />
              <Skeleton className="mt-4 h-12 w-full max-w-[36rem]" />
              <Skeleton className="mt-3 h-12 w-2/3 max-w-[24rem]" />
              <Skeleton className="mt-6 h-5 w-full max-w-[30rem]" />
            </div>
            <Skeleton className="mt-10 aspect-4/3 w-full rounded-[20px] sm:mt-12 sm:aspect-2/1" />
          </div>
        </div>
      </section>
    </GridFrame>
  );
}

export function ToolPageLoading() {
  return (
    <>
      <LoadingAnnouncer label="Loading tool" />

      <GridFrame bleedTop>
        <section className="py-8 sm:py-10" aria-hidden="true">
          <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 xl:px-4">
            <div className={`${stageCard} px-5 py-12 sm:px-10 sm:py-16`}>
              <Skeleton className="h-11 w-full max-w-[34rem]" />
              <Skeleton className="mt-6 h-5 w-full max-w-[30rem]" />
              <Skeleton className="mt-2.5 h-5 w-3/4 max-w-[22rem]" />
            </div>
          </div>
        </section>
      </GridFrame>

      <GridFrame>
        <section className="py-12" aria-hidden="true">
          <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 rounded-3xl border border-border bg-white p-5 shadow-[0_1px_2px_rgba(26,26,24,0.05),0_8px_20px_rgba(26,26,24,0.07)] sm:grid-cols-2 sm:p-8">
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-32 rounded-2xl sm:col-span-2" />
              <Skeleton className="h-12 rounded-2xl" />
              <Skeleton className="h-12 rounded-2xl" />
            </div>
          </div>
        </section>
      </GridFrame>
    </>
  );
}
