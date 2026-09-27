"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Check, ClipboardList, Clock3, X } from "lucide-react";

import { useGetCandidateInvitations } from "@/features/invitations/hooks/invitation.hooks";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useDebounce from "@/hooks/debounce.hook";
import {
  InvitationData,
  InvitationStatus,
} from "@/features/invitations/invitation.types";

import SectionHeader from "@/components/shared/dashboard/section-header";
import DataSearch from "@/components/shared/dashboard/data-search";
import StatusTabs from "@/components/shared/dashboard/status-tabs";
import EmptyState from "@/components/shared/dashboard/empty-state";
import StatusBadge from "@/components/shared/dashboard/status-badge";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import CandidateInvitationSkeleton from "@/features/invitations/components/candidate-invitation-skeleton";

const statusTabs = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "EXPIRED", label: "Expired" },
];

const CandidateInvitationsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<"ALL" | InvitationStatus>("ALL");

  const debouncedSearch = useDebounce(search);

  const queryParams = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const { data, isLoading: invitationsLoading } =
    useGetCandidateInvitations(queryParams);

  const invitations: InvitationData[] = data?.data?.data ?? [];
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setTab(value as InvitationStatus);
    setPage(1);
  };

  const getInvitationStatusVariant = (status: InvitationStatus) => {
    switch (status) {
      case "PENDING":
        return "warning";

      case "ACCEPTED":
        return "success";

      case "EXPIRED":
        return "destructive";

      default:
        return "default";
    }
  };

  const getAssessmentStatusVariant = (
    status: InvitationData["assessment"]["status"],
  ) => {
    switch (status) {
      case "ONGOING":
        return "success";

      case "PUBLISHED":
        return "warning";

      case "COMPLETED":
        return "default";

      case "ARCHIVED":
        return "destructive";

      default:
        return "default";
    }
  };

  return (
    <section className="page-section">
      <div className="container-app space-y-6">
        <SectionHeader
          title="My Invitations"
          description="View and manage the assessments you have been invited to."
        />

        {/* Search & Status */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <DataSearch
            value={search}
            onChange={handleSearchChange}
            placeholder="Search invitations..."
          />

          <StatusTabs
            value={tab}
            onValueChange={handleStatusChange}
            items={statusTabs}
          />
        </div>

        {/* Invitation Table */}
        <div className="data-card overflow-hidden">
          {invitationsLoading ? (
            <CandidateInvitationSkeleton />
          ) : invitations.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="No invitations found"
              description={
                search
                  ? "Try adjusting your search to find invitations."
                  : "You don't have any assessment invitations yet."
              }
            />
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/20 hover:bg-muted/20">
                        <TableHead className="h-12 px-6">Assessment</TableHead>

                        <TableHead className="h-12">Duration</TableHead>

                        <TableHead className="h-12">Marks</TableHead>

                        <TableHead className="h-12">Schedule</TableHead>

                        <TableHead className="h-12">Status</TableHead>

                        <TableHead className="h-12 px-6 text-right">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {invitations.map((invitation) => (
                        <TableRow key={invitation.id} className="group">
                          {/* Assessment */}
                          <TableCell className="max-w-[280px] px-6 py-4">
                            <div className="min-w-0">
                              <p className="truncate font-medium">
                                {invitation.assessment.title}
                              </p>

                              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                                {invitation.assessment.description}
                              </p>
                            </div>
                          </TableCell>

                          {/* Duration */}
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock3 className="size-4 text-muted-foreground" />

                              <span>{invitation.assessment.duration} min</span>
                            </div>
                          </TableCell>

                          {/* Marks */}
                          <TableCell className="py-4">
                            <div className="text-sm">
                              <span className="font-medium">
                                {invitation.assessment.passingMarks}
                              </span>

                              <span className="text-muted-foreground">
                                {" "}
                                / {invitation.assessment.totalMarks}
                              </span>
                            </div>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              Passing
                            </p>
                          </TableCell>

                          {/* Schedule */}
                          <TableCell className="min-w-[180px] py-4">
                            <div className="flex items-start gap-2">
                              <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                              <div className="text-sm">
                                <p className="font-medium">
                                  {format(
                                    new Date(invitation.assessment.startAt),
                                    "MMM d, yyyy",
                                  )}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                  {format(
                                    new Date(invitation.assessment.startAt),
                                    "h:mm a",
                                  )}{" "}
                                  -{" "}
                                  {format(
                                    new Date(invitation.assessment.endAt),
                                    "h:mm a",
                                  )}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell className="py-4">
                            <div className="flex flex-col items-start gap-1.5">
                              <StatusBadge
                                label={invitation.status}
                                variant={getInvitationStatusVariant(
                                  invitation.status,
                                )}
                              />

                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] text-muted-foreground">
                                  Assessment:
                                </span>

                                <StatusBadge
                                  label={invitation.assessment.status}
                                  variant={getAssessmentStatusVariant(
                                    invitation.assessment.status,
                                  )}
                                />
                              </div>
                            </div>
                          </TableCell>

                          {/* Action */}
                          <TableCell className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              {invitation.status === "PENDING" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="gap-1.5"
                                  >
                                    <X className="size-3.5" />
                                    Decline
                                  </Button>

                                  <Button size="sm" className="gap-1.5">
                                    <Check className="size-3.5" />
                                    Accept
                                  </Button>
                                </>
                              )}

                              {invitation.status === "ACCEPTED" &&
                                invitation.assessment.status === "ONGOING" && (
                                  <Button size="sm" className="gap-1.5">
                                    Start Assessment
                                  </Button>
                                )}

                              {invitation.status === "ACCEPTED" &&
                                invitation.assessment.status ===
                                  "PUBLISHED" && (
                                  <span className="text-xs text-muted-foreground">
                                    Waiting to start
                                  </span>
                                )}

                              {(invitation.status === "EXPIRED" ||
                                invitation.status === "DECLINED" ||
                                (invitation.status === "ACCEPTED" &&
                                  invitation.assessment.status ===
                                    "COMPLETED") ||
                                (invitation.status === "ACCEPTED" &&
                                  invitation.assessment.status ===
                                    "ARCHIVED")) && (
                                <span className="text-xs text-muted-foreground">
                                  No action available
                                </span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Mobile List */}
              <div className="divide-y divide-border/60 md:hidden">
                {invitations.map((invitation) => (
                  <div key={invitation.id} className="space-y-4 p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 font-semibold">
                          {invitation.assessment.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {invitation.assessment.description}
                        </p>
                      </div>

                      <StatusBadge
                        label={invitation.status}
                        variant={getInvitationStatusVariant(invitation.status)}
                      />
                    </div>

                    {/* Assessment Status */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Assessment Status:
                      </span>

                      <StatusBadge
                        label={invitation.assessment.status}
                        variant={getAssessmentStatusVariant(
                          invitation.assessment.status,
                        )}
                      />
                    </div>

                    {/* Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border bg-muted/20 p-3">
                        <p className="text-xs text-muted-foreground">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {invitation.assessment.duration} min
                        </p>
                      </div>

                      <div className="rounded-xl border bg-muted/20 p-3">
                        <p className="text-xs text-muted-foreground">Marks</p>

                        <p className="mt-1 text-sm font-medium">
                          {invitation.assessment.passingMarks}
                          <span className="text-muted-foreground">
                            {" "}
                            / {invitation.assessment.totalMarks}
                          </span>
                        </p>

                        <p className="text-[11px] text-muted-foreground">
                          Passing / Total
                        </p>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="flex items-start gap-2 border-t pt-3">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                      <div className="text-sm">
                        <p className="font-medium">
                          {format(
                            new Date(invitation.assessment.startAt),
                            "MMM d, yyyy",
                          )}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(invitation.assessment.startAt),
                            "h:mm a",
                          )}{" "}
                          -{" "}
                          {format(
                            new Date(invitation.assessment.endAt),
                            "h:mm a",
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex gap-2 border-t pt-3">
                      {invitation.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1 gap-1.5"
                          >
                            <X className="size-3.5" />
                            Decline
                          </Button>

                          <Button size="sm" className="flex-1 gap-1.5">
                            <Check className="size-3.5" />
                            Accept
                          </Button>
                        </>
                      )}

                      {invitation.status === "ACCEPTED" &&
                        invitation.assessment.status === "ONGOING" && (
                          <Button size="sm" className="w-full">
                            Start Assessment
                          </Button>
                        )}

                      {invitation.status === "ACCEPTED" &&
                        invitation.assessment.status === "PUBLISHED" && (
                          <p className="w-full py-1 text-center text-xs text-muted-foreground">
                            Waiting for assessment to start
                          </p>
                        )}

                      {(invitation.status === "EXPIRED" ||
                        invitation.status === "DECLINED" ||
                        (invitation.status === "ACCEPTED" &&
                          invitation.assessment.status === "COMPLETED") ||
                        (invitation.status === "ACCEPTED" &&
                          invitation.assessment.status === "ARCHIVED")) && (
                        <p className="w-full py-1 text-center text-xs text-muted-foreground">
                          No action available
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-border/60 px-5 py-4 sm:px-6">
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

export default CandidateInvitationsPage;
