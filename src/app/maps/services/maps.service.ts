import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  private map?: Map;

  get isMapReady() {
    return Boolean(this.map);
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw new Error('El mapa no está listo!');

    this.map?.flyTo({
      center: coords,
      zoom: 14,
    });
  }
}
