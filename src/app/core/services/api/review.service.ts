import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private basePath = "https://localhost:7049/api/Review";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  // Ürün yorumlarını getirme
  getProductReviews(productId: number): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/GetProductReviews/${productId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Yorum ekleme
  addReview(reviewData: ReviewData): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/AddReview`,
      JSON.stringify(reviewData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Belirli bir yorumu getirme
  getReviewById(reviewId: number): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/${reviewId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export interface ReviewData {
  id?: number;
  productId: number;
  userId?: number;
  rating: number;
  comment: string;
  title?: string;
  date?: Date;
} 