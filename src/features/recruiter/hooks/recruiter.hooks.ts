import { useQuery } from "@tanstack/react-query";
import { getRecruiterDashboardStats } from "../recruiter.types";

export const useGetRecruiterDashboardStats = () => {
  return useQuery({
    queryKey: ["recruiter-dashboard-stats"],
    queryFn: getRecruiterDashboardStats,
  });
};
