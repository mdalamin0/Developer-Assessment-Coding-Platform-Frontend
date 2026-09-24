export interface AssessmentFormValues {
  title: string;
  description?: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  startAt: string;
  endAt: string;
}

export interface AssessmentFormProps {
  assessment?: AssessmentFormValues & {
    id: string;
  };
  onCancel?: () => void;
}

export interface Recruiter {
  id: string;
  companyName: string;
  companyWebsite: string;
  companyLogo: string;
  logoPublicId: string;
  companyDescription: string;
  designation: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export  type AssessmentStatus =  "DRAFT" | "PUBLISHED" | "ONGOING" | "COMPLETED" | "ARCHIVED";

export interface ProblemDataType {
  id: string;
  recruiterId: string;
  title: string;
  description: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  status: AssessmentStatus;
  startAt: string;
  endAt: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  recruiter: Recruiter;
  problemCount: number;
}

export interface AssessmentParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}