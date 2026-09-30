"use client";

import { format } from "date-fns";
import { Check, Copy, CreditCard } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import StatusBadge from "@/components/shared/dashboard/status-badge";

import type { RecruiterPayment } from "../payment.types";

interface RecruiterPaymentTableProps {
  payments: RecruiterPayment[];
}

const getStatusVariant = (status: RecruiterPayment["status"]) => {
  if (status === "COMPLETED") {
    return "success";
  }

  if (status === "PENDING") {
    return "warning";
  }

  if (status === "FAILED" || status === "CANCELLED") {
    return "destructive";
  }

  return "default";
};

const RecruiterPaymentTable = ({ payments }: RecruiterPaymentTableProps) => {
  const handleCopyTransaction = async (transactionId: string) => {
    try {
      await navigator.clipboard.writeText(transactionId);
      toast.success("Transaction ID copied.");
    } catch {
      toast.error("Failed to copy transaction ID.");
    }
  };

  return (
    <>
      {/* Desktop */}
      <div className="app-card hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="flex min-w-[220px] items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CreditCard className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {payment.assessment.title}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {payment.currency}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap font-medium">
                    {payment.amount} {payment.currency}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs">
                        {payment.transactionId}
                      </span>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={() =>
                          handleCopyTransaction(payment.transactionId)
                        }
                        aria-label="Copy transaction ID"
                      >
                        <Copy className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={payment.paymentMethod} variant="info" />
                  </TableCell>

                  <TableCell>
                    <StatusBadge
                      label={payment.status}
                      variant={getStatusVariant(payment.status)}
                    />
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {payment.paidAt
                      ? format(new Date(payment.paidAt), "MMM d, yyyy • h:mm a")
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {payments.map((payment) => (
          <div key={payment.id} className="app-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CreditCard className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {payment.assessment.title}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {format(
                      new Date(payment.paidAt ?? payment.createdAt),
                      "MMM d, yyyy",
                    )}
                  </p>
                </div>
              </div>

              <StatusBadge
                label={payment.status}
                variant={getStatusVariant(payment.status)}
              />
            </div>

            <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Amount</span>

                <span className="font-medium">
                  {payment.amount} {payment.currency}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">
                  Payment Method
                </span>

                <StatusBadge label={payment.paymentMethod} variant="info" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Transaction ID</p>

                <div className="mt-1 flex items-center justify-between gap-2 rounded-md bg-muted/40 px-2.5 py-2">
                  <span className="min-w-0 truncate font-mono text-xs">
                    {payment.transactionId}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0"
                    onClick={() => handleCopyTransaction(payment.transactionId)}
                    aria-label="Copy transaction ID"
                  >
                    <Copy className="size-3.5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
                <span className="text-xs text-muted-foreground">Paid At</span>

                <span className="text-right text-xs text-muted-foreground">
                  {payment.paidAt
                    ? format(new Date(payment.paidAt), "MMM d, yyyy • h:mm a")
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecruiterPaymentTable;
