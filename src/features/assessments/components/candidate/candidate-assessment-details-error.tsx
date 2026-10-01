"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CandidateAssessmentDetailsErrorProps {
  onRetry: () => void;
}

const CandidateAssessmentDetailsError = ({
  onRetry,
}: CandidateAssessmentDetailsErrorProps) => {
  return (
    <section className="page-section">
      <div className="container-app">
        <div className="app-card flex min-h-[360px] flex-col items-center justify-center px-6 py-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-6" />
          </div>

          <h3 className="mt-4 text-base font-semibold sm:text-lg">
            Unable to load assessment
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            We couldn&apos;t load this assessment. Please try again in a moment.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-5"
            onClick={onRetry}
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CandidateAssessmentDetailsError;
