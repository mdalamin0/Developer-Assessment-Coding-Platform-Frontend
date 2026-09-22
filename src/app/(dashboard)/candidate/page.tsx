import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
} from "lucide-react";

import SectionHeader from "@/components/shared/dashboard/section-header";
import StatsCard from "@/components/shared/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { candidateRoutes } from "@/routes/candidate.routes";

const CandidateDashboard = () => {
  return (
    <div className="page-section">
      <div className="container-app space-y-8">
        {/* Header */}
        <div>
          <h1 className="page-title">Candidate Dashboard</h1>

          <p className="page-description">
            Track your assessments, progress, and performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Total Assessments"
            value={12}
            description="Available to you"
            icon={ClipboardCheck}
            iconWrapperClassName="bg-indigo-500/10 text-indigo-500"
          />

          <StatsCard
            title="Completed"
            value={8}
            description="Assessments completed"
            icon={CheckCircle2}
            iconWrapperClassName="bg-emerald-500/10 text-emerald-500"
          />

          <StatsCard
            title="Average Score"
            value="84%"
            description="Across evaluated attempts"
            icon={BarChart3}
            iconWrapperClassName="bg-violet-500/10 text-violet-500"
          />
        </div>

        {/* Continue Assessment */}
        <section className="space-y-4">
          <SectionHeader
            title="Continue Assessment"
            description="Pick up where you left off."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="candidate/assessmets" />}
                className="gap-1.5"
              >
                View all
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Assessment Card */}
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

                <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                  In Progress
                </span>
              </div>

              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock3 className="size-3.5" />
                  45 min
                </span>

                <span>6 / 10 questions</span>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[60%] rounded-full bg-primary" />
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  size="sm"
                  nativeButton={false}
                  render={<Link href="/candidate/attempts/demo" />}
                  className="gap-1.5"
                >
                  Continue
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Results */}
        <section className="space-y-4">
          <SectionHeader
            title="Recent Results"
            description="Your latest assessment performance."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/candidate/results" />}
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
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2 className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      Backend Engineering Assessment
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Completed recently
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    92%
                  </p>

                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                    <BarChart3 className="size-5" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">
                      JavaScript Fundamentals
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Completed recently
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-lg font-bold text-violet-600 dark:text-violet-400">
                    86%
                  </p>

                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CandidateDashboard;
