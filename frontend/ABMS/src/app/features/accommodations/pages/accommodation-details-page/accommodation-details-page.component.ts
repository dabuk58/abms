import { AsyncPipe } from '@angular/common';
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { Amenity } from '../../../../core/enums/amenity.enum';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { AuthService } from '../../../../core/services/auth.service';
import { ConstantsService } from '../../../../core/services/constants.service';
import { ToastService } from '../../../../core/services/toast.service';
import { fillString, mapApiDate } from '../../../../shared/tools/functions';
import { AccommodationBookDialogComponent } from '../../components/accommodation-book-dialog/accommodation-book-dialog.component';
import { HeartIconComponent } from '../../components/heart-icon/heart-icon.component';
import { MapAccommodationPreviewComponent } from '../../components/map-accommodation-preview/map-accommodation-preview.component';
import { AccommodationsService } from '../../services/accommodations.service';

@Component({
  selector: 'app-accommodation-details-page',
  standalone: true,
  imports: [
    TranslatePipe,
    AsyncPipe,
    CardModule,
    HeartIconComponent,
    LoaderComponent,
    CalendarModule,
    TooltipModule,
    ButtonModule,
    GalleriaModule,
    DividerModule,
    ChipModule,
  ],
  providers: [DialogService],
  templateUrl: './accommodation-details-page.component.html',
  styleUrl: './accommodation-details-page.component.scss',
})
export class AccommodationDetailsPageComponent implements OnInit, OnDestroy {
  @ViewChildren(Tooltip) tooltips!: QueryList<Tooltip>;

  accommodationId!: number;
  responsiveOptions: any[] | undefined;
  isLoggedIn: boolean;
  rating!: number | null;
  amenityIconMap: Record<Amenity, string>;
  firstAvailableDate: string | null = null;
  isFullscreenGalleryVisible: boolean = false;
  isMobileView!: boolean;

  accommodation$!: Observable<Accommodation>;

  private readonly _destroying$ = new Subject<void>();

  fillString = fillString;

  constructor(
    protected translation: TranslateService,
    private router: Router,
    private toast: ToastService,
    private accommodationsService: AccommodationsService,
    private dialogService: DialogService,
    private authService: AuthService,
    private contantsService: ConstantsService
  ) {
    this.setAccommodationId();
    this.handleResize();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
    this.amenityIconMap = this.contantsService.getAmenityIconMap();
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.getAccommodation();
  }

  setAccommodationId(): void {
    const id = this.router.url.split('/').pop();
    if (id && !isNaN(+id)) {
      this.accommodationId = +id;
    }
  }

  getAccommodation(): void {
    if (this.accommodationId && isNaN(this.accommodationId)) {
      this.toast.showError(
        this.translation.instant('error_occured'),
        this.translation.instant('try_again_later')
      );
    } else {
      this.accommodation$ = this.accommodationsService
        .getAccommodation$(this.accommodationId)
        .pipe(
          tap((accommodation) => this.setAverageRating(accommodation)),
          tap((accommodation) =>
            this.setFirstAvailableDate(accommodation.unavailableCheckInDates)
          ),
          catchError(() => {
            this.toast.showError(
              this.translation.instant('error_occured'),
              this.translation.instant('try_again_later')
            );
            return of();
          })
        );
    }
  }

  setFirstAvailableDate(unavailableDates: Date[]): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const theNextDay = new Date(today);
    theNextDay.setDate(today.getDate() + 1);

    const unavailableDateTimes = new Set(
      unavailableDates.map((date) => {
        const normalizedDate = new Date(date);
        normalizedDate.setHours(0, 0, 0, 0);
        return normalizedDate.getTime();
      })
    );

    const maxSearchDays = 728;
    let daysSearched = 0;

    while (daysSearched < maxSearchDays) {
      if (!unavailableDateTimes.has(theNextDay.getTime())) {
        this.firstAvailableDate = mapApiDate(theNextDay);
        break;
      }
      theNextDay.setDate(theNextDay.getDate() + 1);
      daysSearched++;
    }
  }

  setAverageRating(accommodation: Accommodation): void {
    if (accommodation.reviews.length) {
      const ratings: number[] = accommodation.reviews.map(
        (review) => review.rating
      );

      this.rating = Math.round(
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      );
    } else {
      this.rating = null;
    }
  }

  onFavorite(accommodation: Accommodation): void {
    if (this.isLoggedIn) {
      accommodation.isFavorite = !accommodation.isFavorite;
      this.accommodationsService
        .addRemoveFavorite$(accommodation.id)
        .pipe(takeUntil(this._destroying$))
        .subscribe();
    }
  }

  getAmenityIconClass(amenity: string): string {
    return this.amenityIconMap[amenity as Amenity] || 'bi-arrow-right-circle';
  }

  onMapPreview(accommodation: Accommodation): void {
    const mdBreakpoint = 768;
    this.dialogService.open(MapAccommodationPreviewComponent, {
      header: accommodation.name,
      width: window.innerWidth < mdBreakpoint ? '100%' : '90%',
      height: '100%',
      focusOnShow: false,
      data: {
        lat: accommodation.latitude,
        lon: accommodation.longitude,
      },
    });
  }

  onBook(accommodation: Accommodation): void {
    this.dialogService.open(AccommodationBookDialogComponent, {
      header: this.translation.instant('booking'),
      width: this.isMobileView ? '100%' : '52rem',
      height: this.isMobileView ? '100%' : '36rem',
      contentStyle: { overflow: 'scroll' },
      data: {
        accommodation: accommodation,
      },
    });
  }

  openGallery(): void {
    this.isFullscreenGalleryVisible = true;
  }

  showTooltip(index: number): void {
    const tooltip = this.tooltips.toArray()[index];
    tooltip.show();
  }

  @HostListener('document:scroll')
  hideAllTooltips() {
    this.tooltips.forEach((t) => t.hide());
  }

  @HostListener('window:resize')
  handleResize(): void {
    const bpMedium = 768;
    this.isMobileView = window.innerWidth < bpMedium;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
