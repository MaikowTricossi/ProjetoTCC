import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CadastroService, UsuarioCadastro } from '../cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService 
  ) {
    this.criarForm();
  }

  ngOnInit() {}

  criarForm() {
    this.cadastroForm = this.fb.group({
      apelido: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      senha: ['', Validators.required], 
    });
  }

  cadastroSubmit() {
    if (this.cadastroForm.valid) {
      const usuario: UsuarioCadastro = {
        apelido: this.cadastroForm.value.apelido,
        email: this.cadastroForm.value.email,
        senha: this.cadastroForm.value.senha,
      };

      this.cadastroService.cadastrar(usuario).subscribe(
        (response) => {
          console.log('Cadastro bem-sucedido:', response);
        },
        (error) => {
          console.error('Erro no cadastro:', error);
        }
      );
    } else {
      console.error('Formulário inválido');
    }
  }
}
