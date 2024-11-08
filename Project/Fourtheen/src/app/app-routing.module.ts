import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuralComponent } from './mural/mural.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ImageComponent } from './image/image.component';
import { AdmComponent } from './adm/adm.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'mural', component: MuralComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'image', component: ImageComponent},
  { path: 'adm', component: AdmComponent},
  { path: 'perfil', component: PerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
