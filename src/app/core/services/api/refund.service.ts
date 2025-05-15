import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class RefundService {
  private basePath = "https://localhost:7049/api/Refund";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  // İade talebi oluşturma
  requestRefund(refundData: RefundRequestData): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/RequestRefund`,
      JSON.stringify(refundData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Bekleyen iade taleplerini getirme
  getPendingRequests(): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/PendingRequests`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // İade talebini onaylama
  approveRefund(orderId: number): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/Approve/${orderId}`,
      {},
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // İade talebini reddetme
  rejectRefund(orderId: number): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/Reject/${orderId}`,
      {},
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export interface RefundRequestData {
  orderId: number;
  reason: string;
  items?: RefundItemData[];
}

export interface RefundItemData {
  orderItemId: number;
  quantity: number;
} 