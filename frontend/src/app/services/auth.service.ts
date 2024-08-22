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

/*
FUNCIONA OK
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
   //const user = JSON.parse(localStorage.getItem('user') || '{}');
    //return user.role || null; // Asegurarse de que la clave sea 'role'
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
  
}*/

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
  currentUser: User | null = null;

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/register`, user);
  }

  login(user: Login): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/login`, user, { withCredentials: true }).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUser = response.user; // Establecemos el usuario actual
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    if (this.currentUser) {
      return this.currentUser.role || null;
    } else {
      const userString = localStorage.getItem('user');
      if (!userString || userString === 'undefined') {
        return null;
      }
      try {
        const user = JSON.parse(userString);
        this.currentUser = user; // Cargamos el usuario desde localStorage si no está cargado aún
        return user.role || null;
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        return null;
      }
    }
  }


  getFullName(): string {
    if (this.currentUser) {
      const name = this.currentUser.name || 'Invitado';
      const surname = this.currentUser.surname || '';
      return `${name} ${surname}`.trim();
    }
    return 'Invitado';
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser = null; // Reseteamos el usuario actual
  }
  setGuestRole(): void {
    const guestUser: User = {
      id_user: 0, // un valor ficticio para el id
      email: 'guest@example.com', // email ficticio
      role: 'guest',
      name: 'Guest',
      surname: 'User'
    };
    this.currentUser = guestUser;
    localStorage.setItem('user', JSON.stringify(guestUser));
  }
}
