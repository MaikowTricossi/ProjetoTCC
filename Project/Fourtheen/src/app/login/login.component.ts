import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  email: string = '';
  senha: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.criarForm();
  }

  ngOnInit() {

  }
  criarForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]

    });
  }
  loginSubmit() {
    const email = this.loginForm.value.email;
    const senha = this.loginForm.value.senha;

    this.authService.login(email, senha).subscribe(
      (res: any) => {
        console.log('Login bem-sucedido:', res);
      },
      (err: any) => {
        console.log('Erro ao tentar login:', err);
        this.errorMessage = 'Login não encontrado. Verifique suas credenciais.';
      }
    );
  }
}
