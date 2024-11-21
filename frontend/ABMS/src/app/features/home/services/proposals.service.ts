import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccommodationsApiService } from '../../../../api';
import { Accommodation } from '../../../core/interfaces/accommodation';
import { mapAccommodations } from '../mappers/accommodations-mapper';

@Injectable({
  providedIn: 'root',
})
export class ProposalsService {
  constructor(private accommodationApiService: AccommodationsApiService) {}

  getAccommodationProposals$(): Observable<Accommodation[]> {
    return this.accommodationApiService
      .accommodations()
      .pipe(map((accommodations) => mapAccommodations(accommodations)));
  }
}
