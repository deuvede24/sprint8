/*import { Component } from '@angular/core';

@Component({
  selector: 'app-list-locations',
  standalone: true,
  imports: [],
  templateUrl: './list-locations.component.html',
  styleUrl: './list-locations.component.scss'
})
export class ListLocationsComponent {

}*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { Location } from '../../interfaces/location.interface';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list-locations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.scss'],
  providers: [LocationService]
})
export class ListLocationsComponent implements OnInit {
  locations: Location[] = [];

  constructor(private locationService: LocationService) { }
  // Función trackBy para optimizar la iteración de ubicaciones
  trackByLocationId(index: number, location: Location): number | null {
    return location.id ? location.id : null;
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  /*loadLocations(): void {
    this.locationService.getLocations().subscribe(
      (data) => {
        this.locations =[...data];
      },
      (error) => {
        console.error('Error loading locations', error);
      }
    );
  }*/

   /* loadLocations(): void {
      console.log('Llamada a loadLocations');
      this.locationService.getLocations().pipe(
        tap(data => {
          console.log('Datos recibidos del backend:', data);
          this.locations = [...data];  // Reemplazar completamente el array
        }),
        catchError(error => {
          console.error('Error loading locations', error);
          return of([]);  // Devolver un array vacío en caso de error
        })
      ).subscribe();
    }*/

    isLoading = false;

loadLocations(): void {
  if (!this.isLoading) {
    this.isLoading = true;
    this.locationService.getLocations().pipe(
      tap(data => {
        this.locations = [...data];
        this.isLoading = false; // Terminar estado de carga
      }),
      catchError(error => {
        console.error('Error loading locations', error);
        this.isLoading = false;  // Manejar errores
        return of([]);
      })
    ).subscribe();
  }
}

    

  deleteLocation(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
      this.locationService.deleteLocation(id).subscribe(() => {
        this.loadLocations();
      });
    }
  }
}

