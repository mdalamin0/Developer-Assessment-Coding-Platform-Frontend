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
