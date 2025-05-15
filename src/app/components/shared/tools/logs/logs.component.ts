import { Component, OnInit } from '@angular/core';
import { Log, LogsService } from '../../../../core/services/api/logs.service';
import { AuthService } from '../../../../core/services/public/auth.service';
import { UserManagementService } from '../../../../core/services/api/user-management.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-logs',
  imports: [
    FormsModule,
    DatePipe,
    CommonModule
  ],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent implements OnInit {
  errorMessage = '';
  Message = '';
  selectedLog: Log = {} as Log;
  users: any[] = [];
  logs: Log[] = [];

  constructor(
    private logsService: LogsService,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userManagementService.getAllUser().subscribe({
      next: (response: any) => {
        if (!response.errored) {
          this.users = response.response;
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Kullanıcılar yüklenirken hata oluştu';
      }
    });
  }

  GetSystemLogs() {
    const data = {
      id: this.selectedLog.id,
      tableName: this.selectedLog.tableName, 
      oldValue: this.selectedLog.oldValue,
      newValue: this.selectedLog.newValue,
      action: this.selectedLog.action,
      fromTime: this.selectedLog.fromTime,
      toTime: this.selectedLog.toTime,
      modUser: this.selectedLog.modUser,
    };

    this.logsService.GetSystemLogs(data).subscribe({
      next: (response: any) => {
        if (response.errored) {
          this.errorMessage = response.errorMessage;
        } else {
          this.errorMessage = '';
          this.logs = response.response;
          this.Message = response.message;
        }
      },
      error: (error: any) => {
        this.errorMessage = String(error.error.errorMessage) || 'Bir hata oluştu';
      }
    });
  }
}
