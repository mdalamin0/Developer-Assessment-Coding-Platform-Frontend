"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/shared/modal";
import ProblemForm from "@/features/problems/components/problem-form";
import { useGetRecruiterProblems } from "@/features/problems/hooks/problem.hooks";
import { ProblemFormValues } from "@/features/problems/problems.types";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import useDebounce from "@/hooks/debounce.hook";
import ProblemCardSkeleton from "@/features/problems/components/problem-card-skeleton";

interface Problem extends ProblemFormValues {
  id: string;
}

const RecruiterProblemPage = () => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | undefined>();
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const queryParams = {
    page,
    limit: 10,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const { data, isLoading } = useGetRecruiterProblems(queryParams);

  const totalPages = data?.data.meta?.totalPages ?? 0;
  // const totalPages = 2;
  const problems: Problem[] = data?.data?.data ? data?.data?.data : [];

  const handleCreate = () => {
    setSelectedProblem(undefined);
    setModalOpen(true);
  };

  const handleEdit = (problem: Problem) => {
    setSelectedProblem(problem);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedProblem(undefined);
  };

  return (
    <>
      <section className="container-app page-section">
        {/* Header */}
        <div className="page-header">
          <div className="w-full flex  gap-4 flex-row items-center sm:items-end justify-between">
            <div>
              <h1 className="page-title">Problem Bank</h1>

              <p className="page-description">
                Create and manage questions for your assessments.
              </p>
            </div>

            <Button onClick={handleCreate}>
              <Plus />
              <span className="hidden sm:block">Create Problem</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 space-y-5">
          {/* Search */}
          <div className="app-card">
            <div className="app-card-content">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  type="search"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title or descripton"
                  className="h-10 pl-9"
                />
              </div>
            </div>
          </div>

          {/* Problem List */}
          { isLoading ? <ProblemCardSkeleton/> :  problems.length === 0 ? (
            <div className="empty-state">
              <div className="mx-auto flex max-w-md flex-col items-center text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
                  <Plus className="size-5 text-muted-foreground" />
                </div>

                <h2 className="section-title">No problems found</h2>

                <p className="section-description mt-1">
                  Create your first MCQ problem to start building assessments.
                </p>

                <Button className="mt-5" onClick={handleCreate}>
                  <Plus />
                  Create Problem
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map((problem) => (
                <div key={problem.id} className="data-card">
                  <div className="data-card-header">
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-base font-semibold">
                        {problem.title}
                      </h2>

                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {problem.description}
                      </p>
                    </div>

                    <div className=" shrink-0 items-center gap-2 hidden md:flex">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={() => handleEdit(problem)}
                      >
                        <Pencil />
                      </Button>

                      <Button
                        size="icon-sm"
                        variant="outline"
                        className="text-destructive"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between border-t border-border/60 px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-md bg-muted px-2.5 py-1 font-medium">
                        {problem.type}
                      </span>

                      <span className="rounded-md bg-muted px-2.5 py-1 font-medium">
                        {problem.difficulty}
                      </span>

                      <span className="rounded-md bg-muted px-2.5 py-1 font-medium">
                        {problem.marks} Marks
                      </span>

                      <span className="rounded-md bg-muted px-2.5 py-1 font-medium">
                        {problem?.options.length} Options
                      </span>
                    </div>
                    <div className=" shrink-0 items-center flex gap-2  md:hidden">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        onClick={() => handleEdit(problem)}
                      >
                        <Pencil />
                      </Button>

                      <Button
                        size="icon-sm"
                        variant="outline"
                        className="text-destructive"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {totalPages > 1 && (
        <div className="my-5">
          <TablePagination
            page={page ?? 1}
            totalPages={totalPages}
            handlePageChange={setPage}
          />
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={selectedProblem ? "Edit Problem" : "Create Problem"}
        description={
          selectedProblem
            ? "Update the problem details below."
            : "Create a new MCQ problem for your problem bank."
        }
        mode="form"
      >
        <ProblemForm problem={selectedProblem} onCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default RecruiterProblemPage;
