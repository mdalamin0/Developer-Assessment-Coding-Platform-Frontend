import apiClient from "@/lib/apiClient";
import { CanidateParams } from "./candidate.types";

export const getRecruiterCandidates = (params: CanidateParams) => {
  return apiClient("/recruiters/all-candidates", {
    params,
  });
};
