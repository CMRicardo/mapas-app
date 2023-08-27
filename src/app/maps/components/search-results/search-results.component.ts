import { Component, inject } from '@angular/core';
import { MapsService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  private placesService = inject(PlacesService);
  private mapsService = inject(MapsService);

  public selectedId: string = '';

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapsService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {
    if (!this.placesService.userLocation) throw Error('No hay userLocation!');

    const start = this.placesService.userLocation;
    const end = place.center as [number, number];
    this.mapsService.getRouteBetweenPoints(start, end);
  }
}
