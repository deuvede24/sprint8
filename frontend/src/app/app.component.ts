/*import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}*/


/*
FUNCIONA HASTA ANTES DE AÑADIR MAPA!
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationService } from './services/notification.service';


declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  errorMessage: string = '';

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
      this.showErrorModal();
    });
  }

  showErrorModal() {
    const modalElement = document.getElementById('errorModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}*/

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  errorMessage: string = '';

  constructor(
    private notificationService: NotificationService,
    public authService: AuthService // Inyectamos el AuthService
  ) {}

  ngOnInit() {
    this.notificationService.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
      this.showErrorModal();
    });
  }

  showErrorModal() {
    const modalElement = document.getElementById('errorModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}


