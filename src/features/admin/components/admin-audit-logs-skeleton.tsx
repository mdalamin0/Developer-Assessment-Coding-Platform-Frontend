const AdminAuditLogsSkeleton = () => {
  return (
    <>
      {/* Desktop */}
      <div className="app-card hidden overflow-hidden md:block">
        <div className="divide-y divide-border/60">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-6 items-center gap-4 px-5 py-4"
            >
              <div className="col-span-1 flex items-center gap-3">
                <div className="size-9 animate-pulse rounded-full bg-muted" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-2.5 w-32 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />

              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />

              <div className="h-3 w-28 animate-pulse rounded bg-muted" />

              <div className="space-y-2">
                <div className="h-2.5 w-32 animate-pulse rounded bg-muted" />
                <div className="h-2.5 w-28 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-3 w-28 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="app-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-1 items-center gap-3">
                <div className="size-10 animate-pulse rounded-full bg-muted" />

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-2.5 w-36 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4">
              <div className="space-y-2">
                <div className="h-2.5 w-12 animate-pulse rounded bg-muted" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
              </div>

              <div className="space-y-2">
                <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-2.5 w-16 animate-pulse rounded bg-muted" />
              <div className="h-12 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminAuditLogsSkeleton;
