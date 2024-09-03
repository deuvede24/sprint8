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

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.getLocations().subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error loading locations', error);
      }
    );
  }

  deleteLocation(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
      this.locationService.deleteLocation(id).subscribe(() => {
        this.loadLocations();
      });
    }
  }
}

