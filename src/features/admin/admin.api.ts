import apiClient from "@/lib/apiClient";
import { AdminUsersQuery, AuditLogsQuery, UserStatus } from "./admin.types";
import { AssessmentParams } from "../assessments/assessment.types";

export const getAdminUsers = (params: AdminUsersQuery) => {
  return apiClient("/admin/all-users", {
    params,
  });
};

export const updateUserStatus = (userId: string, status: UserStatus) => {
  return apiClient(`/admin/users/${userId}`, {
    method: "PATCH",
    body: {
      status,
    },
  });
};

export const getAuditLogs = (params: AuditLogsQuery) => {
  return apiClient("/admin/audit-logs", {
    params,
  });
};


export const getAllAssessments = (params: AssessmentParams) => {
  return apiClient("/assessments/all-assessments", {
    params,
  });
};