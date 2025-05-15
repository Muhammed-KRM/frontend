import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/public/auth.service';
import { HttpHeaderService } from '../../../core/services/public/http-header.service';
import { sha1 } from 'js-sha1';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Bağımlılıkları buraya ekle
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  returnUrl: string = '/';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private httpHeaderService: HttpHeaderService
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(): void {
    let data = {
      username: this.username,
      passwordHash: sha1(this.password)
    }
  
    this.authService.login(data).subscribe({
      next: data => {
        if (!data.errored) {
          
          this.authService.user = data.response;
          this.httpHeaderService.token = this.authService.getToken();
          // API'den gelen kullanıcı bilgilerini localStorage'a kaydet
          localStorage.setItem('user', JSON.stringify(data.response));
          this.router.navigate([this.returnUrl]);
        } else {
          Swal.fire({ 
            icon: "error", 
            title: "Oops...", 
            text: data.errorMessage 
          });
        }
        this.authService.getAllConfigurationData().subscribe(data => {
          localStorage.setItem("ConfigurationData", JSON.stringify(data));
        });
      },
      error: error => {
        Swal.fire({ 
          icon: "error", 
          title: "Oops...", 
          text: error.message 
        });
      }
    });
  }
}