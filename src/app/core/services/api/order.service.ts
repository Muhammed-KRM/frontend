import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private basePath = "https://localhost:7049/api/Order";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  // Kullanıcının siparişlerini getirme
  getUserOrders(): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/GetUserOrders`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Sipariş detaylarını getirme
  getOrderById(orderId: number): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/${orderId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Siparişi iptal etme
  cancelOrder(orderId: number): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/CancelOrder/${orderId}`,
      {},
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Sipariş iadesi talep etme
  requestReturn(orderId: number): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/RequestReturn/${orderId}`,
      {},
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Sipariş takip bilgilerini getirme
  getOrderTracking(orderId: number): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/${orderId}/tracking`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Sipariş kargo bilgilerini getirme
  getOrderShipping(orderId: number): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/${orderId}/shipping`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export interface OrderData {
  id?: number;
  userId: number;
  items: OrderItemData[];
  status: string;
  totalAmount: number;
  shippingAddress: string;
  orderDate: Date;
}

export interface OrderItemData {
  id?: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
} 