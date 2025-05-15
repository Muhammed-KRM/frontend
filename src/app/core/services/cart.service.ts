import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AddToCartRequest, RemoveFromCartRequest, CartResponse } from '../modals/Cart.Modal';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;
  private cartSubject = new BehaviorSubject<CartResponse | null>(null);
  
  cart$ = this.cartSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.loadCart();
  }
  
  // Kullanıcının sepetini yükle
  loadCart(): void {
    this.http.get<CartResponse>(`${this.apiUrl}/get-cart`)
      .pipe(
        tap(response => this.cartSubject.next(response))
      )
      .subscribe({
        error: error => {
          console.error('Sepet yüklenirken hata oluştu:', error);
          // Hata durumunda boş sepet oluştur
          this.cartSubject.next({ 
            userId: 0,
            items: [],
            totalPrice: 0
          });
        }
      });
  }
  
  // Sepete ürün ekleme
  addToCart(request: AddToCartRequest): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/add`, request)
      .pipe(
        tap(response => this.cartSubject.next(response))
      );
  }
  
  // Sepetten ürün çıkarma
  removeFromCart(request: RemoveFromCartRequest): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/remove`, request)
      .pipe(
        tap(response => this.cartSubject.next(response))
      );
  }
  
  // Sepeti güncelleme
  updateCartItemQuantity(cartItemId: number, quantity: number): Observable<CartResponse> {
    return this.http.put<CartResponse>(`${this.apiUrl}/update-quantity`, { cartItemId, quantity })
      .pipe(
        tap(response => this.cartSubject.next(response))
      );
  }
  
  // Sepeti temizleme
  clearCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/clear`)
      .pipe(
        tap(() => {
          this.cartSubject.next({ 
            userId: 0,
            items: [],
            totalPrice: 0
          });
        })
      );
  }
  
  // Sepet toplam ürün sayısını getir
  getCartItemCount(): number {
    const cart = this.cartSubject.value;
    return cart ? cart.items.length : 0;
  }
  
  // Demo amaçlı test verisi
  loadDemoCart(): void {
    const demoCart: CartResponse = {
      userId: 1,
      items: [
        {
          itemId: 1,
          productId: 101,
          productName: 'Naturel Sızma Zeytinyağı 1 lt',
          imageUrl: 'assets/images/products/zeytinyagi-1lt.jpg',
          quantity: 2,
          unitPrice: 400,
          totalPrice: 800
        },
        {
          itemId: 2,
          productId: 102,
          productName: 'Naturel Sızma Zeytinyağı 2 lt',
          imageUrl: 'assets/images/products/zeytinyagi-2lt.jpg',
          quantity: 1,
          unitPrice: 800,
          totalPrice: 800
        }
      ],
      totalPrice: 1600
    };
    
    this.cartSubject.next(demoCart);
  }
} 