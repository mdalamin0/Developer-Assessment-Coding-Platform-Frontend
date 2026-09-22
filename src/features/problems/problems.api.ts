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

export const getRecruiterProblems = (params: ProblemParams) => {
  return apiClient("/problems/my-problems", {
    params,
  });
};
