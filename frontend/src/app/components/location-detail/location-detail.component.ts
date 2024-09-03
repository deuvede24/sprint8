/*import { Component } from '@angular/core';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.scss'
})
export class LocationDetailComponent {

}*/
import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '../../interfaces/location.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-location-detail',
    templateUrl: './location-detail.component.html',
    styleUrls: ['./location-detail.component.scss'],
    standalone: true,
    providers: [LocationService],
})
export class LocationDetailComponent implements OnInit {
    @Input() location!: Location;
    searchResults: Location[] = [];
    form: FormGroup;

    constructor(
        private locationService: LocationService,
        public router: Router,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            searchQuery: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        // Inicializa cualquier lógica adicional aquí si es necesario
    }

    searchLocation(): void {
        const query = this.form.get('searchQuery')?.value;
        console.log('Buscando:', query); 
        if (query) {
            this.locationService.geocodeLocation(query).subscribe((response) => {
                this.searchResults = response.features.map((feature: any) => ({
                    name: feature.place_name,
                    latitude: feature.center[1],
                    longitude: feature.center[0],
                }));
            });
        }
    }

    selectSearchResult(result: Location): void {
        this.location = result;
        this.searchResults = []; // Limpiar resultados después de seleccionar
    }

    editLocation(): void {
        if (this.location?.id != null) {
            this.router.navigate(['/locations/edit', this.location.id]);
        } else {
            console.error('No se puede editar: la ubicación no tiene un ID.');
        }
    }

    deleteLocation(): void {
        if (this.location?.id != null && confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
            this.locationService.deleteLocation(this.location.id).subscribe(() => {
                alert('Ubicación eliminada con éxito');
                this.router.navigate(['/locations']); // O recargar el mapa
            });
        } else {
            console.error('No se puede eliminar: la ubicación no tiene un ID.');
        }
    }
}
