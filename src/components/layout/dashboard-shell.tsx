"use client";

import { ReactNode, useState } from "react";
import DashboardSidebar from "./dashboard-sidebar";
import { UserRoleType } from "@/features/auth/auth.types";
import DashboardHeader from "./dashboard-header";
import { useGetMe } from "@/features/auth/hooks";

interface DashboardShellProps {
  children: ReactNode;
  role: UserRoleType;
}

export default function DashboardShell({
  children,
  role,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data } = useGetMe();
  const user = data?.data;

  return (
    <div className="min-h-screen bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 size-[28rem] rounded-full bg-chart-2/5 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0.02_250/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0.02_250/0.035)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,oklch(1_0_0/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.025)_1px,transparent_1px)]" />
      </div>

      <div className="flex min-h-screen">
        <DashboardSidebar
          role={role}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader
            user={user}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
