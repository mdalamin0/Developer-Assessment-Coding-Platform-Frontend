"use client";

const CandidateAssessmentSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="app-card overflow-hidden">
          <div className="animate-pulse space-y-5 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-1 items-start gap-3">
                <div className="size-10 shrink-0 rounded-xl bg-muted" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-full rounded bg-muted" />
                  <div className="h-3 w-2/3 rounded bg-muted" />
                </div>
              </div>

              <div className="h-6 w-16 rounded-full bg-muted" />
            </div>

            <div className="flex gap-4">
              <div className="h-3 w-16 rounded bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
              <div className="h-3 w-20 rounded bg-muted" />
            </div>

            <div className="h-9 w-full rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateAssessmentSkeleton;
