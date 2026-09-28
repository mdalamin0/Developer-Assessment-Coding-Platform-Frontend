import apiClient from "@/lib/apiClient";

export const updateProfileImage = (formData: FormData) => {
  return apiClient("/users/profile-image", {
    method: "PATCH",
    body: formData,
  });
};

export const updateCandidateProfile = (formData: FormData) => {
  return apiClient("/candidates/me", {
    method: "PATCH",
    body: formData,
  });
};

export const updateRecruiterProfile = (formData: FormData) => {
  return apiClient("/recruiters/me", {
    method: "PATCH",
    body: formData,
  });
};

export const updateAdminProfile = (data: { name: string }) => {
  return apiClient("/admin/me", {
    method: "PATCH",
    body: data,
  });
};
