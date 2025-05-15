import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {
  path = "https://localhost:7049";
  token = "";
  constructor() {}
  
  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Token", this.token);
    return headers;
  }
} 