import RoleGuard from "@/components/guards/role.guard";
import DashboardShell from "@/components/layout/dashboard-shell";
import { UserRole } from "@/features/auth/auth.types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard roles={[UserRole.RECRUITER, UserRole.ADMIN]}>
      <DashboardShell role={UserRole.RECRUITER}>{children}</DashboardShell>
    </RoleGuard>
  );
}
