import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/Login'; 

  constructor(private http: HttpClient) {}

    // Envia uma requisição POST
  login(email: string, senha: string): Observable<any> {
    const loginData = { email, senha };
    return this.http.post(`${this.baseUrl}/login`, loginData); 
  }
}
