/*import { Injectable } from '@angular/core';
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
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { CreateLocationResponse } from '../interfaces/location.interface';  // Importa la interfaz

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    private apiUrl = 'http://localhost:3000/map'; // Asegúrate de que esta URL apunte a tu backend

    constructor(private http: HttpClient) { }

    // Obtener todas las ubicaciones
    getLocations(): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.apiUrl}/locations`);
    }

    // Obtener una ubicación específica por ID
    getLocation(id: number): Observable<Location> {
        return this.http.get<Location>(`${this.apiUrl}/locations/${id}`);
    }

    /* Geocodificar una ubicación (Buscar por nombre o dirección)
    geocodeLocation(query: string): Observable<any> {
       const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${this.mapboxToken}`;
       return this.http.get(url);
   }*/
    // Geocodificación de una ubicación
    geocodeLocation(query: string): Observable<any> {
        return this.getMapboxToken().pipe(
            switchMap(response => {
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${response.mapboxToken}`;
                return this.http.get(url);
            })
        );
    }

    // Obtener el token de Mapbox
    getMapboxToken(): Observable<{ mapboxToken: string }> {
        return this.http.get<{ mapboxToken: string }>(`${this.apiUrl}/token`);
    }

    // Crear una nueva ubicación
    /*createLocation(location: Location): Observable<Location> {
        return this.http.post<Location>(`${this.apiUrl}/locations`, location);
    }*/

    createLocation(location: Location): Observable<Location> {
        return this.http.post<CreateLocationResponse>(`${this.apiUrl}/locations`, location)
            .pipe(map(response => response.newLocation)); // Solo devolvemos newLocation
    }

    // Actualizar una ubicación existente
    updateLocation(id: number, location: Location): Observable<Location> {
        return this.http.put<Location>(`${this.apiUrl}/locations/${id}`, location);
    }

    // Eliminar una ubicación
    /* deleteLocation(id: number): Observable<void> {
         return this.http.delete<void>(`${this.apiUrl}/${id}`);
     }*/
    deleteLocation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/locations/${id}`);
    }
}

