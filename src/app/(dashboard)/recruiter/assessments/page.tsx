"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCheck,
  ClipboardList,
  Clock3,
  FileQuestion,
  Pencil,
  Plus,
  Target,
  Trash2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataSearch from "@/components/shared/dashboard/data-search";
import StatusTabs from "@/components/shared/dashboard/status-tabs";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import { useGetRecruiterAssessments } from "@/features/assessments/hooks/assessments.hooks";
import {
  AssessmentFormValues,
  AssessmentStatus,
  ProblemDataType,
} from "@/features/assessments/assessment.types";
import useDebounce from "@/hooks/debounce.hook";
import { format } from "date-fns";
import AssessmentSkeleton from "@/features/assessments/components/recruiter/assessment-skeleton";
import EmptyState from "@/components/shared/dashboard/empty-state";

const statusTabs = [
  { value: "ALL", label: "All" },
  { value: "DRAFT", label: "Draft" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ARCHIVED", label: "Archived" },
];

const RecruiterAssessmentsPage = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"ALL" | AssessmentStatus>("ALL");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const queryParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const { data, isLoading: assessmentsLoading } =
    useGetRecruiterAssessments(queryParams);

  const totalPages = data?.data.meta?.totalPages ?? 0;
  const assessments: ProblemDataType[] = data?.data?.data ? data.data.data : [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setTab(value as AssessmentStatus);
    setPage(1);
  };

  return (
    <div className="page-section">
      <div className="container-app space-y-7">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="page-title">Assessments</h1>

            <p className="page-description mt-2 max-w-2xl">
              Create, manage, and monitor your candidate assessments from one
              place.
            </p>
          </div>

          <Button size={"lg"} className="w-full  sm:w-auto">
            <Plus className="mr-2 size-4" />
            Create Assessment
          </Button>
        </div>

        {/* Search & Status */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <DataSearch
            value={search}
            onChange={handleSearchChange}
            placeholder="Search assessments..."
          />

          <StatusTabs
            value={tab}
            onValueChange={handleStatusChange}
            items={statusTabs}
          />
        </div>

        {/* Result Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <h2 className="section-title">Your assessments</h2>
            <p className="section-description mt-1">
              Manage your assessment workflow and candidate activities.
            </p>
          </div>

          <span className="hidden text-sm text-muted-foreground sm:block">
            {assessments.length} assessments
          </span>
        </div>

        {/* Assessment Grid */}
        {assessmentsLoading ? (
          <AssessmentSkeleton />
        ) : assessments.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No assessments found"
            description="You haven't created any assessments yet. Create your first assessment to start building your candidate evaluation."
            actionLabel="Create Assessment"
            onAction={() => (
              <Button size={"lg"} className="w-full  sm:w-auto">
                Create Assessment
              </Button>
            )}
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 auto-rows-stretch lg:grid-cols-2">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Top Accent */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Main Container */}
                <div className="flex flex-1 flex-col justify-between space-y-5 p-5 sm:p-6">
                  {/* Top Content Group */}
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <h3 className="line-clamp-1 text-lg font-semibold tracking-tight">
                            {assessment.title}
                          </h3>

                          <Badge
                            variant={
                              assessment.status === "PUBLISHED"
                                ? "default"
                                : assessment.status === "COMPLETED"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="shrink-0 rounded-md"
                          >
                            {assessment.status}
                          </Badge>
                        </div>

                        <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-muted-foreground">
                          {assessment.description}
                        </p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      <div className="rounded-xl bg-muted/40 p-3">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock3 className="size-3.5" />
                          <span className="text-[11px] font-medium">
                            Duration
                          </span>
                        </div>

                        <p className="mt-1.5 text-sm font-semibold">
                          {assessment.duration} min
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/40 p-3">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Target className="size-3.5" />
                          <span className="text-[11px] font-medium">
                            Total Marks
                          </span>
                        </div>

                        <p className="mt-1.5 text-sm font-semibold">
                          {assessment.totalMarks}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/40 p-3">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <FileQuestion className="size-3.5" />
                          <span className="text-[11px] font-medium">
                            Problems
                          </span>
                        </div>

                        <p className="mt-1.5 text-sm font-semibold">
                          {assessment.problemCount}
                        </p>
                      </div>
                      <div className="rounded-xl bg-muted/40 p-3">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <CheckCheck className="size-3.5" />
                          <span className="text-[11px] font-medium">
                            Pass Marks
                          </span>
                        </div>

                        <p className="mt-1.5 text-sm font-semibold">
                          {assessment.passingMarks}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto space-y-4">
                    {/* Schedule */}
                    <div className="flex flex-col items-start gap-2 rounded-xl border border-border/60 bg-background/50 p-3.5 sm:flex-row sm:items-start sm:gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CalendarDays className="size-4" />
                      </div>

                      <div className="min-w-0">
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

                    <div className="  border-t border-border/60 pt-4 ">
                      <div className="flex justify-center md:justify-around flex-wrap items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="size-3.5" />
                          Edit
                        </Button>

                        {/* Add Problems */}
                        <Button render={ <Link href={`/recruiter/assessments/${assessment.id}/problems`}></Link>} nativeButton={false} size="sm" variant="outline" className="gap-1.5">
                          <Plus className="size-3.5" />
                          Add Problems
                        </Button>

                        {/* View Details */}
                        <Button size="sm" variant="outline">
                          View Details
                          <ArrowRight className="size-3.5" />
                        </Button>

                        {/* Delete */}
                        <Button
                          size="icon-sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          title="Delete Assessment"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination  */}
        {totalPages > 1 && (
          <div className="my-5">
            <TablePagination
              page={page ?? 1}
              totalPages={totalPages}
              handlePageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterAssessmentsPage;
