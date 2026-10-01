"use client";

const CandidateAssessmentDetailsSkeleton = () => {
  return (
    <section className="page-section">
      <div className="container-app">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />

        <div className="mt-6 space-y-2">
          <div className="h-8 w-2/3 animate-pulse rounded-lg bg-muted" />
          <div className="h-5 w-full max-w-2xl animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="app-card animate-pulse p-6">
                <div className="h-6 w-48 rounded bg-muted" />

                <div className="mt-2 h-4 w-72 rounded bg-muted" />

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="h-24 rounded-xl bg-muted" />
                  <div className="h-24 rounded-xl bg-muted" />
                  <div className="h-24 rounded-xl bg-muted" />
                </div>
              </div>
            ))}
          </div>

          <div className="app-card h-fit animate-pulse p-6">
            <div className="h-10 w-full rounded bg-muted" />
            <div className="mt-6 space-y-4">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
            </div>
            <div className="mt-6 h-10 w-full rounded bg-muted" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateAssessmentDetailsSkeleton;
