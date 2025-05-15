// Request Models
export interface RefundRequestData {
  orderId: number;
  reason: string;
  items?: RefundItemData[];
}

export interface RefundItemData {
  orderItemId: number;
  quantity: number;
}

// Response Models
export interface ReturnRequestSummaryResponse {
  orderId: number;
  merchantOid: string;
  orderDate: Date;
  totalAmount: number;
  userId: number;
  returnReason?: string;
  currentStatus: string;
}

export enum RefundStatus {
  Requested = 0,
  Approved = 1,
  Rejected = 2,
  Completed = 3
} 