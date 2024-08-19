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
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Asegúrate de que la ruta al servicio de autenticación sea correcta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // Corregido de "styleUrl" a "styleUrls"
})
/*export class HomeComponent {
  constructor(private authService: AuthService) {}*/
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
}

