"use client";

import {
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((current) => {
        if (current < 65) return current + 8;
        if (current < 85) return current + 3;
        if (current < 94) return current + 1;

        return current;
      });
    }, 180);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main glow */}
        <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />

        {/* Decorative circles */}
        <div className="absolute -left-40 -top-40 size-96 rounded-full border border-primary/10" />

        <div className="absolute -left-24 -top-24 size-64 rounded-full border border-primary/10" />

        <div className="absolute -bottom-48 -right-48 size-[440px] rounded-full border border-primary/10" />

        <div className="absolute -bottom-28 -right-28 size-72 rounded-full border border-primary/10" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating dots */}
        <span className="absolute left-[18%] top-[24%] size-2 animate-pulse rounded-full bg-primary/30" />

        <span className="absolute right-[20%] top-[32%] size-1.5 animate-pulse rounded-full bg-primary/40 [animation-delay:500ms]" />

        <span className="absolute bottom-[25%] left-[25%] size-1.5 animate-pulse rounded-full bg-primary/30 [animation-delay:1s]" />

        <span className="absolute bottom-[30%] right-[27%] size-2 animate-pulse rounded-full bg-primary/25 [animation-delay:700ms]" />
      </div>

      {/* Loading Card */}
      <div className="relative w-full max-w-sm px-6">
        <div className="animated-border-card">
          <div className="animated-border-content">
            {/* Top shine */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Soft glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-32 rounded-full bg-primary/8 blur-2xl" />

            <div className="relative p-7 sm:p-8">
              {/* Icon */}
              <div className="relative mx-auto mb-6 flex size-16 items-center justify-center">
                {/* Outer orbit */}
                <div className="absolute inset-0 animate-[spin_5s_linear_infinite] rounded-2xl border border-primary/15 border-t-primary/70" />

                {/* Inner orbit */}
                <div className="absolute inset-2 animate-[spin_3s_linear_infinite_reverse] rounded-xl border border-primary/10 border-b-primary/50" />

                {/* Icon container */}
                <div className="relative flex size-12 items-center justify-center rounded-xl bg-primary/10 shadow-inner">
                  <ClipboardCheck
                    className="size-6 text-primary"
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* Heading */}
              <div className="text-center">
                <h1 className="text-lg font-semibold tracking-tight">
                  Developer Assessment
                </h1>

                <p className="mt-1.5 text-sm text-muted-foreground">
                  Preparing your workspace...
                </p>
              </div>

              {/* Dashboard Preview */}
              <div className="mt-7 rounded-xl border bg-background/70 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Code2 className="size-4 text-primary" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="h-2 w-24 animate-pulse rounded-full bg-muted" />

                    <div className="h-1.5 w-16 animate-pulse rounded-full bg-muted" />
                  </div>

                  <Loader2 className="size-4 animate-spin text-primary/60" />
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <ClipboardCheck className="size-3.5 text-primary/60" />

                    <div className="mt-2 h-1.5 w-8 rounded-full bg-muted-foreground/15" />
                  </div>

                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <BarChart3 className="size-3.5 text-primary/60" />

                    <div className="mt-2 h-1.5 w-8 rounded-full bg-muted-foreground/15" />
                  </div>

                  <div className="rounded-lg bg-muted/60 p-2.5">
                    <CheckCircle2 className="size-3.5 text-primary/60" />

                    <div className="mt-2 h-1.5 w-8 rounded-full bg-muted-foreground/15" />
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-[11px]">
                  <span className="font-medium text-muted-foreground">
                    Loading platform
                  </span>

                  <span className="tabular-nums text-primary">{progress}%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="relative h-full overflow-hidden rounded-full bg-primary transition-[width] duration-300 ease-out"
                    style={{
                      width: `${progress}%`,
                    }}
                  >
                    {/* Progress shine */}
                    <div className="absolute inset-y-0 left-0 w-1/2 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />

                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>

                <span>Connecting to your workspace...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="mt-6 pb-5 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <span className="h-px w-8 bg-border" />

          <span>Developer Assessment Platform</span>

          <span className="h-px w-8 bg-border" />
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes border-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes shimmer {
          100% {
            transform: translateX(300%);
          }
        }

        .animated-border-card {
          position: relative;
          padding: 2px;
          border-radius: 1rem;
          overflow: hidden;
          background: var(--border);
        }

        .animated-border-card::before {
          content: "";
          position: absolute;
          width: 180%;
          aspect-ratio: 1;
          left: -40%;
          top: -40%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 330deg,
            var(--primary) 345deg,
            oklch(0.72 0.16 300) 355deg,
            transparent 360deg
          );
          animation: border-spin 4s linear infinite;
        }

        .animated-border-content {
          position: relative;
          z-index: 1;
          overflow: hidden;
            border-radius: calc(1rem - 2px);
          background: color-mix(
            in oklab,
            var(--card) 95%,
            transparent
          );
          backdrop-filter: blur(20px);
        }
      `}</style>
    </main>
  );
}
