/*import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}*/
/*
FUNCIONA OK
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Asegúrate de que la ruta al servicio de autenticación sea correcta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // Corregido de "styleUrl" a "styleUrls"
})
//export class HomeComponent {
  //constructor(private authService: AuthService) {}
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // Aquí puedes agregar cualquier lógica que necesites ejecutar cuando el componente se inicializa.
    // Si no necesitas ninguna lógica específica, puedes dejar este método vacío.
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  getUserRole(): string | null {
    return this.authService.getUserRole();
  }

  setGuestRole(): void {
    this.authService.setGuestRole();
  }

  getUserName(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.name || null; // Cambia 'name' si el campo en el objeto usuario tiene otro nombre
  }

  logout(): void {
    this.authService.logout();
  }
}*/

/*FUNCIONABA RECETAS
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta al servicio de autenticación es correcta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Inicializar el currentUser si aún no lo está
    if (!this.authService.currentUser && this.authService.isLoggedIn()) {
      this.authService.getUserRole(); // Esto también establece el currentUser
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserRole(): string | null {
    return this.authService.getUserRole();
  }

  setGuestRole(): void {
    this.authService.setGuestRole();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload(); // Recargar la página para restablecer el estado
  }
}*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta al servicio de autenticación es correcta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // Inicializar el currentUser si aún no lo está
    if (!this.authService.currentUser && this.authService.isLoggedIn()) {
      this.authService.getUserRole(); // Esto también establece el currentUser
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getFullName(): string {
    if (this.authService.currentUser) {
      const name = this.authService.currentUser.name || 'Invitado';
      const surname = this.authService.currentUser.surname || '';
      return `${name} ${surname}`.trim();
    }
    return 'Invitado';
  }


  getUserRole(): string | null {
    return this.authService.getUserRole();
  }

  setGuestRole(): void {
    this.authService.setGuestRole();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload(); // Recargar la página para restablecer el estado
  }
}



