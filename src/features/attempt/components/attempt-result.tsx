"use client";

import { ArrowRight, Trophy, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface AttemptResultProps {
  result: {
    totalScore: number | null;
    percentage: number | null;
    passed: boolean | null;
  };
  totalMarks: number;
  passingMarks: number;
}

const AttemptResult = ({
  result,
  totalMarks,
  passingMarks,
}: AttemptResultProps) => {
  const router = useRouter();

  const totalScore = result.totalScore ?? 0;
  const percentage = result.percentage ?? 0;
  const passed = result.passed === true;

  return (
    <section className="min-h-screen bg-background">
      <div className="container-app flex min-h-screen items-center justify-center py-10 sm:py-16">
        <div className="w-full max-w-2xl">
          <div className="app-card overflow-hidden">
            <div className="border-b border-border/60 px-6 py-8 text-center sm:px-10 sm:py-10">
              <div
                className={`mx-auto flex size-16 items-center justify-center rounded-full ${
                  passed
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {passed ? (
                  <Trophy className="size-7" />
                ) : (
                  <X className="size-7" />
                )}
              </div>

              <p className="mt-5 text-sm font-medium text-muted-foreground">
                Assessment Complete
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {passed ? "Congratulations!" : "Assessment Completed"}
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Your assessment has been submitted successfully. Here is your
                result.
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">
                  Your Score
                </p>

                <div className="mt-3 flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold tracking-tight sm:text-6xl">
                    {totalScore}
                  </span>

                  <span className="text-lg text-muted-foreground">
                    / {totalMarks}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {percentage.toFixed(1)}%
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Result
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`size-2 rounded-full ${
                        passed ? "bg-primary" : "bg-destructive"
                      }`}
                    />

                    <span className="font-semibold">
                      {passed ? "Passed" : "Not Passed"}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-border/60 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Passing Score
                  </p>

                  <p className="mt-2 font-semibold">{passingMarks} marks</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/candidate/invitations")}
                >
                  Back to Invitations
                </Button>

                <Button
                  type="button"
                  onClick={() => router.push("/candidate/results")}
                >
                  My Results
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttemptResult;
