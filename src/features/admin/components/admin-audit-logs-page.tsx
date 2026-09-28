"use client";

import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { FetchError } from "ofetch";
import { toast } from "sonner";

import SectionHeader from "@/components/shared/dashboard/section-header";
import DataSearch from "@/components/shared/dashboard/data-search";
import EmptyState from "@/components/shared/dashboard/empty-state";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import useDebounce from "@/hooks/debounce.hook";

import { useGetAuditLogs } from "../hooks/admin.hooks";
import type { AuditLogsQuery } from "../admin.types";
import AdminAuditLogsTable from "./admin-audit-logs-table";
import AdminAuditLogsSkeleton from "./admin-audit-logs-skeleton";
import AdminAuditLogsError from "./admin-audit-logs-error";


const AdminAuditLogsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const queryParams: AuditLogsQuery = {
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const {
    data,
    isLoading: auditLogsLoading,
    isError: auditLogsError,
    refetch,
  } = useGetAuditLogs(queryParams);

  const totalPages = data?.data?.meta?.totalPages ?? 0;
  const auditLogs = data?.data?.data ?? [];

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <section className="page-section">
      <div className="container-app">
        <SectionHeader
          title="Audit Logs"
          description="Track important activities and changes across the platform."
        />

        <div className="mt-6">
          <DataSearch
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by user, email, or entity ID..."
          />
        </div>

        <div className="mt-6">
          {auditLogsLoading ? (
            <AdminAuditLogsSkeleton/>
          ) : auditLogsError ? (
            <AdminAuditLogsError onRetry={() => refetch()} />
          ) : auditLogs.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title="No audit logs found"
              description={
                search
                  ? "Try adjusting your search to find audit logs."
                  : "There are no audit logs available."
              }
            />
          ) : (
            <>
              <AdminAuditLogsTable logs={auditLogs} />

             <div className="mt-10">
               {totalPages > 1 && (
                <TablePagination
                  page={page}
                  totalPages={totalPages}
                  handlePageChange={setPage}
                />
              )}
             </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminAuditLogsPage;
