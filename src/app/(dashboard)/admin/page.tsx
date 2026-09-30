"use client";
import SectionHeader from "@/components/shared/dashboard/section-header";
import StatsCard from "@/components/shared/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { AdminUser, AuditLog } from "@/features/admin/admin.types";
import {
  useGetAdminUsers,
  useGetAllAssessments,
  useGetAuditLogs,
} from "@/features/admin/hooks/admin.hooks";
import { ProblemDataType } from "@/features/assessments/assessment.types";
import { useGetRecruiterAssessments } from "@/features/assessments/hooks/assessments.hooks";
import { formatDistanceToNow } from "date-fns";

import {
  Activity,
  ArrowRight,
  ClipboardCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  const { data: usersData } = useGetAdminUsers({ sortOrder: "desc" });
  const users = usersData?.data?.data ?? [];

  const { data: assessments } = useGetAllAssessments({
    sortOrder: "desc",
  });

  const activeUsers = users.filter(
    (user: AdminUser) => user.status === "ACTIVE",
  );

const {data: auditLogs} = useGetAuditLogs({sortOrder: "desc"})
const recentLogs = auditLogs?.data?.data?.slice(0, 3) ?? [];


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
            value={users?.length ?? 0}
            description="Registered platform users"
            icon={Users}
            iconWrapperClassName="bg-indigo-500/10 text-indigo-500"
          />

          <StatsCard
            title="Total Assessments"
            value={assessments?.data?.data?.length ?? 0}
            description="Across all recruiters"
            icon={ClipboardCheck}
            iconWrapperClassName="bg-violet-500/10 text-violet-500"
          />

          <StatsCard
            title="Active Users"
            value={activeUsers.length ?? 0}
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
              {recentLogs.map((log: AuditLog) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                      <Users className="size-5" strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">
                        {log.action} {log.entity.toLowerCase()}
                      </h3>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {log.user.name} · {log.user.role.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(log.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              ))}
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
            {assessments?.data?.data
              .slice(0, 2)
              .map((assessment: ProblemDataType) => (
                <div
                  key={assessment.id}
                  className="group rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                        <ClipboardCheck className="size-5" strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {assessment.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Created by {assessment.recruiter.companyName}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {assessment.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Total Problem: {assessment.problemCount ?? 0} </span>
                    <span>
                      {formatDistanceToNow(new Date(assessment.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              ))}
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
