
import { LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  icon: LucideIcon;
  label: string;
}

export default function SectionBadge({
  icon: Icon,
  label,
}: SectionBadgeProps) {
  return (
    <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
      <Icon className="size-4 sm:size-5" />

      <p className="text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm">
        {label}
      </p>
    </div>
  );
}
;
