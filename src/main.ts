import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken =
  'pk.eyJ1IjoiY21yaWNhcmRvIiwiYSI6ImNsaXoxcTAwcTBrNGQzdnIxcnVtc240MGcifQ._YEHS2_afr8yFX7B-J2b1Q';

if (!navigator.geolocation) {
  alert('Tu navegador no soporta la geolocalization');
  throw new Error('Tu navegador no soporta la geolocalization');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
