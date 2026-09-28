import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AdminUsersQuery, AuditLogsQuery, UserStatus } from "../admin.types";
import { getAdminUsers, getAuditLogs, updateUserStatus } from "../admin.api";

export const useGetAdminUsers = (params: AdminUsersQuery) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getAdminUsers(params),
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
      updateUserStatus(userId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};

export const useGetAuditLogs = (params: AuditLogsQuery) => {
  return useQuery({
    queryKey: ["audit-logs", params],
    queryFn: () => getAuditLogs(params),
  });
};
