import { UserRoleType } from "../auth/auth.types";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export interface AdminUsersQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: UserStatus;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRoleType;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuditLogUser {
  id: string;
  name: string;
  email: string;
  role: "CANDIDATE" | "RECRUITER" | "ADMIN";
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  oldValue: unknown;
  newValue: unknown;
  createdAt: string;
  user: AuditLogUser;
}

export interface AuditLogsQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  action?: string;
  entity?: string;
  userId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}