import apiClient from "@/lib/apiClient";
import { InvitationParams } from "./invitation.types";

export const inviteCandidate = (assessmentId: string, candidateId: string) => {
  return apiClient(`/invitations/${assessmentId}`, {
    method: "POST",
    body: { candidateId },
  });
};

export const getCandidateInvitations = (params: InvitationParams) => {
  return apiClient("/invitations/candidate/my-invitations", {
    params
  });
}