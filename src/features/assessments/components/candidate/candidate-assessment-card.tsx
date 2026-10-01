"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Target,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { InvitationData } from "@/features/invitations/invitation.types";


interface CandidateAssessmentCardProps {
  invitation: InvitationData;
}

const invitationStatusConfig: Record<
  InvitationData["status"],
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
  DECLINED: {
    label: "Declined",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
  EXPIRED: {
    label: "Expired",
    className: "border-muted-foreground/20 bg-muted text-muted-foreground",
  },
};

const CandidateAssessmentCard = ({
  invitation,
}: CandidateAssessmentCardProps) => {
  const { assessment } = invitation;

  const invitationStatus = invitationStatusConfig[invitation.status];

  const isAvailable =
    assessment.status === "PUBLISHED" && invitation.status === "ACCEPTED";

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-5">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {assessment.title}
              </h3>

              {assessment.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {assessment.description}
                </p>
              )}
            </div>

            <Badge
              variant="outline"
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                invitationStatus.className,
              )}
            >
              {invitationStatus.label}
            </Badge>
          </div>

          {/* Assessment Information */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border/50 bg-background p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock3 className="size-4 text-primary/80" />
                <span className="text-xs">Duration</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {assessment.duration} min
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-background p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="size-4 text-primary/80" />
                <span className="text-xs">Total Marks</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {assessment.totalMarks}
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-background p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="size-4 text-primary/80" />
                <span className="text-xs">Passing Marks</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {assessment.passingMarks}
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-background p-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="size-4 text-primary/80" />
                <span className="text-xs">Assessment</span>
              </div>

              <p className="mt-2 text-sm font-semibold text-foreground">
                {assessment.status}
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-3 border-t border-border/50 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4 shrink-0 text-primary/80" />

              <span>
                {format(new Date(assessment.startAt), "MMM d, yyyy")} —{" "}
                {format(new Date(assessment.endAt), "MMM d, yyyy")}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                Invited {format(new Date(invitation.invitedAt), "MMM d, yyyy")}
              </span>

              <span>
                Expires {format(new Date(invitation.expiresAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end border-t border-border/50 pt-4">
            <Button
              nativeButton={false}
              render={<Link href={`/candidate/assessments/${assessment.id}`} />}
              size="sm"
              variant={isAvailable ? "default" : "outline"}
              className="rounded-xl"
            >
              {isAvailable ? "View Assessment" : "View Details"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateAssessmentCard;
