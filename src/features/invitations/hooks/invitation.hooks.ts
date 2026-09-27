import { useMutation, useQuery } from "@tanstack/react-query";
import { getCandidateInvitations, inviteCandidate } from "../invitation.api";
import { InvitationParams } from "../invitation.types";

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
