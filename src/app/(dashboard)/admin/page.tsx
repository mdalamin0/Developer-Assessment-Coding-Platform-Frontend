import SectionHeader from "@/components/shared/dashboard/section-header";
import StatsCard from "@/components/shared/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  ClipboardCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="page-section">
      <div className="container-app space-y-8">
        {/* Header */}
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-description">
            Monitor users, assessments, and platform activity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Total Users"
            value={1248}
            description="Registered platform users"
            icon={Users}
            iconWrapperClassName="bg-indigo-500/10 text-indigo-500"
          />

          <StatsCard
            title="Total Assessments"
            value={86}
            description="Across all recruiters"
            icon={ClipboardCheck}
            iconWrapperClassName="bg-violet-500/10 text-violet-500"
          />

          <StatsCard
            title="Active Users"
            value={1124}
            description="Currently active accounts"
            icon={ShieldCheck}
            iconWrapperClassName="bg-emerald-500/10 text-emerald-500"
          />
        </div>

        {/* User Activity */}
        <section className="space-y-4">
          <SectionHeader
            title="User Activity"
            description="Recent activity across the platform."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/admin/users" />}
                className="gap-1.5"
              >
                View users
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="divide-y">
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                    <Users className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      New recruiter registered
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Sarah Johnson joined the platform
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-xs text-muted-foreground">
                  10 min ago
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      Candidate account activated
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Michael Brown verified his email
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-xs text-muted-foreground">
                  32 min ago
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                    <ClipboardCheck className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      Assessment created
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Frontend Developer Assessment was created
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-xs text-muted-foreground">
                  1 hour ago
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Assessments */}
        <section className="space-y-4">
          <SectionHeader
            title="Recent Assessments"
            description="Latest assessments created on the platform."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/admin/audit-logs" />}
                className="gap-1.5"
              >
                View activity
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="group rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                    <ClipboardCheck className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                      Full Stack Developer Assessment
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Created by Sarah Johnson
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>12 candidates</span>
                <span>2 hours ago</span>
              </div>
            </div>

            <div className="group rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                    <ClipboardCheck className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                      React Frontend Assessment
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Created by David Wilson
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                  Draft
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>8 candidates</span>
                <span>5 hours ago</span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Audit Activity */}
        <section className="space-y-4">
          <SectionHeader
            title="Recent Audit Activity"
            description="Latest administrative actions and platform events."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/admin/audit-logs" />}
                className="gap-1.5"
              >
                Audit logs
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Activity className="size-5" strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold">
                  System activity is being monitored
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Review authentication events, user changes, assessment
                  activity, and other administrative actions from the audit
                  logs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
