export type ResultStatus = "PROCESSING" | "READY"

export interface CandidateResult {
  id: string;
  attemptId: string;
  totalScore: number | null;
  percentage: number | null;
  passed: boolean | null;
  status: ResultStatus;
  generatedAt: string | null;
  attempt: {
    id: string;
    submittedAt: string | null;
    assessment: {
      id: string;
      title: string;
      totalMarks: number;
      passingMarks: number;
    };
  };
}

export interface GetMyResultsResponse {
  data: CandidateResult[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MyResultsQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: ResultStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
