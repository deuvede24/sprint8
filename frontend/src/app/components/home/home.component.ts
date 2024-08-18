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
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Asegúrate de que la ruta al servicio de autenticación sea correcta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // Corregido de "styleUrl" a "styleUrls"
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  getUserRole(): string | null {
    return this.authService.getUserRole();
  }

  setGuestRole(): void {
    this.authService.setGuestRole();
  }
}

