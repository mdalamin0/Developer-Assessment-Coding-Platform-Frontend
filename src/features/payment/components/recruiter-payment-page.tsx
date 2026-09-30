"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";

import SectionHeader from "@/components/shared/dashboard/section-header";
import DataSearch from "@/components/shared/dashboard/data-search";
import StatusTabs from "@/components/shared/dashboard/status-tabs";
import EmptyState from "@/components/shared/dashboard/empty-state";
import TablePagination from "@/components/shared/dashboard/table-pagination";
import useDebounce from "@/hooks/debounce.hook";

import { useGetRecruiterPayments } from "../hooks/payment.hooks";
import type { PaymentStatus, RecruiterPaymentsQuery } from "../payment.types";

import RecruiterPaymentError from "./recruiter-payment-error";
import RecruiterPaymentTable from "./recruiter-payment-table";
import RecruiterPaymentSkeleton from "./recruiter-payment-skeleton";

const statusTabs = [
  { value: "ALL", label: "All" },
  { value: "COMPLETED", label: "Completed" },
  { value: "PENDING", label: "Pending" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const RecruiterPaymentPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | PaymentStatus>("ALL");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search);

  const queryParams: RecruiterPaymentsQuery = {
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
    ...(status === "ALL" ? {} : { status }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  const {
    data,
    isLoading: paymentsLoading,
    isError: paymentsError,
    refetch,
  } = useGetRecruiterPayments(queryParams);

  const payments = data?.data?.data ?? [];
  const totalPages = data?.data?.meta?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as "ALL" | PaymentStatus);
    setPage(1);
  };

  return (
    <section className="page-section">
      <div className="container-app">
        <SectionHeader
          title="Payment History"
          description="View and track your assessment payment transactions."
        />

        <div className="mt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DataSearch
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by transaction or assessment..."
            />

            <StatusTabs
              value={status}
              onValueChange={handleStatusChange}
              items={statusTabs}
            />
          </div>
        </div>

        <div className="mt-6">
          {paymentsLoading ? (
            <RecruiterPaymentSkeleton />
          ) : paymentsError ? (
            <RecruiterPaymentError onRetry={() => refetch()} />
          ) : payments.length === 0 ? (
            <EmptyState
              icon={CreditCard}
              title="No payments found"
              description={
                search || status !== "ALL"
                  ? "Try adjusting your search or payment status."
                  : "You haven't made any payments yet."
              }
            />
          ) : (
            <>
              <RecruiterPaymentTable payments={payments} />

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
  );
};

export default RecruiterPaymentPage;
