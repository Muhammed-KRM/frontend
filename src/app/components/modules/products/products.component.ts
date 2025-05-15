import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product, Category } from '../../../core/modals/Products.Modal';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  sortOrder: string = 'latest';
  loading: boolean = true;
  error: string | null = null;
  categoryParam: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // URL'den kategori parametresini al
    this.route.paramMap.subscribe(params => {
      this.categoryParam = params.get('category');
      this.loadData();
    });
  }

  // Yeni metod: Kategoriye ait ürün sayısını döndürür
  getCategoryProductCount(categoryName: string): number {
    if (!this.products || this.products.length === 0) {
      return 0;
    }
    return this.products.filter(product => product.category === categoryName).length;
  }

  loadData(): void {
    this.loading = true;
    
    // Demo kategoriler
    this.categories = [
      { id: 1, name: 'Zeytinyağı', icon: 'fas fa-wine-bottle' },
      { id: 2, name: 'Zeytin', icon: 'fas fa-seedling' },
      { id: 3, name: 'Reçel', icon: 'fas fa-candy-cane' },
      { id: 4, name: 'Salça', icon: 'fas fa-mortar-pestle' },
      { id: 5, name: 'Sabun', icon: 'fas fa-soap' },
      { id: 6, name: 'Kozmetik', icon: 'fas fa-spa' }
    ];

    // Demo ürünler - gerçek uygulamada servisten çekilecek
    this.products = [
      {
        id: 1,
        name: 'Naturel Sızma Zeytinyağı 5 lt',
        description: 'Erken hasat, soğuk sıkım naturel sızma zeytinyağı, yüksek antioksidan değerine sahiptir.',
        price: 2000,
        image: 'assets/images/products/zeytinyagi-5lt.jpg',
        category: 'Zeytinyağı',
        stock: 50
      },
      {
        id: 2,
        name: 'Naturel Sızma Zeytinyağı 2 lt',
        description: 'Erken hasat, soğuk sıkım naturel sızma zeytinyağı, yüksek antioksidan değerine sahiptir.',
        price: 800,
        image: 'assets/images/products/zeytinyagi-2lt.jpg',
        category: 'Zeytinyağı',
        stock: 75
      },
      {
        id: 3,
        name: 'Naturel Sızma Zeytinyağı 1 lt',
        description: 'Erken hasat, soğuk sıkım naturel sızma zeytinyağı, yüksek antioksidan değerine sahiptir.',
        price: 400,
        image: 'assets/images/products/zeytinyagi-1lt.jpg',
        category: 'Zeytinyağı',
        stock: 100
      },
      {
        id: 4,
        name: 'Naturel Birinci Zeytinyağı 5 lt',
        description: 'Kaliteli, lezzetli birinci sınıf zeytinyağı.',
        price: 1900,
        image: 'assets/images/products/zeytinyagi-5lt-birinci.jpg',
        category: 'Zeytinyağı',
        stock: 60
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

    // Kategori seçilmişse filtreleme yap
    this.applyFilters();
    
    this.loading = false;
  }

  applyFilters(): void {
    let filtered = [...this.products];
    
    // Kategori filtresi
    if (this.categoryParam) {
      filtered = filtered.filter(p => p.category.toLowerCase() === this.categoryParam?.toLowerCase());
      this.selectedCategory = this.categoryParam;
    } else if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    
    // Sıralama
    switch (this.sortOrder) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
      default:
        // ID'ye göre sırala - gerçek uygulamada tarih bilgisi kullanılabilir
        filtered.sort((a, b) => b.id - a.id);
        break;
    }
    
    this.filteredProducts = filtered;
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category === this.selectedCategory ? '' : category;
    this.applyFilters();
  }

  onSortChange(sortOrder: string): void {
    this.sortOrder = sortOrder;
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({
      productId: product.id,
      quantity: 1
    }).subscribe({
      next: () => {
        // Başarılı işlem bildirimi yapılabilir
        console.log('Ürün sepete eklendi');
      },
      error: error => {
        console.error('Sepete eklenirken hata oluştu:', error);
      }
    });
  }
} 