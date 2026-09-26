import { useMutation } from "@tanstack/react-query";
import { inviteCandidate } from "../invitation.api";

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
