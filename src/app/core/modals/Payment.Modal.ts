// Request Models
export interface InitiatePaymentRequest {
  orderId: number;
  amount: number;
  paymentMethod: string;
  returnUrl: string;
}

export interface PaymentCallbackRequest {
  paymentId: string;
  status: string;
  orderId: number;
}

// Response Models
export interface InitiatePaymentResponse {
  payTrToken: string;
  merchantOid: string;
}

export enum PaymentStatus {
  Pending = 0,
  Completed = 1,
  Failed = 2,
  Refunded = 3
} 