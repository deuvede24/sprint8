/*import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, Login, AuthResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private httpClient = inject(HttpClient);

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/register`, user);
  }

  login(user: Login): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.roles || null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
*/

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, Login, AuthResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private httpClient = inject(HttpClient);

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/register`, user);
  }

  login(user: Login): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/login`, user).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
   /* const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || null; // Asegurarse de que la clave sea 'role'*/
    const userString = localStorage.getItem('user');
  
    if (!userString|| userString === 'undefined'){
      return null;
    }
    try {
      const user = JSON.parse(userString);
      return user.role || null;
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  setGuestRole(): void {
    const guestUser = {
      role: 'guest',
    };
    localStorage.setItem('user', JSON.stringify(guestUser));
  }
  
}


