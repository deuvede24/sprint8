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
}



