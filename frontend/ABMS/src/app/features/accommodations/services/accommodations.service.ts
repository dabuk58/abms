import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AccommodationsApiService,
  AccommodationsParams,
} from '../../../../api';
import { Accommodation } from '../../../core/interfaces/accommodation';
import { removeEmptyParams } from '../../../shared/tools/functions';
import { mapAccommodations } from '../../home/mappers/accommodations-mapper';

@Injectable({
  providedIn: 'root',
})
export class AccommodationsService {
  private _accommodations$ = new Observable<Accommodation[]>();

  constructor(private accommodationsApiService: AccommodationsApiService) {}

  get accommodations$(): Observable<Accommodation[]> {
    return this._accommodations$;
  }

  searchAccommodations(params: AccommodationsParams): void {
    this._accommodations$ = this.accommodationsApiService
      .accommodations(removeEmptyParams(params))
      .pipe(map((accommodations) => mapAccommodations(accommodations)));
  }
}
