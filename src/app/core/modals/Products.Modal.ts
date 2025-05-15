export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

// Request Models
export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface ProductUpdateRequest extends ProductCreateRequest {
  id: number;
}

// Response Models
export interface ProductSummaryResponse {
  id: number;
  name?: string;
  price: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface ProductDetailsResponse extends ProductSummaryResponse {
  description?: string;
  stockQuantity: number;
}

export interface CategoryResponse {
  id: number;
  name?: string;
  description?: string;
}

export interface ProductReviewResponse {
  id: number;
  userId: number;
  userName?: string;
  rating: number;
  comment?: string;
  reviewDate: Date;
} 