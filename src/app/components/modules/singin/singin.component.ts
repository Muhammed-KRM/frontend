import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { sha1 } from 'js-sha1';
import { AuthService } from '../../../core/services/public/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.scss'
})
export class SinginComponent {
  user = {
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  changeLoadingVisible() {
    this.loading = !this.loading;
  }

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      Swal.fire({ 
        icon: "error", 
        title: "Hata", 
        text: "Şifreler eşleşmiyor!" 
      });
      return;
    }

    const data = {
      username: this.user.username,
      passwordHash: sha1(this.user.password),
      userRoleinAuthorization: 3
    };

    this.changeLoadingVisible();
    
    this.authService.register(data).subscribe({
      next: response => {
        if (!response.errored) {
          Swal.fire({
            icon: "success",
            title: "Başarılı!",
            text: "Kayıt işlemi tamamlandı"
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          this.changeLoadingVisible();
          Swal.fire({ 
            icon: "error", 
            title: "Oops...", 
            text: response.errorMessage 
          });
        }
      },
      error: error => {
        this.changeLoadingVisible();
        Swal.fire({ 
          icon: "error", 
          title: "Oops...", 
          text: error.message 
        });
      }
    });
  }
}
