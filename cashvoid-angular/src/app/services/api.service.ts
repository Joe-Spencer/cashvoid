import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Dynamic API URL based on environment
  private apiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'  // Local development Express backend
    : '';  // In production, use relative URL to same domain

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/api/chat`, { message }, {
      headers,
      responseType: 'text'
    });
  }
} 