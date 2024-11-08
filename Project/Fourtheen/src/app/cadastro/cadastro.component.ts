import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CadastroService, UsuarioCadastro } from '../service/cadastro.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  cadastroSucesso: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private datePipe: DatePipe
  ) {
    this.criarForm();
  }

  ngOnInit() {}

  criarForm() {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      apelido: ['', Validators.required],
      dataDeNascimento: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      senha: ['', Validators.required], 
    });
  }

  cadastroSubmit() {
    if (this.cadastroForm.valid) {
      const dataParts = this.cadastroForm.value.dataDeNascimento.split('/');
      const dataDeNascimento = new Date(
        +dataParts[2],
        dataParts[1] - 1,
        +dataParts[0]
      );
      const formattedDate = this.datePipe.transform(
        dataDeNascimento,
        'dd/MM/yyyy'
      );

      const usuario: UsuarioCadastro = {
        nome: this.cadastroForm.value.nome,
        apelido: this.cadastroForm.value.apelido,
        dataDeNascimento: formattedDate!, 
        email: this.cadastroForm.value.email,
        senha: this.cadastroForm.value.senha,
      };

      //console.log('Dados do usuário antes do envio:', usuario);

      this.cadastroService.cadastrar(usuario).subscribe(
        (response) => {
          console.log('Cadastro bem-sucedido:', response);
          this.cadastroSucesso = true;
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
