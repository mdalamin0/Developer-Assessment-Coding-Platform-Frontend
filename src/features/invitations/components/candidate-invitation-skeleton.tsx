/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Skeleton } from "@/components/ui/skeleton";

const CandidateInvitationSkeleton = () => {
  return (
    <div>
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/60 bg-muted/20">
              <th className="px-6 py-3.5 text-left">
                <Skeleton className="h-4 w-24" />
              </th>

              <th className="px-4 py-3.5 text-left">
                <Skeleton className="h-4 w-16" />
              </th>

              <th className="px-4 py-3.5 text-left">
                <Skeleton className="h-4 w-12" />
              </th>

              <th className="px-4 py-3.5 text-left">
                <Skeleton className="h-4 w-20" />
              </th>

              <th className="px-4 py-3.5 text-left">
                <Skeleton className="h-4 w-14" />
              </th>

              <th className="px-6 py-3.5 text-right">
                <Skeleton className="ml-auto h-4 w-14" />
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 6 }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-border/50 last:border-0"
              >
                {/* Assessment */}
                <td className="px-6 py-5">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-3.5 w-64" />
                  </div>
                </td>

                {/* Duration */}
                <td className="px-4 py-5">
                  <Skeleton className="h-4 w-20" />
                </td>

                {/* Marks */}
                <td className="px-4 py-5">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                </td>

                {/* Schedule */}
                <td className="px-4 py-5">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3.5 w-24" />
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-5">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>

                {/* Action */}
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-border/60 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-4 p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3.5 w-full max-w-[280px]" />
                <Skeleton className="h-3.5 w-3/4" />
              </div>

              <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border p-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-4 w-20" />
              </div>

              <div className="rounded-xl border p-3">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="mt-2 h-4 w-16" />
              </div>
            </div>

            {/* Schedule */}
            <div className="border-t pt-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-2 h-3.5 w-24" />
            </div>

            {/* Action */}
            <div className="flex gap-2 border-t pt-3">
              <Skeleton className="h-9 flex-1 rounded-md" />
              <Skeleton className="h-9 flex-1 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateInvitationSkeleton;
