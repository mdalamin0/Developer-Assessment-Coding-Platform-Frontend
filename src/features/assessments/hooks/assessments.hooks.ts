import { useQuery } from "@tanstack/react-query";
import { getRecruiterAssessments, getSingleAssessment } from "../assessment.api";
import { AssessmentParams } from "../assessment.types";

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