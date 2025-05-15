import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';
import { User } from './user-management.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

 private path = "https://localhost:7049/General";
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  GetSystemLogs(data: any): Observable<any> {
    return this.httpClient.post(
      this.path + "/GetSystemLogs",
      JSON.stringify(data),
      { headers: this.httpHeaderService.getHeaders() }

    );
  }


}

export type Log = {
  id: number;
  tableName: string;
  oldValue: string;
  newValue: string;
  action: string;
  fromTime: string;
  toTime: string;
  modUser: number;

};
