"use client";

import { useState } from "react";
import { ClipboardList, ShieldAlert, ShieldCheck } from "lucide-react";
import { FetchError } from "ofetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import SectionHeader from "@/components/shared/dashboard/section-header";
import DataSearch from "@/components/shared/dashboard/data-search";
import StatusTabs from "@/components/shared/dashboard/status-tabs";
import EmptyState from "@/components/shared/dashboard/empty-state";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import Modal from "@/components/shared/modal";
import useDebounce from "@/hooks/debounce.hook";

import { useGetAdminUsers, useUpdateUserStatus } from "../hooks/admin.hooks";
import type { AdminUser, UserStatus } from "../admin.types";

import AdminUsersError from "./admin-users-error";
import AdminUsersSkeleton from "./admin-users-skeleton";
import AdminUsersTable from "./admin-users-table";

const statusTabs = [
  { value: "ALL", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "SUSPENDED", label: "Suspended" },
  { value: "DELETED", label: "Deleted" },
];

const AdminUsersPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | UserStatus>("ALL");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const debouncedSearch = useDebounce(search);

  const queryParams = {
    page,
    limit: 10,
    ...(status === "ALL" ? {} : { status }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const {
    data,
    isLoading: usersLoading,
    isError: usersError,
    refetch,
  } = useGetAdminUsers(queryParams);

  const { mutate: updateUserStatus, isPending: updateStatusPending } =
    useUpdateUserStatus();

  const totalPages = data?.data?.meta?.totalPages ?? 0;
  const users = data?.data?.data ?? [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as "ALL" | UserStatus);
    setPage(1);
  };

const handleUserStatusChange = () => {
  if (!selectedUser) return;

  const nextStatus = selectedUser.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";

  updateUserStatus(
    {
      userId: selectedUser.id,
      status: nextStatus,
    },
    {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error(res.message || "Failed to update user status.");
          return;
        }

        toast.success(res.message || "User status updated successfully.");

        setSelectedUser(null);
      },

      onError: (error: FetchError) => {
        const errorMessage =
          error?.data?.message ||
          error?.message ||
          "Failed to update user status.";

        toast.error(errorMessage);
      },
    },
  );
};

  return (
    <>
      <section className="page-section">
        <div className="container-app">
          <SectionHeader
            title="Users"
            description="Manage platform users and their account status."
          />

          {/* Search & Filters */}
          <div className="mt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <DataSearch
                value={search}
                onChange={handleSearchChange}
                placeholder="Search users by name or email"
              />

              <StatusTabs
                value={status}
                onValueChange={handleStatusChange}
                items={statusTabs}
              />
            </div>
          </div>

          {/* Content */}
          <div className="mt-6">
            {usersLoading ? (
              <AdminUsersSkeleton />
            ) : usersError ? (
              <AdminUsersError onRetry={() => refetch()} />
            ) : users.length === 0 ? (
              <EmptyState
                icon={ClipboardList}
                title="No users found"
                description={
                  search
                    ? "Try adjusting your search to find users."
                    : status !== "ALL"
                      ? "No users found with this status."
                      : "There are no users available."
                }
              />
            ) : (
              <>
                <AdminUsersTable
                  users={users}
                  onStatusChange={setSelectedUser}
                />

                {totalPages > 1 && (
                  <TablePagination
                    page={page}
                    totalPages={totalPages}
                    handlePageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Suspend Confirmation Modal */}
      <Modal
        open={!!selectedUser}
        onOpenChange={(open) => {
          if (!open && !updateStatusPending) {
            setSelectedUser(null);
          }
        }}
        title={
          selectedUser?.status === "ACTIVE" ? "Suspend User" : "Activate User"
        }
        description="Review this action before continuing."
        mode="confirm"
      >
        {selectedUser && (
          <div className="space-y-5">
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-sm font-semibold">{selectedUser.name}</p>

              <p className="mt-1 text-xs text-muted-foreground">
                {selectedUser.email}
              </p>
            </div>

            <div
              className={
                selectedUser.status === "ACTIVE"
                  ? "flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4"
                  : "flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
              }
            >
              {selectedUser.status === "ACTIVE" ? (
                <ShieldAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
              ) : (
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
              )}

              <div>
                <p className="text-sm font-medium">
                  {selectedUser.status === "ACTIVE"
                    ? "Are you sure you want to suspend this user?"
                    : "Are you sure you want to activate this user?"}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {selectedUser.status === "ACTIVE"
                    ? "The user will lose access to protected platform features until their account is reactivated."
                    : "The user will regain access to protected platform features."}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={updateStatusPending}
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant={
                  selectedUser.status === "ACTIVE" ? "destructive" : "default"
                }
                disabled={updateStatusPending}
                onClick={handleUserStatusChange}
              >
                {updateStatusPending
                  ? "Updating..."
                  : selectedUser.status === "ACTIVE"
                    ? "Suspend User"
                    : "Activate User"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AdminUsersPage;
