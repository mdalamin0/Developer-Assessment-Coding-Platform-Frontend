"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileCheck2,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TrustPoints from "@/components/shared/trust-points";

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden">

      <div className="container-app">
        <div className="grid min-h-[calc(100svh-68px)] items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:py-20">
          {/* Left content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <Sparkles className="size-3.5" />
              Developer Assessment Platform
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-[68px]">
              Assess skills.
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-chart-2 bg-clip-text text-transparent">
                Discover talent.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Create smarter developer assessments, evaluate technical skills,
              and identify the right candidates with a streamlined assessment
              experience.
            </p>
            

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/assessments" />}
                className="h-12  px-6 shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
              >
                Explore assessments
                <ArrowRight className="ml-1 size-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/register" />}
                className="h-12  border-border/80 bg-background/60 px-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                Get started
              </Button>
            </div>

            {/* Trust points */}
            <TrustPoints/>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 size-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl sm:size-[380px]" />

            {/* Main assessment card */}
            <div className="relative rounded-3xl border bg-card/85 p-4 shadow-2xl shadow-primary/10 backdrop-blur-xl sm:p-5">
              {/* Window header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Code2 className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Frontend Assessment</p>
                    <p className="text-xs text-muted-foreground">
                      Technical evaluation
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-chart-3/10 px-2.5 py-1 text-[10px] font-semibold text-chart-3">
                  Active
                </span>
              </div>

              {/* Progress */}
              <div className="py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Assessment progress
                    </p>
                    <p className="mt-1 text-2xl font-bold">72%</p>
                  </div>

                  <div className="flex size-14 items-center justify-center rounded-full border-4 border-primary/15 border-t-primary text-xs font-bold">
                    18/25
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary to-chart-2" />
                </div>
              </div>

              {/* Question cards */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 rounded-xl border bg-background/70 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-chart-3/10 text-chart-3">
                    <CheckCircle2 className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      React fundamentals
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Completed
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-chart-3">
                    92%
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border bg-background/70 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Code2 className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      JavaScript challenge
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      In progress
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-primary">
                    78%
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border bg-background/70 p-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
                    <FileCheck2 className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">
                      Problem solving
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Evaluation ready
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-chart-2">
                    85%
                  </span>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <UsersRound className="size-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    128 candidates
                  </span>
                </div>

                <span className="text-xs font-semibold text-foreground">
                  View report
                </span>
              </div>
            </div>

            {/* Floating score card */}
            <div className="absolute -bottom-5 -left-3 rounded-2xl border bg-card/90 p-3 shadow-xl shadow-primary/10 backdrop-blur-xl sm:-left-8 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-chart-3/10">
                  <CheckCircle2 className="size-5 text-chart-3" />
                </div>

                <div>
                  <p className="text-[10px] font-medium text-muted-foreground">
                    Average score
                  </p>
                  <p className="text-lg font-bold">84.6%</p>
                </div>
              </div>
            </div>

            {/* Floating candidates card */}
            <div className="absolute -right-2 -top-8 rounded-2xl border bg-card/90 p-3 shadow-xl shadow-primary/10 backdrop-blur-xl sm:-right-7 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="flex size-7 items-center justify-center rounded-full border-2 border-card bg-primary text-[9px] font-bold text-primary-foreground">
                    A
                  </div>
                  <div className="flex size-7 items-center justify-center rounded-full border-2 border-card bg-chart-2 text-[9px] font-bold text-white">
                    M
                  </div>
                  <div className="flex size-7 items-center justify-center rounded-full border-2 border-card bg-chart-3 text-[9px] font-bold text-white">
                    R
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold">48 candidates</p>
                  <p className="text-[10px] text-muted-foreground">
                    currently assessed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
