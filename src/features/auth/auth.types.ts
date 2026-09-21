export type LoginRole = "CANDIDATE" | "RECRUITER";
export const UserRole = {
  ADMIN: "ADMIN",
  CANDIDATE: "CANDIDATE",
  RECRUITER: "RECRUITER",
} as const; 


export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];



export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  role: "CANDIDATE" | "RECRUITER";
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface resendVerificationPayload {
  email: string;
}

