import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor(private translateService: TranslateService) {}

  get headerButtonConfig(): MenuItem[] {
    return [
      {
        label: this.translateService.instant('reservations'),
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: this.translateService.instant('active'),
            icon: 'pi pi-fw pi-check',
          },
          {
            label: this.translateService.instant('completed'),
            icon: 'pi pi-fw pi-history',
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: this.translateService.instant('logout'),
        icon: 'pi pi-fw pi-sign-out',
      },
    ];
  }
}
