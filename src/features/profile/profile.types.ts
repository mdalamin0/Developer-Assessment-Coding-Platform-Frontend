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


export interface CandidateProfile {
  contactNumber: string | null;
  bio: string | null;
  resumeUrl: string | null;
  skills: string[];
  experience: number | string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
}

export interface RecruiterProfile {
  companyName: string;
  companyWebsite: string | null;
  companyLogo: string | null;
  companyDescription: string | null;
  designation: string | null;
  linkedinUrl?: string | null;
}



export interface CandidateProfileProps {
  profile: CandidateProfile;
}

export interface RecruiterProfileProps {
  profile: RecruiterProfile;
}


  //  Edit Profile
export interface CandidateEditFormProps {
  name: string;
  email: string;
  contactNumber: string | null;
  bio: string | null;
  skills: string[];
  experience: number | string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  resumeUrl: string | null;
  onSuccess: () => void;
}

export interface RecruiterEditFormProps {
  name: string;
  email: string;
  companyName: string;
  companyWebsite: string | null;
  companyDescription: string | null;
  designation: string | null;
  companyLogo: string | null;
  onSuccess: () => void;
}

  //  Edit Profile Modal
export type CandidateUser = {
  name: string;
  email: string;
  role: "CANDIDATE";
  profile: CandidateProfile;
};

export type RecruiterUser = {
  name: string;
  email: string;
  role: "RECRUITER";
  profile: RecruiterProfile;
};

export type AdminUser = {
  name: string;
  email: string;
  role: "ADMIN";
  profile?: null;
};

export type UserProfile = CandidateUser | RecruiterUser | AdminUser;

export interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfile;
}
