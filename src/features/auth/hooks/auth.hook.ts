import { useMutation } from "@tanstack/react-query"
import { userLogin, userRegister } from "../auth.api"

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: userRegister
  })
}