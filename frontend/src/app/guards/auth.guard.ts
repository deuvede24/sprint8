import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const isLoggedIn = this.authService.isLoggedIn();
        const userRole = this.authService.getUserRole();
        const requiredRole = route.data['role'] as string;

        if (isLoggedIn && (!requiredRole || requiredRole === userRole)) {
            console.log('AuthGuard: Access granted');
            return true;
        } else {
            console.log('AuthGuard: Access denied, redirecting to login');
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}

