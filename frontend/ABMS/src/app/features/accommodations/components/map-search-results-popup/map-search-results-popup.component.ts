import { NgClass } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { AuthService } from '../../../../core/services/auth.service';
import { AccommodationsService } from '../../services/accommodations.service';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';

@Component({
  selector: 'app-map-search-results-popup',
  standalone: true,
  imports: [
    TranslatePipe,
    ButtonModule,
    HeartIconComponent,
    NgClass,
    TooltipModule,
  ],
  templateUrl: './map-search-results-popup.component.html',
  styleUrl: './map-search-results-popup.component.scss',
})
export class MapSearchResultsPopupComponent implements OnDestroy {
  @Input() markerId!: string;
  @Input() accommodation!: Accommodation;

  ROUTES = ROUTES;
  isLoggedIn: boolean;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    protected translation: TranslateService,
    private authService: AuthService,
    private accommodationsService: AccommodationsService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
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

  onDetails(id: number): void {
    const url = `${ROUTES.ACCOMMODATIONS}/${id}`;
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
