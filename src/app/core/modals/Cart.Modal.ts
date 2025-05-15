// Request Models
export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface RemoveFromCartRequest {
  cartItemId: number;
}

// Response Models
export interface CartResponse {
  userId: number;
  items: CartItemResponse[];
  totalPrice: number;
}

export interface CartItemResponse {
  itemId: number;
  productId: number;
  productName?: string;
  imageUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
} 