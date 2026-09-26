/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Skeleton } from "@/components/ui/skeleton";

export function ProblemListSkeleton() {
  return (
    <div className="space-y-3 w-full">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-full rounded-xl border border-border/70 bg-card p-4 animate-pulse"
        >
          <div className="flex items-start gap-3">
            {/* Checkbox Skeleton */}
            <Skeleton className="mt-0.5 size-5 shrink-0 rounded-md" />

            {/* Problem Info Skeleton */}
            <div className="min-w-0 flex-1">
              {/* Header Row (Title + Badges) */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Title */}
                <Skeleton className="h-5 w-48 max-w-[60%]" />
                {/* Difficulty Badge */}
                <Skeleton className="h-5 w-14 rounded-md" />
                {/* Type Badge */}
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>

              {/* Marks Skeleton */}
              <Skeleton className="mt-2 h-4 w-14" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
