import apiClient from "@/lib/apiClient";
import {
  ProblemFormValues,
  ProblemParams,
  UpdateProblemData,
} from "./problems.types";

export const createProblem = (payload: ProblemFormValues) => {
  return apiClient("/problems", {
    method: "POST",
    body: payload,
  });
};

export const updateProblem = (id: string, payload: UpdateProblemData) => {
  return apiClient(`problems/${id}`, {
    method: "PATCH",
    body: payload,
  });
};

export const deleteProblem = (id: string) => {
  return apiClient(`problems/${id}`, {
    method: "DELETE",
  });
};

export const getRecruiterProblems = (params: ProblemParams) => {
  return apiClient("/problems/my-problems", {
    params,
  });
};

export const getAssessmentProblems = (id: string) => {
  return apiClient(`/assessments/${id}/problems`);
};



export const removeProblemFromAssessment = (
  assessmentId: string,
  problemId: string,
) => {
  return apiClient(`/assessments/${assessmentId}/problems/${problemId}`, {
    method: "DELETE",
  });
};