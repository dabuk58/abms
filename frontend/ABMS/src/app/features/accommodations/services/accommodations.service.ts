import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, Subject, throwError } from 'rxjs';
import {
  AccommodationsApiService,
  AccommodationsParams,
  AddBookingRequest,
  AddBookingResponse,
  AddFavoriteResponse,
  UserApiService,
} from '../../../../api';
import { AccommodationsResponse } from '../../../core/interfaces/accommodations-response';
import { removeEmptyParams } from '../../../shared/tools/functions';
import {
  mapAccommodation,
  mapAccommodations,
} from '../../home/mappers/accommodations-mapper';
import { Accommodation } from '../../../core/interfaces/accommodation';

@Injectable({
  providedIn: 'root',
})
export class AccommodationsService {
  private readonly _updateFilters$ = new Subject<void>();

  constructor(
    private accommodationsApiService: AccommodationsApiService,
    private userApiService: UserApiService
  ) {}

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

  addRemoveFavorite$(accommodationId: number): Observable<AddFavoriteResponse> {
    return this.userApiService.updateFavorites(accommodationId);
  }

  getAccommodation$(id: number): Observable<Accommodation> {
    return this.accommodationsApiService.accommodation(id).pipe(
      catchError((error) => {
        console.error('Error fetching accommodation:', error);
        return throwError(() => new Error('Failed to fetch accommodation'));
      }),
      map((response) => {
        if (!response.accommodation) {
          throw new Error();
        }
        return mapAccommodation(response.accommodation);
      })
    );
  }

  bookAccommodation$(
    accommodationId: number,
    params: AddBookingRequest
  ): Observable<AddBookingResponse> {
    return this.accommodationsApiService.addBooking(
      accommodationId,
      removeEmptyParams(params)
    );
  }
}
