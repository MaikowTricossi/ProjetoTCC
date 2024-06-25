import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MuralComponent } from './mural/mural.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ImageComponent } from './image/image.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHandler, HttpBackend, HttpXhrBackend } from '@angular/common/http';
import { AdmComponent } from './adm/adm.component';

import { DatePipe } from '@angular/common';

import { CadastroService } from './cadastro.service';

export function httpClientFactory(handler: HttpHandler) {
  return new HttpClient(handler);
}

@NgModule({
  declarations: [
    AppComponent,
    MuralComponent,
    NavComponent,
    LoginComponent,
    PerfilComponent,
    CadastroComponent,
    ImageComponent,
    FooterComponent,
    AdmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe, CadastroService,
    { provide: HttpBackend, useClass: HttpXhrBackend }, 
    { provide: HttpClient, useFactory: httpClientFactory, deps: [HttpBackend] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
