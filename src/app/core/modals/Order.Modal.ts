// Request Models
export interface CreateOrderRequest {
  items: OrderItemRequest[];
  shippingAddress: string;
  billingAddress?: string;
  paymentMethod: string;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

// Response Models
export interface OrderSummaryResponse {
  orderId: number;
  merchantOid: string;
  orderDate: Date;
  totalAmount: number;
  status?: string;
}

export interface OrderDetailsResponse extends OrderSummaryResponse {
  items: OrderItemResponse[];
  shippingAddress?: string;
  billingAddress?: string;
  trackingNumber?: string;
  shippingCarrier?: string;
  shippedDate?: Date;
  deliveredDate?: Date;
}

export interface OrderItemResponse {
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface TrackingInfoResponse {
  status?: string;
  trackingNumber?: string;
  shippingCarrier?: string;
}

export enum OrderStatus {
  Pending = 0,
  Processing = 1,
  Shipped = 2,
  Delivered = 3,
  Cancelled = 4,
  ReturnRequested = 5,
  Returned = 6
} 