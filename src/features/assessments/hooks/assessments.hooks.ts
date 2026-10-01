import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProblemInAssessment,
  createAssessment,
  getCandidateSingleAssessment,
  getRecruiterAssessments,
  getSingleAssessment,
  handlePaymentAssessment,
  publishAssessment,
  startAssessment,
  updateAssessment,
} from "../assessment.api";
import {
  addProblemInAssessmentPayload,
  AssessmentFormValues,
  AssessmentParams,
  IUpdateAssessmentPayload,
} from "../assessment.types";

export const useCreateAssessment = () => {
  return useMutation({
    mutationFn: (payload: AssessmentFormValues) => createAssessment(payload),
  });
};

export const useUpdateAssessment = () => {
  return useMutation({
    mutationFn: ({
      assessmentId,
      payload,
    }: {
      assessmentId: string;
      payload: IUpdateAssessmentPayload;
    }) => updateAssessment(assessmentId, payload),
  });
};

export const useGetRecruiterAssessments = (params: AssessmentParams) => {
  return useQuery({
    queryKey: ["assessments", params],
    queryFn: () => getRecruiterAssessments(params),
  });
};

export const useGetSingleAssessment = (id: string) => {
  return useQuery({
    queryKey: ["assessment", id],
    queryFn: () => getSingleAssessment(id),
  });
};

export const useGetCandidateSingleAssessment = (id: string) => {
  return useQuery({
    queryKey: ["candidate-assessment", id],
    queryFn: () => getCandidateSingleAssessment(id),
    retry: false,
  });
};

export const useAddProblemInAssessment = () => {
  return useMutation({
    mutationFn: ({
      assessmentId,
      payload,
    }: {
      assessmentId: string;
      payload: addProblemInAssessmentPayload;
    }) => addProblemInAssessment(assessmentId, payload),
  });
};

export const useHandlePaymentAssessment = () => {
  return useMutation({
    mutationFn: ({ assessmentId }: { assessmentId: string }) =>
      handlePaymentAssessment(assessmentId),
  });
};

export const usePublishAssessment = () => {
  return useMutation({
    mutationFn: ({ assessmentId }: { assessmentId: string }) =>
      publishAssessment(assessmentId),
  });
};

export const useStartAssessment = () => {
  return useMutation({
    mutationFn: ({ assessmentId }: { assessmentId: string }) =>
      startAssessment(assessmentId),
  });
};