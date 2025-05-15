import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/public/auth.service';
import { sha1 } from 'js-sha1';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signin-modal',
  templateUrl: './admin-signin-modal.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AdminSigninModalComponent {
  userData = {
    userName: '',
    password: '',
    userImageLink: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const data = {
      userName: this.userData.userName,
      passwordHash: sha1(this.userData.password),
      userImageLink: this.userData.userImageLink
    };

    this.authService.AdminSignUp(data).subscribe({
      next: (response: any) => {
        if (response.errored) {
          this.errorMessage = response.errorMessage;
        } else {
          this.errorMessage = '';
          this.router.navigate(['/login']);
        }
      },
      error: (error: any) => {
          this.errorMessage = String(error.error.errorMessage) || 'Bir hata oluştu';
      }
    });
  }
}
