import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface UsuarioCadastro {
  apelido: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiUrl = 'http://localhost:5000/api/usuario'; 

  constructor(private http: HttpClient) {}

  cadastrar(usuario: UsuarioCadastro): Observable<any> {
    return this.http.post(this.apiUrl, usuario).pipe(
      catchError((error) => {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
      })
    );
  }
}
