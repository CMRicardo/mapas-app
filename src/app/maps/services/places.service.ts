import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api';
import { MapsService } from './maps.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private placesApi = inject(PlacesApiClient);
  private mapsService = inject(MapsService);

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
          rej();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if (!this.userLocation) throw Error('No hay userLocation!');

    this.isLoadingPlaces = true;
    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation.join(','),
        },
      })
      .subscribe((res) => {
        this.isLoadingPlaces = false;
        this.places = res.features;

        this.mapsService.createMarkersFromPlaces(
          this.places,
          this.userLocation!
        );
      });
  }

  deletePlaces() {
    this.places = [];
  }
}
