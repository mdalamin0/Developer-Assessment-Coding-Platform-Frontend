import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" /> 

        <div className="absolute -left-32 -top-32 size-80 rounded-full border border-primary/10" />
        <div className="absolute -left-20 -top-20 size-56 rounded-full border border-primary/10" />

        <div className="absolute -bottom-40 -right-40 size-96 rounded-full border border-primary/10" />
        <div className="absolute -bottom-24 -right-24 size-64 rounded-full border border-primary/10" />

        <div
          className="absolute inset-0 opacity-[0.030]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="container-app relative flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-2xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-7 flex size-16 items-center justify-center rounded-2xl border bg-card shadow-lg shadow-primary/5">
            <SearchX className="size-7 text-primary" strokeWidth={1.8} />
          </div>

          {/* 404 */}
          <div className="relative">
            <p
              aria-hidden="true"
              className="select-none text-[clamp(7rem,22vw,13rem)] font-black leading-[0.8] tracking-[-0.08em] text-primary/10"
            >
              404
            </p>

            <div className="absolute inset-0 flex items-center justify-center">
              <p className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-[clamp(4rem,12vw,7rem)] font-black leading-none tracking-[-0.06em] text-transparent">
                404
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary sm:text-sm">
              Page not found
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Looks like you took a wrong turn.
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
              The page you&apos;re looking for doesn&apos;t exist, has been
              moved, or may no longer be available. Let&apos;s get you back to
              your assessment workspace.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button render={<Link href="/" />} nativeButton={false} size="lg">
              <Home className="mr-2 size-4" />
              Back to Home
            </Button>

            <Button
              render={<Link href="/dashboard" />}
              nativeButton={false}
              variant="outline"
              size="lg"
            >
              <ArrowLeft className="mr-2 size-4" />
              Go to Dashboard
            </Button>
          </div>

          {/* Bottom hint */}
          <div className="mx-auto mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary/50" />
            <span>Developer Assessment Platform</span>
          </div>
        </div>
      </div>
    </main>
  );
}
