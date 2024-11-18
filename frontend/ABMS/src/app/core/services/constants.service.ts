import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ROUTES } from '../constants/routes-constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor(
    private translateService: TranslateService,
    private router: Router,
    private authService: AuthService
  ) {}

  get headerButtonConfig(): MenuItem[] {
    return [
      {
        label: this.translateService.instant('profile'),
        icon: 'pi pi-fw pi-user',
        command: () => this.router.navigate([ROUTES.PROFILE]),
      },
      {
        label: this.translateService.instant('reservations'),
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: this.translateService.instant('active'),
            icon: 'pi pi-fw pi-check',
            command: () =>
              this.router.navigate([ROUTES.USER, ROUTES.ACTIVE_RESERVATIONS]),
          },
          {
            label: this.translateService.instant('completed'),
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
        label: this.translateService.instant('logout'),
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.authService.logout(),
      },
    ];
  }
}
