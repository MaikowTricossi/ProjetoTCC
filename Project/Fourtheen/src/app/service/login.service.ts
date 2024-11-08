import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'; 
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5000/api/Usuario';

  constructor(private http: HttpClient, private router: Router) { } 

  login(email: string, senha: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          if (email === 'admin@fourtheen.com') {
            this.router.navigate(['/adm']);
          } else {
            this.router.navigate(['/mural']);
          }
          return true;
        }
        return false;
      })
    );
  }
}

