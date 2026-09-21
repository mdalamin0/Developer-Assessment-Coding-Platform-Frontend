import {
  BarChart3,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  ListChecks,
  UserRound,
  WalletCards,
} from "lucide-react";

export const recruiterRoutes = [
  {
    label: "Overview",
    href: "/recruiter",
    icon: LayoutDashboard,
  },
  {
    label: "Assessments",
    href: "/recruiter/assessments",
    icon: ClipboardCheck,
  },
  {
    label: "Problems",
    href: "/recruiter/problems",
    icon: ListChecks,
  },
  {
    label: "Evaluations",
    href: "/recruiter/evaluations",
    icon: FileText,
  },
  {
    label: "Results",
    href: "/recruiter/results",
    icon: BarChart3,
  },
  {
    label: "Payments",
    href: "/recruiter/payments",
    icon: WalletCards,
  },
  {
    label: "Profile",
    href: "/recruiter/profile",
    icon: UserRound,
  },
];
