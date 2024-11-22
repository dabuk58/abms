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
  constructor(private accommodationsApiService: AccommodationsApiService) {}

  getAccommodations$(params: AccommodationsParams): Observable<Accommodation[]> {
    return this.accommodationsApiService
      .accommodations(removeEmptyParams(params))
      .pipe(map((accommodations) => mapAccommodations(accommodations)));
  }
}
