import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const isLoggedIn = this.authService.isLoggedIn();
        const userRole = this.authService.getUserRole();
        const requiredRole = route.data['role'] as string;
        
        console.log(`isLoggedIn: ${isLoggedIn}, userRole: ${userRole}, requiredRole: ${requiredRole}`);

        if (isLoggedIn && (!requiredRole || requiredRole === userRole)) {
            console.log('AuthGuard: Access granted');
            return true;
        } /*else {
            console.log('AuthGuard: Access denied, redirecting to login');
            this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
            return false;
        }*/
            else {
                if (!isLoggedIn) {
                  this.notificationService.showError('Debe iniciar sesión para acceder a esta página.');
                } else {
                  this.notificationService.showError('No tienes permisos para realizar esta acción.');
                }
                this.router.navigate(['/']);
                return false;
              }
    }
}

