import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css'],
})
export class MapScreenComponent {
  private placesServices = inject(PlacesService);

  get isUserLocationReady() {
    return this.placesServices.isUserLocationReady;
  }
}
