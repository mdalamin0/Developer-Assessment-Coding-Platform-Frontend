import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileImage } from "../profile.api";

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