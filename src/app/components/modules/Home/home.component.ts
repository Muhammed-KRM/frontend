import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { Product, ProductSummaryResponse } from '../../../core/modals/Products.Modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories = [
    { id: 1, name: 'Zeytinyağı', icon: 'fas fa-wine-bottle', slug: 'zeytinyagi' },
    { id: 2, name: 'Zeytin', icon: 'fas fa-seedling', slug: 'zeytin' },
    { id: 3, name: 'Reçel', icon: 'fas fa-candy-cane', slug: 'recel' },
    { id: 4, name: 'Salça', icon: 'fas fa-mortar-pestle', slug: 'salca' },
    { id: 5, name: 'Sabun', icon: 'fas fa-soap', slug: 'sabun' },
    { id: 6, name: 'Kozmetik', icon: 'fas fa-spa', slug: 'kozmetik' }
  ];

  features = [
    {
      icon: 'fas fa-leaf',
      title: 'Doğal Ürünler',
      description: 'Tamamen doğal, katkısız ürünlerle sağlıklı yaşama katkıda bulunuyoruz.'
    },
    {
      icon: 'fas fa-award',
      title: 'Yüksek Kalite',
      description: 'Ege bölgesinin en kaliteli zeytinlerini özenle işliyoruz.'
    },
    {
      icon: 'fas fa-truck',
      title: 'Hızlı Teslimat',
      description: 'Ürünlerimizi en kısa sürede kapınıza teslim ediyoruz.'
    },
    {
      icon: 'fas fa-users',
      title: 'Müşteri Memnuniyeti',
      description: 'Müşteri memnuniyetini her zaman ön planda tutuyoruz.'
    }
  ];

  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Naturel Sızma Zeytinyağı 5 lt',
      description: 'Erken hasat, soğuk sıkım naturel sızma zeytinyağı.',
      price: 2000,
      image: 'assets/images/products/zeytinyagi-5lt.jpg',
      category: 'Zeytinyağı',
      stock: 50
    },
    {
      id: 2,
      name: 'Naturel Sızma Zeytinyağı 2 lt',
      description: 'Erken hasat, soğuk sıkım naturel sızma zeytinyağı.',
      price: 800,
      image: 'assets/images/products/zeytinyagi-2lt.jpg',
      category: 'Zeytinyağı',
      stock: 75
    },
    {
      id: 3,
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

  customerReviews = [
    {
      id: 1,
      userName: 'Ahmet Yılmaz',
      rating: 5,
      comment: 'Harika ürünler! Özellikle zeytinyağı çok lezzetli, mutfağımın vazgeçilmezi oldu.',
      date: new Date('2023-05-15')
    },
    {
      id: 2,
      userName: 'Ayşe Kaya',
      rating: 4,
      comment: 'Ürünlerin kalitesi gerçekten çok iyi. Hızlı kargo için de ayrıca teşekkürler.',
      date: new Date('2023-06-22')
    },
    {
      id: 3,
      userName: 'Mehmet Demir',
      rating: 5,
      comment: 'Zeytinyağını denedikten sonra başka marka kullanmam artık. Gerçek zeytinyağı tadı.',
      date: new Date('2023-07-10')
    }
  ];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Gerçek projede buradan API'den ürünleri çekebilirsiniz
    // this.loadFeaturedProducts();
  }

  // Öne çıkan ürünleri API'den çekme örneği
  loadFeaturedProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products: ProductSummaryResponse[]) => {
        // Öne çıkan ürünleri filtrele (gerçek uygulamada backend'den öne çıkanlar sorgulanabilir)
        this.featuredProducts = products.slice(0, 4).map(p => ({
          ...p,
          id: p.id || 0, // id null ise 0 ata
          name: p.name || '', // name null ise boş string ata
          description: '', // Varsayılan değerler
          image: p.imageUrl || 'assets/images/products/placeholder.jpg',
          category: '',
          price: p.price || 0,
          stock: 0
        }));
      },
      error: (error) => {
        console.error('Ürünler yüklenirken hata oluştu:', error);
      }
    });
  }

  // Sepete ürün ekleme
  addToCart(product: Product): void {
    this.cartService.addToCart({
      productId: product.id,
      quantity: 1
    }).subscribe({
      next: () => {
        console.log('Ürün sepete eklendi');
      },
      error: (error) => {
        console.error('Sepete eklenirken hata oluştu:', error);
      }
    });
  }
}
