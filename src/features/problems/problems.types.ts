export interface ProblemFormValues {
  title: string;
  description: string;
  type: "MCQ";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  marks: number;
  options: string[];
  correctAnswer: string;
}

export interface UpdateProblemData {
  title?: string;
  description?: string;
  type?: "MCQ";
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  marks?: number;
  options?: string[];
  correctAnswer?: string;
}

export interface ProblemFormProps {
  problem?: ProblemFormValues & {
    id: string;
  };
  onCancel?: () => void;
}


export interface ProblemParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}

export interface Problem {
  id: string;
  recruiterId: string;
  title: string;
  description: string;
  type: "MCQ" | "SUBJECTIVE" | string; 
  difficulty: "EASY" | "MEDIUM" | "HARD";
  marks: number;
  options: string[];
  correctAnswer: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  problemId: string;
  questionOrder: number;
  marks: number;
  createdAt: string;
  problem: Problem;
}

