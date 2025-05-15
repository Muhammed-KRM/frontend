import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private basePath = "https://localhost:7049/api/Payment";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  // Ödeme başlatma
  initiatePayment(paymentData: PaymentInitiateData): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/initiate`,
      JSON.stringify(paymentData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Ödeme callback
  paymentCallback(callbackData: PaymentCallbackData): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/callback`,
      JSON.stringify(callbackData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export interface PaymentInitiateData {
  orderId: number;
  amount: number;
  paymentMethod: string;
  returnUrl: string;
}

export interface PaymentCallbackData {
  paymentId: string;
  status: string;
  orderId: number;
} 