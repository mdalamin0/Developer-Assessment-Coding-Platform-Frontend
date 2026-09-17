import apiClient from "@/lib/apiClient";
import { LoginUserPayload, RegisterUserPayload, VerifyEmailPayload } from "./auth.types";

export const userLogin = (payload: LoginUserPayload) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const userRegister = (payload: RegisterUserPayload) => {
  return apiClient("/auth/register", {
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
