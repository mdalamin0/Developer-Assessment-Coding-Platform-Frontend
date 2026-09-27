export interface AttemptQuestion {
  questionOrder: number;
  marks: number;
  problem: {
    id: string;
    title: string;
    description: string | null;
    type: "MCQ";
    difficulty: "EASY" | "MEDIUM" | "HARD";
    marks: number;
    options: string[];
  };
}

export interface AttemptAssessment {
  id: string;
  title: string;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  startAt: string;
  endAt: string;
}

export interface GetAttemptQuestionsResponse {
  attemptId: string;
  assessment: AttemptAssessment;
  questions: AttemptQuestion[];
}


export interface SubmitAnswerPayload {
  problemId: string;
  answer: string;
}