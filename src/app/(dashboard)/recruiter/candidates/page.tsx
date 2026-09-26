"use client";

import { useState } from "react";
import { Mail, UserPlus, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataSearch from "@/components/shared/dashboard/data-search";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import EmptyState from "@/components/shared/dashboard/empty-state";

import useDebounce from "@/hooks/debounce.hook";
import { useRecruiterCandidates } from "@/features/candidates/hooks/candidate.hooks";
import CandidateListSkeleton from "@/features/candidates/components/candidate-list-skeleton";
import { CandidateData } from "@/features/candidates/candidate.types";
import InviteCandidateModal from "@/features/invitations/components/invite-candidate-modal";

const CandidatesPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateData | null>(null);

  const [invitedCandidates, setInvitedCandidates] = useState<string[]>([]);

  const debouncedSearch = useDebounce(search);

  const queryParams = {
    page,
    limit: 10,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const { data: candidatesData, isLoading } =
    useRecruiterCandidates(queryParams);

  const candidates: CandidateData[] = candidatesData?.data?.data ?? [];
  const totalPages = candidatesData?.data?.meta?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleInvite = (candidate: CandidateData) => {
    setSelectedCandidate(candidate);
    setInviteModalOpen(true);
  };

  return (
    <section className="page-section">
      <div className="container-app space-y-6">
        <div className="page-header">
          <div>
            <h1 className="page-title">Candidates</h1>
            <p className="page-description">
              Browse candidates and invite them to your assessments.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <DataSearch
            value={search}
            onChange={handleSearchChange}
            placeholder="Search candidates..."
          />
        </div>

        <div className="data-card overflow-hidden">
          <div className="data-card-header">
            <div>
              <h2 className="section-title">Candidate List</h2>
              <p className="section-description">
                Find candidates and invite them to your assessments.
              </p>
            </div>
          </div>

          {isLoading ? (
            <CandidateListSkeleton />
          ) : candidates.length === 0 ? (
            <EmptyState
              icon={UserRound}
              title="No candidates found"
              description={
                search
                  ? "Try adjusting your search to find candidates."
                  : "There are no candidates available yet."
              }
            />
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/60 text-left">
                      <th className="px-6 py-3 text-sm font-medium text-muted-foreground">
                        Candidate
                      </th>

                      <th className="px-6 py-3 text-sm font-medium text-muted-foreground">
                        Contact
                      </th>

                      <th className="px-6 py-3 text-sm font-medium text-muted-foreground">
                        Status
                      </th>

                      <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {candidates.map((candidate) => {
                      const isInvited = invitedCandidates.includes(
                        candidate.id,
                      );

                      return (
                        <tr
                          key={candidate.id}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="size-10">
                                <AvatarImage
                                  src={candidate.image ?? undefined}
                                  alt={candidate.name}
                                />

                                <AvatarFallback>
                                  {candidate.name?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>

                              <div className="min-w-0">
                                <p className="truncate font-medium">
                                  {candidate.name}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                  Candidate
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="size-4 shrink-0" />

                              <span className="truncate">
                                {candidate.email}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <Badge variant="secondary">
                              {candidate.status}
                            </Badge>
                          </td>

                          <td className="px-6 py-4 text-right">
                            {invitedCandidates.includes(candidate.id) ? (
                              <Button size="sm" variant="secondary" disabled>
                                Invited
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => handleInvite(candidate)}
                              >
                                <UserPlus className="mr-2 size-4" />
                                Invite
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="divide-y divide-border/60 md:hidden">
                {candidates.map((candidate) => {
                  const isInvited = invitedCandidates.includes(candidate.id);

                  return (
                    <div key={candidate.id} className="space-y-4 px-5 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <Avatar className="size-10 shrink-0">
                            <AvatarImage
                              src={candidate.image ?? undefined}
                              alt={candidate.name}
                            />

                            <AvatarFallback>
                              {candidate.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0">
                            <p className="truncate font-medium">
                              {candidate.name}
                            </p>

                            <p className="truncate text-sm text-muted-foreground">
                              {candidate.email}
                            </p>
                          </div>
                        </div>

                        <Badge variant="secondary">{candidate.status}</Badge>
                      </div>

                      {invitedCandidates.includes(candidate.id) ? (
                        <Button size="sm" variant="secondary" disabled>
                          Invited
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleInvite(candidate)}
                        >
                          <UserPlus className="mr-2 size-4" />
                          Invite
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="border-t border-border/60 px-5 py-4 sm:px-6">
                  <TablePagination
                    page={page}
                    totalPages={totalPages}
                    handlePageChange={setPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <InviteCandidateModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
        candidate={selectedCandidate}
        onInviteSuccess={(candidateId) => {
          setInvitedCandidates((prev) =>
            prev.includes(candidateId) ? prev : [...prev, candidateId],
          );
        }}
      />
    </section>
  );
};

export default CandidatesPage;
