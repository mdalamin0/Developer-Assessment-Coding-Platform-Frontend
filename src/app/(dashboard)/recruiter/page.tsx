"use client";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Gauge,
  Users,
} from "lucide-react";

import SectionHeader from "@/components/shared/dashboard/section-header";
import StatsCard from "@/components/shared/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { useGetRecruiterDashboardStats } from "@/features/recruiter/hooks/recruiter.hooks";
import { useGetRecruiterAssessments } from "@/features/assessments/hooks/assessments.hooks";
import { ProblemDataType } from "@/features/assessments/assessment.types";
import { useRecruiterCandidates } from "@/features/candidates/hooks/candidate.hooks";
import { CandidateData } from "@/features/candidates/candidate.types";

const RecruiterDashboard = () => {
  const { data } = useGetRecruiterDashboardStats();
  const stats = data?.data ?? [];

  const { data: assessments } = useGetRecruiterAssessments({
    sortOrder: "desc",
  });

  const { data: candidatesData } = useRecruiterCandidates({
    sortOrder: "desc",
  });

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
            value={stats?.totalAssessments ?? 0}
            description="Created assessments"
            icon={ClipboardCheck}
            iconWrapperClassName="bg-indigo-500/10 text-indigo-500"
          />

          <StatsCard
            title="Total Candidates"
            value={stats?.totalCandidates ?? 0}
            description="Invited candidates"
            icon={Users}
            iconWrapperClassName="bg-blue-500/10 text-blue-500"
          />

          <StatsCard
            title="Average Score"
            value={stats?.averageScore ?? 0}
            description="Across completed assessments"
            icon={Gauge}
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
            {assessments?.data?.data
              ?.slice(0, 2)
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
                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                          {assessment.description}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {assessment.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="size-3.5" />
                      {assessment.problemCount} problems
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 className="size-3.5" />
                      {assessment.duration} min
                    </span>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      nativeButton={false}
                      render={
                        <Link
                          href={`/recruiter/assessments/${assessment.id}/problems`}
                        />
                      }
                      className="gap-1.5"
                    >
                      View assessment
                      <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
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
                render={<Link href="/recruiter/candidates" />}
                className="gap-1.5"
              >
                View candidates
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="divide-y">
              {candidatesData?.data?.data?.slice(0, 2).map((candidate: CandidateData) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {candidate.image ? (
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="size-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {candidate.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">
                        {candidate.name}
                      </h3>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {candidate.candidate.skills?.length
                          ? candidate.candidate.skills.slice(0, 3).join(", ")
                          : candidate.email}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      {candidate.status}
                    </span>
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      {new Date(candidate.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
