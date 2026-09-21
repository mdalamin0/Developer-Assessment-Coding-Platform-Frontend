import {
  History,
  LayoutDashboard,
  Users,
} from "lucide-react";

export const adminRoutes = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Audit Logs",
    href: "/admin/audit-logs",
    icon: History,
  },
];
