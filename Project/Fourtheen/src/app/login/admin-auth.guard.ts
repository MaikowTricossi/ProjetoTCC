import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../AuthService'; // Importe o serviço AuthService

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true; // Permitir o acesso se o usuário estiver autenticado e for um administrador
    }

    // Redirecionar para a página de login se não estiver autenticado ou não for um administrador
    this.router.navigate(['/login']);
    return false;
  }
}
