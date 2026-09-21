import { useMutation, useQuery } from "@tanstack/react-query"
import {  getMe, resendVerficationCode, userLogin, userLogout, userRegister, verifyEmail } from "../auth.api"

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

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}


