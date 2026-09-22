import { LucideIcon } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconClassName?: string;
  iconWrapperClassName?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
}
