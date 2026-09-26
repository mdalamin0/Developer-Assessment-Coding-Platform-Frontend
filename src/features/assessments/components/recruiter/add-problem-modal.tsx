"use client";

import { useMemo, useState } from "react";
import { Check, FileQuestion } from "lucide-react";
import { FetchError } from "ofetch";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/dashboard/empty-state";
import Modal from "@/components/shared/modal";
import DataSearch from "@/components/shared/dashboard/data-search";
import TablePagination from "@/components/shared/dashboard/table-pagination";

import { useGetRecruiterProblems } from "@/features/problems/hooks/problem.hooks";
import { ProblemListSkeleton } from "@/features/problems/components/problem-list-skeleton";
import { useAddProblemInAssessment } from "../../hooks/assessments.hooks";
import useDebounce from "@/hooks/debounce.hook";

interface Problem {
  id: string;
  title: string;
  type: "MCQ";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  marks: number;
}

interface AddProblemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentId: string;
  attachedProblemIds: string[];
}

const difficultyVariant = {
  EASY: "secondary",
  MEDIUM: "outline",
  HARD: "destructive",
} as const;

const AddProblemModal = ({
  open,
  onOpenChange,
  assessmentId,
  attachedProblemIds,
}: AddProblemModalProps) => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const { mutate: addProblemInAssessment, isPending: addProblemPending } =
    useAddProblemInAssessment();

  const queryParams = {
    page,
    limit: 10,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const { data: problemData, isLoading: isProblemsLoading } =
    useGetRecruiterProblems(queryParams);

  const problems = problemData?.data.data ?? [];
  const totalPages = problemData?.data.meta?.totalPages ?? 0;

  const availableProblems = useMemo(() => {
    const attachedIds = new Set(attachedProblemIds);

    return problems.filter((problem: Problem) => !attachedIds.has(problem.id));
  }, [problems, attachedProblemIds]);

  // const filteredProblems = useMemo(() => {
  //   const query = search.trim().toLowerCase();

  //   if (!query) {
  //     return availableProblems;
  //   }

  //   return availableProblems.filter((problem: Problem) =>
  //     problem.title.toLowerCase().includes(query),
  //   );
  // }, [availableProblems, search]);

  const toggleProblem = (problemId: string) => {
    setSelectedProblem((current) => (current === problemId ? null : problemId));
  };

const handleSubmit = () => {
  if (!selectedProblem || !assessmentId) {
    return;
  }

  addProblemInAssessment(
    {
      assessmentId,
      payload: {
        problemId: selectedProblem,
      },
    },
    {
      onSuccess: (response) => {
        toast.success(response?.message || "Problem added successfully!");

        queryClient.invalidateQueries({
          queryKey: ["assessment", assessmentId],
        });

        setSelectedProblem(null);
        onOpenChange(false);
      },

      onError: (error) => {
        if (error instanceof FetchError) {
          toast.error(error.data?.message || "Failed to add problem!");
          return;
        }

        toast.error("Something went wrong!");
      },
    },
  );
};

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSearch("");
      setSelectedProblem(null);
      setPage(1);
    }

    onOpenChange(value);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Add Problem"
      description="Select a problem from your problem bank to add to this assessment."
      mode="form"
    >
      <div className="space-y-5">
        {/* Search */}
        <div className="relative">
          <DataSearch
            value={search}
            onChange={handleSearchChange}
            placeholder="Search assessments..."
          />
        </div>

        {/* Problem List */}
        <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {isProblemsLoading ? (
            <ProblemListSkeleton />
          ) : availableProblems.length === 0 ? (
            <EmptyState
              icon={FileQuestion}
              title={search ? "No problems found" : "No problems available"}
              description={
                search
                  ? "Try searching with a different keyword."
                  : "All problems from your problem bank are already attached to this assessment."
              }
              className="min-h-52"
            />
          ) : (
            availableProblems.map((problem: Problem) => {
              const selected = selectedProblem === problem.id;

              return (
                <button
                  key={problem.id}
                  type="button"
                  disabled={addProblemPending}
                  onClick={() => toggleProblem(problem.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? "border-primary/40 bg-primary/5 shadow-sm"
                      : "border-border/70 bg-card hover:border-primary/20 hover:bg-muted/30"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background"
                      }`}
                    >
                      {selected && <Check className="size-3.5" />}
                    </div>

                    {/* Problem Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold">
                          {problem.title}
                        </h3>

                        <Badge
                          variant={difficultyVariant[problem.difficulty]}
                          className="rounded-md text-[10px]"
                        >
                          {problem.difficulty}
                        </Badge>

                        <Badge
                          variant="outline"
                          className="rounded-md text-[10px]"
                        >
                          {problem.type}
                        </Badge>
                      </div>

                      <p className="mt-1.5 text-xs text-muted-foreground">
                        {problem.marks} marks
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="my-5">
            <TablePagination
              page={page}
              totalPages={totalPages}
              handlePageChange={setPage}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={addProblemPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!selectedProblem || addProblemPending}
            onClick={handleSubmit}
          >
            {addProblemPending ? "Adding..." : "Add Problem"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProblemModal;
