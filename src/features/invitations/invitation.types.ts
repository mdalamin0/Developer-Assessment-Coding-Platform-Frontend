import { AssessmentStatus } from "../assessments/assessment.types";

export type InvitationStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "EXPIRED"


export interface InvitationAssessment {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  status: AssessmentStatus;
  startAt: string;
  endAt: string;
}

export interface InvitationData {
  id: string;
  assessment: InvitationAssessment;
  expiresAt: string;
  invitedAt: string;
  respondedAt: string | null;
  status: InvitationStatus;
}

export interface GetCandidateInvitationsResponse {
  data: InvitationData[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface InvitationParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
  status?: InvitationStatus
}