export interface CanidateParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "desc" | "asc";
}

export interface Candidate  {
    id: string;
    contactNumber: string | null;
    bio: string | null;
    resumeUrl: string | null;
    resumePublicId: string | null;
    skills: string[];
    experience: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
  }

export interface CandidateData {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "CANDIDATE";
  status: "ACTIVE" | "BLOCKED";
  provider: "CREDENTIAL" | "GOOGLE";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  candidate: Candidate;
}