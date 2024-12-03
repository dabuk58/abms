import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { catchError, delay, Observable, of } from 'rxjs';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { BookingStatus } from '../../../../core/enums/booking-status.enum';
import { Booking } from '../../../../core/interfaces/booking';
import { UserService } from '../../../../core/services/user.service';
import { BookingStatusBadgeComponent } from '../booking-status-badge/booking-status-badge.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    AsyncPipe,
    LoaderComponent,
    PanelModule,
    ButtonModule,
    TranslatePipe,
    BookingStatusBadgeComponent,
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent implements OnInit {
  bookings$!: Observable<Booking[]>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.bookings$ = this.userService.getUserBookings$().pipe(
      delay(1000),
      catchError(() => {
        return of();
      })
    );
  }

  onCancel(bookingId: number): void {
    //TODO cancel booking
  }

  onAccommodationDetails(accommodationId: number): void {
    this.router.navigate([ROUTES.ACCOMMODATIONS, accommodationId]);
  }

  canCancelBooking(status: BookingStatus): boolean {
    return (
      status === BookingStatus.AwaitingPayment ||
      status === BookingStatus.Confirmed
    );
  }
}
