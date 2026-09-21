import {
  BarChart3,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

export const candidateRoutes = [
  {
    label: "Overview",
    href: "/candidate",
    icon: LayoutDashboard,
  },
  {
    label: "Assessments",
    href: "/candidate/assessments",
    icon: ClipboardCheck,
  },
  {
    label: "Invitations",
    href: "/candidate/invitations",
    icon: FileText,
  },
  {
    label: "My Results",
    href: "/candidate/results",
    icon: BarChart3,
  },
  {
    label: "Profile",
    href: "/candidate/profile",
    icon: UserRound,
  },
];
