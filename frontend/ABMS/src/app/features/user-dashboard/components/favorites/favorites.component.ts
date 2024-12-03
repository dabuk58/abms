import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { LoaderComponent } from '../../../../core/components/loader/loader.component';
import { ROUTES } from '../../../../core/constants/routes-constants';
import { FavoriteAccommodation } from '../../../../core/interfaces/favorite-accommodation';
import { UserService } from '../../../../core/services/user.service';
import { HeartIconComponent } from '../../../accommodations/components/heart-icon/heart-icon.component';
import { AccommodationsService } from '../../../accommodations/services/accommodations.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    AsyncPipe,
    PanelModule,
    HeartIconComponent,
    TooltipModule,
    LoaderComponent,
    ButtonModule,
    TranslatePipe,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  accommodations$!: Observable<FavoriteAccommodation[]>;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private accommodationsService: AccommodationsService
  ) {}

  ngOnInit(): void {
    this.accommodations$ = this.userService.getUserFavorites$();
  }

  onRemove(accommodationId: number): void {
    this.accommodationsService
      .addRemoveFavorite$(accommodationId)
      .pipe(
        finalize(() => {
          this.accommodations$ = this.userService.getUserFavorites$();
        }),
        takeUntil(this._destroying$)
      )
      .subscribe();
  }

  onDetails(accommodationId: number): void {
    this.router.navigate([ROUTES.ACCOMMODATIONS, accommodationId]);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
