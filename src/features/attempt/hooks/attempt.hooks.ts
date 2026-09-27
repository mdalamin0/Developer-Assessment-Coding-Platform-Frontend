import { useMutation, useQuery } from "@tanstack/react-query";
import { getAttemptQuestions, submitAnswer, submitAttempt } from "../attempt.api";
import { SubmitAnswerPayload } from "../attempt.types";

export const useGetAttemptQuestions = (attemptId: string) => {
  return useQuery({
    queryKey: ["attempt-questions", attemptId],
    queryFn: () => getAttemptQuestions(attemptId),
    enabled: !!attemptId,
  });
};


export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: ({
      attemptId,
      payload,
    }: {
      attemptId: string;
      payload: SubmitAnswerPayload;
    }) => submitAnswer(attemptId, payload),
  });
};

export const useSubmitAttempt = () => {
  return useMutation({
    mutationFn: ({ attemptId }: { attemptId: string }) =>
      submitAttempt(attemptId),
  });
};
