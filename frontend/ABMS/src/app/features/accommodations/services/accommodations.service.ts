import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AccommodationDto,
  AccommodationsApiService,
  AccommodationsParams,
} from '../../../../api';
import { removeEmptyParams } from '../../../shared/tools/functions';

@Injectable({
  providedIn: 'root',
})
export class AccommodationsService {
  constructor(private accommodationsApiService: AccommodationsApiService) {}

  getAccommodations$(
    params: AccommodationsParams
  ): Observable<AccommodationDto[]> {
    return this.accommodationsApiService.accommodations(
      removeEmptyParams(params)
    );
  }
}
