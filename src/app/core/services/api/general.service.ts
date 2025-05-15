import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaderService } from '../public/http-header.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private basePath = "https://localhost:7049/api/Generel";
  
  constructor(private httpClient: HttpClient, private httpHeaderService: HttpHeaderService) { }

  // Sistem loglarını getirme
  getSystemLogs(): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/GetSystemLogs`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Rapor gönderme
  sendReport(reportData: ReportData): Observable<any> {
    return this.httpClient.post(
      `${this.basePath}/SendReport`,
      JSON.stringify(reportData),
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Raporları getirme
  getReports(): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/GetReports`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }

  // Tüm konfigürasyon verilerini getirme
  getAllConfigurationData(): Observable<any> {
    return this.httpClient.get(
      `${this.basePath}/GetAllConfigurationData`,
      { headers: this.httpHeaderService.getHeaders() }
    );
  }
}

export interface ReportData {
  title: string;
  description: string;
  type: string;
  priority?: string;
  date?: Date;
}

export interface LogData {
  id: number;
  message: string;
  level: string;
  timestamp: Date;
  source: string;
}

export interface ConfigurationData {
  key: string;
  value: string;
  category: string;
  description?: string;
} 