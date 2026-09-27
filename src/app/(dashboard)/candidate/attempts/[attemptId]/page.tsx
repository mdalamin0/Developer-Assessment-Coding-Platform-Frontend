"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Check, Clock3, Send } from "lucide-react";
import { FetchError } from "ofetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  useGetAttemptQuestions,
  useSubmitAnswer,
  useSubmitAttempt,
} from "@/features/attempt/hooks/attempt.hooks";
import AttemptSkeleton from "@/features/attempt/components/attempt-skeleton";
import AttemptError from "@/features/attempt/components/attempt-error";
import AttemptResult from "@/features/attempt/components/attempt-result";

interface SubmissionResult {
  id: string;
  attemptId: string;
  totalScore: number | null;
  percentage: number | null;
  passed: boolean | null;
  status: "READY" | "PROCESSING";
  generatedAt: string | null;
}

const CandidateAttemptPage = () => {
  const params = useParams();
  const attemptId = params.attemptId as string;
  const { data, isLoading, isError } = useGetAttemptQuestions(attemptId);
  const { mutate: submitAnswer, isPending: isSubmittingAnswer } =
    useSubmitAnswer();

  const { mutate: submitAttempt, isPending: isSubmittingAttempt } =
    useSubmitAttempt();

  const attemptData = data?.data;
  const questions = attemptData?.questions ?? [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const progress =
    totalQuestions > 0
      ? ((currentQuestionIndex + 1) / totalQuestions) * 100
      : 0;

  const formattedTime = useMemo(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0",
      )}:${String(seconds).padStart(2, "0")}`;
    }

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  }, [timeLeft]);

  useEffect(() => {
    if (!attemptData?.assessment?.duration) return;

    setTimeLeft(attemptData.assessment.duration * 60);
  }, [attemptData?.assessment?.duration]);

  useEffect(() => {
    if (timeLeft <= 0 || submissionResult) return;

    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submissionResult]);

  const handleSelectAnswer = (answer: string) => {
    if (isSubmittingAnswer || isSubmittingAttempt) return;

    setSelectedAnswer(answer);
  };

  const handleSubmitAssessment = () => {
    submitAttempt(
      {
        attemptId,
      },
      {
        onSuccess: (response) => {
          const result = response?.data?.result;

          if (!result) {
            toast.error("Result could not be generated.");
            return;
          }

          setSubmissionResult(result);

          toast.success(
            response?.message || "Assessment submitted successfully!",
          );
        },
        onError: (error) => {
          if (error instanceof FetchError) {
            toast.error(error.data?.message || "Failed to submit assessment!");
            return;
          }

          toast.error("Something went wrong!");
        },
      },
    );
  };

  const handleNext = () => {
    if (!currentQuestion || !selectedAnswer) return;

    submitAnswer(
      {
        attemptId,
        payload: {
          problemId: currentQuestion.problem.id,
          answer: selectedAnswer,
        },
      },
      {
        onSuccess: (response) => {
          if (isLastQuestion) {
            handleSubmitAssessment();
            return;
          }

          toast.success(response?.message || "Answer saved!");

          setSelectedAnswer("");
          setCurrentQuestionIndex((previous) => previous + 1);
        },
        onError: (error) => {
          if (error instanceof FetchError) {
            toast.error(error.data?.message || "Failed to save answer!");
            return;
          }

          toast.error("Something went wrong!");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <AttemptSkeleton/>
    );
  }

  if (isError || !attemptData) {
    return (
     <AttemptError/>
    );
  }

  if (submissionResult) {
  return (
    <AttemptResult
      result={submissionResult}
      totalMarks={attemptData.assessment.totalMarks}
      passingMarks={attemptData.assessment.passingMarks}
    />
  );
}

  if (!currentQuestion) {
    return (
      <section className="min-h-screen bg-background">
        <div className="container-app py-12">
          <div className="mx-auto max-w-xl text-center">
            <div className="app-card p-8">
              <h1 className="text-lg font-semibold">No questions available</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                This assessment does not have any questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background">
      <div className="container-app py-5 sm:py-8">
        <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
          <div className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                {attemptData.assessment.title}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span>
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>

                <span className="hidden sm:inline">•</span>

                <span>{Math.round(progress)}% completed</span>
              </div>
            </div>

            <div
              className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 ${
                timeLeft <= 300
                  ? "border-destructive/40 bg-destructive/5 text-destructive"
                  : "border-border bg-card"
              }`}
            >
              <Clock3 className="size-4" />

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide opacity-70">
                  Time Remaining
                </p>

                <p className="font-mono text-base font-semibold tabular-nums">
                  {formattedTime}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Assessment Progress</span>

              <span>{Math.round(progress)}%</span>
            </div>

            <Progress value={progress} className="h-1.5" />
          </div>

          <div className="app-card overflow-hidden">
            <div className="border-b border-border/60 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  Question {currentQuestion.questionOrder}
                </span>

                <span className="text-xs text-muted-foreground">
                  {currentQuestion.marks} marks
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="space-y-3">
                <h2 className="text-lg font-semibold leading-7 sm:text-xl">
                  {currentQuestion.problem.title}
                </h2>

                {currentQuestion.problem.description && (
                  <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                    {currentQuestion.problem.description}
                  </p>
                )}
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {currentQuestion.problem.options.map((option: string, index: number) => {
                  const isSelected = selectedAnswer === option;

                  const optionLabel = String.fromCharCode(65 + index);

                  return (
                    <button
                      key={`${currentQuestion.problem.id}-${option}`}
                      type="button"
                      disabled={isSubmittingAnswer || isSubmittingAttempt}
                      onClick={() => handleSelectAnswer(option)}
                      className={`group flex min-h-20 items-start gap-3 rounded-xl border p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-70 ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
                      }`}
                    >
                      <span
                        className={`flex size-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-muted/40 text-muted-foreground group-hover:border-primary/40 group-hover:text-foreground"
                        }`}
                      >
                        {isSelected ? (
                          <Check className="size-4" />
                        ) : (
                          optionLabel
                        )}
                      </span>

                      <span
                        className={`pt-1 text-sm leading-5 ${
                          isSelected
                            ? "font-medium text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end border-t border-border/60 pt-5">
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    !selectedAnswer || isSubmittingAnswer || isSubmittingAttempt
                  }
                >
                  {isLastQuestion ? (
                    <>
                      <Send className="mr-2 size-4" />
                      {isSubmittingAnswer || isSubmittingAttempt
                        ? "Submitting..."
                        : "Submit Assessment"}
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateAttemptPage;
