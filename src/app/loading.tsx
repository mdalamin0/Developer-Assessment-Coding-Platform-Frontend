import { ClipboardCheck } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        {/* Decorative circles */}
        <div className="absolute -left-32 -top-32 size-80 rounded-full border border-primary/10" />
        <div className="absolute -left-20 -top-20 size-56 rounded-full border border-primary/10" />

        <div className="absolute -bottom-40 -right-40 size-96 rounded-full border border-primary/10" />
        <div className="absolute -bottom-24 -right-24 size-64 rounded-full border border-primary/10" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Loading content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping rounded-2xl bg-primary/10" />

          <div className="relative flex size-16 items-center justify-center rounded-2xl border bg-card shadow-lg shadow-primary/10">
            <ClipboardCheck
              className="size-7 text-primary"
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-lg font-semibold tracking-tight">
          Developer Assessment
        </h1>

        {/* Loading text */}
        <p className="mt-1 text-sm text-muted-foreground">
          Preparing your workspace
        </p>

        {/* Loader */}
        <div className="mt-6 flex items-center gap-1.5">
          <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="size-2 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </main>
  );
}