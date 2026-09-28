"use client";

import { MoreHorizontal, ShieldAlert, ShieldCheck } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import type { AdminUser } from "../admin.types";
import StatusBadge from "@/components/shared/dashboard/status-badge";

interface AdminUsersTableProps {
  users: AdminUser[];
  onStatusChange: (user: AdminUser) => void;
}

const getInitials = (name: string) => {
  return (
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U"
  );
};

const getRoleVariant = (role: AdminUser["role"]) => {
  if (role === "ADMIN") return "destructive";
  if (role === "RECRUITER") return "info";

  return "default";
};

const getStatusVariant = (status: AdminUser["status"]) => {
  if (status === "ACTIVE") return "success";
  if (status === "SUSPENDED") return "warning";

  return "destructive";
};

const getRoleLabel = (role: AdminUser["role"]) => {
  if (role === "CANDIDATE") return "Candidate";
  if (role === "RECRUITER") return "Recruiter";

  return "Admin";
};

const getStatusLabel = (status: AdminUser["status"]) => {
  if (status === "ACTIVE") return "Active";
  if (status === "SUSPENDED") return "Suspended";

  return "Deleted";
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const AdminUsersTable = ({ users, onStatusChange }: AdminUsersTableProps) => {
  return (
    <>
      {/* Desktop Table */}
      <div className="app-card hidden overflow-hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={user.image ?? undefined}
                        alt={user.name}
                      />

                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <StatusBadge
                    label={getRoleLabel(user.role)}
                    variant={getRoleVariant(user.role)}
                  />
                </TableCell>

                <TableCell>
                  <StatusBadge
                    label={getStatusLabel(user.status)}
                    variant={getStatusVariant(user.status)}
                  />
                </TableCell>

                <TableCell>
                  <StatusBadge
                    label={user.emailVerified ? "Verified" : "Unverified"}
                    variant={user.emailVerified ? "success" : "default"}
                  />
                </TableCell>

                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </span>
                </TableCell>

                <TableCell>
                  {user.status !== "DELETED" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0"
                          />
                        }
                      >
                        <MoreHorizontal className="size-4" />

                        <span className="sr-only">User actions</span>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {user.status === "ACTIVE" ? (
                          <DropdownMenuItem
                            onClick={() => onStatusChange(user)}
                            className="text-destructive focus:text-destructive"
                          >
                            <ShieldAlert className="size-4" />
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => onStatusChange(user)}
                          >
                            <ShieldCheck className="size-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {users.map((user) => (
          <div key={user.id} className="app-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />

                  <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>

                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              {user.status === "ACTIVE" && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 shrink-0"
                      />
                    }
                  >
                    <MoreHorizontal className="size-4" />

                    <span className="sr-only">User actions</span>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onStatusChange(user)}
                      className="text-destructive focus:text-destructive"
                    >
                      <ShieldAlert className="size-4" />
                      Suspend
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4">
              <div>
                <p className="text-xs text-muted-foreground">Role</p>

                <div className="mt-1.5">
                  <StatusBadge
                    label={getRoleLabel(user.role)}
                    variant={getRoleVariant(user.role)}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Status</p>

                <div className="mt-1.5">
                  <StatusBadge
                    label={getStatusLabel(user.status)}
                    variant={getStatusVariant(user.status)}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Email</p>

                <div className="mt-1.5">
                  <StatusBadge
                    label={user.emailVerified ? "Verified" : "Unverified"}
                    variant={user.emailVerified ? "success" : "default"}
                  />
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Joined</p>

                <p className="mt-1.5 text-sm font-medium">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminUsersTable;
