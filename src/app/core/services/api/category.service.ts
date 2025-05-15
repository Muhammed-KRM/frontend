import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private basePath = "https://localhost:7049/api/Category";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  // Kategori oluşturma
  createCategory(categoryData: CategoryData): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/CreateCategory`,
      JSON.stringify(categoryData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Tüm kategorileri getirme
  getAllCategories(): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/GetAllCategories`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Kategori bilgilerini getirme
  getCategoryById(categoryId: number): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/${categoryId}`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Kategori güncelleme
  updateCategory(categoryId: number, categoryData: CategoryData): Observable<any> {
    return this.httpClient.put(
      `${this.basePath}/${categoryId}`,
      JSON.stringify(categoryData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export interface CategoryData {
  id?: number;
  name: string;
  description?: string;
  parentCategoryId?: number;
} 