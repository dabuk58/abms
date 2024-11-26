import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Accommodation } from '../../../core/interfaces/accommodation';
import { MapSearchResultsPopupComponent } from '../components/map-search-results-popup/map-search-results-popup.component';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private markerId: number = 0;

  constructor() {}

  createMarkers(accommodations: Accommodation[]): L.MarkerClusterGroup {
    this.markerId = 0;

    const markerGroup: L.MarkerClusterGroup = L.markerClusterGroup();

    accommodations.forEach((accommodation) => {
      const marker = this.createMarker(accommodation, this.createMarkerIcon());

      markerGroup.addLayer(marker);
    });

    return markerGroup;
  }

  private createMarker(accommodation: Accommodation, icon: L.Icon): L.Marker {
    const markerId = this.markerId;
    const coords = L.latLng(accommodation.latitude, accommodation.longitude);
    const marker = L.marker(coords).setIcon(icon);

    marker.bindPopup(() => {
      const popupEl: NgElement & WithProperties<MapSearchResultsPopupComponent> =
        document.createElement('app-map-popup') as any;

      popupEl.accommodation = accommodation;
      popupEl.markerId = markerId.toString();

      return popupEl;
    });

    this.markerId++;
    return marker;
  }

  private createMarkerIcon(): L.Icon {
    return L.icon({
      iconUrl: `assets/markers/marker-grey-dark.png`,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38],
    });
  }
}
