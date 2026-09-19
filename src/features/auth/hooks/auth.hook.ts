import { useMutation, useQuery } from "@tanstack/react-query"
import { googleLogin, resendVerficationCode, userLogin, userRegister, verifyEmail } from "../auth.api"

export const useRegister = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin
  })
}


export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail
  })
}

export const useResendVerificationCode = () => {
  return useMutation({
    mutationFn: resendVerficationCode
  })
}

export const useGoogleLogin = () => {
  return useQuery({
    queryKey: ["googleLogin"],
    queryFn: googleLogin,
    retry: false
  })
}