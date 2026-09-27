"use client";

import { useState } from "react";
import { CheckCircle2, ClipboardCheck, Clock3, XCircle } from "lucide-react";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDebounce from "@/hooks/debounce.hook";
import { useGetMyResults } from "@/features/results/hooks/results.hooks";
import DataSearch from "@/components/shared/dashboard/data-search";
import StatusTabs from "@/components/shared/dashboard/status-tabs";
import ResultSkeleton from "@/features/results/components/result-skeleton";
import EmptyState from "@/components/shared/dashboard/empty-state";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import { CandidateResult, ResultStatus } from "@/features/results/results.types";

const statusTabs = [
  { value: "ALL", label: "All" },
  { value: "READY", label: "Ready" },
  { value: "PROCESSING", label: "Processing" },
];

const CandidateResultsPage = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"ALL" | ResultStatus>("ALL");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const queryParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const { data, isLoading: resultsLoading } = useGetMyResults(queryParams);
  const totalPages = data?.data.meta?.totalPages ?? 0;
  const results = data?.data?.data ?? [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setTab(value as ResultStatus);
    setPage(1);
  };

  return (
    <section className="page-section">
      <div className="container-app">
        <div className="page-header mb-5">
          <div>
            <h1 className="page-title">My Results</h1>
            <p className="page-description">
              Review your assessment results and performance.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <DataSearch
              value={search}
              onChange={handleSearchChange}
              placeholder="Search results..."
            />

            <StatusTabs
              value={tab}
              onValueChange={handleStatusChange}
              items={statusTabs}
            />
          </div>

          {resultsLoading ? (
            <ResultSkeleton />
          ) : results.length === 0 ? (
            <EmptyState
              icon={ClipboardCheck}
              title={
                search || tab !== "ALL"
                  ? "No results found"
                  : "No assessment results yet"
              }
              description={
                search || tab !== "ALL"
                  ? "Try changing your search or status filter."
                  : "Your completed assessment results will appear here."
              }
            />
          ) : (
            <>
              <div className="hidden md:block">
                <div className="overflow-hidden rounded-xl border border-border/60">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assessment</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {results.map((result: CandidateResult) => {
                        const totalScore = result.totalScore ?? 0;

                        const percentage = result.percentage ?? 0;

                        return (
                          <TableRow key={result.id}>
                            <TableCell>
                              <div className="max-w-xs">
                                <p className="truncate font-medium">
                                  {result.attempt.assessment.title}
                                </p>
                              </div>
                            </TableCell>

                            <TableCell>
                              {result.status === "READY" ? (
                                <span className="font-medium">
                                  {totalScore} /{" "}
                                  {result.attempt.assessment.totalMarks}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </TableCell>

                            <TableCell>
                              {result.status === "READY" ? (
                                <span className="font-medium">
                                  {percentage.toFixed(1)}%
                                </span>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </TableCell>

                            <TableCell>
                              {result.status === "READY" ? (
                                result.passed ? (
                                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                                    <CheckCircle2 className="size-4" />
                                    Passed
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 text-sm font-medium text-destructive">
                                    <XCircle className="size-4" />
                                    Not Passed
                                  </div>
                                )
                              ) : (
                                <span className="text-sm text-muted-foreground">
                                  Processing
                                </span>
                              )}
                            </TableCell>

                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                                  result.status === "READY"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {result.status === "READY"
                                  ? "Ready"
                                  : "Processing"}
                              </span>
                            </TableCell>

                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {result.attempt.submittedAt
                                  ? new Date(
                                      result.attempt.submittedAt,
                                    ).toLocaleDateString()
                                  : "—"}
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-3 pb-10 md:hidden">
                {results.map((result: CandidateResult) => {
                  const totalScore = result.totalScore ?? 0;

                  const percentage = result.percentage ?? 0;

                  return (
                    <div
                      key={result.id}
                      className="rounded-xl border border-border/60 bg-card p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="truncate font-semibold">
                            {result.attempt.assessment.title}
                          </h2>

                          {result.attempt.submittedAt && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Submitted{" "}
                              {new Date(
                                result.attempt.submittedAt,
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                            result.status === "READY"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {result.status === "READY" ? "Ready" : "Processing"}
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Score</p>

                          <p className="mt-1 font-semibold">
                            {result.status === "READY"
                              ? `${totalScore} / ${result.attempt.assessment.totalMarks}`
                              : "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Percentage
                          </p>

                          <p className="mt-1 font-semibold">
                            {result.status === "READY"
                              ? `${percentage.toFixed(1)}%`
                              : "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Result
                          </p>

                          <div className="mt-1">
                            {result.status === "READY" ? (
                              result.passed ? (
                                <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                                  <CheckCircle2 className="size-4" />
                                  Passed
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 text-sm font-medium text-destructive">
                                  <XCircle className="size-4" />
                                  Not Passed
                                </div>
                              )
                            ) : (
                              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Clock3 className="size-4" />
                                Processing
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">
                            Passing Score
                          </p>

                          <p className="mt-1 font-semibold">
                            {result.attempt.assessment.passingMarks}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="my-5">
                  <TablePagination
                    page={page ?? 1}
                    totalPages={totalPages}
                    handlePageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CandidateResultsPage;
