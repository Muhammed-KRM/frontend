import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/public/auth.service';
import { UserManagementService, User } from '../../../../core/services/api/user-management.service';
import { MainConfigService } from '../../../../core/services/public/main-config.service';
import { MainConfigPipe } from '../../../../core/pipes/main-config.pipe';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    
  ],
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  errorMessage = '';
  Message = '';
  users: User[] = [];
  selectedUser: User | null = null;
  userRoleOptions: { value: number; display: string }[] = [];
  userRoleMappings: {[key: number]: string} = {};
  UserRoleinAuthorization: any[] = [];
  roleDisplayMap: { [key: number]: string } = {};

  constructor(
    private authService: AuthService,
    private userManagementService: UserManagementService,
    public mainConfigService: MainConfigService
  ) {}

  async ngOnInit() {
    await this.getAllUser();


  }

  getAllUser() {
    this.userManagementService.getAllUser().subscribe({
      next: (response: any) => {
        if (response.errored) {
          this.errorMessage = response.errorMessage;
        } else {
          console.log('Gelen kullanıcı verileri:', response.response);
    
          this.users = response.response;
          this.users.forEach((user: any) => {
            user.userRoleinAuthorization = this.createRoleDisplayMap(user.userRoleinAuthorization);
         
          });
          console.log('Gelen kullanıcı verileri:', this.users[1].userRoleinAuthorization);
        
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Veri çekme hatası: ' + error.message;
      }
    });
  }

  deleteUser(user: User) {
    if (confirm(`"${user.userName}" kullanıcısını silmek istediğinizden emin misiniz?`)) {
      this.userManagementService.deleteUser(user).subscribe({
        next: (response: any) => {
          if (response.errored) {
            this.errorMessage = response.errorMessage;
          } else {
            this.errorMessage = '';
            this.getAllUser();
            this.Message = response.message;
          }
        },
        error: (error: any) => {
          this.errorMessage = String(error.error.errorMessage) || 'Bir hata oluştu';
        }
      });
    }
  }

  selectUserForUpdate(user: User) {
    this.userManagementService.setSelectedUser(user);
  }


  createRoleDisplayMap(roleValue: number): string {
    const UserRoleinAuthorizations = this.mainConfigService.getMainConfig('UserRoleinAuthorization', true);
    const foundRole = UserRoleinAuthorizations.find((item: any) => item.value === roleValue);
    return foundRole ? foundRole.key : roleValue.toString();
  }


}
