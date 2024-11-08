import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CadastroModel } from '../models/CadastroModel';

@Injectable({
  providedIn: 'root'
})
export class AdmService {

  private apiUrl = 'https://localhost:5001/api/Usuario';  

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<CadastroModel> {
    return this.http.get<CadastroModel>(`${this.apiUrl}/${email}`);
  }

  updateUser(user: CadastroModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.email}`, user, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error: any) => {
          console.error('Erro ao atualizar o usuário', error);
          throw error; 
        })
      );
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${email}`, { responseType: 'text' });
  }
}
