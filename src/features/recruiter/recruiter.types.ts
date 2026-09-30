import apiClient from "@/lib/apiClient";

export const getRecruiterDashboardStats = () => {
  return apiClient("/recruiters/dashboard-stats");
};
