import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);

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
    // TODO: Evualuar si el query está vacio
    this.isLoadingPlaces = true;
    this.httpClient
      .get<PlacesResponse>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=hn&proximity=-87.99141649757053%2C15.316555163132747&language=es&access_token=pk.eyJ1IjoiY21yaWNhcmRvIiwiYSI6ImNsaXoxcTAwcTBrNGQzdnIxcnVtc240MGcifQ._YEHS2_afr8yFX7B-J2b1Q`
      )
      .subscribe((res) => {
        console.log(res.features);
        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }
}
