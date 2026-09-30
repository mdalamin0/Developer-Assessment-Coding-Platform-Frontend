export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";

export interface RecruiterPaymentsQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: PaymentStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface RecruiterPayment {
  id: string;
  recruiterId: string;
  assessmentId: string;
  amount: string;
  currency: string;
  transactionId: string;
  paymentMethod: string;
  status: PaymentStatus;
  merchantInvoiceNumber: string;
  bkashPaymentId: string;
  payerReference: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  assessment: {
    id: string;
    title: string;
  };
}

export interface RecruiterPaymentsResponse {
  data: RecruiterPayment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
