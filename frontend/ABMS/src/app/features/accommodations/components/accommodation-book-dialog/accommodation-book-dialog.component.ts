import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { finalize, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AddBookingRequest } from '../../../../../api';
import { OverlayLoaderComponent } from '../../../../core/components/overlay-loader/overlay-loader.component';
import { LoaderEnum } from '../../../../core/enums/loader.enum';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { LoaderService } from '../../../../core/services/loader.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ControlErrorWrapperComponent } from '../../../../shared/components/control-error-wrapper/control-error-wrapper.component';
import {
  addOneDay,
  mapApiDate,
  mapDottedDateToDashedDate,
  mapFullDateToDashedDate,
  subtractOneDay,
} from '../../../../shared/tools/functions';
import {
  emailValidator,
  phoneNumberValidator,
} from '../../../../shared/tools/validators';
import { AccommodationsService } from '../../services/accommodations.service';

@Component({
  selector: 'app-accommodation-book-dialog',
  standalone: true,
  imports: [
    TranslatePipe,
    InputTextModule,
    CalendarModule,
    FloatLabelModule,
    InputNumberModule,
    ControlErrorWrapperComponent,
    StepperModule,
    AsyncPipe,
    OverlayLoaderComponent,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './accommodation-book-dialog.component.html',
  styleUrl: './accommodation-book-dialog.component.scss',
})
export class AccommodationBookDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  minDate: Date = new Date(
    new Date(new Date().setDate(new Date().getDate() + 1)).setHours(0, 0, 0, 0)
  );
  maxDate: Date = new Date(
    new Date().setFullYear(new Date().getFullYear() + 2)
  );
  config = inject(DynamicDialogConfig);
  accommodation: Accommodation = this.config.data.accommodation;
  unavailableCheckInDates: Date[] = this.accommodation.unavailableCheckInDates;
  unavailableCheckOutDates: Date[] =
    this.accommodation.unavailableCheckOutDates;
  minCheckOutDate: Date = new Date(
    new Date(this.minDate).setDate(this.minDate.getDate() + 1)
  );
  maxCheckOutDate: Date = this.maxDate;
  disabledCheckOutDates: Date[] = [];
  unavailableDates: Date[] = [];
  maxGuests: number = this.accommodation.maxGuests || 20;
  isLoading$!: Observable<boolean>;

  transformDate = mapApiDate;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    protected translation: TranslateService,
    private accommodationsService: AccommodationsService,
    private loaderService: LoaderService,
    private toastService: ToastService
  ) {
    this.form = this.fb.group({
      checkInDate: [null, Validators.required],
      checkOutDate: [null, Validators.required],
      guests: [
        null,
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      name: [null, Validators.required],
      email: [null, [Validators.required, emailValidator()]],
      phoneNumber: [null, [Validators.required, phoneNumberValidator()]],
    });
  }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.isActive(
      LoaderEnum.BOOKING_CONFIRMATION
    );

    this.unavailableDates = [
      ...this.unavailableCheckInDates,
      ...this.unavailableCheckOutDates,
    ];

    this.form.get('checkOutDate')?.disable();
  }

  onNext(nextCallback: EventEmitter<void>) {
    if (this.form.valid) {
      nextCallback.emit();
    } else {
      Object.keys(this.form.controls).forEach((controlName) => {
        const control = this.form.get(controlName);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
          control.updateValueAndValidity();
        }
      });
    }
  }

  getFormControlByName(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  onCheckInDateSelect(): void {
    const checkInDate = this.form.get('checkInDate')?.value;

    if (checkInDate) {
      this.updateCheckOutDateControl(checkInDate);
    } else {
      this.minCheckOutDate = this.minDate;
      this.disabledCheckOutDates = [];
    }
  }

  updateCheckOutDateControl(checkInDate: Date): void {
    this.form.get('checkOutDate')?.setValue(null);
    this.form.get('checkOutDate')?.enable();
    this.minCheckOutDate = addOneDay(checkInDate);

    this.maxCheckOutDate = this.maxDate;

    let currentDate = new Date(this.minCheckOutDate);

    while (currentDate <= this.maxDate) {
      if (this.isDateUnavailable(currentDate, this.unavailableCheckOutDates)) {
        this.maxCheckOutDate = subtractOneDay(currentDate);
        break;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  getDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);
    while (currentDate < endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  isDateUnavailable(date: Date, unavailableDates: Date[]): boolean {
    return unavailableDates.some((unavailableDate) =>
      this.isSameDate(unavailableDate, date)
    );
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  getTotalPrice(): number {
    const totalNights = this.calculateTotalNights();

    return totalNights * this.accommodation.pricePerNight;
  }

  calculateTotalNights(): number {
    const checkInDate = this.form.get('checkInDate')?.value;
    const checkOutDate = this.form.get('checkOutDate')?.value;

    const startUTC = Date.UTC(
      checkInDate.getFullYear(),
      checkInDate.getMonth(),
      checkInDate.getDate()
    );
    const endUTC = Date.UTC(
      checkOutDate.getFullYear(),
      checkOutDate.getMonth(),
      checkOutDate.getDate()
    );

    const differenceMS = endUTC - startUTC;

    const daysDifference = differenceMS / (1000 * 60 * 60 * 24);

    return daysDifference;
  }

  confirmBooking(): void {
    this.loaderService.setActive(LoaderEnum.BOOKING_CONFIRMATION);

    const params: AddBookingRequest = {
      checkInDate: mapFullDateToDashedDate(this.form.get('checkInDate')?.value),
      checkOutDate: mapFullDateToDashedDate(
        this.form.get('checkOutDate')?.value
      ),
      email: this.form.get('email')?.value,
      name: this.form.get('name')?.value,
      phoneNumber: this.form.get('phoneNumber')?.value,
      guests: this.form.get('guests')?.value,
    };

    this.accommodationsService
      .bookAccommodation$(this.accommodation.id, params)
      .pipe(
        takeUntil(this._destroying$),
        finalize(() =>
          this.loaderService.setInactive(LoaderEnum.BOOKING_CONFIRMATION)
        )
      )
      .subscribe((response) => {
        if (!response.success) {
          this.toastService.showError(
            this.translation.instant('error_occured'),
            this.translation.instant('try_again_later')
          );
        } else {
          this.processPayment();
        }
      });
  }

  processPayment(): void {
    //TODO payment process
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
