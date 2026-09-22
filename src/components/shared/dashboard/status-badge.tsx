import { cn } from "cn";

type StatusVariant = "default" | "success" | "warning" | "destructive" | "info";

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const StatusBadge = ({
  label,
  variant = "default",
  className,
}: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
