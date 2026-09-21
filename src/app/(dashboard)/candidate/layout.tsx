import RoleGuard from "@/components/guards/role.guard";
import DashboardShell from "@/components/layout/dashboard-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard roles={["CANDIDATE"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
