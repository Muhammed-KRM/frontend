import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private basePath = "https://localhost:7049/api/Cart";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  // Sepete ürün ekleme
  addToCart(cartItem: CartItemData): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/AddToCart`,
      JSON.stringify(cartItem),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Sepetten ürün çıkarma
  removeFromCart(cartItemId: number): Observable<any> {
    return this.httpClient.delete(
      `${this.basePath}/RemoveFromCart/${cartItemId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Sepet bilgilerini getirme
  getCart(): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/GetCart`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export interface CartItemData {
  productId: number;
  quantity: number;
  id?: number;
}

export interface CartData {
  id: number;
  userId: number;
  items: CartItemData[];
  total: number;
} 