import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSigninModalComponent } from './admin-signin-modal/admin-signin-modal.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateUpdateUserModalComponent } from './user-management/create-update-user-modal.component';
import { UserManagementService } from '../../../core/services/api/user-management.service';


@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    AdminSigninModalComponent, 
    UserManagementComponent,
    CreateUpdateUserModalComponent
  ],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {

  constructor(private userManagementService: UserManagementService) {}

  reportGroupList: any[] = [];
  parameterListsinaReport: any[] = [];

  getReportListinaGroup(item: any) {
    // API çağrısı yapılacak
    console.log('getReportListinaGroup', item);
  }

  getParameterListsinaReport(id: number) {
    // API çağrısı yapılacak
    console.log('getParameterListsinaReport', id);
  }

  postParameterListsinaReport() {
    // API çağrısı yapılacak
    console.log('postParameterListsinaReport');
  }

  prepareCreateUserModal() {
    this.userManagementService.setSelectedUser(null);
  }

}
