"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/5 blur-3xl" />

        <div className="absolute -left-32 -top-32 size-80 rounded-full border border-destructive/10" />
        <div className="absolute -left-20 -top-20 size-56 rounded-full border border-destructive/10" />

        <div className="absolute -bottom-40 -right-40 size-96 rounded-full border border-destructive/10" />
        <div className="absolute -bottom-24 -right-24 size-64 rounded-full border border-destructive/10" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--destructive) 1px, transparent 1px), linear-gradient(90deg, var(--destructive) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="container-app relative py-12">
        <div className="mx-auto w-full max-w-lg text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border bg-card shadow-lg shadow-destructive/5">
            <AlertTriangle
              className="size-7 text-destructive"
              strokeWidth={1.8}
            />
          </div>

          {/* Error code */}
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-destructive sm:text-sm">
            Something went wrong
          </p>

          {/* Heading */}
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            We couldn&apos;t load this page
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            An unexpected error occurred while processing your request. Please
            try again or return to the home page.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => reset()} size="lg">
              <RefreshCw className="mr-2 size-4" />
              Try Again
            </Button>

            <Button
              render={<Link href="/" />}
              nativeButton={false}
              variant="outline"
              size="lg"
            >
              <Home className="mr-2 size-4" />
              Back to Home
            </Button>
          </div>

          {/* Footer */}
          <div className="mx-auto mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-destructive/50" />
            <span>Developer Assessment Platform</span>
          </div>
        </div>
      </div>
    </main>
  );
}
