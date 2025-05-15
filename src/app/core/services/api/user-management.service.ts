import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private path = "https://localhost:7049/User";
  private authPath = "https://localhost:7049/api/Auth";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  private modalModeSubject = new BehaviorSubject<'create' | 'update'>('update');
  modalMode$ = this.modalModeSubject.asObservable();

  setSelectedUser(user: User | null) {
    if (user) {
      this.modalModeSubject.next('update');
      this.selectedUserSubject.next(user);
    } else {
      this.modalModeSubject.next('create');
      // Create modunda eski kullanıcı verisi kalmasın diye null gönderiyoruz
      this.selectedUserSubject.next(this.createEmptyUser());
    }
  }

  // Boş kullanıcı nesnesi oluşturan yardımcı fonksiyon
  private createEmptyUser(): User {
    return {
      id: 0, // veya null/undefined, ID backend tarafından atanacaksa
      userName: '',
      password: '',
      userImageLink: '',
      userRoleinAuthorization: 0, // Varsayılan rol değeri (örneğin 'User')
      state: true // Varsayılan durum
    };
  }

  // User Management API'leri
  getAllUser(): Observable<any> {
    return this.httpClient.post(
      this.path + "/GeAllUser",
      {},
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  updateUser(data: any): Observable<any> {
    return this.httpClient.post(
      this.path + "/UpdateUser",
      JSON.stringify(data),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  createUser(data: any): Observable<any> {
    return this.httpClient.post(
      this.path + "/CreateUser",
      JSON.stringify(data),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  deleteUser(data: any): Observable<any> {
    return this.httpClient.post(
      this.path + "/DeleteUser",
      JSON.stringify(data),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Auth API'leri
  login(credentials: LoginCredentials): Observable<any> {
    return this.httpClient.post(
      `${this.authPath}/Login`,
      JSON.stringify(credentials),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  signUp(userData: SignUpData): Observable<any> {
    return this.httpClient.post(
      `${this.authPath}/SignUp`,
      JSON.stringify(userData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  registerAdmin(adminData: SignUpData): Observable<any> {
    return this.httpClient.post(
      `${this.authPath}/RegisterAdmin`,
      JSON.stringify(adminData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  updatePassword(passwordData: UpdatePasswordData): Observable<any> {
    return this.httpClient.post(
      `${this.authPath}/UpdatePassword`,
      JSON.stringify(passwordData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  getMyInfo(): Observable<any> {
    return this.httpClient.get(
      `${this.authPath}/GetMyInfo`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  logout(): Observable<any> {
    return this.httpClient.post(
      `${this.authPath}/Logout`,
      {},
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export type User = {
  id: number;
  userName: string;
  password?: string; // Oluşturma/Güncelleme formu için eklendi
  passwordHash?: string; // API'nin kullandığı alan
  userImageLink: string;
  userRoleinAuthorization: number;
  state: boolean;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  password: string;
  email?: string;
  fullName?: string;
}

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// // Boş kullanıcı nesnesi oluşturan yardımcı fonksiyon
// function createEmptyUser(): User {
//   return {
//     id: 0, // veya null/undefined, ID backend tarafından atanacaksa
//     userName: '',
//     password: '', 
//     userImageLink: '',
//     userRoleinAuthorization: 0, // Varsayılan rol değeri (örneğin 'User')
//     state: true // Varsayılan durum
//   };
// }

