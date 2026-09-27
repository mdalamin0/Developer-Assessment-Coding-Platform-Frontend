import apiClient from "@/lib/apiClient";
import {
  IInvitationResponsePayload,
  InvitationParams,
} from "./invitation.types";

export const inviteCandidate = (assessmentId: string, candidateId: string) => {
  return apiClient(`/invitations/${assessmentId}`, {
    method: "POST",
    body: { candidateId },
  });
};

export const getCandidateInvitations = (params: InvitationParams) => {
  return apiClient("/invitations/candidate/my-invitations", {
    params,
  });
};

export const responseInvitaton = (
  invitationId: string,
  payload: IInvitationResponsePayload,
) => {
  return apiClient(`/invitations/${invitationId}/respond`, {
    method: "PATCH",
    body: payload,
  });
};
