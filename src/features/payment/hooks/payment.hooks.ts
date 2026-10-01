import { useMutation, useQuery } from "@tanstack/react-query";
import { RecruiterPaymentsQuery } from "../payment.types";
import { getRecruiterPayments, retryPayment } from "../payemt.api";

export const useGetRecruiterPayments = (params: RecruiterPaymentsQuery) => {
  return useQuery({
    queryKey: ["recruiter-payments", params],
    queryFn: () => getRecruiterPayments(params),
  });
};

export const useRetryPayment = () => {
  return useMutation({
    mutationFn: retryPayment,
  });
};