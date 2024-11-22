import { Routes } from '@angular/router';
import { ROUTES } from '../../core/constants/routes-constants';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './pages/accommodations-search-page/accommodations-search-page.component'
      ).then((c) => c.AccommodationsSearchPageComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import(
        './pages/accommodation-details-page/accommodation-details-page.component'
      ).then((c) => c.AccommodationDetailsPageComponent),
  },
  {
    path: '**',
    redirectTo: ROUTES.HOME,
  },
];
