import apiClient from "@/lib/apiClient";
import {
  LoginUserPayload,
  RegisterUserPayload,
  resendVerificationPayload,
  VerifyEmailPayload,
} from "./auth.types";

export const userRegister = (payload: RegisterUserPayload) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const userLogin = (payload: LoginUserPayload) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const verifyEmail = (payload: VerifyEmailPayload) => {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const resendVerficationCode = (payload: resendVerificationPayload) => {
  return apiClient("/auth/resend-verification-code", {
    method: "POST",
    body: payload,
  });
};

export const getMe = () => {
  return apiClient("/users/me");
};

export function userLogout() {
  return apiClient("/auth/logout", { method: "POST" });
}