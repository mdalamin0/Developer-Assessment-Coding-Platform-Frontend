"use client";

import { useState } from "react";
import { FetchError } from "ofetch";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Loader2, UserRound } from "lucide-react";

import Modal from "@/components/shared/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useInviteCandidate } from "../hooks/invitation.hooks";
import { useGetRecruiterAssessments } from "@/features/assessments/hooks/assessments.hooks";
import { ProblemDataType } from "@/features/assessments/assessment.types";
import { CandidateData } from "@/features/candidates/candidate.types";

interface Candidate {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface InviteCandidateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: CandidateData | null;
  onInviteSuccess?: (candidateId: string) => void;
}

const InviteCandidateModal = ({
  open,
  onOpenChange,
  candidate,
  onInviteSuccess
}: InviteCandidateModalProps) => {
  const [selectedAssessmentId, setSelectedAssessmentId] = useState("");

  const { data: assessmentData, isLoading: isAssessmentsLoading } =
    useGetRecruiterAssessments({
      status: "PUBLISHED",
    });

  const assessments = assessmentData?.data?.data ?? [];

  const { mutate: inviteCandidate, isPending: isInviting } =
    useInviteCandidate();

  const handleInvite = () => {
    if (!candidate || !selectedAssessmentId) {
      toast.error("Please select an assessment!");
      return;
    }

    inviteCandidate(
      {
        assessmentId: selectedAssessmentId,
        candidateId: candidate.id,
      },
      {
        onSuccess: (response) => {
          toast.success(response?.message || "Candidate invited successfully!");

          if (candidate) {
            onInviteSuccess?.(candidate.id);
          }

          setSelectedAssessmentId("");
          onOpenChange(false);
        },

        onError: (error) => {
          if (error instanceof FetchError) {
            toast.error(error.data?.message || "Failed to invite candidate!");
            return;
          }

          toast.error("Something went wrong!");
        },
      },
    );
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSelectedAssessmentId("");
    }

    onOpenChange(value);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Invite Candidate"
      description="Select an assessment to send an invitation to this candidate."
      mode="form"
    >
      <div className="space-y-6">
        {/* Candidate */}
        {candidate && (
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <UserRound className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="font-medium">{candidate.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {candidate.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Assessment */}
        <div className="space-y-2">
          <Label htmlFor="assessment">Select Assessment</Label>

          <Select
            value={selectedAssessmentId}
            onValueChange={(value) => setSelectedAssessmentId(value ?? "")}
            disabled={isAssessmentsLoading || isInviting}
          >
            <SelectTrigger id="assessment" className="w-full">
              <SelectValue
                placeholder={
                  isAssessmentsLoading
                    ? "Loading assessments..."
                    : "Select an assessment"
                }
              />
            </SelectTrigger>

            <SelectContent>
              {assessments.length === 0 ? (
                <SelectItem value="no-assessment" disabled>
                  No assessments available
                </SelectItem>
              ) : (
                assessments.map((assessment: ProblemDataType) => (
                  <SelectItem key={assessment.id} value={assessment.id}>
                    {assessment.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-border/60 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isInviting}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleInvite}
            disabled={!candidate || !selectedAssessmentId || isInviting}
          >
            {isInviting && <Loader2 className="mr-2 size-4 animate-spin" />}

            {isInviting ? "Sending..." : "Send Invitation"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteCandidateModal;
