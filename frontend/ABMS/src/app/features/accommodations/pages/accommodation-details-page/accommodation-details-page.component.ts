import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { TooltipModule } from 'primeng/tooltip';
import { catchError, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { fillString } from '../../../../shared/tools/functions';
import { HeartIconComponent } from '../../components/heart-icon/heart-icon.component';
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
    TooltipModule,
    ButtonModule,
    GalleriaModule,
    DividerModule,
    ChipModule,
  ],
  templateUrl: './accommodation-details-page.component.html',
  styleUrl: './accommodation-details-page.component.scss',
})
export class AccommodationDetailsPageComponent implements OnInit, OnDestroy {
  accommodationId!: number;
  responsiveOptions: any[] | undefined;
  isLoggedIn: boolean;
  rating!: number | null;

  accommodation$!: Observable<Accommodation>;

  private readonly _destroying$ = new Subject<void>();

  fillString = fillString;

  constructor(
    protected translation: TranslateService,
    private router: Router,
    private toast: ToastService,
    private accommodationsService: AccommodationsService,
    private authService: AuthService
  ) {
    this.setAccommodationId();
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
    switch (amenity) {
      case 'free_wifi':
        return 'bi-wifi';
      case 'parking':
        return 'bi-p-circle';
      case 'pool':
        return 'bi-water';
      case 'gym':
        return 'bi-duffle';
      case 'tv':
        return 'bi-tv';
      case 'free_breakfast':
        return 'bi-alarm';
      case 'free_meals':
        return 'bi-egg-fried';
      case 'kitchen':
        return 'bi-cup-hot';
      case 'balcony':
        return 'bi-wind';
      case 'private_bathroom':
        return 'bi-badge-wc';
      default:
        return 'bi-arrow-right-circle';
    }
  }

  onMapPreview(): void {}

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
