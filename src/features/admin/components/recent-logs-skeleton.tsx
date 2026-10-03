const RecentLogsSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="divide-y">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 p-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Icon */}
              <div className="size-10 shrink-0 animate-pulse rounded-xl bg-muted" />

              {/* Content */}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-36 max-w-full animate-pulse rounded-md bg-muted sm:w-52" />

                <div className="h-3 w-28 max-w-full animate-pulse rounded-md bg-muted sm:w-36" />
              </div>
            </div>

            {/* Time */}
            <div className="h-3 w-16 shrink-0 animate-pulse rounded-md bg-muted sm:w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLogsSkeleton;
