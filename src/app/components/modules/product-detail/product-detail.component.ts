import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/modals/Products.Modal';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  error: string | null = null;
  quantity: number = 1;
  relatedProducts: Product[] = [];
  activeTab: 'description' | 'details' | 'reviews' = 'description';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      if (productId) {
        this.loadProduct(productId);
      } else {
        this.error = 'Ürün bulunamadı.';
        this.loading = false;
      }
    });
  }

  loadProduct(productId: number): void {
    this.loading = true;
    
    // Demo ürün verileri (gerçek projede burada API'den veri çekilecek)
    setTimeout(() => {
      // Demo veriler
      this.product = {
        id: productId,
        name: 'Soğuk Sıkım Natürel Sızma Zeytinyağı ' + productId + 'L',
        description: 'Erken hasat, soğuk sıkım natürel sızma zeytinyağı, Ayvalık bölgesinin en kaliteli zeytinlerinden üretilmiştir. Yemeklerinizde ve salatalarda mükemmel bir lezzet sunar.',
        price: productId * 500,
        image: 'assets/images/products/zeytinyagi-' + productId + 'lt.jpg',
        category: 'Zeytinyağı',
        stock: 100
      };
      
      this.loadRelatedProducts();
      
      this.loading = false;
    }, 800);
    
    /* Gerçek API çağrısı - Gerçek projede kullanılacak
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loadRelatedProducts();
        this.loading = false;
      },
      error: (error) => {
        console.error('Ürün detayı yüklenirken hata:', error);
        this.error = 'Ürün detayı yüklenirken bir hata oluştu.';
        this.loading = false;
      }
    });
    */
  }

  loadRelatedProducts(): void {
    // Demo ilişkili ürünler (gerçek projede burada API'den veri çekilecek)
    this.relatedProducts = [
      {
        id: 1,
        name: 'Naturel Sızma Zeytinyağı 500 ml',
        description: 'Erken hasat, soğuk sıkım zeytinyağı.',
        price: 429,
        image: 'assets/images/products/zeytinyagi-500ml.jpg',
        category: 'Zeytinyağı',
        stock: 50
      },
      {
        id: 2,
        name: 'Naturel Sızma Zeytinyağı 1 Lt',
        description: 'Erken hasat, soğuk sıkım zeytinyağı.',
        price: 850,
        image: 'assets/images/products/zeytinyagi-1lt.jpg',
        category: 'Zeytinyağı',
        stock: 75
      },
      {
        id: 5,
        name: 'Salamura Kırma Zeytin 1 kg',
        description: 'Taze, lezzetli kırma yeşil zeytin.',
        price: 250,
        image: 'assets/images/products/zeytin-kirma.jpg',
        category: 'Zeytin',
        stock: 80
      },
      {
        id: 6,
        name: 'Doğal Zeytinyağlı Sabun',
        description: 'Tamamen doğal zeytinyağı ile yapılmış sabun.',
        price: 75,
        image: 'assets/images/products/sabun.jpg',
        category: 'Sabun',
        stock: 120
      }
    ];
    
    /* Gerçek API çağrısı - Gerçek projede kullanılacak
    if (this.product && this.product.category) {
      this.productService.getProductsByCategory(this.product.categoryId).subscribe({
        next: (products) => {
          // Aynı ürünü filtreleyerek sadece ilişkili ürünleri göster
          this.relatedProducts = products
            .filter(p => p.id !== this.product?.id)
            .slice(0, 4); // Sadece 4 ilişkili ürün göster
        },
        error: (error) => {
          console.error('İlişkili ürünler yüklenirken hata:', error);
        }
      });
    }
    */
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Yeni metod: Input değerini almak için
  onQuantityChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = parseInt(inputElement.value, 10);
    if (!isNaN(value) && value >= 1) {
      if (this.product && value > this.product.stock) {
        this.quantity = this.product.stock;
        // Opsiyonel: Kullanıcıya stok yetersiz mesajı gösterilebilir
        alert(`Stokta sadece ${this.product.stock} adet ürün bulunmaktadır.`);
        inputElement.value = this.product.stock.toString(); // Input değerini stokla eşitle
      } else {
        this.quantity = value;
      }
    } else {
      // Geçersiz giriş durumunda input değerini mevcut quantity ile geri ayarla
      inputElement.value = this.quantity.toString();
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart({
        productId: this.product.id,
        quantity: this.quantity
      }).subscribe({
        next: () => {
          alert('Ürün sepete eklendi!');
          // Başarılı ekleme sonrası miktarı sıfırla
          this.quantity = 1;
        },
        error: (error) => {
          console.error('Sepete eklenirken hata oluştu:', error);
          alert('Ürün sepete eklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      });
    }
  }

  setActiveTab(tab: 'description' | 'details' | 'reviews'): void {
    this.activeTab = tab;
  }

  // Yeni metod: İlişkili ürünü sepete eklemek için
  addRelatedProductToCart(productId: number): void {
    this.cartService.addToCart({ productId: productId, quantity: 1 }).subscribe({
      next: () => {
        alert('Ürün sepete eklendi!');
      },
      error: (error) => {
        console.error('İlişkili ürün sepete eklenirken hata oluştu:', error);
        alert('Ürün sepete eklenirken bir hata oluştu.');
      }
    });
  }

  navigateToProduct(productId: number): void {
    // Sayfayı yeniden yüklemeden ürün detayını güncelle
    this.router.navigate(['/products', productId]);
  }
} 