"use client";

import { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Premium ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 size-[28rem] rounded-full bg-chart-2/5 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0.02_250/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0.02_250/0.035)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(to_right,oklch(1_0_0/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.025)_1px,transparent_1px)]" />
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar will be added here */}
        <aside className="hidden w-64 shrink-0 border-r bg-card/80 backdrop-blur-xl lg:block">
          <div className="flex h-full min-h-screen items-center justify-center p-6">
            <span className="text-sm text-muted-foreground">
              Dashboard Sidebar
            </span>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header will be added here */}
          <header className="sticky top-0 z-30 h-16 border-b bg-background/80 backdrop-blur-xl">
            <div className="flex h-full items-center px-4 sm:px-6 lg:px-8">
              <span className="text-sm font-medium text-muted-foreground">
                Dashboard Header
              </span>
            </div>
          </header>

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
