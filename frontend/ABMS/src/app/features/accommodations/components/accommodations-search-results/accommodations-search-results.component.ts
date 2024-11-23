import { NgClass } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { Subject } from 'rxjs';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { AuthService } from '../../../../core/services/auth.service';
import { AccommodationsService } from '../../services/accommodations.service';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';

@Component({
  selector: 'app-accommodations-search-results',
  standalone: true,
  imports: [
    PanelModule,
    ImageModule,
    NgClass,
    HeartIconComponent,
    RatingModule,
    TooltipModule,
    TranslatePipe,
    ButtonModule,
  ],
  templateUrl: './accommodations-search-results.component.html',
  styleUrl: './accommodations-search-results.component.scss',
})
export class AccommodationsSearchResultsComponent implements OnDestroy {
  @Input() accommodations!: Accommodation[];

  isLoggedIn: boolean;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private accommodationsService: AccommodationsService,
    private router: Router,
    protected translation: TranslateService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  onFavorite(accommodation: Accommodation): void {
    if (this.isLoggedIn) {
      accommodation.isFavorite = !accommodation.isFavorite;
      this.accommodationsService
        .addRemoveFavorite$(accommodation.id)
        .subscribe();
    }
  }

  onDetails(id: number): void {
    this.router.navigate([ROUTES.ACCOMMODATIONS, id]);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
