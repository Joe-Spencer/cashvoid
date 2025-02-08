import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';  // Django backend URL

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('user_input', message);

    return this.http.post(`${this.apiUrl}/chat/`, body.toString(), {
      headers,
      responseType: 'text'
    });
  }
} 