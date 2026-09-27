import { UserRoleType } from "../auth/auth.types";

export interface ProfileAccountInfoProps {
  email: string;
  status: string;
  provider: "CREDENTIAL" | "GOOGLE";
  emailVerified: boolean;
  createdAt: string;
}

export interface ProfileHeaderProps {
  name: string;
  email: string;
  image: string | null;
  role: UserRoleType;
  onEdit: () => void;
}

export interface CandidateProfileProps {
  profile: {
    contactNumber: string | null;
    bio: string | null;
    resumeUrl: string | null;
    skills: string[];
    experience: string | null;
    githubUrl: string | null;
    linkedinUrl: string | null;
  };
}


export interface RecruiterProfileProps {
  profile: {
    companyName: string;
    companyWebsite: string | null;
    companyLogo: string | null;
    companyDescription: string | null;
    designation: string | null;
    linkedinUrl?: string | null;
  };
}