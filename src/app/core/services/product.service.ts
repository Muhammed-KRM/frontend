import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { 
  ProductSummaryResponse, 
  ProductDetailsResponse,
  CategoryResponse,
  ProductCreateRequest,
  ProductUpdateRequest
} from '../modals/Products.Modal';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  
  constructor(private http: HttpClient) { }
  
  // Tüm ürünleri getir
  getAllProducts(): Observable<ProductSummaryResponse[]> {
    return this.http.get<ProductSummaryResponse[]>(`${this.apiUrl}`)
      .pipe(
        catchError(error => {
          console.error('Ürünler yüklenirken hata oluştu:', error);
          return of([]);
        })
      );
  }
  
  // Ürün detaylarını getir
  getProductById(id: number): Observable<ProductDetailsResponse> {
    return this.http.get<ProductDetailsResponse>(`${this.apiUrl}/${id}`);
  }
  
  // Kategoriye göre ürünleri getir
  getProductsByCategory(categoryId: number): Observable<ProductSummaryResponse[]> {
    return this.http.get<ProductSummaryResponse[]>(`${this.apiUrl}/category/${categoryId}`)
      .pipe(
        catchError(error => {
          console.error('Kategori ürünleri yüklenirken hata oluştu:', error);
          return of([]);
        })
      );
  }
  
  // Tüm kategorileri getir
  getAllCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${environment.apiUrl}/categories`)
      .pipe(
        catchError(error => {
          console.error('Kategoriler yüklenirken hata oluştu:', error);
          return of([]);
        })
      );
  }
  
  // Ürün ara
  searchProducts(query: string): Observable<ProductSummaryResponse[]> {
    return this.http.get<ProductSummaryResponse[]>(`${this.apiUrl}/search?q=${query}`)
      .pipe(
        catchError(error => {
          console.error('Ürün araması yapılırken hata oluştu:', error);
          return of([]);
        })
      );
  }
  
  // Admin: Yeni ürün ekle
  addProduct(product: ProductCreateRequest): Observable<ProductDetailsResponse> {
    return this.http.post<ProductDetailsResponse>(`${this.apiUrl}`, product);
  }
  
  // Admin: Ürün güncelle
  updateProduct(product: ProductUpdateRequest): Observable<ProductDetailsResponse> {
    return this.http.put<ProductDetailsResponse>(`${this.apiUrl}/${product.id}`, product);
  }
  
  // Admin: Ürün sil
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 