"use client";

import { RefreshCw, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AdminUsersErrorProps {
  onRetry: () => void;
}

const AdminUsersError = ({ onRetry }: AdminUsersErrorProps) => {
  return (
    <div className="app-card flex min-h-80 flex-col items-center justify-center px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ShieldAlert className="size-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold">
        Failed to load users
      </h3>

      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        Something went wrong while loading users. Please try again.
      </p>

      <Button
        variant="outline"
        className="mt-5 gap-2"
        onClick={onRetry}
      >
        <RefreshCw className="size-4" />
        Try Again
      </Button>
    </div>
  );
};

export default AdminUsersError;

