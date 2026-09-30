"use client";

import { ArrowRight, ClipboardCheck, Sparkles } from "lucide-react";
import Link from "next/link";

import EmptyState from "@/components/shared/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/shared/section-badge";

const AssessmentsPage = () => {
  return (
    <section className="page-section">
      <div className="container-app">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/[0.07] via-card to-violet-500/[0.06] px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
          <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 size-56 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative max-w-2xl">
           
            <SectionBadge icon={Sparkles} label="Public Assessments" />

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Test your skills.
              <span className="block text-primary">Build your confidence.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Explore public assessments designed to help developers practice
              real-world skills and measure their technical knowledge.
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="mt-8">
          <EmptyState
            icon={ClipboardCheck}
            title="No Public Assessments Yet"
            description="We’re preparing public assessments for developers to practice real-world skills. You can view your assigned assessments and participate from your dashboard."
          />

          <div className="mt-5 flex justify-center">
            <Button
              nativeButton={false}
              render={<Link href="/candidate" />}
              className="gap-2"
            >
              Go to Dashboard
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentsPage;
