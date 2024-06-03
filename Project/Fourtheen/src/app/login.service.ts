import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/Usuario';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string) {
  return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }
}
