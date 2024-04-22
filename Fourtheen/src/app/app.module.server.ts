import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './login.service';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [AuthService]
})
export class AppServerModule {}
