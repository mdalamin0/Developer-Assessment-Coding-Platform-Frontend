import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="page-section">
      <div className="container-app">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-14 text-center sm:px-10 sm:py-16 lg:px-16">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -right-16 size-64 rounded-full bg-primary/10 blur-3xl" />

          {/* Content */}
          <div className="relative mx-auto max-w-3xl">
            {/* Icon */}
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Rocket className="size-6" strokeWidth={1.8} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Get Started
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Build better assessments.
              <br className="hidden sm:block" />
              <span className="text-primary"> Find better talent.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Create structured assessments, invite candidates, manage
              submissions, and make confident hiring decisions with DevAssess.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/register" />}
                className="inline-flex h-11 w-full items-center justify-center gap-2  bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:w-auto"
              >
                Get Started
                <ArrowRight className="ml-1 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/assessment" />}
                className="inline-flex h-11 w-full items-center justify-center border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-muted sm:w-auto"
              >
                Explore Assessments
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
