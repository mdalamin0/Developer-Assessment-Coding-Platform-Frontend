import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Target,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AssessmentStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

type InvitationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";

interface CandidateAssessmentInvitation {
  id: string;
  status: InvitationStatus;
  invitedAt: string;
  expiresAt: string;
}

interface CandidateAssessmentCardProps {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  status: AssessmentStatus;
  startAt: string;
  endAt: string;
  recruiter: {
    companyName: string;
    designation: string;
    user: {
      name: string;
    };
  };
  invitations: CandidateAssessmentInvitation[];
}

const assessmentStatusConfig: Record<
  AssessmentStatus,
  {
    label: string;
    className: string;
  }
> = {
  DRAFT: {
    label: "Draft",
    className: "border-muted-foreground/20 bg-muted text-muted-foreground",
  },
  PUBLISHED: {
    label: "Published",
    className: "border-primary/20 bg-primary/10 text-primary",
  },
  CLOSED: {
    label: "Closed",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

const invitationStatusConfig: Record<
  InvitationStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  ACCEPTED: {
    label: "Accepted",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  REJECTED: {
    label: "Rejected",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
  EXPIRED: {
    label: "Expired",
    className: "border-muted-foreground/20 bg-muted text-muted-foreground",
  },
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export default function CandidateAssessmentCard({
  id,
  title,
  description,
  duration,
  totalMarks,
  passingMarks,
  status,
  startAt,
  endAt,
  recruiter,
  invitations,
}: CandidateAssessmentCardProps) {
  const assessmentStatus = assessmentStatusConfig[status];

  const invitation = invitations[0];
  const invitationStatus = invitation
    ? invitationStatusConfig[invitation.status]
    : null;

  const isAvailable =
    status === "PUBLISHED" && invitation?.status === "ACCEPTED";

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-5">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {title}
                </h3>

                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-medium",
                    assessmentStatus.className,
                  )}
                >
                  {assessmentStatus.label}
                </Badge>
              </div>

              {description && (
                <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            {invitationStatus && (
              <Badge
                variant="outline"
                className={cn(
                  "w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                  invitationStatus.className,
                )}
              >
                Invitation: {invitationStatus.label}
              </Badge>
            )}
          </div>

          {/* Recruiter */}
          <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Assessment by
            </p>

            <div className="mt-1">
              <p className="text-sm font-semibold text-foreground">
                {recruiter.companyName}
              </p>

              <p className="text-sm text-muted-foreground">
                {recruiter.user.name} · {recruiter.designation}
              </p>
            </div>
          </div>

          {/* Assessment Information */}
          <div className="grid grid-cols-2 gap-3 ">
            <div className="rounded-xl border border-border/50 bg-background p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock3 className="size-4 text-primary/80" />
                <span className="text-xs">Duration</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {duration} min
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-background p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="size-4 text-primary/80" />
                <span className="text-xs">Total Marks</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {totalMarks}
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-background p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="size-4 text-primary/80" />
                <span className="text-xs">Passing Marks</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {passingMarks}
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-background p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="size-4 text-primary/80" />
                <span className="text-xs">Status</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {invitationStatus?.label ?? "Unavailable"}
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex flex-col gap-3 border-t border-border/50 pt-4 text-sm ">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="size-4 text-primary/80" />

              <span>
                {formatDate(startAt)} — {formatDate(endAt)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {invitation && (
                <span>Invited {formatDate(invitation.invitedAt)}</span>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end border-t border-border/50 pt-4">
            <Button
            nativeButton={false}
              render={
                <Link href={`/candidate/assessments/${id}`}>
                  {isAvailable ? "View Assessment" : "View Details"}
                </Link>
              }
              size="sm"
              variant={isAvailable ? "default" : "outline"}
              className="rounded-xl"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
