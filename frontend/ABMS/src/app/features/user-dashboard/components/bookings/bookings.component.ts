import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { catchError, delay, Observable, of } from 'rxjs';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { BookingStatus } from '../../../../core/enums/booking-status.enum';
import { Booking } from '../../../../core/interfaces/booking';
import { ToastService } from '../../../../core/services/toast.service';
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

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
    private translation: TranslateService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.bookings$ = this.userService.getUserBookings$().pipe(
      delay(1000),
      catchError(() => {
        this.toastService.showError(
          this.translation.instant('error_occured'),
          this.translation.instant('error_occured_try_again_later')
        );
        return of();
      })
    );
  }

  onCancel(bookingId: number): void {
    this.confirmationService.confirm({
      header: this.translation.instant('confirmation_required'),
      message: this.translation.instant('cancel_booking_confirmation'),
      accept: () => this.cancelBooking(bookingId),
      reject: () => {},
      acceptLabel: this.translation.instant('yes'),
      rejectLabel: this.translation.instant('no'),
    });
  }

  cancelBooking(bookingId: number): void {
    this.userService
      .cancelBooking$(bookingId)
      .pipe(
        catchError(() => {
          this.toastService.showError(
            this.translation.instant('error_occured'),
            this.translation.instant('error_occured_try_again_later')
          );
          return of();
        })
      )
      .subscribe(() => {
        this.bookings$ = this.userService.getUserBookings$();

        this.toastService.showSuccess(
          this.translation.instant('success'),
          this.translation.instant('booking_cancelled_successfully')
        );
      });
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
