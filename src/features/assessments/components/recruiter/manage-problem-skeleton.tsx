/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Skeleton } from "@/components/ui/skeleton";

export default function ManageProblemsSkeleton() {
  return (
    <main className="container-app py-6 sm:py-8">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="page-header">
          <div className="space-y-3">
            {/* Back Button */}
            <Skeleton className="h-8 w-40" />

            <div className="space-y-2">
              {/* Page Title */}
              <Skeleton className="h-8 w-56 sm:h-9 sm:w-64" />

              {/* Description */}
              <Skeleton className="h-5 w-full max-w-md" />
            </div>
          </div>
        </div>

        {/* Assessment Overview */}
        <section className="app-card overflow-hidden">
          <div className="app-card-content p-5 sm:p-6 lg:p-7">
            <div className="flex flex-col gap-6">
              {/* Title + Action */}
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Assessment Title */}
                    <Skeleton className="h-7 w-64 sm:h-8 sm:w-80" />

                    {/* Status Badge */}
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </div>

                  {/* Assessment Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full max-w-3xl" />
                    <Skeleton className="h-4 w-2/3 max-w-2xl" />
                  </div>
                </div>

                {/* Add Problem */}
                <Skeleton className="h-9 w-32 shrink-0 rounded-md" />
              </div>

              {/* Assessment Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/60 bg-muted/30 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-4 rounded" />
                      <Skeleton className="h-3.5 w-20" />
                    </div>

                    <Skeleton className="mt-3 h-6 w-20" />
                  </div>
                ))}
              </div>

              {/* Schedule */}
              <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/50 p-4 sm:flex-row sm:items-center">
                <Skeleton className="size-9 shrink-0 rounded-lg" />

                <div className="space-y-2">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-4 w-72 max-w-full sm:w-96" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="space-y-4">
          {/* Section Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-7 w-52" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            <Skeleton className="h-9 w-32 shrink-0 rounded-md" />
          </div>

          {/* Problem Cards */}
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border/70 bg-card"
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    {/* Problem Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Question Number */}
                        <Skeleton className="size-7 shrink-0 rounded-lg" />

                        {/* Problem Title */}
                        <Skeleton className="h-5 w-52 sm:h-6 sm:w-72" />

                        {/* Difficulty Badge */}
                        <Skeleton className="h-6 w-20 rounded-md" />

                        {/* Type Badge */}
                        <Skeleton className="h-6 w-24 rounded-md" />
                      </div>

                      {/* Description */}
                      <div className="mt-3 space-y-2">
                        <Skeleton className="h-4 w-full max-w-3xl" />
                        <Skeleton className="h-4 w-4/5 max-w-2xl" />
                      </div>

                      {/* Marks + Options */}
                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Skeleton className="size-8 shrink-0 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
