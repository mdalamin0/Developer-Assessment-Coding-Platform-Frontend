import apiClient from "@/lib/apiClient";
import {
  addProblemInAssessmentPayload,
  AssessmentFormValues,
  AssessmentParams,
  IUpdateAssessmentPayload,
} from "./assessment.types";

export const createAssessment = (payload: AssessmentFormValues) => {
  return apiClient("assessments", {
    method: "POST",
    body: payload,
  });
};

export const updateAssessment = (
  assessmentId: string,
  payload: IUpdateAssessmentPayload,
) => {
  return apiClient(`/assessments/${assessmentId}`, {
    method: "PATCH",
    body: payload,
  });
};

export const getRecruiterAssessments = (params: AssessmentParams) => {
  return apiClient("/assessments/my-assessments", {
    params,
  });
};

export const getSingleAssessment = (id: string) => {
  return apiClient(`/assessments/${id}`);
};

export const addProblemInAssessment = (
  assessmentId: string,
  payload: addProblemInAssessmentPayload,
) => {
  return apiClient(`/assessments/${assessmentId}/problems`, {
    method: "POST",
    body: payload,
  });
};


export const handlePaymentAssessment = (assessmentId: string) => {
  return apiClient("/payment/create-payment", {
    method: "POST",
    body: {
      assessmentId,
    },
  });
}

export const publishAssessment = (assessmentId: string) => {
  return apiClient(`/assessments/${assessmentId}/publish`, {
    method: "PATCH"
  });
}