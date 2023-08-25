import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private placesApi = inject(PlacesApiClient);

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return Boolean(this.userLocation);
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          res(this.userLocation);
        },
        (err) => {
          alert('No se pudo conseguir tu geolocalización');
          console.log(err);
          rej();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (!this.userLocation) throw Error('No hay userLocation!');
    // TODO: Evualuar si el query está vacio
    this.isLoadingPlaces = true;
    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation.join(','),
        },
      })
      .subscribe((res) => {
        console.log(res.features);
        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }
}
