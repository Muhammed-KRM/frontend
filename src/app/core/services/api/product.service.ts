import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basePath = "https://localhost:7049/api/Product";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  // Ürün oluşturma
  createProduct(productData: ProductData): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/CreateProduct`,
      JSON.stringify(productData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Ürün bilgilerini getirme
  getProductById(productId: number): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/${productId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Ürün güncelleme
  updateProduct(productId: number, productData: ProductData): Observable<any> {
    return this.httpClient.put(
      `${this.basePath}/${productId}`,
      JSON.stringify(productData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Ürün silme
  deleteProduct(productId: number): Observable<any> {
    return this.httpClient.delete(
      `${this.basePath}/${productId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Tüm ürünleri getirme
  getAllProducts(): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/GetAllProducts`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export interface ProductData {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrls?: string[];
} 