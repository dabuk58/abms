import { Injectable } from '@angular/core';
import { delay, map, Observable, Subject } from 'rxjs';
import {
  AccommodationsApiService,
  AccommodationsParams,
} from '../../../../api';
import { AccommodationsResponse } from '../../../core/interfaces/accommodations-response';
import { removeEmptyParams } from '../../../shared/tools/functions';
import { mapAccommodations } from '../../home/mappers/accommodations-mapper';

@Injectable({
  providedIn: 'root',
})
export class AccommodationsService {
  private readonly _updateFilters$ = new Subject<void>();

  constructor(private accommodationsApiService: AccommodationsApiService) {}

  get updateFiltersEvent$(): Observable<void> {
    return this._updateFilters$;
  }

  updateFilters(): void {
    this._updateFilters$.next();
  }

  getAccommodations$(
    params: AccommodationsParams
  ): Observable<AccommodationsResponse> {
    return this.accommodationsApiService
      .accommodations(removeEmptyParams(params))
      .pipe(
        delay(1500),
        map((response) => mapAccommodations(response))
      );
  }
}
