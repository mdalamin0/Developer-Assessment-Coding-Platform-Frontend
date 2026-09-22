import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import { StatsCardProps } from "@/types";



export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  iconWrapperClassName,
  trend,
}: StatsCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10"
      />

      <div className="relative">
        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {value}
            </p>
          </div>

          {/* Icon */}
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-xl",
              "bg-primary/10 text-primary",
              iconWrapperClassName,
            )}
          >
            <Icon className={cn("size-5", iconClassName)} strokeWidth={1.8} />
          </div>
        </div>

        {/* Bottom */}
        {(description || trend) && (
          <div className="mt-4 flex min-h-5 items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-semibold",
                  trend.positive === false
                    ? "text-destructive"
                    : "text-emerald-600 dark:text-emerald-400",
                )}
              >
                {trend.positive === false ? (
                  <ArrowDownRight className="size-3.5" />
                ) : (
                  <ArrowUpRight className="size-3.5" />
                )}

                {trend.value}
              </span>
            )}

            {description && (
              <span className="truncate text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
