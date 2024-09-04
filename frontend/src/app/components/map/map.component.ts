/*import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

}*/

/*import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true
})
export class MapComponent implements AfterViewInit {
  map!: mapboxgl.Map;

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor en el HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas iniciales [longitud, latitud]
      zoom: 9, // Nivel de zoom inicial
      accessToken: 'pk.eyJ1IjoiZGFuaXZpbGxhZGlheiIsImEiOiJjbTBrdmFzb2MxMW03MmpxdnRndG8yYm9qIn0.EGyf_G-KLYRy_iPLmo853w' // Tu token de acceso aquí
    });

    this.map.on('load', () => {
      // Aquí puedes cargar marcadores, capas u otros elementos después de que el mapa se haya cargado
      console.log('Map loaded!');
    });
  }
}*/

/*
FUNCIONA SIN DINAMISMO
import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  providers: [LocationService]
})
export class MapComponent implements AfterViewInit {
  map!: mapboxgl.Map;

  constructor(private locationService: LocationService) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.1734, 41.3851],
      zoom: 12,
      accessToken: 'pk.eyJ1IjoiZGFuaXZpbGxhZGlheiIsImEiOiJjbTBrdmFzb2MxMW03MmpxdnRndG8yYm9qIn0.EGyf_G-KLYRy_iPLmo853w'
    });

    this.map.on('load', () => {
      this.addMarkers();
    });
  }

  private addMarkers(): void {
    this.locationService.getLocations().subscribe(locations => {
      locations.forEach(location => {
        const marker = new mapboxgl.Marker()
          .setLngLat(location.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3><p>${location.description}</p>`))
          .addTo(this.map);
      });
    });
  }
}*/

/*FUNCIONA! 
import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  providers: [LocationService]
})
export class MapComponent implements AfterViewInit {
  map!: mapboxgl.Map;

  constructor(private locationService: LocationService, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.getMapboxTokenAndInitializeMap();
  }

  private getMapboxTokenAndInitializeMap(): void {
    this.http.get<{ mapboxToken: string }>('http://localhost:3000/map/token')
      .subscribe(response => {
        console.log('Token de Mapbox:', response.mapboxToken); 
        this.initializeMap(response.mapboxToken);
      });
  }

  private initializeMap(token: string): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.1734, 41.3851],
      zoom: 12,
      accessToken: token
    });

    this.map.on('load', () => {
      this.addMarkers();
    });
  }

  private addMarkers(): void {
    this.locationService.getLocations().subscribe(locations => {
      console.log('Ubicaciones recibidas:', locations); 
      locations.forEach(location => {
        const marker = new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3><p>${location.description}</p>`))
          .addTo(this.map);
      });
    });
  }
}*/

// map.component.ts
// map.component.ts
import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import { Location } from '../../interfaces/location.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  providers: [LocationService],
  imports: [LocationDetailComponent],
})
export class MapComponent implements AfterViewInit {
  map!: mapboxgl.Map;
  selectedLocation!: Location;

  constructor(private locationService: LocationService, private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.getMapboxTokenAndInitializeMap();
  }

  getMapboxTokenAndInitializeMap(): void {
    this.http.get<{ mapboxToken: string }>('http://localhost:3000/map/token').subscribe((response) => {
      this.initializeMap(response.mapboxToken);
    });
  }

  initializeMap(token: string): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.1734, 41.3851],
      zoom: 12,
      accessToken: token,
    });

    this.map.on('load', () => {
      this.addMarkers(); // Cargar las ubicaciones existentes
    });

    this.map.on('click', (event) => {
      this.addNewLocation(event.lngLat); // Agregar nueva ubicación al hacer click
    });
  }

  addMarkers(): void {
    this.locationService.getLocations().subscribe(locations => {
      locations.forEach(location => {
        this.addMarkerToMap(location);
      });
    });
  }

 /* addMarkerToMap(location: Location): void {
    // Verificamos si las coordenadas son válidas antes de agregar el marcador
    if (!location.latitude || !location.longitude || isNaN(location.latitude) || isNaN(location.longitude)) {
      console.error('Coordenadas inválidas recibidas en addMarkerToMap:', location.latitude, location.longitude);
      return;
    }
    console.log('Coordenadas recibidas correctamente en addMarkerToMap:', location.latitude, location.longitude);

    // Crear y agregar el marcador al mapa
    const marker = new mapboxgl.Marker()
      .setLngLat([location.longitude, location.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`
          <h3>${location.name}</h3>
          <p>${location.description}</p>
          <p>Doble clic para más detalles</p>
        `))
      .addTo(this.map);

    // Añadir evento para mostrar los detalles al hacer doble clic
    marker.getElement().addEventListener('dblclick', (e) => {
      e.stopPropagation();
      this.showLocationDetails(location);
    });
  }*/

    addMarkerToMap(location: Location): void {
      new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h3>${location.name}</h3>
          <p>${location.description}</p>
        `))
        .addTo(this.map);
    }

  
  addNewLocation(lngLat: mapboxgl.LngLat): void {
    const name = prompt('Introduce un nombre para la nueva ubicación:');
    const description = prompt('Introduce una descripción para la nueva ubicación:');

    if (name && description) {
      const newLocation: Location = {
        name: name,
        description: description,
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      };

      this.locationService.createLocation(newLocation).subscribe({
        next: (createdLocation) => {
          console.log('Ubicación creada correctamente en el backend:', createdLocation);

          this.addMarkerToMap(createdLocation);
        },
        error: (error) => {
          console.error('Error al crear la ubicación:', error);
        }
      });
    }
  }
  

  showLocationDetails(location: Location): void {
    this.selectedLocation = location;
    this.openDetailPanel();
  }

  openDetailPanel(): void {
    const panel = document.querySelector('.location-detail-panel');
    if (panel) {
      panel.classList.add('visible');
    } else {
      console.error('Panel de detalles no encontrado');
    }
  }
}
