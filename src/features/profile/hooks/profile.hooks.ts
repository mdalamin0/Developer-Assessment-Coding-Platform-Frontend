import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidateProfile, updateProfileImage, updateRecruiterProfile } from "../profile.api";

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileImage,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUpdateCandidateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCandidateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useUpdateRecruiterProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecruiterProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};