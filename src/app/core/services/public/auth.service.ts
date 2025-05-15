import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaderService } from './http-header.service';
import { User } from '../api/user-management.service';
// Önce interface'i tanımlayalım

// Role için enum
export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  adminAdmin = 'adminAdmin'
}

// State için enum
export enum UserState {
  Active = 'Active',
  Inactive = 'Inactive'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private path = "https://localhost:7049/Auth"; // API endpoint'i HttpHeaderService ile aynı base URL'i kullanıyor
  user: User | null = null; // any yerine User interface'ini kullanıyoruz

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpClient: HttpClient,
    private httpHeaderService: HttpHeaderService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr) as User;
      }
    }
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(
      this.path + "/Login",
      JSON.stringify(data),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(
      this.path + "/SignUp",
      JSON.stringify(data),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  AdminSignUp(data: any): Observable<any> {
    return this.httpClient.post(
      this.path + "/AdminSignUp",
      JSON.stringify(data),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  getAllConfigurationData(): Observable<any> {
    return this.httpClient.post("https://localhost:7049/Generel/GetAllConfigurationData",
      {},
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
  getAllConfigurationDatas() {
    return JSON.parse(localStorage.getItem("ConfigurationData") || "");
  }

  
  getToken(): string {
    return this.user?.token || '';
  }

  isAuthenticated(): boolean {
    return !!this.user?.token;
  }

  logout(): void {
    this.user = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }
}
