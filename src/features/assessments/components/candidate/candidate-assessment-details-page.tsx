"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Target,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/shared/dashboard/section-header";
import { useGetCandidateSingleAssessment } from "../../hooks/assessments.hooks";
import CandidateAssessmentDetailsSkeleton from "./candidate-assessment-details-skeleton";
import CandidateAssessmentDetailsError from "./candidate-assessment-details-error";



interface CandidateAssessmentDetailsPageProps {
  id: string;
}

const CandidateAssessmentDetailsPage = ({
  id,
}: CandidateAssessmentDetailsPageProps) => {
  const { data, isLoading, isError, refetch } =
    useGetCandidateSingleAssessment(id);

  if (isLoading) {
    return <CandidateAssessmentDetailsSkeleton />;
  }

  if (isError) {
    return <CandidateAssessmentDetailsError onRetry={() => refetch()} />;
  }

  const result = data?.data;

  if (!result) {
    return <CandidateAssessmentDetailsError onRetry={() => refetch()} />;
  }

  const { assessment, invitation } = result;

  const isAvailable =
    assessment.status === "PUBLISHED" && invitation.status === "ACCEPTED";

  return (
    <section className="page-section">
      <div className="container-app">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/candidate/assessments" />}
            className="gap-2 px-2"
          >
            <ArrowLeft className="size-4" />
            Back to Assessments
          </Button>
        </div>

        <SectionHeader
          title={assessment.title}
          description={
            assessment.description ??
            "Review the assessment details before you begin."
          }
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Assessment Overview */}
            <div className="app-card">
              <div className="app-card-header">
                <div>
                  <h2 className="section-title">Assessment Overview</h2>
                  <p className="section-description">
                    Review the assessment requirements and schedule.
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className="rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-primary"
                >
                  {assessment.status}
                </Badge>
              </div>

              <div className="app-card-content">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock3 className="size-4 text-primary" />
                      <span className="text-xs">Duration</span>
                    </div>

                    <p className="mt-2 text-lg font-semibold">
                      {assessment.duration} min
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="size-4 text-primary" />
                      <span className="text-xs">Total Marks</span>
                    </div>

                    <p className="mt-2 text-lg font-semibold">
                      {assessment.totalMarks}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="size-4 text-primary" />
                      <span className="text-xs">Passing Marks</span>
                    </div>

                    <p className="mt-2 text-lg font-semibold">
                      {assessment.passingMarks}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="app-card">
              <div className="app-card-header">
                <div>
                  <h2 className="section-title">Assessment Schedule</h2>
                  <p className="section-description">
                    Make sure you complete the assessment within the available
                    time.
                  </p>
                </div>
              </div>

              <div className="app-card-content">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/30 p-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CalendarDays className="size-4" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Starts</p>

                      <p className="mt-1 text-sm font-semibold">
                        {format(
                          new Date(assessment.startAt),
                          "MMM d, yyyy • h:mm a",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-muted/30 p-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CalendarDays className="size-4" />
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Ends</p>

                      <p className="mt-1 text-sm font-semibold">
                        {format(
                          new Date(assessment.endAt),
                          "MMM d, yyyy • h:mm a",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Invitation */}
            <div className="app-card">
              <div className="app-card-header">
                <div>
                  <h2 className="section-title">Invitation Details</h2>
                  <p className="section-description">
                    Information about your assessment invitation.
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={
                    invitation.status === "ACCEPTED"
                      ? "rounded-full border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : invitation.status === "PENDING"
                        ? "rounded-full border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : invitation.status === "DECLINED"
                          ? "rounded-full border-destructive/20 bg-destructive/10 text-destructive"
                          : "rounded-full border-muted-foreground/20 bg-muted text-muted-foreground"
                  }
                >
                  {invitation.status}
                </Badge>
              </div>

              <div className="app-card-content">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Invited At</p>

                    <p className="mt-1 text-sm font-medium">
                      {format(
                        new Date(invitation.invitedAt),
                        "MMM d, yyyy • h:mm a",
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Invitation Expires
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {format(
                        new Date(invitation.expiresAt),
                        "MMM d, yyyy • h:mm a",
                      )}
                    </p>
                  </div>

                  {invitation.respondedAt && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Responded At
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {format(
                          new Date(invitation.respondedAt),
                          "MMM d, yyyy • h:mm a",
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="app-card">
              <div className="app-card-content">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Ready to begin?</p>

                    <p className="text-xs text-muted-foreground">
                      {isAvailable
                        ? "You can start this assessment."
                        : "This assessment is not available yet."}
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">
                      {assessment.duration} min
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Marks</span>
                    <span className="font-medium">{assessment.totalMarks}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Passing Marks</span>
                    <span className="font-medium">
                      {assessment.passingMarks}
                    </span>
                  </div>
                </div>

                {isAvailable ? (
                  <Button
                    nativeButton={false}
                    render={<Link href="/candidate/invitations" />}
                    className="mt-6 w-full rounded-xl"
                  >
                    Start Assessment
                  </Button>
                ) : (
                  <Button disabled className="mt-6 w-full rounded-xl">
                    Assessment Unavailable
                  </Button>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CandidateAssessmentDetailsPage;
