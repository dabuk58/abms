import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { Accommodation } from '../../../../core/interfaces/accommodation';
import { AuthService } from '../../../../core/services/auth.service';
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
export class AccommodationsSearchResultsComponent {
  @Input() accommodations!: Accommodation[];

  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    protected translation: TranslateService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  onFavorite(accommodation: Accommodation): void {
    if (this.isLoggedIn) {
      accommodation.isFavorite = !accommodation.isFavorite;
    }

    //TODO favorite logic
  }

  onDetails(id: number): void {
    this.router.navigate([ROUTES.ACCOMMODATIONS, id]);
  }
}
