
import apiClient from "@/lib/apiClient";
import { RecruiterPaymentsQuery } from "./payment.types";

export const getRecruiterPayments = (
  params?: RecruiterPaymentsQuery,
) => {
  return apiClient("/payment", {
    method: "GET",
    params,
  });
};

export const retryPayment = (assessmentId: string) => {
  return apiClient("/payment/retry-payment", {
    method: "POST",
    body: {
      assessmentId,
    },
  });
};