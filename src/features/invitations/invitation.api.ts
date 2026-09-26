import apiClient from "@/lib/apiClient";

export const inviteCandidate = (assessmentId: string, candidateId: string) => {
  return apiClient(`/invitations/${assessmentId}`, {
    method: "POST",
    body: { candidateId },
  });
};
