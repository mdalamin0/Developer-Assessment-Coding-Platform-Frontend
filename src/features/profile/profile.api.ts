import apiClient from "@/lib/apiClient";

export const updateProfileImage = (formData: FormData) => {
  return apiClient("/users/profile-image", {
    method: "PATCH",
    body: formData,
  });
};
