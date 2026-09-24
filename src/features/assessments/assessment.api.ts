import apiClient from "@/lib/apiClient"
import { AssessmentParams } from "./assessment.types";

export const getRecruiterAssessments = (params: AssessmentParams) => {
  return apiClient("/assessments/my-assessments", {
    params
  });
}

export const getSingleAssessment = (id: string) => {
  return apiClient(`/assessments/${id}`);
};

