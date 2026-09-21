import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import SectionBadge from "@/components/shared/section-badge";

const benefits = [
  {
    icon: Target,
    title: "Structured Hiring",
    description:
      "Create consistent assessments that help evaluate candidates against the same criteria.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Assessments",
    description:
      "Keep assessment content, candidate attempts, and submissions protected throughout the process.",
  },
  {
    icon: Users,
    title: "Candidate Focused",
    description:
      "Give candidates a clear and organized assessment experience from invitation to submission.",
  },
];

const highlights = [
  "Centralized assessment management",
  "Flexible question types",
  "Controlled candidate attempts",
  "Clear evaluation and results",
];

export default function WhyDevAssess() {
  return (
    <section className="page-section overflow-hidden">
      <div className="container-app">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left Visual */}
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              {/* Top */}
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Assessment Overview
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight">
                    Built for better decisions
                  </p>
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="size-5" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 py-6 sm:gap-4">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-2xl font-bold tracking-tight">01</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Unified Platform
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-2xl font-bold tracking-tight">03+</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Question Types
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 rounded-xl border border-border/70 bg-background px-4 py-3"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />

                    <span className="text-sm text-muted-foreground">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <SectionBadge icon={ShieldCheck} label="Why Dev-Assess" />

            <h2 className="section-title max-w-xl">
              A smarter way to{" "}
              <span className="text-primary">evaluate talent</span>
            </h2>

            <p className="section-description mt-4 max-w-xl">
              DevAssess brings assessment creation, candidate management,
              evaluation, and results together in one streamlined platform.
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-5">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="font-semibold tracking-tight">
                        {benefit.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
