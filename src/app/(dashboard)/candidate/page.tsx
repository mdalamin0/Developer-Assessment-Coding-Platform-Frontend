"use client";

import { useMemo } from "react";
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
import { useGetCandidateInvitations } from "@/features/invitations/hooks/invitation.hooks";
import { useGetMyResults } from "@/features/results/hooks/results.hooks";
import { InvitationData } from "@/features/invitations/invitation.types";
import { CandidateResult } from "@/features/results/results.types";


const CandidateDashboard = () => {
  const { data: invitationsData, isLoading: invitationsLoading } =
    useGetCandidateInvitations({});

  const { data: resultsData, isLoading: resultsLoading } = useGetMyResults({});

  const invitations: InvitationData[] = invitationsData?.data?.data ?? [];

  const results: CandidateResult[] = resultsData?.data?.data ?? [];

  const recentInvitations = useMemo(
    () => invitations.slice(0, 2),
    [invitations],
  );

  const recentResults = useMemo(() => results.slice(0, 2), [results]);

  const getInvitationStatus = (status: InvitationData["status"]) => {
    if (status === "PENDING") {
      return {
        label: "Pending",
        className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      };
    }

    if (status === "ACCEPTED") {
      return {
        label: "Accepted",
        className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      };
    }

    if (status === "DECLINED") {
      return {
        label: "Declined",
        className: "bg-destructive/10 text-destructive",
      };
    }

    return {
      label: "Expired",
      className: "bg-muted text-muted-foreground",
    };
  };

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
            value={invitations.length}
            description="Available to you"
            icon={ClipboardCheck}
            iconWrapperClassName="bg-indigo-500/10 text-indigo-500"
          />

          <StatsCard
            title="Completed"
            value={results.length}
            description="Assessments completed"
            icon={CheckCircle2}
            iconWrapperClassName="bg-emerald-500/10 text-emerald-500"
          />

          <StatsCard
            title="Average Score"
            value={
              results.length
                ? `${Math.round(
                    results.reduce(
                      (total, result) => total + Number(result.totalScore),
                      0,
                    ) / results.length,
                  )}%`
                : "0%"
            }
            description="Across evaluated attempts"
            icon={BarChart3}
            iconWrapperClassName="bg-violet-500/10 text-violet-500"
          />
        </div>

        {/* Recent Assessments */}
        <section className="min-w-0 space-y-4">
          <SectionHeader
            title="Recent Assessments"
            description="Assessments you've been invited to."
            action={
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href="/candidate/assessments" />}
                className="shrink-0 gap-1.5"
              >
                View all
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          {invitationsLoading ? (
            <div className="grid min-w-0 gap-4 lg:grid-cols-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="h-48 min-w-0 animate-pulse rounded-2xl border bg-muted/40"
                />
              ))}
            </div>
          ) : recentInvitations.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center">
              <ClipboardCheck className="mx-auto size-8 text-muted-foreground" />

              <h3 className="mt-3 font-semibold">No assessments yet</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Your assigned assessments will appear here.
              </p>
            </div>
          ) : (
            <div className="grid min-w-0 gap-4 lg:grid-cols-2">
              {recentInvitations.map((invitation) => {
                const status = getInvitationStatus(invitation.status);

                return (
                  <div
                    key={invitation.id}
                    className="group min-w-0 overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Card Header */}
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                        <ClipboardCheck className="size-5" strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <h3 className="min-w-0 flex-1 truncate font-semibold">
                            {invitation.assessment.title}
                          </h3>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>

                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {invitation.assessment.description}
                        </p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      <span className="flex shrink-0 items-center gap-1.5">
                        <Clock3 className="size-3.5" />
                        {invitation.assessment.duration} min
                      </span>

                      <span className="shrink-0">
                        {invitation.assessment.totalMarks} marks
                      </span>

                      <span className="shrink-0">
                        Pass: {invitation.assessment.passingMarks}
                      </span>
                    </div>

                    {/* Action */}
                    <div className="mt-5">
                      <Button
                        size="sm"
                        nativeButton={false}
                        render={
                          <Link
                            href={`/candidate/assessments/${invitation.assessment.id}`}
                          />
                        }
                        className="w-full gap-1.5 sm:w-auto sm:float-right"
                      >
                        View assessment
                        <ArrowRight className="size-3.5" />
                      </Button>

                      <div className="clear-both" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
                render={<Link href={"/candidate/results"} />}
                className="gap-1.5"
              >
                View all
                <ArrowRight className="size-3.5" />
              </Button>
            }
          />

          {resultsLoading ? (
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="divide-y">
                {[1, 2].map((item) => (
                  <div key={item} className="h-20 animate-pulse bg-muted/40" />
                ))}
              </div>
            </div>
          ) : recentResults.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center">
              <BarChart3 className="mx-auto size-8 text-muted-foreground" />
              <h3 className="mt-3 font-semibold">No results yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your completed assessment results will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="divide-y">
                {recentResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between gap-4 p-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="size-5" strokeWidth={1.8} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold">
                          {result?.attempt?.assessment?.title}
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Assessment result
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {result.totalScore}%
                      </p>

                      <p className="text-xs text-muted-foreground">Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CandidateDashboard;
