export type LoginRole = "CANDIDATE" | "RECRUITER";
export type UserRole = "ADMIN" | "CANDIDATE" | "RECRUITER";

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

