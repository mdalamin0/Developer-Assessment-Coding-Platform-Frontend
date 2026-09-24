import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProblem,
  deleteProblem,
  getAssessmentProblems,
  getRecruiterProblems,
  removeProblemFromAssessment,
  updateProblem,
} from "../problems.api";
import { ProblemParams, UpdateProblemData } from "../problems.types";

export const useCreateProblem = () => {
  return useMutation({
    mutationFn: createProblem,
  });
};

export const useUpdateProblem = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProblemData }) =>
      updateProblem(id, data),
  });
};

export const useDeleteProblem = () => {
  return useMutation({
    mutationFn: (id: string) => deleteProblem(id),
  });
};

export const useGetRecruiterProblems = (params: ProblemParams) => {
  return useQuery({
    queryKey: ["problems", params],
    queryFn: () => getRecruiterProblems(params),
  });
};



export const useGetAssessmentProblem = (id: string) => {
  return useQuery({
    queryKey: ["problems"],
    queryFn: () => getAssessmentProblems(id),
  });
};

export const useRemoveProblemFromAssessment = () => {
  return useMutation({
    mutationFn: ({
      assessmentId,
      problemId,
    }: {
      assessmentId: string;
      problemId: string;
    }) => removeProblemFromAssessment(assessmentId, problemId),
  });
};
