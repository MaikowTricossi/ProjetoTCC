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
import { HttpClient, HttpClientModule, HttpHandler, HttpBackend, HttpRequest, HttpXhrBackend } from '@angular/common/http';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HttpBackend, useClass: HttpXhrBackend }, 
    { provide: HttpClient, useFactory: httpClientFactory, deps: [HttpBackend] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
