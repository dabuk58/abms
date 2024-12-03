import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { EditUserDto, EditUserResponse, UserApiService } from '../../../api';
import { mapBookingDtosToBookings } from '../../features/user-dashboard/mappers/booking.mapper';
import { mapFavoriteAccommodations } from '../../features/user-dashboard/mappers/favorites.mapper';
import { removeEmptyParams } from '../../shared/tools/functions';
import { Booking } from '../interfaces/booking';
import { FavoriteAccommodation } from '../interfaces/favorite-accommodation';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser?: UserInfo;

  constructor(private userApiService: UserApiService) {}

  get activeUser(): UserInfo | undefined {
    return this.currentUser;
  }

  set activeUser(userInfo: UserInfo | undefined) {
    this.currentUser = userInfo;
  }

  updateUser$(params: EditUserDto): Observable<EditUserResponse> {
    return this.userApiService.update(removeEmptyParams(params));
  }

  getUserBookings$(): Observable<Booking[]> {
    return this.userApiService.bookings().pipe(
      map((response) => {
        if (!response.success) {
          throw new Error('Error occurred.');
        }
        return response.bookings
          ? mapBookingDtosToBookings(response.bookings)
          : [];
      }),
      catchError((error) => {
        console.error('Error fetching bookings:', error);
        return throwError(() => new Error('Failed to fetch bookings.'));
      })
    );
  }

  getUserFavorites$(): Observable<FavoriteAccommodation[]> {
    return this.userApiService.favorites().pipe(
      map((response) => {
        if (!response.success) {
          throw new Error('Error occurred.');
        }
        return response.accommodations
          ? mapFavoriteAccommodations(response.accommodations)
          : [];
      }),
      catchError((error) => {
        console.error('Error fetching favorite accommodations:', error);
        return throwError(
          () => new Error('Failed to fetch favorite accommodations.')
        );
      })
    );
  }
}
