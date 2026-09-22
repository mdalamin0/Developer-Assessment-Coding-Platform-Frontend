/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ProblemCardSkeleton = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="data-card">
          {/* Header */}
          <div className="data-card-header">
            <div className="min-w-0 flex-1">
              {/* Title */}
              <Skeleton className="h-5 w-3/4" />

              {/* Description */}
              <Skeleton className="mt-2 h-4 w-full max-w-[90%]" />
              <Skeleton className="mt-1 h-4 w-2/3" />
            </div>

            {/* Desktop Actions */}
            <div className="hidden shrink-0 items-center gap-2 md:flex">
              <Button
                size="icon-sm"
                variant="outline"
                disabled
                className="pointer-events-none"
              >
                <Pencil className="text-muted-foreground/40" />
              </Button>

              <Button
                size="icon-sm"
                variant="outline"
                disabled
                className="pointer-events-none"
              >
                <Trash2 className="text-muted-foreground/40" />
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 border-t border-border/60 px-5 py-4">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-6 w-12 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>

            {/* Mobile Actions */}
            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <Button
                size="icon-sm"
                variant="outline"
                disabled
                className="pointer-events-none"
              >
                <Pencil className="text-muted-foreground/40" />
              </Button>

              <Button
                size="icon-sm"
                variant="outline"
                disabled
                className="pointer-events-none"
              >
                <Trash2 className="text-muted-foreground/40" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProblemCardSkeleton;
