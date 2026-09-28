"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AdminAuditLogsErrorProps {
  onRetry: () => void;
}

const AdminAuditLogsError = ({ onRetry }: AdminAuditLogsErrorProps) => {
  return (
    <div className="app-card flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold">
        Failed to load audit logs
      </h3>

      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Something went wrong while loading the audit logs. Please try again.
      </p>

      <Button
        type="button"
        variant="outline"
        className="mt-5"
        onClick={onRetry}
      >
        <RefreshCw className="mr-2 size-4" />
        Try Again
      </Button>
    </div>
  );
};

export default AdminAuditLogsError;
