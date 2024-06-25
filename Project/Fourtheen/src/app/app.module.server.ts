import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './login.service';
import { CommonModule, DatePipe } from '@angular/common';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HttpClientModule,
    CommonModule
  ],
  bootstrap: [AppComponent],
  providers: [AuthService, DatePipe],
})
export class AppServerModule {}
