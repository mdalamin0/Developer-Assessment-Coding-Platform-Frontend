"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileQuestion,
  Plus,
  Target,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { FetchError } from "ofetch";
import { useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/dashboard/empty-state";

import {
  useRemoveProblemFromAssessment,
} from "@/features/problems/hooks/problem.hooks";
import { AssessmentQuestion } from "@/features/problems/problems.types";
import ManageProblemsSkeleton from "@/features/assessments/components/recruiter/manage-problem-skeleton";
import { useGetSingleAssessment } from "@/features/assessments/hooks/assessments.hooks";
import { Spinner } from "@/components/ui/spinner";

const difficultyVariant = {
  EASY: "secondary",
  MEDIUM: "outline",
  HARD: "destructive",
} as const;

const ManageProblemsPage = () => {
  const router = useRouter();
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const queryClient = useQueryClient();

  const [deleteProblem, setDeleteProblem] = useState<string | null>(null);

  const {
    data,
    isLoading: assessmentLoading,
    isError: assessmentError,
  } = useGetSingleAssessment(assessmentId);

  const { mutate: removeProblem, isPending: isRemoving } =
    useRemoveProblemFromAssessment();

  const assessment = data?.data;
  const problems = assessment?.problems ?? [];

  const handleRemoveProblem = (problemId: string) => {
    if (!assessmentId) return;

    setDeleteProblem(problemId);

    removeProblem(
      {
        assessmentId,
        problemId,
      },
      {
        onSuccess: (response) => {
          toast.success(
            response?.message || "Problem removed from assessment!",
          );

          queryClient.invalidateQueries({
            queryKey: ["assessment", assessmentId],
          });

          setDeleteProblem(null);
        },
        onError: (error) => {
          setDeleteProblem(null);

          if (error instanceof FetchError) {
            toast.error(error.data?.message || "Failed to remove problem!");
            return;
          }

          toast.error("Something went wrong!");
        },
      },
    );
  };

  const handleAddProblem = () => {
    router.push(
      `/recruiter/assessments/${assessmentId}/problems/add`,
    );
  };

  if (assessmentLoading) {
    return < ManageProblemsSkeleton/>;
  }

  if (assessmentError || !assessment) {
    return (
      <div className="container-app py-6 sm:py-8">
        <div className="app-card">
          <EmptyState
            icon={FileQuestion}
            title="Assessment not found"
            description="We couldn't load this assessment. Please try again."
          />
        </div>
      </div>
    );
  }

  return (
    <main className="container-app py-6 sm:py-8">
      <div className="space-y-8">
        {/* Page Header */}
     
        <div className="page-header">
          <div className="space-y-3">
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={
                <Link href="/recruiter/assessments">
                  <ArrowLeft className="mr-2 size-4" />
                  Back to Assessments
                </Link>
              }
              className="w-fit px-0 hover:bg-transparent"
            />

            <div>
              <h1 className="page-title">Manage Problems</h1>

              <p className="page-description">
                Add, review, and manage problems for this assessment.
              </p>
            </div>
          </div>
        </div>
        {/* Assessment Overview */}
        <section className="app-card overflow-hidden">
          <div className="app-card-content p-5 sm:p-6 lg:p-7">
            <div className="flex flex-col gap-6">
              {/* Title + Action */}
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {assessment.title}
                    </h2>

                    <Badge
                      variant={
                        assessment.status === "PUBLISHED"
                          ? "default"
                          : assessment.status === "COMPLETED"
                            ? "secondary"
                            : "outline"
                      }
                      className="rounded-md"
                    >
                      {assessment.status}
                    </Badge>
                  </div>

                  {assessment.description && (
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                      {assessment.description}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handleAddProblem}
                  className="shrink-0"
                >
                  <Plus />
                  Add Problem
                </Button>
              </div>

              {/* Assessment Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock3 className="size-4" />
                    <span className="text-xs font-medium">Duration</span>
                  </div>

                  <p className="mt-2 text-lg font-semibold">
                    {assessment.duration} min
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="size-4" />
                    <span className="text-xs font-medium">Total Marks</span>
                  </div>

                  <p className="mt-2 text-lg font-semibold">
                    {assessment.totalMarks}
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileQuestion className="size-4" />
                    <span className="text-xs font-medium">Problems</span>
                  </div>

                  <p className="mt-2 text-lg font-semibold">
                    {problems.length}
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="size-4" />
                    <span className="text-xs font-medium">Passing Marks</span>
                  </div>

                  <p className="mt-2 text-lg font-semibold">
                    {assessment.passingMarks}
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/50 p-4 sm:flex-row sm:items-center">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CalendarDays className="size-4" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Assessment Schedule
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {assessment.startAt
                      ? format(new Date(assessment.startAt), "PPp")
                      : "N/A"}

                    <span className="mx-2 text-muted-foreground">→</span>

                    {assessment.endAt
                      ? format(new Date(assessment.endAt), "PPp")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Problems */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="section-title">Assessment Problems</h2>

              <p className="section-description">
                Problems currently attached to this assessment.
              </p>
            </div>

            {problems.length > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAddProblem}
              >
                <Plus />
                Add Problem
              </Button>
            )}
          </div>

          {problems.length === 0 ? (
            <div className="app-card">
              <EmptyState
                icon={FileQuestion}
                title="No problems added"
                description="This assessment doesn't have any problems yet. Add problems from your problem bank to build the assessment."
                actionLabel="Add Problem"
                onAction={handleAddProblem}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {problems.map((assessmentProblem: AssessmentQuestion) => {
                const problem = assessmentProblem.problem;

                return (
                  <div
                    key={assessmentProblem.id}
                    className="group rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="p-5 sm:p-6">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        {/* Problem Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                              {assessmentProblem.questionOrder}
                            </span>

                            <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                              {problem.title}
                            </h3>

                            <Badge
                              variant={
                                difficultyVariant[
                                  problem.difficulty as keyof typeof difficultyVariant
                                ]
                              }
                              className="rounded-md"
                            >
                              {problem.difficulty}
                            </Badge>

                            <Badge variant="outline" className="rounded-md">
                              {problem.type}
                            </Badge>
                          </div>

                          <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                            {problem.description}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                            <span>
                              Marks:{" "}
                              <span className="font-semibold text-foreground">
                                {assessmentProblem.marks}
                              </span>
                            </span>

                            <span>
                              Options:{" "}
                              <span className="font-semibold text-foreground">
                                {problem.options?.length ?? 0}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <div className="flex shrink-0 items-center">
                          <Button
                            type="button"
                            size="icon-sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                            title="Remove Problem"
                            disabled={
                              isRemoving && deleteProblem === problem.id
                            }
                            onClick={() => handleRemoveProblem(problem.id)}
                          >
                            {isRemoving ? <Spinner/> :  <Trash2 />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ManageProblemsPage;
