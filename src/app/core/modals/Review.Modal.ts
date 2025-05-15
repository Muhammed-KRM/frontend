// Request Models
export interface AddReviewRequest {
  productId: number;
  rating: number;
  comment: string;
}

// Response Models
export interface ProductReviewResponse {
  id: number;
  userId: number;
  userName?: string;
  rating: number;
  comment?: string;
  reviewDate: Date;
} 