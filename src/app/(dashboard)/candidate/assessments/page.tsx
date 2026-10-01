"use client";

import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";

import CandidateAssessmentCard from "@/features/assessments/components/candidate/candidate-assessment-card";
import SectionHeader from "@/components/shared/dashboard/section-header";
import DataSearch from "@/components/shared/dashboard/data-search";
import StatusTabs from "@/components/shared/dashboard/status-tabs";
import EmptyState from "@/components/shared/dashboard/empty-state";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import { useGetCandidateInvitations } from "@/features/invitations/hooks/invitation.hooks";
import {
  InvitationData,
  InvitationStatus,
} from "@/features/invitations/invitation.types";
import CandidateAssessmentSkeleton from "@/features/assessments/components/candidate/candidate-assessment-skeleton";
import CandidateAssessmentError from "@/features/assessments/components/candidate/candidate-assessment-error";
import useDebounce from "@/hooks/debounce.hook";

const statusTabs = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "EXPIRED", label: "Expired" },
];

const CandidateAssessmentPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const [tab, setTab] = useState<"ALL" | InvitationStatus>("ALL");

  const queryParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const {
    data,
    isLoading: invitationsLoading,
    isError: invitationsError,
    refetch,
  } = useGetCandidateInvitations(queryParams);

  const invitations: InvitationData[] = data?.data?.data ?? [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setTab(value as InvitationStatus);
    setPage(1);
  };

  return (
    <section className="page-section">
      <div className="container-app">
        <SectionHeader
          title="My Assessments"
          description="View and manage the assessments assigned to you."
        />

        <div className="mt-6 space-y-6">
          {/* Search & Status */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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

          {/* Loading */}
          {invitationsLoading ? (
            <CandidateAssessmentSkeleton />
          ) : invitationsError ? (
            <CandidateAssessmentError onRetry={() => refetch()} />
          ) : invitations?.length === 0 ? (
            <div className="app-card">
              <EmptyState
                icon={ClipboardList}
                title="No assessments found"
                description={
                  search || status !== "ALL"
                    ? "No assessments match your current search or filter."
                    : "You don't have any assessments assigned to you yet."
                }
              />
            </div>
          ) : (
            <>
              {/* Results */}
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {invitations.map((invitation) => {
                  return (
                    <CandidateAssessmentCard
                      key={invitation.id}
                      invitation={invitation}
                    />
                  );
                })}
              </div>

              {/* Pagination */}
              {invitations.length > 0 && (
                <div className="flex justify-center pt-2">
                  <TablePagination
                    totalPages={data?.data?.meta?.totalPages ?? 1}
                    page={page}
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

export default CandidateAssessmentPage;
