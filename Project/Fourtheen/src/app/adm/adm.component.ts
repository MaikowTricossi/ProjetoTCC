import { Component, OnInit } from '@angular/core';
import { AdmService } from '../service/adm.service';
import { CadastroModel } from '../models/CadastroModel';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css'],
})
export class AdmComponent implements OnInit {
  searchEmail: string = '';
  foundUser: CadastroModel | null = null;
  selectedUser: CadastroModel | null = null;
  successMessage: string | null = null;

  constructor(private admService: AdmService) {}

  ngOnInit(): void {}

  searchUser(): void {
    this.admService.getUserByEmail(this.searchEmail).subscribe(
      (user) => {
        this.foundUser = user;
        this.successMessage = null;
      },
      (error) => {
        this.foundUser = null;
        this.successMessage = 'Usuário não encontrado.';
        console.error('Erro ao buscar o usuário', error);
      }
    );
  }

  editUser(user: CadastroModel): void {
    this.selectedUser = { ...user };
  }

  cancelEdit(): void {
    this.selectedUser = null;
    this.successMessage = null;
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.admService.updateUser(this.selectedUser).subscribe(
        (response) => {
          this.successMessage = 'Usuário atualizado com sucesso.';
          //this.foundUser = { ...this.selectedUser };
          this.selectedUser = null;
        },
        (error) => {
          this.successMessage = 'Erro ao atualizar o usuário.';
          console.error('Erro ao atualizar o usuário', error);
        }
      );
    }
  }

  deleteUser(email: string): void {
    this.admService.deleteUser(email).subscribe(
      (response) => {
        this.successMessage = 'Usuário excluído com sucesso.';
        this.foundUser = null;
      },
      (error) => {
        this.successMessage = 'Erro ao excluir o usuário.';
        console.error('Erro ao excluir o usuário', error);
      }
    );
  }
}
