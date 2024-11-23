import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ROUTES } from '../constants/routes-constants';
import { AccommodationSort } from '../enums/accommodation-sort.enum';
import { SelectOption } from '../interfaces/select-option';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor(
    private translation: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {}

  get headerButtonConfig(): MenuItem[] {
    return [
      {
        label: this.translation.instant('profile'),
        icon: 'pi pi-fw pi-user',
        command: () => this.router.navigate([ROUTES.PROFILE]),
      },
      {
        label: this.translation.instant('reservations'),
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: this.translation.instant('active'),
            icon: 'pi pi-fw pi-check',
            command: () =>
              this.router.navigate([ROUTES.USER, ROUTES.ACTIVE_RESERVATIONS]),
          },
          {
            label: this.translation.instant('completed'),
            icon: 'pi pi-fw pi-history',
            command: () =>
              this.router.navigate([ROUTES.USER, ROUTES.RESERVATIONS_HISTORY]),
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: this.translation.instant('logout'),
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.authService.logout(),
      },
    ];
  }

  getAmenitiesOptions(): string[] {
    return [
      'free_wifi',
      'parking',
      'tv',
      'pool',
      'gym',
      'free_breakfast',
      'free_meals',
      'kitchen',
      'balcony',
      'private_bathroom',
    ];
  }

  getAccommodationsSortOptions(): SelectOption[] {
    return [
      {
        label: this.translation.instant('price_asc'),
        value: AccommodationSort.PRICE_ASC,
      },
      {
        label: this.translation.instant('price_desc'),
        value: AccommodationSort.PRICE_DESC,
      },
      {
        label: this.translation.instant('rating_asc'),
        value: AccommodationSort.RATING_ASC,
      },
      {
        label: this.translation.instant('rating_desc'),
        value: AccommodationSort.RATING_DESC,
      },
    ];
  }
}
