import RoleGuard from "@/components/guards/role.guard";
import DashboardShell from "@/components/layout/dashboard-shell";
import { UserRole } from "@/features/auth/auth.types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard roles={[UserRole.CANDIDATE]}>
      <DashboardShell role={UserRole.CANDIDATE}>{children}</DashboardShell>
    </RoleGuard>
  );
}
