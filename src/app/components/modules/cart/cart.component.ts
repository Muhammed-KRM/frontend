import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { CartResponse, CartItemResponse } from '../../../core/modals/Cart.Modal';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: CartResponse | null = null;
  loading: boolean = true;
  error: string | null = null;
  subtotal: number = 0;
  shipping: number = 0;
  total: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.cart$.subscribe({
      next: (cart) => {
        this.cart = cart;
        this.calculateTotals();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Sepet yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        this.loading = false;
        console.error('Sepet yükleme hatası:', error);
      }
    });
  }

  calculateTotals(): void {
    if (this.cart && this.cart.items.length > 0) {
      // Alt toplam hesaplama
      this.subtotal = this.cart.items.reduce((total, item) => total + item.totalPrice, 0);
      
      // Kargo ücreti hesaplama (500 TL üzeri alışverişlerde ücretsiz)
      this.shipping = this.subtotal >= 500 ? 0 : 35;
      
      // Toplam tutar hesaplama
      this.total = this.subtotal + this.shipping;
    } else {
      this.subtotal = 0;
      this.shipping = 0;
      this.total = 0;
    }
  }

  updateQuantity(item: CartItemResponse, newQuantity: number): void {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    
    // newQuantity değerinin bir sayı olduğundan emin olalım
    const quantityAsNumber = Number(newQuantity);
    if (isNaN(quantityAsNumber)) {
      console.error('Geçersiz miktar değeri:', newQuantity);
      // Opsiyonel: Kullanıcıya hata mesajı gösterilebilir
      return;
    }

    if (quantityAsNumber !== item.quantity) {
      this.cartService.updateCartItemQuantity(item.itemId, quantityAsNumber).subscribe({
        next: () => {
          // this.loadCart(); // cart$ observable zaten güncellemeyi tetikleyecektir.
        },
        error: (error) => {
          console.error('Miktar güncelleme hatası:', error);
          this.error = 'Miktar güncellenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        }
      });
    }
  }

  // Yeni metod: Input değerini almak için
  getInputValue(event: Event): number {
    return parseInt((event.target as HTMLInputElement).value, 10);
  }

  removeItem(itemId: number): void {
    if (confirm('Bu ürünü sepetinizden kaldırmak istediğinize emin misiniz?')) {
      this.cartService.removeFromCart({ cartItemId: itemId }).subscribe({
        next: () => {
          this.loadCart();
        },
        error: (error) => {
          console.error('Ürün kaldırma hatası:', error);
          this.error = 'Ürün kaldırılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        }
      });
    }
  }

  clearCart(): void {
    if (confirm('Sepetinizi tamamen boşaltmak istediğinize emin misiniz?')) {
      this.cartService.clearCart().subscribe({
        next: () => {
          this.loadCart();
        },
        error: (error) => {
          console.error('Sepet temizleme hatası:', error);
          this.error = 'Sepet temizlenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        }
      });
    }
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
} 