import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { filter, finalize, Observable, Subject, takeUntil, tap } from 'rxjs';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { AccommodationsResponse } from '../../../../core/interfaces/accommodations-response';
import { AccommodationsService } from '../../services/accommodations.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-search-results',
  standalone: true,
  imports: [AsyncPipe, LoaderComponent],
  providers: [DialogService],
  templateUrl: './map-search-results.component.html',
  styleUrl: './map-search-results.component.scss',
})
export class MapSearchResultsComponent implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private mapLayer!: L.TileLayer;
  location!: L.LatLng;
  config = inject(DynamicDialogConfig);
  isLoading = true;

  accommodationsResponse$!: Observable<AccommodationsResponse>;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    public dialogService: DialogService,
    private accommodationsService: AccommodationsService,
    private translation: TranslateService,
    private mapService: MapService,
    public dialogRef: DynamicDialogRef,
    private router: Router
  ) {}

  async ngAfterViewInit(): Promise<void> {
    await this.mapService.ensureMarkerClusterLoaded();
    this.initMap();
    this.listenToNavigationChanges();
  }

  initMap(): void {
    this.map = L.map('map');
    this.map.setView([51.45, 19.27], 6);
    this.mapLayer = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 6,
      }
    ).addTo(this.map);

    this.map.whenReady(() => this.fetchAccommodations());
  }

  fetchAccommodations(): void {
    this.accommodationsResponse$ = this.accommodationsService
      .getAccommodations$(this.config.data.searchParams)
      .pipe(
        tap(
          (data) =>
            (this.config.header = `${this.translation.instant(
              'found_accommodations'
            )}: ${data.totalRecords}`)
        ),
        tap((data) => {
          this.mapService.createMarkers(data.accommodations).addTo(this.map);
        }),
        finalize(() => (this.isLoading = false))
      );
  }

  listenToNavigationChanges(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  ngOnDestroy(): void {
    this.map.removeLayer(this.mapLayer);
    this.map.off();
    this.map.remove();
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
