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
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main glow */}
        <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/5 blur-3xl" />

        {/* Decorative circles */}
        <div className="absolute -left-40 -top-40 size-96 rounded-full border border-destructive/10" />

        <div className="absolute -left-24 -top-24 size-64 rounded-full border border-destructive/10" />

        <div className="absolute -bottom-48 -right-48 size-[440px] rounded-full border border-destructive/10" />

        <div className="absolute -bottom-28 -right-28 size-72 rounded-full border border-destructive/10" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--destructive) 1px, transparent 1px), linear-gradient(90deg, var(--destructive) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating dots */}
        <span className="absolute left-[18%] top-[24%] size-2 animate-pulse rounded-full bg-destructive/25" />

        <span className="absolute right-[20%] top-[32%] size-1.5 animate-pulse rounded-full bg-destructive/30 [animation-delay:500ms]" />

        <span className="absolute bottom-[25%] left-[25%] size-1.5 animate-pulse rounded-full bg-destructive/25 [animation-delay:1s]" />

        <span className="absolute bottom-[30%] right-[27%] size-2 animate-pulse rounded-full bg-destructive/20 [animation-delay:700ms]" />
      </div>

      {/* Content */}
      <div className="container-app relative py-12">
        <div className="mx-auto w-full max-w-lg text-center">
          {/* Icon */}
          <div className="relative mx-auto mb-7 flex size-20 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-2xl bg-destructive/5" />

            <div className="relative flex size-16 items-center justify-center rounded-2xl border border-destructive/15 bg-card shadow-lg shadow-destructive/5">
              <AlertTriangle
                className="size-7 text-destructive"
                strokeWidth={1.8}
              />
            </div>
          </div>

          {/* Label */}
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
            <Button onClick={reset} size="lg" className="min-w-40">
              <RefreshCw className="mr-2 size-4" />
              Try Again
            </Button>

            <Button
              render={<Link href="/" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="min-w-40 bg-background/80 backdrop-blur-sm"
            >
              <Home className="mr-2 size-4" />
              Back to Home
            </Button>
          </div>

          {/* Footer */}
          <div className="mx-auto mt-10 flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="h-px w-10 bg-border sm:w-14" />

            <span>Developer Assessment Platform</span>

            <span className="h-px w-10 bg-border sm:w-14" />
          </div>
        </div>
      </div>
    </main>
  );
}
