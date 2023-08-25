import { Component, inject } from '@angular/core';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css'],
})
export class BtnMyLocationComponent {
  private mapsService = inject(MapsService);
  private placesService = inject(PlacesService);

  goToMyLocation() {
    if (!this.placesService.userLocation)
      throw Error('La ubicación del usuario no está lista!');
    if (!this.mapsService.isMapReady)
      throw Error('No hay ningún mapa disponible!');

    this.mapsService.flyTo(this.placesService.userLocation);
  }
}
