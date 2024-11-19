import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { AccommodationsApiService } from '../../../../api';
import { Accommodation } from '../../../core/interfaces/accommodation';
import { mapAccommodationsProposal } from '../mappers/accommodations-mapper';

@Injectable({
  providedIn: 'root',
})
export class ProposalsService {
  constructor(private accommodationApiService: AccommodationsApiService) {}

  getAccommodationProposals$(): Observable<Accommodation[]> {
    return this.accommodationApiService.accommodations().pipe(
      // delay(4000),
      map((accommodations) => mapAccommodationsProposal(accommodations))
    );
  }
}
