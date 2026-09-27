import apiClient from "@/lib/apiClient";
import { SubmitAnswerPayload } from "./attempt.types";

export const getAttemptQuestions = (attemptId: string) => {
  return apiClient(`/attempts/${attemptId}/questions`, {
    method: "GET",
  });
};



export const submitAnswer = (
  attemptId: string,
  payload: SubmitAnswerPayload,
) => {
  return apiClient(`/attempts/${attemptId}/answers`, {
    method: "POST",
    body: payload,
  });
};

export const submitAttempt = (attemptId: string) => {
  return apiClient(`/attempts/${attemptId}/submit`, {
    method: "POST",
  });
};