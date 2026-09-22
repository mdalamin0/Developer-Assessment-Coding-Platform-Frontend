import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Users,
} from "lucide-react";

import SectionHeader from "@/components/shared/dashboard/section-header";
import StatsCard from "@/components/shared/dashboard/stats-card";
import { Button } from "@/components/ui/button";

const RecruiterDashboard = () => {
  return (
    <div className="page-section">
      <div className="container-app space-y-8">
        {/* Header */}
        <div>
          <h1 className="page-title">Recruiter Dashboard</h1>
          <p className="page-description">
            Manage assessments, candidates, and evaluation progress.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Total Assessments"
            value={24}
            description="Created assessments"
            icon={ClipboardCheck}
            iconWrapperClassName="bg-indigo-500/10 text-indigo-500"
          />

          <StatsCard
            title="Total Candidates"
            value={186}
            description="Invited candidates"
            icon={Users}
            iconWrapperClassName="bg-blue-500/10 text-blue-500"
          />

          <StatsCard
            title="Evaluations Pending"
            value={17}
            description="Awaiting evaluation"
            icon={BarChart3}
            iconWrapperClassName="bg-amber-500/10 text-amber-500"
          />
        </div>

        {/* Recent Assessments */}
        <section className="space-y-4">
          <SectionHeader
            title="Recent Assessments"
            description="Your latest created assessments."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/recruiter/assessments" />}
                className="gap-1.5"
              >
                View all
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
                      React, Node.js & PostgreSQL
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Published
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  24 candidates
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5" />
                  60 min
                </span>
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/recruiter/assessments/demo" />}
                  className="gap-1.5"
                >
                  View assessment
                  <ArrowRight className="size-3.5" />
                </Button>
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
                      JavaScript, React & TypeScript
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                  Draft
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  12 candidates
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5" />
                  45 min
                </span>
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/recruiter/assessments/demo" />}
                  className="gap-1.5"
                >
                  View assessment
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pending Evaluations */}
        <section className="space-y-4">
          <SectionHeader
            title="Pending Evaluations"
            description="Submissions waiting for your review."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/recruiter/evaluations" />}
                className="gap-1.5"
              >
                View all
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="divide-y">
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                    <BarChart3 className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      Backend Engineering Assessment
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      5 submissions awaiting evaluation
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/recruiter/evaluations" />}
                  className="shrink-0 gap-1.5"
                >
                  Evaluate
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>

              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                    <ClipboardCheck className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      JavaScript Fundamentals
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      3 submissions awaiting evaluation
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/recruiter/evaluations" />}
                  className="shrink-0 gap-1.5"
                >
                  Review
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Candidates */}
        <section className="space-y-4">
          <SectionHeader
            title="Recent Candidates"
            description="Candidates who recently interacted with your assessments."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/recruiter/results" />}
                className="gap-1.5"
              >
                View results
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="divide-y">
              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    AR
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      Alex Rahman
                    </h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      Full Stack Developer Assessment
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-4" />
                    <span className="text-sm font-semibold">92%</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Completed
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-semibold text-violet-500">
                    SM
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      Sarah Miller
                    </h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      React Frontend Assessment
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <Clock3 className="size-4" />
                    <span className="text-sm font-semibold">In Progress</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Started recently
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
