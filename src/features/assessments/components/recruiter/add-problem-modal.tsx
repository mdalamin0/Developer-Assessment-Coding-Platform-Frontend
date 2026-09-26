"use client";

import { useMemo, useState } from "react";
import { Check, FileQuestion, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmptyState from "@/components/shared/dashboard/empty-state";
import Modal from "@/components/shared/modal";
import { useGetRecruiterProblems } from "@/features/problems/hooks/problem.hooks";
import useDebounce from "@/hooks/debounce.hook";
import DataSearch from "@/components/shared/dashboard/data-search";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import { ProblemListSkeleton } from "@/features/problems/components/problem-list-skeleton";

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
  attachedProblemIds: string[];
  isPending?: boolean;
  onSubmit: (problemIds: string[]) => void;
}

const difficultyVariant = {
  EASY: "secondary",
  MEDIUM: "outline",
  HARD: "destructive",
} as const;

const AddProblemModal = ({
  open,
  onOpenChange,
  attachedProblemIds,
  isPending = false,
  onSubmit,
}: AddProblemModalProps) => {
  const [search, setSearch] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

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
    setSelectedProblems((current) =>
      current.includes(problemId)
        ? current.filter((id) => id !== problemId)
        : [...current, problemId],
    );
  };

  const handleSubmit = () => {
    if (!selectedProblems.length) {
      return;
    }

    onSubmit(selectedProblems);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSearch("");
      setSelectedProblems([]);
    }

    onOpenChange(value);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Add Problems"
      description="Select problems from your problem bank to add to this assessment."
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

        {/* Selected Count */}
        {selectedProblems.length > 0 && (
          <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm">
            <span className="font-semibold text-primary">
              {selectedProblems.length}
            </span>{" "}
            problem
            {selectedProblems.length > 1 ? "s" : ""} selected
          </div>
        )}

        {/* Problem List */}
        <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {isProblemsLoading ? <ProblemListSkeleton/> : problems.length === 0 ? (
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
            problems.map((problem: Problem) => {
              const selected = selectedProblems.includes(problem.id);

              return (
                <button
                  key={problem.id}
                  type="button"
                  onClick={() => toggleProblem(problem.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? "border-primary/40 bg-primary/5 shadow-sm"
                      : "border-border/70 bg-card hover:border-primary/20 hover:bg-muted/30"
                  }`}
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

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!selectedProblems.length || isPending}
            onClick={handleSubmit}
          >
            {isPending
              ? "Adding..."
              : `Add ${selectedProblems.length || ""} Problem${
                  selectedProblems.length > 1 ? "s" : ""
                }`}
          </Button>
        </div>
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
    </Modal>
  );
};

export default AddProblemModal;
