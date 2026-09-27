import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCandidateInvitations,
  inviteCandidate,
  responseInvitaton,
} from "../invitation.api";
import {
  IInvitationResponsePayload,
  InvitationParams,
} from "../invitation.types";

export const useInviteCandidate = () => {
  return useMutation({
    mutationFn: ({
      assessmentId,
      candidateId,
    }: {
      assessmentId: string;
      candidateId: string;
    }) => inviteCandidate(assessmentId, candidateId),
  });
};

export const useGetCandidateInvitations = (params: InvitationParams) => {
  return useQuery({
    queryKey: ["invitations", params],
    queryFn: () => getCandidateInvitations(params),
  });
};

export const useResponseInvitation = () => {
  return useMutation({
    mutationFn: ({
      invitationId,
      payload,
    }: {
      invitationId: string;
      payload: IInvitationResponsePayload;
    }) => responseInvitaton(invitationId, payload),
  });
};
