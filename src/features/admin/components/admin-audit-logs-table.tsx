"use client";

import { format } from "date-fns";
import { Mail } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import StatusBadge from "@/components/shared/dashboard/status-badge";
import { AuditLog } from "../admin.types";


interface AdminAuditLogsTableProps {
  logs: AuditLog[];
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const formatValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return "—";
  }

  return JSON.stringify(value);
};

const AdminAuditLogsTable = ({ logs }: AdminAuditLogsTableProps) => {
  return (
    <>
      {/* Desktop */}
      <div className="app-card hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Old Value</TableHead>
                <TableHead>New Value</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex min-w-[180px] items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback>
                          {getInitials(log.user.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate font-medium">{log.user.name}</p>

                        <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                          <Mail className="size-3" />
                          {log.user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={log.action} variant="info" />
                  </TableCell>

                  <TableCell>
                    <StatusBadge label={log.entity} variant="default" />
                  </TableCell>


                  <TableCell>
                    <p className="max-w-[180px] truncate font-mono text-xs text-muted-foreground">
                      {formatValue(log.oldValue)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="max-w-[180px] truncate font-mono text-xs text-muted-foreground">
                      {formatValue(log.newValue)}
                    </p>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {format(new Date(log.createdAt), "MMM d, yyyy • h:mm a")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {logs.map((log) => (
          <div key={log.id} className="app-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback>{getInitials(log.user.name)}</AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate font-medium">{log.user.name}</p>

                  <p className="truncate text-xs text-muted-foreground">
                    {log.user.email}
                  </p>
                </div>
              </div>

              <StatusBadge label={log.action} variant="info" />
            </div>

            <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">Entity</span>

                <StatusBadge label={log.entity} variant="default" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Entity ID</p>

                <p className="mt-1 break-all font-mono text-xs">
                  {log.entityId}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Old Value</p>

                <p className="mt-1 break-all rounded-md bg-muted/40 p-2 font-mono text-xs">
                  {formatValue(log.oldValue)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">New Value</p>

                <p className="mt-1 break-all rounded-md bg-muted/40 p-2 font-mono text-xs">
                  {formatValue(log.newValue)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
                <span className="text-xs text-muted-foreground">
                  Created At
                </span>

                <span className="text-right text-xs text-muted-foreground">
                  {format(new Date(log.createdAt), "MMM d, yyyy • h:mm a")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminAuditLogsTable;
