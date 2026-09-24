/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Skeleton } from "@/components/ui/skeleton";

export default function AssessmentSkeleton() {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <div className="grid grid-cols-1 gap-5 auto-rows-stretch lg:grid-cols-2">
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card"
        >
          {/* Main Container */}
          <div className="flex flex-1 flex-col justify-between space-y-5 p-5 sm:p-6">
            {/* Top Content Group */}
            <div className="space-y-4">
              {/* Card Header Skeleton */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    {/* Title Skeleton */}
                    <Skeleton className="h-6 w-1/2 rounded-md" />
                    {/* Badge Skeleton */}
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </div>

                  {/* Description Skeleton  */}
                  <div className="mt-2 space-y-2 min-h-[48px]">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-4/5 rounded-md" />
                  </div>
                </div>
              </div>

            
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, mIndex) => (
                  <div
                    key={mIndex}
                    className="rounded-xl bg-muted/40 p-3 space-y-2"
                  >
                    <div className="flex items-center gap-1.5">
                      {/* Icon Skeleton */}
                      <Skeleton className="size-3.5 rounded-full" />
                      {/* Label Skeleton */}
                      <Skeleton className="h-3 w-12 rounded-md" />
                    </div>
                    {/* Value Skeleton */}
                    <Skeleton className="h-5 w-16 rounded-md mt-1.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Content Group */}
            <div className="mt-auto space-y-4">
              {/* Schedule Skeleton */}
              <div className="flex flex-col items-start gap-2 rounded-xl border border-border/60 bg-background/50 p-3.5 sm:flex-row sm:items-start sm:gap-3">
                {/* Calendar Icon Skeleton */}
                <Skeleton className="size-8 shrink-0 rounded-lg" />

                <div className="min-w-0 w-full space-y-2">
                  {/* Label */}
                  <Skeleton className="h-3 w-28 rounded-md" />
                  {/* Date Range */}
                  <Skeleton className="h-4 w-3/4 rounded-md mt-1" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="border-t border-border/60 pt-4">
                <div className="flex justify-center md:justify-around flex-wrap items-center gap-2">
                  {/* Edit Button */}
                  <Skeleton className="h-9 w-20 rounded-md" />
                  {/* Add Problems Button */}
                  <Skeleton className="h-9 w-32 rounded-md" />
                  {/* View Details Button */}
                  <Skeleton className="h-9 w-28 rounded-md" />
                  {/* Delete Icon Button */}
                  <Skeleton className="size-9 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
