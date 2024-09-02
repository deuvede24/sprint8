import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Location {
  name: string;
  description: string;
  category: string;
  coordinates: [number, number]; // [longitud, latitud]
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  // Este es un ejemplo básico. En un escenario real, probablemente querrás obtener estos datos de una API o base de datos.
  private locations: Location[] = [
    {
      name: 'Tienda de Productos Gourmet',
      description: 'Productos de alta calidad para tus recetas.',
      category: 'Tienda',
      coordinates: [-74.5, 40]
    },
    {
      name: 'Restaurante Gourmet',
      description: 'Ofrecemos recetas de alta calidad.',
      category: 'Restaurante',
      coordinates: [-75.1, 40.2]
    }
  ];

  getLocations(): Observable<Location[]> {
    return of(this.locations);
  }
}
