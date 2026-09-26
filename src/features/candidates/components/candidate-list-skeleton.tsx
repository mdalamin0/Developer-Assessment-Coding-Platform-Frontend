/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import React from 'react';

const CandidateListSkeleton = () => {
  return (
    <div className="divide-y divide-border/60">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="size-10 animate-pulse rounded-full bg-muted" />

            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-3 w-44 animate-pulse rounded bg-muted" />
            </div>
          </div>

          <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
        </div>
      ))}
    </div>
  );
};

export default CandidateListSkeleton;