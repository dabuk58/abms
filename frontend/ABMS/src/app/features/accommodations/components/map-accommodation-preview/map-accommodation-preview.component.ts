import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import * as L from 'leaflet';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-accommodation-preview',
  standalone: true,
  imports: [],
  templateUrl: './map-accommodation-preview.component.html',
  styleUrl: './map-accommodation-preview.component.scss',
})
export class MapAccommodationPreviewComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private map!: L.Map;
  private mapLayer!: L.TileLayer;
  config = inject(DynamicDialogConfig);
  lat!: number;
  lon!: number;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.lat = this.config.data.lat;
    this.lon = this.config.data.lon;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map');
    this.map.setView([this.lat, this.lon], 15);
    this.mapLayer = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 6,
      }
    ).addTo(this.map);

    this.map.whenReady(() => this.setMarker());
  }

  setMarker(): void {
    const marker = this.mapService.createPreviewMarker(this.lat, this.lon);
    marker.addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map.removeLayer(this.mapLayer);
    this.map.off();
    this.map.remove();
  }
}
