"use client";

import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/shared/section-badge";
import BackgroundDecoration from "@/components/shared/background-decoration";

const features = [
  {
    icon: ClipboardCheck,
    title: "Structured Assessments",
    description:
      "Create focused assessments with questions designed around real development skills.",
  },
  {
    icon: Code2,
    title: "Real-World Evaluation",
    description:
      "Assess practical knowledge across frontend, backend, databases, and modern web development.",
  },
  {
    icon: Users,
    title: "Candidate Management",
    description:
      "Invite candidates, track attempts, and manage the complete assessment workflow in one place.",
  },
  {
    icon: BarChart3,
    title: "Clear Results",
    description:
      "Review scores and evaluation results to make assessment outcomes easier to understand.",
  },
];

const values = [
  "Focused on practical developer skills",
  "Simple and structured assessment workflows",
  "Built for both recruiters and candidates",
  "Designed for transparent evaluation",
];

const AboutPage = () => {
  return (
    <main>
      <BackgroundDecoration/>
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute left-1/2 top-0 size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-32 size-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="container-app relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge label="ABOUT DEVASSESS" icon={Sparkles} />

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A better way to{" "}
              <span className="text-primary">assess developer skills.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              DevAssess is a developer assessment platform built to make
              technical evaluation more structured, practical, and easier to
              manage for both recruiters and candidates.
            </p>

            <div className="mt-8 ">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/assessments" />}
                className="gap-2"
              >
                Explore Assessments
                <ArrowRight className="size-4" />
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="page-section">
        <div className="container-app">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <SectionBadge label="OUR MISSION" icon={Target} />

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Turn technical assessment into a clear, meaningful process.
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Technical hiring should be more than collecting resumes and
                checking boxes. DevAssess brings assessment creation, candidate
                invitations, attempts, evaluation, and results together into one
                focused workflow.
              </p>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Our goal is to help recruiters understand candidate skills
                through structured assessments while giving developers a clear
                way to demonstrate what they know.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative space-y-5">
                {values.map((value) => (
                  <div key={value} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="size-4" />
                    </div>

                    <p className="text-sm font-medium leading-6">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What DevAssess Offers */}
      <section className="border-y bg-muted/20">
        <div className="container-app py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionBadge
              label="FEATURES"
              icon={Layers3}
            />

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for a structured assessment workflow.
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
              From creating assessments to reviewing results, DevAssess keeps
              the process organized and focused.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Candidates & Recruiters */}
      <section className="page-section">
        <div className="container-app">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <Code2 className="size-5" />
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight">
                For Developers
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Take assessments, demonstrate your technical knowledge, and
                understand your results through a structured evaluation process.
              </p>

              <div className="mt-6">
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/assessments" />}
                  className="gap-2"
                >
                  View Assessments
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                <ShieldCheck className="size-5" />
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight">
                For Recruiters
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Build assessments, invite candidates, track their progress,
                evaluate submissions, and manage results from one platform.
              </p>

              <div className="mt-6">
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/register" />}
                  className="gap-2"
                >
                  Get Started
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="container-app">
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/[0.08] via-card to-violet-500/[0.08] px-6 py-12 text-center sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -left-20 -top-24 size-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-20 size-56 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to make assessments more meaningful?
              </h2>

              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                Create structured assessments and discover a better way to
                evaluate developer skills.
              </p>

              <div className="mt-7">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href="/register" />}
                  className="gap-2"
                >
                  Get Started with DevAssess
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
